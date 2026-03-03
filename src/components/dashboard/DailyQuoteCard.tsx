import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';
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
      className="mt-4 p-4 rounded-xl bg-amber-400/10 border border-amber-400/20"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Smile className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1 min-w-0 pt-0.5">
          <p className="text-xs text-foreground/80 italic leading-relaxed">
            „{dailyQuote.text}"
          </p>
          <p className="text-[11px] text-muted-foreground">
            — {dailyQuote.author === 'Unbekannt' 
              ? (language === 'de' ? 'Unbekannt' : language === 'es' ? 'Desconocido' : 'Unknown')
              : dailyQuote.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
