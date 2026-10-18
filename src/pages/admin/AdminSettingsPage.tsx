import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import {
  RefreshCw,
  CheckCircle2,
  Save,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetAllDemoData, parcels, requests, auditEvents } = useApp();
  const { language } = useLanguage();

  const [feeEnabled, setFeeEnabled] = useState(settings.feeEnabled);
  const [feeAmountBdt, setFeeAmountBdt] = useState(settings.feeAmountBdt);
  const [targetReviewHours, setTargetReviewHours] = useState(settings.targetReviewHours);
  const [accessDurationHours, setAccessDurationHours] = useState(settings.accessDurationHours);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      feeEnabled,
      feeAmountBdt: Number(feeAmountBdt),
      targetReviewHours: Number(targetReviewHours),
      accessDurationHours: Number(accessDurationHours),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    const confirmMsg =
      language === 'bn'
        ? 'আপনি কি নিশ্চিত যে সকল ডেমো ডেটা প্রাথমিক অবস্থায় ফিরিয়ে নিতে চান? এতে সকল দাখিলকৃত আবেদন, অডিট লগ ও সেটিংস মুছে যাবে।'
        : 'Are you sure you want to restore all demo data to baseline seeded scenarios? This will reset all requests, audit logs, and settings.';
    if (window.confirm(confirmMsg)) {
      resetAllDemoData();
      setFeeEnabled(true);
      setFeeAmountBdt(150);
      setTargetReviewHours(24);
      setAccessDurationHours(72);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'ডেমো প্রশাসন ও পলিসি কনফিগারেশন' : 'Demo Administration & Policy Configuration'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'নমুনা ফি গেট, এসএলএ পর্যালোচনা সময়সীমা ও প্রবেশাধিকারের প্যারামিটার নির্ধারণ করুন।'
              : 'Configure mock fee gates, SLA review targets, and temporary access window parameters.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold rounded-lg border border-rose-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
          {language === 'bn' ? 'সকল ডেমো ডেটা রিসেট' : 'Reset All Demo Data'}
        </button>
      </div>

      {/* Demo State Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'প্রস্তুতকৃত পার্সেল' : 'Seeded Parcels'}
          </span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">
            {parcels.length} {language === 'bn' ? 'টি' : 'Parcels'}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'চলমান আবেদন' : 'Active Inquiries'}
          </span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">
            {requests.length} {language === 'bn' ? 'টি' : 'Requests'}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'অডিট ট্রেইল লগ' : 'Audit Event Trail'}
          </span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">
            {auditEvents.length} {language === 'bn' ? 'টি' : 'Logs'}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'মক সার্ভিসেস' : 'Mock Services'}
          </span>
          <span className="text-lg font-bold text-emerald-700 mt-0.5 block">
            {language === 'bn' ? 'সক্রিয় (লোকাল)' : 'Active (Local)'}
          </span>
        </div>
      </div>

      {/* Form Settings */}
      <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            {language === 'bn' ? 'সিমুলেটেড ফি পলিসি' : 'Simulated Access Fee Policy'}
          </h3>

          <div className="space-y-4 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={feeEnabled}
                onChange={(e) => setFeeEnabled(e.target.checked)}
                className="mt-0.5 rounded text-gov-primary"
              />
              <div className="flex-1">
                <span className="font-semibold text-slate-900 block">
                  {language === 'bn'
                    ? 'তথ্য দেখার জন্য সিমুলেটেড ফি পরিশোধ বাধ্যতামূলক করুন'
                    : 'Require Simulated Fee Payment for Signal Access'}
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  {language === 'bn'
                    ? 'চালু থাকলে, অনুমোদিত আবেদনগুলো পেমেন্ট অপেক্ষমাণ অবস্থায় থাকবে। বন্ধ থাকলে, কর্মকর্তা অনুমোদনের সাথে সাথে তথ্য উন্মুক্ত হবে।'
                    : 'When enabled, approved requests pause in payment_pending status until applicant confirms demo payment. When disabled, access unlocks immediately upon officer approval.'}
                </p>
              </div>
            </label>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'ফি এর পরিমাণ (টাকা / BDT)' : 'Simulated Fee Amount in BDT (টাকা)'}
              </label>
              <div className="flex items-center gap-2 max-w-xs">
                <span className="text-slate-500 font-bold">৳</span>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={feeAmountBdt}
                  onChange={(e) => setFeeAmountBdt(Number(e.target.value))}
                  disabled={!feeEnabled}
                  className="w-full p-2 border border-slate-300 rounded text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 font-bold"
                />
                <span className="text-slate-500 text-xs">{language === 'bn' ? 'টাকা' : 'BDT'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            {language === 'bn' ? 'এসএলএ ও তথ্য দর্শনের সময়সীমা' : 'SLA & Access Validity Timers'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn'
                  ? 'কর্মকর্তার এসএলএ পর্যালোচনার সময়সীমা (ঘণ্টা)'
                  : 'Target Officer Review SLA (Hours)'}
              </label>
              <input
                type="number"
                min={1}
                max={168}
                value={targetReviewHours}
                onChange={(e) => setTargetReviewHours(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 font-semibold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === 'bn'
                  ? 'নাগরিক সেবা সনদ অনুযায়ী ডিফল্ট সময়সীমা: ২৪ ঘণ্টা।'
                  : 'Standard public service commitment: default is 24 hours.'}
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'bn'
                  ? 'তথ্য দর্শনের অনুমোদিত উইন্ডো (ঘণ্টা)'
                  : 'Signal Viewing Window Duration (Hours)'}
              </label>
              <input
                type="number"
                min={1}
                max={720}
                value={accessDurationHours}
                onChange={(e) => setAccessDurationHours(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 font-semibold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === 'bn'
                  ? 'নিরাপত্তা নীতিমালা: নির্ধারিত সময় শেষে তথ্য স্বয়ংক্রিয়ভাবে লক হয়ে যাবে (ডিফল্ট: ৭২ ঘণ্টা)।'
                  : 'Security policy: signals lock automatically after window lapses (default 72h).'}
              </span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'bn'
                ? 'পলিসি কনফিগারেশন সফলভাবে লোকাল স্টোরেজে সংরক্ষিত হয়েছে।'
                : 'Policy configurations successfully saved to local session storage.'}
            </span>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {language === 'bn' ? 'পলিসি সেটিংস সংরক্ষণ করুন' : 'Save Policy Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
