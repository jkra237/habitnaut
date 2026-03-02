import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { getDailyQuote } from '@/lib/quotes/quote-selector';

interface DailyQuoteCardProps {
  shownQuoteIds: number[];
  lastQuoteDate: string;
  markQuoteShown: (quoteId: number, date: string) => void;
  language: string;
}

export function DailyQuoteCard({ shownQuoteIds, lastQuoteDate, markQuoteShown, language }: DailyQuoteCardProps) {
  const today = new Date().toISOString().split('T')[0];

  const dailyQuote = useMemo(() => {
    // If pool needs reset, pass empty array
    const result = getDailyQuote(shownQuoteIds, language, today);
    if (result.resetPool) {
      return getDailyQuote([], language, today);
    }
    return result;
  }, [shownQuoteIds, language, today]);

  useEffect(() => {
    if (lastQuoteDate !== today && dailyQuote) {
      markQuoteShown(dailyQuote.quote.id, today);
    }
  }, [today, lastQuoteDate, dailyQuote, markQuoteShown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10"
    >
      <div className="flex gap-2.5">
        <Quote className="w-4 h-4 text-primary/40 mt-0.5 flex-shrink-0" />
        <div className="space-y-1.5">
          <p className="text-sm text-foreground/80 italic leading-relaxed">
            „{dailyQuote.text}"
          </p>
          <p className="text-xs text-muted-foreground">
            — {dailyQuote.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
