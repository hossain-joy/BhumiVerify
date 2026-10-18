import {
  AccessRequest,
  MockPayment,
  ParcelInputDetails,
  RequestStatus,
  ReviewerDecision,
} from '../../types';
import { StorageService } from './storage';
import { LandService } from './landService';

export const RequestService = {
  getRequests(): AccessRequest[] {
    this.expireAccessIfNeeded();
    return StorageService.getRequests();
  },

  getRequestById(id: string): AccessRequest | undefined {
    this.expireAccessIfNeeded();
    const requests = StorageService.getRequests();
    return requests.find((r) => r.id === id);
  },

  createRequest(params: {
    userId: string;
    userName: string;
    userMaskedNid: string;
    parcelDetails: ParcelInputDetails;
    purpose: string;
    explanation: string;
    requestedCategories: string[];
  }): { success: boolean; request?: AccessRequest; error?: string } {
    const user = StorageService.getUser();
    if (user.identityStatus !== 'verified_demo') {
      return {
        success: false,
        error: 'Identity verification is mandatory. You must complete demo identity verification before requesting parcel data.',
      };
    }

    if (!params.parcelDetails.dagNumber.trim()) {
      return {
        success: false,
        error: 'Dag (Plot) Number is mandatory for parcel identification.',
      };
    }

    if (!params.parcelDetails.mouza.trim()) {
      return {
        success: false,
        error: 'Mouza is mandatory for parcel jurisdiction verification.',
      };
    }

    if (!params.requestedCategories || params.requestedCategories.length === 0) {
      return {
        success: false,
        error: 'At least one data category must be requested.',
      };
    }

    const settings = StorageService.getSettings();
    const now = new Date();
    const deadline = new Date(now.getTime() + settings.targetReviewHours * 60 * 60 * 1000);

    const match = LandService.findParcelMatch(params.parcelDetails);

    const requests = StorageService.getRequests();
    const newId = `REQ-${now.getFullYear()}-${String(requests.length + 1).padStart(3, '0')}`;

    const newRequest: AccessRequest = {
      id: newId,
      userId: params.userId,
      userName: params.userName,
      userMaskedNid: params.userMaskedNid,
      identityStatusAtSubmission: user.identityStatus,
      parcelId: match.matchedParcel?.id,
      parcelDetails: params.parcelDetails,
      purpose: params.purpose,
      explanation: params.explanation,
      requestedCategories: params.requestedCategories,
      status: 'submitted',
      submittedAt: now.toISOString(),
      targetDeadline: deadline.toISOString(),
      matchConfidence: match.confidence,
    };

    requests.unshift(newRequest);
    StorageService.saveRequests(requests);

    // Audit log
    const auditEvents = StorageService.getAuditEvents();
    auditEvents.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: now.toISOString(),
      actorRole: 'citizen',
      actorId: params.userId,
      actorName: params.userName,
      action: 'REQUEST_SUBMITTED',
      requestId: newId,
      parcelId: match.matchedParcel?.id,
      summary: `Submitted request for Mouza: ${params.parcelDetails.mouza}, Dag: ${params.parcelDetails.dagNumber}. Purpose: ${params.purpose}.`,
      maskedIndicator: true,
      ipAddressMasked: '103.205.***.***',
    });
    StorageService.saveAuditEvents(auditEvents);

    // Notification for Reviewer
    const notifs = StorageService.getNotifications();
    notifs.unshift({
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'reviewer',
      title: `New Request: ${newId}`,
      message: `Citizen ${params.userName} submitted a request for ${params.parcelDetails.mouza} (Dag ${params.parcelDetails.dagNumber}).`,
      timestamp: now.toISOString(),
      isRead: false,
      link: `/reviewer/requests/${newId}`,
      type: 'info',
      requestId: newId,
    });
    StorageService.saveNotifications(notifs);

    return { success: true, request: newRequest };
  },

  reviewRequest(
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
  ): { success: boolean; request?: AccessRequest; error?: string } {
    if (!decisionData.note || decisionData.note.trim().length < 5) {
      return {
        success: false,
        error: 'A detailed justification note is mandatory for official reviewer actions.',
      };
    }

    if (
      (decisionData.decision === 'approved' || decisionData.decision === 'limited_approved') &&
      (!decisionData.approvedCategories || decisionData.approvedCategories.length === 0)
    ) {
      return {
        success: false,
        error: 'Approval requires selecting at least one permitted data category.',
      };
    }

    const requests = StorageService.getRequests();
    const reqIndex = requests.findIndex((r) => r.id === requestId);
    if (reqIndex === -1) {
      return { success: false, error: 'Request not found' };
    }

    const req = requests[reqIndex];
    const settings = StorageService.getSettings();
    const now = new Date();

    const decision: ReviewerDecision = {
      decision: decisionData.decision,
      decidedAt: now.toISOString(),
      reviewerId: decisionData.reviewerId,
      reviewerName: decisionData.reviewerName,
      note: decisionData.note,
      approvedCategories: decisionData.approvedCategories,
      conditions: decisionData.conditions || 'Strictly for pre-registration evaluation.',
      accessDurationHours: decisionData.accessDurationHours || settings.accessDurationHours,
    };

    let nextStatus: RequestStatus = 'under_review';
    let accessExpiresAt: string | undefined = undefined;

    if (decisionData.decision === 'rejected') {
      nextStatus = 'rejected';
    } else if (decisionData.decision === 'more_info_required') {
      nextStatus = 'more_info_required';
    } else if (decisionData.decision === 'approved' || decisionData.decision === 'limited_approved') {
      if (settings.feeEnabled) {
        nextStatus = 'payment_pending';
      } else {
        nextStatus = 'access_active';
        accessExpiresAt = new Date(
          now.getTime() + (decision.accessDurationHours || 48) * 60 * 60 * 1000
        ).toISOString();
      }
    }

    req.reviewerDecision = decision;
    req.approvedCategories = decision.approvedCategories;
    req.status = nextStatus;
    if (accessExpiresAt) {
      req.accessExpiresAt = accessExpiresAt;
    }

    requests[reqIndex] = req;
    StorageService.saveRequests(requests);

    // Audit Log
    const auditEvents = StorageService.getAuditEvents();
    auditEvents.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: now.toISOString(),
      actorRole: 'reviewer',
      actorId: decisionData.reviewerId,
      actorName: decisionData.reviewerName,
      action: `DECISION_${decisionData.decision.toUpperCase()}`,
      requestId: req.id,
      parcelId: req.parcelId,
      summary: `Reviewer recorded decision '${decisionData.decision}'. Note: ${decisionData.note}`,
      maskedIndicator: true,
    });
    StorageService.saveAuditEvents(auditEvents);

    // Notification for Citizen
    const notifs = StorageService.getNotifications();
    const title =
      decisionData.decision === 'approved' || decisionData.decision === 'limited_approved'
        ? `Request ${req.id} Approved`
        : decisionData.decision === 'more_info_required'
        ? `Action Needed: Request ${req.id}`
        : `Request ${req.id} Rejected`;

    const msg =
      decisionData.decision === 'approved' || decisionData.decision === 'limited_approved'
        ? settings.feeEnabled
          ? `Your request for ${req.parcelDetails.mouza} (Dag ${req.parcelDetails.dagNumber}) was approved. Please proceed to payment.`
          : `Your request was approved. You now have active access to the approved signals.`
        : decisionData.decision === 'more_info_required'
        ? `Reviewer asked for additional clarification: "${decisionData.note.slice(0, 80)}..."`
        : `Reviewer rejected request: "${decisionData.note.slice(0, 80)}..."`;

    notifs.unshift({
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'citizen',
      title,
      message: msg,
      timestamp: now.toISOString(),
      isRead: false,
      link: `/citizen/requests/${req.id}`,
      type: decisionData.decision === 'rejected' ? 'warning' : 'decision',
      requestId: req.id,
    });
    StorageService.saveNotifications(notifs);

    return { success: true, request: req };
  },

  submitCitizenUpdate(
    requestId: string,
    updateNote: string
  ): { success: boolean; request?: AccessRequest; error?: string } {
    if (!updateNote || updateNote.trim().length < 5) {
      return { success: false, error: 'Please enter clarifying information for the reviewer.' };
    }

    const requests = StorageService.getRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return { success: false, error: 'Request not found' };

    const now = new Date();
    req.status = 'under_review';
    req.citizenUpdateNote = updateNote;

    StorageService.saveRequests(requests);

    // Audit Log
    const auditEvents = StorageService.getAuditEvents();
    auditEvents.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: now.toISOString(),
      actorRole: 'citizen',
      actorId: req.userId,
      actorName: req.userName,
      action: 'CITIZEN_CLARIFICATION_SUBMITTED',
      requestId: req.id,
      summary: `Citizen submitted clarification: "${updateNote}"`,
      maskedIndicator: true,
    });
    StorageService.saveAuditEvents(auditEvents);

    // Reviewer notification
    const notifs = StorageService.getNotifications();
    notifs.unshift({
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'reviewer',
      title: `Clarification Submitted: ${req.id}`,
      message: `Citizen provided clarifying notes for ${req.parcelDetails.mouza} (Dag ${req.parcelDetails.dagNumber}). Ready for re-evaluation.`,
      timestamp: now.toISOString(),
      isRead: false,
      link: `/reviewer/requests/${req.id}`,
      type: 'info',
      requestId: req.id,
    });
    StorageService.saveNotifications(notifs);

    return { success: true, request: req };
  },

  simulatePayment(
    requestId: string,
    method: string,
    simulateFail = false
  ): { success: boolean; request?: AccessRequest; error?: string; payment?: MockPayment } {
    const requests = StorageService.getRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return { success: false, error: 'Request not found' };

    if (req.status !== 'payment_pending') {
      return {
        success: false,
        error: 'Payment can only be processed after reviewer approval and when in payment_pending status.',
      };
    }

    const settings = StorageService.getSettings();
    const now = new Date();
    const txnId = `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    const rcpRef = `RCP-LTBD-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (simulateFail) {
      const failedPayment: MockPayment = {
        id: `PAY-${Date.now()}`,
        amountBdt: settings.feeAmountBdt,
        method,
        transactionId: txnId,
        paidAt: now.toISOString(),
        status: 'failed',
        receiptRef: rcpRef,
      };

      // Audit Log failed payment attempt
      const auditEvents = StorageService.getAuditEvents();
      auditEvents.unshift({
        id: `AUD-${Date.now()}`,
        timestamp: now.toISOString(),
        actorRole: 'citizen',
        actorId: req.userId,
        actorName: req.userName,
        action: 'PAYMENT_FAILED_SIMULATION',
        requestId: req.id,
        summary: `Mock payment simulation FAILED via ${method}. Access not granted.`,
        maskedIndicator: true,
      });
      StorageService.saveAuditEvents(auditEvents);

      return {
        success: false,
        error: 'Simulated payment failed (card declined / insufficient wallet funds). No parcel access granted.',
        payment: failedPayment,
      };
    }

    const payment: MockPayment = {
      id: `PAY-${Date.now()}`,
      amountBdt: settings.feeAmountBdt,
      method,
      transactionId: txnId,
      paidAt: now.toISOString(),
      status: 'success',
      receiptRef: rcpRef,
    };

    req.payment = payment;
    req.status = 'access_active';
    const durationHours = req.reviewerDecision?.accessDurationHours || settings.accessDurationHours;
    req.accessExpiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000).toISOString();

    StorageService.saveRequests(requests);

    // Audit logs
    const auditEvents = StorageService.getAuditEvents();
    auditEvents.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: now.toISOString(),
      actorRole: 'citizen',
      actorId: req.userId,
      actorName: req.userName,
      action: 'PAYMENT_SUCCESSFUL',
      requestId: req.id,
      summary: `Mock fee of ${settings.feeAmountBdt} BDT processed successfully via ${method}. Receipt: ${rcpRef}`,
      maskedIndicator: true,
    });
    auditEvents.unshift({
      id: `AUD-${Date.now() + 1}`,
      timestamp: now.toISOString(),
      actorRole: 'system',
      actorId: 'SYSTEM-GATE',
      actorName: 'Access Controller',
      action: 'ACCESS_ACTIVATED',
      requestId: req.id,
      parcelId: req.parcelId,
      summary: `Controlled access activated for ${durationHours} hours. Categories permitted: ${(req.approvedCategories || []).join(', ')}.`,
      maskedIndicator: true,
    });
    StorageService.saveAuditEvents(auditEvents);

    // Citizen notification
    const notifs = StorageService.getNotifications();
    notifs.unshift({
      id: `NOTIF-${Date.now()}`,
      recipientRole: 'citizen',
      title: `Access Activated: ${req.id}`,
      message: `Your payment was confirmed. You can now view approved transaction signals for ${req.parcelDetails.mouza} (Dag ${req.parcelDetails.dagNumber}).`,
      timestamp: now.toISOString(),
      isRead: false,
      link: req.parcelId ? `/citizen/parcel-overview/${req.parcelId}?req=${req.id}` : `/citizen/requests/${req.id}`,
      type: 'payment',
      requestId: req.id,
    });
    StorageService.saveNotifications(notifs);

    return { success: true, request: req, payment };
  },

  expireAccessIfNeeded(): void {
    const requests = StorageService.getRequests();
    const now = new Date();
    let hasChanges = false;

    for (const req of requests) {
      if (req.status === 'access_active' && req.accessExpiresAt) {
        const expiryDate = new Date(req.accessExpiresAt);
        if (now > expiryDate) {
          req.status = 'expired';
          hasChanges = true;

          // Audit log
          const auditEvents = StorageService.getAuditEvents();
          auditEvents.unshift({
            id: `AUD-${Date.now()}`,
            timestamp: now.toISOString(),
            actorRole: 'system',
            actorId: 'SYSTEM-GATE',
            actorName: 'Access Controller',
            action: 'ACCESS_EXPIRED',
            requestId: req.id,
            parcelId: req.parcelId,
            summary: `Validity window lapsed for ${req.id}. Restricted signals locked.`,
            maskedIndicator: true,
          });
          StorageService.saveAuditEvents(auditEvents);

          // Citizen notification
          const notifs = StorageService.getNotifications();
          notifs.unshift({
            id: `NOTIF-${Date.now()}`,
            recipientRole: 'citizen',
            title: `Access Expired: ${req.id}`,
            message: `The 72-hour viewing window for ${req.parcelDetails.mouza} has lapsed. Submit a new request if further signals are required.`,
            timestamp: now.toISOString(),
            isRead: false,
            link: `/citizen/requests/${req.id}`,
            type: 'expiry',
            requestId: req.id,
          });
          StorageService.saveNotifications(notifs);
        }
      }
    }

    if (hasChanges) {
      StorageService.saveRequests(requests);
    }
  },
};
