import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, EyeOff, HardDrive, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-gov-primary" />
          <span>{isBn ? 'গোপনীয়তা নীতি' : 'Privacy Notice'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'গোপনীয়তা নীতি ও ডেটা সুরক্ষা' : 'Privacy Policy & Data Protection'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn ? 'সর্বশেষ হালনাগাদ: ২০২৬ • ভূমিভেরিফাই নাগরিক প্ল্যাটফর্ম' : 'Last updated: 2026 • BhumiVerify Platform'}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '১. কী তথ্য সংরক্ষিত হয় এবং কোথায়' : '1. What Data is Stored and Where'}</span>
          </h2>
          <p>
            {isBn
              ? 'ভূমিভেরিফাই ব্যবহার করার সময় আপনার ব্রাউজারের লোকাল স্টোরেজে নিচের তথ্যগুলো সংরক্ষিত থাকে:'
              : "When you use BhumiVerify, the following information is securely managed within your browser session:"}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              <strong>{isBn ? 'ব্যবহারকারী অ্যাকাউন্ট:' : 'User Account:'}</strong>{' '}
              {isBn ? 'সেশন পরিচালনা ও সনাক্তকরণের জন্য নাম ও ইমেইল।' : 'Display name and email identifier for session continuity.'}
            </li>
            <li>
              <strong>{isBn ? 'সংরক্ষিত জমি যাচাই:' : 'Saved Parcel Checks:'}</strong>{' '}
              {isBn ? 'আপনার সংরক্ষিত খতিয়ান ও দাগ নম্বরের তালিকা।' : 'Parcel identifiers and status records that you choose to save.'}
            </li>
            <li>
              <strong>{isBn ? 'যাচাই পরিকল্পনা ও নোট:' : 'Verification Tasks & Notes:'}</strong>{' '}
              {isBn ? 'ব্যবহারকারীর তৈরি কাজের তালিকা ও ব্যক্তিগত অনুসন্ধান নোট।' : 'User-created due diligence tasks and personal reminders.'}
            </li>
            <li>
              <strong>{isBn ? 'বিজ্ঞপ্তি:' : 'Notifications:'}</strong>{' '}
              {isBn ? 'কার্যক্রম সংক্রান্ত সতর্কতা ও রিমাইন্ডার বার্তা।' : 'Milestone and task reminder alerts.'}
            </li>
          </ul>
          <p className="text-[11px] text-slate-500 pt-1">
            {isBn ? (
              <>
                সংরক্ষিত ডেটা শুধুমাত্র আপনার নিজস্ব ডিভাইসের ব্রাউজারে সংরক্ষিত থাকে। আপনি যেকোনো সময়{' '}
                <Link to="/settings" className="font-semibold text-gov-primary underline">
                  সেটিংস
                </Link>{' '}
                থেকে সমস্ত ডেটা পরিচালনা বা মুছে ফেলতে পারেন।
              </>
            ) : (
              <>
                Saved data remains securely within your local browser profile. You can manage or clear all saved records at any time via{' '}
                <Link to="/settings" className="font-semibold text-gov-primary underline">
                  Settings
                </Link>
                .
              </>
            )}
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '২. আমরা কখনোই যেসব তথ্য সংগ্রহ করি না' : '2. What We Never Collect'}</span>
          </h2>
          <p>
            {isBn
              ? 'নাগরিকদের কঠোর গোপনীয়তা বজায় রাখার স্বার্থে:'
              : 'To uphold rigorous privacy boundaries for prospective property buyers:'}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              {isBn
                ? 'আমরা কখনোই জাতীয় পরিচয়পত্র (NID) নম্বর বা স্মার্ট কার্ডের তথ্য চাই না বা সংরক্ষণ করি না।'
                : 'We never ask for or store National Identity (NID) numbers or smart card credentials.'}
            </li>
            <li>
              {isBn
                ? 'আমরা কখনোই পাসওয়ার্ড প্লেইন টেক্সট বা নিরাপত্তাহীনভাবে সংরক্ষণ করি না।'
                : 'We never store real passwords in plaintext or unhashed formats.'}
            </li>
            <li>
              {isBn
                ? 'আমরা কখনোই স্পর্শকাতর মূল দলিল, খতিয়ান বা ব্যাংক স্টেটমেন্ট আপলোড করতে বলি না।'
                : 'We never ask you to upload sensitive original deeds or banking statements.'}
            </li>
            <li>
              {isBn
                ? 'আমরা কোনো আর্থিক লেনদেনের সংবেদনশীল ক্রেডিট কার্ড বা ব্যাংক পিন তথ্য সংগ্রহ করি না।'
                : 'We do not record financial payment credentials or banking PINs.'}
            </li>
          </ul>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '৩. গোপনীয়তা ও সুরক্ষা প্রতিশ্রুতি' : '3. Privacy & Security Commitment'}</span>
          </h2>
          <p>
            {isBn
              ? 'ভূমিভেরিফাই আপনার অনুসন্ধান ইতিহাস তৃতীয় কোনো বাণিজ্যিক প্রতিষ্ঠানের কাছে বিক্রয় করে না। আপনার অনুসন্ধানের তথ্য আপনার নিয়ন্ত্রণে সুরক্ষিত থাকে।'
              : 'BhumiVerify does not sell or distribute search histories to third-party commercial entities. Your property inquiries remain under your direct control.'}
          </p>
        </section>
      </div>
    </div>
  );
};
