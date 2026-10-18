import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Info,
  Check,
  ArrowRight,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, isLoading, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Password requirements calculation
  const hasMinLength = password.length >= 8;
  const hasNumberOrSymbol = /[\d!@#$%^&*]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(isBn ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।' : 'Please provide your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError(isBn ? 'অনুগ্রহ করে সঠিক ইমেইল ঠিকানা প্রদান করুন।' : 'Please provide a valid email address.');
      return;
    }

    if (!hasMinLength) {
      setError(isBn ? 'পাসওয়ার্ড কমপক্ষে ৮টি অক্ষরের হতে হবে।' : 'Password must be at least 8 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setError(isBn ? 'পাসওয়ার্ড দুটি মেলেনি। অনুগ্রহ করে আবার পরীক্ষা করুন।' : 'Passwords do not match. Please verify both fields.');
      return;
    }

    if (!acceptedTerms) {
      setError(isBn ? 'অ্যাকাউন্ট তৈরি করতে শর্তাবলী ও গোপনীয়তা নীতিতে সম্মত হতে হবে।' : 'You must accept the terms of service and demo privacy notice to create an account.');
      return;
    }

    const res = await register({ name, email, password });
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } else {
      setError(res.error || (isBn ? 'অ্যাকাউন্ট তৈরি করা যায়নি।' : 'Failed to create account.'));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 animate-fade-up">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <LanguageSwitcher compact={true} />
          </div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gov-primary text-white shadow-sm mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isBn ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create an Account'}
          </h1>
          <p className="text-xs text-slate-500">
            {isBn
              ? 'জমির যাচাইকরণ সংরক্ষণ করুন এবং যাচাই পরিকল্পনা পর্যবেক্ষণ করুন।'
              : 'Start saving parcel due-diligence checks and tracking verification plans.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          {error && (
            <div
              className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
              role="status"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isBn
                  ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...'
                  : 'Account created successfully! Preparing your dashboard...'}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="reg-name"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {isBn ? 'পূর্ণ নাম' : 'Full name'}
              </label>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isBn ? 'যেমন: তানভীর হোসেন' : 'e.g. Tanvir Hossain'}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {isBn ? 'ইমেইল ঠিকানা' : 'Email address'}
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {isBn ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isBn ? 'কমপক্ষে ৮টি অক্ষর' : 'At least 8 characters'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary focus:border-transparent pr-10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? (isBn ? 'পাসওয়ার্ড লুকান' : 'Hide password') : (isBn ? 'পাসওয়ার্ড দেখুন' : 'Show password')}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Checklist */}
              <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                      hasMinLength
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {hasMinLength && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <span className={hasMinLength ? 'text-emerald-700 font-medium' : ''}>
                    {isBn ? 'কমপক্ষে ৮ অক্ষরের হতে হবে' : 'At least 8 characters long'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                      hasNumberOrSymbol
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {hasNumberOrSymbol && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <span className={hasNumberOrSymbol ? 'text-emerald-700 font-medium' : ''}>
                    {isBn ? 'সংখ্যা বা বিশেষ চিহ্ন থাকতে হবে' : 'Contains a number or special symbol'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-confirm-password"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {isBn ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm password'}
              </label>
              <input
                id="reg-confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={isBn ? 'পুনরায় পাসওয়ার্ড লিখুন' : 'Re-enter password'}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary focus:border-transparent transition-all"
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-[11px] text-rose-600 mt-1">
                  {isBn ? 'পাসওয়ার্ড দুটি মেলেনি।' : 'Passwords do not match.'}
                </p>
              )}
            </div>

            <div className="pt-1">
              <div className="flex items-start">
                <input
                  id="reg-terms"
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-gov-primary focus:ring-gov-primary cursor-pointer"
                />
                <label
                  htmlFor="reg-terms"
                  className="ml-2.5 block text-xs text-slate-600 leading-normal cursor-pointer"
                >
                  {isBn ? (
                    <>
                      আমি ভূমিভেরিফাই-এর{' '}
                      <Link to="/terms" target="_blank" className="font-semibold text-gov-primary underline">
                        শর্তাবলী
                      </Link>{' '}
                      এবং{' '}
                      <Link to="/privacy" target="_blank" className="font-semibold text-gov-primary underline">
                        গোপনীয়তা নীতি
                      </Link>
                      -তে সম্মতি দিচ্ছি।
                    </>
                  ) : (
                    <>
                      I agree to the{' '}
                      <Link to="/terms" target="_blank" className="font-semibold text-gov-primary underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" target="_blank" className="font-semibold text-gov-primary underline">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full btn-primary py-2.5 px-4 font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</span>
                </>
              )}
            </button>
          </form>

          {/* Already have an account */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500">
              {isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already registered?'}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gov-primary hover:text-emerald-800 hover:underline"
            >
              <span>{isBn ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in to your account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
