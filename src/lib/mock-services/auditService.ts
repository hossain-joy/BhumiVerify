import { AuditEvent, NotificationItem, UserRole } from '../../types';
import { StorageService } from './storage';

export const AuditService = {
  getAuditEvents(filter?: {
    actorRole?: string;
    action?: string;
    requestId?: string;
    search?: string;
  }): AuditEvent[] {
    let events = StorageService.getAuditEvents();

    if (filter) {
      if (filter.actorRole && filter.actorRole !== 'all') {
        events = events.filter((e) => e.actorRole === filter.actorRole);
      }
      if (filter.action && filter.action !== 'all') {
        events = events.filter((e) => e.action.includes(filter.action!));
      }
      if (filter.requestId) {
        events = events.filter(
          (e) => e.requestId?.toLowerCase().includes(filter.requestId!.toLowerCase())
        );
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        events = events.filter(
          (e) =>
            e.summary.toLowerCase().includes(q) ||
            e.actorName.toLowerCase().includes(q) ||
            e.action.toLowerCase().includes(q)
        );
      }
    }

    return events;
  },

  logEvent(params: {
    actorRole: UserRole | 'system';
    actorId: string;
    actorName: string;
    action: string;
    requestId?: string;
    parcelId?: string;
    summary: string;
  }): AuditEvent {
    const events = StorageService.getAuditEvents();
    const newEvent: AuditEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorRole: params.actorRole,
      actorId: params.actorId,
      actorName: params.actorName,
      action: params.action,
      requestId: params.requestId,
      parcelId: params.parcelId,
      summary: params.summary,
      maskedIndicator: true,
      ipAddressMasked: '103.205.***.***',
    };
    events.unshift(newEvent);
    StorageService.saveAuditEvents(events);
    return newEvent;
  },
};

export const NotificationService = {
  getNotifications(role?: UserRole): NotificationItem[] {
    const notifs = StorageService.getNotifications();
    if (role) {
      return notifs.filter((n) => n.recipientRole === role);
    }
    return notifs;
  },

  markAsRead(id: string): void {
    const notifs = StorageService.getNotifications();
    const item = notifs.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      StorageService.saveNotifications(notifs);
    }
  },

  markAllAsRead(role: UserRole): void {
    const notifs = StorageService.getNotifications();
    notifs.forEach((n) => {
      if (n.recipientRole === role) {
        n.isRead = true;
      }
    });
    StorageService.saveNotifications(notifs);
  },
};
