import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useUI } from '../../context/UIContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import {
  Bell, Menu, X, FileText, CheckCircle, AlertCircle,
  Home, FilePlus, List, Search, History, User, LayoutDashboard,
  FileCheck2, Shield, Settings2, Clock, ChevronRight,
  MapPin, Calculator, Compass, Volume2, VolumeX, Sparkles, Command,
} from 'lucide-react';

const roleIcons: Record<string, React.ReactNode> = {
  citizen: <User className="w-3.5 h-3.5" />,
  reviewer: <FileCheck2 className="w-3.5 h-3.5" />,
  auditor: <Shield className="w-3.5 h-3.5" />,
  admin: <Settings2 className="w-3.5 h-3.5" />,
};

const roleColors: Record<string, string> = {
  citizen: 'from-teal-600 to-teal-700',
  reviewer: 'from-blue-600 to-blue-700',
  auditor: 'from-violet-600 to-violet-700',
  admin: 'from-slate-600 to-slate-700',
};

export const Header: React.FC = () => {
  const { currentRole, currentUser, unreadCount } = useApp();
  const { language, t } = useLanguage();
  const { openCommandPalette, openCadastralMap, openCalculator, openTour } = useUI();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  interface NavLinkItem { to: string; label: string; badge?: number; icon?: React.ReactNode; }

  const navLinks: Record<string, NavLinkItem[]> = {
    citizen: [
      { to: '/citizen', label: t.nav.overview, icon: <Home className="w-3.5 h-3.5" /> },
      { to: '/citizen/new-request', label: t.nav.newRequest, icon: <FilePlus className="w-3.5 h-3.5" /> },
      { to: '/citizen/requests', label: t.nav.myRequests, icon: <List className="w-3.5 h-3.5" /> },
      { to: '/citizen/parcel-risk', label: t.nav.parcelRisk, icon: <Search className="w-3.5 h-3.5" /> },
      { to: '/citizen/access-history', label: t.nav.accessHistory, icon: <History className="w-3.5 h-3.5" /> },
      { to: '/citizen/notifications', label: t.nav.notifications, icon: <Bell className="w-3.5 h-3.5" />, badge: unreadCount },
      { to: '/citizen/profile', label: t.nav.profile, icon: <User className="w-3.5 h-3.5" /> },
    ],
    reviewer: [
      { to: '/reviewer', label: t.nav.reviewerDashboard, icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
      { to: '/reviewer/requests', label: t.nav.pendingRequests, icon: <List className="w-3.5 h-3.5" /> },
      { to: '/reviewer/history', label: t.nav.decisionHistory, icon: <History className="w-3.5 h-3.5" /> },
      { to: '/reviewer/parcels', label: t.nav.cadastralOverlap, icon: <Search className="w-3.5 h-3.5" /> },
      { to: '/citizen/notifications', label: t.nav.notifications, icon: <Bell className="w-3.5 h-3.5" />, badge: unreadCount },
    ],
    auditor: [
      { to: '/auditor', label: t.nav.auditTrail, icon: <Shield className="w-3.5 h-3.5" /> },
      { to: '/auditor/access-history', label: t.nav.tokenLifecycle, icon: <Clock className="w-3.5 h-3.5" /> },
      { to: '/auditor/sources', label: t.nav.feedHealth, icon: <Search className="w-3.5 h-3.5" /> },
    ],
    admin: [
      { to: '/admin', label: t.nav.roleGovernance, icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
      { to: '/admin/settings', label: t.nav.slaPolicy, icon: <Settings2 className="w-3.5 h-3.5" /> },
      { to: '/admin/demo-data', label: t.nav.demoSeeds, icon: <FileText className="w-3.5 h-3.5" /> },
      { to: '/admin/status', label: t.nav.systemStatus, icon: <Shield className="w-3.5 h-3.5" /> },
    ],
  };

  const links = navLinks[currentRole] || navLinks.citizen;

  return (
    <header
      className={`bg-white sticky top-0 z-30 transition-all duration-200 ${
        scrolled
          ? 'shadow-float border-b border-slate-200/80'
          : 'border-b border-slate-200/60 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColors[currentRole] || roleColors.citizen} flex items-center justify-center shadow-glow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-glow-teal`}>
              <FileText className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                  {language === 'bn' ? 'ল্যান্ডটেক বিডি' : 'LandTech BD'}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-50 text-gov-primary border border-teal-200/80">
                  ভূমিভেরিফাই
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{t.appTagline}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label={language === 'bn' ? 'প্রধান নেভিগেশন' : 'Primary navigation'}
            className="hidden lg:flex items-center gap-0.5"
          >
            {links.map((link) => {
              const isActive = location.pathname === link.to ||
                (link.to !== '/citizen' && link.to !== '/reviewer' && link.to !== '/auditor' && link.to !== '/admin' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-gov-primary font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gov-primary rounded-full" />
                  )}
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 ? (
                    <span className="ml-0.5 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold bg-rose-500 text-white flex items-center justify-center">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Area */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Spotlight Search Bar */}
            <button
              onClick={openCommandPalette}
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 text-xs text-slate-600 hover:text-slate-900 transition-all shadow-2xs group"
              title={language === 'bn' ? 'দ্রুত অনুসন্ধান (Ctrl+K)' : 'Quick Search (Ctrl+K)'}
            >
              <Search className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-xs">{language === 'bn' ? 'অনুসন্ধান...' : 'Search...'}</span>
              <kbd className="text-[10px] bg-white border border-slate-200 px-1 rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Cadastral Map Quick Button */}
            <button
              onClick={() => openCadastralMap()}
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-all"
              title={language === 'bn' ? 'ডিজিটাল মৌজা নকশা' : 'Cadastral Survey Map'}
            >
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden xl:inline">{language === 'bn' ? 'নকশা' : 'Map'}</span>
            </button>

            {/* Fee Calculator Quick Button */}
            <button
              onClick={openCalculator}
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
              title={language === 'bn' ? 'জমি রেজিস্ট্রেশন ও নামজারি ফি ক্যালকুলেটর' : 'Fee Estimator'}
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden xl:inline">{language === 'bn' ? 'ফি' : 'Fees'}</span>
            </button>

            {/* Tour Guide Button */}
            <button
              onClick={openTour}
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-violet-700 hover:bg-violet-50 border border-transparent hover:border-violet-200 transition-all"
              title={language === 'bn' ? 'প্ল্যাটফর্ম গাইড' : 'Guided Tour'}
            >
              <Compass className="w-3.5 h-3.5 text-violet-600" />
              <span className="hidden xl:inline">{language === 'bn' ? 'গাইড' : 'Tour'}</span>
            </button>

            <LanguageSwitcher />

            {/* Identity Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs transition-all duration-150 hover:border-slate-300">
              {currentUser.identityStatus === 'verified_demo' ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 font-medium truncate max-w-[120px]">{t.nav.verifiedDemo}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-amber-800 font-medium">{t.nav.unverified}</span>
                  <Link to="/citizen/verify-identity" className="text-[10px] text-gov-primary hover:underline font-bold ml-0.5">
                    {t.nav.verifyNow}
                  </Link>
                </>
              )}
            </div>

            {/* Notification Bell */}
            <Link
              to="/citizen/notifications"
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white notification-ping" />
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150"
              aria-label={language === 'bn'
                ? (mobileMenuOpen ? 'নেভিগেশন মেনু বন্ধ করুন' : 'নেভিগেশন মেনু খুলুন')
                : (mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'mobile-navigation' : undefined}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label={language === 'bn' ? 'মোবাইল নেভিগেশন' : 'Mobile navigation'}
            className="lg:hidden py-3 border-t border-slate-100 animate-slide-down"
          >
            <div className="flex items-center justify-between px-3 py-2 mb-2 bg-slate-50 rounded-lg text-xs">
              <div className="flex items-center gap-1.5">
                {currentUser.identityStatus === 'verified_demo'
                  ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  : <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                <span className="font-medium text-slate-700">
                  {currentUser.identityStatus === 'verified_demo' ? t.nav.verifiedDemo : t.nav.unverified}
                </span>
              </div>
              <LanguageSwitcher />
            </div>
            <div className="space-y-0.5">
              {links.map((link) => {
                const isActive = location.pathname === link.to ||
                  (link.to !== '/citizen' && link.to !== '/reviewer' && link.to !== '/auditor' && link.to !== '/admin' && location.pathname.startsWith(link.to));
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive ? 'bg-teal-50 text-gov-primary' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {link.badge && link.badge > 0 ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{link.badge}</span>
                      ) : null}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
