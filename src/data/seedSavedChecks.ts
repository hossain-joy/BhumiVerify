export interface SavedVerificationTask {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  notes?: string;
  notesBn?: string;
  reminderDate?: string;
}

export interface SavedLandCheck {
  id: string;
  nickname: string;
  parcelId: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  khatianNumber: string;
  dagNumber: string;
  jlNumber?: string;
  area?: string;
  matchType: 'exact' | 'partial' | 'conflict' | 'ambiguous' | 'no_match';
  statusLabel: 'No Major Issue Detected in Available Data' | 'Review Recommended' | 'Information Incomplete';
  statusBadgeClass: string;
  summary: string;
  userNotes: string;
  createdAt: string;
  updatedAt: string;
  findingsCount: number;
  verificationTasks: SavedVerificationTask[];
}

export const SEED_SAVED_CHECKS: SavedLandCheck[] = [
  {
    id: 'CHK-2026-001',
    nickname: 'Gulshan Plot 85 - Family Purchase Review',
    parcelId: 'BS-DEMO-001',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Gulshan',
    mouza: 'Gulshan',
    khatianNumber: '541',
    dagNumber: '85',
    jlNumber: '24',
    area: '6.50 Decimal',
    matchType: 'exact',
    statusLabel: 'No Major Issue Detected in Available Data',
    statusBadgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    summary: 'The available record reflects a consistent sequence of registered deed, mutation petition, and completed mutation order.',
    userNotes: 'Broker confirmed physical boundary pillars exist. Need to cross-verify Dakhila receipt with AC Land office.',
    createdAt: '2026-03-20T09:30:00.000Z',
    updatedAt: '2026-03-22T14:15:00.000Z',
    findingsCount: 1,
    verificationTasks: [
      {
        id: 'TASK-1',
        title: 'Obtain physically certified copy of Mutation Porcha',
        titleBn: 'খারিজ পর্চার মূল সার্টিফাইড কপি সংগ্রহ',
        description: 'Visit Gulshan Revenue Circle AC (Land) office to obtain certified Record of Rights.',
        descriptionBn: 'সহকারী কমিশনার (ভূমি) রাজস্ব সার্কেল অফিস থেকে খতিয়ানের সত্যায়িত পর্চা ও ডিসিআর সংগ্রহ করুন।',
        status: 'completed',
        notes: 'Collected on 2026-03-21.',
        notesBn: '২১-০৩-২০২৬ তারিখে সংগৃহীত হয়েছে।',
      },
      {
        id: 'TASK-2',
        title: 'Conduct Sub-Registry 12-to-25 Year Nil Search',
        titleBn: 'সাব-রেজিস্ট্রি অফিসে ১২ থেকে ২৫ বছরের তল্লাশি (নিল সার্চ)',
        description: 'Verify volume indexes for undisclosed mortgages or prior deeds.',
        descriptionBn: 'অপ্রকাশিত ব্যাংক বন্ধক বা পূর্ববর্তী দলিলের ইতিহাস নিশ্চিত করতে বালাম বই তল্লাশি করুন।',
        status: 'in_progress',
        notes: 'Search slip filed with deed writer; awaiting volume inspection report.',
        notesBn: 'তল্লাশির স্লিপ দলিল লেখকের কাছে জমা দেওয়া হয়েছে; বালাম বই পরিদর্শনের রিপোর্টের অপেক্ষায় রয়েছে।',
        reminderDate: '2026-04-05',
      },
      {
        id: 'TASK-3',
        title: 'Physical on-site possession verification',
        titleBn: 'জমির সরেজমিন বাস্তব দখল ও সীমানা যাচাই',
        description: 'Interview local neighbors and inspect boundary pillars on site.',
        descriptionBn: 'সরেজমিনে গিয়ে প্রতিবেশীদের সাথে কথা বলুন এবং সীমানা পিলার ও আইল প্রত্যক্ষ করুন।',
        status: 'completed',
        notes: 'Visited site on Friday; boundaries aligned with mouza sheet.',
        notesBn: 'শুক্রবার সরেজমিন পরিদর্শন সম্পন্ন; মৌজা নকশার সাথে সীমানার মিল পাওয়া গেছে।',
      },
    ],
  },
  {
    id: 'CHK-2026-002',
    nickname: 'Tejgaon I/A Commercial Warehouse Plot',
    parcelId: 'BS-DEMO-002',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Tejgaon',
    mouza: 'Tejgaon I/A',
    khatianNumber: '1204',
    dagNumber: '402',
    jlNumber: '14',
    area: '5.25 Decimal',
    matchType: 'exact',
    statusLabel: 'Review Recommended',
    statusBadgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
    summary: 'A transfer deed and mutation application are recorded, but no completion event is included in available records. Completion must be checked independently.',
    userNotes: 'URGENT: Seller claims mutation is finished, but records indicate petition is still pending hearing.',
    createdAt: '2026-03-10T11:00:00.000Z',
    updatedAt: '2026-03-18T16:45:00.000Z',
    findingsCount: 1,
    verificationTasks: [
      {
        id: 'TASK-4',
        title: 'Track e-Mutation Case MUT-APP-4421 online',
        titleBn: 'অনলাইনে ই-নামজারি কেস MUT-APP-4421 ট্র্যাক করুন',
        description: 'Check mutation.land.gov.bd to see if any hearing objection was lodged.',
        descriptionBn: 'শুনানিতে কোনো আপত্তি জমা পড়েছে কি না তা mutation.land.gov.bd-তে যাচাই করুন।',
        status: 'in_progress',
        reminderDate: '2026-03-30',
      },
      {
        id: 'TASK-5',
        title: 'Withhold final token/advance payment',
        titleBn: 'চূড়ান্ত বায়না বা অবশিষ্ট মূল্য পরিশোধ স্থগিত রাখুন',
        description: 'Do not disburse full funds until AC (Land) signs the mutation decree.',
        descriptionBn: 'সহকারী কমিশনার (ভূমি) নামজারি আদেশ অনুমোদন না করা পর্যন্ত সম্পূর্ণ অর্থ ছাড় করবেন না।',
        status: 'completed',
        notes: 'Informed lawyer to hold funds in escrow.',
        notesBn: 'আইনজীবীকে অর্থ এসক্রো বা স্থগিত রাখতে জানানো হয়েছে।',
      },
      {
        id: 'TASK-6',
        title: 'Check Section 89 LT Notice compliance',
        titleBn: '৮৯ ধারা অনুযায়ী এলটি নোটিশ (LT Notice) পরিপালন যাচাই',
        description: 'Verify whether Sub-Registry formally transmitted the transfer notice to the revenue circle.',
        descriptionBn: 'সাব-রেজিস্ট্রি অফিস থেকে রাজস্ব সার্কেলে হস্তান্তরিত জমির নোটিশ সঠিকভাবে পাঠানো হয়েছে কি না যাচাই করুন।',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'CHK-2026-003',
    nickname: 'Dhanmondi R/A Residential Plot - Baseline Check',
    parcelId: 'BS-DEMO-003',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    mouza: 'Dhanmondi R/A',
    khatianNumber: '88',
    dagNumber: '118',
    jlNumber: '08',
    area: 'Not available in record',
    matchType: 'exact',
    statusLabel: 'Information Incomplete',
    statusBadgeClass: 'bg-blue-50 text-blue-900 border-blue-300',
    summary: 'Records contain limited event information and missing parcel details (e.g. area and deed baseline are unavailable).',
    userNotes: 'Acreage is missing from seller documents. Demanding original 25-year Baya deed chain.',
    createdAt: '2026-02-14T15:20:00.000Z',
    updatedAt: '2026-02-16T10:10:00.000Z',
    findingsCount: 1,
    verificationTasks: [
      {
        id: 'TASK-7',
        title: 'Demand complete chain of title (Baya deeds)',
        titleBn: 'মালিকানার ধারাবাহিক বায়া দলিল যাচাই ও সংগ্রহ',
        description: 'Obtain all transfer deeds covering the last 25 years from the seller.',
        descriptionBn: 'বিক্রেতার কাছ থেকে বিগত ২৫ বছরের সকল হস্তান্তরিত বায়া দলিলের কপি সংগ্রহ করুন।',
        status: 'in_progress',
      },
      {
        id: 'TASK-8',
        title: 'Confirm plot acreage with certified mouza map',
        titleBn: 'সত্যায়িত মৌজা নকশার সাথে দাগের পরিমাপ নিশ্চিত করুন',
        description: 'Measure ground dimensions against the official sheet.',
        descriptionBn: 'অফিসিয়াল মৌজা নকশা অনুযায়ী জমির দৈর্ঘ্য, প্রস্থ ও পরিমাপ যাচাই করুন।',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'CHK-2026-004',
    nickname: 'Nasirabad Chattogram Commercial Plot',
    parcelId: 'BS-DEMO-004',
    division: 'Chattogram',
    district: 'Chattogram',
    upazila: 'Panchlaish',
    mouza: 'Nasirabad',
    khatianNumber: '210',
    dagNumber: '210',
    jlNumber: '32',
    area: '8.00 Decimal',
    matchType: 'exact',
    statusLabel: 'Review Recommended',
    statusBadgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
    summary: 'Registered bank mortgage lien with Agrani Bank PLC and Power of Attorney recorded.',
    userNotes: 'Lender confirmed an active mortgage loan exists. Seller must clear debt before registry.',
    createdAt: '2026-01-28T12:00:00.000Z',
    updatedAt: '2026-02-05T09:30:00.000Z',
    findingsCount: 1,
    verificationTasks: [
      {
        id: 'TASK-9',
        title: 'Obtain written Bank NOC and Loan Liquidation Letter',
        titleBn: 'ব্যাংকের লিখিত এনওসি (NOC) ও ঋণ দায়মুক্তি পত্র সংগ্রহ',
        description: 'Formal confirmation that mortgage charge MTG-DEMO-771 is fully settled.',
        descriptionBn: 'বন্ধক চার্জ MTG-DEMO-771 সম্পূর্ণ পরিশোধিত হয়েছে মর্মে ব্যাংকের লিখিত প্রত্যয়নপত্র।',
        status: 'in_progress',
        reminderDate: '2026-04-10',
      },
      {
        id: 'TASK-10',
        title: 'Verify Power of Attorney validity with principal',
        titleBn: 'মূল মালিকের সাথে আমমোক্তারনামা (Power of Attorney) বৈধতা যাচাই',
        description: 'Confirm principal has not died or executed a deed of revocation.',
        descriptionBn: 'মূল মালিক জীবিত আছেন কি না এবং আমমোক্তারনামা বাতিল করা হয়নি তা নিশ্চিত করুন।',
        status: 'not_started',
      },
    ],
  },
];
