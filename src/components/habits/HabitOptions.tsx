import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { Habit } from '@/types/flownaut';
import { Moon, MoreHorizontal, X } from 'lucide-react';

interface HabitOptionsProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
}

export function HabitOptions({ habit, isOpen, onClose }: HabitOptionsProps) {
  const letHabitRest = useFlowNautStore((s) => s.letHabitRest);

  const handleLetRest = () => {
    letHabitRest(habit.id, 'Taking a break for now');
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
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-4 inset-x-4 z-50 mx-auto max-w-sm"
          >
            <div className="bg-card rounded-2xl shadow-elevated p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{habit.emoji || '🌱'}</span>
                  <span className="font-medium text-foreground">{habit.name}</span>
                </div>
                <button onClick={onClose} className="text-muted-foreground p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="border-t border-border/50 pt-3 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLetRest}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Let rest
                  <span className="text-xs text-muted-foreground ml-auto">
                    Not delete – just pause
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
