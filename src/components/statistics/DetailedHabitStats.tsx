// Detailed Habit Statistics - Expandable panel with comprehensive stats
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Trophy, BarChart3, Target,
  Link2, Star, ArrowUp, ArrowDown, X
} from 'lucide-react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useLanguage } from '@/hooks/use-translations';
import { calculateDetailedStats } from '@/lib/statistics/habit-stats-calculator';

export function DetailedHabitStats() {
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.getActiveHabits());
  const language = useLanguage();
  const [expandedStat, setExpandedStat] = useState<string | null>(null);

  const toggleExplanation = (id: string) => {
    setExpandedStat(prev => prev === id ? null : id);
  };

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

  // Explanations for all stats
  const explanations = useMemo(() => ({
    en: {
      currentStreak: 'How many days in a row you\'ve been active up to today (or yesterday). A streak breaks when you skip a full day.',
      longestStreak: 'The longest unbroken chain of consecutive active days you\'ve ever achieved.',
      totalDays: 'The total number of days where you completed at least one habit, across all time.',
      topStreaks: 'Your top 5 longest streaks visualized as bars. Taller bars mean longer streaks.',
      weeklyRate: 'The percentage of the last 7 days where you completed at least one habit.',
      monthlyRate: 'The percentage of days this month (so far) where you were active.',
      yearlyCheckins: 'How many days this year you\'ve logged at least one habit. Out of 365 possible days.',
      bestWeekday: 'The day of the week where you\'ve been most consistently active over the last 90 days.',
      weekdayVsWeekend: 'Compares how active you are on weekdays (Mon–Fri) versus weekends (Sat–Sun) on average.',
      heatmap: 'A visual map of your activity over time. Darker squares mean more habits completed on that day.',
      consistencyScore: 'A score from 0–100 measuring how evenly spaced your active days are. Higher = more regular rhythm.',
      nextMilestone: 'The next total-days milestone you\'re approaching. Keep going to reach it!',
      recoverySpeed: 'After a break (gap of 2+ days), how quickly on average you get back to your habits.',
      perfectWeeks: 'How many full weeks (Mon–Sun) you\'ve been active every single day.',
      monthComparison: 'Compares the number of active days this month to last month. Positive means improvement.',
      bestMonth: 'The calendar month where you logged the most active days ever.',
      correlations: 'Habit pairs that you tend to complete on the same day. Shows how often they appear together.',
    },
    de: {
      currentStreak: 'Wie viele Tage am Stück du bis heute (oder gestern) aktiv warst. Eine Strähne bricht, wenn du einen ganzen Tag auslässt.',
      longestStreak: 'Die längste ununterbrochene Kette aufeinanderfolgender aktiver Tage, die du je erreicht hast.',
      totalDays: 'Die Gesamtzahl der Tage, an denen du mindestens eine Gewohnheit erledigt hast – über die gesamte Zeit.',
      topStreaks: 'Deine 5 längsten Strähnen als Balken dargestellt. Höhere Balken bedeuten längere Strähnen.',
      weeklyRate: 'Der Prozentsatz der letzten 7 Tage, an denen du mindestens eine Gewohnheit erledigt hast.',
      monthlyRate: 'Der Prozentsatz der Tage dieses Monats (bisher), an denen du aktiv warst.',
      yearlyCheckins: 'An wie vielen Tagen dieses Jahr du mindestens eine Gewohnheit eingetragen hast. Von 365 möglichen Tagen.',
      bestWeekday: 'Der Wochentag, an dem du in den letzten 90 Tagen am zuverlässigsten aktiv warst.',
      weekdayVsWeekend: 'Vergleicht deine Aktivität an Werktagen (Mo–Fr) mit der am Wochenende (Sa–So) im Durchschnitt.',
      heatmap: 'Eine visuelle Karte deiner Aktivität über die Zeit. Dunklere Felder bedeuten mehr erledigte Gewohnheiten an dem Tag.',
      consistencyScore: 'Ein Wert von 0–100, der misst, wie gleichmäßig deine aktiven Tage verteilt sind. Höher = regelmäßigerer Rhythmus.',
      nextMilestone: 'Der nächste Gesamt-Tage-Meilenstein, den du erreichen kannst. Mach weiter!',
      recoverySpeed: 'Nach einer Pause (Lücke von 2+ Tagen) – wie schnell du im Durchschnitt wieder zu deinen Gewohnheiten zurückkehrst.',
      perfectWeeks: 'Wie viele volle Wochen (Mo–So) du an jedem einzelnen Tag aktiv warst.',
      monthComparison: 'Vergleicht die Anzahl aktiver Tage dieses Monats mit dem letzten Monat. Positiv bedeutet Verbesserung.',
      bestMonth: 'Der Kalendermonat, in dem du die meisten aktiven Tage überhaupt hattest.',
      correlations: 'Gewohnheits-Paare, die du oft am selben Tag erledigst. Zeigt, wie häufig sie zusammen vorkommen.',
    },
    es: {
      currentStreak: 'Cuántos días seguidos has estado activo hasta hoy (o ayer). La racha se rompe si te saltas un día completo.',
      longestStreak: 'La cadena más larga de días activos consecutivos que has logrado.',
      totalDays: 'El número total de días en los que completaste al menos un hábito, en todo el tiempo.',
      topStreaks: 'Tus 5 rachas más largas visualizadas como barras. Las barras más altas significan rachas más largas.',
      weeklyRate: 'El porcentaje de los últimos 7 días en los que completaste al menos un hábito.',
      monthlyRate: 'El porcentaje de días de este mes (hasta ahora) en los que estuviste activo.',
      yearlyCheckins: 'Cuántos días este año has registrado al menos un hábito. De 365 días posibles.',
      bestWeekday: 'El día de la semana en el que has sido más consistente en los últimos 90 días.',
      weekdayVsWeekend: 'Compara tu actividad en días laborables (Lun–Vie) con los fines de semana (Sáb–Dom) en promedio.',
      heatmap: 'Un mapa visual de tu actividad a lo largo del tiempo. Los cuadros más oscuros significan más hábitos completados ese día.',
      consistencyScore: 'Una puntuación de 0–100 que mide cuán uniformemente espaciados están tus días activos. Mayor = ritmo más regular.',
      nextMilestone: 'El próximo hito de días totales al que te acercas. ¡Sigue adelante!',
      recoverySpeed: 'Después de un descanso (pausa de 2+ días), cuánto tardas en promedio en volver a tus hábitos.',
      perfectWeeks: 'Cuántas semanas completas (Lun–Dom) has estado activo todos los días.',
      monthComparison: 'Compara el número de días activos este mes con el mes pasado. Positivo significa mejora.',
      bestMonth: 'El mes del calendario donde registraste más días activos.',
      correlations: 'Pares de hábitos que sueles completar el mismo día. Muestra cuántas veces aparecen juntos.',
    },
  }), []);

  const labels = t[language] || t.en;
  const exp = explanations[language] || explanations.en;
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
        <div className="grid grid-cols-3 gap-2">
          <StatBox
            id="currentStreak"
            label={labels.currentStreak}
            value={`${streaks.currentStreak}`}
            sub={labels.days}
            highlight
            explanation={exp.currentStreak}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
          <StatBox
            id="longestStreak"
            label={labels.longestStreak}
            value={`${streaks.longestStreak}`}
            sub={labels.days}
            explanation={exp.longestStreak}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
          <StatBox
            id="totalDays"
            label={labels.totalDays}
            value={`${streaks.totalDaysLogged}`}
            sub={labels.days}
            explanation={exp.totalDays}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
        </div>
        {streaks.topStreaks.length > 1 && (
          <ExplainableBlock
            id="topStreaks"
            explanation={exp.topStreaks}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          >
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
          </ExplainableBlock>
        )}
      </Section>

      {/* 2. Rhythm & Frequency */}
      <Section icon={<BarChart3 className="w-4 h-4 text-primary" />} title={labels.rhythm}>
        <div className="grid grid-cols-2 gap-2">
          <StatBox
            id="weeklyRate"
            label={labels.weeklyRate}
            value={`${rhythm.weeklyRate}%`}
            explanation={exp.weeklyRate}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
          <StatBox
            id="monthlyRate"
            label={labels.monthlyRate}
            value={`${rhythm.monthlyRate}%`}
            explanation={exp.monthlyRate}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <StatBox
            id="yearlyCheckins"
            label={labels.yearlyCheckins}
            value={`${rhythm.yearlyCheckins}`}
            sub="/ 365"
            explanation={exp.yearlyCheckins}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
          <StatBox
            id="bestWeekday"
            label={labels.bestWeekday}
            value={names[rhythm.bestWeekday]}
            sub={`${rhythm.bestWeekdayRate}%`}
            explanation={exp.bestWeekday}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
        </div>
        <ExplainableBlock
          id="weekdayVsWeekend"
          explanation={exp.weekdayVsWeekend}
          expandedStat={expandedStat}
          onToggle={toggleExplanation}
        >
          <div className="flex items-center gap-3">
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
        </ExplainableBlock>
      </Section>

      {/* 3. Heatmap & Consistency */}
      <Section icon={<Target className="w-4 h-4 text-primary" />} title={labels.visualization}>
        <ExplainableBlock
          id="heatmap"
          explanation={exp.heatmap}
          expandedStat={expandedStat}
          onToggle={toggleExplanation}
        >
          <p className="text-xs text-muted-foreground mb-2">{labels.heatmap}</p>
          <HeatmapGrid data={heatmap} lessLabel={labels.less} moreLabel={labels.more} />
        </ExplainableBlock>
        <ExplainableBlock
          id="consistencyScore"
          explanation={exp.consistencyScore}
          expandedStat={expandedStat}
          onToggle={toggleExplanation}
        >
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
        </ExplainableBlock>
      </Section>

      {/* 4. Progress & Milestones */}
      <Section icon={<Star className="w-4 h-4 text-primary" />} title={labels.progress}>
        <div className="grid grid-cols-2 gap-2">
          <StatBox
            id="nextMilestone"
            label={labels.nextMilestone}
            value={`${progress.nextMilestone}`}
            sub={`${progress.daysToMilestone} ${labels.daysToGo}`}
            highlight
            explanation={exp.nextMilestone}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
          <StatBox
            id="recoverySpeed"
            label={labels.recoverySpeed}
            value={progress.avgRecoveryDays > 0 ? `${progress.avgRecoveryDays}` : '—'}
            sub={progress.avgRecoveryDays > 0 ? labels.daysAvg : ''}
            explanation={exp.recoverySpeed}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <StatBox
            id="perfectWeeks"
            label={labels.perfectWeeks}
            value={`${progress.perfectWeeks}`}
            explanation={exp.perfectWeeks}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
          <StatBox
            id="monthComparison"
            label={labels.monthComparison}
            value={progress.thisMonthVsLast > 0 ? `+${progress.thisMonthVsLast}` : progress.thisMonthVsLast < 0 ? `${progress.thisMonthVsLast}` : '='}
            sub={progress.thisMonthVsLast > 0 ? labels.moreDays : progress.thisMonthVsLast < 0 ? labels.fewerDays : labels.sameDays}
            icon={progress.thisMonthVsLast > 0 ? <ArrowUp className="w-3 h-3 text-primary" /> : progress.thisMonthVsLast < 0 ? <ArrowDown className="w-3 h-3 text-muted-foreground" /> : undefined}
            explanation={exp.monthComparison}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          />
        </div>
        {progress.bestMonth && (
          <ExplainableBlock
            id="bestMonth"
            explanation={exp.bestMonth}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          >
            <div className="p-2 rounded-lg bg-muted/30 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{labels.bestMonth}</p>
                <p className="text-sm font-medium text-foreground">
                  {months[progress.bestMonth.month]} {progress.bestMonth.year} — {progress.bestMonth.count} {labels.days}
                </p>
              </div>
            </div>
          </ExplainableBlock>
        )}
      </Section>

      {/* 5. Correlations */}
      {pairs.length > 0 && (
        <Section icon={<Link2 className="w-4 h-4 text-primary" />} title={labels.correlations}>
          <ExplainableBlock
            id="correlations"
            explanation={exp.correlations}
            expandedStat={expandedStat}
            onToggle={toggleExplanation}
          >
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
          </ExplainableBlock>
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

function ExplanationBubble({ explanation, onClose }: { explanation: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="mt-2 p-3 rounded-xl bg-muted/40 border border-border/30 relative">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-2 right-2 p-0.5 rounded-md hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <p className="text-xs text-foreground/80 leading-relaxed pr-5">
          {explanation}
        </p>
      </div>
    </motion.div>
  );
}

function StatBox({ id, label, value, sub, highlight, icon, explanation, expandedStat, onToggle }: {
  id: string;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
  explanation: string;
  expandedStat: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`w-full text-left p-2.5 rounded-xl transition-colors active:scale-[0.98] ${
          highlight
            ? 'bg-primary/10 border border-primary/20 hover:bg-primary/15'
            : 'bg-muted/30 hover:bg-muted/50'
        }`}
      >
        <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
        <div className="flex items-center gap-1 mt-1">
          {icon}
          <p className={`text-lg font-semibold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
        </div>
        {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
      </button>
      <AnimatePresence>
        {expandedStat === id && (
          <ExplanationBubble explanation={explanation} onClose={() => onToggle(id)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ExplainableBlock({ id, explanation, expandedStat, onToggle, children }: {
  id: string;
  explanation: string;
  expandedStat: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full text-left rounded-xl p-2 -mx-2 transition-colors hover:bg-muted/30 active:bg-muted/50"
        style={{ width: 'calc(100% + 16px)' }}
      >
        {children}
      </button>
      <AnimatePresence>
        {expandedStat === id && (
          <ExplanationBubble explanation={explanation} onClose={() => onToggle(id)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function HeatmapGrid({ data, lessLabel, moreLabel }: { data: { date: string; count: number }[]; lessLabel: string; moreLabel: string }) {
  const maxCount = Math.max(1, ...data.map(d => d.count));

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted/30';
    const intensity = count / maxCount;
    if (intensity <= 0.25) return 'bg-primary/20';
    if (intensity <= 0.5) return 'bg-primary/40';
    if (intensity <= 0.75) return 'bg-primary/60';
    return 'bg-primary/90';
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
