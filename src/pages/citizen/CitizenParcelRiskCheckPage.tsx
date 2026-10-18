import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { ParcelRiskOverview } from '../../components/land/ParcelRiskOverview';
import { getRiskStatusMeta } from '../../lib/utils';
import {
  Search,
  MapPin,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

export const CitizenParcelRiskCheckPage: React.FC = () => {
  const { parcels, requests, currentUser } = useApp();
  const { language } = useLanguage();

  const userRequests = requests.filter((r) => r.userId === currentUser.id);
  const activeRequests = userRequests.filter((r) => r.status === 'access_active');

  // Selected demo parcel for sandbox preview or active inspection
  const [selectedParcelId, setSelectedParcelId] = useState<string>(
    activeRequests.length > 0 && activeRequests[0].parcelId
      ? activeRequests[0].parcelId
      : 'DEMO-PARCEL-001'
  );

  const currentParcel = parcels.find((p) => p.id === selectedParcelId) || parcels[0];
  const activeReqForParcel = activeRequests.find((r) => r.parcelId === currentParcel.id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn'
                ? 'জমির রেজিস্ট্রেশন-পূর্ব সংকেত ও ঝুঁকি যাচাই'
                : 'Parcel Pre-Registration Signal & Risk Check'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সাব-রেজিস্ট্রি দলিল হস্তান্তর, ই-নামজারি আবেদন ও ধারা ৮৯ এলটি নোটিশ সংক্রান্ত তথ্য পরীক্ষণ।'
              : 'Examine transaction signals, Sub-Registry deeds, e-mutation cases, and Section 89 statutory alerts.'}
          </p>
        </div>

        <Link
          to="/citizen/new-request"
          className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Search className="w-4 h-4" />
          {language === 'bn' ? 'নতুন প্লটের তথ্য আবেদন' : 'Request New Parcel Disclosure'}
        </Link>
      </div>

      {/* Active Unlocked Disclosures Banner */}
      {activeRequests.length > 0 ? (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {language === 'bn'
              ? 'আপনার সেশনে সক্রিয় প্রবেশাধিকার পাওয়া আবেদনসমূহ:'
              : 'Active Permitted Disclosures Available in Your Session:'}
          </div>
          <div className="flex flex-wrap gap-2">
            {activeRequests.map((req) => (
              <button
                key={req.id}
                onClick={() => req.parcelId && setSelectedParcelId(req.parcelId)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedParcelId === req.parcelId
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs ring-2 ring-emerald-300'
                    : 'bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <span>
                  {language === 'bn' ? 'দাগ ' : 'Dag '}
                  {req.parcelDetails.dagNumber}, {req.parcelDetails.mouza}
                </span>
                <span className="text-[10px] bg-emerald-800 text-white px-1.5 py-0.2 rounded font-mono">
                  {req.id}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5">
          <Layers className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'bn' ? (
              <>
                বর্তমানে আপনার কোনো সক্রিয় পেইড তথ্য সেশন নেই। নিচে আপনি{' '}
                <strong>ইন্টারেক্টিভ ডেমো স্যান্ডবক্স</strong> দেখছেন। বাস্তব প্লটের অনুমোদিত তথ্য দেখতে নতুন আবেদন জমা দিন।
              </>
            ) : (
              <>
                You currently have no active paid disclosure sessions. You are viewing the{' '}
                <strong>Interactive Demo Sandbox</strong> below. To obtain authorized access for a live parcel, submit an information request for official review.
              </>
            )}
          </p>
        </div>
      )}

      {/* Parcel Selection Switcher */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gov-primary" />
            {language === 'bn'
              ? 'পরীক্ষণের জন্য নমুনা প্লটের দৃশ্যপট নির্বাচন করুন:'
              : 'Select Demo Scenario Plot to Inspect:'}
          </span>
          <DemoDataTag type="simulated_source" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {parcels.map((p) => {
            const isSelected = p.id === selectedParcelId;
            const meta = getRiskStatusMeta(p.riskStatus);
            return (
              <button
                key={p.id}
                onClick={() => setSelectedParcelId(p.id)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-gov-primary bg-teal-50/60 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                      {p.id}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {p.matchConfidence.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gov-primary" />
                    {language === 'bn'
                      ? `মৌজা ${p.mouza}, দাগ ${p.dagNumber}`
                      : `Mouza ${p.mouza}, Dag ${p.dagNumber}`}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {p.upazila}, {p.district}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px]">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded font-semibold ${
                      meta.severity === 'high'
                        ? 'bg-amber-100 text-amber-900'
                        : meta.severity === 'medium'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {language === 'bn'
                      ? meta.severity === 'high'
                        ? 'উচ্চ সংকেত'
                        : meta.severity === 'medium'
                        ? 'মাঝারি সংকেত'
                        : 'নিয়মিত রেকর্ড'
                      : `${meta.severity.toUpperCase()} ATTENTION`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the full ParcelRiskOverview */}
      {currentParcel && (
        <ParcelRiskOverview
          parcel={currentParcel}
          approvedCategories={activeReqForParcel?.approvedCategories}
          accessExpiresAt={activeReqForParcel?.accessExpiresAt}
          requestId={activeReqForParcel?.id}
        />
      )}
    </div>
  );
};
