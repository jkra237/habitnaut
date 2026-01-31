// Observation Selection Engine
// Selects appropriate observations based on detected patterns, cooldowns, and frequency limits

import type { Habit, PersonalityProfile } from '@/types/flownaut';
import type { 
  DetectedPattern, 
  Observation, 
  ObservationState, 
  ShownObservation 
} from '@/types/observations';
import { observations, getObservationsByPattern } from './observation-library';
import { parseISO, differenceInDays, startOfWeek, isSameWeek } from 'date-fns';

interface SelectObservationInput {
  patterns: DetectedPattern[];
  observationState: ObservationState;
  habits: Habit[];
  personality?: PersonalityProfile;
  language: 'en' | 'de' | 'es';
}

interface SelectedObservation {
  observation: Observation;
  text: string;
  habitId?: string;
  habitName?: string;
  habitIds?: string[];
  habitNames?: string[];
}

/**
 * Main observation selection function
 * Returns at most 1 observation per call, respecting all limits
 */
export function selectObservation({
  patterns,
  observationState,
  habits,
  personality,
  language,
}: SelectObservationInput): SelectedObservation | null {
  // Check daily limit: max 1 observation per day
  if (observationState.lastObservationDate) {
    const lastDate = parseISO(observationState.lastObservationDate);
    const today = new Date();
    if (differenceInDays(today, lastDate) < 1) {
      return null;
    }
  }

  // Check weekly limit: max 3 observations per week
  const thisWeekCount = countObservationsThisWeek(observationState.shownObservations);
  if (thisWeekCount >= 3) {
    return null;
  }

  // Get candidate observations based on patterns
  const candidates = getCandidateObservations(patterns, observationState, habits);

  if (candidates.length === 0) {
    return null; // Silence is preferred over forced feedback
  }

  // Weight candidates by personality if available
  const weightedCandidates = personality 
    ? weightByPersonality(candidates, personality)
    : candidates;

  // Sort by weight and pick the best one
  weightedCandidates.sort((a, b) => b.weight - a.weight);

  const selected = weightedCandidates[0];
  if (!selected) return null;

  // Get the habit name(s) if applicable
  let habitName: string | undefined;
  let habitNames: string[] | undefined;
  let habitIds: string[] | undefined;
  
  // For multi-habit patterns, get both habit names
  if (selected.habitIds && selected.habitIds.length >= 2) {
    habitIds = selected.habitIds;
    habitNames = selected.habitIds
      .map(id => habits.find(h => h.id === id))
      .filter(Boolean)
      .map(h => `${h!.emoji || ''} ${h!.name}`.trim());
  } else if (selected.habitId) {
    const habit = habits.find(h => h.id === selected.habitId);
    habitName = habit ? `${habit.emoji || ''} ${habit.name}`.trim() : undefined;
  }

  // Build the observation text with habit names interpolated
  let observationText = selected.observation.text[language];
  
  // Replace placeholders for multi-habit observations
  if (habitNames && habitNames.length >= 2) {
    observationText = observationText
      .replace('{habitA}', habitNames[0])
      .replace('{habitB}', habitNames[1]);
  }

  return {
    observation: selected.observation,
    text: observationText,
    habitId: selected.habitId,
    habitName,
    habitIds,
    habitNames,
  };
}

interface WeightedCandidate {
  observation: Observation;
  habitId?: string;
  habitIds?: string[];
  weight: number;
}

/**
 * Get candidate observations based on detected patterns
 */
function getCandidateObservations(
  patterns: DetectedPattern[],
  observationState: ObservationState,
  habits: Habit[]
): WeightedCandidate[] {
  const candidates: WeightedCandidate[] = [];
  const now = new Date();

  for (const pattern of patterns) {
    const matchingObservations = getObservationsByPattern(pattern.patternType);

    for (const obs of matchingObservations) {
      // Check cooldown
      if (isOnCooldown(obs.id, observationState.shownObservations, obs.cooldownDays)) {
        continue;
      }

      // Check if observation requires a habit and we have one
      if (obs.conditions.requiresHabit && !pattern.habitId) {
        continue;
      }

      // Check if observation requires multiple habits
      if (obs.conditions.requiresMultiHabit && (!pattern.habitIds || pattern.habitIds.length < 2)) {
        continue;
      }

      // Check minimum data days
      if (obs.conditions.minDataDays) {
        const dataAvailable = pattern.data?.daysOfData as number || 0;
        if (dataAvailable < obs.conditions.minDataDays) {
          continue;
        }
      }

      // Calculate weight based on pattern confidence and observation category
      let weight = pattern.confidence;
      
      // Boost specific patterns over general ones
      if (pattern.patternType !== 'general') {
        weight += 0.2;
      }

      // Boost less common categories for variety
      const categoryBoost = getCategoryBoost(obs.category, observationState.shownObservations);
      weight += categoryBoost;

      candidates.push({
        observation: obs,
        habitId: pattern.habitId || (pattern.habitIds ? pattern.habitIds[0] : undefined),
        habitIds: pattern.habitIds,
        weight,
      });
    }
  }

  return candidates;
}

/**
 * Check if an observation is on cooldown
 */
function isOnCooldown(
  observationId: string,
  shownObservations: ShownObservation[],
  cooldownDays: number
): boolean {
  const lastShown = shownObservations.find(so => so.observationId === observationId);
  if (!lastShown) return false;

  const daysSinceShown = differenceInDays(new Date(), parseISO(lastShown.shownAt));
  return daysSinceShown < cooldownDays;
}

/**
 * Count observations shown this week
 */
function countObservationsThisWeek(shownObservations: ShownObservation[]): number {
  const now = new Date();
  return shownObservations.filter(so => {
    try {
      return isSameWeek(parseISO(so.shownAt), now, { weekStartsOn: 1 });
    } catch {
      return false;
    }
  }).length;
}

/**
 * Get a boost for less-recently-shown categories
 */
function getCategoryBoost(
  category: Observation['category'],
  shownObservations: ShownObservation[]
): number {
  // Find the most recent observation of this category
  const recentOfCategory = shownObservations.filter(so => {
    const obs = observations.find(o => o.id === so.observationId);
    return obs?.category === category;
  });

  if (recentOfCategory.length === 0) {
    return 0.3; // Boost for never-shown categories
  }

  // Sort by date, get the most recent
  const sorted = recentOfCategory.sort((a, b) => 
    parseISO(b.shownAt).getTime() - parseISO(a.shownAt).getTime()
  );

  const daysSince = differenceInDays(new Date(), parseISO(sorted[0].shownAt));
  return Math.min(daysSince / 30, 0.2); // Small boost for older categories
}

/**
 * Weight candidates by personality profile
 */
function weightByPersonality(
  candidates: WeightedCandidate[],
  personality: PersonalityProfile
): WeightedCandidate[] {
  return candidates.map(candidate => {
    let personalityBoost = 0;

    const { category } = candidate.observation;

    // Reflective users (solitude recovery, slow pace) → deeper meta observations
    if (personality.recovery === 'solitude' || personality.pace === 'slow') {
      if (category === 'meta' || category === 'relationship' || category === 'open-end') {
        personalityBoost += 0.2;
      }
    }

    // Action-oriented users (external motivation, fast pace) → pattern-based observations
    if (personality.motivation === 'external' || personality.pace === 'fast') {
      if (category === 'rhythm-time' || category === 'weekday-cycle' || category === 'change-over-time') {
        personalityBoost += 0.2;
      }
    }

    // Users who prefer structure → consistency and rhythm observations
    if (personality.approach === 'structured') {
      if (category === 'quiet-regularity' || category === 'rhythm-time') {
        personalityBoost += 0.15;
      }
    }

    // Users with burst energy → observations about phases and variation
    if (personality.energy === 'bursts' || personality.energy === 'waves') {
      if (category === 'pause-break' || category === 'change-over-time') {
        personalityBoost += 0.15;
      }
    }

    return {
      ...candidate,
      weight: candidate.weight + personalityBoost,
    };
  });
}

/**
 * Record that an observation was shown
 */
export function recordShownObservation(
  observationState: ObservationState,
  observationId: string,
  habitId?: string
): ObservationState {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const newShownObservation: ShownObservation = {
    observationId,
    shownAt: now.toISOString(),
    habitId,
  };

  // Keep only last 100 shown observations to prevent unbounded growth
  const updatedShown = [newShownObservation, ...observationState.shownObservations].slice(0, 100);

  return {
    shownObservations: updatedShown,
    lastObservationDate: today,
    observationsThisWeek: countObservationsThisWeek(updatedShown),
  };
}

/**
 * Get initial observation state
 */
export function getInitialObservationState(): ObservationState {
  return {
    shownObservations: [],
    lastObservationDate: undefined,
    observationsThisWeek: 0,
  };
}
