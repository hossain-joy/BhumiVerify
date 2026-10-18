import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Layers,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Scale,
  Building,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorksPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 animate-fade-up">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isBn ? 'যাচাই পদ্ধতি ও সীমাবদ্ধতা' : 'Due Diligence Methodology & Limitations'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'ভূমিভেরিফাই যেভাবে কাজ করে' : 'How BhumiVerify Works'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isBn
            ? 'আমাদের সুনির্দিষ্ট খতিয়ান ও দাগ মেলানো পদ্ধতি, ঘটনা প্রবাহের ধরণ এবং বাংলাদেশে জমি কেনার পূর্বে বাধ্যতামূলক বাস্তব যাচাই প্রক্রিয়া সম্পর্কে জানুন।'
            : 'Understanding our deterministic parcel-matching model, transaction event categories, and the mandatory independent verification steps required before buying land in Bangladesh.'}
        </p>
      </div>

      {/* 4 Pillars of Due Diligence */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          {isBn ? 'ভূমি যাচাইয়ের ৪টি মৌলিক নীতি' : 'The 4 Principles of Land Diligence'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>{isBn ? '১. যৌথ শনাক্তকারীর মেলবন্ধন' : '1. Composite Identifier Matching'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'বাংলাদেশের ভূমি ব্যবস্থাপনায় শুধু দাগ নম্বর কখনোই একক নয়। একই উপজেলায় বিভিন্ন মৌজা ও খতিয়ানের অধীনে একই দাগ নম্বর থাকতে পারে। ভূমিভেরিফাই পূর্ণাঙ্গ যৌথ চাবি ব্যবহার করে: বিভাগ + জেলা + উপজেলা + মৌজা + খতিয়ান + দাগ।'
                : 'In Bangladesh land governance, a Dag (Plot) number alone is never unique. A single Upazila can contain dozens of identical Dag numbers across different Mouzas and Khatians. BhumiVerify requires the complete composite key: Division + District + Upazila + Mouza + Khatian + Dag.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>{isBn ? '২. হস্তান্তর দলিল ≠ সরকারি নামজারি' : '2. Transfer Deed ≠ Government Mutation'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'স্টেট একুইজিশন অ্যান্ড টেন্যান্সি (SAT) আইনের ৮৯ ধারা অনুসারে, সাব-রেজিস্ট্রি অফিসে শুধু দলিল রেজিস্ট্রি করলেই সরকারি রাজস্ব রেকর্ডে মালিকানা হস্তান্তরিত হয় না। নামজারি সহকারী কমিশনার (ভূমি) দ্বারা একটি পৃথক প্রশাসনিক বিচারিক আদেশ। ভূমিভেরিফাই এ দুটিকে সম্পূর্ণ ভিন্ন ঘটনা হিসেবে প্রদর্শন করে।'
                : 'Under Section 89 of the State Acquisition and Tenancy (SAT) Act, registering a deed at the Sub-Registry Office does not transfer government revenue title. Mutation is a separate administrative judicial order by the AC (Land). BhumiVerify keeps these as separate event types.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <Scale className="w-4 h-4" />
              <span>{isBn ? '৩. রেকর্ডের অনুপস্থিতি ≠ জমি নিরাপদ' : '3. Absence of Records ≠ Safety'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'কোনো তথ্য না পাওয়া বা ফাঁকা টাইমলাইনকে কখনোই জমি সম্পূর্ণ নিরাপদ হিসেবে বিবেচনা করবেন না। রেকর্ডের অনুপস্থিতির অর্থ হতে পারে তথ্য অসম্পূর্ণ থাকা, আদালতের মামলার তথ্য নথিবদ্ধ না হওয়া বা গোপন দায়বদ্ধতা।'
                : 'Never treat a no-match result or an empty event timeline as evidence that land is safe. In practice, missing records frequently signal incomplete digitization, unrecorded civil litigation, or failure to report mortgages.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Building className="w-4 h-4" />
              <span>{isBn ? '৪. সরাসরি সরেজমিনে যাচাই বাধ্যতামূলক' : '4. Physical Search is Mandatory'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'ডিজিটাল প্ল্যাটফর্ম শুধুমাত্র একটি প্রাথমিক প্রস্তুতি চেকলিস্ট। ক্রেতাকে অবশ্যই সাব-রেজিস্ট্রি অফিসের ভলিউম বইয়ে ১২-২৫ বছরের তল্লাশি (নিল সার্চ), এসি (ল্যান্ড) অফিসে নামজারি কেস রেকর্ড যাচাই, সরেজমিনে দখল পরীক্ষা এবং অভিজ্ঞ আইনজীবীর মতামত নিতে হবে।'
                : 'A digital app is only a pre-flight checklist. Buyers must conduct a physical 12–25 year Nil Search in Sub-Registry volume books, examine mutation case records in the AC (Land) office, verify ground possession, and consult a land advocate.'}
            </p>
          </div>
        </div>
      </section>

      {/* Distinct Event Types */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          {isBn ? 'আমাদের তিনটি আলাদা ঘটনার ধরণ' : 'Our Three Distinct Event Categories'}
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-300">
                {isBn ? 'নিবন্ধিত দলিল / হস্তান্তর ঘটনা' : 'Registered Deed / Transfer Event'}
              </span>
              <span className="text-xs font-semibold text-purple-950">
                {isBn ? 'সাব-রেজিস্ট্রি অফিস রেকর্ড' : 'Sub-Registry Office Record'}
              </span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              {isBn
                ? 'সাফ-কবলা, হেবা, বাটোয়ারা বা এওয়াজ দলিল সম্পাদনকালে এটি রেকর্ড করা হয়। এটি প্রমাণ করে যে দুই পক্ষের মধ্যে দলিল সম্পাদিত হয়েছে; কিন্তু এটি স্বয়ংক্রিয়ভাবে সরকারি খতিয়ান (RoR) হালনাগাদ করে না।'
                : 'Recorded when parties execute a Saf-Kabala, Heba, Partition, or Exchange deed. Proves an agreement was registered between individuals; does not update government Record of Rights (RoR).'}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                {isBn ? 'নামজারি আবেদন জমা হয়েছে' : 'Mutation Application Submitted'}
              </span>
              <span className="text-xs font-semibold text-blue-950">
                {isBn ? 'ই-নামজারি আবেদন লগ' : 'e-Mutation Petition Log'}
              </span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">
              {isBn
                ? 'নতুন খতিয়ান খোলা ও খাজনা পরিশোধের দাবি পরিবর্তনের জন্য সহকারী কমিশনার (ভূমি) এর কাছে দাখিলকৃত আবেদন। একটি বিচারাধীন আবেদন কখনোই অনুমোদিত নামজারি নয়; শুনানিতে আপত্তি উঠতে পারে।'
                : 'A formal petition submitted to the Assistant Commissioner (Land) to open a new Khatian and transfer rent liability. A pending application is NOT an approved mutation; applications may face objections or rejections.'}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                {isBn ? 'নামজারি সম্পন্ন ও আদেশ জারি' : 'Mutation Completed & Order Issued'}
              </span>
              <span className="text-xs font-semibold text-emerald-950">
                {isBn ? 'এসি (ল্যান্ড) চূড়ান্ত আদেশ' : 'AC (Land) Final Decree'}
              </span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {isBn
                ? 'এসি (ল্যান্ড) স্বাক্ষরিত চূড়ান্ত আদেশ যার মাধ্যমে নামজারি খতিয়ান ও ডিসিআর রসিদ দেওয়া হয়। এই পর্যায়েই ক্রেতা সরকারি জমাভাগ ও জমা একত্রীকরণ বইয়ে রায়ত বা প্রজা হিসেবে অন্তর্ভুক্ত হন।'
                : 'Formal order signed by AC (Land) issuing a new Mutated Khatian and Dakhila. Only at this point is the buyer recognized as the tenant on government Jamabandi records.'}
            </p>
          </div>
        </div>
      </section>

      {/* Suggested 8-Point Buyer Checklist */}
      <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            {isBn ? 'ক্রেতার জন্য ৮-দফা আবশ্যক চেকলিস্ট' : 'Essential Buyer Due Diligence Checklist'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'বাংলাদেশে জমি ক্রয়ের ক্ষেত্রে সাধারণ নির্দেশনামূলক ধাপ (আইনি পরামর্শ নয়)।'
              : 'General recommended steps for land purchases in Bangladesh (not legal advice).'}
          </p>
        </div>

        <ol className="space-y-3 text-xs text-slate-300">
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">১</span>
            <div>
              <strong className="text-white">
                {isBn ? '২৫ বছরের দলিলের ধারাবাহিকতা (বায়া দলিল) যাচাই:' : 'Check 25-Year Chain of Title (Baya Deeds):'}
              </strong>{' '}
              {isBn
                ? 'বিগত ২৫ বছরের হস্তান্তরের প্রতিটি মূল বা সার্টিফাইড বায়া দলিল সংগ্রহ ও পরীক্ষা করুন।'
                : 'Obtain and inspect certified copies of every deed transferring the property for the past 25 years.'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">২</span>
            <div>
              <strong className="text-white">
                {isBn ? 'ধারাবাহিক জরিপ খতিয়ান (CS, SA, RS, BS/সিটি) মিলিয়ে দেখা:' : 'Inspect Cadastral Survey Sheets (CS, SA, RS, BS/City):'}
              </strong>{' '}
              {isBn
                ? 'সিএস থেকে শুরু করে আরএস বা বিএস পর্যন্ত খতিয়ান ও দাগের মিল এবং মালিকানার সূত্র যাচাই করুন।'
                : 'Ensure continuity of khatian and dag numbers across successive revisions.'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">৩</span>
            <div>
              <strong className="text-white">
                {isBn ? 'সাব-রেজিস্ট্রি অফিসে নিল সার্চ বা তল্লাশি (ফর্ম ৫২):' : 'Conduct Sub-Registry Nil Search (Form 52):'}
              </strong>{' '}
              {isBn
                ? 'গোপন কোনো বিক্রয় চুক্তি (বায়না), পূর্বের বন্ধক বা হস্তান্তর আছে কিনা তা ভলিউম বইয়ে তল্লাশি দিন।'
                : 'Search volume book indexes for unrecorded deeds, prior mortgages, or agreements to sell (Baina).'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">৪</span>
            <div>
              <strong className="text-white">
                {isBn ? 'হালনাগাদ নামজারি পরচা ও ডিসিআর রসিদ:' : 'Verify Current Mutation Porcha & DCR Receipt:'}
              </strong>{' '}
              {isBn
                ? 'বিক্রেতার নিজ নামে সহকারী কমিশনার (ভূমি) কর্তৃক জারিকৃত নামজারি খতিয়ান ও ডিসিআর যাচাই করুন।'
                : 'Ensure the seller holds a certified mutation khatian in their own name with official fee receipts.'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">৫</span>
            <div>
              <strong className="text-white">
                {isBn ? 'হাল সনের ভূমি উন্নয়ন কর (খাজনা দাখিলা):' : 'Verify Up-to-Date Land Tax (LD Tax Dakhila):'}
              </strong>{' '}
              {isBn
                ? 'চলতি বাংলা সনের খাজনা পরিশোধিত আছে কিনা এবং অনলাইনে দাখিলা যাচাই করে নিন।'
                : 'Confirm taxes are paid for the current Bengali fiscal year at the Union/Circle Land Office.'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">৬</span>
            <div>
              <strong className="text-white">
                {isBn ? 'সরেজমিনে সীমানা ও মাপজোখ (আমিন বা সার্ভেয়ার দিয়ে):' : 'Demarcate Ground Boundaries (Ameen Survey):'}
              </strong>{' '}
              {isBn
                ? 'মৌজা নকশা অনুযায়ী দক্ষ সার্ভেয়ার দিয়ে জমির বাস্তব চৌহদ্দি ও মোট আয়তন মেপে দেখুন।'
                : 'Have a certified surveyor measure plot boundaries against the approved mouza map.'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">৭</span>
            <div>
              <strong className="text-white">
                {isBn ? 'বাস্তব দখল ও সহ-অংশীদারদের খোঁজখবর:' : 'Check Physical Possession & Co-Sharers:'}
              </strong>{' '}
              {isBn
                ? 'জমিতে বিক্রেতার বাস্তব দখল আছে কিনা এবং কোনো ওয়ারিশ বা শরিকের বিরোধ আছে কিনা তা স্থানীয়দের কাছে জানুন।'
                : 'Interview neighbors to confirm the seller is in physical possession and that no family co-sharer disputes exist.'}
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">৮</span>
            <div>
              <strong className="text-white">
                {isBn ? 'অভিজ্ঞ ভূমি আইনজীবীর মাধ্যমে কাগজপত্র যাচাই:' : 'Confirm with a Qualified Land Advocate:'}
              </strong>{' '}
              {isBn
                ? 'বায়না করার আগে বা টাকা হস্তান্তরের পূর্বে সকল কাগজপত্রের সার্টিফাইড কপি একজন আইনজীবীকে দিয়ে পরীক্ষা করান।'
                : 'Have all papers vetted by an experienced property lawyer before signing or paying earnest money.'}
            </div>
          </li>
        </ol>

        <div className="pt-2">
          <Link
            to="/check-land"
            className="btn-primary py-2.5 px-5 font-bold text-xs inline-flex items-center gap-2"
          >
            <span>{isBn ? 'জমি যাচাই করুন' : 'Verify a Land Parcel'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
