import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { PersonalityProfile, OnboardingAnswer } from '@/types/flownaut';
import { Leaf, Moon, Sun, Zap, Heart, Compass, Check } from 'lucide-react';
import { suggestTimeAnchor } from '@/lib/reminder-copy';

interface RecommendedHabit {
  id: string;
  name: string;
  emoji: string;
  reason: string;
}

const getRecommendedHabits = (personality: PersonalityProfile): RecommendedHabit[] => {
  const habits: RecommendedHabit[] = [];

  // Based on rhythm
  if (personality.rhythm === 'morning') {
    habits.push({ id: 'morning-pages', name: 'Morning pages', emoji: '📝', reason: 'Aligns with your morning clarity' });
    habits.push({ id: 'sunrise-walk', name: 'Sunrise walk', emoji: '🌅', reason: 'Captures your peak energy time' });
    habits.push({ id: 'morning-stretch', name: 'Morning stretch', emoji: '🧘', reason: 'Gentle start to your day' });
  } else if (personality.rhythm === 'evening') {
    habits.push({ id: 'evening-reflection', name: 'Evening reflection', emoji: '🌙', reason: 'Honors your contemplative nights' });
    habits.push({ id: 'wind-down', name: 'Wind-down ritual', emoji: '🕯️', reason: 'Supports your evening rhythm' });
    habits.push({ id: 'night-reading', name: 'Night reading', emoji: '📚', reason: 'Feeds your nocturnal mind' });
  } else {
    habits.push({ id: 'mindful-pause', name: 'Mindful pause', emoji: '🧘', reason: 'Fits your flexible rhythm' });
    habits.push({ id: 'flow-check', name: 'Flow check-in', emoji: '🌊', reason: 'Honors your natural timing' });
  }

  // Based on energy
  if (personality.energy === 'steady') {
    habits.push({ id: 'daily-movement', name: 'Daily movement', emoji: '🚶', reason: 'Maintains your steady flow' });
    habits.push({ id: 'consistent-routine', name: 'Anchor routine', emoji: '⚓', reason: 'Supports your steady nature' });
  } else if (personality.energy === 'bursts') {
    habits.push({ id: 'creative-sprint', name: 'Creative sprint', emoji: '⚡', reason: 'Channels your burst energy' });
    habits.push({ id: 'rest-ritual', name: 'Rest ritual', emoji: '☁️', reason: 'Balances your intensity' });
    habits.push({ id: 'power-break', name: 'Power break', emoji: '💪', reason: 'Recharge between bursts' });
  } else {
    habits.push({ id: 'energy-check', name: 'Energy check-in', emoji: '🌊', reason: 'Honors your natural waves' });
    habits.push({ id: 'ride-the-wave', name: 'Ride the wave', emoji: '🏄', reason: 'Work with your flow' });
  }

  // Based on motivation
  if (personality.motivation === 'internal') {
    habits.push({ id: 'gratitude', name: 'Gratitude moment', emoji: '💚', reason: 'Nurtures your inner compass' });
    habits.push({ id: 'values-check', name: 'Values check-in', emoji: '🧭', reason: 'Reconnects with what matters' });
  } else if (personality.motivation === 'external') {
    habits.push({ id: 'progress-note', name: 'Progress note', emoji: '📊', reason: 'Celebrates visible growth' });
    habits.push({ id: 'share-learning', name: 'Share a learning', emoji: '💬', reason: 'Connects with others' });
  } else {
    habits.push({ id: 'intention-setting', name: 'Set an intention', emoji: '🎯', reason: 'Bridges inner and outer goals' });
  }

  // Based on approach
  if (personality.approach === 'structured') {
    habits.push({ id: 'plan-tomorrow', name: 'Plan tomorrow', emoji: '📋', reason: 'Supports your love of structure' });
    habits.push({ id: 'weekly-review', name: 'Weekly review', emoji: '📅', reason: 'Creates clarity and order' });
  } else if (personality.approach === 'spontaneous') {
    habits.push({ id: 'follow-curiosity', name: 'Follow curiosity', emoji: '✨', reason: 'Celebrates your spontaneity' });
    habits.push({ id: 'surprise-self', name: 'Surprise yourself', emoji: '🎲', reason: 'Keeps things fresh' });
  } else {
    habits.push({ id: 'flexible-focus', name: 'One focus thing', emoji: '🌿', reason: 'Adapts to your day' });
  }

  // Based on focus
  if (personality.focus === 'deep') {
    habits.push({ id: 'deep-work', name: 'Deep work block', emoji: '🎯', reason: 'Protects your focus time' });
    habits.push({ id: 'single-task', name: 'Single-tasking', emoji: '🔬', reason: 'Honors your depth' });
  } else if (personality.focus === 'varied') {
    habits.push({ id: 'task-variety', name: 'Mix it up', emoji: '🎨', reason: 'Feeds your varied interests' });
  }

  // Based on recovery
  if (personality.recovery === 'solitude') {
    habits.push({ id: 'quiet-time', name: 'Quiet time', emoji: '🤫', reason: 'Restores your energy' });
    habits.push({ id: 'nature-moment', name: 'Nature moment', emoji: '🌲', reason: 'Peaceful recharge' });
  } else if (personality.recovery === 'social') {
    habits.push({ id: 'connect-someone', name: 'Connect with someone', emoji: '👋', reason: 'Energizes through others' });
  }

  // Based on pace
  if (personality.pace === 'slow') {
    habits.push({ id: 'slow-morning', name: 'Slow morning', emoji: '🐌', reason: 'Honors your natural pace' });
  } else if (personality.pace === 'fast') {
    habits.push({ id: 'quick-wins', name: 'Quick wins', emoji: '🚀', reason: 'Matches your momentum' });
  }

  // Return top 8 unique habits (more options)
  const uniqueHabits = habits.filter((habit, index, self) => 
    index === self.findIndex((h) => h.id === habit.id)
  );
  return uniqueHabits.slice(0, 8);
};

interface Question {
  id: string;
  question: string;
  optionA: { text: string; icon: React.ReactNode };
  optionB: { text: string; icon: React.ReactNode };
  axis: keyof PersonalityProfile | 'tone';
  aValue: string;
  bValue: string;
}

const questions: Question[] = [
  {
    id: 'rhythm',
    question: 'When do you feel most alive?',
    optionA: { text: 'In the quiet morning hours', icon: <Sun className="w-5 h-5" /> },
    optionB: { text: 'When the world slows down at night', icon: <Moon className="w-5 h-5" /> },
    axis: 'rhythm',
    aValue: 'morning',
    bValue: 'evening',
  },
  {
    id: 'energy',
    question: 'How does your energy usually flow?',
    optionA: { text: 'Steady and consistent throughout', icon: <Leaf className="w-5 h-5" /> },
    optionB: { text: 'In waves and bursts of intensity', icon: <Zap className="w-5 h-5" /> },
    axis: 'energy',
    aValue: 'steady',
    bValue: 'bursts',
  },
  {
    id: 'motivation',
    question: 'What moves you forward?',
    optionA: { text: 'An inner sense of what matters', icon: <Heart className="w-5 h-5" /> },
    optionB: { text: 'The pull of goals and outcomes', icon: <Compass className="w-5 h-5" /> },
    axis: 'motivation',
    aValue: 'internal',
    bValue: 'external',
  },
  {
    id: 'approach',
    question: 'How do you prefer to navigate your days?',
    optionA: { text: 'With a gentle structure', icon: <Leaf className="w-5 h-5" /> },
    optionB: { text: 'Following what feels right', icon: <Compass className="w-5 h-5" /> },
    axis: 'approach',
    aValue: 'structured',
    bValue: 'spontaneous',
  },
  {
    id: 'focus',
    question: 'How do you prefer to work on things?',
    optionA: { text: 'Deep and focused on one thing', icon: <Compass className="w-5 h-5" /> },
    optionB: { text: 'Varied and switching between interests', icon: <Zap className="w-5 h-5" /> },
    axis: 'focus',
    aValue: 'deep',
    bValue: 'varied',
  },
  {
    id: 'recovery',
    question: 'How do you best recharge?',
    optionA: { text: 'In quiet solitude', icon: <Moon className="w-5 h-5" /> },
    optionB: { text: 'Around people I care about', icon: <Heart className="w-5 h-5" /> },
    axis: 'recovery',
    aValue: 'solitude',
    bValue: 'social',
  },
  {
    id: 'pace',
    question: 'What pace feels natural to you?',
    optionA: { text: 'Slow and deliberate', icon: <Leaf className="w-5 h-5" /> },
    optionB: { text: 'Quick and dynamic', icon: <Zap className="w-5 h-5" /> },
    axis: 'pace',
    aValue: 'slow',
    bValue: 'fast',
  },
  {
    id: 'tone',
    question: 'When something doesn\'t work, what helps you more?',
    optionA: { text: 'A gentle reminder', icon: <Heart className="w-5 h-5" /> },
    optionB: { text: 'A clear nudge', icon: <Zap className="w-5 h-5" /> },
    axis: 'tone',
    aValue: 'gentle',
    bValue: 'clear',
  },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswer[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());
  const [personality, setPersonality] = useState<PersonalityProfile | null>(null);
  const [tone, setTone] = useState<'gentle' | 'clear'>('gentle');
  const completeOnboarding = useFlowNautStore((s) => s.completeOnboarding);
  const addHabit = useFlowNautStore((s) => s.addHabit);

  const isWelcome = step === 0;
  const currentQuestion = !isWelcome && step <= questions.length ? questions[step - 1] : null;
  const isHabitSelection = step === questions.length + 1;
  const isComplete = step === questions.length + 2;

  const recommendedHabits = personality ? getRecommendedHabits(personality) : [];

  const handleChoice = (choice: 'a' | 'b') => {
    if (!currentQuestion) return;
    
    const newAnswers = [...answers, { questionId: currentQuestion.id, choice }];
    setAnswers(newAnswers);
    
    // If this was the last question, build personality for habit recommendations
    if (step === questions.length) {
      const builtPersonality: PersonalityProfile = {
        rhythm: 'flexible',
        energy: 'waves',
        motivation: 'mixed',
        approach: 'adaptive',
        focus: 'contextual',
        recovery: 'mixed',
        pace: 'moderate',
      };
      
      let builtTone: 'gentle' | 'clear' = 'gentle';

      newAnswers.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.questionId);
        if (!question) return;
        
        if (question.axis === 'tone') {
          builtTone = answer.choice === 'a' ? 'gentle' : 'clear';
        } else {
          const value = answer.choice === 'a' ? question.aValue : question.bValue;
          (builtPersonality as any)[question.axis] = value;
        }
      });

      setPersonality(builtPersonality);
      setTone(builtTone);
    }
    
    setStep(step + 1);
  };

  const toggleHabit = (habitId: string) => {
    const newSelected = new Set(selectedHabits);
    if (newSelected.has(habitId)) {
      newSelected.delete(habitId);
    } else {
      newSelected.add(habitId);
    }
    setSelectedHabits(newSelected);
  };

  const handleComplete = () => {
    if (!personality) return;
    
    // Add selected habits with proper options
    recommendedHabits
      .filter((h) => selectedHabits.has(h.id))
      .forEach((h) => addHabit({
        name: h.name,
        emoji: h.emoji,
        timeAnchor: suggestTimeAnchor(h.name),
        softFrequency: 'free',
      }));
    
    completeOnboarding(personality, tone);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {isWelcome && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Leaf className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-4xl font-serif font-medium text-foreground">
                  Welcome
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                  This is a space for observation, not optimization.
                  <br />
                  <span className="text-foreground/80">Let's discover how you naturally work.</span>
                </p>
              </div>
              
              <Button 
                onClick={() => setStep(1)} 
                size="xl" 
                variant="gentle"
                className="px-10"
              >
                Begin
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Just a few gentle questions ahead
              </p>
            </motion.div>
          )}

          {currentQuestion && !isComplete && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Progress */}
              <div className="flex gap-1.5 justify-center">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx < step
                        ? 'w-8 bg-primary'
                        : idx === step - 1
                        ? 'w-8 bg-primary/50'
                        : 'w-4 bg-border'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-medium text-foreground">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice('a')}
                  className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary hover:bg-primary/5 shadow-soft transition-all duration-300 text-left flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {currentQuestion.optionA.icon}
                  </div>
                  <span className="text-lg text-foreground">
                    {currentQuestion.optionA.text}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice('b')}
                  className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary hover:bg-primary/5 shadow-soft transition-all duration-300 text-left flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {currentQuestion.optionB.icon}
                  </div>
                  <span className="text-lg text-foreground">
                    {currentQuestion.optionB.text}
                  </span>
                </motion.button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                There's no right answer – just what feels true for you
              </p>
            </motion.div>
          )}

          {isHabitSelection && (
            <motion.div
              key="habits"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-medium text-foreground">
                  Starting points
                </h2>
                <p className="text-muted-foreground">
                  Based on your rhythm, here are some habits that might feel natural.
                  <br />
                  <span className="text-sm">Select any that resonate—or skip for now.</span>
                </p>
              </div>

              <div className="space-y-3">
                {recommendedHabits.map((habit) => (
                  <motion.button
                    key={habit.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-4 ${
                      selectedHabits.has(habit.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl">
                      {habit.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{habit.name}</div>
                      <div className="text-sm text-muted-foreground">{habit.reason}</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedHabits.has(habit.id)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/30'
                    }`}>
                      {selectedHabits.has(habit.id) && <Check className="w-4 h-4" />}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => setStep(step + 1)} 
                  variant="ghost"
                  className="px-6"
                >
                  Skip for now
                </Button>
                <Button 
                  onClick={() => setStep(step + 1)} 
                  size="lg"
                  className="px-8"
                  disabled={selectedHabits.size === 0}
                >
                  Continue with {selectedHabits.size} habit{selectedHabits.size !== 1 ? 's' : ''}
                </Button>
              </div>
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <motion.div
                className="w-24 h-24 mx-auto rounded-3xl bg-primary/20 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="w-12 h-12 text-primary" />
              </motion.div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-serif font-medium text-foreground">
                  You're ready
                </h2>
                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                  Your current emphasis is on being observant and aware. 
                  This can change—and that's okay.
                </p>
              </div>

              <Button 
                onClick={handleComplete} 
                size="xl" 
                className="px-10"
              >
                Enter your space
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
