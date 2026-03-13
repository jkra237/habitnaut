// Habit Statistics Component
// Displays gentle, non-judgmental statistics about habit patterns

import { useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Pause,
  Link2,
  BarChart3,
  Plus,
  Minus,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DetailedHabitStats } from './DetailedHabitStats';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations, useLanguage } from '@/hooks/use-translations';
import { subDays, parseISO, getDay, differenceInDays } from 'date-fns';

interface HabitStatisticsProps {
  className?: string;
}

interface StatItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel?: string;
  explanation: string;
}

export function HabitStatistics({ className = '' }: HabitStatisticsProps) {
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.getActiveHabits());
  const language = useLanguage();
  const t = useTranslations();
  const [showDetailed, setShowDetailed] = useState(false);
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const [overlayTop, setOverlayTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExplanation = (id: string, e?: React.MouseEvent) => {
    if (expandedStat === id) {
      setExpandedStat(null);
    } else {
      if (e && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setOverlayTop(buttonRect.top - containerRect.top);
      }
      setExpandedStat(id);
    }
  };

  // Calculate statistics - updateKey forces recalculation
  const stats = useMemo(() => {
    if (habits.length === 0 || entries.length === 0) return null;

    const lookbackDays = 30;
    const cutoff = subDays(new Date(), lookbackDays);
    const recentEntries = entries.filter(e => {
      try {
        return parseISO(e.date) >= cutoff;
      } catch {
        return false;
      }
    });

    if (recentEntries.length === 0) return null;

    // 1. Most practiced habit
    const habitCounts: Record<string, number> = {};
    habits.forEach(h => { habitCounts[h.id] = 0; });
    
    recentEntries.forEach(entry => {
      habits.forEach(h => {
        if (entry.habits[h.id] === 'done') {
          habitCounts[h.id]++;
        }
      });
    });

    const sortedByCount = habits
      .map(h => ({ habit: h, count: habitCounts[h.id] }))
      .sort((a, b) => b.count - a.count);

    const mostPracticed = sortedByCount[0];
    const leastPracticed = sortedByCount[sortedByCount.length - 1];

    // 2. Activity rate in the last 7 days (as percentage)
    const last7Days = subDays(new Date(), 7);
    const last7DaysEntries = entries.filter(e => {
      try {
        return parseISO(e.date) >= last7Days;
      } catch {
        return false;
      }
    });
    const daysWithActivityLast7 = last7DaysEntries.filter(e => 
      Object.values(e.habits).some(s => s === 'done')
    ).length;
    const activityPercentage = Math.round((daysWithActivityLast7 / 7) * 100);

    // 3. Most active weekday
    const weekdayCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    recentEntries.forEach(entry => {
      const day = getDay(parseISO(entry.date));
      const doneCount = Object.values(entry.habits).filter(s => s === 'done').length;
      weekdayCounts[day] += doneCount;
    });
    const mostActiveDay = Object.entries(weekdayCounts)
      .sort((a, b) => Number(b[1]) - Number(a[1]))[0];

    // 5. Weekday vs Weekend comparison
    const weekdayTotal = weekdayCounts[1] + weekdayCounts[2] + weekdayCounts[3] + weekdayCounts[4] + weekdayCounts[5];
    const weekendTotal = weekdayCounts[0] + weekdayCounts[6];
    const weekdayAvg = weekdayTotal / 5;
    const weekendAvg = weekendTotal / 2;
    const weekdayVsWeekend = weekdayAvg > weekendAvg ? 'weekday' : weekendAvg > weekdayAvg ? 'weekend' : 'equal';

    // 6. Habit with steadiest rhythm (smallest variance)
    const habitVariances: { habit: typeof habits[0]; variance: number }[] = [];
    habits.forEach(h => {
      const checkinDates = recentEntries
        .filter(e => e.habits[h.id] === 'done')
        .map(e => parseISO(e.date))
        .sort((a, b) => a.getTime() - b.getTime());
      
      if (checkinDates.length >= 3) {
        const gaps: number[] = [];
        for (let i = 1; i < checkinDates.length; i++) {
          gaps.push(differenceInDays(checkinDates[i], checkinDates[i - 1]));
        }
        const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
        const variance = gaps.reduce((sum, g) => sum + Math.pow(g - avg, 2), 0) / gaps.length;
        habitVariances.push({ habit: h, variance });
      }
    });
    const steadiestHabit = habitVariances.sort((a, b) => a.variance - b.variance)[0];

    // 7. Habit with pauses
    const habitWithPauses = habitVariances.sort((a, b) => b.variance - a.variance)[0];

    // 8. Longest natural pause
    let longestPause = 0;
    let pauseHabit: typeof habits[0] | null = null;
    habits.forEach(h => {
      const checkinDates = entries
        .filter(e => e.habits[h.id] === 'done')
        .map(e => parseISO(e.date))
        .sort((a, b) => a.getTime() - b.getTime());
      
      for (let i = 1; i < checkinDates.length; i++) {
        const gap = differenceInDays(checkinDates[i], checkinDates[i - 1]);
        if (gap > longestPause) {
          longestPause = gap;
          pauseHabit = h;
        }
      }
    });

    // 9. Habits that appear together
    let habitPair: { habitA: typeof habits[0]; habitB: typeof habits[0]; count: number } | null = null;
    if (habits.length >= 2) {
      for (let i = 0; i < habits.length; i++) {
        for (let j = i + 1; j < habits.length; j++) {
          let togetherCount = 0;
          recentEntries.forEach(e => {
            if (e.habits[habits[i].id] === 'done' && e.habits[habits[j].id] === 'done') {
              togetherCount++;
            }
          });
          if (!habitPair || togetherCount > habitPair.count) {
            habitPair = { habitA: habits[i], habitB: habits[j], count: togetherCount };
          }
        }
      }
    }

    // 10. Change over time
    const halfPoint = Math.floor(recentEntries.length / 2);
    const olderEntries = recentEntries.slice(halfPoint);
    const newerEntries = recentEntries.slice(0, halfPoint);
    
    const olderCount = olderEntries.reduce((sum, e) => 
      sum + Object.values(e.habits).filter(s => s === 'done').length, 0
    );
    const newerCount = newerEntries.reduce((sum, e) => 
      sum + Object.values(e.habits).filter(s => s === 'done').length, 0
    );
    const trend = newerCount > olderCount ? 'increase' : newerCount < olderCount ? 'decrease' : 'stable';

    return {
      mostPracticed,
      leastPracticed,
      activityPercentage,
      
      mostActiveDay: Number(mostActiveDay[0]),
      weekdayVsWeekend,
      steadiestHabit: steadiestHabit?.habit,
      habitWithPauses: habitWithPauses?.habit,
      longestPause,
      pauseHabit,
      habitPair: habitPair?.count && habitPair.count >= 3 ? habitPair : null,
      trend,
    };
  }, [entries, habits]);

  if (!stats || habits.length === 0) {
    return null;
  }

  // Build stat items based on available data
  const weekdayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  
  const statItems: StatItem[] = [];

  // Most practiced habit
  if (stats.mostPracticed && stats.mostPracticed.count > 0) {
    statItems.push({
      id: 'most-practiced',
      icon: <TrendingUp className="w-4 h-4 text-primary" />,
      label: language === 'de' 
        ? 'Diese Gewohnheit ist dir zuletzt am häufigsten begegnet.'
        : language === 'es'
        ? 'Este hábito ha sido el que más te has encontrado últimamente.'
        : 'This habit has been meeting you most often lately.',
      value: `${stats.mostPracticed.habit.emoji || ''} ${stats.mostPracticed.habit.name}`,
      explanation: language === 'de'
        ? `In den letzten 30 Tagen hast du diese Gewohnheit am häufigsten als erledigt markiert – insgesamt ${stats.mostPracticed.count} Mal.`
        : language === 'es'
        ? `En los últimos 30 días, marcaste este hábito como completado con más frecuencia – ${stats.mostPracticed.count} veces en total.`
        : `Over the last 30 days, you marked this habit as done most frequently – ${stats.mostPracticed.count} times total.`,
    });
  }

  // Least practiced habit (only if multiple habits and different from most)
  if (habits.length >= 2 && stats.leastPracticed && stats.leastPracticed.habit.id !== stats.mostPracticed?.habit.id) {
    statItems.push({
      id: 'least-practiced',
      icon: <Pause className="w-4 h-4 text-muted-foreground" />,
      label: language === 'de'
        ? 'Diese Gewohnheit hatte zuletzt weniger Raum.'
        : language === 'es'
        ? 'Este hábito ha tenido menos espacio últimamente.'
        : 'This habit had less space lately.',
      value: `${stats.leastPracticed.habit.emoji || ''} ${stats.leastPracticed.habit.name}`,
      explanation: language === 'de'
        ? `Diese Gewohnheit wurde in den letzten 30 Tagen am seltensten markiert – nur ${stats.leastPracticed.count} Mal. Das ist kein Urteil, nur eine Beobachtung.`
        : language === 'es'
        ? `Este hábito fue marcado con menos frecuencia en los últimos 30 días – solo ${stats.leastPracticed.count} veces. Sin juicio, solo una observación.`
        : `This habit was marked least often over the last 30 days – only ${stats.leastPracticed.count} times. No judgment, just an observation.`,
    });
  }

  // Activity rate in the last 7 days
  statItems.push({
    id: 'activity-rate',
    icon: <Calendar className="w-4 h-4 text-primary" />,
    label: language === 'de'
      ? 'Aktivität in den letzten 7 Tagen.'
      : language === 'es'
      ? 'Actividad en los últimos 7 días.'
      : 'Activity in the last 7 days.',
    value: `${stats.activityPercentage}%`,
    explanation: language === 'de'
      ? `An ${Math.round(stats.activityPercentage / 100 * 7)} von 7 Tagen hast du mindestens eine Gewohnheit als erledigt markiert. ${stats.activityPercentage}% bedeutet, du warst an fast ${stats.activityPercentage >= 70 ? 'jedem' : 'der Hälfte der'} Tag${stats.activityPercentage >= 70 ? '' : 'e'} aktiv.`
      : language === 'es'
      ? `En ${Math.round(stats.activityPercentage / 100 * 7)} de 7 días completaste al menos un hábito. ${stats.activityPercentage}% significa que estuviste activo casi ${stats.activityPercentage >= 70 ? 'todos los días' : 'la mitad de los días'}.`
      : `On ${Math.round(stats.activityPercentage / 100 * 7)} out of 7 days, you completed at least one habit. ${stats.activityPercentage}% means you were active on ${stats.activityPercentage >= 70 ? 'nearly every day' : 'about half the days'}.`,
  });

  // Most active weekday
  if (stats.mostActiveDay !== undefined) {
    statItems.push({
      id: 'active-day',
      icon: <BarChart3 className="w-4 h-4 text-primary" />,
      label: language === 'de'
        ? 'Dieser Wochentag trägt viele deiner Gewohnheiten.'
        : language === 'es'
        ? 'Este día de la semana lleva muchos de tus hábitos.'
        : 'This weekday carries many of your habits.',
      value: t.time.weekdays[weekdayNames[stats.mostActiveDay]],
      explanation: language === 'de'
        ? 'An diesem Wochentag hast du in den letzten 30 Tagen die meisten Gewohnheiten als erledigt markiert. Vielleicht passt dieser Tag besonders gut in deinen Rhythmus.'
        : language === 'es'
        ? 'En este día de la semana completaste más hábitos en los últimos 30 días. Quizás este día encaja especialmente bien en tu ritmo.'
        : 'On this weekday, you completed the most habits over the last 30 days. Perhaps this day fits your rhythm especially well.',
    });
  }

  // Steadiest rhythm (skip if same as most practiced — redundant)
  if (stats.steadiestHabit && stats.steadiestHabit.id !== stats.mostPracticed?.habit.id) {
    statItems.push({
      id: 'steadiest',
      icon: <TrendingUp className="w-4 h-4 text-calm" />,
      label: language === 'de'
        ? 'Diese Gewohnheit hat einen ruhigen, gleichmäßigen Rhythmus.'
        : language === 'es'
        ? 'Este hábito tiene un ritmo tranquilo y constante.'
        : 'This habit has a quiet, even rhythm.',
      value: `${stats.steadiestHabit.emoji || ''} ${stats.steadiestHabit.name}`,
      explanation: language === 'de'
        ? 'Die Abstände zwischen deinen Check-ins bei dieser Gewohnheit sind am gleichmäßigsten – du praktizierst sie in einem konstanten Rhythmus, ohne große Schwankungen.'
        : language === 'es'
        ? 'Los intervalos entre tus check-ins de este hábito son los más regulares – lo practicas en un ritmo constante, sin grandes fluctuaciones.'
        : 'The gaps between your check-ins for this habit are the most even – you practice it in a steady rhythm without big fluctuations.',
    });
  }

  // Habits appearing together
  if (stats.habitPair) {
    statItems.push({
      id: 'together',
      icon: <Link2 className="w-4 h-4 text-awareness" />,
      label: language === 'de'
        ? 'Diese Gewohnheiten begegnen sich häufig.'
        : language === 'es'
        ? 'Estos hábitos se encuentran a menudo.'
        : 'These habits often meet.',
      value: `${stats.habitPair.habitA.emoji || ''} ${stats.habitPair.habitA.name} & ${stats.habitPair.habitB.emoji || ''} ${stats.habitPair.habitB.name}`,
      explanation: language === 'de'
        ? `Diese beiden Gewohnheiten wurden in den letzten 30 Tagen ${stats.habitPair.count} Mal am selben Tag erledigt. Sie scheinen natürlich zusammenzugehören.`
        : language === 'es'
        ? `Estos dos hábitos se completaron el mismo día ${stats.habitPair.count} veces en los últimos 30 días. Parecen ir juntos de forma natural.`
        : `These two habits were completed on the same day ${stats.habitPair.count} times in the last 30 days. They seem to naturally go together.`,
    });
  }

  // Trend (skip with single habit — restates "most practiced")
  if (stats.trend !== 'stable' && habits.length >= 2) {
    statItems.push({
      id: 'trend',
      icon: stats.trend === 'increase' 
        ? <TrendingUp className="w-4 h-4 text-primary" />
        : <TrendingDown className="w-4 h-4 text-muted-foreground" />,
      label: stats.trend === 'increase'
        ? (language === 'de'
            ? 'Deine Gewohnheiten waren zuletzt präsenter als zuvor.'
            : language === 'es'
            ? 'Tus hábitos han estado más presentes últimamente.'
            : 'Your habits have been more present lately.')
        : (language === 'de'
            ? 'Deine Gewohnheiten waren zuletzt etwas ruhiger.'
            : language === 'es'
            ? 'Tus hábitos han estado un poco más tranquilos últimamente.'
            : 'Your habits have been a bit quieter lately.'),
      value: '',
      explanation: stats.trend === 'increase'
        ? (language === 'de'
            ? 'In der neueren Hälfte der letzten 30 Tage hast du mehr Gewohnheiten erledigt als in der älteren Hälfte. Deine Aktivität nimmt also zu.'
            : language === 'es'
            ? 'En la mitad más reciente de los últimos 30 días completaste más hábitos que en la mitad anterior. Tu actividad está aumentando.'
            : 'In the more recent half of the last 30 days, you completed more habits than in the earlier half. Your activity is increasing.')
        : (language === 'de'
            ? 'In der neueren Hälfte der letzten 30 Tage hast du weniger Gewohnheiten erledigt als zuvor. Das ist natürlich – Rhythmen schwanken.'
            : language === 'es'
            ? 'En la mitad más reciente de los últimos 30 días completaste menos hábitos que antes. Es natural – los ritmos fluctúan.'
            : 'In the more recent half of the last 30 days, you completed fewer habits than before. That\'s natural – rhythms fluctuate.'),
    });
  }

  // Cap at 5 items to prevent visual clutter
  statItems.splice(5);

  if (statItems.length === 0) return null;

  return (
    <div ref={containerRef} className={`bg-card rounded-2xl border border-border/50 shadow-card p-5 relative ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          {language === 'de' ? 'Dein Überblick' : language === 'es' ? 'Tu Resumen' : 'Your Overview'}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-xl"
          onClick={() => setShowDetailed(!showDetailed)}
        >
          {showDetailed
            ? <Minus className="w-4 h-4 text-muted-foreground" />
            : <Plus className="w-4 h-4 text-muted-foreground" />
          }
        </Button>
      </div>

      <div className="space-y-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              type="button"
              onClick={() => toggleExplanation(item.id)}
              className="flex items-start gap-3 w-full text-left rounded-xl p-2 -m-2 transition-colors hover:bg-muted/40 active:bg-muted/60"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.label}
                </p>
                {item.value && (
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {item.value}
                    {item.sublabel && (
                      <span className="text-muted-foreground font-normal ml-1">{item.sublabel}</span>
                    )}
                  </p>
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Overlay explanation */}
      <AnimatePresence>
        {expandedStat && (() => {
          const item = statItems.find(s => s.id === expandedStat);
          if (!item) return null;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-10 flex items-center justify-center p-4"
              onClick={() => setExpandedStat(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-5 max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setExpandedStat(null)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {item.value && (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pr-4">
                  {item.explanation}
                </p>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Detailed Statistics Panel */}
      <AnimatePresence>
        {showDetailed && (
          <>
            <DetailedHabitStats />
            <button
              onClick={() => setShowDetailed(false)}
              className="w-full mt-3 py-2 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors text-xs text-muted-foreground"
            >
              {language === 'de' ? 'Statistiken zuklappen' : language === 'es' ? 'Ocultar estadísticas' : 'Collapse statistics'}
            </button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
