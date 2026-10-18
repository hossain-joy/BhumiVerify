import React, { useState } from 'react';
import { FictionalParcelRecord } from '../../data/mockParcels';
import { AssessmentResult } from '../../utils/assessParcel';
import { toBengaliNumerals } from '../../utils/formatStatus';
import { formatSafeDate } from '../../utils/formatDate';
import {
  Building2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Scale,
  FileText,
  Clock,
  Layers,
  MapPin,
  Search,
  Send,
  CheckCircle2,
  HelpCircle,
  Radio,
  Gavel,
  Info,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  FileCheck2,
  BookmarkCheck,
  Check,
} from 'lucide-react';

export type ParcelTimelineEvent = FictionalParcelRecord['events'][number];

interface OrganizedLandReportProps {
  parcel: FictionalParcelRecord;
  isBn: boolean;
  assessment: AssessmentResult;
  sortedEvents: ParcelTimelineEvent[];
}

export type ReportTab = 'subregistry' | 'details' | 'timeline' | 'actionplan';

export const OrganizedLandReport: React.FC<OrganizedLandReportProps> = ({
  parcel,
  isBn,
  assessment,
  sortedEvents,
}) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('subregistry');
  const [isFullView, setIsFullView] = useState<boolean>(false);

  const subReg = parcel.subRegistryData;
  const hasLitigation = Boolean(subReg?.litigation?.hasLitigation);
  const isNoMajorIssue = parcel.statusKey === 'no_major_issue' && !hasLitigation;
  const isReviewRecommended = parcel.statusKey === 'review_recommended' || hasLitigation;

  // Event checks
  const events = parcel.events || [];
  const hasTransfer = events.some((e) => e.type === 'transfer_related');
  const hasMutationApp = events.some((e) => e.type === 'mutation_application');
  const hasMutationDone = events.some((e) => e.type === 'mutation_completed');

  // Badge for timeline event
  const getEventBadge = (type: string) => {
    switch (type) {
      case 'transfer_related':
        return {
          icon: <Building2 className="w-3.5 h-3.5 text-indigo-700" aria-hidden="true" />,
          label: isBn ? 'সাব-রেজিস্ট্রি দলিল' : 'Transfer Deed',
          className: 'bg-indigo-50 text-indigo-900 border-indigo-200',
        };
      case 'mutation_application':
        return {
          icon: <Send className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />,
          label: isBn ? 'ই-নামজারি আবেদন' : 'Mutation Petition',
          className: 'bg-blue-50 text-blue-900 border-blue-200',
        };
      case 'mutation_completed':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />,
          label: isBn ? 'অনুমোদিত নামজারি আদেশ' : 'Approved Mutation',
          className: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        };
      default:
        return {
          icon: <Clock className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />,
          label: isBn ? 'রেকর্ড' : 'General Record',
          className: 'bg-slate-50 text-slate-800 border-slate-200',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* 1. MASTER EXECUTIVE VERDICT & IDENTITY BANNER             */}
      {/* ========================================================= */}
      <div
        className={`rounded-2xl border-2 transition-all shadow-xs p-6 sm:p-7 ${
          hasLitigation
            ? 'bg-gradient-to-br from-rose-50 via-white to-rose-50/60 border-rose-500 text-rose-950'
            : isNoMajorIssue
            ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 border-emerald-500 text-emerald-950'
            : 'bg-gradient-to-br from-amber-50 via-white to-amber-50/60 border-amber-400 text-amber-950'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-200/80">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                hasLitigation
                  ? 'bg-rose-600 text-white shadow-rose-200'
                  : isNoMajorIssue
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-amber-600 text-white shadow-amber-200'
              }`}
            >
              {hasLitigation ? (
                <Gavel className="w-7 h-7 text-white" />
              ) : isNoMajorIssue ? (
                <ShieldCheck className="w-7 h-7 text-white" />
              ) : (
                <AlertTriangle className="w-7 h-7 text-white" />
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs px-3 py-0.5 rounded-full font-black uppercase tracking-wider border shadow-2xs ${
                    hasLitigation
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : isNoMajorIssue
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {hasLitigation
                    ? isBn
                      ? 'সক্রিয় মামলা চিহ্নিত (Lawsuit Detected)'
                      : 'Active Lawsuit Detected'
                    : isNoMajorIssue
                    ? isBn
                      ? 'মামলামুক্ত ও নির্দায় (Dispute Free)'
                      : 'Dispute Free Title'
                    : isBn
                    ? 'যাচাই প্রয়োজন (Review Needed)'
                    : 'Discrepancy Detected'}
                </span>

                {subReg?.isConnected && (
                  <span className="text-xs px-3 py-0.5 rounded-full font-bold bg-white text-indigo-900 border border-indigo-200 flex items-center gap-1.5 shadow-2xs">
                    <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    <span>{isBn ? 'সাব-রেজিস্ট্রি গেটওয়ে সংযুক্ত' : 'Sub-Registry Connected'}</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {hasLitigation
                  ? isBn
                    ? 'সতর্কতা: জমিতে সক্রিয় দেওয়ানি মামলা ও আদালতের নিষেধাজ্ঞা রয়েছে!'
                    : 'Warning: Active Lawsuit & Injunction on Record!'
                  : isNoMajorIssue
                  ? isBn
                    ? 'মামলা নাই — জমিটি আদালত ও সাব-রেজিস্ট্রি রেকর্ডে সম্পূর্ণ নির্দায়'
                    : 'Clean Title — Dispute-Free in Sub-Registry & Court Records'
                  : isBn
                  ? 'সতর্কতা: নামজারি বা দলিলের তথ্যে অমিল — সমাধান প্রয়োজন'
                  : 'Notice: Title Discrepancies Require Official Scrutiny'}
              </h2>

              <p className="text-sm font-medium leading-relaxed opacity-95 max-w-3xl">
                {hasLitigation ? (
                  isBn ? (
                    <>
                      বিজ্ঞ দেওয়ানি আদালতের কজ-লিস্ট ও সাব-রেজিস্ট্রির রেকর্ড অনুযায়ী এই দাগের জমিতে আইনি বিরোধ বিচারাধীন।{' '}
                      <strong className="text-rose-900 underline">
                        আদালতের নিষ্পত্তি ছাড়া এই জমিতে কোনো প্রকার বায়না, ক্রয় বা আর্থিক লেনদেন সম্পূর্ণ নিষিদ্ধ।
                      </strong>
                    </>
                  ) : (
                    'Active civil litigation and injunction order detected. Any financial commitment or registration is legally barred.'
                  )
                ) : isNoMajorIssue ? (
                  isBn ? (
                    <>
                      বিগত ১৫ বছরের সাব-রেজিস্ট্রি বালাম এবং দেওয়ানি আদালতের রেকর্ডে কোনো মামলা বা গোপন বন্ধক নেই।{' '}
                      <strong className="text-emerald-900">
                        মালিকানার ধারাবাহিকতা সঠিক রয়েছে; শর্তসাপেক্ষে বায়ানানামা করা বিবেচনাযোগ্য।
                      </strong>
                    </>
                  ) : (
                    'Clean title lineage with no civil disputes or bank mortgages across a 15-year Balam search.'
                  )
                ) : (
                  isBn ? (
                    <>
                      জমির বায়া দলিল বা নামজারির তথ্যে ঘাটতি রয়েছে।{' '}
                      <strong className="text-amber-900">
                        এসি (ল্যান্ড) অফিস থেকে মূল পর্চা যাচাই ও সমাধান না হওয়া পর্যন্ত বায়না স্থগিত রাখুন।
                      </strong>
                    </>
                  ) : (
                    'Record discrepancies detected. Resolve mutation status at the AC (Land) office before committing funds.'
                  )
                )}
              </p>
            </div>
          </div>

          {/* Quick Parcel Tag (Right) */}
          <div className="shrink-0 bg-white/95 p-3.5 rounded-xl border border-slate-200/90 text-xs space-y-1 shadow-2xs self-start lg:self-center">
            <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">
              {isBn ? 'জমির সংক্ষেপ' : 'Parcel Quick Info'}
            </span>
            <div className="font-bold text-slate-800 text-sm">
              {parcel.mouza}, {parcel.upazila}
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
              <span>{isBn ? 'খতিয়ান: ' : 'Khatian: '}{isBn ? toBengaliNumerals(parcel.khatianNumber) : parcel.khatianNumber}</span>
              <span>•</span>
              <span>{isBn ? 'দাগ: ' : 'Dag: '}{isBn ? toBengaliNumerals(parcel.dagNumber) : parcel.dagNumber}</span>
              <span>•</span>
              <span className="font-sans font-semibold text-emerald-800">
                {parcel.area ? (isBn ? `${toBengaliNumerals(parcel.area)} শতাংশ` : `${parcel.area} Dec`) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 VITAL PILLARS STRIP (এক নজরে ৪টি প্রধান স্তম্ভ) */}
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Pillar 1: Title Lineage */}
          <div className="bg-white/95 p-3.5 rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? '১. দলিল শৃঙ্খল' : '1. Deed Chain'}</span>
              </span>
              <span className={`text-[10px] font-black px-2 py-0.2 rounded-full ${hasTransfer ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                {hasTransfer ? (isBn ? 'রেকর্ডভুক্ত' : 'Recorded') : (isBn ? 'যাচাই আবশ্যক' : 'Unverified')}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {hasTransfer
                ? (isBn ? 'সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রিকৃত দলিলের রেফারেন্স বিদ্যমান।' : 'Registered deed reference recorded in index.')
                : (isBn ? 'মূল দলিলের সার্টিফাইড কপি স্বচক্ষে পর্যবেক্ষণ করতে হবে।' : 'Baseline chain deeds must be physically verified.')}
            </p>
          </div>

          {/* Pillar 2: Mutation */}
          <div className="bg-white/95 p-3.5 rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? '২. নামজারি (Mutation)' : '2. Mutation'}</span>
              </span>
              <span className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                hasMutationDone
                  ? 'bg-emerald-100 text-emerald-800'
                  : hasMutationApp
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {hasMutationDone
                  ? (isBn ? 'অনুমোদিত' : 'Completed')
                  : hasMutationApp
                  ? (isBn ? 'আবেদন চলছে' : 'In Progress')
                  : (isBn ? 'অসম্পূর্ণ' : 'Pending')}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {hasMutationDone
                ? (isBn ? 'এসি (ল্যান্ড) অফিস থেকে পৃথক নামজারি খতিয়ান অনুমোদিত।' : 'Dedicated mutation khatian issued by revenue circle.')
                : hasMutationApp
                ? (isBn ? 'নামজারি আবেদন চলমান; শুনানি ও ডিসিআর যাচাই প্রয়োজন।' : 'Petition under review with Assistant Commissioner.')
                : (isBn ? 'বিক্রেতার নিজের নামে নামজারি পর্চা এখনো অনুপস্থিত।' : 'No verified mutation porcha in seller name.')}
            </p>
          </div>

          {/* Pillar 3: Court Litigation */}
          <div className="bg-white/95 p-3.5 rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? '৩. দেওয়ানি মামলা' : '3. Lawsuits'}</span>
              </span>
              <span className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                hasLitigation
                  ? 'bg-rose-600 text-white'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {hasLitigation ? (isBn ? 'মামলা আছে' : 'Lawsuit') : (isBn ? 'মামলা নাই' : 'Clean')}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {hasLitigation
                ? (isBn ? 'আদালতের স্থগিতাদেশ বলবৎ — জমি হস্তান্তর আইনত নিষিদ্ধ।' : 'Active civil dispute and interim court injunction.')
                : (isBn ? 'আদালতের কজ-লিস্ট ও বালামে কোনো মামলা নথিবদ্ধ নেই।' : 'No civil litigation or injunction on official records.')}
            </p>
          </div>

          {/* Pillar 4: Nil Search (12-15 Years) */}
          <div className="bg-white/95 p-3.5 rounded-xl border border-slate-200/90 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? '৪. ১২-১৫ বছর তল্লাশি' : '4. Nil Search'}</span>
              </span>
              <span className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                subReg?.nilSearch?.status === 'clear'
                  ? 'bg-emerald-100 text-emerald-800'
                  : subReg?.nilSearch?.status === 'disputed'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {subReg?.nilSearch?.status === 'clear'
                  ? (isBn ? 'নির্দায়' : 'Clear')
                  : subReg?.nilSearch?.status === 'disputed'
                  ? (isBn ? 'দায়যুক্ত' : 'Encumbered')
                  : (isBn ? 'যাচাই প্রয়োজন' : 'Check')}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {subReg?.nilSearch?.status === 'clear'
                ? (isBn ? '১ নম্বর বালামে কোনো গোপন বন্ধক বা দায় পাওয়া যায়নি।' : 'No undisclosed bank mortgages or prior conveyances.')
                : (isBn ? 'সাব-রেজিস্ট্রি অফিসে ফর্ম ১২ তল্লাশি রসিদ নিশ্চিত করুন।' : 'Encumbrance Form 12 inspection recommended.')}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TAB CONTROLS & VIEW TOGGLE (সুশৃঙ্খল নেভিগেশন)         */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-2 print:hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setActiveTab('subregistry');
              setIsFullView(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'subregistry' && !isFullView
                ? 'bg-gov-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isBn ? '১. সাব-রেজিস্ট্রি ও মামলা' : '1. Sub-Registry & Lawsuit'}</span>
            {hasLitigation && (
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('details');
              setIsFullView(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'details' && !isFullView
                ? 'bg-gov-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isBn ? '২. জমির পরিচিতি ও রেকর্ড' : '2. Parcel Details'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('timeline');
              setIsFullView(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'timeline' && !isFullView
                ? 'bg-gov-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isBn ? '৩. মালিকানা টাইমলাইন' : '3. Ownership Timeline'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-800">
              {sortedEvents.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('actionplan');
              setIsFullView(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'actionplan' && !isFullView
                ? 'bg-gov-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isBn ? '৪. মাঠপর্যায়ে করণীয়' : '4. Field Action Plan'}</span>
            {parcel.findings.length > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900">
                {parcel.findings.length}
              </span>
            )}
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsFullView(!isFullView)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              isFullView
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title={isBn ? 'এক পৃষ্ঠায় সব তথ্য একসাথে দেখুন' : 'View all sections sequentially in one page'}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{isFullView ? (isBn ? 'ট্যাব আকারে দেখুন' : 'Switch to Tabs') : (isBn ? 'সম্পূর্ণ রিপোর্ট একসাথে' : 'View Full Report')}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. TAB CONTENT MODULES                                    */}
      {/* ========================================================= */}

      {/* MODULE 1: SUB-REGISTRY OFFICE, LT NOTICE & COURT LAWSUIT */}
      <div className={`space-y-6 ${!isFullView && activeTab !== 'subregistry' ? 'hidden print:block' : 'block'}`}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
          {/* Header of Module */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {isBn ? 'সাব-রেজিস্ট্রি গেটওয়ে ও দেওয়ানি মামলা যাচাই' : 'Sub-Registry Live Gateway & Litigation Diligence'}
                </h3>
                <p className="text-xs text-slate-500">
                  {subReg?.gatewayNameBn || subReg?.gatewayName || (isBn ? 'সাব-রেজিস্ট্রার কার্যালয় ডিজিটাল ডাটাবেজ' : 'Sub-Registry Digital Database')}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
              <span>{isBn ? 'সিঙ্ক টাইম: ' : 'Synced: '}{subReg?.lastSyncedAt || 'Live'}</span>
            </div>
          </div>

          {/* Active Lawsuit Details (If any) */}
          {hasLitigation && subReg?.litigation?.cases && subReg.litigation.cases.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{isBn ? 'বিচারাধীন দেওয়ানি মোকদ্দমার সুনির্দিষ্ট তথ্য:' : 'Active Civil Suit Case File Details:'}</span>
              </div>
              {subReg.litigation.cases.map((c, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-rose-200 text-xs sm:text-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 pb-2">
                    <span className="font-mono font-bold text-rose-950 text-sm">{c.caseNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-900 text-xs">
                      {isBn ? c.statusBn : c.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                    <div>
                      <span className="text-slate-500 block">{isBn ? 'আদালত:' : 'Court:'}</span>
                      <strong>{isBn ? c.courtNameBn : c.courtName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{isBn ? 'মামলার বিষয়:' : 'Subject:'}</span>
                      <strong>{isBn ? c.caseTypeBn : c.caseType}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-rose-950 bg-rose-50/80 p-2.5 rounded-lg border border-rose-100 font-medium">
                    <strong>{isBn ? 'আদালতের নিষেধাজ্ঞা: ' : 'Court Injunction: '}</strong>
                    {isBn ? c.summaryBn : c.summary}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 2-Column Grid: LT Notice vs 12-15 Year Nil Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1: Section 89 LT Notice */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Send className="w-4 h-4 text-indigo-700" />
                  <span>{isBn ? 'এলটি নোটিশ (SAT Act ধারা ৮৯)' : 'LT Notice (Section 89)'}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                  {subReg?.ltNotice?.hasNotice ? (isBn ? 'নোটিশ প্রাপ্ত' : 'Received') : (isBn ? 'নোটিশ নেই' : 'No Notice')}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {isBn
                  ? 'সাব-রেজিস্ট্রি অফিসে দলিল সম্পাদিত হলে ৮৯ ধারা অনুযায়ী সাব-রেজিস্ট্রার স্বয়ংক্রিয়ভাবে রাজস্ব সার্কেলে এলটি নোটিশ প্রেরণ করেন।'
                  : 'Section 89 of the SAT Act mandates direct dispatch of Land Transfer Notice to the local revenue circle upon deed execution.'}
              </p>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                  <span>{isBn ? 'রেফারেন্স: ' : 'Ref: '}{subReg?.ltNotice?.noticeNumber || 'N/A'}</span>
                  {subReg?.ltNotice?.noticeDate && <span>{isBn ? toBengaliNumerals(subReg.ltNotice.noticeDate) : subReg.ltNotice.noticeDate}</span>}
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-indigo-900 block mb-0.5">
                    {isBn ? 'সিস্টেমের সিদ্ধান্ত (System Verdict):' : 'Automated Deduction:'}
                  </span>
                  <p className="font-semibold text-slate-900 text-xs leading-snug">
                    {isBn && subReg?.ltNotice?.statusExplanationBn ? subReg.ltNotice.statusExplanationBn : subReg?.ltNotice?.statusExplanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: Nil Search (12-15 Years) */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-700" />
                  <span>{isBn ? `${toBengaliNumerals(subReg?.nilSearch?.searchYears || 15)} বছরের বালাম তল্লাশি` : `${subReg?.nilSearch?.searchYears || 15}-Year Nil Search`}</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  subReg?.nilSearch?.status === 'clear'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}>
                  {subReg?.nilSearch?.status === 'clear' ? (isBn ? 'নির্দায় / স্বচ্ছ' : 'Clear Title') : (isBn ? 'অসম্পূর্ণ' : 'Incomplete')}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {isBn
                  ? 'সাব-রেজিস্ট্রি অফিসের ১ নম্বর বালাম ও সূচি বহিতে কোনো অপ্রকাশিত হস্তান্তর, গোপন ব্যাংক মর্টগেজ বা বায়নানামা আছে কি না তা যাচাই করা হয়।'
                  : 'Historical search across Sub-Registry Volume 1 and Index books to uncover undisclosed liens, bank mortgages, or prior deeds.'}
              </p>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {isBn ? 'তল্লাশির সারসংক্ষেপ:' : 'Search Findings:'}
                </span>
                <p className="font-semibold text-slate-900 text-xs leading-snug">
                  {isBn && subReg?.nilSearch?.summaryBn ? subReg.nilSearch.summaryBn : subReg?.nilSearch?.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2: PARCEL DETAILS & CADASTRAL RECORD */}
      <div className={`space-y-6 ${!isFullView && activeTab !== 'details' ? 'hidden print:block' : 'block'}`}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-gov-primary" />
              <span>{isBn ? 'জমির পরিচিতি ও রেকর্ড বিবরণ' : 'Parcel Details & Cadastral Identifiers'}</span>
            </h3>
            <span className="font-mono text-xs font-bold text-gov-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              {parcel.id}
            </span>
          </div>

          {/* Identifiers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'বিভাগ' : 'Division'}</span>
              <span className="font-bold text-slate-900 text-sm">{parcel.division}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'জেলা' : 'District'}</span>
              <span className="font-bold text-slate-900 text-sm">{parcel.district}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'উপজেলা / থানা' : 'Upazila'}</span>
              <span className="font-bold text-slate-900 text-sm">{parcel.upazila}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'মৌজা' : 'Mouza'}</span>
              <span className="font-bold text-slate-900 text-sm">{parcel.mouza}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'জে.এল. নম্বর' : 'JL Number'}</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{parcel.jlNumber ?? 'N/A'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'খতিয়ান নম্বর' : 'Khatian'}</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{parcel.khatianNumber}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'দাগ / প্লট' : 'Dag / Plot'}</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{parcel.dagNumber}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">{isBn ? 'জমির পরিমাণ' : 'Land Area'}</span>
              <span className="font-bold text-slate-900 text-sm">
                {parcel.area ? `${isBn ? toBengaliNumerals(parcel.area) : parcel.area} ${isBn ? 'শতাংশ' : parcel.areaUnit}` : 'N/A'}
              </span>
            </div>
          </div>

          {/* Classification & Limitation Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{isBn ? 'জমির শ্রেণী' : 'Classification'}</span>
              <p className="font-bold text-slate-900 text-sm">
                {isBn && parcel.landClassificationBn ? parcel.landClassificationBn : parcel.landClassification || (isBn ? 'সাধারণ' : 'General')}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-950 space-y-1">
              <span className="text-[10px] text-amber-800 uppercase font-bold block flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>{isBn ? 'আইনি সীমাবদ্ধতা নোট' : 'Legal Limitation'}</span>
              </span>
              <p className="text-xs text-amber-900 leading-relaxed">
                {isBn ? assessment.limitationNoteBn : assessment.limitationNote}
              </p>
            </div>
          </div>

          {/* Official Portals Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-100">
            <span className="font-bold text-slate-800">{isBn ? 'সরকারি অফিশিয়াল লিংক:' : 'Official Portals:'}</span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://mutation.land.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>{isBn ? 'ই-নামজারি (mutation.land.gov.bd)' : 'e-Mutation Portal'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://land.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>{isBn ? 'ভূমি সেবা (land.gov.bd)' : 'National Land Portal'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 3: CHRONOLOGICAL OWNERSHIP TIMELINE */}
      <div className={`space-y-6 ${!isFullView && activeTab !== 'timeline' ? 'hidden print:block' : 'block'}`}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gov-primary" />
                <span>{isBn ? 'মালিকানার ধারাবাহিক ইতিহাস ও টাইমলাইন' : 'Chain of Title & Event Chronology'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn
                  ? 'দলিল সম্পাদন, এলটি নোটিশ প্রেরণ এবং এসি (ল্যান্ড) নামজারি আদেশের কালানুক্রমিক ধারাবাহিকতা।'
                  : 'Sequential record of deed execution, LT notices, and revenue mutation decrees.'}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              {sortedEvents.length} {isBn ? 'টি ঘটনা নথিবদ্ধ' : 'Events'}
            </span>
          </div>

          {sortedEvents.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1.5">
              <HelpCircle className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-700">
                {isBn ? 'কোনো সাম্প্রতিক লেনদেন ঘটনা পাওয়া যায়নি।' : 'No recorded transaction events found.'}
              </p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {sortedEvents.map((evt) => {
                const badge = getEventBadge(evt.type);
                return (
                  <div key={evt.id} className="relative group">
                    <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-gov-primary flex items-center justify-center shadow-2xs">
                      <div className="w-2 h-2 rounded-full bg-gov-primary" />
                    </div>

                    <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border flex items-center gap-1 ${badge.className}`}>
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {isBn && evt.titleBn ? evt.titleBn : evt.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatSafeDate(evt.date, isBn ? 'তারিখ পাওয়া যায়নি' : 'N/A')}</span>
                          {evt.reference && (
                            <>
                              <span>•</span>
                              <span className="bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-700">
                                {evt.reference}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {isBn && evt.explanationBn ? evt.explanationBn : evt.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODULE 4: FIELD DILIGENCE & ACTION PLAN */}
      <div className={`space-y-6 ${!isFullView && activeTab !== 'actionplan' ? 'hidden print:block' : 'block'}`}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gov-primary" />
                <span>{isBn ? 'মাঠপর্যায়ে ক্রেতার করণীয় ও চেকলিস্ট' : 'Field Diligence & Action Plan'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn
                  ? 'কাগজপত্রের পাশাপাশি মাঠে ও অফিসে সরেজমিনে যাচাইয়ের সুনির্দিষ্ট ৩টি ধাপ।'
                  : 'Practical, mandatory verification steps at AC Land, Sub-Registry, and ground.'}
              </p>
            </div>
          </div>

          {/* 3 Step Mandatory Checklist Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs">
                ১
              </div>
              <h4 className="text-xs font-bold text-slate-900">
                {isBn ? 'এসি (ল্যান্ড) অফিস' : '1. AC (Land) Office'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'সহকারী কমিশনার (ভূমি) অফিস থেকে মূল নামজারি পর্চা, ডিসিআর ও হালনাগাদ খাজনা দাখিলা সংগ্রহ ও ক্রস-ম্যাচ করুন।'
                  : 'Obtain certified mutation porcha, DCR, and current fiscal tax receipts.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-xs">
                ২
              </div>
              <h4 className="text-xs font-bold text-slate-900">
                {isBn ? 'সাব-রেজিস্ট্রি অফিস' : '2. Sub-Registry Office'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'বালাম বহিতে ১২ থেকে ২৫ বছরের তল্লাশি (Nil Search - ফর্ম ১২) দিয়ে নিশ্চিত হন কোনো গোপন বন্ধক বা বায়নানামা নেই।'
                  : 'File Form 12 for an encumbrance search across 12-25 years of volume books.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs">
                ৩
              </div>
              <h4 className="text-xs font-bold text-slate-900">
                {isBn ? 'সরেজমিন সীমানা ও দখল' : '3. Ground Possession'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'মৌজা নকশা নিয়ে আমিন/সার্ভেয়ার দ্বারা চারদিকের সীমানা মাপুন এবং প্রতিবেশীদের সাথে বিক্রেতার দখল নিশ্চিত করুন।'
                  : 'Conduct physical surveyor demarcations and interview boundary neighbors.'}
              </p>
            </div>
          </div>

          {/* Detailed Findings & Missing Info (if present) */}
          {parcel.findings.length > 0 && (
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{isBn ? 'চিহ্নিত পর্যালোচ্য বিষয়সমূহ (Findings):' : 'Specific Discrepancy Findings:'}</span>
              </h4>

              <div className="space-y-3">
                {parcel.findings.map((finding, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{isBn && finding.titleBn ? finding.titleBn : finding.title}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80">
                        <strong className="text-amber-950 block text-[11px] mb-0.5">{isBn ? 'পর্যালোচনার কারণ:' : 'Why it matters:'}</strong>
                        <p className="text-amber-900 leading-snug">{isBn && finding.whyItMattersBn ? finding.whyItMattersBn : finding.whyItMatters}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80">
                        <strong className="text-emerald-950 block text-[11px] mb-0.5">{isBn ? 'প্রস্তাবিত পদক্ষেপ:' : 'Actionable Next Step:'}</strong>
                        <p className="text-emerald-900 leading-snug">{isBn && finding.nextStepBn ? finding.nextStepBn : finding.nextStep}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Information Checklist */}
          {parcel.missingInformation && parcel.missingInformation.length > 0 && (
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'বিক্রেতার নিকট থেকে তলবযোগ্য নথিপত্র:' : 'Required Seller Documents Checklist:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(isBn && parcel.missingInformationBn ? parcel.missingInformationBn : parcel.missingInformation).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span className="text-slate-800 font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
