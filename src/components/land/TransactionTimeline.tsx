import React, { useState } from 'react';
import { LandEvent } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { sortEventsChronologically, classifyEventType } from '../../utils/landFunctions';
import { formatDate } from '../../lib/utils';
import { Clock, Calendar, ChevronDown, ChevronUp, FileText, FileSpreadsheet, FileCheck2, RefreshCw, AlertCircle } from 'lucide-react';

interface TransactionTimelineProps {
  events: LandEvent[];
}

export const TransactionTimeline: React.FC<TransactionTimelineProps> = ({ events }) => {
  const { language } = useLanguage();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const sortedEvents = sortEventsChronologically(events, 'asc');

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getEventIcon = (evt: LandEvent) => {
    const type = classifyEventType(evt);
    switch (type) {
      case 'transfer_related':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'mutation_application':
        return <FileSpreadsheet className="w-4 h-4 text-blue-600" />;
      case 'mutation_completed':
        return <FileCheck2 className="w-4 h-4 text-emerald-600" />;
      case 'record_update':
      default:
        return <RefreshCw className="w-4 h-4 text-slate-500" />;
    }
  };

  const getEventBadgeClass = (evt: LandEvent) => {
    const type = classifyEventType(evt);
    switch (type) {
      case 'transfer_related':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'mutation_application':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'mutation_completed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'record_update':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gov-primary" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'bn' ? 'কালানুক্রমিক ভূমি লেনদেন ও রেকর্ড টাইমলাইন' : 'Land Transaction Timeline (Chronological)'}
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">
          {language === 'bn' ? 'ঘটনার কালক্রম অনুসারে সাজানো' : 'Sorted from earliest to latest'}
        </span>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 space-y-2">
          <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
          <p className="font-semibold text-slate-700">
            {language === 'bn' ? 'ডেমো ডেটায় কোনো লেনদেন ইভেন্ট রেকর্ড নেই।' : 'No event found in demo data.'}
          </p>
          <p className="text-[11px] text-slate-500 max-w-md mx-auto">
            {language === 'bn'
              ? 'তথ্য অনুপস্থিত থাকার অর্থ এই নয় যে কোনো লেনদেন হয়নি। এটি কেবলমাত্র ডেমো ডেটায় অন্তর্ভুক্ত তথ্যের সীমাবদ্ধতা নির্দেশ করে।'
              : 'Missing event history in demo data is not proof that no transaction occurred. Always verify physical deed registers.'}
          </p>
        </div>
      ) : (
        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {sortedEvents.map((evt, idx) => {
            const isExpanded = Boolean(expandedIds[evt.id || idx.toString()]);

            return (
              <div key={evt.id || idx} className="relative group">
                {/* Marker */}
                <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-gov-primary flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-gov-primary" />
                </div>

                {/* Event Card */}
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/90 transition-all hover:border-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                        {getEventIcon(evt)}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{evt.eventTitle}</span>
                      <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold border ${getEventBadgeClass(evt)}`}>
                        {evt.category?.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium">
                        {evt.eventDate ? formatDate(evt.eventDate) : (language === 'bn' ? 'তারিখ অজানা' : 'Unknown Date')}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                        {evt.maskedReference || 'REF-PENDING'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mt-2">
                    {evt.summary}
                  </p>

                  {/* Expand / Collapse toggle for detailed legal caveat */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpand(evt.id || idx.toString())}
                      className="text-[11px] font-semibold text-gov-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? (language === 'bn' ? 'সতর্কতা লুকান' : 'Hide Details') : (language === 'bn' ? 'উৎস ও সতর্কতা দেখুন' : 'View Source & Caveat')}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <span className="text-[10px] text-slate-400">
                      {language === 'bn' ? 'উৎস: ' : 'Source: '}
                      <strong className="text-slate-600">{evt.sourceLabel}</strong>
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-2.5 p-2.5 rounded bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-snug animate-fade-up">
                      <strong>{language === 'bn' ? 'আইনি তাৎপর্য ও সতর্কতা:' : 'Legal Significance & Caveat:'}</strong>{' '}
                      {evt.caveat}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
