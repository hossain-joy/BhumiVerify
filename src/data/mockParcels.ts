import { ParcelReference, LandEvent } from '../types';

export interface FictionalFinding {
  title: string;
  titleBn?: string;
  whyItMatters: string;
  whyItMattersBn?: string;
  sampleEvidence: string;
  sampleEvidenceBn?: string;
  missingInfo: string;
  missingInfoBn?: string;
  nextStep: string;
  nextStepBn?: string;
}

export interface FictionalParcelRecord {
  id: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber: string | null;
  khatianNumber: string;
  dagNumber: string;
  area: string | null;
  areaUnit: string;
  landClassification: string | null;
  landClassificationBn?: string | null;
  updatedDate: string;
  statusKey: 'no_major_issue' | 'review_recommended' | 'information_incomplete';
  statusExplanation: string;
  statusExplanationBn?: string;
  findings: FictionalFinding[];
  missingInformation: string[];
  missingInformationBn?: string[];
  recommendedNextSteps: string[];
  recommendedNextStepsBn?: string[];
  events: {
    id: string;
    type: 'transfer_related' | 'mutation_application' | 'mutation_completed';
    title: string;
    titleBn?: string;
    date: string | null;
    reference: string | null;
    explanation: string;
    explanationBn?: string;
  }[];
}

export const MOCK_PARCELS: FictionalParcelRecord[] = [
  // 1. Consistent sample information
  // Status: "No Major Issue Detected in Available Data" (Never "Safe")
  {
    id: 'BS-DEMO-001',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Gulshan',
    mouza: 'Gulshan',
    jlNumber: '24',
    khatianNumber: '541',
    dagNumber: '85',
    area: '6.50',
    areaUnit: 'Decimal',
    landClassification: 'Residential / Bastu',
    landClassificationBn: 'আবাসিক / বাস্তুভিটা',
    updatedDate: '2026-03-15',
    statusKey: 'no_major_issue',
    statusExplanation: 'The available record reflects a consistent sequence of registered deed, mutation petition, and completed mutation order. Standard pre-purchase verification remains necessary.',
    statusExplanationBn: 'উপলব্ধ রেকর্ডে নিবন্ধিত দলিল, নামজারি আবেদন এবং চূড়ান্ত নামজারি আদেশের ধারাবাহিকতা লক্ষ্য করা গেছে। তবে সাধারণ প্রাক-ক্রয় যাচাই এখনো আবশ্যক।',
    findings: [
      {
        title: 'Documented Transfer and Mutation Sequence',
        titleBn: 'দলিল হস্তান্তর ও নামজারির ধারাবাহিক তথ্য বিদ্যমান',
        whyItMatters: 'A registered transfer deed was followed by a formal mutation petition and an approved mutation order in the available records.',
        whyItMattersBn: 'উপলব্ধ রেকর্ডে একটি রেজিস্ট্রিকৃত হস্তান্তর দলিলের পর যথানিয়মে নামজারি আবেদন এবং অনুমোদিত নামজারি আদেশ পাওয়া গেছে।',
        sampleEvidence: 'Transfer Deed DEED-DEMO-5541 registered on 2024-05-10, followed by e-Mutation order MUT-ORD-9011 on 2024-07-18.',
        sampleEvidenceBn: '১০ মে ২০২৪ তারিখে রেজিস্ট্রিকৃত হস্তান্তর দলিল DEED-DEMO-5541 এবং ১৮ জুলাই ২০২৪ তারিখে অনুমোদিত ই-নামজারি আদেশ MUT-ORD-9011।',
        missingInfo: 'Civil court non-litigation certificate and recent physical demarcation beacon verification.',
        missingInfoBn: 'দেওয়ানি আদালতের নির্দায়/মামলামুক্ত সনদ এবং সরেজমিনে সাম্প্রতিক সীমানা পিলারের সঠিক অবস্থান।',
        nextStep: 'Obtain certified physical copies of the Mutation Porcha and tax dakhila from the AC (Land) office, and verify physical possession on site.',
        nextStepBn: 'সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি পর্চা ও ভূমি উন্নয়ন করের দাখিলার সার্টিফাইড কপি সংগ্রহ করুন এবং সরেজমিনে দখল নিশ্চিত করুন।',
      },
    ],
    missingInformation: [
      'Original volume book entry at Sub-Registry Office (requires physical nil search)',
      'Ground boundary pillar demarcation and physical access road verification',
      'Civil court non-encumbrance certificate (not recorded)',
    ],
    missingInformationBn: [
      'সাব-রেজিস্ট্রি অফিসের মূল বালাম বই তল্লাশ (১২-২৫ বছরের সশরীরে নীল সার্চ আবশ্যক)',
      'জমির সীমানা পিলার নির্ধারণ এবং চলাচলের বাস্তব রাস্তা সংক্রান্ত তথ্য',
      'দেওয়ানি আদালত থেকে নির্দায় বা মামলাহীন সনদ (রেকর্ড নেই)',
    ],
    recommendedNextSteps: [
      'Compare all parcel identifiers with original and certified record copies.',
      'Independently verify the current record and mutation status through appropriate official channels.',
      'Conduct an in-person title search (Nil Search) for unrecorded encumbrances at the Sub-Registry Office.',
      'Physically inspect plot boundaries, access roads, and current occupants on site.',
      'Do not make a financial transaction based solely on digital records; conduct physical verification.',
    ],
    recommendedNextStepsBn: [
      'মূল ও সার্টিফাইড নথির সাথে খতিয়ান ও দাগ নম্বরের তথ্যের মিল নিশ্চিত করুন।',
      'উপযুক্ত সরকারি দপ্তর থেকে বর্তমান নামজারি ও জমাভাগ স্থিতি স্বাধীনভাবে যাচাই করুন।',
      'সাব-রেজিস্ট্রি অফিসে সশরীরে বালাম বহিতে ১২ থেকে ২৫ বছরের নীল সার্চ (তল্লাশ) সম্পন্ন করুন।',
      'সরেজমিনে সীমানা পিলার, প্রবেশাধিকার পথ এবং বর্তমান দখলদারের অবস্থান প্রত্যক্ষভাবে পরিদর্শন করুন।',
      'শুধুমাত্র ডিজিটাল তথ্যের ওপর ভিত্তি করে আর্থিক লেনদেনের সিদ্ধান্ত নেবেন না; সরেজমিন যাচাই করুন।',
    ],
    events: [
      {
        id: 'EVT-001-A',
        type: 'transfer_related',
        title: 'Registered Transfer Deed Executed',
        titleBn: 'রেজিস্ট্রিকৃত হস্তান্তর দলিল সম্পাদন',
        date: '2024-05-10',
        reference: 'DEED-DEMO-5541',
        explanation: 'Indicates that a deed was registered between parties at the Sub-Registry Office. A deed alone does not update government revenue records.',
        explanationBn: 'সাব-রেজিস্ট্রি অফিসে দুই পক্ষের মধ্যে দলিল রেজিস্ট্রি হয়েছে। কেবল দলিল রাজস্ব রেকর্ডে কোনো নাম পরিবর্তন করে না।',
      },
      {
        id: 'EVT-001-B',
        type: 'mutation_application',
        title: 'e-Mutation Application Submitted',
        titleBn: 'ই-নামজারি আবেদন দাখিলকৃত',
        date: '2024-06-02',
        reference: 'MUT-APP-8842',
        explanation: 'A formal petition filed with the Assistant Commissioner (Land) to open a new mutation khatian and transfer revenue liability.',
        explanationBn: 'সহকারী কমিশনার (ভূমি) বরাবর নতুন নামজারি খতিয়ান খোলা ও রাজস্ব দায় হস্তান্তরের জন্য আবেদন জমা দেওয়া হয়েছে।',
      },
      {
        id: 'EVT-001-C',
        type: 'mutation_completed',
        title: 'Mutation Order Approved & RoR Issued',
        titleBn: 'নামজারি আদেশ অনুমোদিত ও পর্চা জারি',
        date: '2024-07-18',
        reference: 'MUT-ORD-9011',
        explanation: 'AC (Land) formally approved the petition, issued a new mutated Khatian, and opened a new Jamabandi ledger.',
        explanationBn: 'সহকারী কমিশনার (ভূমি) আবেদনটি অনুমোদন করেছেন, নতুন নামজারি খতিয়ান জারি করেছেন এবং জমাভাগ নিশ্চিত করেছেন।',
      },
    ],
  },

  // 2. Review recommended
  // Includes transfer-related event and mutation application, but no completion event in the sample.
  {
    id: 'BS-DEMO-002',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Tejgaon',
    mouza: 'Tejgaon I/A',
    jlNumber: '14',
    khatianNumber: '1204',
    dagNumber: '402',
    area: '5.25',
    areaUnit: 'Decimal',
    landClassification: 'Commercial / Factory Plot',
    landClassificationBn: 'বাণিজ্যিক / কারখানা প্লট',
    updatedDate: '2026-02-20',
    statusKey: 'review_recommended',
    statusExplanation: 'A transfer deed and mutation application are recorded, but no completion event is recorded. Completion must be checked independently.',
    statusExplanationBn: 'একটি হস্তান্তর দলিল এবং নামজারি আবেদন রেকর্ড করা হয়েছে, তবে কোনো নামজারি নিষ্পত্তির আদেশ নথিবদ্ধ নেই। এটি সরেজমিনে যাচাই করা আবশ্যক।',
    findings: [
      {
        title: 'Mutation Application Filed Without Completion Event',
        titleBn: 'নামজারি আবেদন করা হলেও চূড়ান্ত নিষ্পত্তির তথ্য অনুপস্থিত',
        whyItMatters: 'Under Bangladesh land law (SAT Act Section 89), a registered transfer deed does not update government records until the AC (Land) signs a final mutation order. The application may be pending, contested, or rejected.',
        whyItMattersBn: 'বাংলাদেশের ভূমি আইন (SAT আইনের ধারা ৮৯) অনুযায়ী, সহকারী কমিশনার (ভূমি) চূড়ান্ত নামজারি আদেশ অনুমোদন না করা পর্যন্ত দলিলের মাধ্যমে রাজস্ব স্বত্ব প্রতিষ্ঠা হয় না। আবেদনটি শুনানাধীন, আপত্তিযুক্ত বা বাতিল হতে পারে।',
        sampleEvidence: 'Deed DEED-DEMO-9912 logged on 2025-08-14 and mutation petition MUT-APP-4421 filed on 2025-09-01; no completion order is recorded.',
        sampleEvidenceBn: '১৪ আগস্ট ২০২৫ তারিখের দলিল DEED-DEMO-9912 এবং ১ সেপ্টেম্বর ২০২৫ তারিখের আবেদন MUT-APP-4421 অন্তর্ভুক্ত; তবে কোনো চূড়ান্ত আদেশ নেই।',
        missingInfo: 'Final hearing order, official DCR receipt, and newly issued mutation khatian.',
        missingInfoBn: 'চূড়ান্ত শুনানির আদেশ, অফিসিয়াল ডিসিআর (DCR) রসিদ এবং নতুন নামজারি খতিয়ান।',
        nextStep: 'Track petition MUT-APP-4421 on mutation.land.gov.bd and verify at the Tejgaon Revenue Circle whether any objection has been lodged.',
        nextStepBn: 'mutation.land.gov.bd পোর্টালে MUT-APP-4421 ট্র্যাকিং করুন এবং তেজগাঁও রাজস্ব সার্কেলে কোনো পক্ষ আপত্তি দাখিল করেছে কিনা তা যাচাই করুন।',
      },
    ],
    missingInformation: [
      'AC (Land) formal approval order and Jamabandi update (not recorded)',
      'Official DCR fee payment receipt and issued Mutation Khatian',
      'Up-to-date Land Development Tax Dakhila in current claimant’s name',
      'Record of co-sharer notification under SAT Act Section 89',
    ],
    missingInformationBn: [
      'সহকারী কমিশনার (ভূমি)-র আনুষ্ঠানিক নামজারি অনুমোদন এবং জমাভাগ হালনাগাদ (নথিবদ্ধ নেই)',
      'অফিসিয়াল ডিসিআর ফি পরিশোধের রসিদ ও নতুন নামজারি খতিয়ান',
      'বর্তমান দাবিদারের নামে সাম্প্রতিক ভূমি উন্নয়ন কর পরিশোধের দাখিলা',
      'SAT আইনের ধারা ৮৯ অনুযায়ী শরিকদের প্রতি নোটিশ জারির নথিপত্র',
    ],
    recommendedNextSteps: [
      'Track ongoing mutation petition MUT-APP-4421 directly through official AC (Land) channels.',
      'Do not disburse full payment or proceed to registry until a formal mutation order is approved.',
      'Review the underlying registered deed and relevant supporting documents.',
      'Confirm whether any co-sharer or interested party has filed an objection.',
      'Consult a qualified land professional or lawyer.',
    ],
    recommendedNextStepsBn: [
      'অফিশিয়াল ভূমি অফিস চ্যানেলের মাধ্যমে চলমান নামজারি আবেদন MUT-APP-4421 সরাসরি ট্র্যাক করুন।',
      'চূড়ান্ত নামজারি আদেশ অনুমোদন না হওয়া পর্যন্ত সম্পূর্ণ অর্থ পরিশোধ করবেন না।',
      'মূল রেজিস্ট্রিকৃত বায়া দলিল ও সংশ্লিষ্ট সমর্থনকারী নথিপত্র পুঙ্খানুপুঙ্খভাবে পরীক্ষা করুন।',
      'কোনো ওয়ারিশ বা শরিক পক্ষ লিখিত আপত্তি জানিয়েছে কিনা তা রাজস্ব সার্কেলে খোঁজ নিন।',
      'একজন অভিজ্ঞ ভূমি আইনজীবী বা বিশেষজ্ঞের আইনি পরামর্শ গ্রহণ করুন।',
    ],
    events: [
      {
        id: 'EVT-002-A',
        type: 'transfer_related',
        title: 'Registered Transfer Deed Recorded',
        titleBn: 'রেজিস্ট্রিকৃত হস্তান্তর দলিল নথিবদ্ধ',
        date: '2025-08-14',
        reference: 'DEED-DEMO-9912',
        explanation: 'Deed executed at the Sub-Registry. Does not prove that the buyer has valid revenue title until mutation is complete.',
        explanationBn: 'সাব-রেজিস্ট্রি অফিসে দলিল সম্পাদিত হয়েছে। নামজারি সম্পন্ন না হওয়া পর্যন্ত ক্রেতার নামে সরকারি রাজস্ব স্বত্ব প্রতিষ্ঠা হয় না।',
      },
      {
        id: 'EVT-002-B',
        type: 'mutation_application',
        title: 'e-Mutation Application Filed & Pending Hearing',
        titleBn: 'ই-নামজারি আবেদন দাখিলকৃত এবং শুনানাধীন',
        date: '2025-09-01',
        reference: 'MUT-APP-4421',
        explanation: 'An application is active. Does not mean mutation is granted; petitions may be rejected during field inquiry.',
        explanationBn: 'একটি আবেদন সক্রিয় রয়েছে। এর অর্থ এই নয় যে নামজারি অনুমোদিত হয়েছে; মাঠপর্যায়ের তদন্তে আবেদন বাতিলও হতে পারে।',
      },
    ],
  },

  // 3. Information incomplete
  // Limited event history and missing supporting identifiers/details.
  {
    id: 'BS-DEMO-003',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    mouza: 'Dhanmondi R/A',
    jlNumber: '08',
    khatianNumber: '88',
    dagNumber: '118',
    area: null,
    areaUnit: 'Decimal',
    landClassification: null,
    landClassificationBn: 'অনির্দিষ্ট / নথিতে নেই',
    updatedDate: '2025-11-05',
    statusKey: 'information_incomplete',
    statusExplanation: 'Records contain limited event information and missing parcel details (e.g. area and deed baseline are unavailable).',
    statusExplanationBn: 'রেকর্ডে সীমিত ঘটনা প্রবাহ পাওয়া গেছে এবং জমির মূল তথ্যাদি (যেমন: জমির সঠিক পরিমাপ ও মূল দলিলের ভিত্তি) অনুপস্থিত।',
    findings: [
      {
        title: 'Underlying Deed Baseline and Land Area Missing',
        titleBn: 'মূল বায়া দলিলের ভিত্তি ও জমির পরিমাণ অনুপস্থিত',
        whyItMatters: 'Without recorded transfer deed details or land acreage, the basis and extent of ownership cannot be evaluated from these records.',
        whyItMattersBn: 'হস্তান্তর দলিলের বিস্তারিত বিবরণ বা জমির সুনির্দিষ্ট আয়তন ছাড়া মালিকানার ভিত্তি ও ব্যাপ্তি নিরূপণ করা সম্ভব নয়।',
        sampleEvidence: 'Mutation application MUT-APP-3019 is logged on 2025-10-12 without prior deed references or recorded land area.',
        sampleEvidenceBn: '১২ অক্টোবর ২০২৫ তারিখে দাখিলকৃত আবেদন MUT-APP-3019 রয়েছে, তবে পূর্বতন কোনো দলিল নম্বর বা জমির পরিমাণ উল্লেখ নেই।',
        missingInfo: 'Acreage measurement, registered deed reference, and 25-year chain of title (Baya deeds).',
        missingInfoBn: 'জমির শতাংশের পরিমাপ, রেজিস্ট্রিকৃত দলিলের রেফারেন্স এবং ২৫ বছরের বায়া দলিলের চেইন।',
        nextStep: 'Request certified copies of the baseline registered deed, inheritance succession certificate (if applicable), and partition deed from the seller.',
        nextStepBn: 'বিক্রেতার নিকট থেকে মূল বায়া দলিলের সার্টিফাইড কপি, প্রযোজ্য ক্ষেত্রে ওয়ারিশান সনদ এবং বাটোয়ারা দলিল সংগ্রহ করুন।',
      },
    ],
    missingInformation: [
      'Demarcated land area and boundaries (not recorded)',
      'Underlying registered transfer deed number and registration volume book reference',
      'Historical survey continuity (CS, SA, and RS sheets)',
      'Land Development Tax clearance history',
    ],
    missingInformationBn: [
      'জমির সীমানা এবং পরিমাপের নির্দিষ্ট বিবরণ (রেকর্ড নেই)',
      'মূল রেজিস্ট্রিকৃত বায়া দলিল নম্বর ও বালাম বইয়ের ভলিউম রেফারেন্স',
      'জরিপের ঐতিহাসিক ধারাবাহিকতা (সিএস, এসএ এবং আরএস পর্চা)',
      'ভূমি উন্নয়ন কর পরিশোধের পূর্বাপর ছাড়পত্র',
    ],
    recommendedNextSteps: [
      'Compare all parcel identifiers with original and certified record copies.',
      'Require the seller to produce the complete 25-year chain of Baya deeds.',
      'Independently verify the current record and mutation status through appropriate official channels.',
      'Consult a qualified land lawyer before paying any deposit or advance.',
    ],
    recommendedNextStepsBn: [
      'মূল ও সার্টিফাইড দলিলের সাথে মৌজা, খতিয়ান ও দাগ নম্বরের তথ্যের মিল মিলিয়ে নিন।',
      'বিক্রেতার কাছ থেকে বিগত ২৫ বছরের নিরবচ্ছিন্ন বায়া দলিলের সম্পূর্ণ চেইন তলব করুন।',
      'সংশ্লিষ্ট রাজস্ব ও রেজিস্ট্রি অফিস থেকে বর্তমান স্বত্ব ও নামজারি স্থিতি যাচাই করুন।',
      'বায়না বা অগ্রিম টাকা পরিশোধের পূর্বে একজন অভিজ্ঞ ভূমি আইনজীবীর পরামর্শ নিন।',
    ],
    events: [
      {
        id: 'EVT-003-A',
        type: 'mutation_application',
        title: 'e-Mutation Petition Submitted',
        titleBn: 'ই-নামজারি আবেদন দাখিলকৃত',
        date: '2025-10-12',
        reference: 'MUT-APP-3019',
        explanation: 'Online petition submitted to Dhanmondi AC (Land). No prior deed or subsequent approval order is recorded.',
        explanationBn: 'ধানমন্ডি সহকারী কমিশনার (ভূমি) বরাবর অনলাইন আবেদন দাখিল। পূর্বের দলিল বা পরবর্তী অনুমোদনের তথ্য নথিবদ্ধ নেই।',
      },
    ],
  },

  // 4. Test Scenario: JL Number Conflict
  // Demonstrates: if composite matches but JL differs, produces conflict result!
  {
    id: 'BS-DEMO-004',
    division: 'Chattogram',
    district: 'Chattogram',
    upazila: 'Panchlaish',
    mouza: 'Nasirabad',
    jlNumber: '32',
    khatianNumber: '210',
    dagNumber: '210',
    area: '8.00',
    areaUnit: 'Decimal',
    landClassification: 'Commercial',
    landClassificationBn: 'বাণিজ্যিক',
    updatedDate: '2026-01-10',
    statusKey: 'review_recommended',
    statusExplanation: 'The record contains a bank mortgage lien and a Power of Attorney notation. If a different JL number is entered, a conflict is detected.',
    statusExplanationBn: 'এই রেকর্ডে ব্যাংক মর্টগেজ (দায়) এবং আমমোক্তারনামা নোট রয়েছে। ভিন্ন জেএল নম্বর প্রবেশ করালে অসঙ্গতি ধরা পড়ে।',
    findings: [
      {
        title: 'Registered Bank Mortgage Lien on Record',
        titleBn: 'রেকর্ডে রেজিস্ট্রিকৃত ব্যাংক মর্টগেজ দায় বিদ্যমান',
        whyItMatters: 'A registered mortgage creates a legal charge over the parcel. Land cannot be validly transferred without formal lender clearance.',
        whyItMattersBn: 'একটি রেজিস্ট্রিকৃত বন্ধক জমির ওপর আর্থিক আইনি দায় সৃষ্টি করে। ঋণদাতার আনুষ্ঠানিক দায়মুক্তির সনদ ছাড়া জমি হস্তান্তর বৈধ হয় না।',
        sampleEvidence: 'Registered charge MTG-DEMO-771 in favor of Agrani Bank PLC.',
        sampleEvidenceBn: 'অগ্রণী ব্যাংক পিএলসি-র অনুকূলে রেজিস্ট্রিকৃত দায় MTG-DEMO-771।',
        missingInfo: 'Written mortgage redemption release certificate from the bank.',
        missingInfoBn: 'ব্যাংক কর্তৃক প্রদত্ত লিখিত বন্ধকমুক্তি বা অনাপত্তিপত্র (NOC)।',
        nextStep: 'Obtain formal written confirmation from the lender regarding full loan settlement and release of original title deeds.',
        nextStepBn: 'সম্পূর্ণ ঋণ পরিশোধ এবং মূল দলিল ছাড়পত্র সম্পর্কে ব্যাংক থেকে লিখিত নিশ্চিতকরণ সংগ্রহ করুন।',
      },
    ],
    missingInformation: [
      'Bank Non-Encumbrance clearance certificate (not recorded)',
      'Power of Attorney validity and revocation check',
    ],
    missingInformationBn: [
      'ব্যাংকের নির্দায় সনদপত্র / এনওসি (নথিবদ্ধ নেই)',
      'আমমোক্তারনামার বর্তমান বৈধতা বা বাতিলের অনুসন্ধান রিপোর্ট',
    ],
    recommendedNextSteps: [
      'Verify with the bank that the mortgage liability has been fully satisfied.',
      'Review original deed custody with the lending institution.',
      'Independently verify the current record and mutation status through official channels.',
    ],
    recommendedNextStepsBn: [
      'সংশ্লিষ্ট ব্যাংকে গিয়ে ঋণদায় সম্পূর্ণ পরিশোধিত হয়েছে কিনা তা যাচাই করুন।',
      'আর্থিক প্রতিষ্ঠানের কাছে মূল দলিল জমা আছে কিনা তা নিশ্চিত করুন।',
      'অফিশিয়াল ভূমি অফিস ও সাব-রেজিস্ট্রির মাধ্যমে বর্তমান স্বত্ব পর্যালোচনা করুন।',
    ],
    events: [
      {
        id: 'EVT-004-A',
        type: 'transfer_related',
        title: 'Power of Attorney Registered',
        titleBn: 'আমমোক্তারনামা রেজিস্ট্রি হয়েছে',
        date: '2024-02-15',
        reference: 'POA-DEMO-102',
        explanation: 'Registered irrevocable POA. Requires verification that the principal is alive and has not revoked authority.',
        explanationBn: 'রেজিস্ট্রিকৃত অপরাজেয় আমমোক্তারনামা। মূলদাতা জীবিত আছেন কিনা এবং ক্ষমতা প্রত্যাহার করেননি তা যাচাই করা প্রয়োজন।',
      },
      {
        id: 'EVT-004-B',
        type: 'transfer_related',
        title: 'Bank Mortgage Charge Registered',
        titleBn: 'ব্যাংক মর্টগেজ দায় রেজিস্ট্রিকৃত',
        date: '2024-06-30',
        reference: 'MTG-DEMO-771',
        explanation: 'Formal financial mortgage registered with Agrani Bank PLC.',
        explanationBn: 'অগ্রণী ব্যাংক পিএলসির অনুকূলে জমিটি বন্ধক রেখে আনুষ্ঠানিক আর্থিক চার্জ রেজিস্ট্রি করা হয়েছে।',
      },
    ],
  },

  // 5 & 6. Test Scenario: Ambiguous Match (Two records share identical composite keys)
  {
    id: 'BS-DEMO-005',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    mouza: 'Aminbazar',
    jlNumber: '45',
    khatianNumber: '999',
    dagNumber: '999',
    area: '10.00',
    areaUnit: 'Decimal',
    landClassification: 'Nal / Agricultural',
    landClassificationBn: 'নাল / কৃষি জমি',
    updatedDate: '2025-09-18',
    statusKey: 'review_recommended',
    statusExplanation: 'Historical SA Survey sheet for Dag 999. Inconsistent with RS sheet.',
    statusExplanationBn: 'দাগ ৯৯৯-এর ঐতিহাসিক এসএ জরিপের খতিয়ান। আরএস খতিয়ানের সাথে পরিমাপে অমিল রয়েছে।',
    findings: [
      {
        title: 'Survey Discrepancy Across Cadastral Sheets',
        titleBn: 'ক্যাডাস্ট্রাল জরিপ পর্চায় পরিমাপের অসঙ্গতি',
        whyItMatters: 'SA sheet lists 10.00 decimal while RS revision lists 8.40 decimal, indicating an unresolved boundary or acreage variance.',
        whyItMattersBn: 'এসএ পর্চায় জমির পরিমাণ ১০.০০ শতাংশ উল্লেখ থাকলেও আরএস সংশোধনীতে ৮.৪০ শতাংশ দেখানো হয়েছে, যা সীমানা বা পরিমাপের বিরোধ নির্দেশ করে।',
        sampleEvidence: 'Cadastral records SA Khatian 999 vs RS revision map.',
        sampleEvidenceBn: 'এসএ খতিয়ান ৯৯৯ বনাম আরএস খতিয়ান ও সংশোধিত মৌজা নকশা।',
        missingInfo: 'Reconciled field survey map and joint demarcation decree.',
        missingInfoBn: 'সমন্বিত সরেজমিন জরিপ নকশা এবং সীমানা বিরোধ নিষ্পত্তির ডিক্রি।',
        nextStep: 'Commission an independent physical ameen survey before proceeding.',
        nextStepBn: 'আর্থিক লেনদেনের পূর্বে একজন স্বাধীন ও দক্ষ আমিন দ্বারা জমিটি সরেজমিনে মেপে নিন।',
      },
    ],
    missingInformation: [
      'Reconciled joint field survey map',
      'Court decree verification on boundary disputes',
    ],
    missingInformationBn: [
      'উভয় জরিপের সমন্বিত সীমানা নির্ধারণী নকশা',
      'সীমানা বা পরিমাপ সংক্রান্ত আদালতের কোনো রায় বা ডিক্রির কপি',
    ],
    recommendedNextSteps: [
      'Resolve inconsistent identifiers with the appropriate land office before paying.',
      'Compare parcel identifiers with original and certified record copies.',
    ],
    recommendedNextStepsBn: [
      'টাকা পরিশোধের পূর্বে সংশ্লিষ্ট সহকারী কমিশনার (ভূমি) অফিসে গিয়ে খতিয়ানের অমিল নিষ্পত্তি করুন।',
      'মূল ও সার্টিফাইড পর্চার দাগ ও সীমানার সাথে বাস্তব জমির মাপ তুলনা করুন।',
    ],
    events: [
      {
        id: 'EVT-005-A',
        type: 'transfer_related',
        title: 'Historical SA Porcha Logged',
        titleBn: 'ঐতিহাসিক এসএ পর্চা নথিবদ্ধ',
        date: '2023-01-15',
        reference: 'SA-PORCHA-999',
        explanation: 'Historical state acquisition record of rights.',
        explanationBn: 'ঐতিহাসিক এসএ স্বত্বলিপি রেকর্ড।',
      },
    ],
  },
  {
    id: 'BS-DEMO-006',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    mouza: 'Aminbazar',
    jlNumber: '46', // Differs by JL
    khatianNumber: '999',
    dagNumber: '999',
    area: '8.40',
    areaUnit: 'Decimal',
    landClassification: 'Viti / Commercial',
    landClassificationBn: 'ভিটি / বাণিজ্যিক',
    updatedDate: '2025-10-22',
    statusKey: 'review_recommended',
    statusExplanation: 'Modern RS revision sheet for Dag 999. Inconsistent with SA sheet.',
    statusExplanationBn: 'দাগ ৯৯৯-এর আধুনিক আরএস সংশোধনী পর্চা। এসএ পর্চার সাথে পরিমাপে অমিল রয়েছে।',
    findings: [
      {
        title: 'Modern RS Revision with Altered Acreage',
        titleBn: 'আধুনিক আরএস সংশোধনীতে জমির পরিমাপে পরিবর্তন',
        whyItMatters: 'Acreage reduced from 10.00 to 8.40 decimal in recent survey; possible government acquisition or boundary adjustment.',
        whyItMattersBn: 'সাম্প্রতিক জরিপে জমির পরিমাণ ১০.০০ থেকে কমে ৮.৪০ শতাংশ হয়েছে; সরকারি অধিগ্রহণ বা সীমানা সংশোধনের সম্ভাবনা রয়েছে।',
        sampleEvidence: 'RS Khatian 999 dated 2025-10-22.',
        sampleEvidenceBn: '২২ অক্টোবর ২০২৫ তারিখের আরএস খতিয়ান ৯৯৯।',
        missingInfo: 'Gazette notification of land acquisition or compensation records.',
        missingInfoBn: 'ভূমি অধিগ্রহণের সরকারি গেজেট বিজ্ঞপ্তি বা ক্ষতিপূরণ পরিশোধের প্রমাণ।',
        nextStep: 'Check Savar Upazila revenue records for Section 4 acquisition notices.',
        nextStepBn: 'সাভার উপজেলা রাজস্ব অফিসে ধারা ৪ অনুযায়ী অধিগ্রহণ নোটিশ রয়েছে কিনা অনুসন্ধান করুন।',
      },
    ],
    missingInformation: [
      'Acquisition gazette records',
      'Up-to-date revised field book (Khasra)',
    ],
    missingInformationBn: [
      'সরকারি অধিগ্রহণ গেজেট নথিপত্র',
      'হালনাগাদ সংশোধিত মাঠ খসড়া বই',
    ],
    recommendedNextSteps: [
      'Resolve inconsistent identifiers with the AC (Land) office.',
      'Consult a qualified land professional.',
    ],
    recommendedNextStepsBn: [
      'সহকারী কমিশনার (ভূমি) অফিসের মাধ্যমে খতিয়ানের তথ্যের অমিল দূর করুন।',
      'একজন অভিজ্ঞ ভূমি বিশেষজ্ঞ বা সার্ভেয়ারের পরামর্শ নিন।',
    ],
    events: [
      {
        id: 'EVT-006-A',
        type: 'transfer_related',
        title: 'Modern RS Porcha Logged',
        titleBn: 'আধুনিক আরএস পর্চা নথিবদ্ধ',
        date: '2025-10-22',
        reference: 'RS-PORCHA-999',
        explanation: 'RS record of rights showing altered acreage.',
        explanationBn: 'সংশোধিত পরিমাপ প্রদর্শনকারী আরএস স্বত্বলিপি রেকর্ড।',
      },
    ],
  },

  // 7. Test Scenario: Empty event timeline
  // Demonstrates graceful empty timeline handling
  {
    id: 'BS-DEMO-007',
    division: 'Sylhet',
    district: 'Sylhet',
    upazila: 'Kotwali',
    mouza: 'Zindabazar',
    jlNumber: '19',
    khatianNumber: '64',
    dagNumber: '64',
    area: '4.10',
    areaUnit: 'Decimal',
    landClassification: 'Commercial',
    landClassificationBn: 'বাণিজ্যিক',
    updatedDate: '2025-08-01',
    statusKey: 'information_incomplete',
    statusExplanation: 'No event records are found in the system. This does not establish that no events exist in reality.',
    statusExplanationBn: 'সিস্টেমে কোনো ঘটনার রেকর্ড পাওয়া যায়নি। এর অর্থ এই নয় যে বাস্তবে জমিটির কোনো অতীত ইতিহাস নেই।',
    findings: [
      {
        title: 'No Transaction Events Recorded',
        titleBn: 'কোনো লেনদেন বা হস্তান্তরের ঘটনা নথিবদ্ধ নেই',
        whyItMatters: 'The absence of recorded events does not guarantee an unencumbered or quiet title in reality.',
        whyItMattersBn: 'কোনো ঘটনা নথিবদ্ধ না থাকা বাস্তবে জমিটি সম্পূর্ণ নিষ্কণ্টক তা প্রমাণ করে না।',
        sampleEvidence: 'No transaction events found in registry index for BS-DEMO-007.',
        sampleEvidenceBn: 'BS-DEMO-007 রেকর্ডের ঘটনা তালিকায় কোনো লেনদেন পাওয়া যায়নি।',
        missingInfo: 'All transaction history, deed registers, and mutation petitions.',
        missingInfoBn: 'সম্পূর্ণ লেনদেনের ইতিহাস, রেজিস্ট্রি বালাম বই এবং নামজারি আবেদনের রেকর্ড।',
        nextStep: 'Conduct a comprehensive in-person title search at the Sub-Registry and AC (Land) offices.',
        nextStepBn: 'সাব-রেজিস্ট্রি এবং এসি (ল্যান্ড) অফিসে গিয়ে সশরীরে পূর্ণাঙ্গ মালিকানা তল্লাশ চালান।',
      },
    ],
    missingInformation: [
      'Transfer deed registers at Sub-Registry Office',
      'Mutation and RoR petitions at AC (Land) Office',
      'Land Development Tax dakhilas',
    ],
    missingInformationBn: [
      'সাব-রেজিস্ট্রি অফিসের দলিল রেজিস্ট্রি বালাম বহি',
      'সহকারী কমিশনার (ভূমি) অফিসের নামজারি ও জমাভাগ নথিপত্র',
      'ভূমি উন্নয়ন কর পরিশোধের দাখিলাসমূহ',
    ],
    recommendedNextSteps: [
      'Do not assume absence of records means clear title.',
      'Independently verify the current record and mutation status through official channels.',
      'Consult a qualified land professional.',
    ],
    recommendedNextStepsBn: [
      'তথ্য অনুপস্থিত থাকার অর্থ জমি নির্ভেজাল—এমন ভুল ধারণা পোষণ করবেন না।',
      'অফিশিয়াল চ্যানেলের মাধ্যমে বর্তমান রেকর্ড ও নামজারি স্থিতি স্বাধীনভাবে যাচাই করুন।',
      'একজন অভিজ্ঞ ভূমি আইনজীবীর সঙ্গে পরামর্শ করুন।',
    ],
    events: [],
  },

  // 8. Test Scenario: Missing event date and reference
  // Demonstrates: missing/null dates and references do not crash rendering
  {
    id: 'BS-DEMO-008',
    division: 'Gazipur',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    mouza: 'Joydebpur',
    jlNumber: '11',
    khatianNumber: '301',
    dagNumber: '201',
    area: '12.50',
    areaUnit: 'Decimal',
    landClassification: 'Nal / Agricultural',
    landClassificationBn: 'নাল / কৃষি জমি',
    updatedDate: '2026-01-05',
    statusKey: 'review_recommended',
    statusExplanation: 'Records contain historical events with unverified dates and references.',
    statusExplanationBn: 'রেকর্ডে এমন কিছু ঘটনা রয়েছে যার সুনির্দিষ্ট তারিখ ও রেফারেন্স উল্লেখ নেই।',
    findings: [
      {
        title: 'Event Records with Incomplete Date or Reference Metadata',
        titleBn: 'তারিখ বা রেফারেন্সবিহীন অসম্পূর্ণ ঘটনার রেকর্ড',
        whyItMatters: 'Events without verified dates or official reference numbers cannot be sequenced reliably and require manual ledger inspection.',
        whyItMattersBn: 'যাচাইকৃত তারিখ বা সরকারি রেফারেন্স নম্বর ছাড়া ঘটনাগুলো কালানুক্রমিকভাবে মেলানো কঠিন এবং ম্যানুয়াল বালাম পরিদর্শনের প্রয়োজন হয়।',
        sampleEvidence: 'Legacy transfer logged with unspecified date and reference.',
        sampleEvidenceBn: 'অতীতের একটি হস্তান্তর রেকর্ড পাওয়া গেছে যার তারিখ ও রেফারেন্স উল্লেখ নেই।',
        missingInfo: 'Exact registration date, volume book number, and deed receipt.',
        missingInfoBn: 'সুনির্দিষ্ট রেজিস্ট্রেশনের তারিখ, বালাম বই নম্বর ও দলিলের প্রাপ্তি রসিদ।',
        nextStep: 'Request the physical registered deed copy from the seller to ascertain exact execution and registration dates.',
        nextStepBn: 'সঠিক সম্পাদন ও রেজিস্ট্রেশনের তারিখ জানতে বিক্রেতার কাছ থেকে মূল রেজিস্ট্রিকৃত দলিলের কপি চেয়ে নিন।',
      },
    ],
    missingInformation: [
      'Official deed registration volume book and page numbers',
      'Exact execution date of legacy transaction',
    ],
    missingInformationBn: [
      'অফিসিয়াল বালাম বইয়ের ভলিউম ও পৃষ্ঠা নম্বর',
      'অতীতের লেনদেনটি সম্পাদনের সুনির্দিষ্ট তারিখ',
    ],
    recommendedNextSteps: [
      'Compare parcel identifiers with original and certified record copies.',
      'Review the underlying registered deed and supporting documents.',
    ],
    recommendedNextStepsBn: [
      'মূল ও সার্টিফাইড নথির সাথে দাগ ও খতিয়ান নম্বরের সত্যতা নিশ্চিত করুন।',
      'মূল রেজিস্ট্রিকৃত বায়া দলিল ও সংশ্লিষ্ট প্রমাণাদি পর্যালোচনা করুন।',
    ],
    events: [
      {
        id: 'EVT-008-A',
        type: 'transfer_related',
        title: 'Legacy Transfer Record (Unspecified Date)',
        titleBn: 'অতীতের হস্তান্তর রেকর্ড (তারিখ অনির্ধারিত)',
        date: null, // Test null date
        reference: null, // Test null reference
        explanation: 'Historical transaction noted in index without machine-readable date. App renders "Date not available".',
        explanationBn: 'সূচিপত্রে উল্লেখিত ঐতিহাসিক লেনদেন যেখানে ডিজিটাল তারিখ নেই। অ্যাপ "তারিখ পাওয়া যায়নি" প্রদর্শন করে।',
      },
      {
        id: 'EVT-008-B',
        type: 'mutation_application',
        title: 'Recent Mutation Petition Logged',
        titleBn: 'সাম্প্রতিক নামজারি আবেদন নথিবদ্ধ',
        date: '2025-11-20',
        reference: 'MUT-APP-9988',
        explanation: 'Mutation petition submitted online.',
        explanationBn: 'অনলাইনে নামজারি আবেদন জমা দেওয়া হয়েছে।',
      },
    ],
  },
];
