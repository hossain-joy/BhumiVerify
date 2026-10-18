import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-700 p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/logo.png"
                  alt="ভূমি মন্ত্রণালয়"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight block">
                  {isBn ? 'ভূমিভেরিফাই' : 'BhumiVerify'}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium block">
                  {isBn ? 'ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ' : 'Ministry of Land, Bangladesh'}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {isBn
                ? 'জমি ক্রয়ের পূর্বে সঠিক তথ্য ও খতিয়ান যাচাইকরণের ডিজিটাল সেবা।'
                : 'Digital platform for verifying land titles and records before purchase.'}
            </p>
          </div>

          {/* Core Pages */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {isBn ? 'প্রধান পাতা' : 'Platform'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'হোমপেজ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'কিভাবে কাজ করে' : 'How It Works'}
                </Link>
              </li>
              <li>
                <Link to="/check-land" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'জমি যাচাই' : 'Check Land'}
                </Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'যাচাই প্রতিবেদন' : 'Verification Reports'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'আমাদের সম্পর্কে' : 'About'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {isBn ? 'আইন ও নীতি' : 'Legal & Trust'}
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <Link to="/terms" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'শর্তাবলী' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-emerald-300 transition-colors">
                  {isBn ? 'প্রশ্নোত্তর ও সাহায্য' : 'FAQ & Support'}
                </Link>
              </li>
            </ul>
          </div>

          {/* External Official Resources */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              {isBn ? 'অফিশিয়াল পোর্টালসমূহ' : 'External Portals'}
            </h4>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <a
                href="https://land.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>{isBn ? 'জাতীয় ভূমি সেবা পোর্টাল (land.gov.bd)' : 'National Land Portal'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </a>
              <a
                href="https://mutation.land.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>{isBn ? 'ই-নামজারি পোর্টাল (mutation.land.gov.bd)' : 'e-Mutation Portal'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </a>
              <a
                href="https://eregistration.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-between text-slate-300 group"
              >
                <span>{isBn ? 'সাব-রেজিস্ট্রি পোর্টাল (eregistration.gov.bd)' : 'Sub-Registry Portal'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>
              © {new Date().getFullYear()} {isBn ? 'ভূমিভেরিফাই (BhumiVerify)। সর্বস্বত্ব সংরক্ষিত।' : 'BhumiVerify. All rights reserved.'}
            </p>
            <div className="flex items-center gap-3">
              <Link to="/terms" className="hover:text-slate-300 underline">
                {isBn ? 'শর্তাবলী' : 'Terms'}
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-slate-300 underline">
                {isBn ? 'গোপনীয়তা' : 'Privacy'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
