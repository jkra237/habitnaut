// Pattern Detection Engine
// Detects behavioral patterns from habit entries without scoring or judgment

import type { DayEntry, Habit } from '@/types/flownaut';
import type { DetectedPattern, PatternType } from '@/types/observations';
import { subDays, parseISO, getDay, differenceInDays } from 'date-fns';

interface PatternDetectorInput {
  entries: DayEntry[];
  habits: Habit[];
  lookbackDays?: number;
}

/**
 * Main pattern detection function
 * Returns all detected patterns without any filtering or selection
 */
export function detectPatterns({
  entries,
  habits,
  lookbackDays = 14,
}: PatternDetectorInput): DetectedPattern[] {
  const patterns: DetectedPattern[] = [];
  const activeHabits = habits.filter(h => !h.isResting);
  
  if (entries.length < 3 || activeHabits.length === 0) {
    return patterns;
  }

  const recentEntries = getEntriesInRange(entries, lookbackDays);
  const olderEntries = getEntriesInRange(entries, lookbackDays * 2).filter(
    e => !recentEntries.includes(e)
  );

  // Detect patterns for each habit
  for (const habit of activeHabits) {
    patterns.push(...detectHabitPatterns(habit, recentEntries, olderEntries, entries));
  }

  // Detect multi-habit patterns
  patterns.push(...detectMultiHabitPatterns(activeHabits, recentEntries));

  // Detect general patterns
  patterns.push(...detectGeneralPatterns(recentEntries, activeHabits));

  return patterns;
}

function getEntriesInRange(entries: DayEntry[], days: number): DayEntry[] {
  const cutoff = subDays(new Date(), days);
  return entries.filter(e => {
    try {
      return parseISO(e.date) >= cutoff;
    } catch {
      return false;
    }
  });
}

/**
 * Detect patterns for a single habit
 */
function detectHabitPatterns(
  habit: Habit,
  recentEntries: DayEntry[],
  olderEntries: DayEntry[],
  allEntries: DayEntry[]
): DetectedPattern[] {
  const patterns: DetectedPattern[] = [];
  const habitId = habit.id;

  // Get check-ins for this habit
  const recentCheckins = recentEntries.filter(e => e.habits[habitId] === 'done');
  const olderCheckins = olderEntries.filter(e => e.habits[habitId] === 'done');
  const consciousSkips = recentEntries.filter(e => e.habits[habitId] === 'conscious-skip');

  // A1: Soft Return - was inactive ≥4 days, then 1 new check-in
  const sortedEntries = [...allEntries].sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );
  const lastCheckinEntry = sortedEntries.find(e => e.habits[habitId] === 'done');
  
  if (lastCheckinEntry) {
    const entriesBeforeLast = sortedEntries.filter(e => 
      parseISO(e.date) < parseISO(lastCheckinEntry.date)
    );
    const previousCheckin = entriesBeforeLast.find(e => e.habits[habitId] === 'done');
    
    if (previousCheckin) {
      const gapDays = differenceInDays(
        parseISO(lastCheckinEntry.date),
        parseISO(previousCheckin.date)
      );
      
      if (gapDays >= 4) {
        patterns.push({
          patternType: 'soft-return',
          habitId,
          confidence: Math.min(gapDays / 7, 1),
          data: { gapDays },
        });
      }
    }
  }

  // A2: Multiple Restart - habit restarted multiple times in last 30 days
  const thirtyDayEntries = getEntriesInRange(allEntries, 30);
  const gaps = findGaps(thirtyDayEntries, habitId, 3);
  if (gaps >= 2) {
    patterns.push({
      patternType: 'multiple-restart',
      habitId,
      confidence: Math.min(gaps / 3, 1),
      data: { restartCount: gaps },
    });
  }

  // B1: Same Time Pattern - ≥60% check-ins at same time anchor
  if (habit.timeAnchor !== 'none' && recentCheckins.length >= 3) {
    const sameTimeCount = recentCheckins.filter(e => {
      // Since we don't have actual time, use the habit's time anchor preference
      return true; // Simplified - the habit has a time anchor
    }).length;
    
    const rate = sameTimeCount / recentCheckins.length;
    if (rate >= 0.6) {
      patterns.push({
        patternType: 'same-time',
        habitId,
        confidence: rate,
        data: { timeAnchor: habit.timeAnchor },
      });
    }
  }

  // B2: Varied Time - habit spreads across the day (no fixed time anchor)
  if (habit.timeAnchor === 'none' && recentCheckins.length >= 3) {
    patterns.push({
      patternType: 'varied-time',
      habitId,
      confidence: 0.7,
    });
  }

  // B3: Weekday vs Weekend difference
  const weekdayCheckins = recentCheckins.filter(e => {
    const day = getDay(parseISO(e.date));
    return day >= 1 && day <= 5;
  });
  const weekendCheckins = recentCheckins.filter(e => {
    const day = getDay(parseISO(e.date));
    return day === 0 || day === 6;
  });

  if (recentCheckins.length >= 4) {
    const weekdayRate = weekdayCheckins.length / 5;
    const weekendRate = weekendCheckins.length / 2;
    
    if (Math.abs(weekdayRate - weekendRate) > 0.3) {
      patterns.push({
        patternType: 'weekday-weekend-diff',
        habitId,
        confidence: Math.abs(weekdayRate - weekendRate),
        data: { weekdayCheckins: weekdayCheckins.length, weekendCheckins: weekendCheckins.length },
      });
    }
  }

  // C1: Quiet Consistency - small but recurring presence (1-2x/week over multiple weeks)
  if (recentCheckins.length >= 2 && recentCheckins.length <= 4) {
    patterns.push({
      patternType: 'quiet-consistency',
      habitId,
      confidence: 0.6,
      data: { weeklyRate: recentCheckins.length / 2 },
    });
  }

  // C2: Dense Phases - multiple check-ins on few days, then pause
  const dayGroups = groupByConsecutiveDays(recentCheckins);
  const hasDensePhase = dayGroups.some(group => group.length >= 2);
  const hasPause = recentEntries.length - recentCheckins.length >= 3;
  
  if (hasDensePhase && hasPause) {
    patterns.push({
      patternType: 'dense-phases',
      habitId,
      confidence: 0.7,
    });
  }

  // D1: Conscious Skip - multiple conscious skips
  if (consciousSkips.length >= 2) {
    patterns.push({
      patternType: 'conscious-skip',
      habitId,
      confidence: Math.min(consciousSkips.length / 3, 1),
      data: { skipCount: consciousSkips.length },
    });
  }

  // D2: Natural Break - longer pause without negative pattern
  const lastDone = recentCheckins[0];
  if (lastDone && recentCheckins.length >= 1) {
    const daysSinceLastDone = differenceInDays(new Date(), parseISO(lastDone.date));
    if (daysSinceLastDone >= 3 && daysSinceLastDone <= 7) {
      patterns.push({
        patternType: 'natural-break',
        habitId,
        confidence: 0.6,
        data: { pauseDays: daysSinceLastDone },
      });
    }
  }

  // F1: Slight Increase - more presence than previous period
  if (recentCheckins.length > olderCheckins.length && olderCheckins.length > 0) {
    patterns.push({
      patternType: 'slight-increase',
      habitId,
      confidence: Math.min((recentCheckins.length - olderCheckins.length) / olderCheckins.length, 1),
    });
  }

  // F2: Slight Decrease - less presence than previous period
  if (recentCheckins.length < olderCheckins.length && recentCheckins.length > 0) {
    patterns.push({
      patternType: 'slight-decrease',
      habitId,
      confidence: Math.min((olderCheckins.length - recentCheckins.length) / olderCheckins.length, 1),
    });
  }

  // G1: Effortless Moment - check-in without external trigger
  if (recentCheckins.length >= 2) {
    patterns.push({
      patternType: 'effortless-moment',
      habitId,
      confidence: 0.5,
    });
  }

  return patterns;
}

/**
 * Detect patterns involving multiple habits
 */
function detectMultiHabitPatterns(
  habits: Habit[],
  recentEntries: DayEntry[]
): DetectedPattern[] {
  const patterns: DetectedPattern[] = [];

  if (habits.length < 2) return patterns;

  // E1: Habits appearing together
  for (let i = 0; i < habits.length; i++) {
    for (let j = i + 1; j < habits.length; j++) {
      const habitA = habits[i];
      const habitB = habits[j];
      
      let togetherCount = 0;
      let habitACount = 0;
      let habitBCount = 0;
      
      recentEntries.forEach(entry => {
        const aState = entry.habits[habitA.id];
        const bState = entry.habits[habitB.id];
        
        if (aState === 'done') habitACount++;
        if (bState === 'done') habitBCount++;
        if (aState === 'done' && bState === 'done') togetherCount++;
      });

      if (togetherCount >= 3 && habitACount >= 3 && habitBCount >= 3) {
        const coOccurrence = togetherCount / Math.min(habitACount, habitBCount);
        if (coOccurrence >= 0.5) {
          patterns.push({
            patternType: 'habits-together',
            habitIds: [habitA.id, habitB.id],
            confidence: coOccurrence,
            data: { 
              habitAName: habitA.name, 
              habitBName: habitB.name,
              togetherCount,
            },
          });
        }
      }
    }
  }

  // E2: Habit sequence (one habit prepares another)
  // This is harder to detect without actual timestamps, so we use time anchors
  for (let i = 0; i < habits.length; i++) {
    for (let j = 0; j < habits.length; j++) {
      if (i === j) continue;
      
      const habitA = habits[i];
      const habitB = habits[j];
      
      // Check if habitA's time anchor precedes habitB's
      const timeOrder = ['morning', 'midday', 'evening'];
      const aIndex = timeOrder.indexOf(habitA.timeAnchor);
      const bIndex = timeOrder.indexOf(habitB.timeAnchor);
      
      if (aIndex >= 0 && bIndex > aIndex) {
        // Check if they often appear together
        let sequenceCount = 0;
        recentEntries.forEach(entry => {
          if (entry.habits[habitA.id] === 'done' && entry.habits[habitB.id] === 'done') {
            sequenceCount++;
          }
        });
        
        if (sequenceCount >= 3) {
          patterns.push({
            patternType: 'habit-sequence',
            habitIds: [habitA.id, habitB.id],
            confidence: Math.min(sequenceCount / 5, 1),
            data: {
              precedingHabit: habitA.name,
              followingHabit: habitB.name,
            },
          });
        }
      }
    }
  }

  return patterns;
}

/**
 * Detect general patterns not tied to specific habits
 */
function detectGeneralPatterns(
  recentEntries: DayEntry[],
  habits: Habit[]
): DetectedPattern[] {
  const patterns: DetectedPattern[] = [];

  // General conscious skip pattern
  const totalSkips = recentEntries.reduce((sum, entry) => {
    return sum + Object.values(entry.habits).filter(s => s === 'conscious-skip').length;
  }, 0);

  if (totalSkips >= 3) {
    patterns.push({
      patternType: 'conscious-skip',
      confidence: Math.min(totalSkips / 5, 1),
      data: { totalSkips },
    });
  }

  // General effortless pattern - consistent engagement
  const engagedDays = recentEntries.filter(entry => {
    const doneCount = Object.values(entry.habits).filter(s => s === 'done').length;
    return doneCount > 0;
  });

  if (engagedDays.length >= 5) {
    patterns.push({
      patternType: 'effortless-moment',
      confidence: engagedDays.length / recentEntries.length,
    });
  }

  // Add general pattern for meta observations
  if (recentEntries.length >= 7) {
    patterns.push({
      patternType: 'general',
      confidence: 0.4,
      data: { daysOfData: recentEntries.length },
    });
  }

  return patterns;
}

/**
 * Helper: Find number of gaps (restarts) for a habit
 */
function findGaps(entries: DayEntry[], habitId: string, minGapDays: number): number {
  const sorted = [...entries]
    .filter(e => e.habits[habitId] === 'done')
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  let gaps = 0;
  for (let i = 1; i < sorted.length; i++) {
    const daysDiff = differenceInDays(
      parseISO(sorted[i].date),
      parseISO(sorted[i - 1].date)
    );
    if (daysDiff >= minGapDays) {
      gaps++;
    }
  }
  return gaps;
}

/**
 * Helper: Group entries by consecutive days
 */
function groupByConsecutiveDays(entries: DayEntry[]): DayEntry[][] {
  if (entries.length === 0) return [];
  
  const sorted = [...entries].sort((a, b) => 
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );
  
  const groups: DayEntry[][] = [[sorted[0]]];
  
  for (let i = 1; i < sorted.length; i++) {
    const current = parseISO(sorted[i].date);
    const previous = parseISO(sorted[i - 1].date);
    const diff = differenceInDays(current, previous);
    
    if (diff <= 1) {
      groups[groups.length - 1].push(sorted[i]);
    } else {
      groups.push([sorted[i]]);
    }
  }
  
  return groups;
}
