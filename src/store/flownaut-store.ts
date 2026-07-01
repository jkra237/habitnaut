import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  UserState, 
  Habit, 
  DayEntry, 
  HabitState, 
  PersonalityProfile, 
  Insight,
  TimeAnchor,
  SoftFrequency,
  RoutineFrequency,
  AppPreferences,
  GratitudeEntry,
  SelfExperiment,
} from '@/types/flownaut';
import { validateImportData } from '@/lib/import-validation';
import { checkAchievements } from '@/lib/achievements/achievement-checker';

interface AddHabitOptions {
  name: string;
  emoji?: string;
  description?: string;
  timeAnchor?: TimeAnchor;
  softFrequency?: SoftFrequency;
  routineDays?: number[];
  routineFrequency?: RoutineFrequency;
  routineMonthWeek?: number | number[];
  scheduledTime?: string;
}

const defaultPreferences: AppPreferences = {
  language: 'en',
  insightFrequency: 'occasional',
  weekStart: 'monday',
  dailyQuoteEnabled: true,
};

interface FlowNautStore extends UserState {
  // Onboarding
  completeOnboarding: (personality: PersonalityProfile, tone: 'gentle' | 'clear', userName?: string) => void;
  setUserName: (userName: string) => void;
  updatePersonality: (personality: PersonalityProfile) => void;
  reopenOnboarding: () => void;
  
  // Habits
  addHabit: (nameOrOptions: string | AddHabitOptions, emoji?: string) => void;
  letHabitRest: (habitId: string, note?: string) => void;
  wakeHabit: (habitId: string) => void;
  deleteHabit: (habitId: string) => void;
  updateHabitRoutine: (habitId: string, routineDays?: number[], routineFrequency?: RoutineFrequency, routineMonthWeek?: number | number[]) => void;
  updateHabitTime: (habitId: string, time?: string) => void;
  
  // Daily tracking
  setHabitState: (date: string, habitId: string, state: HabitState) => void;
  removeHabitState: (date: string, habitId: string) => void;
  setMood: (date: string, mood: number) => void;
  setEnergy: (date: string, energy: number) => void;
  addDayNote: (date: string, note: string) => void;
  
  // Insights
  addInsight: (insight: Omit<Insight, 'id' | 'generatedAt'>) => void;
  
  // Gratitude
  addGratitude: (date: string, text: string) => void;
  deleteGratitude: (id: string) => void;

  // Self experiments
  startExperiment: (experiment: Omit<SelfExperiment, 'id' | 'createdAt' | 'status'>) => void;
  completeExperiment: (experimentId: string, afterMood: number, closingNote?: string) => void;
  restExperiment: (experimentId: string) => void;
  wakeExperiment: (experimentId: string) => void;
  
  // Week reflection
  setWeekWord: (weekStart: string, word: string) => void;
  setWeekTakeaway: (weekStart: string, takeaway: string) => void;
  
  // Preferences
  updatePreferences: (updates: Partial<AppPreferences>) => void;
  
  // Data management
  clearLocalLogs: () => void;
  exportData: () => string;
  importData: (jsonData: string) => { success: boolean; error?: string };
  
  // Helpers
  getEntry: (date: string) => DayEntry | undefined;
  getActiveHabits: () => Habit[];
  getRestingHabits: () => Habit[];
  
  // Achievements
  checkAndUnlockAchievements: () => void;
  
  // Quotes
  markQuoteShown: (quoteId: number, date: string) => void;
  
  // Login streak
  recordLogin: () => { showMilestone: boolean; streak: number };
  setMilestonesDisabled: (disabled: boolean) => void;
  
  // Reset for demo
  resetStore: () => void;
}

const initialState: UserState = {
  hasCompletedOnboarding: false,
  personality: undefined,
  habits: [],
  entries: [],
  insights: [],
  reflections: [],
  gratitudeEntries: [],
  experiments: [],
  unlockedAchievements: {},
  preferredTone: 'gentle',
  preferences: defaultPreferences,
  shownQuoteIds: [],
  lastQuoteDate: '',
  loginDates: [],
  currentLoginStreak: 0,
  longestLoginStreak: 0,
  milestonesDisabled: false,
};

export const useFlowNautStore = create<FlowNautStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeOnboarding: (personality, tone, userName) => set({
        hasCompletedOnboarding: true,
        personality,
        preferredTone: tone,
        userName: userName?.trim() || undefined,
      }),

      setUserName: (userName) => set({ userName: userName.trim() || undefined }),


      addHabit: (nameOrOptions, emoji) => set((state) => {
        const isOptions = typeof nameOrOptions === 'object';
        const options: AddHabitOptions = isOptions 
          ? nameOrOptions 
          : { name: nameOrOptions, emoji };
        
        const newHabit: Habit = {
          id: crypto.randomUUID(),
          name: options.name,
          description: options.description,
          emoji: options.emoji,
          timeAnchor: options.timeAnchor || 'none',
          softFrequency: options.softFrequency || 'free',
          routineDays: options.routineDays,
          routineFrequency: options.routineFrequency,
          routineMonthWeek: options.routineMonthWeek,
          scheduledTime: options.scheduledTime,
          createdAt: new Date(),
          isResting: false,
        };
        
        return {
          habits: [...state.habits, newHabit],
        };
      }),

      letHabitRest: (habitId, note) => set((state) => ({
        habits: state.habits.map((h) =>
          h.id === habitId ? { ...h, isResting: true, restingNote: note } : h
        ),
      })),

      wakeHabit: (habitId) => set((state) => ({
        habits: state.habits.map((h) =>
          h.id === habitId ? { ...h, isResting: false, restingNote: undefined } : h
        ),
      })),

      deleteHabit: (habitId) => set((state) => ({
        habits: state.habits.filter((h) => h.id !== habitId),
      })),

      updateHabitRoutine: (habitId, routineDays, routineFrequency, routineMonthWeek) => set((state) => ({
        habits: state.habits.map((h) =>
          h.id === habitId ? { ...h, routineDays, routineFrequency, routineMonthWeek } : h
        ),
      })),

      updateHabitTime: (habitId, time) => set((state) => ({
        habits: state.habits.map((h) =>
          h.id === habitId ? { ...h, scheduledTime: time } : h
        ),
      })),

      setHabitState: (date, habitId, state) => set((store) => {
        const existingEntry = store.entries.find((e) => e.date === date);
        if (existingEntry) {
          return {
            entries: store.entries.map((e) =>
              e.date === date
                ? { ...e, habits: { ...e.habits, [habitId]: state } }
                : e
            ),
          };
        }
        return {
          entries: [
            ...store.entries,
            { date, habits: { [habitId]: state } },
          ],
        };
      }),

      removeHabitState: (date, habitId) => set((store) => {
        const existingEntry = store.entries.find((e) => e.date === date);
        if (!existingEntry) return {};
        const { [habitId]: _, ...rest } = existingEntry.habits;
        // If no habits left and no other data, remove entire entry
        if (Object.keys(rest).length === 0 && !existingEntry.mood && !existingEntry.energy && !existingEntry.note) {
          return { entries: store.entries.filter((e) => e.date !== date) };
        }
        return {
          entries: store.entries.map((e) =>
            e.date === date ? { ...e, habits: rest } : e
          ),
        };
      }),

      setMood: (date, mood) => set((store) => {
        const existingEntry = store.entries.find((e) => e.date === date);
        if (existingEntry) {
          return {
            entries: store.entries.map((e) =>
              e.date === date ? { ...e, mood } : e
            ),
          };
        }
        return {
          entries: [...store.entries, { date, habits: {}, mood }],
        };
      }),

      setEnergy: (date, energy) => set((store) => {
        const existingEntry = store.entries.find((e) => e.date === date);
        if (existingEntry) {
          return {
            entries: store.entries.map((e) =>
              e.date === date ? { ...e, energy } : e
            ),
          };
        }
        return {
          entries: [...store.entries, { date, habits: {}, energy }],
        };
      }),

      addDayNote: (date, note) => set((store) => {
        const existingEntry = store.entries.find((e) => e.date === date);
        if (existingEntry) {
          return {
            entries: store.entries.map((e) =>
              e.date === date ? { ...e, note } : e
            ),
          };
        }
        return {
          entries: [...store.entries, { date, habits: {}, note }],
        };
      }),

      addInsight: (insight) => set((state) => ({
        insights: [
          {
            ...insight,
            id: crypto.randomUUID(),
            generatedAt: new Date(),
          },
          ...state.insights,
        ].slice(0, 20), // Keep last 20 insights
      })),

      // Gratitude
      addGratitude: (date, text) => set((state) => ({
        gratitudeEntries: [
          ...state.gratitudeEntries,
          {
            id: crypto.randomUUID(),
            date,
            text,
            createdAt: new Date().toISOString(),
          },
        ],
      })),

      deleteGratitude: (id) => set((state) => ({
        gratitudeEntries: state.gratitudeEntries.filter((e) => e.id !== id),
      })),

      startExperiment: (experiment) => set((state) => ({
        experiments: [
          {
            ...experiment,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: 'active',
          },
          ...state.experiments.filter((e) => e.status !== 'active'),
        ],
      })),

      completeExperiment: (experimentId, afterMood, closingNote) => set((state) => ({
        experiments: state.experiments.map((experiment) =>
          experiment.id === experimentId
            ? {
                ...experiment,
                afterMood,
                closingNote,
                status: 'completed',
                completedAt: new Date().toISOString(),
              }
            : experiment
        ),
      })),

      restExperiment: (experimentId) => set((state) => ({
        experiments: state.experiments.map((experiment) =>
          experiment.id === experimentId
            ? { ...experiment, status: 'resting' }
            : experiment
        ),
      })),

      wakeExperiment: (experimentId) => set((state) => ({
        experiments: state.experiments.map((experiment) => {
          if (experiment.id !== experimentId) {
            // Demote any currently active experiment to resting to keep one-active rule
            return experiment.status === 'active'
              ? { ...experiment, status: 'resting' as const }
              : experiment;
          }
          return { ...experiment, status: 'active' as const };
        }),
      })),

      setWeekWord: (weekStart, word) => set((state) => {
        const existing = state.reflections.find((r) => r.weekStart === weekStart);
        if (existing) {
          return {
            reflections: state.reflections.map((r) =>
              r.weekStart === weekStart ? { ...r, word } : r
            ),
          };
        }
        return {
          reflections: [...state.reflections, { weekStart, word }],
        };
      }),

      setWeekTakeaway: (weekStart, takeaway) => set((state) => {
        const existing = state.reflections.find((r) => r.weekStart === weekStart);
        if (existing) {
          return {
            reflections: state.reflections.map((r) =>
              r.weekStart === weekStart ? { ...r, takeaway } : r
            ),
          };
        }
        return {
          reflections: [...state.reflections, { weekStart, takeaway }],
        };
      }),

      // Preferences
      updatePreferences: (updates) => set((state) => ({
        preferences: { ...state.preferences, ...updates },
      })),

      // Data management
      clearLocalLogs: () => set((state) => ({
        entries: [],
      })),

      exportData: () => {
        const state = get();
        return JSON.stringify({
          personality: state.personality,
          habits: state.habits,
          entries: state.entries,
          reflections: state.reflections,
          gratitudeEntries: state.gratitudeEntries,
          experiments: state.experiments,
          preferences: state.preferences,
          exportedAt: new Date().toISOString(),
        }, null, 2);
      },

      importData: (jsonData: string) => {
        // Validate and sanitize the imported data
        const validation = validateImportData(jsonData);
        
        if (!validation.success || !validation.data) {
          return { success: false, error: validation.error };
        }

        const data = validation.data;

        // Import validated data - cast types to match store expectations
        set((state) => ({
          personality: (data.personality as PersonalityProfile) || state.personality,
          habits: (data.habits as Habit[]) || state.habits,
          entries: (data.entries as DayEntry[]) || state.entries,
          reflections: (data.reflections as typeof state.reflections) || state.reflections,
          gratitudeEntries: (data.gratitudeEntries as GratitudeEntry[]) || state.gratitudeEntries,
          experiments: (data.experiments as SelfExperiment[]) || state.experiments,
          preferences: data.preferences ? { ...state.preferences, ...data.preferences } : state.preferences,
          hasCompletedOnboarding: data.personality ? true : state.hasCompletedOnboarding,
        }));

        return { success: true };
      },

      // Profile management
      updatePersonality: (personality) => set({ personality }),

      reopenOnboarding: () => set({
        hasCompletedOnboarding: false,
      }),

      getEntry: (date) => get().entries.find((e) => e.date === date),

      getActiveHabits: () => get().habits.filter((h) => !h.isResting),

      getRestingHabits: () => get().habits.filter((h) => h.isResting),

      // Achievements
      checkAndUnlockAchievements: () => {
        const state = get();
        const newUnlocked = checkAchievements(state);
        const current = state.unlockedAchievements;
        const now = new Date().toISOString();
        let changed = false;
        const merged = { ...current };
        for (const key of newUnlocked) {
          if (!merged[key]) {
            merged[key] = now;
            changed = true;
          }
        }
        if (changed) {
          set({ unlockedAchievements: merged });
        }
      },

      markQuoteShown: (quoteId, date) => set((state) => ({
        shownQuoteIds: [...state.shownQuoteIds, quoteId],
        lastQuoteDate: date,
      })),

      recordLogin: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        
        // Already recorded today
        if (state.loginDates.includes(today)) {
          return { showMilestone: false, streak: state.currentLoginStreak };
        }
        
        // Calculate yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const wasYesterday = state.loginDates.includes(yesterdayStr);
        const newStreak = wasYesterday ? state.currentLoginStreak + 1 : 1;
        const newLongest = Math.max(newStreak, state.longestLoginStreak);
        const showMilestone = newStreak >= 2 && !state.milestonesDisabled;
        
        set({
          loginDates: [...state.loginDates, today],
          currentLoginStreak: newStreak,
          longestLoginStreak: newLongest,
        });
        
        return { showMilestone, streak: newStreak };
      },

      setMilestonesDisabled: (disabled) => set({ milestonesDisabled: disabled }),

      resetStore: () => set(initialState),
    }),
    {
      name: 'flownaut-storage',
    }
  )
);
