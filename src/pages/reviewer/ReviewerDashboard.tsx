import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { AccessRequest } from '../../types';
import { RequestStatusBadge } from '../../components/requests/RequestStatusBadge';
import { DecisionModal } from '../../components/reviewer/DecisionModal';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDate, formatDateTime, getTimeRemaining } from '../../lib/utils';
import {
  FileCheck2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const ReviewerDashboard: React.FC = () => {
  const { requests } = useApp();
  const { t, language } = useLanguage();
  const [selectedReq, setSelectedReq] = useState<AccessRequest | null>(null);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const [search, setSearch] = useState('');

  const counts = {
    pending: requests.filter((r) => r.status === 'submitted' || r.status === 'under_review').length,
    nearingSla: requests.filter((r) => {
      if (r.status !== 'submitted' && r.status !== 'under_review') return false;
      const rem = getTimeRemaining(r.targetDeadline);
      return !rem.isOverdue;
    }).length,
    moreInfo: requests.filter((r) => r.status === 'more_info_required').length,
    decided: requests.filter(
      (r) =>
        r.status === 'approved' ||
        r.status === 'limited_approved' ||
        r.status === 'rejected' ||
        r.status === 'payment_pending' ||
        r.status === 'access_active'
    ).length,
  };

  const filteredRequests = requests.filter((req) => {
    if (statusFilter === 'pending') {
      if (req.status !== 'submitted' && req.status !== 'under_review') return false;
    } else if (statusFilter === 'more_info') {
      if (req.status !== 'more_info_required') return false;
    } else if (statusFilter === 'decided') {
      if (
        req.status !== 'approved' &&
        req.status !== 'limited_approved' &&
        req.status !== 'rejected' &&
        req.status !== 'payment_pending' &&
        req.status !== 'access_active'
      )
        return false;
    }

    if (confidenceFilter !== 'all' && req.matchConfidence !== confidenceFilter) {
      return false;
    }

    if (search) {
      const q = search.toLowerCase();
      const matchId = req.id.toLowerCase().includes(q);
      const matchMouza = req.parcelDetails.mouza.toLowerCase().includes(q);
      const matchDag = req.parcelDetails.dagNumber.toLowerCase().includes(q);
      const matchCitizen = req.userName.toLowerCase().includes(q);
      return matchId || matchMouza || matchDag || matchCitizen;
    }

    return true;
  });

  const handleOpenDecision = (req: AccessRequest) => {
    setSelectedReq(req);
    setDecisionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {t.reviewer.dashboardTitle}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {t.reviewer.dashboardSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-md bg-teal-50 border border-teal-200 text-xs font-semibold text-gov-primary flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-gov-primary" />
            {t.reviewer.officerTitle}
          </span>
        </div>
      </div>

      {/* SLA & Action KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter('pending')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'pending'
              ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-amber-800 text-[11px] font-medium block">
            {t.reviewer.pendingQueue}
          </span>
          <span className="text-xl font-bold text-amber-900 mt-0.5 block">{counts.pending}</span>
        </button>

        <button
          onClick={() => setStatusFilter('pending')}
          className="p-3.5 rounded-lg border bg-white border-slate-200 hover:border-slate-300 text-left"
        >
          <span className="text-slate-500 text-[11px] font-medium block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gov-primary" /> {t.reviewer.slaQueue}
          </span>
          <span className="text-xl font-bold text-slate-900 mt-0.5 block">{counts.nearingSla}</span>
        </button>

        <button
          onClick={() => setStatusFilter('more_info')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'more_info'
              ? 'bg-orange-50/80 border-orange-300 ring-1 ring-orange-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-orange-800 text-[11px] font-medium block">
            {t.reviewer.moreInfoQueue}
          </span>
          <span className="text-xl font-bold text-orange-900 mt-0.5 block">{counts.moreInfo}</span>
        </button>

        <button
          onClick={() => setStatusFilter('decided')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            statusFilter === 'decided'
              ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-emerald-800 text-[11px] font-medium block">
            {t.reviewer.decidedQueue}
          </span>
          <span className="text-xl font-bold text-emerald-900 mt-0.5 block">{counts.decided}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={
              language === 'bn'
                ? 'আবেদন আইডি, নাগরিকের নাম, মৌজা বা দাগ দিয়ে খুঁজুন...'
                : 'Search by Request ID, Citizen, Mouza, or Dag...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-gov-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-1.5 rounded border border-slate-300 bg-white text-slate-700"
          >
            <option value="pending">
              {language === 'bn' ? `অপেক্ষমাণ কিউ (${counts.pending})` : `Queue: Pending Review (${counts.pending})`}
            </option>
            <option value="more_info">
              {language === 'bn' ? `অতিরিক্ত তথ্য কিউ (${counts.moreInfo})` : `Queue: More Info (${counts.moreInfo})`}
            </option>
            <option value="decided">
              {language === 'bn' ? `নিষ্পত্তিকৃত কিউ (${counts.decided})` : `Queue: Decided (${counts.decided})`}
            </option>
            <option value="all">
              {language === 'bn' ? `সকল আবেদন (${requests.length})` : `All Dossiers (${requests.length})`}
            </option>
          </select>

          <select
            value={confidenceFilter}
            onChange={(e) => setConfidenceFilter(e.target.value)}
            className="text-xs p-1.5 rounded border border-slate-300 bg-white text-slate-700"
          >
            <option value="all">{language === 'bn' ? 'সকল রেকর্ড ম্যাচিং' : 'All Match Confidences'}</option>
            <option value="exact">{language === 'bn' ? 'শতভাগ মিল (Exact)' : 'Exact Matches'}</option>
            <option value="partial">{language === 'bn' ? 'আংশিক মিল (Partial)' : 'Partial Matches'}</option>
            <option value="ambiguous">{language === 'bn' ? 'দ্বন্দ্বপূর্ণ / ওভারল্যাপ' : 'Ambiguous / Overlap'}</option>
            <option value="no_match">{language === 'bn' ? 'কোনো রেকর্ড নেই' : 'No Match in Feed'}</option>
          </select>
        </div>
      </div>


      {/* Reviewer Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {filteredRequests.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">
              {language === 'bn' ? 'এই কিউতে কোনো আবেদন নেই।' : 'No requests in this review queue.'}
            </p>
            <p>
              {language === 'bn'
                ? 'অন্য কিউ নির্বাচন করুন বা ফিল্টার পরিবর্তন করুন।'
                : 'Select another queue tab or clear your search filters.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'আবেদন আইডি' : 'Request ID'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'দাখিলের তারিখ' : 'Submitted'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'নাগরিক ও পরিচয়' : 'Citizen / Identity'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'জমির বিবরণ' : 'Parcel Identification'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'তথ্যের পরিধি' : 'Requested Scope'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'রেকর্ড মিল' : 'Match Confidence'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'এসএলএ সময়সীমা' : 'SLA Deadline'}</th>
                    <th className="py-3 px-4 font-semibold text-right">{language === 'bn' ? 'সিদ্ধান্ত' : 'Adjudication'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((req) => {
                    const remaining = getTimeRemaining(req.targetDeadline);
                    return (
                      <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-slate-900">
                          {req.id}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {formatDateTime(req.submittedAt)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{req.userName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {req.userMaskedNid}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">
                            {language === 'bn'
                              ? `দাগ ${req.parcelDetails.dagNumber}, মৌজা ${req.parcelDetails.mouza}`
                              : `Dag ${req.parcelDetails.dagNumber}, Mouza ${req.parcelDetails.mouza}`}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {req.parcelDetails.upazila}, {req.parcelDetails.district}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                            {req.requestedCategories.length} {language === 'bn' ? 'ক্যাটাগরি' : 'categories'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              req.matchConfidence === 'exact'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : req.matchConfidence === 'ambiguous'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            {req.matchConfidence.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[11px] ${
                              remaining.isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-600'
                            }`}
                          >
                            {remaining.text}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <Link
                            to={`/reviewer/requests/${req.id}`}
                            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors inline-block"
                          >
                            {t.reviewer.inspectDossier}
                          </Link>

                          {(req.status === 'submitted' || req.status === 'under_review') && (
                            <button
                              onClick={() => handleOpenDecision(req)}
                              className="px-2.5 py-1 text-xs font-semibold text-white bg-gov-primary hover:bg-gov-primaryHover rounded transition-colors shadow-2xs"
                            >
                              {t.reviewer.adjudicate}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <div key={req.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">{req.id}</span>
                    <RequestStatusBadge status={req.status} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {language === 'bn'
                        ? `দাগ ${req.parcelDetails.dagNumber}, মৌজা ${req.parcelDetails.mouza}`
                        : `Dag ${req.parcelDetails.dagNumber}, Mouza ${req.parcelDetails.mouza}`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'bn' ? 'আবেদনকারী:' : 'Citizen:'} {req.userName} • {req.parcelDetails.upazila}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 font-mono text-[11px]">
                      {language === 'bn' ? 'ম্যাচ:' : 'Confidence:'} <strong>{req.matchConfidence}</strong>
                    </span>
                    <div className="space-x-2">
                      <Link
                        to={`/reviewer/requests/${req.id}`}
                        className="font-semibold text-slate-700 hover:underline"
                      >
                        {t.reviewer.inspectDossier}
                      </Link>
                      {(req.status === 'submitted' || req.status === 'under_review') && (
                        <button
                          onClick={() => handleOpenDecision(req)}
                          className="px-2.5 py-1 bg-gov-primary text-white font-semibold rounded text-xs"
                        >
                          {t.reviewer.adjudicate}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>


      {/* Decision Modal if opened */}
      {selectedReq && (
        <DecisionModal
          isOpen={decisionModalOpen}
          onClose={() => setDecisionModalOpen(false)}
          request={selectedReq}
        />
      )}
    </div>
  );
};
