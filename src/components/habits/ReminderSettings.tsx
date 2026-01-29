import { motion } from 'framer-motion';
import { Bell, BellOff, Sun, Cloud, Moon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HabitReminder, TimeAnchor, ReminderFrequency } from '@/types/flownaut';
import { REMINDER_INVITATION, getRandomReminderCopy } from '@/lib/reminder-copy';

interface ReminderSettingsProps {
  reminder: HabitReminder;
  habitName: string;
  onUpdate: (reminder: HabitReminder) => void;
  onClose: () => void;
}

const TIME_ANCHORS: { value: TimeAnchor; label: string; icon: React.ReactNode }[] = [
  { value: 'morning', label: 'Morning', icon: <Sun className="w-4 h-4" /> },
  { value: 'midday', label: 'Midday', icon: <Cloud className="w-4 h-4" /> },
  { value: 'evening', label: 'Evening', icon: <Moon className="w-4 h-4" /> },
];

const FREQUENCIES: { value: ReminderFrequency; label: string }[] = [
  { value: 'none', label: 'Off' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

export function ReminderSettings({ reminder, habitName, onUpdate, onClose }: ReminderSettingsProps) {
  const previewCopy = reminder.frequency !== 'none' 
    ? getRandomReminderCopy({ habitName, frequency: reminder.frequency })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-card border border-border rounded-2xl shadow-elevated p-5 space-y-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {reminder.enabled ? (
            <Bell className="w-5 h-5 text-primary" />
          ) : (
            <BellOff className="w-5 h-5 text-muted-foreground" />
          )}
          <h3 className="font-medium text-foreground">Gentle Reminder</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        {REMINDER_INVITATION.note}
      </p>

      {/* Frequency selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Frequency</label>
        <div className="flex gap-2">
          {FREQUENCIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onUpdate({ 
                ...reminder, 
                frequency: value, 
                enabled: value !== 'none' 
              })}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                reminder.frequency === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Time anchor selection - only show when frequency is set */}
      {reminder.frequency !== 'none' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">When</label>
          <div className="flex gap-2">
            {TIME_ANCHORS.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => onUpdate({ ...reminder, timeAnchor: value })}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  reminder.timeAnchor === value
                    ? 'bg-primary/20 text-primary border-2 border-primary/50'
                    : 'bg-secondary text-foreground hover:bg-secondary/80 border-2 border-transparent'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Preview */}
      {previewCopy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-xl bg-secondary/50 border border-border/50"
        >
          <p className="text-xs text-muted-foreground mb-1">Preview:</p>
          <p className="text-sm text-foreground italic">"{previewCopy}"</p>
        </motion.div>
      )}

      <Button
        onClick={onClose}
        className="w-full"
        variant="gentle"
      >
        Done
      </Button>
    </motion.div>
  );
}
