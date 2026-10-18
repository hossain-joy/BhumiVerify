import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  ArrowRight,
  UserPlus,
  LogIn,
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
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
      statusLabel: isBn ? 'বড় অসঙ্গতি নেই' : 'No Major Issues',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      location: isBn ? 'গুলশান • খতিয়ান ৫৪১ • দাগ ৮৫' : 'Gulshan • Khatian 541 • Dag 85',
    },
    {
      id: 'BS-DEMO-002',
      title: isBn ? '২. পর্যালোচনা জরুরি' : '2. Review Recommended',
      statusLabel: isBn ? 'পর্যালোচনা প্রয়োজন' : 'Review Needed',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      location: isBn ? 'তেজগাঁও শি/এ • খতিয়ান ১২০৪ • দাগ ৪০২' : 'Tejgaon I/A • Khatian 1204 • Dag 402',
    },
    {
      id: 'BS-DEMO-003',
      title: isBn ? '৩. তথ্য অসম্পূর্ণ' : '3. Information Incomplete',
      statusLabel: isBn ? 'অসম্পূর্ণ রেকর্ড' : 'Incomplete Record',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
      location: isBn ? 'ধানমন্ডি আ/এ • খতিয়ান ৮৮ • দাগ ১১৮' : 'Dhanmondi R/A • Khatian 88 • Dag 118',
    },
  ];

  return (
    <div className="space-y-10 pb-12 animate-fade-up w-full max-w-5xl xl:max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs text-center space-y-6">
        {/* Civic Logo Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-gov-primary shadow-2xs">
          <img src="/logo.png" alt="গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" className="w-5 h-5 rounded-full bg-white object-contain" />
          <span>{isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • ভূমি মন্ত্রণালয়' : "People's Republic of Bangladesh • Ministry of Land"}</span>
        </div>

        {/* Clear Crisp Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isBn ? 'জমি কেনার আগে সঠিক তথ্য যাচাই করুন' : 'Verify Land Records Before You Buy'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
            {isBn
              ? 'খতিয়ান, দাগ, মালিকানা ও নামজারি তথ্যের সঠিকতা যাচাই করার ডিজিটাল প্ল্যাটফর্ম।'
              : 'The official digital service to verify land titles, mutation status, and ownership records.'}
          </p>
        </div>

        {/* Primary Action Card */}
        <div className="p-4 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 max-w-lg mx-auto flex flex-col items-center gap-3 shadow-2xs">
          <Link
            to="/check-land"
            className="w-full btn-primary py-3.5 px-8 text-base font-extrabold shadow-sm flex items-center justify-center gap-2.5 rounded-xl hover:shadow-md transition-all"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
            <span>{isBn ? 'লগইন করে জমি যাচাই করুন' : 'Sign In & Search Land'}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>

          <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
            <span>🔒</span>
            <span>{isBn ? 'জমি অনুসন্ধানের জন্য অ্যাকাউন্টে লগইন থাকা বাধ্যতামূলক' : 'Account login is required to access land search'}</span>
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
            <Link
              to="/register"
              className="hover:text-gov-primary hover:underline transition-colors"
            >
              {isBn ? 'অ্যাকাউন্ট খুলুন' : 'Create an Account'}
            </Link>
            <span>•</span>
            <Link
              to="/login"
              className="hover:text-gov-primary hover:underline transition-colors"
            >
              {isBn ? 'লগইন' : 'Log in'}
            </Link>
            <span>•</span>
            <Link
              to="/how-it-works"
              className="hover:text-gov-primary hover:underline transition-colors"
            >
              {isBn ? 'কিভাবে কাজ করে' : 'How it works'}
            </Link>
          </div>
        </div>
      </section>

      {/* Simple 3-Step Clean Cards */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 text-center tracking-tight">
          {isBn ? 'সহজ ৩ ধাপে জমি যাচাই' : 'Three Simple Steps'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-black text-sm flex items-center justify-center shrink-0 border border-emerald-200">
              ১
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {isBn ? 'তথ্য প্রবেশ' : '1. Enter Details'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {isBn ? 'বিভাগ, জেলা, খতিয়ান ও দাগ নম্বর' : 'Division, District, Khatian & Dag'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-black text-sm flex items-center justify-center shrink-0 border border-teal-200">
              ২
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {isBn ? 'রেকর্ড পর্যালোচনা' : '2. Review Records'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {isBn ? 'দলিল ও নামজারির ধারাবাহিক তথ্য' : 'Deed and mutation history'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 border border-blue-200">
              ৩
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {isBn ? 'প্রতিবেদন গ্রহণ' : '3. Get Report'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {isBn ? 'যাচাই রিপোর্ট ও চেকলিস্ট' : 'Verified report and checklist'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Sample Reports Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {isBn ? 'যাচাইকৃত নমুনা কেস স্টাডি' : 'Sample Case Studies'}
          </h2>
          <Link
            to="/demo"
            className="text-xs font-bold text-gov-primary hover:underline flex items-center gap-1"
          >
            <span>{isBn ? 'সব দেখুন' : 'View all'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryScenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${sc.badgeClass}`}>
                    {sc.statusLabel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">
                    {sc.id}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {sc.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {sc.location}
                </p>
              </div>

              <Link
                to={`/results?id=${sc.id}`}
                className="w-full btn-secondary text-xs py-2 px-3 font-bold text-gov-primary flex items-center justify-center gap-1.5"
              >
                <span>{isBn ? 'প্রতিবেদন দেখুন' : 'View Report'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
