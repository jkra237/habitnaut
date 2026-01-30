import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import type { Insight } from '@/types/flownaut';
import { useTranslations } from '@/hooks/use-translations';

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
  const t = useTranslations();
  
  const getInsightLabel = (type: Insight['type']) => {
    switch (type) {
      case 'correlation':
        return t.insights.noticedConnection;
      case 'pattern':
        return t.insights.patternEmerged;
      case 'prompt':
        return t.insights.somethingToConsider;
      default:
        return '';
    }
  };

  const getLocalizedMessage = (insight: Insight): string => {
    // If there's a messageKey, use the translation system
    if (insight.messageKey) {
      try {
        const [category, key] = insight.messageKey.split('.') as [
          'patterns' | 'correlations' | 'prompts',
          string
        ];
        
        const categoryTranslations = t.insights[category];
        if (categoryTranslations && typeof categoryTranslations === 'object' && key in categoryTranslations) {
          let message = (categoryTranslations as Record<string, string>)[key];
          
          // Replace placeholders with actual values
          if (insight.messageParams && message) {
            Object.entries(insight.messageParams).forEach(([param, value]) => {
              message = message.replace(`{${param}}`, value);
            });
          }
          
          if (message) {
            return message;
          }
        }
      } catch {
        // Fall through to fallback
      }
    }
    
    // Fallback to the stored message (for demo insights or legacy data)
    return insight.message || '';
  };

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
            {getLocalizedMessage(insight)}
          </p>
          <p className="text-xs opacity-60">
            {getInsightLabel(insight.type)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Sample insights for demo - now with translation keys
export const DEMO_INSIGHTS: Omit<Insight, 'id' | 'generatedAt'>[] = [
  {
    type: 'correlation',
    messageKey: 'correlations.highEnergyMoreCheckins',
    message: '',
  },
  {
    type: 'pattern',
    messageKey: 'patterns.consistentDays',
    message: '',
  },
  {
    type: 'prompt',
    messageKey: 'prompts.mostNaturalHabit',
    message: '',
  },
];
