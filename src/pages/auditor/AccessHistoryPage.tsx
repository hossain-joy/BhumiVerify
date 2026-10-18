import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDateTime, getTimeRemaining } from '../../lib/utils';
import { Lock, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AccessHistoryPage: React.FC = () => {
  const { requests } = useApp();
  const { language } = useLanguage();

  const accessTokens = requests.filter(
    (r) => r.status === 'access_active' || r.status === 'expired' || !!r.payment
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn'
                ? 'নিয়ন্ত্রিত সংকেত প্রবেশাধিকার অডিট লগ'
                : 'Controlled Signal Access Log'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'যাচাইকৃত আবেদনকারীদের অনুকূলে জারিকৃত সকল অস্থায়ী টোকেন ও তথ্য দেখার সময়ের কমপ্লায়েন্স অডিট।'
              : 'Audit of all temporary signal disclosure tokens granted to verified applicants.'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {accessTokens.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            {language === 'bn'
              ? 'এখনো কোনো ডিসক্লোজার টোকেন জারি করা হয়নি।'
              : 'No access tokens granted yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <th className="py-3 px-4">
                    {language === 'bn' ? 'আবেদন / টোকেন আইডি' : 'Request / Token ID'}
                  </th>
                  <th className="py-3 px-4">
                    {language === 'bn' ? 'আবেদনকারী' : 'Applicant'}
                  </th>
                  <th className="py-3 px-4">
                    {language === 'bn' ? 'উদ্দিষ্ট জমি' : 'Target Parcel'}
                  </th>
                  <th className="py-3 px-4">
                    {language === 'bn' ? 'অনুমোদিত ক্যাটাগরি' : 'Approved Categories'}
                  </th>
                  <th className="py-3 px-4">
                    {language === 'bn' ? 'মেয়াদোত্তীর্ণের সময়' : 'Expiry Window'}
                  </th>
                  <th className="py-3 px-4">
                    {language === 'bn' ? 'টোকেন স্থিতি' : 'Access State'}
                  </th>
                  <th className="py-3 px-4 text-right">
                    {language === 'bn' ? 'পরিদর্শন' : 'Inspect'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accessTokens.map((req) => {
                  const remaining = req.accessExpiresAt ? getTimeRemaining(req.accessExpiresAt) : null;
                  const isActive = req.status === 'access_active';

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                        {req.id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800">
                        {req.userName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-900 font-semibold">
                        {language === 'bn' ? 'দাগ ' : 'Dag '}
                        {req.parcelDetails.dagNumber}, {req.parcelDetails.mouza}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {language === 'bn'
                            ? `${(req.approvedCategories || []).length} টি ক্যাটাগরি অনুমোদিত`
                            : `${(req.approvedCategories || []).length} categories permitted`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {req.accessExpiresAt ? formatDateTime(req.accessExpiresAt) : 'N/A'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          {isActive
                            ? (language === 'bn' ? `সক্রিয় (${remaining?.text})` : `Active (${remaining?.text})`)
                            : (language === 'bn' ? 'মেয়াদোত্তীর্ণ / লকড' : 'Expired / Locked')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/citizen/requests/${req.id}`}
                          className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>{language === 'bn' ? 'ডসিয়ার' : 'Inspect'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
