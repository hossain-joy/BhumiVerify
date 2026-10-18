import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatDateTime } from '../../lib/utils';
import {
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, requests, resetCitizenIdentity, verifyCitizenIdentity } = useApp();
  const { language } = useLanguage();

  const userRequests = requests.filter((r) => r.userId === currentUser.id);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'আবেদনকারীর প্রোফাইল ও পরিচয়' : 'Applicant Profile & Credentials'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সিমুলেটেড নাগরিক পরিচয়, সেশন টোকেন এবং আইনি অঙ্গীকারের স্থিতি।'
              : 'Simulated citizen identity, session authorization token, and statutory acknowledgement status.'}
          </p>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-gov-primary flex items-center justify-center font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{currentUser.name}</h2>
              <span className="text-xs text-slate-500 font-mono">
                {language === 'bn' ? 'একাউন্ট আইডি:' : 'Account ID:'} {currentUser.id}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            {language === 'bn' ? 'বর্তমান ভূমিকা:' : 'Active Role:'} {currentRole}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'জাতীয় পরিচয়পত্র (ডেমো মাস্কড)' : 'National ID (Demo Masked)'}
            </span>
            <span className="font-mono font-semibold text-slate-800 text-sm mt-0.5 block">
              {currentUser.maskedNid}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'মোবাইল নম্বর (সিমুলেটেড)' : 'Contact Mobile (Simulated)'}
            </span>
            <span className="font-mono font-semibold text-slate-800 text-sm mt-0.5 block">
              {currentUser.phoneMasked}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'যাচাইয়ের সময়কাল' : 'Verification Timestamp'}
            </span>
            <span className="font-medium text-slate-800 mt-0.5 block">
              {currentUser.verifiedAt
                ? formatDateTime(currentUser.verifiedAt)
                : (language === 'bn' ? 'অযাচাইকৃত' : 'Not verified')}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 block text-[11px]">
              {language === 'bn' ? 'পরিচয় অবস্থা' : 'Identity Status'}
            </span>
            <div className="mt-1 flex items-center gap-1.5 font-semibold">
              {currentUser.identityStatus === 'verified_demo' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">
                    {language === 'bn' ? 'যাচাইকৃত (ডেমো)' : 'Verified (demo)'}
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">
                    {language === 'bn' ? 'অযাচাইকৃত' : 'Unverified'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Evaluation Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            <span>
              {language === 'bn' ? 'মোট দাখিলকৃত আবেদন: ' : 'Inquiries submitted: '}
              <strong className="text-slate-800">{userRequests.length}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentUser.identityStatus === 'verified_demo' ? (
              <button
                type="button"
                onClick={resetCitizenIdentity}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
                title="Switch back to unverified to test that submission is blocked"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                {language === 'bn' ? 'অযাচাইকৃত অবস্থা সিমুলেট করুন' : 'Simulate Unverified State'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => verifyCitizenIdentity()}
                className="px-3 py-1.5 bg-gov-primary hover:bg-gov-primaryHover text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {language === 'bn' ? 'ডেমো পরিচয় পুনঃযাচাই করুন' : 'Re-Verify Demo Identity'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statutory Privacy Safeguard Box */}
      <div className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 space-y-1">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-slate-600" />
          {language === 'bn' ? 'প্রকৃত ব্যক্তিগত তথ্য সুরক্ষা নীতি' : 'No Real Personal Data Policy'}
        </span>
        <p className="leading-relaxed">
          {language === 'bn'
            ? 'হ্যাকাথন মূল্যায়নের নিরাপত্তা নির্দেশনা অনুযায়ী এই প্ল্যাটফর্মে শুধুমাত্র নমুনা ও সিনথেটিক ডেটা ব্যবহৃত হয়। নির্বাচন কমিশন (ইসি) বা জাতীয় ভূমি ডেটাবেজে কোনো বহিরাগত কল পাঠানো হয় না।'
            : 'In strict accordance with hackathon evaluation safety guidelines, this prototype uses purely synthetic placeholder credentials. No live API queries are dispatched to the National Election Commission (EC) NID database or land registries.'}
        </p>
      </div>
    </div>
  );
};
