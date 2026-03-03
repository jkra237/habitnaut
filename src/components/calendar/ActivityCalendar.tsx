// Activity Calendar Component
// Shows habit activities across past dates with gentle visualization

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';
import { HabitOptions } from '@/components/habits/HabitOptions';
import type { Habit, HabitState } from '@/types/flownaut';
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

const MOOD_EMOJIS: Record<number, string> = {
  1: '😔', 2: '😐', 3: '🙂', 4: '😊', 5: '✨',
};

function getMoodBgStyle(mood: number, isDark: boolean): React.CSSProperties {
  const colors: Record<number, { light: string; dark: string }> = {
    1: { light: '#fee2e2', dark: 'rgba(239,68,68,0.2)' },
    2: { light: '#ffedd5', dark: 'rgba(249,115,22,0.2)' },
    3: { light: '#fef9c3', dark: 'rgba(234,179,8,0.2)' },
    4: { light: '#dcfce7', dark: 'rgba(34,197,94,0.2)' },
    5: { light: '#bbf7d0', dark: 'rgba(22,163,74,0.25)' },
  };
  const c = colors[mood];
  if (!c) return {};
  return { backgroundColor: isDark ? c.dark : c.light };
}

/** Check if a habit's routine matches a given date */
function isRoutinePlanned(habit: Habit, date: Date): boolean {
  if (!habit.routineDays || habit.routineDays.length === 0) return false;
  const jsDay = getDay(date);
  const isoDay = jsDay === 0 ? 6 : jsDay - 1;
  if (!habit.routineDays.includes(isoDay)) return false;
  if (habit.routineFrequency === 'monthly' && habit.routineMonthWeek) {
    const weekOfMonth = Math.ceil(date.getDate() / 7);
    if (weekOfMonth !== habit.routineMonthWeek) return false;
  }
  return true;
}

const STATE_ICONS: Record<string, string> = {
  'done': '✓',
  'conscious-skip': '🌱',
  'not-done': '○',
  'planned': '📌',
};

interface ActivityCalendarProps {
  className?: string;
}

export function ActivityCalendar({ className = '' }: ActivityCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.habits);
  const activeHabits = useMemo(() => habits.filter(h => !h.isResting), [habits]);
  const t = useTranslations();
  const language = useFlowNautStore(s => s.preferences.language);

  // Get the days of the current month plus padding days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const startDay = getDay(start);
    const paddingDays = startDay === 0 ? 6 : startDay - 1;
    return { days, paddingDays };
  }, [currentMonth]);

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  // Build activity map including routine-planned habits
  const activityMap = useMemo(() => {
    const map: Record<string, { 
      doneCount: number; 
      plannedCount: number;
      totalHabits: number; 
      mood?: number; 
      habits: { habit: Habit; state: HabitState | 'none' }[] 
    }> = {};
    
    // Process all days in the current month view
    calendarDays.days.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const entry = entries.find(e => e.date === dateStr);
      
      const habitStates = activeHabits.map(h => {
        const explicitState = entry?.habits[h.id];
        if (explicitState) return { habit: h, state: explicitState as HabitState };
        if (isRoutinePlanned(h, day)) return { habit: h, state: 'planned' as HabitState };
        return { habit: h, state: 'none' as ('none') };
      });

      const doneCount = habitStates.filter(hs => hs.state === 'done').length;
      const plannedCount = habitStates.filter(hs => hs.state === 'planned').length;
      const hasAnyActivity = doneCount > 0 || plannedCount > 0 || (entry?.mood !== undefined);
      
      // Only relevant habits (have a state)
      const relevantHabits = habitStates.filter(hs => hs.state !== 'none');
      
      if (hasAnyActivity || relevantHabits.length > 0) {
        map[dateStr] = {
          doneCount,
          plannedCount,
          totalHabits: activeHabits.length,
          mood: entry?.mood,
          habits: habitStates,
        };
      }
    });
    
    return map;
  }, [entries, activeHabits, calendarDays.days]);

  const goToPreviousMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const today = new Date();
  const isCurrentMonth = isSameMonth(currentMonth, today);

  const monthName = useMemo(() => {
    const monthIndex = currentMonth.getMonth();
    const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;
    const year = currentMonth.getFullYear();
    return `${t.time.months[monthKeys[monthIndex]]} ${year}`;
  }, [currentMonth, t]);

  const weekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  const selectedDayData = selectedDate ? activityMap[selectedDate] : null;
  const editingHabit = editingHabitId ? activeHabits.find(h => h.id === editingHabitId) : null;

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
            <div className="grid grid-cols-7 gap-1 mb-1">
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
                
                const fillLevel = activity && activity.totalHabits > 0 
                  ? activity.doneCount / activity.totalHabits 
                  : 0;

                const hasPlanned = activity && activity.plannedCount > 0;
                
                return (
                  <motion.button
                    key={dateStr}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all
                      ${isToday ? 'ring-2 ring-primary ring-inset' : ''}
                      ${isFuture && !hasPlanned ? 'opacity-30 cursor-default' : 'cursor-pointer hover:bg-primary/5'}
                      ${isSelected ? 'bg-primary/20 ring-2 ring-primary/50 ring-inset' : !activity?.mood ? (fillLevel > 0 ? 'bg-primary/10' : 'bg-muted/30') : ''}
                    `}
                    style={!isSelected && activity?.mood ? getMoodBgStyle(activity.mood, isDark) : undefined}
                  >
                    <span className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-foreground/70'}`}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Activity indicators */}
                    <div className="flex gap-0.5 mt-0.5">
                      {/* Done dots */}
                      {activity && activity.doneCount > 0 && (
                        <>
                          {activity.doneCount >= 3 ? (
                            <>
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              <div className="w-1 h-1 rounded-full bg-primary" />
                            </>
                          ) : activity.doneCount === 2 ? (
                            <>
                              <div className="w-1 h-1 rounded-full bg-primary/80" />
                              <div className="w-1 h-1 rounded-full bg-primary/80" />
                            </>
                          ) : (
                            <div className="w-1 h-1 rounded-full bg-primary/60" />
                          )}
                        </>
                      )}
                      {/* Planned indicators (shown when no done habits) */}
                      {activity && activity.doneCount === 0 && hasPlanned && (
                        <>
                          {activity.plannedCount >= 3 ? (
                            <>
                              <span className="text-[7px] leading-none">📌</span>
                              <span className="text-[7px] leading-none">📌</span>
                              <span className="text-[7px] leading-none">📌</span>
                            </>
                          ) : activity.plannedCount === 2 ? (
                            <>
                              <span className="text-[7px] leading-none">📌</span>
                              <span className="text-[7px] leading-none">📌</span>
                            </>
                          ) : (
                            <span className="text-[7px] leading-none">📌</span>
                          )}
                        </>
                      )}
                    </div>
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
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(selectedDate), 'd MMMM yyyy')}
                    </p>
                    {selectedDayData?.mood && (
                      <span className="text-sm">{MOOD_EMOJIS[selectedDayData.mood]}</span>
                    )}
                  </div>
                  
                  {selectedDayData && selectedDayData.habits.filter(h => h.state !== 'none').length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedDayData.habits
                        .filter(h => h.state !== 'none')
                        .map((habitEntry) => (
                          <div key={habitEntry.habit.id}>
                            <button
                              onClick={() => setEditingHabitId(
                                editingHabitId === habitEntry.habit.id ? null : habitEntry.habit.id
                              )}
                              className={`w-full flex items-center gap-2 text-sm py-1.5 px-2.5 rounded-lg transition-colors ${
                                habitEntry.state === 'done' 
                                  ? 'bg-primary/10 text-foreground hover:bg-primary/15' 
                                  : habitEntry.state === 'conscious-skip'
                                  ? 'bg-accent/10 text-foreground hover:bg-accent/15'
                                  : habitEntry.state === 'planned'
                                  ? 'bg-blue-500/10 text-foreground hover:bg-blue-500/15'
                                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                              }`}
                            >
                              <span className="text-base">{habitEntry.habit.emoji || '○'}</span>
                              <span className={habitEntry.state === 'done' ? 'font-medium' : ''}>
                                {habitEntry.habit.name}
                              </span>
                              <span className="ml-auto text-xs">
                                {STATE_ICONS[habitEntry.state] || ''}
                              </span>
                            </button>
                            
                            {/* Inline habit options */}
                            <AnimatePresence>
                              {editingHabitId === habitEntry.habit.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-1 ml-2"
                                >
                                  <HabitOptions
                                    habit={habitEntry.habit}
                                    onClose={() => setEditingHabitId(null)}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
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
            <div className="mt-4 pt-3 border-t border-border/30 space-y-2">
              <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
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
              <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>📌</span>
                  <span>{t.habits.planned}</span>
                </div>
              </div>
              {/* Mood color legend */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <span>{language === 'de' ? 'Stimmung:' : language === 'es' ? 'Ánimo:' : 'Mood:'}</span>
                {[1, 2, 3, 4, 5].map(mood => (
                  <div key={mood} className="flex items-center gap-0.5">
                    <div className="w-3 h-3 rounded" style={getMoodBgStyle(mood, isDark)} />
                    <span>{MOOD_EMOJIS[mood]}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
