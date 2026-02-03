// Activity Calendar Component
// Shows habit activities across past dates with gentle visualization

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns';

interface ActivityCalendarProps {
  className?: string;
}

export function ActivityCalendar({ className = '' }: ActivityCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.getActiveHabits());
  const t = useTranslations();
  const language = useFlowNautStore(s => s.preferences.language);

  // Get the days of the current month plus padding days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Add padding for week start (Monday = 1)
    const startDay = getDay(start);
    const paddingDays = startDay === 0 ? 6 : startDay - 1;
    
    return { days, paddingDays };
  }, [currentMonth]);

  // Create a map of date -> activity data
  const activityMap = useMemo(() => {
    const map: Record<string, { doneCount: number; totalHabits: number; habits: { name: string; emoji?: string; state: string }[] }> = {};
    
    entries.forEach(entry => {
      const habitsData = habits.map(h => ({
        name: h.name,
        emoji: h.emoji,
        state: entry.habits[h.id] || 'not-done',
      }));
      
      const doneCount = Object.values(entry.habits).filter(s => s === 'done').length;
      
      map[entry.date] = {
        doneCount,
        totalHabits: habits.length,
        habits: habitsData,
      };
    });
    
    return map;
  }, [entries, habits]);

  const goToPreviousMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const today = new Date();
  const isCurrentMonth = isSameMonth(currentMonth, today);

  // Format month name
  const monthName = useMemo(() => {
    const monthIndex = currentMonth.getMonth();
    const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;
    const year = currentMonth.getFullYear();
    return `${t.time.months[monthKeys[monthIndex]]} ${year}`;
  }, [currentMonth, t]);

  // Weekday headers
  const weekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  // Get selected day's activities
  const selectedDayActivities = selectedDate ? activityMap[selectedDate] : null;

  const calendarTitle = language === 'de' ? 'Aktivitäten' : language === 'es' ? 'Actividades' : 'Activities';
  const showCalendarText = language === 'de' ? 'Kalender anzeigen' : language === 'es' ? 'Mostrar calendario' : 'Show calendar';
  const hideCalendarText = language === 'de' ? 'Kalender ausblenden' : language === 'es' ? 'Ocultar calendario' : 'Hide calendar';

  return (
    <div className={`bg-card rounded-2xl border border-border/50 shadow-card p-5 ${className}`}>
      {/* Header with expand toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          {calendarTitle}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{isExpanded ? hideCalendarText : showCalendarText}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-3">
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth} className="h-8 w-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goToToday}
                className="text-xs min-w-[120px]"
              >
                {monthName}
              </Button>
              <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-8 w-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekdayKeys.map(day => (
                <div 
                  key={day} 
                  className="text-center text-[10px] font-medium text-muted-foreground uppercase tracking-wider py-1"
                >
                  {t.time.weekdays[day].slice(0, 2)}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Padding days */}
              {Array.from({ length: calendarDays.paddingDays }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}
              
              {/* Actual days */}
              {calendarDays.days.map(day => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const activity = activityMap[dateStr];
                const isToday = isSameDay(day, today);
                const isFuture = day > today;
                const isSelected = selectedDate === dateStr;
                
                // Calculate fill level (0-1)
                const fillLevel = activity && activity.totalHabits > 0 
                  ? activity.doneCount / activity.totalHabits 
                  : 0;
                
                return (
                  <motion.button
                    key={dateStr}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => !isFuture && setSelectedDate(isSelected ? null : dateStr)}
                    disabled={isFuture}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all
                      ${isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''}
                      ${isFuture ? 'opacity-30 cursor-default' : 'cursor-pointer hover:bg-primary/5'}
                      ${isSelected ? 'bg-primary/20 ring-2 ring-primary/50' : fillLevel > 0 ? 'bg-primary/10' : 'bg-muted/30'}
                    `}
                  >
                    <span className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-foreground/70'}`}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Activity indicator - based on number of done habits */}
                    {activity && activity.doneCount > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {activity.doneCount === 1 && (
                          <div className="w-1 h-1 rounded-full bg-primary/60" />
                        )}
                        {activity.doneCount === 2 && (
                          <>
                            <div className="w-1 h-1 rounded-full bg-primary/80" />
                            <div className="w-1 h-1 rounded-full bg-primary/80" />
                          </>
                        )}
                        {activity.doneCount >= 3 && (
                          <>
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <div className="w-1 h-1 rounded-full bg-primary" />
                          </>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Selected day details */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border/30"
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    {format(new Date(selectedDate), 'd MMMM yyyy')}
                  </p>
                  
                  {selectedDayActivities && selectedDayActivities.habits.length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedDayActivities.habits.map((habit, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center gap-2 text-sm py-1 px-2 rounded-lg ${
                            habit.state === 'done' 
                              ? 'bg-primary/10 text-foreground' 
                              : habit.state === 'skipped'
                              ? 'bg-muted/50 text-muted-foreground'
                              : 'text-muted-foreground/50'
                          }`}
                        >
                          <span className="text-base">{habit.emoji || '○'}</span>
                          <span className={habit.state === 'done' ? 'font-medium' : ''}>
                            {habit.name}
                          </span>
                          {habit.state === 'done' && (
                            <span className="ml-auto text-xs text-primary">✓</span>
                          )}
                          {habit.state === 'skipped' && (
                            <span className="ml-auto text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {language === 'de' ? 'Keine Aktivitäten an diesem Tag' : 
                       language === 'es' ? 'Sin actividades este día' : 
                       'No activities on this day'}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span>1 {language === 'de' ? 'Gewohnheit' : language === 'es' ? 'hábito' : 'habit'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                </div>
                <span>2 {language === 'de' ? 'Gewohnheiten' : language === 'es' ? 'hábitos' : 'habits'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <span>3+ {language === 'de' ? 'Gewohnheiten' : language === 'es' ? 'hábitos' : 'habits'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
