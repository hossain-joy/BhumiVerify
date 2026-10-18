import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useUI } from '../context/UIContext';
import { INITIAL_PARCELS } from '../lib/mock-data/parcels';
import { DemoDataTag } from '../components/common/DemoDataTag';
import {
  ShieldCheck, ArrowRight, AlertTriangle, Lock, Layers, Clock,
  HelpCircle, Sparkles, CheckCircle2, ChevronDown, MapPin, FileText,
  TrendingUp, Users, Database, Zap, Calculator, Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole } = useApp();
  const { t, language } = useLanguage();
  const { openCadastralMap, openCalculator, openTour } = useUI();
  const navigate = useNavigate();

  const handleStartDemo = (role: 'citizen' | 'reviewer' = 'citizen') => {
    setRole(role);
    navigate(role === 'citizen' ? '/citizen' : '/reviewer');
  };

  const getSignalBadge = (pId: string) => {
    if (language === 'bn') {
      if (pId === 'DEMO-PARCEL-001') return { text: 'সাম্প্রতিক হস্তান্তর', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      if (pId === 'DEMO-PARCEL-002') return { text: 'নামজারি চলমান', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      if (pId === 'DEMO-PARCEL-003') return { text: 'নামজারি সম্পন্ন', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      return { text: 'রেকর্ড অসামঞ্জস্য', color: 'bg-rose-100 text-rose-800 border-rose-200' };
    }
    if (pId === 'DEMO-PARCEL-001') return { text: 'Recent Transfer', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    if (pId === 'DEMO-PARCEL-002') return { text: 'Mutation Pending', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    if (pId === 'DEMO-PARCEL-003') return { text: 'Mutation Complete', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    return { text: 'Record Mismatch', color: 'bg-rose-100 text-rose-800 border-rose-200' };
  };

  const stats = [
    { icon: <Database className="w-5 h-5" />, value: '4', label: language === 'bn' ? 'ডেমো পার্সেল' : 'Demo Parcels', color: 'text-teal-600 bg-teal-50' },
    { icon: <Users className="w-5 h-5" />, value: '4', label: language === 'bn' ? 'ভূমিকা' : 'User Roles', color: 'text-blue-600 bg-blue-50' },
    { icon: <TrendingUp className="w-5 h-5" />, value: '100%', label: language === 'bn' ? 'ক্লায়েন্ট-সাইড' : 'Client-Side', color: 'text-violet-600 bg-violet-50' },
    { icon: <Zap className="w-5 h-5" />, value: '0', label: language === 'bn' ? 'বাহ্যিক API' : 'External APIs', color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="space-y-10 pb-12">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero text-white p-8 sm:p-12 shadow-float border border-white/10">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-teal-400/10 pointer-events-none" />

        <div className="relative max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-teal-200 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            {t.landing.heroTag}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.landing.headline}
          </h1>

          <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-2xl font-normal">
            {t.landing.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleStartDemo('citizen')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gov-primary hover:bg-teal-50 font-bold text-sm rounded-xl shadow-float transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.landing.exploreCitizen}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStartDemo('reviewer')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-xs"
            >
              {t.landing.exploreReviewer}
            </button>
            <button
              onClick={() => openCadastralMap()}
              className="inline-flex items-center gap-1.5 px-4 py-3 bg-teal-500/20 hover:bg-teal-500/30 text-teal-100 border border-teal-400/30 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              <MapPin className="w-4 h-4 text-teal-300" />
              <span>{language === 'bn' ? 'মৌজা নকশা দেখুন' : 'View Cadastral Map'}</span>
            </button>
            <button
              onClick={openCalculator}
              className="inline-flex items-center gap-1.5 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 border border-blue-400/30 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              <Calculator className="w-4 h-4 text-blue-300" />
              <span>{language === 'bn' ? 'ফি হিসাব করুন' : 'Fee Estimator'}</span>
            </button>
            <button
              onClick={openTour}
              className="inline-flex items-center gap-1.5 px-3 py-3 text-teal-200 hover:text-white text-sm font-medium transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'bn' ? 'গাইড ট্যুর' : 'Platform Tour'}</span>
            </button>
          </div>

          <div className="pt-1 flex items-center gap-2 text-xs text-teal-300/80">
            <DemoDataTag type="demo_data" />
            <span>{t.landing.noBackendNotice}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="relative mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-teal-200/80">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3-Step Workflow ── */}
      <section id="how-it-works" className="space-y-5">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.landing.stepTitle}</h2>
          <p className="text-sm text-slate-500">{t.landing.stepSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 z-0" />

          {[
            { num: '1', title: t.landing.step1Title, desc: t.landing.step1Desc, color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50 border-teal-200' },
            { num: '2', title: t.landing.step2Title, desc: t.landing.step2Desc, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 border-blue-200' },
            { num: '3', title: t.landing.step3Title, desc: t.landing.step3Desc, color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50 border-violet-200' },
          ].map((step, i) => (
            <div key={i} className={`relative civic-card p-6 space-y-3 border ${step.bg} hover:shadow-card-hover transition-all duration-200`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4 Seeded Scenarios ── */}
      <section className="civic-card-flat p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {t.landing.scenarioTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.landing.scenarioSubtitle}</p>
          </div>
          <DemoDataTag type="simulated_source" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {INITIAL_PARCELS.map((p) => {
            const signal = getSignalBadge(p.id);
            const cardColors: Record<string, string> = {
              'DEMO-PARCEL-001': 'border-amber-200 hover:border-amber-300 bg-gradient-to-br from-amber-50/50 to-white',
              'DEMO-PARCEL-002': 'border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50/50 to-white',
              'DEMO-PARCEL-003': 'border-emerald-200 hover:border-emerald-300 bg-gradient-to-br from-emerald-50/50 to-white',
              'DEMO-PARCEL-004': 'border-rose-200 hover:border-rose-300 bg-gradient-to-br from-rose-50/50 to-white',
            };
            return (
              <button
                key={p.id}
                onClick={() => handleStartDemo('citizen')}
                className={`text-left rounded-xl border p-4 space-y-3 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 ${cardColors[p.id] || 'border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{p.id.replace('DEMO-', '')}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${signal.color}`}>{signal.text}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-gov-primary shrink-0" />
                    {p.mouza}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{p.upazila}, {p.district} • Dag {p.dagNumber}</p>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{p.riskSummary}</p>
                <div className="flex items-center gap-1 text-[11px] text-gov-primary font-semibold">
                  <span>{t.landing.testScenario}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Feature Pillars ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900">{t.landing.pillarsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Lock className="w-5 h-5" />, color: 'text-teal-600 bg-teal-50 border-teal-100', title: language === 'bn' ? 'নিয়ন্ত্রিত প্রবেশ' : 'Controlled Access', desc: language === 'bn' ? 'পরিচয় যাচাই ও বৈধ উদ্দেশ্য ঘোষণা ছাড়া কোনো অনুসন্ধান গ্রহণযোগ্য নয়।' : 'No bulk searches. Every inquiry requires verified identity and legitimate purpose declaration.' },
            { icon: <Clock className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50 border-blue-100', title: language === 'bn' ? 'কার্যকলাপ টাইমলাইন' : 'Activity Timeline', desc: language === 'bn' ? 'দলিল, নামজারি আদেশ ও এলটি নোটিশের আলাদা কালানুক্রমিক টাইমলাইন।' : 'Separate chronological timeline for deeds, mutation orders, and LT notices.' },
            { icon: <ShieldCheck className="w-5 h-5" />, color: 'text-violet-600 bg-violet-50 border-violet-100', title: language === 'bn' ? 'ব্যাখ্যাযোগ্য সংকেত' : 'Explainable Signals', desc: language === 'bn' ? 'কোনো অস্বচ্ছ স্কোর নয়। প্রতিটি সংকেতের পেছনে দলিল নম্বর ও তারিখ স্পষ্ট।' : 'No black-box scores. All signals clearly state the underlying recorded facts.' },
            { icon: <Layers className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50 border-amber-100', title: language === 'bn' ? 'অডিট ট্রেইল' : 'Immutable Audit Log', desc: language === 'bn' ? 'প্রতিটি আবেদন, সিদ্ধান্ত ও পেমেন্ট অপরিবর্তনীয় অডিট লগে সংরক্ষিত।' : 'Every request, decision, and payment is permanently recorded for compliance.' },
          ].map((p, i) => (
            <div key={i} className={`civic-card p-5 space-y-3 border ${p.color.split(' ').slice(2).join(' ')}`}>
              <div className={`w-10 h-10 rounded-xl ${p.color.split(' ').slice(0, 2).join(' ')} flex items-center justify-center border`}>
                {p.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diligence Rules ── */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
          </div>
          <h2 className="text-base font-bold text-amber-900 uppercase tracking-wide text-xs">{t.landing.diligenceRulesTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: language === 'bn' ? '১. দলিল ≠ নামজারি' : '1. Deed ≠ Mutation',
              body: language === 'bn'
                ? 'সাব-রেজিস্ট্রি অফিসে দলিল সম্পাদিত হলেই রাজস্ব রেকর্ডে মালিকানা বদলে যায় না। সহকারী কমিশনার (ভূমি) অফিসে নামজারি মঞ্জুর হওয়া আবশ্যক।'
                : 'Execution of a deed at Sub-Registry does not automatically transfer the revenue record. A mutation must be formally sanctioned by the AC (Land).',
            },
            {
              title: language === 'bn' ? '২. আবেদন ≠ অনুমোদন' : '2. Application ≠ Approval',
              body: language === 'bn'
                ? 'ই-নামজারি আবেদন দায়ের করা কোনো মালিকানা নিশ্চিত করে না। শুনানিতে আপত্তি উঠলে আবেদন নামঞ্জুর হতে পারে।'
                : 'Submitting an e-mutation application does not guarantee title sanction. Petitions may be rejected during field hearings.',
            },
            {
              title: language === 'bn' ? '৩. তথ্য না থাকা ≠ নিরাপদ' : '3. No Match ≠ Safe',
              body: language === 'bn'
                ? 'সিস্টেমে কোনো তথ্য না পাওয়ার অর্থ এই নয় যে জমিটি আইনি ঝামেলামুক্ত। ক্রয়ের পূর্বে ভূমি অফিসে সার্টিফাইড পরচা যাচাই করুন।'
                : 'Absence of recorded signals is never proof that a parcel is free from litigation or conflicting claims. Always conduct certified searches.',
            },
          ].map((rule, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-amber-200/60 space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-bold text-sm text-slate-900">{rule.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{rule.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-gov-primary" />
          {t.landing.faqTitle}
        </h2>
        <div className="space-y-2">
          {[
            {
              q: language === 'bn' ? 'ল্যান্ডটেক বিডি কি কোনো অফিসিয়াল সরকারি সেবা?' : 'Is LandTech BD an official government land service?',
              a: language === 'bn'
                ? 'না। এটি হ্যাকাথনের জন্য তৈরি একটি স্বাধীন মূল্যায়ন প্রোটোটাইপ। বাস্তব রূপায়নের ক্ষেত্রে ভূমি মন্ত্রণালয়ের আনুষ্ঠানিক লাইসেন্স প্রয়োজন।'
                : 'No. LandTech BD is an independent technical prototype for hackathon evaluation. Real deployment requires statutory data agreements with the Ministry of Land.',
            },
            {
              q: language === 'bn' ? 'রাষ্ট্রীয় অধিগ্রহণ আইনের ৮৯ ধারার এলটি নোটিশ কী?' : 'What is an LT Notice under Section 89 of the SAT Act?',
              a: language === 'bn'
                ? 'দলিল রেজিস্ট্রির পর সাব-রেজিস্ট্রি কার্যালয় থেকে সংশ্লিষ্ট উপজেলা সহকারী কমিশনার (ভূমি) কার্যালয়ে যে আনুষ্ঠানিক নোটিশ পাঠানো হয় তাকে এলটি নোটিশ বলা হয়।'
                : 'Under Section 89 of the SAT Act 1950, when a land transfer deed is registered, the Sub-Registry issues an LT Notice to the Upazila AC (Land) office to initiate record reconciliation.',
            },
            {
              q: language === 'bn' ? 'শুধুমাত্র দাগ নম্বর দিয়ে কেন জমি নির্ভুল শনাক্ত হয় না?' : 'Why is Dag number alone not enough for identification?',
              a: language === 'bn'
                ? 'বাংলাদেশে প্রতি মৌজায় আলাদা ১ থেকে শুরু করে দাগ নম্বর থাকে। একই উপজেলায় শত শত মৌজায় একই দাগ নম্বর থাকতে পারে।'
                : 'In Bangladesh, Dag numbers are assigned per Mouza. Multiple mouzas within the same upazila have identical Dag numbers. A complete identifier requires Division, District, Upazila, Mouza, and Khatian.',
            },
          ].map((faq, i) => (
            <details key={i} className="civic-card group cursor-pointer overflow-hidden">
              <summary className="flex items-center justify-between p-4 font-semibold text-sm text-slate-900 list-none">
                <span className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-gov-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {faq.q}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
              </summary>
              <div className="px-4 pb-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-0 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden rounded-2xl gradient-teal text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold">{t.landing.ctaTitle}</h3>
          <p className="text-sm text-teal-100/90 max-w-xl leading-relaxed">{t.landing.ctaDesc}</p>
        </div>
        <button
          onClick={() => handleStartDemo('citizen')}
          className="relative shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gov-primary hover:bg-teal-50 font-bold text-sm rounded-xl shadow-float transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <FileText className="w-4 h-4" />
          {t.landing.ctaButton}
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
