// Activity Calendar Component
// Shows habit activities across past dates with gentle visualization

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
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
  parseISO,
} from 'date-fns';

interface ActivityCalendarProps {
  className?: string;
}

export function ActivityCalendar({ className = '' }: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  return (
    <div className={`bg-card rounded-2xl border border-border/50 shadow-card p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          {language === 'de' ? 'Aktivitäten' : language === 'es' ? 'Actividades' : 'Activities'}
        </h2>
        
        <div className="flex items-center gap-2">
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
          
          // Calculate fill level (0-1)
          const fillLevel = activity && activity.totalHabits > 0 
            ? activity.doneCount / activity.totalHabits 
            : 0;
          
          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center relative
                ${isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''}
                ${isFuture ? 'opacity-30' : ''}
                ${fillLevel > 0 ? 'bg-primary/10' : 'bg-muted/30'}
              `}
              title={activity ? `${activity.doneCount} of ${activity.totalHabits} habits` : undefined}
            >
              <span className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-foreground/70'}`}>
                {format(day, 'd')}
              </span>
              
              {/* Activity indicator */}
              {fillLevel > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {fillLevel > 0 && fillLevel <= 0.33 && (
                    <div className="w-1 h-1 rounded-full bg-primary/50" />
                  )}
                  {fillLevel > 0.33 && fillLevel <= 0.66 && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-primary/70" />
                      <div className="w-1 h-1 rounded-full bg-primary/70" />
                    </>
                  )}
                  {fillLevel > 0.66 && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <div className="w-1 h-1 rounded-full bg-primary" />
                    </>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <span>{t.timeline.partial}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span>{t.timeline.engaged}</span>
        </div>
      </div>
    </div>
  );
}
