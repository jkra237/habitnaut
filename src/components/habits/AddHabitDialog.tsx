import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFlowNautStore } from '@/store/flownaut-store';
import { Plus, Leaf, Droplets, Moon, Heart, BookOpen, Dumbbell, Music, Coffee, Sun, Cloud, ChevronDown, ChevronUp } from 'lucide-react';
import type { TimeAnchor, SoftFrequency } from '@/types/flownaut';
import { useTranslations } from '@/hooks/use-translations';

/**
 * Suggest a time anchor based on habit name heuristics.
 */
function suggestTimeAnchor(habitName: string): TimeAnchor {
  const lowerName = habitName.toLowerCase();
  
  if (lowerName.includes('morning') || lowerName.includes('sunrise') || lowerName.includes('wake')) {
    return 'morning';
  }
  if (lowerName.includes('evening') || lowerName.includes('night') || lowerName.includes('wind-down') || lowerName.includes('reflection')) {
    return 'evening';
  }
  if (lowerName.includes('lunch') || lowerName.includes('midday') || lowerName.includes('afternoon')) {
    return 'midday';
  }
  
  return 'none';
}

const EMOJI_OPTIONS = [
  { emoji: '🌱', icon: <Leaf className="w-4 h-4" /> },
  { emoji: '💧', icon: <Droplets className="w-4 h-4" /> },
  { emoji: '🌙', icon: <Moon className="w-4 h-4" /> },
  { emoji: '❤️', icon: <Heart className="w-4 h-4" /> },
  { emoji: '📖', icon: <BookOpen className="w-4 h-4" /> },
  { emoji: '💪', icon: <Dumbbell className="w-4 h-4" /> },
  { emoji: '🎵', icon: <Music className="w-4 h-4" /> },
  { emoji: '☕', icon: <Coffee className="w-4 h-4" /> },
];

interface AddHabitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddHabitDialog({ isOpen, onClose }: AddHabitDialogProps) {
  const t = useTranslations();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [timeAnchor, setTimeAnchor] = useState<TimeAnchor>('none');
  const [softFrequency, setSoftFrequency] = useState<SoftFrequency>('free');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const addHabit = useFlowNautStore((s) => s.addHabit);

  const TIME_ANCHORS: { value: TimeAnchor; labelKey: keyof typeof t.addHabitDialog; icon: React.ReactNode }[] = [
    { value: 'none', labelKey: 'anytime', icon: null },
    { value: 'morning', labelKey: 'morning', icon: <Sun className="w-3.5 h-3.5" /> },
    { value: 'midday', labelKey: 'midday', icon: <Cloud className="w-3.5 h-3.5" /> },
    { value: 'evening', labelKey: 'evening', icon: <Moon className="w-3.5 h-3.5" /> },
  ];

  const FREQUENCIES: { value: SoftFrequency; labelKey: keyof typeof t.addHabitDialog }[] = [
    { value: 'free', labelKey: 'whenItFits' },
    { value: 'daily', labelKey: 'daily' },
    { value: 'few-times-week', labelKey: 'fewTimesWeek' },
  ];

  const handleNameChange = (value: string) => {
    setName(value);
    // Auto-suggest time anchor based on habit name
    const suggested = suggestTimeAnchor(value);
    if (suggested !== 'none' && timeAnchor === 'none') {
      setTimeAnchor(suggested);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addHabit({
      name: name.trim(),
      emoji: selectedEmoji,
      description: description.trim() || undefined,
      timeAnchor,
      softFrequency,
    });
    
    // Reset form
    setName('');
    setDescription('');
    setSelectedEmoji('🌱');
    setTimeAnchor('none');
    setSoftFrequency('free');
    setShowAdvanced(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-x-4 top-1/3 -translate-y-1/2 z-50 mx-auto max-w-md"
          >
            <div className="bg-card rounded-3xl shadow-elevated p-6 space-y-6">
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
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder={t.addHabitDialog.placeholder}
                  className="h-14 text-lg rounded-xl bg-secondary border-border/50 focus:border-primary"
                  autoFocus
                />

                {/* Advanced options toggle */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showAdvanced ? (
                    <>{t.addHabitDialog.lessOptions} <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>{t.addHabitDialog.moreOptions} <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>

                {/* Advanced options */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {/* Description */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">
                          {t.addHabitDialog.descriptionLabel}
                        </label>
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder={t.addHabitDialog.descriptionPlaceholder}
                          className="min-h-[60px] text-sm rounded-xl bg-secondary border-border/50 focus:border-primary resize-none"
                        />
                      </div>

                      {/* Time anchor */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">
                          {t.addHabitDialog.timeOfDay}
                        </label>
                        <div className="flex gap-1.5">
                          {TIME_ANCHORS.map(({ value, labelKey, icon }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setTimeAnchor(value)}
                              className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                timeAnchor === value
                                  ? 'bg-primary/20 text-primary border border-primary/30'
                                  : 'bg-secondary text-muted-foreground hover:text-foreground border border-transparent'
                              }`}
                            >
                              {icon}
                              {t.addHabitDialog[labelKey]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Soft frequency */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">
                          {t.addHabitDialog.howOften}
                        </label>
                        <div className="flex gap-1.5">
                          {FREQUENCIES.map(({ value, labelKey }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setSoftFrequency(value)}
                              className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                                softFrequency === value
                                  ? 'bg-primary/20 text-primary border border-primary/30'
                                  : 'bg-secondary text-muted-foreground hover:text-foreground border border-transparent'
                              }`}
                            >
                              {t.addHabitDialog[labelKey]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        {t.addHabitDialog.canChangeAnytime}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

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