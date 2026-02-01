import { useEffect, useState, useCallback } from 'react';
import { useFlowNautStore } from '@/store/flownaut-store';
import { logError } from '@/lib/error-messages';
import {
  checkAuthStatus,
  syncProfileToCloud,
  syncHabitsToCloud,
  syncLogsToCloud,
  syncReflectionsToCloud,
  fetchCloudProfile,
  fetchCloudHabits,
  fetchCloudLogs,
  onAuthStateChange,
  signUpWithEmail,
  signInWithEmail,
  signOut,
  hardDeleteCloudData,
} from '@/lib/cloud-sync';

interface CloudSyncState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  isSyncing: boolean;
  syncLogsEnabled: boolean;
  lastError: string | null;
}

export function useCloudSync() {
  const [state, setState] = useState<CloudSyncState>({
    isAuthenticated: false,
    userId: null,
    email: null,
    isSyncing: false,
    syncLogsEnabled: false,
    lastError: null,
  });

  const personality = useFlowNautStore((s) => s.personality);
  const preferredTone = useFlowNautStore((s) => s.preferredTone);
  const habits = useFlowNautStore((s) => s.habits);
  const entries = useFlowNautStore((s) => s.entries);
  const reflections = useFlowNautStore((s) => s.reflections);
  const resetStore = useFlowNautStore((s) => s.resetStore);

  // Check auth on mount and listen for changes
  useEffect(() => {
    const checkAuth = async () => {
      const { userId, email } = await checkAuthStatus();
      setState((prev) => ({
        ...prev,
        isAuthenticated: !!userId,
        userId,
        email,
      }));

      // Fetch cloud profile settings
      if (userId) {
        const profile = await fetchCloudProfile();
        if (profile) {
          setState((prev) => ({
            ...prev,
            syncLogsEnabled: profile.sync_logs_enabled,
          }));
        }
      }
    };

    checkAuth();

    const unsubscribe = onAuthStateChange(async (userId) => {
      if (userId) {
        const { email } = await checkAuthStatus();
        const profile = await fetchCloudProfile();
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          userId,
          email,
          syncLogsEnabled: profile?.sync_logs_enabled || false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isAuthenticated: false,
          userId: null,
          email: null,
          syncLogsEnabled: false,
        }));
      }
    });

    return unsubscribe;
  }, []);

  // Sync to cloud when data changes (debounced effect would be better in production)
  const syncToCloud = useCallback(async () => {
    if (!state.isAuthenticated) return;

    setState((prev) => ({ ...prev, isSyncing: true, lastError: null }));

    try {
      await syncProfileToCloud(personality, preferredTone, state.syncLogsEnabled);
      await syncHabitsToCloud(habits);
      
      if (state.syncLogsEnabled) {
        await syncLogsToCloud(entries);
        await syncReflectionsToCloud(reflections);
      }

      setState((prev) => ({ ...prev, isSyncing: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        lastError: error instanceof Error ? error.message : 'Sync failed',
      }));
    }
  }, [state.isAuthenticated, state.syncLogsEnabled, personality, preferredTone, habits, entries, reflections]);

  // Sign up
  const signUp = useCallback(async (email: string, password: string) => {
    const result = await signUpWithEmail(email, password);
    if (!result.success) {
      setState((prev) => ({ ...prev, lastError: result.error || 'Sign up failed' }));
    }
    return result;
  }, []);

  // Sign in
  const signIn = useCallback(async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    if (!result.success) {
      setState((prev) => ({ ...prev, lastError: result.error || 'Sign in failed' }));
    }
    return result;
  }, []);

  // Log out
  const logOut = useCallback(async () => {
    await signOut();
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
      userId: null,
      email: null,
    }));
  }, []);

  // Soft reset - local only
  const softReset = useCallback(() => {
    resetStore();
  }, [resetStore]);

  // Hard delete - cloud + local
  const hardDelete = useCallback(async () => {
    const result = await hardDeleteCloudData();
    if (result.success) {
      resetStore();
      setState((prev) => ({
        ...prev,
        isAuthenticated: false,
        userId: null,
        email: null,
      }));
    }
    return result;
  }, [resetStore]);

  // Toggle logs sync
  const toggleLogSync = useCallback(async (enabled: boolean) => {
    setState((prev) => ({ ...prev, syncLogsEnabled: enabled }));
    if (state.isAuthenticated) {
      await syncProfileToCloud(personality, preferredTone, enabled);
    }
  }, [state.isAuthenticated, personality, preferredTone]);

  // Restore from cloud
  const restoreFromCloud = useCallback(async () => {
    if (!state.isAuthenticated) return { success: false, error: 'Not authenticated' };

    setState((prev) => ({ ...prev, isSyncing: true }));

    try {
      const profile = await fetchCloudProfile();
      const cloudHabits = await fetchCloudHabits();
      const cloudLogs = await fetchCloudLogs();

      // Log in development only for debugging
      logError('restoreFromCloud:data', { 
        hasProfile: !!profile, 
        habitsCount: cloudHabits.length, 
        logsCount: cloudLogs.length 
      });

      setState((prev) => ({ ...prev, isSyncing: false }));
      return { success: true };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        lastError: error instanceof Error ? error.message : 'Restore failed',
      }));
      return { success: false, error: 'Restore failed' };
    }
  }, [state.isAuthenticated]);

  return {
    ...state,
    syncToCloud,
    signUp,
    signIn,
    logOut,
    softReset,
    hardDelete,
    toggleLogSync,
    restoreFromCloud,
  };
}
