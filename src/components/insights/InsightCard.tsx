import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import type { Insight } from '@/types/flownaut';

interface InsightCardProps {
  insight: Insight;
  index?: number;
}

const iconMap = {
  correlation: <TrendingUp className="w-5 h-5" />,
  pattern: <Sparkles className="w-5 h-5" />,
  prompt: <Lightbulb className="w-5 h-5" />,
};

const bgMap = {
  correlation: 'bg-calm/20 border-calm/30 text-calm-foreground',
  pattern: 'bg-awareness/20 border-awareness/30 text-awareness-foreground',
  prompt: 'bg-accent/20 border-accent/30 text-accent-foreground',
};

export function InsightCard({ insight, index = 0 }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-2xl border ${bgMap[insight.type]}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
          {iconMap[insight.type]}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {insight.message}
          </p>
          <p className="text-xs opacity-60">
            {insight.type === 'correlation' && 'Noticed a connection'}
            {insight.type === 'pattern' && 'A pattern emerged'}
            {insight.type === 'prompt' && 'Something to consider'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Sample insights for demo
export const DEMO_INSIGHTS: Omit<Insight, 'id' | 'generatedAt'>[] = [
  {
    type: 'correlation',
    message: 'Your calmest days tend to have movement in them. Not because exercise fixes everything – but the pattern is interesting.',
  },
  {
    type: 'pattern',
    message: 'You\'ve been more consistent on Tuesday and Wednesday. The middle of the week seems to suit your rhythm.',
  },
  {
    type: 'prompt',
    message: 'What did this habit bring you this week?',
  },
];
