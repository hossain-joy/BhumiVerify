import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  ShieldCheck,
  Menu,
  X,
  Home,
  Search,
  Info,
  HelpCircle,
  FileSearch,
  UserPlus,
  LogIn,
  LogOut,
  LayoutDashboard,
  FileText,
  GitCompare,
  CheckSquare,
  FolderOpen,
  Bell,
  ChevronDown,
  User,
  Settings,
  Database,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { savedChecks } = useSavedChecks();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dropdown states
  const [recordsDropdownOpen, setRecordsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const recordsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or navigation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (recordsRef.current && !recordsRef.current.contains(target)) {
        setRecordsDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(target)) {
        setResourcesDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setRecordsDropdownOpen(false);
    setResourcesDropdownOpen(false);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Metrics for badges
  const totalChecks = savedChecks?.length || 0;

  const isRecordsActive =
    location.pathname.startsWith('/checks') ||
    location.pathname.startsWith('/compare');

  const isResourcesActive =
    location.pathname.startsWith('/how-it-works') ||
    location.pathname.startsWith('/demo') ||
    location.pathname.startsWith('/help') ||
    location.pathname.startsWith('/about');

  return (
    <header
      className={`bg-white sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'shadow-md border-b border-slate-200/90'
          : 'border-b border-slate-200/80 shadow-2xs'
      }`}
    >
      {/* Top Civic Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" className="w-3.5 h-3.5 rounded-full bg-white object-contain" />
            <span className="font-semibold text-slate-200">
              {isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • ভূমি মন্ত্রণালয়' : "Government of the People's Republic of Bangladesh • Ministry of Land"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* 1. Left: Brand & Wordmark */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-3 group shrink-0"
            aria-label="BhumiVerify Home"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-105 shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="ভূমি মন্ত্রণালয় / BhumiVerify"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                  {isBn ? 'ভূমিভেরিফাই' : 'BhumiVerify'}
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-gov-primary px-1.5 py-0.2 rounded hidden sm:inline-block">
                  {isBn ? 'অনলাইন' : 'Digital'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block -mt-0.5">
                {isBn ? 'ভূমি প্রাক-নিবন্ধন যাচাই পোর্টাল' : 'Land Due Diligence Portal'}
              </span>
            </div>
          </Link>

          {/* 2. Center: Harmonious Navigation Menu (Desktop) */}
          <nav
            aria-label={isBn ? 'প্রধান মেনু' : 'Main Navigation'}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {/* Home or Dashboard */}
            <Link
              to={isAuthenticated ? '/dashboard' : '/'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                (isAuthenticated && location.pathname === '/dashboard') ||
                (!isAuthenticated && location.pathname === '/')
                  ? 'bg-emerald-50 text-gov-primary font-bold shadow-2xs border border-emerald-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              {isAuthenticated ? (
                <LayoutDashboard className="w-4 h-4 text-gov-primary" />
              ) : (
                <Home className="w-4 h-4 text-slate-500" />
              )}
              <span>{isBn ? (isAuthenticated ? 'ড্যাশবোর্ড' : 'মূল পাতা') : (isAuthenticated ? 'Dashboard' : 'Home')}</span>
            </Link>

            {/* Section 1: Saved Records (When Authenticated) */}
            {isAuthenticated && (
              <div className="relative" ref={recordsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setRecordsDropdownOpen(!recordsDropdownOpen);
                    setResourcesDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                    isRecordsActive
                      ? 'bg-emerald-50 text-gov-primary font-bold shadow-2xs border border-emerald-200/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                  aria-expanded={recordsDropdownOpen}
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>{isBn ? 'সংরক্ষিত রেকর্ড' : 'Saved Records'}</span>
                  {totalChecks > 0 && (
                    <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                      {isBn ? toBengaliNumerals(totalChecks) : totalChecks}
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {recordsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-up">
                    <Link
                      to="/checks"
                      className="flex items-center justify-between px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-gov-primary" />
                        <span>{isBn ? 'সংরক্ষিত জমি তালিকা' : 'Saved Checks List'}</span>
                      </div>
                      {totalChecks > 0 && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {isBn ? toBengaliNumerals(totalChecks) : totalChecks}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/compare"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                    >
                      <GitCompare className="w-4 h-4 text-gov-primary" />
                      <span>{isBn ? 'প্রতিবেদন তুলনা' : 'Compare Reports'}</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Section 2: Resources & Guides */}
            <div className="relative" ref={resourcesRef}>
              <button
                type="button"
                onClick={() => {
                  setResourcesDropdownOpen(!resourcesDropdownOpen);
                  setRecordsDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  isResourcesActive
                    ? 'bg-emerald-50 text-gov-primary font-bold shadow-2xs border border-emerald-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-expanded={resourcesDropdownOpen}
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>{isBn ? 'সহায়িকা' : 'Resources'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-up">
                  <Link
                    to="/how-it-works"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'কিভাবে কাজ করে' : 'How It Works'}</span>
                  </Link>

                  <Link
                    to="/demo"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <FileSearch className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'প্রতিবেদন গ্যালারি' : 'Report Gallery'}</span>
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'প্রশ্নোত্তর ও সাহায্য' : 'FAQ & Support'}</span>
                  </Link>

                  <Link
                    to="/about"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <Info className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'আমাদের সম্পর্কে' : 'About Platform'}</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Primary CTA, Language, Notifications & User Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Primary Action CTA: Single, prominent Check Land button */}
            <Link
              to="/check-land"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gov-primary hover:bg-gov-primaryHover shadow-xs transition-transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>{isBn ? 'জমি অনুসন্ধান' : 'Check Land'}</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher compact={true} />

            {isAuthenticated ? (
              <>
                {/* Notifications Bell */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label={isBn ? 'নোটিফিকেশন দেখুন' : 'View notifications'}
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {notificationsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 z-50 animate-scale-up">
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                        <span className="text-sm font-bold text-slate-900">
                          {isBn ? 'নোটিফিকেশন' : 'Notifications'}
                        </span>
                        <Link
                          to="/notifications"
                          onClick={() => setNotificationsOpen(false)}
                          className="text-xs font-bold text-gov-primary hover:underline"
                        >
                          {isBn ? 'সব দেখুন' : 'View all'}
                        </Link>
                      </div>

                      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto py-1">
                        {notifications.slice(0, 4).map((n) => (
                          <div
                            key={n.id}
                            className={`p-2.5 text-sm rounded-lg transition-colors ${
                              n.isRead ? 'text-slate-500' : 'bg-emerald-50/50 text-slate-800 font-semibold'
                            }`}
                          >
                            <p className="line-clamp-2 leading-relaxed">{isBn ? (n.titleBn || n.title) : n.title}</p>
                            <span className="text-xs text-slate-400 mt-1 block">
                              {n.timestamp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Avatar & Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition-colors cursor-pointer"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-8 h-8 rounded-full bg-gov-primary text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                      {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:inline text-sm font-bold text-slate-800 max-w-[120px] truncate">
                      {currentUser?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-up">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">{currentUser?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                        <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200">
                          {isBn ? 'নিবন্ধিত সদস্য' : 'Verified Member'}
                        </span>
                      </div>

                      <div className="py-1 text-sm font-medium">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'আমার প্রোফাইল' : 'Profile'}</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'সেটিংস' : 'Settings'}</span>
                        </Link>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <Database className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'অ্যাডমিন কনসোল' : 'Admin Console'}</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{isBn ? 'লগআউট' : 'Log out'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/80"
                >
                  <span className="flex items-center gap-1.5">
                    <LogIn className="w-4 h-4" />
                    <span>{isBn ? 'লগইন' : 'Log in'}</span>
                  </span>
                </Link>

                <Link
                  to="/register"
                  className="btn-primary text-sm px-4 py-2 font-bold inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isBn ? 'অ্যাকাউন্ট খুলুন' : 'Sign up'}</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-gov-primary cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 4. Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="lg:hidden py-4 border-t border-slate-200 space-y-4 animate-fade-up max-h-[80vh] overflow-y-auto"
          >
            {/* User Profile Card (if logged in) */}
            {isAuthenticated && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-gov-primary text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-900 truncate">{currentUser?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-rose-600 font-bold p-1 hover:underline"
                >
                  {isBn ? 'লগআউট' : 'Log out'}
                </button>
              </div>
            )}

            {/* Section 1: Verification & Records */}
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 px-3 tracking-wider block">
                {isBn ? '১. জমি যাচাই ও রেকর্ড' : '1. Verification & Records'}
              </span>

              <Link
                to={isAuthenticated ? '/dashboard' : '/'}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                <LayoutDashboard className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? (isAuthenticated ? 'ড্যাশবোর্ড' : 'হোম') : (isAuthenticated ? 'Dashboard' : 'Home')}</span>
              </Link>

              <Link
                to="/check-land"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                <Search className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'নতুন জমি যাচাই' : 'Check a Land Parcel'}</span>
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/checks"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-gov-primary" />
                      <span>{isBn ? 'সংরক্ষিত জমি' : 'Saved Checks'}</span>
                    </div>
                    {totalChecks > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {isBn ? toBengaliNumerals(totalChecks) : totalChecks}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/compare"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
                  >
                    <GitCompare className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'প্রতিবেদন তুলনা' : 'Compare Reports'}</span>
                  </Link>
                </>
              )}
            </div>

            {/* Section 2: Resources & Guides */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block">
                {isBn ? '২. সহায়িকা ও নির্দেশিকা' : '2. Guides & Information'}
              </span>

              <Link
                to="/how-it-works"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <HelpCircle className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'কিভাবে কাজ করে' : 'How It Works'}</span>
              </Link>

              <Link
                to="/demo"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <FileSearch className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'প্রতিবেদন গ্যালারি' : 'Report Gallery'}</span>
              </Link>

              <Link
                to="/help"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <HelpCircle className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'প্রশ্নোত্তর ও সাহায্য' : 'FAQ & Support'}</span>
              </Link>
            </div>

            {/* Section 3: Account Actions */}
            {isAuthenticated ? (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block">
                  {isBn ? '৩. অ্যাকাউন্ট ও সেটিংস' : '3. Account & Settings'}
                </span>
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{isBn ? 'আমার প্রোফাইল' : 'Profile'}</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>{isBn ? 'সেটিংস' : 'Settings'}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isBn ? 'লগআউট' : 'Log out'}</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{isBn ? 'লগইন' : 'Log in'}</span>
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-xs px-3 py-2.5 font-bold flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'অ্যাকাউন্ট খুলুন' : 'Sign up'}</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
