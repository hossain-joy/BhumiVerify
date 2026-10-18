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
    return 'bg-emerald-600 text-white';
  };

  const getProgressBarColor = () => {
    if (quota.isExceeded) return 'bg-rose-600';
    if (quota.used >= 4) return 'bg-amber-500';
    return 'bg-emerald-600';
  };

  if (compact) {
    return (
      <div
        className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
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
            <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0" />
          )}
          <span className="font-bold text-sm">
            {isBn ? 'কোটা:' : 'Quota:'}{' '}
            <span className="font-mono">
              {isBn ? toBengaliNumerals(quota.used) : quota.used}/{isBn ? toBengaliNumerals(quota.limit) : quota.limit}
            </span>{' '}
            {quota.isTestingMode ? (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                {isBn ? 'টেস্টিং মোড' : 'Testing'}
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-600">
                ({isBn ? `${toBengaliNumerals(quota.remaining)}টি বাকি` : `${quota.remaining} left`})
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-16 sm:w-20 bg-white rounded-full h-2 overflow-hidden border border-slate-200">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
              style={{ width: `${quota.percentage}%` }}
            />
          </div>
          {quota.isExceeded && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
              {isBn ? 'পূর্ণ' : 'Full'}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-5 shadow-2xs space-y-3.5 transition-all ${
        quota.isExceeded
          ? 'bg-rose-50/60 border-rose-200'
          : quota.used >= 4
          ? 'bg-amber-50/50 border-amber-200'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Clean Header & Count */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
              quota.isExceeded
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : quota.used >= 4
                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {quota.isExceeded ? (
              <AlertOctagon className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                {isBn ? 'মাসিক আবেদন কোটা' : 'Monthly Verification Quota'}
              </h2>
              {quota.isTestingMode && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {isBn ? 'টেস্টিং মোড: সীমাহীন আবেদন উন্মুক্ত' : 'Testing Mode: Unlimited'}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? `নবায়ন: ${quota.resetDateFormattedBn}` : `Resets: ${quota.resetDateFormatted}`}
            </span>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
          <span className="text-xl font-black text-slate-900 font-mono">
            {isBn ? toBengaliNumerals(quota.used) : quota.used}
          </span>
          <span className="text-sm font-bold text-slate-400">/</span>
          <span className="text-sm font-bold text-slate-500 font-mono">
            {isBn ? toBengaliNumerals(quota.limit) : quota.limit}
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ml-1 ${getTierColor()}`}>
            {quota.isTestingMode
              ? (isBn ? 'উন্মুক্ত' : 'UNLIMITED')
              : quota.isExceeded
              ? (isBn ? 'পূর্ণ' : 'FULL')
              : (isBn ? `${toBengaliNumerals(quota.remaining)}টি বাকি` : `${quota.remaining} LEFT`)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
          style={{ width: `${quota.percentage}%` }}
        />
      </div>

      {/* Exceeded Warning Notice if Exceeded */}
      {quota.isExceeded && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-950 flex items-center gap-2.5">
          <AlertOctagon className="w-5 h-5 shrink-0 text-rose-600" />
          <p className="font-semibold leading-relaxed">
            {isBn
              ? `চলতি মাসের কোটা পূর্ণ। আগামী ${quota.resetDateFormattedBn} তারিখে রিসেট হবে।`
              : `Monthly limit reached. Resets on ${quota.resetDateFormatted}.`}
          </p>
        </div>
      )}
    </div>
  );
};
