

## Problem

With only one active habit, the "Your Overview" section shows multiple stats that all say essentially the same thing:

1. **"Most practiced"** → shows the single habit
2. **"Steadiest rhythm"** → shows the same single habit
3. **"Trend: more present lately"** → generic statement about the same habit

These are three ways of saying "you've been doing this habit regularly." The user rightly sees this as redundant.

## Root Cause

The statistics are designed for multiple habits but don't deduplicate when there's only one. Additionally, "steadiest rhythm" and "most practiced" overlap conceptually even with multiple habits — the most-done habit is often the steadiest.

## Fix

In `src/components/statistics/HabitStatistics.tsx`:

1. **Skip "steadiest rhythm" if it's the same habit as "most practiced"** — the information is already conveyed.
2. **Skip "least practiced" if there's only one active habit** — it's the same as "most practiced."
3. **Skip "trend" if there are fewer than 2 active habits and the trend just restates what "most practiced" already shows** — collapse redundant signals.
4. **General dedup rule**: before pushing any stat that references a specific habit, check if that habit is already shown by a previous stat. If so, only add it if the new stat provides genuinely different information (e.g., habit pair shows a *relationship*, not just a single habit again).

### Concretely

- Line ~261: Add condition `stats.steadiestHabit.id !== stats.mostPracticed?.habit.id`
- Line ~221: Add condition `habits.length >= 2` (already partially there but `leastPracticed` can still equal `mostPracticed` when count differs by 0)
- Line ~289: Add condition `habits.length >= 2` for trend — with one habit it just restates what's above
- Add a final cap: show **max 5 stat items** to prevent visual clutter

