import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  FolderOpen,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { DiligenceSubNav } from '../../components/layout/DiligenceSubNav';

interface DocumentGuideItem {
  id: string;
  name: string;
  bengaliName: string;
  issuingAuthority: string;
  issuingAuthorityBn?: string;
  purpose: string;
  purposeBn?: string;
  sampleChecklist: string[];
  sampleChecklistBn?: string[];
  caveat: string;
  caveatBn?: string;
}

const BUYER_DOCUMENTS: DocumentGuideItem[] = [
  {
    id: 'DOC-1',
    name: '25-Year Chain of Registered Deeds (Baya Deeds)',
    bengaliName: '২৫ বছরের ধারাবাহিক বায়া দলিল',
    issuingAuthority: 'Sub-Registry Office (সাব-রেজিস্ট্রি অফিস)',
    issuingAuthorityBn: 'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস',
    purpose: 'Establishes continuous lawful transfer of ownership from previous title-holders to current seller.',
    purposeBn: 'পূর্ববর্তী মূল মালিকদের থেকে বর্তমান বিক্রেতার কাছে স্বত্ব হস্তান্তরের ধারাবাহিক আইনি বৈধতা প্রমাণ করে।',
    sampleChecklist: [
      'Original or certified copy of every deed in the chain',
      'Check whether previous sellers had lawful title to convey',
      'Confirm execution and volume registration stamps',
    ],
    sampleChecklistBn: [
      'ধারাবাহিক প্রতিটি বায়া দলিলের মূল বা অবিকল নকল (সার্টিফাইড কপি) সংগ্রহ',
      'পূর্ববর্তী বিক্রেতাদের হস্তান্তর করার পূর্ণ আইনি অধিকার ছিল কি না তা নিরূপণ',
      'রেজিস্ট্রি বালাম বইয়ের ভলিউম নম্বর ও স্ট্যাম্প পরীক্ষা',
    ],
    caveat: 'Missing deeds in the chain create high litigation risks of competing heir or lender claims.',
    caveatBn: 'বায়া দলিলের শিকলে একটি দলিল অনুপস্থিত থাকলেও পরবর্তীতে ওয়ারিশ বা পাওনাদারদের মামলা-মোকদ্দমার ঝুঁকি তৈরি হয়।',
  },
  {
    id: 'DOC-2',
    name: 'Certified Record of Rights (CS, SA, RS, BS/City Porcha)',
    bengaliName: 'সার্টিফাইড খতিয়ান (সিএস, এসএ, আরএস, বিএস পর্চা)',
    issuingAuthority: 'DC Office Record Room / AC (Land) Office',
    issuingAuthorityBn: 'জেলা প্রশাসকের রেকর্ড রুম / এসি (ল্যান্ড) অফিস',
    purpose: 'Documents government cadastral survey records establishing who held tenancy and land boundaries across successive surveys.',
    purposeBn: 'ধারাবাহিক সরকারি জরিপে জমির প্রজা, খতিয়ান, দাগ ও সীমানা কার নামে অন্তর্ভুক্ত ছিল তা যাচাই করে।',
    sampleChecklist: [
      'Confirm owner name matches seller’s predecessor',
      'Check whether the land is classified as Khas, Vested (Arpita), or Abandoned (Parittakta)',
      'Inspect Dag number continuity between SA and RS sheets',
    ],
    sampleChecklistBn: [
      'খতিয়ানের প্রজার নাম বিক্রেতার পূর্বপুরুষ বা দলিলের সাথে মিল আছে কি না তা যাচাই',
      'জমিটি খাস, অর্পিত (ভেস্টিড) বা পরিত্যক্ত তালিকার অন্তর্ভুক্ত কি না তা পরীক্ষা',
      'এসএ এবং আরএস ম্যাপে দাগ নম্বরের ধারাবাহিকতা ও পরিবর্তন মিলিয়ে দেখা',
    ],
    caveat: 'A printed computer slip is not a certified copy; always request a signed Porcha from the Collectorate Record Room.',
    caveatBn: 'কম্পিউটার থেকে প্রিন্ট করা খসড়া স্লিপ সার্টিফাইড কপি নয়; ডিসি অফিস রেকর্ড রুম থেকে মোহরাঙ্কিত পর্চা আবশ্যক।',
  },
  {
    id: 'DOC-3',
    name: 'Mutation Porcha (RoR) & DCR Fee Receipt',
    bengaliName: 'নামজারি খতিয়ান ও ডিসিআর রসিদ',
    issuingAuthority: 'Upazila / Circle Assistant Commissioner (Land) Office',
    issuingAuthorityBn: 'উপজেলা / সার্কেল সহকারী কমিশনার (ভূমি) অফিস',
    purpose: 'Proves the seller applied for and received formal approval to open a new Jamabandi ledger in their own name.',
    purposeBn: 'বিক্রেতা নিজের নামে সরকারের রাজস্ব দফতরে নতুন জমাভাগ খুলে নিজ নামে নামজারি অনুমোদন পেয়েছেন কি না তা প্রমাণ করে।',
    sampleChecklist: [
      'Check Mutation Khatian number and Jamabandi page number',
      'Verify DCR (Duplicate Carbon Receipt) payment receipt',
      'Ensure seller’s name is formally substituted for previous owner',
    ],
    sampleChecklistBn: [
      'নামজারি খতিয়ান নম্বর ও জমাভাগ বহির পৃষ্ঠা নম্বর যাচাই',
      'ডিসিআর (ডুপ্লিকেট কার্বন রসিদ) ফি পরিশোধের রসিদ যাচাই',
      'পূর্ববর্তী মালিকের নাম কর্তন করে বিক্রেতার নাম প্রতিস্থাপিত হয়েছে কি না তা নিশ্চিত হওয়া',
    ],
    caveat: 'A deed alone does NOT establish mutation. If mutation is in the seller’s father’s name, warisan partition is required.',
    caveatBn: 'শুধু দলিল থাকলেই মালিকানা নামজারি হয় না। পিতার নামে নামজারি থাকলে ওয়ারিশান বণ্টননামা ছাড়া জমি কেনা ঝুঁকিপূর্ণ।',
  },
  {
    id: 'DOC-4',
    name: 'Land Development Tax Receipt (LD Tax / Dakhila)',
    bengaliName: 'ভূমি উন্নয়ন কর পরিশোধের দাখিলা',
    issuingAuthority: 'Union / Circle Bhumi Office (ইউনিয়ন ভূমি অফিস)',
    issuingAuthorityBn: 'সংশ্লিষ্ট ইউনিয়ন ভূমি অফিস (তহশিল অফিস)',
    purpose: 'Proves taxes have been paid to the Government for the current Bengali calendar year and no rent arrears exist.',
    purposeBn: 'চলতি বাংলা সন পর্যন্ত সরকারি খাজনা পরিশোধ রয়েছে এবং কোনো বকেয়া দাবি নেই তা প্রমাণ করে।',
    sampleChecklist: [
      'Must be paid up to current 1432/1433 Bengali year',
      'Check owner name and exact plot Dag number on Dakhila',
      'Verify online QR code or manual counterfoil',
    ],
    sampleChecklistBn: [
      'চলতি বাংলা সন পর্যন্ত খাজনা হালনাগাদ পরিশোধিত কি না পরীক্ষা',
      'দাখিলা রসিদে মালিকের নাম ও নির্দিষ্ট দাগ নম্বর যথাযথভাবে উল্লেখ আছে কি না যাচাই',
      'অনলাইন কিউআর কোড বা ম্যানুয়াল কার্বন রসিদের সত্যতা যাচাই',
    ],
    caveat: 'Unpaid land tax can lead to Certificate Cases under the Public Demands Recovery Act.',
    caveatBn: 'খাজনা দীর্ঘকাল বকেয়া থাকলে সরকারি দাবি আদায় আইনে সার্টিফিকেট মামলা ও নিলামের ঝুঁকি থাকে।',
  },
  {
    id: 'DOC-5',
    name: 'Approved Mouza Map & Ameen Demarcation Report',
    bengaliName: 'অনুমোদিত মৌজা নকশা ও আমিন সীমানা প্রতিবেদন',
    issuingAuthority: 'Survey of Bangladesh / Directorate of Land Records and Surveys (DLRS)',
    issuingAuthorityBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (ডিএলআরএস)',
    purpose: 'Verifies the physical boundaries, shapes, and access roads on the ground against official survey sheets.',
    purposeBn: 'সরকারি নকশার সাথে জমির বাস্তব সীমানা, আকার ও চলাচলের রাস্তার অবস্থান মাঠপর্যায়ে নিশ্চিত করে।',
    sampleChecklist: [
      'Hire a neutral certified Ameen (surveyor)',
      'Confirm physical boundaries match the official mouza map',
      'Verify that adjacent plot owners do not claim encroachment',
    ],
    sampleChecklistBn: [
      'নিরপেক্ষ সার্টিফাইড আমিন দিয়ে জমি জরিপ ও সীমানা চিহ্নিতকরণ',
      'মৌজা নকশার সাথে জমির প্রকৃত সীমানা ও মাপের সামঞ্জস্য যাচাই',
      'পার্শ্ববর্তী দাগের মালিকদের কোনো সীমানা সংক্রান্ত বিরোধ বা আপত্তি নেই তা নিশ্চিত হওয়া',
    ],
    caveat: 'Paper area often differs from actual physical ground area. Never buy land without physical ground measurement.',
    caveatBn: 'কাগজে উল্লেখিত পরিমাণ অনেক সময় মাঠের প্রকৃত দখলের চেয়ে কম-বেশি হয়। জমিতে ফিতা ফেলে পরিমাপ ছাড়া জমি কিনবেন না।',
  },
  {
    id: 'DOC-6',
    name: 'Sub-Registry Nil Search (Form 52 Non-Encumbrance)',
    bengaliName: 'সাব-রেজিস্ট্রি ১২-২৫ বছরের নীল সার্চ ও নির্দায় সনদ',
    issuingAuthority: 'Sub-Registry Office Volume Inspection',
    issuingAuthorityBn: 'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস বালাম তল্লাশ',
    purpose: 'Checks Book 1 and Book 2 registry indexes for unrecorded deeds, prior sales, powers of attorney, or registered mortgages.',
    purposeBn: '১ ও ২ নম্বর বালাম বই তল্লাশ করে জমিটি পূর্বে অন্য কারো কাছে বিক্রি, আমমোক্তারনামা বা ব্যাংকে দায়বদ্ধ কি না তা পরীক্ষা করে।',
    sampleChecklist: [
      'Submit Form 52 inspection slip for at least 12–25 years',
      'Ensure no unrecorded sale agreement (Baina Nama) exists',
      'Search under both seller’s name and previous owners’ names',
    ],
    sampleChecklistBn: [
      'কমপক্ষে ১২ থেকে ২৫ বছরের জন্য ৫২ নম্বর ফরম দিয়ে বালাম বই তল্লাশ',
      'কোনো পূর্বতন বায়না চুক্তি বা গোপন রেজিস্ট্রি চুক্তি আছে কি না তা নিরূপণ',
      'বর্তমান বিক্রেতা এবং পূর্ববর্তী বায়া মালিকদের উভয়ের নামেই তল্লাশ পরিচালনা',
    ],
    caveat: 'Informal equitable mortgages with deposit of title deeds without registry will not appear in this search.',
    caveatBn: 'রেজিস্ট্রি ছাড়া শুধু মূল দলিল জমা দিয়ে ব্যাংকে ইকুইটেবল বন্ধক নেওয়া থাকলে তা বালাম তল্লাশে ধরা পড়বে না।',
  },
];

export const DocumentChecklistPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Due Diligence Workspace SubNav */}
      <DiligenceSubNav
        activeTab="documents"
        title={isBn ? 'আবশ্যকীয় দলিল চেকলিস্ট ও পরচা নির্দেশিকা' : 'Land Transaction Document Checklist'}
        subtitle={isBn
          ? 'বাংলাদেশে জমি কেনার পূর্বে আইনজীবী ও সংশ্লিষ্ট ভূমি অফিস থেকে সংগ্রহ ও যাচাই করার মূল দলিলসমূহ।'
          : 'Essential physical documents to collect, inspect, and verify with your advocate prior to purchasing land in Bangladesh.'}
      />

      {/* Disclosures & Privacy Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{isBn ? 'সাধারণ নির্দেশনা ও তথ্যের গোপনীয়তা' : 'General Guidance & Document Boundaries'}</span>
        </div>
        <p className="leading-relaxed">
          <strong>{isBn ? 'অনলাইনে কোনো দলিল আপলোডের প্রয়োজন নেই:' : 'No Online Uploads Required:'}</strong>{' '}
          {isBn
            ? 'ভূমিভেরিফাই আপনার কাছ থেকে কোনো স্ক্যান করা দলিল, জাতীয় পরিচয়পত্র বা সংবেদনশীল নথি আপলোড করতে বলে না। এটি জমি কেনার পূর্বে আপনার ব্যক্তিগত যাচাইকরণ চেকলিস্ট। চূড়ান্ত ক্রয়ের পূর্বে অবশ্যই কোনো অভিজ্ঞ ভূমি আইনজীবী অথবা সাব-রেজিস্ট্রি এবং এসি (ল্যান্ড) অফিসে সশরীরে যাচাই করুন।'
            : 'BhumiVerify does NOT ask you to upload sensitive scanned deeds, original title papers, or NID cards. This is a personal inspection tracker for pre-purchase vetting. Always confirm mandatory legal requirements with a qualified Bangladesh land lawyer or the local Sub-Registry and AC (Land) office.'}
        </p>
      </div>

      {/* Progress pill */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-800">{isBn ? 'আপনার যাচাই অগ্রগতি:' : 'Your Inspection Progress:'}</span>
          <span className="text-gov-primary font-bold">
            {isBn
              ? `মোট ${toBengaliNumerals(BUYER_DOCUMENTS.length)}টির মধ্যে ${toBengaliNumerals(completedCount)}টি দলিল সংগৃহীত/পরীক্ষিত`
              : `${completedCount} of ${BUYER_DOCUMENTS.length} documents collected/vetted`}
          </span>
        </div>
        <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gov-primary h-2 rounded-full transition-all"
            style={{ width: `${(completedCount / BUYER_DOCUMENTS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Document Items List */}
      <div className="space-y-4">
        {BUYER_DOCUMENTS.map((doc, idx) => {
          const isDone = !!checkedItems[doc.id];

          return (
            <div
              key={doc.id}
              className={`bg-white rounded-xl border p-5 shadow-2xs transition-all space-y-3 ${
                isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`doc-${doc.id}`}
                    checked={isDone}
                    onChange={() => toggleCheck(doc.id)}
                    className="w-4 h-4 mt-1 rounded border-slate-300 text-gov-primary focus:ring-gov-primary cursor-pointer"
                  />
                  <div>
                    <label
                      htmlFor={`doc-${doc.id}`}
                      className="text-sm font-bold text-slate-900 cursor-pointer block hover:text-gov-primary"
                    >
                      {isBn ? `${toBengaliNumerals(idx + 1)}. ${doc.bengaliName}` : `${idx + 1}. ${doc.name}`}
                    </label>
                    <span className="text-xs text-slate-500 font-medium">
                      {isBn ? doc.name : doc.bengaliName} • {isBn ? 'প্রদানকারী কর্তৃপক্ষ:' : 'Issued by:'} {isBn && doc.issuingAuthorityBn ? doc.issuingAuthorityBn : doc.issuingAuthority}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDone ? (isBn ? 'সংগৃহীত / পরীক্ষিত' : 'Vetted / In Hand') : (isBn ? 'বাকি' : 'Pending')}
                </span>
              </div>

              <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                <strong>{isBn ? 'কেন প্রয়োজন:' : 'Why it matters:'}</strong> {isBn && doc.purposeBn ? doc.purposeBn : doc.purpose}
              </p>

              <div className="pl-7 space-y-1.5 text-xs">
                <span className="font-semibold text-slate-700 block">{isBn ? 'যাচাই চেকলিস্ট:' : 'Inspection Checklist:'}</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  {(isBn && doc.sampleChecklistBn ? doc.sampleChecklistBn : doc.sampleChecklist).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pl-7 text-[11px] text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{isBn ? 'আইনি সতর্কতা:' : 'Legal caveat:'}</strong> {isBn && doc.caveatBn ? doc.caveatBn : doc.caveat}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
