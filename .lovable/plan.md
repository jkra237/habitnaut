

## Fix: Add Habit Dialog Visibility on Mobile & Desktop

### Problem
The dialog uses `fixed top-1/3 -translate-y-1/2` positioning. When the routine selector expands (weekday buttons + frequency toggle + month week selector), the dialog grows significantly taller. On mobile (664px viewport), this causes the bottom of the dialog (buttons) to overflow below the visible area. The `top-1/3` anchor point doesn't adapt to content height changes.

### Solution
Change the dialog container to use full-viewport flexbox centering instead of fixed percentage positioning. This ensures the dialog is always vertically centered regardless of content height, and the inner `max-h-[80vh] overflow-y-auto` already handles scrolling when content exceeds available space.

### Changes

**`src/components/habits/AddHabitDialog.tsx`** (line 75):
- Replace: `fixed inset-x-4 top-1/3 -translate-y-1/2 z-50 mx-auto max-w-md`
- With: `fixed inset-0 z-50 flex items-center justify-center p-4` — and move `max-w-md w-full` to the inner card div.

This way:
- The outer `motion.div` becomes a full-screen flex container that centers its child
- The inner card keeps `max-h-[80vh] overflow-y-auto` for scrollability
- Works identically on mobile (400px) and desktop viewports
- Routine expansion simply grows the card within the centered container, scrolling if needed

