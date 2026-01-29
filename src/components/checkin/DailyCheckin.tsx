import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFlowNautStore } from '@/store/flownaut-store';
import { format } from 'date-fns';
import { Sun, Moon, Zap, Battery, Heart, Cloud } from 'lucide-react';

const MOOD_OPTIONS = [
  { value: 1, emoji: '😔', label: 'Heavy' },
  { value: 2, emoji: '😐', label: 'Low' },
  { value: 3, emoji: '🙂', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '✨', label: 'Bright' },
];

const ENERGY_OPTIONS = [
  { value: 1, icon: <Battery className="w-4 h-4" />, label: 'Depleted' },
  { value: 2, icon: <Cloud className="w-4 h-4" />, label: 'Low' },
  { value: 3, icon: <Heart className="w-4 h-4" />, label: 'Steady' },
  { value: 4, icon: <Sun className="w-4 h-4" />, label: 'Good' },
  { value: 5, icon: <Zap className="w-4 h-4" />, label: 'High' },
];

export function DailyCheckin() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const entry = useFlowNautStore((s) => s.getEntry(today));
  const setMood = useFlowNautStore((s) => s.setMood);
  const setEnergy = useFlowNautStore((s) => s.setEnergy);
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMoodSelect = (value: number) => {
    setMood(today, value);
  };

  const handleEnergySelect = (value: number) => {
    setEnergy(today, value);
  };

  return (
    <motion.div
      layout
      className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sun className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">How are you today?</h3>
            <p className="text-xs text-muted-foreground">
              {entry?.mood || entry?.energy ? 'Checked in' : 'Optional, just if you feel like it'}
            </p>
          </div>
        </div>
        
        {/* Quick indicator */}
        {(entry?.mood || entry?.energy) && !isExpanded && (
          <div className="flex items-center gap-2">
            {entry?.mood && (
              <span className="text-lg">{MOOD_OPTIONS.find(m => m.value === entry.mood)?.emoji}</span>
            )}
            {entry?.energy && (
              <div className="w-6 h-6 rounded-full bg-energy/20 flex items-center justify-center text-energy-foreground">
                {ENERGY_OPTIONS.find(e => e.value === entry.energy)?.icon}
              </div>
            )}
          </div>
        )}
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-muted-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>

      {/* Expanded content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4 space-y-5">
          {/* Mood selector */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Mood</label>
            <div className="flex justify-between gap-2">
              {MOOD_OPTIONS.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(option.value)}
                  className={`flex-1 py-3 rounded-xl text-xl transition-all duration-200 ${
                    entry?.mood === option.value
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary border-2 border-transparent hover:bg-secondary/80'
                  }`}
                  title={option.label}
                >
                  {option.emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Energy selector */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Energy</label>
            <div className="flex justify-between gap-2">
              {ENERGY_OPTIONS.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEnergySelect(option.value)}
                  className={`flex-1 py-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    entry?.energy === option.value
                      ? 'bg-energy/20 border-2 border-energy text-energy-foreground'
                      : 'bg-secondary border-2 border-transparent text-muted-foreground hover:bg-secondary/80'
                  }`}
                  title={option.label}
                >
                  {option.icon}
                </motion.button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground pt-2">
            No judgment – just noticing
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
