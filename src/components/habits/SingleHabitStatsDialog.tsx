import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, BarChart3, Target, Star, Trophy,
  ArrowUp, ArrowDown, X,
} from 'lucide-react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useLanguage } from '@/hooks/use-translations';
import { calculateSingleHabitStats } from '@/lib/statistics/habit-stats-calculator';
import type { Habit } from '@/types/flownaut';

interface SingleHabitStatsDialogProps {
  habit: Habit;
  onClose: () => void;
}

export function SingleHabitStatsDialog({ habit, onClose }: SingleHabitStatsDialogProps) {
  const entries = useFlowNautStore(s => s.entries);
  const language = useLanguage();

  const stats = useMemo(() => calculateSingleHabitStats(habit, entries), [habit, entries]);

  const weekdayNames = useMemo(() => ({
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  }), []);

  const monthNames = useMemo(() => ({
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }), []);

  const t = useMemo(() => ({
    en: {
      title: 'Statistics',
      streaks: 'Streaks',
      current: 'Current',
      longest: 'Longest',
      total: 'Total Days',
      topStreaks: 'Top Streaks',
      days: 'days',
      rhythm: 'Rhythm',
      week: '7 Days',
      month: 'Month',
      year: 'Year',
      bestDay: 'Best Day',
      weekday: 'Weekdays',
      weekend: 'Weekend',
      vs: 'vs',
      patterns: 'Patterns',
      heatmap: 'Activity',
      consistency: 'Consistency',
      progress: 'Progress',
      milestone: 'Next Milestone',
      toGo: 'to go',
      recovery: 'Avg. Recovery',
      daysAvg: 'days avg.',
      perfect: 'Perfect Weeks',
      vsLast: 'vs Last Month',
      more: 'more',
      fewer: 'fewer',
      same: 'same',
      best: 'Best Month',
      less: 'Less',
      moreLabel: 'More',
      noData: 'Not enough data yet',
    },
    de: {
      title: 'Statistiken',
      streaks: 'Serien',
      current: 'Aktuell',
      longest: 'Längste',
      total: 'Gesamt',
      topStreaks: 'Top-Serien',
      days: 'Tage',
      rhythm: 'Rhythmus',
      week: '7 Tage',
      month: 'Monat',
      year: 'Jahr',
      bestDay: 'Bester Tag',
      weekday: 'Werktage',
      weekend: 'Wochenende',
      vs: 'vs',
      patterns: 'Muster',
      heatmap: 'Aktivität',
      consistency: 'Beständigkeit',
      progress: 'Fortschritt',
      milestone: 'Nächster Meilenstein',
      toGo: 'noch',
      recovery: 'Ø Wiederaufnahme',
      daysAvg: 'Tage Ø',
      perfect: 'Perfekte Wochen',
      vsLast: 'vs Letzter Monat',
      more: 'mehr',
      fewer: 'weniger',
      same: 'gleich',
      best: 'Bester Monat',
      less: 'Weniger',
      moreLabel: 'Mehr',
      noData: 'Noch nicht genug Daten',
    },
    es: {
      title: 'Estadísticas',
      streaks: 'Rachas',
      current: 'Actual',
      longest: 'Más larga',
      total: 'Total',
      topStreaks: 'Top Rachas',
      days: 'días',
      rhythm: 'Ritmo',
      week: '7 Días',
      month: 'Mes',
      year: 'Año',
      bestDay: 'Mejor Día',
      weekday: 'Laborable',
      weekend: 'Fin de sem.',
      vs: 'vs',
      patterns: 'Patrones',
      heatmap: 'Actividad',
      consistency: 'Consistencia',
      progress: 'Progreso',
      milestone: 'Próximo Hito',
      toGo: 'restantes',
      recovery: 'Recuperación',
      daysAvg: 'días prom.',
      perfect: 'Semanas Perfectas',
      vsLast: 'vs Mes Anterior',
      more: 'más',
      fewer: 'menos',
      same: 'igual',
      best: 'Mejor Mes',
      less: 'Menos',
      moreLabel: 'Más',
      noData: 'Aún no hay datos suficientes',
    },
  }), []);

  const l = t[language] || t.en;
  const names = weekdayNames[language] || weekdayNames.en;
  const months = monthNames[language] || monthNames.en;

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card rounded-xl border border-border shadow-soft p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{habit.emoji || '🌱'}</span>
            <span className="font-medium text-foreground text-sm">{habit.name} — {l.title}</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground text-center py-6">{l.noData}</p>
      </motion.div>
    );
  }

  const { streaks, rhythm, consistency, progress, heatmap } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-card rounded-xl border border-border shadow-soft p-4 space-y-4 max-h-[70vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{habit.emoji || '🌱'}</span>
          <span className="font-medium text-foreground text-sm">{habit.name} — {l.title}</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Streaks */}
      <Section icon={<Flame className="w-3.5 h-3.5 text-primary" />} title={l.streaks}>
        <div className="grid grid-cols-3 gap-2">
          <MiniStat label={l.current} value={`${streaks.currentStreak}`} sub={l.days} highlight />
          <MiniStat label={l.longest} value={`${streaks.longestStreak}`} sub={l.days} />
          <MiniStat label={l.total} value={`${streaks.totalDaysLogged}`} sub={l.days} />
        </div>
        {streaks.topStreaks.length > 1 && (
          <div className="mt-2">
            <p className="text-[10px] text-muted-foreground mb-1">{l.topStreaks}</p>
            <div className="flex gap-1 items-end h-8">
              {streaks.topStreaks.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] text-muted-foreground">{s}</span>
                  <div
                    className="rounded-sm bg-primary/70 min-w-[12px]"
                    style={{ height: `${Math.max(3, (s / Math.max(...streaks.topStreaks)) * 22)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Rhythm */}
      <Section icon={<BarChart3 className="w-3.5 h-3.5 text-primary" />} title={l.rhythm}>
        <div className="grid grid-cols-3 gap-2">
          <MiniStat label={l.week} value={`${rhythm.weeklyRate}%`} />
          <MiniStat label={l.month} value={`${rhythm.monthlyRate}%`} />
          <MiniStat label={l.year} value={`${rhythm.yearlyCheckins}`} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <MiniStat label={l.bestDay} value={names[rhythm.bestWeekday]} sub={`${rhythm.bestWeekdayRate}%`} />
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-muted/30">
            <div className="text-center flex-1">
              <p className="text-[9px] text-muted-foreground">{l.weekday}</p>
              <p className="text-xs font-medium text-foreground">{rhythm.weekdayRate}%</p>
            </div>
            <span className="text-[9px] text-muted-foreground">{l.vs}</span>
            <div className="text-center flex-1">
              <p className="text-[9px] text-muted-foreground">{l.weekend}</p>
              <p className="text-xs font-medium text-foreground">{rhythm.weekendRate}%</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Heatmap & Consistency */}
      <Section icon={<Target className="w-3.5 h-3.5 text-primary" />} title={l.patterns}>
        <div className="mb-2">
          <p className="text-[10px] text-muted-foreground mb-1">{l.heatmap}</p>
          <MiniHeatmap data={heatmap} lessLabel={l.less} moreLabel={l.moreLabel} />
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-muted-foreground">{l.consistency}</p>
            <p className="text-xs font-medium text-foreground">{consistency.score}/100</p>
          </div>
          <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${consistency.score}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </Section>

      {/* Progress */}
      <Section icon={<Star className="w-3.5 h-3.5 text-primary" />} title={l.progress}>
        <div className="grid grid-cols-2 gap-2">
          <MiniStat label={l.milestone} value={`${progress.nextMilestone}`} sub={`${progress.daysToMilestone} ${l.toGo}`} highlight />
          <MiniStat label={l.recovery} value={progress.avgRecoveryDays > 0 ? `${progress.avgRecoveryDays}` : '—'} sub={progress.avgRecoveryDays > 0 ? l.daysAvg : ''} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <MiniStat label={l.perfect} value={`${progress.perfectWeeks}`} />
          <MiniStat
            label={l.vsLast}
            value={progress.thisMonthVsLast > 0 ? `+${progress.thisMonthVsLast}` : progress.thisMonthVsLast < 0 ? `${progress.thisMonthVsLast}` : '='}
            sub={progress.thisMonthVsLast > 0 ? l.more : progress.thisMonthVsLast < 0 ? l.fewer : l.same}
            icon={progress.thisMonthVsLast > 0 ? <ArrowUp className="w-3 h-3 text-primary" /> : progress.thisMonthVsLast < 0 ? <ArrowDown className="w-3 h-3 text-muted-foreground" /> : undefined}
          />
        </div>
        {progress.bestMonth && (
          <div className="mt-2 p-2 rounded-lg bg-muted/30 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">{l.best}</p>
              <p className="text-xs font-medium text-foreground">
                {months[progress.bestMonth.month]} {progress.bestMonth.year} — {progress.bestMonth.count} {l.days}
              </p>
            </div>
          </div>
        )}
      </Section>
    </motion.div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border/30 pt-3">
      <h4 className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-2">
        {icon} {title}
      </h4>
      {children}
    </div>
  );
}

function MiniStat({ label, value, sub, highlight, icon }: {
  label: string; value: string; sub?: string; highlight?: boolean; icon?: React.ReactNode;
}) {
  return (
    <div className={`p-2 rounded-lg ${highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'}`}>
      <p className="text-[9px] text-muted-foreground leading-tight">{label}</p>
      <div className="flex items-center gap-0.5 mt-0.5">
        {icon}
        <p className={`text-sm font-semibold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
      </div>
      {sub && <p className="text-[9px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function MiniHeatmap({ data, lessLabel, moreLabel }: { data: { date: string; count: number }[]; lessLabel: string; moreLabel: string }) {
  const maxCount = Math.max(1, ...data.map(d => d.count));

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted/30';
    return 'bg-primary/70';
  };

  const weeks: typeof data[] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div>
      <div className="flex gap-[2px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`w-[7px] h-[7px] rounded-[1.5px] ${getColor(day.count)}`}
                title={`${day.date}: ${day.count}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-1 justify-end">
        <span className="text-[8px] text-muted-foreground">{lessLabel}</span>
        <div className="w-[7px] h-[7px] rounded-[1.5px] bg-muted/30" />
        <div className="w-[7px] h-[7px] rounded-[1.5px] bg-primary/70" />
        <span className="text-[8px] text-muted-foreground">{moreLabel}</span>
      </div>
    </div>
  );
}
