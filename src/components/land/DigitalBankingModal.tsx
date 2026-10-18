import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  X,
  Lock,
  Loader2,
  Sparkles,
  AlertCircle,
  Building,
} from 'lucide-react';
import { getMonthlyQuota } from '../../utils/quotaService';

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'card';

interface DigitalBankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelSummary: {
    id?: string;
    mouza: string;
    khatianNumber: string;
    dagNumber: string;
    upazila?: string;
    district?: string;
  };
  onPaymentSuccess: (txnId: string) => void;
}

export const DigitalBankingModal: React.FC<DigitalBankingModalProps> = ({
  isOpen,
  onClose,
  parcelSummary,
  onPaymentSuccess,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [mobileNumber, setMobileNumber] = useState('01712-345678');
  const [pin, setPin] = useState('1234');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quota = getMonthlyQuota();

  const handlePay = (isQuick = false) => {
    setError(null);

    // Safeguard monthly 5-application limit
    const currentQuota = getMonthlyQuota();
    if (currentQuota.isExceeded) {
      setError(
        isBn
          ? `মাসিক আবেদন কোটা পূর্ণ (${toBengaliNumerals(currentQuota.limit)}/${toBengaliNumerals(currentQuota.limit)})। প্রতি মাসে সর্বোচ্চ ৫টি আবেদনের সীমা নির্ধারিত।`
          : `Monthly application limit reached (${currentQuota.limit}/${currentQuota.limit}). Maximum 5 verifications allowed per month.`
      );
      return;
    }

    if (!isQuick) {
      if (!mobileNumber.trim()) {
        setError(isBn ? 'অনুগ্রহ করে ডিজিটাল ব্যাংকিং নম্বর প্রদান করুন।' : 'Please provide your mobile wallet number.');
        return;
      }
      if (!pin.trim()) {
        setError(isBn ? 'অনুগ্রহ করে পিন নম্বর প্রদান করুন।' : 'Please enter your PIN.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate realistic digital banking verification & approval gateway
    setTimeout(() => {
      const generatedTxn = `TXN-${method.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxn);
      setIsProcessing(false);
      setIsApproved(true);

      // Auto transition to parcel details after showing success message
      setTimeout(() => {
        onPaymentSuccess(generatedTxn);
      }, 1200);
    }, 600);
  };

  const methods = [
    {
      id: 'bkash' as PaymentMethod,
      name: isBn ? 'বিকাশ' : 'bKash',
      badge: isBn ? 'সবচেয়ে দ্রুত' : 'Popular',
      colorClass: 'border-pink-500 bg-pink-50/70 text-pink-900',
      activeClass: 'ring-2 ring-pink-500 border-pink-500 bg-pink-100/50',
      tagColor: 'bg-pink-600 text-white',
    },
    {
      id: 'nagad' as PaymentMethod,
      name: isBn ? 'নগদ' : 'Nagad',
      badge: isBn ? 'ইনস্ট্যান্ট' : 'Instant',
      colorClass: 'border-orange-500 bg-orange-50/70 text-orange-900',
      activeClass: 'ring-2 ring-orange-500 border-orange-500 bg-orange-100/50',
      tagColor: 'bg-orange-600 text-white',
    },
    {
      id: 'rocket' as PaymentMethod,
      name: isBn ? 'রকেট' : 'Rocket',
      badge: isBn ? 'ডিবিবিএল' : 'DBBL',
      colorClass: 'border-purple-500 bg-purple-50/70 text-purple-900',
      activeClass: 'ring-2 ring-purple-500 border-purple-500 bg-purple-100/50',
      tagColor: 'bg-purple-600 text-white',
    },
    {
      id: 'card' as PaymentMethod,
      name: isBn ? 'কার্ড / ব্যাংক' : 'Card / Bank',
      badge: 'Visa/Master',
      colorClass: 'border-blue-500 bg-blue-50/70 text-blue-900',
      activeClass: 'ring-2 ring-blue-500 border-blue-500 bg-blue-100/50',
      tagColor: 'bg-blue-600 text-white',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={isProcessing ? undefined : onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-scale-up">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gov-primary text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isBn ? 'ডিজিটাল ব্যাংকিং ফি পরিশোধ ও অনুমোদন' : 'Digital Banking Payment & Approval'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'ভূমি তথ্য যাচাই ও রিপোর্ট উন্মোচন' : 'Land Information Verification Fee'}
              </p>
            </div>
          </div>
          {!isProcessing && !isApproved && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Target Parcel Summary Badge */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {isBn ? 'যাচাইকৃত জমি' : 'Target Parcel'}
              </span>
              <p className="font-bold text-slate-800">
                {parcelSummary.mouza || (isBn ? 'মৌজা' : 'Mouza')}{' '}
                • {isBn ? 'দাগ নং:' : 'Dag:'} {toBengaliNumerals(parcelSummary.dagNumber, isBn)}{' '}
                • {isBn ? 'খতিয়ান:' : 'Khatian:'} {toBengaliNumerals(parcelSummary.khatianNumber, isBn)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {isBn ? 'যাচাই ফি' : 'Verification Fee'}
              </span>
              <span className="text-base font-extrabold text-emerald-700">
                {isBn ? '৳ ১৫০০ টাকা' : '1,500 BDT'}
              </span>
            </div>
          </div>

          {/* Monthly Application Balance Info */}
          <div className="flex items-center justify-between text-[11px] px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-slate-700">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-gov-primary" />
              <span>{isBn ? 'মাসিক আবেদন কোটা:' : 'Monthly Quota:'}</span>
              <span className="font-mono text-gov-primary font-bold">
                {isBn ? toBengaliNumerals(quota.used) : quota.used} / {isBn ? toBengaliNumerals(quota.limit) : quota.limit} {isBn ? 'ব্যবহৃত' : 'used'}
              </span>
            </span>
            <span className="text-slate-500 font-medium">
              {isBn
                ? `(এই অনুমোদনের পর ${toBengaliNumerals(Math.max(0, quota.remaining - 1))}টি বাকি)`
                : `(${Math.max(0, quota.remaining - 1)} remaining after)`}
            </span>
          </div>

          {/* Success / Approved State */}
          {isApproved ? (
            <div className="py-6 text-center space-y-4 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-emerald-900">
                  {isBn ? 'পেমেন্ট সফল! তথ্য দেখার অনুমোদন প্রদান করা হয়েছে।' : 'Payment Successful! Approval Granted.'}
                </h4>
                <p className="text-xs text-slate-600">
                  {isBn
                    ? 'জমির বিস্তারিত খতিয়ান, দলিল ও নামজারির প্রতিবেদন প্রস্তুত করা হয়েছে।'
                    : 'Your verified land inspection report is now unlocked.'}
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
                  {txnId}
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onPaymentSuccess(txnId)}
                  className="btn-primary w-full py-2.5 font-bold text-xs"
                >
                  {isBn ? 'জমির বিস্তারিত প্রতিবেদন দেখুন →' : 'View Full Land Report →'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {isBn ? 'ডিজিটাল ব্যাংকিং মাধ্যম নির্বাচন করুন:' : 'Select Digital Banking Gateway:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {methods.map((m) => {
                    const isSelected = method === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          isSelected ? m.activeClass : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${m.tagColor}`}>
                          {m.badge}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input details */}
              <div className="space-y-3">
                {error && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {method === 'card'
                      ? (isBn ? 'কার্ড নম্বর' : 'Card Number')
                      : (isBn ? `${methods.find(m => m.id === method)?.name} মোবাইল নম্বর` : `${method.toUpperCase()} Mobile Number`)}
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    disabled={isProcessing}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {method === 'card'
                      ? (isBn ? 'সিভিভি / পিন' : 'CVV / PIN')
                      : (isBn ? 'গোপন পিন নম্বর' : 'Wallet PIN')}
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    disabled={isProcessing}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary font-mono tracking-widest"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePay(false)}
                  disabled={isProcessing}
                  className="w-full btn-primary py-3 font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isBn ? 'পেমেন্ট ও অনুমোদন যাচাই হচ্ছে...' : 'Processing Payment & Approval...'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isBn ? '১৫০০ টাকা পরিশোধ করে অনুমোদন নিন' : 'Pay 1,500 Tk & Grant Approval'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handlePay(true)}
                  disabled={isProcessing}
                  className="w-full py-2 px-3 rounded-lg border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isBn ? '১-ক্লিকে ফি পরিশোধ (১৫০০ টাকা)' : '1-Click Fee Payment (1,500 Tk)'}</span>
                </button>
              </div>

              {/* Non-intrusive safety reminder */}
              <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{isBn ? 'নিরাপদ ডিজিটাল ব্যাংকিং গেটওয়ে' : 'Secure Digital Banking Gateway'}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
