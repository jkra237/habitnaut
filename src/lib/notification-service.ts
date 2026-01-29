// Gentle Notification Service
// "The reminder serves awareness, not compliance."

import type { Habit, HabitReminder, TimeAnchor } from '@/types/flownaut';
import { getRandomReminderCopy } from './reminder-copy';

interface NotificationPermissionState {
  granted: boolean;
  denied: boolean;
  pending: boolean;
}

/**
 * Check current notification permission state
 */
export function getNotificationPermissionState(): NotificationPermissionState {
  if (!('Notification' in window)) {
    return { granted: false, denied: true, pending: false };
  }
  
  return {
    granted: Notification.permission === 'granted',
    denied: Notification.permission === 'denied',
    pending: Notification.permission === 'default',
  };
}

/**
 * Request notification permission with gentle framing
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('Notifications not supported in this browser');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

/**
 * Show a gentle notification for a habit
 */
export function showHabitNotification(habit: Habit): void {
  const state = getNotificationPermissionState();
  
  if (!state.granted) {
    console.log('Notification permission not granted');
    return;
  }

  const message = getRandomReminderCopy({
    habitName: habit.name,
    frequency: habit.reminder.frequency,
  });

  if (!message) return;

  const notification = new Notification('FlowNaut', {
    body: message,
    icon: '/favicon.ico',
    tag: `habit-${habit.id}`,
    silent: true, // Respect the "no vibration by default" principle
    requireInteraction: false, // Don't force interaction
  });

  // Auto-close after 8 seconds (gentle, non-intrusive)
  setTimeout(() => {
    notification.close();
  }, 8000);

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

/**
 * Get the approximate time for a time anchor
 */
function getTimeForAnchor(anchor: TimeAnchor): { hour: number; minute: number } {
  switch (anchor) {
    case 'morning':
      return { hour: 8, minute: 0 };
    case 'midday':
      return { hour: 12, minute: 30 };
    case 'evening':
      return { hour: 19, minute: 0 };
    default:
      return { hour: 9, minute: 0 };
  }
}

/**
 * Calculate milliseconds until next occurrence of a time anchor
 */
function getMillisecondsUntilTime(hour: number, minute: number): number {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  // If the time has already passed today, schedule for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime() - now.getTime();
}

// Store timeout IDs for scheduled notifications
const scheduledNotifications = new Map<string, number>();

/**
 * Schedule a gentle reminder for a habit
 */
export function scheduleHabitReminder(habit: Habit): void {
  // Clear any existing scheduled notification for this habit
  cancelHabitReminder(habit.id);

  if (!habit.reminder.enabled || habit.reminder.frequency === 'none') {
    return;
  }

  const state = getNotificationPermissionState();
  if (!state.granted) {
    console.log('Cannot schedule notification - permission not granted');
    return;
  }

  const time = getTimeForAnchor(habit.reminder.timeAnchor);
  const delay = getMillisecondsUntilTime(time.hour, time.minute);

  const timeoutId = window.setTimeout(() => {
    showHabitNotification(habit);
    
    // Reschedule for daily reminders
    if (habit.reminder.frequency === 'daily') {
      scheduleHabitReminder(habit);
    }
    
    // For weekly, reschedule 7 days later
    if (habit.reminder.frequency === 'weekly') {
      const weekDelay = 7 * 24 * 60 * 60 * 1000;
      scheduledNotifications.set(
        habit.id,
        window.setTimeout(() => scheduleHabitReminder(habit), weekDelay)
      );
    }
  }, delay);

  scheduledNotifications.set(habit.id, timeoutId);
  
  console.log(
    `Scheduled reminder for "${habit.name}" at ${time.hour}:${time.minute.toString().padStart(2, '0')} (in ${Math.round(delay / 60000)} minutes)`
  );
}

/**
 * Cancel a scheduled reminder
 */
export function cancelHabitReminder(habitId: string): void {
  const timeoutId = scheduledNotifications.get(habitId);
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    scheduledNotifications.delete(habitId);
    console.log(`Cancelled reminder for habit ${habitId}`);
  }
}

/**
 * Initialize all habit reminders from the store
 */
export function initializeAllReminders(habits: Habit[]): void {
  // Cancel all existing scheduled notifications
  scheduledNotifications.forEach((_, habitId) => {
    cancelHabitReminder(habitId);
  });

  // Schedule reminders for habits with enabled notifications
  habits
    .filter((h) => !h.isResting && h.reminder.enabled)
    .forEach((habit) => {
      scheduleHabitReminder(habit);
    });
}

/**
 * Send a test notification to verify the system works
 */
export async function sendTestNotification(): Promise<boolean> {
  const hasPermission = await requestNotificationPermission();
  
  if (!hasPermission) {
    return false;
  }

  new Notification('FlowNaut', {
    body: 'Gentle reminders are now active. This is just a test.',
    icon: '/favicon.ico',
    silent: true,
  });

  return true;
}
