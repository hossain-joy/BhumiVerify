import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  Calculator,
  DollarSign,
  FileText,
  Building2,
  Copy,
  Printer,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';

export const LandFeeCalculatorModal: React.FC = () => {
  const { isCalculatorOpen, closeCalculator } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();

  const [deedValue, setDeedValue] = useState<number>(2500000); // 25 Lakh BDT default
  const [locationTier, setLocationTier] = useState<'city_corp' | 'pourashabha' | 'rural'>('city_corp');
  const [deedType, setDeedType] = useState<'sale' | 'gift' | 'partition'>('sale');
  const [copied, setCopied] = useState(false);

  if (!isCalculatorOpen) return null;

  const isBn = language === 'bn';

  // Fee calculation logic
  let stampDutyRate = 0.015; // 1.5%
  let registrationFeeRate = 0.01; // 1.0%
  let localGovtTaxRate = locationTier === 'city_corp' ? 0.03 : locationTier === 'pourashabha' ? 0.02 : 0.01;
  let sourceTaxRate = locationTier === 'city_corp' ? 0.04 : locationTier === 'pourashabha' ? 0.03 : 0.02;

  if (deedType === 'gift') {
    // Gift deeds between blood relatives have nominal flat rates in BD
    stampDutyRate = 0.005;
    registrationFeeRate = 0.005;
    localGovtTaxRate = 0.005;
    sourceTaxRate = 0.0;
  } else if (deedType === 'partition') {
    // Partition deeds
    stampDutyRate = 0.01;
    registrationFeeRate = 0.005;
    localGovtTaxRate = 0.0;
    sourceTaxRate = 0.0;
  }

  const stampDuty = Math.round(deedValue * stampDutyRate);
  const registrationFee = Math.round(deedValue * registrationFeeRate);
  const localGovtTax = Math.round(deedValue * localGovtTaxRate);
  const sourceTax = Math.round(deedValue * sourceTaxRate);
  const eMutationOfficialFee = 1170; // 20 + 50 + 1000 + 100 standard government fee
  const verificationDemoFee = 350; // BhumiVerify simulated fee

  const totalGovtCost = stampDuty + registrationFee + localGovtTax + sourceTax + eMutationOfficialFee;
  const grandTotal = totalGovtCost + verificationDemoFee;
  const percentageOfValue = ((grandTotal / deedValue) * 100).toFixed(2);

  const formatBDT = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  const handleCopySummary = () => {
    const summaryText = `[BhumiVerify Land Cost Calculator]
Deed Value: ৳ ${formatBDT(deedValue)}
Location: ${locationTier.toUpperCase()}
Deed Type: ${deedType.toUpperCase()}
1. Stamp Duty: ৳ ${formatBDT(stampDuty)}
2. Registration Fee: ৳ ${formatBDT(registrationFee)}
3. Local Govt Tax: ৳ ${formatBDT(localGovtTax)}
4. Source Tax (AIT): ৳ ${formatBDT(sourceTax)}
5. e-Mutation Statutory Fee: ৳ ${formatBDT(eMutationOfficialFee)}
6. BhumiVerify Verification Fee: ৳ ${formatBDT(verificationDemoFee)}
----------------------------------
Total Estimated Cost: ৳ ${formatBDT(grandTotal)} (${percentageOfValue}% of value)`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast({
      type: 'success',
      title: isBn ? 'হিসাব কপি করা হয়েছে!' : 'Estimate Copied to Clipboard!',
      message: isBn ? 'খরচের সম্পূর্ণ হিসাব ক্লিপবোর্ডে সংরক্ষিত হয়েছে' : 'Full fee breakdown copied to clipboard',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fee-calculator-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={closeCalculator}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-gov-dark via-slate-900 to-gov-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 id="fee-calculator-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {isBn ? 'জমি রেজিস্ট্রেশন ও নামজারি ফি ক্যালকুলেটর' : 'Land Registration & Mutation Fee Estimator'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200">
                  {isBn ? 'বাংলাদেশ স্ট্যান্ডার্ড' : 'BD Standard'}
                </span>
              </h2>
              <p className="text-xs text-blue-200/80">
                {isBn
                  ? 'দলিল রেজিস্ট্রেশন, স্ট্যাম্প ডিউটি, স্থানীয় কর ও সরকারি ই-নামজারি খরচের নির্ভরযোগ্য হিসাব'
                  : 'Estimate government stamp duties, local registration fees and official mutation charges'}
              </p>
            </div>
          </div>

          <button
            onClick={closeCalculator}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Inputs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Deed Value Input */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{isBn ? 'দলিলের আর্থিক মূল্য (টাকা)' : 'Deed Valuation (BDT)'}</span>
                <span className="text-gov-primary font-mono font-bold text-sm">৳ {formatBDT(deedValue)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">৳</span>
                <input
                  type="number"
                  min="50000"
                  step="50000"
                  value={deedValue}
                  onChange={(e) => setDeedValue(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: isBn ? '১০ লাখ' : '10 Lakh', val: 1000000 },
                  { label: isBn ? '২৫ লাখ' : '25 Lakh', val: 2500000 },
                  { label: isBn ? '৫০ লাখ' : '50 Lakh', val: 5000000 },
                  { label: isBn ? '১ কোটি' : '1 Crore', val: 10000000 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => setDeedValue(preset.val)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                      deedValue === preset.val
                        ? 'bg-gov-primary text-white border-gov-primary'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Tier */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                {isBn ? 'জমির অবস্থান এলাকা' : 'Location Jurisdiction'}
              </label>
              <select
                value={locationTier}
                onChange={(e) => setLocationTier(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="city_corp">
                  {isBn ? 'ঢাকা / চট্টগ্রাম সিটি কর্পোরেশন' : 'Dhaka / Chattogram City Corp'}
                </option>
                <option value="pourashabha">
                  {isBn ? 'পৌরসভা / জেলা শহর' : 'Pourashabha / Municipal Area'}
                </option>
                <option value="rural">
                  {isBn ? 'পল্লী এলাকা / ইউনিয়ন পরিষদ' : 'Rural Area / Union Parishad'}
                </option>
              </select>
            </div>

            {/* Deed Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                {isBn ? 'দলিলের প্রকারভেদ' : 'Deed Type'}
              </label>
              <select
                value={deedType}
                onChange={(e) => setDeedType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="sale">{isBn ? 'সাফ-কবলা দলিল (Sale Deed)' : 'Sale Deed (Saf-Kabala)'}</option>
                <option value="gift">{isBn ? 'হেবা দলিল (Gift Deed - Blood Relatives)' : 'Gift Deed (Heba)'}</option>
                <option value="partition">{isBn ? 'আপস বণ্টননামা (Partition Deed)' : 'Partition Deed'}</option>
              </select>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                {isBn ? 'সরকারি ফি ও ভ্যাট বিভাজন' : 'Detailed Statutory Fee Breakdown'}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                {isBn ? 'প্রযোজ্য হার' : 'Applicable Rate'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">{isBn ? 'স্ট্যাম্প শুল্ক (Stamp Duty)' : 'Stamp Duty'}</p>
                  <p className="text-[10px] text-slate-500">{isBn ? 'মূল্যের' : 'Rate:'} {(stampDutyRate * 100).toFixed(1)}%</p>
                </div>
                <span className="font-mono font-bold text-slate-800">৳ {formatBDT(stampDuty)}</span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">{isBn ? 'নিবন্ধন ফি (Registration Fee)' : 'Registration Fee'}</p>
                  <p className="text-[10px] text-slate-500">{isBn ? 'মূল্যের' : 'Rate:'} {(registrationFeeRate * 100).toFixed(1)}%</p>
                </div>
                <span className="font-mono font-bold text-slate-800">৳ {formatBDT(registrationFee)}</span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">{isBn ? 'স্থানীয় সরকার কর (Local Govt Tax)' : 'Local Govt Tax'}</p>
                  <p className="text-[10px] text-slate-500">{isBn ? 'এলাকাভিত্তিক' : 'Municipal rate:'} {(localGovtTaxRate * 100).toFixed(1)}%</p>
                </div>
                <span className="font-mono font-bold text-slate-800">৳ {formatBDT(localGovtTax)}</span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">{isBn ? 'উৎস কর / লাভজনক কর (AIT / Gain Tax)' : 'Advance Income Tax (AIT)'}</p>
                  <p className="text-[10px] text-slate-500">{isBn ? 'বিক্রেতার উৎসে কর্তন' : 'Withholding rate:'} {(sourceTaxRate * 100).toFixed(1)}%</p>
                </div>
                <span className="font-mono font-bold text-slate-800">৳ {formatBDT(sourceTax)}</span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 bg-teal-50/30">
                <div>
                  <p className="font-semibold text-teal-900">{isBn ? 'ই-নামজারি সরকারি ফি (e-Mutation Statutory Fee)' : 'Official e-Mutation Fee'}</p>
                  <p className="text-[10px] text-teal-700">
                    {isBn ? 'আবেদন ৳২০ + নোটিশ ৳৫০ + রেকর্ড ৳১০০০ + ডিসিআর ৳১০০' : 'Fixed government rate (৳20 + ৳50 + ৳1000 + ৳100)'}
                  </p>
                </div>
                <span className="font-mono font-bold text-teal-900">৳ {formatBDT(eMutationOfficialFee)}</span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 bg-blue-50/30">
                <div>
                  <p className="font-semibold text-blue-900">{isBn ? 'ভূমিভেরিফাই তথ্য তল্লাশি ফি (BhumiVerify Diligence Fee)' : 'BhumiVerify Signal Fee'}</p>
                  <p className="text-[10px] text-blue-700">{isBn ? 'সিমুলেটেড ডেমো ফি' : 'Demonstration simulated fee'}</p>
                </div>
                <span className="font-mono font-bold text-blue-900">৳ {formatBDT(verificationDemoFee)}</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="bg-gradient-to-r from-teal-900 to-gov-dark p-4 text-white flex items-center justify-between">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-teal-200">
                  {isBn ? 'মোট আনুমানিক খরচ' : 'Total Estimated Cost'}
                </p>
                <p className="text-[11px] text-teal-300/80">
                  {isBn ? `দলিল মূল্যের প্রায় ${percentageOfValue}%` : `Approx. ${percentageOfValue}% of deed value`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono tracking-tight text-white">
                  ৳ {formatBDT(grandTotal)}
                </div>
              </div>
            </div>
          </div>

          {/* Advice Alert */}
          <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              {isBn
                ? 'সতর্কতা: সাব-রেজিস্ট্রি অফিসে জমি রেজিস্ট্রেশনের ক্ষেত্রে সরকারের নির্ধারিত ন্যূনতম মৌজা রেটের কমে মূল্য দেখানো দণ্ডনীয়। দলিল রেজিস্ট্রির পর অবশ্যই উপজেলা ভূমি অফিসে ই-নামজারি সম্পন্ন করতে হবে।'
                : 'Caution: Sub-Registry deeds must declare at or above the official government Mouza Minimum Rate. Deed registration does not dispense with mandatory e-mutation at the AC Land office.'}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্রিন্ট' : 'Print'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'হিসাব কপি করুন' : 'Copy Estimate')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
