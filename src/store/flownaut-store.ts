import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState, Habit, DayEntry, HabitState, PersonalityProfile, Insight } from '@/types/flownaut';

interface FlowNautStore extends UserState {
  // Onboarding
  completeOnboarding: (personality: PersonalityProfile, tone: 'gentle' | 'clear') => void;
  
  // Habits
  addHabit: (name: string, emoji?: string) => void;
  letHabitRest: (habitId: string, note?: string) => void;
  wakeHabit: (habitId: string) => void;
  
  // Daily tracking
  setHabitState: (date: string, habitId: string, state: HabitState) => void;
  setMood: (date: string, mood: number) => void;
  setEnergy: (date: string, energy: number) => void;
  addDayNote: (date: string, note: string) => void;
  
  // Insights
  addInsight: (insight: Omit<Insight, 'id' | 'generatedAt'>) => void;
  
  // Week reflection
  setWeekWord: (weekStart: string, word: string) => void;
  setWeekTakeaway: (weekStart: string, takeaway: string) => void;
  
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
  preferredTone: 'gentle',
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

      addHabit: (name, emoji) => set((state) => ({
        habits: [
          ...state.habits,
          {
            id: crypto.randomUUID(),
            name,
            emoji,
            createdAt: new Date(),
            isResting: false,
          },
        ],
      })),

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
