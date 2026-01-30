import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { PersonalityProfile, OnboardingAnswer } from '@/types/flownaut';
import { Moon, Sun, Zap, Heart, Compass, Check, Globe, Leaf } from 'lucide-react';
import { suggestTimeAnchor } from '@/lib/reminder-copy';
import { useTranslations, useSetLanguage } from '@/hooks/use-translations';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '@/lib/i18n/translations';
import { FlagComponents } from '@/components/ui/language-flags';
import habitnautMascot from '@/assets/habitnaut-mascot.png';
interface RecommendedHabit {
  id: string;
  name: string;
  emoji: string;
  reason: string;
}

const getRecommendedHabits = (personality: PersonalityProfile, t: ReturnType<typeof useTranslations>): RecommendedHabit[] => {
  const habits: RecommendedHabit[] = [];
  const h = t.recommendedHabits;

  // Based on rhythm
  if (personality.rhythm === 'morning') {
    habits.push({ id: 'morning-pages', name: h.morningPages.name, emoji: '📝', reason: h.morningPages.reason });
    habits.push({ id: 'sunrise-walk', name: h.sunriseWalk.name, emoji: '🌅', reason: h.sunriseWalk.reason });
    habits.push({ id: 'morning-stretch', name: h.morningStretch.name, emoji: '🧘', reason: h.morningStretch.reason });
  } else if (personality.rhythm === 'evening') {
    habits.push({ id: 'evening-reflection', name: h.eveningReflection.name, emoji: '🌙', reason: h.eveningReflection.reason });
    habits.push({ id: 'wind-down', name: h.windDown.name, emoji: '🕯️', reason: h.windDown.reason });
    habits.push({ id: 'night-reading', name: h.nightReading.name, emoji: '📚', reason: h.nightReading.reason });
  } else {
    habits.push({ id: 'mindful-pause', name: h.mindfulPause.name, emoji: '🧘', reason: h.mindfulPause.reason });
    habits.push({ id: 'flow-check', name: h.flowCheck.name, emoji: '🌊', reason: h.flowCheck.reason });
  }

  // Based on energy
  if (personality.energy === 'steady') {
    habits.push({ id: 'daily-movement', name: h.dailyMovement.name, emoji: '🚶', reason: h.dailyMovement.reason });
    habits.push({ id: 'consistent-routine', name: h.anchorRoutine.name, emoji: '⚓', reason: h.anchorRoutine.reason });
  } else if (personality.energy === 'bursts') {
    habits.push({ id: 'creative-sprint', name: h.creativeSprint.name, emoji: '⚡', reason: h.creativeSprint.reason });
    habits.push({ id: 'rest-ritual', name: h.restRitual.name, emoji: '☁️', reason: h.restRitual.reason });
    habits.push({ id: 'power-break', name: h.powerBreak.name, emoji: '💪', reason: h.powerBreak.reason });
  } else {
    habits.push({ id: 'energy-check', name: h.energyCheck.name, emoji: '🌊', reason: h.energyCheck.reason });
    habits.push({ id: 'ride-the-wave', name: h.rideTheWave.name, emoji: '🏄', reason: h.rideTheWave.reason });
  }

  // Based on motivation
  if (personality.motivation === 'internal') {
    habits.push({ id: 'gratitude', name: h.gratitude.name, emoji: '💚', reason: h.gratitude.reason });
    habits.push({ id: 'values-check', name: h.valuesCheck.name, emoji: '🧭', reason: h.valuesCheck.reason });
  } else if (personality.motivation === 'external') {
    habits.push({ id: 'progress-note', name: h.progressNote.name, emoji: '📊', reason: h.progressNote.reason });
    habits.push({ id: 'share-learning', name: h.shareLearning.name, emoji: '💬', reason: h.shareLearning.reason });
  } else {
    habits.push({ id: 'intention-setting', name: h.intentionSetting.name, emoji: '🎯', reason: h.intentionSetting.reason });
  }

  // Based on approach
  if (personality.approach === 'structured') {
    habits.push({ id: 'plan-tomorrow', name: h.planTomorrow.name, emoji: '📋', reason: h.planTomorrow.reason });
    habits.push({ id: 'weekly-review', name: h.weeklyReview.name, emoji: '📅', reason: h.weeklyReview.reason });
  } else if (personality.approach === 'spontaneous') {
    habits.push({ id: 'follow-curiosity', name: h.followCuriosity.name, emoji: '✨', reason: h.followCuriosity.reason });
    habits.push({ id: 'surprise-self', name: h.surpriseSelf.name, emoji: '🎲', reason: h.surpriseSelf.reason });
  } else {
    habits.push({ id: 'flexible-focus', name: h.flexibleFocus.name, emoji: '🌿', reason: h.flexibleFocus.reason });
  }

  // Based on focus
  if (personality.focus === 'deep') {
    habits.push({ id: 'deep-work', name: h.deepWork.name, emoji: '🎯', reason: h.deepWork.reason });
    habits.push({ id: 'single-task', name: h.singleTask.name, emoji: '🔬', reason: h.singleTask.reason });
  } else if (personality.focus === 'varied') {
    habits.push({ id: 'task-variety', name: h.taskVariety.name, emoji: '🎨', reason: h.taskVariety.reason });
  }

  // Based on recovery
  if (personality.recovery === 'solitude') {
    habits.push({ id: 'quiet-time', name: h.quietTime.name, emoji: '🤫', reason: h.quietTime.reason });
    habits.push({ id: 'nature-moment', name: h.natureMoment.name, emoji: '🌲', reason: h.natureMoment.reason });
  } else if (personality.recovery === 'social') {
    habits.push({ id: 'connect-someone', name: h.connectSomeone.name, emoji: '👋', reason: h.connectSomeone.reason });
  }

  // Based on pace
  if (personality.pace === 'slow') {
    habits.push({ id: 'slow-morning', name: h.slowMorning.name, emoji: '🐌', reason: h.slowMorning.reason });
  } else if (personality.pace === 'fast') {
    habits.push({ id: 'quick-wins', name: h.quickWins.name, emoji: '🚀', reason: h.quickWins.reason });
  }

  // Return top 8 unique habits (more options)
  const uniqueHabits = habits.filter((habit, index, self) => 
    index === self.findIndex((h) => h.id === habit.id)
  );
  return uniqueHabits.slice(0, 8);
};

interface Question {
  id: string;
  questionKey: keyof ReturnType<typeof useTranslations>['onboarding']['questions'];
  optionAKey: keyof ReturnType<typeof useTranslations>['onboarding']['questions'];
  optionBKey: keyof ReturnType<typeof useTranslations>['onboarding']['questions'];
  iconA: React.ReactNode;
  iconB: React.ReactNode;
  axis: keyof PersonalityProfile | 'tone';
  aValue: string;
  bValue: string;
}

const questions: Question[] = [
  {
    id: 'rhythm',
    questionKey: 'rhythm',
    optionAKey: 'rhythmA',
    optionBKey: 'rhythmB',
    iconA: <Sun className="w-5 h-5" />,
    iconB: <Moon className="w-5 h-5" />,
    axis: 'rhythm',
    aValue: 'morning',
    bValue: 'evening',
  },
  {
    id: 'energy',
    questionKey: 'energy',
    optionAKey: 'energyA',
    optionBKey: 'energyB',
    iconA: <Leaf className="w-5 h-5" />,
    iconB: <Zap className="w-5 h-5" />,
    axis: 'energy',
    aValue: 'steady',
    bValue: 'bursts',
  },
  {
    id: 'motivation',
    questionKey: 'motivation',
    optionAKey: 'motivationA',
    optionBKey: 'motivationB',
    iconA: <Heart className="w-5 h-5" />,
    iconB: <Compass className="w-5 h-5" />,
    axis: 'motivation',
    aValue: 'internal',
    bValue: 'external',
  },
  {
    id: 'approach',
    questionKey: 'approach',
    optionAKey: 'approachA',
    optionBKey: 'approachB',
    iconA: <Leaf className="w-5 h-5" />,
    iconB: <Compass className="w-5 h-5" />,
    axis: 'approach',
    aValue: 'structured',
    bValue: 'spontaneous',
  },
  {
    id: 'focus',
    questionKey: 'focus',
    optionAKey: 'focusA',
    optionBKey: 'focusB',
    iconA: <Compass className="w-5 h-5" />,
    iconB: <Zap className="w-5 h-5" />,
    axis: 'focus',
    aValue: 'deep',
    bValue: 'varied',
  },
  {
    id: 'recovery',
    questionKey: 'recovery',
    optionAKey: 'recoveryA',
    optionBKey: 'recoveryB',
    iconA: <Moon className="w-5 h-5" />,
    iconB: <Heart className="w-5 h-5" />,
    axis: 'recovery',
    aValue: 'solitude',
    bValue: 'social',
  },
  {
    id: 'pace',
    questionKey: 'pace',
    optionAKey: 'paceA',
    optionBKey: 'paceB',
    iconA: <Leaf className="w-5 h-5" />,
    iconB: <Zap className="w-5 h-5" />,
    axis: 'pace',
    aValue: 'slow',
    bValue: 'fast',
  },
  {
    id: 'tone',
    questionKey: 'tone',
    optionAKey: 'toneA',
    optionBKey: 'toneB',
    iconA: <Heart className="w-5 h-5" />,
    iconB: <Zap className="w-5 h-5" />,
    axis: 'tone',
    aValue: 'gentle',
    bValue: 'clear',
  },
];

export function OnboardingFlow() {
  const t = useTranslations();
  const setLanguage = useSetLanguage();
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswer[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());
  const [personality, setPersonality] = useState<PersonalityProfile | null>(null);
  const [tone, setTone] = useState<'gentle' | 'clear'>('gentle');
  const completeOnboarding = useFlowNautStore((s) => s.completeOnboarding);
  const addHabit = useFlowNautStore((s) => s.addHabit);

  // Steps: 0 = language, 1 = welcome, 2-9 = questions, 10 = habit selection, 11 = complete
  const isLanguageSelection = step === 0;
  const isWelcome = step === 1;
  const currentQuestionIndex = step - 2;
  const currentQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length ? questions[currentQuestionIndex] : null;
  const isHabitSelection = step === questions.length + 2;
  const isComplete = step === questions.length + 3;

  const recommendedHabits = personality ? getRecommendedHabits(personality, t) : [];

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setStep(1);
  };

  const handleChoice = (choice: 'a' | 'b') => {
    if (!currentQuestion) return;
    
    const newAnswers = [...answers, { questionId: currentQuestion.id, choice }];
    setAnswers(newAnswers);
    
    // If this was the last question, build personality for habit recommendations
    if (currentQuestionIndex === questions.length - 1) {
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
          {/* Language Selection */}
          {isLanguageSelection && (
            <motion.div
              key="language"
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
                  <Globe className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-3xl font-serif font-medium text-foreground">
                  {t.onboarding.chooseLanguage}
                </h1>
                <p className="text-muted-foreground">
                  {t.onboarding.languageSubtitle}
                </p>
              </div>
              
              <div className="space-y-3">
                {LANGUAGE_OPTIONS.map((option) => {
                  const FlagComponent = FlagComponents[option.value];
                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLanguageSelect(option.value)}
                      className="w-full p-5 rounded-2xl bg-card border-2 border-border hover:border-primary hover:bg-primary/5 shadow-soft transition-all duration-300 flex items-center gap-4"
                    >
                      <div className="w-12 h-8 rounded overflow-hidden shadow-sm flex items-center justify-center">
                        <FlagComponent className="w-full h-full" />
                      </div>
                      <span className="text-lg font-medium text-foreground">{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

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
                  className="w-28 h-28 mx-auto rounded-3xl overflow-hidden"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src={habitnautMascot} 
                    alt="HabitNaut mascot - a cute astronaut" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <h1 className="text-4xl font-serif font-medium text-foreground">
                  HabitNaut
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {t.onboarding.welcomeSubtitle}
                  <br />
                  <span className="text-foreground/80">{t.onboarding.welcomeSubtitle2}</span>
                </p>
              </div>
              
              <Button 
                onClick={() => setStep(2)} 
                size="xl" 
                variant="gentle"
                className="px-10"
              >
                {t.onboarding.begin}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                {t.onboarding.questionsAhead}
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
                      idx < currentQuestionIndex
                        ? 'w-8 bg-primary'
                        : idx === currentQuestionIndex
                        ? 'w-8 bg-primary/50'
                        : 'w-4 bg-border'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-medium text-foreground">
                  {t.onboarding.questions[currentQuestion.questionKey]}
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
                    {currentQuestion.iconA}
                  </div>
                  <span className="text-lg text-foreground">
                    {t.onboarding.questions[currentQuestion.optionAKey]}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice('b')}
                  className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary hover:bg-primary/5 shadow-soft transition-all duration-300 text-left flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {currentQuestion.iconB}
                  </div>
                  <span className="text-lg text-foreground">
                    {t.onboarding.questions[currentQuestion.optionBKey]}
                  </span>
                </motion.button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {t.onboarding.noRightAnswer}
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
                  {t.onboarding.startingPoints}
                </h2>
                <p className="text-muted-foreground">
                  {t.onboarding.startingPointsSubtitle}
                  <br />
                  <span className="text-sm">{t.onboarding.startingPointsHint}</span>
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
                    {selectedHabits.has(habit.id) && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(step + 1)}
                  className="flex-1"
                >
                  {t.onboarding.skipForNow}
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={selectedHabits.size === 0}
                  className="flex-1"
                >
                  {t.onboarding.continueWithSelected} ({selectedHabits.size})
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Check className="w-12 h-12 text-primary" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-medium text-foreground">
                  {t.onboarding.allSet}
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {t.onboarding.allSetSubtitle}
                </p>
              </div>

              <Button 
                onClick={handleComplete} 
                size="xl" 
                variant="gentle"
                className="px-10"
              >
                {t.onboarding.startObserving}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
