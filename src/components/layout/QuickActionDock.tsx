import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  Sparkles,
  Search,
  MapPin,
  Calculator,
  Compass,
  Volume2,
  VolumeX,
  ArrowUp,
  X,
  ClipboardCheck,
  ArrowRightLeft,
  MessageSquare,
  Keyboard,
  ArrowLeftRight,
} from 'lucide-react';

export const QuickActionDock: React.FC = () => {
  const {
    openCommandPalette,
    openCadastralMap,
    openCalculator,
    openTour,
    openChecklist,
    openUnitConverter,
    toggleAssistant,
    openComparator,
    openShortcuts,
    soundEnabled,
    toggleSound,
  } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();

  const [expanded, setExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBn = language === 'bn';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSoundToggle = () => {
    const isNowOn = toggleSound();
    showToast({
      type: 'info',
      title: isNowOn
        ? (isBn ? 'সাউন্ড সক্রিয় করা হয়েছে 🔊' : 'Sound Effects Enabled 🔊')
        : (isBn ? 'সাউন্ড নিঃশব্দ করা হয়েছে 🔇' : 'Sound Effects Muted 🔇'),
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Expanded Tools Menu */}
      {expanded && (
        <div className="pointer-events-auto flex flex-col items-end gap-2 animate-slide-down mb-1">
          {/* AI Diligence Assistant */}
          <button
            onClick={() => {
              setExpanded(false);
              toggleAssistant();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all text-xs font-bold group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'ডিজিটাল সহকারী' : 'AI Assistant'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
          </button>

          {/* 10-Point Checklist */}
          <button
            onClick={() => {
              setExpanded(false);
              openChecklist();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-teal-50 hover:text-gov-primary hover:border-teal-200 transition-all text-xs font-bold group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? '১০-দফা চেকলিস্ট' : '10-Pt Checklist'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </button>

          {/* Land Unit Converter */}
          <button
            onClick={() => {
              setExpanded(false);
              openUnitConverter();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all text-xs font-bold group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'পরিমাপ রূপান্তরক' : 'Unit Converter'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </button>

          {/* Cadastral Map */}
          <button
            onClick={() => {
              setExpanded(false);
              openCadastralMap();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-teal-50 hover:text-gov-primary hover:border-teal-200 transition-all text-xs font-bold group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'মৌজা নকশা' : 'Survey Map'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
          </button>

          {/* Calculator */}
          <button
            onClick={() => {
              setExpanded(false);
              openCalculator();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all text-xs font-bold group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'ফি ক্যালকুলেটর' : 'Fee Estimator'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
          </button>

          {/* Guided Tour */}
          <button
            onClick={() => {
              setExpanded(false);
              openTour();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 transition-all text-xs font-bold group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'প্ল্যাটফর্ম গাইড' : 'Guided Tour'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
          </button>

          {/* Parcel Comparator */}
          <button
            onClick={() => {
              setExpanded(false);
              openComparator();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all text-xs font-bold group cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'পার্সেল দ্বৈত তুলনা' : 'Parcel Comparator'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </button>

          {/* Keyboard Shortcuts (?) */}
          <button
            onClick={() => {
              setExpanded(false);
              openShortcuts();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-slate-50 hover:text-slate-900 transition-all text-xs font-bold group cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {isBn ? 'কীবোর্ড শর্টকাট (?)' : 'Keyboard Shortcuts (?)'}
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Keyboard className="w-4 h-4" />
            </div>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 shadow-float hover:bg-slate-50 transition-all text-xs font-bold group cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-500 font-medium">
              {soundEnabled ? (isBn ? 'সাউন্ড মিউট করুন' : 'Mute Sounds') : (isBn ? 'সাউন্ড অন করুন' : 'Enable Sounds')}
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </div>
          </button>
        </div>
      )}

      {/* Action Row */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-float hover:bg-slate-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label={isBn ? 'উপরে স্ক্রোল করুন' : 'Scroll to top'}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating AI Assistant Trigger Pill */}
        <button
          onClick={toggleAssistant}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-float transition-all text-xs font-bold hover:scale-105 active:scale-95 shadow-glow-sm"
          aria-label="Open AI Land Assistant"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isBn ? 'সহকারী' : 'AI Assistant'}</span>
        </button>

        {/* Spotlight Quick Search Button */}
        <button
          onClick={openCommandPalette}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-float hover:bg-teal-50 hover:text-gov-primary hover:border-teal-300 transition-all text-xs font-semibold hover:scale-105 active:scale-95"
          aria-label="Open Command Palette"
        >
          <Search className="w-3.5 h-3.5 text-teal-600" />
          <span>{isBn ? 'অনুসন্ধান' : 'Search'}</span>
          <kbd className="text-[10px] bg-slate-100 border border-slate-200 px-1 rounded text-slate-500">⌘K</kbd>
        </button>

        {/* Primary FAB Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-float transition-all duration-200 hover:scale-105 active:scale-95 ${
            expanded
              ? 'bg-slate-800 rotate-90'
              : 'bg-gradient-to-br from-gov-primary via-teal-700 to-teal-800 shadow-glow-teal'
          }`}
          aria-label={expanded ? 'Close quick menu' : 'Open quick tools menu'}
          aria-expanded={expanded}
        >
          {expanded ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-amber-300" />}
        </button>
      </div>
    </div>
  );
};
