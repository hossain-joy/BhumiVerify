import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  FileText,
  CheckSquare,
  Plus,
} from 'lucide-react';
import { MonthlyQuotaCard } from '../../components/land/MonthlyQuotaCard';
import { getMonthlyQuota } from '../../utils/quotaService';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { savedChecks } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Metrics calculation
  const totalChecks = savedChecks?.length || 0;
  const allTasks = (savedChecks || []).flatMap((c) => c?.verificationTasks || []);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t && t.status === 'completed').length;
  const pendingTasks = allTasks.filter((t) => t && t.status !== 'completed').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const quota = getMonthlyQuota(currentUser?.id);

  return (
    <div className="space-y-6 animate-fade-up max-w-5xl mx-auto">
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
            <span>{isBn ? 'সংরক্ষিত জমি' : 'Saved Checks'} ({isBn ? toBengaliNumerals(totalChecks) : totalChecks})</span>
          </Link>
        </div>
      </div>

      {/* Diligence Tasks Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-gov-primary flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {isBn ? 'যাচাইকরণ কাজের অগ্রগতি' : 'Verification Progress'}
              </h2>
              <p className="text-xs text-slate-500">
                {isBn ? `${toBengaliNumerals(completedTasks)} / ${toBengaliNumerals(totalTasks)} কাজ সম্পন্ন` : `${completedTasks} of ${totalTasks} tasks completed`}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-gov-primary bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {isBn ? toBengaliNumerals(completionPercentage) : completionPercentage}% {isBn ? 'সম্পন্ন' : 'Done'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gov-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
            <span className="text-lg font-bold text-emerald-900 block">
              {isBn ? toBengaliNumerals(completedTasks) : completedTasks}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700">
              {isBn ? 'সম্পন্ন' : 'Completed'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-center">
            <span className="text-lg font-bold text-amber-900 block">
              {isBn ? toBengaliNumerals(allTasks.filter((t) => t && t.status === 'in_progress').length) : allTasks.filter((t) => t && t.status === 'in_progress').length}
            </span>
            <span className="text-[11px] font-semibold text-amber-700">
              {isBn ? 'চলমান' : 'In Progress'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-lg font-bold text-slate-800 block">
              {isBn ? toBengaliNumerals(allTasks.filter((t) => t && t.status === 'not_started').length) : allTasks.filter((t) => t && t.status === 'not_started').length}
            </span>
            <span className="text-[11px] font-semibold text-slate-600">
              {isBn ? 'বাকি' : 'Pending'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-slate-100">
          <Link
            to="/verification-plan"
            className="w-full sm:flex-1 btn-primary text-xs py-2.5 px-4 font-bold flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{isBn ? 'যাচাই ট্র্যাকার খুলুন' : 'Open Verification Tracker'}</span>
          </Link>
          <Link
            to="/checks"
            className="w-full sm:w-auto btn-secondary text-xs py-2.5 px-4 font-semibold flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>{isBn ? 'সংরক্ষিত জমি' : 'Saved Checks'} ({isBn ? toBengaliNumerals(totalChecks) : totalChecks})</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
