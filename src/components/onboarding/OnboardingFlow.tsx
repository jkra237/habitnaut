import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { PersonalityProfile, OnboardingAnswer } from '@/types/flownaut';
import { Leaf, Moon, Sun, Zap, Heart, Compass } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  optionA: { text: string; icon: React.ReactNode };
  optionB: { text: string; icon: React.ReactNode };
  axis: keyof PersonalityProfile;
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
    id: 'tone',
    question: 'When something doesn\'t work, what helps you more?',
    optionA: { text: 'A gentle reminder', icon: <Heart className="w-5 h-5" /> },
    optionB: { text: 'A clear nudge', icon: <Zap className="w-5 h-5" /> },
    axis: 'approach', // We'll handle this separately for tone
    aValue: 'gentle',
    bValue: 'clear',
  },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswer[]>([]);
  const completeOnboarding = useFlowNautStore((s) => s.completeOnboarding);

  const isWelcome = step === 0;
  const currentQuestion = !isWelcome ? questions[step - 1] : null;
  const isComplete = step > questions.length;

  const handleChoice = (choice: 'a' | 'b') => {
    if (!currentQuestion) return;
    
    setAnswers([...answers, { questionId: currentQuestion.id, choice }]);
    setStep(step + 1);
  };

  const handleComplete = () => {
    // Build personality from answers
    const personality: PersonalityProfile = {
      rhythm: 'flexible',
      energy: 'waves',
      motivation: 'mixed',
      approach: 'adaptive',
    };
    
    let tone: 'gentle' | 'clear' = 'gentle';

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) return;
      
      if (question.id === 'tone') {
        tone = answer.choice === 'a' ? 'gentle' : 'clear';
      } else {
        const value = answer.choice === 'a' ? question.aValue : question.bValue;
        (personality as any)[question.axis] = value;
      }
    });

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
