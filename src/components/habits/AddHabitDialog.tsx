import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFlowNautStore } from '@/store/flownaut-store';
import { Plus, CalendarClock, Clock } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { RoutineSelector } from './RoutineSelector';
import type { RoutineFrequency } from '@/types/flownaut';

const EMOJI_OPTIONS = [
  { emoji: '🌱' },
  { emoji: '💧' },
  { emoji: '🌙' },
  { emoji: '❤️' },
  { emoji: '📖' },
  { emoji: '💪' },
  { emoji: '🎵' },
  { emoji: '☕' },
];

interface AddHabitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddHabitDialog({ isOpen, onClose }: AddHabitDialogProps) {
  const t = useTranslations();
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [showRoutine, setShowRoutine] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [routineDays, setRoutineDays] = useState<number[]>([]);
  const [routineFrequency, setRoutineFrequency] = useState<RoutineFrequency>('weekly');
  const [routineMonthWeeks, setRoutineMonthWeeks] = useState<number[]>([1]);
  const addHabit = useFlowNautStore((s) => s.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addHabit({
      name: name.trim(),
      emoji: selectedEmoji,
      scheduledTime: scheduledTime || undefined,
      routineDays: routineDays.length > 0 ? routineDays : undefined,
      routineFrequency: routineDays.length > 0 ? routineFrequency : undefined,
      routineMonthWeek: routineDays.length > 0 && routineFrequency === 'monthly' ? routineMonthWeeks : undefined,
    });
    
    setName('');
    setSelectedEmoji('🌱');
    setShowRoutine(false);
    setShowTime(false);
    setScheduledTime('');
    setRoutineDays([]);
    setRoutineFrequency('weekly');
    setRoutineMonthWeeks([1]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-3xl shadow-elevated p-6 space-y-6 max-h-[80vh] overflow-y-auto w-full max-w-md">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-serif font-medium text-foreground">
                  {t.addHabitDialog.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.addHabitDialog.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Emoji selector */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {EMOJI_OPTIONS.map(({ emoji }) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-12 h-12 rounded-xl text-xl transition-all duration-200 ${
                        selectedEmoji === emoji
                          ? 'bg-primary/20 border-2 border-primary scale-110'
                          : 'bg-secondary border-2 border-transparent hover:bg-secondary/80'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Name input */}
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.addHabitDialog.namePlaceholder || 'Gewohnheit benennen'}
                  className="h-14 text-lg rounded-xl bg-secondary border-border/50 focus:border-primary"
                />

                {/* Routine toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowRoutine(!showRoutine)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      showRoutine ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <CalendarClock className="w-4 h-4" />
                    {t.addHabitDialog.routine}
                  </button>
                  
                  <AnimatePresence>
                    {showRoutine && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3">
                          <RoutineSelector
                            selectedDays={routineDays}
                            onDaysChange={setRoutineDays}
                            frequency={routineFrequency}
                            onFrequencyChange={setRoutineFrequency}
                            monthWeeks={routineMonthWeeks}
                            onMonthWeeksChange={setRoutineMonthWeeks}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowTime(!showTime)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      showTime ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {t.addHabitDialog.time || 'Time'}
                    {scheduledTime && (
                      <span className="text-xs text-primary ml-1">({scheduledTime})</span>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showTime && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 flex items-center gap-3">
                          <input
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="h-10 px-3 py-2 rounded-xl bg-secondary border border-border/50 text-foreground text-sm focus:border-primary focus:outline-none"
                          />
                          {scheduledTime && (
                            <button
                              type="button"
                              onClick={() => setScheduledTime('')}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {t.addHabitDialog.removeTime || 'Remove'}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="flex-1"
                  >
                    {t.addHabitDialog.maybeLater}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!name.trim()}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t.addHabitDialog.add}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
