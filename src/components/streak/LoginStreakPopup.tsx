import { motion } from 'framer-motion';
import { Flame, Trophy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';
import { useFlowNautStore } from '@/store/flownaut-store';

interface LoginStreakPopupProps {
  streak: number;
  onDismiss: () => void;
}

export function LoginStreakPopup({ streak, onDismiss }: LoginStreakPopupProps) {
  const t = useTranslations();
  const longestStreak = useFlowNautStore((s) => s.longestLoginStreak);
  const milestonesDisabled = useFlowNautStore((s) => s.milestonesDisabled);
  const setMilestonesDisabled = useFlowNautStore((s) => s.setMilestonesDisabled);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-card rounded-3xl border border-border/50 shadow-2xl p-8 max-w-sm w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 10 }}
          className="flex justify-center mb-5"
        >
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
            <Flame className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2 mb-6"
        >
          <h2 className="text-xl font-serif font-medium text-foreground">
            {t.streak.congratulations}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t.streak.milestone}
          </p>
          <p className="text-3xl font-bold text-primary">
            {streak} {t.streak.consecutiveDays}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-muted/50 rounded-2xl p-4 text-center">
            <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{streak}</p>
            <p className="text-xs text-muted-foreground">{t.streak.currentStreak}</p>
          </div>
          <div className="bg-muted/50 rounded-2xl p-4 text-center">
            <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">{t.streak.longestStreak}</p>
          </div>
        </motion.div>

        {/* Dismiss button */}
        <Button
          variant="gentle"
          className="w-full mb-4"
          onClick={onDismiss}
        >
          {t.streak.dismiss}
        </Button>

        {/* Disable milestones toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <Label htmlFor="disable-milestones" className="text-xs text-muted-foreground cursor-pointer">
            {t.streak.disableMilestones}
          </Label>
          <Switch
            id="disable-milestones"
            checked={milestonesDisabled}
            onCheckedChange={setMilestonesDisabled}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
