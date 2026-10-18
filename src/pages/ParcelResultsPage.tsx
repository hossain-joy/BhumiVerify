import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PARCELS } from '../lib/mock-data/parcels';
import { ParcelReference, LandEvent, ParcelInputDetails } from '../types';
import {
  matchParcel,
  assessParcelRisk,
  detectConflictingDetails,
  getMissingInformation,
  getRecommendedChecks,
  handleNoMatch,
} from '../utils/landFunctions';
import { extractCoreStatus } from '../lib/riskEngine';
import { ParcelSummary } from '../components/land/ParcelSummary';
import { RiskOverview } from '../components/land/RiskOverview';
import { TransactionTimeline } from '../components/land/TransactionTimeline';
import { RiskExplanation } from '../components/land/RiskExplanation';
import { MissingInformation } from '../components/land/MissingInformation';
import { Disclaimer } from '../components/common/Disclaimer';
import { DemoDataTag } from '../components/common/DemoDataTag';
import {
  ArrowLeft,
  Search,
  RotateCcw,
  Printer,
  Users,
  Receipt,
  Landmark,
  Scale,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  Share2,
  FileText,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const ParcelResultsPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState<ParcelReference | null>(null);
  const [matchType, setMatchType] = useState<'exact' | 'partial' | 'ambiguous' | 'no_match'>('no_match');
  const [ambiguousCandidates, setAmbiguousCandidates] = useState<ParcelReference[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const idParam = searchParams.get('id');
    const dagParam = searchParams.get('dag') || searchParams.get('dagNumber');
    const mouzaParam = searchParams.get('mouza');
    const upazilaParam = searchParams.get('upazila');
    const districtParam = searchParams.get('district');
    const divisionParam = searchParams.get('division');
    const khatianParam = searchParams.get('khatian') || searchParams.get('khatianNumber');

    // 1. Direct ID match
    if (idParam) {
      const found = INITIAL_PARCELS.find((p) => p.id === idParam);
      if (found) {
        setParcel(found);
        setMatchType('exact');
        return;
      }
    }

    // 2. Query multi-identifier match
    if (dagParam || mouzaParam) {
      const input: ParcelInputDetails = {
        division: divisionParam || '',
        district: districtParam || '',
        upazila: upazilaParam || '',
        mouza: mouzaParam || '',
        dagNumber: dagParam || '',
        khatianNumber: khatianParam || undefined,
      };

      const result = matchParcel(input, INITIAL_PARCELS);
      setMatchType(result.matchType);
      if (result.parcel) {
        setParcel(result.parcel);
      } else {
        setParcel(null);
      }
      if (result.candidates) {
        setAmbiguousCandidates(result.candidates);
      }
      return;
    }

    // Default: If no search query, fallback to first demo parcel for immediate review
    const defaultParcel = INITIAL_PARCELS[0];
    if (defaultParcel) {
      setParcel(defaultParcel);
      setMatchType('exact');
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleVoiceRead = () => {
    if (!('speechSynthesis' in window) || !parcel) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const risk = assessParcelRisk(parcel);
    const textToSpeak = language === 'bn'
      ? `ভূমিভেরিফাই ফলাফল রিপোর্ট। মৌজা ${parcel.mouza}, দাগ নম্বর ${parcel.dagNumber}। সার্বিক মূল্যায়ন: ${risk.labelBn}। ${risk.summaryBn}`
      : `BhumiSure verification report. Mouza ${parcel.mouza}, Dag plot ${parcel.dagNumber}. Overall Assessment: ${risk.label}. ${risk.summary}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // No Match State
  if (matchType === 'no_match' || !parcel) {
    const noMatchData = handleNoMatch({
      division: searchParams.get('division') || '',
      district: searchParams.get('district') || '',
      upazila: searchParams.get('upazila') || '',
      mouza: searchParams.get('mouza') || '',
      dagNumber: searchParams.get('dag') || '',
    });

    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
            <HelpCircle className="w-8 h-8 text-slate-600" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
                {language === 'bn' ? 'ম্যাচ পাওয়া যায়নি' : 'No Match Found'}
              </span>
              <DemoDataTag type="demo_data" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'bn' ? 'নমুনা ডেটাসেটে কোনো রেকর্ড মেলেনি' : 'No Matching Record in Demonstration Dataset'}
            </h1>

            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {language === 'bn' ? noMatchData.messageBn : noMatchData.message}
            </p>
          </div>

          {/* Statutory Critical Diligence Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 space-y-2 max-w-2xl mx-auto">
            <div className="font-bold flex items-center gap-2 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{language === 'bn' ? 'সংবিধিবদ্ধ সতর্কতা (Statutory Caution):' : 'Statutory Pre-Purchase Caution:'}</span>
            </div>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'নমুনা ডেটায় রেকর্ড না পাওয়ার অর্থ কখনোই এটি নয় যে জমিটি আইনি ঝামেলা বা প্রতারণামুক্ত। জমি ক্রয়ের পূর্বে সহকারী কমিশনার (ভূমি) অফিস এবং সাব-রেজিস্ট্রি অফিসে সশরীরে বায়া দলিল ও মূল ভলিউম তল্লাশি করা আবশ্যক।'
                : 'The absence of mock records must NEVER be treated as evidence that the land has clear title or is fraud-free. Physical verification of deeds and volume books at the Sub-Registry and AC (Land) office is indispensable.'}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/check"
              className="btn-primary text-xs px-6 py-2.5 font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'bn' ? 'পুনরায় অনুসন্ধান করুন' : 'Search Another Parcel'}</span>
            </Link>

            <Link
              to="/check?scenario=1"
              className="btn-secondary text-xs px-5 py-2.5 font-medium cursor-pointer"
            >
              <span>{language === 'bn' ? 'নমুনা রেকর্ড ১ দেখুন' : 'Try Demo Scenario 1'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Ambiguous Match Banner if multiple candidates were returned
  const hasMultipleAmbiguous = matchType === 'ambiguous' && ambiguousCandidates.length > 1;

  return (
    <div className="space-y-6 pb-16 animate-fade-up">
      {/* Top Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/check')}
              className="btn-secondary text-xs px-3 py-1.5 cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'অনুসন্ধান ফর্মে ফিরে যান' : 'Back to Search Form'}</span>
            </button>

            <span className="text-slate-300 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'ফলাফল আইডি:' : 'Result ID:'}
              </span>
              <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {parcel.id}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Voice Audio Briefing */}
            <button
              onClick={handleVoiceRead}
              className={`btn-secondary text-xs px-3 py-1.5 cursor-pointer flex items-center gap-1.5 ${
                isSpeaking ? 'bg-teal-50 text-teal-800 border-teal-300' : ''
              }`}
              title="Listen to findings"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                  <span>{language === 'bn' ? 'থামান' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-gov-primary" />
                  <span>{language === 'bn' ? 'অডিও শুনুন' : 'Voice Brief'}</span>
                </>
              )}
            </button>

            {/* Print Report */}
            <button
              onClick={handlePrint}
              className="btn-secondary text-xs px-3 py-1.5 cursor-pointer flex items-center gap-1.5"
              title="Print Summary Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'প্রিন্ট রিপোর্ট' : 'Print Report'}</span>
            </button>

            {/* Search Another Parcel */}
            <button
              onClick={() => navigate('/check')}
              className="btn-primary text-xs px-4 py-1.5 font-bold cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'অন্য দাগ অনুসন্ধান' : 'Search Another Parcel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ambiguous Match Candidate Selector */}
      {hasMultipleAmbiguous && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>
              {language === 'bn'
                ? 'দ্বৈত বা একাধিক সম্ভাব্য ম্যাচ শনাক্ত হয়েছে (Ambiguous Match):'
                : 'Multiple Matching Candidates Detected in Demo Feed:'}
            </span>
          </div>
          <p className="leading-snug">
            {language === 'bn'
              ? 'প্রদত্ত দাগ নম্বরে একাধিক মৌজা বা খতিয়ানের রেকর্ড বিদ্যমান। নিচের তালিকা থেকে কাঙ্ক্ষিত প্লটটি নির্বাচন করুন:'
              : 'The entered Dag number corresponds to more than one demo parcel. Choose the specific record to inspect:'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {ambiguousCandidates.map((c) => (
              <button
                key={c.id}
                onClick={() => setParcel(c)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                  c.id === parcel.id
                    ? 'bg-amber-600 text-white border-amber-700'
                    : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                {c.mouza} • Dag {c.dagNumber} (Khatian {c.khatianNumber || 'N/A'})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 1. Parcel Summary Component */}
      <ParcelSummary
        parcel={parcel}
        matchType={matchType}
        onEditSearch={() => navigate(`/check?parcel=${parcel.id}`)}
      />

      {/* 2. Risk Overview Component (Transparent Rules & 3 Checkpoint Cards) */}
      <RiskOverview parcel={parcel} />

      {/* 3. Detailed Ownership, Co-Sharers & Tax Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* A. Recorded Owners in RoR */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Users className="w-4 h-4 text-gov-primary" />
              <span>{language === 'bn' ? 'খতিয়ানভুক্ত রেকর্ডীয় মালিক ও অংশীদার' : 'Recorded Owners in RoR & Shares'}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {parcel.recordedOwners?.length || 0} জন মালিক
            </span>
          </div>

          {parcel.recordedOwners && parcel.recordedOwners.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-slate-700">
              {parcel.recordedOwners.map((owner, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{owner}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">
              {language === 'bn' ? 'মালিকানার বিস্তারিত নাম উপলব্ধ ডেমো রেকর্ডে অন্তর্ভুক্ত নেই।' : 'Detailed claimant names not recorded in available sample feed.'}
            </p>
          )}

          <p className="text-[10px] text-slate-400 leading-tight pt-1">
            {language === 'bn'
              ? 'সতর্কতা: শরিকদের সম্মতি বা বণ্টননামা ছাড়া জমি ক্রয় করলে ধারা ৯৬ শরিকি অগ্রক্রয় (Pre-emption) মামলার ঝুঁকি তৈরি হয়।'
              : 'Notice: Purchasing undivided shares without registered partition exposes buyers to Section 96 SAT Act pre-emption.'}
          </p>
        </div>

        {/* B. Land Development Tax & Revenue Clearance */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Receipt className="w-4 h-4 text-gov-primary" />
              <span>{language === 'bn' ? 'ভূমি উন্নয়ন কর (খাজনা) ও দাখিলা স্থিতি' : 'Land Development Tax & Dakhila Status'}</span>
            </div>
            {parcel.taxStatus?.status === 'paid' ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                {language === 'bn' ? 'পরিশোধিত' : 'Paid Up to Date'}
              </span>
            ) : parcel.taxStatus?.status === 'arrears' ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-900 border border-rose-300">
                {language === 'bn' ? 'বকেয়া কর' : 'Tax Arrears'}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {language === 'bn' ? 'অনিশ্চিত' : 'Status Unknown'}
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">{language === 'bn' ? 'সর্বশেষ পরিশোধিত বছর:' : 'Last Paid Year:'}</span>
              <span className="font-semibold text-slate-800">{parcel.taxStatus?.lastPaidYearBS || 'রেকর্ড নেই (N/A)'}</span>
            </div>

            {parcel.taxStatus?.dakhilaNumber && (
              <div className="flex justify-between py-1 border-b border-slate-50 font-mono text-[11px]">
                <span className="text-slate-500">{language === 'bn' ? 'দাখিলা / রসিদ নং:' : 'Dakhila / Receipt #:'}</span>
                <span className="font-bold text-slate-800">{parcel.taxStatus.dakhilaNumber}</span>
              </div>
            )}

            {parcel.taxStatus?.amountBdt && (
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">{language === 'bn' ? 'ধার্যকৃত করের পরিমাণ:' : 'Assessed Amount:'}</span>
                <span className="font-bold text-slate-800">৳{parcel.taxStatus.amountBdt.toLocaleString('en-BD')}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-600 pt-1 leading-snug">
              {parcel.taxStatus?.note}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Encumbrances, Litigation, Mortgage & 25-Year Baya Chain */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Landmark className="w-4 h-4 text-gov-primary" />
            <span>{language === 'bn' ? 'প্রাতিষ্ঠানিক দায়, নিষেধাজ্ঞা ও বায়া দলিলের ধারাবাহিকতা' : 'Encumbrance, Court Orders & Baya Deed Chain Signals'}</span>
          </div>
          <span className="text-[10px] text-slate-400">
            {language === 'bn' ? 'ব্যাংক, আদালত ও সাব-রেজিস্ট্রি সংকেত' : 'Bank, Court, and Registry Signals'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Mortgage */}
          <div className={`p-3 rounded-lg border ${
            parcel.encumbranceSignals?.hasMortgage
              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? 'ব্যাংক মর্টগেজ / দায়' : 'Bank Mortgage / Lien'}
              </span>
              {parcel.encumbranceSignals?.hasMortgage ? (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-200 text-rose-900">মর্টগেজ বিদ্যমান</span>
              ) : (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800">দায়মুক্ত</span>
              )}
            </div>
            <p className="text-[11px] leading-snug">
              {parcel.encumbranceSignals?.hasMortgage
                ? `${parcel.encumbranceSignals.bankOrLender} — ${parcel.encumbranceSignals.mortgageNote}`
                : language === 'bn'
                ? 'সিমুলেটেড লেজারে কোনো রেজিস্ট্রিকৃত ব্যাংক চার্জ নেই।'
                : 'No active registered bank mortgage on demo record.'}
            </p>
          </div>

          {/* Stay Order */}
          <div className={`p-3 rounded-lg border ${
            parcel.encumbranceSignals?.hasStayOrder
              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? 'আদালতের নিষেধাজ্ঞা' : 'Civil Court Injunction'}
              </span>
              {parcel.encumbranceSignals?.hasStayOrder ? (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-200 text-rose-900">নিষেধাজ্ঞা জারি</span>
              ) : (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800">অর্ডার নেই</span>
              )}
            </div>
            <p className="text-[11px] leading-snug">
              {parcel.encumbranceSignals?.hasStayOrder
                ? `${parcel.encumbranceSignals.courtName} (${parcel.encumbranceSignals.caseRef}) — ${parcel.encumbranceSignals.litigationNote}`
                : language === 'bn'
                ? 'উপলব্ধ রেকর্ডে কোনো আদালতের স্থগিতাদেশ নেই।'
                : 'No pending civil court injunction reported in demo data.'}
            </p>
          </div>

          {/* Khas / Vested */}
          <div className={`p-3 rounded-lg border ${
            parcel.encumbranceSignals?.isKhasOrVested
              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? 'খাস / অর্পিত সম্পত্তি' : 'Khas / Vested Property'}
              </span>
              {parcel.encumbranceSignals?.isKhasOrVested ? (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-200 text-rose-900">তালিকাভুক্ত</span>
              ) : (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800">মুক্ত</span>
              )}
            </div>
            <p className="text-[11px] leading-snug">
              {parcel.encumbranceSignals?.isKhasOrVested
                ? parcel.encumbranceSignals.vestedNote
                : language === 'bn'
                ? 'সরকারি খাস বা অর্পিত সম্পত্তি তালিকায় অন্তর্ভুক্ত নয়।'
                : 'Not listed in government khas or vested property schedule.'}
            </p>
          </div>

          {/* Baya Deed Chain (25 Years) */}
          <div className={`p-3 rounded-lg border ${
            parcel.bayaChain?.chainIntact
              ? 'bg-slate-50 border-slate-200 text-slate-800'
              : 'bg-amber-50/80 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {language === 'bn' ? '২৫ বছরের বায়া দলিল' : '25-Year Baya Chain'}
              </span>
              {parcel.bayaChain?.chainIntact ? (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">অবিচ্ছিন্ন</span>
              ) : (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-200 text-amber-900">ধারাবাহিকতায় ফাঁক</span>
              )}
            </div>
            <p className="text-[11px] leading-snug">
              {parcel.bayaChain?.note || (language === 'bn' ? 'বায়া দলিলের রেকর্ড পরীক্ষিত।' : 'Baya deeds verified in record.')}
            </p>
          </div>
        </div>

        {parcel.encumbranceSignals?.hasPowerOfAttorney && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
            <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>{language === 'bn' ? 'আমমোক্তারনামা (Power of Attorney) সতর্কতা:' : 'Power of Attorney Notice:'}</strong>{' '}
              {parcel.encumbranceSignals.poaDetails}
            </div>
          </div>
        )}
      </div>

      {/* 5. Missing Information & Conflicts Component */}
      <MissingInformation parcel={parcel} />

      {/* 6. Plain-Language Risk Explanation & Next Steps Component */}
      <RiskExplanation parcel={parcel} />

      {/* 7. Chronological Transaction Timeline Component */}
      <TransactionTimeline events={parcel.events || []} />

      {/* 8. Statutory Disclaimer Component */}
      <Disclaimer compact={false} />

      {/* Bottom Sticky Action Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
        <Link
          to="/about"
          className="text-xs text-gov-primary hover:underline font-semibold flex items-center gap-1"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'আইনগত ভিত্তি ও ধারা ৮৯ বিস্তারিত জানুন' : 'Legal Diligence Guide & Section 89 SAT Act'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="btn-secondary text-xs px-4 py-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'রিপোর্ট সংরক্ষণ / প্রিন্ট' : 'Save / Print Report'}</span>
          </button>

          <button
            onClick={() => navigate('/check')}
            className="btn-primary text-xs px-5 py-2 font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'অন্য একটি জমি অনুসন্ধান করুন' : 'Search Another Parcel'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
