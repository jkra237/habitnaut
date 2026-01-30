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
  AppPreferences,
  GratitudeEntry,
} from '@/types/flownaut';

interface AddHabitOptions {
  name: string;
  emoji?: string;
  description?: string;
  timeAnchor?: TimeAnchor;
  softFrequency?: SoftFrequency;
}

const defaultPreferences: AppPreferences = {
  language: 'en',
  insightFrequency: 'occasional',
  weekStart: 'monday',
};

interface FlowNautStore extends UserState {
  // Onboarding
  completeOnboarding: (personality: PersonalityProfile, tone: 'gentle' | 'clear') => void;
  updatePersonality: (personality: PersonalityProfile) => void;
  reopenOnboarding: () => void;
  
  // Habits
  addHabit: (nameOrOptions: string | AddHabitOptions, emoji?: string) => void;
  letHabitRest: (habitId: string, note?: string) => void;
  wakeHabit: (habitId: string) => void;
  deleteHabit: (habitId: string) => void;
  
  // Daily tracking
  setHabitState: (date: string, habitId: string, state: HabitState) => void;
  setMood: (date: string, mood: number) => void;
  setEnergy: (date: string, energy: number) => void;
  addDayNote: (date: string, note: string) => void;
  
  // Insights
  addInsight: (insight: Omit<Insight, 'id' | 'generatedAt'>) => void;
  
  // Gratitude
  addGratitude: (date: string, text: string) => void;
  deleteGratitude: (id: string) => void;
  
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
  preferredTone: 'gentle',
  preferences: defaultPreferences,
};

export const useFlowNautStore = create<FlowNautStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeOnboarding: (personality, tone) => set({
        hasCompletedOnboarding: true,
        personality,
        preferredTone: tone,
      }),

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
          preferences: state.preferences,
          exportedAt: new Date().toISOString(),
        }, null, 2);
      },

      importData: (jsonData: string) => {
        try {
          const data = JSON.parse(jsonData);
          
          // Validate required structure
          if (!data || typeof data !== 'object') {
            return { success: false, error: 'Invalid data format' };
          }

          // Import what we can
          set((state) => ({
            personality: data.personality || state.personality,
            habits: Array.isArray(data.habits) ? data.habits : state.habits,
            entries: Array.isArray(data.entries) ? data.entries : state.entries,
            reflections: Array.isArray(data.reflections) ? data.reflections : state.reflections,
            preferences: data.preferences ? { ...state.preferences, ...data.preferences } : state.preferences,
            hasCompletedOnboarding: data.personality ? true : state.hasCompletedOnboarding,
          }));

          return { success: true };
        } catch (error) {
          return { success: false, error: 'Could not parse the file' };
        }
      },

      // Profile management
      updatePersonality: (personality) => set({ personality }),

      reopenOnboarding: () => set({
        hasCompletedOnboarding: false,
      }),

      getEntry: (date) => get().entries.find((e) => e.date === date),

      getActiveHabits: () => get().habits.filter((h) => !h.isResting),

      getRestingHabits: () => get().habits.filter((h) => h.isResting),

      resetStore: () => set(initialState),
    }),
    {
      name: 'flownaut-storage',
    }
  )
);
