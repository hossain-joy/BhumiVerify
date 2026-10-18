import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, quickDemoLogin, isLoading, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('demo@bhumisure.org');
  const [password, setPassword] = useState('demo-password-123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const destination = (location.state as any)?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(isBn ? 'অনুগ্রহ করে ইমেইল ঠিকানা প্রদান করুন।' : 'Please provide an email address.');
      return;
    }

    if (!password) {
      setError(isBn ? 'অনুগ্রহ করে আপনার পাসওয়ার্ড প্রদান করুন।' : 'Please provide your password.');
      return;
    }

    const res = await login({ email, password, rememberMe });
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 400);
    } else {
      setError(
        res.error || (isBn ? 'লগইন ব্যর্থ হয়েছে। সঠিক তথ্য প্রদান করুন।' : 'Failed to sign in.')
      );
    }
  };

  const handleQuickDemo = () => {
    quickDemoLogin();
    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6 animate-fade-up">
      <div className="max-w-md w-full space-y-6">
        {/* Header with Brand */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <LanguageSwitcher compact={true} />
          </div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gov-primary text-white shadow-sm mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isBn ? 'ভূমিভেরিফাইতে লগইন করুন' : 'Sign in to BhumiVerify'}
          </h1>
          <p className="text-xs text-slate-500">
            {isBn
              ? 'আপনার সংরক্ষিত জমির যাচাই, চেকলিস্ট ও তুলনা অ্যাক্সেস করুন।'
              : 'Access your saved land diligence checks, verification checklists, and comparisons.'}
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
                  ? 'সাইন-ইন সফল হয়েছে। ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...'
                  : 'Sign-in successful. Redirecting to workspace...'}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {isBn ? 'ইমেইল ঠিকানা' : 'Email address'}
              </label>
              <input
                id="login-email"
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
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  {isBn ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-gov-primary hover:underline"
                >
                  {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-gov-primary focus:ring-gov-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs text-slate-600 cursor-pointer"
              >
                {isBn ? 'এই ব্রাউজারে তথ্য মনে রাখুন' : 'Remember this browser session'}
              </label>
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
                  <LogIn className="w-4 h-4" />
                  <span>{isBn ? 'লগইন করুন' : 'Sign In'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-3 bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-300 rounded-lg text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isBn
                  ? '১-ক্লিকে তাৎক্ষণিক সাইন ইন (তানভীর হোসেন)'
                  : '1-Click Quick Sign In (Tanvir Hossain)'}
              </span>
            </button>
          </form>

          {/* Create Account Link */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500">
              {isBn ? 'এখনো কোনো অ্যাকাউন্ট নেই?' : "Don't have an account yet?"}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gov-primary hover:text-emerald-800 hover:underline"
            >
              <span>{isBn ? 'একটি নতুন অ্যাকাউন্ট খুলুন' : 'Create an account now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
