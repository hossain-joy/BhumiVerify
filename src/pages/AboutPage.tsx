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
      <div className="border-b border-slate-200 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200 text-xs font-semibold">
            {isBn ? 'প্রকল্পের উদ্দেশ্য ও সীমাবদ্ধতা' : 'Purpose & Limitations'}
          </span>
          <span className="text-xs text-slate-400">
            {isBn ? 'কাল্পনিক ডেমো ডেটা' : 'Fictional Demo MVP'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'ভূমিসিউর (BhumiSure) সম্পর্কে' : 'About BhumiSure'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {isBn
            ? 'Verify Before You Buy — জমি কেনার পূর্বে সম্ভাব্য লেনদেন ঝুঁকি ও করণীয় নিরূপণের প্রযুক্তিগত প্রোটোটাইপ।'
            : 'Verify Before You Buy — A pre-registration diligence prototype for prospective land buyers in Bangladesh.'}
        </p>
      </div>

      {/* 1. What BhumiSure is intended to help with */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-gov-primary" aria-hidden="true" />
          <h2 className="text-base text-slate-900 font-bold">
            {isBn ? '১. ভূমিসিউর কেন তৈরি করা হয়েছে?' : '1. What BhumiSure is Intended to Help With'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isBn
            ? 'বাংলাদেশে জমি ক্রয়ের সময় ক্রেতারা প্রায়শই তথ্য সংকটে পড়েন: সংশ্লিষ্ট দাগে সম্প্রতি কোনো হস্তান্তর দলিল হয়েছে কিনা, কোনো ই-নামজারি আবেদন শুনানাধীন আছে কিনা, কিংবা সিএস, এসএ ও আরএস খতিয়ানের মধ্যে কোনো অমিল রয়েছে কিনা তা তারা বুঝতে পারেন না। ভূমিসিউর একটি সরল ও স্বচ্ছ প্রোটোটাইপ, যা একজন সম্ভাব্য ক্রেতাকে জমি ক্রয়ের পূর্বে কী কী বিষয় পরীক্ষা করতে হবে তা সুবিন্যস্তভাবে বুঝতে সাহায্য করে।'
            : 'BhumiSure is designed to help prospective land buyers organize parcel identifiers, view a simulated history of relevant land-related events, understand possible inconsistencies and missing information, and see sensible independent verification steps before committing money or signing a registration deed.'}
        </p>
      </section>

      {/* 2. What the Prototype Does vs What it Does NOT Do */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
        <h2 className="text-base text-slate-900 font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? '২. প্রোটোটাইপটি কী করে এবং কী করে না?' : '2. Scope: What the Prototype Does vs. Does NOT Do'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* What it does */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>{isBn ? 'প্রোটোটাইপটি যা করে:' : 'What the Prototype Does:'}</span>
            </h3>
            <ul className="space-y-2 text-emerald-900 text-xs leading-relaxed list-disc pl-4">
              <li>Local fictional parcel matching using composite identifiers.</li>
              <li>Chronological display of sample transfer deeds, mutation petitions, and completion orders.</li>
              <li>Deterministic, transparent rule-based explanations for all review items.</li>
              <li>Explicit listing of missing information and practical next verification steps.</li>
            </ul>
          </div>

          {/* What it does NOT do */}
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
            <h3 className="font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" aria-hidden="true" />
              <span>{isBn ? 'প্রোটোটাইপটি যা করে না:' : 'What the Prototype Does NOT Do:'}</span>
            </h3>
            <ul className="space-y-2 text-rose-900 text-xs leading-relaxed list-disc pl-4">
              <li>Does NOT confirm legal ownership, good title, or unencumbered property.</li>
              <li>Does NOT search real government databases or official land archives.</li>
              <li>Does NOT establish legal conclusions or detect every form of fraud.</li>
              <li>Does NOT claim any parcel is "Safe" or "Fraud-free".</li>
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
            ? 'একটি বহুল প্রচলিত ভুল ধারণা হলো: কোনো সংকেত বা বিরোধের রেকর্ড না পাওয়া মানেই জমিটি সম্পূর্ণ ঝামেলামুক্ত। ভূমিসিউর স্পষ্টভাবে স্মরণ করিয়ে দেয় যে, নমুনা ডেটায় তথ্য অনুপস্থিত থাকা মানে কেবল ডেটা সেটে তা নেই; এটি প্রমাণ করে না যে বাস্তবে জমিটির কোনো আইনি বা ওয়ারিশান বিরোধ নেই।'
            : 'A critical rule of land diligence: A missing event or no-match result must NEVER be interpreted as evidence of safety. In a limited demonstration dataset, a missing record merely means it is not included in this sample. Physical in-person inspection of the volume books at the Sub-Registry Office and certified mutation records at the AC (Land) office is always mandatory.'}
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
            <h3 className="font-bold text-slate-900">1. Registered Deed Event</h3>
            <p className="text-slate-600 leading-relaxed">
              Executed at the Sub-Registry under the Registration Act, 1908. Does not itself prove that a current owner or title is valid in revenue records.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">2. Mutation Application</h3>
            <p className="text-slate-600 leading-relaxed">
              An active petition under SAT Act Section 89. A mutation application does NOT mean mutation is completed; applications can face formal objections.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">3. Completed Mutation</h3>
            <p className="text-slate-600 leading-relaxed">
              Formally granted by the Assistant Commissioner (Land) with a newly issued Mutation Khatian, DCR receipt, and Jamabandi update.
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
            ? 'দ্রষ্টব্য: ভূমিসিউর কোনো সরকারি সেবা নয় এবং কোনো লাইভ ইন্টিগ্রেশন দাবি করে না। বাস্তব সেবার জন্য নিচের পোর্টালগুলো ব্যবহার করুন:'
            : 'Notice: BhumiSure is NOT an official government service and does NOT imply endorsement. For authentic official government services, visit:'}
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
              <span className="text-[11px] text-slate-500">National Land Portal</span>
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
              <span className="text-[11px] text-slate-500">e-Mutation Tracking & Services</span>
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
              <span className="text-[11px] text-slate-500">Directorate of Registration</span>
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
              <span className="text-[11px] text-slate-500">Ministry of Land</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" aria-label="(opens in a new tab)" />
          </a>
        </div>
      </section>

      {/* CTA: Check Land */}
      <div className="text-center pt-2">
        <Link to="/check" className="btn-primary text-xs px-6 py-2.5 font-bold inline-flex items-center gap-2">
          <Search className="w-4 h-4" aria-hidden="true" />
          <span>{isBn ? 'জমি যাচাই পাতায় যান' : 'Check a land parcel'}</span>
        </Link>
      </div>

      {/* Statutory Disclaimer */}
      <Disclaimer compact={false} />
    </div>
  );
};
