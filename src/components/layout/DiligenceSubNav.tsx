import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  FileText,
  GitCompare,
  CheckSquare,
  FolderOpen,
  Search,
} from 'lucide-react';

interface DiligenceSubNavProps {
  activeTab?: 'checks' | 'compare' | 'plan' | 'documents';
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const DiligenceSubNav: React.FC<DiligenceSubNavProps> = ({
  activeTab,
  title,
  subtitle,
  rightAction,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const location = useLocation();
  const { savedChecks } = useSavedChecks();

  // Compute counts
  const totalChecks = savedChecks?.length || 0;
  const allTasks = (savedChecks || []).flatMap((c) => c?.verificationTasks || []);
  const pendingTasks = allTasks.filter((t) => t && t.status !== 'completed').length;

  const currentActive =
    activeTab ||
    (location.pathname.startsWith('/compare')
      ? 'compare'
      : location.pathname.startsWith('/verification-plan')
      ? 'plan'
      : location.pathname.startsWith('/documents')
      ? 'documents'
      : 'checks');

  const tabs = [
    {
      id: 'checks',
      to: '/checks',
      label: isBn ? 'সংরক্ষিত জমি' : 'Saved Checks',
      icon: <FileText className="w-4 h-4" aria-hidden="true" />,
      badge: totalChecks > 0 ? (isBn ? toBengaliNumerals(totalChecks) : totalChecks) : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'compare',
      to: '/compare',
      label: isBn ? 'প্রতিবেদন তুলনা' : 'Compare Reports',
      icon: <GitCompare className="w-4 h-4" aria-hidden="true" />,
    },
    {
      id: 'plan',
      to: '/verification-plan',
      label: isBn ? 'যাচাই পরিকল্পনা' : 'Verification Plan',
      icon: <CheckSquare className="w-4 h-4" aria-hidden="true" />,
      badge: pendingTasks > 0 ? (isBn ? `${toBengaliNumerals(pendingTasks)} বাকি` : `${pendingTasks} pending`) : undefined,
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'documents',
      to: '/documents',
      label: isBn ? 'দলিল চেকলিস্ট ও গাইড' : 'Document Checklist',
      icon: <FolderOpen className="w-4 h-4" aria-hidden="true" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 mb-8 space-y-4">
      {/* Title & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200">
              {isBn ? 'ডিউ ডিলিজেন্স ওয়ার্কস্পেস' : 'Due Diligence Workspace'}
            </span>
          </div>
          {title && (
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightAction}
          <Link
            to="/check-land"
            className="btn-primary text-xs py-2 px-3.5 font-bold inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন জমি যাচাই' : 'New Check'}</span>
          </Link>
        </div>
      </div>

      {/* Logical Workspace Tabs */}
      <nav
        aria-label={isBn ? 'ডিউ ডিলিজেন্স ট্যাব মেনু' : 'Due diligence navigation tabs'}
        className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-none"
      >
        {tabs.map((tab) => {
          const isActive = currentActive === tab.id;
          return (
            <Link
              key={tab.id}
              to={tab.to}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gov-primary text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-500'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : tab.badgeColor
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
