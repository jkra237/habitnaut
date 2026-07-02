import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { PersonalityProfile, TimeAnchor } from '@/types/flownaut';
import { Check, Globe, Activity, Calendar, Target, Brain, Battery, Compass, Sparkles, TrendingUp, ArrowLeft, Droplet } from 'lucide-react';
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

type HabitCategory = 'movement' | 'calm' | 'reflection' | 'focus';

interface RecommendedHabit {
  id: string;
  name: string;
  emoji: string;
  reason: string;
  category: HabitCategory;
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
    { id: 'short-walk', name: h.shortWalk.name, emoji: '🚶', reason: h.shortWalk.reason, category: 'movement', affinities: { active: 3, flexible: 1, feeling: 1 } },
    { id: 'stretch-body', name: h.stretchBody.name, emoji: '🤸', reason: h.stretchBody.reason, category: 'movement', affinities: { active: 2, calming: 1, feeling: 2 } },
    { id: 'move-body', name: h.moveBody.name, emoji: '💃', reason: h.moveBody.reason, category: 'movement', affinities: { active: 3, flexible: 2, feeling: 1 } },
    { id: 'fresh-air', name: h.freshAir.name, emoji: '🌿', reason: h.freshAir.reason, category: 'movement', affinities: { active: 2, calming: 1, flexible: 1 } },
    { id: 'breathe-consciously', name: h.breatheConsciously.name, emoji: '🌬️', reason: h.breatheConsciously.reason, category: 'calm', affinities: { calming: 3, feeling: 2 } },
    { id: 'quiet-moment', name: h.quietMoment.name, emoji: '🧘', reason: h.quietMoment.reason, category: 'calm', affinities: { calming: 3, flexible: 1, feeling: 2 } },
    { id: 'notice-feelings', name: h.noticeFeelingsToday.name, emoji: '💭', reason: h.noticeFeelingsToday.reason, category: 'reflection', affinities: { calming: 2, feeling: 3 } },
    { id: 'positive-moment', name: h.positiveMoment.name, emoji: '✨', reason: h.positiveMoment.reason, category: 'reflection', affinities: { calming: 1, feeling: 3, flexible: 1 } },
    { id: 'gratitude-entry', name: h.gratitudeEntry.name, emoji: '💚', reason: h.gratitudeEntry.reason, category: 'reflection', affinities: { calming: 1, feeling: 3 } },
    { id: 'reflect-day', name: h.reflectDay.name, emoji: '📝', reason: h.reflectDay.reason, category: 'reflection', affinities: { calming: 1, structured: 1, feeling: 2 } },
    { id: 'set-intention', name: h.setIntention.name, emoji: '🎯', reason: h.setIntention.reason, category: 'focus', affinities: { structured: 3, progress: 3 } },
    { id: 'small-task', name: h.smallTask.name, emoji: '✅', reason: h.smallTask.reason, category: 'focus', affinities: { structured: 2, progress: 3, active: 1 } },
    { id: 'drink-water', name: h.drinkWater.name, emoji: '💧', reason: h.drinkWater.reason, category: 'calm', affinities: { calming: 1, flexible: 2 } },
    { id: 'phone-away', name: h.phoneAway.name, emoji: '📵', reason: h.phoneAway.reason, category: 'calm', affinities: { calming: 2, structured: 1, feeling: 1 } },
    { id: 'read-pages', name: h.readPages.name, emoji: '📖', reason: h.readPages.reason, category: 'focus', affinities: { calming: 2, structured: 1, progress: 1 } },
  ];
};

const getRecommendedHabits = (personality: PersonalityProfile, t: ReturnType<typeof useTranslations>): RecommendedHabit[] => {
  const allHabits = getAllHabits(t);
  const scored = allHabits.map(habit => {
    let score = 0;
    const a = habit.affinities;
    if (personality.energyStyle === 'active') { score += (a.active || 0) * 2; score += (a.calming || 0) * 0.5; }
    else { score += (a.calming || 0) * 2; score += (a.active || 0) * 0.5; }
    if (personality.structureStyle === 'structured') { score += (a.structured || 0) * 2; score += (a.flexible || 0) * 0.5; }
    else { score += (a.flexible || 0) * 2; score += (a.structured || 0) * 0.5; }
    if (personality.motivationStyle === 'progress') { score += (a.progress || 0) * 2; score += (a.feeling || 0) * 0.5; }
    else { score += (a.feeling || 0) * 2; score += (a.progress || 0) * 0.5; }
    return { ...habit, score };
  });
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
  { id: 'q1-energy-source', questionKey: 'energySource', optionAKey: 'energySourceA', optionBKey: 'energySourceB', iconA: <Activity className="w-5 h-5" />, iconB: <Sparkles className="w-5 h-5" />, axis: 'energyStyle', aValue: 'active', bValue: 'calming' },
  { id: 'q2-structure', questionKey: 'structure', optionAKey: 'structureA', optionBKey: 'structureB', iconA: <Calendar className="w-5 h-5" />, iconB: <Compass className="w-5 h-5" />, axis: 'structureStyle', aValue: 'structured', bValue: 'flexible' },
  { id: 'q3-motivation', questionKey: 'motivation', optionAKey: 'motivationA', optionBKey: 'motivationB', iconA: <Target className="w-5 h-5" />, iconB: <Sparkles className="w-5 h-5" />, axis: 'motivationStyle', aValue: 'progress', bValue: 'feeling' },
  { id: 'q4-reflection', questionKey: 'reflection', optionAKey: 'reflectionA', optionBKey: 'reflectionB', iconA: <Brain className="w-5 h-5" />, iconB: <Activity className="w-5 h-5" />, axis: 'motivationStyle', aValue: 'feeling', bValue: 'progress' },
  { id: 'q5-daily-energy', questionKey: 'dailyEnergy', optionAKey: 'dailyEnergyA', optionBKey: 'dailyEnergyB', iconA: <Sparkles className="w-5 h-5" />, iconB: <Activity className="w-5 h-5" />, axis: 'energyStyle', aValue: 'calming', bValue: 'active' },
  { id: 'q6-chaos', questionKey: 'chaos', optionAKey: 'chaosA', optionBKey: 'chaosB', iconA: <Sparkles className="w-5 h-5" />, iconB: <Target className="w-5 h-5" />, axis: 'structureStyle', aValue: 'flexible', bValue: 'structured' },
  { id: 'q7-growth', questionKey: 'growth', optionAKey: 'growthA', optionBKey: 'growthB', iconA: <Brain className="w-5 h-5" />, iconB: <Battery className="w-5 h-5" />, axis: 'energyStyle', aValue: 'calming', bValue: 'active' },
];

const MAX_HABITS = 3;

// Step indices:
// 0: language, 1: welcome, 2: name, 3-9: questions (7), 10: habits, 11: complete
const STEP_LANGUAGE = 0;
const STEP_WELCOME = 1;
const STEP_NAME = 2;
const STEP_QUESTIONS_START = 3;
const STEP_HABITS = STEP_QUESTIONS_START + questions.length;
const STEP_COMPLETE = STEP_HABITS + 1;

export function OnboardingFlow() {
  const t = useTranslations();
  const setLanguage = useSetLanguage();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [nameInput, setNameInput] = useState('');
  const [axisVotes, setAxisVotes] = useState<Record<string, string[]>>({
    energyStyle: [],
    structureStyle: [],
    motivationStyle: [],
  });
  const [choiceHistory, setChoiceHistory] = useState<{ axis: string; value: string }[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());
  const [personality, setPersonality] = useState<PersonalityProfile | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<HabitCategory | 'all'>('all');
  const completeOnboarding = useFlowNautStore((s) => s.completeOnboarding);
  const addHabit = useFlowNautStore((s) => s.addHabit);

  const currentQuestionIndex = step - STEP_QUESTIONS_START;
  const currentQuestion = currentQuestionIndex >= 0 && currentQuestionIndex < questions.length ? questions[currentQuestionIndex] : null;

  const recommendedHabits = personality ? getRecommendedHabits(personality, t) : [];
  const filteredHabits = categoryFilter === 'all'
    ? recommendedHabits
    : recommendedHabits.filter((h) => h.category === categoryFilter);

  const goNext = (n: number = 1) => { setDirection(1); setStep((s) => s + n); };
  const goBack = () => {
    setDirection(-1);
    // If in question step, pop the last vote
    if (currentQuestion && choiceHistory.length > 0) {
      const last = choiceHistory[choiceHistory.length - 1];
      const newVotes = { ...axisVotes };
      newVotes[last.axis] = (newVotes[last.axis] || []).slice(0, -1);
      setAxisVotes(newVotes);
      setChoiceHistory((h) => h.slice(0, -1));
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    goNext();
  };

  const handleChoice = (choice: 'a' | 'b') => {
    if (!currentQuestion) return;
    const value = choice === 'a' ? currentQuestion.aValue : currentQuestion.bValue;
    const newVotes = { ...axisVotes };
    newVotes[currentQuestion.axis] = [...(newVotes[currentQuestion.axis] || []), value];
    setAxisVotes(newVotes);
    setChoiceHistory((h) => [...h, { axis: currentQuestion.axis, value }]);

    if (currentQuestionIndex === questions.length - 1) {
      const resolveAxis = (axis: string, optA: string, optB: string): string => {
        const votes = newVotes[axis] || [];
        const countA = votes.filter(v => v === optA).length;
        const countB = votes.filter(v => v === optB).length;
        return countA >= countB ? optA : optB;
      };
      setPersonality({
        energyStyle: resolveAxis('energyStyle', 'active', 'calming') as 'active' | 'calming',
        structureStyle: resolveAxis('structureStyle', 'structured', 'flexible') as 'structured' | 'flexible',
        motivationStyle: resolveAxis('motivationStyle', 'progress', 'feeling') as 'progress' | 'feeling',
      });
    }
    goNext();
  };

  const toggleHabit = (habitId: string) => {
    const newSelected = new Set(selectedHabits);
    if (newSelected.has(habitId)) newSelected.delete(habitId);
    else if (newSelected.size < MAX_HABITS) newSelected.add(habitId);
    setSelectedHabits(newSelected);
  };

  const handleNotSure = () => {
    setSelectedHabits(new Set(['drink-water']));
    goNext();
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
    completeOnboarding(personality, 'gentle', nameInput);
  };

  const handleSkipOnboarding = () => {
    const defaultPersonality: PersonalityProfile = {
      energyStyle: 'calming',
      structureStyle: 'flexible',
      motivationStyle: 'feeling',
    };
    completeOnboarding(defaultPersonality, 'gentle', '');
  };

  const onbQ = t.onboarding.questions;

  // Swipe handler for mobile — enable on welcome, name, questions, habits
  const canSwipe = step === STEP_WELCOME || step === STEP_NAME || (currentQuestion !== null) || step === STEP_HABITS;
  const handleSwipe = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!canSwipe) return;
    const threshold = 60;
    if (info.offset.x < -threshold) {
      // swipe left → next
      if (step === STEP_WELCOME) goNext();
      else if (step === STEP_NAME) goNext();
      else if (step === STEP_HABITS && selectedHabits.size > 0) goNext();
      // questions require an explicit choice — no auto-advance on swipe
    } else if (info.offset.x > threshold) {
      if (step > STEP_LANGUAGE) goBack();
    }
  };

  // Progress dots: show a compact indicator across the full flow (excluding language)
  const totalDots = 1 /* welcome */ + 1 /* name */ + questions.length + 1 /* habits */ + 1 /* complete */;
  const activeDotIdx = Math.max(0, step - STEP_WELCOME);

  const showBack = step > STEP_LANGUAGE && step < STEP_COMPLETE;
  const showProgress = step >= STEP_WELCOME && step < STEP_COMPLETE;

  const stepKey = currentQuestion ? currentQuestion.id : `step-${step}`;
  const slideVariants = {
    initial: (dir: 1 | -1) => ({ opacity: 0, x: dir * 40 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Skip onboarding link (for returning users / after export-import) */}
        {step <= STEP_WELCOME && (
          <div className="flex justify-end mb-2">
            <button
              onClick={handleSkipOnboarding}
              className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
            >
              {t.onboarding.skipOnboarding}
            </button>
          </div>
        )}
        {/* Top bar: back + progress dots */}
        {showProgress && (
          <div className="flex items-center justify-between mb-6 min-h-[36px]">
            <button
              onClick={goBack}
              disabled={!showBack}
              aria-label={t.common.back}
              className={`flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ${showBack ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.common.back}
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalDots }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeDotIdx
                      ? 'w-5 bg-primary'
                      : idx < activeDotIdx
                      ? 'w-1.5 bg-primary/60'
                      : 'w-1.5 bg-border'
                  }`}
                />
              ))}
            </div>
            <div className="w-12" />
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {/* Language Selection */}
          {step === STEP_LANGUAGE && (
            <motion.div
              key="language"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
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
                <p className="text-muted-foreground">{t.onboarding.languageSubtitle}</p>
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

          {/* Swipeable content wrapper */}
          {step !== STEP_LANGUAGE && (
            <motion.div
              key={stepKey}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              drag={canSwipe ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleSwipe}
              className="touch-pan-y"
            >
              {/* Welcome */}
              {step === STEP_WELCOME && (
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <motion.div
                      className="w-28 h-28 mx-auto rounded-3xl overflow-hidden"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img src={habitnautMascot} alt="HabitNaut mascot" className="w-full h-full object-contain" />
                    </motion.div>
                    <h1 className="text-4xl font-serif font-medium text-foreground">HabitNaut</h1>
                    <p className="text-lg font-serif italic text-foreground/80">
                      {t.onboarding.welcomeTagline}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                      {t.onboarding.welcomeSubtitle}
                      <br />
                      <span className="text-foreground/80">{t.onboarding.welcomeSubtitle2}</span>
                    </p>
                  </div>
                  <Button onClick={() => goNext()} size="xl" variant="gentle" className="px-10">
                    {t.onboarding.begin}
                  </Button>
                  <p className="text-sm text-muted-foreground">{t.onboarding.questionsAhead}</p>
                </div>
              )}

              {/* Name (optional) */}
              {step === STEP_NAME && (
                <div className="text-center space-y-8">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-3xl overflow-hidden"
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src={habitnautMascot} alt="" className="w-full h-full object-contain" />
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-serif font-medium text-foreground">
                      {t.onboarding.namePrompt}
                    </h2>
                    <p className="text-sm text-muted-foreground">{t.onboarding.nameSubtitle}</p>
                  </div>
                  <div className="space-y-3 max-w-sm mx-auto">
                    <Input
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value.slice(0, 40))}
                      placeholder={t.onboarding.namePlaceholder}
                      className="text-center text-lg h-12"
                      autoFocus={false}
                      onKeyDown={(e) => { if (e.key === 'Enter') goNext(); }}
                    />
                    {nameInput.trim() && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm font-serif italic text-primary"
                      >
                        {t.onboarding.nameGreetingPreview.replace('{name}', nameInput.trim())}
                      </motion.p>
                    )}
                  </div>
                  <Button onClick={() => goNext()} size="xl" variant="gentle" className="px-10">
                    {t.common.continue}
                  </Button>
                </div>
              )}

              {/* Questions */}
              {currentQuestion && (
                <div className="space-y-8">
                  <div className="text-center space-y-3">
                    <motion.div
                      className="w-14 h-14 mx-auto rounded-2xl overflow-hidden"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img src={habitnautMascot} alt="" className="w-full h-full object-contain" />
                    </motion.div>
                    <p className="text-sm font-serif italic text-muted-foreground">
                      {t.onboarding.questionsTagline}
                    </p>
                    <h2 className="text-2xl font-serif font-medium text-foreground">
                      {(onbQ as any)[currentQuestion.questionKey]}
                    </h2>
                  </div>
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
                </div>
              )}

              {/* Habit Selection */}
              {step === STEP_HABITS && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-serif italic text-muted-foreground">
                      {t.onboarding.habitsTagline}
                    </p>
                    <h2 className="text-2xl font-serif font-medium text-foreground">
                      {t.onboarding.startingPoints}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t.onboarding.startingPointsHint}
                    </p>
                  </div>

                  {/* Category chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {([
                      ['all', t.onboarding.categoryAll],
                      ['movement', t.onboarding.categoryMovement],
                      ['calm', t.onboarding.categoryCalm],
                      ['reflection', t.onboarding.categoryReflection],
                      ['focus', t.onboarding.categoryFocus],
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setCategoryFilter(key)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          categoryFilter === key
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card text-foreground border-border hover:border-primary/50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* "Not sure" tiny suggestion */}
                  <button
                    onClick={handleNotSure}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-left flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{t.onboarding.notSureLabel}</div>
                      <div className="text-xs text-muted-foreground">{t.onboarding.notSureSubtitle}</div>
                    </div>
                  </button>

                  <div className="space-y-3">
                    {filteredHabits.map((habit) => {
                      const isSelected = selectedHabits.has(habit.id);
                      const isDisabled = !isSelected && selectedHabits.size >= MAX_HABITS;
                      return (
                        <motion.button
                          key={habit.id}
                          whileHover={!isDisabled ? { scale: 1.01 } : {}}
                          whileTap={!isDisabled ? { scale: 0.99 } : {}}
                          onClick={() => !isDisabled && toggleHabit(habit.id)}
                          className={`w-full p-4 min-h-[68px] rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-4 ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : isDisabled
                              ? 'border-border bg-card opacity-40 cursor-not-allowed'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl shrink-0">
                            {habit.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground">{habit.name}</div>
                            <div className="text-sm text-muted-foreground">{habit.reason}</div>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => goNext()} className="w-full sm:flex-1">
                      {t.onboarding.skipForNow}
                    </Button>
                    <Button
                      onClick={() => goNext()}
                      disabled={selectedHabits.size === 0}
                      className="w-full sm:flex-1 text-sm"
                    >
                      {t.onboarding.continueWithSelected} ({selectedHabits.size}/{MAX_HABITS})
                    </Button>
                  </div>
                </div>
              )}

              {/* Complete */}
              {step === STEP_COMPLETE && (
                <div className="text-center space-y-8">
                  <div className="relative w-32 h-32 mx-auto">
                    {/* Floating sparkles around the mascot */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const angle = (i / 6) * Math.PI * 2;
                      const x = Math.cos(angle) * 56;
                      const y = Math.sin(angle) * 56;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], x, y, scale: [0, 1, 0.5] }}
                          transition={{ duration: 2.2, delay: 0.4 + i * 0.08, repeat: Infinity, repeatDelay: 1.4 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-primary/70" />
                        </motion.div>
                      );
                    })}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 12 }}
                      className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center relative z-10"
                    >
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Check className="w-12 h-12 text-primary" />
                      </motion.div>
                    </motion.div>
                  </div>
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
                      <p className="text-xs text-muted-foreground">{t.onboarding.statisticsTipMessage}</p>
                      <p className="text-xs text-muted-foreground mt-2">{t.onboarding.experimentHint}</p>
                      <p className="text-xs text-muted-foreground/80 mt-2 pt-2 border-t border-accent/40">{t.onboarding.adjustLaterHint}</p>
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
                  <Button onClick={handleComplete} size="xl" variant="gentle" className="px-10">
                    {t.onboarding.startObserving}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {canSwipe && (
          <p className="text-center text-xs text-muted-foreground/70 mt-6 sm:hidden">
            {t.onboarding.swipeHint}
          </p>
        )}
      </div>
    </div>
  );
}
