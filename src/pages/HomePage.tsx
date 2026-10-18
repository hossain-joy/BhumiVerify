import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Disclaimer } from '../components/common/Disclaimer';
import {
  ShieldCheck,
  ArrowRight,
  Search,
  FileText,
  UserPlus,
  LogIn,
  LogOut,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  FolderOpen,
  LayoutDashboard,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const isBn = language === 'bn';

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const primaryScenarios = [
    {
      id: 'BS-DEMO-001',
      title: isBn ? '১. ধারাবাহিক তথ্য' : '1. Consistent Information',
      statusLabel: isBn ? 'বড় অসঙ্গতি পাওয়া যায়নি' : 'No Major Issue Detected in Available Data',
      badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300',
      description: isBn
        ? 'সাব-রেজিস্ট্রি দলিল, ই-নামজারি আবেদন এবং সহকারী কমিশনার (ভূমি)-র নামজারি আদেশ ধারাবাহিকভাবে অন্তর্ভুক্ত।'
        : 'Includes registered deed, mutation application, and completed mutation order. Standard checks still required.',
      parcelDetails: isBn ? 'গুলশান • খতিয়ান ৫৪১ • দাগ ৮৫' : 'Gulshan • Khatian 541 • Dag 85',
    },
    {
      id: 'BS-DEMO-002',
      title: isBn ? '২. পর্যালোচনা জরুরি' : '2. Review Recommended',
      statusLabel: isBn ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      description: isBn
        ? 'হস্তান্তর দলিল ও নামজারি আবেদন রয়েছে, তবে কোনো চূড়ান্ত নিষ্পত্তির আদেশ অন্তর্ভুক্ত নেই।'
        : 'Includes registered deed and mutation application, but no completion event is recorded. Must be checked independently.',
      parcelDetails: isBn ? 'তেজগাঁও শি/এ • খতিয়ান ১২০৪ • দাগ ৪০২' : 'Tejgaon I/A • Khatian 1204 • Dag 402',
    },
    {
      id: 'BS-DEMO-003',
      title: isBn ? '৩. তথ্য অসম্পূর্ণ' : '3. Information Incomplete',
      statusLabel: isBn ? 'তথ্য অসম্পূর্ণ' : 'Information Incomplete',
      badgeClass: 'bg-blue-50 text-blue-900 border-blue-300',
      description: isBn
        ? 'সীমিত ঘটনা প্রবাহ এবং অনুপস্থিত জমির পরিমাপ ও পূর্বতন দলিলের তথ্য।'
        : 'Contains limited event history and missing supporting identifiers such as land area and deed reference.',
      parcelDetails: isBn ? 'ধানমন্ডি আ/এ • খতিয়ান ৮৮ • দাগ ১১৮' : 'Dhanmondi R/A • Khatian 88 • Dag 118',
    },
  ];

  return (
    <div className="space-y-12 pb-16 animate-fade-up">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-2xs text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-gov-primary">
          <ShieldCheck className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>BhumiVerify • Verify Before You Buy.</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {isBn
            ? 'জমি কেনার আগে সঠিক তথ্য যাচাই করুন'
            : 'Verify Land Records Before You Buy.'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isBn
            ? 'ডিজিটাল পদ্ধতিতে জমির খতিয়ান, দাগ, মালিকানা ও নামজারি তথ্যের সঠিকতা যাচাই করার নির্ভরযোগ্য প্ল্যাটফর্ম।'
            : 'A modern digital platform for verifying land records, mutation trails, and ownership records in Bangladesh.'}
        </p>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/check-land"
            className="btn-primary px-7 py-3 text-sm font-bold shadow-xs flex items-center gap-2"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>{isBn ? 'জমি যাচাই শুরু করুন' : 'Check a land parcel'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <Link
                to="/dashboard"
                className="btn-secondary px-6 py-3 text-sm font-semibold flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'আমার ড্যাশবোর্ড' : 'Go to Dashboard'}</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-5 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>{isBn ? 'লগআউট' : 'Log out'}</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-xs flex items-center gap-2 transition-colors"
              >
                <UserPlus className="w-4 h-4" aria-hidden="true" />
                <span>{isBn ? 'অ্যাকাউন্ট খুলুন' : 'Create account'}</span>
              </Link>

              <Link
                to="/login"
                className="btn-secondary px-5 py-3 text-sm font-medium flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{isBn ? 'লগইন' : 'Log in'}</span>
              </Link>
            </>
          )}

          <Link
            to="/how-it-works"
            className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 underline flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{isBn ? 'কিভাবে কাজ করে' : 'How it works'}</span>
          </Link>
        </div>
      </section>

      {/* 3-Step Explainer */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isBn ? 'সহজ ৩ ধাপে জমি যাচাই' : 'Simple Three-Step Land Verification'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isBn
              ? 'পরিচিতি তথ্য প্রবেশ → রেকর্ড ও ঘটনা পর্যালোচনা → পূর্ণাঙ্গ প্রতিবেদন'
              : 'Enter parcel details → Review records & timeline → Get verified report'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-gov-primary border border-emerald-200 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isBn ? '১. জমির পরিচিতি প্রদান' : '1. Enter parcel identifiers'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান এবং দাগ নম্বর প্রবেশ করান।'
                : 'Provide Division, District, Upazila/Thana, Mouza, Khatian number, and Dag/plot number.'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isBn ? '২. ঘটনা ও রেকর্ড পর্যালোচনা' : '2. Review records & timeline'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'সাব-রেজিস্ট্রি দলিল, নামজারি আবেদন এবং নামজারি নিষ্পত্তির ক্রম কালানুক্রমিকভাবে দেখুন।'
                : 'Inspect distinct chronological events: transfer-related deeds, mutation applications, and orders.'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isBn ? '৩. প্রতিবেদন ও যাচাই পরিকল্পনা' : '3. Track verification plan & documents'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'অনুপস্থিত তথ্য চিহ্নিত করুন এবং প্রয়োজনীয় দলিলের চেকলিস্ট তৈরি করুন।'
                : 'Identify missing documents and track actionable steps before committing funds.'}
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Scenario Cards */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {isBn ? 'কেস স্টাডি ও প্রতিবেদন' : 'Case Studies & Reports'}
            </h2>
            <p className="text-xs text-slate-500">
              {isBn
                ? 'ফলাফল ও যাচাইয়ের ধরণ দেখতে নিচের কেস স্টাডিগুলো বাছাই করুন।'
                : 'Select a case study below to inspect findings and timeline details.'}
            </p>
          </div>

          <Link
            to="/demo"
            className="text-xs font-semibold text-gov-primary hover:underline flex items-center gap-1"
          >
            <span>{isBn ? 'সকল কেস স্টাডি দেখুন' : 'View all reports'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
                  <span>{isBn ? 'প্রতিবেদন দেখুন' : 'Open Report'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-purchase diligence box */}
      <section className="bg-slate-900 text-slate-200 rounded-2xl p-8 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">{isBn ? 'স্বাধীন অনুসন্ধান চেকলিস্ট' : 'Independent Diligence Checklist'}</span>
        </div>
        <h3 className="text-xl font-bold text-white">{isBn ? 'স্বয়ংক্রিয় অনলাইন তথ্য কেন কখনোই শতভাগ আইনি সুরক্ষার নিশ্চয়তা দেয় না' : 'Why automated land checks cannot guarantee safety'}</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {isBn
            ? 'বাংলাদেশে কোনো ডিজিটাল পোর্টাল চেক কখনোই মাঠপর্যায়ের সশরীরে অনুসন্ধানকে প্রতিস্থাপন করতে পারে না:'
            : 'In Bangladesh, a digital portal check can never replace physical due diligence:'}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>{isBn ? 'নিল সার্চ (১২-২৫ বছর):' : 'Nil Search (12–25 Years):'}</strong> {isBn ? 'সাব-রেজিস্ট্রি অফিসের ১ ও ২ নম্বর বালাম বই সশরীরে তল্লাশ করে দায়মুক্ত সনদ যাচাই করা আবশ্যক।' : 'Must physically inspect Sub-Registry Book 1 & 2 indexes.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>{isBn ? 'জমির দখল:' : 'Physical Possession:'}</strong> {isBn ? 'জমিতে বিক্রেতার প্রত্যক্ষ ও নির্বিবাদ দখল আছে কি না তা স্থানীয় তদন্তের মাধ্যমে নিশ্চিত হন।' : 'Confirm seller holds undisputed ground possession on site.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>{isBn ? 'দলিল বনাম নামজারি:' : 'Mutation vs Deed:'}</strong> {isBn ? 'শুধু রেজিস্ট্রি দলিল থাকা মানেই রাজস্ব রেকর্ডে মালিকানা নিশ্চিত হওয়া নয়—নামজারি জরুরি।' : 'Registered deed does NOT update government revenue title.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>{isBn ? 'আইনজীবীর পরামর্শ:' : 'Legal Consultation:'}</strong> {isBn ? 'বায়না বা চূড়ান্ত চুক্তির আগে অভিজ্ঞ ভূমি আইনজীবীর মাধ্যমে স্বত্ব ও বায়া দলিল পরীক্ষা করুন।' : 'Always engage a qualified Bangladesh advocate before buying.'}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
