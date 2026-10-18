import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Info,
  Save,
  FileText,
  CreditCard,
  ArrowRight,
  Calendar,
  Layers,
} from 'lucide-react';
import { MonthlyQuotaCard } from '../../components/land/MonthlyQuotaCard';
import { getMonthlyQuota, QuotaStatus } from '../../utils/quotaService';
import { toBengaliNumerals } from '../../utils/formatStatus';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+880 1712-345678');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Monthly 5-application quota status
  const [quota, setQuota] = useState<QuotaStatus>(() => getMonthlyQuota(currentUser?.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });

    setFeedback(isBn ? 'আপনার লোকাল ব্রাউজারে প্রোফাইল সফলভাবে হালনাগাদ করা হয়েছে।' : 'Profile updated in your local browser profile.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <User className="w-3.5 h-3.5 text-gov-primary" />
          <span>{isBn ? 'ক্রেতার অ্যাকাউন্ট প্রোফাইল' : 'Buyer Account Profile'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {isBn ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'আপনার প্রোফাইল পরিচালনা করুন এবং ব্রাউজার মেমরি সেটিংস পর্যালোচনা করুন।'
            : 'Manage your account profile and review storage persistence parameters.'}
        </p>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {feedback && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'পূর্ণ নাম' : 'Full Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'ইমেইল ঠিকানা' : 'Email Address'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'মোবাইল নম্বর (ঐচ্ছিক)' : 'Phone Number (Optional)'}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-gov-primary" />
                <span>{isBn ? 'জাতীয় পরিচয়পত্র (NID) নম্বর' : 'National ID (NID) Number'}</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isBn ? 'নির্বাচন কমিশন (EC) ভেরিফাইড' : 'EC Verified'}</span>
              </span>
            </div>
            <input
              type="text"
              readOnly
              value={currentUser?.nid || '19922692015000142'}
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              {isBn
                ? 'লগইন করার সময় জাতীয় পরিচয়পত্র ডাটাবেজ দ্বারা যাচাই করা হয়েছে।'
                : 'National ID verified during authentication via Election Commission records.'}
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="btn-primary py-2.5 px-5 font-bold text-xs inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রোফাইল সংরক্ষণ করুন' : 'Save Profile Updates'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Monthly Verification Quota & Ledger Section */}
      <div className="space-y-4">
        <MonthlyQuotaCard
          quota={quota}
          onQuotaChange={setQuota}
        />

        {/* Verification applications ledger for current month */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gov-primary" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {isBn
                  ? `চলতি মাসে অনুমোদিত আবেদন বিবরণী (${quota.currentMonthNameBn})`
                  : `Verified Application Ledger (${quota.currentMonthName})`}
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {isBn
                ? `${toBengaliNumerals(quota.used)} / ${toBengaliNumerals(quota.limit)} টি ব্যবহৃত`
                : `${quota.used} of ${quota.limit} used`}
            </span>
          </div>

          {quota.applications.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <Layers className="w-8 h-8 text-slate-300 mx-auto" />
              <p>
                {isBn
                  ? 'চলতি মাসে এখনো কোনো জমির আবেদন বা যাচাই করা হয়নি।'
                  : 'No verification applications recorded for this month yet.'}
              </p>
              <div className="pt-2">
                <Link to="/check-land" className="btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5">
                  <span>{isBn ? 'নতুন জমি যাচাই করুন' : 'Verify a Land Parcel'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {quota.applications.map((app, index) => {
                const dateObj = new Date(app.timestamp);
                const dateFormatted = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
                const dateFormattedBn = `${toBengaliNumerals(dateObj.getDate())}/${toBengaliNumerals(dateObj.getMonth() + 1)}/${toBengaliNumerals(dateObj.getFullYear())}`;

                return (
                  <div
                    key={app.id || index}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 p-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {app.mouza}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600">
                          {isBn ? 'দাগ:' : 'Dag:'} {isBn ? toBengaliNumerals(app.dagNumber) : app.dagNumber}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600">
                          {isBn ? 'খতিয়ান:' : 'Khatian:'} {isBn ? toBengaliNumerals(app.khatianNumber) : app.khatianNumber}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {isBn ? 'পরিশোধিত ৳ ১৫০০' : 'Paid 1,500 BDT'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>{app.upazila}, {app.district}</span>
                        <span>•</span>
                        <span className="font-mono">{app.txnId}</span>
                        <span>•</span>
                        <span>{isBn ? dateFormattedBn : dateFormatted}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Link
                        to={`/results?id=${app.parcelId}&txn=${app.txnId}`}
                        className="btn-secondary py-1.5 px-3 text-[11px] font-bold text-gov-primary hover:text-gov-primary/80 inline-flex items-center gap-1"
                      >
                        <span>{isBn ? 'রিপোর্ট দেখুন' : 'View Report'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
