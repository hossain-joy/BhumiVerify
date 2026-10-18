import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_PARCELS, FictionalParcelRecord } from '../data/mockParcels';
import { assessParcel } from '../utils/assessParcel';
import { sortTimelineEvents } from '../utils/sortEvents';
import { formatSafeDate } from '../utils/formatDate';
import { Disclaimer } from '../components/common/Disclaimer';
import {
  ArrowLeft,
  Search,
  RotateCcw,
  Edit3,
  Calendar,
  Clock,
  Layers,
  FileText,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Building,
  Scale,
  FileCheck2,
  FileSpreadsheet,
} from 'lucide-react';

export const ParcelResultsPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState<FictionalParcelRecord | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const match = MOCK_PARCELS.find((p) => p.id === id);
      if (match) {
        setParcel(match);
        return;
      }
    }

    // Default fallback to first scenario if opened directly
    if (MOCK_PARCELS.length > 0) {
      setParcel(MOCK_PARCELS[0]);
    }
  }, [searchParams]);

  if (!parcel) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-4">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-900">
            {isBn ? 'কোনো রেকর্ড পাওয়া যায়নি' : 'No Parcel Record Selected'}
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {isBn
              ? 'অনুগ্রহ করে অনুসন্ধান পাতায় ফিরে গিয়ে একটি জমির পরিচিতি প্রবেশ করান বা নমুনা বাছাই করুন।'
              : 'Please return to the parcel lookup form to enter identifiers or select a sample scenario.'}
          </p>
          <div className="pt-2">
            <Link to="/check" className="btn-primary text-xs px-5 py-2.5 font-bold">
              {isBn ? 'জমি অনুসন্ধান পাতায় যান' : 'Go to Parcel Lookup'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const assessment = assessParcel(parcel);
  const sortedEvents = sortTimelineEvents(parcel.events, 'asc');

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'transfer_related':
        return {
          icon: <FileText className="w-4 h-4 text-purple-700" aria-hidden="true" />,
          label: isBn ? 'হস্তান্তর / রেজিস্ট্রিকৃত দলিল' : 'Transfer-related / registered deed',
          className: 'bg-purple-50 text-purple-900 border-purple-200',
        };
      case 'mutation_application':
        return {
          icon: <FileSpreadsheet className="w-4 h-4 text-blue-700" aria-hidden="true" />,
          label: isBn ? 'নামজারি আবেদন দাখিলকৃত' : 'Mutation application submitted',
          className: 'bg-blue-50 text-blue-900 border-blue-200',
        };
      case 'mutation_completed':
        return {
          icon: <FileCheck2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />,
          label: isBn ? 'নামজারি সম্পন্ন' : 'Mutation completed',
          className: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        };
      default:
        return {
          icon: <Clock className="w-4 h-4 text-slate-600" aria-hidden="true" />,
          label: isBn ? 'অন্যান্য রেকর্ড' : 'General Record',
          className: 'bg-slate-50 text-slate-800 border-slate-200',
        };
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-up max-w-4xl mx-auto">
      {/* 1. Result Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-gov-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {parcel.id}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Fictional sample record
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {isBn ? 'উপলব্ধ তথ্য পর্যালোচনা' : 'Review the available information.'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn ? 'নমুনা ডেটা হালনাগাদের তারিখ: ' : 'Sample data updated: '}
              <span className="font-medium text-slate-700">
                {formatSafeDate(parcel.updatedDate, 'Unknown date')}
              </span>
            </p>
          </div>

          {/* Top Actions: Edit parcel details & New search */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => navigate('/check')}
              className="btn-secondary text-xs px-3.5 py-2 cursor-pointer flex items-center gap-1.5 font-medium"
              title="Return to form with entered values preserved"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'তথ্য পরিবর্তন' : 'Edit parcel details'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/check?clear=1')}
              className="btn-primary text-xs px-4 py-2 font-bold cursor-pointer flex items-center gap-1.5"
              title="Clear values and start a new lookup"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'নতুন অনুসন্ধান' : 'New search'}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {isBn
            ? 'এই প্রতিবেদনে সংগৃহীত কাল্পনিক রেকর্ডের একটি তুলনামূলক বিশ্লেষণ প্রদর্শন করা হয়েছে। এটি বাস্তব কোনো সরকারি মালিকানার প্রমাণ দেয় না।'
            : 'This summary presents an automated rule-based analysis of simulated sample events and identifiers. It does not establish legal title.'}
        </p>
      </div>

      {/* 2. Assessment Summary Card (Only 3 Cautious Statuses, No Fraud Score, Visible Limitation Note) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {isBn ? 'সার্বিক পর্যালোচনা স্থিতি' : 'Assessment Summary'}
            </span>
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${assessment.badgeClass}`}>
                {isBn ? assessment.labelBn : assessment.label}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-semibold text-slate-700 block">
              {assessment.reviewItemsCount} {isBn ? 'টি পর্যালোচ্য বিষয়' : 'review finding(s)'}
            </span>
            <span className="text-[11px] text-slate-400">
              No numerical fraud score used
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isBn ? assessment.summaryBn : assessment.summary}
        </p>

        {/* Visible Limitation Note (Mandatory on every status) */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong>{isBn ? 'সীমাবদ্ধতা নোট:' : 'Limitation Note:'}</strong>{' '}
            {isBn ? assessment.limitationNoteBn : assessment.limitationNote}
          </p>
        </div>
      </section>

      {/* 3. Parcel Summary (Shows only data actually present; absent fields show "Not available in this sample") */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-gov-primary" aria-hidden="true" />
            <span>{isBn ? 'জমির পরিচিতি সারসংক্ষেপ' : 'Parcel Summary'}</span>
          </h2>
          <span className="text-[11px] text-slate-400">
            {isBn ? 'নমুনা রেকর্ড বিশদ' : 'Sample Record Details'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              Division
            </span>
            <span className="font-semibold text-slate-900">{parcel.division || 'Not available in this sample'}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              District
            </span>
            <span className="font-semibold text-slate-900">{parcel.district || 'Not available in this sample'}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              Upazila / Thana
            </span>
            <span className="font-semibold text-slate-900">{parcel.upazila || 'Not available in this sample'}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              Mouza
            </span>
            <span className="font-semibold text-slate-900">{parcel.mouza || 'Not available in this sample'}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              JL Number
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {parcel.jlNumber ?? 'Not available in this sample'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              Khatian Number
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {parcel.khatianNumber || 'Not available in this sample'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              Dag / Plot Number
            </span>
            <span className="font-semibold text-slate-900 font-mono">
              {parcel.dagNumber || 'Not available in this sample'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
              Land Area
            </span>
            <span className="font-semibold text-slate-900">
              {parcel.area ? `${parcel.area} ${parcel.areaUnit}` : 'Not available in this sample'}
            </span>
          </div>
        </div>

        {parcel.landClassification && (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
            <strong>Land Classification:</strong> {parcel.landClassification}
          </div>
        )}
      </section>

      {/* 4. Chronological Event Timeline (3 Distinct Event Types, Never Conflated) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gov-primary" aria-hidden="true" />
              <span>{isBn ? 'কালানুক্রমিক ঘটনার বিবরণ' : 'Chronological Event Timeline'}</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isBn
                ? 'হস্তান্তর দলিল, নামজারি আবেদন এবং চূড়ান্ত নামজারি আদেশ—তিনটি পৃথক ঘটনা।'
                : 'Transfer deeds, mutation petitions, and completed orders are distinct event types.'}
            </p>
          </div>

          <span className="text-[11px] text-slate-400">
            {sortedEvents.length} {isBn ? 'টি ঘটনা' : 'event(s)'}
          </span>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1.5">
            <HelpCircle className="w-6 h-6 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="font-semibold text-slate-700">
              {isBn ? 'এই নমুনায় কোনো ঘটনা অন্তর্ভুক্ত নেই।' : 'No events are included in this sample.'}
            </p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              {isBn
                ? 'নমুনা তথ্যে কোনো ঘটনা না থাকার অর্থ কখনোই এটি নয় যে বাস্তবে কোনো ঘটনা ঘটেনি। সশরীরে তল্লাশ আবশ্যক।'
                : 'This does not establish that no events exist in reality. Always verify official registers directly.'}
            </p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {sortedEvents.map((evt) => {
              const badge = getEventBadge(evt.type);

              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline marker */}
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-gov-primary flex items-center justify-center shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-gov-primary" />
                  </div>

                  {/* Event content card */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/90 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${badge.className}`}>
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                        <h3 className="text-xs font-bold text-slate-900">{evt.title}</h3>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        <span>{formatSafeDate(evt.date, 'Date not available')}</span>
                        {evt.reference ? (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-700">
                              Ref: {evt.reference}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] text-slate-400 italic">
                              Reference not available
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {evt.explanation}
                    </p>

                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                      Fictional sample record • Does not establish legal ownership
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Findings and Review Items (What was detected, Why it matters, Evidence, Missing, Next steps) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gov-primary" aria-hidden="true" />
              <span>{isBn ? 'পর্যালোচ্য পর্যবেক্ষণ ও অনুসন্ধানের কারণ' : 'Findings & Review Items'}</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isBn
                ? 'স্বচ্ছ ও যুক্তিভিত্তিক পর্যালোচনা; কোনো অনুমান বা অভিযোগ নয়।'
                : 'Transparent plain-English breakdown of why each finding matters.'}
            </p>
          </div>
        </div>

        {parcel.findings.length === 0 ? (
          <p className="text-xs text-slate-500 italic">
            No specific review item flagged in this sample.
          </p>
        ) : (
          <div className="space-y-4">
            {parcel.findings.map((finding, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">{finding.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Why it may matter */}
                  <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                      <span>Why it may matter:</span>
                    </span>
                    <p className="text-amber-900 leading-relaxed text-[11px]">
                      {finding.whyItMatters}
                    </p>
                  </div>

                  {/* Sample evidence */}
                  <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200/70 space-y-1">
                    <span className="font-bold text-blue-950 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                      <span>Evidence in sample:</span>
                    </span>
                    <p className="text-blue-900 leading-relaxed text-[11px]">
                      {finding.sampleEvidence}
                    </p>
                  </div>

                  {/* Information still missing */}
                  <div className="p-3 rounded-lg bg-slate-100/70 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                      <span>Information still missing:</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      {finding.missingInfo}
                    </p>
                  </div>

                  {/* Practical next verification step */}
                  <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/70 space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Practical next step:</span>
                    </span>
                    <p className="text-emerald-900 leading-relaxed text-[11px]">
                      {finding.nextStep}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Missing Information (Explicit list distinguishing "not included" vs "confirmed not to exist") */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? 'অনুপস্থিত বা অপর্যাপ্ত তথ্য' : 'Missing Information'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'এই তথ্যগুলো বর্তমান নমুনা রেকর্ডে অন্তর্ভুক্ত নেই। এটি নিশ্চিত করে না যে বাস্তবে এই তথ্য নেই।'
            : 'The following items are not included in this fictional sample. This distinguishes "not present in this sample" from "confirmed not to exist in reality."'}
        </p>

        <ul className="space-y-2 pt-1 text-xs text-slate-700">
          {parcel.missingInformation.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Recommended Next Steps (Actionable Institutional Diligence Guidance) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gov-primary" aria-hidden="true" />
          <span>{isBn ? 'সুপারিশকৃত পরবর্তী স্বাধীন পদক্ষেপসমূহ' : 'Recommended Next Steps'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'অর্থ লেনদেনের পূর্বে স্বাধীনভাবে যে পদক্ষেপগুলো গ্রহণ করা আবশ্যক:'
            : 'Sensible due diligence steps every prospective land buyer should take:'}
        </p>

        <ul className="space-y-2 pt-1 text-xs text-slate-700">
          {parcel.recommendedNextSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100 text-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span className="leading-snug">{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Results Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
        <Link
          to="/about"
          className="text-xs text-gov-primary hover:underline font-semibold flex items-center gap-1"
        >
          <Scale className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isBn ? 'আইনগত প্রেক্ষাপট ও ধারা ৮৯ জানুন' : 'Legal Context & Diligence Rules'}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/check')}
            className="btn-secondary text-xs px-4 py-2 font-medium cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isBn ? 'তথ্য পরিবর্তন' : 'Edit parcel details'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/check?clear=1')}
            className="btn-primary text-xs px-5 py-2 font-bold cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isBn ? 'অন্য জমি যাচাই' : 'Check another parcel'}</span>
          </button>
        </div>
      </div>

      {/* 9. External Official Resource Links Notice */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800">
            {isBn ? 'অফিশিয়াল পোর্টাল রেফারেন্স:' : 'Official Verification Portals:'}
          </span>
          <span className="text-[10px] text-slate-400">
            Opens in new tab • No live data integration
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          BhumiSure has NOT retrieved or verified data from these government services. For authentic live records, consult:
        </p>
        <div className="flex flex-wrap gap-3 pt-1 text-xs">
          <a
            href="https://mutation.land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>e-Mutation Portal (mutation.land.gov.bd)</span>
            <ExternalLink className="w-3 h-3" aria-label="(opens in a new tab)" />
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://land.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gov-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>National Land Portal (land.gov.bd)</span>
            <ExternalLink className="w-3 h-3" aria-label="(opens in a new tab)" />
          </a>
        </div>
      </div>

      {/* 10. Statutory Disclaimer */}
      <Disclaimer compact={false} />
    </div>
  );
};
