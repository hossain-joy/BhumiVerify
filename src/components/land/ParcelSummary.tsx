import React from 'react';
import { ParcelReference } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import { Building, MapPin, CheckCircle, AlertCircle, Edit3 } from 'lucide-react';

interface ParcelSummaryProps {
  parcel: ParcelReference;
  matchType?: 'exact' | 'partial' | 'ambiguous' | 'no_match';
  onEditSearch?: () => void;
}

export const ParcelSummary: React.FC<ParcelSummaryProps> = ({
  parcel,
  matchType = 'exact',
  onEditSearch,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const getMatchBadge = () => {
    switch (matchType) {
      case 'ambiguous':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            {isBn ? 'দ্বৈত / বিতর্কিত ম্যাচ' : 'Ambiguous / Conflicting Match'}
          </span>
        );
      case 'partial':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            {isBn ? 'আংশিক ম্যাচ' : 'Partial Match'}
          </span>
        );
      case 'exact':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            {isBn ? 'হুবহু ম্যাচ (Exact Match)' : 'Exact Match'}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-gov-primary border border-teal-200 text-xs font-bold font-mono">
              {parcel.id}
            </span>
            {getMatchBadge()}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {isBn
              ? `মৌজা: ${parcel.mouza}, দাগ নম্বর: ${toBengaliNumerals(parcel.dagNumber, true)}`
              : `Mouza: ${parcel.mouza}, Dag / Plot: ${parcel.dagNumber}`}
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onEditSearch && (
            <button
              onClick={onEditSearch}
              className="btn-secondary text-xs px-3 py-1.5 cursor-pointer flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isBn ? 'তথ্য পরিবর্তন করুন' : 'Edit Identifiers'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Identifiers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
            {language === 'bn' ? 'বিভাগ' : 'Division'}
          </span>
          <span className="font-semibold text-slate-800 text-sm">{parcel.division}</span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
            {language === 'bn' ? 'জেলা' : 'District'}
          </span>
          <span className="font-semibold text-slate-800 text-sm">{parcel.district}</span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
            {language === 'bn' ? 'উপজেলা / থানা' : 'Upazila / Thana'}
          </span>
          <span className="font-semibold text-slate-800 text-sm">{parcel.upazila}</span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
            {isBn ? 'জে.এল. নম্বর' : 'J.L. Number'}
          </span>
          <span className="font-semibold text-slate-800 text-sm font-mono">
            {toBengaliNumerals(parcel.jlNumber || (isBn ? 'প্রযোজ্য নয়' : 'N/A'), isBn)}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
            {isBn ? 'খতিয়ান ও জরিপ' : 'Khatian & Survey'}
          </span>
          <span className="font-semibold text-slate-800 text-sm">
            {toBengaliNumerals(parcel.khatianNumber || (isBn ? 'প্রযোজ্য নয়' : 'N/A'), isBn)} ({parcel.khatianType || 'RS'})
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">
            {isBn ? 'রেকর্ডকৃত পরিমাণ' : 'Recorded Area'}
          </span>
          <span className="font-semibold text-slate-800 text-sm">
            {toBengaliNumerals(parcel.area, isBn)} {isBn ? 'শতাংশ' : (parcel.areaUnit || 'Decimal')}
          </span>
        </div>
      </div>

      {/* Classification & Boundaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
        {parcel.landClassification && (
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'জমির শ্রেণি / প্রকৃতি' : 'Land Classification'}
            </span>
            <span className="font-semibold text-slate-800">
              {(isBn && (parcel as any).landClassificationBn) || parcel.landClassification}
            </span>
          </div>
        )}

        {parcel.boundaryNotes && (
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'চৌহদ্দি বা সীমানা বিবরণ' : 'Demarcated Boundaries'}
            </span>
            <span className="text-slate-700">{parcel.boundaryNotes}</span>
          </div>
        )}
      </div>

      {/* Source Feed Reference */}
      <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
        <span>
          {language === 'bn' ? 'রেকর্ড উৎস: ' : 'Record Source: '}
          <strong className="text-slate-600">{parcel.mockSource}</strong>
        </span>
        <span>
          {language === 'bn' ? 'সর্বশেষ সিঙ্ক: ' : 'Last Synchronized: '}
          {new Date(parcel.lastUpdated).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
