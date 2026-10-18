import React from 'react';
import { ParcelReference } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { extractCoreStatus } from '../../lib/riskEngine';
import { assessParcelRisk } from '../../utils/landFunctions';
import { ShieldAlert, FileText, Clock, FileCheck2, AlertTriangle, Layers } from 'lucide-react';

interface RiskOverviewProps {
  parcel: ParcelReference;
}

export const RiskOverview: React.FC<RiskOverviewProps> = ({ parcel }) => {
  const { language } = useLanguage();
  const risk = assessParcelRisk(parcel);
  const coreStatus = extractCoreStatus(parcel);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
      {/* Risk Badge & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'bn' ? 'সার্বিক ঝুঁকি মূল্যায়ন ফলাফল' : 'Overall Risk Assessment'}
          </span>
          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${risk.badgeClass}`}>
              {language === 'bn' ? risk.labelBn : risk.label}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 max-w-md italic sm:text-right">
          {language === 'bn' ? risk.summaryBn : risk.summary}
        </p>
      </div>

      {/* 3 Distinct Checkpoint Cards */}
      <div>
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-gov-primary" />
          <span>{language === 'bn' ? '৩টি মৌলিক ভূমি লেনদেন ধাপের স্থিতি' : '3 Core Land Transaction Stages'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Transfer Deed Event */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? '১. সাব-রেজিস্ট্রি দলিল সংকেত' : '1. Transfer Deed Event'}
              </span>
              {coreStatus.transferEvent.recorded ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {language === 'bn' ? 'রেকর্ড পাওয়া গেছে' : 'Recorded'}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200/70 text-slate-600 border border-slate-300">
                  {language === 'bn' ? 'কোনো দলিল নেই' : 'No Deed Found'}
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900">
              {language === 'bn' ? coreStatus.transferEvent.labelBn : coreStatus.transferEvent.label}
            </h4>

            <p className="text-[11px] text-slate-600 leading-snug">
              {language === 'bn' ? coreStatus.transferEvent.detailsBn : coreStatus.transferEvent.details}
            </p>

            {coreStatus.transferEvent.reference && (
              <div className="text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-200/60">
                Ref: {coreStatus.transferEvent.reference} (Date: {coreStatus.transferEvent.date})
              </div>
            )}
          </div>

          {/* 2. Mutation Application Status */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? '২. নামজারি আবেদন স্থিতি' : '2. Mutation Application'}
              </span>
              {coreStatus.mutationApplication.status === 'submitted' ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                  {language === 'bn' ? 'আবেদন দাখিলকৃত' : 'Petition Active'}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200/70 text-slate-600 border border-slate-300">
                  {language === 'bn' ? 'আবেদন নেই' : 'No Petition'}
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900">
              {language === 'bn' ? coreStatus.mutationApplication.labelBn : coreStatus.mutationApplication.label}
            </h4>

            <p className="text-[11px] text-slate-600 leading-snug">
              {language === 'bn' ? coreStatus.mutationApplication.detailsBn : coreStatus.mutationApplication.details}
            </p>

            {coreStatus.mutationApplication.reference && (
              <div className="text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-200/60">
                Case: {coreStatus.mutationApplication.reference} (Date: {coreStatus.mutationApplication.date})
              </div>
            )}
          </div>

          {/* 3. Mutation Completed Status */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? '৩. নামজারি চূড়ান্ত নিষ্পত্তি' : '3. Mutation Completed'}
              </span>
              {coreStatus.mutationCompletion.status === 'completed' ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {language === 'bn' ? 'নিষ্পত্তি সম্পন্ন' : 'RoR Mutated'}
                </span>
              ) : coreStatus.mutationCompletion.status === 'pending' ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {language === 'bn' ? 'অনিষ্পন্ন / শুনানাধীন' : 'Pending Order'}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200/70 text-slate-600 border border-slate-300">
                  {language === 'bn' ? 'রেকর্ড পাওয়া যায়নি' : 'Not Recorded'}
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900">
              {language === 'bn' ? coreStatus.mutationCompletion.labelBn : coreStatus.mutationCompletion.label}
            </h4>

            <p className="text-[11px] text-slate-600 leading-snug">
              {language === 'bn' ? coreStatus.mutationCompletion.detailsBn : coreStatus.mutationCompletion.details}
            </p>

            {coreStatus.mutationCompletion.date && (
              <div className="text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-200/60">
                Order Date: {coreStatus.mutationCompletion.date} (Khatian: {coreStatus.mutationCompletion.newKhatian || 'N/A'})
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
