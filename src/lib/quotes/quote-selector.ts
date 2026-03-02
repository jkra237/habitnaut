import { dailyQuotes, type DailyQuote } from './daily-quotes';

interface DailyQuoteResult {
  quote: DailyQuote;
  text: string;
  author: string;
  resetPool: boolean;
}

/**
 * Deterministically selects a daily quote based on the current date.
 * Each quote is shown only once until all 300 have been displayed, then the pool resets.
 */
export function getDailyQuote(
  shownQuoteIds: number[],
  language: string,
  dateStr?: string
): DailyQuoteResult {
  const today = dateStr || new Date().toISOString().split('T')[0];
  
  // Filter available quotes
  let available = dailyQuotes.filter(q => !shownQuoteIds.includes(q.id));
  let resetPool = false;
  
  // If all quotes have been shown, reset
  if (available.length === 0) {
    available = [...dailyQuotes];
    resetPool = true;
  }
  
  // Use date as deterministic seed
  const seed = hashDate(today);
  const index = seed % available.length;
  const quote = available[index];
  
  // Get text in the right language
  const lang = language as 'de' | 'en' | 'es';
  const text = quote[lang] || quote.en;
  
  return {
    quote,
    text,
    author: quote.author,
    resetPool,
  };
}

/** Simple deterministic hash from a date string */
function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
