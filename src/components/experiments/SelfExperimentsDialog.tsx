import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, CalendarDays, Check, ChevronLeft, Clock, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useLanguage, useTranslations } from '@/hooks/use-translations';
import type { SelfExperiment } from '@/types/flownaut';
import { SELF_EXPERIMENT_IDEAS, type ExperimentIdea } from './self-experiment-ideas';

interface SelfExperimentsDialogProps {
  onClose: () => void;
}

type ViewMode = 'overview' | 'start' | 'complete';

const moodFaces = ['🌧️', '🌥️', '🌤️', '☀️', '✨'];

const toDateString = (date: Date) => date.toISOString().split('T')[0];

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const daysBetween = (from: string, to: string) => {
  const fromTime = new Date(`${from}T00:00:00`).getTime();
  const toTime = new Date(`${to}T00:00:00`).getTime();
  return Math.ceil((toTime - fromTime) / 86_400_000);
};

const interpolate = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);

function MoodPicker({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="grid grid-cols-5 gap-2">
        {moodFaces.map((face, index) => {
          const mood = index + 1;
          const selected = mood === value;
          return (
            <button
              key={face}
              type="button"
              onClick={() => onChange(mood)}
              className={`h-12 rounded-xl border text-xl transition-all ${selected ? 'border-primary bg-primary/10 shadow-soft' : 'border-border bg-card hover:bg-secondary'}`}
              aria-label={`${label} ${mood}`}
            >
              {face}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ExperimentCard({ idea, onSelect, disabled }: { idea: ExperimentIdea; onSelect: () => void; disabled: boolean }) {
  const language = useLanguage();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className="w-full rounded-2xl border border-border/60 bg-card p-4 text-left shadow-soft transition-all hover:border-primary/30 hover:bg-secondary/50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none">{idea.emoji}</span>
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="text-sm font-medium leading-snug text-foreground">{idea.title[language]}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{idea.description[language]}</p>
        </div>
      </div>
    </button>
  );
}

function ActiveExperiment({ experiment, onComplete, onRest }: { experiment: SelfExperiment; onComplete: () => void; onRest: () => void }) {
  const t = useTranslations();
  const today = toDateString(new Date());
  const elapsed = Math.max(0, experiment.durationDays - Math.max(0, daysBetween(today, experiment.endDate)));
  const currentDay = Math.min(experiment.durationDays, elapsed + 1);
  const daysLeft = Math.max(0, daysBetween(today, experiment.endDate));
  const progressPct = Math.min(100, Math.max(0, Math.round((elapsed / experiment.durationDays) * 100)));

  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="text-3xl">{experiment.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{t.experiments.activeExperiment}</p>
          <h2 className="mt-1 text-lg font-serif font-medium leading-tight text-foreground">{experiment.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{experiment.description}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t.experiments.progress}</span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-background/70">
          <div className="h-full rounded-full bg-primary/60 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-background/70 p-3">
          <CalendarDays className="mb-2 h-4 w-4 text-primary" />
          <p className="font-medium text-foreground">{interpolate(t.experiments.dayOf, { current: currentDay, total: experiment.durationDays })}</p>
          <p className="text-xs text-muted-foreground">{daysLeft > 0 ? interpolate(t.experiments.daysLeft, { days: daysLeft }) : t.experiments.startsToday}</p>
        </div>
        <div className="rounded-xl bg-background/70 p-3">
          <Sparkles className="mb-2 h-4 w-4 text-primary" />
          <p className="font-medium text-foreground">{t.experiments.moodBefore}</p>
          <p className="text-xl">{moodFaces[experiment.beforeMood - 1]}</p>
        </div>
      </div>
      {experiment.intention && <p className="mt-4 rounded-xl bg-background/70 p-3 text-sm text-muted-foreground">{experiment.intention}</p>}
      <p className="mt-3 text-sm text-muted-foreground"><span className="font-medium text-foreground">{t.experiments.reflectionQuestion}: </span>{experiment.reflectionQuestion}</p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row">
        <Button variant="ghost" className="w-full sm:flex-1" onClick={onRest}>{t.experiments.letRest}</Button>
        <Button variant="gentle" className="w-full sm:flex-1" onClick={onComplete}>{t.experiments.completeExperiment}</Button>
      </div>
    </section>
  );
}

export function SelfExperimentsDialog({ onClose }: SelfExperimentsDialogProps) {
  const t = useTranslations();
  const language = useLanguage();
  const experiments = useFlowNautStore((s) => s.experiments);
  const startExperiment = useFlowNautStore((s) => s.startExperiment);
  const completeExperiment = useFlowNautStore((s) => s.completeExperiment);
  const restExperiment = useFlowNautStore((s) => s.restExperiment);
  const wakeExperiment = useFlowNautStore((s) => s.wakeExperiment);

  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedIdea, setSelectedIdea] = useState<ExperimentIdea | null>(null);
  const [durationDays, setDurationDays] = useState(14);
  const [beforeMood, setBeforeMood] = useState(3);
  const [afterMood, setAfterMood] = useState(3);
  const [intention, setIntention] = useState('');
  const [closingNote, setClosingNote] = useState('');

  const activeExperiment = experiments.find((experiment) => experiment.status === 'active');
  const completedExperiments = experiments.filter((experiment) => experiment.status === 'completed');
  const restingExperiments = experiments.filter((experiment) => experiment.status === 'resting');

  const moodCopy = (before: number, after?: number) => {
    if (!after || after === before) return t.experiments.moodSame;
    return after > before ? t.experiments.moodLifted : t.experiments.moodLower;
  };

  const handleSelectIdea = (idea: ExperimentIdea) => {
    setSelectedIdea(idea);
    setViewMode('start');
  };

  const handleStart = () => {
    if (!selectedIdea) return;
    const startDate = new Date();
    startExperiment({
      ideaId: selectedIdea.id,
      title: selectedIdea.title[language],
      description: selectedIdea.description[language],
      reflectionQuestion: selectedIdea.reflectionQuestion[language],
      emoji: selectedIdea.emoji,
      durationDays,
      startDate: toDateString(startDate),
      endDate: toDateString(addDays(startDate, durationDays)),
      beforeMood,
      intention: intention.trim() || undefined,
    });
    setSelectedIdea(null);
    setIntention('');
    setBeforeMood(3);
    setViewMode('overview');
  };

  const handleComplete = () => {
    if (!activeExperiment) return;
    completeExperiment(activeExperiment.id, afterMood, closingNote.trim() || undefined);
    setAfterMood(3);
    setClosingNote('');
    setViewMode('overview');
  };

  const groupedIdeas = useMemo(() => {
    const groups: Record<string, ExperimentIdea[]> = {};
    for (const idea of SELF_EXPERIMENT_IDEAS) {
      (groups[idea.category] ||= []).push(idea);
    }
    return Object.entries(groups);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-3 backdrop-blur-sm sm:p-5">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="flex h-full max-h-[760px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-card"
      >
        <header className="flex items-start justify-between gap-3 border-b border-border/60 p-4 sm:p-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-primary">
              {viewMode !== 'overview' && <button type="button" onClick={() => setViewMode('overview')} className="rounded-lg p-1 hover:bg-secondary" aria-label={t.common.back}><ChevronLeft className="h-5 w-5" /></button>}
              <Beaker className="h-5 w-5" />
              <h1 className="font-serif text-xl font-medium text-foreground">{t.experiments.title}</h1>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.experiments.subtitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-xl" aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {viewMode === 'overview' && (
            <div className="space-y-6">
              {activeExperiment ? (
                <ActiveExperiment experiment={activeExperiment} onComplete={() => setViewMode('complete')} onRest={() => restExperiment(activeExperiment.id)} />
              ) : (
                <div className="rounded-2xl border border-border/60 bg-card p-4 text-sm text-muted-foreground shadow-soft">{t.experiments.noActive}</div>
              )}

              {activeExperiment && <p className="text-xs text-muted-foreground">{t.experiments.activeLimit}</p>}

              <section className="space-y-3">
                <h2 className="font-serif text-lg font-medium text-foreground">{t.experiments.ideaLibrary}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {groupedIdeas.map((idea) => (
                    <ExperimentCard key={idea.id} idea={idea} disabled={Boolean(activeExperiment)} onSelect={() => handleSelectIdea(idea)} />
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-lg font-medium text-foreground">{t.experiments.completedExperiments}</h2>
                {completedExperiments.length === 0 ? (
                  <p className="rounded-2xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">{t.experiments.noCompleted}</p>
                ) : (
                  <div className="space-y-3">
                    {completedExperiments.map((experiment) => (
                      <article key={experiment.id} className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{experiment.emoji}</span>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium leading-snug text-foreground">{experiment.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{moodCopy(experiment.beforeMood, experiment.afterMood)}</p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div className="rounded-xl bg-secondary/50 p-3"><span className="text-muted-foreground">{t.experiments.moodBefore}</span><p className="text-xl">{moodFaces[experiment.beforeMood - 1]}</p></div>
                          <div className="rounded-xl bg-secondary/50 p-3"><span className="text-muted-foreground">{t.experiments.moodAfter}</span><p className="text-xl">{experiment.afterMood ? moodFaces[experiment.afterMood - 1] : '—'}</p></div>
                        </div>
                        {experiment.closingNote && <p className="mt-3 text-sm text-muted-foreground">{experiment.closingNote}</p>}
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {viewMode === 'start' && selectedIdea && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{selectedIdea.emoji}</span>
                  <div>
                    <h2 className="font-serif text-xl font-medium text-foreground">{selectedIdea.title[language]}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedIdea.description[language]}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t.experiments.chooseDuration}</p>
                <div className="grid grid-cols-4 gap-2">
                  {[7, 14, 21, 28].map((days) => (
                    <button key={days} type="button" onClick={() => setDurationDays(days)} className={`rounded-xl border p-3 text-sm transition-all ${durationDays === days ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground hover:bg-secondary'}`}>
                      <Clock className="mx-auto mb-1 h-4 w-4" />
                      {days / 7} {days === 7 ? t.experiments.week : t.experiments.weeks}
                    </button>
                  ))}
                </div>
              </div>

              <MoodPicker label={t.experiments.beforeMood} value={beforeMood} onChange={setBeforeMood} />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t.experiments.intention}</p>
                <Textarea value={intention} onChange={(event) => setIntention(event.target.value)} placeholder={t.experiments.intentionPlaceholder} maxLength={500} />
              </div>

              <p className="rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground"><span className="font-medium text-foreground">{t.experiments.reflectionQuestion}: </span>{selectedIdea.reflectionQuestion[language]}</p>

              <Button variant="gentle" size="lg" className="w-full" onClick={handleStart}>{t.experiments.startExperiment}</Button>
            </div>
          )}

          {viewMode === 'complete' && activeExperiment && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{t.experiments.compareTitle}</p>
                <h2 className="mt-1 font-serif text-xl font-medium text-foreground">{activeExperiment.title}</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-secondary/50 p-3 text-center"><p className="text-sm text-muted-foreground">{t.experiments.moodBefore}</p><p className="mt-1 text-3xl">{moodFaces[activeExperiment.beforeMood - 1]}</p></div>
                  <div className="rounded-xl bg-secondary/50 p-3 text-center"><p className="text-sm text-muted-foreground">{t.experiments.moodAfter}</p><p className="mt-1 text-3xl">{moodFaces[afterMood - 1]}</p></div>
                </div>
              </div>

              <MoodPicker label={t.experiments.afterMood} value={afterMood} onChange={setAfterMood} />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t.experiments.closingNote}</p>
                <Textarea value={closingNote} onChange={(event) => setClosingNote(event.target.value)} placeholder={t.experiments.closingPlaceholder} maxLength={500} />
              </div>

              <p className="rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground"><span className="font-medium text-foreground">{t.experiments.reflectionQuestion}: </span>{activeExperiment.reflectionQuestion}</p>
              <p className="text-xs text-muted-foreground">{t.experiments.observationOnly}</p>
              <Button variant="gentle" size="lg" className="w-full" onClick={handleComplete}><Check className="h-4 w-4" />{t.experiments.completeExperiment}</Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
