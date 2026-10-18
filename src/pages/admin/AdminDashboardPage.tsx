import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PARCELS } from '../../data/mockParcels';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  Database,
  ShieldAlert,
  ArrowRight,
  Activity,
  Layers,
} from 'lucide-react';
import { Disclaimer } from '../../components/common/Disclaimer';

export const AdminDashboardPage: React.FC = () => {
  const { savedChecks } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Database className="w-3.5 h-3.5 text-gov-primary" />
          <span>{isBn ? 'সিস্টেম অ্যাডমিন' : 'System Administration'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {isBn ? 'অ্যাডমিন কনসোল' : 'Admin Console'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'জমি ডেটাসেট ও সিস্টেম অডিট লগ ব্যবস্থাপনা পোর্টাল।'
            : 'Management portal for parcel datasets and system audit logs.'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            {isBn ? 'মোট সংরক্ষিত রেকর্ড' : 'Total Parcel Records'}
          </span>
          <p className="text-2xl font-extrabold text-slate-900">{toBengaliNumerals(MOCK_PARCELS.length, isBn)}</p>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'নিবন্ধিত জমির রেকর্ড' : 'Active parcel records'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            {isBn ? 'সক্রিয় সংরক্ষিত যাচাই' : 'Active Saved Checks'}
          </span>
          <p className="text-2xl font-extrabold text-slate-900">{toBengaliNumerals(savedChecks.length, isBn)}</p>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'ব্রাউজারের লোকাল স্টোরেজে সংরক্ষিত' : 'Records currently stored in localStorage'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            {isBn ? 'স্টোরেজ অবস্থা' : 'Storage Adapter Status'}
          </span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {isBn ? 'সক্রিয়' : 'Active'}
          </p>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'ক্লায়েন্ট স্টোরেজ ব্যবস্থা' : 'Client storage engine'}
          </p>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/demo-records"
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-2 block group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-gov-primary flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gov-primary transition-colors" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 group-hover:text-gov-primary transition-colors">
            {isBn ? 'জমি রেকর্ড পরিদর্শন' : 'Manage Parcel Records'}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isBn
              ? 'জেএল নম্বর বিরোধ ও নামজারি অসম্পূর্ণতার মতো ৮টি রেকর্ডের বিস্তারিত JSON পরিদর্শন করুন।'
              : 'Inspect the details of 8 parcel records, including edge cases like JL mismatch and uncompleted mutations.'}
          </p>
        </Link>

        <Link
          to="/admin/audit-log"
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-2 block group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {isBn ? 'সিমুলেটেড অ্যাডমিন অডিট লগ' : 'Simulated Admin Audit Log'}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isBn
              ? 'প্রশাসনিক নিরাপত্তা ইভেন্ট ও নিয়ম যাচাইয়ের সিমুলেটেড অডিট এন্ট্রিগুলো দেখুন।'
              : 'Review simulated administrative security events, rule evaluations, and compliance audit entries.'}
          </p>
        </Link>
      </div>

      <Disclaimer compact={false} />
    </div>
  );
};
