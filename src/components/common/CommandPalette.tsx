import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  Search,
  MapPin,
  Calculator,
  Compass,
  FilePlus,
  List,
  Shield,
  FileCheck2,
  Settings2,
  RefreshCw,
  Globe,
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  Command,
  ClipboardCheck,
  ArrowRightLeft,
  MessageSquare,
  Award,
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'scenarios' | 'tools' | 'navigation' | 'actions';
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    openCadastralMap,
    openCalculator,
    openTour,
    openChecklist,
    openUnitConverter,
    openAssistant,
    openCertificate,
  } = useUI();
  const { setRole, resetAllDemoData, verifyCitizenIdentity, requests } = useApp();
  const { language, setLanguage } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const items: PaletteItem[] = useMemo(() => {
    const isBn = language === 'bn';

    return [
      // ── Scenarios ──
      {
        id: 'sc-1',
        title: isBn ? 'সিনারিও ১: রিভিউ অপেক্ষমাণ (তেজগাঁও শিল্পাঞ্চল, দাগ ৪০২)' : 'Scenario 1: Under Review (Tejgaon I/A, Dag 402)',
        subtitle: isBn ? 'সাম্প্রতিক হস্তান্তর দলিল • নামজারি অনিষ্পন্ন' : 'Recent transfer deed • Pending mutation',
        category: 'scenarios',
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        badge: isBn ? 'রিভিউ' : 'Review',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        action: () => {
          navigate('/citizen/requests/REQ-2026-001');
          closeCommandPalette();
        },
      },
      {
        id: 'sc-2',
        title: isBn ? 'সিনারিও ২: ফি পরিশোধ অপেক্ষমাণ (ধানমন্ডি আ/এ, দাগ ১১৮)' : 'Scenario 2: Payment Pending (Dhanmondi R/A, Dag 118)',
        subtitle: isBn ? 'অনুমোদিত • বিকাশ/নগদ ফি বাকি' : 'Approved • bKash/Nagad fee pending',
        category: 'scenarios',
        icon: <Sparkles className="w-4 h-4 text-blue-500" />,
        badge: isBn ? 'পেমেন্ট' : 'Payment',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        action: () => {
          navigate('/citizen/requests/REQ-2026-002');
          closeCommandPalette();
        },
      },
      {
        id: 'sc-3',
        title: isBn ? 'সিনারিও ৩: লাইভ সংকেত ও টাইমলাইন (গুলশান, দাগ ৮৫)' : 'Scenario 3: Live Signals & Timeline (Gulshan, Dag 85)',
        subtitle: isBn ? 'ফি পরিশোধিত • টাইম-লকড অ্যাক্টিভেশন' : 'Paid • Time-locked view active',
        category: 'scenarios',
        icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
        badge: isBn ? 'সক্রিয়' : 'Active',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        action: () => {
          navigate('/citizen/requests/REQ-2026-003');
          closeCommandPalette();
        },
      },
      {
        id: 'sc-4',
        title: isBn ? 'সিনারিও ৪: সীমানা বিরোধ ও নামঞ্জুর (আমিনবাজার, দাগ ৯৯৯)' : 'Scenario 4: Boundary Dispute & Refusal (Aminbazar, Dag 999)',
        subtitle: isBn ? 'এসএ-আরএস অমিল • লিখিত প্রত্যাখ্যান' : 'SA-RS discrepancy • Written refusal',
        category: 'scenarios',
        icon: <Sparkles className="w-4 h-4 text-rose-500" />,
        badge: isBn ? 'নামঞ্জুর' : 'Rejected',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
        action: () => {
          navigate('/citizen/requests/REQ-2026-004');
          closeCommandPalette();
        },
      },

      // ── Tools ──
      {
        id: 'tool-map',
        title: isBn ? 'ইন্টারেক্টিভ ক্যাডাস্ট্রাল মৌজা নকশা (Cadastral Map)' : 'Interactive Cadastral Mouza Map',
        subtitle: isBn ? 'দাগ নম্বর, সীমানা ও বিরোধ সরাসরি নকশায় দেখুন' : 'Explore plots, boundaries and conflicts directly on survey sheet',
        category: 'tools',
        icon: <MapPin className="w-4 h-4 text-teal-600" />,
        badge: isBn ? 'ম্যাপ' : 'Map',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
        action: () => {
          closeCommandPalette();
          openCadastralMap();
        },
      },
      {
        id: 'tool-calculator',
        title: isBn ? 'জমি রেজিস্ট্রেশন ও নামজারি ফি ক্যালকুলেটর' : 'Land Registration & Stamp Duty Calculator',
        subtitle: isBn ? 'স্ট্যাম্প ডিউটি, সরকারি কর ও নামজারি ব্যয়ের হিসাব' : 'Estimate stamp duty, local taxes and mutation costs',
        category: 'tools',
        icon: <Calculator className="w-4 h-4 text-blue-600" />,
        badge: isBn ? 'ক্যালকুলেটর' : 'Calc',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        action: () => {
          closeCommandPalette();
          openCalculator();
        },
      },
      {
        id: 'tool-tour',
        title: isBn ? 'প্ল্যাটফর্ম গাইড ও ওয়াকথ্রু (Guided Tour)' : 'Platform Guided Walkthrough',
        subtitle: isBn ? 'ভূমিভেরিফাই কীভাবে কাজ করে তা ৪টি ধাপে জানুন' : 'Learn how LandTech BD operates in 4 interactive steps',
        category: 'tools',
        icon: <Compass className="w-4 h-4 text-violet-600" />,
        badge: isBn ? 'ট্যুর' : 'Tour',
        badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
        action: () => {
          closeCommandPalette();
          openTour();
        },
      },
      {
        id: 'tool-checklist',
        title: isBn ? '১০-দফা জমি ক্রয় প্রাক-যাচাই চেকলিস্ট ও ঝুঁকি স্কোর' : '10-Point Land Due Diligence Checklist',
        subtitle: isBn ? 'বায়না বা দলিলের পূর্বে আইনি ও দখলীয় শর্তসমূহ খতিয়ে দেখুন' : 'Verify chain deeds, mutation, physical possession and civil court checks',
        category: 'tools',
        icon: <ClipboardCheck className="w-4 h-4 text-teal-600" />,
        badge: isBn ? 'চেকলিস্ট' : 'Checklist',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
        action: () => {
          closeCommandPalette();
          openChecklist();
        },
      },
      {
        id: 'tool-converter',
        title: isBn ? 'বাংলাদেশি ভূমি পরিমাপ রূপান্তরক (Unit Converter)' : 'Bangladesh Land Unit Converter',
        subtitle: isBn ? 'শতাংশ, কাঠা, বিঘা, একর, ছটাক এবং বর্গফুটের সঠিক রূপান্তর' : 'Convert decimals, katha, bigha, acres and square feet',
        category: 'tools',
        icon: <ArrowRightLeft className="w-4 h-4 text-amber-600" />,
        badge: isBn ? 'পরিমাপ' : 'Units',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        action: () => {
          closeCommandPalette();
          openUnitConverter();
        },
      },
      {
        id: 'tool-assistant',
        title: isBn ? 'এআই ডিজিটাল ভূমি সহকারী (Land Diligence Assistant)' : 'AI Land Diligence Assistant',
        subtitle: isBn ? 'বায়া দলিল, নামজারি আইন, ও অংশীদারি সংক্রান্ত প্রশ্নের তাৎক্ষণিক উত্তর' : 'Ask questions about Bangladesh land conveyance, deeds and mutations',
        category: 'tools',
        icon: <MessageSquare className="w-4 h-4 text-emerald-600" />,
        badge: isBn ? 'এআই চ্যাট' : 'AI Chat',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        action: () => {
          closeCommandPalette();
          openAssistant();
        },
      },
      {
        id: 'tool-certificate',
        title: isBn ? 'ডিজিটাল ভূমি যাচাই প্রত্যয়নপত্র (Official Certificate)' : 'Official Land Diligence Certificate Sample',
        subtitle: isBn ? 'কিউআর কোড ও ডিজিটাল সিল সম্বলিত অফিসিয়াল প্রত্যয়নপত্র দেখুন' : 'View official verified certificate with QR code and signature',
        category: 'tools',
        icon: <Award className="w-4 h-4 text-amber-600" />,
        badge: isBn ? 'সার্টিফিকেট' : 'Certificate',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        action: () => {
          closeCommandPalette();
          const targetReq = requests[2] || requests[0];
          openCertificate(targetReq);
        },
      },

      // ── Navigation ──
      {
        id: 'nav-new-request',
        title: isBn ? 'নতুন আবেদন করুন (New Request)' : 'Submit New Land Diligence Request',
        subtitle: isBn ? 'বিভাগ, জেলা, উপজেলা, মৌজা ও দাগ নির্বাচন করুন' : 'Specify Division, District, Upazila, Mouza and Dag',
        category: 'navigation',
        icon: <FilePlus className="w-4 h-4 text-teal-600" />,
        action: () => {
          navigate('/citizen/new-request');
          closeCommandPalette();
        },
      },
      {
        id: 'nav-my-requests',
        title: isBn ? 'আমার আবেদনসমূহ (My Requests)' : 'My Inquiries & Requests List',
        subtitle: isBn ? 'দাখিলকৃত সব আবেদনের স্ট্যাটাস ও ট্র্যাকিং' : 'View all submitted requests and tracking timelines',
        category: 'navigation',
        icon: <List className="w-4 h-4 text-slate-600" />,
        action: () => {
          navigate('/citizen/requests');
          closeCommandPalette();
        },
      },
      {
        id: 'nav-reviewer',
        title: isBn ? 'পর্যালোচক ড্যাশবোর্ড (Reviewer Queue)' : 'Official Reviewer Adjudication Dashboard',
        subtitle: isBn ? 'পেন্ডিং আবেদন মূল্যায়ন ও তথ্য উন্মুক্তকরণ অনুমোদন' : 'Evaluate citizen requests and adjudicate disclosure scopes',
        category: 'navigation',
        icon: <FileCheck2 className="w-4 h-4 text-blue-600" />,
        action: () => {
          setRole('reviewer');
          navigate('/reviewer');
          closeCommandPalette();
          showToast({ type: 'info', title: isBn ? 'পর্যালোচক মোডে সুইচ করা হয়েছে' : 'Switched to Official Reviewer mode' });
        },
      },
      {
        id: 'nav-auditor',
        title: isBn ? 'অডিট ট্রেইল ও মনিটরিং (Auditor Trail)' : 'Compliance Audit Trail & Feed Health',
        subtitle: isBn ? 'অপরিবর্তনীয় লগ এবং টোকেন অ্যাক্সেস হিস্ট্রি' : 'Immutable audit logs and controlled token history',
        category: 'navigation',
        icon: <Shield className="w-4 h-4 text-violet-600" />,
        action: () => {
          setRole('auditor');
          navigate('/auditor');
          closeCommandPalette();
          showToast({ type: 'info', title: isBn ? 'অডিটর মোডে সুইচ করা হয়েছে' : 'Switched to Compliance Auditor mode' });
        },
      },
      {
        id: 'nav-admin',
        title: isBn ? 'সিস্টেম অ্যাডমিন সেটিংস (System Governance)' : 'System Governance & SLA Policies',
        subtitle: isBn ? 'ফি পলিসি, এসএলএ টাইমার ও ডেমো ডেটা নিয়ন্ত্রণ' : 'Configure fees, SLA timers, and demo records',
        category: 'navigation',
        icon: <Settings2 className="w-4 h-4 text-slate-600" />,
        action: () => {
          setRole('admin');
          navigate('/admin');
          closeCommandPalette();
          showToast({ type: 'info', title: isBn ? 'অ্যাডমিন মোডে সুইচ করা হয়েছে' : 'Switched to System Admin mode' });
        },
      },

      // ── Actions ──
      {
        id: 'act-lang',
        title: isBn ? 'Switch to English' : 'বাংলা ভাষায় পরিবর্তন করুন',
        subtitle: isBn ? 'Change interface language to English' : 'ওয়েবসাইটের ভাষা বাংলায় রূপান্তর করুন',
        category: 'actions',
        icon: <Globe className="w-4 h-4 text-teal-600" />,
        action: () => {
          const next = isBn ? 'en' : 'bn';
          setLanguage(next);
          closeCommandPalette();
          showToast({
            type: 'success',
            title: next === 'bn' ? 'ভাষা পরিবর্তন সম্পন্ন' : 'Language Changed',
            message: next === 'bn' ? 'ওয়েবসাইট এখন বাংলায় প্রদর্শিত হচ্ছে' : 'Website is now displaying in English',
          });
        },
      },
      {
        id: 'act-verify-nid',
        title: isBn ? 'নাগরিক জাতীয় পরিচয়পত্র (NID) ভেরিফাই করুন' : 'Simulate NID Verification for Citizen',
        subtitle: isBn ? 'ডেমো এনআইডি ভেরিফিকেশন স্ট্যাটাস সক্রিয় করুন' : 'Mark citizen profile as officially verified for requests',
        category: 'actions',
        icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
        action: () => {
          verifyCitizenIdentity();
          closeCommandPalette();
          showToast({
            type: 'success',
            title: isBn ? 'এনআইডি সফলভাবে যাচাইকৃত!' : 'NID Verified Successfully!',
            message: isBn ? 'এখন আপনি যেকোনো পার্সেলের তথ্য চেয়ে আবেদন করতে পারেন।' : 'You can now submit new land diligence requests.',
          });
        },
      },
      {
        id: 'act-reset',
        title: isBn ? 'সমস্ত ডেমো ডেটা রিসেট করুন (Reset All Data)' : 'Reset All Demo Data to Initial State',
        subtitle: isBn ? 'সব পার্সেল, আবেদন ও অডিট লগ প্রাথমিক অবস্থায় ফিরিয়ে নিন' : 'Restore pre-seeded baseline parcels, requests and settings',
        category: 'actions',
        icon: <RefreshCw className="w-4 h-4 text-rose-600" />,
        action: () => {
          if (window.confirm(isBn ? 'সব ডেমো ডেটা রিসেট করতে চান?' : 'Reset all demo data to baseline state?')) {
            resetAllDemoData();
            navigate('/citizen');
            closeCommandPalette();
            showToast({
              type: 'info',
              title: isBn ? 'ডেমো ডেটা রিসেট সম্পন্ন' : 'Demo Data Reset',
              message: isBn ? 'সমস্ত পার্সেল ও আবেদন প্রাথমিক অবস্থায় ফিরে এসেছে' : 'All parcels and requests restored to baseline',
            });
          }
        },
      },
    ];
  }, [language, navigate, closeCommandPalette, openCadastralMap, openCalculator, openTour, setRole, showToast, setLanguage, verifyCitizenIdentity, resetAllDemoData]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        (item.badge && item.badge.toLowerCase().includes(lower))
    );
  }, [items, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredItems[selectedIndex]?.action();
    }
  };

  if (!isCommandPaletteOpen) return null;

  const categoryLabels: Record<string, string> = {
    scenarios: language === 'bn' ? 'মূল্যায়ন দৃশ্যপট (Scenarios)' : 'Evaluation Scenarios',
    tools: language === 'bn' ? 'ইন্টারেক্টিভ টুলস ও ম্যাপ (Tools)' : 'Interactive Tools & Maps',
    navigation: language === 'bn' ? 'দ্রুত নেভিগেশন (Navigation)' : 'Quick Navigation',
    actions: language === 'bn' ? 'সিস্টেম অ্যাকশন (Actions)' : 'System Actions',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-palette-title"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={closeCommandPalette}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/60">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            id="cmd-palette-title"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'bn'
                ? 'অনুসন্ধান করুন... (যেমন: তেজগাঁও, ধানমন্ডি, ম্যাপ, ফি, আবেদন, এনআইডি)'
                : 'Search anything... (e.g., Tejgaon, Map, Calculator, Scenario, Audit, NID)'
            }
            className="w-full pl-3 pr-8 py-1 bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none border-none ring-0"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              <Command className="w-3 h-3" /> K
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 px-4 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold text-slate-600">
                {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matching results found'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'bn'
                  ? 'অন্য শব্দ বা দাগ নম্বর দিয়ে চেষ্টা করুন'
                  : 'Try searching with a plot number, area name or tool name'}
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const prevItem = filteredItems[index - 1];
              const showCategory = !prevItem || prevItem.category !== item.category;

              return (
                <React.Fragment key={item.id}>
                  {showCategory && (
                    <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {categoryLabels[item.category]}
                    </div>
                  )}
                  <button
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 ${
                      isSelected
                        ? 'bg-teal-50 border border-teal-200/90 text-gov-primary'
                        : 'hover:bg-slate-50 border border-transparent text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white shadow-xs' : 'bg-slate-100'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate leading-snug">{item.title}</p>
                        <p className="text-[11px] text-slate-500 truncate leading-snug mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                            item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? 'translate-x-0.5 text-gov-primary' : 'text-slate-300'
                        }`}
                      />
                    </div>
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd>↑</kbd> <kbd>↓</kbd> {language === 'bn' ? 'নেভিগেট' : 'Navigate'}
            </span>
            <span className="flex items-center gap-1">
              <kbd>↵</kbd> {language === 'bn' ? 'নির্বাচন' : 'Select'}
            </span>
            <span className="flex items-center gap-1">
              <kbd>Esc</kbd> {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            {language === 'bn' ? 'ভূমিভেরিফাই স্পটলাইট' : 'BhumiVerify Spotlight Search'}
          </span>
        </div>
      </div>
    </div>
  );
};
