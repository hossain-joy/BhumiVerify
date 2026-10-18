import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSavedChecks } from '../context/SavedChecksContext';
import { MOCK_PARCELS, FictionalParcelRecord } from '../data/mockParcels';
import { assessParcel } from '../utils/assessParcel';
import { sortTimelineEvents } from '../utils/sortEvents';
import { formatSafeDate } from '../utils/formatDate';
import { DigitalBankingModal } from '../components/land/DigitalBankingModal';
import { isParcelPaid, markParcelPaid, getParcelTxnId } from '../utils/paymentStorage';
import { useAuth } from '../context/AuthContext';
import { MonthlyQuotaCard } from '../components/land/MonthlyQuotaCard';
import { ClearLandConceptCard } from '../components/land/ClearLandConceptCard';
import { getMonthlyQuota, recordVerificationApplication, QuotaStatus } from '../utils/quotaService';
import {
  ArrowLeft,
  Search,
  RotateCcw,
  Edit3,
  Calendar,
  Clock,
  Layers,
  FileText,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Building,
  Scale,
  FileCheck2,
  FileSpreadsheet,
  Bookmark,
  Printer,
  Check,
  Lock,
  CreditCard,
  ShieldCheck,
  AlertOctagon,
} from 'lucide-react';

export const ParcelResultsPage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveCheck, savedChecks } = useSavedChecks();

  const [parcel, setParcel] = useState<FictionalParcelRecord | null>(null);
  const [savedCheckId, setSavedCheckId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [currentTxnId, setCurrentTxnId] = useState<string>('');
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [quota, setQuota] = useState<QuotaStatus>(() => getMonthlyQuota(currentUser?.id));

  useEffect(() => {
    const id = searchParams.get('id');
    const txn = searchParams.get('txn');
    let target = MOCK_PARCELS[0];
    if (id) {
      const match = MOCK_PARCELS.find((p) => p.id === id);
      if (match) {
        target = match;
      } else {
        const storedCustom = sessionStorage.getItem(`bhumiverify_parcel_${id}`);
        if (storedCustom) {
          try {
            target = JSON.parse(storedCustom);
          } catch {
            // ignore
          }
        }
      }
    }
    setParcel(target);

    if (target) {
      if (txn) {
        markParcelPaid(target.id, txn);
      }
      const paid = isParcelPaid(target.id) || !!txn;
      setIsPaid(paid);
      setCurrentTxnId(txn || getParcelTxnId(target.id) || '');

      // Check if already in saved checks
      const existing = savedChecks.find((c) => c.parcelId === target.id);
      if (existing) setSavedCheckId(existing.id);
    }
  }, [searchParams, savedChecks]);

  if (!parcel) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-4">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-900">
            {isBn ? 'কোনো রেকর্ড পাওয়া যায়নি' : 'No Parcel Record Selected'}
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {isBn
              ? 'অনুগ্রহ করে অনুসন্ধান পাতায় ফিরে গিয়ে একটি জমির পরিচিতি প্রবেশ করান বা তালিকা থেকে বাছাই করুন।'
              : 'Please return to the parcel lookup form to enter identifiers or select a recorded scenario.'}
          </p>
          <div className="pt-2">
            <Link to="/check" className="btn-primary text-xs px-5 py-2.5 font-bold">
              {isBn ? 'জমি অনুসন্ধান পাতায় যান' : 'Go to Parcel Lookup'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isPaid) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 space-y-6 animate-fade-up">
        {/* Header Breadcrumb / Back */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/check')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBn ? 'অনুসন্ধান পাতায় ফিরে যান' : 'Back to Search'}</span>
          </button>
          <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
            {parcel.id}
          </span>
        </div>

        {/* Monthly Quota Indicator */}
        <MonthlyQuotaCard
          quota={quota}
          onQuotaChange={setQuota}
        />

        {/* Friendly Payment & Approval Gate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-gov-primary border border-emerald-200 flex items-center justify-center shrink-0">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {isBn ? 'অনুমোদন প্রয়োজন' : 'Approval Required'}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                {isBn
                  ? 'জমির বিস্তারিত তথ্য দেখতে ডিজিটাল ব্যাংকিং ফি পরিশোধ করুন'
                  : 'Pay Digital Banking Fee to Unlock Land Information'}
              </h2>
            </div>
          </div>

          {/* Target Parcel Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              {isBn ? 'অনুসন্ধানকৃত জমি' : 'Requested Parcel'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-slate-800">
              <div>
                <span className="text-slate-500 block">{isBn ? 'মৌজা:' : 'Mouza:'}</span>
                <span className="font-bold">{parcel.mouza}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'খতিয়ান নম্বর:' : 'Khatian:'}</span>
                <span className="font-bold">{parcel.khatianNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'দাগ নম্বর:' : 'Dag:'}</span>
                <span className="font-bold">{parcel.dagNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'উপজেলা:' : 'Upazila:'}</span>
                <span className="font-bold">{parcel.upazila}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'জেলা:' : 'District:'}</span>
                <span className="font-bold">{parcel.district}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isBn ? 'যাচাই ফি:' : 'Fee:'}</span>
                <span className="font-extrabold text-emerald-700">{isBn ? '৳ ১৫০০ টাকা' : '1,500 BDT'}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600">
            <p>
              {isBn
                ? 'জমির খতিয়ান, দাগ, মালিকানা ও হস্তান্তরের পূর্ণাঙ্গ তথ্য দেখতে ১৫০০ টাকা ফি পরিশোধ করুন।'
                : 'Pay the 1,500 BDT verification fee to view complete land records and mutation history.'}
            </p>
          </div>

          {/* Action button or Quota Block Notice */}
          <div className="pt-2">
            {quota.isExceeded ? (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
                <p className="leading-snug">
                  {isBn
                    ? `চলতি মাসে আপনার ৫টি আবেদন সম্পন্ন হয়েছে। আগামী ${quota.resetDateFormattedBn} তারিখে কোটা রিসেট হবে।`
                    : `You have reached the 5 verification checks limit for this month. Quota will reset on ${quota.resetDateFormatted}.`}
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPaymentModalOpen(true)}
                className="w-full btn-primary py-3 font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>
                  {isBn ? '১৫০০ টাকা পরিশোধ করে তথ্য দেখুন' : 'Pay 1,500 BDT & View Information'}
                </span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            {isBn
              ? 'বিকাশ, নগদ, রকেট বা কার্ডের মাধ্যমে ডিজিটাল ব্যাংকিং ফি পরিশোধ করা যাবে।'
              : 'Supports digital payment via bKash, Nagad, Rocket, or Debit/Credit Cards.'}
          </p>
        </div>

        {/* Modal */}
        <DigitalBankingModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          parcelSummary={{
            id: parcel.id,
            mouza: parcel.mouza,
            khatianNumber: parcel.khatianNumber,
            dagNumber: parcel.dagNumber,
            upazila: parcel.upazila,
            district: parcel.district,
          }}
          onPaymentSuccess={(newTxn) => {
            markParcelPaid(parcel.id, newTxn);
            const res = recordVerificationApplication({
              parcelId: parcel.id,
              mouza: parcel.mouza,
              dagNumber: parcel.dagNumber,
              khatianNumber: parcel.khatianNumber,
              upazila: parcel.upazila,
              district: parcel.district,
              txnId: newTxn,
              userId: currentUser?.id || 'USER-DEMO-001',
              amount: 1500,
            });
            setQuota(res.quota);
            setIsPaid(true);
            setCurrentTxnId(newTxn);
            setPaymentModalOpen(false);
          }}
        />
      </div>
    );
  }

  const assessment = assessParcel(parcel);
  const sortedEvents = sortTimelineEvents(parcel.events, 'asc');

  const handleSaveCheck = () => {
    if (!parcel) return;
    const newSaved = saveCheck({
      nickname: `${parcel.mouza} Plot ${parcel.dagNumber} Review`,
      parcelId: parcel.id,
      division: parcel.division,
      district: parcel.district,
      upazila: parcel.upazila,
      mouza: parcel.mouza,
      khatianNumber: parcel.khatianNumber,
      dagNumber: parcel.dagNumber,
      jlNumber: parcel.jlNumber || undefined,
      area: parcel.area ? `${parcel.area} ${parcel.areaUnit}` : undefined,
      matchType: 'exact',
      statusLabel: (isBn ? assessment.label : assessment.label) as any,
      statusBadgeClass: assessment.badgeClass,
      summary: parcel.statusExplanation,
      userNotes: '',
      findingsCount: parcel.findings.length,
      verificationTasks: [
        {
          id: `TASK-${Date.now()}-1`,
          title: 'Obtain physically certified copy of Mutation Porcha from AC (Land)',
          titleBn: 'সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি পর্চার সার্টিফাইড কপি সংগ্রহ',
          description: 'Apply at the local Revenue Circle office for a signed Record of Rights.',
          descriptionBn: 'উপজেলা/সার্কেল ভূমি অফিস থেকে নামজারি অনুমোদনের সত্যায়িত খতিয়ান ও ডিসিআর সংগ্রহ করুন।',
          status: 'not_started',
        },
        {
          id: `TASK-${Date.now()}-2`,
          title: 'Conduct Nil Search at Sub-Registry Office (Book 1 & 2)',
          titleBn: 'সাব-রেজিস্ট্রি অফিসে বালাম তল্লাশি (১২-২৫ বছরের নিল সার্চ)',
          description: 'Search indexes for at least 12-25 years to uncover unrecorded transfers.',
          descriptionBn: 'অপ্রকাশিত কোনো রেজিস্ট্রি দলিল বা ব্যাংক বন্ধক রয়েছে কি না তা নিশ্চিত করতে বালাম তল্লাশি করুন।',
          status: 'not_started',
        },
        {
          id: `TASK-${Date.now()}-3`,
          title: 'Physical on-site possession and boundary verification',
          titleBn: 'মাঠপর্যায়ে সরেজমিন দখল ও সীমানা যাচাই',
          description: 'Interview adjacent plot occupants and inspect demarcations.',
          descriptionBn: 'জমির চারপাশের সীমানা খুঁটি মেপে দেখুন এবং পার্শ্ববর্তী প্রতিবেশীদের সাথে সরেজমিনে কথা বলুন।',
          status: 'not_started',
        },
      ],
    });
    setSavedCheckId(newSaved.id);
  };

  const handlePrint = () => {
    window.print();
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'transfer_related':
        return {
          icon: <FileText className="w-4 h-4 text-purple-700" aria-hidden="true" />,
          label: isBn ? 'হস্তান্তর / রেজিস্ট্রিকৃত দলিল' : 'Transfer-related / registered deed',
          className: 'bg-purple-50 text-purple-900 border-purple-200',
        };
      case 'mutation_application':
        return {
          icon: <FileSpreadsheet className="w-4 h-4 text-blue-700" aria-hidden="true" />,
          label: isBn ? 'নামজারি আবেদন দাখিলকৃত' : 'Mutation application submitted',
          className: 'bg-blue-50 text-blue-900 border-blue-200',
        };
      case 'mutation_completed':
        return {
          icon: <FileCheck2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />,
          label: isBn ? 'নামজারি সম্পন্ন' : 'Mutation completed',
          className: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        };
      default:
        return {
          icon: <Clock className="w-4 h-4 text-slate-600" aria-hidden="true" />,
          label: isBn ? 'অন্যান্য রেকর্ড' : 'General Record',
          className: 'bg-slate-50 text-slate-800 border-slate-200',
        };
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-up max-w-4xl mx-auto">
      {/* 0. Verified Payment & Approval Banner */}
      <div className="rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-900">
                {isBn ? '✓ তথ্য দেখার সরকারি ডিজিটাল অনুমোদন সক্রিয়' : '✓ Verified Inspection Approval Active'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-950 border border-emerald-300">
                {isBn ? 'অনুমোদিত' : 'Approved'}
              </span>
            </div>
            <p className="text-xs text-emerald-800 mt-0.5 flex flex-wrap items-center gap-2">
              <span>{isBn ? 'ডিজিটাল ব্যাংকিং ফি পরিশোধিত: ১৫০০ টাকা' : 'Digital Banking Fee Paid: 1,500 BDT'}</span>
              {currentTxnId && (
                <span className="font-mono text-[11px] font-bold text-slate-800 bg-white/90 px-2 py-0.5 rounded border border-emerald-300">
                  {isBn ? 'ট্রানজেকশন ID: ' : 'Txn ID: '}{currentTxnId}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 self-start sm:self-auto bg-white/60 px-2.5 py-1 rounded-lg border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isBn ? 'যাচাইকৃত রেকর্ড উন্মুক্ত' : 'Full Record Unlocked'}</span>
        </div>
      </div>

      {/* 1. Result Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs mt-1">
              <img src="/logo.png" alt="ভূমি মন্ত্রণালয়" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-gov-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {parcel.id}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {isBn ? 'ভূমি মন্ত্রণালয় রেকর্ড' : 'Ministry of Land Record'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isBn ? 'উপলব্ধ তথ্য পর্যালোচনা' : 'Review the available information.'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? 'সর্বশেষ হালনাগাদ: ' : 'Last updated: '}
                <span className="font-medium text-slate-700">
                  {formatSafeDate(parcel.updatedDate, isBn ? 'তারিখ পাওয়া যায়নি' : 'Unknown date')}
                </span>
              </p>
            </div>
          </div>

          {/* Top Actions: Edit parcel details, Save check, Print, & New search */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto print:hidden">
            {savedCheckId ? (
              <Link
                to={`/checks/${savedCheckId}`}
                className="btn-secondary text-xs px-3.5 py-2 font-bold flex items-center gap-1.5 text-gov-primary bg-emerald-50 border-emerald-300"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'সংরক্ষিত তালিকায় আছে' : 'Saved in Checks'}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleSaveCheck}
                className="btn-secondary text-xs px-3.5 py-2 cursor-pointer flex items-center gap-1.5 font-bold text-gov-primary"
                title={isBn ? 'এই ফলাফলটি লোকাল তালিকায় সংরক্ষণ করুন' : 'Save this check to your local workspace'}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isBn ? 'যাচাই সংরক্ষণ করুন' : 'Save Check'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="btn-secondary text-xs px-3 py-2 cursor-pointer flex items-center gap-1.5 font-medium text-slate-700"
              title={isBn ? 'এই সারসংক্ষেপটি প্রিন্ট করুন' : 'Print this due diligence summary'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রিন্ট' : 'Print'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/check')}
              className="btn-secondary text-xs px-3.5 py-2 cursor-pointer flex items-center gap-1.5 font-medium"
              title="Return to form with entered values preserved"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'তথ্য পরিবর্তন' : 'Edit details'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/check?clear=1')}
              className="btn-primary text-xs px-3.5 py-2 font-bold cursor-pointer flex items-center gap-1.5"
              title="Clear values and start a new lookup"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'নতুন অনুসন্ধান' : 'New search'}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {isBn
            ? 'এই প্রতিবেদনে জমির খতিয়ান, দাগ এবং হস্তান্তরের ধারাবাহিক রেকর্ডের বিশ্লেষণ প্রদর্শন করা হয়েছে।'
            : 'This summary presents an automated rule-based analysis of recorded land events and identifiers.'}
        </p>
      </div>

      {/* 1.5. Clear Land Concept & Buyer Verdict (Plain-Language Transparency) */}
      <ClearLandConceptCard parcel={parcel} isBn={isBn} />

      {/* 2. Assessment Summary Card (Only 3 Cautious Statuses, No Fraud Score, Visible Limitation Note) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {isBn ? 'সার্বিক পর্যালোচনা স্থিতি' : 'Assessment Summary'}
            </span>
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${assessment.badgeClass}`}>
                {isBn ? assessment.labelBn : assessment.label}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-semibold text-slate-700 block">
              {assessment.reviewItemsCount} {isBn ? 'টি পর্যালোচ্য বিষয়' : 'review finding(s)'}
            </span>
            <span className="text-[11px] text-slate-400">
              {isBn ? 'কোনো ফ্রড স্কোর ব্যবহার করা হয় না' : 'No numerical fraud score used'}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isBn ? assessment.summaryBn : assessment.summary}
        </p>

        {/* Visible Limitation Note (Mandatory on every status) */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong>{isBn ? 'সীমাবদ্ধতা নোট:' : 'Limitation Note:'}</strong>{' '}
            {isBn ? assessment.limitationNoteBn : assessment.limitationNote}
          </p>
        </div>
      </section>

      {/* 3. Parcel Summary (Shows only data actually present; absent fields show "Not available in record") */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-gov-primary" aria-hidden="true" />
            <span>{isBn ? 'জমির পরিচিতি সারসংক্ষেপ' : 'Parcel Summary'}</span>
          </h2>
          <span className="text-[11px] text-slate-400">
            {isBn ? 'রেকর্ড বিবরণ' : 'Record Details'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'বিভাগ' : 'Division'}
            </span>
            <span className="font-semibold text-slate-900">
              {parcel.division || (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'জেলা' : 'District'}
            </span>
            <span className="font-semibold text-slate-900">
              {parcel.district || (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'উপজেলা / থানা' : 'Upazila / Thana'}
            </span>
            <span className="font-semibold text-slate-900">
              {parcel.upazila || (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'মৌজা' : 'Mouza'}
            </span>
            <span className="font-semibold text-slate-900">
              {parcel.mouza || (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'জে.এল. নম্বর' : 'JL Number'}
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {parcel.jlNumber ?? (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'খতিয়ান নম্বর' : 'Khatian Number'}
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {parcel.khatianNumber || (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'দাগ / প্লট নম্বর' : 'Dag / Plot Number'}
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {parcel.dagNumber || (isBn ? 'রেকর্ড নেই' : 'Not recorded')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              {isBn ? 'জমির পরিমাণ' : 'Land Area'}
            </span>
            <span className="font-semibold text-slate-900">
              {parcel.area
                ? `${parcel.area} ${isBn ? 'শতাংশ' : parcel.areaUnit}`
                : isBn
                ? 'রেকর্ড নেই'
                : 'Not recorded'}
            </span>
          </div>
        </div>

        {parcel.landClassification && (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
            <strong>{isBn ? 'জমির শ্রেণী:' : 'Land Classification:'}</strong>{' '}
            {isBn && parcel.landClassificationBn ? parcel.landClassificationBn : parcel.landClassification}
          </div>
        )}
      </section>

      {/* 4. Chronological Event Timeline (3 Distinct Event Types, Never Conflated) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gov-primary" aria-hidden="true" />
              <span>{isBn ? 'কালানুক্রমিক ঘটনার বিবরণ' : 'Chronological Event Timeline'}</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isBn
                ? 'হস্তান্তর দলিল, নামজারি আবেদন এবং চূড়ান্ত নামজারি আদেশ—তিনটি পৃথক ঘটনা।'
                : 'Transfer deeds, mutation petitions, and completed orders are distinct event types.'}
            </p>
          </div>

          <span className="text-[11px] text-slate-400">
            {sortedEvents.length} {isBn ? 'টি ঘটনা' : 'event(s)'}
          </span>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1.5">
            <HelpCircle className="w-6 h-6 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="font-semibold text-slate-700">
              {isBn ? 'কোনো সাম্প্রতিক লেনদেন ঘটনা পাওয়া যায়নি।' : 'No recent transaction events found.'}
            </p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {sortedEvents.map((evt) => {
              const badge = getEventBadge(evt.type);

              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline marker */}
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-gov-primary flex items-center justify-center shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-gov-primary" />
                  </div>

                  {/* Event content card */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/90 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${badge.className}`}>
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                        <h3 className="text-xs font-bold text-slate-900">
                          {isBn && evt.titleBn ? evt.titleBn : evt.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        <span>{formatSafeDate(evt.date, isBn ? 'তারিখ পাওয়া যায়নি' : 'Date not available')}</span>
                        {evt.reference ? (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-700">
                              {isBn ? 'সূত্র: ' : 'Ref: '}{evt.reference}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] text-slate-400 italic">
                              {isBn ? 'রেফারেন্স পাওয়া যায়নি' : 'Reference not available'}
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
      </section>

      {/* 5. Findings and Review Items */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gov-primary" aria-hidden="true" />
            <span>{isBn ? 'পর্যালোচ্য পর্যবেক্ষণ' : 'Findings & Review Items'}</span>
          </h2>
        </div>

        {parcel.findings.length === 0 ? (
          <p className="text-xs text-slate-500 italic">
            {isBn
              ? 'এই রেকর্ডে কোনো নির্দিষ্ট পর্যালোচ্য বিষয় চিহ্নিত হয়নি।'
              : 'No specific review items flagged for this parcel.'}
          </p>
        ) : (
          <div className="space-y-3">
            {parcel.findings.map((finding, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">
                    {isBn && finding.titleBn ? finding.titleBn : finding.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {/* Why it may matter */}
                  <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 space-y-0.5">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                      <span>{isBn ? 'পর্যালোচনার কারণ' : 'Why it matters'}</span>
                    </span>
                    <p className="text-amber-900 text-[11px] leading-snug">
                      {isBn && finding.whyItMattersBn ? finding.whyItMattersBn : finding.whyItMatters}
                    </p>
                  </div>

                  {/* Recorded evidence */}
                  <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/80 space-y-0.5">
                    <span className="font-bold text-blue-950 flex items-center gap-1.5 text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                      <span>{isBn ? 'প্রাপ্ত প্রমাণ' : 'Recorded evidence'}</span>
                    </span>
                    <p className="text-blue-900 text-[11px] leading-snug">
                      {isBn && finding.sampleEvidenceBn ? finding.sampleEvidenceBn : finding.sampleEvidence}
                    </p>
                  </div>

                  {/* Information still missing */}
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                      <span>{isBn ? 'অনুপস্থিত তথ্য' : 'Missing info'}</span>
                    </span>
                    <p className="text-slate-700 text-[11px] leading-snug">
                      {isBn && finding.missingInfoBn ? finding.missingInfoBn : finding.missingInfo}
                    </p>
                  </div>

                  {/* Practical next verification step */}
                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 space-y-0.5">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                      <span>{isBn ? 'পরবর্তী পদক্ষেপ' : 'Next step'}</span>
                    </span>
                    <p className="text-emerald-900 text-[11px] leading-snug">
                      {isBn && finding.nextStepBn ? finding.nextStepBn : finding.nextStep}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Missing Information */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? 'অনুপস্থিত তথ্য' : 'Missing Information'}</span>
        </h2>

        <ul className="space-y-2 pt-1 text-xs text-slate-700">
          {(isBn && parcel.missingInformationBn ? parcel.missingInformationBn : parcel.missingInformation).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Recommended Next Steps */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? 'পরবর্তী পদক্ষেপসমূহ' : 'Recommended Next Steps'}</span>
        </h2>

        <ul className="space-y-2 pt-1 text-xs text-slate-700">
          {(isBn && parcel.recommendedNextStepsBn ? parcel.recommendedNextStepsBn : parcel.recommendedNextSteps).map((step, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100 text-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span className="leading-snug">{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Results Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
        <Link
          to="/about"
          className="text-xs text-gov-primary hover:underline font-semibold flex items-center gap-1"
        >
          <Scale className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isBn ? 'আইনগত প্রেক্ষাপট ও ধারা ৮৯' : 'Legal Diligence Rules'}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/check')}
            className="btn-secondary text-xs px-4 py-2 font-medium cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isBn ? 'তথ্য পরিবর্তন' : 'Edit details'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/check?clear=1')}
            className="btn-primary text-xs px-5 py-2 font-bold cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isBn ? 'অন্য জমি যাচাই' : 'Check another'}</span>
          </button>
        </div>
      </div>

      {/* 9. External Official Resource Links Notice */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <span className="font-bold text-slate-800">
          {isBn ? 'অফিশিয়াল পোর্টাল:' : 'Official Portals:'}
        </span>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <a
            href="https://mutation.land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>{isBn ? 'ই-নামজারি (mutation.land.gov.bd)' : 'e-Mutation Portal'}</span>
            <ExternalLink className="w-3 h-3" aria-label="(opens in a new tab)" />
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>{isBn ? 'জাতীয় ভূমি সেবা (land.gov.bd)' : 'National Land Portal'}</span>
            <ExternalLink className="w-3 h-3" aria-label="(opens in a new tab)" />
          </a>
        </div>
      </div>
    </div>
  );
};
