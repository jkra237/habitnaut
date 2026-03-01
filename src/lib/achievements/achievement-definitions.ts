import type { AchievementDefinition } from '@/types/achievements';
import type { UserState, DayEntry, Habit } from '@/types/flownaut';

// Helper: get ISO week key from date string
function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay() || 7; // Make Sunday = 7
  d.setDate(d.getDate() + 4 - day);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getFullYear()}-W${weekNo}`;
}

// Helper: get all days with at least one 'done'
function getDaysWithDone(entries: DayEntry[]): string[] {
  return entries.filter(e =>
    Object.values(e.habits).some(s => s === 'done')
  ).map(e => e.date);
}

// Helper: get weeks with at least one 'done'
function getWeeksWithDone(entries: DayEntry[]): Set<string> {
  const days = getDaysWithDone(entries);
  return new Set(days.map(d => getWeekKey(d)));
}

// Helper: count total done check-ins
function countTotalDone(entries: DayEntry[]): number {
  return entries.reduce((sum, e) =>
    sum + Object.values(e.habits).filter(s => s === 'done').length, 0);
}

// Helper: detect pauses (7+ days gap) followed by return
function detectPausesWithReturn(entries: DayEntry[]): number {
  const days = getDaysWithDone(entries).sort();
  if (days.length < 2) return 0;
  let pauses = 0;
  for (let i = 1; i < days.length; i++) {
    const diff = (new Date(days[i]).getTime() - new Date(days[i - 1]).getTime()) / 86400000;
    if (diff >= 7) pauses++;
  }
  return pauses;
}

// Helper: days since habit creation
function habitAgeDays(habit: Habit): number {
  const created = new Date(habit.createdAt);
  return Math.floor((Date.now() - created.getTime()) / 86400000);
}

// Helper: check if a habit has at least one done per week since creation
function habitWeeklyPresence(habit: Habit, entries: DayEntry[], minWeeks: number): boolean {
  const age = habitAgeDays(habit);
  if (age < minWeeks * 7) return false;
  const habitDays = entries
    .filter(e => e.habits[habit.id] === 'done')
    .map(e => e.date);
  if (habitDays.length === 0) return false;
  const weeks = new Set(habitDays.map(d => getWeekKey(d)));
  // Need presence in at least minWeeks different weeks
  return weeks.size >= minWeeks;
}

// Helper: get days where specific habits co-occur as done
function coOccurrenceDays(entries: DayEntry[], habitIds: string[]): number {
  return entries.filter(e =>
    habitIds.every(id => e.habits[id] === 'done')
  ).length;
}

// Helper: active habits over N+ weeks
function activeHabitsOverWeeks(habits: Habit[], entries: DayEntry[], minHabits: number, maxHabits: number, minWeeks: number): boolean {
  const active = habits.filter(h => !h.isResting);
  if (active.length < minHabits || active.length > maxHabits) return false;
  // Check if these habits have been around for minWeeks
  return active.every(h => habitAgeDays(h) >= minWeeks * 7);
}

// Helper: detect recurring weekly pattern (same weekdays)
function hasRecurringWeekPattern(entries: DayEntry[]): boolean {
  const daysWithDone = getDaysWithDone(entries);
  if (daysWithDone.length < 8) return false;
  
  // Group by week, track which weekdays had activity
  const weekDays: Record<string, Set<number>> = {};
  for (const d of daysWithDone) {
    const wk = getWeekKey(d);
    if (!weekDays[wk]) weekDays[wk] = new Set();
    weekDays[wk].add(new Date(d).getDay());
  }
  
  const weeks = Object.values(weekDays).filter(s => s.size > 0);
  if (weeks.length < 3) return false;
  
  // Check if at least 2 weekdays appear in 3+ weeks
  const dayCounts: Record<number, number> = {};
  for (const w of weeks) {
    for (const day of w) {
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
  }
  const recurringDays = Object.values(dayCounts).filter(c => c >= 3).length;
  return recurringDays >= 2;
}

// Helper: span of entries in weeks
function entrySpanWeeks(entries: DayEntry[]): number {
  if (entries.length === 0) return 0;
  const dates = entries.map(e => new Date(e.date).getTime());
  const span = Math.max(...dates) - Math.min(...dates);
  return Math.floor(span / (7 * 86400000));
}

export const achievementDefinitions: AchievementDefinition[] = [
  // A) Entry
  { key: 'first_step', category: 'A', emoji: '🌱', check: (s) => s.habits.length >= 1 },
  { key: 'first_mark', category: 'A', emoji: '✨', check: (s) => countTotalDone(s.entries) >= 1 },
  { key: 'getting_started', category: 'A', emoji: '🚀', check: (s) => countTotalDone(s.entries) >= 3 },
  { key: 'showing_up', category: 'A', emoji: '📅', check: (s) => getWeeksWithDone(s.entries).size >= 1 },
  { key: 'back_again', category: 'A', emoji: '🔄', check: (s) => detectPausesWithReturn(s.entries) >= 1 },

  // B) Weekly presence
  { key: 'quiet_week', category: 'B', emoji: '🍃', check: (s) => {
    // 1 week with done on >= 3 different days
    const daysByWeek: Record<string, Set<string>> = {};
    for (const e of s.entries) {
      if (Object.values(e.habits).some(h => h === 'done')) {
        const wk = getWeekKey(e.date);
        if (!daysByWeek[wk]) daysByWeek[wk] = new Set();
        daysByWeek[wk].add(e.date);
      }
    }
    return Object.values(daysByWeek).some(days => days.size >= 3);
  }},
  { key: 'gentle_continuity', category: 'B', emoji: '🌿', check: (s) => getWeeksWithDone(s.entries).size >= 2 },
  { key: 'still_going', category: 'B', emoji: '🌊', check: (s) => getWeeksWithDone(s.entries).size >= 3 },
  { key: 'soft_rhythm', category: 'B', emoji: '🎵', check: (s) => getWeeksWithDone(s.entries).size >= 4 },
  { key: 'reliable_return', category: 'B', emoji: '🏡', check: (s) => detectPausesWithReturn(s.entries) >= 2 },

  // C) Single habits
  { key: 'old_friend', category: 'C', emoji: '🤝', check: (s) => 
    s.habits.some(h => habitWeeklyPresence(h, s.entries, 4) && habitAgeDays(h) >= 30) },
  { key: 'long_companion', category: 'C', emoji: '🌳', check: (s) => 
    s.habits.some(h => habitWeeklyPresence(h, s.entries, 8) && habitAgeDays(h) >= 60) },
  { key: 'steady_presence', category: 'C', emoji: '⛰️', check: (s) => 
    s.habits.some(h => habitWeeklyPresence(h, s.entries, 12) && habitAgeDays(h) >= 90) },
  { key: 'letting_it_rest', category: 'C', emoji: '😴', check: (s) => s.habits.some(h => h.isResting) },
  { key: 'picking_it_up_again', category: 'C', emoji: '🌅', check: (s) => {
    // A habit that is currently active, was once resting, and has a done entry
    // We detect this by: habit is not resting + has done entries
    // Since we can't track history of isResting, we check if any active habit has entries after being created
    // Simplified: any habit that is active and has restingNote (was rested before)
    return s.habits.some(h => !h.isResting && h.restingNote && 
      s.entries.some(e => e.habits[h.id] === 'done'));
  }},

  // D) Multiple habits
  { key: 'small_circle', category: 'D', emoji: '🔵', check: (s) => {
    const active = s.habits.filter(h => !h.isResting);
    return active.length >= 1 && active.length <= 2 && 
      active.every(h => habitAgeDays(h) >= 21);
  }},
  { key: 'balanced_set', category: 'D', emoji: '⚖️', check: (s) => {
    const active = s.habits.filter(h => !h.isResting);
    return active.length >= 3 && active.length <= 4 && 
      active.every(h => habitAgeDays(h) >= 21);
  }},
  { key: 'focused_practice', category: 'D', emoji: '🎯', check: (s) => {
    const active = s.habits.filter(h => !h.isResting);
    if (active.length === 0) return false;
    // Check if there's a week where all active habits were done
    const weekHabits: Record<string, Set<string>> = {};
    for (const e of s.entries) {
      const wk = getWeekKey(e.date);
      if (!weekHabits[wk]) weekHabits[wk] = new Set();
      for (const [id, state] of Object.entries(e.habits)) {
        if (state === 'done') weekHabits[wk].add(id);
      }
    }
    const activeIds = new Set(active.map(h => h.id));
    return Object.values(weekHabits).some(doneIds => 
      [...activeIds].every(id => doneIds.has(id)));
  }},
  { key: 'changing_needs', category: 'D', emoji: '🔀', check: (s) => {
    const hasResting = s.habits.some(h => h.isResting);
    const hasNew = s.habits.some(h => !h.isResting && habitAgeDays(h) < 14);
    return hasResting && hasNew;
  }},
  { key: 'trying_things_out', category: 'D', emoji: '🧪', check: (s) => s.habits.length >= 4 },

  // E) Patterns
  { key: 'gentle_pair', category: 'E', emoji: '👫', check: (s) => {
    const active = s.habits.filter(h => !h.isResting);
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        if (coOccurrenceDays(s.entries, [active[i].id, active[j].id]) >= 5) return true;
      }
    }
    return false;
  }},
  { key: 'supportive_set', category: 'E', emoji: '🤗', check: (s) => {
    const active = s.habits.filter(h => !h.isResting);
    if (active.length < 3) return false;
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        for (let k = j + 1; k < active.length; k++) {
          if (coOccurrenceDays(s.entries, [active[i].id, active[j].id, active[k].id]) >= 3) return true;
        }
      }
    }
    return false;
  }},
  { key: 'recurring_pattern', category: 'E', emoji: '🔁', check: (s) => hasRecurringWeekPattern(s.entries) },
  { key: 'natural_flow', category: 'E', emoji: '🌸', check: (s) => {
    // Habits without daily frequency that still show regular presence
    const nonDaily = s.habits.filter(h => !h.isResting && h.softFrequency !== 'daily');
    return nonDaily.some(h => habitWeeklyPresence(h, s.entries, 3));
  }},
  { key: 'own_pace', category: 'E', emoji: '🐢', check: (s) => {
    // Irregular but present over 4+ weeks
    const weeks = getWeeksWithDone(s.entries);
    return weeks.size >= 4 && entrySpanWeeks(s.entries) >= 4;
  }},

  // F) Long-term
  { key: 'staying_with_it', category: 'F', emoji: '🏔️', check: (s) => entrySpanWeeks(s.entries) >= 4 },
  { key: 'quiet_consistency', category: 'F', emoji: '🕊️', check: (s) => getWeeksWithDone(s.entries).size >= 6 },
  { key: 'gentle_commitment', category: 'F', emoji: '💎', check: (s) => getWeeksWithDone(s.entries).size >= 8 },
  { key: 'living_with_habits', category: 'F', emoji: '🏠', check: (s) => {
    const longHabits = s.habits.filter(h => habitAgeDays(h) >= 60 && !h.isResting);
    return longHabits.length >= 3;
  }},
  { key: 'aware_practice', category: 'F', emoji: '🧘', check: (s) => getWeeksWithDone(s.entries).size >= 10 },
];
