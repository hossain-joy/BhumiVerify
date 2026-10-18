import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AccessRequest,
  AuditEvent,
  DemoSettings,
  MockPayment,
  NotificationItem,
  ParcelInputDetails,
  ParcelReference,
  UserProfile,
  UserRole,
} from '../types';
import { StorageService } from '../lib/mock-services/storage';
import { LandService } from '../lib/mock-services/landService';
import { RequestService } from '../lib/mock-services/requestService';
import { AuditService, NotificationService } from '../lib/mock-services/auditService';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  parcels: ParcelReference[];
  requests: AccessRequest[];
  auditEvents: AuditEvent[];
  notifications: NotificationItem[];
  settings: DemoSettings;
  unreadCount: number;
  verifyCitizenIdentity: (name?: string, fakeNid?: string) => void;
  resetCitizenIdentity: () => void;
  createRequest: (params: {
    parcelDetails: ParcelInputDetails;
    purpose: string;
    explanation: string;
    requestedCategories: string[];
  }) => { success: boolean; request?: AccessRequest; error?: string };
  reviewRequest: (
    requestId: string,
    decisionData: {
      decision: 'approved' | 'limited_approved' | 'more_info_required' | 'rejected';
      reviewerId: string;
      reviewerName: string;
      note: string;
      approvedCategories: string[];
      conditions?: string;
      accessDurationHours?: number;
    }
  ) => { success: boolean; request?: AccessRequest; error?: string };
  submitCitizenUpdate: (requestId: string, note: string) => { success: boolean; error?: string };
  simulatePayment: (
    requestId: string,
    method: string,
    simulateFail?: boolean
  ) => { success: boolean; request?: AccessRequest; error?: string; payment?: MockPayment };
  updateSettings: (newSettings: Partial<DemoSettings>) => void;
  resetAllDemoData: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('landtech_role_v1');
    return (saved as UserRole) || 'citizen';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => StorageService.getUser());
  const [parcels, setParcels] = useState<ParcelReference[]>(() => LandService.getAllParcels());
  const [requests, setRequests] = useState<AccessRequest[]>(() => RequestService.getRequests());
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => AuditService.getAuditEvents());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    NotificationService.getNotifications()
  );
  const [settings, setSettings] = useState<DemoSettings>(() => StorageService.getSettings());

  const setRole = (newRole: UserRole) => {
    setCurrentRoleState(newRole);
    localStorage.setItem('landtech_role_v1', newRole);
    AuditService.logEvent({
      actorRole: newRole,
      actorId: currentUser.id,
      actorName: currentUser.name,
      action: 'ROLE_SWITCHED',
      summary: `User switched active demo perspective to '${newRole.toUpperCase()}'.`,
    });
    refreshData();
  };

  const refreshData = () => {
    RequestService.expireAccessIfNeeded();
    setParcels(LandService.getAllParcels());
    setRequests(RequestService.getRequests());
    setAuditEvents(AuditService.getAuditEvents());
    setNotifications(NotificationService.getNotifications());
    setSettings(StorageService.getSettings());
    setCurrentUser(StorageService.getUser());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      RequestService.expireAccessIfNeeded();
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const verifyCitizenIdentity = (name = 'Tanvir Hossain', fakeNid = 'DEMO-NID-0001') => {
    const updated: UserProfile = {
      ...currentUser,
      name,
      maskedNid: `${fakeNid} (Verified Demo)`,
      identityStatus: 'verified_demo',
      verifiedAt: new Date().toISOString(),
      privacyAck: true,
    };
    StorageService.saveUser(updated);
    setCurrentUser(updated);

    AuditService.logEvent({
      actorRole: 'citizen',
      actorId: updated.id,
      actorName: updated.name,
      action: 'IDENTITY_VERIFIED_SIMULATED',
      summary: `Citizen completed simulated demo identity verification with reference ${fakeNid}.`,
    });

    const notifs = StorageService.getNotifications();
    notifs.unshift({
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'citizen',
      title: 'Demo Identity Status: Verified',
      message: 'Your simulated identity check passed successfully. You can now submit parcel information requests.',
      timestamp: new Date().toISOString(),
      isRead: false,
      link: '/citizen/new-request',
      type: 'info',
    });
    StorageService.saveNotifications(notifs);

    refreshData();
  };

  const resetCitizenIdentity = () => {
    const updated: UserProfile = {
      ...currentUser,
      identityStatus: 'unverified',
      verifiedAt: undefined,
      privacyAck: false,
    };
    StorageService.saveUser(updated);
    setCurrentUser(updated);

    AuditService.logEvent({
      actorRole: 'citizen',
      actorId: updated.id,
      actorName: updated.name,
      action: 'IDENTITY_RESET_SIMULATED',
      summary: 'Identity status reset to unverified for test scenario testing.',
    });
    refreshData();
  };

  const createRequest = (params: {
    parcelDetails: ParcelInputDetails;
    purpose: string;
    explanation: string;
    requestedCategories: string[];
  }) => {
    const res = RequestService.createRequest({
      userId: currentUser.id,
      userName: currentUser.name,
      userMaskedNid: currentUser.maskedNid,
      ...params,
    });
    refreshData();
    return res;
  };

  const reviewRequest = (
    requestId: string,
    decisionData: {
      decision: 'approved' | 'limited_approved' | 'more_info_required' | 'rejected';
      reviewerId: string;
      reviewerName: string;
      note: string;
      approvedCategories: string[];
      conditions?: string;
      accessDurationHours?: number;
    }
  ) => {
    const res = RequestService.reviewRequest(requestId, decisionData);
    refreshData();
    return res;
  };

  const submitCitizenUpdate = (requestId: string, note: string) => {
    const res = RequestService.submitCitizenUpdate(requestId, note);
    refreshData();
    return res;
  };

  const simulatePayment = (requestId: string, method: string, simulateFail = false) => {
    const res = RequestService.simulatePayment(requestId, method, simulateFail);
    refreshData();
    return res;
  };

  const updateSettings = (newSettings: Partial<DemoSettings>) => {
    const current = StorageService.getSettings();
    const merged = { ...current, ...newSettings };
    StorageService.saveSettings(merged);
    setSettings(merged);

    AuditService.logEvent({
      actorRole: 'admin',
      actorId: 'ADMIN-01',
      actorName: 'System Administrator',
      action: 'SETTINGS_MODIFIED',
      summary: `Updated demo settings: Fee Enabled=${merged.feeEnabled}, Fee Amount=${merged.feeAmountBdt} BDT, Review SLA=${merged.targetReviewHours}h, Access Validity=${merged.accessDurationHours}h.`,
    });
    refreshData();
  };

  const resetAllDemoData = () => {
    StorageService.resetAll();
    refreshData();
    AuditService.logEvent({
      actorRole: 'admin',
      actorId: 'ADMIN-01',
      actorName: 'System Administrator',
      action: 'DEMO_DATA_RESET',
      summary: 'All demo parcels, requests, audit logs, and settings restored to baseline scenario seeds.',
    });
  };

  const markNotificationRead = (id: string) => {
    NotificationService.markAsRead(id);
    setNotifications(NotificationService.getNotifications());
  };

  const markAllNotificationsRead = () => {
    NotificationService.markAllAsRead(currentRole);
    setNotifications(NotificationService.getNotifications());
  };

  const unreadCount = notifications.filter(
    (n) => n.recipientRole === currentRole && !n.isRead
  ).length;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        currentUser,
        parcels,
        requests,
        auditEvents,
        notifications,
        settings,
        unreadCount,
        verifyCitizenIdentity,
        resetCitizenIdentity,
        createRequest,
        reviewRequest,
        submitCitizenUpdate,
        simulatePayment,
        updateSettings,
        resetAllDemoData,
        markNotificationRead,
        markAllNotificationsRead,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
