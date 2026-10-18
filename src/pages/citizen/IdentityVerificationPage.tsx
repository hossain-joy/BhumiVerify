import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Stepper } from '../../components/common/Stepper';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const IdentityVerificationPage: React.FC = () => {
  const { currentUser, verifyCitizenIdentity, resetCitizenIdentity } = useApp();
  const { language } = useLanguage();
  const [step, setStep] = useState(
    currentUser.identityStatus === 'verified_demo' ? 2 : 0
  );

  // Form mock state
  const [fakeName, setFakeName] = useState(currentUser.name || 'Tanvir Hossain');
  const [fakeNid, setFakeNid] = useState('DEMO-NID-0001');
  const [fakePhone, setFakePhone] = useState('+880 1711-000000');
  const [purposeAck, setPurposeAck] = useState(true);
  const [privacyAck, setPrivacyAck] = useState(true);
  const [simulating, setSimulating] = useState(false);

  const steps = [
    {
      id: 0,
      label: language === 'bn' ? 'পরিচয় তথ্য' : 'Identity Info',
      sublabel: language === 'bn' ? 'নমুনা ডেমো ডেটা' : 'Mock demo data only',
    },
    {
      id: 1,
      label: language === 'bn' ? 'আইনি অঙ্গীকার' : 'Statutory Ack',
      sublabel: language === 'bn' ? 'উদ্দেশ্য ও গোপনীয়তা' : 'Privacy & Purpose',
    },
    {
      id: 2,
      label: language === 'bn' ? 'যাচাই ফলাফল' : 'Simulation Result',
      sublabel: language === 'bn' ? 'যাচাইকৃত স্ট্যাটাস' : 'Verified Demo Status',
    },
  ];

  const handleSimulateVerification = () => {
    setSimulating(true);
    setTimeout(() => {
      verifyCitizenIdentity(fakeName, fakeNid);
      setSimulating(false);
      setStep(2);
    }, 700);
  };

  const handleReset = () => {
    resetCitizenIdentity();
    setStep(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title & Guidance */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-slate-900">
            {language === 'bn' ? 'নাগরিক প্রাক-পরিচয় যাচাই (ডেমো)' : 'Citizen Identity Pre-Verification'}
          </h1>
          <DemoDataTag type="demo_data" />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {language === 'bn'
            ? 'সংবিধিবদ্ধ কমপ্লায়েন্স গেট: অযাচাইকৃত বা পরিচয়হীন ব্যক্তি জমির লেনদেন সংক্রান্ত সংবেদনশীল সংকেত চাইতে পারবেন না। এই সিমুলেশনে আসল ব্যক্তিগত তথ্য ব্যতীত নিরাপদ ডেমো টোকেন ব্যবহৃত হয়।'
            : 'Statutory compliance gate: unverified entities are barred from requesting restricted land signals. This simulation verifies demo credentials without harvesting live personal data.'}
        </p>
      </div>

      {/* Stepper */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
        <Stepper steps={steps} currentStepIndex={step} />
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-5">
        {step === 0 && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {language === 'bn' ? 'ব্যক্তিগত তথ্যের সুরক্ষা সতর্কতা' : 'Privacy Safeguard Notice'}
                </span>
                <p className="mt-0.5 leading-relaxed font-normal">
                  {language === 'bn' ? (
                    <>
                      কখনোই আসল জাতীয় পরিচয়পত্র নম্বর বা আঙুলের ছাপ ব্যবহার করবেন না। এই মূল্যায়নে শুধুমাত্র{' '}
                      <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-blue-950">DEMO-NID-0001</code>{' '}
                      অনুমোদিত।
                    </>
                  ) : (
                    <>
                      Never enter real national identity numbers, biometric scans, or authentic credentials. Only demo identifiers such as <code>DEMO-NID-0001</code> are permitted in this prototype.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'পূর্ণ নাম (ডেমো আবেদনকারী)' : 'Full Name (Demo Applicant)'}
                </label>
                <input
                  type="text"
                  value={fakeName}
                  onChange={(e) => setFakeName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'ডেমো জাতীয় পরিচয়পত্র টোকেন' : 'Demo National ID Reference (Mock)'}
                </label>
                <input
                  type="text"
                  disabled
                  value={fakeNid}
                  className="w-full p-2 border border-slate-200 bg-slate-100 rounded font-mono text-slate-600"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {language === 'bn'
                    ? 'পরীক্ষামূলক যাচাইয়ের জন্য নির্ধারিত নমুনা টোকেন।'
                    : 'Fixed demo token for simulated verification.'}
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'যোগাযোগের মোবাইল নম্বর (সিমুলেটেড)' : 'Contact Mobile (Simulated)'}
                </label>
                <input
                  type="text"
                  value={fakePhone}
                  onChange={(e) => setFakePhone(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-slate-800"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'পরবর্তী: উদ্দেশ্য ও আইনি অঙ্গীকার' : 'Next: Purpose & Acknowledgement'}{' '}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn'
                ? 'সংবিধিবদ্ধ আইনি অঙ্গীকার ও সতর্কতামূলক শর্তাবলী'
                : 'Statutory Acknowledgements & Due Diligence Terms'}
            </h3>

            <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-950 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                {language === 'bn' ? 'বৈধ উদ্দেশ্যের আবশ্যিকতা' : 'Legal Purpose Mandate'}
              </span>
              <p className="leading-relaxed font-normal">
                {language === 'bn'
                  ? 'বাস্তব ক্ষেত্রে, রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইনের ৮৯ ধারা এবং ভূমি মন্ত্রণালয়ের নীতিমালা অনুযায়ী শুধুমাত্র বৈধ জমি ক্রয়ের স্বার্থ সংশ্লিষ্ট পক্ষকে সীমিত পরিসরে সিগন্যাল যাচাইয়ের সুযোগ দেওয়া হয়।'
                  : 'In a production deployment, access to pre-registration transaction signals would be granted solely under Section 89 of the SAT Act and lawful land transaction due diligence regulations.'}
              </p>
            </div>

            <div className="space-y-3 text-xs pt-1">
              <label className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={purposeAck}
                  onChange={(e) => setPurposeAck(e.target.checked)}
                  className="mt-0.5 rounded text-gov-primary"
                />
                <span className="text-slate-700 leading-snug">
                  {language === 'bn'
                    ? 'আমি স্বীকার করছি যে আমি একজন সম্ভাব্য ক্রেতা বা স্বার্থসংশ্লিষ্ট পক্ষ হিসেবে নির্দিষ্ট প্লটের তথ্য জানতে অনুসন্ধান করছি।'
                    : 'I acknowledge that I am acting as a prospective buyer, legal counsel, or authorized party with legitimate interest in the parcels I query.'}
                </span>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={privacyAck}
                  onChange={(e) => setPrivacyAck(e.target.checked)}
                  className="mt-0.5 rounded text-gov-primary"
                />
                <span className="text-slate-700 leading-snug">
                  {language === 'bn'
                    ? 'আমি বুঝতে পেরেছি যে এটি একটি মূল্যায়ন প্রোটোটাইপ এবং এতে কোনো সাধারণ নাগরিকের ব্যক্তিগত তথ্য অপব্যবহার বা স্ক্র্যাপ করা হয় না।'
                    : 'I understand that this prototype is for evaluation purposes only and will never use scraped or real citizen personal data.'}
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {language === 'bn' ? 'পূর্ববর্তী' : 'Back'}
              </button>

              <button
                type="button"
                disabled={!purposeAck || !privacyAck || simulating}
                onClick={handleSimulateVerification}
                className="px-5 py-2 bg-gov-primary hover:bg-gov-primaryHover disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                {simulating
                  ? language === 'bn'
                    ? 'যাচাই প্রক্রিয়া চলছে...'
                    : 'Simulating Verification...'
                  : language === 'bn'
                  ? 'পরিচয় নিশ্চিত করুন (সিমুলেশন)'
                  : 'Simulate Verification'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4 py-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                {language === 'bn' ? 'যাচাইকৃত (ডেমো)' : 'Verified (demo)'}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {language === 'bn' ? 'সিমুলেটেড পরিচয় সফলভাবে নিশ্চিত হয়েছে' : 'Simulated Identity Confirmed'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                {language === 'bn' ? (
                  <>
                    টোকেন <strong className="text-slate-700">{currentUser.maskedNid}</strong> সক্রিয়। এখন আপনি নির্দিষ্ট প্লটের তথ্য আবেদনের পূর্বশর্ত পূরণ করেছেন।
                  </>
                ) : (
                  <>
                    Token <strong>{currentUser.maskedNid}</strong> is active. You have met the pre-condition to request controlled land signals.
                  </>
                )}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left text-xs max-w-md mx-auto space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'bn' ? 'আবেদনকারী:' : 'Applicant:'}</span>
                <span className="font-semibold text-slate-800">{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'bn' ? 'যাচাই অবস্থা:' : 'Simulated Status:'}</span>
                <span className="text-emerald-700 font-semibold">{language === 'bn' ? 'যাচাইকৃত (ডেমো)' : 'Verified (demo)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'bn' ? 'যাচাই সময়:' : 'Timestamp:'}</span>
                <span className="text-slate-700 font-mono text-[11px]">
                  {currentUser.verifiedAt || new Date().toISOString()}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/citizen/new-request"
                className="px-5 py-2.5 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                {language === 'bn' ? 'নতুন আবেদনে এগিয়ে যান' : 'Proceed to New Request'} <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset back to Unverified to test the unverified blocking rule"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                {language === 'bn' ? 'অযাচাইকৃত অবস্থায় রিসেট করুন (নিয়ম পরীক্ষা)' : 'Reset to Unverified (Test Rule)'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
