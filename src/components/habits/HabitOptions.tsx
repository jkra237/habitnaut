import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { Habit, HabitReminder } from '@/types/flownaut';
import { Moon, Trash2, X, Bell, BellOff } from 'lucide-react';
import { ReminderSettings } from './ReminderSettings';
import { useNotifications } from '@/hooks/use-notifications';
import { useTranslations } from '@/hooks/use-translations';

interface HabitOptionsProps {
  habit: Habit;
  onClose: () => void;
}

export function HabitOptions({ habit, onClose }: HabitOptionsProps) {
  const [showReminders, setShowReminders] = useState(false);
  const letHabitRest = useFlowNautStore((s) => s.letHabitRest);
  const deleteHabit = useFlowNautStore((s) => s.deleteHabit);
  const { enableReminder } = useNotifications();
  const t = useTranslations();

  const handleLetRest = () => {
    letHabitRest(habit.id, 'Taking a break for now');
    onClose();
  };

  const handleLetGo = () => {
    deleteHabit(habit.id);
    onClose();
  };

  const handleReminderUpdate = async (reminder: HabitReminder) => {
    await enableReminder(habit.id, reminder);
    setShowReminders(false);
  };

  return (
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
      
      {/* Habit info */}
      {habit.description && (
        <p className="text-sm text-muted-foreground">{habit.description}</p>
      )}

      <div className="flex gap-2 text-xs text-muted-foreground">
        {habit.timeAnchor !== 'none' && (
          <span className="px-2 py-1 rounded-md bg-secondary">
            {habit.timeAnchor}
          </span>
        )}
        {habit.softFrequency !== 'free' && (
          <span className="px-2 py-1 rounded-md bg-secondary">
            {habit.softFrequency === 'daily' ? 'Daily' : 'Few times/week'}
          </span>
        )}
      </div>
      
      <div className="border-t border-border/50 pt-3 space-y-2">
        {/* Reminder option */}
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setShowReminders(!showReminders)}
        >
          {habit.reminder?.enabled ? (
            <Bell className="w-4 h-4 mr-2 text-primary" />
          ) : (
            <BellOff className="w-4 h-4 mr-2" />
          )}
          {t.settings?.habits?.title || 'Reminders'}
          <span className="text-xs text-muted-foreground ml-auto">
            {habit.reminder?.enabled ? 'On' : 'Off'}
          </span>
        </Button>

        {/* Reminder settings panel */}
        <AnimatePresence>
          {showReminders && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-2"
            >
              <ReminderSettings
                reminder={habit.reminder || { frequency: 'none', timeAnchor: 'none', enabled: false }}
                habitName={habit.name}
                onUpdate={handleReminderUpdate}
                onClose={() => setShowReminders(false)}
              />
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
  );
}
