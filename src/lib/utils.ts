import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MatchConfidence, ParcelRiskStatus, RequestStatus } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function getTimeRemaining(targetDateString: string): {
  isOverdue: boolean;
  text: string;
} {
  try {
    const target = new Date(targetDateString).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { isOverdue: true, text: 'Overdue / Expired' };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return { isOverdue: false, text: `${days}d ${hours % 24}h remaining` };
    }
    return { isOverdue: false, text: `${hours}h ${mins}m remaining` };
  } catch {
    return { isOverdue: false, text: '-' };
  }
}

export function getStatusMeta(status: RequestStatus): {
  label: string;
  badgeClass: string;
  dotColor: string;
} {
  switch (status) {
    case 'draft':
      return { label: 'Draft', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300', dotColor: 'bg-slate-400' };
    case 'submitted':
      return { label: 'Submitted', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200', dotColor: 'bg-blue-500' };
    case 'under_review':
      return { label: 'Under Review', badgeClass: 'bg-amber-50 text-amber-800 border-amber-300', dotColor: 'bg-amber-500' };
    case 'more_info_required':
      return { label: 'More Info Needed', badgeClass: 'bg-orange-50 text-orange-800 border-orange-300', dotColor: 'bg-orange-500' };
    case 'approved':
      return { label: 'Approved (Pending Payment)', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300', dotColor: 'bg-emerald-500' };
    case 'limited_approved':
      return { label: 'Limited Scope Approved', badgeClass: 'bg-teal-50 text-teal-800 border-teal-300', dotColor: 'bg-teal-600' };
    case 'payment_pending':
      return { label: 'Payment Pending', badgeClass: 'bg-amber-100 text-amber-900 border-amber-400', dotColor: 'bg-amber-600' };
    case 'payment_confirmed':
    case 'access_active':
      return { label: 'Access Active', badgeClass: 'bg-green-100 text-green-800 border-green-300 font-medium', dotColor: 'bg-green-600' };
    case 'rejected':
      return { label: 'Rejected', badgeClass: 'bg-rose-50 text-rose-800 border-rose-300', dotColor: 'bg-rose-600' };
    case 'expired':
      return { label: 'Access Expired', badgeClass: 'bg-slate-200 text-slate-700 border-slate-300', dotColor: 'bg-slate-500' };
    case 'cancelled':
      return { label: 'Cancelled', badgeClass: 'bg-slate-100 text-slate-500 border-slate-200', dotColor: 'bg-slate-400' };
    default:
      return { label: status, badgeClass: 'bg-slate-100 text-slate-700 border-slate-300', dotColor: 'bg-slate-400' };
  }
}

export function getRiskStatusMeta(riskStatus: ParcelRiskStatus): {
  label: string;
  severity: 'low' | 'medium' | 'high' | 'neutral';
  badgeClass: string;
} {
  switch (riskStatus) {
    case 'low_signals':
      return {
        label: 'Mutation completed — Standard pre-purchase due diligence still required',
        severity: 'low',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case 'recent_transfer_verify_mutation':
      return {
        label: 'Recent transfer event — verify mutation status',
        severity: 'high',
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      };
    case 'review_recommended':
      return {
        label: 'Mutation application recorded — review recommended',
        severity: 'medium',
        badgeClass: 'bg-blue-50 text-blue-900 border-blue-200',
      };
    case 'conflicting_records':
      return {
        label: 'Possible match / Conflicting identifiers — official review needed',
        severity: 'high',
        badgeClass: 'bg-rose-50 text-rose-900 border-rose-300',
      };
    case 'insufficient_data':
    default:
      return {
        label: 'Insufficient data to assess — consult Upazila Land Office',
        severity: 'neutral',
        badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      };
  }
}

export function getMatchConfidenceMeta(confidence: MatchConfidence): {
  label: string;
  badgeClass: string;
} {
  switch (confidence) {
    case 'exact':
      return { label: 'Exact Plot & Mouza Match', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'high':
      return { label: 'High Confidence Match', badgeClass: 'bg-teal-50 text-teal-700 border-teal-200' };
    case 'partial':
      return { label: 'Partial Match (Review Needed)', badgeClass: 'bg-amber-50 text-amber-800 border-amber-200' };
    case 'ambiguous':
      return { label: 'Ambiguous / Contested Identifiers', badgeClass: 'bg-rose-50 text-rose-800 border-rose-200' };
    case 'no_match':
    default:
      return { label: 'No Matching Event in Demo Data', badgeClass: 'bg-slate-100 text-slate-600 border-slate-200' };
  }
}

export const LAND_CIVIC_GLOSSARY = {
  mouza: {
    term: 'Mouza (মৌজা)',
    explanation: 'A designated revenue village or geographical survey unit used in Bangladesh cadastral mapping.',
  },
  jlNumber: {
    term: 'J.L. Number (জে.এল. নম্বর)',
    explanation: 'Jurisdiction List Number — sequential identifier assigned to each mouza within an Upazila.',
  },
  khatian: {
    term: 'Khatian (খতিয়ান / পরচা)',
    explanation: 'Record of Rights (RoR) defining land ownership, share proportion, and revenue liability (e.g. CS, SA, RS, City Survey, or Mutation Khatian).',
  },
  dag: {
    term: 'Dag Number (দাগ নম্বর / প্লট)',
    explanation: 'Individual cadastral plot identifier on a mouza map. Note: Dag alone without Mouza and Khatian cannot guarantee unique identification.',
  },
  ltNotice: {
    term: 'LT Notice (এলটি নোটিশ)',
    explanation: 'Notice under Section 89 of the State Acquisition and Tenancy Act, 1950, dispatched by Sub-Registry to Assistant Commissioner (Land) upon transfer deed registration.',
  },
  mutation: {
    term: 'Mutation / Namjari (নামজারি)',
    explanation: 'Official administrative process of mutating the revenue record of rights to update the name of the new owner in the register.',
  },
};
