import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import {
  MapPin,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ParcelMatchReviewPage: React.FC = () => {
  const { parcels } = useApp();
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn'
                ? 'মৌজা ও দাগ নিরীক্ষা — ক্যাডাস্ট্রাল ম্যাচিং'
                : 'Parcel Match Confidence & Cadastral Feeds'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সিমুলেটেড সাব-রেজিস্ট্রি দলিল ও ইউনিয়ন ভূমি সহকারী কর্মকর্তার খতিয়ান সূচকের তুলনামূলক নিরীক্ষা।'
              : 'Cadastral index comparison across simulated registration feeds and revenue circles.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parcels.map((parcel) => {
          return (
            <div
              key={parcel.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-gov-primary bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {parcel.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase border ${
                      parcel.matchConfidence === 'exact'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : parcel.matchConfidence === 'ambiguous'
                        ? 'bg-rose-50 text-rose-800 border-rose-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {language === 'bn'
                      ? parcel.matchConfidence === 'exact'
                        ? 'সঠিক মিল (নিশ্চিত)'
                        : parcel.matchConfidence === 'ambiguous'
                        ? 'অস্পষ্ট / দ্বৈত মিল'
                        : 'সম্ভাব্য মিল'
                      : `${parcel.matchConfidence} Match`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gov-primary shrink-0" />
                  {language === 'bn'
                    ? `মৌজা ${parcel.mouza}, দাগ ${parcel.dagNumber}`
                    : `Mouza ${parcel.mouza}, Dag ${parcel.dagNumber}`}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {parcel.upazila}, {parcel.district} • J.L. {parcel.jlNumber} • {language === 'bn' ? 'খতিয়ান' : 'Khatian'}{' '}
                  {parcel.khatianNumber} ({parcel.khatianType})
                </p>

                <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 block text-[11px] mb-1">
                    {language === 'bn' ? 'সিগন্যাল ডায়াগনসিস:' : 'Signal Diagnosis:'}
                  </span>
                  <p className="text-slate-700 leading-snug">{parcel.riskSummary}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  {parcel.events.length}{' '}
                  {language === 'bn' ? 'টি সিমুলেটেড ইভেন্ট' : 'simulated feed events'}
                </span>
                <Link
                  to={`/citizen/parcel-overview/${parcel.id}`}
                  className="font-semibold text-gov-primary hover:underline flex items-center gap-1 text-xs"
                >
                  {language === 'bn' ? 'সম্পূর্ণ টাইমলাইন দেখুন' : 'Inspect Full Timeline'}{' '}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 space-y-1">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          {language === 'bn' ? 'ক্যাডাস্ট্রাল অস্পষ্টতা ও দ্বৈত দাগ নিষ্পত্তির নিয়ম' : 'Cadastral Ambiguity Handling Rule'}
        </span>
        <p className="leading-relaxed">
          {language === 'bn'
            ? 'আবেদনকারীর দাগ ও খতিয়ান যদি ঐতিহাসিক জরিপের সাথে অসামঞ্জস্যপূর্ণ হয় (যেমন এসএ ও আরএস সিটের দ্বৈত দাগ), তবে সিস্টেম অস্পষ্ট / দ্বৈত মিল অ্যালার্ট জারি করে। স্বয়ংক্রিয় অনুমোদন নিষিদ্ধ এবং সরজমিনে কানুনগো তদন্ত প্রতিবেদন তলব করতে হয়।'
            : 'If an applicant submits parcel identifiers that conflict with historic survey maps (e.g. Plot 999 between SA sheet and RS sheet), the system generates an Ambiguous / Conflicting Match alert. Automated approval is prohibited; physical survey cross-examination must be requisitioned.'}
        </p>
      </div>
    </div>
  );
};
