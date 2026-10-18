import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ShieldCheck, Menu, X, Home, Search, Info } from 'lucide-react';

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    {
      to: '/',
      label: language === 'bn' ? 'হোম' : 'Home',
      icon: <Home className="w-4 h-4" />,
    },
    {
      to: '/check',
      label: language === 'bn' ? 'জমি যাচাই' : 'Check Land',
      icon: <Search className="w-4 h-4" />,
    },
    {
      to: '/about',
      label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About',
      icon: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <header
      className={`bg-white sticky top-0 z-30 transition-all duration-200 ${
        scrolled
          ? 'shadow-sm border-b border-slate-200'
          : 'border-b border-slate-200/80 shadow-2xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gov-primary flex items-center justify-center text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                  {language === 'bn' ? 'ভূমিভেরিফাই' : 'BhumiVerify'}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200">
                  {language === 'bn' ? 'ডেমো প্রোটোটাইপ' : 'Demo MVP'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                {language === 'bn' ? 'রেজিস্ট্রেশন-পূর্ব ভূমি লেনদেন সংকেত যাচাই' : 'Pre-Registration Land Activity Signals'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label={language === 'bn' ? 'প্রধান নেভিগেশন' : 'Primary Navigation'}
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link) => {
              const isActive =
                link.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-gov-primary font-semibold border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher compact={false} />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1 animate-fade-up">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-50 text-gov-primary font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
