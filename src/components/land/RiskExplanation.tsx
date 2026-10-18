import React from 'react';
import { ParcelReference } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { explainRiskFinding, assessParcelRisk } from '../../utils/landFunctions';
import { FileText, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface RiskExplanationProps {
  parcel: ParcelReference;
}

export const RiskExplanation: React.FC<RiskExplanationProps> = ({ parcel }) => {
  const { language } = useLanguage();
  const risk = assessParcelRisk(parcel);
  const detail = explainRiskFinding(parcel, risk);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'bn' ? 'ঝুঁকি ব্যাখ্যা ও পরবর্তী করণীয়' : 'Risk Explanation & Buyer Next Steps'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'bn'
              ? 'শনাক্তকৃত সংকেতের আইনগত তাৎপর্য এবং বাস্তব পদক্ষেপসমূহ'
              : 'Plain-language breakdown of detected signals and practical verification steps'}
          </p>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${risk.badgeClass}`}>
          {language === 'bn' ? risk.labelBn : risk.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. What was detected */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <FileText className="w-4 h-4 text-gov-primary" />
            <span>{language === 'bn' ? '১. কী পাওয়া গেছে (What Was Detected):' : '1. What Was Detected:'}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {language === 'bn' ? detail.whatDetectedBn : detail.whatDetected}
          </p>
        </div>

        {/* 2. Why it may matter */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{language === 'bn' ? '২. এটি কেন গুরুত্বপূর্ণ (Why It May Matter):' : '2. Why It May Matter:'}</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            {language === 'bn' ? detail.whyItMattersBn : detail.whyItMatters}
          </p>
        </div>

        {/* 3. What information is missing */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/90 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{language === 'bn' ? '৩. কোন তথ্য অনুপস্থিত (What Information Is Missing):' : '3. What Information Is Missing:'}</span>
          </div>
          <p className="text-xs text-blue-900 leading-relaxed">
            {language === 'bn' ? detail.missingInfoBn : detail.missingInfo}
          </p>
        </div>

        {/* 4. What the buyer should verify next */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? '৪. ক্রেতার পরবর্তী করণীয় (What to Verify Next):' : '4. What the Buyer Should Verify Next:'}</span>
          </div>
          <ul className="text-xs text-emerald-900 space-y-1.5 pl-1">
            {(language === 'bn' ? detail.whatToVerifyNextBn : detail.whatToVerifyNext).map((step, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="font-bold text-emerald-700">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
