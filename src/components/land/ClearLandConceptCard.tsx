import React from 'react';
import { FictionalParcelRecord } from '../../data/mockParcels';
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  FileText,
  UserCheck,
  Scale,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
  AlertOctagon,
} from 'lucide-react';
import { toBengaliNumerals } from '../../utils/formatStatus';

interface ClearLandConceptCardProps {
  parcel: FictionalParcelRecord;
  isBn: boolean;
}

export const ClearLandConceptCard: React.FC<ClearLandConceptCardProps> = ({
  parcel,
  isBn,
}) => {
  const events = parcel.events || [];
  const hasTransfer = events.some((e) => e.type === 'transfer_related');
  const hasMutationApp = events.some((e) => e.type === 'mutation_application');
  const hasMutationDone = events.some((e) => e.type === 'mutation_completed');

  // Determine Land Concept Category
  const isNoMajorIssue = parcel.statusKey === 'no_major_issue';
  const isReviewRecommended = parcel.statusKey === 'review_recommended';
  const isIncomplete = parcel.statusKey === 'information_incomplete';

  // Extract transfer deed & mutation details if available
  const transferEvent = events.find((e) => e.type === 'transfer_related');
  const mutationAppEvent = events.find((e) => e.type === 'mutation_application');
  const mutationDoneEvent = events.find((e) => e.type === 'mutation_completed');

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-6 sm:p-7 shadow-xs space-y-6">
      {/* 1. Card Header with Clear Verdict Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-gov-primary border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-gov-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gov-primary">
                {isBn ? 'জমির স্বচ্ছ ও সুস্পষ্ট ধারণা' : 'Clear Land Concept & Verdict'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                {isBn ? 'সহজ বাংলায় বিশ্লেষণ' : 'Plain-Language Breakdown'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              {isNoMajorIssue
                ? isBn
                  ? 'মালিকানার ধারাবাহিকতা সঠিক রয়েছে — শর্তসাপেক্ষে বায়না বিবেচনাযোগ্য'
                  : 'Consistent Title Chain — Conditional Purchase Recommended'
                : isReviewRecommended
                ? isBn
                  ? 'সতর্কতা: নামজারি বা দলিলের তথ্যে অমিল — সমাধান না হওয়া পর্যন্ত বায়না ঝুঁকিপূর্ণ'
                  : 'Warning: Title Discrepancies — Hold Deposits Pending Review'
                : isBn
                ? 'রেকর্ড অসম্পূর্ণ — তথ্য হালনাগাদ ছাড়া আর্থিক লেনদেন থেকে বিরত থাকুন'
                : 'Incomplete Records — Do Not Transfer Funds Without Further Verification'}
            </h2>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="self-start sm:self-auto shrink-0">
          <span
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black inline-flex items-center gap-1.5 border shadow-2xs ${
              isNoMajorIssue
                ? 'bg-emerald-500 text-white border-emerald-600'
                : isReviewRecommended
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-blue-600 text-white border-blue-700'
            }`}
          >
            {isNoMajorIssue && <CheckCircle2 className="w-4 h-4" />}
            {isReviewRecommended && <AlertTriangle className="w-4 h-4" />}
            {isIncomplete && <HelpCircle className="w-4 h-4" />}
            <span>
              {isNoMajorIssue
                ? isBn
                  ? 'গ্রিন সিগন্যাল (অনুকূল)'
                  : 'Satisfactory Chain'
                : isReviewRecommended
                ? isBn
                  ? 'সতর্কবার্তা (পর্যালোচনা প্রয়োজন)'
                  : 'Review Needed'
                : isBn
                ? 'তথ্য অপর্যাপ্ত (অসম্পূর্ণ)'
                : 'Incomplete Record'}
            </span>
          </span>
        </div>
      </div>

      {/* 2. 4 Core Concept Pillars (মালিকানা, নামজারি, দখল ও নির্দায়তা) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: মালিকানা ও বায়া দলিলের ইতিহাস */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <UserCheck className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '১. মালিকানা ও বায়া দলিলের শৃঙ্খল' : '1. Ownership & Chain of Title'}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {isNoMajorIssue ? (
              isBn ? (
                <>
                  জমির সর্বশেষ রেজিস্ট্রিকৃত দলিলটি যথানিয়মে বিদ্যমান। বিক্রেতা পূর্ববর্তী বৈধ মালিকের কাছ থেকে ক্রয়সূত্রে বা রেজিস্ট্রিকৃত হস্তান্তরের মাধ্যমে স্বত্ব লাভ করেছেন এবং বায়া দলিলের ধারাবাহিকতায় কোনো বড় ফাঁক নেই।
                </>
              ) : (
                'The latest transfer deed is documented with clear lineage. The recorded owner acquired ownership via registered conveyance, with no apparent breaks in the recorded chain of title.'
              )
            ) : isReviewRecommended ? (
              isBn ? (
                <>
                  <strong className="text-amber-900">অমিল রয়েছে:</strong> হস্তান্তর দলিল রেজিস্ট্রি হলেও সর্বশেষ বিক্রেতার নামে নামজারি বা খতিয়ান প্রস্তুতের তথ্য এখনো অনুমোদিত হয়নি। বিক্রেতার নিজস্ব নামে সরকারি খতিয়ান না থাকলে জমি হস্তান্তর আইনি বিরোধ সৃষ্টি করতে পারে।
                </>
              ) : (
                'Break in chain: Transfer deed was executed but mutation in the current owner\'s name is unapproved. Selling land without an updated mutation khatian invites title contestation.'
              )
            ) : (
              isBn ? (
                <>
                  এই দাগ ও খতিয়ানের পূর্ববর্তী মালিকানা সংক্রান্ত বায়া দলিল বা রেজিস্ট্রি ভলিউম নম্বর কেন্দ্রীয় রেকর্ডে পাওয়া যায়নি। বিক্রেতার নিকট থেকে মূল দলিলের সার্টিফাইড কপি চেয়ে নেওয়া আবশ্যক।
                </>
              ) : (
                'Prior title deeds and volume index references are missing from available records. Certified copies of the original deeds must be demanded from the seller.'
              )
            )}
          </p>
          {transferEvent && (
            <div className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
              <span>{isBn ? 'সর্বশেষ দলিল সূত্র: ' : 'Latest Deed Ref: '}{transferEvent.reference || 'N/A'}</span>
              <span>{transferEvent.date ? (isBn ? toBengaliNumerals(transferEvent.date) : transferEvent.date) : ''}</span>
            </div>
          )}
        </div>

        {/* Pillar 2: নামজারি ও জমাভাগ স্থিতি */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <FileText className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '২. নামজারি ও খতিয়ানের অবস্থা' : '2. Mutation & Revenue Status'}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {hasMutationDone ? (
              isBn ? (
                <>
                  <span className="text-emerald-800 font-semibold">✓ নামজারি সম্পন্ন:</span> সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি মোকদ্দমা নিষ্পত্তি হয়ে আলাদা জোত/খতিয়ান এবং ডিসিআর (DCR) সংবলিত পর্চা জারি করা হয়েছে। ভূমি উন্নয়ন কর (খাজনা) পরিশোধের রেকর্ড হালনাগাদ রয়েছে।
                </>
              ) : (
                'Mutation Completed: The AC (Land) office has issued an approved e-mutation decree and separate DCR revenue khatian. Land development tax payments are current.'
              )
            ) : hasMutationApp ? (
              isBn ? (
                <>
                  <span className="text-amber-800 font-semibold">⚠ আবেদন চলমান:</span> নামজারির আবেদন জমা দেওয়া হলেও সহকারী কমিশনার (ভূমি) কর্তৃক চূড়ান্ত আদেশ এখনো হয়নি। আদেশ হওয়ার পূর্বে জমি কেনা সমীচীন নয়।
                </>
              ) : (
                'Application Pending: Mutation petition is submitted but final order is not granted. Purchasing land before formal decree approval carries significant risk.'
              )
            ) : (
              isBn ? (
                <>
                  <span className="text-rose-800 font-semibold">✗ নামজারি নেই:</span> ডিজিটাল রেকর্ডে কোনো নামজারি আদেশ পাওয়া যায়নি। জমিটি এখনও পূর্বের কোনো ওয়ারিশ বা মৃত ব্যক্তির নামে রয়ে গেছে কিনা তা খতিয়ে দেখতে হবে।
                </>
              ) : (
                'No Mutation Found: No approved mutation order is recorded. The parcel may still reside in the name of an ancestor or previous holder.'
              )
            )}
          </p>
          {mutationDoneEvent && (
            <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50/80 p-2 rounded border border-emerald-200">
              {isBn ? 'অনুমোদিত নামজারি আদেশ: ' : 'Approved Decree: '}{mutationDoneEvent.reference || 'MUT-ORD-VERIFIED'}
            </div>
          )}
        </div>

        {/* Pillar 3: শারীরিক দখল ও সীমানা স্থিতি */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <MapPin className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '৩. জমির বাস্তব দখল ও সীমানা' : '3. Physical Ground Possession'}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {isBn ? (
              <>
                জমির দাগ নম্বর <span className="font-mono font-bold text-slate-900">{parcel.dagNumber}</span> এবং পরিমাণ <span className="font-semibold text-slate-900">{parcel.area ? `${toBengaliNumerals(parcel.area)} শতাংশ` : 'অনির্ধারিত'}</span>। বাংলাদেশের ভূমি আইন অনুযায়ী <em>"কাগজ যার জমি তার"</em> প্রবাদ সত্য হলেও বাস্তবে বিক্রেতার <strong>শারীরিক দখল ও সীমানা পিলার</strong> না থাকলে কখনোই জমি কেনা নিরাপদ নয়।
              </>
            ) : (
              <>
                For Dag Number <span className="font-mono font-bold">{parcel.dagNumber}</span> ({parcel.area || 'N/A'} Decimal). Regardless of clean papers, physical boundary demarcation and uninterrupted possession by the seller remain legally mandatory.
              </>
            )}
          </p>
          <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
            {isBn
              ? 'পরামর্শ: মৌজা নকশা (Sheet) নিয়ে আমিন/সার্ভেয়ার দ্বারা চারদিকের সীমানা মেপে নিন।'
              : 'Action: Engage a certified surveyor with the official mouza map to verify perimeter boundaries.'}
          </div>
        </div>

        {/* Pillar 4: আইনি নির্দায়তা ও বন্ধক যাচাই */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Scale className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '৪. মামলা, বন্ধক ও নির্দায়তা যাচাই' : '4. Encumbrances & Nil Search'}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {isBn ? (
              <>
                ডিজিটাল ডাটাবেজ ব্যাংক বন্ধক (Mortgage) বা আদালতের স্থগিতাদেশ নিশ্চিত করে না। সাব-রেজিস্ট্রি অফিসে <strong>১২ থেকে ২৫ বছরের তল্লাশি (Nil Search)</strong> দিয়ে নিশ্চিত হতে হবে যে জমিটি কোনো ব্যাংক বা ব্যক্তির কাছে দায়বদ্ধ নয়।
              </>
            ) : (
              'Digital records do not capture off-ledger bank mortgages or court injunctions. A mandatory 12-25 year title search (Nil Search) must be conducted at the Sub-Registry Office.'
            )}
          </p>
          <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
            {isBn
              ? 'নির্দায়িতা: বিক্রেতার কাছে জাতীয় পরিচয়পত্র (NID) ও ওয়ারিশ সনদের সঠিকতা নিশ্চিত করুন।'
              : 'Due Diligence: Verify seller NID authenticity and succession certificates before executing contracts.'}
          </div>
        </div>
      </div>

      {/* 3. Actionable Buyer Verdict Box (ক্রেতার জন্য স্পষ্ট করণীয়) */}
      <div
        className={`p-5 rounded-2xl border ${
          isNoMajorIssue
            ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
            : isReviewRecommended
            ? 'bg-amber-50/90 border-amber-300 text-amber-950'
            : 'bg-blue-50/90 border-blue-300 text-blue-950'
        } space-y-3`}
      >
        <div className="flex items-center gap-2">
          {isNoMajorIssue ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          ) : isReviewRecommended ? (
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          ) : (
            <HelpCircle className="w-5 h-5 text-blue-700 shrink-0" />
          )}
          <h3 className="text-sm font-extrabold uppercase tracking-wide">
            {isBn ? 'ক্রেতার জন্য চূড়ান্ত রায় ও পরামর্শ (Buyer Verdict):' : 'Clear Decision & Advice for Prospective Buyer:'}
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-medium leading-relaxed">
          {isNoMajorIssue ? (
            isBn ? (
              <>
                <strong>জমিটি কেনার অনুকূল পরিবেশ রয়েছে।</strong> দলিলের ধারাবাহিকতা এবং নামজারি রেকর্ড ইতিবাচক। আপনি বিক্রেতার সাথে রেজিস্ট্রি বায়না চুক্তি করতে পারেন, তবে চূড়ান্ত রেজিস্ট্রির পূর্বে সাব-রেজিস্ট্রি অফিসে ১২ বছরের তল্লাশি রসিদ (Nil Search) এবং সরেজমিনে দখল নিশ্চিত করে নিন।
              </>
            ) : (
              'Favorable for purchase. The documentary chain of title and mutation records are consistent. You may proceed with an registered earnest money agreement (Baina), ensuring a 12-year Sub-Registry Nil Search and boundary inspection are concluded prior to final deed execution.'
            )
          ) : isReviewRecommended ? (
            isBn ? (
              <>
                <strong>এখনই বড় অঙ্কের টাকা বা বায়না দেওয়া উচিত হবে না।</strong> বিক্রেতাকে বলুন তার নিজের নামে এসি (ল্যান্ড) অফিস থেকে নামজারি পর্চা ও হালনাগাদ খাজনা দাখিলা সম্পন্ন করে দিতে। এটি সমাধান ছাড়া জমি কিনলে ভবিষ্যতে মালিকানা বিরোধ বা রেজিস্ট্রেশন বাতিল হওয়ার ঝুঁকি থাকে।
              </>
            ) : (
              'Do not commit large deposits or unregistered cash advances yet. Require the seller to resolve mutation in their name and provide certified AC (Land) porchas and tax receipts first.'
            )
          ) : (
            isBn ? (
              <>
                <strong>কাগজপত্র অসম্পূর্ণ।</strong> এই জমির রেকর্ডে যথেষ্ট তথ্যের ঘাটতি রয়েছে। সহকারী কমিশনার (ভূমি) অফিস এবং ইউনিয়ন ভূমি অফিস থেকে সিএস, এসএ ও আরএস খতিয়ানের মূল ভলিউম মিলিয়ে না দেখা পর্যন্ত কোনো লেনদেন করবেন না।
              </>
            ) : (
              'Information Incomplete. Substantial record elements are missing. Demand certified copies of CS, SA, and RS porchas from the local revenue circle before taking financial commitments.'
            )
          )}
        </p>

        {/* 3 Quick Mandatory Next Steps Checklist */}
        <div className="pt-2 border-t border-slate-300/40 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold block text-[11px] text-slate-800">
              {isBn ? '১. এসি (ল্যান্ড) অফিস' : '1. AC (Land) Office'}
            </span>
            <span className="text-[11px] text-slate-600 block">
              {isBn ? 'মূল নামজারি পর্চা ও ডি.সি.আর সংগ্রহ করুন' : 'Obtain certified mutation porcha & DCR'}
            </span>
          </div>

          <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold block text-[11px] text-slate-800">
              {isBn ? '২. সাব-রেজিস্ট্রি অফিস' : '2. Sub-Registry Office'}
            </span>
            <span className="text-[11px] text-slate-600 block">
              {isBn ? '১২ বছরের নীল সার্চ তল্লাশি চালান' : 'Execute 12-year Nil Search in Book 1'}
            </span>
          </div>

          <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold block text-[11px] text-slate-800">
              {isBn ? '৩. সরেজমিন পরিদর্শন' : '3. On-Site Physical Visit'}
            </span>
            <span className="text-[11px] text-slate-600 block">
              {isBn ? 'প্রতিবেশীদের সাথে কথা বলে দখল যাচাই করুন' : 'Verify ground possession with neighbors'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
