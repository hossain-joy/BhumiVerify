import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Compass,
  ArrowRight,
  ArrowLeft,
  Search,
  FileCheck2,
  CreditCard,
  Clock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface TourStep {
  titleBn: string;
  titleEn: string;
  tagBn: string;
  tagEn: string;
  descBn: string;
  descEn: string;
  icon: React.ReactNode;
  color: string;
  bgGrad: string;
  keyPointsBn: string[];
  keyPointsEn: string[];
  actionLabelBn: string;
  actionLabelEn: string;
  actionRoute: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    titleBn: 'ধাপ ১: দাগ ও মৌজা অনুযায়ী অনুসন্ধান',
    titleEn: 'Step 1: Cadastral Inquiry by Mouza & Dag',
    tagBn: 'ক্রেতার প্রাথমিক পদক্ষেপ',
    tagEn: 'Buyer Due Diligence',
    descBn:
      'জমি ক্রয়ের বা বায়নার পূর্বে বিভাগ, জেলা, উপজেলা, মৌজা এবং সুনির্দিষ্ট দাগ নম্বর দিয়ে অনুসন্ধানের আবেদন করুন। জাতীয় পরিচয়পত্র (NID) যাচাইকরণের মাধ্যমে নাগরিক আবেদন দাখিল নিশ্চিত হয়।',
    descEn:
      'Before entering into a land sale agreement, request a transaction check using Division, District, Upazila, Mouza, and specific Dag number. NID verification ensures accountable inquiries.',
    icon: <Search className="w-8 h-8 text-teal-400" />,
    color: 'text-teal-600',
    bgGrad: 'from-teal-900 to-slate-900',
    keyPointsBn: [
      'বিভাগ থেকে দাগ পর্যন্ত সঠিক স্তরবিন্যাস',
      'অযাচাইকৃত ব্যবহারকারীর আবেদন প্রতিরোধ (NID Gate)',
      'এক দাগে একাধিক মালিকানা অনুসন্ধানের সুযোগ',
    ],
    keyPointsEn: [
      'Accurate cadastral hierarchy from Division to Dag',
      'Identity verification protects against anonymous fishing (NID Gate)',
      'Ability to examine multi-ownership plots',
    ],
    actionLabelBn: 'নতুন আবেদন ফরম দেখুন',
    actionLabelEn: 'Open New Request Form',
    actionRoute: '/citizen/new-request',
  },
  {
    titleBn: 'ধাপ ২: সরকারি কর্মকর্তার পর্যালোচনা ও অনুমোদন',
    titleEn: 'Step 2: Official Review & Disclosure Adjudication',
    tagBn: 'দায়িত্বশীল নিয়ন্ত্রণ',
    tagEn: 'Controlled Disclosure',
    descBn:
      'ভূমি অফিসের পর্যালোচক কর্মকর্তা নাগরিকের আবেদন ও যৌক্তিকতা খতিয়ে দেখেন। কর্মকর্তা চাইলে পূর্ণ অনুমোদন, সীমিত অনুমোদন বা সীমানা স্পষ্টীকরণের নির্দেশ প্রদান করেন। কর্মকর্তা অনুমোদন ছাড়া কোনো তথ্য উন্মুক্ত হয় না।',
    descEn:
      'Authorized revenue officers inspect the inquiry and citizen standing. The officer can grant full approval, limited scope approval, or request boundary clarification. No records are exposed without official sanction.',
    icon: <FileCheck2 className="w-8 h-8 text-blue-400" />,
    color: 'text-blue-600',
    bgGrad: 'from-blue-950 to-slate-900',
    keyPointsBn: [
      'কর্মকর্তার অনুমোদন ছাড়া স্বয়ংক্রিয় তথ্য উন্মুক্ত নিষিদ্ধ',
      'সীমিত অনুমোদনে কেবল নির্দিষ্ট ক্যাটাগরি দৃশ্যমান হয়',
      'প্রত্যাখ্যানের ক্ষেত্রে লিখিত কারণ আবশ্যক',
    ],
    keyPointsEn: [
      'Automated unconditional data dumps are blocked',
      'Limited approval redacts sensitive financial sections',
      'Mandatory written grounds for rejection or clarification',
    ],
    actionLabelBn: 'পর্যালোচক ড্যাশবোর্ডে যান',
    actionLabelEn: 'View Reviewer Queue',
    actionRoute: '/reviewer',
  },
  {
    titleBn: 'ধাপ ৩: সিমুলেটেড সরকারি ফি ও ডিজিটাল পেমেন্ট',
    titleEn: 'Step 3: Simulated Fee & Escrow Gate',
    tagBn: 'পেমেন্ট গেটওয়ে',
    tagEn: 'Secure Payment Flow',
    descBn:
      'আবেদন অনুমোদিত হওয়ার পর নাগরিক মোবাইল ওয়ালেট (বিকাশ, নগদ, রকেট) বা কার্ডের মাধ্যমে নির্ধারিত সরকারি অনুসন্ধান ফি পরিশোধ করেন। সফল ও ব্যর্থ উভয় ধরনের পেমেন্ট টেস্ট করা সম্ভব।',
    descEn:
      'Upon approval, the citizen completes simulated fee payment via Mobile Wallets (bKash, Nagad, Rocket) or Cards. Both successful and failed payment outcomes can be evaluated.',
    icon: <CreditCard className="w-8 h-8 text-amber-400" />,
    color: 'text-amber-600',
    bgGrad: 'from-amber-950 to-slate-900',
    keyPointsBn: [
      'অনুমোদনের পূর্বে পেমেন্ট গ্রহণ করা হয় না',
      'বিকাশ, নগদ, রকেট ও ভিসা/মাস্টারকার্ড সিমুলেশন',
      'ব্যর্থ পেমেন্টে তথ্য উন্মুক্তকরণ সম্পূর্ণ বন্ধ থাকে',
    ],
    keyPointsEn: [
      'Payment is strictly unlocked only after officer approval',
      'bKash, Nagad, Rocket and Bank Card simulation modes',
      'Failed payment attempts grant zero disclosure',
    ],
    actionLabelBn: 'পেমেন্ট অপেক্ষমাণ সিনারিও দেখুন',
    actionLabelEn: 'Open Payment Pending Scenario',
    actionRoute: '/citizen/requests/REQ-2026-002',
  },
  {
    titleBn: 'ধাপ ৪: নির্দিষ্ট মেয়াদের সংকেত ও অডিট ট্রেইল',
    titleEn: 'Step 4: Time-Locked Signals & Immutable Audit',
    tagBn: 'নিরাপদ তথ্য দর্শন',
    tagEn: 'Ephemeral Access & Audit',
    descBn:
      'ফি পরিশোধের পর প্রাপ্ত টোকেন নির্দিষ্ট সময়ের জন্য (ডিফল্ট ৭২ ঘণ্টা) সক্রিয় থাকে। এরপর স্বয়ংক্রিয়ভাবে অ্যাক্সেস বন্ধ হয়ে যায়। প্রতিটি দর্শন ও অ্যাকশন অডিট ট্রেইলে স্থায়ীভাবে সংরক্ষিত হয়।',
    descEn:
      'Signals are unlocked with a time-limited access token (default 72 hours). After expiry, access automatically terminates. Every disclosure is recorded in the permanent audit trail.',
    icon: <Clock className="w-8 h-8 text-emerald-400" />,
    color: 'text-emerald-600',
    bgGrad: 'from-emerald-950 to-slate-900',
    keyPointsBn: [
      'কাউন্টডাউন টাইমার সহ নির্দিষ্ট মেয়াদের দর্শন উইন্ডো',
      'দলিল ও নামজারির টাইমলাইন ভিত্তিক ঐতিহাসিক সংকেত',
      'প্রতিটি অ্যাকশনের ক্রিপ্টোগ্রাফিক স্ট্যাম্পযুক্ত অডিট লগ',
    ],
    keyPointsEn: [
      'Countdown-monitored time-locked viewing window',
      'Chronological timeline of Sub-Registry deeds and e-Mutations',
      'Every click and token access logged in immutable audit trail',
    ],
    actionLabelBn: 'লাইভ টাইমলাইন সিনারিও দেখুন',
    actionLabelEn: 'View Active Signals Scenario',
    actionRoute: '/citizen/requests/REQ-2026-003',
  },
];

export const FeatureTourModal: React.FC = () => {
  const { isTourOpen, closeTour } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isTourOpen) return null;

  const isBn = language === 'bn';
  const step = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      closeTour();
      showToast({
        type: 'success',
        title: isBn ? 'ট্যুর সম্পন্ন হয়েছে!' : 'Tour Completed!',
        message: isBn ? 'ভূমিভেরিফাই প্ল্যাটফর্ম ব্যবহারের জন্য ধন্যবাদ' : 'Thank you for exploring BhumiVerify',
      });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleAction = () => {
    closeTour();
    navigate(step.actionRoute);
    showToast({
      type: 'info',
      title: isBn ? 'পৃষ্ঠা লোড হচ্ছে...' : 'Loading Page...',
      message: isBn ? step.actionLabelBn : step.actionLabelEn,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-tour-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={closeTour}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden flex flex-col animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with step gradient */}
        <div className={`p-6 sm:p-8 bg-gradient-to-br ${step.bgGrad} text-white relative overflow-hidden transition-all duration-300`}>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-white border border-white/20">
              {currentStepIndex + 1} / {TOUR_STEPS.length}
            </span>
            <button
              onClick={closeTour}
              className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label="Close tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? step.tagBn : step.tagEn}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0 shadow-glow-sm">
                {step.icon}
              </div>
              <div>
                <h2 id="feature-tour-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {isBn ? step.titleBn : step.titleEn}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {isBn ? step.descBn : step.descEn}
          </p>

          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isBn ? 'মূল কার্যপদ্ধতি ও নিরাপত্তা নীতি' : 'Key Principles & Security Rules'}
            </h3>
            <ul className="space-y-2">
              {(isBn ? step.keyPointsBn : step.keyPointsEn).map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick jump action */}
          <button
            onClick={handleAction}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-gov-primary text-xs font-bold transition-all flex items-center justify-between group"
          >
            <span>{isBn ? step.actionLabelBn : step.actionLabelEn}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === currentStepIndex
                    ? 'w-6 bg-gov-primary'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isBn ? 'পূর্ববর্তী' : 'Previous'}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>
                {currentStepIndex === TOUR_STEPS.length - 1
                  ? (isBn ? 'সম্পূর্ণ' : 'Finish')
                  : (isBn ? 'পরবর্তী' : 'Next')}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
