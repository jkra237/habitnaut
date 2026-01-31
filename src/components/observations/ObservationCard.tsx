// Observation Card Component
// Displays a single gentle observation in a dismissible card

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';
import { useObservations } from '@/hooks/use-observations';
import { useTranslations } from '@/hooks/use-translations';

interface ObservationCardProps {
  className?: string;
}

export function ObservationCard({ className = '' }: ObservationCardProps) {
  const { getCurrentObservation, dismissObservation } = useObservations();
  const t = useTranslations();
  const [observation, setObservation] = useState<ReturnType<typeof getCurrentObservation>>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check for observation on mount
    const obs = getCurrentObservation();
    setObservation(obs);
  }, [getCurrentObservation]);

  const handleDismiss = () => {
    if (observation) {
      dismissObservation(observation.observation.id, observation.habitId);
      setIsDismissed(true);
    }
  };

  // Don't render if no observation or dismissed
  if (!observation || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative overflow-hidden rounded-2xl border border-awareness/30 bg-gradient-to-br from-awareness/10 via-awareness/5 to-transparent p-5 ${className}`}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-awareness rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-calm rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative flex gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-awareness/20 flex items-center justify-center">
            <Eye className="w-5 h-5 text-awareness-foreground" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 pr-8">
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {observation.text}
            </p>
            {observation.habitName && (
              <p className="mt-1.5 text-xs text-muted-foreground opacity-70">
                {observation.habitName}
              </p>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1.5 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-background/50 transition-colors"
            aria-label="Dismiss observation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-awareness/20 to-transparent" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
            {t.dashboard.gentleObservations}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-awareness/20 to-transparent" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
