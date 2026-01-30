import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { HabitState, HabitReminder } from '@/types/flownaut';
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { ReminderSettings } from './ReminderSettings';
import { HabitOptions } from './HabitOptions';
import { useNotifications } from '@/hooks/use-notifications';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslations } from '@/hooks/use-translations';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HabitMatrix() {
  const t = useTranslations();
  const [activeReminderId, setActiveReminderId] = useState<string | null>(null);
  const [activeOptionsId, setActiveOptionsId] = useState<string | null>(null);
  const [touchedHabitId, setTouchedHabitId] = useState<string | null>(null);
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const entries = useFlowNautStore((s) => s.entries);
  const setHabitState = useFlowNautStore((s) => s.setHabitState);
  const { enableReminder } = useNotifications();
  const isMobile = useIsMobile();

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

  const handleReminderUpdate = async (habitId: string, reminder: HabitReminder) => {
    await enableReminder(habitId, reminder);
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Habit name and controls */}
            <div className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl flex-shrink-0">{habit.emoji || '🌱'}</span>
              
              {/* Mobile: Tooltip on touch, Desktop: normal display */}
              {isMobile ? (
                <TooltipProvider delayDuration={0}>
                  <Tooltip open={touchedHabitId === habit.id}>
                    <TooltipTrigger asChild>
                      <span 
                        className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[60px] sm:max-w-none cursor-default"
                        onTouchStart={() => setTouchedHabitId(habit.id)}
                        onTouchEnd={() => setTimeout(() => setTouchedHabitId(null), 1500)}
                      >
                        {habit.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[200px]">
                      <p>{habit.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[60px] sm:max-w-none">
                  {habit.name}
                </span>
              )}

              {/* Options menu (now includes reminder option) */}
              <button
                onClick={() => setActiveOptionsId(activeOptionsId === habit.id ? null : habit.id)}
                className="p-1 sm:p-1.5 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary transition-all flex-shrink-0"
              >
                <MoreHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            {/* Day cells */}
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
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

          {/* Reminder settings panel */}
          <AnimatePresence>
            {activeReminderId === habit.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-8"
              >
                <ReminderSettings
                  reminder={habit.reminder || { frequency: 'none', timeAnchor: 'none', enabled: false }}
                  habitName={habit.name}
                  onUpdate={(reminder) => handleReminderUpdate(habit.id, reminder)}
                  onClose={() => setActiveReminderId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

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
      </div>
    </div>
  );
}
