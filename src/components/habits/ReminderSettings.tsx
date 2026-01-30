import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, Sun, Cloud, Moon, X, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { HabitReminder, TimeAnchor, ReminderFrequency } from '@/types/flownaut';
import { REMINDER_INVITATION, getRandomReminderCopy } from '@/lib/reminder-copy';
import { useNotifications } from '@/hooks/use-notifications';
import { useTranslations } from '@/hooks/use-translations';

interface ReminderSettingsProps {
  reminder: HabitReminder;
  habitName: string;
  onUpdate: (reminder: HabitReminder) => void;
  onClose: () => void;
}

type TimeAnchorOption = TimeAnchor | 'custom';

const TIME_ANCHOR_ICONS: Record<TimeAnchorOption, React.ReactNode> = {
  morning: <Sun className="w-4 h-4" />,
  midday: <Cloud className="w-4 h-4" />,
  evening: <Moon className="w-4 h-4" />,
  none: <Clock className="w-4 h-4" />,
  custom: <Clock className="w-4 h-4" />,
};

export const ReminderSettings = forwardRef<HTMLDivElement, ReminderSettingsProps>(
  function ReminderSettings({ reminder, habitName, onUpdate, onClose }, ref) {
    const { permission, isSupported, testNotification } = useNotifications();
    const [testSent, setTestSent] = useState(false);
    const [showCustomTime, setShowCustomTime] = useState(!!reminder.customTime);
    const [customTimeValue, setCustomTimeValue] = useState(reminder.customTime || '09:00');
    const t = useTranslations();

    const timeAnchors: { value: TimeAnchorOption; labelKey: keyof typeof t.reminders }[] = [
      { value: 'morning', labelKey: 'morning' },
      { value: 'midday', labelKey: 'midday' },
      { value: 'evening', labelKey: 'evening' },
      { value: 'custom', labelKey: 'custom' },
    ];

    const frequencies: { value: ReminderFrequency; labelKey: keyof typeof t.reminders }[] = [
      { value: 'none', labelKey: 'off' },
      { value: 'daily', labelKey: 'daily' },
      { value: 'weekly', labelKey: 'weekly' },
    ];

    const previewCopy = reminder.frequency !== 'none' 
      ? getRandomReminderCopy({ habitName, frequency: reminder.frequency })
      : null;

    const handleTestNotification = async () => {
      const success = await testNotification();
      if (success) {
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3000);
      }
    };

    const handleTimeAnchorSelect = (value: TimeAnchorOption) => {
      if (value === 'custom') {
        setShowCustomTime(true);
        onUpdate({ 
          ...reminder, 
          timeAnchor: 'none',
          customTime: customTimeValue 
        });
      } else {
        setShowCustomTime(false);
        onUpdate({ 
          ...reminder, 
          timeAnchor: value,
          customTime: undefined 
        });
      }
    };

    const handleCustomTimeChange = (time: string) => {
      setCustomTimeValue(time);
      onUpdate({ 
        ...reminder, 
        timeAnchor: 'none',
        customTime: time 
      });
    };

    const getCurrentTimeSelection = (): TimeAnchorOption => {
      if (showCustomTime || reminder.customTime) return 'custom';
      return reminder.timeAnchor || 'morning';
    };

    return (
      <motion.div
        ref={ref}
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
            <h3 className="font-medium text-foreground">{t.reminders.gentleReminder}</h3>
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
          <label className="text-sm font-medium text-foreground">{t.reminders.frequency}</label>
          <div className="flex gap-2">
            {frequencies.map(({ value, labelKey }) => (
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
                {t.reminders[labelKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Time selection - only show when frequency is set */}
        {reminder.frequency !== 'none' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <label className="text-sm font-medium text-foreground">{t.reminders.when}</label>
            <div className="grid grid-cols-4 gap-2">
              {timeAnchors.map(({ value, labelKey }) => (
                <button
                  key={value}
                  onClick={() => handleTimeAnchorSelect(value)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                    getCurrentTimeSelection() === value
                      ? 'bg-primary/20 text-primary border-2 border-primary/50'
                      : 'bg-secondary text-foreground hover:bg-secondary/80 border-2 border-transparent'
                  }`}
                >
                  {TIME_ANCHOR_ICONS[value]}
                  {t.reminders[labelKey]}
                </button>
              ))}
            </div>

            {/* Custom time input */}
            {showCustomTime && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <label className="text-sm text-muted-foreground">{t.reminders.customTimeLabel}</label>
                <Input
                  type="time"
                  value={customTimeValue}
                  onChange={(e) => handleCustomTimeChange(e.target.value)}
                  className="w-full bg-secondary border-border text-center text-lg font-medium"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Notification permission status */}
        {reminder.frequency !== 'none' && isSupported && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {permission === 'denied' && (
              <div className="p-3 rounded-xl bg-accent/20 border border-accent/30 text-sm text-foreground">
                <p>{t.reminders.permissionDenied}</p>
              </div>
            )}
            
            {permission === 'pending' && (
              <div className="p-3 rounded-xl bg-secondary border border-border text-sm text-muted-foreground">
                <p>{t.reminders.permissionPending}</p>
              </div>
            )}

            {permission === 'granted' && (
              <button
                onClick={handleTestNotification}
                disabled={testSent}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {testSent ? t.reminders.testSent : t.reminders.testNotification}
              </button>
            )}
          </motion.div>
        )}

        {/* Preview */}
        {previewCopy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-xl bg-secondary/50 border border-border/50"
          >
            <p className="text-xs text-muted-foreground mb-1">{t.reminders.preview}:</p>
            <p className="text-sm text-foreground italic">"{previewCopy}"</p>
          </motion.div>
        )}

        <Button
          onClick={onClose}
          className="w-full"
          variant="gentle"
        >
          {t.common.done}
        </Button>
      </motion.div>
    );
  }
);
