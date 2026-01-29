import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFlowNautStore } from '@/store/flownaut-store';
import { Plus, Leaf, Droplets, Moon, Heart, BookOpen, Dumbbell, Music, Coffee } from 'lucide-react';

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
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const addHabit = useFlowNautStore((s) => s.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addHabit(name.trim(), selectedEmoji);
    setName('');
    setSelectedEmoji('🌱');
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
                  What would you like to observe?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add something you'd like to pay attention to
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
                  placeholder="e.g., Morning walk, Journaling, Reading..."
                  className="h-14 text-lg rounded-xl bg-secondary border-border/50 focus:border-primary"
                  autoFocus
                />

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Maybe later
                  </Button>
                  <Button
                    type="submit"
                    disabled={!name.trim()}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
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
