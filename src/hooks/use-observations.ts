// Observation Hook - Integrates observations AND insights into a unified system

import { useMemo, useCallback } from 'react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useLanguage, useTranslations } from '@/hooks/use-translations';
import { detectPatterns } from '@/lib/observations/pattern-detector';
import { 
  selectObservation, 
  recordShownObservation,
  getInitialObservationState,
} from '@/lib/observations/observation-selector';
import { generateInsights } from '@/lib/insight-generator';
import type { ObservationState } from '@/types/observations';
import type { InsightType } from '@/types/flownaut';

// Local storage key for observation state
const OBSERVATION_STATE_KEY = 'flownaut-observations';

export interface UnifiedObservation {
  id: string;
  text: string;
  habitName?: string;
  habitNames?: string[];
  habitId?: string;
  source: 'observation' | 'insight';
  insightType?: InsightType; // Only for insight-sourced items
}

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
  const insights = useFlowNautStore(s => s.insights);
  const preferences = useFlowNautStore(s => s.preferences);
  const language = useLanguage();
  const t = useTranslations();

  // Detect patterns from current data
  const patterns = useMemo(() => {
    return detectPatterns({
      entries,
      habits,
      lookbackDays: 14,
    });
  }, [entries, habits]);

  // Get current observation or insight (if any should be shown)
  const getCurrentObservation = useCallback((): UnifiedObservation | null => {
    // Respect "never" frequency setting — suppress everything
    if (preferences.insightFrequency === 'never') {
      return null;
    }

    const observationState = loadObservationState();

    // Try gentle observation first
    const selected = selectObservation({
      patterns,
      observationState,
      habits,
      personality,
      language,
    });

    if (selected) {
      return {
        id: selected.observation.id,
        text: selected.text,
        habitName: selected.habitName,
        habitNames: selected.habitNames,
        habitId: selected.habitId,
        source: 'observation',
      };
    }

    // If no observation, try generating an insight
    const generatedInsights = generateInsights(
      entries,
      habits,
      personality,
      preferences.insightFrequency,
      insights,
    );

    if (generatedInsights.length > 0) {
      const insight = generatedInsights[0];
      
      // Resolve the localized message using translation keys
      let message = '';
      if (insight.messageKey) {
        try {
          const [category, key] = insight.messageKey.split('.') as [
            'patterns' | 'correlations' | 'prompts',
            string
          ];
          const categoryTranslations = t.insights[category];
          if (categoryTranslations && typeof categoryTranslations === 'object' && key in categoryTranslations) {
            message = (categoryTranslations as Record<string, string>)[key];
            if (insight.messageParams && message) {
              Object.entries(insight.messageParams).forEach(([param, value]) => {
                message = message.replace(`{${param}}`, value);
              });
            }
          }
        } catch {
          // Fall through
        }
      }
      
      if (!message) {
        message = insight.message || '';
      }

      if (message) {
        return {
          id: insight.id,
          text: message,
          source: 'insight',
          insightType: insight.type,
        };
      }
    }

    return null;
  }, [patterns, habits, personality, language, entries, insights, preferences.insightFrequency, t]);

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
