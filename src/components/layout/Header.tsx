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
  const [diligenceDropdownOpen, setDiligenceDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const recordsRef = useRef<HTMLDivElement>(null);
  const diligenceRef = useRef<HTMLDivElement>(null);
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
      if (diligenceRef.current && !diligenceRef.current.contains(target)) {
        setDiligenceDropdownOpen(false);
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
    setDiligenceDropdownOpen(false);
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
  const pendingTasks = (savedChecks || [])
    .flatMap((c) => c?.verificationTasks || [])
    .filter((t) => t && t.status !== 'completed').length;

  const isRecordsActive =
    location.pathname.startsWith('/checks') ||
    location.pathname.startsWith('/compare');

  const isDiligenceActive =
    location.pathname.startsWith('/verification-plan') ||
    location.pathname.startsWith('/documents');

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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" className="w-3.5 h-3.5 rounded-full bg-white object-contain" />
            <span className="font-semibold text-slate-200">
              {isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • ভূমি মন্ত্রণালয়' : "Government of the People's Republic of Bangladesh • Ministry of Land"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* 1. Left: Brand & Wordmark */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            aria-label="BhumiVerify Home"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-0.5 transition-transform duration-200 group-hover:scale-105 shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="ভূমি মন্ত্রণালয় / BhumiVerify"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                  {isBn ? 'ভূমিভেরিফাই' : 'BhumiVerify'}
                </span>
                <span className="text-[10px] font-semibold bg-emerald-50 text-gov-primary border border-emerald-200/80 px-1.5 py-0.2 rounded hidden sm:inline-flex items-center">
                  {isBn ? 'ভূমি মন্ত্রণালয়' : 'Ministry of Land'}
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Center: Logical Navigation Groups (Desktop) */}
          <nav
            aria-label={isBn ? 'প্রধান মেনু' : 'Main Navigation'}
            className="hidden lg:flex items-center gap-1"
          >
            {/* Home or Dashboard */}
            <Link
              to={isAuthenticated ? '/dashboard' : '/'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                (isAuthenticated && location.pathname === '/dashboard') ||
                (!isAuthenticated && location.pathname === '/')
                  ? 'bg-emerald-50 text-gov-primary border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isAuthenticated ? (
                <LayoutDashboard className="w-3.5 h-3.5" />
              ) : (
                <Home className="w-3.5 h-3.5" />
              )}
              <span>{isBn ? (isAuthenticated ? 'ড্যাশবোর্ড' : 'হোম') : (isAuthenticated ? 'Dashboard' : 'Home')}</span>
            </Link>

            {/* Check Land Primary Link */}
            <Link
              to="/check-land"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                location.pathname.startsWith('/check') || location.pathname.startsWith('/results')
                  ? 'bg-emerald-50 text-gov-primary border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-gov-primary" />
              <span>{isBn ? 'জমি যাচাই' : 'Check Land'}</span>
            </Link>

            {/* Section 1: My Records (When Authenticated) */}
            {isAuthenticated && (
              <div className="relative" ref={recordsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setRecordsDropdownOpen(!recordsDropdownOpen);
                    setDiligenceDropdownOpen(false);
                    setResourcesDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isRecordsActive
                      ? 'bg-emerald-50 text-gov-primary border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-expanded={recordsDropdownOpen}
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isBn ? 'আমার রেকর্ড' : 'My Records'}</span>
                  {totalChecks > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold ml-0.5">
                      {isBn ? toBengaliNumerals(totalChecks) : totalChecks}
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>

                {recordsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-scale-up">
                    <Link
                      to="/checks"
                      className="flex items-center justify-between px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gov-primary" />
                        <span>{isBn ? 'সংরক্ষিত জমি' : 'Saved Checks'}</span>
                      </div>
                      {totalChecks > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {isBn ? toBengaliNumerals(totalChecks) : totalChecks}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/compare"
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                    >
                      <GitCompare className="w-4 h-4 text-gov-primary" />
                      <span>{isBn ? 'প্রতিবেদন তুলনা' : 'Compare Reports'}</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Section 2: Due Diligence Hub */}
            <div className="relative" ref={diligenceRef}>
              <button
                type="button"
                onClick={() => {
                  setDiligenceDropdownOpen(!diligenceDropdownOpen);
                  setRecordsDropdownOpen(false);
                  setResourcesDropdownOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isDiligenceActive
                    ? 'bg-emerald-50 text-gov-primary border border-emerald-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-expanded={diligenceDropdownOpen}
              >
                <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>{isBn ? 'ডিউ ডিলিজেন্স' : 'Due Diligence'}</span>
                {pendingTasks > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-bold ml-0.5">
                    {isBn ? toBengaliNumerals(pendingTasks) : pendingTasks}
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {diligenceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-scale-up">
                  <Link
                    to="/verification-plan"
                    className="flex items-center justify-between px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-gov-primary" />
                      <span>{isBn ? 'যাচাই পরিকল্পনা' : 'Verification Plan'}</span>
                    </div>
                    {pendingTasks > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {isBn ? `${toBengaliNumerals(pendingTasks)} বাকি` : `${pendingTasks} left`}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/documents"
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <FolderOpen className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'দলিল চেকলিস্ট' : 'Document Checklist'}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Section 3: Resources & Guides */}
            <div className="relative" ref={resourcesRef}>
              <button
                type="button"
                onClick={() => {
                  setResourcesDropdownOpen(!resourcesDropdownOpen);
                  setRecordsDropdownOpen(false);
                  setDiligenceDropdownOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isResourcesActive
                    ? 'bg-emerald-50 text-gov-primary border border-emerald-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-expanded={resourcesDropdownOpen}
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>{isBn ? 'সহায়িকা ও তথ্য' : 'Resources'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-scale-up">
                  <Link
                    to="/how-it-works"
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'কিভাবে কাজ করে' : 'How It Works'}</span>
                  </Link>

                  <Link
                    to="/demo"
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <FileSearch className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'প্রতিবেদন গ্যালারি' : 'Report Gallery'}</span>
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'প্রশ্নোত্তর ও সাহায্য' : 'FAQ & Support'}</span>
                  </Link>

                  <Link
                    to="/about"
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-gov-primary transition-colors"
                  >
                    <Info className="w-4 h-4 text-gov-primary" />
                    <span>{isBn ? 'আমাদের সম্পর্কে' : 'About Platform'}</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Fast Actions, Language, Notifications & User Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Action: New Check CTA Button (Always visible on desktop) */}
            <Link
              to="/check-land"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gov-primary hover:bg-gov-primaryHover shadow-2xs transition-transform active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isBn ? 'নতুন জমি যাচাই' : 'New Check'}</span>
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
                    className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label={isBn ? 'নোটিফিকেশন দেখুন' : 'View notifications'}
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {notificationsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-scale-up">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-800">
                          {isBn ? 'নোটিফিকেশন' : 'Notifications'}
                        </span>
                        <Link
                          to="/notifications"
                          onClick={() => setNotificationsOpen(false)}
                          className="text-[11px] font-bold text-gov-primary hover:underline"
                        >
                          {isBn ? 'সব দেখুন' : 'View all'}
                        </Link>
                      </div>

                      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto py-1">
                        {notifications.slice(0, 4).map((n) => (
                          <div
                            key={n.id}
                            className={`p-2 text-xs rounded-lg transition-colors ${
                              n.isRead ? 'text-slate-500' : 'bg-emerald-50/50 text-slate-800 font-semibold'
                            }`}
                          >
                            <p className="line-clamp-2 leading-relaxed">{isBn ? (n.titleBn || n.title) : n.title}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
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
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition-colors cursor-pointer"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-7 h-7 rounded-full bg-gov-primary text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                      {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">
                      {currentUser?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-up">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                        <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200">
                          {isBn ? 'নিবন্ধিত সদস্য' : 'Verified Member'}
                        </span>
                      </div>

                      <div className="py-1 text-xs">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'আমার প্রোফাইল' : 'Profile'}</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'সেটিংস' : 'Settings'}</span>
                        </Link>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-gov-primary"
                        >
                          <Database className="w-4 h-4 text-slate-400" />
                          <span>{isBn ? 'অ্যাডমিন কনসোল' : 'Admin Console'}</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
                >
                  <span className="flex items-center gap-1.5">
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{isBn ? 'লগইন' : 'Log in'}</span>
                  </span>
                </Link>

                <Link
                  to="/register"
                  className="btn-primary text-xs px-3.5 py-2 font-bold inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
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
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-gov-primary text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{currentUser?.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-rose-600 font-bold p-1 hover:underline"
                >
                  {isBn ? 'লগআউট' : 'Log out'}
                </button>
              </div>
            )}

            {/* Section 1: Verification & Records */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block">
                {isBn ? '১. জমি যাচাই ও রেকর্ড' : '1. Verification & Records'}
              </span>

              <Link
                to={isAuthenticated ? '/dashboard' : '/'}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <LayoutDashboard className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? (isAuthenticated ? 'ড্যাশবোর্ড' : 'হোম') : (isAuthenticated ? 'Dashboard' : 'Home')}</span>
              </Link>

              <Link
                to="/check-land"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
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

            {/* Section 2: Due Diligence */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block">
                {isBn ? '২. ডিউ ডিলিজেন্স হাব' : '2. Due Diligence Hub'}
              </span>

              <Link
                to="/verification-plan"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-gov-primary" />
                  <span>{isBn ? 'যাচাই পরিকল্পনা ট্র্যাকার' : 'Verification Plan Tracker'}</span>
                </div>
                {pendingTasks > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {isBn ? `${toBengaliNumerals(pendingTasks)} বাকি` : `${pendingTasks} left`}
                  </span>
                )}
              </Link>

              <Link
                to="/documents"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <FolderOpen className="w-4 h-4 text-gov-primary" />
                <span>{isBn ? 'আবশ্যকীয় দলিল চেকলিস্ট' : 'Document Checklist'}</span>
              </Link>
            </div>

            {/* Section 3: Resources & Guides */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block">
                {isBn ? '৩. সহায়িকা ও নির্দেশিকা' : '3. Guides & Information'}
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

            {/* Section 4: Account Actions */}
            {isAuthenticated ? (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block">
                  {isBn ? '৪. অ্যাকাউন্ট ও সেটিংস' : '4. Account & Settings'}
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
