// Habit Statistics Component
// Displays gentle, non-judgmental statistics about habit patterns

import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Sun, 
  Moon, 
  Sunrise,
  Calendar,
  Pause,
  Link2,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
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
}

export function HabitStatistics({ className = '' }: HabitStatisticsProps) {
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.getActiveHabits());
  const language = useLanguage();
  const t = useTranslations();
  const [updateKey, setUpdateKey] = useState(0);

  const handleUpdate = useCallback(() => {
    setUpdateKey(prev => prev + 1);
  }, []);

  // Calculate statistics - updateKey forces recalculation
  const stats = useMemo(() => {
    void updateKey; // Reference updateKey to trigger recalculation
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

    // 3. Most common time of day
    const timeAnchorCounts: Record<string, number> = { morning: 0, midday: 0, evening: 0 };
    recentEntries.forEach(entry => {
      habits.forEach(h => {
        if (entry.habits[h.id] === 'done' && h.timeAnchor !== 'none') {
          timeAnchorCounts[h.timeAnchor]++;
        }
      });
    });
    const mostCommonTime = Object.entries(timeAnchorCounts)
      .sort((a, b) => b[1] - a[1])[0];

    // 4. Most active weekday
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
      mostCommonTime,
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
    });
  }

  // Least practiced habit (only if different from most)
  if (stats.leastPracticed && stats.leastPracticed.habit.id !== stats.mostPracticed?.habit.id) {
    statItems.push({
      id: 'least-practiced',
      icon: <Pause className="w-4 h-4 text-muted-foreground" />,
      label: language === 'de'
        ? 'Diese Gewohnheit hatte zuletzt weniger Raum.'
        : language === 'es'
        ? 'Este hábito ha tenido menos espacio últimamente.'
        : 'This habit had less space lately.',
      value: `${stats.leastPracticed.habit.emoji || ''} ${stats.leastPracticed.habit.name}`,
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
  });

  // Most common time of day
  if (stats.mostCommonTime && stats.mostCommonTime[1] > 0) {
    const timeIcon = stats.mostCommonTime[0] === 'morning' 
      ? <Sunrise className="w-4 h-4 text-primary" />
      : stats.mostCommonTime[0] === 'evening'
      ? <Moon className="w-4 h-4 text-primary" />
      : <Sun className="w-4 h-4 text-primary" />;
    
    const timeName = stats.mostCommonTime[0] === 'morning'
      ? t.addHabitDialog.morning
      : stats.mostCommonTime[0] === 'evening'
      ? t.addHabitDialog.evening
      : t.addHabitDialog.midday;
    
    statItems.push({
      id: 'common-time',
      icon: timeIcon,
      label: language === 'de'
        ? 'Gewohnheiten zeigen sich bei dir oft am…'
        : language === 'es'
        ? 'Los hábitos suelen aparecer en…'
        : 'Habits often show up in the…',
      value: timeName,
    });
  }

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
    });
  }

  // Steadiest rhythm
  if (stats.steadiestHabit) {
    statItems.push({
      id: 'steadiest',
      icon: <TrendingUp className="w-4 h-4 text-calm" />,
      label: language === 'de'
        ? 'Diese Gewohnheit hat einen ruhigen, gleichmäßigen Rhythmus.'
        : language === 'es'
        ? 'Este hábito tiene un ritmo tranquilo y constante.'
        : 'This habit has a quiet, even rhythm.',
      value: `${stats.steadiestHabit.emoji || ''} ${stats.steadiestHabit.name}`,
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
    });
  }

  // Trend
  if (stats.trend !== 'stable') {
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
    });
  }

  if (statItems.length === 0) return null;

  return (
    <div className={`bg-card rounded-2xl border border-border/50 shadow-card p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          {language === 'de' ? 'Dein Überblick' : language === 'es' ? 'Tu Resumen' : 'Your Overview'}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUpdate}
          className="text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          Update
        </Button>
      </div>

      <div className="space-y-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
