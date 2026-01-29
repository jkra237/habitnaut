// Gentle reminder copy - awareness, not compliance
// "The reminder serves awareness, not compliance."

import type { ReminderFrequency } from '@/types/flownaut';

interface ReminderCopyOptions {
  habitName?: string;
  frequency: ReminderFrequency;
}

const DAILY_REMINDERS = [
  "Want to reconnect with your habit?",
  "A small pause, if it fits.",
  "If now feels right, this habit is here.",
  "A gentle moment to check in.",
  "This is here when you're ready.",
];

const WEEKLY_REMINDERS = [
  "This habit checked in this week.",
  "Want to gently pick this up again?",
  "A reminder without pressure.",
  "Your habit is resting here, whenever you'd like.",
  "A soft invitation to reconnect.",
];

const PERSONALIZED_DAILY = [
  (name: string) => `Want to reconnect with ${name}?`,
  (name: string) => `${name} is here, if it fits.`,
  (name: string) => `A gentle nudge for ${name}.`,
];

const PERSONALIZED_WEEKLY = [
  (name: string) => `${name} checked in this week.`,
  (name: string) => `Want to gently pick up ${name} again?`,
  (name: string) => `A soft reminder about ${name}.`,
];

/**
 * Get a random gentle reminder message.
 * Never uses urgency, blame, or streak language.
 */
export function getRandomReminderCopy(options: ReminderCopyOptions): string {
  const { habitName, frequency } = options;

  if (frequency === 'none') {
    return '';
  }

  if (frequency === 'daily') {
    if (habitName) {
      const templates = PERSONALIZED_DAILY;
      const template = templates[Math.floor(Math.random() * templates.length)];
      return template(habitName);
    }
    return DAILY_REMINDERS[Math.floor(Math.random() * DAILY_REMINDERS.length)];
  }

  // Weekly
  if (habitName) {
    const templates = PERSONALIZED_WEEKLY;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template(habitName);
  }
  return WEEKLY_REMINDERS[Math.floor(Math.random() * WEEKLY_REMINDERS.length)];
}

/**
 * Get all reminder copy variants for a given frequency.
 * Useful for preview/settings screens.
 */
export function getAllReminderCopy(frequency: ReminderFrequency): string[] {
  if (frequency === 'daily') {
    return [...DAILY_REMINDERS];
  }
  if (frequency === 'weekly') {
    return [...WEEKLY_REMINDERS];
  }
  return [];
}

/**
 * Micro-invitation for first-time reminder activation.
 * Shown after user has logged a habit at least once.
 */
export const REMINDER_INVITATION = {
  question: "Would a gentle reminder help you reconnect with this habit?",
  optionYes: "Yes, gently",
  optionNo: "No, thanks",
  note: "This is just a gentle nudge. You can turn it off anytime.",
} as const;

/**
 * Get the default time anchor based on habit name heuristics.
 */
export function suggestTimeAnchor(habitName: string): 'morning' | 'midday' | 'evening' | 'none' {
  const lowerName = habitName.toLowerCase();
  
  if (lowerName.includes('morning') || lowerName.includes('sunrise') || lowerName.includes('wake')) {
    return 'morning';
  }
  if (lowerName.includes('evening') || lowerName.includes('night') || lowerName.includes('wind-down') || lowerName.includes('reflection')) {
    return 'evening';
  }
  if (lowerName.includes('lunch') || lowerName.includes('midday') || lowerName.includes('afternoon')) {
    return 'midday';
  }
  
  return 'none';
}
