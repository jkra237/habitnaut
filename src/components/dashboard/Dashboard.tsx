import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Plus, Settings as SettingsIcon, Leaf, Moon, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HabitMatrix } from '@/components/habits/HabitMatrix';
import { AddHabitDialog } from '@/components/habits/AddHabitDialog';
import { DailyCheckin } from '@/components/checkin/DailyCheckin';
import { InsightCard, DEMO_INSIGHTS } from '@/components/insights/InsightCard';
import { RestingHabits } from '@/components/habits/RestingHabits';
import { HabitTimeline } from '@/components/insights/HabitTimeline';
import { Settings } from '@/components/settings/Settings';
import { useFlowNautStore } from '@/store/flownaut-store';

export function Dashboard() {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const restingHabits = useFlowNautStore((s) => s.getRestingHabits());
  const insights = useFlowNautStore((s) => s.insights);
  const addInsight = useFlowNautStore((s) => s.addInsight);
  const personality = useFlowNautStore((s) => s.personality);

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
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
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
              {format(new Date(), 'EEEE, MMMM d')}
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
                  <span>Your mornings tend to be clearer – a good time for what matters.</span>
                </>
              ) : personality.rhythm === 'evening' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-primary" />
                  <span>You come alive as the day winds down – honor that rhythm.</span>
                </>
              ) : (
                <>
                  <Leaf className="w-3.5 h-3.5 text-primary" />
                  <span>Your rhythm flows with the day – stay curious about it.</span>
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
            <h2 className="font-serif font-medium text-foreground">This Week</h2>
            <Button
              variant="gentle"
              size="sm"
              onClick={() => setIsAddHabitOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
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
                Your Rhythm
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTimeline(!showTimeline)}
                className="text-xs"
              >
                {showTimeline ? 'Hide' : 'Show'} timeline
              </Button>
            </div>
            <AnimatePresence>
              {showTimeline && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <HabitTimeline daysToShow={30} />
                </motion.div>
              )}
            </AnimatePresence>
            {!showTimeline && (
              <p className="text-sm text-muted-foreground">
                See how your habits flow over time.
              </p>
            )}
          </motion.section>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h2 className="font-serif font-medium text-foreground px-1">
              Gentle Observations
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
              onClick={() => setIsAddHabitOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Start observing something
            </Button>
          </motion.div>
        )}
      </main>

      {/* Add Habit Dialog */}
      <AddHabitDialog
        isOpen={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
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
