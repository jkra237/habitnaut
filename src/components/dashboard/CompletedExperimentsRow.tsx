import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
  onOpen: () => void;
}

export function CompletedExperimentsRow({ onOpen }: Props) {
  const experiments = useFlowNautStore((s) => s.experiments);
  const t = useTranslations();
  const completed = experiments
    .filter((e) => e.status === 'completed')
    .slice(-6)
    .reverse();

  if (completed.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-serif text-base font-medium text-foreground">
        {t.experiments.completedExperiments}
      </h2>
      <div className="-mx-5 overflow-x-auto px-5">
        <div className="flex gap-2 pb-1">
          {completed.map((exp) => {
            const delta =
              exp.afterMood !== undefined ? exp.afterMood - exp.beforeMood : undefined;
            const deltaLabel =
              delta === undefined ? '' : delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : '±0';
            return (
              <button
                key={exp.id}
                type="button"
                onClick={onOpen}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm shadow-soft transition-all hover:border-primary/30 hover:bg-secondary/50"
              >
                <span className="text-base leading-none">{exp.emoji}</span>
                <span className="max-w-[140px] truncate text-xs text-foreground">
                  {exp.title}
                </span>
                {deltaLabel && (
                  <span className="text-[11px] text-muted-foreground">{deltaLabel}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
