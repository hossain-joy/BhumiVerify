import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDateTime } from '../../lib/utils';
import {
  Shield,
  Search,
  Download,
  Lock,
  Layers,
} from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialReqId = searchParams.get('req') || '';

  const { auditEvents } = useApp();
  const { language } = useLanguage();
  const [roleFilter, setRoleFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [search, setSearch] = useState(initialReqId);

  const filtered = auditEvents.filter((item) => {
    if (roleFilter !== 'all' && item.actorRole !== roleFilter) {
      return false;
    }
    if (actionFilter !== 'all' && !item.action.includes(actionFilter)) {
      return false;
    }
    if (search) {
      const q = search.toLowerCase();
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchAction = item.action.toLowerCase().includes(q);
      const matchReq = item.requestId?.toLowerCase().includes(q);
      const matchActor = item.actorName.toLowerCase().includes(q);
      return matchSummary || matchAction || matchReq || matchActor;
    }
    return true;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filtered, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `landtech_audit_log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'citizen':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'reviewer':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'auditor':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'admin':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'system':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'প্ল্যাটফর্মের অপরিবর্তনীয় অডিট ট্রেইল' : 'Platform Immutable Audit Trail'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'নাগরিক আবেদন, কর্মকর্তার সিদ্ধান্ত, পেমেন্ট ও তথ্য প্রকাশের প্রতিটি পদক্ষেপের সুরক্ষিত অডিট লগ।'
              : 'Cryptographically sealed log of citizen requests, reviewer decisions, payment events, and signal releases.'}
          </p>
        </div>

        <button
          onClick={handleExportJson}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          {language === 'bn' ? 'অডিট ট্রেইল ডাউনলোড (JSON)' : 'Export Audit Trail (JSON)'}
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={
              language === 'bn'
                ? 'পদক্ষেপ, আবেদন আইডি, বিবরণ বা কর্মকর্তার নামে খুঁজুন...'
                : 'Search by action, request ID, summary, or actor...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-gov-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs p-1.5 rounded border border-slate-300 bg-white text-slate-700 cursor-pointer"
          >
            <option value="all">{language === 'bn' ? 'সকল অ্যাক্টর ভূমিকা' : 'All Actor Roles'}</option>
            <option value="citizen">{language === 'bn' ? 'নাগরিক' : 'Citizen'}</option>
            <option value="reviewer">{language === 'bn' ? 'রিভিউয়ার কর্মকর্তা' : 'Reviewer'}</option>
            <option value="system">{language === 'bn' ? 'সিস্টেম গেট' : 'System Gate'}</option>
            <option value="admin">{language === 'bn' ? 'অ্যাডমিন' : 'Admin'}</option>
          </select>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="text-xs p-1.5 rounded border border-slate-300 bg-white text-slate-700 cursor-pointer"
          >
            <option value="all">{language === 'bn' ? 'সকল ধরনের অ্যাকশন' : 'All Action Types'}</option>
            <option value="REQUEST_SUBMITTED">{language === 'bn' ? 'আবেদন দাখিল' : 'Request Submitted'}</option>
            <option value="DECISION">{language === 'bn' ? 'কর্মকর্তার সিদ্ধান্ত' : 'Reviewer Decision'}</option>
            <option value="PAYMENT">{language === 'bn' ? 'পেমেন্ট ইভেন্ট' : 'Payment Events'}</option>
            <option value="ACCESS">{language === 'bn' ? 'তথ্য অ্যাক্সেস' : 'Access Control'}</option>
            <option value="SETTINGS">{language === 'bn' ? 'সেটিংস পরিবর্তন' : 'Settings Modified'}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-2">
            <Layers className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">No audit events match your filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">Timestamp (UTC)</th>
                  <th className="py-3 px-4 font-semibold">Actor Role</th>
                  <th className="py-3 px-4 font-semibold">Actor Name</th>
                  <th className="py-3 px-4 font-semibold">Action Identifier</th>
                  <th className="py-3 px-4 font-semibold">Related Request</th>
                  <th className="py-3 px-4 font-semibold">Summary & Audit Notes</th>
                  <th className="py-3 px-4 font-semibold text-center">Data Masked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {formatDateTime(item.timestamp)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase border ${getRoleBadge(
                          item.actorRole
                        )}`}
                      >
                        {item.actorRole}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">
                      {item.actorName}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gov-primary">
                      {item.action}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {item.requestId || '—'}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700 max-w-sm">
                      {item.summary}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.maskedIndicator ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-sans font-medium text-[10px]">
                          <Lock className="w-3 h-3 text-emerald-600" /> Yes (Masked)
                        </span>
                      ) : (
                        <span className="text-slate-400 font-sans">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Governance Note */}
      <div className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 space-y-1">
        <span className="font-bold text-slate-900 block flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-gov-primary" />
          Statutory Audit Integrity Guarantee
        </span>
        <p className="leading-relaxed">
          Platform records are append-only. Sensitive applicant PII (National ID numbers, bank OTPs, biometric references) are permanently excluded from audit payloads in accordance with data protection principles.
        </p>
      </div>
    </div>
  );
};
