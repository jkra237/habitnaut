## Login-Streak Tracker with Celebration Popup

### Concept

Track consecutive days the user opens the app. Starting from day 2, show a celebratory popup with:

- Current streak count
- Longest streak ever

### Data Model Changes

`**src/types/flownaut.ts**` — Add to `UserState`:

```typescript
loginDates: string[];        // Array of YYYY-MM-DD dates the app was opened
currentLoginStreak: number;  // Current consecutive days
longestLoginStreak: number;  // All-time record
```

### Store Changes

`**src/store/flownaut-store.ts**`:

- Add `recordLogin()` action that:
  1. Gets today's date (YYYY-MM-DD)
  2. If today already recorded, skip
  3. Add today to `loginDates`
  4. Check if yesterday is in `loginDates` — if yes, increment `currentLoginStreak`; if no, reset to 1
  5. Update `longestLoginStreak` if current > longest
  6. Return whether a new milestone was reached (streak >= 2 and streak increased)

### Popup Component

`**src/components/streak/LoginStreakPopup.tsx**`:

- A celebratory dialog/modal shown when a new streak milestone is reached
- Displays: "Congratulations, friend! You reached a new milestone: X consecutive logins"
- Shows current streak and longest streak
- Dismiss button
- Animated with framer-motion

### Integration

`**src/components/dashboard/Dashboard.tsx**`:

- On mount, call `recordLogin()` 
- If it returns a new milestone (streak >= 2), show the popup
- Use a state flag `showStreakPopup` to control visibility

### Translations

`**src/lib/i18n/translations.ts**`:

- Add keys for EN/DE/ES: streak congratulation message, current streak label, longest streak label, dismiss button

Bitte in den Pop Up Fenster einen kleinen Schalter anzeigen "Milestones nicht mehr anzeigen"