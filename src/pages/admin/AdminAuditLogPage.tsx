import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, ShieldCheck, Filter, Search, Clock, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import { Disclaimer } from '../../components/common/Disclaimer';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  targetRef: string;
  status: 'SUCCESS' | 'CONFLICT_FLAGGED' | 'INCOMPLETE_FLAGGED';
  details: string;
  detailsBn?: string;
}

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-9941',
    timestamp: '2026-03-24T10:14:22.000Z',
    actor: 'system_engine',
    role: 'RULE_MATCHER',
    action: 'COMPOSITE_MATCH_EVALUATED',
    targetRef: 'BS-DEMO-001 (Gulshan/85)',
    status: 'SUCCESS',
    details: 'Division, District, Upazila, Mouza, Khatian, Dag matched exactly. No JL mismatch.',
    detailsBn: 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান ও দাগ হুবহু মিলেছে। কোনো জেএল অসঙ্গতি নেই।',
  },
  {
    id: 'LOG-9942',
    timestamp: '2026-03-24T09:40:11.000Z',
    actor: 'buyer_session_01',
    role: 'DEMO_USER',
    action: 'PARCEL_QUERY_SUBMITTED',
    targetRef: 'BS-DEMO-004 (Nasirabad/210)',
    status: 'CONFLICT_FLAGGED',
    details: 'Bank mortgage lien MTG-DEMO-771 detected. Rule flagged Review Recommended.',
    detailsBn: 'ব্যাংক বন্ধকি দায় MTG-DEMO-771 শনাক্ত হয়েছে। সতর্ক পর্যালোচনা নির্দেশ করা হয়েছে।',
  },
  {
    id: 'LOG-9943',
    timestamp: '2026-03-23T16:22:45.000Z',
    actor: 'system_engine',
    role: 'DATA_INTEGRITY',
    action: 'MISSING_DATE_HANDLED',
    targetRef: 'BS-DEMO-008 (Joydebpur/201)',
    status: 'INCOMPLETE_FLAGGED',
    details: 'Event EVT-008-A contained null date and null reference. Gracefully routed to fallback formatter.',
    detailsBn: 'ইভেন্ট EVT-008-A এর তারিখ ও সূত্র অনুপস্থিত ছিল। সফলভাবে ফলব্যাক ফরম্যাটারে পরিচালিত হয়েছে।',
  },
  {
    id: 'LOG-9944',
    timestamp: '2026-03-22T14:15:00.000Z',
    actor: 'buyer_session_01',
    role: 'DEMO_USER',
    action: 'TASK_COMPLETED_TOGGLED',
    targetRef: 'TASK-1 (Gulshan/85)',
    status: 'SUCCESS',
    details: 'User marked Mutation Porcha verification completed with custom field notes.',
    detailsBn: 'ব্যবহারকারী ব্যক্তিগত নোটসহ নামজারি পরচা যাচাই সম্পন্ন হিসেবে চিহ্নিত করেছেন।',
  },
  {
    id: 'LOG-9945',
    timestamp: '2026-03-20T09:30:00.000Z',
    actor: 'system_engine',
    role: 'STORAGE_ADAPTER',
    action: 'STORAGE_INITIALIZED',
    targetRef: 'LOCAL_STORAGE_V2',
    status: 'SUCCESS',
    details: 'Initialized seed checks CHK-2026-001 through 004 into browser localStorage.',
    detailsBn: 'ব্রাউজার লোকাল স্টোরেজে রেকর্ড CHK-2026-001 থেকে 004 সফলভাবে প্রস্তুত হয়েছে।',
  },
];

export const AdminAuditLogPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [search, setSearch] = useState('');

  const filteredLogs = MOCK_AUDIT_LOGS.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.targetRef.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      (log.detailsBn && log.detailsBn.toLowerCase().includes(search.toLowerCase())) ||
      log.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'অ্যাডমিন কনসোলে ফিরে যান' : 'Back to Admin Console'}</span>
        </Link>
        <span className="text-xs text-slate-500 font-mono">
          {isBn ? 'ইভেন্ট লগ সংখ্যা:' : 'Total Event Logs:'} {toBengaliNumerals(MOCK_AUDIT_LOGS.length, isBn)}
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {isBn ? 'অ্যাডমিন অডিট লগ' : 'Admin Audit Log'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'নিয়ম মূল্যায়ন, স্টোরেজ আপডেট এবং সিস্টেম ডেটা অখণ্ডতার ইভেন্ট হিস্ট্রি।'
            : 'Trace rule evaluations, storage mutations, and system data integrity assertions.'}
        </p>
      </div>

      {/* Search box */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? 'অ্যাকশন, টার্গেট বা বিবরণ দিয়ে অডিট লগ খুঁজুন...' : 'Search audit records by action, target parcel, or details...'}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">{isBn ? 'লগ আইডি / সময়' : 'Log ID / Time'}</th>
                <th className="px-4 py-3">{isBn ? 'কর্তা / ভূমিকা' : 'Actor / Role'}</th>
                <th className="px-4 py-3">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                <th className="px-4 py-3">{isBn ? 'টার্গেট রেফারেন্স' : 'Target Reference'}</th>
                <th className="px-4 py-3">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="px-4 py-3">{isBn ? 'বিবরণ' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-bold text-slate-900 block">{log.id}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                    <span className="font-semibold block">{log.actor}</span>
                    <span className="text-[9px] text-slate-400">{log.role}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gov-primary font-semibold">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700 font-sans">
                    {log.targetRef}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.status === 'CONFLICT_FLAGGED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {log.status === 'SUCCESS'
                        ? (isBn ? 'সফল' : 'SUCCESS')
                        : log.status === 'CONFLICT_FLAGGED'
                        ? (isBn ? 'বিরোধ চিহ্নিত' : 'CONFLICT_FLAGGED')
                        : (isBn ? 'অসম্পূর্ণ চিহ্নিত' : 'INCOMPLETE_FLAGGED')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-sans max-w-xs truncate">
                    {isBn && log.detailsBn ? log.detailsBn : log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Disclaimer compact={false} />
    </div>
  );
};
