// Insight Generation Engine
// Creates pattern-based, correlation, and self-observation reflections
// Language: neutral, awareness-focused, never prescriptive

import type { DayEntry, Habit, Insight, PersonalityProfile, InsightFrequency, InsightType } from '@/types/flownaut';
import { subDays, parseISO } from 'date-fns';

interface InsightCandidate {
  type: InsightType;
  message: string;
  weight: number; // Higher = more relevant
}

/**
 * Generate insights based on user data
 * Returns an array of insights appropriate for the frequency setting
 */
export function generateInsights(
  entries: DayEntry[],
  habits: Habit[],
  personality: PersonalityProfile | undefined,
  frequency: InsightFrequency,
  existingInsights: Insight[]
): Insight[] {
  // Don't generate if recent insight exists
  const recentInsight = existingInsights[0];
  if (recentInsight) {
    const daysSinceLastInsight = Math.floor(
      (Date.now() - new Date(recentInsight.generatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const minDays = frequency === 'rare' ? 14 : frequency === 'occasional' ? 7 : 3;
    if (daysSinceLastInsight < minDays) {
      return [];
    }
  }

  const candidates: InsightCandidate[] = [];
  const last7Days = getEntriesInRange(entries, 7);
  const last14Days = getEntriesInRange(entries, 14);
  const activeHabits = habits.filter(h => !h.isResting);

  // Only generate if we have enough data
  if (last7Days.length < 3 || activeHabits.length < 1) {
    return [];
  }

  // Pattern-based reflections
  candidates.push(...generatePatternInsights(last7Days, last14Days, activeHabits));

  // Correlation reflections
  candidates.push(...generateCorrelationInsights(last7Days, activeHabits));

  // Self-observation prompts
  candidates.push(...generatePromptInsights(last7Days, activeHabits, personality));

  // Sort by weight and pick the best one
  candidates.sort((a, b) => b.weight - a.weight);

  if (candidates.length === 0) return [];

  // Select based on frequency
  const count = frequency === 'weekly' ? 2 : 1;
  const selected = candidates.slice(0, count);

  return selected.map(c => ({
    id: crypto.randomUUID(),
    type: c.type,
    message: c.message,
    generatedAt: new Date(),
  }));
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
 * Pattern-based insights: observing trends without judgment
 */
function generatePatternInsights(
  last7Days: DayEntry[],
  last14Days: DayEntry[],
  habits: Habit[]
): InsightCandidate[] {
  const insights: InsightCandidate[] = [];

  // Analyze habit completion by time anchor
  const timeAnchorCounts: Record<string, { total: number; done: number }> = {
    morning: { total: 0, done: 0 },
    midday: { total: 0, done: 0 },
    evening: { total: 0, done: 0 },
  };

  habits.forEach(habit => {
    if (habit.timeAnchor && habit.timeAnchor !== 'none') {
      last7Days.forEach(entry => {
        const state = entry.habits[habit.id];
        if (state) {
          timeAnchorCounts[habit.timeAnchor].total++;
          if (state === 'done') {
            timeAnchorCounts[habit.timeAnchor].done++;
          }
        }
      });
    }
  });

  // Find the time anchor with highest completion rate
  const anchors = Object.entries(timeAnchorCounts)
    .filter(([_, counts]) => counts.total >= 3)
    .map(([anchor, counts]) => ({
      anchor,
      rate: counts.done / counts.total,
    }))
    .sort((a, b) => b.rate - a.rate);

  if (anchors.length > 0 && anchors[0].rate > 0.6) {
    insights.push({
      type: 'pattern',
      message: `You tended to start habits in the ${anchors[0].anchor} more often this week.`,
      weight: anchors[0].rate * 10,
    });
  }

  // Compare this week to last week (if we have data)
  if (last14Days.length >= 10) {
    const thisWeekEntries = last7Days.length;
    const lastWeekEntries = last14Days.length - thisWeekEntries;
    
    if (thisWeekEntries > lastWeekEntries && lastWeekEntries > 0) {
      insights.push({
        type: 'pattern',
        message: `You checked in more often this week than last — notice the difference, not the numbers.`,
        weight: 6,
      });
    }
  }

  // Conscious skips pattern
  const consciousSkips = last7Days.reduce((count, entry) => {
    return count + Object.values(entry.habits).filter(s => s === 'conscious-skip').length;
  }, 0);

  if (consciousSkips >= 2) {
    insights.push({
      type: 'pattern',
      message: `You chose to pause some habits this week. Noticing when to rest is awareness too.`,
      weight: 7,
    });
  }

  return insights;
}

/**
 * Correlation insights: highlighting possible connections
 */
function generateCorrelationInsights(
  last7Days: DayEntry[],
  habits: Habit[]
): InsightCandidate[] {
  const insights: InsightCandidate[] = [];

  // Energy correlation
  const highEnergyDays = last7Days.filter(e => e.energy && e.energy >= 4);
  const lowEnergyDays = last7Days.filter(e => e.energy && e.energy <= 2);

  if (highEnergyDays.length >= 2) {
    const highEnergyCompletions = highEnergyDays.reduce((sum, entry) => {
      return sum + Object.values(entry.habits).filter(s => s === 'done').length;
    }, 0);

    const avgCompletionsHighEnergy = highEnergyCompletions / highEnergyDays.length;
    
    if (avgCompletionsHighEnergy >= 2) {
      insights.push({
        type: 'correlation',
        message: `On days you logged energy as high, you also checked in more frequently.`,
        weight: 8,
      });
    }
  }

  // Mood correlation with habits
  const goodMoodDays = last7Days.filter(e => e.mood && e.mood >= 4);
  if (goodMoodDays.length >= 2) {
    // Find which habits appear most on good mood days
    const habitAppearances: Record<string, number> = {};
    
    goodMoodDays.forEach(entry => {
      Object.entries(entry.habits).forEach(([habitId, state]) => {
        if (state === 'done') {
          habitAppearances[habitId] = (habitAppearances[habitId] || 0) + 1;
        }
      });
    });

    const topHabit = Object.entries(habitAppearances)
      .sort((a, b) => b[1] - a[1])[0];

    if (topHabit && topHabit[1] >= 2) {
      const habit = habits.find(h => h.id === topHabit[0]);
      if (habit) {
        insights.push({
          type: 'correlation',
          message: `Your calmest days coincided with "${habit.emoji || ''} ${habit.name}".`,
          weight: 9,
        });
      }
    }
  }

  // Habit sequence correlation
  habits.forEach(habitA => {
    habits.forEach(habitB => {
      if (habitA.id === habitB.id) return;
      
      let sequenceCount = 0;
      last7Days.forEach(entry => {
        if (entry.habits[habitA.id] === 'done' && entry.habits[habitB.id] === 'done') {
          sequenceCount++;
        }
      });

      if (sequenceCount >= 3) {
        insights.push({
          type: 'correlation',
          message: `"${habitB.emoji || ''} ${habitB.name}" often appeared alongside "${habitA.emoji || ''} ${habitA.name}".`,
          weight: 5 + sequenceCount,
        });
      }
    });
  });

  return insights;
}

/**
 * Self-observation prompts: encouraging introspection
 */
function generatePromptInsights(
  last7Days: DayEntry[],
  habits: Habit[],
  personality: PersonalityProfile | undefined
): InsightCandidate[] {
  const insights: InsightCandidate[] = [];

  // Most completed habit this week
  const habitCounts: Record<string, number> = {};
  
  last7Days.forEach(entry => {
    Object.entries(entry.habits).forEach(([habitId, state]) => {
      if (state === 'done') {
        habitCounts[habitId] = (habitCounts[habitId] || 0) + 1;
      }
    });
  });

  const topHabitEntry = Object.entries(habitCounts)
    .sort((a, b) => b[1] - a[1])[0];

  if (topHabitEntry && topHabitEntry[1] >= 3) {
    const habit = habits.find(h => h.id === topHabitEntry[0]);
    if (habit) {
      insights.push({
        type: 'prompt',
        message: `What did "${habit.emoji || ''} ${habit.name}" bring you this week?`,
        weight: 7,
      });
    }
  }

  // Least completed habit prompt
  const lowestHabitEntry = Object.entries(habitCounts)
    .filter(([_, count]) => count >= 1)
    .sort((a, b) => a[1] - b[1])[0];

  if (lowestHabitEntry && lowestHabitEntry[1] <= 2) {
    const habit = habits.find(h => h.id === lowestHabitEntry[0]);
    if (habit) {
      insights.push({
        type: 'prompt',
        message: `Which moment felt easiest for "${habit.emoji || ''} ${habit.name}"?`,
        weight: 5,
      });
    }
  }

  // Personality-aware prompts
  if (personality) {
    if (personality.rhythm === 'morning' && topHabitEntry) {
      const habit = habits.find(h => h.id === topHabitEntry[0]);
      if (habit && habit.timeAnchor === 'morning') {
        insights.push({
          type: 'prompt',
          message: `Your morning rhythm seems aligned with your habits. How does that feel?`,
          weight: 6,
        });
      }
    }

    if (personality.energy === 'waves') {
      insights.push({
        type: 'prompt',
        message: `Notice the natural rhythm of your energy this week. When were the peaks?`,
        weight: 4,
      });
    }
  }

  // Generic prompts if nothing specific applies
  if (insights.length === 0 && last7Days.length >= 3) {
    const prompts = [
      `Even small moments of practice count as awareness.`,
      `What patterns are you noticing in your daily rhythm?`,
      `Which habit felt most natural this week?`,
    ];
    
    insights.push({
      type: 'prompt',
      message: prompts[Math.floor(Math.random() * prompts.length)],
      weight: 3,
    });
  }

  return insights;
}

/**
 * Format an insight for display
 */
export function formatInsightForDisplay(insight: Insight): {
  icon: string;
  title: string;
  message: string;
} {
  const icons = {
    pattern: '🔄',
    correlation: '🔗',
    prompt: '💭',
  };

  const titles = {
    pattern: 'This Week',
    correlation: 'Connection',
    prompt: 'Reflection',
  };

  return {
    icon: icons[insight.type as keyof typeof icons] || '✨',
    title: titles[insight.type as keyof typeof titles] || 'Insight',
    message: insight.message,
  };
}
