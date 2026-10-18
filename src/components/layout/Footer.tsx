import React from 'react';
import { ExternalLink, ShieldCheck, BookOpen, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gov-teal flex items-center justify-center text-white font-bold text-xs">
                LT
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                {language === 'bn' ? 'ল্যান্ডটেক বিডি' : 'LandTech BD'}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'bn'
                ? 'রেজিস্ট্রেশন-পূর্ব ভূমি লেনদেন সংকেত ও নিয়ন্ত্রিত তথ্য প্রাপ্তি প্ল্যাটফর্ম (ভূমিভেরিফাই)। বাংলাদেশে জমি ক্রেতাদের সুরক্ষা নিশ্চিত করতে নিয়ন্ত্রিত তথ্যের নমুনা প্রদর্শন।'
                : 'Pre-Registration Land Activity Signals Platform (BhumiVerify). Demonstrating controlled, role-governed pre-registration signals to protect prospective land buyers in Bangladesh.'}
            </p>
            <div className="pt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {language === 'bn' ? 'শুধুমাত্র মূল্যায়ন প্রোটোটাইপ।' : 'Evaluation prototype only.'}
            </div>
          </div>

          {/* Core Principles */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'মৌলিক সতর্কতামূলক নীতি' : 'Core Diligence Rules'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li className="leading-snug">
                • <strong>{language === 'bn' ? 'দলিল ≠ নামজারি:' : 'Deed ≠ Mutation:'}</strong>{' '}
                {language === 'bn'
                  ? 'রেজিস্ট্রিকৃত দলিল নামজারির নিশ্চয়তা দেয় না যতক্ষণ না সহকারী কমিশনার (ভূমি) তা অনুমোদন করেন।'
                  : 'A registered transfer deed does not confer updated mutation khatian until AC (Land) approval.'}
              </li>
              <li className="leading-snug">
                • <strong>{language === 'bn' ? 'আবেদন ≠ মঞ্জুরি:' : 'Application ≠ Approval:'}</strong>{' '}
                {language === 'bn'
                  ? 'ই-নামজারি আবেদন দায়ের করা মানেই জমিটির নামজারি নিশ্চিত নয়; তদন্তে তা বাতিল হতে পারে।'
                  : 'An active e-mutation petition may be rejected during field inquiry.'}
              </li>
              <li className="leading-snug">
                • <strong>{language === 'bn' ? 'তথ্য না থাকা ≠ নিরাপদ:' : 'No Match ≠ Safe:'}</strong>{' '}
                {language === 'bn'
                  ? 'ডেমো ডেটায় কোনো নোটিশ না পাওয়ার অর্থ এই নয় যে জমিটি বিরোধমুক্ত।'
                  : 'Absence of recorded notice in demo feed does not guarantee unencumbered title.'}
              </li>
            </ul>
          </div>

          {/* Research & Inspiration Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'সরকারি রেফারেন্স পোর্টাল' : 'Research References'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <a
                  href="https://minland.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'ভূমি মন্ত্রণালয়' : 'Ministry of Land'} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://land.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'জাতীয় ভূমি সেবা পোর্টাল (land.gov.bd)' : 'Land Information Portal (land.gov.bd)'}{' '}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://mutation.land.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'ই-নামজারি কেন্দ্রীয় প্ল্যাটফর্ম' : 'e-Mutation Central Portal'}{' '}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://eregistration.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'ই-রেজিস্ট্রেশন পোর্টাল' : 'Registration Automation (eregistration.gov.bd)'}{' '}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Governance & Privacy Notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'আইনগত দায়মুক্তি' : 'Public Disclaimer'}
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'bn'
                ? 'ল্যান্ডটেক বিডি একটি স্বাধীন মূল্যায়ন প্রোটোটাইপ। বাস্তব রূপায়নের ক্ষেত্রে ভূমি মন্ত্রণালয় ও নিবন্ধন অধিদপ্তরের আনুষ্ঠানিক অনুমোদন প্রয়োজন।'
                : 'LandTech BD is an independent technical demonstrator for hackathon evaluation. Real deployment requires formal bilateral API protocols, SAT Act compliance, and authorization from the Ministry of Land and Registration Directorate.'}
            </p>
            <p className="text-slate-500 text-[10px]">
              {language === 'bn'
                ? 'রিঅ্যাক্ট, টাইপস্ক্রিপ্ট ও টেইলউইন্ড সিএসএস দিয়ে নির্মিত। কোনো বহিরাগত সার্ভার কল ছাড়া চলে।'
                : 'Built with React, TypeScript & Tailwind CSS. Zero external network requests.'}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} LandTech BD (BhumiVerify) — Demonstration Prototype.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              {language === 'bn' ? 'রোল-নিয়ন্ত্রিত প্রবেশাধিকার' : 'Role-Controlled Access Protocol'}
            </span>
            <span>Version 1.0.0-hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

