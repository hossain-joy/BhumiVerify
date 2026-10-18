import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { RequestStatusBadge } from '../../components/requests/RequestStatusBadge';
import { formatDate, formatDateTime, getTimeRemaining } from '../../lib/utils';
import {
  FilePlus,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  Inbox,
  AlertTriangle,
  Lock,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { currentUser, requests, notifications, resetCitizenIdentity } = useApp();
  const { t, language } = useLanguage();

  const userRequests = requests.filter((r) => r.userId === currentUser.id);

  const counts = {
    total: userRequests.length,
    underReview: userRequests.filter((r) => r.status === 'under_review' || r.status === 'submitted').length,
    actionRequired: userRequests.filter(
      (r) => r.status === 'more_info_required' || r.status === 'payment_pending'
    ).length,
    active: userRequests.filter((r) => r.status === 'access_active').length,
    expired: userRequests.filter((r) => r.status === 'expired').length,
  };

  const recentRequests = [...userRequests].slice(0, 5);
  const activeAccessReq = userRequests.find((r) => r.status === 'access_active');
  const pendingActionReq = userRequests.find(
    (r) => r.status === 'payment_pending' || r.status === 'more_info_required'
  );

  return (
    <div className="space-y-6">
      {/* Welcome & Identity Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? `${currentUser.name}, স্বাগতম` : `${t.citizen.welcome}, ${currentUser.name}`}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'নাগরিক ভূমি তথ্য সেবা পোর্টাল • জাতীয় পরিচয়পত্র:' : 'Citizen Diligence Portal • National ID:'}{' '}
            <strong>{currentUser.maskedNid}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {currentUser.identityStatus === 'verified_demo' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'পরিচয়:' : 'Identity:'} <strong>{t.nav.verifiedDemo}</strong></span>
            </div>
          ) : (
            <Link
              to="/citizen/verify-identity"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs text-amber-900 font-semibold transition-colors"
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{language === 'bn' ? 'পরিচয় অযাচাইকৃত — এখনই যাচাই করুন' : 'Identity Unverified — Verify Now'}</span>
            </Link>
          )}

          <Link
            to="/citizen/new-request"
            className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <FilePlus className="w-4 h-4" />
            {t.citizen.requestLandInfo}
          </Link>
        </div>
      </div>


      {/* Action Notice if payment or more-info is pending */}
      {pendingActionReq && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {language === 'bn'
                  ? `জরুরি পদক্ষেপ প্রয়োজন: আবেদন ${pendingActionReq.id} (মৌজা ${pendingActionReq.parcelDetails.mouza}, দাগ ${pendingActionReq.parcelDetails.dagNumber})`
                  : `Action Required on Request ${pendingActionReq.id} (Mouza ${pendingActionReq.parcelDetails.mouza}, Dag ${pendingActionReq.parcelDetails.dagNumber})`}
              </p>
              <p className="text-[11px] text-amber-900 mt-0.5">
                {pendingActionReq.status === 'payment_pending'
                  ? (language === 'bn'
                      ? 'কর্মকর্তা আবেদনটি অনুমোদন করেছেন। তথ্য দেখার সময় সক্রিয় করতে সিমুলেটেড ফি পরিশোধ সম্পন্ন করুন।'
                      : 'Request has been approved by the land officer. Complete simulated fee payment to activate signal viewing window.')
                  : (language === 'bn'
                      ? 'রিভিউয়ার সীমানা বা দাগ সংক্রান্ত স্পষ্টীকরণ চেয়েছেন। অনুগ্রহ করে প্রয়োজনীয় তথ্য প্রদান করুন।'
                      : 'Reviewer has requested boundary clarification. Please reply with updated notes.')}
              </p>
            </div>
          </div>
          <Link
            to={`/citizen/requests/${pendingActionReq.id}`}
            className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-md shrink-0 text-center transition-colors text-xs"
          >
            {pendingActionReq.status === 'payment_pending'
              ? (language === 'bn' ? 'পেমেন্টে এগিয়ে যান' : 'Proceed to Payment')
              : (language === 'bn' ? 'তথ্য প্রদান করুন' : 'Provide Clarification')}
          </Link>
        </div>
      )}

      {/* Active Viewing Window Pill */}
      {activeAccessReq && activeAccessReq.accessExpiresAt && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {language === 'bn'
                  ? `সক্রিয় সংকেত প্রবেশাধিকার: ${activeAccessReq.parcelDetails.mouza} (দাগ ${activeAccessReq.parcelDetails.dagNumber})`
                  : `Active Signal Access Window: ${activeAccessReq.parcelDetails.mouza} (Dag ${activeAccessReq.parcelDetails.dagNumber})`}
              </p>
              <p className="text-[11px] text-emerald-900 mt-0.5">
                {language === 'bn' ? 'তথ্য দেখার সময় বাকি:' : 'Permitted disclosure window expires in:'}{' '}
                <strong>{getTimeRemaining(activeAccessReq.accessExpiresAt).text}</strong>
              </p>
            </div>
          </div>
          <Link
            to={`/citizen/parcel-overview/${activeAccessReq.parcelId}?req=${activeAccessReq.id}`}
            className="px-3.5 py-1.5 bg-gov-primary hover:bg-gov-primaryHover text-white font-semibold rounded-md shrink-0 text-center transition-colors text-xs"
          >
            {language === 'bn' ? 'জমির সংকেত দেখুন' : 'View Parcel Signals'}
          </Link>
        </div>
      )}

      {/* 4-Step Civic Workflow Roadmap */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-gov-primary" />
            {language === 'bn' ? '৪-ধাপের নিয়ন্ত্রিত তথ্য প্রাপ্তি পরিক্রমা' : '4-Step Controlled Disclosure Workflow'}
          </span>
          <span className="text-[10px] text-slate-400">
            {language === 'bn' ? 'স্বচ্ছ ও নিরাপদ প্রক্রিয়া' : 'Structured Governance Flow'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {/* Step 1 */}
          <div className="p-3 rounded-md border border-emerald-200 bg-emerald-50/60 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <span className="font-bold text-emerald-900 block">
                {language === 'bn' ? '১. পরিচয় যাচাই' : '1. Verify Identity'}
              </span>
              <p className="text-[11px] text-emerald-800 leading-snug mt-0.5">
                {currentUser.identityStatus === 'verified_demo'
                  ? (language === 'bn' ? 'ডেমো পরিচয়পত্র যাচাইকৃত' : 'Demo NID Verified')
                  : (language === 'bn' ? 'যাচাই সম্পন্ন করুন' : 'Verification Needed')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <Link
            to="/citizen/new-request"
            className="p-3 rounded-md border border-teal-200 bg-teal-50/50 hover:bg-teal-50 transition-colors flex items-start gap-2.5 group"
          >
            <div className="w-6 h-6 rounded-full bg-gov-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              ২
            </div>
            <div>
              <span className="font-bold text-slate-900 group-hover:text-gov-primary transition-colors block">
                {language === 'bn' ? '২. জমির তথ্য আবেদন' : '2. Submit Inquiry'}
              </span>
              <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                {language === 'bn' ? 'দাগ ও ক্রয়ের উদ্দেশ্য ঘোষণা' : 'Declare Dag & Purpose'}
              </p>
            </div>
          </Link>

          {/* Step 3 */}
          <div className="p-3 rounded-md border border-slate-200 bg-slate-50 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ৩
            </div>
            <div>
              <span className="font-bold text-slate-800 block">
                {language === 'bn' ? '৩. কর্মকর্তা রিভিউ' : '3. Officer Review'}
              </span>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                {language === 'bn' ? 'সহকারী কমিশনার (ভূমি) ডেস্ক' : 'AC (Land) Adjudication'}
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-md border border-slate-200 bg-slate-50 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              ৪
            </div>
            <div>
              <span className="font-bold text-slate-800 block">
                {language === 'bn' ? '৪. ফি ও টাইমলাইন' : '4. Fee & Timeline'}
              </span>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                {language === 'bn' ? 'সক্রিয় সংকেত ও বায়া দলিল' : 'Time-locked Signals'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Seeded Scenarios Quick Cards */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {language === 'bn' ? 'মূল্যায়ন দৃশ্যপট — ৪টি পরিস্থিতি পরীক্ষা করুন' : 'Evaluation Scenarios — Test 4 Key Cases'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {language === 'bn'
                ? 'হ্যাকাথন ও মেন্টরদের সুবিধার্থে ৪টি প্রস্তুতকৃত অবস্থা সরাসরি পরীক্ষা করার জন্য সাজানো হয়েছে।'
                : 'Pre-seeded scenario records representing diverse cadastral and mutation circumstances.'}
            </p>
          </div>
          <DemoDataTag type="simulated_source" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Card 1 */}
          <Link
            to="/citizen/requests/REQ-2026-001"
            className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-300 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[10px] font-bold text-slate-700">REQ-2026-001</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                  {language === 'bn' ? 'রিভিউ অপেক্ষমাণ' : 'Under Review'}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? 'তেজগাঁও (দাগ ৪০২)' : 'Tejgaon (Dag 402)'}
              </p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {language === 'bn' ? 'সাম্প্রতিক সাফ-কবলা দলিল • নামজারি মুলতুবি' : 'Recent deed transfer • Mutation pending'}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-gov-primary font-semibold">
              <span>{language === 'bn' ? 'ডসিয়ার দেখুন' : 'Inspect Dossier'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/citizen/requests/REQ-2026-002"
            className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[10px] font-bold text-slate-700">REQ-2026-002</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                  {language === 'bn' ? 'পেমেন্ট বাকি' : 'Pay Fee'}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? 'ধানমন্ডি (দাগ ১১৮)' : 'Dhanmondi (Dag 118)'}
              </p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {language === 'bn' ? 'কর্মকর্তা অনুমোদিত • বিকাশ/নগদ ফি পরিশোধ করুন' : 'Officer approved • Settle simulated fee'}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-gov-primary font-semibold">
              <span>{language === 'bn' ? 'ফি দিয়ে আনলক করুন' : 'Pay & Unlock'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/citizen/requests/REQ-2026-003"
            className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[10px] font-bold text-slate-700">REQ-2026-003</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {language === 'bn' ? 'সক্রিয় টাইমলাইন' : 'Active Signals'}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? 'গুলশান (দাগ ৮৫)' : 'Gulshan (Dag 85)'}
              </p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {language === 'bn' ? 'নামজারি সম্পন্ন • সক্রিয় টাইমলাইন ও দলিল সংকেত' : 'Completed mutation • Live timeline active'}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-gov-primary font-semibold">
              <span>{language === 'bn' ? 'টাইমলাইন দেখুন' : 'View Timeline'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            to="/citizen/requests/REQ-2026-004"
            className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 hover:border-rose-300 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[10px] font-bold text-slate-700">REQ-2026-004</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                  {language === 'bn' ? 'নামঞ্জুর আদেশ' : 'Rejected'}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? 'আমিনবাজার (দাগ ৯৯৯)' : 'Aminbazar (Dag 999)'}
              </p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {language === 'bn' ? 'আইনি সীমানা বিরোধ • অফিসিয়াল কারণ ও পর্যবেক্ষণ' : 'Boundary dispute • Written refusal order'}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-rose-200/60 flex items-center justify-between text-[11px] text-rose-800 font-semibold">
              <span>{language === 'bn' ? 'কারণ পড়ুন' : 'Read Refusal Note'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Compact Request Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-500 text-[11px] block">{t.citizen.totalInquiries}</span>
          <span className="text-xl font-bold text-slate-900 mt-0.5 block">{counts.total}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-amber-700 text-[11px] block">{t.citizen.underReview}</span>
          <span className="text-xl font-bold text-amber-800 mt-0.5 block">{counts.underReview}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-emerald-700 text-[11px] block">{t.citizen.activeDisclosures}</span>
          <span className="text-xl font-bold text-emerald-800 mt-0.5 block">{counts.active}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 text-[11px] block">{t.citizen.expiredSessions}</span>
          <span className="text-xl font-bold text-slate-600 mt-0.5 block">{counts.expired}</span>
        </div>
      </div>

      {/* Recent Requests Section */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t.citizen.recentInquiries}</h3>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'আবেদনের অগ্রগতি ও সংকেতের অবস্থা পর্যবেক্ষণ করুন।' : 'Track adjudication progress and signal status.'}
            </p>
          </div>
          <Link
            to="/citizen/requests"
            className="text-xs font-semibold text-gov-primary hover:underline flex items-center gap-1"
          >
            {t.citizen.viewAll} ({userRequests.length}) <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            {language === 'bn' ? 'এখনো কোনো আবেদন জমা দেওয়া হয়নি।' : 'No parcel inquiries logged yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-2.5 px-4 font-semibold">{language === 'bn' ? 'আবেদন আইডি' : 'Request ID'}</th>
                  <th className="py-2.5 px-4 font-semibold">{language === 'bn' ? 'উদ্দিষ্ট জমি' : 'Target Parcel'}</th>
                  <th className="py-2.5 px-4 font-semibold">{language === 'bn' ? 'দাখিলের তারিখ' : 'Submitted'}</th>
                  <th className="py-2.5 px-4 font-semibold">{language === 'bn' ? 'নিষ্পত্তির লক্ষ্য / এসএলএ' : 'Decision Target / SLA'}</th>
                  <th className="py-2.5 px-4 font-semibold">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                  <th className="py-2.5 px-4 font-semibold text-right">{language === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentRequests.map((req) => {
                  const remaining = getTimeRemaining(req.targetDeadline);
                  return (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {req.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">
                          {language === 'bn' ? `দাগ ${req.parcelDetails.dagNumber}, মৌজা ${req.parcelDetails.mouza}` : `Dag ${req.parcelDetails.dagNumber}, Mouza ${req.parcelDetails.mouza}`}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {req.parcelDetails.upazila}, {req.parcelDetails.district}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {formatDate(req.submittedAt)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[11px] ${
                            remaining.isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-600'
                          }`}
                        >
                          {remaining.text}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <RequestStatusBadge status={req.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/citizen/requests/${req.id}`}
                          className="text-xs font-semibold text-gov-primary hover:underline"
                        >
                          {language === 'bn' ? 'বিস্তারিত →' : 'Details →'}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mandatory Reminder Box */}
      <div className="p-4 rounded-md bg-slate-100 border border-slate-300 text-xs text-slate-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900 block">
            {t.citizen.dueDiligenceNoticeTitle}
          </span>
          <p className="leading-relaxed">
            {t.citizen.dueDiligenceNoticeBody}
          </p>
        </div>
      </div>
    </div>
  );
};
