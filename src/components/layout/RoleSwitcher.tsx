import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import {
  Shield, User, FileCheck2, Settings2, RefreshCw, Sparkles,
  ChevronDown, ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole, resetAllDemoData } = useApp();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [scenariosOpen, setScenariosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setScenariosOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { id: UserRole; label: string; icon: React.ReactNode; home: string; color: string }[] = [
    { id: 'citizen', label: t.roles.citizen, icon: <User className="w-3 h-3" />, home: '/citizen', color: 'hover:bg-teal-600' },
    { id: 'reviewer', label: t.roles.reviewer, icon: <FileCheck2 className="w-3 h-3" />, home: '/reviewer', color: 'hover:bg-blue-600' },
    { id: 'auditor', label: t.roles.auditor, icon: <Shield className="w-3 h-3" />, home: '/auditor', color: 'hover:bg-violet-600' },
    { id: 'admin', label: t.roles.admin, icon: <Settings2 className="w-3 h-3" />, home: '/admin', color: 'hover:bg-slate-600' },
  ];

  const activeColors: Record<string, string> = {
    citizen: 'bg-teal-600',
    reviewer: 'bg-blue-600',
    auditor: 'bg-violet-600',
    admin: 'bg-slate-600',
  };

  const quickScenarios = [
    {
      id: 'REQ-2026-001',
      title: language === 'bn' ? 'সিনারিও ১: রিভিউ অপেক্ষমাণ (তেজগাঁও ৪০২)' : 'Scenario 1: Under Review (Tejgaon 402)',
      desc: language === 'bn' ? 'সাম্প্রতিক হস্তান্তর দলিল • এসএলএ সক্রিয়' : 'Recent transfer deed • Active SLA',
      url: '/citizen/requests/REQ-2026-001',
      badge: language === 'bn' ? 'রিভিউ' : 'Review',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      dot: 'bg-amber-500',
    },
    {
      id: 'REQ-2026-002',
      title: language === 'bn' ? 'সিনারিও ২: পেমেন্ট অপেক্ষমাণ (ধানমন্ডি ১১৮)' : 'Scenario 2: Payment Pending (Dhanmondi 118)',
      desc: language === 'bn' ? 'অনুমোদিত • বিকাশ/নগদ ফি বাকি' : 'Approved • bKash/Nagad fee pending',
      url: '/citizen/requests/REQ-2026-002',
      badge: language === 'bn' ? 'পেমেন্ট' : 'Payment',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      dot: 'bg-blue-500',
    },
    {
      id: 'REQ-2026-003',
      title: language === 'bn' ? 'সিনারিও ৩: সক্রিয় টাইমলাইন (গুলশান ৮৫)' : 'Scenario 3: Active Signals (Gulshan 85)',
      desc: language === 'bn' ? 'ফি পরিশোধিত • লাইভ টাইমলাইন' : 'Paid • Live timeline unlocked',
      url: '/citizen/requests/REQ-2026-003',
      badge: language === 'bn' ? 'সক্রিয়' : 'Active',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-500',
    },
    {
      id: 'REQ-2026-004',
      title: language === 'bn' ? 'সিনারিও ৪: নামঞ্জুর (আমিনবাজার ৯৯৯)' : 'Scenario 4: Rejected (Aminbazar 999)',
      desc: language === 'bn' ? 'সীমানা বিরোধ • লিখিত প্রত্যাখ্যান' : 'Boundary dispute • Written refusal',
      url: '/citizen/requests/REQ-2026-004',
      badge: language === 'bn' ? 'নামঞ্জুর' : 'Rejected',
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      dot: 'bg-rose-500',
    },
  ];

  const { showToast } = useToast();

  const handleRoleChange = (roleId: UserRole, homeUrl: string) => {
    setRole(roleId);
    navigate(homeUrl);
    const roleTitles: Record<UserRole, string> = {
      citizen: language === 'bn' ? 'নাগরিক ভূমিকা সক্রিয়' : 'Citizen Mode Active',
      reviewer: language === 'bn' ? 'পর্যালোচক কর্মকর্তা ভূমিকা সক্রিয়' : 'Official Reviewer Mode Active',
      auditor: language === 'bn' ? 'কমপ্লায়েন্স অডিটর ভূমিকা সক্রিয়' : 'Compliance Auditor Mode Active',
      admin: language === 'bn' ? 'সিস্টেম অ্যাডমিনিস্ট্রেটর ভূমিকা সক্রিয়' : 'System Admin Mode Active',
    };
    showToast({
      type: 'info',
      title: roleTitles[roleId],
      message: language === 'bn' ? 'ভূমিকা অনুযায়ী ভিউ ও ড্যাশবোর্ড লোড হয়েছে' : 'Perspective switched successfully',
    });
  };

  const handleResetData = () => {
    const msg = language === 'bn'
      ? 'সব ডেমো ডেটা রিসেট করতে চান?'
      : 'Reset all demo data to initial state?';
    if (window.confirm(msg)) {
      resetAllDemoData();
      navigate('/citizen');
      showToast({
        type: 'info',
        title: language === 'bn' ? 'ডেমো ডেটা রিসেট সম্পন্ন' : 'Demo Data Reset',
        message: language === 'bn' ? 'সমস্ত রেকর্ড প্রাথমিক অবস্থায় ফিরে এসেছে' : 'All demo records restored to baseline',
      });
    }
  };

  return (
    <div className="bg-gov-dark text-slate-100 text-xs border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">

        {/* Role Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest hidden sm:inline">
            {t.roles.roleSwitcher}
          </span>
          <div className="flex items-center gap-1 p-0.5 bg-white/5 rounded-lg border border-white/10">
            {roles.map((r) => {
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id, r.home)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-150 ${
                    isActive
                      ? `${activeColors[r.id]} text-white shadow-xs`
                      : `text-slate-400 hover:text-white ${r.color} hover:text-white`
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse-slow" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Scenarios + Reset */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setScenariosOpen(!scenariosOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-medium transition-all duration-150"
            >
              <Sparkles className="w-3 h-3" />
              <span>{language === 'bn' ? '৪টি দৃশ্যপট' : '4 Scenarios'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${scenariosOpen ? 'rotate-180' : ''}`} />
            </button>

            {scenariosOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-float border border-slate-200 text-slate-800 overflow-hidden z-50 animate-slide-down">
                <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {language === 'bn' ? 'মূল্যায়ন দৃশ্যপট' : 'Quick Scenario Jump'}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">1-click</span>
                </div>
                <div className="p-2 space-y-1">
                  {quickScenarios.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => { setScenariosOpen(false); navigate(sc.url); }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition-all duration-150 flex items-center justify-between gap-3 group border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-2 h-2 rounded-full ${sc.dot} mt-1.5 shrink-0`} />
                        <div>
                          <p className="font-semibold text-xs text-slate-900 group-hover:text-gov-primary transition-colors">{sc.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{sc.desc}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border shrink-0 ${sc.color}`}>{sc.badge}</span>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{language === 'bn' ? 'লোকাল ব্রাউজার ডেটা' : 'Zero-backend prototype'}</span>
                  <button
                    onClick={() => { setScenariosOpen(false); navigate('/citizen/new-request'); }}
                    className="text-[11px] text-gov-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    {language === 'bn' ? 'নতুন আবেদন' : 'New Request'}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium transition-all duration-150"
          >
            <RefreshCw className="w-3 h-3 text-teal-400" />
            <span className="hidden sm:inline">{t.roles.resetDemo}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
