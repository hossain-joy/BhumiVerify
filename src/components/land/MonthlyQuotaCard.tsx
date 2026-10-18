import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import { QuotaStatus } from '../../utils/quotaService';
import {
  ShieldAlert,
  Calendar,
  AlertOctagon,
} from 'lucide-react';

interface MonthlyQuotaCardProps {
  quota: QuotaStatus;
  onQuotaChange?: (newQuota: QuotaStatus) => void;
  compact?: boolean;
}

export const MonthlyQuotaCard: React.FC<MonthlyQuotaCardProps> = ({
  quota,
  compact = false,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const getTierColor = () => {
    if (quota.isExceeded) return 'bg-rose-600 text-white';
    if (quota.used >= 4) return 'bg-amber-500 text-white';
    return 'bg-gov-primary text-white';
  };

  const getProgressBarColor = () => {
    if (quota.isExceeded) return 'bg-rose-600';
    if (quota.used >= 4) return 'bg-amber-500';
    return 'bg-gov-primary';
  };

  if (compact) {
    return (
      <div
        className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
          quota.isExceeded
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : quota.used >= 4
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-2">
          {quota.isExceeded ? (
            <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-gov-primary shrink-0" />
          )}
          <div className="space-y-0.5">
            <span className="font-bold block text-[11px] sm:text-xs">
              {isBn ? 'মাসিক আবেদন কোটা:' : 'Monthly Quota:'}{' '}
              <span className="font-mono">
                {isBn ? toBengaliNumerals(quota.used) : quota.used} / {isBn ? toBengaliNumerals(quota.limit) : quota.limit}
              </span>{' '}
              ({isBn ? `${toBengaliNumerals(quota.remaining)}টি বাকি` : `${quota.remaining} left`})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-16 sm:w-24 bg-white/80 rounded-full h-1.5 overflow-hidden border border-slate-200">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
              style={{ width: `${quota.percentage}%` }}
            />
          </div>
          {quota.isExceeded && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
              {isBn ? 'পূর্ণ' : 'Full'}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-4 transition-all ${
        quota.isExceeded
          ? 'bg-rose-50/60 border-rose-200 shadow-rose-100/50'
          : quota.used >= 4
          ? 'bg-amber-50/50 border-amber-200 shadow-amber-100/50'
          : 'bg-white border-slate-200 shadow-2xs'
      }`}
    >
      {/* Header and status badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              quota.isExceeded
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : quota.used >= 4
                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-gov-primary border border-emerald-200'
            }`}
          >
            {quota.isExceeded ? (
              <AlertOctagon className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {isBn ? 'মাসিক আবেদন কোটা' : 'Monthly Verification Quota'}
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getTierColor()}`}>
                {quota.isExceeded
                  ? (isBn ? 'কোটা পূর্ণ (৫/৫)' : 'LIMIT REACHED')
                  : quota.used >= 4
                  ? (isBn ? '১টি আবেদন বাকি' : '1 LEFT')
                  : (isBn ? `${toBengaliNumerals(quota.remaining)}টি বাকি` : `${quota.remaining} REMAINING`)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn
                ? `সর্বোচ্চ সীমা: ৫টি আবেদন • চলতি মাস: ${quota.currentMonthNameBn}`
                : `Maximum limit: 5 applications • ${quota.currentMonthName}`}
            </p>
          </div>
        </div>

        {/* Big Counter */}
        <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {isBn ? toBengaliNumerals(quota.used) : quota.used}
          </span>
          <span className="text-sm font-bold text-slate-400">/</span>
          <span className="text-sm font-bold text-slate-500 font-mono">
            {isBn ? toBengaliNumerals(quota.limit) : quota.limit}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 ml-1">
            {isBn ? 'ব্যবহৃত' : 'used'}
          </span>
        </div>
      </div>

      {/* Progress Bar & Reset Countdown */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>
            {isBn
              ? `ব্যবহৃত: ${toBengaliNumerals(quota.percentage)}%`
              : `Used: ${quota.percentage}%`}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-gov-primary" />
            <span>
              {isBn
                ? `নবায়ন: ${quota.resetDateFormattedBn}`
                : `Resets on: ${quota.resetDateFormatted}`}
            </span>
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
            style={{ width: `${quota.percentage}%` }}
          />
        </div>
      </div>

      {/* Exceeded Warning Notice if Exceeded */}
      {quota.isExceeded && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 shrink-0 text-rose-600" />
          <p className="leading-snug">
            {isBn
              ? `চলতি মাসে আপনার ৫টি আবেদন সম্পন্ন হয়েছে। আগামী ${quota.resetDateFormattedBn} তারিখে কোটা রিসেট হবে।`
              : `You have completed all 5 applications this month. Quota will reset on ${quota.resetDateFormatted}.`}
          </p>
        </div>
      )}
    </div>
  );
};
