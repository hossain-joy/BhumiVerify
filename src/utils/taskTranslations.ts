export interface TranslatableTask {
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  notes?: string;
  notesBn?: string;
}

export const TASK_TEXT_TRANSLATIONS: Record<string, string> = {
  // Task 1: Mutation Porcha
  'obtain physically certified copy of mutation porcha': 'খারিজ পর্চার মূল সার্টিফাইড কপি সংগ্রহ',
  'obtain physically certified copy of mutation porcha from ac (land)': 'সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি পর্চার সার্টিফাইড কপি সংগ্রহ',
  'obtain certified copy of mutation porcha from ac (land)': 'সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি পর্চার সার্টিফাইড কপি সংগ্রহ',
  'visit gulshan revenue circle ac (land) office to obtain certified record of rights.': 'সহকারী কমিশনার (ভূমি) রাজস্ব সার্কেল অফিস থেকে খতিয়ানের সত্যায়িত পর্চা ও ডিসিআর সংগ্রহ করুন।',
  'apply at the local revenue circle office for a signed record of rights.': 'উপজেলা/সার্কেল ভূমি অফিস থেকে নামজারি অনুমোদনের সত্যায়িত খতিয়ান ও ডিসিআর সংগ্রহ করুন।',
  'visit the upazila/circle land revenue office to collect official certified record of rights.': 'উপজেলা/সার্কেল ভূমি অফিস থেকে নামজারি অনুমোদনের মোহরাঙ্কিত সার্টিফাইড খতিয়ান ও জমাভাগ যাচাই করুন।',
  'collected on 2026-03-21.': '২১-০৩-২০২৬ তারিখে সংগৃহীত হয়েছে।',

  // Task 2: Sub-Registry Nil Search
  'conduct sub-registry 12-to-25 year nil search': 'সাব-রেজিস্ট্রি অফিসে ১২ থেকে ২৫ বছরের তল্লাশি (নিল সার্চ)',
  'conduct nil search at sub-registry office (book 1 & 2)': 'সাব-রেজিস্ট্রি অফিসে বালাম তল্লাশি (১২-২৫ বছরের নিল সার্চ)',
  'conduct nil search at sub-registry office (12–25 years)': 'সাব-রেজিস্ট্রি অফিসে ১২-২৫ বছরের বালাম তল্লাশি (Nil Search)',
  'conduct nil search at sub-registry office (12-25 years)': 'সাব-রেজিস্ট্রি অফিসে ১২-২৫ বছরের বালাম তল্লাশি (Nil Search)',
  'verify volume indexes for undisclosed mortgages or prior deeds.': 'অপ্রকাশিত ব্যাংক বন্ধক বা পূর্ববর্তী দলিলের ইতিহাস নিশ্চিত করতে বালাম বই তল্লাশি করুন।',
  'search indexes for at least 12-25 years to uncover unrecorded transfers.': 'অপ্রকাশিত কোনো রেজিস্ট্রি দলিল বা ব্যাংক বন্ধক রয়েছে কি না তা নিশ্চিত করতে বালাম তল্লাশি করুন।',
  'search book 1 indexes for at least 12-25 years to uncover unrecorded transfers, mortgages, or duplicate deeds.': '১ নম্বর বালামের ইনডেক্স তল্লাশ করে অপ্রকাশিত কোনো রেজিস্ট্রি দলিল, ব্যাংক বন্ধক বা পাওয়ার অব অ্যাটর্নি রয়েছে কি না তা নিশ্চিত করুন।',
  'search slip filed with deed writer; awaiting volume inspection report.': 'তল্লাশির স্লিপ দলিল লেখকের কাছে জমা দেওয়া হয়েছে; বালাম বই পরিদর্শনের রিপোর্টের অপেক্ষায় রয়েছে।',

  // Task 3: On-site physical possession
  'physical on-site possession verification': 'জমির সরেজমিন বাস্তব দখল ও সীমানা যাচাই',
  'physical on-site possession and boundary verification': 'জমির সরেজমিন বাস্তব দখল ও সীমানা যাচাই',
  'on-site physical possession and boundary verification': 'মাঠপর্যায়ে সশরীরে দখল ও সীমানা নির্ধারণ যাচাই',
  'interview local neighbors and inspect boundary pillars on site.': 'সরেজমিনে গিয়ে প্রতিবেশীদের সাথে কথা বলুন এবং সীমানা পিলার ও আইল প্রত্যক্ষ করুন।',
  'interview adjacent plot occupants and inspect demarcations.': 'জমির চারপাশের সীমানা খুঁটি মেপে দেখুন এবং পার্শ্ববর্তী প্রতিবেশীদের সাথে সরেজমিনে কথা বলুন।',
  'inspect physical ground boundaries, boundary pillars, and interview adjacent landholders regarding real disputes.': 'জমির চারপাশের সীমানা খুঁটি এবং দাগের প্রকৃত অবস্থান মেপে দেখুন এবং পার্শ্ববর্তী প্রতিবেশীদের সাথে বিরোধের তথ্য যাচাই করুন।',
  'visited site on friday; boundaries aligned with mouza sheet.': 'শুক্রবার সরেজমিন পরিদর্শন সম্পন্ন; মৌজা নকশার সাথে সীমানার মিল পাওয়া গেছে।',

  // Task 4: e-Mutation tracking
  'track e-mutation case mut-app-4421 online': 'অনলাইনে ই-নামজারি কেস MUT-APP-4421 ট্র্যাক করুন',
  'check mutation.land.gov.bd to see if any hearing objection was lodged.': 'শুনানিতে কোনো আপত্তি জমা পড়েছে কি না তা mutation.land.gov.bd-তে যাচাই করুন।',

  // Task 5: Withhold final token
  'withhold final token/advance payment': 'চূড়ান্ত বায়না বা অবশিষ্ট মূল্য পরিশোধ স্থগিত রাখুন',
  'do not disburse full funds until ac (land) signs the mutation decree.': 'সহকারী কমিশনার (ভূমি) নামজারি আদেশ অনুমোদন না করা পর্যন্ত সম্পূর্ণ অর্থ ছাড় করবেন না।',
  'informed lawyer to hold funds in escrow.': 'আইনজীবীকে অর্থ এসক্রো বা স্থগিত রাখতে জানানো হয়েছে।',

  // Task 6: Section 89 LT Notice
  'check section 89 lt notice compliance': '৮৯ ধারা অনুযায়ী এলটি নোটিশ (LT Notice) পরিপালন যাচাই',
  'verify whether sub-registry formally transmitted the transfer notice to the revenue circle.': 'সাব-রেজিস্ট্রি অফিস থেকে রাজস্ব সার্কেলে হস্তান্তরিত জমির নোটিশ সঠিকভাবে পাঠানো হয়েছে কি না যাচাই করুন।',

  // Task 7: Chain of title
  'demand complete chain of title (baya deeds)': 'মালিকানার ধারাবাহিক বায়া দলিল যাচাই ও সংগ্রহ',
  'obtain all transfer deeds covering the last 25 years from the seller.': 'বিক্রেতার কাছ থেকে বিগত ২৫ বছরের সকল হস্তান্তরিত বায়া দলিলের কপি সংগ্রহ করুন।',

  // Task 8: Mouza map acreage
  'confirm plot acreage with certified mouza map': 'সত্যায়িত মৌজা নকশার সাথে দাগের পরিমাপ নিশ্চিত করুন',
  'measure ground dimensions against the official sheet.': 'অফিসিয়াল মৌজা নকশা অনুযায়ী জমির দৈর্ঘ্য, প্রস্থ ও পরিমাপ যাচাই করুন।',

  // Task 9: Bank NOC
  'obtain written bank noc and loan liquidation letter': 'ব্যাংকের লিখিত এনওসি (NOC) ও ঋণ দায়মুক্তি পত্র সংগ্রহ',
  'formal confirmation that mortgage charge mtg-demo-771 is fully settled.': 'বন্ধক চার্জ MTG-DEMO-771 সম্পূর্ণ পরিশোধিত হয়েছে মর্মে ব্যাংকের লিখিত প্রত্যয়নপত্র।',

  // Task 10: Power of attorney
  'verify power of attorney validity with principal': 'মূল মালিকের সাথে আমমোক্তারনামা (Power of Attorney) বৈধতা যাচাই',
  'confirm principal has not died or executed a deed of revocation.': 'মূল মালিক জীবিত আছেন কি না এবং আমমোক্তারনামা বাতিল করা হয়নি তা নিশ্চিত করুন।',

  // Common presets & recommendations
  'verify ld tax (dakhila) payment and treasury receipt': 'ভূমি উন্নয়ন কর (দাখিলা) পরিশোধ ও খাজনা দাখিলা যাচাই',
  'confirm current fiscal year land development tax receipt is genuine and recorded in union revenue records.': 'চলতি অর্থবছর পর্যন্ত ভূমি উন্নয়ন কর পরিশোধের দাখিলা ইউনিয়ন ভূমি অফিসে সঠিক রয়েছে কি না তা মিলিয়ে নিন।',
};

export function getTaskTitle(task: { title: string; titleBn?: string } | undefined | null, isBn: boolean): string {
  if (!task) return '';
  if (!isBn) return task.title || '';
  if (task.titleBn) return task.titleBn;
  const key = task.title?.trim().toLowerCase();
  return TASK_TEXT_TRANSLATIONS[key] || task.title;
}

export function getTaskDescription(task: { description: string; descriptionBn?: string } | undefined | null, isBn: boolean): string {
  if (!task) return '';
  if (!isBn) return task.description || '';
  if (task.descriptionBn) return task.descriptionBn;
  const key = task.description?.trim().toLowerCase();
  return TASK_TEXT_TRANSLATIONS[key] || task.description;
}

export function getTaskNotes(task: { notes?: string; notesBn?: string } | undefined | null, isBn: boolean): string | undefined {
  if (!task) return undefined;
  if (!task.notes && !task.notesBn) return undefined;
  if (!isBn) return task.notes || task.notesBn;
  if (task.notesBn) return task.notesBn;
  if (task.notes) {
    const key = task.notes.trim().toLowerCase();
    return TASK_TEXT_TRANSLATIONS[key] || task.notes;
  }
  return undefined;
}
