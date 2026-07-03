import { motion } from 'framer-motion';
import { Beaker, Sparkles } from 'lucide-react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@/components/ui/button';

interface Props {
  onOpen: () => void;
}

const daysBetween = (from: string, to: string) => {
  const fromTime = new Date(`${from}T00:00:00`).getTime();
  const toTime = new Date(`${to}T00:00:00`).getTime();
  return Math.ceil((toTime - fromTime) / 86_400_000);
};

const interpolate = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);

export function ActiveExperimentCard({ onOpen }: Props) {
  const experiments = useFlowNautStore((s) => s.experiments);
  const t = useTranslations();
  const active = experiments.find((e) => e.status === 'active');

  if (!active) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 rounded-2xl border border-border/50 bg-card/60 px-4 py-3 text-left shadow-soft transition-all hover:border-primary/30 hover:bg-secondary/40"
      >
        <Beaker className="h-4 w-4 shrink-0 text-primary/70" />
        <span className="flex-1 text-sm text-muted-foreground">
          {t.experiments.overviewEmptyPrompt}
        </span>
        <span className="text-xs font-medium text-primary">{t.experiments.overviewDiscover}</span>
      </button>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const elapsed = Math.max(0, active.durationDays - Math.max(0, daysBetween(today, active.endDate)));
  const currentDay = Math.min(active.durationDays, elapsed + 1);
  const progressPct = Math.min(100, Math.max(0, Math.round((elapsed / active.durationDays) * 100)));

  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full text-left"
    >
      <motion.div
        whileHover={{ y: -1 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-soft transition-colors hover:bg-primary/10"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none">{active.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
              {t.experiments.activeExperiment}
            </p>
            <h2 className="mt-0.5 font-serif text-base font-medium leading-snug text-foreground">
              {active.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {interpolate(t.experiments.dayOf, { current: currentDay, total: active.durationDays })}
            </p>
          </div>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background/70">
          <div
            className="h-full rounded-full bg-primary/60 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-xl bg-background/60 p-3">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {t.experiments.overviewObservationPrompt}
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-foreground">
              {active.reflectionQuestion}
            </p>
          </div>
        </div>
      </motion.div>
    </button>
  );
}
