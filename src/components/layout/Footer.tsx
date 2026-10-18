import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gov-primary flex items-center justify-center text-white font-bold text-xs">
                BV
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                {language === 'bn' ? 'ভূমিভেরিফাই' : 'BhumiVerify'}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশে জমি ক্রয়ের পূর্বে সাব-রেজিস্ট্রি হস্তান্তর দলিল, ই-নামজারি আবেদন এবং রাজস্ব রেকর্ডের সংকেত যাচাই করার মুক্ত ডিজিটাল মূল্যায়ন প্ল্যাটফর্ম।'
                : 'A public evaluation platform for pre-registration land transaction signals in Bangladesh. Inspect deed records, e-mutation progress, and transaction risks before committing funds.'}
            </p>
            <div className="pt-1 text-[11px] text-amber-300/90 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {language === 'bn' ? 'কাল্পনিক ডেমো ডেটা নির্ভর প্রোটোটাইপ।' : 'Fictional demo data evaluation prototype.'}
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
                  : 'A registered transfer deed does not update the record of rights until AC (Land) approval.'}
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
                  ? 'ডেমো ডেটায় কোনো সংকেত না পাওয়ার অর্থ এই নয় যে জমিটি বিরোধমুক্ত বা ঝুঁকিমুক্ত।'
                  : 'Absence of records in demo feed does not guarantee unencumbered or dispute-free title.'}
              </li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'নেভিগেশন' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? 'হোমপেজ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/check" className="hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? 'জমি যাচাই করুন' : 'Check Land Parcel'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? 'আমাদের সম্পর্কে ও আইনগত প্রেক্ষাপট' : 'About & Legal Context'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals & Statutory Notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'সরকারি রেফারেন্স পোর্টাল' : 'Government Portals'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <a
                  href="https://land.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'জাতীয় ভূমি সেবা (land.gov.bd)' : 'National Land Portal (land.gov.bd)'}{' '}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://mutation.land.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
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
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'ই-রেজিস্ট্রেশন সেবা' : 'Registration Portal (eregistration.gov.bd)'}{' '}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://minland.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  {language === 'bn' ? 'ভূমি মন্ত্রণালয়' : 'Ministry of Land'}{' '}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} BhumiVerify — Land Transaction Risk Assessment MVP.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'bn' ? 'কাল্পনিক ডেমো ডেটা দ্বারা চালিত' : 'Powered by Simulated Demo Records'}
            </span>
            <span>Frontend MVP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
