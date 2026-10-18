import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatStatusLabel, toBengaliNumerals } from '../../utils/formatStatus';
import { GitCompare, AlertTriangle, ArrowRight, CheckCircle, Scale, Clock, MapPin, Layers } from 'lucide-react';
import { DiligenceSubNav } from '../../components/layout/DiligenceSubNav';

export const CompareReportsPage: React.FC = () => {
  const { savedChecks, compareIds, toggleCompareId } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [idA, setIdA] = useState<string>(compareIds[0] || savedChecks[0]?.id || '');
  const [idB, setIdB] = useState<string>(compareIds[1] || savedChecks[1]?.id || '');

  const checkA = savedChecks.find((c) => c.id === idA);
  const checkB = savedChecks.find((c) => c.id === idB);

  const getStatusBadge = (status: string) => {
    if (
      status === 'No Major Issue Detected in Available Data' ||
      status === 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি' ||
      status === 'বড় অসঙ্গতি পাওয়া যায়নি'
    ) {
      return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    }
    if (status === 'Review Recommended' || status === 'পর্যালোচনা জরুরি') {
      return 'bg-amber-50 text-amber-900 border-amber-300';
    }
    return 'bg-blue-50 text-blue-900 border-blue-300';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Due Diligence Workspace SubNav */}
      <DiligenceSubNav
        activeTab="compare"
        title={isBn ? 'সংরক্ষিত জমি রিপোর্ট তুলনা' : 'Compare Land Reports'}
        subtitle={isBn
          ? 'দুটি জমির প্রশাসনিক পরিচিতি, ঘটনা প্রবাহ, পর্যবেক্ষণ এবং করণীয় কাজগুলো পাশাপাশি রেখে তুলনা করুন।'
          : 'Compare parcel identifiers, recorded event histories, findings, and due diligence tasks side by side.'}
      />



      {/* Selectors Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isBn ? 'রিপোর্ট ক নির্বাচন করুন:' : 'Select Report A:'}
          </label>
          <select
            value={idA}
            onChange={(e) => setIdA(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
          >
            {savedChecks.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nickname} ({c.id}) — {c.mouza}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isBn ? 'রিপোর্ট খ নির্বাচন করুন:' : 'Select Report B:'}
          </label>
          <select
            value={idB}
            onChange={(e) => setIdB(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
          >
            {savedChecks.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nickname} ({c.id}) — {c.mouza}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by Side Grid */}
      {checkA && checkB ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report A */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isBn ? 'রিপোর্ট ক' : 'REPORT A'} • {checkA.id}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{checkA.nickname}</h2>
              <div className="pt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(checkA.statusLabel)}`}>
                  {formatStatusLabel(checkA.statusLabel, isBn)}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {checkA.summary}
              </p>
            </div>

            {/* Identifiers */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gov-primary" />
                <span>{isBn ? 'জমির পরিচিতি' : 'Parcel Identifiers'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'বিভাগ / জেলা' : 'Division / District'}</span>
                  <span className="font-semibold text-slate-800">{checkA.division}, {checkA.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'উপজেলা / মৌজা' : 'Upazila / Mouza'}</span>
                  <span className="font-semibold text-slate-800">{checkA.upazila}, {checkA.mouza}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'খতিয়ান নম্বর' : 'Khatian Number'}</span>
                  <span className="font-mono font-bold text-slate-800">{isBn ? toBengaliNumerals(checkA.khatianNumber) : checkA.khatianNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'দাগ নম্বর' : 'Dag (Plot) Number'}</span>
                  <span className="font-mono font-bold text-slate-800">{isBn ? toBengaliNumerals(checkA.dagNumber) : checkA.dagNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'জে.এল. নম্বর' : 'JL Number'}</span>
                  <span className="font-mono text-slate-800">
                    {checkA.jlNumber ? (isBn ? toBengaliNumerals(checkA.jlNumber) : checkA.jlNumber) : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'জমির পরিমাণ' : 'Land Area'}</span>
                  <span className="text-slate-800">
                    {checkA.area ? (isBn ? `${toBengaliNumerals(checkA.area)} শতাংশ` : checkA.area) : (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Tasks Status */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gov-primary" />
                <span>{isBn ? 'স্বাধীন অনুসন্ধান চেকলিস্ট' : 'Independent Verification Tasks'}</span>
              </h3>
              <div className="text-xs text-slate-600 space-y-1">
                <p>
                  {isBn
                    ? `মোট ${toBengaliNumerals((checkA.verificationTasks || []).length)} কাজের মধ্যে ${toBengaliNumerals((checkA.verificationTasks || []).filter((t) => t && t.status === 'completed').length)}টি সম্পন্ন`
                    : `${(checkA.verificationTasks || []).filter((t) => t && t.status === 'completed').length} of ${(checkA.verificationTasks || []).length} tasks marked done.`}
                </p>
                <div className="space-y-1.5 pt-1">
                  {(checkA.verificationTasks || []).map((t) => (
                    <div key={t.id} className="p-2 bg-slate-50 rounded border border-slate-200 text-[11px] flex items-center justify-between">
                      <span className="truncate pr-2">{t.title}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase shrink-0 ${
                        t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {t.status === 'completed' ? (isBn ? 'সম্পন্ন' : 'COMPLETED') : (isBn ? 'বাকি' : 'PENDING')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Notes */}
            {checkA.userNotes && (
              <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700">{isBn ? 'ক্রেতার নোট:' : 'Buyer Notes:'}</span>
                <p className="italic text-slate-600">{checkA.userNotes}</p>
              </div>
            )}

            <div className="pt-2">
              <Link
                to={`/checks/${checkA.id}`}
                className="w-full btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5 font-bold text-gov-primary"
              >
                <span>{isBn ? 'সম্পূর্ণ রিপোর্ট ক দেখুন' : 'Open Full Report A'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Report B */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isBn ? 'রিপোর্ট খ' : 'REPORT B'} • {checkB.id}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{checkB.nickname}</h2>
              <div className="pt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(checkB.statusLabel)}`}>
                  {formatStatusLabel(checkB.statusLabel, isBn)}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {checkB.summary}
              </p>
            </div>

            {/* Identifiers */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gov-primary" />
                <span>{isBn ? 'জমির পরিচিতি' : 'Parcel Identifiers'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'বিভাগ / জেলা' : 'Division / District'}</span>
                  <span className="font-semibold text-slate-800">{checkB.division}, {checkB.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'উপজেলা / মৌজা' : 'Upazila / Mouza'}</span>
                  <span className="font-semibold text-slate-800">{checkB.upazila}, {checkB.mouza}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'খতিয়ান নম্বর' : 'Khatian Number'}</span>
                  <span className="font-mono font-bold text-slate-800">{isBn ? toBengaliNumerals(checkB.khatianNumber) : checkB.khatianNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'দাগ নম্বর' : 'Dag (Plot) Number'}</span>
                  <span className="font-mono font-bold text-slate-800">{isBn ? toBengaliNumerals(checkB.dagNumber) : checkB.dagNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'জে.এল. নম্বর' : 'JL Number'}</span>
                  <span className="font-mono text-slate-800">
                    {checkB.jlNumber ? (isBn ? toBengaliNumerals(checkB.jlNumber) : checkB.jlNumber) : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isBn ? 'জমির পরিমাণ' : 'Land Area'}</span>
                  <span className="text-slate-800">
                    {checkB.area ? (isBn ? `${toBengaliNumerals(checkB.area)} শতাংশ` : checkB.area) : (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Tasks Status */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gov-primary" />
                <span>{isBn ? 'স্বাধীন অনুসন্ধান চেকলিস্ট' : 'Independent Verification Tasks'}</span>
              </h3>
              <div className="text-xs text-slate-600 space-y-1">
                <p>
                  {isBn
                    ? `মোট ${toBengaliNumerals((checkB.verificationTasks || []).length)} কাজের মধ্যে ${toBengaliNumerals((checkB.verificationTasks || []).filter((t) => t && t.status === 'completed').length)}টি সম্পন্ন`
                    : `${(checkB.verificationTasks || []).filter((t) => t && t.status === 'completed').length} of ${(checkB.verificationTasks || []).length} tasks marked done.`}
                </p>
                <div className="space-y-1.5 pt-1">
                  {(checkB.verificationTasks || []).map((t) => (
                    <div key={t.id} className="p-2 bg-slate-50 rounded border border-slate-200 text-[11px] flex items-center justify-between">
                      <span className="truncate pr-2">{t.title}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase shrink-0 ${
                        t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {t.status === 'completed' ? (isBn ? 'সম্পন্ন' : 'COMPLETED') : (isBn ? 'বাকি' : 'PENDING')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Notes */}
            {checkB.userNotes && (
              <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700">{isBn ? 'ক্রেতার নোট:' : 'Buyer Notes:'}</span>
                <p className="italic text-slate-600">{checkB.userNotes}</p>
              </div>
            )}

            <div className="pt-2">
              <Link
                to={`/checks/${checkB.id}`}
                className="w-full btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5 font-bold text-gov-primary"
              >
                <span>{isBn ? 'সম্পূর্ণ রিপোর্ট খ দেখুন' : 'Open Full Report B'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
          {isBn ? 'তুলনা করার জন্য দুটি সংরক্ষিত জমি নির্বাচন করুন।' : 'Please select two valid saved checks to compare.'}
        </div>
      )}
    </div>
  );
};
