import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ShieldCheck, Menu, X, Home, Search, Info, ArrowRight } from 'lucide-react';

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

  // Only three primary navigation items: Home, Check Land, About
  const navLinks = [
    {
      to: '/',
      label: language === 'bn' ? 'হোম' : 'Home',
      icon: <Home className="w-4 h-4" aria-hidden="true" />,
    },
    {
      to: '/check',
      label: language === 'bn' ? 'জমি যাচাই' : 'Check Land',
      icon: <Search className="w-4 h-4" aria-hidden="true" />,
    },
    {
      to: '/about',
      label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About',
      icon: <Info className="w-4 h-4" aria-hidden="true" />,
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
        <div className="flex items-center justify-between h-16 gap-3">
          {/* BhumiSure Logo & Wordmark with Tagline */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="BhumiSure Home - Verify Before You Buy"
          >
            <div className="w-9 h-9 rounded-xl bg-gov-primary flex items-center justify-center text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                  {language === 'bn' ? 'ভূমিসিউর (BhumiSure)' : 'BhumiSure'}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200">
                  {language === 'bn' ? 'প্রোটোটাইপ' : 'Prototype'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                Verify Before You Buy.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Only Home, Check Land, About) */}
          <nav
            aria-label={language === 'bn' ? 'প্রধান মেনু' : 'Main Navigation'}
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
                      ? 'bg-emerald-50 text-gov-primary font-bold border border-emerald-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Header Actions: Primary CTA & Language Switcher */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/check"
              className="hidden sm:inline-flex btn-primary text-xs px-4 py-2 font-bold cursor-pointer items-center gap-1.5 shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{language === 'bn' ? 'জমি যাচাই করুন' : 'Check a land parcel'}</span>
            </Link>

            <LanguageSwitcher compact={true} />

            {/* Mobile Hamburger Toggle with Accessible Attributes */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="md:hidden py-3 border-t border-slate-200 space-y-1 animate-fade-up"
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
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-50 text-gov-primary font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-2">
              <Link
                to="/check"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-primary text-xs px-4 py-2.5 font-bold flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{language === 'bn' ? 'জমি যাচাই করুন' : 'Check a land parcel'}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
