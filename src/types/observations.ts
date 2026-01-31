// Observation Pool Types - Rule-based gentle observations

export type ObservationCategory = 
  | 'entry-return'      // Einstieg & Rückkehr
  | 'rhythm-time'       // Rhythmus & Zeit
  | 'weekday-cycle'     // Wochentage & Zyklen
  | 'quiet-regularity'  // Leise Regelmäßigkeit
  | 'pause-break'       // Pausen & Unterbrechungen
  | 'conscious-skip'    // Bewusst ausgelassen
  | 'change-over-time'  // Veränderung über Zeit
  | 'multi-habit'       // Mehrere Gewohnheiten
  | 'sequence'          // Reihenfolge & Vorbereitung
  | 'effortless'        // Mühelosigkeit & Einladung
  | 'relationship'      // Gesamtbild & Beziehung
  | 'meta'              // Meta-Beobachtungen
  | 'open-end';         // Abschluss & Weite

export type PatternType =
  | 'soft-return'           // A1 - Sanfter Wiedereinstieg
  | 'multiple-restart'      // A2 - Mehrfaches Wiederanfangen
  | 'same-time'             // B1 - Gleiche Tageszeit
  | 'varied-time'           // B2 - Unterschiedliche Tageszeiten
  | 'weekday-weekend-diff'  // B3 - Wochenanfang vs. Wochenende
  | 'quiet-consistency'     // C1 - Leise Konstanz
  | 'dense-phases'          // C2 - Verdichtete Phasen
  | 'conscious-skip'        // D1 - Bewusst ausgelassen
  | 'natural-break'         // D2 - Natürliche Unterbrechung
  | 'habits-together'       // E1 - Gewohnheiten erscheinen gemeinsam
  | 'habit-sequence'        // E2 - Eine Gewohnheit bereitet andere vor
  | 'slight-increase'       // F1 - Leichte Zunahme
  | 'slight-decrease'       // F2 - Leichte Abnahme
  | 'effortless-moment'     // G1 - Müheloser Moment
  | 'general';              // General observations (no specific pattern)

export interface ObservationCondition {
  patternType: PatternType;
  minDataDays?: number;        // Minimum days of data required
  requiresHabit?: boolean;     // Requires a specific habit context
  requiresMultiHabit?: boolean; // Requires multiple habits
}

export interface Observation {
  id: string;
  category: ObservationCategory;
  conditions: ObservationCondition;
  cooldownDays: number;        // Minimum days before reuse
  // Translations keyed by language
  text: {
    en: string;
    de: string;
    es: string;
  };
}

export interface ShownObservation {
  observationId: string;
  shownAt: string;             // ISO timestamp
  habitId?: string;            // Context habit if applicable
}

export interface ObservationState {
  shownObservations: ShownObservation[];
  lastObservationDate?: string; // YYYY-MM-DD
  observationsThisWeek: number;
}

// Pattern detection result
export interface DetectedPattern {
  patternType: PatternType;
  habitId?: string;
  habitIds?: string[];        // For multi-habit patterns
  confidence: number;         // 0-1, used for weighting
  data?: Record<string, unknown>; // Additional context
}
