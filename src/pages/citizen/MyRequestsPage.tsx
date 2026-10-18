import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { RequestStatus } from '../../types';
import { RequestStatusBadge } from '../../components/requests/RequestStatusBadge';
import { formatDate, getTimeRemaining } from '../../lib/utils';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import {
  FilePlus,
  Search,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const MyRequestsPage: React.FC = () => {
  const { requests, currentUser } = useApp();
  const { t, language } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const userRequests = requests.filter((r) => r.userId === currentUser.id);

  const filtered = userRequests.filter((req) => {
    if (statusFilter !== 'all' && req.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchId = req.id.toLowerCase().includes(q);
      const matchMouza = req.parcelDetails.mouza.toLowerCase().includes(q);
      const matchDag = req.parcelDetails.dagNumber.toLowerCase().includes(q);
      return matchId || matchMouza || matchDag;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'আমার তথ্য আবেদনসমূহ' : 'My Information Requests'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'আবেদনের অবস্থা, সরকারি পর্যালোচনা সিদ্ধান্ত ও তথ্য দেখার সময়সীমা ট্র্যাক করুন।'
              : 'Track status, official review decisions, and active disclosure windows for your land inquiries.'}
          </p>
        </div>

        <Link
          to="/citizen/new-request"
          className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <FilePlus className="w-4 h-4" />
          {t.nav.newRequest}
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={
              language === 'bn'
                ? 'আবেদন আইডি, মৌজা বা দাগ নম্বর দিয়ে খুঁজুন...'
                : 'Search by Request ID, Mouza, or Dag number...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-gov-primary"
          />
        </div>


        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-1.5 rounded border border-slate-300 bg-white text-slate-700 w-full sm:w-auto"
          >
            <option value="all">
              {language === 'bn' ? `সকল অবস্থা (${userRequests.length})` : `All Statuses (${userRequests.length})`}
            </option>
            <option value="under_review">{t.status.under_review}</option>
            <option value="payment_pending">{t.status.payment_pending}</option>
            <option value="access_active">{t.status.access_active}</option>
            <option value="more_info_required">{t.status.more_info_required}</option>
            <option value="rejected">{t.status.rejected}</option>
            <option value="expired">{t.status.expired}</option>
          </select>
        </div>
      </div>

      {/* Requests Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-2">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-slate-700">
              {language === 'bn' ? 'কোনো আবেদন পাওয়া যায়নি।' : 'No requests match your selected filter.'}
            </p>
            <p>
              {language === 'bn'
                ? 'ফিল্টার পরিবর্তন করুন বা নতুন তথ্য আবেদন দাখিল করুন।'
                : 'Try resetting the search filter or submit a new parcel request.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'আবেদন আইডি' : 'Request ID'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'জমির পরিচিতি' : 'Target Parcel Identifiers'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'উদ্দেশ্য' : 'Purpose'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'দাখিলের তারিখ' : 'Submitted'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'এসএলএ সময়সীমা' : 'Target SLA'}</th>
                    <th className="py-3 px-4 font-semibold">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                    <th className="py-3 px-4 font-semibold text-right">{language === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((req) => {
                    const remaining = getTimeRemaining(req.targetDeadline);
                    return (
                      <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                          {req.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">
                            {language === 'bn'
                              ? `দাগ ${req.parcelDetails.dagNumber}, মৌজা ${req.parcelDetails.mouza}`
                              : `Dag ${req.parcelDetails.dagNumber}, Mouza ${req.parcelDetails.mouza}`}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {req.parcelDetails.upazila}, {req.parcelDetails.district}
                            {req.parcelDetails.khatianNumber
                              ? ` • ${language === 'bn' ? 'খতিয়ান' : 'Khatian'} ${req.parcelDetails.khatianNumber}`
                              : ''}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 max-w-[180px] truncate">
                          {req.purpose}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {formatDate(req.submittedAt)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[11px] ${
                              remaining.isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-600'
                            }`}
                          >
                            {remaining.text}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <RequestStatusBadge status={req.status} />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/citizen/requests/${req.id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gov-primary hover:bg-teal-50 rounded transition-colors"
                          >
                            {language === 'bn' ? 'দেখুন' : 'View'} <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filtered.map((req) => (
                <div key={req.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">{req.id}</span>
                    <RequestStatusBadge status={req.status} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gov-primary" />
                      {language === 'bn'
                        ? `মৌজা ${req.parcelDetails.mouza}, দাগ ${req.parcelDetails.dagNumber}`
                        : `Mouza ${req.parcelDetails.mouza}, Dag ${req.parcelDetails.dagNumber}`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {req.parcelDetails.upazila}, {req.parcelDetails.district}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>
                      {language === 'bn' ? 'দাখিল:' : 'Submitted:'} {formatDate(req.submittedAt)}
                    </span>
                    <Link
                      to={`/citizen/requests/${req.id}`}
                      className="text-xs font-bold text-gov-primary hover:underline flex items-center gap-1"
                    >
                      {language === 'bn' ? 'বিস্তারিত দেখুন →' : 'View Details →'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
