// Observation Hook - Integrates the observation system with the app

import { useMemo, useCallback } from 'react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useLanguage } from '@/hooks/use-translations';
import { detectPatterns } from '@/lib/observations/pattern-detector';
import { 
  selectObservation, 
  recordShownObservation,
  getInitialObservationState,
} from '@/lib/observations/observation-selector';
import type { ObservationState } from '@/types/observations';

// Local storage key for observation state
const OBSERVATION_STATE_KEY = 'flownaut-observations';

function loadObservationState(): ObservationState {
  try {
    const stored = localStorage.getItem(OBSERVATION_STATE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return getInitialObservationState();
}

function saveObservationState(state: ObservationState): void {
  try {
    localStorage.setItem(OBSERVATION_STATE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

export function useObservations() {
  const entries = useFlowNautStore(s => s.entries);
  const habits = useFlowNautStore(s => s.habits);
  const personality = useFlowNautStore(s => s.personality);
  const language = useLanguage();

  // Detect patterns from current data
  const patterns = useMemo(() => {
    return detectPatterns({
      entries,
      habits,
      lookbackDays: 14,
    });
  }, [entries, habits]);

  // Get current observation (if any should be shown)
  const getCurrentObservation = useCallback(() => {
    const observationState = loadObservationState();

    const selected = selectObservation({
      patterns,
      observationState,
      habits,
      personality,
      language,
    });

    return selected;
  }, [patterns, habits, personality, language]);

  // Mark an observation as shown
  const markObservationShown = useCallback((observationId: string, habitId?: string) => {
    const currentState = loadObservationState();
    const newState = recordShownObservation(currentState, observationId, habitId);
    saveObservationState(newState);
  }, []);

  // Dismiss observation (just marks it as shown)
  const dismissObservation = useCallback((observationId: string, habitId?: string) => {
    markObservationShown(observationId, habitId);
  }, [markObservationShown]);

  // Get observation stats (for debugging/settings)
  const getObservationStats = useCallback(() => {
    const state = loadObservationState();
    return {
      patternsDetected: patterns.length,
      observationsShownTotal: state.shownObservations.length,
      observationsThisWeek: state.observationsThisWeek,
      lastObservationDate: state.lastObservationDate,
    };
  }, [patterns]);

  return {
    patterns,
    getCurrentObservation,
    markObservationShown,
    dismissObservation,
    getObservationStats,
  };
}
