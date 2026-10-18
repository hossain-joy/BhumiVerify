import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataTag } from '../components/common/DemoDataTag';
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
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200 text-xs font-semibold">
            {language === 'bn' ? 'প্রকল্প পরিচিতি ও প্রেক্ষাপট' : 'About & Legal Context'}
          </span>
          <DemoDataTag type="demo_data" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'bn' ? 'ভূমিভেরিফাই সম্পর্কে' : 'About BhumiVerify'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {language === 'bn'
            ? 'বাংলাদেশে জমি ক্রয়ের পূর্বে লেনদেন সংক্রান্ত সংকেত এবং ঝুঁকি মূল্যায়ন সংক্রান্ত প্রযুক্তিগত প্রোটোটাইপ।'
            : 'Pre-Registration Land Activity Signals & Due Diligence MVP for Bangladesh.'}
        </p>
      </div>

      {/* 1. Main Objective */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-gov-primary" />
          <h2 className="text-base text-slate-900 font-bold">
            {language === 'bn' ? '১. মূল উদ্দেশ্য (Core Mission)' : '1. Core Objective'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {language === 'bn'
            ? 'বাংলাদেশে জমি ক্রয়ের সিদ্ধান্ত নেওয়ার পূর্বে অনেক সময় ক্রেতারা জানেন না সংশ্লিষ্ট দাগে পূর্বে কোনো হস্তান্তর দলিল হয়েছে কিনা, কোনো ই-নামজারি আবেদন প্রক্রিয়াধীন আছে কিনা, অথবা সাবেক ও আধুনিক জরিপের মধ্যে কোনো বিরোধ বিদ্যমান কিনা। ভূমিভেরিফাই-এর উদ্দেশ্য কোনো বিশাল বা অপ্রয়োজনীয় জটিল ড্যাশবোর্ড তৈরি করা নয়; বরং ক্রেতাকে একটি সরল, বিশ্বস্ত এবং ব্যবহারযোগ্য ৩-ধাপের ওয়ার্কফ্লো দেওয়া—যাতে তিনি বুঝতে পারেন কী তথ্য পাওয়া গেছে, তা কী নির্দেশ করে, কোন তথ্য এখনো অজানা এবং পরবর্তীতে কী যাচাই করা উচিত।'
            : 'BhumiVerify is an MVP designed to solve a critical information asymmetry problem in Bangladesh: prospective land buyers committing money before knowing whether a recent deed has been executed, an e-mutation petition is pending, or record conflicts exist. Instead of building bloated dashboards or redundant administrative workflows, BhumiVerify delivers a clean, focused public-service tool: Enter parcel identifiers → Review matched parcel → View risk overview and activity timeline.'}
        </p>
      </section>

      {/* 2. Bangladesh Land Administration Reality: The Split Between Deeds & Mutation */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
          <Scale className="w-5 h-5 text-gov-primary" />
          <h2 className="text-base text-slate-900 font-bold">
            {language === 'bn'
              ? '২. বাংলাদেশের ভূমি প্রশাসনের বাস্তবতা: দলিল বনাম নামজারি'
              : '2. Bangladesh Land Law Context: Deeds vs. Mutation'}
          </h2>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'বাংলাদেশে ভূমি ব্যবস্থাপনা দুটি সম্পূর্ণ পৃথক সরকারি মন্ত্রণালয় ও দপ্তরের মাধ্যমে পরিচালিত হয়:'
              : 'Land administration in Bangladesh historically operates under two separate government authorities:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">
                {language === 'bn' ? 'আইন ও বিচার মন্ত্রণালয়' : 'Ministry of Law & Justice'}
              </span>
              <h4 className="text-xs font-bold text-slate-900">
                {language === 'bn' ? 'সাব-রেজিস্ট্রি অফিস (দলিল রেজিস্ট্রেশন)' : 'Sub-Registry Office (Deed Registration)'}
              </h4>
              <p className="text-xs text-slate-600">
                {language === 'bn'
                  ? 'রেজিস্ট্রেশন আইন, ১৯০৮ অনুযায়ী দলিলের মাধ্যমে ক্রেতা ও বিক্রেতার মধ্যকার হস্তান্তর চুক্তি রেজিস্ট্রি করে।'
                  : 'Registers deed contracts (Saf-Kabala, Heba, etc.) between parties under the Registration Act, 1908.'}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                {language === 'bn' ? 'ভূমি মন্ত্রণালয়' : 'Ministry of Land'}
              </span>
              <h4 className="text-xs font-bold text-slate-900">
                {language === 'bn' ? 'সহকারী কমিশনার (ভূমি) অফিস (নামজারি)' : 'AC (Land) Office (Record of Rights & Mutation)'}
              </h4>
              <p className="text-xs text-slate-600">
                {language === 'bn'
                  ? 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০ অনুযায়ী সরকারি খতিয়ান ও রাজস্ব রেকর্ড হালনাগাদ করে।'
                  : 'Maintains Record of Rights (Khatian/Porcha) and mutates land tax liability under the SAT Act, 1950.'}
              </p>
            </div>
          </div>

          <p>
            <strong>{language === 'bn' ? 'ধারা ৮৯ ও এলটি নোটিশ (Section 89 SAT Act):' : 'Section 89 SAT Act & LT Notice:'}</strong>{' '}
            {language === 'bn'
              ? 'আইনানুযায়ী সাব-রেজিস্ট্রার একটি জমি রেজিস্ট্রি করার পর সংশ্লিষ্ট সহকারী কমিশনার (ভূমি) বরাবরে জমি হস্তান্তর নোটিশ (LT Notice) প্রেরণ করতে বাধ্য। কিন্তু বাস্তব ক্ষেত্রে তথ্য আদান-প্রদানের সময়ক্ষেপণ এবং পৃথক রেকর্ড কাঠামোর কারণে একজন অসৎ বিক্রেতা নামজারি সম্পন্ন হওয়ার পূর্বেই একই জমি একাধিক ব্যক্তির কাছে বিক্রি বা হস্তান্তরের চেষ্টা করতে পারে।'
              : 'Under Section 89 of the State Acquisition and Tenancy Act, 1950, when a transfer deed is registered, the Sub-Registry must transmit a Land Transfer (LT) notice to the AC (Land). However, in real life, delays in inter-office synchronization create a dangerous blind spot where buyers may enter contracts before mutation proceedings are completed or verified.'}
          </p>
        </div>
      </section>

      {/* 3. Transparent Rule-Based Methodology */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
          <Layers className="w-5 h-5 text-gov-primary" />
          <h2 className="text-base text-slate-900 font-bold">
            {language === 'bn' ? '৩. স্বচ্ছ ও নিয়মভিত্তিক ঝুঁকি মূল্যায়ন পদ্ধতি' : '3. Transparent, Rule-Based Assessment Methodology'}
          </h2>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'ভূমিভেরিফাই কোনো অনুমানের ওপর ভিত্তি করে কৃত্রিম বুদ্ধিমত্তা (AI) বা জটিল ব্ল্যাক-বক্স স্কোর ব্যবহার করে না। এর প্রতিটি ঝুঁকি মূল্যায়ন সম্পূর্ণ স্বচ্ছ ও কঠোর নিয়মভিত্তিক (Rule-Based)।'
              : 'BhumiVerify strictly avoids black-box machine learning or hallucinating AI models. Every warning and status label is calculated using transparent, deterministic business rules:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-lg border border-amber-300 bg-amber-50 space-y-1">
              <span className="font-bold text-xs text-amber-900 block">
                {language === 'bn' ? 'Review Recommended' : 'Review Recommended'}
              </span>
              <p className="text-[11px] text-amber-800 leading-snug">
                {language === 'bn'
                  ? 'সাম্প্রতিক হস্তান্তর দলিল রয়েছে কিন্তু নামজারি হয়নি, অথবা খতিয়ান বা জরিপ রেকর্ডে অসঙ্গতি রয়েছে।'
                  : 'Triggered when a transfer deed is logged without completed mutation, or when survey identifiers conflict.'}
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-blue-300 bg-blue-50 space-y-1">
              <span className="font-bold text-xs text-blue-900 block">
                {language === 'bn' ? 'Information Incomplete' : 'Information Incomplete'}
              </span>
              <p className="text-[11px] text-blue-800 leading-snug">
                {language === 'bn'
                  ? 'ই-নামজারি আবেদন দাখিল হয়েছে কিন্তু শুনানাধীন রয়েছে, চূড়ান্ত অনুমোদন বা ডিসিআর জারি হয়নি।'
                  : 'Triggered when an e-mutation petition is filed but pending hearing without a final order.'}
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-emerald-300 bg-emerald-50 space-y-1">
              <span className="font-bold text-xs text-emerald-900 block">
                {language === 'bn' ? 'No Major Issue Detected' : 'No Major Issue Detected'}
              </span>
              <p className="text-[11px] text-emerald-800 leading-snug">
                {language === 'bn'
                  ? 'উপলব্ধ ডেমো রেকর্ডে নামজারি সম্পন্ন ও খতিয়ান হালনাগাদ রয়েছে। আইনগত সতর্কতা প্রযোজ্য।'
                  : 'Triggered when mutation order is completed in available data. Standard due diligence still applies.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mandatory Statutory Disclaimer */}
      <section className="bg-amber-50/70 rounded-xl border border-amber-200 p-6 shadow-2xs space-y-3 text-amber-950">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h2 className="text-base font-bold">
            {language === 'bn' ? '৪. বিধিবদ্ধ আইনি সতর্কতা ও সীমাবদ্ধতা' : '4. Statutory Limitations & Legal Disclaimer'}
          </h2>
        </div>

        <ul className="text-xs sm:text-sm space-y-2 text-amber-900 leading-relaxed list-disc pl-5">
          <li>
            <strong>{language === 'bn' ? 'কাল্পনিক ডেমো ডেটা:' : 'Fictional Demo Data:'}</strong>{' '}
            {language === 'bn'
              ? 'ভূমিভেরিফাই একটি মূল্যায়ন প্রোটোটাইপ। এটি কোনো বাস্তব সরকারি ডেটাবেসের সাথে সংযুক্ত নয় এবং এতে ব্যবহৃত সকল তথ্য সম্পূর্ণ কাল্পনিক।'
              : 'BhumiVerify is an evaluation MVP using fictional sample data. It does not access real government databases or contain actual citizen records.'}
          </li>
          <li>
            <strong>{language === 'bn' ? 'মালিকানার কোনো আইনগত নিশ্চয়তা নয়:' : 'Never a Legal Title Warranty:'}</strong>{' '}
            {language === 'bn'
              ? 'প্ল্যাটফর্মটি কখনো কোনো জমিকে "সম্পূর্ণ নিরাপদ", "প্রতারণামুক্ত" বা "আইনিভাবে নির্ভুল" হিসেবে প্রত্যয়ন করে না।'
              : 'BhumiVerify never claims that a parcel is completely safe, fraud-free, or legally verified.'}
          </li>
          <li>
            <strong>{language === 'bn' ? 'সরেজমিন অনুসন্ধানের আবশ্যকতা:' : 'In-Person Inspection Essential:'}</strong>{' '}
            {language === 'bn'
              ? 'জমি ক্রয়ের চূড়ান্ত সিদ্ধান্তের পূর্বে সহকারী কমিশনার (ভূমি) অফিসে নামজারি খতিয়ানের মূল কপি, সাব-রেজিস্ট্রি অফিসে ২৫ বছরের বায়া দলিলের তল্লাশ এবং সরেজমিনে দখল ও সীমানা যাচাই করা বাধ্যতামূলক।'
              : 'Before financial commitments, buyers must obtain certified porchas from the AC (Land) office, conduct a 25-year title search (Nil Search) at the Sub-Registry, and physically inspect boundaries on site.'}
          </li>
        </ul>
      </section>

      {/* 5. Official Portals */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-4 h-4 text-gov-primary" />
          <span>{language === 'bn' ? '৫. সরকারি অফিশিয়াল পোর্টালসমূহ' : '5. Official Bangladesh Government Portals'}</span>
        </h2>
        <p className="text-xs text-slate-600">
          {language === 'bn'
            ? 'বাস্তব সরকারি সেবা ও যাচাইয়ের জন্য নিচের অফিশিয়াল পোর্টালগুলো ব্যবহার করুন:'
            : 'For authentic government services, e-mutations, and Porcha applications, visit:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="https://land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors flex items-center justify-between text-xs text-slate-800 group"
          >
            <div>
              <span className="font-bold block text-slate-900">land.gov.bd</span>
              <span className="text-[11px] text-slate-500">জাতীয় ভূমি সেবা পোর্টাল (National Land Portal)</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" />
          </a>

          <a
            href="https://mutation.land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors flex items-center justify-between text-xs text-slate-800 group"
          >
            <div>
              <span className="font-bold block text-slate-900">mutation.land.gov.bd</span>
              <span className="text-[11px] text-slate-500">ই-নামজারি অনলাইন আবেদন ও ট্র্যাকিং</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" />
          </a>

          <a
            href="https://eregistration.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors flex items-center justify-between text-xs text-slate-800 group"
          >
            <div>
              <span className="font-bold block text-slate-900">eregistration.gov.bd</span>
              <span className="text-[11px] text-slate-500">নিবন্ধন অধিদপ্তর (রেজিস্ট্রেশন সেবা)</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" />
          </a>

          <a
            href="https://minland.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors flex items-center justify-between text-xs text-slate-800 group"
          >
            <div>
              <span className="font-bold block text-slate-900">minland.gov.bd</span>
              <span className="text-[11px] text-slate-500">ভূমি মন্ত্রণালয় (Ministry of Land)</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gov-primary" />
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-2">
        <Link to="/check" className="btn-primary text-xs px-6 py-2.5 font-bold">
          <Search className="w-4 h-4" />
          <span>{language === 'bn' ? 'জমি যাচাই পাতায় যান' : 'Go to Check Land'}</span>
        </Link>
      </div>
    </div>
  );
};
