import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import {
  Shield,
  User,
  FileCheck2,
  Settings2,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole, resetAllDemoData } = useApp();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [scenariosOpen, setScenariosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setScenariosOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string; home: string }[] = [
    {
      id: 'citizen',
      label: t.roles.citizen,
      icon: <User className="w-3.5 h-3.5" />,
      desc: language === 'bn' ? 'সম্ভাব্য ক্রেতা — জমির তথ্য আবেদন ও সংকেত পর্যবেক্ষণ' : 'Prospective buyer requesting parcel signals',
      home: '/citizen',
    },
    {
      id: 'reviewer',
      label: t.roles.reviewer,
      icon: <FileCheck2 className="w-3.5 h-3.5" />,
      desc: language === 'bn' ? 'অফিসার ডেস্ক — আবেদন যাচাই, অনুমোদন ও নিষ্পত্তির ক্ষমতা' : 'Assesses purpose, approves/restricts scope',
      home: '/reviewer',
    },
    {
      id: 'auditor',
      label: t.roles.auditor,
      icon: <Shield className="w-3.5 h-3.5" />,
      desc: language === 'bn' ? 'কমপ্লায়েন্স অডিটর — স্থায়ী অডিট ট্রেইল ও অ্যাক্সেস লগ' : 'Independent audit trail & access history',
      home: '/auditor',
    },
    {
      id: 'admin',
      label: t.roles.admin,
      icon: <Settings2 className="w-3.5 h-3.5" />,
      desc: language === 'bn' ? 'সিস্টেম অ্যাডমিন — ফি, এসএলএ ও প্ল্যাটফর্ম সেটিংস' : 'Fee, SLA & demo configuration',
      home: '/admin',
    },
  ];

  const quickScenarios = [
    {
      id: 'REQ-2026-001',
      title: language === 'bn' ? 'সিনারিও ১: রিভিউ অপেক্ষমাণ (তেজগাঁও দাগ ৪০২)' : 'Scenario 1: Under Review (Tejgaon Dag 402)',
      desc: language === 'bn' ? 'সাম্প্রতিক হস্তান্তর দলিল বিদ্যমান • এসএলএ সময়সীমাভুক্ত' : 'Recent transfer deed recorded • Active SLA countdown',
      url: '/citizen/requests/REQ-2026-001',
      badge: language === 'bn' ? 'রিভিউ অপেক্ষমাণ' : 'Under Review',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'REQ-2026-002',
      title: language === 'bn' ? 'সিনারিও ২: পেমেন্ট অপেক্ষমাণ (ধানমন্ডি দাগ ১১৮)' : 'Scenario 2: Payment Pending (Dhanmondi Dag 118)',
      desc: language === 'bn' ? 'কর্মকর্তা অনুমোদিত • সিমুলেটেড বিকাশ/নগদ ফি বাকি' : 'Officer approved • Ready for simulated bKash/Nagad fee',
      url: '/citizen/requests/REQ-2026-002',
      badge: language === 'bn' ? 'পেমেন্ট বাকি' : 'Payment Pending',
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      id: 'REQ-2026-003',
      title: language === 'bn' ? 'সিনারিও ৩: সক্রিয় সংকেত ও টাইমলাইন (গুলশান দাগ ৮৫)' : 'Scenario 3: Active Disclosure (Gulshan Dag 85)',
      desc: language === 'bn' ? 'অনুমোদিত ও ফি পরিশোধিত • লাইভ টাইমলাইন উন্মুক্ত' : 'Approved & paid • Live chronological timeline unlocked',
      url: '/citizen/requests/REQ-2026-003',
      badge: language === 'bn' ? 'সক্রিয় সেশন' : 'Active Access',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: 'REQ-2026-004',
      title: language === 'bn' ? 'সিনারিও ৪: নামঞ্জুর ও সীমানা অস্পষ্টতা (আমিনবাজার)' : 'Scenario 4: Rejected / Boundary Issue (Aminbazar)',
      desc: language === 'bn' ? 'আইনি বিরোধে নামঞ্জুর • লিখিত পর্যবেক্ষণ সংযুক্ত' : 'Contested boundaries • Formal legal refusal order',
      url: '/citizen/requests/REQ-2026-004',
      badge: language === 'bn' ? 'নামঞ্জুর' : 'Rejected',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
    },
  ];

  const handleRoleChange = (roleId: UserRole, homeUrl: string) => {
    setRole(roleId);
    navigate(homeUrl);
  };

  const handleScenarioSelect = (url: string) => {
    setScenariosOpen(false);
    navigate(url);
  };

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Role Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] hidden sm:inline">
            {t.roles.roleSwitcher}
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {roles.map((r) => {
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id, r.home)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gov-teal text-white shadow-xs font-semibold ring-1 ring-teal-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={r.desc}
                >
                  {r.icon}
                  <span>{r.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 ml-0.5 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section: Quick Demo Scenarios Dropdown & Reset */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          {/* Quick Demo Scenarios Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setScenariosOpen(!scenariosOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-medium transition-colors"
              title="Test 4 pre-seeded evaluation scenarios"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? '৪টি মূল দৃশ্যপট' : '4 Demo Scenarios'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${scenariosOpen ? 'rotate-180' : ''}`} />
            </button>

            {scenariosOpen && (
              <div className="absolute right-0 mt-1.5 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-slate-200 text-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {language === 'bn' ? 'মূল্যায়ন দৃশ্যপট দ্রুত বাছাই' : 'Quick Scenario Selector'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">1-Click Jump</span>
                </div>

                <div className="space-y-1">
                  {quickScenarios.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => handleScenarioSelect(sc.url)}
                      className="w-full text-left p-2 rounded-md hover:bg-slate-50 transition-colors flex items-start justify-between gap-2 border border-transparent hover:border-slate-200 group"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-xs text-slate-900 group-hover:text-gov-primary flex items-center gap-1.5">
                          <span>{sc.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{sc.desc}</p>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 border ${sc.badgeClass}`}>
                        {sc.badge}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 px-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{language === 'bn' ? 'সকল ডেটা লোকাল ব্রাউজারে সংরক্ষিত' : 'Zero-backend evaluation prototype'}</span>
                  <button
                    onClick={() => {
                      setScenariosOpen(false);
                      navigate('/citizen/new-request');
                    }}
                    className="text-gov-primary font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <span>{language === 'bn' ? 'নতুন আবেদন ফরম' : 'New Request Form'}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={() => {
              const confirmMsg =
                language === 'bn'
                  ? 'সব ডেমো ডেটা (পার্সেল, আবেদন, অডিট লগ) প্রাথমিক অবস্থায় রিসেট করতে চান?'
                  : 'Reset all demo data (parcels, requests, audit logs) to initial scenarios?';
              if (window.confirm(confirmMsg)) {
                resetAllDemoData();
                navigate('/citizen');
              }
            }}
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded border border-slate-700 transition-colors"
            title="Reset demo data to initial scenario state"
          >
            <RefreshCw className="w-3 h-3 text-teal-400" />
            <span className="hidden sm:inline">{t.roles.resetDemo}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
