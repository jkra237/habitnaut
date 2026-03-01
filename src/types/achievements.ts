import type { UserState } from './flownaut';

export type AchievementCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type AchievementKey =
  // A) Entry
  | 'first_step' | 'first_mark' | 'getting_started' | 'showing_up' | 'back_again'
  // B) Weekly presence
  | 'quiet_week' | 'gentle_continuity' | 'still_going' | 'soft_rhythm' | 'reliable_return'
  // C) Single habits
  | 'old_friend' | 'long_companion' | 'steady_presence' | 'letting_it_rest' | 'picking_it_up_again'
  // D) Multiple habits
  | 'small_circle' | 'balanced_set' | 'focused_practice' | 'changing_needs' | 'trying_things_out'
  // E) Patterns
  | 'gentle_pair' | 'supportive_set' | 'recurring_pattern' | 'natural_flow' | 'own_pace'
  // F) Long-term
  | 'staying_with_it' | 'quiet_consistency' | 'gentle_commitment' | 'living_with_habits' | 'aware_practice';

export interface AchievementDefinition {
  key: AchievementKey;
  category: AchievementCategory;
  emoji: string;
  check: (state: UserState) => boolean;
}
