import React from 'react';
import { ParcelReference } from '../../types';
import { DemoDataTag } from '../common/DemoDataTag';
import { LandActivityTimeline } from '../timeline/LandActivityTimeline';
import { getRiskStatusMeta, formatDateTime, getTimeRemaining } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldAlert,
  AlertTriangle,
  Lock,
  Clock,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ParcelRiskOverviewProps {
  parcel: ParcelReference;
  approvedCategories?: string[];
  accessExpiresAt?: string;
  requestId?: string;
  isExpired?: boolean;
}

export const ParcelRiskOverview: React.FC<ParcelRiskOverviewProps> = ({
  parcel,
  approvedCategories,
  accessExpiresAt,
  requestId,
  isExpired = false,
}) => {
  const { language } = useLanguage();
  const riskMeta = getRiskStatusMeta(parcel.riskStatus);
  const remaining = accessExpiresAt ? getTimeRemaining(accessExpiresAt) : null;

  if (isExpired) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto mb-3">
          <Lock className="w-6 h-6 text-slate-600" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          {language === 'bn' ? 'তথ্য প্রদর্শনের সময়সীমা শেষ হয়েছে' : 'Viewing Window Has Expired'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
          {language === 'bn'
            ? 'প্ল্যাটফর্মের নিরাপত্তা নীতিমালা অনুযায়ী এই প্লটের অনুমোদিত তথ্য দেখার কার্যকাল শেষ হয়েছে। সংবেদনশীল সংকেতসমূহ পুনরায় লক করা হয়েছে।'
            : 'The permitted access period for this parcel has lapsed according to platform security policy. Restricted transaction signals are now locked.'}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link
            to="/citizen/new-request"
            className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md transition-colors"
          >
            {language === 'bn' ? 'নতুন আবেদন জমা দিন' : 'Submit New Request'}
          </Link>
          <Link
            to="/citizen/requests"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
          >
            {language === 'bn' ? 'আমার আবেদনসমূহে ফিরুন' : 'Back to My Requests'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner: Controlled Access Window & DEMO DATA Tag */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <DemoDataTag type="demo_data" />
          <DemoDataTag type="simulated_source" sourceName={parcel.mockSource} />
        </div>

        {accessExpiresAt && (
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-gov-primary" />
            <span className="text-slate-600">
              {language === 'bn' ? 'সক্রিয় উইন্ডো:' : 'Active Window:'}
            </span>
            <span className={`font-semibold ${remaining?.isOverdue ? 'text-rose-600' : 'text-emerald-700'}`}>
              {remaining?.text}
            </span>
            <span className="text-slate-400 text-[10px]">({formatDateTime(accessExpiresAt)})</span>
          </div>
        )}
      </div>

      {/* Primary Parcel Identification Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-50 text-gov-primary border border-teal-200 text-xs font-semibold">
                {language === 'bn' ? `প্লট আইডি: ${parcel.id}` : `Parcel ID: ${parcel.id}`}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? `সর্বশেষ হালনাগাদ: ${formatDateTime(parcel.lastUpdated)}` : `Last Refreshed: ${formatDateTime(parcel.lastUpdated)}`}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-1.5 flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-gov-primary shrink-0" />
              {language === 'bn'
                ? `মৌজা ${parcel.mouza}, দাগ (প্লট) ${parcel.dagNumber}`
                : `Mouza ${parcel.mouza}, Dag (Plot) ${parcel.dagNumber}`}
            </h2>

            <p className="text-xs text-slate-600 mt-1">
              {language === 'bn' ? (
                <>
                  উপজেলা: <strong className="text-slate-800">{parcel.upazila}</strong>, জেলা:{' '}
                  <strong className="text-slate-800">{parcel.district}</strong>, বিভাগ:{' '}
                  <strong className="text-slate-800">{parcel.division}</strong>
                </>
              ) : (
                <>
                  Upazila: <strong>{parcel.upazila}</strong>, District: <strong>{parcel.district}</strong>, Division:{' '}
                  <strong>{parcel.division}</strong>
                </>
              )}
            </p>
          </div>

          {/* Demo Attention Score (Explainable, clearly marked non-legal) */}
          {parcel.demoAttentionScore !== undefined && (
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-left sm:text-right sm:min-w-[200px]">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {language === 'bn' ? 'ডেমো মনোযোগ সূচক' : 'Demo Attention Score'}
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">
                {parcel.demoAttentionScore}
                <span className="text-xs font-normal text-slate-400"> / 100</span>
              </div>
              <p className="text-[10px] text-amber-700 font-medium mt-0.5">
                {language === 'bn' ? '*কোনো আইনি বা মালিকানার রায় নয়' : '*Not a legal finding or title score'}
              </p>
            </div>
          )}
        </div>

        {/* Detailed Parcel Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'জে.এল. নম্বর' : 'J.L. Number'}
            </span>
            <span className="font-semibold text-slate-800">{parcel.jlNumber || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'খতিয়ান নম্বর' : 'Khatian Number'}
            </span>
            <span className="font-semibold text-slate-800">
              {parcel.khatianNumber ? `${parcel.khatianNumber} (${parcel.khatianType || 'RS'})` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'জমির পরিমাণ' : 'Recorded Area'}
            </span>
            <span className="font-semibold text-slate-800">
              {parcel.area
                ? `${parcel.area} ${parcel.areaUnit || (language === 'bn' ? 'শতাংশ' : 'Decimal')}`
                : (language === 'bn' ? 'অঘোষিত' : 'Not declared')}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'আওতাধীন সাব-রেজিস্ট্রি' : 'Jurisdiction Sub-Registry'}
            </span>
            <span className="font-semibold text-slate-800">
              {parcel.upazila} {language === 'bn' ? 'যুগ্ম সাব-রেজিস্ট্রি' : 'Joint Sub-Registry'}
            </span>
          </div>
        </div>

        {parcel.boundaryNotes && (
          <div className="pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400 text-[11px] block font-medium">
              {language === 'bn' ? 'জমির চারপাশের সীমানা (চৌহদ্দি):' : 'Boundary Demarcation Notes (Chouhoddi):'}
            </span>
            <p className="text-slate-700 mt-1 font-mono text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
              {parcel.boundaryNotes}
            </p>
          </div>
        )}
      </div>

      {/* Plain-Language Transaction Signal Box */}
      <div className={`p-5 rounded-lg border ${riskMeta.badgeClass} space-y-2`}>
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-inherit" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-sm text-inherit uppercase tracking-wide">
                {language === 'bn' ? 'সহজ ভাষার লেনদেন সংকেত বিশ্লেষণ:' : 'Plain-Language Signal Assessment:'}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/70 border border-current">
                {parcel.matchConfidence.toUpperCase()} {language === 'bn' ? 'ম্যাচ কনফিডেন্স' : 'CONFIDENCE'}
              </span>
            </div>

            <p className="font-bold text-base mt-1 text-slate-900">
              {riskMeta.label}
            </p>

            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              {parcel.riskSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Pre-Purchase Disclaimer */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {language === 'bn'
              ? 'ক্রয়-পূর্ব আবশ্যিক আইনি সতর্কতা ও সীমাবদ্ধতা'
              : 'Mandatory Pre-Purchase Warning & Scope Limitations'}
          </p>
          <p className="leading-relaxed">
            {language === 'bn'
              ? '“এটি কোনো আইনি রায় বা দলিলের নিশ্চয়তা নয়। জমি ক্রয়ের পূর্বে ইউনিয়ন ভূমি অফিস এবং সাব-রেজিস্ট্রি অফিসে গিয়ে বায়া দলিল ও খতিয়ান যাচাই করুন। ল্যান্ডটেক বিডি সিমুলেটেড ফিড থেকে সংগৃহীত সংকেত প্রদান করে, যা মূল দলিল পরীক্ষণ বা সহকারী কমিশনার (ভূমি) আদালতের নামজারি আদেশের বিকল্প নয়।”'
              : '“This is not a legal finding or ownership guarantee. Verify with relevant official offices and qualified professionals before purchase. LandTech BD provides transaction signals compiled from simulated feeds. It does not replace physical chain-of-title vetting (CS, SA, RS, BS records), certified deed volume inspection at the Sub-Registry, or mutation verification at the Upazila AC (Land) office.”'}
          </p>
        </div>
      </div>

      {/* Chronological Event Activity Timeline */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs">
        <LandActivityTimeline
          events={parcel.events}
          approvedCategories={approvedCategories}
        />
      </div>

      {/* Audit History & Nav Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            {language === 'bn'
              ? 'এই প্লটে তথ্য দেখার ও কর্মকর্তার সিদ্ধান্তের প্রতিটি পদক্ষেপ অপরিবর্তনীয় অডিট ট্রেইলে সংরক্ষিত থাকে।'
              : 'Every access and reviewer decision on this parcel is recorded in the immutable audit log.'}
          </span>
        </div>
        <Link
          to={`/auditor?req=${requestId || ''}`}
          className="text-gov-primary hover:underline font-semibold inline-flex items-center gap-1 shrink-0"
        >
          {language === 'bn' ? 'অডিট ইভেন্ট দেখুন' : 'View Audit Events'} <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
