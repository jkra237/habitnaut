// FlowNaut Types - Self-observation, not optimization

export interface PersonalityProfile {
  // Three simplified axes from onboarding
  energyStyle: 'active' | 'calming';
  structureStyle: 'structured' | 'flexible';
  motivationStyle: 'progress' | 'feeling';
}

export interface OnboardingAnswer {
  questionId: string;
  choice: 'a' | 'b';
}

export type TimeAnchor = 'morning' | 'midday' | 'evening' | 'none';
export type SoftFrequency = 'daily' | 'few-times-week' | 'free';
export type RoutineFrequency = 'weekly' | 'monthly';
export type InsightFrequency = 'never' | 'rare' | 'occasional' | 'weekly';
export type WeekStart = 'monday' | 'sunday';

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
  routineDays?: number[]; // 0=Mon, 1=Tue, ..., 6=Sun (ISO weekday - 1)
  routineFrequency?: RoutineFrequency;
  routineMonthWeek?: number | number[]; // 1-4, which week(s) of the month (only for monthly)
  scheduledTime?: string; // HH:mm format, optional specific time
}

export type HabitState = 'done' | 'not-done' | 'conscious-skip' | 'planned';

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
  messageKey?: string; // Translation key for localized message
  messageParams?: Record<string, string>; // Parameters for interpolation
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
  dailyQuoteEnabled: boolean;
}

export interface GratitudeEntry {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  createdAt: string; // ISO timestamp
}

export type ExperimentStatus = 'active' | 'completed' | 'resting';

export interface SelfExperiment {
  id: string;
  ideaId: string;
  title: string;
  description: string;
  reflectionQuestion: string;
  emoji: string;
  durationDays: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  beforeMood: number; // 1-5
  afterMood?: number; // 1-5
  intention?: string;
  closingNote?: string;
  status: ExperimentStatus;
  createdAt: string; // ISO timestamp
  completedAt?: string; // ISO timestamp
}

export interface UserState {
  hasCompletedOnboarding: boolean;
  personality?: PersonalityProfile;
  habits: Habit[];
  entries: DayEntry[];
  insights: Insight[];
  reflections: WeekReflection[];
  gratitudeEntries: GratitudeEntry[];
  experiments: SelfExperiment[];
  unlockedAchievements: Record<string, string>; // key -> ISO date when unlocked
  preferredTone: 'gentle' | 'clear';
  preferences: AppPreferences;
  shownQuoteIds: number[];
  lastQuoteDate: string;
  loginDates: string[];
  currentLoginStreak: number;
  longestLoginStreak: number;
  milestonesDisabled: boolean;
}
