// Detailed habit statistics calculator
import { parseISO, differenceInDays, format, startOfMonth, endOfMonth, getDay, startOfWeek, endOfWeek, eachDayOfInterval, subDays, getDaysInMonth } from 'date-fns';
import type { Habit, DayEntry } from '@/types/flownaut';

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  totalDaysLogged: number;
  topStreaks: number[]; // top 5 longest streaks
}

export interface RhythmInfo {
  weeklyRate: number; // % last 7 days
  monthlyRate: number; // % current calendar month
  yearlyCheckins: number; // out of 365
  bestWeekday: number; // 0-6 (Sunday-Saturday)
  bestWeekdayRate: number;
  weekdayRate: number; // avg weekday completion %
  weekendRate: number; // avg weekend completion %
}

export interface ConsistencyInfo {
  score: number; // 0-100
}

export interface ProgressInfo {
  nextMilestone: number;
  daysToMilestone: number;
  avgRecoveryDays: number;
  perfectWeeks: number;
  thisMonthVsLast: number; // positive = improvement
  bestMonth: { month: number; year: number; count: number } | null;
}

export interface HabitPairInfo {
  habitA: Habit;
  habitB: Habit;
  count: number;
  percentage: number;
}

export interface YearHeatmapDay {
  date: string;
  count: number; // 0 = no activity, 1+ = done count
}

export interface DetailedStats {
  streaks: StreakInfo;
  rhythm: RhythmInfo;
  consistency: ConsistencyInfo;
  progress: ProgressInfo;
  pairs: HabitPairInfo[];
  heatmap: YearHeatmapDay[];
}

const MILESTONES = [7, 14, 21, 30, 50, 75, 100, 150, 200, 250, 300, 365, 500, 730, 1000];

export function calculateDetailedStats(
  habits: Habit[],
  entries: DayEntry[],
): DetailedStats | null {
  if (habits.length === 0 || entries.length === 0) return null;

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  // All dates where at least one habit was done
  const activeDates = new Set<string>();
  sortedEntries.forEach(e => {
    if (Object.values(e.habits).some(s => s === 'done')) {
      activeDates.add(e.date);
    }
  });

  const activeDatesSorted = Array.from(activeDates).sort();

  // === STREAKS ===
  const streaks = calculateStreaks(activeDatesSorted, todayStr);

  // === RHYTHM ===
  const rhythm = calculateRhythm(entries, habits, today);

  // === CONSISTENCY ===
  const consistency = calculateConsistency(activeDatesSorted);

  // === PROGRESS ===
  const progress = calculateProgress(activeDatesSorted, entries, habits, today);

  // === PAIRS ===
  const pairs = calculatePairs(habits, entries);

  // === HEATMAP ===
  const heatmap = calculateHeatmap(entries, habits, today);

  return { streaks, rhythm, consistency, progress, pairs, heatmap };
}

function calculateStreaks(activeDatesSorted: string[], todayStr: string): StreakInfo {
  const totalDaysLogged = activeDatesSorted.length;

  if (totalDaysLogged === 0) {
    return { currentStreak: 0, longestStreak: 0, totalDaysLogged: 0, topStreaks: [] };
  }

  // Calculate all streaks
  const allStreaks: number[] = [];
  let currentStreakLen = 1;

  for (let i = 1; i < activeDatesSorted.length; i++) {
    const prev = parseISO(activeDatesSorted[i - 1]);
    const curr = parseISO(activeDatesSorted[i]);
    const diff = differenceInDays(curr, prev);
    if (diff === 1) {
      currentStreakLen++;
    } else {
      allStreaks.push(currentStreakLen);
      currentStreakLen = 1;
    }
  }
  allStreaks.push(currentStreakLen);

  // Current streak (must include today or yesterday)
  let currentStreak = 0;
  if (activeDatesSorted.length > 0) {
    const lastDate = activeDatesSorted[activeDatesSorted.length - 1];
    const diffFromToday = differenceInDays(parseISO(todayStr), parseISO(lastDate));
    if (diffFromToday <= 1) {
      currentStreak = allStreaks[allStreaks.length - 1];
    }
  }

  const longestStreak = Math.max(...allStreaks);
  const topStreaks = [...allStreaks].sort((a, b) => b - a).slice(0, 5);

  return { currentStreak, longestStreak, totalDaysLogged, topStreaks };
}

function calculateRhythm(entries: DayEntry[], habits: Habit[], today: Date): RhythmInfo {
  // Weekly rate (last 7 days)
  const last7 = Array.from({ length: 7 }, (_, i) => format(subDays(today, i), 'yyyy-MM-dd'));
  const activeLast7 = last7.filter(d => {
    const entry = entries.find(e => e.date === d);
    return entry && Object.values(entry.habits).some(s => s === 'done');
  }).length;
  const weeklyRate = Math.round((activeLast7 / 7) * 100);

  // Monthly rate (current calendar month)
  const monthStart = startOfMonth(today);
  const monthEnd = today; // up to today
  const daysInMonthSoFar = differenceInDays(monthEnd, monthStart) + 1;
  const monthDates = Array.from({ length: daysInMonthSoFar }, (_, i) => format(subDays(today, daysInMonthSoFar - 1 - i), 'yyyy-MM-dd'));
  const activeThisMonth = monthDates.filter(d => {
    const entry = entries.find(e => e.date === d);
    return entry && Object.values(entry.habits).some(s => s === 'done');
  }).length;
  const monthlyRate = Math.round((activeThisMonth / daysInMonthSoFar) * 100);

  // Yearly check-ins
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = differenceInDays(today, yearStart) + 1;
  const yearDates = new Set(entries.filter(e => {
    try {
      const d = parseISO(e.date);
      return d.getFullYear() === today.getFullYear() && Object.values(e.habits).some(s => s === 'done');
    } catch { return false; }
  }).map(e => e.date));
  const yearlyCheckins = yearDates.size;

  // Best weekday
  const weekdayCounts: Record<number, { done: number; total: number }> = {};
  for (let i = 0; i < 7; i++) weekdayCounts[i] = { done: 0, total: 0 };

  // Look at last 90 days for weekday analysis
  for (let i = 0; i < 90; i++) {
    const d = subDays(today, i);
    const dateStr = format(d, 'yyyy-MM-dd');
    const dayOfWeek = getDay(d);
    weekdayCounts[dayOfWeek].total++;
    const entry = entries.find(e => e.date === dateStr);
    if (entry && Object.values(entry.habits).some(s => s === 'done')) {
      weekdayCounts[dayOfWeek].done++;
    }
  }

  let bestWeekday = 0;
  let bestWeekdayRate = 0;
  for (let i = 0; i < 7; i++) {
    const rate = weekdayCounts[i].total > 0 ? weekdayCounts[i].done / weekdayCounts[i].total : 0;
    if (rate > bestWeekdayRate) {
      bestWeekdayRate = rate;
      bestWeekday = i;
    }
  }

  // Weekday vs weekend
  let weekdayDone = 0, weekdayTotal = 0, weekendDone = 0, weekendTotal = 0;
  for (let i = 1; i <= 5; i++) {
    weekdayDone += weekdayCounts[i].done;
    weekdayTotal += weekdayCounts[i].total;
  }
  weekendDone += weekdayCounts[0].done + weekdayCounts[6].done;
  weekendTotal += weekdayCounts[0].total + weekdayCounts[6].total;

  const weekdayRate = weekdayTotal > 0 ? Math.round((weekdayDone / weekdayTotal) * 100) : 0;
  const weekendRate = weekendTotal > 0 ? Math.round((weekendDone / weekendTotal) * 100) : 0;

  return { weeklyRate, monthlyRate, yearlyCheckins, bestWeekday, bestWeekdayRate: Math.round(bestWeekdayRate * 100), weekdayRate, weekendRate };
}

function calculateConsistency(activeDatesSorted: string[]): ConsistencyInfo {
  if (activeDatesSorted.length < 2) return { score: activeDatesSorted.length > 0 ? 50 : 0 };

  const gaps: number[] = [];
  for (let i = 1; i < activeDatesSorted.length; i++) {
    gaps.push(differenceInDays(parseISO(activeDatesSorted[i]), parseISO(activeDatesSorted[i - 1])));
  }

  const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const variance = gaps.reduce((sum, g) => sum + Math.pow(g - avg, 2), 0) / gaps.length;
  const stdDev = Math.sqrt(variance);

  // Lower stdDev = more consistent. Score from 0-100.
  // If avg gap is 1 and stdDev is 0, score = 100
  const score = Math.max(0, Math.min(100, Math.round(100 - (stdDev * 15) - (Math.max(0, avg - 1) * 10))));
  return { score };
}

function calculateProgress(activeDatesSorted: string[], entries: DayEntry[], habits: Habit[], today: Date): ProgressInfo {
  const totalDays = activeDatesSorted.length;

  // Next milestone
  let nextMilestone = MILESTONES[MILESTONES.length - 1];
  for (const m of MILESTONES) {
    if (m > totalDays) { nextMilestone = m; break; }
  }
  const daysToMilestone = nextMilestone - totalDays;

  // Average recovery days (gaps after breaks > 1 day)
  const gaps: number[] = [];
  for (let i = 1; i < activeDatesSorted.length; i++) {
    const gap = differenceInDays(parseISO(activeDatesSorted[i]), parseISO(activeDatesSorted[i - 1]));
    if (gap > 1) gaps.push(gap);
  }
  const avgRecoveryDays = gaps.length > 0 ? Math.round((gaps.reduce((a, b) => a + b, 0) / gaps.length) * 10) / 10 : 0;

  // Perfect weeks (7/7 days active) - look at completed weeks
  let perfectWeeks = 0;
  const activeDatesSet = new Set(activeDatesSorted);
  // Check each Monday-Sunday block in the data range
  if (activeDatesSorted.length > 0) {
    const first = parseISO(activeDatesSorted[0]);
    let weekStart = startOfWeek(first, { weekStartsOn: 1 });
    while (weekStart <= today) {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      if (weekEnd <= today) {
        const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
        const allActive = weekDays.every(d => activeDatesSet.has(format(d, 'yyyy-MM-dd')));
        if (allActive) perfectWeeks++;
      }
      weekStart = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }

  // This month vs last month
  const thisMonthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(subDays(thisMonthStart, 1));
  const lastMonthEnd = endOfMonth(lastMonthStart);
  
  const thisMonthCount = activeDatesSorted.filter(d => d >= format(thisMonthStart, 'yyyy-MM-dd') && d <= format(today, 'yyyy-MM-dd')).length;
  const lastMonthCount = activeDatesSorted.filter(d => d >= format(lastMonthStart, 'yyyy-MM-dd') && d <= format(lastMonthEnd, 'yyyy-MM-dd')).length;
  const thisMonthVsLast = thisMonthCount - lastMonthCount;

  // Best month ever
  const monthCounts: Record<string, { month: number; year: number; count: number }> = {};
  activeDatesSorted.forEach(d => {
    const date = parseISO(d);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!monthCounts[key]) monthCounts[key] = { month: date.getMonth(), year: date.getFullYear(), count: 0 };
    monthCounts[key].count++;
  });
  const bestMonth = Object.values(monthCounts).sort((a, b) => b.count - a.count)[0] || null;

  return { nextMilestone, daysToMilestone, avgRecoveryDays, perfectWeeks, thisMonthVsLast, bestMonth };
}

function calculatePairs(habits: Habit[], entries: DayEntry[]): HabitPairInfo[] {
  if (habits.length < 2) return [];

  const pairs: HabitPairInfo[] = [];
  const totalEntries = entries.length;

  for (let i = 0; i < habits.length; i++) {
    for (let j = i + 1; j < habits.length; j++) {
      let count = 0;
      entries.forEach(e => {
        if (e.habits[habits[i].id] === 'done' && e.habits[habits[j].id] === 'done') {
          count++;
        }
      });
      if (count >= 3) {
        pairs.push({
          habitA: habits[i],
          habitB: habits[j],
          count,
          percentage: totalEntries > 0 ? Math.round((count / totalEntries) * 100) : 0,
        });
      }
    }
  }

  return pairs.sort((a, b) => b.count - a.count).slice(0, 5);
}

function calculateHeatmap(entries: DayEntry[], habits: Habit[], today: Date): YearHeatmapDay[] {
  const startDate = subDays(today, 364);
  const days: YearHeatmapDay[] = [];

  for (let i = 0; i <= 364; i++) {
    const d = subDays(today, 364 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    const entry = entries.find(e => e.date === dateStr);
    const count = entry ? Object.values(entry.habits).filter(s => s === 'done').length : 0;
    days.push({ date: dateStr, count });
  }

  return days;
}
