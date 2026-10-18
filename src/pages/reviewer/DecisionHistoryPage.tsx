import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDateTime } from '../../lib/utils';
import { FileCheck2, ChevronRight } from 'lucide-react';

export const DecisionHistoryPage: React.FC = () => {
  const { requests } = useApp();
  const { language } = useLanguage();

  const decidedRequests = requests.filter((r) => !!r.reviewerDecision);

  const getDecisionBadgeText = (decision: string) => {
    if (language === 'bn') {
      if (decision === 'approved') return 'পূর্ণ অনুমোদন';
      if (decision === 'limited_approved') return 'সীমিত অনুমোদন';
      if (decision === 'more_info_required') return 'অতিরিক্ত তথ্য তলব';
      if (decision === 'rejected') return 'বাতিল / নামঞ্জুর';
    }
    return decision.replace('_', ' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'রিভিউয়ার সিদ্ধান্তের ইতিহাস' : 'Reviewer Decision History'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'কর্মকর্তার আর্কাইভকৃত সিদ্ধান্ত, আইনি মন্তব্য এবং অনুমোদিত তথ্য প্রদর্শন সময়সীমা।'
              : 'Archived determinations, statutory findings, and approved disclosure windows.'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {decidedRequests.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-2">
            <FileCheck2 className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">
              {language === 'bn' ? 'এখনও কোনো সিদ্ধান্ত রেকর্ড করা হয়নি।' : 'No decisions recorded yet.'}
            </p>
            <p>
              {language === 'bn'
                ? 'রিভিউ ড্যাশবোর্ড থেকে অপেক্ষমাণ আবেদন নিষ্পত্তি করলে এখানে অডিট এন্ট্রি প্রদর্শিত হবে।'
                : 'Adjudicate pending requests from the review dashboard to view audit entries here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'আবেদন আইডি' : 'Request ID'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'জমির পরিচিতি' : 'Parcel Identification'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'সিদ্ধান্ত' : 'Decision'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'কর্মকর্তার মন্তব্য ও কারণ' : 'Officer Finding Note'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'নিষ্পত্তির সময়' : 'Adjudicated At'}
                  </th>
                  <th className="py-3 px-4 font-semibold text-right">
                    {language === 'bn' ? 'ডসিয়ার' : 'Dossier'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {decidedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">
                      {req.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">
                        {language === 'bn' ? 'দাগ ' : 'Dag '}
                        {req.parcelDetails.dagNumber}, {req.parcelDetails.mouza}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'bn' ? 'নাগরিক: ' : 'Citizen: '}
                        {req.userName}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-slate-100 text-slate-800 border border-slate-300">
                        {getDecisionBadgeText(req.reviewerDecision?.decision || '')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 max-w-xs truncate font-mono text-[11px]">
                      {req.reviewerDecision?.note}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {req.reviewerDecision?.decidedAt ? formatDateTime(req.reviewerDecision.decidedAt) : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/reviewer/requests/${req.id}`}
                        className="text-xs font-semibold text-gov-primary hover:underline flex items-center justify-end gap-1"
                      >
                        {language === 'bn' ? 'বিস্তারিত' : 'Details'} <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
