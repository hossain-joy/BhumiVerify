import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Disclaimer } from '../components/common/Disclaimer';
import {
  ShieldCheck,
  ArrowRight,
  Search,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Three primary fictional sample scenario cards required by specification
  const primaryScenarios = [
    {
      id: 'BS-DEMO-001',
      title: isBn ? '১. ধারাবাহিক নমুনা তথ্য' : '1. Consistent Sample Information',
      statusLabel: isBn ? 'বড় অসঙ্গতি পাওয়া যায়নি' : 'No Major Issue Detected in Available Data',
      badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300',
      description: isBn
        ? 'সাব-রেজিস্ট্রি দলিল, ই-নামজারি আবেদন এবং সহকারী কমিশনার (ভূমি)-র নামজারি অনুমোদন আদেশ ধারাবাহিকভাবে অন্তর্ভুক্ত।'
        : 'Includes registered deed, mutation application, and completed mutation order in sample records. Standard checks still required.',
      parcelDetails: 'Gulshan • Khatian 541 • Dag 85',
    },
    {
      id: 'BS-DEMO-002',
      title: isBn ? '২. পর্যালোচনা জরুরি' : '2. Review Recommended',
      statusLabel: isBn ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      description: isBn
        ? 'হস্তান্তর দলিল ও নামজারি আবেদন রয়েছে, তবে নমুনা ডেটায় কোনো চূড়ান্ত নিষ্পত্তির আদেশ অন্তর্ভুক্ত নেই।'
        : 'Includes registered deed and mutation application, but no completion event exists in this sample. Must be checked independently.',
      parcelDetails: 'Tejgaon I/A • Khatian 1204 • Dag 402',
    },
    {
      id: 'BS-DEMO-003',
      title: isBn ? '৩. তথ্য অসম্পূর্ণ' : '3. Information Incomplete',
      statusLabel: isBn ? 'তথ্য অসম্পূর্ণ' : 'Information Incomplete',
      badgeClass: 'bg-blue-50 text-blue-900 border-blue-300',
      description: isBn
        ? 'সীমিত ঘটনা প্রবাহ এবং অনুপস্থিত জমির পরিমাপ ও পূর্বতন দলিলের তথ্য।'
        : 'Contains limited event history and missing supporting identifiers such as land area and deed reference.',
      parcelDetails: 'Dhanmondi R/A • Khatian 88 • Dag 118',
    },
  ];

  return (
    <div className="space-y-12 pb-16 animate-fade-up">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-2xs text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-gov-primary">
          <ShieldCheck className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>BhumiSure • Verify Before You Buy.</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {isBn
            ? 'জমি কেনার আগে জেনে নিন কী কী যাচাই করতে হবে'
            : 'Know what to check before you buy land.'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isBn
            ? 'ভূমিসিউর উপলব্ধ কাল্পনিক নমুনা ঘটনা এবং যাচাইযোগ্য বিষয়গুলো সুবিন্যস্তভাবে তুলে ধরে; এটি কোনো মালিকানা প্রতিষ্ঠা বা আইনি নিশ্চয়তা দেয় না।'
            : 'BhumiSure organizes available sample events and verification questions to help prospective buyers perform pre-purchase diligence. It does not establish ownership or legal safety.'}
        </p>

        {/* Primary and Secondary CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/check"
            className="btn-primary px-7 py-3 text-sm font-bold shadow-xs flex items-center gap-2"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>{isBn ? 'জমি যাচাই করুন' : 'Check a land parcel'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            to="/about"
            className="btn-secondary px-6 py-3 text-sm font-medium flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>{isBn ? 'আমাদের সম্পর্কে ও সীমাবদ্ধতা' : 'About BhumiSure'}</span>
          </Link>
        </div>

        {/* Visible, concise prototype disclaimer (not hidden in tooltip) */}
        <div className="pt-2 max-w-2xl mx-auto text-left">
          <Disclaimer compact={true} />
        </div>
      </section>

      {/* 3-Step Explainer */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isBn ? 'সহজ ৩ ধাপে প্রোটোটাইপ পর্যালোচনা' : 'Simple Three-Step Process'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isBn
              ? 'পরিচিতি তথ্য প্রবেশ → ঘটনা পর্যালোচনা → পরবর্তী করণীয় নিরূপণ'
              : 'Enter parcel identifiers → Review simulated event history → Understand missing information and next checks.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-gov-primary border border-emerald-200 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isBn ? '১. জমির পরিচিতি প্রদান' : '1. Enter parcel identifiers'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান এবং দাগ নম্বর প্রবেশ করান। দাগ নম্বর একা পর্যাপ্ত নয়।'
                : 'Provide Division, District, Upazila/Thana, Mouza, Khatian number, and Dag/plot number. A Dag number alone is insufficient.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isBn ? '২. নমুনা ঘটনা পর্যালোচনা' : '2. Review simulated event history'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'সাব-রেজিস্ট্রি দলিল, নামজারি আবেদন এবং নামজারি নিষ্পত্তির ক্রম কালানুক্রমিকভাবে দেখুন।'
                : 'Inspect distinct chronological events: transfer-related deeds, mutation applications, and completed mutation orders.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isBn ? '৩. অনুপস্থিত তথ্য ও পরবর্তী যাচাই' : '3. Understand missing info & next checks'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'নমুনায় কোন তথ্য অনুপস্থিত এবং কোনো অর্থ প্রদানের পূর্বে সংশ্লিষ্ট ভূমি অফিসে কী যাচাই করতে হবে তা জানুন।'
                : 'Identify what information is missing from the sample and see sensible independent verification steps before committing funds.'}
            </p>
          </div>
        </div>
      </section>

      {/* Three Fictional Sample Scenario Cards */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {isBn ? 'পরীক্ষামূলক কাল্পনিক দৃশ্যকল্প' : 'Try Fictional Sample Scenarios'}
            </h2>
            <p className="text-xs text-slate-500">
              {isBn
                ? 'সরাসরি প্রোটোটাইপের ফলাফল পরীক্ষা করতে নিচের নমুনাগুলো বাছাই করুন।'
                : 'Select one of three representative fictional scenarios to see the exact workflow and status output.'}
            </p>
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            3 sample scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {primaryScenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${sc.badgeClass}`}>
                    {sc.statusLabel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {sc.id}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-gov-primary transition-colors">
                  {sc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {sc.description}
                </p>

                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                  {sc.parcelDetails}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/results?id=${sc.id}`}
                  className="w-full btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5 font-semibold text-gov-primary hover:bg-emerald-50 transition-colors"
                >
                  <span>{isBn ? 'এই দৃশ্যকল্প পরীক্ষা করুন' : 'Open Sample Result'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Statutory Notice */}
      <section className="max-w-4xl mx-auto">
        <Disclaimer compact={false} />
      </section>
    </div>
  );
};
