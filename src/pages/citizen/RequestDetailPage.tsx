import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DATA_CATEGORIES } from '../../types';
import { RequestStatusBadge } from '../../components/requests/RequestStatusBadge';
import { Stepper } from '../../components/common/Stepper';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { SimulatedPaymentModal } from '../../components/requests/SimulatedPaymentModal';
import { formatDate, formatDateTime, getTimeRemaining, formatBDT } from '../../lib/utils';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Layers,
  FileCheck2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Send,
  Lock,
} from 'lucide-react';

export const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { requests, submitCitizenUpdate } = useApp();
  const { t, language } = useLanguage();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [clarificationText, setClarificationText] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const request = requests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="bg-white p-8 rounded-lg border border-slate-200 text-center max-w-md mx-auto space-y-3">
        <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
        <h3 className="text-base font-semibold text-slate-900">
          {language === 'bn' ? 'আবেদনটি পাওয়া যায়নি' : 'Request Not Found'}
        </h3>
        <p className="text-xs text-slate-500">
          {language === 'bn'
            ? `আইডি ${id} এর কোনো ভূমি তথ্য আবেদন খুঁজে পাওয়া যায়নি।`
            : `No parcel information request found with ID ${id}.`}
        </p>
        <Link
          to="/citizen/requests"
          className="inline-block px-4 py-2 bg-gov-primary text-white text-xs font-semibold rounded shadow-xs"
        >
          {language === 'bn' ? 'আমার আবেদনসমূহে ফিরে যান' : 'Back to My Requests'}
        </Link>
      </div>
    );
  }

  // Calculate Stepper position
  const getStepperIndex = () => {
    switch (request.status) {
      case 'submitted':
        return 0;
      case 'under_review':
      case 'more_info_required':
        return 1;
      case 'approved':
      case 'limited_approved':
      case 'payment_pending':
        return 2;
      case 'access_active':
        return 3;
      case 'expired':
        return 4;
      case 'rejected':
      default:
        return 2;
    }
  };

  const steps = language === 'bn'
    ? [
        { id: 0, label: 'দাখিলকৃত', sublabel: 'আবেদন লিপিবদ্ধ' },
        { id: 1, label: 'পর্যালোচনাধীন', sublabel: 'কর্মকর্তা যাচাই' },
        { id: 2, label: 'নিষ্পত্তি ও ফি', sublabel: 'অনুমোদন ও পরিশোধ' },
        { id: 3, label: 'প্রবেশাধিকার সক্রিয়', sublabel: 'সংকেত উন্মুক্ত' },
      ]
    : [
        { id: 0, label: 'Submitted', sublabel: 'Logged in queue' },
        { id: 1, label: 'Under Review', sublabel: 'Officer vetting' },
        { id: 2, label: 'Adjudication', sublabel: 'Decision recorded' },
        { id: 3, label: 'Access Active', sublabel: 'Signals unlocked' },
      ];

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationText.trim()) return;

    setUpdating(true);
    setTimeout(() => {
      submitCitizenUpdate(request.id, clarificationText.trim());
      setUpdating(false);
      setUpdateSuccess(true);
      setClarificationText('');
    }, 400);
  };


  const targetSla = getTimeRemaining(request.targetDeadline);
  const accessExpiry = request.accessExpiresAt ? getTimeRemaining(request.accessExpiresAt) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/citizen/requests"
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 font-mono">
                {request.id}
              </h1>
              <RequestStatusBadge status={request.status} />
              <DemoDataTag type="demo_data" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn'
                ? `দাখিলের সময়: ${formatDateTime(request.submittedAt)} • আবেদনকারী: ${request.userName}`
                : `Submitted on ${formatDateTime(request.submittedAt)} by ${request.userName}`}
            </p>
          </div>
        </div>

        {/* Quick CTA depending on status */}
        {request.status === 'payment_pending' && (
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 shrink-0 animate-pulse"
          >
            <CreditCard className="w-4 h-4" />
            {language === 'bn' ? 'ডেমো ফি পরিশোধ করুন' : 'Proceed to Demo Payment'}
          </button>
        )}

        {request.status === 'access_active' && request.parcelId && (
          <Link
            to={`/citizen/parcel-overview/${request.parcelId}?req=${request.id}`}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <FileCheck2 className="w-4 h-4" />
            {language === 'bn' ? 'অনুমোদিত সংকেতসমূহ দেখুন' : 'Open Approved Signals Overview'}
          </Link>
        )}
      </div>

      {/* Workflow Stepper */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
        <Stepper steps={steps} currentStepIndex={getStepperIndex()} />
      </div>

      {/* Reviewer Decision Card (if adjudicated) */}
      {request.reviewerDecision && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gov-primary" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'অফিসিয়াল রিভিউয়ার নিষ্পত্তির বিবরণ' : 'Official Reviewer Adjudication Dossier'}
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              {language === 'bn' ? 'সিদ্ধান্তের তারিখ:' : 'Decided at:'} {formatDateTime(request.reviewerDecision.decidedAt)}
            </span>
          </div>

          <div className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">
                  {language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্মকর্তা' : 'Adjudicating Officer'}
                </span>
                <span className="font-semibold text-slate-800">
                  {request.reviewerDecision.reviewerName} ({request.reviewerDecision.reviewerId})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  {language === 'bn' ? 'সিদ্ধান্তের শ্রেণিবিভাগ' : 'Decision Classification'}
                </span>
                <span className="font-semibold text-slate-800 uppercase">
                  {t.status[request.status] || request.reviewerDecision.decision.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-1">
                {language === 'bn' ? 'কর্মকর্তার মন্তব্য / আইনগত কারণ:' : 'Official Finding / Reason:'}
              </span>
              <p className="text-slate-800 leading-relaxed font-mono text-[11px]">
                {request.reviewerDecision.note}
              </p>
            </div>

            {request.reviewerDecision.approvedCategories &&
              request.reviewerDecision.approvedCategories.length > 0 && (
                <div>
                  <span className="text-slate-600 font-semibold block mb-2">
                    {language === 'bn'
                      ? `অনুমোদিত সংকেত ক্যাটাগরি (${request.reviewerDecision.approvedCategories.length}টি):`
                      : `Permitted Signal Categories (${request.reviewerDecision.approvedCategories.length}):`}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {request.reviewerDecision.approvedCategories.map((catId) => {
                      const match = DATA_CATEGORIES.find((c) => c.id === catId);
                      return (
                        <span
                          key={catId}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-xs font-medium"
                        >
                          ✓ {language === 'bn' ? match?.bengali || catId : match?.label || catId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

            {request.reviewerDecision.conditions && (
              <div className="text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">
                  {language === 'bn' ? 'প্রবেশাধিকারের শর্তাবলী: ' : 'Conditions of Disclosure: '}
                </span>
                {request.reviewerDecision.conditions}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Citizen Response Section (if more_info_required) */}
      {request.status === 'more_info_required' && (
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-orange-700" />
            {language === 'bn' ? 'কর্মকর্তা কর্তৃক অতিরিক্ত তথ্য তলব' : 'Officer Requested Additional Clarification'}
          </div>
          <p className="text-xs text-orange-950 leading-relaxed">
            {language === 'bn'
              ? 'পর্যালোচনা পুনরায় শুরু করার জন্য নিচে প্রয়োজনীয় স্পষ্টীকরণ লিপিবদ্ধ করুন:'
              : "Please reply to the reviewer's inquiry below to resume administrative vetting:"}
          </p>

          <form onSubmit={handleSendClarification} className="space-y-3">
            <textarea
              required
              rows={3}
              value={clarificationText}
              onChange={(e) => setClarificationText(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'উদা: দলিলটি তেজগাঁও সাব-রেজিস্ট্রি অফিসে সাফ-কবলা ৪-এ ভলিউমে রেজিস্ট্রি হয়েছিল...'
                  : 'e.g. The deed was registered at Tejgaon Sub-Registry under Saf-Kabala volume 4-A...'
              }
              className="w-full text-xs p-2.5 bg-white border border-orange-300 rounded focus:ring-1 focus:ring-gov-primary text-slate-800"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 bg-orange-700 hover:bg-orange-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                {updating
                  ? (language === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...')
                  : (language === 'bn' ? 'কর্মকর্তার কাছে স্পষ্টীকরণ জমা দিন' : 'Submit Clarification to Officer')}
              </button>
            </div>
          </form>

          {updateSuccess && (
            <p className="text-xs font-semibold text-emerald-700">
              {language === 'bn'
                ? 'স্পষ্টীকরণ জমা দেওয়া হয়েছে! আবেদনটি পুনরায় কর্মকর্তার পর্যালোচনার জন্য পাঠানো হয়েছে।'
                : 'Clarification submitted! Request is now back under officer review.'}
            </p>
          )}
        </div>
      )}

      {/* Payment Receipt Card (if paid) */}
      {request.payment && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-gov-primary" />
              {language === 'bn' ? 'সিমুলেটেড ফি পরিশোধ রশিদ' : 'Simulated Fee Payment Voucher'}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {language === 'bn' ? 'পরিশোধিত (ডেমো রশিদ)' : 'PAID (DEMO RECEIPT)'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'পরিশোধিত ফি' : 'Fee Paid'}</span>
              <span className="font-semibold text-slate-900">{formatBDT(request.payment.amountBdt)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'রশিদ রেফারেন্স' : 'Receipt Reference'}</span>
              <span className="font-mono font-medium text-slate-800">{request.payment.receiptRef}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'ডেমো লেনদেন আইডি' : 'Demo Transaction ID'}</span>
              <span className="font-mono text-slate-700">{request.payment.transactionId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment Method'}</span>
              <span className="text-slate-800">{request.payment.method}</span>
            </div>
          </div>
        </div>
      )}

      {/* Parcel Demarcation & Inputs Dossier */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          {language === 'bn' ? 'উদ্দিষ্ট জমির পরিচিতি ও বিবরণ' : 'Target Parcel Attributes'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'বিভাগ ও জেলা' : 'Division & District'}</span>
            <span className="font-semibold text-slate-800">
              {request.parcelDetails.division}, {request.parcelDetails.district}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'উপজেলা / সার্কেল' : 'Upazila / Thana'}</span>
            <span className="font-semibold text-slate-800">{request.parcelDetails.upazila}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'মৌজা ও জে.এল.' : 'Mouza & J.L.'}</span>
            <span className="font-semibold text-slate-800">
              {request.parcelDetails.mouza} {request.parcelDetails.jlNumber ? `(J.L. ${request.parcelDetails.jlNumber})` : ''}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'দাগ / প্লট নম্বর' : 'Dag / Plot Number'}</span>
            <span className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? `দাগ ${request.parcelDetails.dagNumber}` : `Plot ${request.parcelDetails.dagNumber}`}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'খতিয়ান নম্বর' : 'Khatian Number'}</span>
            <span className="font-semibold text-slate-800">
              {request.parcelDetails.khatianNumber || 'Not specified'} ({request.parcelDetails.khatianType || 'RS'})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'জমির পরিমাণ' : 'Declared Area'}</span>
            <span className="font-semibold text-slate-800">
              {request.parcelDetails.area ? `${request.parcelDetails.area} ${request.parcelDetails.areaUnit || 'Decimal'}` : 'N/A'}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'রেকর্ড মিলের নিশ্চয়তা' : 'Match Confidence'}</span>
            <span className="font-semibold text-slate-800 uppercase">
              {request.matchConfidence}
            </span>
          </div>
        </div>

        {request.parcelDetails.boundaryNotes && (
          <div className="pt-2 text-xs">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'চৌহদ্দি ও সীমানা বিবরণ:' : 'Boundary Demarcation Notes:'}
            </span>
            <p className="font-mono text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100 mt-0.5">
              {request.parcelDetails.boundaryNotes}
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'আবেদনের উদ্দেশ্য ও কারণ:' : 'Declared Purpose:'}
          </span>
          <p className="font-semibold text-slate-800">{request.purpose}</p>
          <p className="text-slate-600 leading-relaxed mt-1">{request.explanation}</p>
        </div>
      </div>

      {/* Requested vs Approved Categories Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          {language === 'bn' ? 'প্রার্থিত ও অনুমোদিত তথ্যের নিরীক্ষা' : 'Signal Categories Audit'}
        </h3>

        <div className="space-y-2 text-xs">
          {DATA_CATEGORIES.map((cat) => {
            const isRequested = request.requestedCategories.includes(cat.id);
            const isApproved = request.approvedCategories?.includes(cat.id);

            return (
              <div
                key={cat.id}
                className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200"
              >
                <div>
                  <span className="font-semibold text-slate-800">
                    {language === 'bn' ? cat.bengali : cat.label}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cat.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isRequested && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[11px]">
                      {language === 'bn' ? 'প্রার্থিত' : 'Requested'}
                    </span>
                  )}
                  {request.status === 'access_active' || request.status === 'payment_pending' ? (
                    isApproved ? (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-[11px] font-semibold">
                        {language === 'bn' ? 'অনুমোদিত' : 'Approved'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[11px]">
                        {language === 'bn' ? 'বর্জিত' : 'Redacted'}
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Payment Modal */}
      <SimulatedPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        request={request}
      />
    </div>
  );
};

