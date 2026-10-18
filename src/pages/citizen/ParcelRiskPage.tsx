import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { ParcelRiskOverview } from '../../components/land/ParcelRiskOverview';
import { Lock, AlertCircle, ArrowLeft, ShieldAlert } from 'lucide-react';
import { DemoDataTag } from '../../components/common/DemoDataTag';

export const ParcelRiskPage: React.FC = () => {
  const { parcelId } = useParams<{ parcelId: string }>();
  const [searchParams] = useSearchParams();
  const reqId = searchParams.get('req');

  const { parcels, requests, currentRole } = useApp();
  const { language } = useLanguage();

  // Find the parcel
  const parcel = parcels.find((p) => p.id === parcelId);

  // Find the associated request (if any)
  const req = reqId
    ? requests.find((r) => r.id === reqId)
    : requests.find((r) => r.parcelId === parcelId && r.status === 'access_active');

  // Business Rule: Citizens can access only after approval, payment, and before expiry.
  // Official roles (reviewer, auditor, admin) can inspect for cadastral evaluation.
  const isOfficialRole = currentRole === 'reviewer' || currentRole === 'auditor' || currentRole === 'admin';
  const hasActiveAccess = isOfficialRole || (req && req.status === 'access_active');
  const isExpired = !isOfficialRole && req?.status === 'expired';

  if (!parcel) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center max-w-md mx-auto space-y-3">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-base font-semibold text-slate-900">
          {language === 'bn' ? 'জমির রেকর্ড পাওয়া যায়নি' : 'Parcel Not Found'}
        </h3>
        <p className="text-xs text-slate-500">
          {language === 'bn'
            ? `অনুরোধকৃত ডেমো পার্সেল আইডি (${parcelId}) লোকাল ক্যাশে নেই।`
            : `The requested demo parcel ID (${parcelId}) does not exist in local demo cache.`}
        </p>
        <Link
          to="/citizen"
          className="inline-block px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md transition-colors"
        >
          {language === 'bn' ? 'ড্যাশবোর্ডে ফিরে যান' : 'Return to Dashboard'}
        </Link>
      </div>
    );
  }

  // Access Gate Block if not permitted
  if (!hasActiveAccess && !isExpired) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mx-auto border border-amber-200">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              {language === 'bn' ? 'তথ্য প্রবেশাধিকার সংরক্ষিত (গেট লকড)' : 'Access Gate Locked'}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">
              {language === 'bn'
                ? 'নিয়ন্ত্রিত ভূমি তথ্য প্রাপ্তি নীতিমালা'
                : 'Controlled Land-Information Access Policy'}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto leading-relaxed">
              {language === 'bn'
                ? 'ল্যান্ডটেক বিডি এর নিরাপত্তা কাঠামো অনুযায়ী সাব-রেজিস্ট্রির দলিল হস্তান্তর বা নামজারি ফিড সাধারণ জনগণের জন্য উন্মুক্ত বা আনসাবস্ক্রাইবড ব্রাউজিংয়ের সুযোগ নেই। একজন যাচাইকৃত নাগরিককে নির্দিষ্ট বৈধ উদ্দেশ্যে আবেদন করতে হবে, কর্মকর্তা কর্তৃক অনুমোদিত হতে হবে এবং ডেমো ফি পরিশোধের পরেই তথ্য দেখার সুযোগ মিলবে।'
                : 'Under LandTech BD security architecture, raw transaction signals and Sub-Registry deed transfer feeds cannot be searched publicly or browsed anonymously. A verified citizen must submit an inquiry, obtain reviewing officer approval, and settle the simulated fee before disclosure is unlocked.'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">
                {language === 'bn' ? 'আবেদনকৃত জমি:' : 'Requested Parcel:'}
              </span>
              <span className="font-semibold text-slate-800">
                {parcel.mouza}, {language === 'bn' ? 'দাগ ' : 'Dag '} {parcel.dagNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                {language === 'bn' ? 'এলাকা:' : 'Jurisdiction:'}
              </span>
              <span>{parcel.upazila}, {parcel.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">
                {language === 'bn' ? 'অনুমোদনের স্থিতি:' : 'Authorization State:'}
              </span>
              <span className="font-semibold text-rose-700">
                {language === 'bn' ? 'অননুমোদিত / নিষ্পন্নাধীন' : 'Unauthorized / Pending Review'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/citizen/new-request"
              className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              {language === 'bn' ? 'এই দাগের জন্য তথ্য আবেদন করুন' : 'Submit Access Request for This Plot'}
            </Link>
            <Link
              to="/citizen/requests"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors border border-slate-300"
            >
              {language === 'bn' ? 'আমার আবেদনসমূহ দেখুন' : 'View My Requests'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/citizen/requests"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'আবেদন তালিকায় ফিরুন' : 'Back to My Requests'}</span>
        </Link>
        <div className="flex items-center gap-2">
          {isOfficialRole && (
            <span className="text-xs font-semibold bg-teal-50 text-gov-primary px-2.5 py-0.5 rounded border border-teal-200">
              {language === 'bn' ? 'অফিসিয়াল ক্যাডাস্ট্রাল মূল্যায়ন মোড' : 'Official Review Mode'}
            </span>
          )}
          <DemoDataTag type="demo_data" />
          {req && (
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
              {language === 'bn' ? 'সেশন রেফারেন্স:' : 'Session Ref:'} {req.id}
            </span>
          )}
        </div>
      </div>

      <ParcelRiskOverview
        parcel={parcel}
        approvedCategories={req?.approvedCategories}
        accessExpiresAt={req?.accessExpiresAt}
        requestId={req?.id}
        isExpired={isExpired}
      />
    </div>
  );
};
