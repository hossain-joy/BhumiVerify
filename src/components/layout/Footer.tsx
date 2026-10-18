import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldAlert, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gov-primary flex items-center justify-center text-white font-bold text-xs">
                BS
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                BhumiSure
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Verify Before You Buy.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশে জমি ক্রয়ের পূর্বে সম্ভাব্য ঝুঁকি শনাক্ত করতে, সংরক্ষিত রেকর্ড বুঝতে এবং কী যাচাই করতে হবে তা নিরূপণ করতে সহায়তা করে।'
                : 'Helps prospective land buyers organize identifiers, understand simulated records, and identify what to verify before purchasing.'}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-amber-300/90 text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Independent prototype · Fictional sample data</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'নেভিগেশন' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? 'হোমপেজ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/check" className="hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? 'জমি যাচাই করুন' : 'Check Land'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? 'আমাদের সম্পর্কে ও সীমাবদ্ধতা' : 'About & Limitations'}
                </Link>
              </li>
            </ul>
          </div>

          {/* External Official Resources (Clearly marked as non-integrated external links) */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {language === 'bn' ? 'অফিশিয়াল রিসোর্স ও পোর্টাল' : 'External Official Portals'}
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              {language === 'bn'
                ? 'দ্রষ্টব্য: এই বাহ্যিক লিংকগুলো তথ্যগত রেফারেন্সের জন্য প্রদত্ত। ভূমিসিউর কোনো সরকারি পোর্টাল থেকে ডেটা সংগ্রহ বা লাইভ যাচাই করে না।'
                : 'Note: These external government links are provided for reference only. BhumiSure has NOT retrieved or verified data from these external services.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <a
                href="https://land.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>National Land Portal (land.gov.bd)</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" aria-label="(opens in a new tab)" />
              </a>

              <a
                href="https://mutation.land.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>e-Mutation Portal (mutation.land.gov.bd)</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" aria-label="(opens in a new tab)" />
              </a>

              <a
                href="https://eregistration.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>Registration Portal (eregistration.gov.bd)</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" aria-label="(opens in a new tab)" />
              </a>

              <a
                href="https://minland.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>Ministry of Land (minland.gov.bd)</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" aria-label="(opens in a new tab)" />
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Limitations & Bottom Copyright Bar */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-4xl">
            <strong>{language === 'bn' ? 'সংবিধিবদ্ধ আইনি সীমাবদ্ধতা:' : 'Statutory Prototype Disclaimer:'}</strong>{' '}
            {language === 'bn'
              ? 'ভূমিসিউর একটি স্বাধীন প্রযুক্তিগত প্রোটোটাইপ। এটি কোনো সরকারি রেকর্ড রুম বা আদালতের বিকল্প নয় এবং কোনো জমিকে সম্পূর্ণ নিরাপদ, প্রতারণামুক্ত বা মালিকানাপ্রাপ্ত বলে প্রত্যয়ন করে না। কোনো রেকর্ড না থাকা বিরোধমুক্ত হওয়ার প্রমাণ নয়। জমি ক্রয়ের পূর্বে সাব-রেজিস্ট্রি এবং উপজেলা ভূমি অফিসে সশরীরে যাচাই ও বায়া দলিল তল্লাশ বাধ্যতামূলক।'
              : 'BhumiSure is an independent evaluation prototype using fictional sample records. It does not search real government records, confirm legal ownership, or guarantee clear title. The absence of negative signals must never be interpreted as evidence of safety. Physical title searches at the relevant Sub-Registry and AC (Land) office are indispensable.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-2 gap-2">
            <p>© {new Date().getFullYear()} BhumiSure — Independent prototype · Fictional sample data.</p>
            <div className="flex items-center gap-3">
              <Link to="/about" className="hover:text-slate-300 underline">
                {language === 'bn' ? 'আইনগত সীমাবদ্ধতা পড়ুন' : 'Read Limitations'}
              </Link>
              <span>•</span>
              <span>Frontend MVP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
