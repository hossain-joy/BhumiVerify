import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import {
  Bell,
  Menu,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRole, currentUser, unreadCount } = useApp();
  const { language, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  interface NavLinkItem {
    to: string;
    label: string;
    badge?: number;
  }

  // Role-based navigation links using translations
  const navLinks: Record<string, NavLinkItem[]> = {
    citizen: [
      { to: '/citizen', label: t.nav.overview },
      { to: '/citizen/new-request', label: t.nav.newRequest },
      { to: '/citizen/requests', label: t.nav.myRequests },
      { to: '/citizen/parcel-risk', label: t.nav.parcelRisk },
      { to: '/citizen/access-history', label: t.nav.accessHistory },
      { to: '/citizen/notifications', label: t.nav.notifications, badge: unreadCount },
      { to: '/citizen/profile', label: t.nav.profile },
    ],
    reviewer: [
      { to: '/reviewer', label: t.nav.reviewerDashboard },
      { to: '/reviewer/requests', label: t.nav.pendingRequests },
      { to: '/reviewer/history', label: t.nav.decisionHistory },
      { to: '/reviewer/parcels', label: t.nav.cadastralOverlap },
      { to: '/citizen/notifications', label: t.nav.notifications, badge: unreadCount },
    ],
    auditor: [
      { to: '/auditor', label: t.nav.auditTrail },
      { to: '/auditor/access-history', label: t.nav.tokenLifecycle },
      { to: '/auditor/sources', label: t.nav.feedHealth },
    ],
    admin: [
      { to: '/admin', label: t.nav.roleGovernance },
      { to: '/admin/settings', label: t.nav.slaPolicy },
      { to: '/admin/demo-data', label: t.nav.demoSeeds },
      { to: '/admin/status', label: t.nav.systemStatus },
    ],
  };

  const links = navLinks[currentRole] || navLinks.citizen;

  return (
    <header className="bg-white/95 backdrop-blur-xs border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-gov-primary flex items-center justify-center text-white shadow-xs group-hover:bg-gov-primaryHover transition-colors">
                <div className="relative">
                  <FileText className="w-5 h-5 text-teal-100" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-900 ring-2 ring-gov-primary">
                    BD
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                    {language === 'bn' ? 'ল্যান্ডটেক বিডি' : 'LandTech BD'}
                  </span>
                  <span className="text-xs font-semibold px-1.5 py-0.2 rounded bg-teal-50 text-gov-primary border border-teal-200">
                    ভূমিভেরিফাই
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  {t.appTagline}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors relative ${
                    isActive
                      ? 'bg-gov-lightTeal text-gov-primary font-semibold border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                  {link.badge && link.badge > 0 ? (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Language Switcher, Identity Badge, Notifications */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Language Switcher */}
            <LanguageSwitcher />

            {/* Identity Badge */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs">
              {currentUser.identityStatus === 'verified_demo' ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700 font-medium truncate max-w-[140px]">
                    {t.nav.verifiedDemo}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-amber-800 font-medium">{t.nav.unverified}</span>
                  <Link
                    to="/citizen/verify-identity"
                    className="text-[11px] text-gov-primary hover:underline font-semibold"
                  >
                    {t.nav.verifyNow}
                  </Link>
                </>
              )}
            </div>

            {/* Notification Bell */}
            <Link
              to="/citizen/notifications"
              className="relative p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title={t.nav.notifications}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1 animate-in fade-in">
            <div className="px-3 py-2 bg-slate-50 rounded-md mb-2 text-xs flex items-center justify-between">
              <span className="text-slate-500">{language === 'bn' ? 'পরিচয়:' : 'Identity:'}</span>
              <span className="font-semibold text-slate-800">
                {currentUser.identityStatus === 'verified_demo'
                  ? t.nav.verifiedDemo
                  : t.nav.unverified}
              </span>
            </div>
            <div className="px-3 py-2 bg-slate-50 rounded-md mb-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {language === 'bn' ? 'ভাষা নির্বাচন / Language:' : 'Language:'}
              </span>
              <LanguageSwitcher />
            </div>

            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-gov-lightTeal text-gov-primary font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
