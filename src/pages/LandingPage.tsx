import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PARCELS } from '../lib/mock-data/parcels';
import { DemoDataTag } from '../components/common/DemoDataTag';
import {
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Lock,
  Layers,
  Clock,
  HelpCircle,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole } = useApp();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleStartDemo = (role: 'citizen' | 'reviewer' = 'citizen') => {
    setRole(role);
    navigate(role === 'citizen' ? '/citizen' : '/reviewer');
  };

  const getSignalBadge = (pId: string) => {
    if (language === 'bn') {
      if (pId === 'DEMO-PARCEL-001') return 'সাম্প্রতিক দলিল হস্তান্তর — নামজারি স্থিতি যাচাই করুন';
      if (pId === 'DEMO-PARCEL-002') return 'নামজারি আবেদন চলমান — শুনানি ও রেকর্ড যাচাই প্রয়োজন';
      if (pId === 'DEMO-PARCEL-003') return 'নামজারি সম্পন্ন — সতর্কতামূলক নিয়মিত অনুসন্ধান প্রযোজ্য';
      return 'সম্ভাব্য মিল / দ্বৈত খতিয়ান — প্রাতিষ্ঠানিক তদন্ত প্রয়োজন';
    }
    if (pId === 'DEMO-PARCEL-001') return 'Recent transfer event — verify mutation status';
    if (pId === 'DEMO-PARCEL-002') return 'Mutation application recorded — review recommended';
    if (pId === 'DEMO-PARCEL-003') return 'Mutation completed — due diligence still required';
    return 'Possible match / Conflicting identifiers — official review needed';
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section - Clean, Restrained, Trustworthy */}
      <section className="bg-white rounded-lg border border-slate-200 p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-teal-50 border border-teal-200 text-gov-primary text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-gov-primary" />
            {t.landing.heroTag}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            {t.landing.headline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {t.landing.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => handleStartDemo('citizen')}
              className="px-5 py-2.5 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs sm:text-sm font-semibold rounded shadow-xs transition-colors flex items-center gap-2"
            >
              {t.landing.exploreCitizen}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleStartDemo('reviewer')}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium rounded border border-slate-300 transition-colors"
            >
              {t.landing.exploreReviewer}
            </button>

            <a
              href="#how-it-works"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium"
            >
              {t.landing.howItWorks}
            </a>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <DemoDataTag type="demo_data" />
            <span>{t.landing.noBackendNotice}</span>
          </div>
        </div>
      </section>

      {/* Three-Step Workflow Explainer */}
      <section id="how-it-works" className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {t.landing.stepTitle}
          </h2>
          <p className="text-xs text-slate-600">
            {t.landing.stepSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-2.5">
            <div className="w-7 h-7 rounded bg-teal-100 text-gov-primary font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {t.landing.step1Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.landing.step1Desc}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-2.5">
            <div className="w-7 h-7 rounded bg-teal-100 text-gov-primary font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {t.landing.step2Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.landing.step2Desc}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-2.5">
            <div className="w-7 h-7 rounded bg-teal-100 text-gov-primary font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {t.landing.step3Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.landing.step3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 4 Seeded Scenarios Test Table */}
      <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.landing.scenarioTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.landing.scenarioSubtitle}
            </p>
          </div>
          <DemoDataTag type="simulated_source" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-2.5 px-3">
                  {language === 'bn' ? 'পার্সেল আইডি' : 'Parcel ID'}
                </th>
                <th className="py-2.5 px-3">
                  {language === 'bn' ? 'অবস্থান ও প্লট' : 'Location & Dag'}
                </th>
                <th className="py-2.5 px-3">
                  {language === 'bn' ? 'নথিভুক্ত অবস্থা' : 'Simulated Condition'}
                </th>
                <th className="py-2.5 px-3">
                  {language === 'bn' ? 'সহজ সংকেত' : 'Plain-Language Signal'}
                </th>
                <th className="py-2.5 px-3 text-right">
                  {language === 'bn' ? 'পদক্ষেপ' : 'Action'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_PARCELS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">{p.id}</td>
                  <td className="py-3 px-3">
                    {p.mouza}, Dag {p.dagNumber}
                    <span className="block text-[11px] text-slate-500">{p.upazila}, {p.district}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs">{p.riskSummary}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        p.matchConfidence === 'exact'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : p.matchConfidence === 'ambiguous'
                          ? 'bg-rose-50 text-rose-900 border-rose-300'
                          : 'bg-blue-50 text-blue-900 border-blue-200'
                      }`}
                    >
                      {getSignalBadge(p.id)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleStartDemo('citizen')}
                      className="text-xs font-semibold text-gov-primary hover:underline"
                    >
                      {t.landing.testScenario}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature Pillars: Simple, Formal Cards */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {t.landing.pillarsTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
            <Lock className="w-5 h-5 text-gov-primary" />
            <h4 className="text-sm font-semibold text-slate-900">
              {language === 'bn' ? 'নিয়ন্ত্রিত তথ্য প্রবেশ' : 'Controlled Access'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'উন্মুক্ত গণ-অনুসন্ধান নিষিদ্ধ। প্রতিটি আবেদনের ক্ষেত্রে নাগরিক পরিচয় যাচাই ও বৈধ ক্রয়ের উদ্দেশ্য ঘোষণা বাধ্যতামূলক।'
                : 'No public bulk searches. Every parcel inquiry requires verified identity, legitimate purpose declaration, and officer approval.'}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
            <Clock className="w-5 h-5 text-gov-primary" />
            <h4 className="text-sm font-semibold text-slate-900">
              {language === 'bn' ? 'কার্যক্রম টাইমলাইন' : 'Activity Timeline'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি দলিল, সহকারী কমিশনার (ভূমি) আদালতের নামজারি আদেশ ও ধারা ৮৯ এলটি নোটিশের আলাদা কালানুক্রমিক টাইমলাইন।'
                : 'Vertical chronological timeline separating Sub-Registry deeds from AC (Land) mutation approvals and Section 89 LT notices.'}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
            <ShieldCheck className="w-5 h-5 text-gov-primary" />
            <h4 className="text-sm font-semibold text-slate-900">
              {language === 'bn' ? 'ব্যাখ্যাযোগ্য সংকেত' : 'Explainable Signals'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'কোনো অস্বচ্ছ বা রহস্যজনক স্কোর নয়। প্রতিটি সংকেতের পেছনে থাকা দলিল নম্বর, তারিখ ও আইনি সতর্কবার্তা স্পষ্টভাবে প্রদর্শিত।'
                : 'No black-box risk scores. All signals clearly state the underlying recorded facts, source feed freshness, and legal caveats.'}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
            <Layers className="w-5 h-5 text-gov-primary" />
            <h4 className="text-sm font-semibold text-slate-900">
              {language === 'bn' ? 'স্থায়ী অডিট লগ' : 'Immutable Audit Log'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'আবেদন দাখিল, কর্মকর্তার সিদ্ধান্ত, ডেমো ফি ও তথ্য প্রদর্শনের প্রতিটি পদক্ষেপ অপরিবর্তনীয় অডিট ট্রেইলে সংরক্ষিত থাকে।'
                : 'Every request submission, reviewer decision, simulated fee receipt, and data disclosure is recorded for independent compliance scrutiny.'}
            </p>
          </div>
        </div>
      </section>

      {/* Key Diligence Rules & Disclaimers */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-lg p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          {t.landing.diligenceRulesTitle}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-950">
          <div className="bg-white p-3.5 rounded border border-amber-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              {language === 'bn' ? '১. দলিল ≠ নামজারি' : '1. Deed ≠ Mutation'}
            </span>
            <p className="leading-relaxed text-[11px]">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি অফিসে সাফ-কবলা দলিল সম্পাদিত হলেই রাজস্ব রেকর্ডে মালিকানা বদলে যায় না। সহকারী কমিশনার (ভূমি) অফিসে নামজারি আবেদন মঞ্জুর হওয়া আবশ্যক।'
                : 'Execution of a Saf-Kabala deed at the Sub-Registry does not automatically transfer the revenue record. A mutation application must be formally filed and sanctioned by the Assistant Commissioner (Land).'}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded border border-amber-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              {language === 'bn' ? '২. আবেদন ≠ অনুমোদন' : '2. Application ≠ Approval'}
            </span>
            <p className="leading-relaxed text-[11px]">
              {language === 'bn'
                ? 'ই-নামজারি আবেদন দায়ের করা কোনো মালিকানা নিশ্চিত করে না। তহশিলদারের তদন্ত বা শুনানিতে আপত্তি উঠলে আবেদন নামঞ্জুর হতে পারে।'
                : 'Submitting an e-mutation application does not guarantee title sanction. Petitions may be rejected or contested during field hearings by the Union Land Assistant Officer (ULAO).'}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded border border-amber-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              {language === 'bn' ? '৩. রেকর্ড না থাকা ≠ জমি নিরাপদ' : '3. No Match ≠ Land Is Safe'}
            </span>
            <p className="leading-relaxed text-[11px]">
              {language === 'bn'
                ? 'সিস্টেমে কোনো তথ্য না পাওয়ার অর্থ এই নয় যে জমিটি আইনি ঝামেলামুক্ত বা নিরাপদে ক্রয়যোগ্য। ক্রয়ের পূর্বে ভূমি অফিসে গিয়ে সার্টিফাইড পরচা যাচাই করুন।'
                : 'Absence of recorded signals in simulated demo data is never proof that a parcel is free from litigation, court injunctions, or conflicting inheritance claims. Always conduct certified searches.'}
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-gov-primary" />
          {t.landing.faqTitle}
        </h2>

        <div className="space-y-2 text-xs">
          <details className="bg-white rounded border border-slate-200 p-3.5 group cursor-pointer">
            <summary className="font-semibold text-slate-900 flex items-center justify-between">
              <span>{language === 'bn' ? 'ল্যান্ডটেক বিডি কি কোনো অফিসিয়াল সরকারি সেবা?' : 'Is LandTech BD an official government land service?'}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-slate-600 mt-2 leading-relaxed text-[11px]">
              {language === 'bn'
                ? 'না। এটি হ্যাকাথনের জন্য তৈরি একটি স্বাধীন মূল্যায়ন প্রোটোটাইপ। বাস্তব রূপায়নের ক্ষেত্রে ভূমি মন্ত্রণালয় ও নিবন্ধন অধিদপ্তরের আনুষ্ঠানিক লাইসেন্স প্রয়োজন হবে।'
                : 'No. LandTech BD is an independent technical prototype built for hackathon evaluation. Real deployment would require statutory data agreements with the Ministry of Land and the Directorate of Registration.'}
            </p>
          </details>

          <details className="bg-white rounded border border-slate-200 p-3.5 group cursor-pointer">
            <summary className="font-semibold text-slate-900 flex items-center justify-between">
              <span>{language === 'bn' ? 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইনের ৮৯ ধারার এলটি নোটিশ কী?' : 'What is an LT Notice under Section 89 of the SAT Act?'}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-slate-600 mt-2 leading-relaxed text-[11px]">
              {language === 'bn'
                ? 'দলিল রেজিস্ট্রির পর সাব-রেজিস্ট্রি কার্যালয় থেকে সংশ্লিষ্ট উপজেলা সহকারী কমিশনার (ভূমি) কার্যালয়ে যে আনুষ্ঠানিক নোটিশ পাঠানো হয় তাকে এলটি নোটিশ বলা হয়।'
                : 'Under Section 89 of the State Acquisition and Tenancy Act, 1950, when a land transfer deed is registered, the Sub-Registry Office issues a Land Transfer (LT) Notice to the concerned Upazila AC (Land) office to initiate record reconciliation.'}
            </p>
          </details>

          <details className="bg-white rounded border border-slate-200 p-3.5 group cursor-pointer">
            <summary className="font-semibold text-slate-900 flex items-center justify-between">
              <span>{language === 'bn' ? 'শুধুমাত্র দাগ নম্বর দিয়ে কেন জমি নির্ভুল শনাক্ত হয় না?' : 'Why is Dag (Plot) number alone not enough for identification?'}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-slate-600 mt-2 leading-relaxed text-[11px]">
              {language === 'bn'
                ? 'বাংলাদেশে প্রতি মৌজায় আলাদা ১ থেকে শুরু করে দাগ নম্বর থাকে। একই উপজেলায় শত শত মৌজায় একই দাগ নম্বর থাকতে পারে। তাই বিভাগ, জেলা, উপজেলা, মৌজা ও খতিয়ান ছাড়া দাগ একক হতে পারে না।'
                : 'In Bangladesh cadastral surveys, Dag numbers are assigned per Mouza. Multiple mouzas within the same upazila have identical Dag numbers. A complete identifier requires Division, District, Upazila, Mouza name, J.L. number, and Khatian reference.'}
            </p>
          </details>
        </div>
      </section>

      {/* Clean Call To Action Box */}
      <section className="bg-gov-primary text-white rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold">{t.landing.ctaTitle}</h3>
          <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
            {t.landing.ctaDesc}
          </p>
        </div>
        <button
          onClick={() => handleStartDemo('citizen')}
          className="px-5 py-2.5 bg-white text-gov-primary hover:bg-teal-50 font-bold text-xs sm:text-sm rounded transition-colors shrink-0 shadow-xs"
        >
          {t.landing.ctaButton}
        </button>
      </section>
    </div>
  );
};
