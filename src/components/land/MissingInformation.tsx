import React from 'react';
import { ParcelReference } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  getMissingInformation,
  getRecommendedChecks,
  detectConflictingDetails,
} from '../../utils/landFunctions';
import { AlertOctagon, HelpCircle, CheckSquare, Scale } from 'lucide-react';

interface MissingInformationProps {
  parcel: ParcelReference;
}

export const MissingInformation: React.FC<MissingInformationProps> = ({ parcel }) => {
  const { language } = useLanguage();
  const { missingItems, missingItemsBn } = getMissingInformation(parcel);
  const { recommendations, recommendationsBn } = getRecommendedChecks(parcel);
  const conflict = detectConflictingDetails(parcel);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'bn' ? 'অনুপস্থিত তথ্য, বিরোধ ও সুপারিশকৃত প্রাতিষ্ঠানিক তল্লাশ' : 'Missing Information, Conflicts & Recommended Checks'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'bn'
              ? 'ক্রয়চুক্তি সম্পাদনের পূর্বে যেসব রেকর্ড সংগ্রহ ও যাচাই করা আবশ্যক'
              : 'Required documentary evidence and institutional verifications needed prior to purchase'}
          </p>
        </div>
      </div>

      {/* Conflicting details banner (if detected) */}
      {conflict.hasConflict && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
            <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{language === 'bn' ? 'শনাক্তকৃত রেকর্ড অসঙ্গতি ও বিরোধ (Conflicting Details):' : 'Identified Discrepancy & Dispute:'}</span>
          </div>
          <p className="text-xs leading-relaxed text-rose-900">
            {language === 'bn' ? conflict.detailsBn : conflict.details}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Missing Records */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{language === 'bn' ? 'অনুপস্থিত বা অপর্যাপ্ত রেকর্ডসমূহ' : 'Missing or Incomplete Records'}</span>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700">
            {(language === 'bn' ? missingItemsBn : missingItems).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-[10px] text-slate-500 italic pt-1 leading-snug">
            {language === 'bn'
              ? 'তথ্য অপ্রতুলতার অর্থ জমিটি দায়মুক্ত নয়; সংশ্লিষ্ট ভূমি অফিসে এটি যাচাই সাপেক্ষ।'
              : 'Unavailability in sample records indicates incomplete information, not an unencumbered property.'}
          </p>
        </div>

        {/* Recommended Institutional Checks */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <CheckSquare className="w-4 h-4 text-gov-primary" />
            <span>{language === 'bn' ? 'সুপারিশকৃত প্রাতিষ্ঠানিক তল্লাশ' : 'Recommended Institutional Checks'}</span>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700">
            {(language === 'bn' ? recommendationsBn : recommendations).map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <span className="leading-snug">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
