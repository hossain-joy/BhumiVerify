import React, { useState } from 'react';
import { AccessRequest } from '../../types';
import { Modal } from '../common/Modal';
import { formatBDT } from '../../lib/utils';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { triggerConfetti } from '../../lib/confetti';
import {
  CreditCard,
  Building,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface SimulatedPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: AccessRequest;
  onPaymentComplete?: () => void;
}

export const SimulatedPaymentModal: React.FC<SimulatedPaymentModalProps> = ({
  isOpen,
  onClose,
  request,
  onPaymentComplete,
}) => {
  const { settings, simulatePayment } = useApp();
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'card' | 'bank'>('bkash');
  const [mockWalletNumber, setMockWalletNumber] = useState('01711-000000');
  const [mockPin, setMockPin] = useState('••••');
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; receipt?: any } | null>(
    null
  );

  const feeAmount = settings.feeAmountBdt;

  const handleSimulate = (fail = false) => {
    setProcessing(true);
    setFeedback(null);

    const methodName =
      selectedMethod === 'bkash'
        ? (language === 'bn' ? 'ডেমো মোবাইল ওয়ালেট (বিকাশ ডেমো)' : 'Demo Mobile Wallet (bKash Demo)')
        : selectedMethod === 'nagad'
        ? (language === 'bn' ? 'ডেমো মোবাইল ওয়ালেট (নগদ ডেমো)' : 'Demo Mobile Wallet (Nagad Demo)')
        : selectedMethod === 'card'
        ? (language === 'bn' ? 'ডেমো কার্ড (ভিসা / মাস্টারকার্ড ডেমো)' : 'Demo Card (Visa/Mastercard Demo)')
        : (language === 'bn' ? 'ডেমো ইন্টারনেট ব্যাংকিং (সোনালী ব্যাংক গেটওয়ে)' : 'Demo Internet Banking (Sonali Bank Gateway)');

    setTimeout(() => {
      const result = simulatePayment(request.id, methodName, fail);
      setProcessing(false);

      if (result.success) {
        triggerConfetti();
        showToast({
          type: 'success',
          title: language === 'bn' ? 'পেমেন্ট সফল হয়েছে!' : 'Payment Confirmed!',
          message:
            language === 'bn'
              ? `${formatBDT(feeAmount)} টাকা পরিশোধ সম্পন্ন। সংকেতসমূহ উন্মুক্ত হয়েছে।`
              : `Payment of ${formatBDT(feeAmount)} confirmed. Signals unlocked.`,
        });
        setFeedback({
          type: 'success',
          message:
            language === 'bn'
              ? `${formatBDT(feeAmount)} টাকা সফলভাবে পরিশোধ হয়েছে! নিয়ন্ত্রিত তথ্য প্রবেশাধিকার সক্রিয় করা হলো।`
              : `Simulated payment of ${formatBDT(feeAmount)} confirmed! Controlled access is now active.`,
          receipt: result.payment,
        });
        setTimeout(() => {
          onClose();
          if (onPaymentComplete) onPaymentComplete();
        }, 1400);
      } else {
        showToast({
          type: 'error',
          title: language === 'bn' ? 'পেমেন্ট ব্যর্থ হয়েছে' : 'Payment Failed',
          message:
            result.error ||
            (language === 'bn'
              ? 'সিমুলেটেড পেমেন্ট প্রত্যাখ্যাত হয়েছে।'
              : 'Simulated payment declined.'),
        });
        setFeedback({
          type: 'error',
          message:
            result.error ||
            (language === 'bn'
              ? 'সিমুলেটেড পেমেন্ট ব্যর্থ হয়েছে (অপর্যাপ্ত ব্যালেন্স / সংযোগ ত্রুটি)। কোনো অ্যাক্সেস দেওয়া হয়নি।'
              : 'Simulated payment failed (card declined / insufficient wallet funds). No access granted.'),
        });
      }
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.payment.modalTitle}
      subtitle={
        language === 'bn'
          ? `আবেদন নং ${request.id} এর জন্য সংবিধি নির্ধারিত তথ্য প্রকাশ ফি`
          : `Statutory pre-registration disclosure fee for ${request.id}`
      }
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Safe Sandbox Warning */}
        <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-950">{t.payment.safeNoticeTitle}</p>
            <p className="mt-0.5 leading-relaxed text-amber-900 font-normal">
              {t.payment.safeNoticeBody}{' '}
              <strong className="font-semibold">
                {language === 'bn'
                  ? 'কখনোই আসল ব্যাংক কার্ড বা গোপন পিন ব্যবহার করবেন না।'
                  : 'Never enter real card numbers, passwords, PINs, or banking credentials.'}
              </strong>
            </p>
          </div>
        </div>

        {/* Amount & Approved Scope Summary */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              {t.payment.accessFee}
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {formatBDT(feeAmount)}{' '}
              <span className="text-xs font-normal text-slate-500">{language === 'bn' ? 'টাকা' : 'BDT'}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {language === 'bn'
                ? `অনুমোদনের পর কার্যকাল: ${request.reviewerDecision?.accessDurationHours || settings.accessDurationHours} ঘণ্টা`
                : `Validity duration: ${request.reviewerDecision?.accessDurationHours || settings.accessDurationHours} hours upon confirmation`}
            </p>
          </div>

          <div className="text-left sm:text-right bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {language === 'bn' ? 'যাচাইকৃত ও অনুমোদিত পরিসর' : 'Vetted & Approved Scope'}
            </span>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {language === 'bn'
                ? `${(request.approvedCategories || []).length} টি ক্যাটাগরি অনুমোদিত`
                : `${(request.approvedCategories || []).length} Categories Permitted`}
            </p>
            <p className="text-[10px] text-slate-400">
              {language === 'bn'
                ? `কর্মকর্তা: ${request.reviewerDecision?.reviewerName || 'ভূমি কর্মকর্তা'}`
                : `Officer: ${request.reviewerDecision?.reviewerName || 'Land Officer'}`}
            </p>
          </div>
        </div>

        {/* Method Selection with authentic Bangladeshi MFS styling */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {t.payment.selectChannel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedMethod('bkash')}
              className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedMethod === 'bkash'
                  ? 'border-[#e2136e] bg-pink-50/50 ring-2 ring-[#e2136e]/30 text-slate-900 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#e2136e] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                bK
              </div>
              <div>
                <span className="block text-xs">বিকাশ (bKash)</span>
                <span className="text-[9px] text-slate-400">{language === 'bn' ? 'মোবাইল ওয়ালেট' : 'Mobile Wallet'}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('nagad')}
              className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedMethod === 'nagad'
                  ? 'border-[#f7941d] bg-amber-50/50 ring-2 ring-[#f7941d]/30 text-slate-900 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#f7941d] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                নগদ
              </div>
              <div>
                <span className="block text-xs">নগদ (Nagad)</span>
                <span className="text-[9px] text-slate-400">{language === 'bn' ? 'ডাক বিভাগ ওয়ালেট' : 'Post Office MFS'}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedMethod === 'card'
                  ? 'border-gov-primary bg-teal-50/50 ring-2 ring-gov-primary/30 text-slate-900 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-xs">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs">{language === 'bn' ? 'ডেবিট / ক্রেডিট' : 'Debit/Credit'}</span>
                <span className="text-[9px] text-slate-400">Visa / MC Demo</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('bank')}
              className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedMethod === 'bank'
                  ? 'border-gov-primary bg-teal-50/50 ring-2 ring-gov-primary/30 text-slate-900 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gov-primary text-white flex items-center justify-center shadow-xs">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs">সোনালী ব্যাংক</span>
                <span className="text-[9px] text-slate-400">{language === 'bn' ? 'সরকারি গেটওয়ে' : 'Govt Gateway'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Simulated Account Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700">
            <span className="font-semibold">
              {language === 'bn' ? 'নমুনা একাউন্ট / ওয়ালেট নম্বর:' : 'Simulated Account Number:'}
            </span>
            <input
              type="text"
              value={mockWalletNumber}
              onChange={(e) => setMockWalletNumber(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-mono text-xs w-full sm:w-48 text-left sm:text-right"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700">
            <span className="font-semibold">
              {language === 'bn' ? 'নমুনা পিন / ওটিপি (ডেমো টেস্ট):' : 'Simulated OTP / PIN (Mock Only):'}
            </span>
            <input
              type="password"
              value={mockPin}
              onChange={(e) => setMockPin(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-mono text-xs w-full sm:w-48 text-left sm:text-right"
            />
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>
              {language === 'bn' ? 'মার্চেন্ট:' : 'Merchant:'}{' '}
              <strong className="text-slate-700">LANDTECH-BD-SIMULATED-GATEWAY</strong>
            </span>
            <span>
              {language === 'bn' ? 'ফি কোড:' : 'Fee Code:'}{' '}
              <strong className="text-slate-700">CIVIC-FEE-8910</strong>
            </span>
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`p-3.5 rounded-lg text-xs flex items-center gap-2.5 border ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Simulation Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            disabled={processing}
            onClick={() => handleSimulate(true)}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors cursor-pointer"
            title="Simulate insufficient balance or network decline"
          >
            {t.payment.simulateFail}
          </button>

          <button
            type="button"
            disabled={processing}
            onClick={() => handleSimulate(false)}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-gov-primary hover:bg-gov-primaryHover rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            {processing ? t.payment.processing : t.payment.simulateSuccess}
          </button>
        </div>
      </div>
    </Modal>
  );
};
