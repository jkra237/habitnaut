import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { Habit, RoutineFrequency } from '@/types/flownaut';
import { Moon, Trash2, X, Info, CalendarClock, CalendarX } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { SingleHabitStatsDialog } from './SingleHabitStatsDialog';
import { RoutineSelector } from './RoutineSelector';

interface HabitOptionsProps {
  habit: Habit;
  onClose: () => void;
}

export function HabitOptions({ habit, onClose }: HabitOptionsProps) {
  const letHabitRest = useFlowNautStore((s) => s.letHabitRest);
  const deleteHabit = useFlowNautStore((s) => s.deleteHabit);
  const updateHabitRoutine = useFlowNautStore((s) => s.updateHabitRoutine);
  const t = useTranslations();
  const [showStats, setShowStats] = useState(false);
  const [showRoutineEdit, setShowRoutineEdit] = useState(false);
  const [routineDays, setRoutineDays] = useState<number[]>(habit.routineDays || []);
  const [routineFrequency, setRoutineFrequency] = useState<RoutineFrequency>(habit.routineFrequency || 'weekly');
  const [routineMonthWeeks, setRoutineMonthWeeks] = useState<number[]>(
    habit.routineMonthWeek 
      ? (Array.isArray(habit.routineMonthWeek) ? habit.routineMonthWeek : [habit.routineMonthWeek])
      : [1]
  );

  const hasRoutine = habit.routineDays && habit.routineDays.length > 0;

  const handleLetRest = () => {
    letHabitRest(habit.id, 'Taking a break for now');
    onClose();
  };

  const handleLetGo = () => {
    deleteHabit(habit.id);
    onClose();
  };

  const handleSaveRoutine = () => {
    updateHabitRoutine(
      habit.id,
      routineDays.length > 0 ? routineDays : undefined,
      routineDays.length > 0 ? routineFrequency : undefined,
      routineDays.length > 0 && routineFrequency === 'monthly' ? routineMonthWeeks : undefined
    );
    setShowRoutineEdit(false);
  };

  const handleRemoveRoutine = () => {
    updateHabitRoutine(habit.id, undefined, undefined, undefined);
    setRoutineDays([]);
    setShowRoutineEdit(false);
  };

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card rounded-xl border border-border shadow-soft p-4 space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{habit.emoji || '🌱'}</span>
            <span className="font-medium text-foreground">{habit.name}</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-muted-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {habit.description && (
          <p className="text-sm text-muted-foreground">{habit.description}</p>
        )}

        {/* Routine badge */}
        {hasRoutine && !showRoutineEdit && (
          <div className="flex items-center gap-1.5 text-xs text-primary">
            <CalendarClock className="w-3.5 h-3.5" />
            <span>
              {t.addHabitDialog.routineActive}: {habit.routineDays!.map(d => t.addHabitDialog.weekdays[d]).join(', ')}{' '}
              ({habit.routineFrequency === 'monthly'
                ? `${t.addHabitDialog.routineMonthly}, ${
                    (Array.isArray(habit.routineMonthWeek) ? habit.routineMonthWeek : [habit.routineMonthWeek || 1])
                      .map(w => t.addHabitDialog.routineMonthWeeks[w - 1]).join(', ')
                  }` 
                : t.addHabitDialog.routineWeekly})
            </span>
          </div>
        )}

        <div className="flex gap-2 text-xs text-muted-foreground">
          {habit.timeAnchor !== 'none' && (
            <span className="px-2 py-1 rounded-md bg-secondary">
              {habit.timeAnchor === 'morning' ? t.reminders?.morning :
               habit.timeAnchor === 'midday' ? t.reminders?.midday :
               habit.timeAnchor === 'evening' ? t.reminders?.evening : habit.timeAnchor}
            </span>
          )}
          {habit.softFrequency !== 'free' && (
            <span className="px-2 py-1 rounded-md bg-secondary">
              {habit.softFrequency === 'daily' ? t.reminders?.daily : t.reminders?.fewTimesWeek}
            </span>
          )}
        </div>
        
        <div className="border-t border-border/50 pt-3 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setShowStats(!showStats)}
          >
            <Info className="w-4 h-4 mr-2" />
            {t.habits?.stats || 'Statistics'}
            <span className="text-xs text-muted-foreground ml-auto">
              {t.habits?.statsSubtitle || 'Individual insights'}
            </span>
          </Button>

          {/* Routine edit/add button - with "Optional" subtitle like other buttons */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setShowRoutineEdit(!showRoutineEdit)}
          >
            <CalendarClock className="w-4 h-4 mr-2" />
            {hasRoutine ? t.addHabitDialog.editRoutine : 'Routine'}
            <span className="text-xs text-muted-foreground ml-auto">
              {t.addHabitDialog.routineOptional}
            </span>
          </Button>

          {/* Routine editor */}
          <AnimatePresence>
            {showRoutineEdit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-secondary/50 rounded-lg space-y-3">
                  <RoutineSelector
                    selectedDays={routineDays}
                    onDaysChange={setRoutineDays}
                    frequency={routineFrequency}
                    onFrequencyChange={setRoutineFrequency}
                    monthWeeks={routineMonthWeeks}
                    onMonthWeeksChange={setRoutineMonthWeeks}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" onClick={handleSaveRoutine} className="flex-1">
                      {t.common.save}
                    </Button>
                    {hasRoutine && (
                      <Button size="sm" variant="ghost" onClick={handleRemoveRoutine} className="text-muted-foreground">
                        <CalendarX className="w-4 h-4 mr-1" />
                        {t.addHabitDialog.removeRoutine}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLetRest}
          >
            <Moon className="w-4 h-4 mr-2" />
            {t.habits?.letRest || 'Let rest'}
            <span className="text-xs text-muted-foreground ml-auto">
              {t.habits?.letRestSubtitle || 'Pause gently'}
            </span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLetGo}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {t.habits?.letGo || 'Let go'}
            <span className="text-xs text-muted-foreground ml-auto">
              {t.habits?.letGoSubtitle || 'Release completely'}
            </span>
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showStats && (
          <SingleHabitStatsDialog habit={habit} onClose={() => setShowStats(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
