import { ParcelInputDetails, ParcelReference, LandEvent } from '../types';
import { INITIAL_PARCELS } from './mock-data/parcels';

export type RiskAssessmentLabel =
  | 'Review Recommended'
  | 'Information Incomplete'
  | 'No Major Issue Detected in Available Data';

export interface RuleBasedRiskExplanation {
  label: RiskAssessmentLabel;
  labelBn: string;
  badgeColor: string; // Tailwind class
  summary: string;
  summaryBn: string;
  whatDetected: string;
  whatDetectedBn: string;
  whyItMatters: string;
  whyItMattersBn: string;
  missingInfo: string;
  missingInfoBn: string;
  whatToVerifyNext: string[];
  whatToVerifyNextBn: string[];
}

export interface ParcelCoreStatus {
  transferEvent: {
    recorded: boolean;
    label: string;
    labelBn: string;
    details: string;
    detailsBn: string;
    date?: string;
    reference?: string;
  };
  mutationApplication: {
    status: 'submitted' | 'not_found' | 'unknown';
    label: string;
    labelBn: string;
    details: string;
    detailsBn: string;
    date?: string;
    reference?: string;
  };
  mutationCompletion: {
    status: 'completed' | 'pending' | 'not_found' | 'unknown';
    label: string;
    labelBn: string;
    details: string;
    detailsBn: string;
    date?: string;
    newKhatian?: string;
  };
}

export interface ParcelMatchEvaluation {
  isMatched: boolean;
  matchType: 'exact' | 'partial' | 'ambiguous' | 'no_match';
  parcel?: ParcelReference;
  message: string;
  messageBn: string;
  risk?: RuleBasedRiskExplanation;
  coreStatus?: ParcelCoreStatus;
  timelineEvents: LandEvent[];
}

/**
 * Matches user parcel input against predefined demo dataset using multiple identifiers.
 * In Bangladesh land administration, a dag number alone is not unique;
 * Division, District, Upazila, Mouza, Dag number, and Khatian number are evaluated together.
 */
export function matchParcelMultiIdentifier(
  input: ParcelInputDetails,
  dataset: ParcelReference[] = INITIAL_PARCELS
): ParcelMatchEvaluation {
  const norm = (s?: string) => (s ? s.trim().toLowerCase() : '');

  const inDiv = norm(input.division);
  const inDist = norm(input.district);
  const inUpz = norm(input.upazila);
  const inMouza = norm(input.mouza);
  const inDag = norm(input.dagNumber);
  const inKhatian = norm(input.khatianNumber);

  // Exact Match: Division + District + Upazila + Mouza + Dag Number
  const exactMatch = dataset.find((p) => {
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

  if (exactMatch) {
    // If parcel 004, it represents conflicting survey records
    if (exactMatch.id === 'DEMO-PARCEL-004' || exactMatch.matchConfidence === 'ambiguous') {
      const risk = evaluateRisk(exactMatch);
      const coreStatus = extractCoreStatus(exactMatch);
      return {
        isMatched: true,
        matchType: 'ambiguous',
        parcel: exactMatch,
        message: 'Multiple conflicting survey records exist for this Dag and Mouza. Discrepancy detected between historic SA sheet and modern RS record.',
        messageBn: 'এই দাগ ও মৌজার জন্য একাধিক রেকর্ড অসঙ্গতি পাওয়া গেছে। সাবেক এসএ এবং সাম্প্রতিক আরএস জরিপের মধ্যে সীমানা ও খতিয়ান অসঙ্গতি বিদ্যমান।',
        risk,
        coreStatus,
        timelineEvents: exactMatch.events,
      };
    }

    const risk = evaluateRisk(exactMatch);
    const coreStatus = extractCoreStatus(exactMatch);
    return {
      isMatched: true,
      matchType: 'exact',
      parcel: exactMatch,
      message: `Matching sample record identified: Mouza ${exactMatch.mouza}, Dag ${exactMatch.dagNumber}, Khatian ${exactMatch.khatianNumber || 'N/A'}.`,
      messageBn: `ম্যাচিং ডেমো রেকর্ড পাওয়া গেছে: মৌজা ${exactMatch.mouza}, দাগ ${exactMatch.dagNumber}, খতিয়ান ${exactMatch.khatianNumber || 'প্রযোজ্য নয়'}।`,
      risk,
      coreStatus,
      timelineEvents: exactMatch.events,
    };
  }

  // Partial Match: Mouza and Dag match, but other fields or khatian differ
  const partial = dataset.find((p) => norm(p.mouza) === inMouza && norm(p.dagNumber) === inDag);
  if (partial) {
    const risk = evaluateRisk(partial);
    const coreStatus = extractCoreStatus(partial);
    return {
      isMatched: true,
      matchType: 'partial',
      parcel: partial,
      message: `Partial match: Dag ${partial.dagNumber} found in Mouza ${partial.mouza}, but administrative hierarchy details require verification.`,
      messageBn: `আংশিক মিল পাওয়া গেছে: মৌজা ${partial.mouza}-তে দাগ ${partial.dagNumber} রয়েছে, তবে অন্যান্য সনাক্তকারী তথ্য যাচাই সাপেক্ষ।`,
      risk,
      coreStatus,
      timelineEvents: partial.events,
    };
  }

  // No Match in demo data
  return {
    isMatched: false,
    matchType: 'no_match',
    message: `No matching record found in the fictional demo data for Dag ${input.dagNumber || '-'} in Mouza ${input.mouza || '-'}.`,
    messageBn: `ডেমো ডেটাসেটে মৌজা ${input.mouza || '-'}, দাগ ${input.dagNumber || '-'} এর জন্য কোনো নমুনা রেকর্ড পাওয়া যায়নি।`,
    timelineEvents: [],
  };
}

/**
 * Extracts distinct core statuses:
 * - Transfer / Registered deed event
 * - Mutation application status
 * - Mutation completion status
 */
export function extractCoreStatus(parcel: ParcelReference): ParcelCoreStatus {
  const events = parcel.events || [];

  const deedEvent = events.find((e) => e.eventType === 'registered_deed' || e.category === 'registered_deed_event');
  const ltNoticeEvent = events.find((e) => e.eventType === 'lt_notice' || e.category === 'lt_notice_event');
  const mutAppEvent = events.find((e) => e.eventType === 'mutation_application' || e.category === 'mutation_application_status');
  const mutCompleteEvent = events.find((e) => e.eventType === 'mutation_completed' || e.category === 'mutation_completion_status');

  // 1. Transfer event
  const hasTransfer = Boolean(deedEvent || ltNoticeEvent);
  const transfer = hasTransfer
    ? {
        recorded: true,
        label: 'Registered Deed / Transfer Event Recorded',
        labelBn: 'সাব-রেজিস্ট্রি দলিল হস্তান্তর রেকর্ড পাওয়া গেছে',
        details: deedEvent?.summary || 'Transfer deed execution logged in Sub-Registry records.',
        detailsBn: deedEvent?.summary || 'সাব-রেজিস্ট্রি অফিসে জমি হস্তান্তর দলিল সম্পাদন রেকর্ড পাওয়া গেছে।',
        date: deedEvent?.eventDate || ltNoticeEvent?.eventDate,
        reference: deedEvent?.maskedReference || ltNoticeEvent?.maskedReference,
      }
    : {
        recorded: false,
        label: 'No recent transfer deed logged in demo data',
        labelBn: 'ডেমো ডেটায় সাম্প্রতিক কোনো হস্তান্তর দলিল পাওয়া যায়নি',
        details: 'No deed registration or LT notice found in the simulated Sub-Registry feed.',
        detailsBn: 'সিমুলেটেড সাব-রেজিস্ট্রি ফিডে কোনো দলিল সম্পাদন বা ধারা ৮৯ নোটিশ নেই।',
      };

  // 2. Mutation application
  let mutAppStatus: 'submitted' | 'not_found' | 'unknown' = 'not_found';
  let mutAppLabel = 'No e-Mutation Application Found in Demo Data';
  let mutAppLabelBn = 'ডেমো ডেটায় কোনো ই-নামজারি আবেদন পাওয়া যায়নি';
  let mutAppDetails = 'No pending or historical e-mutation petition has been submitted for this plot in the available records.';
  let mutAppDetailsBn = 'উপলব্ধ ডেটায় এই প্লটের বিপরীতে কোনো চলমান বা নিষ্পন্নাধীন ই-নামজারি আবেদন নেই।';

  if (mutAppEvent) {
    mutAppStatus = 'submitted';
    mutAppLabel = 'Mutation Application Submitted (Pending Hearing)';
    mutAppLabelBn = 'নামজারি আবেদন দাখিলকৃত (শুনানি বা তদন্তাধীন)';
    mutAppDetails = mutAppEvent.summary || 'e-Mutation application filed with AC (Land) office.';
    mutAppDetailsBn = mutAppEvent.summary || 'সহকারী কমিশনার (ভূমি) অফিসে ই-নামজারি আবেদন দাখিল করা হয়েছে।';
  }

  // 3. Mutation completion
  let mutCompStatus: 'completed' | 'pending' | 'not_found' | 'unknown' = 'not_found';
  let mutCompLabel = 'Mutation Not Completed in Available Data';
  let mutCompLabelBn = 'উপলব্ধ রেকর্ডে নামজারি নিষ্পত্তি সম্পন্ন হয়নি';
  let mutCompDetails = 'No mutated Khatian (Dakhila/RoR update) order exists in the simulated revenue records.';
  let mutCompDetailsBn = 'উপলব্ধ রাজস্ব রেকর্ডে কোনো অনুমোদিত নামজারি খতিয়ান বা দাখিলা জারির তথ্য নেই।';

  if (mutCompleteEvent) {
    mutCompStatus = 'completed';
    mutCompLabel = 'Mutation Completed (Record of Rights Updated)';
    mutCompLabelBn = 'নামজারি সম্পন্ন (খতিয়ান হালনাগাদ রেকর্ডভুক্ত)';
    mutCompDetails = mutCompleteEvent.summary || 'AC (Land) order approved; new mutation khatian created.';
    mutCompDetailsBn = mutCompleteEvent.summary || 'সহকারী কমিশনার (ভূমি) কর্তৃক আবেদন অনুমোদিত এবং নামজারি খতিয়ান জারিকৃত।';
  } else if (mutAppEvent) {
    mutCompStatus = 'pending';
    mutCompLabel = 'Mutation Incomplete / Under Review';
    mutCompLabelBn = 'নামজারি অসমাপ্ত / শুনানাধীন';
    mutCompDetails = 'Application is currently in process. Formal revenue mutation has NOT been granted.';
    mutCompDetailsBn = 'আবেদন বর্তমানে তদন্ত বা শুনানাধীন রয়েছে। চূড়ান্ত নামজারি আদেশ এখনো জারি হয়নি।';
  }

  return {
    transferEvent: transfer,
    mutationApplication: {
      status: mutAppStatus,
      label: mutAppLabel,
      labelBn: mutAppLabelBn,
      details: mutAppDetails,
      detailsBn: mutAppDetailsBn,
      date: mutAppEvent?.eventDate,
      reference: mutAppEvent?.maskedReference,
    },
    mutationCompletion: {
      status: mutCompStatus,
      label: mutCompLabel,
      labelBn: mutCompLabelBn,
      details: mutCompDetails,
      detailsBn: mutCompDetailsBn,
      date: mutCompleteEvent?.eventDate,
      newKhatian: parcel.khatianNumber,
    },
  };
}

/**
 * Transparent, rule-based risk assessment.
 * Uses only 3 clear, standardized labels:
 * 1. "Review Recommended"
 * 2. "Information Incomplete"
 * 3. "No Major Issue Detected in Available Data"
 *
 * For every scenario, explains:
 * - What was detected
 * - Why it may matter
 * - What information is missing
 * - What the user should verify next
 */
export function evaluateRisk(parcel: ParcelReference): RuleBasedRiskExplanation {
  const events = parcel.events || [];
  const deedEvent = events.find((e) => e.eventType === 'registered_deed' || e.category === 'registered_deed_event');
  const mutAppEvent = events.find((e) => e.eventType === 'mutation_application' || e.category === 'mutation_application_status');
  const mutCompleteEvent = events.find((e) => e.eventType === 'mutation_completed' || e.category === 'mutation_completion_status');
  const isConflict = parcel.id === 'DEMO-PARCEL-004' || parcel.riskStatus === 'conflicting_records';

  // Scenario 4: Conflicting Records / Boundary Discrepancy
  if (isConflict) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-300',
      summary: 'Conflicting parcel identifiers detected between historic SA and modern RS survey records.',
      summaryBn: 'সাবেক এসএ এবং আধুনিক আরএস জরিপ রেকর্ডের মধ্যে দাগ ও সীমানা সংক্রান্ত অসঙ্গতি পাওয়া গেছে।',
      whatDetected: 'Dag 999 correlates with two distinct khatian sheets (SA 301 and RS 812) with differing acreages (10.00 dec vs 8.40 dec).',
      whatDetectedBn: 'দাগ ৯৯৯-এর বিপরীতে দুটি ভিন্ন খতিয়ান (এসএ ৩০১ ও আরএস ৮১২) পাওয়া গেছে যার জমির পরিমাণে অমিল রয়েছে।',
      whyItMatters: 'Conflicting survey maps or overlapping khatians may indicate an ongoing title dispute, boundary clash, or un-reconciled cadastral transition.',
      whyItMattersBn: 'জরিপ নকশার অমিল বা দ্বৈত খতিয়ান জমির মালিকানা নিয়ে বিরোধ, সীমানা বিরোধ বা অমীমাংসিত জরিপ জটিলতার ঝুঁকি নির্দেশ করে।',
      missingInfo: 'Field survey ground-truth report, reconciled mouza sheet, and latest joint-survey demarcations are missing.',
      missingInfoBn: 'মাঠপর্যায়ের সঠিক সীমানা জরিপ প্রতিবেদন ও সহকারী সেটেলমেন্ট অফিসের সমন্বিত মৌজা নকশা অনুপস্থিত।',
      whatToVerifyNext: [
        'Request an official certified mouza map inspection from the Upazila Settlement Office.',
        'Consult with an experienced property lawyer to inspect the original CS/SA/RS survey volumes.',
        'Verify physical boundaries and possession on the ground before making any advance payments.',
      ],
      whatToVerifyNextBn: [
        'উপজেলা সেটেলমেন্ট অফিস থেকে সহি মোহরযুক্ত মৌজা নকশা তুলে দাগ ও সীমানা পর্যালোচনা করুন।',
        'অভিজ্ঞ ভূমি আইনজীবীর মাধ্যমে সিএস, এসএ ও আরএস খতিয়ানের ধারাবাহিকতা খতিয়ে দেখুন।',
        'অগ্রিম অর্থ দেওয়ার পূর্বে সরজমিনে দখল ও পার্শ্ববর্তী দাগের সীমানা প্রত্যক্ষ করুন।',
      ],
    };
  }

  // Scenario 5: Registered Mortgage Lien & Contested POA (DEMO-PARCEL-005)
  if (parcel.id === 'DEMO-PARCEL-005' || parcel.encumbranceSignals?.hasMortgage) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-300',
      summary: 'Registered bank mortgage lien and contested Power of Attorney logged in available feeds.',
      summaryBn: 'ব্যাংক মর্টগেজ দায়বদ্ধতা এবং পাওয়ার অব অ্যাটর্নি প্রত্যাহারের নোটিশ পাওয়া গেছে।',
      whatDetected: `Active mortgage charge registered with ${parcel.encumbranceSignals?.bankOrLender || 'Scheduled Bank'} (Ref: MORT-2024-CTG-901). Also, a registered Power of Attorney revocation notice was filed by the principal.`,
      whatDetectedBn: `${parcel.encumbranceSignals?.bankOrLender || 'তফসিলি ব্যাংক'}-এ রেজিস্ট্রিকৃত দায়বদ্ধতা এবং মূল মালিক কর্তৃক আমমোক্তারনামা প্রত্যাহারের নোটিশ রেকর্ড রয়েছে।`,
      whyItMatters: 'Under Transfer of Property Act, encumbered land cannot convey unencumbered title without Bank No Objection / Redemption Deed. Furthermore, purchasing through a disputed attorney risks complete invalidation.',
      whyItMattersBn: 'সম্পত্তি হস্তান্তর আইন অনুযায়ী ব্যাংকের দায়মুক্তি সনদ ছাড়া জমি হস্তান্তর করলে ক্রেতা আর্থিক দায় ও নিলামের ঝুঁকিতে পড়বেন। আমমোক্তারনামা প্রত্যাহার হলে প্রতিনিধির বিক্রয় ক্ষমতা থাকে না।',
      missingInfo: 'Official Bank NOC (দায়মুক্তি সনদ), original deed deposit receipt, and principal direct ratification.',
      missingInfoBn: 'সংশ্লিষ্ট ব্যাংক হতে ঋণ পরিশোধের চূড়ান্ত ছাড়পত্র (NOC) এবং মূল দলিল অবমুক্তির প্রমাণ অনুপস্থিত।',
      whatToVerifyNext: [
        'Visit the lender branch to independently verify whether the mortgage liability is fully liquidated.',
        'Insist on direct deed execution by the original title holders rather than through an attorney.',
        'Conduct a registered encumbrance search (তল্লাশ) at the Sub-Registry for Book 1 entries.',
      ],
      whatToVerifyNextBn: [
        'সংশ্লিষ্ট ব্যাংক শাখায় গিয়ে ঋণ সম্পূর্ণ পরিশোধিত কিনা তা সরাসরি নিশ্চিত হোন।',
        'আমমোক্তারনামার পরিবর্তে মূল মালিককে সরাসরি উপস্থিত থেকে দলিল সম্পাদনের দাবি করুন।',
        'সাব-রেজিস্ট্রি অফিসে ১ নং রেজিস্ট্রি বহিতে কোনো অতিরিক্ত দায় রয়েছে কিনা তল্লাশ দিন।',
      ],
    };
  }

  // Scenario 6: Land Classification Mismatch / Agricultural Protection (DEMO-PARCEL-006)
  if (parcel.id === 'DEMO-PARCEL-006') {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      summary: 'Land recorded as agricultural in revenue survey, but transacted as commercial; conversion approval missing.',
      summaryBn: 'খতিয়ানে কৃষিজমি হিসেবে রেকর্ডভুক্ত, কিন্তু বাণিজ্যিক হিসেবে লেনদেন হচ্ছে; শ্রেণি পরিবর্তন ছাড়পত্র অনুপস্থিত।',
      whatDetected: 'Plot 201 is classified as Nal (ধানি কৃষিজমি) in RS Khatian 440 with 3 years of land tax arrears. Transaction intended for commercial factory setup.',
      whatDetectedBn: 'আরএস খতিয়ানে জমিটি নাল (কৃষি) শ্রেণিভুক্ত এবং ৩ বছরের কর বকেয়া। অথচ এটি বাণিজ্যিক শিল্প কারখানা হিসেবে বিক্রয়ের চুক্তি হচ্ছে।',
      whyItMatters: 'Converting agricultural land to non-agricultural or industrial usage requires prior statutory approval from the Deputy Commissioner (DC) and Environment Department. Unapproved conversion risks demolition or sealing.',
      whyItMattersBn: 'জেলা প্রশাসকের অনুমতি ব্যতীত কৃষিজমির শ্রেণি পরিবর্তন করে শিল্প স্থাপন করা ভূমি সংস্কার আইন পরিপন্থী। এতে কারখানা স্থাপন স্থগিত বা সিলগালা হতে পারে।',
      missingInfo: 'DC Office Land Class Conversion Clearance (শ্রেণি পরিবর্তন অনুমতি), DCR payment receipt, and Environmental clearance.',
      missingInfoBn: 'জেলা প্রশাসকের রাজস্ব শাখা থেকে শ্রেণি পরিবর্তনের চূড়ান্ত আদেশ ও হাল সনের বাণিজ্যিক কর দাখিলা অনুপস্থিত।',
      whatToVerifyNext: [
        'Require the seller to produce the verified Land Conversion Order issued by the Deputy Commissioner.',
        'Inspect the Upazila master plan and agricultural protection demarcations.',
        'Calculate back taxes and penal interest on commercial conversion before pricing the deal.',
      ],
      whatToVerifyNextBn: [
        'বিক্রেতার নিকট থেকে জেলা প্রশাসক কর্তৃক প্রদত্ত জমি ব্যবহারের বৈধ অনুমতিপত্র তলব করুন।',
        'উপজেলা মাস্টার প্ল্যানে এটি জলাশয় বা সংরক্ষিত কৃষিজমির তালিকায় আছে কিনা যাচাই করুন।',
        'বকেয়া কর ও শ্রেণি পরিবর্তনের সরকারি ফি সমন্বয়ের হিসাব চূড়ান্ত করুন।',
      ],
    };
  }

  // Scenario 7: Co-Sharer Pre-emption Objection (DEMO-PARCEL-007)
  if (parcel.id === 'DEMO-PARCEL-007') {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      summary: 'Co-sharer pre-emption objection lodged under SAT Act Section 96; mutation hearing contested.',
      summaryBn: 'ধারা ৯৬ অনুযায়ী শরিক কর্তৃক অগ্রক্রয় (Pre-emption) সংক্রান্ত আপত্তি দাখিল; নামজারি শুনানাধীন।',
      whatDetected: 'Formal legal objection lodged by co-sharer alleging transfer without mandatory statutory notice to family heirs. Mutation petition pending objection hearing.',
      whatDetectedBn: 'আইনসঙ্গত নোটিশ ছাড়া জমি বিক্রির অভিযোগে শরিক কর্তৃক সহকারী কমিশনার (ভূমি) অফিসে অগ্রক্রয়ের আপত্তি মামলা দায়েরকৃত।',
      whyItMatters: 'Under Section 96 of the State Acquisition and Tenancy Act, co-sharers possess a statutory pre-emption right to buy back undivided shares through court decree.',
      whyItMattersBn: 'এসএটি আইনের ৯৬ ধারা অনুযায়ী শরিকের অগ্রক্রয় স্বত্ব কার্যকর হলে ক্রেতাকে জমি ফেরত দিতে হতে পারে। শরিকি আপসের পূর্বে কেনা অত্যন্ত ঝুঁকিপূর্ণ।',
      missingInfo: 'Registered Partition Deed (আপস বণ্টননামা) demarcating separate shares and written co-sharer waiver.',
      missingInfoBn: 'রেজিস্ট্রিকৃত আপস বণ্টননামা দলিল এবং অন্যান্য ওয়ারিশানদের অনাপত্তিপত্র (NOC) অনুপস্থিত।',
      whatToVerifyNext: [
        'Insist on a registered partition deed between all legal heirs before buying undivided shares.',
        'Attend the AC (Land) hearing with your legal counsel or demand amicable compromise.',
        'Check succession certificate (ওয়ারিশান সনদ) issued by local municipal or union parishad.',
      ],
      whatToVerifyNextBn: [
        'অবিভক্ত জমিতে ক্রয়ের পূর্বে সকল ওয়ারিশের মধ্যে রেজিস্ট্রিকৃত বণ্টননামা দলিল সম্পাদন নিশ্চিত করুন।',
        'সহকারী কমিশনার (ভূমি) কোর্টে আপত্তির শুনানি ও আদেশের জন্য অপেক্ষা করুন।',
        'পৌরসভা বা ইউনিয়ন পরিষদ কর্তৃক প্রদত্ত মূল ওয়ারিশান সনদের সঠিকতা যাচাই করুন।',
      ],
    };
  }

  // Scenario 1: Recent transfer deed recorded, but mutation not completed
  if (deedEvent && !mutCompleteEvent) {
    return {
      label: 'Review Recommended',
      labelBn: 'বিশেষ পর্যালোচনা জরুরি',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
      summary: 'A recent registered deed / transfer event was recorded, but no completed mutation exists in available records.',
      summaryBn: 'সাম্প্রতিক সাব-রেজিস্ট্রি দলিল হস্তান্তর রেকর্ড পাওয়া গেছে, তবে নামজারি সম্পন্ন হওয়ার কোনো রেকর্ড নেই।',
      whatDetected: `Registered transfer deed logged on ${deedEvent.eventDate} (${deedEvent.maskedReference}), with statutory LT Notice dispatch to AC (Land). No completed mutation khatian recorded.`,
      whatDetectedBn: `${deedEvent.eventDate} তারিখে সাফ-কবলা হস্তান্তর দলিল সম্পাদন ও ধারা ৮৯ নোটিশ প্রেরণ পাওয়া গেছে। কিন্তু চূড়ান্ত নামজারি খতিয়ান পাওয়া যায়নি।`,
      whyItMatters: 'Under Bangladesh land law (SAT Act Sec 89 & Tenancy Rules), a registered deed does NOT update the revenue record of rights. The seller might have sold the property or multiple conflicting deeds might exist before mutation.',
      whyItMattersBn: 'বাংলাদেশে কেবল রেজিস্ট্রিকৃত দলিল দিয়ে মালিকানা সম্পূর্ণ হয় না; এসএএলটি আইনের ধারা ৮৯ অনুযায়ী সহকারী কমিশনার (ভূমি) দ্বারা নামজারি ও দাখিলা হালনাগাদ না হলে রাজস্ব রেকর্ডে ক্রেতার নাম ওঠে না।',
      missingInfo: 'e-Mutation proceeding case number, AC (Land) formal approval order, and updated mutation khatian with current Dakhila receipts.',
      missingInfoBn: 'ই-নামজারি কেস নম্বর, সহকারী কমিশনার (ভূমি)-র চূড়ান্ত অনুমোদন আদেশ ও হাল সনের ভূমি উন্নয়ন কর দাখিলা অনুপস্থিত।',
      whatToVerifyNext: [
        'Check whether an e-mutation case has been initiated at mutation.land.gov.bd.',
        'Inspect the original deed chain (Baya Deeds) covering the last 25 years at the Sub-Registry Office.',
        'Verify that the seller is in undisputed physical possession and has paid land development tax up to date.',
      ],
      whatToVerifyNextBn: [
        'mutation.land.gov.bd পোর্টালে এই দলিলের ভিত্তিতে কোনো নামজারি আবেদন চলমান আছে কিনা যাচাই করুন।',
        'সাব-রেজিস্ট্রি অফিস থেকে গত ২৫ বছরের বায়া দলিলের ধারাবাহিকতা ও তল্লাশ (Nil Search) সম্পন্ন করুন।',
        'বিক্রেতা জমিতে স্বত্ববান ও কার্যকর দখলে আছেন কিনা এবং হাল সনের খাজনা পরিশোধিত কিনা যাচাই করুন।',
      ],
    };
  }

  // Scenario 2: Mutation application submitted, but pending/incomplete
  if (mutAppEvent && !mutCompleteEvent) {
    return {
      label: 'Information Incomplete',
      labelBn: 'তথ্য অসম্পূর্ণ / শুনানাধীন',
      badgeColor: 'bg-blue-50 text-blue-900 border-blue-300',
      summary: 'An e-Mutation petition is recorded as submitted and pending hearing, but no approval order is found.',
      summaryBn: 'ই-নামজারি আবেদন জমা হয়েছে এবং শুনানাধীন রয়েছে, কিন্তু চূড়ান্ত অনুমোদন বা খতিয়ান জারির তথ্য নেই।',
      whatDetected: `Mutation application ${mutAppEvent.maskedReference} logged on ${mutAppEvent.eventDate}. Process is pending at the local AC (Land) circle.`,
      whatDetectedBn: `${mutAppEvent.eventDate} তারিখে নামজারি আবেদন (${mutAppEvent.maskedReference}) দাখিল হয়েছে, যা বর্তমানে সার্কেল কোর্টে শুনানাধীন।`,
      whyItMatters: 'Submitting a mutation application is NOT proof of ownership or approval. Many applications face formal objections or get rejected during field inspection by the Union Land Assistant Officer (ULAO).',
      whyItMattersBn: 'নামজারি আবেদন জমা দেওয়া মানেই অনুমোদন নয়। ইউনিয়ন ভূমি সহকারী কর্মকর্তার (নায়েব) তদন্ত প্রতিবেদনে ত্রুটি থাকলে আবেদন বাতিল বা স্থগিত হতে পারে।',
      missingInfo: 'Final hearing order, approval status, payment of official mutation fees, and issuance of Mutation Porcha/Khatian.',
      missingInfoBn: 'শুনানির চূড়ান্ত আদেশ, সরকারি ডিসিআর ফি পরিশোধের রসিদ এবং নতুন নামজারি খতিয়ান প্রকাশনা অনুপস্থিত।',
      whatToVerifyNext: [
        'Track the ongoing mutation case status directly on mutation.land.gov.bd using the application ID.',
        'Confirm if any third-party objection (আপত্তি) has been lodged against the application.',
        'Do not execute final payment or registry until the AC (Land) issues the formal mutation order and Khatian.',
      ],
      whatToVerifyNextBn: [
        'mutation.land.gov.bd পোর্টালে আবেদন ট্র্যাকিং করে মামলার বর্তমান ধাপ পর্যবেক্ষণ করুন।',
        'উক্ত আবেদনে কোনো তৃতীয় পক্ষ আপত্তি বা মামলা দায়ের করেছে কিনা তা ইউনিয়ন ভূমি অফিস থেকে নিশ্চিত হোন।',
        'নামজারি খতিয়ান চূড়ান্ত না হওয়া পর্যন্ত চূড়ান্ত লেনদেন স্থগিত রাখার পরামর্শ দেওয়া হলো।',
      ],
    };
  }

  // Scenario 3: Mutation completed in available data
  if (mutCompleteEvent) {
    return {
      label: 'No Major Issue Detected in Available Data',
      labelBn: 'উপলব্ধ ডেটায় কোনো বড় অসঙ্গতি পাওয়া যায়নি',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      summary: 'Mutation completed and updated Record of Rights logged in available demo records.',
      summaryBn: 'উপলব্ধ ডেমো ডেটায় নামজারি নিষ্পত্তি এবং হালনাগাদ খতিয়ান জারির তথ্য পাওয়া গেছে।',
      whatDetected: `Mutation completed order issued on ${mutCompleteEvent.eventDate} (${mutCompleteEvent.maskedReference}). Khatian ${parcel.khatianNumber} recorded.`,
      whatDetectedBn: `${mutCompleteEvent.eventDate} তারিখে সহকারী কমিশনার (ভূমি) কর্তৃক নামজারি আদেশ অনুমোদিত ও খতিয়ান হালনাগাদ রেকর্ডভুক্ত হয়েছে।`,
      whyItMatters: 'Revenue records correlate with legal mutation proceedings. However, this is NOT a guarantee of title; civil court litigations or unrecorded family disputes may still exist.',
      whyItMattersBn: 'রাজস্ব রেকর্ডের সাথে নামজারি সংগতিপূর্ণ। তবে এটি কোনো নিরঙ্কুশ আইনি নিশ্চয়তা নয়; দেওয়ানি আদালতে কোনো মোকদ্দমা বা ওয়ারিশান বিরোধ থাকতে পারে।',
      missingInfo: 'Civil court non-encumbrance certificate, physical demarcation beacon verification, and recent Dakhila receipts.',
      missingInfoBn: 'দেওয়ানি আদালতের মামলার ইতিহাস, সরজমিন সীমানা পিলার ও হাল সনের দাখিলার মূল কপি যাচাই সাপেক্ষ।',
      whatToVerifyNext: [
        'Obtain a physically certified copy of the Mutation Porcha and Dakhila from the AC (Land) office.',
        'Conduct a 12-to-25-year title search at the Sub-Registry Office to verify no other deeds were registered.',
        'Physically inspect the plot boundaries, access roads, and current occupants on site.',
      ],
      whatToVerifyNextBn: [
        'উপজেলা ভূমি অফিস থেকে নামজারি খতিয়ান ও ডিসিআর-এর সার্টিফাইড মূল কপি সংগ্রহ করুন।',
        'সাব-রেজিস্ট্রি অফিসে ১২ থেকে ২৫ বছরের তল্লাশ (Search) দিয়ে জমিটি অন্য কোথাও হস্তান্তরিত নয় কিনা নিশ্চিত হোন।',
        'সরজমিনে গিয়ে জমির বাস্তব সীমানা ও দখলদারিত্ব প্রত্যক্ষ করুন।',
      ],
    };
  }

  // Default / Incomplete
  return {
    label: 'Information Incomplete',
    labelBn: 'তথ্য অসম্পূর্ণ',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    summary: 'Insufficient transaction signals available in the sample records for conclusive analysis.',
    summaryBn: 'উপলব্ধ নমুনা রেকর্ডে সুনির্দিষ্ট বিশ্লেষণের জন্য প্রয়োজনীয় সংকেত অপ্রতুল।',
    whatDetected: 'Minimal data points found for this parcel identifier.',
    whatDetectedBn: 'এই দাগের জন্য পর্যাপ্ত ডেমো ডেটা রেকর্ড পাওয়া যায়নি।',
    whyItMatters: 'Decisions made on incomplete data carry risks of unknown encumbrances or pending disputes.',
    whyItMattersBn: 'অসম্পূর্ণ তথ্যের ওপর নির্ভর করে লেনদেন করলে অজানা দায় বা বিরোধের ঝুঁকি থাকে।',
    missingInfo: 'Complete transaction history, mutation timeline, and latest survey records.',
    missingInfoBn: 'সম্পূর্ণ হস্তান্তর ইতিহাস, নামজারি টাইমলাইন ও সর্বশেষ জরিপ খতিয়ান অনুপস্থিত।',
    whatToVerifyNext: [
      'Visit the local Upazila Land Office (AC Land) with all historical documents.',
      'Obtain certified copies of CS, SA, and RS porchas from the District Record Room.',
    ],
    whatToVerifyNextBn: [
      'প্রয়োজনীয় কাগজপত্রসহ স্থানীয় উপজেলা ভূমি অফিস (এসি ল্যান্ড) পরিদর্শন করুন।',
      'জেলা রেকর্ড রুম থেকে সিএস, এসএ ও আরএস পর্চার সার্টিফাইড কপি উত্তোলন করুন।',
    ],
  };
}
