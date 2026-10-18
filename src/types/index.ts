export type UserRole = 'citizen' | 'reviewer' | 'auditor' | 'admin';

export type IdentityStatus = 'unverified' | 'pending' | 'verified_demo' | 'verified';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  maskedNid: string;
  phoneMasked: string;
  identityStatus: IdentityStatus;
  verifiedAt?: string;
  privacyAck: boolean;
}

export type EventType =
  | 'mutation_application'
  | 'registered_deed'
  | 'lt_notice'
  | 'mutation_completed'
  | 'record_update'
  | 'data_refreshed';

export type VerificationState = 'demo' | 'source_reported' | 'officially_verified';

export interface LandEvent {
  id: string;
  parcelId: string;
  eventType: EventType;
  eventTitle: string;
  eventDate: string;
  recordedTimestamp: string;
  sourceLabel: string;
  verificationState: VerificationState; // Must remain 'demo'
  maskedReference: string;
  summary: string;
  caveat: string;
  category: string;
}

export type MatchConfidence = 'exact' | 'high' | 'partial' | 'ambiguous' | 'no_match';

export type ParcelRiskStatus =
  | 'low_signals'
  | 'review_recommended'
  | 'recent_transfer_verify_mutation'
  | 'conflicting_records'
  | 'insufficient_data';

export interface ParcelTaxStatus {
  status: 'paid' | 'arrears' | 'unknown';
  lastPaidYearBS?: string;
  dakhilaNumber?: string;
  amountBdt?: number;
  note?: string;
}

export interface ParcelEncumbranceSignals {
  hasMortgage: boolean;
  bankOrLender?: string;
  mortgageNote?: string;
  hasStayOrder: boolean;
  courtName?: string;
  caseRef?: string;
  litigationNote?: string;
  isKhasOrVested: boolean;
  vestedNote?: string;
  hasPowerOfAttorney: boolean;
  poaDetails?: string;
}

export interface ParcelBayaDeedChain {
  chainIntact: boolean;
  yearsTracked: number;
  deedsCount: number;
  note?: string;
}

export interface ParcelReference {
  id: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber?: string;
  khatianNumber?: string;
  khatianType?: string;
  dagNumber: string; // Plot number
  area?: string;
  areaUnit?: string;
  boundaryNotes?: string;
  landClassification?: string;
  recordedOwners?: string[];
  taxStatus?: ParcelTaxStatus;
  encumbranceSignals?: ParcelEncumbranceSignals;
  bayaChain?: ParcelBayaDeedChain;
  matchConfidence: MatchConfidence;
  riskStatus: ParcelRiskStatus;
  riskSummary: string;
  demoAttentionScore?: number;
  lastUpdated: string;
  mockSource: string;
  events: LandEvent[];
}

export type RequestStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'more_info_required'
  | 'approved'
  | 'limited_approved'
  | 'rejected'
  | 'payment_pending'
  | 'payment_confirmed'
  | 'access_active'
  | 'expired'
  | 'cancelled';

export interface ParcelInputDetails {
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber?: string;
  khatianNumber?: string;
  khatianType?: string;
  dagNumber: string;
  area?: string;
  areaUnit?: string;
  boundaryNotes?: string;
}

export interface ReviewerDecision {
  decision: 'approved' | 'limited_approved' | 'more_info_required' | 'rejected';
  decidedAt: string;
  reviewerId: string;
  reviewerName: string;
  note: string;
  approvedCategories: string[];
  conditions?: string;
  accessDurationHours: number;
}

export interface MockPayment {
  id: string;
  amountBdt: number;
  method: string;
  transactionId: string;
  paidAt: string;
  status: 'success' | 'failed';
  receiptRef: string;
}

export interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  userMaskedNid: string;
  identityStatusAtSubmission: IdentityStatus;
  parcelId?: string; // Resolved demo parcel ID if matched
  parcelDetails: ParcelInputDetails;
  purpose: string;
  explanation: string;
  requestedCategories: string[];
  approvedCategories?: string[];
  status: RequestStatus;
  submittedAt: string;
  targetDeadline: string;
  matchConfidence: MatchConfidence;
  reviewerDecision?: ReviewerDecision;
  payment?: MockPayment;
  accessExpiresAt?: string;
  citizenUpdateNote?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorRole: UserRole | 'system';
  actorId: string;
  actorName: string;
  action: string;
  requestId?: string;
  parcelId?: string;
  summary: string;
  maskedIndicator: boolean;
  ipAddressMasked?: string;
}

export interface NotificationItem {
  id: string;
  recipientRole: UserRole;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
  type: 'info' | 'decision' | 'warning' | 'payment' | 'expiry';
  requestId?: string;
}

export interface DemoSettings {
  feeEnabled: boolean;
  feeAmountBdt: number;
  targetReviewHours: number;
  accessDurationHours: number;
  mockServicesActive: boolean;
  sourceFreshnessHours: number;
}

export const DATA_CATEGORIES = [
  {
    id: 'mutation_application_status',
    label: 'Mutation Application Status',
    bengali: 'নামজারি আবেদন স্থিতি',
    description: 'Signals whether any pending, ongoing or rejected e-mutation application has been registered for this plot.',
  },
  {
    id: 'registered_deed_event',
    label: 'Registered Deed / Transfer Events',
    bengali: 'সাব-রেজিস্ট্রি দলিল হস্তান্তর রেকর্ড',
    description: 'Signals if a transfer deed (Saf-Kabala, Gift, Heba) has been executed at the Sub-Registry Office.',
  },
  {
    id: 'lt_notice_event',
    label: 'LT Notice (Land Transfer Notice) Records',
    bengali: 'এলটি নোটিশ (জমি হস্তান্তর নোটিশ)',
    description: 'Records of statutory notice sent from Sub-Registry to Assistant Commissioner (Land) under SAT Act Section 89.',
  },
  {
    id: 'mutation_completion_status',
    label: 'Mutation Completion Status',
    bengali: 'নামজারি খতিয়ান চূড়ান্ত নিষ্পত্তি',
    description: 'Signals whether mutation case was formally resolved and new Dakhila/Khatian issued.',
  },
  {
    id: 'data_freshness_metadata',
    label: 'Data Freshness & Source Metadata',
    bengali: 'উৎস ও তথ্য সতেজতা মেটাডাটা',
    description: 'Timestamp of last simulated feed synchronization from respective land authority systems.',
  },
];

export interface SubRegistryLTNotice {
  hasNotice: boolean;
  noticeNumber?: string;
  noticeDate?: string;
  subRegistryOffice: string;
  subRegistryOfficeBn: string;
  registrationStatus: 'registered_and_mutation_completed' | 'registered_and_mutation_pending' | 'mortgage_lien_registered' | 'no_recent_registration';
  statusExplanation: string;
  statusExplanationBn: string;
}

export interface SubRegistryNilSearchResult {
  searchYears: number; // e.g. 12, 15, 25
  balamBook: string;
  balamBookBn: string;
  status: 'clear' | 'disputed' | 'incomplete';
  summary: string;
  summaryBn: string;
}

export interface LitigationCaseDetail {
  caseNumber: string;
  courtName: string;
  courtNameBn: string;
  caseType: string;
  caseTypeBn: string;
  hasInjunction: boolean;
  status: string;
  statusBn: string;
  summary: string;
  summaryBn: string;
}

export interface LitigationInfo {
  hasLitigation: boolean;
  verdictLabel: string;
  verdictLabelBn: string;
  caseCount: number;
  cases?: LitigationCaseDetail[];
}

export interface SubRegistryIntegrationData {
  isConnected: boolean;
  gatewayName: string;
  gatewayNameBn: string;
  lastSyncedAt: string;
  ltNotice: SubRegistryLTNotice;
  nilSearch: SubRegistryNilSearchResult;
  litigation: LitigationInfo;
}

