import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Disclaimer } from '../components/common/Disclaimer';
import {
  Scale,
  ShieldCheck,
  FileText,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Search,
  Building,
  Layers,
  ShieldAlert,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 animate-fade-up">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200 text-xs font-semibold">
              {isBn ? 'ভূমি মন্ত্রণালয় • আমাদের উদ্দেশ্য' : 'Ministry of Land • Platform Mission'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? 'ভূমিভেরিফাই (BhumiVerify) সম্পর্কে' : 'About BhumiVerify'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            {isBn
              ? 'Verify Before You Buy — জমি কেনার পূর্বে সম্ভাব্য লেনদেন ঝুঁকি ও করণীয় নিরূপণের প্রযুক্তিগত প্ল্যাটফর্ম।'
              : 'Verify Before You Buy — A pre-registration diligence platform for prospective land buyers in Bangladesh.'}
          </p>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 shadow-2xs p-1.5 shrink-0 flex items-center justify-center">
          <img src="/logo.png" alt="ভূমি মন্ত্রণালয় লোগো" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* 1. What BhumiVerify is intended to help with */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-gov-primary" aria-hidden="true" />
          <h2 className="text-base text-slate-900 font-bold">
            {isBn ? '১. ভূমিভেরিফাই কেন তৈরি করা হয়েছে?' : '1. What BhumiVerify is Intended to Help With'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isBn
            ? 'বাংলাদেশে জমি ক্রয়ের সময় ক্রেতারা প্রায়শই তথ্য সংকটে পড়েন: সংশ্লিষ্ট দাগে সম্প্রতি কোনো হস্তান্তর দলিল হয়েছে কিনা, কোনো ই-নামজারি আবেদন শুনানাধীন আছে কিনা, কিংবা সিএস, এসএ ও আরএস খতিয়ানের মধ্যে কোনো অমিল রয়েছে কিনা তা তারা বুঝতে পারেন না। ভূমিভেরিফাই একটি আধুনিক প্ল্যাটফর্ম, যা একজন ক্রেতাকে জমি ক্রয়ের পূর্বে কী কী বিষয় পরীক্ষা করতে হবে তা সুবিন্যস্তভাবে বুঝতে সাহায্য করে।'
            : 'BhumiVerify is designed to help land buyers organize parcel identifiers, review transaction histories, understand possible inconsistencies, and prepare independent verification steps before committing funds.'}
        </p>
      </section>

      {/* 2. What the Platform Does vs What it Does NOT Do */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
        <h2 className="text-base text-slate-900 font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? '২. প্ল্যাটফর্মের কর্মপরিধি ও সীমা' : '2. Scope & Verification Boundaries'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* What it does */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>{isBn ? 'প্ল্যাটফর্মটি যা প্রদান করে:' : 'What the Platform Provides:'}</span>
            </h3>
            <ul className="space-y-2 text-emerald-900 text-xs leading-relaxed list-disc pl-4">
              <li>{isBn ? 'যৌথ শনাক্তকারী ব্যবহার করে খতিয়ান ও দাগ মেলানো।' : 'Composite identifier matching for Khatians and Dags.'}</li>
              <li>{isBn ? 'হস্তান্তর দলিল, নামজারি আবেদন ও মঞ্জুরির কালানুক্রমিক ইতিহাস প্রদর্শন।' : 'Chronological display of transfer deeds, mutation petitions, and orders.'}</li>
              <li>{isBn ? 'পর্যালোচনার জন্য স্বচ্ছ ও নিয়মভিত্তিক যৌক্তিক ব্যাখ্যা।' : 'Deterministic, transparent rule-based explanations for all review items.'}</li>
              <li>{isBn ? 'অনুপস্থিত প্রয়োজনীয় তথ্য এবং বাস্তবসম্মত পরবর্তী পদক্ষেপের তালিকা।' : 'Structured checklist of missing documents and practical next verification steps.'}</li>
            </ul>
          </div>

          {/* What it does NOT do */}
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
            <h3 className="font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" aria-hidden="true" />
              <span>{isBn ? 'প্ল্যাটফর্মটি যা করে না:' : 'What the Platform Does NOT Do:'}</span>
            </h3>
            <ul className="space-y-2 text-rose-900 text-xs leading-relaxed list-disc pl-4">
              <li>{isBn ? 'আইনি মালিকানা বা নিরঙ্কুশ স্বত্বের সরকারি নিশ্চয়তা সনদ নয়।' : 'Does NOT replace official government land title certificates.'}</li>
              <li>{isBn ? 'কোনো চূড়ান্ত আইনি আদালতের সিদ্ধান্ত প্রতিষ্ঠা করে না।' : 'Does NOT establish legal conclusions in court disputes.'}</li>
              <li>{isBn ? 'সরেজমিন দখল অনুসন্ধান ও আইনজীবীর পরামর্শকে প্রতিস্থাপন করে না।' : 'Does NOT replace in-person physical due diligence and advocate review.'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Core Principle: No Match and Missing Events are NOT Evidence of Safety */}
      <section className="bg-amber-50/80 rounded-xl border border-amber-200 p-6 sm:p-8 shadow-2xs space-y-3 text-amber-950">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700" aria-hidden="true" />
          <h2 className="text-base font-bold">
            {isBn ? '৩. তথ্য না থাকা মানেই জমি নিরাপদ নয়' : '3. Critical Rule: No-Match & Missing Events are NOT Evidence of Safety'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          {isBn
            ? 'একটি বহুল প্রচলিত ভুল ধারণা হলো: কোনো সংকেত বা বিরোধের রেকর্ড না পাওয়া মানেই জমিটি সম্পূর্ণ ঝামেলামুক্ত। ভূমিভেরিফাই স্পষ্টভাবে স্মরণ করিয়ে দেয় যে, তথ্য অনুপস্থিত থাকা মানে কেবল ডিজিটাল সিস্টেমে তা নেই; এটি প্রমাণ করে না যে বাস্তবে জমিটির কোনো আইনি বা ওয়ারিশান বিরোধ নেই। সাব-রেজিস্ট্রি অফিসে বালাম বই তল্লাশ এবং ভূমি অফিসে নামজারি রেকর্ড সশরীরে যাচাই করা সর্বদা বাধ্যতামূলক।'
            : 'A critical rule of land diligence: A missing event or no-match result must NEVER be interpreted as evidence of safety. A missing record merely means it is not found in the digital index. Physical in-person inspection of the volume books at the Sub-Registry Office and certified mutation records at the AC (Land) office is always mandatory.'}
        </p>
      </section>

      {/* 4. Bangladesh Land Administration: 3 Distinct Event Types */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
          <Scale className="w-5 h-5 text-gov-primary" aria-hidden="true" />
          <h2 className="text-base text-slate-900 font-bold">
            {isBn ? '৪. ৩টি আলাদা ঘটনা যা কখনোই এক নয়' : '4. Bangladesh Land Law: Three Distinct Event Types'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">
              {isBn ? '১. সাব-রেজিস্ট্রি দলিলের নিবন্ধন' : '1. Registered Deed Event'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'রেজিস্ট্রেশন আইন, ১৯০৮ এর অধীনে সাব-রেজিস্ট্রি অফিসে সম্পাদিত। এটি স্বয়ংক্রিয়ভাবে রাজস্ব রেকর্ডে মালিকানার বৈধতা নিশ্চিত করে না।'
                : 'Executed at the Sub-Registry under the Registration Act, 1908. Does not itself prove that a current owner or title is valid in revenue records.'}
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">
              {isBn ? '২. নামজারি আবেদন' : '2. Mutation Application'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'এসএটি আইন ধারা ৮৯ এর অধীনে একটি বিচারাধীন আবেদন। নামজারি আবেদন করা মানেই নামজারি সম্পন্ন হওয়া নয়; শুনানিতে আপত্তি উঠতে পারে।'
                : 'An active petition under SAT Act Section 89. A mutation application does NOT mean mutation is completed; applications can face formal objections.'}
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">
              {isBn ? '৩. সম্পন্ন নামজারি ও জমাভাগ' : '3. Completed Mutation'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'সহকারী কমিশনার (ভূমি) কর্তৃক বিধিমোতাবেক মঞ্জুরকৃত নামজারি খতিয়ান, ডিসিআর রসিদ ও জমাভাগ বা জমাএকত্রীকরণ সম্পন্ন হওয়া।'
                : 'Formally granted by the Assistant Commissioner (Land) with a newly issued Mutation Khatian, DCR receipt, and Jamabandi update.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. External Official Resource Links (Clearly marked as non-integrated) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? '৫. সরকারি অফিশিয়াল পোর্টালসমূহ' : '5. Official Bangladesh Government Portals'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'দ্রষ্টব্য: ভূমিভেরিফাই কোনো সরকারি সেবা নয় এবং কোনো লাইভ ইন্টিগ্রেশন দাবি করে না। বাস্তব সেবার জন্য নিচের পোর্টালগুলো ব্যবহার করুন:'
            : 'Notice: BhumiVerify is NOT an official government service and does NOT imply endorsement. For authentic official government services, visit:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <a
            href="https://land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors flex items-center justify-between group"
          >
            <div>
              <span className="font-bold block text-slate-900">land.gov.bd</span>
              <span className="text-[11px] text-slate-500">{isBn ? 'জাতীয় ভূমি সেবা পোর্টাল' : 'National Land Portal'}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" aria-label="(opens in a new tab)" />
          </a>

          <a
            href="https://mutation.land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors flex items-center justify-between group"
          >
            <div>
              <span className="font-bold block text-slate-900">mutation.land.gov.bd</span>
              <span className="text-[11px] text-slate-500">{isBn ? 'ই-নামজারি ট্র্যাকিং ও সেবাসমূহ' : 'e-Mutation Tracking & Services'}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" aria-label="(opens in a new tab)" />
          </a>

          <a
            href="https://eregistration.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors flex items-center justify-between group"
          >
            <div>
              <span className="font-bold block text-slate-900">eregistration.gov.bd</span>
              <span className="text-[11px] text-slate-500">{isBn ? 'নিবন্ধন অধিদপ্তর' : 'Directorate of Registration'}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" aria-label="(opens in a new tab)" />
          </a>

          <a
            href="https://minland.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors flex items-center justify-between group"
          >
            <div>
              <span className="font-bold block text-slate-900">minland.gov.bd</span>
              <span className="text-[11px] text-slate-500">{isBn ? 'ভূমি মন্ত্রণালয়' : 'Ministry of Land'}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" aria-label="(opens in a new tab)" />
          </a>
        </div>
      </section>

      {/* CTA: Check Land */}
      <div className="text-center pt-2">
        <Link to="/check-land" className="btn-primary text-xs px-6 py-2.5 font-bold inline-flex items-center gap-2">
          <Search className="w-4 h-4" aria-hidden="true" />
          <span>{isBn ? 'জমি যাচাই পাতায় যান' : 'Check a land parcel'}</span>
        </Link>
      </div>
    </div>
  );
};
