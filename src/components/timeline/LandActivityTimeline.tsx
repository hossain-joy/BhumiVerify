import React from 'react';
import { LandEvent, EventType } from '../../types';
import {
  FileText,
  FileCheck2,
  Clock,
  RefreshCw,
  FileSpreadsheet,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
} from 'lucide-react';
import { DemoDataTag } from '../common/DemoDataTag';
import { formatDate, formatDateTime } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';

interface LandActivityTimelineProps {
  events: LandEvent[];
  approvedCategories?: string[];
  filterCategory?: string;
}

export const LandActivityTimeline: React.FC<LandActivityTimelineProps> = ({
  events,
  approvedCategories,
}) => {
  const { language } = useLanguage();

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'mutation_application':
        return <FileSpreadsheet className="w-4 h-4 text-sky-600" />;
      case 'registered_deed':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'lt_notice':
        return <Layers className="w-4 h-4 text-amber-600" />;
      case 'mutation_completed':
        return <FileCheck2 className="w-4 h-4 text-emerald-600" />;
      case 'record_update':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'data_refreshed':
      default:
        return <RefreshCw className="w-4 h-4 text-slate-500" />;
    }
  };

  const getEventBadge = (type: EventType) => {
    switch (type) {
      case 'mutation_application':
        return {
          label: 'Mutation Application Submitted',
          bengali: 'নামজারি আবেদন দাখিল',
          badgeClass: 'bg-sky-50 text-sky-800 border-sky-300',
        };
      case 'registered_deed':
        return {
          label: 'Registered Deed / Transfer Recorded',
          bengali: 'সাব-রেজিস্ট্রি দলিল হস্তান্তর রেকর্ড',
          badgeClass: 'bg-purple-50 text-purple-800 border-purple-300',
        };
      case 'lt_notice':
        return {
          label: 'LT Notice Recorded (SAT Sec 89)',
          bengali: 'এলটি নোটিশ রেকর্ড (ধারা ৮৯)',
          badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
        };
      case 'mutation_completed':
        return {
          label: 'Mutation Completed (Record Mutated)',
          bengali: 'নামজারি চূড়ান্ত নিষ্পত্তি',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        };
      case 'record_update':
        return {
          label: 'Ledger Record Update',
          bengali: 'রেকর্ড সংশোধন / হালনাগাদ',
          badgeClass: 'bg-blue-50 text-blue-800 border-blue-300',
        };
      case 'data_refreshed':
      default:
        return {
          label: 'Data Refreshed (Metadata Only)',
          bengali: 'তথ্য হালনাগাদ মেটাডাটা',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
        };
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200">
        <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
        <p className="text-sm font-semibold text-slate-700">
          {language === 'bn'
            ? 'বর্তমান ডেমো ডেটায় কোনো সংকেত বা ইভেন্ট রেকর্ড নেই।'
            : 'No matching event found in the available demo data.'}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'bn'
            ? 'ডেমো ডেটায় কোনো সংকেত না থাকার অর্থ এই নয় যে জমিটি আইনি ঝামেলামুক্ত।'
            : 'Absence of recorded events in this prototype does not imply that the parcel is title-clear.'}
        </p>
      </div>
    );
  }

  // Sort chronological descending
  const sorted = [...events].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-gov-primary" />
            {language === 'bn'
              ? 'ভূমি লেনদেন ও কার্যক্রমের কালানুক্রমিক টাইমলাইন'
              : 'Land Activity Chronological Timeline'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'bn'
              ? 'সিমুলেটেড সাব-রেজিস্ট্রি দলিল হস্তান্তর ও ই-নামজারি নিষ্পত্তির ধারাবাহিক রেকর্ড।'
              : 'Distinct transfer and mutation signals recorded across simulated registry feeds.'}
          </p>
        </div>
        <DemoDataTag type="simulated_source" />
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
        {sorted.map((evt) => {
          const badgeMeta = getEventBadge(evt.eventType);
          // Check if this category is approved (if restricted categories were given)
          const isCategoryPermitted =
            !approvedCategories || approvedCategories.includes(evt.category);

          return (
            <div key={evt.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-white border-2 border-gov-primary flex items-center justify-center shadow-xs">
                {getEventIcon(evt.eventType)}
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${badgeMeta.badgeClass}`}
                    >
                      {language === 'bn' ? badgeMeta.bengali : badgeMeta.label}
                    </span>
                    {language === 'en' && (
                      <>
                        <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                        <span className="text-xs font-medium text-slate-600">
                          {badgeMeta.bengali}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {language === 'bn' ? 'তারিখ: ' : 'Event Date: '}
                      <strong className="text-slate-700">{formatDate(evt.eventDate)}</strong>
                    </span>
                  </div>
                </div>

                {isCategoryPermitted ? (
                  <>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {evt.eventTitle}
                    </h4>

                    <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                      {evt.summary}
                    </p>

                    {/* Metadata strip */}
                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500">
                      <div>
                        <span className="text-slate-400">
                          {language === 'bn' ? 'উৎস: ' : 'Source: '}
                        </span>
                        <span className="font-medium text-slate-700">{evt.sourceLabel}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">
                          {language === 'bn' ? 'চিহ্নিত নম্বর: ' : 'Masked Reference: '}
                        </span>
                        <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">
                          {evt.maskedReference}
                        </code>
                      </div>
                      <div>
                        <span className="text-slate-400">
                          {language === 'bn' ? 'লগ করার সময়: ' : 'Logged At: '}
                        </span>
                        <span>{formatDateTime(evt.recordedTimestamp)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">
                          {language === 'bn' ? 'যাচাই অবস্থা: ' : 'Verification: '}
                        </span>
                        <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          {language === 'bn' ? 'সিমুলেটেড ডেমো অবস্থা' : 'Simulated Demo State'}
                        </span>
                      </div>
                    </div>

                    {/* Statutory Caveat Pill */}
                    <div className="mt-3 p-2.5 rounded bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <strong className="font-semibold">
                          {language === 'bn' ? 'আইনি মন্তব্য: ' : 'Caveat: '}
                        </strong>
                        {evt.caveat}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded text-center">
                    <p className="text-xs font-semibold text-slate-600">
                      {language === 'bn'
                        ? 'সীমাবদ্ধ তথ্য ক্যাটাগরি: কর্মকর্তা এই তথ্য দেখার অনুমতি প্রদান করেননি'
                        : 'Restricted Signal Category: Not Approved in Granted Scope'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {language === 'bn'
                        ? `দায়িত্বপ্রাপ্ত কর্মকর্তা ${evt.category} ক্যাটাগরির তথ্য প্রদর্শনের অনুমতি দেননি।`
                        : `The reviewing officer did not grant disclosure for ${evt.category}.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
