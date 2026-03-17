// Activity Calendar Component
// Shows habit activities across past dates with gentle visualization

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown, ChevronUp, X, Grid3X3, List, Plus, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';
import { AddHabitDialog } from '@/components/habits/AddHabitDialog';
import type { Habit, HabitState } from '@/types/flownaut';
import { HabitIcon } from '@/lib/habit-icons';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  eachDayOfInterval, 
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
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
    const weeks = Array.isArray(habit.routineMonthWeek) ? habit.routineMonthWeek : [habit.routineMonthWeek];
    if (!weeks.includes(weekOfMonth)) return false;
  }
  return true;
}

const STATE_ICONS: Record<string, string> = {
  'done': '⭐',
  'conscious-skip': '🌱',
  'not-done': '○',
  'planned': '📌',
};

function LegendToggle({ legendLabel, hideLegendLabel, language, isDark, t }: {
  legendLabel: string;
  hideLegendLabel: string;
  language: string;
  isDark: boolean;
  t: any;
}) {
  const [showLegend, setShowLegend] = useState(false);
  return (
    <div className="mt-4 pt-3 border-t border-border/30">
      <button
        onClick={() => setShowLegend(!showLegend)}
        className="w-full flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors py-1"
      >
        <span>{showLegend ? hideLegendLabel : legendLabel}</span>
        {showLegend ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-2 mt-2"
          >
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
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
              <span>{language === 'de' ? 'Stimmung:' : language === 'es' ? 'Ánimo:' : 'Mood:'}</span>
              {[1, 2, 3, 4, 5].map(mood => (
                <div key={mood} className="flex items-center gap-0.5">
                  <div className="w-3 h-3 rounded" style={getMoodBgStyle(mood, isDark)} />
                  <span>{MOOD_EMOJIS[mood]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ActivityCalendarProps {
  className?: string;
}

export function ActivityCalendar({ className = '' }: ActivityCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ habitId: string; habitName: string; emoji: string } | null>(null);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const setHabitState = useFlowNautStore(s => s.setHabitState);
  const removeHabitState = useFlowNautStore(s => s.removeHabitState);
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

  // Get the days of the current week
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentWeek]);

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  // Build activity map including routine-planned habits
  const allDays = useMemo(() => {
    const monthSet = new Set(calendarDays.days.map(d => format(d, 'yyyy-MM-dd')));
    const weekSet = weekDays.map(d => format(d, 'yyyy-MM-dd'));
    weekSet.forEach(d => monthSet.add(d));
    return [...calendarDays.days, ...weekDays.filter(d => !monthSet.has(format(d, 'yyyy-MM-dd')))];
  }, [calendarDays.days, weekDays]);

  const activityMap = useMemo(() => {
    const map: Record<string, { 
      doneCount: number; 
      plannedCount: number;
      totalHabits: number; 
      mood?: number; 
      habits: { habit: Habit; state: HabitState | 'none' }[] 
    }> = {};
    
    const daysToProcess = viewMode === 'week' ? weekDays : calendarDays.days;
    
    daysToProcess.forEach(day => {
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
  }, [entries, activeHabits, calendarDays.days, weekDays, viewMode]);

  const goToPreviousMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const goToToday = () => { setCurrentMonth(new Date()); setCurrentWeek(new Date()); };
  const goToPreviousWeek = () => setCurrentWeek(prev => subWeeks(prev, 1));
  const goToNextWeek = () => setCurrentWeek(prev => addWeeks(prev, 1));

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

  const calendarTitle = language === 'de' ? 'Aktivitäten' : language === 'es' ? 'Actividades' : 'Activities';
  const showCalendarText = language === 'de' ? 'Kalender anzeigen' : language === 'es' ? 'Mostrar calendario' : 'Show calendar';
  const hideCalendarText = language === 'de' ? 'Kalender ausblenden' : language === 'es' ? 'Ocultar calendario' : 'Hide calendar';

  return (
    <div className={`bg-card rounded-2xl border border-border/50 shadow-card p-3 sm:p-5 ${className}`}>
      {/* Header with expand toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="font-serif font-medium text-foreground flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          {calendarTitle}
        </h2>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <span className="hidden sm:inline">{isExpanded ? hideCalendarText : showCalendarText}</span>
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
            {/* View mode toggle + Navigation */}
            <div className="flex items-center justify-between mt-3 mb-2 gap-1">
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={() => setViewMode('month')}
                  className={`p-1 sm:p-1.5 rounded-lg transition-all ${
                    viewMode === 'month' 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  }`}
                  title={language === 'de' ? 'Monatsansicht' : language === 'es' ? 'Vista mensual' : 'Month view'}
                >
                  <Grid3X3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`p-1 sm:p-1.5 rounded-lg transition-all ${
                    viewMode === 'week' 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  }`}
                  title={language === 'de' ? 'Wochenansicht' : language === 'es' ? 'Vista semanal' : 'Week view'}
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="flex items-center gap-0">
                <Button variant="ghost" size="icon" onClick={viewMode === 'month' ? goToPreviousMonth : goToPreviousWeek} className="h-7 w-7">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={goToToday}
                  className="text-[11px] sm:text-xs px-1.5 sm:px-3 min-w-0"
                >
                  {viewMode === 'month' ? monthName : (() => {
                    const ws = weekDays[0];
                    const we = weekDays[6];
                    return `${format(ws, 'd MMM')} – ${format(we, 'd MMM')}`;
                  })()}
                </Button>
                <Button variant="ghost" size="icon" onClick={viewMode === 'month' ? goToNextMonth : goToNextWeek} className="h-7 w-7">
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {viewMode === 'month' ? (
              <>
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
                  {Array.from({ length: calendarDays.paddingDays }).map((_, i) => (
                    <div key={`pad-${i}`} className="aspect-square" />
                  ))}
                  
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
                        
                        <div className="flex gap-0.5 mt-0.5">
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
              </>
            ) : (
              /* Weekly detailed view */
              <div className="space-y-2">
                {weekDays.map(day => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const activity = activityMap[dateStr];
                  const isToday = isSameDay(day, today);
                  const isFuture = day > today;
                  const dayIndex = getDay(day);
                  const isoDay = dayIndex === 0 ? 6 : dayIndex - 1;

                  return (
                    <motion.div
                      key={dateStr}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`rounded-xl p-2.5 sm:p-3 transition-all ${
                        isToday ? 'ring-2 ring-primary/50 bg-primary/5' : 'bg-secondary/30'
                      } ${isFuture ? 'opacity-50' : ''}`}
                      style={activity?.mood ? getMoodBgStyle(activity.mood, isDark) : undefined}
                    >
                      {/* Day header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                            {t.time.weekdays[weekdayKeys[isoDay]]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(day, 'd MMM')}
                          </span>
                        </div>
                        {activity?.mood && (
                          <span className="text-sm">{MOOD_EMOJIS[activity.mood]}</span>
                        )}
                      </div>

                      {/* Habit list for this day */}
                      {activity && activity.habits.filter(h => h.state !== 'none').length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {activity.habits
                            .filter(h => h.state !== 'none')
                            .map(habitEntry => (
                              <button
                                key={habitEntry.habit.id}
                                onClick={() => setSelectedDate(dateStr)}
                                className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] transition-all hover:ring-1 hover:ring-primary/30 ${
                                  habitEntry.state === 'done'
                                    ? 'bg-primary/15 text-foreground font-medium'
                                    : habitEntry.state === 'conscious-skip'
                                    ? 'bg-accent/15 text-foreground'
                                    : habitEntry.state === 'planned'
                                    ? 'bg-blue-500/10 text-muted-foreground'
                                    : 'bg-muted/40 text-muted-foreground'
                                }`}
                              >
                                <HabitIcon
                                  iconName={habitEntry.habit.emoji}
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                  fallback={<Circle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                                />
                                <span className="max-w-[60px] sm:max-w-[80px] truncate">{habitEntry.habit.name}</span>
                                <span className="text-[8px] sm:text-[9px]">{STATE_ICONS[habitEntry.state] || ''}</span>
                              </button>
                            ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-muted-foreground/60 italic">
                          {language === 'de' ? 'Keine Aktivitäten' : language === 'es' ? 'Sin actividades' : 'No activities'}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Collapsible Legend */}
            {(() => {
              const legendLabel = language === 'de' ? 'Legende anzeigen' : language === 'es' ? 'Mostrar leyenda' : 'Show legend';
              const hideLegendLabel = language === 'de' ? 'Legende ausblenden' : language === 'es' ? 'Ocultar leyenda' : 'Hide legend';
              return (
                <LegendToggle
                  legendLabel={legendLabel}
                  hideLegendLabel={hideLegendLabel}
                  language={language}
                  isDark={isDark}
                  t={t}
                />
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day detail dialog */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => { if (!open) setSelectedDate(null); }}>
        <DialogContent className="max-w-sm rounded-2xl p-5">
          <DialogTitle className="sr-only">
            {selectedDate ? format(new Date(selectedDate), 'd MMMM yyyy') : ''}
          </DialogTitle>
          {selectedDate && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-sm font-medium text-foreground">
                  {format(new Date(selectedDate), 'd MMMM yyyy')}
                </p>
                {selectedDayData?.mood && (
                  <span className="text-sm">{MOOD_EMOJIS[selectedDayData.mood]}</span>
                )}
              </div>
              
              {selectedDayData && selectedDayData.habits.filter(h => h.state !== 'none').length > 0 ? (
                <div className="space-y-2">
                  {selectedDayData.habits
                    .filter(h => h.state !== 'none')
                    .map((habitEntry) => (
                      <div key={habitEntry.habit.id} className="space-y-1.5">
                        {/* Habit name row */}
                        <div className={`flex items-center gap-2 text-sm py-1.5 px-2.5 rounded-lg ${
                          habitEntry.state === 'done' 
                            ? 'bg-primary/10 text-foreground' 
                            : habitEntry.state === 'conscious-skip'
                            ? 'bg-accent/10 text-foreground'
                            : habitEntry.state === 'planned'
                            ? 'bg-blue-500/10 text-foreground'
                            : 'bg-muted/30 text-muted-foreground'
                        }`}>
                          <HabitIcon
                            iconName={habitEntry.habit.emoji}
                            className="w-5 h-5"
                            fallback={<Circle className="w-5 h-5" />}
                          />
                          <span className={habitEntry.state === 'done' ? 'font-medium' : ''}>
                            {habitEntry.habit.name}
                          </span>
                          <span className="ml-auto text-xs">
                            {STATE_ICONS[habitEntry.state] || ''}
                          </span>
                        </div>
                        
                        {/* Status change buttons */}
                        <div className="flex gap-1 ml-2">
                          {(['done', 'conscious-skip', 'not-done', 'planned'] as HabitState[]).map(state => (
                            <button
                              key={state}
                              onClick={() => {
                                setHabitState(selectedDate, habitEntry.habit.id, state);
                              }}
                              className={`px-2 py-1 rounded-md text-[10px] transition-all ${
                                habitEntry.state === state
                                  ? 'bg-primary/20 border border-primary/40 text-primary font-medium'
                                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                              }`}
                            >
                              {STATE_ICONS[state]}
                            </button>
                          ))}
                          {/* Delete/clear button */}
                          <button
                            onClick={() => {
                              setConfirmDelete({
                                habitId: habitEntry.habit.id,
                                habitName: habitEntry.habit.name,
                                emoji: habitEntry.habit.emoji || '○',
                              });
                            }}
                            className="px-2 py-1 rounded-md text-[10px] bg-secondary/50 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete confirmation inline */}
                        <AnimatePresence>
                          {confirmDelete?.habitId === habitEntry.habit.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden ml-2"
                            >
                              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 space-y-2">
                                <p className="text-xs text-foreground">
                                  {language === 'de' 
                                    ? `Willst du „${confirmDelete.emoji} ${confirmDelete.habitName}" an diesem Datum wirklich löschen?`
                                    : language === 'es'
                                    ? `¿Realmente quieres eliminar „${confirmDelete.emoji} ${confirmDelete.habitName}" en esta fecha?`
                                    : `Do you really want to delete "${confirmDelete.emoji} ${confirmDelete.habitName}" on this date?`}
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      removeHabitState(selectedDate, confirmDelete.habitId);
                                      setConfirmDelete(null);
                                    }}
                                    className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                                  >
                                    {language === 'de' ? 'Ja' : language === 'es' ? 'Sí' : 'Yes'}
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
                                  >
                                    {language === 'de' ? 'Nein' : language === 'es' ? 'No' : 'No'}
                                  </button>
                                </div>
                              </div>
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

              {/* Add habit button */}
              <button
                onClick={() => setShowAddHabit(true)}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                {language === 'de' ? 'Gewohnheit hinzufügen' : language === 'es' ? 'Añadir hábito' : 'Add habit'}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add habit dialog triggered from calendar */}
      <AddHabitDialog isOpen={showAddHabit} onClose={() => setShowAddHabit(false)} />
    </div>
  );
}
