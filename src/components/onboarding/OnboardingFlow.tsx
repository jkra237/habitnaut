import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { PersonalityProfile, TimeAnchor } from '@/types/flownaut';
import { Check, Globe, Activity, Calendar, Target, Brain, Battery, Compass, Sparkles, TrendingUp } from 'lucide-react';
import { useTranslations, useSetLanguage } from '@/hooks/use-translations';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '@/lib/i18n/translations';
import { FlagComponents } from '@/components/ui/language-flags';
import habitnautMascot from '@/assets/habitnaut-mascot.png';

function suggestTimeAnchor(habitName: string): TimeAnchor {
  const lowerName = habitName.toLowerCase();
  if (lowerName.includes('morning') || lowerName.includes('morgen')) return 'morning';
  if (lowerName.includes('evening') || lowerName.includes('abend') || lowerName.includes('night')) return 'evening';
  return 'none';
}

interface RecommendedHabit {
  id: string;
  name: string;
  emoji: string;
  reason: string;
  // Affinity scores for each axis value
  affinities: {
    active?: number;
    calming?: number;
    structured?: number;
    flexible?: number;
    progress?: number;
    feeling?: number;
  };
}

const getAllHabits = (t: ReturnType<typeof useTranslations>): RecommendedHabit[] => {
  const h = t.recommendedHabits;
  return [
    // Movement & Body
    { id: 'short-walk', name: h.shortWalk.name, emoji: '🚶', reason: h.shortWalk.reason, affinities: { active: 3, flexible: 1, feeling: 1 } },
    { id: 'stretch-body', name: h.stretchBody.name, emoji: '🤸', reason: h.stretchBody.reason, affinities: { active: 2, calming: 1, feeling: 2 } },
    { id: 'move-body', name: h.moveBody.name, emoji: '💃', reason: h.moveBody.reason, affinities: { active: 3, flexible: 2, feeling: 1 } },
    { id: 'fresh-air', name: h.freshAir.name, emoji: '🌿', reason: h.freshAir.reason, affinities: { active: 2, calming: 1, flexible: 1 } },
    // Mindfulness & Calm
    { id: 'breathe-consciously', name: h.breatheConsciously.name, emoji: '🌬️', reason: h.breatheConsciously.reason, affinities: { calming: 3, feeling: 2 } },
    { id: 'quiet-moment', name: h.quietMoment.name, emoji: '🧘', reason: h.quietMoment.reason, affinities: { calming: 3, flexible: 1, feeling: 2 } },
    { id: 'notice-feelings', name: h.noticeFeelingsToday.name, emoji: '💭', reason: h.noticeFeelingsToday.reason, affinities: { calming: 2, feeling: 3 } },
    // Reflection & Awareness
    { id: 'positive-moment', name: h.positiveMoment.name, emoji: '✨', reason: h.positiveMoment.reason, affinities: { calming: 1, feeling: 3, flexible: 1 } },
    { id: 'gratitude-entry', name: h.gratitudeEntry.name, emoji: '💚', reason: h.gratitudeEntry.reason, affinities: { calming: 1, feeling: 3 } },
    { id: 'reflect-day', name: h.reflectDay.name, emoji: '📝', reason: h.reflectDay.reason, affinities: { calming: 1, structured: 1, feeling: 2 } },
    // Focus & Intention
    { id: 'set-intention', name: h.setIntention.name, emoji: '🎯', reason: h.setIntention.reason, affinities: { structured: 3, progress: 3 } },
    { id: 'small-task', name: h.smallTask.name, emoji: '✅', reason: h.smallTask.reason, affinities: { structured: 2, progress: 3, active: 1 } },
    // Healthy Micro Habits
    { id: 'drink-water', name: h.drinkWater.name, emoji: '💧', reason: h.drinkWater.reason, affinities: { calming: 1, flexible: 2 } },
    { id: 'phone-away', name: h.phoneAway.name, emoji: '📵', reason: h.phoneAway.reason, affinities: { calming: 2, structured: 1, feeling: 1 } },
    { id: 'read-pages', name: h.readPages.name, emoji: '📖', reason: h.readPages.reason, affinities: { calming: 2, structured: 1, progress: 1 } },
  ];
};

const getRecommendedHabits = (personality: PersonalityProfile, t: ReturnType<typeof useTranslations>): RecommendedHabit[] => {
  const allHabits = getAllHabits(t);

  // Score each habit based on personality match
  const scored = allHabits.map(habit => {
    let score = 0;
    const a = habit.affinities;

    // Energy style
    if (personality.energyStyle === 'active') {
      score += (a.active || 0) * 2;
      score += (a.calming || 0) * 0.5;
    } else {
      score += (a.calming || 0) * 2;
      score += (a.active || 0) * 0.5;
    }

    // Structure style
    if (personality.structureStyle === 'structured') {
      score += (a.structured || 0) * 2;
      score += (a.flexible || 0) * 0.5;
    } else {
      score += (a.flexible || 0) * 2;
      score += (a.structured || 0) * 0.5;
    }

    // Motivation style
    if (personality.motivationStyle === 'progress') {
      score += (a.progress || 0) * 2;
      score += (a.feeling || 0) * 0.5;
    } else {
      score += (a.feeling || 0) * 2;
      score += (a.progress || 0) * 0.5;
    }

    return { ...habit, score };
  });

  // Sort by score descending, take top 10
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 10);
};

interface OnboardingQuestion {
  id: string;
  questionKey: string;
  optionAKey: string;
  optionBKey: string;
  iconA: React.ReactNode;
  iconB: React.ReactNode;
  axis: keyof PersonalityProfile;
  aValue: string;
  bValue: string;
}

const questions: OnboardingQuestion[] = [
  {
    id: 'q1-energy-source',
    questionKey: 'energySource',
    optionAKey: 'energySourceA',
    optionBKey: 'energySourceB',
    iconA: <Activity className="w-5 h-5" />,
    iconB: <Sparkles className="w-5 h-5" />,
    axis: 'energyStyle',
    aValue: 'active',
    bValue: 'calming',
  },
  {
    id: 'q2-structure',
    questionKey: 'structure',
    optionAKey: 'structureA',
    optionBKey: 'structureB',
    iconA: <Calendar className="w-5 h-5" />,
    iconB: <Compass className="w-5 h-5" />,
    axis: 'structureStyle',
    aValue: 'structured',
    bValue: 'flexible',
  },
  {
    id: 'q3-motivation',
    questionKey: 'motivation',
    optionAKey: 'motivationA',
    optionBKey: 'motivationB',
    iconA: <Target className="w-5 h-5" />,
    iconB: <Sparkles className="w-5 h-5" />,
    axis: 'motivationStyle',
    aValue: 'progress',
    bValue: 'feeling',
  },
  {
    id: 'q4-reflection',
    questionKey: 'reflection',
    optionAKey: 'reflectionA',
    optionBKey: 'reflectionB',
    iconA: <Brain className="w-5 h-5" />,
    iconB: <Activity className="w-5 h-5" />,
    axis: 'motivationStyle',
    aValue: 'feeling',
    bValue: 'progress',
  },
  {
    id: 'q5-daily-energy',
    questionKey: 'dailyEnergy',
    optionAKey: 'dailyEnergyA',
    optionBKey: 'dailyEnergyB',
    iconA: <Sparkles className="w-5 h-5" />,
    iconB: <Activity className="w-5 h-5" />,
    axis: 'energyStyle',
    aValue: 'calming',
    bValue: 'active',
  },
  {
    id: 'q6-chaos',
    questionKey: 'chaos',
    optionAKey: 'chaosA',
    optionBKey: 'chaosB',
    iconA: <Sparkles className="w-5 h-5" />,
    iconB: <Target className="w-5 h-5" />,
    axis: 'structureStyle',
    aValue: 'flexible',
    bValue: 'structured',
  },
  {
    id: 'q7-growth',
    questionKey: 'growth',
    optionAKey: 'growthA',
    optionBKey: 'growthB',
    iconA: <Brain className="w-5 h-5" />,
    iconB: <Battery className="w-5 h-5" />,
    axis: 'energyStyle',
    aValue: 'calming',
    bValue: 'active',
  },
];

const MAX_HABITS = 3;

export function OnboardingFlow() {
  const t = useTranslations();
  const setLanguage = useSetLanguage();

  const [step, setStep] = useState(0);
  const [axisVotes, setAxisVotes] = useState<Record<string, string[]>>({
    energyStyle: [],
    structureStyle: [],
    motivationStyle: [],
  });
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());
  const [personality, setPersonality] = useState<PersonalityProfile | null>(null);
  const completeOnboarding = useFlowNautStore((s) => s.completeOnboarding);
  const addHabit = useFlowNautStore((s) => s.addHabit);

  // Steps: 0 = language, 1 = welcome, 2-8 = questions (7), 9 = habit selection, 10 = complete
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

    const value = choice === 'a' ? currentQuestion.aValue : currentQuestion.bValue;
    const newVotes = { ...axisVotes };
    newVotes[currentQuestion.axis] = [...(newVotes[currentQuestion.axis] || []), value];
    setAxisVotes(newVotes);

    // If last question, build personality from votes
    if (currentQuestionIndex === questions.length - 1) {
      const resolveAxis = (axis: string, optA: string, optB: string): string => {
        const votes = newVotes[axis] || [];
        const countA = votes.filter(v => v === optA).length;
        const countB = votes.filter(v => v === optB).length;
        return countA >= countB ? optA : optB;
      };

      const builtPersonality: PersonalityProfile = {
        energyStyle: resolveAxis('energyStyle', 'active', 'calming') as 'active' | 'calming',
        structureStyle: resolveAxis('structureStyle', 'structured', 'flexible') as 'structured' | 'flexible',
        motivationStyle: resolveAxis('motivationStyle', 'progress', 'feeling') as 'progress' | 'feeling',
      };

      setPersonality(builtPersonality);
    }

    setStep(step + 1);
  };

  const toggleHabit = (habitId: string) => {
    const newSelected = new Set(selectedHabits);
    if (newSelected.has(habitId)) {
      newSelected.delete(habitId);
    } else if (newSelected.size < MAX_HABITS) {
      newSelected.add(habitId);
    }
    setSelectedHabits(newSelected);
  };

  const handleComplete = () => {
    if (!personality) return;

    recommendedHabits
      .filter((h) => selectedHabits.has(h.id))
      .forEach((h) => addHabit({
        name: h.name,
        emoji: h.emoji,
        timeAnchor: suggestTimeAnchor(h.name),
        softFrequency: 'free',
      }));

    completeOnboarding(personality, 'gentle');
  };

  const onbQ = t.onboarding.questions;

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
                  {(onbQ as any)[currentQuestion.questionKey]}
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
                    {(onbQ as any)[currentQuestion.optionAKey]}
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
                    {(onbQ as any)[currentQuestion.optionBKey]}
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
                {recommendedHabits.map((habit) => {
                  const isSelected = selectedHabits.has(habit.id);
                  const isDisabled = !isSelected && selectedHabits.size >= MAX_HABITS;
                  return (
                    <motion.button
                      key={habit.id}
                      whileHover={!isDisabled ? { scale: 1.01 } : {}}
                      whileTap={!isDisabled ? { scale: 0.99 } : {}}
                      onClick={() => !isDisabled && toggleHabit(habit.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-4 ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : isDisabled
                          ? 'border-border bg-card opacity-40 cursor-not-allowed'
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
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
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
                  {t.onboarding.continueWithSelected} ({selectedHabits.size}/{MAX_HABITS})
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

              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-medium text-foreground">
                  {t.onboarding.allSet}
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {t.onboarding.allSetSubtitle}
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-foreground/70 max-w-md mx-auto bg-primary/5 rounded-xl p-4 border border-primary/10"
                >
                  {t.onboarding.allSetMessage}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="max-w-md mx-auto bg-accent/30 rounded-xl p-4 border border-accent/50"
                >
                  <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {t.onboarding.statisticsTipTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.onboarding.statisticsTipMessage}
                  </p>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-xs text-muted-foreground max-w-md mx-auto bg-secondary/50 rounded-xl p-4 border border-border"
                >
                  {t.onboarding.localDataNotice}
                </motion.p>
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
