// FlowNaut Types - Self-observation, not optimization

export interface PersonalityProfile {
  // Four axes - each is a spectrum, not a binary
  rhythm: 'morning' | 'evening' | 'flexible';
  energy: 'steady' | 'bursts' | 'waves';
  motivation: 'internal' | 'external' | 'mixed';
  approach: 'structured' | 'spontaneous' | 'adaptive';
  // Extended axes for deeper personality understanding
  focus: 'deep' | 'varied' | 'contextual';
  recovery: 'solitude' | 'social' | 'mixed';
  pace: 'slow' | 'moderate' | 'fast';
}

export interface OnboardingAnswer {
  questionId: string;
  choice: 'a' | 'b';
}

export type TimeAnchor = 'morning' | 'midday' | 'evening' | 'none';
export type SoftFrequency = 'daily' | 'few-times-week' | 'free';
export type ReminderFrequency = 'none' | 'daily' | 'weekly';
export type InsightFrequency = 'rare' | 'occasional' | 'weekly';
export type WeekStart = 'monday' | 'sunday';

export interface HabitReminder {
  frequency: ReminderFrequency;
  timeAnchor: TimeAnchor;
  enabled: boolean;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  emoji?: string;
  timeAnchor: TimeAnchor;
  softFrequency: SoftFrequency;
  createdAt: Date;
  isResting: boolean; // "let rest" instead of deleted
  restingNote?: string;
  reminder: HabitReminder;
}

export type HabitState = 'done' | 'not-done' | 'conscious-skip';

export interface DayEntry {
  date: string; // YYYY-MM-DD
  habits: Record<string, HabitState>;
  mood?: number; // 1-5, optional
  energy?: number; // 1-5, optional
  note?: string;
}

export type InsightType = 'correlation' | 'pattern' | 'prompt';

export interface Insight {
  id: string;
  type: InsightType;
  message: string;
  generatedAt: Date;
}

export interface WeekReflection {
  weekStart: string;
  word?: string;
  takeaway?: string;
}

export interface AppPreferences {
  language: string;
  insightFrequency: InsightFrequency;
  weekStart: WeekStart;
  globalRemindersEnabled: boolean;
}

export interface UserState {
  hasCompletedOnboarding: boolean;
  personality?: PersonalityProfile;
  habits: Habit[];
  entries: DayEntry[];
  insights: Insight[];
  reflections: WeekReflection[];
  preferredTone: 'gentle' | 'clear';
  preferences: AppPreferences;
}
