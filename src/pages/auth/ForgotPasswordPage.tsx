import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import { ShieldCheck, Mail, ArrowLeft, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError(isBn ? 'সঠিক ইমেইল ঠিকানা প্রদান করুন।' : 'Please provide a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4 sm:px-6 animate-fade-up">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <LanguageSwitcher compact={true} />
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-1 mb-2">
            <img src="/logo.png" alt="ভূমি মন্ত্রণালয়" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isBn ? 'পাসওয়ার্ড রিসেট করুন' : 'Reset Your Password'}
          </h1>
          <p className="text-xs text-slate-500">
            {isBn
              ? 'পাসওয়ার্ড রিসেট সংক্রান্ত নির্দেশনার জন্য আপনার নিবন্ধিত ইমেইল দিন।'
              : 'Enter your registered email to receive password reset instructions.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          {submitted ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {isBn ? 'রিসেট নির্দেশনা পাঠানো হয়েছে' : 'Reset Instructions Sent'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn ? (
                    <>
                      আপনার ইমেইল <strong className="text-slate-800">{email}</strong> ঠিকানায় পাসওয়ার্ড রিসেট নির্দেশিকা পাঠানো হয়েছে। আপনার ইনবক্স চেক করুন।
                    </>
                  ) : (
                    <>
                      A secure password reset link has been sent to{' '}
                      <strong className="text-slate-800">{email}</strong>. Please check your inbox.
                    </>
                  )}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full btn-primary py-2.5 px-4 font-bold text-xs inline-flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'লগইন পাতায় ফিরে যান' : 'Return to Sign In'}</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'অ্যাকাউন্ট ইমেইল ঠিকানা' : 'Account email address'}
                </label>
                <div className="relative">
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary focus:border-transparent transition-all"
                  />
                  <Mail className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-2.5 px-4 font-bold text-sm cursor-pointer shadow-xs"
              >
                {isBn ? 'রিসেট লিংক পাঠান' : 'Send Reset Link'}
              </button>

              <div className="pt-2 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'লগইন পাতায় ফিরে যান' : 'Back to Sign In'}</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
