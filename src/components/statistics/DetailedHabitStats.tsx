// Detailed Habit Statistics - Expandable panel with comprehensive stats
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Trophy, Calendar, BarChart3, Target,
  TrendingUp, Zap, Link2, Star, Clock, ArrowUp, ArrowDown
} from 'lucide-react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useLanguage } from '@/hooks/use-translations';
import { calculateDetailedStats } from '@/lib/statistics/habit-stats-calculator';

export function DetailedHabitStats() {
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.getActiveHabits());
  const language = useLanguage();

  const weekdayNames = useMemo(() => ({
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  }), []);

  const monthNames = useMemo(() => ({
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }), []);

  const stats = useMemo(() => calculateDetailedStats(habits, entries), [habits, entries]);

  const t = useMemo(() => ({
    en: {
      streaks: 'Continuity & Streaks',
      currentStreak: 'Current Streak',
      longestStreak: 'Longest Streak',
      totalDays: 'Total Days Logged',
      topStreaks: 'Top Streaks',
      days: 'days',
      rhythm: 'Rhythm & Frequency',
      weeklyRate: 'Weekly Rate (7d)',
      monthlyRate: 'Monthly Rate',
      yearlyCheckins: 'Year Check-ins',
      bestWeekday: 'Most Disciplined Day',
      weekdayRate: 'Weekday Rate',
      weekendRate: 'Weekend Rate',
      vs: 'vs',
      visualization: 'Patterns',
      heatmap: 'Activity Heatmap',
      consistencyScore: 'Consistency Score',
      progress: 'Progress & Milestones',
      nextMilestone: 'Next Milestone',
      daysToGo: 'days to go',
      recoverySpeed: 'Avg. Recovery',
      daysAvg: 'days avg.',
      perfectWeeks: 'Perfect Weeks (7/7)',
      monthComparison: 'vs Last Month',
      moreDays: 'more days',
      fewerDays: 'fewer days',
      sameDays: 'same',
      bestMonth: 'Best Month',
      correlations: 'Correlations',
      habitPairs: 'Habit Pairs',
      times: 'times together',
      less: 'Less',
      more: 'More',
    },
    de: {
      streaks: 'Kontinuität & Serien',
      currentStreak: 'Aktuelle Strähne',
      longestStreak: 'Längste Strähne',
      totalDays: 'Gesamtanzahl Tage',
      topStreaks: 'Top-Serien',
      days: 'Tage',
      rhythm: 'Rhythmus & Frequenz',
      weeklyRate: 'Erfolgsquote (7 Tage)',
      monthlyRate: 'Erfolgsquote (Monat)',
      yearlyCheckins: 'Jahres-Check-ins',
      bestWeekday: 'Diszipliniertester Tag',
      weekdayRate: 'Werktag-Rate',
      weekendRate: 'Wochenend-Rate',
      vs: 'vs',
      visualization: 'Muster',
      heatmap: 'Aktivitäts-Heatmap',
      consistencyScore: 'Beständigkeitsscore',
      progress: 'Fortschritt & Meilensteine',
      nextMilestone: 'Nächster Meilenstein',
      daysToGo: 'Tage noch',
      recoverySpeed: 'Ø Wiederaufnahme',
      daysAvg: 'Tage Ø',
      perfectWeeks: 'Perfekte Wochen (7/7)',
      monthComparison: 'vs Letzter Monat',
      moreDays: 'Tage mehr',
      fewerDays: 'Tage weniger',
      sameDays: 'gleich',
      bestMonth: 'Erfolgreichster Monat',
      correlations: 'Korrelationen',
      habitPairs: 'Gewohnheits-Paare',
      times: '× zusammen',
      less: 'Weniger',
      more: 'Mehr',
    },
    es: {
      streaks: 'Continuidad & Rachas',
      currentStreak: 'Racha Actual',
      longestStreak: 'Racha Más Larga',
      totalDays: 'Total Días',
      topStreaks: 'Top Rachas',
      days: 'días',
      rhythm: 'Ritmo & Frecuencia',
      weeklyRate: 'Tasa Semanal (7d)',
      monthlyRate: 'Tasa Mensual',
      yearlyCheckins: 'Check-ins del Año',
      bestWeekday: 'Día Más Disciplinado',
      weekdayRate: 'Tasa Laborable',
      weekendRate: 'Tasa Fin de Semana',
      vs: 'vs',
      visualization: 'Patrones',
      heatmap: 'Mapa de Actividad',
      consistencyScore: 'Puntuación de Consistencia',
      progress: 'Progreso & Hitos',
      nextMilestone: 'Próximo Hito',
      daysToGo: 'días restantes',
      recoverySpeed: 'Recuperación Prom.',
      daysAvg: 'días prom.',
      perfectWeeks: 'Semanas Perfectas (7/7)',
      monthComparison: 'vs Mes Anterior',
      moreDays: 'días más',
      fewerDays: 'días menos',
      sameDays: 'igual',
      bestMonth: 'Mejor Mes',
      correlations: 'Correlaciones',
      habitPairs: 'Pares de Hábitos',
      times: '× juntos',
      less: 'Menos',
      more: 'Más',
    },
  }), []);

  const labels = t[language] || t.en;
  const names = weekdayNames[language] || weekdayNames.en;
  const months = monthNames[language] || monthNames.en;

  if (!stats) return null;

  const { streaks, rhythm, consistency, progress, pairs, heatmap } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5 pt-4 border-t border-border/30"
    >
      {/* 1. Streaks */}
      <Section icon={<Flame className="w-4 h-4 text-primary" />} title={labels.streaks}>
        <div className="grid grid-cols-3 gap-3">
          <StatBox label={labels.currentStreak} value={`${streaks.currentStreak}`} sub={labels.days} highlight />
          <StatBox label={labels.longestStreak} value={`${streaks.longestStreak}`} sub={labels.days} />
          <StatBox label={labels.totalDays} value={`${streaks.totalDaysLogged}`} sub={labels.days} />
        </div>
        {streaks.topStreaks.length > 1 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">{labels.topStreaks}</p>
            <div className="flex gap-1.5 items-end h-10">
              {streaks.topStreaks.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-muted-foreground">{s}</span>
                  <div
                    className="rounded-sm bg-primary/70 min-w-[16px]"
                    style={{ height: `${Math.max(4, (s / Math.max(...streaks.topStreaks)) * 28)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* 2. Rhythm & Frequency */}
      <Section icon={<BarChart3 className="w-4 h-4 text-primary" />} title={labels.rhythm}>
        <div className="grid grid-cols-2 gap-3">
          <StatBox label={labels.weeklyRate} value={`${rhythm.weeklyRate}%`} />
          <StatBox label={labels.monthlyRate} value={`${rhythm.monthlyRate}%`} />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <StatBox label={labels.yearlyCheckins} value={`${rhythm.yearlyCheckins}`} sub={`/ 365`} />
          <StatBox label={labels.bestWeekday} value={names[rhythm.bestWeekday]} sub={`${rhythm.bestWeekdayRate}%`} />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 text-center p-2 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground">{labels.weekdayRate}</p>
            <p className="text-sm font-medium text-foreground">{rhythm.weekdayRate}%</p>
          </div>
          <span className="text-xs text-muted-foreground">{labels.vs}</span>
          <div className="flex-1 text-center p-2 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground">{labels.weekendRate}</p>
            <p className="text-sm font-medium text-foreground">{rhythm.weekendRate}%</p>
          </div>
        </div>
      </Section>

      {/* 3. Heatmap & Consistency */}
      <Section icon={<Target className="w-4 h-4 text-primary" />} title={labels.visualization}>
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-2">{labels.heatmap}</p>
          <HeatmapGrid data={heatmap} lessLabel={labels.less} moreLabel={labels.more} />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-muted-foreground">{labels.consistencyScore}</p>
            <p className="text-sm font-medium text-foreground">{consistency.score}/100</p>
          </div>
          <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${consistency.score}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </Section>

      {/* 4. Progress & Psychology */}
      <Section icon={<Star className="w-4 h-4 text-primary" />} title={labels.progress}>
        <div className="grid grid-cols-2 gap-3">
          <StatBox
            label={labels.nextMilestone}
            value={`${progress.nextMilestone}`}
            sub={`${progress.daysToMilestone} ${labels.daysToGo}`}
            highlight
          />
          <StatBox
            label={labels.recoverySpeed}
            value={progress.avgRecoveryDays > 0 ? `${progress.avgRecoveryDays}` : '—'}
            sub={progress.avgRecoveryDays > 0 ? labels.daysAvg : ''}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <StatBox label={labels.perfectWeeks} value={`${progress.perfectWeeks}`} />
          <StatBox
            label={labels.monthComparison}
            value={progress.thisMonthVsLast > 0 ? `+${progress.thisMonthVsLast}` : progress.thisMonthVsLast < 0 ? `${progress.thisMonthVsLast}` : '='}
            sub={progress.thisMonthVsLast > 0 ? labels.moreDays : progress.thisMonthVsLast < 0 ? labels.fewerDays : labels.sameDays}
            icon={progress.thisMonthVsLast > 0 ? <ArrowUp className="w-3 h-3 text-primary" /> : progress.thisMonthVsLast < 0 ? <ArrowDown className="w-3 h-3 text-muted-foreground" /> : undefined}
          />
        </div>
        {progress.bestMonth && (
          <div className="mt-3 p-2 rounded-lg bg-muted/30 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{labels.bestMonth}</p>
              <p className="text-sm font-medium text-foreground">
                {months[progress.bestMonth.month]} {progress.bestMonth.year} — {progress.bestMonth.count} {labels.days}
              </p>
            </div>
          </div>
        )}
      </Section>

      {/* 5. Correlations */}
      {pairs.length > 0 && (
        <Section icon={<Link2 className="w-4 h-4 text-primary" />} title={labels.correlations}>
          <div className="space-y-2">
            {pairs.map((pair, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <span className="text-sm">
                  {pair.habitA.emoji || '•'} {pair.habitA.name}
                </span>
                <span className="text-xs text-muted-foreground">&</span>
                <span className="text-sm">
                  {pair.habitB.emoji || '•'} {pair.habitB.name}
                </span>
                <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                  {pair.count} {labels.times}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </motion.div>
  );
}

// --- Sub-components ---

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function StatBox({ label, value, sub, highlight, icon }: {
  label: string; value: string; sub?: string; highlight?: boolean; icon?: React.ReactNode;
}) {
  return (
    <div className={`p-2.5 rounded-xl ${highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'}`}>
      <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
      <div className="flex items-center gap-1 mt-1">
        {icon}
        <p className={`text-lg font-semibold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
      </div>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function HeatmapGrid({ data, lessLabel, moreLabel }: { data: { date: string; count: number }[]; lessLabel: string; moreLabel: string }) {
  // 52 weeks × 7 days grid
  const maxCount = Math.max(1, ...data.map(d => d.count));

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted/30';
    const intensity = count / maxCount;
    if (intensity <= 0.25) return 'bg-primary/20';
    if (intensity <= 0.5) return 'bg-primary/40';
    if (intensity <= 0.75) return 'bg-primary/60';
    return 'bg-primary/90';
  };

  // Group into weeks (columns)
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
                className={`w-[8px] h-[8px] rounded-[2px] ${getColor(day.count)}`}
                title={`${day.date}: ${day.count}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-1.5 justify-end">
        <span className="text-[9px] text-muted-foreground">{lessLabel}</span>
        <div className="w-[8px] h-[8px] rounded-[2px] bg-muted/30" />
        <div className="w-[8px] h-[8px] rounded-[2px] bg-primary/20" />
        <div className="w-[8px] h-[8px] rounded-[2px] bg-primary/40" />
        <div className="w-[8px] h-[8px] rounded-[2px] bg-primary/60" />
        <div className="w-[8px] h-[8px] rounded-[2px] bg-primary/90" />
        <span className="text-[9px] text-muted-foreground">{moreLabel}</span>
      </div>
    </div>
  );
}
