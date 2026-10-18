import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSavedChecks, SavedVerificationTask } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  FileText,
  CheckSquare,
  Plus,
  CheckCircle2,
  Clock,
  Circle,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { MonthlyQuotaCard } from '../../components/land/MonthlyQuotaCard';
import { getMonthlyQuota } from '../../utils/quotaService';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { savedChecks, toggleTaskStatus } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // State for active task filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');

  // Metrics calculation
  const totalChecks = savedChecks?.length || 0;
  
  // Flatten tasks with parent check metadata
  const tasksWithCheck = (savedChecks || []).flatMap((c) =>
    (c?.verificationTasks || []).map((t) => ({
      ...t,
      checkId: c.id,
      checkNickname: c.nickname,
      mouza: c.mouza,
      dagNumber: c.dagNumber,
      khatianNumber: c.khatianNumber,
    }))
  );

  const totalTasks = tasksWithCheck.length;
  const completedTasks = tasksWithCheck.filter((t) => t && t.status === 'completed').length;
  const inProgressTasks = tasksWithCheck.filter((t) => t && t.status === 'in_progress').length;
  const pendingTasks = tasksWithCheck.filter((t) => t && t.status === 'not_started').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasksWithCheck.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.status === activeFilter;
  });

  const quota = getMonthlyQuota(currentUser?.id);

  const handleTaskToggle = (checkId: string, taskId: string) => {
    toggleTaskStatus(checkId, taskId);
  };

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

      {/* Diligence Tasks Progress Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-gov-primary flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {isBn ? 'যাচাইকরণ কাজের অগ্রগতি' : 'Verification Progress'}
              </h2>
              <p className="text-xs text-slate-500">
                {isBn
                  ? `${toBengaliNumerals(completedTasks)} / ${toBengaliNumerals(totalTasks)} কাজ সম্পন্ন`
                  : `${completedTasks} of ${totalTasks} tasks completed`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-gov-primary bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {isBn ? toBengaliNumerals(completionPercentage) : completionPercentage}% {isBn ? 'সম্পন্ন' : 'Done'}
            </span>
            {activeFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="text-[11px] text-gov-primary hover:underline font-semibold px-2 py-0.5 rounded cursor-pointer"
              >
                {isBn ? 'সব দেখুন' : 'Show All'}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="bg-gov-primary h-2 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* 3 Clickable Functional Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          {/* Completed Card */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'completed' ? 'all' : 'completed')}
            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
              activeFilter === 'completed'
                ? 'bg-emerald-100/90 border-emerald-400 ring-2 ring-emerald-300 shadow-xs'
                : 'bg-emerald-50/60 border-emerald-200 hover:bg-emerald-100/60 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xl font-extrabold text-emerald-950 block">
                {isBn ? toBengaliNumerals(completedTasks) : completedTasks}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-800 block">
              {isBn ? 'সম্পন্ন' : 'Completed'}
            </span>
            <span className="text-[10px] text-emerald-600 font-medium">
              {activeFilter === 'completed' ? (isBn ? '✓ ফিল্টার সক্রিয়' : 'Active filter') : (isBn ? 'ফিল্টার করতে ক্লিক করুন' : 'Click to filter')}
            </span>
          </button>

          {/* In Progress Card */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'in_progress' ? 'all' : 'in_progress')}
            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
              activeFilter === 'in_progress'
                ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                : 'bg-amber-50/60 border-amber-200 hover:bg-amber-100/60 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-xl font-extrabold text-amber-950 block">
                {isBn ? toBengaliNumerals(inProgressTasks) : inProgressTasks}
              </span>
            </div>
            <span className="text-xs font-bold text-amber-800 block">
              {isBn ? 'চলমান' : 'In Progress'}
            </span>
            <span className="text-[10px] text-amber-600 font-medium">
              {activeFilter === 'in_progress' ? (isBn ? '✓ ফিল্টার সক্রিয়' : 'Active filter') : (isBn ? 'ফিল্টার করতে ক্লিক করুন' : 'Click to filter')}
            </span>
          </button>

          {/* Pending Card */}
          <button
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'not_started' ? 'all' : 'not_started')}
            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
              activeFilter === 'not_started'
                ? 'bg-slate-200 border-slate-400 ring-2 ring-slate-300 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Circle className="w-4 h-4 text-slate-500" />
              <span className="text-xl font-extrabold text-slate-900 block">
                {isBn ? toBengaliNumerals(pendingTasks) : pendingTasks}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-700 block">
              {isBn ? 'বাকি' : 'Pending'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {activeFilter === 'not_started' ? (isBn ? '✓ ফিল্টার সক্রিয়' : 'Active filter') : (isBn ? 'ফিল্টার করতে ক্লিক করুন' : 'Click to filter')}
            </span>
          </button>
        </div>

        {/* Interactive Verification Task List */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-extrabold text-slate-500 tracking-wider flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" />
              <span>
                {activeFilter === 'all'
                  ? isBn ? 'সকল যাচাইকরণ কাজ' : 'All Verification Tasks'
                  : activeFilter === 'completed'
                  ? isBn ? 'সম্পন্ন যাচাইকরণ কাজ' : 'Completed Tasks'
                  : activeFilter === 'in_progress'
                  ? isBn ? 'চলমান যাচাইকরণ কাজ' : 'In-Progress Tasks'
                  : isBn ? 'বাকি যাচাইকরণ কাজ' : 'Pending Tasks'}
              </span>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                {isBn ? toBengaliNumerals(filteredTasks.length) : filteredTasks.length}
              </span>
            </h3>

            <p className="text-[11px] text-slate-400 hidden sm:block">
              {isBn ? 'স্ট্যাটাস পরিবর্তন করতে চেক করুন' : 'Click icon to cycle task status'}
            </p>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
              {isBn ? 'এই ক্যাটাগরিতে কোনো কাজ পাওয়া যায়নি।' : 'No tasks match the selected filter.'}
            </div>
          ) : (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredTasks.map((t) => (
                <div
                  key={`${t.checkId}-${t.id}`}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                    t.status === 'completed'
                      ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-700'
                      : t.status === 'in_progress'
                      ? 'bg-amber-50/40 border-amber-200/80 text-slate-800'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleTaskToggle(t.checkId, t.id)}
                    className="mt-0.5 shrink-0 focus:outline-hidden cursor-pointer"
                    title={isBn ? 'কাজের স্ট্যাটাস পরিবর্তন করুন' : 'Toggle task status'}
                    aria-label="Toggle task status"
                  >
                    {t.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 hover:opacity-80 transition-opacity" />
                    ) : t.status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-amber-600 hover:opacity-80 transition-opacity" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <p
                        className={`text-xs font-bold leading-snug ${
                          t.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {t.title}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {t.status === 'completed'
                          ? isBn ? 'সম্পন্ন' : 'Completed'
                          : t.status === 'in_progress'
                          ? isBn ? 'চলমান' : 'In Progress'
                          : isBn ? 'বাকি' : 'Pending'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {t.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-600">
                        {t.checkNickname}
                      </span>
                      <span>•</span>
                      <span>
                        {isBn ? 'খতিয়ান: ' : 'Khatian: '}
                        <strong className="text-slate-600 font-mono">
                          {isBn ? toBengaliNumerals(t.khatianNumber) : t.khatianNumber}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        {isBn ? 'দাগ: ' : 'Dag: '}
                        <strong className="text-slate-600 font-mono">
                          {isBn ? toBengaliNumerals(t.dagNumber) : t.dagNumber}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/verification-plan?checkId=${t.checkId}`}
                    className="p-1 text-slate-400 hover:text-gov-primary shrink-0 self-center"
                    title={isBn ? 'সম্পূর্ণ পরিকল্পনা দেখুন' : 'View full plan'}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-4 border-t border-slate-100">
          <Link
            to="/verification-plan"
            className="w-full sm:flex-1 btn-primary text-xs py-2.5 px-4 font-bold flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{isBn ? 'সম্পূর্ণ যাচাই ট্র্যাকার খুলুন' : 'Open Full Verification Plan'}</span>
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
