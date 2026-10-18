import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals, formatStatusLabel } from '../../utils/formatStatus';
import {
  FileText,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Search,
} from 'lucide-react';
import { MonthlyQuotaCard } from '../../components/land/MonthlyQuotaCard';
import { getMonthlyQuota } from '../../utils/quotaService';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { savedChecks } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const getStatusBadge = (status: string) => {
    if (
      status === 'No Major Issue Detected in Available Data' ||
      status === 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি' ||
      status === 'বড় অসঙ্গতি পাওয়া যায়নি' ||
      status === 'নির্দায়'
    ) {
      return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    }
    if (
      status === 'Review Recommended' ||
      status === 'পর্যালোচনা জরুরি' ||
      status === 'সতর্কতা'
    ) {
      return 'bg-amber-50 text-amber-900 border-amber-300';
    }
    return 'bg-blue-50 text-blue-900 border-blue-300';
  };

  // Metrics calculation
  const totalChecks = savedChecks?.length || 0;
  const clearChecks = (savedChecks || []).filter(
    (c) =>
      c.statusLabel.includes('No Major') ||
      c.statusLabel.includes('বড় অসঙ্গতি') ||
      c.statusLabel.includes('নির্দায়')
  ).length;
  const reviewChecks = (savedChecks || []).filter(
    (c) =>
      c.statusLabel.includes('Review') ||
      c.statusLabel.includes('পর্যালোচনা') ||
      c.statusLabel.includes('সতর্কতা')
  ).length;

  const quota = getMonthlyQuota(currentUser?.id);

  return (
    <div className="w-full space-y-6 animate-fade-up">
      {/* Welcome & Primary Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isBn ? 'স্বাগতম' : 'Welcome back'}, {currentUser?.name?.split(' ')[0] || (isBn ? 'ব্যবহারকারী' : 'User')}
          </h1>

          {/* Monthly Quota Indicator Pill */}
          <div className="max-w-sm sm:max-w-md">
            <Link
              to="/check-land"
              className="block hover:opacity-95 transition-opacity"
              title={isBn ? 'কোটা ও আবেদন দেখতে ক্লিক করুন' : 'View quota details'}
            >
              <MonthlyQuotaCard compact={true} quota={quota} />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/check-land"
            className="btn-primary py-2.5 px-5 font-bold text-xs inline-flex items-center gap-2 shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন জমি যাচাই' : 'Check Land Parcel'}</span>
          </Link>
          <Link
            to="/checks"
            className="btn-secondary py-2.5 px-4 font-semibold text-xs inline-flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>{isBn ? 'সকল সংরক্ষিত জমি' : 'All Saved Checks'} ({isBn ? toBengaliNumerals(totalChecks) : totalChecks})</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Saved */}
        <Link
          to="/checks"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isBn ? 'মোট সংরক্ষিত জমি' : 'Total Saved Land'}
            </span>
            <span className="text-3xl font-black text-slate-900 font-mono block">
              {isBn ? toBengaliNumerals(totalChecks) : totalChecks}
            </span>
            <span className="text-xs text-gov-primary font-semibold group-hover:underline flex items-center gap-1">
              <span>{isBn ? 'তালিকা দেখুন' : 'View all'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
        </Link>

        {/* Clear Title */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isBn ? 'নির্দায় জমি' : 'Clear Title Land'}
            </span>
            <span className="text-3xl font-black text-emerald-600 font-mono block">
              {isBn ? toBengaliNumerals(clearChecks) : clearChecks}
            </span>
            <span className="text-xs text-emerald-700 font-medium">
              {isBn ? 'বড় কোনো অসঙ্গতি নেই' : 'No major issues'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Review Needed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isBn ? 'পর্যালোচনা জরুরি' : 'Review Recommended'}
            </span>
            <span className="text-3xl font-black text-amber-600 font-mono block">
              {isBn ? toBengaliNumerals(reviewChecks) : reviewChecks}
            </span>
            <span className="text-xs text-amber-700 font-medium">
              {isBn ? 'সতর্কতা ও যাচাই প্রয়োজন' : 'Action recommended'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Saved Land Checks Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-gov-primary flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {isBn ? 'সাম্প্রতিক সংরক্ষিত জমি তালিকা' : 'Recently Saved Land Checks'}
              </h2>
              <p className="text-xs text-slate-500">
                {isBn
                  ? 'আপনার সংরক্ষিত খতিয়ান ও দাগ নম্বরের সর্বশেষ প্রাক-নিবন্ধন তথ্য।'
                  : 'Latest pre-registration diligence for your saved parcels.'}
              </p>
            </div>
          </div>

          <Link
            to="/checks"
            className="text-xs font-bold text-gov-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{isBn ? 'সব দেখুন' : 'View all'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {savedChecks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800">
                {isBn ? 'এখনো কোনো জমি সংরক্ষণ করা হয়নি' : 'No Land Parcels Saved Yet'}
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isBn
                  ? 'খতিয়ান ও দাগ নম্বর প্রবেশ করে জমি অনুসন্ধান করুন এবং ফলাফল সংরক্ষণ করুন।'
                  : 'Search for land parcels by khatian and dag numbers to save verification records.'}
              </p>
            </div>
            <Link
              to="/check-land"
              className="btn-primary text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'প্রথম জমি যাচাই করুন' : 'Start First Land Check'}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedChecks.slice(0, 6).map((c) => {
              const statusShort = formatStatusLabel(c.statusLabel, isBn);
              const badgeClasses = getStatusBadge(c.statusLabel);

              return (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white shadow-2xs flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeClasses}`}>
                        {statusShort}
                      </span>
                      <span className="font-mono text-xs text-slate-400 font-semibold">
                        {c.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {c.nickname}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">
                          {c.mouza}, {c.upazila}, {c.district}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          {isBn ? 'খতিয়ান নম্বর' : 'Khatian'}
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          {isBn ? toBengaliNumerals(c.khatianNumber) : c.khatianNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          {isBn ? 'দাগ নম্বর' : 'Dag'}
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          {isBn ? toBengaliNumerals(c.dagNumber) : c.dagNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/check-report/${c.id}`}
                    className="w-full btn-secondary text-xs py-2 px-3 font-bold text-gov-primary flex items-center justify-center gap-1.5"
                  >
                    <span>{isBn ? 'প্রতিবেদন দেখুন' : 'View Report'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
