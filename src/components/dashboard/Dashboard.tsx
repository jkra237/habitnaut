import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings as SettingsIcon, Leaf, Moon, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HabitMatrix } from '@/components/habits/HabitMatrix';
import { AddHabitDialog } from '@/components/habits/AddHabitDialog';
import { HabitLimitModal } from '@/components/habits/HabitLimitModal';
import { DailyCheckin } from '@/components/checkin/DailyCheckin';
import { InsightCard, DEMO_INSIGHTS } from '@/components/insights/InsightCard';
import { RestingHabits } from '@/components/habits/RestingHabits';
import { HabitTimeline } from '@/components/insights/HabitTimeline';
import { Settings } from '@/components/settings/Settings';
import { GratitudeJournal } from '@/components/gratitude/GratitudeJournal';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';

const FREE_HABIT_LIMIT = 5;

export function Dashboard() {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const allHabits = useFlowNautStore((s) => s.habits);
  const restingHabits = useFlowNautStore((s) => s.getRestingHabits());

  const handleAddHabitClick = () => {
    if (allHabits.length >= FREE_HABIT_LIMIT) {
      setIsLimitModalOpen(true);
    } else {
      setIsAddHabitOpen(true);
    }
  };
  const insights = useFlowNautStore((s) => s.insights);
  const addInsight = useFlowNautStore((s) => s.addInsight);
  const personality = useFlowNautStore((s) => s.personality);
  const t = useTranslations();

  // Add demo insights on first load if none exist
  useEffect(() => {
    if (insights.length === 0 && habits.length > 0) {
      DEMO_INSIGHTS.forEach((insight, i) => {
        setTimeout(() => addInsight(insight), i * 500);
      });
    }
  }, [habits.length]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.dashboard.greetingMorning;
    if (hour < 17) return t.dashboard.greetingAfternoon;
    return t.dashboard.greetingEvening;
  };

  const getFormattedDate = () => {
    const now = new Date();
    const dayIndex = now.getDay();
    const monthIndex = now.getMonth();
    const dayOfMonth = now.getDate();
    
    const weekdayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;
    
    const weekday = t.time.weekdays[weekdayKeys[dayIndex]];
    const month = t.time.months[monthKeys[monthIndex]];
    
    return `${weekday}, ${month} ${dayOfMonth}`;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-8 pb-6"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-serif font-medium text-foreground">
              {getGreeting()}
            </h1>
            <p className="text-muted-foreground text-sm">
              {getFormattedDate()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl"
              onClick={() => setIsSettingsOpen(true)}
            >
              <SettingsIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Personality hint */}
        {personality && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10"
          >
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {personality.rhythm === 'morning' ? (
                <>
                  <Leaf className="w-3.5 h-3.5 text-primary" />
                  <span>{t.dashboard.morningHint}</span>
                </>
              ) : personality.rhythm === 'evening' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-primary" />
                  <span>{t.dashboard.eveningHint}</span>
                </>
              ) : (
                <>
                  <Leaf className="w-3.5 h-3.5 text-primary" />
                  <span>{t.dashboard.flexibleHint}</span>
                </>
              )}
            </p>
          </motion.div>
        )}
      </motion.header>

      {/* Main content */}
      <main className="px-5 space-y-6">
        {/* Daily check-in */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DailyCheckin />
        </motion.section>

        {/* Habit Matrix */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/50 shadow-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-medium text-foreground">{t.dashboard.thisWeek}</h2>
            <Button
              variant="gentle"
              size="sm"
              onClick={handleAddHabitClick}
            >
              <Plus className="w-4 h-4 mr-1" />
              {t.dashboard.addHabit.split(' ')[0]}
            </Button>
          </div>
          <HabitMatrix />
        </motion.section>

        {/* Resting habits */}
        {restingHabits.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <RestingHabits habits={restingHabits} />
          </motion.section>
        )}

        {/* Timeline visualization */}
        {habits.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card rounded-2xl border border-border/50 shadow-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {t.dashboard.yourRhythm}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTimeline(!showTimeline)}
                className="text-xs"
              >
                {showTimeline ? t.dashboard.hideTimeline : t.dashboard.showTimeline}
              </Button>
            </div>
            <AnimatePresence>
              {showTimeline && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <HabitTimeline initialRange="month" />
                </motion.div>
              )}
            </AnimatePresence>
            {!showTimeline && (
              <p className="text-sm text-muted-foreground">
                {t.dashboard.yourRhythmDescription}
              </p>
            )}
          </motion.section>
        )}

        {/* Gratitude Journal */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <GratitudeJournal />
        </motion.section>

        {/* Insights */}
        {insights.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h2 className="font-serif font-medium text-foreground px-1">
              {t.dashboard.gentleObservations}
            </h2>
            {insights.slice(0, 3).map((insight, idx) => (
              <InsightCard key={insight.id} insight={insight} index={idx} />
            ))}
          </motion.section>
        )}

        {/* Empty state call to action */}
        {habits.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-8"
          >
            <Button
              variant="gentle"
              size="lg"
              onClick={handleAddHabitClick}
            >
              <Plus className="w-5 h-5 mr-2" />
              {t.dashboard.startObservingSomething}
            </Button>
          </motion.div>
        )}
      </main>

      {/* Add Habit Dialog */}
      <AddHabitDialog
        isOpen={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
      />

      {/* Habit Limit Modal */}
      <HabitLimitModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
      />

      {/* Settings */}
      <AnimatePresence>
        {isSettingsOpen && (
          <Settings onClose={() => setIsSettingsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
