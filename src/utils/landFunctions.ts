import { ParcelInputDetails, ParcelReference, LandEvent, EventType } from '../types';
import { INITIAL_PARCELS } from '../lib/mock-data/parcels';

export type RiskAssessmentLabel =
  | 'Review Recommended'
  | 'Information Incomplete'
  | 'No Major Issue Detected in Available Data'
  | 'No Match Found';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface RiskAssessmentResult {
  label: RiskAssessmentLabel;
  labelBn: string;
  badgeClass: string;
  summary: string;
  summaryBn: string;
  severity: 'warning' | 'info' | 'success' | 'neutral';
}

export interface RiskExplanationDetail {
  whatDetected: string;
  whatDetectedBn: string;
  whyItMatters: string;
  whyItMattersBn: string;
  missingInfo: string;
  missingInfoBn: string;
  whatToVerifyNext: string[];
  whatToVerifyNextBn: string[];
}

export interface ParcelMatchResult {
  isMatched: boolean;
  matchType: 'exact' | 'partial' | 'ambiguous' | 'no_match';
  parcel?: ParcelReference;
  candidates?: ParcelReference[];
  message: string;
  messageBn: string;
  missingFields: string[];
}

/**
 * 1. validateParcelInput()
 * Checks required fields and valid input formats.
 */
export function validateParcelInput(input: ParcelInputDetails, lang: 'bn' | 'en' = 'en'): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.division || !input.division.trim()) {
    errors.division = lang === 'bn' ? 'বিভাগ নির্বাচন আবশ্যক' : 'Division is required';
  }

  if (!input.district || !input.district.trim()) {
    errors.district = lang === 'bn' ? 'জেলা নির্বাচন আবশ্যক' : 'District is required';
  }

  if (!input.upazila || !input.upazila.trim()) {
    errors.upazila = lang === 'bn' ? 'উপজেলা / সার্কেল নির্বাচন আবশ্যক' : 'Upazila / Thana is required';
  }

  if (!input.mouza || !input.mouza.trim()) {
    errors.mouza = lang === 'bn' ? 'মৌজা নির্বাচন বা প্রদান আবশ্যক' : 'Mouza is required';
  }

  if (!input.dagNumber || !input.dagNumber.trim()) {
    errors.dagNumber = lang === 'bn' ? 'দাগ / প্লট নম্বর প্রদান আবশ্যক' : 'Dag / plot number is required';
  } else if (!/^[0-9A-Za-z\u09E6-\u09EF\-\/\s]+$/.test(input.dagNumber.trim())) {
    errors.dagNumber = lang === 'bn' ? 'দাগ নম্বরে শুধুমাত্র সংখ্যা বা গ্রহণযোগ্য অক্ষর ব্যবহার করুন' : 'Dag number contains invalid characters';
  }

  if (input.khatianNumber && input.khatianNumber.trim() && !/^[0-9A-Za-z\u09E6-\u09EF\-\/\s]+$/.test(input.khatianNumber.trim())) {
    errors.khatianNumber = lang === 'bn' ? 'খতিয়ান নম্বরে অগ্রহণযোগ্য অক্ষর রয়েছে' : 'Khatian number contains invalid characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * 2. matchParcel()
 * Compares multiple identifiers instead of relying on dag number alone.
 */
export function matchParcel(
  input: ParcelInputDetails,
  dataset: ParcelReference[] = INITIAL_PARCELS
): ParcelMatchResult {
  const norm = (s?: string) => (s ? s.trim().toLowerCase() : '');

  const inDiv = norm(input.division);
  const inDist = norm(input.district);
  const inUpz = norm(input.upazila);
  const inMouza = norm(input.mouza);
  const inDag = norm(input.dagNumber);
  const inKhatian = norm(input.khatianNumber);

  // Check for ambiguous match first
  if (detectAmbiguousMatch(input, dataset)) {
    const ambigCandidates = dataset.filter((p) => p.id === 'DEMO-PARCEL-004' || norm(p.dagNumber) === inDag);
    const ambig = ambigCandidates[0] || dataset.find((p) => p.id === 'DEMO-PARCEL-004');
    return {
      isMatched: true,
      matchType: 'ambiguous',
      parcel: ambig,
      candidates: ambigCandidates.length > 0 ? ambigCandidates : (ambig ? [ambig] : []),
      message: 'Conflicting parcel identifiers detected across historical survey sheets (SA vs RS). Requires ground verification.',
      messageBn: 'ঐতিহাসিক জরিপ রেকর্ডের (এসএ ও আরএস) মধ্যে দ্বৈত খতিয়ান ও সীমানা অসঙ্গতি চিহ্নিত হয়েছে। সরেজমিন যাচাই প্রয়োজন।',
      missingFields: ['Reconciled Joint Survey Map', 'Court Decree Verification'],
    };
  }

  // 1. Exact Match across all administrative levels + Dag Number
  const exact = dataset.find((p) => {
    const pDiv = norm(p.division);
    const pDist = norm(p.district);
    const pUpz = norm(p.upazila);
    const pMouza = norm(p.mouza);
    const pDag = norm(p.dagNumber);

    const geoMatch =
      (!inDiv || pDiv === inDiv) &&
      (!inDist || pDist === inDist) &&
      (!inUpz || pUpz === inUpz) &&
      pMouza === inMouza;

    const dagMatch = pDag === inDag;
    return geoMatch && dagMatch;
  });

  if (exact) {
    const missing: string[] = [];
    if (!exact.khatianNumber) missing.push('Khatian Number');
    if (!exact.area) missing.push('Demarcated Land Area');

    return {
      isMatched: true,
      matchType: 'exact',
      parcel: exact,
      message: `Exact match found: Mouza ${exact.mouza}, Dag ${exact.dagNumber}, Khatian ${exact.khatianNumber || 'N/A'}.`,
      messageBn: `হুবহু ম্যাচিং পাওয়া গেছে: মৌজা ${exact.mouza}, দাগ ${exact.dagNumber}, খতিয়ান ${exact.khatianNumber || 'প্রযোজ্য নয়'}।`,
      missingFields: missing,
    };
  }

  // 2. Partial Match: Mouza and Dag match, but Division/District/Upazila differs
  const partial = dataset.find((p) => norm(p.mouza) === inMouza && norm(p.dagNumber) === inDag);
  if (partial) {
    return {
      isMatched: true,
      matchType: 'partial',
      parcel: partial,
      message: `Partial match: Dag ${partial.dagNumber} found in Mouza ${partial.mouza}, but administrative hierarchy details require verification.`,
      messageBn: `আংশিক মিল: মৌজা ${partial.mouza}-তে দাগ ${partial.dagNumber} রয়েছে, তবে প্রশাসনিক বিন্যাস সতর্কতার সাথে যাচাই করুন।`,
      missingFields: ['Administrative Confirmation', 'Upazila Revenue Boundary'],
    };
  }

  // 3. No match found in sample dataset
  return {
    isMatched: false,
    matchType: 'no_match',
    message: `No matching sample record found for Dag ${input.dagNumber || '-'} in Mouza ${input.mouza || '-'}.`,
    messageBn: `মৌজা ${input.mouza || '-'}, দাগ ${input.dagNumber || '-'} এর জন্য কোনো ডেমো রেকর্ড পাওয়া যায়নি।`,
    missingFields: ['All Sample Data'],
  };
}

/**
 * 3. detectAmbiguousMatch()
 * Identifies cases where more than one sample record could match or survey sheets conflict.
 */
export function detectAmbiguousMatch(
  input: ParcelInputDetails,
  dataset: ParcelReference[] = INITIAL_PARCELS
): boolean {
  const norm = (s?: string) => (s ? s.trim().toLowerCase() : '');
  const inDag = norm(input.dagNumber);

  // Plot 999 or DEMO-PARCEL-004 is designated as ambiguous conflicting survey records
  if (inDag === '999') return true;

  // Check if multiple records exist with the same dag and mouza
  const matches = dataset.filter(
    (p) => norm(p.dagNumber) === inDag && norm(p.mouza) === norm(input.mouza)
  );

  return matches.length > 1;
}

/**
 * 4. detectConflictingDetails()
 * Flags inconsistent parcel identifiers or record details.
 */
export function detectConflictingDetails(parcel: ParcelReference): {
  hasConflict: boolean;
  details: string;
  detailsBn: string;
} {
  if (parcel.id === 'DEMO-PARCEL-004' || parcel.riskStatus === 'conflicting_records') {
    return {
      hasConflict: true,
      details: 'Dual records found: SA Khatian 301 records 10.00 decimal, while RS Khatian 812 records 8.40 decimal. Overlapping boundary flagged.',
      detailsBn: 'দ্বৈত রেকর্ড পাওয়া গেছে: এসএ খতিয়ান ৩০১ অনুযায়ী ১০.০০ শতাংশ, কিন্তু আরএস খতিয়ান ৮১২ অনুযায়ী ৮.৪০ শতাংশ। সীমানা অসঙ্গতি বিদ্যমান।',
    };
  }

  if (parcel.encumbranceSignals?.hasStayOrder) {
    return {
      hasConflict: true,
      details: `Active Court Injunction: ${parcel.encumbranceSignals.courtName} (${parcel.encumbranceSignals.caseRef}).`,
      detailsBn: `আদালতের সক্রিয় স্থগিতাদেশ: ${parcel.encumbranceSignals.courtName} (${parcel.encumbranceSignals.caseRef})।`,
    };
  }

  if (parcel.id === 'DEMO-PARCEL-006') {
    return {
      hasConflict: true,
      details: 'Classification Discrepancy: Recorded as Agricultural Nal in porcha, but transacted as industrial commercial plot without DC clearance.',
      detailsBn: 'জমির শ্রেণি অসঙ্গতি: খতিয়ানে কৃষিজমি (নাল) রেকর্ডভুক্ত, কিন্তু ডিসি অফিসের অনুমোদন ব্যতিরেকে বাণিজ্যিক কারখানা হিসেবে লেনদেন হচ্ছে।',
    };
  }

  return {
    hasConflict: false,
    details: 'No conflicting parcel identifiers detected in the available sample records.',
    detailsBn: 'উপলব্ধ নমুনা রেকর্ডে কোনো পরস্পরবিরোধী তথ্য পাওয়া যায়নি।',
  };
}

/**
 * 5. getParcelEvents()
 * Retrieves events associated with the matched mock parcel.
 */
export function getParcelEvents(parcel: ParcelReference): LandEvent[] {
  return parcel.events || [];
}

/**
 * 6. sortEventsChronologically()
 * Orders events by date and handles unknown dates explicitly.
 */
export function sortEventsChronologically(
  events: LandEvent[],
  order: 'asc' | 'desc' = 'asc'
): LandEvent[] {
  return [...events].sort((a, b) => {
    const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
    const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;

    // Put unknown dates at the end
    if (!a.eventDate) return 1;
    if (!b.eventDate) return -1;

    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}

/**
 * 7. classifyEventType()
 * Distinguishes transfer-related events, mutation applications, and completed mutations.
 * Critical: These 3 event types must never be treated as interchangeable!
 */
export function classifyEventType(
  event: LandEvent
): 'transfer_related' | 'mutation_application' | 'mutation_completed' | 'record_update' | 'other' {
  if (event.eventType === 'registered_deed' || event.eventType === 'lt_notice') {
    return 'transfer_related';
  }
  if (event.eventType === 'mutation_application') {
    return 'mutation_application';
  }
  if (event.eventType === 'mutation_completed') {
    return 'mutation_completed';
  }
  if (event.eventType === 'record_update') {
    return 'record_update';
  }
  return 'other';
}

/**
 * 8. assessParcelRisk()
 * Applies transparent, deterministic rules to sample records.
 * Returns only simple, explainable labels:
 * - Review Recommended
 * - Information Incomplete
 * - No Major Issue Detected in Available Data
 * - No Match Found
 */
export function assessParcelRisk(parcel?: ParcelReference): RiskAssessmentResult {
  if (!parcel) {
    return {
      label: 'No Match Found',
      labelBn: 'কোনো ম্যাচিং রেকর্ড পাওয়া যায়নি',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      summary: 'No sample parcel record matches the entered identifiers.',
      summaryBn: 'প্রদত্ত তথ্য অনুযায়ী কোনো ডেমো রেকর্ড পাওয়া যায়নি।',
      severity: 'neutral',
    };
  }

  const events = parcel.events || [];
  const deedEvent = events.find((e) => e.eventType === 'registered_deed' || e.category === 'registered_deed_event');
  const mutAppEvent = events.find((e) => e.eventType === 'mutation_application' || e.category === 'mutation_application_status');
  const mutCompleteEvent = events.find((e) => e.eventType === 'mutation_completed' || e.category === 'mutation_completion_status');
  const hasConflict = parcel.id === 'DEMO-PARCEL-004' || parcel.riskStatus === 'conflicting_records';
  const hasMortgage = parcel.encumbranceSignals?.hasMortgage;
  const isClassMismatch = parcel.id === 'DEMO-PARCEL-006';
  const isCoSharerDispute = parcel.id === 'DEMO-PARCEL-007';

  // Rule 1: Conflicting survey identifiers or court stay order -> Review Recommended
  if (hasConflict) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
      summary: 'Conflicting survey records detected between SA and RS sheets; active civil stay order flagged.',
      summaryBn: 'সাবেক এসএ এবং আধুনিক আরএস জরিপের মধ্যে অসঙ্গতি ও আদালতের স্থগিতাদেশ বিদ্যমান।',
      severity: 'warning',
    };
  }

  // Rule 2: Registered Mortgage or Disputed Power of Attorney -> Review Recommended
  if (hasMortgage || parcel.id === 'DEMO-PARCEL-005') {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
      summary: 'Registered bank mortgage lien and disputed Power of Attorney revocation logged.',
      summaryBn: 'ব্যাংক মর্টগেজ দায়বদ্ধতা এবং পাওয়ার অব অ্যাটর্নি প্রত্যাহারের নোটিশ রেকর্ড রয়েছে।',
      severity: 'warning',
    };
  }

  // Rule 3: Land classification mismatch without DC conversion -> Review Recommended
  if (isClassMismatch) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      summary: 'Classified as agricultural land in porcha, but transacted as commercial factory without DC approval.',
      summaryBn: 'খতিয়ানে কৃষিজমি হিসেবে চিহ্নিত কিন্তু অকৃষি বাণিজ্যিক কারখানা হিসেবে বিক্রয়ের চুক্তি।',
      severity: 'warning',
    };
  }

  // Rule 4: Co-sharer pre-emption objection lodged -> Review Recommended
  if (isCoSharerDispute) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
      summary: 'Co-sharer pre-emption objection lodged under SAT Act Section 96; mutation hearing contested.',
      summaryBn: 'ধারা ৯৬ অনুযায়ী শরিক কর্তৃক অগ্রক্রয় (Pre-emption) সংক্রান্ত আপত্তি দাখিল; নামজারি শুনানাধীন।',
      severity: 'warning',
    };
  }

  // Rule 5: Recent transfer deed recorded, but mutation not completed -> Review Recommended
  if (deedEvent && !mutCompleteEvent) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      summary: 'A recent registered deed was recorded, but no completed mutation exists in available records.',
      summaryBn: 'সাম্প্রতিক সাব-রেজিস্ট্রি দলিল হস্তান্তর রেকর্ড পাওয়া গেছে, তবে নামজারি সম্পন্ন হওয়ার কোনো রেকর্ড নেই।',
      severity: 'warning',
    };
  }

  // Rule 6: Mutation application submitted, but pending/incomplete -> Information Incomplete
  if (mutAppEvent && !mutCompleteEvent) {
    return {
      label: 'Information Incomplete',
      labelBn: 'তথ্য অসম্পূর্ণ / শুনানাধীন',
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
      summary: 'e-Mutation petition is recorded as submitted and pending hearing, but no approval order is found.',
      summaryBn: 'ই-নামজারি আবেদন জমা হয়েছে এবং শুনানাধীন রয়েছে, কিন্তু চূড়ান্ত অনুমোদন বা খতিয়ান জারির তথ্য নেই।',
      severity: 'info',
    };
  }

  // Rule 7: Mutation completed and updated in revenue records -> No Major Issue Detected
  if (mutCompleteEvent) {
    return {
      label: 'No Major Issue Detected in Available Data',
      labelBn: 'উপলব্ধ ডেটায় কোনো বড় অসঙ্গতি পাওয়া যায়নি',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      summary: 'Mutation completed and updated Record of Rights logged in available demo records.',
      summaryBn: 'উপলব্ধ ডেমো ডেটায় নামজারি নিষ্পত্তি এবং হালনাগাদ খতিয়ান জারির তথ্য পাওয়া গেছে।',
      severity: 'success',
    };
  }

  // Default Fallback
  return {
    label: 'Information Incomplete',
    labelBn: 'তথ্য অসম্পূর্ণ',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    summary: 'Insufficient transaction signals available in the sample records for conclusive analysis.',
    summaryBn: 'উপলব্ধ নমুনা রেকর্ডে সুনির্দিষ্ট বিশ্লেষণের জন্য প্রয়োজনীয় সংকেত অপ্রতুল।',
    severity: 'neutral',
  };
}

/**
 * 9. explainRiskFinding()
 * Explains the finding, its legal relevance, missing evidence, and recommended next steps.
 */
export function explainRiskFinding(
  parcel: ParcelReference,
  riskResult?: RiskAssessmentResult
): RiskExplanationDetail {
  const result = riskResult || assessParcelRisk(parcel);

  if (parcel.id === 'DEMO-PARCEL-004' || parcel.riskStatus === 'conflicting_records') {
    return {
      whatDetected: 'Dag 999 correlates with two distinct khatian sheets (SA 301 and RS 812) with differing acreages (10.00 dec vs 8.40 dec). An interim civil court injunction is active.',
      whatDetectedBn: 'দাগ ৯৯৯-এর বিপরীতে দুটি ভিন্ন খতিয়ান (এসএ ৩০১ ও আরএস ৮১২) পাওয়া গেছে যার জমির পরিমাণে অমিল রয়েছে এবং দেওয়ানি আদালতের স্থগিতাদেশ চলমান।',
      whyItMatters: 'Conflicting survey sheets create serious title defect risks. Under Bangladesh law, a buyer cannot secure possession or clear registration while an injunction is in effect.',
      whyItMattersBn: 'জরিপ নকশার অমিল এবং আদালতের স্থগিতাদেশ থাকলে জমি রেজিস্ট্রি বা নামজারি আইনত অবৈধ হতে পারে।',
      missingInfo: 'Joint demarcation survey report, reconciled mouza sheet, and certified court suit decree status.',
      missingInfoBn: 'সহকারী সেটেলমেন্ট অফিসের সমন্বিত সীমানা নকশা এবং দেওয়ানি মামলার সহি-মোহর আদেশপত্র অনুপস্থিত।',
      whatToVerifyNext: [
        'Request certified mouza map inspection from the Upazila Settlement Office.',
        'Consult with a senior property attorney to inspect the civil suit status (Title Suit 214/2022).',
        'Verify physical possession on site before making financial commitments.',
      ],
      whatToVerifyNextBn: [
        'উপজেলা সেটেলমেন্ট অফিস থেকে সহি মোহরযুক্ত মৌজা নকশা তুলে দাগ ও সীমানা পর্যালোচনা করুন।',
        'দেওয়ানি আদালতের মামলার (Title Suit 214/2022) বর্তমান আদেশ অভিজ্ঞ আইনজীবীর মাধ্যমে পর্যালোচনা করুন।',
        'অগ্রিম অর্থ দেওয়ার পূর্বে সরজমিনে দখল ও পার্শ্ববর্তী দাগের সীমানা প্রত্যক্ষ করুন।',
      ],
    };
  }

  if (parcel.id === 'DEMO-PARCEL-005') {
    return {
      whatDetected: 'Active bank mortgage registered with Agrani Bank PLC (Ref: MORT-2024-CTG-901). Contested Power of Attorney revocation notice filed by principal.',
      whatDetectedBn: 'অগ্রণী ব্যাংক পিএলসিতে রেজিস্ট্রিকৃত মর্টগেজ দায় এবং মূল মালিক কর্তৃক আমমোক্তারনামা প্রত্যাহারের নোটিশ রেকর্ড রয়েছে।',
      whyItMatters: 'Under the Transfer of Property Act, encumbered land cannot convey clear title without an official Bank Redemption Deed. Purchasing through a revoked attorney is legally void.',
      whyItMattersBn: 'ব্যাংকের দায়মুক্তি সনদ ছাড়া জমি হস্তান্তর করলে ক্রেতা আর্থিক দায় ও নিলামের ঝুঁকিতে পড়বেন। আমমোক্তারনামা প্রত্যাহার হলে প্রতিনিধির বিক্রয় ক্ষমতা থাকে না।',
      missingInfo: 'Official Bank NOC (দায়মুক্তি সনদ), original deed release receipt, and principal direct ratification.',
      missingInfoBn: 'সংশ্লিষ্ট ব্যাংক হতে ঋণ পরিশোধের চূড়ান্ত ছাড়পত্র (NOC) এবং মূল দলিল অবমুক্তির প্রমাণ অনুপস্থিত।',
      whatToVerifyNext: [
        'Visit the Agrani Bank lender branch to independently verify whether the mortgage liability is fully liquidated.',
        'Insist on direct deed execution by the original title holders rather than an attorney.',
        'Conduct a registered encumbrance search (তল্লাশ) at the Sub-Registry for Book 1 entries.',
      ],
      whatToVerifyNextBn: [
        'সংশ্লিষ্ট ব্যাংক শাখায় গিয়ে ঋণ সম্পূর্ণ পরিশোধিত কিনা তা সরাসরি নিশ্চিত হোন।',
        'আমমোক্তারনামার পরিবর্তে মূল মালিককে সরাসরি উপস্থিত থেকে দলিল সম্পাদনের দাবি করুন।',
        'সাব-রেজিস্ট্রি অফিসে ১ নং রেজিস্ট্রি বহিতে কোনো অতিরিক্ত দায় রয়েছে কিনা তল্লাশ দিন।',
      ],
    };
  }

  if (parcel.id === 'DEMO-PARCEL-006') {
    return {
      whatDetected: 'Plot 201 is recorded as agricultural Nal (ধানি জমি) in RS porcha with 3 years tax arrears, but is being transacted as industrial commercial plot.',
      whatDetectedBn: 'আরএস খতিয়ানে জমিটি নাল (কৃষি) শ্রেণিভুক্ত এবং ৩ বছরের কর বকেয়া। অথচ এটি বাণিজ্যিক শিল্প কারখানা হিসেবে বিক্রয়ের চুক্তি হচ্ছে।',
      whyItMatters: 'Under the Natural Waterbody Protection Act and Agricultural Land Reform laws, converting farmland to industrial use without Deputy Commissioner (DC) permission is prohibited and subject to heavy penalties.',
      whyItMattersBn: 'জেলা প্রশাসকের অনুমতি ব্যতীত কৃষিজমির শ্রেণি পরিবর্তন করে শিল্প স্থাপন করা আইন পরিপন্থী। এতে কারখানা স্থাপন স্থগিত বা সিলগালা হতে পারে।',
      missingInfo: 'DC Office Land Class Conversion Clearance (শ্রেণি পরিবর্তন ছাড়পত্র) and Environmental clearance.',
      missingInfoBn: 'জেলা প্রশাসকের রাজস্ব শাখা থেকে শ্রেণি পরিবর্তনের চূড়ান্ত আদেশ ও হাল সনের বাণিজ্যিক কর দাখিলা অনুপস্থিত।',
      whatToVerifyNext: [
        'Demand the official Land Conversion Order issued by the Deputy Commissioner before signing contracts.',
        'Inspect the Upazila master plan and agricultural protection demarcations.',
        'Verify back taxes and land development tax clearance.',
      ],
      whatToVerifyNextBn: [
        'বিক্রেতার নিকট থেকে জেলা প্রশাসক কর্তৃক প্রদত্ত জমি ব্যবহারের বৈধ অনুমতিপত্র তলব করুন।',
        'উপজেলা মাস্টার প্ল্যানে এটি জলাশয় বা সংরক্ষিত কৃষিজমির তালিকায় আছে কিনা যাচাই করুন।',
        'বকেয়া কর ও শ্রেণি পরিবর্তনের সরকারি ফি পরিশোধ নিশ্চিত করুন।',
      ],
    };
  }

  if (parcel.id === 'DEMO-PARCEL-007') {
    return {
      whatDetected: 'Formal legal pre-emption objection lodged by co-sharer alleging transfer without mandatory statutory notice to family heirs (SAT Act Sec 96).',
      whatDetectedBn: 'আইনসঙ্গত নোটিশ ছাড়া জমি বিক্রির অভিযোগে শরিক কর্তৃক সহকারী কমিশনার (ভূমি) অফিসে অগ্রক্রয়ের আপত্তি মামলা দায়েরকৃত।',
      whyItMatters: 'Under Section 96 of the State Acquisition and Tenancy Act, family co-sharers possess a statutory pre-emption right to buy back undivided shares through court decree.',
      whyItMattersBn: 'এসএটি আইনের ৯৬ ধারা অনুযায়ী শরিকের অগ্রক্রয় স্বত্ব কার্যকর হলে ক্রেতাকে জমি ফেরত দিতে হতে পারে। শরিকি আপসের পূর্বে কেনা ঝুঁকিপূর্ণ।',
      missingInfo: 'Registered Partition Deed (আপস বণ্টননামা) and written co-sharer waiver.',
      missingInfoBn: 'রেজিস্ট্রিকৃত আপস বণ্টননামা দলিল এবং অন্যান্য ওয়ারিশানদের অনাপত্তিপত্র (NOC) অনুপস্থিত।',
      whatToVerifyNext: [
        'Insist on a registered partition deed between all legal heirs before buying undivided shares.',
        'Await AC (Land) hearing outcome with legal counsel.',
        'Check succession certificate (ওয়ারিশান সনদ) issued by local authorities.',
      ],
      whatToVerifyNextBn: [
        'অবিভক্ত জমিতে ক্রয়ের পূর্বে সকল ওয়ারিশের মধ্যে রেজিস্ট্রিকৃত বণ্টননামা দলিল সম্পাদন নিশ্চিত করুন।',
        'সহকারী কমিশনার (ভূমি) কোর্টে আপত্তির শুনানি ও আদেশের জন্য অপেক্ষা করুন।',
        'পৌরসভা বা ইউনিয়ন পরিষদ কর্তৃক প্রদত্ত মূল ওয়ারিশান সনদের সঠিকতা যাচাই করুন।',
      ],
    };
  }

  if (result.label === 'Review Recommended') {
    return {
      whatDetected: 'A registered transfer deed or notice was recorded at the Sub-Registry, but no completed e-mutation exists in available records.',
      whatDetectedBn: 'সাব-রেজিস্ট্রি অফিসে হস্তান্তর দলিল ও ধারা ৮৯ নোটিশ রয়েছে, কিন্তু নামজারি খতিয়ান সম্পন্ন হওয়ার কোনো রেকর্ড নেই।',
      whyItMatters: 'Under Bangladesh law (SAT Act Section 89), a registered deed does NOT update the revenue record of rights. The seller or heirs may transfer unmutated land multiple times before records are synchronized.',
      whyItMattersBn: 'বাংলাদেশে কেবল রেজিস্ট্রিকৃত দলিল দিয়ে মালিকানা সম্পূর্ণ হয় না; সহকারী কমিশনার (ভূমি) দ্বারা নামজারি সম্পন্ন না হলে ক্রেতার নাম রাজস্ব রেকর্ডে ওঠে না।',
      missingInfo: 'e-Mutation proceeding case number, AC (Land) formal approval order, and updated mutation khatian with Dakhila receipts.',
      missingInfoBn: 'ই-নামজারি কেস নম্বর, সহকারী কমিশনার (ভূমি)-র চূড়ান্ত অনুমোদন আদেশ ও হাল সনের ভূমি উন্নয়ন কর দাখিলা অনুপস্থিত।',
      whatToVerifyNext: [
        'Check whether an e-mutation case has been initiated at mutation.land.gov.bd.',
        'Inspect the 25-year chain of deeds (Baya deeds) at the Sub-Registry Office.',
        'Verify undisputed physical possession on site before payment.',
      ],
      whatToVerifyNextBn: [
        'mutation.land.gov.bd পোর্টালে এই দলিলের ভিত্তিতে কোনো নামজারি আবেদন চলমান আছে কিনা যাচাই করুন।',
        'সাব-রেজিস্ট্রি অফিস থেকে গত ২৫ বছরের বায়া দলিলের ধারাবাহিকতা ও তল্লাশ (Nil Search) সম্পন্ন করুন।',
        'বিক্রেতা জমিতে স্বত্ববান ও কার্যকর দখলে আছেন কিনা এবং হাল সনের খাজনা পরিশোধিত কিনা যাচাই করুন।',
      ],
    };
  }

  if (result.label === 'Information Incomplete') {
    return {
      whatDetected: 'An e-Mutation petition has been submitted and is pending hearing at the AC (Land) office, but no approval order has been issued.',
      whatDetectedBn: 'ই-নামজারি আবেদন দাখিল হয়েছে যা সার্কেল কোর্টে শুনানাধীন; চূড়ান্ত অনুমোদন বা খতিয়ান জারির তথ্য নেই।',
      whyItMatters: 'A mutation petition is merely a request. Applications may be objected to or rejected during field verification by the Union Land Assistant Officer (ULAO).',
      whyItMattersBn: 'নামজারি আবেদন জমা দেওয়া মানেই অনুমোদন নয়। মাঠপর্যায়ের নায়েবের তদন্তে ত্রুটি থাকলে আবেদন বাতিল হতে পারে।',
      missingInfo: 'Final hearing order, approval status, payment of official DCR fees, and issuance of Mutation Khatian.',
      missingInfoBn: 'শুনানির চূড়ান্ত আদেশ, সরকারি ডিসিআর ফি পরিশোধের রসিদ এবং নতুন নামজারি খতিয়ান প্রকাশনা অনুপস্থিত।',
      whatToVerifyNext: [
        'Track ongoing mutation case status directly on mutation.land.gov.bd using the application ID.',
        'Confirm if any third-party objection has been lodged at the Union Land Office.',
        'Do not execute final payment or registry until the AC (Land) issues the formal mutation order.',
      ],
      whatToVerifyNextBn: [
        'mutation.land.gov.bd পোর্টালে আবেদন ট্র্যাকিং করে মামলার বর্তমান ধাপ পর্যবেক্ষণ করুন।',
        'উক্ত আবেদনে কোনো তৃতীয় পক্ষ আপত্তি দায়ের করেছে কিনা তা ইউনিয়ন ভূমি অফিস থেকে নিশ্চিত হোন।',
        'নামজারি খতিয়ান চূড়ান্ত না হওয়া পর্যন্ত চূড়ান্ত লেনদেন স্থগিত রাখার পরামর্শ দেওয়া হলো।',
      ],
    };
  }

  // No Major Issue Detected
  return {
    whatDetected: `Mutation completed order issued and updated Khatian ${parcel.khatianNumber || 'recorded'}. Revenue taxes paid to date.`,
    whatDetectedBn: `সহকারী কমিশনার (ভূমি) কর্তৃক নামজারি আদেশ অনুমোদিত ও খতিয়ান হালনাগাদ রেকর্ডভুক্ত হয়েছে।`,
    whyItMatters: 'Revenue records correlate with legal mutation proceedings. However, this is NOT a guarantee of title; civil court litigations or unrecorded family disputes may still exist.',
    whyItMattersBn: 'রাজস্ব রেকর্ডের সাথে নামজারি সংগতিপূর্ণ। তবে এটি কোনো নিরঙ্কুশ আইনি নিশ্চয়তা নয়; দেওয়ানি আদালতে কোনো মোকদ্দমা বা ওয়ারিশান বিরোধ থাকতে পারে।',
    missingInfo: 'Civil court non-encumbrance certificate, physical demarcation beacon verification, and recent Dakhila original copy.',
    missingInfoBn: 'দেওয়ানি আদালতের মামলার ইতিহাস, সরজমিন সীমানা পিলার ও হাল সনের দাখিলার মূল কপি যাচাই সাপেক্ষ।',
    whatToVerifyNext: [
      'Obtain a physically certified copy of the Mutation Porcha and Dakhila from the AC (Land) office.',
      'Conduct a 12-to-25-year title search (Nil Search) at the Sub-Registry Office.',
      'Physically inspect plot boundaries, access roads, and current occupants on site.',
    ],
    whatToVerifyNextBn: [
      'উপজেলা ভূমি অফিস থেকে নামজারি খতিয়ান ও ডিসিআর-এর সার্টিফাইড মূল কপি সংগ্রহ করুন।',
      'সাব-রেজিস্ট্রি অফিসে ১২ থেকে ২৫ বছরের তল্লাশ (Search) দিয়ে জমিটি অন্য কোথাও হস্তান্তরিত নয় কিনা নিশ্চিত হোন।',
      'সরজমিনে গিয়ে জমির বাস্তব সীমানা ও দখলদারিত্ব প্রত্যক্ষ করুন।',
    ],
  };
}

/**
 * 10. getMissingInformation()
 * Lists required or expected information that is unavailable.
 */
export function getMissingInformation(parcel: ParcelReference): {
  missingItems: string[];
  missingItemsBn: string[];
} {
  const missing: string[] = [];
  const missingBn: string[] = [];
  const events = parcel.events || [];
  const mutComplete = events.some((e) => e.eventType === 'mutation_completed');

  if (!mutComplete) {
    missing.push('Approved Mutation Khatian (অনুমোদিত নামজারি খতিয়ান)');
    missingBn.push('অনুমোদিত নামজারি খতিয়ান ও ডিসিআর রসিদ');
  }

  if (parcel.taxStatus?.status !== 'paid') {
    missing.push('Up-to-Date Land Development Tax Receipt (হাল সনের ভূমি উন্নয়ন কর দাখিলা)');
    missingBn.push('হাল সনের ভূমি উন্নয়ন কর দাখিলা');
  }

  if (!parcel.bayaChain?.chainIntact) {
    missing.push('Uninterrupted 25-Year Baya Deed Chain (গত ২৫ বছরের অবিচ্ছিন্ন বায়া দলিল)');
    missingBn.push('গত ২৫ বছরের অবিচ্ছিন্ন বায়া দলিলের অনুলিপি');
  }

  if (parcel.encumbranceSignals?.hasMortgage) {
    missing.push('Bank Non-Encumbrance Clearance Certificate (ব্যাংক দায়মুক্তি / অনাপত্তিপত্র)');
    missingBn.push('ব্যাংক দায়মুক্তি ও অনাপত্তি সনদ');
  }

  if (parcel.id === 'DEMO-PARCEL-006') {
    missing.push('DC Office Land Class Conversion Clearance (শ্রেণি পরিবর্তন ছাড়পত্র)');
    missingBn.push('জেলা প্রশাসকের ভূমি ব্যবহারের রূপান্তর ছাড়পত্র');
  }

  if (missing.length === 0) {
    missing.push('Civil Court Nil Search Certificate (দেওয়ানি আদালত নির্দায় সনদ)');
    missingBn.push('দেওয়ানি আদালত নির্দায় ও অনাপত্তি রেকর্ড');
  }

  return { missingItems: missing, missingItemsBn: missingBn };
}

/**
 * 11. getRecommendedChecks()
 * Generates verification suggestions based on detected issues.
 */
export function getRecommendedChecks(parcel: ParcelReference): {
  recommendations: string[];
  recommendationsBn: string[];
} {
  const recs: string[] = [];
  const recsBn: string[] = [];

  recs.push('Sub-Registry Office: Conduct 12-25 year Nil Search for unrecorded deeds or mortgages.');
  recsBn.push('সাব-রেজিস্ট্রি অফিস: ১২ থেকে ২৫ বছরের তল্লাশ (Search) দিয়ে অঘোষিত কোনো বায়না বা রেজিস্ট্রি আছে কিনা নিশ্চিত হোন।');

  recs.push('AC (Land) Office: Verify certified porcha and e-Mutation case tracking.');
  recsBn.push('উপজেলা ভূমি অফিস: সহকারী কমিশনার (ভূমি) অফিস থেকে মূল খতিয়ানের সার্টিফাইড কপি ও মিসকেস যাচাই করুন।');

  recs.push('Physical Ground Survey: Verify physical possession, boundaries, and road access with neighbors.');
  recsBn.push('সরেজমিন পরিদর্শন: স্থানীয় প্রতিবেশীদের সাথে কথা বলে বাস্তব দখল, সীমানা ও চলাচলের রাস্তা প্রত্যক্ষ করুন।');

  if (parcel.encumbranceSignals?.hasMortgage) {
    recs.push('Bank Loan Department: Obtain formal written confirmation of mortgage debt liquidation.');
    recsBn.push('সংশ্লিষ্ট ব্যাংক: ঋণ সম্পূর্ণ পরিশোধিত হয়ে দায়মুক্ত হয়েছে কিনা লিখিত প্রত্যয়ন সংগ্রহ করুন।');
  }

  return { recommendations: recs, recommendationsBn: recsBn };
}

/**
 * 12. resetSearch()
 * Clears current search and returns empty form state.
 */
export function resetSearch(): ParcelInputDetails {
  return {
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Tejgaon',
    mouza: '',
    dagNumber: '',
    khatianNumber: '',
    jlNumber: '',
    area: '',
  };
}

/**
 * 13. handleNoMatch()
 * Explains that no matching sample record was found and that no match != safe.
 */
export function handleNoMatch(input: ParcelInputDetails): {
  message: string;
  messageBn: string;
  caveat: string;
  caveatBn: string;
} {
  return {
    message: `No matching sample record found for Dag ${input.dagNumber || '-'} in Mouza ${input.mouza || '-'}.`,
    messageBn: `মৌজা ${input.mouza || '-'}, দাগ ${input.dagNumber || '-'} এর জন্য কোনো ডেমো রেকর্ড পাওয়া যায়নি।`,
    caveat: 'Critical: The absence of records in demonstration data does not imply the parcel is free from legal disputes or encumbrances.',
    caveatBn: 'গুরুত্বপূর্ণ সতর্কতা: ডেমো ডেটায় কোনো রেকর্ড না পাওয়ার অর্থ কখনোই এটি নয় যে জমিটি বিরোধমুক্ত বা শতভাগ নিরাপদ।',
  };
}

/**
 * 14. handleIncompleteData()
 * Displays clear warning when information is insufficient.
 */
export function handleIncompleteData(parcel: ParcelReference): {
  warning: string;
  warningBn: string;
} {
  return {
    warning: 'Available sample records contain incomplete transaction signals. Independent verification at the Upazila Land Office is required.',
    warningBn: 'উপলব্ধ রেকর্ডে লেনদেনের প্রয়োজনীয় তথ্যের ঘাটতি রয়েছে। উপজেলা ভূমি অফিসে সশরীরে যাচাই করা আবশ্যক।',
  };
}

/**
 * 15. searchParcel()
 * Starts the parcel lookup using entered identifiers.
 */
export async function searchParcel(
  input: ParcelInputDetails,
  dataset: ParcelReference[] = INITIAL_PARCELS
): Promise<ParcelMatchResult> {
  // Simulate natural realistic lookup delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return matchParcel(input, dataset);
}
