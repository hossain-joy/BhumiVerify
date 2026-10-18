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
import { SubRegistryLiveCard } from '../components/land/SubRegistryLiveCard';
import { OrganizedLandReport } from '../components/land/OrganizedLandReport';
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
    <div className="space-y-8 pb-16 animate-fade-up w-full">
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
                {isBn ? 'জমি যাচাইয়ের ফলাফল' : 'Land Verification Result'}
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

      {/* Unified, Master Organized Land Diligence Report */}
      <OrganizedLandReport
        parcel={parcel}
        isBn={isBn}
        assessment={assessment}
        sortedEvents={sortedEvents}
      />

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
