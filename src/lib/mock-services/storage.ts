import {
  AccessRequest,
  AuditEvent,
  DemoSettings,
  NotificationItem,
  ParcelReference,
  UserProfile,
} from '../../types';
import { INITIAL_PARCELS } from '../mock-data/parcels';
import { INITIAL_REQUESTS } from '../mock-data/requests';
import {
  INITIAL_AUDIT_EVENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
} from '../mock-data/audit';

const STORAGE_KEYS = {
  PARCELS: 'landtech_parcels_v1',
  REQUESTS: 'landtech_requests_v1',
  AUDIT: 'landtech_audit_v1',
  NOTIFICATIONS: 'landtech_notifications_v1',
  SETTINGS: 'landtech_settings_v1',
  USER: 'landtech_user_v1',
  ROLE: 'landtech_role_v1',
};

export const INITIAL_USER: UserProfile = {
  id: 'USER-CITIZEN-01',
  name: 'Tanvir Hossain',
  role: 'citizen',
  maskedNid: '1988********7419 (যাচাইকৃত নাগরিক)',
  phoneMasked: '+880 17**-***892',
  identityStatus: 'verified',
  verifiedAt: '2026-10-15T07:45:00Z',
  privacyAck: true,
};

export const StorageService = {
  getParcels(): ParcelReference[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PARCELS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(INITIAL_PARCELS));
      return INITIAL_PARCELS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PARCELS;
    }
  },

  saveParcels(parcels: ParcelReference[]): void {
    localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(parcels));
  },

  getRequests(): AccessRequest[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_REQUESTS;
    }
  },

  saveRequests(requests: AccessRequest[]): void {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  },

  getAuditEvents(): AuditEvent[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(INITIAL_AUDIT_EVENTS));
      return INITIAL_AUDIT_EVENTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_AUDIT_EVENTS;
    }
  },

  saveAuditEvents(events: AuditEvent[]): void {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(events));
  },

  getNotifications(): NotificationItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  saveNotifications(notifs: NotificationItem[]): void {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  getSettings(): DemoSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settings: DemoSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getUser(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
      return INITIAL_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_USER;
    }
  },

  saveUser(user: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  resetAll(): void {
    localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(INITIAL_PARCELS));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(INITIAL_AUDIT_EVENTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
  },
};
