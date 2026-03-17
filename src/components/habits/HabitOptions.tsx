import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { Habit, RoutineFrequency } from '@/types/flownaut';
import { Moon, Trash2, X, Info, CalendarClock, CalendarX, Clock, Bell, BellOff } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { SingleHabitStatsDialog } from './SingleHabitStatsDialog';
import { RoutineSelector } from './RoutineSelector';
import { requestNotificationPermission } from '@/hooks/use-habit-notifications';

interface HabitOptionsProps {
  habit: Habit;
  onClose: () => void;
}

export function HabitOptions({ habit, onClose }: HabitOptionsProps) {
  const letHabitRest = useFlowNautStore((s) => s.letHabitRest);
  const deleteHabit = useFlowNautStore((s) => s.deleteHabit);
  const updateHabitRoutine = useFlowNautStore((s) => s.updateHabitRoutine);
  const updateHabitTime = useFlowNautStore((s) => s.updateHabitTime);
  const toggleHabitNotification = useFlowNautStore((s) => s.toggleHabitNotification);
  const t = useTranslations();
  const [showStats, setShowStats] = useState(false);
  const [showRoutineEdit, setShowRoutineEdit] = useState(false);
  const [showTimeEdit, setShowTimeEdit] = useState(false);
  const [editTime, setEditTime] = useState(habit.scheduledTime || '');
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

        {/* Time badge */}
        {habit.scheduledTime && !showTimeEdit && (
          <div className="flex items-center gap-1.5 text-xs text-primary">
            <Clock className="w-3.5 h-3.5" />
            <span>{habit.scheduledTime}</span>
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

          {/* Time edit/add button */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setShowTimeEdit(!showTimeEdit)}
          >
            <Clock className="w-4 h-4 mr-2" />
            {habit.scheduledTime ? (t.addHabitDialog.editTime || 'Edit time') : (t.addHabitDialog.time || 'Time')}
            <span className="text-xs text-muted-foreground ml-auto">
              {t.addHabitDialog.timeOptional || 'Optional'}
            </span>
          </Button>

          {/* Time editor */}
          <AnimatePresence>
            {showTimeEdit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-secondary/50 rounded-lg space-y-3">
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="h-10 px-3 py-2 rounded-xl bg-background border border-border/50 text-foreground text-sm focus:border-primary focus:outline-none w-full"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" onClick={() => { updateHabitTime(habit.id, editTime || undefined); setShowTimeEdit(false); }} className="flex-1">
                      {t.common.save}
                    </Button>
                    {habit.scheduledTime && (
                      <Button size="sm" variant="ghost" onClick={() => { updateHabitTime(habit.id, undefined); setEditTime(''); setShowTimeEdit(false); }} className="text-muted-foreground">
                        {t.addHabitDialog.removeTime || 'Remove'}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification toggle - only when scheduledTime is set */}
          {habit.scheduledTime && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={async () => {
                if (!habit.notificationEnabled) {
                  const granted = await requestNotificationPermission();
                  if (!granted) return;
                }
                toggleHabitNotification(habit.id);
              }}
            >
              {habit.notificationEnabled ? (
                <Bell className="w-4 h-4 mr-2 text-primary" />
              ) : (
                <BellOff className="w-4 h-4 mr-2" />
              )}
              {habit.notificationEnabled 
                ? (t.habits?.notificationOn || 'Notification active')
                : (t.habits?.notificationOff || 'Enable notification')
              }
              <span className="text-xs text-muted-foreground ml-auto">
                {habit.scheduledTime}
              </span>
            </Button>
          )}

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
