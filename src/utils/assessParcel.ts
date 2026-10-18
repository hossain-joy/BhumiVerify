import { FictionalParcelRecord } from '../data/mockParcels';

export type AssessmentStatusLabel =
  | 'No Major Issue Detected in Available Data'
  | 'Review Recommended'
  | 'Information Incomplete';

export interface AssessmentResult {
  label: AssessmentStatusLabel;
  labelBn: string;
  badgeClass: string;
  summary: string;
  summaryBn: string;
  reviewItemsCount: number;
  limitationNote: string;
  limitationNoteBn: string;
}

/**
 * Pure, deterministic rule-based assessment.
 * Never produces a numerical fraud score or claims title safety.
 */
export function assessParcel(record: FictionalParcelRecord): AssessmentResult {
  const events = record.events || [];
  const hasTransfer = events.some((e) => e.type === 'transfer_related');
  const hasApp = events.some((e) => e.type === 'mutation_application');
  const hasCompletion = events.some((e) => e.type === 'mutation_completed');

  // Rule 1: Information Incomplete
  // If essential identifiers (like area, or empty events, or explicit flag) are incomplete
  if (
    record.statusKey === 'information_incomplete' ||
    record.area === null ||
    events.length === 0
  ) {
    return {
      label: 'Information Incomplete',
      labelBn: 'তথ্য অসম্পূর্ণ',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-300',
      summary:
        record.statusExplanation ||
        'Available information is insufficient to determine transaction continuity. Crucial record details are unavailable in the database.',
      summaryBn:
        'উপলব্ধ তথ্যে প্রয়োজনীয় পরিমাপ বা দলিলের ঘাটতি রয়েছে, যা লেনদেনের ধারাবাহিকতা পর্যালোচনার জন্য পর্যাপ্ত নয়।',
      reviewItemsCount: record.findings.length,
      limitationNote:
        'Notice: Incomplete information indicates data absence, not that ownership has been verified or disputed in reality.',
      limitationNoteBn:
        'সতর্কতা: তথ্যের অপর্যাপ্ততার অর্থ নথির অভাব, এটি বাস্তবে কোনো মালিকানা নিশ্চিত বা বাতিল করে না।',
    };
  }

  // Rule 2: Review Recommended
  // If transfer deed or application is recorded without completion, or flagged for review
  if (
    record.statusKey === 'review_recommended' ||
    (hasTransfer && !hasCompletion) ||
    (hasApp && !hasCompletion)
  ) {
    return {
      label: 'Review Recommended',
      labelBn: 'পর্যালোচনা জরুরি',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      summary:
        record.statusExplanation ||
        'Potential transaction flags or pending administrative milestones detected in records. Independent institutional verification is recommended before proceeding.',
      summaryBn:
        'রেকর্ডে নামজারি অমীমাংসিত থাকা বা অন্যান্য পর্যালোচনার সংকেত চিহ্নিত হয়েছে। অর্থ পরিশোধের পূর্বে ভূমি অফিসে সশরীরে যাচাই প্রয়োজন।',
      reviewItemsCount: record.findings.length,
      limitationNote:
        'Notice: A review warning indicates unverified milestones and does not constitute a formal accusation of illegality.',
      limitationNoteBn:
        'সতর্কতা: পর্যালোচনার সংকেত অপূর্ণাঙ্গ তথ্যাদি নির্দেশ করে, এটি কোনো চূড়ান্ত আইনগত অভিযোগ নয়।',
    };
  }

  // Rule 3: No Major Issue Detected in Available Data
  // Even the cleanest record must have a visible limitation note and NEVER use "Safe".
  return {
    label: 'No Major Issue Detected in Available Data',
    labelBn: 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি',
    badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    summary:
      record.statusExplanation ||
      'No major inconsistencies were found among available records. This does not confirm legal ownership or guarantee clear title.',
    summaryBn:
      'উপলব্ধ তথ্যে বড় ধরনের কোনো অসঙ্গতি ধরা পড়েনি। তবে এটি স্বত্ব বা নিরঙ্কুশ মালিকানার আইনি নিশ্চয়তা প্রদান করে না।',
    reviewItemsCount: record.findings.length,
    limitationNote:
      'Critical Limitation: Absence of issues in digital records does NOT establish that title is clear. In-person physical deed search at the Sub-Registry remains mandatory.',
    limitationNoteBn:
      'আইনি সতর্কতা: ডিজিটাল রেকর্ডে কোনো সমস্যা না থাকার অর্থ এই নয় যে জমিটি শতভাগ নিষ্কণ্টক। সাব-রেজিস্ট্রি অফিসে সশরীরে বায়া দলিল তল্লাশ আবশ্যক।',
  };
}
