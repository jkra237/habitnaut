// Cloud Profile Sync Service
// Profile-centric, not activity-centric. Syncs definitions, not performance.

import { supabase } from '@/integrations/supabase/client';
import type { Habit, PersonalityProfile, DayEntry, WeekReflection } from '@/types/flownaut';
import type { Json } from '@/integrations/supabase/types';

interface CloudProfile {
  personality_axes: PersonalityProfile | null;
  preferred_tone: 'gentle' | 'clear';
  cloud_sync_enabled: boolean;
  sync_logs_enabled: boolean;
}

interface SyncStatus {
  isAuthenticated: boolean;
  isSyncing: boolean;
  lastSyncAt: Date | null;
  error: string | null;
}

/**
 * Check if user is authenticated
 */
export async function checkAuthStatus(): Promise<{ userId: string | null; email: string | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  return {
    userId: user?.id || null,
    email: user?.email || null,
  };
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/**
 * Sync profile to cloud
 */
export async function syncProfileToCloud(
  personality: PersonalityProfile | undefined,
  preferredTone: 'gentle' | 'clear',
  syncLogsEnabled: boolean
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await checkAuthStatus();
  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data: existing } = await supabase
    .from('cloud_profiles')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    // Update existing profile
    const { error } = await supabase
      .from('cloud_profiles')
      .update({
        personality_axes: (personality || null) as unknown as Json,
        preferred_tone: preferredTone,
        cloud_sync_enabled: true,
        sync_logs_enabled: syncLogsEnabled,
      })
      .eq('user_id', userId);

    if (error) {
      return { success: false, error: error.message };
    }
  } else {
    // Insert new profile
    const { error } = await supabase
      .from('cloud_profiles')
      .insert({
        user_id: userId,
        personality_axes: (personality || null) as unknown as Json,
        preferred_tone: preferredTone,
        cloud_sync_enabled: true,
        sync_logs_enabled: syncLogsEnabled,
      });

    if (error) {
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

/**
 * Sync habits to cloud
 */
export async function syncHabitsToCloud(habits: Habit[]): Promise<{ success: boolean; error?: string }> {
  const { userId } = await checkAuthStatus();
  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }

  // First, get existing cloud habits to handle deletions
  const { data: existingHabits } = await supabase
    .from('cloud_habits')
    .select('local_id')
    .eq('user_id', userId);

  const existingLocalIds = new Set(existingHabits?.map(h => h.local_id) || []);
  const currentLocalIds = new Set(habits.map(h => h.id));

  // Delete habits that no longer exist locally
  const toDelete = [...existingLocalIds].filter(id => !currentLocalIds.has(id));
  if (toDelete.length > 0) {
    await supabase
      .from('cloud_habits')
      .delete()
      .eq('user_id', userId)
      .in('local_id', toDelete);
  }

  // Upsert current habits
  for (const habit of habits) {
    const { error } = await supabase
      .from('cloud_habits')
      .upsert({
        user_id: userId,
        local_id: habit.id,
        name: habit.name,
        description: habit.description || null,
        emoji: habit.emoji || null,
        time_anchor: habit.timeAnchor,
        soft_frequency: habit.softFrequency,
        is_resting: habit.isResting,
        resting_note: habit.restingNote || null,
        reminder_frequency: String(habit.reminder?.frequency ?? 'none'),
        reminder_time_anchor: habit.reminder?.timeAnchor || 'none',
        reminder_enabled: habit.reminder?.enabled || false,
      }, {
        onConflict: 'user_id,local_id',
      });

    if (error) {
      console.error('Error syncing habit:', error);
    }
  }

  return { success: true };
}

/**
 * Sync habit logs to cloud (optional)
 */
export async function syncLogsToCloud(entries: DayEntry[]): Promise<{ success: boolean; error?: string }> {
  const { userId } = await checkAuthStatus();
  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }

  // Check if logs sync is enabled
  const { data: profile } = await supabase
    .from('cloud_profiles')
    .select('sync_logs_enabled')
    .eq('user_id', userId)
    .maybeSingle();

  if (!profile?.sync_logs_enabled) {
    return { success: false, error: 'Logs sync not enabled' };
  }

  for (const entry of entries) {
    const { error } = await supabase
      .from('cloud_habit_logs')
      .upsert({
        user_id: userId,
        date: entry.date,
        habits: entry.habits,
        mood: entry.mood || null,
        energy: entry.energy || null,
        note: entry.note || null,
      }, {
        onConflict: 'user_id,date',
      });

    if (error) {
      console.error('Error syncing log:', error);
    }
  }

  return { success: true };
}

/**
 * Sync reflections to cloud
 */
export async function syncReflectionsToCloud(reflections: WeekReflection[]): Promise<{ success: boolean; error?: string }> {
  const { userId } = await checkAuthStatus();
  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }

  for (const reflection of reflections) {
    const { error } = await supabase
      .from('cloud_reflections')
      .upsert({
        user_id: userId,
        week_start: reflection.weekStart,
        word: reflection.word || null,
        takeaway: reflection.takeaway || null,
      }, {
        onConflict: 'user_id,week_start',
      });

    if (error) {
      console.error('Error syncing reflection:', error);
    }
  }

  return { success: true };
}

/**
 * Fetch profile from cloud
 */
export async function fetchCloudProfile(): Promise<CloudProfile | null> {
  const { userId } = await checkAuthStatus();
  if (!userId) return null;

  const { data, error } = await supabase
    .from('cloud_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    personality_axes: data.personality_axes as unknown as PersonalityProfile | null,
    preferred_tone: data.preferred_tone as 'gentle' | 'clear',
    cloud_sync_enabled: data.cloud_sync_enabled,
    sync_logs_enabled: data.sync_logs_enabled,
  };
}

/**
 * Fetch habits from cloud
 */
export async function fetchCloudHabits(): Promise<Habit[]> {
  const { userId } = await checkAuthStatus();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('cloud_habits')
    .select('*')
    .eq('user_id', userId);

  if (error || !data) return [];

  return data.map(h => ({
    id: h.local_id,
    name: h.name,
    description: h.description || undefined,
    emoji: h.emoji || undefined,
    timeAnchor: h.time_anchor as any,
    softFrequency: h.soft_frequency as any,
    createdAt: new Date(h.created_at),
    isResting: h.is_resting,
    restingNote: h.resting_note || undefined,
    reminder: {
      frequency: h.reminder_frequency as any,
      timeAnchor: h.reminder_time_anchor as any,
      enabled: h.reminder_enabled,
    },
  }));
}

/**
 * Fetch logs from cloud
 */
export async function fetchCloudLogs(): Promise<DayEntry[]> {
  const { userId } = await checkAuthStatus();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('cloud_habit_logs')
    .select('*')
    .eq('user_id', userId);

  if (error || !data) return [];

  return data.map(log => ({
    date: log.date,
    habits: log.habits as Record<string, any>,
    mood: log.mood || undefined,
    energy: log.energy || undefined,
    note: log.note || undefined,
  }));
}

/**
 * Hard delete - removes ALL cloud data
 */
export async function hardDeleteCloudData(): Promise<{ success: boolean; error?: string }> {
  const { userId } = await checkAuthStatus();
  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }

  // Delete in order: logs, reflections, habits, profile
  await supabase.from('cloud_habit_logs').delete().eq('user_id', userId);
  await supabase.from('cloud_reflections').delete().eq('user_id', userId);
  await supabase.from('cloud_habits').delete().eq('user_id', userId);
  await supabase.from('cloud_profiles').delete().eq('user_id', userId);

  // Sign out after hard delete
  await signOut();

  return { success: true };
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (userId: string | null) => void): () => void {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user?.id || null);
  });

  return () => subscription.unsubscribe();
}
