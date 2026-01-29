import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { HabitState } from '@/types/flownaut';
import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HabitMatrix() {
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const entries = useFlowNautStore((s) => s.entries);
  const setHabitState = useFlowNautStore((s) => s.setHabitState);

  const weekDates = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, []);

  const getStateForCell = (habitId: string, date: Date): HabitState | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = entries.find((e) => e.date === dateStr);
    return entry?.habits[habitId];
  };

  const cycleState = (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const currentState = getStateForCell(habitId, date);
    
    const nextState: HabitState = 
      currentState === undefined ? 'done' :
      currentState === 'done' ? 'conscious-skip' :
      currentState === 'conscious-skip' ? 'not-done' :
      'done';
    
    setHabitState(dateStr, habitId, nextState);
  };

  const getCellStyle = (state: HabitState | undefined, isCurrentDay: boolean) => {
    const baseClasses = 'w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center text-sm';
    
    if (state === 'done') {
      return `${baseClasses} bg-primary/30 border-2 border-primary/50`;
    }
    if (state === 'conscious-skip') {
      return `${baseClasses} bg-accent/30 border-2 border-accent/50`;
    }
    if (state === 'not-done') {
      return `${baseClasses} bg-secondary border-2 border-border/50`;
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
    return '';
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
          <span className="text-2xl">🌿</span>
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground mb-2">
          Your observation space is empty
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Add something you'd like to observe – not to perfect, just to notice.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Day headers */}
      <div className="flex gap-2 justify-end pr-1">
        {weekDates.map((date, idx) => {
          const isCurrent = isToday(date);
          return (
            <div
              key={idx}
              className={`w-10 text-center text-xs font-medium ${
                isCurrent ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div>{DAYS[idx]}</div>
              <div className={`text-[10px] ${isCurrent ? 'text-primary' : 'text-muted-foreground/60'}`}>
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
          className="flex items-center gap-3"
        >
          {/* Habit name */}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="text-xl">{habit.emoji || '🌱'}</span>
            <span className="text-sm font-medium text-foreground truncate">
              {habit.name}
            </span>
          </div>

          {/* Day cells */}
          <div className="flex gap-2">
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
        </motion.div>
      ))}

      {/* Legend */}
      <div className="flex justify-center gap-6 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-primary/30 border border-primary/50 flex items-center justify-center text-[10px]">✓</div>
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-accent/30 border border-accent/50 flex items-center justify-center text-[10px]">🌱</div>
          <span>Consciously skipped</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-secondary border border-border/50 flex items-center justify-center text-[10px]">○</div>
          <span>Not done</span>
        </div>
      </div>
    </div>
  );
}
