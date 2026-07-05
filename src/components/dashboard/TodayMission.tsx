import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, getDay } from 'date-fns';
import { Check, Sparkles } from 'lucide-react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';
import { CellCelebration } from '@/components/habits/CellCelebration';
import type { Habit } from '@/types/flownaut';

/**
 * TodayMission
 *
 * Prominent "at-a-glance" section at the top of the dashboard showing
 * habits scheduled for today with one-tap completion. Aligned with the
 * HabitNaut philosophy: gentle observation, no red warnings.
 */
export function TodayMission() {
  const t = useTranslations();
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const entries = useFlowNautStore((s) => s.entries);
  const setHabitState = useFlowNautStore((s) => s.setHabitState);
  const removeHabitState = useFlowNautStore((s) => s.removeHabitState);
  const [celebrationKey, setCelebrationKey] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);
  const todayStr = format(today, 'yyyy-MM-dd');
  const todayEntry = entries.find((e) => e.date === todayStr);

  // Habits scheduled today: free-flow habits (no routineDays) OR routine matches today
  const todayHabits = useMemo(() => {
    const jsDay = getDay(today);
    const isoDay = jsDay === 0 ? 6 : jsDay - 1;
    return habits.filter((h) => {
      if (!h.routineDays || h.routineDays.length === 0) return true;
      if (!h.routineDays.includes(isoDay)) return false;
      if (h.routineFrequency === 'monthly' && h.routineMonthWeek) {
        const weekOfMonth = Math.ceil(today.getDate() / 7);
        const weeks = Array.isArray(h.routineMonthWeek)
          ? h.routineMonthWeek
          : [h.routineMonthWeek];
        return weeks.includes(weekOfMonth);
      }
      return true;
    });
  }, [habits, today]);

  const isDone = (habit: Habit) => todayEntry?.habits[habit.id] === 'done';

  const toggle = (habit: Habit) => {
    if (isDone(habit)) {
      removeHabitState(todayStr, habit.id);
    } else {
      setHabitState(todayStr, habit.id, 'done');
      const key = `${habit.id}-${Date.now()}`;
      setCelebrationKey(key);
      window.setTimeout(() => {
        setCelebrationKey((k) => (k === key ? null : k));
      }, 900);
    }
  };

  const doneCount = todayHabits.filter(isDone).length;
  const totalCount = todayHabits.length;
  const allDone = totalCount > 0 && doneCount === totalCount;

  if (habits.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-5 shadow-card"
      aria-label={t.dashboard.todayMissionTitle}
    >
      {/* Subtle glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {t.dashboard.todayMissionTitle}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t.dashboard.todayMissionSubtitle}
          </p>
        </div>
        {totalCount > 0 && (
          <span className="text-xs font-medium text-muted-foreground tabular-nums shrink-0">
            {doneCount} / {totalCount}
          </span>
        )}
      </div>

      {totalCount === 0 ? (
        <p className="relative text-sm text-muted-foreground text-center py-4">
          {t.dashboard.todayEmpty}
        </p>
      ) : (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-2">
          {todayHabits.map((habit, idx) => {
            const done = isDone(habit);
            const cellKey = celebrationKey?.startsWith(`${habit.id}-`)
              ? celebrationKey
              : null;
            return (
              <motion.button
                key={habit.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggle(habit)}
                aria-pressed={done}
                className={`relative overflow-visible group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${
                  done
                    ? 'border-primary/60 bg-primary/15 shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_4px_16px_-4px_hsl(var(--primary)/0.35)]'
                    : 'border-border/60 bg-card/50 hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                <span className="text-lg flex-shrink-0" aria-hidden="true">
                  {habit.emoji || '🌱'}
                </span>
                <span
                  className={`flex-1 text-[13px] font-medium leading-tight line-clamp-2 transition-colors ${
                    done ? 'text-foreground' : 'text-foreground/90'
                  }`}
                >
                  {habit.name}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    done
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/60 bg-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {done && (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                        className="flex"
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                <AnimatePresence>
                  {cellKey && (
                    <CellCelebration key={cellKey} type="done" />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      )}

      {allDone && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative mt-3 text-xs text-primary text-center italic"
        >
          ✨ {t.dashboard.todayAllDone}
        </motion.p>
      )}
    </motion.section>
  );
}
