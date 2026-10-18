import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useUI } from '../../context/UIContext';
import { DecisionModal } from '../../components/reviewer/DecisionModal';
import { RequestStatusBadge } from '../../components/requests/RequestStatusBadge';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDate, formatDateTime, getTimeRemaining } from '../../lib/utils';
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Database,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { requests, parcels } = useApp();
  const { language } = useLanguage();
  const { openCadastralMap, openCertificate } = useUI();
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);

  const req = requests.find((r) => r.id === id);
  const matchedParcel = req?.parcelId ? parcels.find((p) => p.id === req.parcelId) : undefined;

  if (!req) {
    return (
      <div className="bg-white p-8 rounded-lg border border-slate-200 text-center max-w-md mx-auto space-y-3">
        <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
        <h3 className="text-base font-semibold text-slate-900">
          {language === 'bn' ? 'ডসিয়ার পাওয়া যায়নি' : 'Dossier Not Found'}
        </h3>
        <p className="text-xs text-slate-500">
          {language === 'bn'
            ? `আবেদন আইডি ${id} তালিকায় নেই।`
            : `Request ID ${id} does not exist in queue.`}
        </p>
        <Link
          to="/reviewer"
          className="inline-block px-4 py-2 bg-gov-primary text-white text-xs font-semibold rounded"
        >
          {language === 'bn' ? 'রিভিউ ড্যাশবোর্ডে ফিরুন' : 'Back to Review Dashboard'}
        </Link>
      </div>
    );
  }

  const sla = getTimeRemaining(req.targetDeadline);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/reviewer"
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title={language === 'bn' ? 'তালিকায় ফিরুন' : 'Back to queue'}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 font-mono">
                {req.id}
              </h1>
              <RequestStatusBadge status={req.status} />
              <DemoDataTag type="demo_data" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn' ? 'কর্মকর্তা ডসিয়ার • এসএলএ লক্ষ্য:' : 'Reviewer Dossier • SLA Target:'}{' '}
              <strong className="text-slate-700">{sla.text}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openCadastralMap(req.parcelDetails.dagNumber)}
            className="px-3 py-2 bg-teal-50 hover:bg-teal-100 text-gov-primary border border-teal-200 rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            title={language === 'bn' ? 'মৌজা নকশায় দাগ ও সীমানা পরীক্ষা করুন' : 'Inspect cadastral plot on sheet'}
          >
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'bn' ? 'নকশায় দাগ পরীক্ষা' : 'Survey Map'}</span>
          </button>

          {(req.status === 'approved' || req.status === 'limited_approved' || req.status === 'access_active') && (
            <button
              type="button"
              onClick={() => openCertificate(req)}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
              title={language === 'bn' ? 'অফিসিয়াল প্রত্যয়নপত্র ও বারকোড প্রিভিউ' : 'Official certified deed record & barcode'}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'bn' ? 'সার্টিফিকেট প্রিভিউ' : 'Certificate'}</span>
            </button>
          )}

          {(req.status === 'submitted' || req.status === 'under_review') && (
            <button
              onClick={() => setDecisionModalOpen(true)}
              className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4" />
              {language === 'bn' ? 'আবেদন নিষ্পত্তি করুন' : 'Adjudicate Request'}
            </button>
          )}
        </div>
      </div>

      {/* Citizen Identity & Purpose Dossier */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gov-primary" />
          {language === 'bn'
            ? 'আবেদনকারীর পরিচয় ও উদ্দেশ্য বিবরণী'
            : 'Applicant Standing & Identity State'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'আবেদনকারীর নাম' : 'Applicant Name'}
            </span>
            <span className="font-semibold text-slate-800">{req.userName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'মাস্কড এনআইডি টোকেন' : 'Masked Identity Token'}
            </span>
            <span className="font-mono font-medium text-slate-800">{req.userMaskedNid}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'দাখিলের তারিখ ও সময়' : 'Submission Timestamp'}
            </span>
            <span className="text-slate-700">{formatDateTime(req.submittedAt)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'পরিচয় গেট স্ট্যাটাস' : 'Identity Gate Status'}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
              {language === 'bn' ? 'যাচাইকৃত (ডেমো)' : 'Verified (demo)'}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'ঘোষিত ক্রয়ের উদ্দেশ্য:' : 'Declared Inquiry Purpose:'}
          </span>
          <p className="font-semibold text-slate-800">{req.purpose}</p>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100 font-mono text-[11px] mt-1">
            "{req.explanation}"
          </p>
        </div>

        {req.citizenUpdateNote && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded text-xs text-teal-950">
            <span className="font-bold block">
              {language === 'bn' ? 'আবেদনকারীর অতিরিক্ত ব্যাখ্যা নোট:' : 'Applicant Clarification Note:'}
            </span>
            <p className="mt-0.5 leading-relaxed font-mono text-[11px]">
              "{req.citizenUpdateNote}"
            </p>
          </div>
        )}
      </div>

      {/* Cadastral & Match Evaluation */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gov-primary" />
            {language === 'bn' ? 'মৌজা ও খতিয়ান মিল মূল্যায়ন' : 'Cadastral Record Correlation'}
          </h3>
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
              req.matchConfidence === 'exact'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : req.matchConfidence === 'ambiguous'
                ? 'bg-rose-50 text-rose-800 border border-rose-300'
                : 'bg-amber-50 text-amber-800 border border-amber-300'
            }`}
          >
            {req.matchConfidence}{' '}
            {language === 'bn' ? 'ম্যাচ কনফিডেন্স' : 'Match Confidence'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'বিভাগ ও জেলা' : 'Division & District'}
            </span>
            <span className="font-semibold text-slate-800">
              {req.parcelDetails.division}, {req.parcelDetails.district}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'উপজেলা / সার্কেল' : 'Upazila / Circle'}
            </span>
            <span className="font-semibold text-slate-800">{req.parcelDetails.upazila}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'মৌজা ও জে.এল.' : 'Mouza & J.L.'}
            </span>
            <span className="font-semibold text-slate-800">
              {req.parcelDetails.mouza} (J.L. {req.parcelDetails.jlNumber || 'N/A'})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'দাগ / প্লট নম্বর' : 'Dag / Plot Number'}
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'দাগ ' : 'Plot '}
              {req.parcelDetails.dagNumber}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'খতিয়ান নম্বর' : 'Khatian Number'}
            </span>
            <span className="font-semibold text-slate-800">
              {req.parcelDetails.khatianNumber || (language === 'bn' ? 'অনুল্লিখিত' : 'Unspecified')} (
              {req.parcelDetails.khatianType || 'RS'})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'জমির পরিমাণ' : 'Declared Area'}
            </span>
            <span className="font-semibold text-slate-800">
              {req.parcelDetails.area
                ? `${req.parcelDetails.area} ${req.parcelDetails.areaUnit || (language === 'bn' ? 'শতাংশ' : 'Decimal')}`
                : (language === 'bn' ? 'অনুল্লিখিত' : 'Unspecified')}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'সংযুক্ত ডেমো লেজার' : 'Linked Demo Ledger'}
            </span>
            <span className="font-mono text-slate-800 font-medium">
              {req.parcelId || (language === 'bn' ? 'সরাসরি কোনো মিল নেই' : 'No direct demo ledger match')}
            </span>
          </div>
        </div>

        {req.parcelDetails.boundaryNotes && (
          <div className="pt-2 text-xs">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn'
                ? 'আবেদনকারীর সীমানা বর্ণনা (চৌহদ্দি):'
                : 'Applicant Boundary Demarcation Notes:'}
            </span>
            <p className="font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 mt-0.5">
              {req.parcelDetails.boundaryNotes}
            </p>
          </div>
        )}
      </div>

      {/* Relevant Mock Registry Feed Signals (Pre-Screening) */}
      {matchedParcel && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-gov-primary" />
              {language === 'bn'
                ? 'প্রাথমিক স্ক্রিনিং সিগন্যাল ফিড (কর্মকর্তা প্রিভিউ)'
                : 'Pre-Screening Signal Feeds (Officer Preview)'}
            </h3>
            <DemoDataTag type="simulated_source" />
          </div>

          <div className="space-y-2 text-xs">
            {matchedParcel.events.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{evt.eventTitle}</span>
                  <span className="text-[11px] text-slate-500">{formatDate(evt.eventDate)}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-snug">{evt.summary}</p>
                <div className="text-[10px] text-slate-400 flex items-center gap-3 pt-1">
                  <span>
                    {language === 'bn' ? 'ফিড: ' : 'Feed: '}
                    {evt.sourceLabel}
                  </span>
                  <span>
                    {language === 'bn' ? 'রেফারেন্স: ' : 'Ref: '}
                    {evt.maskedReference}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision Summary Card (if already made) */}
      {req.reviewerDecision && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">
              {language === 'bn' ? 'নথিভুক্ত নিষ্পত্তির তথ্য' : 'Recorded Adjudication Finding'}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              {formatDateTime(req.reviewerDecision.decidedAt)}
            </span>
          </div>
          <p className="text-slate-800 font-mono bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
            {req.reviewerDecision.note}
          </p>
        </div>
      )}

      {/* Adjudication Modal */}
      <DecisionModal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        request={req}
      />
    </div>
  );
};
