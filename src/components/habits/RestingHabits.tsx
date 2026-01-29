import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { Habit } from '@/types/flownaut';
import { Moon, RefreshCw, ChevronDown } from 'lucide-react';

interface RestingHabitsProps {
  habits: Habit[];
}

export function RestingHabits({ habits }: RestingHabitsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wakeHabit = useFlowNautStore((s) => s.wakeHabit);

  if (habits.length === 0) return null;

  return (
    <div className="rounded-2xl bg-secondary/50 border border-border/30 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">
              Resting habits
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {habits.length}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-muted-foreground"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              <p className="text-xs text-muted-foreground mb-3">
                Some habits only accompany us for a while. You can wake them when you're ready.
              </p>
              {habits.map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg opacity-50">{habit.emoji || '🌱'}</span>
                    <span className="text-sm text-muted-foreground">{habit.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => wakeHabit(habit.id)}
                    className="text-xs"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Wake
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
