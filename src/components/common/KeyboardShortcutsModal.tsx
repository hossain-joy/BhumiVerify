import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../../context/LanguageContext';
import {
  Command,
  Search,
  MapPin,
  Calculator,
  Scale,
  ClipboardCheck,
  Bot,
  ArrowLeftRight,
  Compass,
  Volume2,
  X,
  Keyboard,
} from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();

  const shortcuts = [
    {
      keys: ['Ctrl', 'K'],
      icon: <Search className="w-4 h-4 text-gov-primary" />,
      titleBn: 'স্পটলাইট কমান্ড প্যালেট',
      titleEn: 'Spotlight Command Palette',
      descBn: 'যেকোনো পৃষ্ঠা, দৃশ্যপট বা অ্যাকশন সার্চ করুন',
      descEn: 'Search any page, seeded plot, or action instantly',
    },
    {
      keys: ['M'],
      icon: <MapPin className="w-4 h-4 text-teal-600" />,
      titleBn: 'ডিজিটাল মৌজা নকশা',
      titleEn: 'Cadastral Survey Map',
      descBn: 'মৌজার দাগ ও সীমানা ইন্টারেক্টিভ ভিউয়ার খুলুন',
      descEn: 'Open interactive SVG survey sheet and plot inspector',
    },
    {
      keys: ['C'],
      icon: <Calculator className="w-4 h-4 text-blue-600" />,
      titleBn: 'ফি ও ট্যাক্স ক্যালকুলেটর',
      titleEn: 'Registration Fee Estimator',
      descBn: 'স্ট্যাম্প ডিউটি, নিবন্ধন কর ও নামজারি ব্যয়ের হিসাব',
      descEn: 'Calculate Bangladesh stamp duty & mutation fees',
    },
    {
      keys: ['U'],
      icon: <Scale className="w-4 h-4 text-emerald-600" />,
      titleBn: 'ভূমি পরিমাপ রূপান্তরকারী',
      titleEn: 'Land Unit Converter',
      descBn: 'শতাংশ, কাঠা, বিঘা, একর ও বর্গফুট কনভার্টার',
      descEn: 'Convert between Decimal, Katha, Bigha, Acre & Sq.Ft.',
    },
    {
      keys: ['L'],
      icon: <ClipboardCheck className="w-4 h-4 text-amber-600" />,
      titleBn: '১০-দফা ক্রেতা চেকলিস্ট',
      titleEn: 'Buyer Diligence Checklist',
      descBn: 'জমি ক্রয়ের আবশ্যকীয় আইনি যাচাই ও নিরাপত্তা স্কোর',
      descEn: '10-point statutory diligence compliance checklist',
    },
    {
      keys: ['P'],
      icon: <ArrowLeftRight className="w-4 h-4 text-purple-600" />,
      titleBn: 'পার্সেল দ্বৈত তুলনা ম্যাট্রিক্স',
      titleEn: 'Side-by-Side Parcel Comparator',
      descBn: 'দুটি প্লটের রেকর্ড ও সংকেত পাশাপাশি তুলনা করুন',
      descEn: 'Compare two land parcels side-by-side',
    },
    {
      keys: ['B'],
      icon: <Bot className="w-4 h-4 text-indigo-600" />,
      titleBn: 'এআই ভূমি সহকারী বট',
      titleEn: 'AI Land Diligence Assistant',
      descBn: 'আইনি ও দলিল সংক্রান্ত যেকোনো প্রশ্ন জিজ্ঞেস করুন',
      descEn: 'Chat with contextual land conveyance assistant',
    },
    {
      keys: ['T'],
      icon: <Compass className="w-4 h-4 text-violet-600" />,
      titleBn: 'প্ল্যাটফর্ম গাইড ও ওয়াকথ্রু',
      titleEn: 'Platform Guided Tour',
      descBn: '৪টি ধাপে প্ল্যাটফর্ম পরিচিতি ও ব্যবহার নির্দেশিকা',
      descEn: 'Step-by-step introduction to platform features',
    },
    {
      keys: ['S'],
      icon: <Volume2 className="w-4 h-4 text-pink-600" />,
      titleBn: 'সাউন্ড ইফেক্ট অন / অফ',
      titleEn: 'Toggle Sound Effects',
      descBn: 'অডিও ক্লিক ও কনফার্মেশন সংকেত চালু বা বন্ধ করুন',
      descEn: 'Enable or disable Web Audio synthesizers',
    },
    {
      keys: ['?'],
      icon: <Keyboard className="w-4 h-4 text-slate-600" />,
      titleBn: 'কীবোর্ড শর্টকাট সহায়িকা',
      titleEn: 'Keyboard Shortcuts Help',
      descBn: 'এই শর্টকাট সহায়িকা উইন্ডোটি প্রদর্শন করুন',
      descEn: 'Show this keyboard shortcuts reference dialog',
    },
    {
      keys: ['Esc'],
      icon: <X className="w-4 h-4 text-slate-400" />,
      titleBn: 'উইন্ডো বন্ধ করুন',
      titleEn: 'Close Active Window',
      descBn: 'যেকোনো সক্রিয় মডাল বা প্যানেল বন্ধ করুন',
      descEn: 'Dismiss any open modal or flyout menu',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'bn' ? 'কীবোর্ড শর্টকাট সহায়িকা (Keyboard Shortcuts)' : 'Global Keyboard Shortcuts'}
      subtitle={
        language === 'bn'
          ? 'মাউস ছাড়া কীবোর্ডের মাধ্যমে নিমেষেই পুরো প্ল্যাটফর্ম পরিচালনা করুন'
          : 'Navigate and trigger platform tools swiftly with keyboard hotkeys'
      }
      maxWidth="xl"
    >
      <div className="space-y-4">
        <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
          <span>
            {language === 'bn'
              ? 'টিপস: যেকোনো সময় কীবোর্ডে সরাসরি শর্টকাট কি চাপুন (যখন কোনো ইনপুট বক্সে টাইপ করছেন না)'
              : 'Tip: Press any single-key shortcut anytime when not typing in text fields'}
          </span>
          <span className="px-2 py-0.5 rounded bg-white font-mono font-bold text-[11px] text-gov-primary border border-teal-300">
            ?
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto pr-1">
          {shortcuts.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {language === 'bn' ? item.titleBn : item.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {item.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2 py-1 bg-white border border-slate-300 rounded shadow-2xs text-xs font-mono font-bold text-slate-700 min-w-[24px] text-center"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
