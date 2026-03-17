import { useEffect, useRef } from 'react';
import { useFlowNautStore } from '@/store/flownaut-store';

export function useHabitNotifications() {
  const habits = useFlowNautStore((s) => s.habits);
  const notifiedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Reset notified set at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const midnightTimer = setTimeout(() => {
      notifiedRef.current.clear();
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  useEffect(() => {
    if (!('Notification' in window)) return;

    const eligibleHabits = habits.filter(
      (h) => h.scheduledTime && h.notificationEnabled && !h.isResting
    );

    if (eligibleHabits.length === 0) return;

    const checkAndNotify = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      eligibleHabits.forEach((habit) => {
        const todayKey = `${habit.id}-${currentTime}`;
        if (habit.scheduledTime === currentTime && !notifiedRef.current.has(todayKey)) {
          notifiedRef.current.add(todayKey);
          showNotification(habit.emoji || '🌱', habit.name);
        }
      });
    };

    // Check immediately and then every 30 seconds
    checkAndNotify();
    const interval = setInterval(checkAndNotify, 30_000);

    return () => clearInterval(interval);
  }, [habits]);
}

function showNotification(emoji: string, name: string) {
  if (Notification.permission === 'granted') {
    new Notification(`${emoji} ${name}`, {
      body: 'Zeit für deine Gewohnheit',
      icon: '/icon-192x192.png',
      tag: `habit-${name}`,
    });
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}
