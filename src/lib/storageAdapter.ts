/**
 * Storage Adapter for BhumiSure Demo MVP
 * Handles local-only demo persistence for non-sensitive data:
 * - User session (demo token, user profile)
 * - Saved land checks
 * - Verification tasks & notes
 * - User preferences
 *
 * NOTE: This is explicitly a client-side demo storage adapter.
 * It never stores raw passwords, secrets, or real national IDs.
 */

export const STORAGE_KEYS = {
  AUTH_USER: 'bhumisure_auth_user_v3',
  SAVED_CHECKS: 'bhumisure_saved_checks_v2',
  NOTIFICATIONS: 'bhumisure_notifications_v2',
  SETTINGS: 'bhumisure_settings_v2',
  VERIFICATION_TASKS: 'bhumisure_verification_tasks_v2',
};

export const StorageAdapter = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`[StorageAdapter] Failed to parse item for key "${key}":`, e);
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[StorageAdapter] Failed to store item for key "${key}":`, e);
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[StorageAdapter] Failed to remove item for key "${key}":`, e);
    }
  },

  clearAllDemoData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
      sessionStorage.clear();
    } catch (e) {
      console.warn('[StorageAdapter] Failed to clear demo storage:', e);
    }
  },
};
