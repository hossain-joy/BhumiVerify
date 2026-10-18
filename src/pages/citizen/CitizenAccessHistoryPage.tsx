import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDateTime, getTimeRemaining, formatBDT } from '../../lib/utils';
import { Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const CitizenAccessHistoryPage: React.FC = () => {
  const { requests, currentUser } = useApp();
  const { language } = useLanguage();

  const userRequests = requests.filter((r) => r.userId === currentUser.id);
  const tokenRequests = userRequests.filter(
    (r) => r.status === 'access_active' || r.status === 'expired' || !!r.payment
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn'
                ? 'তথ্য প্রকাশের অ্যাক্সেস হিস্ট্রি ও ভাউচার'
                : 'Signal Disclosure Access History & Vouchers'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'অস্থায়ী ডিসক্লোজার টোকেন, সক্রিয় তথ্য দেখার সময়সীমা এবং নমুনা ফি রসিদের তালিকা।'
              : 'Log of temporary disclosure tokens, active viewing countdowns, and simulated fee vouchers.'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {tokenRequests.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-2">
            <Clock className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">
              {language === 'bn'
                ? 'কোনো সক্রিয় বা পূর্বের তথ্য প্রকাশের সেশন নেই।'
                : 'No active or past disclosure sessions.'}
            </p>
            <p>
              {language === 'bn'
                ? 'কর্মকর্তার অনুমোদন ও পেমেন্ট সম্পন্ন হলে আপনার সেশন এখানে প্রদর্শিত হবে।'
                : 'Once a reviewing officer approves your request and payment is recorded, your sessions appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'আবেদন রেফারেন্স' : 'Request Reference'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'নির্দিষ্ট প্লট' : 'Target Parcel'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'ভাউচার / রসিদ' : 'Voucher / Receipt'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'অনুমোদিত পরিসর' : 'Permitted Scope'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'মেয়াদকাল' : 'Validity Window'}
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    {language === 'bn' ? 'অবস্থা' : 'State'}
                  </th>
                  <th className="py-3 px-4 font-semibold text-right">
                    {language === 'bn' ? 'পদক্ষেপ' : 'Action'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tokenRequests.map((req) => {
                  const remaining = req.accessExpiresAt ? getTimeRemaining(req.accessExpiresAt) : null;
                  const isActive = req.status === 'access_active';

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                        {req.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">
                          {language === 'bn' ? 'দাগ ' : 'Dag '}
                          {req.parcelDetails.dagNumber}, {req.parcelDetails.mouza}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {req.parcelDetails.upazila}, {req.parcelDetails.district}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {req.payment ? (
                          <div>
                            <span className="font-mono text-slate-800 font-semibold block text-[11px]">
                              {req.payment.receiptRef}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {formatBDT(req.payment.amountBdt)} via {req.payment.method}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">
                            {language === 'bn' ? 'ফি নথিভুক্ত হয়নি' : 'No fee recorded'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {language === 'bn'
                            ? `${(req.approvedCategories || []).length} টি ক্যাটাগরি`
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
                            ? language === 'bn'
                              ? `সক্রিয় (${remaining?.text})`
                              : `Active (${remaining?.text})`
                            : language === 'bn'
                            ? 'মেয়াদোত্তীর্ণ / লককৃত'
                            : 'Expired / Locked'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {isActive && req.parcelId ? (
                          <Link
                            to={`/citizen/parcel-overview/${req.parcelId}?req=${req.id}`}
                            className="text-xs font-semibold text-gov-primary hover:underline inline-flex items-center gap-1"
                          >
                            {language === 'bn' ? 'সিগন্যাল দেখুন' : 'View Signals'}{' '}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <Link
                            to={`/citizen/requests/${req.id}`}
                            className="text-xs text-slate-500 hover:text-slate-700"
                          >
                            {language === 'bn' ? 'ডসিয়ার' : 'Dossier'}
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 space-y-1">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-gov-primary" />
          {language === 'bn' ? 'সময়সীমাভিত্তিক নিরাপত্তা স্থাপত্য' : 'Time-Locked Security Architecture'}
        </span>
        <p className="leading-relaxed">
          {language === 'bn'
            ? 'অনুমোদিত তথ্য দেখার কার্যকাল শেষ হলে টোকেন স্বয়ংক্রিয়ভাবে অকার্যকর হয়ে যায়। এরপর সংবেদনশীল সাব-রেজিস্ট্রি দলিল ও শুনানির তথ্য পুনঃলক হয়ে যায়।'
            : 'Access tokens automatically expire after the sanctioned review window (default: 72 hours). Once expired, restricted deed identifiers and hearing records are locked.'}
        </p>
      </div>
    </div>
  );
};
