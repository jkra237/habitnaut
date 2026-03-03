import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { HabitState } from '@/types/flownaut';
import { format, startOfWeek, addDays, addWeeks, isToday, isBefore, startOfDay } from 'date-fns';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { HabitOptions } from './HabitOptions';
import { useTranslations } from '@/hooks/use-translations';



const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HabitMatrix() {
  const t = useTranslations();
  const [activeReminderId, setActiveReminderId] = useState<string | null>(null);
  const [activeOptionsId, setActiveOptionsId] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const entries = useFlowNautStore((s) => s.entries);
  const setHabitState = useFlowNautStore((s) => s.setHabitState);
  

  const weekDates = useMemo(() => {
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const targetWeekStart = addWeeks(currentWeekStart, weekOffset);
    return Array.from({ length: 7 }, (_, i) => addDays(targetWeekStart, i));
  }, [weekOffset]);

  const isFutureWeek = weekOffset > 0;

  const getWeekLabel = () => {
    if (weekOffset === 0) return t.dashboard.thisWeek;
    if (weekOffset === 1) return t.dashboard.nextWeek;
    if (weekOffset === 2) return t.dashboard.weekAfterNext;
    return t.dashboard.thisWeek;
  };

  const getStateForCell = (habitId: string, date: Date): HabitState | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = entries.find((e) => e.date === dateStr);
    return entry?.habits[habitId];
  };

  const cycleState = (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const currentState = getStateForCell(habitId, date);
    const today = startOfDay(new Date());
    const isFutureDate = isBefore(today, startOfDay(date));

    if (isFutureDate) {
      // Future dates: toggle between planned and undefined
      const nextState: HabitState | undefined =
        currentState === 'planned' ? 'done' : // cycle: planned -> done (in case they want to clear)
        currentState === undefined ? 'planned' :
        'planned';
      if (currentState === 'planned') {
        // Remove the state by setting not-done temporarily, then we handle it
        // Actually let's just cycle: undefined -> planned -> undefined
        // We need a way to "unset". Let's use not-done as a clear for future
        setHabitState(dateStr, habitId, 'not-done');
      } else {
        setHabitState(dateStr, habitId, nextState);
      }
      return;
    }

    // Past/today: normal cycle
    const nextState: HabitState = 
      currentState === undefined ? 'done' :
      currentState === 'done' ? 'conscious-skip' :
      currentState === 'conscious-skip' ? 'not-done' :
      'done';
    
    setHabitState(dateStr, habitId, nextState);
  };

  const getCellStyle = (state: HabitState | undefined, isCurrentDay: boolean) => {
    const baseClasses = 'w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl transition-all duration-300 flex items-center justify-center text-[10px] sm:text-sm';
    
    if (state === 'done') {
      return `${baseClasses} bg-primary/30 border-2 border-primary/50`;
    }
    if (state === 'conscious-skip') {
      return `${baseClasses} bg-accent/30 border-2 border-accent/50`;
    }
    if (state === 'not-done') {
      return `${baseClasses} bg-secondary border-2 border-border/50`;
    }
    if (state === 'planned') {
      return `${baseClasses} bg-blue-500/20 border-2 border-blue-400/50`;
    }
    
    // Empty state
    if (isCurrentDay) {
      return `${baseClasses} bg-card border-2 border-primary/30 border-dashed`;
    }
    return `${baseClasses} bg-secondary/50 border-2 border-transparent`;
  };

  const getCellContent = (state: HabitState | undefined) => {
    if (state === 'done') return '✓';
    if (state === 'conscious-skip') return '🌱';
    if (state === 'not-done') return '○';
    if (state === 'planned') return '📌';
    return '';
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
          <span className="text-2xl">🌿</span>
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground mb-2">
          {t.habits.emptyTitle}
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          {t.habits.emptySubtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Week navigation */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
          disabled={weekOffset === 0}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-foreground min-w-[140px] text-center">
          {getWeekLabel()}
        </span>
        <button
          onClick={() => setWeekOffset(Math.min(2, weekOffset + 1))}
          disabled={weekOffset === 2}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="flex gap-1 sm:gap-2 justify-end pr-1">
        {weekDates.map((date, idx) => {
          const isCurrent = isToday(date);
          return (
            <div
              key={idx}
              className={`w-6 sm:w-10 text-center text-[9px] sm:text-xs font-medium ${
                isCurrent ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div>{DAYS[idx]}</div>
              <div className={`text-[8px] sm:text-[10px] ${isCurrent ? 'text-primary' : 'text-muted-foreground/60'}`}>
                {format(date, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Habit rows */}
      {habits.map((habit, habitIdx) => (
        <motion.div
          key={habit.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: habitIdx * 0.1 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Habit name and controls */}
            <button
              onClick={() => setActiveOptionsId(activeOptionsId === habit.id ? null : habit.id)}
              className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1 rounded-xl bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 transition-all px-2 py-1.5 cursor-pointer"
            >
              <span className="text-sm sm:text-lg flex-shrink-0">{habit.emoji || '🌱'}</span>
              <span className="text-[9px] sm:text-[13px] font-medium text-foreground truncate flex-1 leading-tight text-left">
                {habit.name}
              </span>
              <Search className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" />
            </button>

            {/* Day cells */}
            <div className="flex gap-1 sm:gap-2 flex-shrink-0 ml-auto">
              {weekDates.map((date, dateIdx) => {
                const state = getStateForCell(habit.id, date);
                const isCurrent = isToday(date);
                
                return (
                  <motion.button
                    key={dateIdx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => cycleState(habit.id, date)}
                    className={getCellStyle(state, isCurrent)}
                  >
                    {getCellContent(state)}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Options menu */}
          <AnimatePresence>
            {activeOptionsId === habit.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-8"
              >
                <HabitOptions 
                  habit={habit} 
                  onClose={() => setActiveOptionsId(null)} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-4 text-[10px] sm:text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-primary/30 border border-primary/50 flex items-center justify-center text-[8px] sm:text-[10px]">✓</div>
          <span>{t.habits.done}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-accent/30 border border-accent/50 flex items-center justify-center text-[8px] sm:text-[10px]">🌱</div>
          <span>{t.habits.skipped}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-secondary border border-border/50 flex items-center justify-center text-[8px] sm:text-[10px]">○</div>
          <span>{t.habits.notDone}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-[8px] sm:text-[10px]">📌</div>
          <span>{t.habits.planned}</span>
        </div>
      </div>
    </div>
  );
}
