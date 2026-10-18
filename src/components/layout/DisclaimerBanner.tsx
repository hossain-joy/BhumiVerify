import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="bg-amber-50/90 border-b border-amber-200 text-amber-950 text-xs py-2 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

        <div className="flex items-center gap-2 overflow-hidden">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="truncate sm:whitespace-normal font-medium text-[11px] sm:text-xs">
            <span className="font-bold uppercase tracking-wider text-amber-800 mr-1.5">
              {t.disclaimer.badge}
            </span>
            {t.disclaimer.short}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-amber-800 hover:text-amber-950 font-semibold text-[11px] underline shrink-0 flex items-center gap-0.5"
          aria-expanded={expanded}
        >
          {expanded ? t.disclaimer.hideNotice : t.disclaimer.fullNotice}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-amber-200/80 text-[11px] text-amber-900 leading-relaxed grid sm:grid-cols-2 gap-3 animate-in fade-in">
          <div>
            <p className="font-semibold text-amber-950 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              {t.disclaimer.statutoryTitle}
            </p>
            <p>{t.disclaimer.statutoryBody}</p>
          </div>
          <div>
            <p className="font-semibold text-amber-950 mb-1">{t.disclaimer.diligenceTitle}</p>
            <p>{t.disclaimer.diligenceBody}</p>
          </div>
        </div>
      )}
    </div>
  );
};
