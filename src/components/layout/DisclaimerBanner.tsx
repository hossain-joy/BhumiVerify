import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className={`border-b transition-all duration-200 ${expanded ? 'bg-amber-50 border-amber-200' : 'bg-amber-50/60 border-amber-200/60'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
          </div>
          <p className="truncate sm:whitespace-normal text-[11px] text-amber-900">
            <span className="font-bold text-amber-800 mr-1.5 uppercase tracking-wide text-[10px]">{t.disclaimer.badge}</span>
            {t.disclaimer.short}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold transition-colors"
          aria-expanded={expanded}
        >
          <Info className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{expanded ? t.disclaimer.hideNotice : t.disclaimer.fullNotice}</span>
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 animate-fade-up">
          <div className="grid sm:grid-cols-2 gap-3 text-[11px] text-amber-900 pt-1">
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200/60">
              <p className="font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                {t.disclaimer.statutoryTitle}
              </p>
              <p className="leading-relaxed">{t.disclaimer.statutoryBody}</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200/60">
              <p className="font-semibold text-amber-950 mb-1">{t.disclaimer.diligenceTitle}</p>
              <p className="leading-relaxed">{t.disclaimer.diligenceBody}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
