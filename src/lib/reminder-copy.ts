// Gentle reminder copy - awareness, not compliance
// "The reminder serves awareness, not compliance."

import type { ReminderFrequency } from '@/types/flownaut';
import type { Translations } from '@/lib/i18n/translations';

interface ReminderCopyOptions {
  habitName?: string;
  frequency: ReminderFrequency;
  t?: Translations['reminders'];
}

/**
 * Get a random gentle reminder message.
 * Never uses urgency, blame, or streak language.
 */
export function getRandomReminderCopy(options: ReminderCopyOptions): string {
  const { habitName, frequency, t } = options;

  if (frequency === 'none') {
    return '';
  }

  // Use translations if available
  if (t) {
    if (frequency === 'daily') {
      const dailyCopies = Object.values(t.dailyCopy);
      return dailyCopies[Math.floor(Math.random() * dailyCopies.length)];
    }
    // Weekly
    const weeklyCopies = Object.values(t.weeklyCopy);
    return weeklyCopies[Math.floor(Math.random() * weeklyCopies.length)];
  }

  // Fallback to English
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

  if (frequency === 'daily') {
    return DAILY_REMINDERS[Math.floor(Math.random() * DAILY_REMINDERS.length)];
  }

  return WEEKLY_REMINDERS[Math.floor(Math.random() * WEEKLY_REMINDERS.length)];
}

/**
 * Get the invitation note for reminder settings
 */
export function getInvitationNote(t?: Translations['reminders']): string {
  if (t) {
    return t.invitationNote;
  }
  return "This is just a gentle nudge. You can turn it off anytime.";
}

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
