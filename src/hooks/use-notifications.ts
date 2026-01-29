import { useEffect, useCallback, useState } from 'react';
import { useFlowNautStore } from '@/store/flownaut-store';
import {
  getNotificationPermissionState,
  requestNotificationPermission,
  initializeAllReminders,
  scheduleHabitReminder,
  cancelHabitReminder,
  sendTestNotification,
} from '@/lib/notification-service';
import type { HabitReminder } from '@/types/flownaut';

interface NotificationState {
  isSupported: boolean;
  permission: 'granted' | 'denied' | 'pending';
  isInitialized: boolean;
}

export function useNotifications() {
  const habits = useFlowNautStore((state) => state.habits);
  const updateHabitReminder = useFlowNautStore((state) => state.updateHabitReminder);
  
  const [state, setState] = useState<NotificationState>({
    isSupported: false,
    permission: 'pending',
    isInitialized: false,
  });

  // Check notification support on mount
  useEffect(() => {
    const supported = 'Notification' in window;
    const permissionState = getNotificationPermissionState();
    
    setState({
      isSupported: supported,
      permission: permissionState.granted ? 'granted' : permissionState.denied ? 'denied' : 'pending',
      isInitialized: false,
    });
  }, []);

  // Initialize reminders when habits change
  useEffect(() => {
    if (state.permission === 'granted') {
      initializeAllReminders(habits);
      setState((prev) => ({ ...prev, isInitialized: true }));
    }
  }, [habits, state.permission]);

  // Request permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    const granted = await requestNotificationPermission();
    
    setState((prev) => ({
      ...prev,
      permission: granted ? 'granted' : 'denied',
    }));

    if (granted) {
      // Initialize reminders after permission granted
      initializeAllReminders(habits);
    }

    return granted;
  }, [habits]);

  // Enable reminder for a habit (with permission request if needed)
  const enableReminder = useCallback(async (
    habitId: string,
    reminder: HabitReminder
  ): Promise<boolean> => {
    // If notifications are not enabled yet, request permission first
    if (reminder.enabled && state.permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        return false;
      }
    }

    // Update the habit reminder
    updateHabitReminder(habitId, reminder);

    // Schedule or cancel the notification
    const habit = habits.find((h) => h.id === habitId);
    if (habit) {
      const updatedHabit = { ...habit, reminder };
      if (reminder.enabled) {
        scheduleHabitReminder(updatedHabit);
      } else {
        cancelHabitReminder(habitId);
      }
    }

    return true;
  }, [habits, state.permission, requestPermission, updateHabitReminder]);

  // Send a test notification
  const testNotification = useCallback(async (): Promise<boolean> => {
    if (state.permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return false;
    }
    return sendTestNotification();
  }, [state.permission, requestPermission]);

  return {
    ...state,
    requestPermission,
    enableReminder,
    testNotification,
  };
}
