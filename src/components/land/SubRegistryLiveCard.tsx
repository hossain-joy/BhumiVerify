import React from 'react';
import { SubRegistryIntegrationData } from '../../types';
import {
  Building2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Scale,
  FileCheck2,
  Send,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  Radio,
  Gavel,
  Landmark,
  Lock,
} from 'lucide-react';
import { toBengaliNumerals } from '../../utils/formatStatus';

interface SubRegistryLiveCardProps {
  subRegistry?: SubRegistryIntegrationData;
  isBn: boolean;
}

export const SubRegistryLiveCard: React.FC<SubRegistryLiveCardProps> = ({
  subRegistry,
  isBn,
}) => {
  if (!subRegistry) return null;

  const { isConnected, gatewayName, gatewayNameBn, lastSyncedAt, ltNotice, nilSearch, litigation } = subRegistry;

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-500/30 p-6 sm:p-7 shadow-xs space-y-6">
      {/* 1. Header: Sub-Registry Direct Gateway Live Connection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <Building2 className="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                {isBn ? 'সাব-রেজিস্ট্রি অফিস সরাসরি সংযোগ' : 'Sub-Registry Direct Gateway'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                {isBn ? 'লাইভ সংযুক্ত (Live API Connected)' : 'Live Connected'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1 leading-snug">
              {isBn ? gatewayNameBn : gatewayName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn
                ? 'দলিল রেজিস্ট্রেশন, এলটি নোটিশ ও ১২–১৫ বছরের বালাম সূচির সাথে সরাসরি ডিজিটাল লিংক।'
                : 'Direct digital telemetry for deeds, Section 89 LT Notices, and 12-to-25 year Balam indexes.'}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto shrink-0">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">{isBn ? 'সর্বশেষ সিঙ্ক' : 'Last Synced'}</span>
          <span className="font-semibold text-slate-700">{isBn ? toBengaliNumerals(lastSyncedAt) : lastSyncedAt}</span>
        </div>
      </div>

      {/* 2. Top Highlight: "জমিতে কোনো মামলা আছে নাকি নাই?" (Litigation Verdict Banner) */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border-2 transition-all shadow-xs ${
          litigation.hasLitigation
            ? 'bg-rose-50/90 border-rose-500 text-rose-950'
            : nilSearch.status === 'clear'
            ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950'
            : 'bg-amber-50/90 border-amber-400 text-amber-950'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                litigation.hasLitigation
                  ? 'bg-rose-600 text-white'
                  : nilSearch.status === 'clear'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {litigation.hasLitigation ? (
                <Gavel className="w-6 h-6 text-white" />
              ) : nilSearch.status === 'clear' ? (
                <ShieldCheck className="w-6 h-6 text-white" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-white" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-current">
                  {isBn ? 'আদালত ও বালাম অনুসন্ধান রায়' : 'Court & Litigation Verdict'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                {litigation.hasLitigation ? (
                  isBn ? (
                    <span className="text-rose-900">
                      মামলাযুক্ত জমি — ক্রয় নিষিদ্ধ
                    </span>
                  ) : (
                    <span className="text-rose-900">
                      Active Lawsuit — Barred
                    </span>
                  )
                ) : nilSearch.status === 'clear' ? (
                  isBn ? (
                    <span className="text-emerald-900">
                      মামলা নাই — জমি সম্পূর্ণ নির্দায়
                    </span>
                  ) : (
                    <span className="text-emerald-900">
                      Clean Title — Dispute Free
                    </span>
                  )
                ) : (
                  isBn ? (
                    <span className="text-amber-900">
                      যাচাই প্রয়োজন — তল্লাশি আবশ্যক
                    </span>
                  ) : (
                    <span className="text-amber-900">
                      Review Needed — Search Required
                    </span>
                  )
                )}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90 pt-1">
                {litigation.hasLitigation ? (
                  isBn ? (
                    <>
                      আদালতে দেওয়ানি মামলা বিচারাধীন। যেকোনো বায়না বা আর্থিক লেনদেন স্থগিত রাখুন।
                    </>
                  ) : (
                    'Active civil suit. All financial transactions barred.'
                  )
                ) : nilSearch.status === 'clear' ? (
                  isBn ? (
                    <>
                      বিগত {toBengaliNumerals(nilSearch.searchYears)} বছরের বালাম ও আদালতে কোনো মামলা বা বন্ধক নেই।
                    </>
                  ) : (
                    `No lawsuit or mortgage found in ${nilSearch.searchYears}-year search.`
                  )
                ) : (
                  isBn ? (
                    <>
                      বালাম আর্কাইভ থেকে দলিলের চেইন যাচাই প্রয়োজন।
                    </>
                  ) : (
                    'Physical deed chain inspection recommended.'
                  )
                )}
              </p>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase inline-flex items-center gap-1.5 border shadow-2xs ${
                litigation.hasLitigation
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : nilSearch.status === 'clear'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {litigation.hasLitigation ? (
                <>
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  <span>{isBn ? 'মামলা আছে' : 'Lawsuit'}</span>
                </>
              ) : nilSearch.status === 'clear' ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{isBn ? 'নির্দায়' : 'Clear'}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>{isBn ? 'যাচাই প্রয়োজন' : 'Review'}</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* If Active Lawsuit: Show Case Details Box */}
        {litigation.hasLitigation && litigation.cases && litigation.cases.length > 0 && (
          <div className="mt-4 pt-4 border-t border-rose-300/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-rose-700" />
              <span>{isBn ? 'বিচারাধীন মোকদ্দমার সুনির্দিষ্ট বিবরণ:' : 'Specific Litigation Case Details:'}</span>
            </h4>
            {litigation.cases.map((c, idx) => (
              <div
                key={idx}
                className="bg-white/95 rounded-xl border border-rose-200 p-4 space-y-2 text-xs sm:text-sm text-slate-800 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 pb-2">
                  <span className="font-bold text-rose-900 font-mono text-sm">
                    {c.caseNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900">
                    {isBn ? c.statusBn : c.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-500 block">{isBn ? 'আদালতের নাম:' : 'Court Name:'}</span>
                    <strong className="text-slate-900">{isBn ? c.courtNameBn : c.courtName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{isBn ? 'মামলার বিষয়:' : 'Subject:'}</span>
                    <strong className="text-slate-900">{isBn ? c.caseTypeBn : c.caseType}</strong>
                  </div>
                </div>
                <p className="text-xs text-rose-900 bg-rose-50 p-2.5 rounded-lg border border-rose-100 font-medium">
                  <strong>{isBn ? 'আদালতের নিষেধাজ্ঞা/নির্দেশনা: ' : 'Court Injunction: '}</strong>
                  {isBn ? c.summaryBn : c.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Real-Time LT Notice (Land Transfer Notice) & 12-15 Year Nil Search Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Box 1: এলটি নোটিশ (SAT Act Section 89) ও রেজিস্ট্রি স্থিতি */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900">
              <Send className="w-5 h-5 text-indigo-700 shrink-0" />
              <span>{isBn ? 'এলটি নোটিশ ও রেজিস্ট্রি স্ট্যাটাস' : 'LT Notice & Registration Signal'}</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                ltNotice.hasNotice
                  ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {ltNotice.hasNotice ? (isBn ? 'নোটিশ প্রাপ্ত' : 'Notice Dispatched') : (isBn ? 'নোটিশ নেই' : 'No Notice')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {isBn ? (
              <>
                সাব-রেজিস্ট্রি অফিসে কোনো দলিল সম্পাদিত ও রেজিস্ট্রি হলে রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন (SAT Act) এর <strong>৮৯ ধারা মোতাবেক</strong> সাব-রেজিস্ট্রার সরাসরি একটি এলটি নোটিশ (Land Transfer Notice) প্রেরণ করেন।
              </>
            ) : (
              'Under Section 89 of the SAT Act, the Sub-Registrar transmits a statutory LT Notice to the revenue circle upon deed execution to trigger mutation.'
            )}
          </p>

          {/* System Deduction from LT Notice */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
              <span>{isBn ? 'নোটিশ রেফারেন্স: ' : 'Notice Ref: '}{ltNotice.noticeNumber || (isBn ? 'নথিবদ্ধ নেই' : 'None')}</span>
              {ltNotice.noticeDate && <span>{isBn ? toBengaliNumerals(ltNotice.noticeDate) : ltNotice.noticeDate}</span>}
            </div>

            <div className="pt-1 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase text-indigo-900 block mb-0.5">
                {isBn ? 'সিস্টেমের তাৎক্ষণিক সিদ্ধান্ত (System Verdict):' : 'Automated Interpretation:'}
              </span>
              <p className="font-semibold text-slate-800 leading-relaxed">
                {isBn ? ltNotice.statusExplanationBn : ltNotice.statusExplanation}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-indigo-50/70 p-2.5 rounded-lg border border-indigo-100 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
            <span>
              {isBn
                ? 'এলটি নোটিশ প্রাপ্তি প্রমাণ করে যে জমিটি কেউ রেজিস্ট্রি করেছে এবং রাজস্ব রেকর্ডে নামজারি (e-Mutation) শুরু করার প্রক্রিয়া সক্রিয় রয়েছে।'
                : 'The LT Notice confirms deed execution and initiates formal revenue transfer at the Assistant Commissioner (Land) office.'}
            </span>
          </div>
        </div>

        {/* Box 2: ১২–১৫/২৫ বছরের বালাম ও সূচি তল্লাশি (Sub-Registry Nil Search) */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900">
              <Search className="w-5 h-5 text-indigo-700 shrink-0" />
              <span>{isBn ? `${toBengaliNumerals(nilSearch.searchYears)} বছরের বালাম ও ইনডেক্স তল্লাশি` : `${nilSearch.searchYears}-Year Sub-Registry Nil Search`}</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                nilSearch.status === 'clear'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  : nilSearch.status === 'disputed'
                  ? 'bg-rose-100 text-rose-900 border border-rose-200'
                  : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              {nilSearch.status === 'clear'
                ? (isBn ? 'নির্দায় / স্বচ্ছ' : 'Clear Title')
                : nilSearch.status === 'disputed'
                ? (isBn ? 'দায়যুক্ত' : 'Encumbered')
                : (isBn ? 'অসম্পূর্ণ' : 'Incomplete')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {isBn ? (
              <>
                সাব-রেজিস্ট্রি অফিসের <strong>{nilSearch.balamBookBn}</strong> তল্লাশ করে দেখা হয়েছে জমিটি অতীতে অন্য কারও কাছে বিক্রি, হেবা, দান বা কোনো আর্থিক ব্যাংকে বন্ধক রাখা হয়েছে কি না।
              </>
            ) : (
              `Automated verification across Sub-Registry ${nilSearch.balamBook} to uncover undisclosed deeds, bank mortgages, or prior conveyances.`
            )}
          </p>

          <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              {isBn ? 'বালাম তল্লাশির সারসংক্ষেপ:' : 'Balam Search Summary:'}
            </span>
            <p className="font-semibold text-slate-800 leading-relaxed">
              {isBn ? nilSearch.summaryBn : nilSearch.summary}
            </p>
          </div>

          <div className="text-[11px] text-slate-600 bg-slate-100 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {isBn
                ? '১২-১৫ বছরের তল্লাশির উদ্দেশ্য: কোনো গোপন ব্যাংক মর্টগেজ, বায়নানামা বা পাওয়ার অব অ্যাটর্নি রয়েছে কি না তা সম্পূর্ণরূপে উন্মোচন করা।'
                : '12-15 year search ensures no secret mortgages, prior earnest contracts, or duplicate Bayas exist.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
