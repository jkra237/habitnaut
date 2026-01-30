import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, Trash2, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations, useLanguage } from '@/hooks/use-translations';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { de, es, enUS } from 'date-fns/locale';

export function GratitudeJournal() {
  const [showHistory, setShowHistory] = useState(false);
  const [text, setText] = useState('');
  const t = useTranslations();
  const language = useLanguage();
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const gratitudeEntries = useFlowNautStore((s) => s.gratitudeEntries);
  const addGratitude = useFlowNautStore((s) => s.addGratitude);
  const deleteGratitude = useFlowNautStore((s) => s.deleteGratitude);
  
  const getLocale = () => {
    switch (language) {
      case 'de': return de;
      case 'es': return es;
      default: return enUS;
    }
  };

  const formatEntryDate = (dateStr: string, createdAt: string) => {
    const date = parseISO(dateStr);
    const time = format(parseISO(createdAt), 'HH:mm');
    
    if (isToday(date)) {
      return `${t.time?.today || 'Heute'}, ${time}`;
    }
    if (isYesterday(date)) {
      return `${t.time?.yesterday || 'Gestern'}, ${time}`;
    }
    return format(date, 'EEEE, d. MMMM yyyy', { locale: getLocale() });
  };

  const formatHistoryDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'EEEE, d. MMMM yyyy', { locale: getLocale() });
  };

  const handleSave = () => {
    if (text.trim()) {
      addGratitude(todayStr, text.trim());
      setText('');
    }
  };

  const handleDelete = (id: string) => {
    deleteGratitude(id);
  };

  // Today's entries
  const todayEntries = gratitudeEntries
    .filter((e) => e.date === todayStr)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // Past entries (not from today)
  const pastEntries = gratitudeEntries
    .filter((e) => e.date !== todayStr)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
          {t.gratitude?.title}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => setShowHistory(!showHistory)}
        >
          <Calendar className="w-4 h-4" />
        </Button>
      </div>

      {/* Today's input */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {t.gratitude?.prompt}
        </p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.gratitude?.placeholder}
          className="min-h-[80px] resize-none bg-background/50 border-border/50 focus:border-primary/30"
        />
        <Button
          onClick={handleSave}
          disabled={!text.trim()}
          variant="gentle"
          size="sm"
          className="w-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t.gratitude?.save}
        </Button>
      </div>

      {/* Today's entries */}
      {todayEntries.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
          <p className="text-xs text-muted-foreground mb-2">
            {t.gratitude?.todayEntries}
          </p>
          {todayEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-primary/5 border border-primary/10 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {formatEntryDate(entry.date, entry.createdAt)}
                  </p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {entry.text}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                  title={t.gratitude?.delete}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* History panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground">
                {t.gratitude?.pastEntries}
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {pastEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                {t.gratitude?.noEntries}
              </p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {pastEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-secondary/50 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          {formatHistoryDate(entry.date)}
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {entry.text}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                        title={t.gratitude?.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
