import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Copy,
  Printer,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  titleBn: string;
  titleEn: string;
  importance: 'critical' | 'high' | 'recommended';
  explanationBn: string;
  explanationEn: string;
  lawRef: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'deed_chain',
    titleBn: '১. মূল দলিল ও বায়া দলিলের ধারাবাহিকতা (Chain Deeds)',
    titleEn: '1. Original Deed & 25-Year Chain of Deeds',
    importance: 'critical',
    explanationBn:
      'বর্তমান বিক্রেতার মূল দলিলের পাশাপাশি বিগত অন্তত ২৫ বছরের হস্তান্তরের বায়া দলিলসমূহের ধারাবাহিকতা খতিয়ে দেখুন।',
    explanationEn:
      'Verify original title deeds and 25-year chain of title transfers without any gap or unverified succession.',
    lawRef: 'Registration Act 1908, Sec 17A',
  },
  {
    id: 'khatian_continuity',
    titleBn: '২. সিএস, এসএ, আরএস ও বিএস/সিটি খতিয়ানের মিল',
    titleEn: '2. Survey Records Consistency (CS, SA, RS, BS)',
    importance: 'critical',
    explanationBn:
      'সিএস (CS) থেকে শুরু করে এসএ (SA), আরএস (RS) ও হাল বিএস (BS) বা সিটি জরিপ পর্যন্ত খতিয়ানের মালিকানার ধারাবাহিকতা সঠিক আছে কি না।',
    explanationEn:
      'Check consistency across Cadastral Survey (CS), State Acquisition (SA), Revisional Survey (RS), and City/BS surveys.',
    lawRef: 'State Acquisition and Tenancy Act 1950',
  },
  {
    id: 'mutation_dcr',
    titleBn: '৩. হাল নামজারি খতিয়ান, ডিসিআর ও দাখিলা রশিদ',
    titleEn: '3. Approved e-Mutation Khatian, DCR & Land Tax Receipts',
    importance: 'critical',
    explanationBn:
      'বিক্রেতার নামে সহকারী কমিশনার (ভূমি) কর্তৃক অনুমোদিত ই-নামজারি খতিয়ান, ডিসিআর (DCR) এবং চলতি বাংলা সনের দাখিলা হালনাগাদ থাকতে হবে।',
    explanationEn:
      'Valid e-Mutation Khatian in seller’s name, Duplicate Carbon Receipt (DCR), and up-to-date land development tax receipts.',
    lawRef: 'Land Reform Ordinance & SAT Act Sec 143',
  },
  {
    id: 'sub_registry_search',
    titleBn: '৪. সাব-রেজিস্ট্রি অফিসে দায়-মুক্তির তল্লাশি (Non-Encumbrance)',
    titleEn: '4. Sub-Registry Search for Prior Encumbrances',
    importance: 'high',
    explanationBn:
      'সাব-রেজিস্ট্রি অফিসে বিগত ১২ বছরের ইনডেক্স তল্লাশি করে নিশ্চিত হোন জমিটি ইতোপূর্বে অন্য কারো কাছে বিক্রি বা বন্ধক দেওয়া হয়নি।',
    explanationEn:
      'Conduct a 12-year official search of Volume Books at the Sub-Registry to ensure no prior registered mortgages or transfers exist.',
    lawRef: 'Registration Rules',
  },
  {
    id: 'physical_possession',
    titleBn: '৫. সরেজমিন দখল ও সীমানা পরিমাপ (Physical Possession)',
    titleEn: '5. Physical Possession & Cadastral Boundary Survey',
    importance: 'critical',
    explanationBn:
      'কাগজপত্রের পরিমাণের সাথে জমিনে সীমানা ও দখল সঠিক আছে কি না তা একজন অভিজ্ঞ সার্ভেয়ার দিয়ে মেপে নিশ্চিত হোন।',
    explanationEn:
      'Inspect physical possession, demarcated pillars, and verify actual land area with a licensed cadastral surveyor.',
    lawRef: 'Survey and Settlement Manual',
  },
  {
    id: 'heirship_certificate',
    titleBn: '৬. ওয়ারিশান সনদ ও ফারায়েজ বণ্টন (Heirship & Succession)',
    titleEn: '6. Heirship Certificate & Islamic / Customary Faraiz',
    importance: 'high',
    explanationBn:
      'জমিটি উত্তরাধিকার সূত্রে প্রাপ্ত হলে স্থানীয় কাউন্সিলর/চেয়ারম্যানের ওয়ারিশান সনদ এবং ফারায়েজ অনুযায়ী অংশ বণ্টন সঠিক কি না দেখুন।',
    explanationEn:
      'If property is inherited, verify official Ward Counselor / Union Chairman Heirship Certificate and legal share distributions.',
    lawRef: 'Succession Act & Muslim Personal Law',
  },
  {
    id: 'court_case_clearance',
    titleBn: '৭. দেওয়ানি মামলা ও নিষেধাজ্ঞামুক্ত (No Civil Litigation)',
    titleEn: '7. Civil Court Injunction & Litigation Search',
    importance: 'high',
    explanationBn:
      'জমির স্বত্ব বা বাটোয়ারা নিয়ে সংশ্লিষ্ট দেওয়ানি আদালতে কোনো টাইটেল স্যুট বা নিষেধাজ্ঞা (Injunction) চলমান আছে কি না খতিয়ে দেখুন।',
    explanationEn:
      'Ensure the plot is free from partition suits, title disputes, court attachments, or status quo orders in civil courts.',
    lawRef: 'Code of Civil Procedure, Order 39',
  },
  {
    id: 'vested_khas_check',
    titleBn: '৮. অর্পিত, পরিত্যক্ত বা খাস সম্পত্তি নয় মর্মে যাচাই',
    titleEn: '8. Vested, Abandoned or Khas Land Verification',
    importance: 'critical',
    explanationBn:
      'জমিটি সরকারের খাস জমি, অর্পিত সম্পত্তি (Vested Property) বা ওয়াকফ/দেবোত্তর সম্পত্তি কি না তা উপজেলা ভূমি অফিস থেকে নিশ্চিত হোন।',
    explanationEn:
      'Confirm parcel is not recorded as Government Khas, Vested Property (Enemy Property), or Waqf / Debottar dedication.',
    lawRef: 'Vested Property Return Act & Khas Land Policy',
  },
  {
    id: 'masterplan_clearance',
    titleBn: '৯. রাজউক / সিডিএ / মাস্টারপ্ল্যান ও অধিগ্রহণ ছাড়পত্র',
    titleEn: '9. Development Authority (RAJUK/CDA) & Acquisition Clearance',
    importance: 'recommended',
    explanationBn:
      'জমিটি কোনো সরকারি উন্নয়ন প্রকল্পের আওতাভুক্ত বা অধিগ্রহণাধীন (Acquisition) কি না এবং রাস্তার প্রসারণে পড়বে কি না তা যাচাই করুন।',
    explanationEn:
      'Verify masterplan zoning and confirm the parcel is not under Section 4 / Section 7 government acquisition notices.',
    lawRef: 'Acquisition and Requisition of Immovable Property Act 2017',
  },
  {
    id: 'bhumiverify_signals',
    titleBn: '১০. ভূমিভেরিফাই ডিজিটাল প্রাক-রেজিস্ট্রেশন সংকেত যাচাই',
    titleEn: '10. BhumiVerify Pre-Registration Signals Check',
    importance: 'critical',
    explanationBn:
      'অনলাইনে সাম্প্রতিক কোনো ই-নামজারি আবেদন চলমান আছে কি না বা সাব-রেজিস্ট্রিতে সাম্প্রতিক দলিল নিবন্ধিত হয়েছে কি না তা আগাম পরীক্ষা করুন।',
    explanationEn:
      'Review pre-registration transaction signals on BhumiVerify to detect concurrent unmutated deed transfers or active disputes.',
    lawRef: 'LandTech BD Early Signal System',
  },
];

export const BuyerDiligenceChecklistModal: React.FC = () => {
  const { isChecklistOpen, closeChecklist } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    bhumiverify_signals: true, // checked by default since user is using the app!
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isChecklistOpen) return null;

  const isBn = language === 'bn';

  const toggleCheck = (id: string) => {
    const nextState = !checkedIds[id];
    setCheckedIds((prev) => ({ ...prev, [id]: nextState }));
    if (nextState) {
      // Check if all are complete
      const totalChecked = Object.values({ ...checkedIds, [id]: true }).filter(Boolean).length;
      if (totalChecked === CHECKLIST_ITEMS.length) {
        showToast({
          type: 'success',
          title: isBn ? 'অভিনন্দন! শতভাগ যাচাই সম্পন্ন' : '100% Diligence Complete!',
          message: isBn ? 'সকল আইনি ও রাজস্ব শর্ত পরীক্ষা করা হয়েছে' : 'All 10 diligence checkpoints verified',
        });
      }
    }
  };

  const totalPoints = CHECKLIST_ITEMS.length;
  const checkedPoints = Object.values(checkedIds).filter(Boolean).length;
  const scorePercentage = Math.round((checkedPoints / totalPoints) * 100);

  const getSafetyBadge = () => {
    if (scorePercentage >= 80) {
      return {
        labelBn: 'নিরাপদ ও সুরক্ষিত (Safe to Proceed)',
        labelEn: 'Safe & Verified to Proceed',
        color: 'text-emerald-800 bg-emerald-100 border-emerald-300',
        barColor: 'bg-emerald-500',
      };
    }
    if (scorePercentage >= 50) {
      return {
        labelBn: 'মধ্যম সতর্কতা (Moderate Caution)',
        labelEn: 'Moderate Caution — Further Checks Advised',
        color: 'text-amber-800 bg-amber-100 border-amber-300',
        barColor: 'bg-amber-500',
      };
    }
    return {
      labelBn: 'উচ্চ ঝুঁকি (High Risk — Do Not Pay Bayna)',
      labelEn: 'High Risk — Do Not Pay Advance',
      color: 'text-rose-800 bg-rose-100 border-rose-300',
      barColor: 'bg-rose-500',
    };
  };

  const safety = getSafetyBadge();

  const handleCopy = () => {
    const lines = CHECKLIST_ITEMS.map((item, idx) => {
      const isDone = !!checkedIds[item.id];
      return `[${isDone ? '✓' : '✗'}] ${idx + 1}. ${isBn ? item.titleBn : item.titleEn} (${item.lawRef})`;
    }).join('\n');

    const summary = `=== [BhumiVerify] বাংলাদেশ জমি ক্রয় প্রাক-যাচাই স্কোরকার্ড ===
স্কোর: ${scorePercentage}% (${checkedPoints}/${totalPoints} ধাপ সম্পন্ন)
অবস্থা: ${isBn ? safety.labelBn : safety.labelEn}

${lines}

তারিখ: ${new Date().toLocaleDateString('en-GB')}`;

    navigator.clipboard.writeText(summary);
    showToast({
      type: 'success',
      title: isBn ? 'চেকলিস্ট কপি করা হয়েছে!' : 'Checklist Copied!',
      message: isBn ? 'ক্লিপবোর্ডে সম্পূর্ণ স্কোরকার্ড সংরক্ষিত হয়েছে' : 'Diligence report copied to clipboard',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diligence-checklist-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={closeChecklist}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-gov-dark via-slate-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 id="diligence-checklist-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {isBn ? 'জমি ক্রয়ের ১০-দফা প্রাক-যাচাই চেকলিস্ট ও ঝুঁকি স্কোর' : 'Land Buyer 10-Point Diligence Checklist'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-teal-200">
                  {isBn ? 'আইনি গাইড' : 'Legal Diligence'}
                </span>
              </h2>
              <p className="text-xs text-teal-200/80">
                {isBn
                  ? 'বায়না বা দলিলের পূর্বে প্রতারণা এড়াতে প্রতিটি ধাপ টিকচিহ্ন দিয়ে আপনার ঝুঁকি যাচাই করুন'
                  : 'Check off essential legal & revenue steps before paying advance or executing sale deeds'}
              </p>
            </div>
          </div>

          <button
            onClick={closeChecklist}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close checklist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Safety Gauge Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{isBn ? 'ক্রয় নিরাপত্তা স্কোর:' : 'Purchase Safety Score:'}</span>
              <span className="font-mono text-sm">{scorePercentage}% ({checkedPoints}/{totalPoints})</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full ${safety.barColor} transition-all duration-300 ease-out`}
                style={{ width: `${scorePercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-3 py-1.5 rounded-xl font-bold border ${safety.color}`}>
              {isBn ? safety.labelBn : safety.labelEn}
            </span>
          </div>
        </div>

        {/* Checklist Items Scrollable */}
        <div className="p-6 overflow-y-auto space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!checkedIds[item.id];
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 transition-all duration-150 ${
                  isChecked
                    ? 'bg-teal-50/40 border-teal-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none flex-1">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(item.id)}
                      className="w-5 h-5 mt-0.5 rounded text-gov-primary focus:ring-teal-500 border-slate-300 shrink-0 cursor-pointer"
                    />
                    <div>
                      <p
                        className={`text-xs sm:text-sm font-bold ${
                          isChecked ? 'text-gov-primary line-through-none' : 'text-slate-800'
                        }`}
                      >
                        {isBn ? item.titleBn : item.titleEn}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                        {isBn ? 'আইনি রেফারেন্স:' : 'Statutory Reference:'} {item.lawRef}
                      </span>
                    </div>
                  </label>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                    title={isExpanded ? 'Hide explanation' : 'Show explanation'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Explanation */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600 bg-white/60 p-3 rounded-xl animate-slide-down">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {isBn ? item.explanationBn : item.explanationEn}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্রিন্ট চেকলিস্ট' : 'Print'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isBn ? 'রিপোর্ট কপি করুন' : 'Copy Diligence Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
