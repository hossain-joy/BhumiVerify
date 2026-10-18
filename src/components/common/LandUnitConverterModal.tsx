import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Layers,
  ArrowRightLeft,
  Copy,
  Info,
  Sparkles,
  Maximize2,
} from 'lucide-react';

export const LandUnitConverterModal: React.FC = () => {
  const { isUnitConverterOpen, closeUnitConverter } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();

  // Base unit in square feet
  const [sqFt, setSqFt] = useState<number>(4356); // 10 decimals default

  if (!isUnitConverterOpen) return null;

  const isBn = language === 'bn';

  // Constants
  const SQFT_PER_DECIMAL = 435.6;
  const SQFT_PER_KATHA = 720;
  const SQFT_PER_BIGHA = 14400; // 20 katha = 33.06 decimals in standard BD
  const SQFT_PER_ACRE = 43560; // 100 decimals
  const SQFT_PER_CHHATAK = 45;
  const SQFT_PER_SQM = 10.7639;

  const decimalVal = parseFloat((sqFt / SQFT_PER_DECIMAL).toFixed(3));
  const kathaVal = parseFloat((sqFt / SQFT_PER_KATHA).toFixed(3));
  const bighaVal = parseFloat((sqFt / SQFT_PER_BIGHA).toFixed(4));
  const acreVal = parseFloat((sqFt / SQFT_PER_ACRE).toFixed(4));
  const chhatakVal = parseFloat((sqFt / SQFT_PER_CHHATAK).toFixed(2));
  const sqmVal = parseFloat((sqFt / SQFT_PER_SQM).toFixed(2));

  const handleCopyAll = () => {
    const text = `=== [BhumiVerify] বাংলাদেশ জমির পরিমাপ রূপান্তর ===
• শতাংশ (Decimal): ${decimalVal}
• কাঠা (Katha): ${kathaVal}
• বিঘা (Bigha): ${bighaVal}
• একর (Acre): ${acreVal}
• ছটাক (Chhatak): ${chhatakVal}
• বর্গফুট (Sq Ft): ${sqFt.toLocaleString('en-IN')}
• বর্গমিটার (Sq Meters): ${sqmVal}`;

    navigator.clipboard.writeText(text);
    showToast({
      type: 'success',
      title: isBn ? 'পরিমাপের হিসাব কপি হয়েছে!' : 'Measurement Copied!',
      message: isBn ? 'ক্লিপবোর্ডে সকল ইউনিটের রূপান্তর সংরক্ষিত হয়েছে' : 'All unit conversions copied to clipboard',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="unit-converter-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={closeUnitConverter}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-gov-dark via-slate-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 id="unit-converter-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {isBn ? 'বাংলাদেশি ভূমি পরিমাপ রূপান্তরক (Land Unit Converter)' : 'Bangladesh Land Unit Converter'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-200">
                  {isBn ? 'শতাংশ • কাঠা • বিঘা' : 'Dec • Katha • Bigha'}
                </span>
              </h2>
              <p className="text-xs text-emerald-200/80">
                {isBn
                  ? 'শতাংশ, কাঠা, বিঘা, একর, ছটাক এবং বর্গফুটের সঠিক ও তাৎক্ষণিক রূপান্তর'
                  : 'Convert seamlessly between standard Bangladeshi cadastral survey units'}
              </p>
            </div>
          </div>

          <button
            onClick={closeUnitConverter}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close unit converter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Converter Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">{isBn ? 'জনপ্রিয় পরিমাপ:' : 'Quick Presets:'}</span>
            {[
              { label: isBn ? '৩ কাঠা' : '3 Katha', val: 3 * SQFT_PER_KATHA },
              { label: isBn ? '৫ কাঠা' : '5 Katha', val: 5 * SQFT_PER_KATHA },
              { label: isBn ? '১০ শতক' : '10 Decimals', val: 10 * SQFT_PER_DECIMAL },
              { label: isBn ? '১ বিঘা' : '1 Bigha', val: SQFT_PER_BIGHA },
              { label: isBn ? '১ একর' : '1 Acre', val: SQFT_PER_ACRE },
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSqFt(p.val)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Decimal */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <label className="text-xs font-bold text-teal-900 flex items-center justify-between">
                <span>{isBn ? 'শতাংশ / শতক / ডেসিমাল (Decimal)' : 'Decimal (Shotok)'}</span>
                <span className="text-[10px] text-slate-400">১ শতক = ৪৩৫.৬ বর্গফুট</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={decimalVal}
                onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)) * SQFT_PER_DECIMAL)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-gov-primary bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Katha */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <label className="text-xs font-bold text-blue-900 flex items-center justify-between">
                <span>{isBn ? 'কাঠা (Katha)' : 'Katha'}</span>
                <span className="text-[10px] text-slate-400">১ কাঠা = ৭২০ বর্গফুট</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={kathaVal}
                onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)) * SQFT_PER_KATHA)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-blue-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Bigha */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>{isBn ? 'বিঘা (Bigha)' : 'Bigha'}</span>
                <span className="text-[10px] text-slate-400">১ বিঘা = ২০ কাঠা</span>
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                value={bighaVal}
                onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)) * SQFT_PER_BIGHA)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Acre */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>{isBn ? 'একর (Acre)' : 'Acre'}</span>
                <span className="text-[10px] text-slate-400">১ একর = ১০০ শতক</span>
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                value={acreVal}
                onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)) * SQFT_PER_ACRE)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Square Feet */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>{isBn ? 'বর্গফুট (Square Feet)' : 'Square Feet'}</span>
                <span className="text-[10px] text-slate-400">আসল পরিমাপ</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={Math.round(sqFt)}
                onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Chhatak */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>{isBn ? 'ছটাক (Chhatak)' : 'Chhatak'}</span>
                <span className="text-[10px] text-slate-400">১৬ ছটাক = ১ কাঠা</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={chhatakVal}
                onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)) * SQFT_PER_CHHATAK)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-base font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Statutory Formula Reference Table */}
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/70 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-600" />
              <span>{isBn ? 'বাংলাদেশে প্রচলিত প্রমিত পরিমাপ সূত্র' : 'Standard Land Formula in Bangladesh'}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
              <div className="bg-white p-2 rounded-lg border border-slate-100">১ শতক = ৪৩৫.৬ বর্গফুট</div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">১ কাঠা = ১.৬৫ শতক</div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">১ বিঘা = ২০ কাঠা = ৩৩ শতক</div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">১ একর = ৩ বিঘা ৮ ছটাক</div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">১ কাঠা = ১৬ ছটাক</div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">১ বর্গমিটার = ১০.৭৬ বর্গফুট</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isBn ? 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর মানদণ্ড' : 'Survey & Settlement Manual Standard'}
          </span>
          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isBn ? 'হিসাব কপি করুন' : 'Copy All Units'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
