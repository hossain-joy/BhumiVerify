import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DisclaimerProps {
  compact?: boolean;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ compact = false }) => {
  const { language } = useLanguage();

  if (compact) {
    return (
      <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-snug">
          {language === 'bn'
            ? 'ভূমিভেরিফাই একটি মূল্যায়ন প্রোটোটাইপ। এটি কোনো জমিকে সম্পূর্ণ নিরাপদ বা প্রতারণামুক্ত হিসেবে নিশ্চিত করে না। সশরীরে তল্লাশ আবশ্যক।'
            : 'BhumiVerify is an evaluation prototype using fictional sample records. It never certifies title as safe or fraud-free. In-person verification is mandatory.'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs space-y-2 shadow-2xs">
      <div className="flex items-center gap-2 font-bold text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-700" />
        <span>{language === 'bn' ? 'সংবিধিবদ্ধ সতর্কবার্তা ও সীমাবদ্ধতা' : 'Statutory Notice & Limitations'}</span>
      </div>
      <p className="leading-relaxed">
        {language === 'bn'
          ? 'এই প্রোটোটাইপে প্রদর্শিত সকল তথ্য কাল্পনিক ও শিক্ষামূলক উদ্দেশ্যে প্রস্তুত। এটি কোনো সরকারি রেকর্ড রুম বা আদালতের বিকল্প নয় এবং মালিকানার আইনি নিশ্চয়তা প্রদান করে না। কোনো নেতিবাচক সংকেত না থাকার অর্থ এই নয় যে জমিটি বিরোধমুক্ত। জমি ক্রয়ের পূর্বে সহকারী কমিশনার (ভূমি) অফিস এবং সাব-রেজিস্ট্রি অফিসে সশরীরে তল্লাশি (Nil Search) সম্পন্ন করা আবশ্যক।'
          : 'All data displayed in this prototype is fictional and intended for educational evaluation. It does not replace official land archives or court records, nor does it guarantee clear title. Absence of negative signals does not mean the land is free from disputes. In-person physical title searches at the Sub-Registry and AC (Land) office remain mandatory.'}
      </p>
    </div>
  );
};
