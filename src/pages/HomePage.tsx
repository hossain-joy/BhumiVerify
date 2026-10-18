import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataTag } from '../components/common/DemoDataTag';
import {
  ShieldCheck,
  ArrowRight,
  Search,
  FileText,
  AlertTriangle,
  Clock,
  Layers,
  CheckCircle2,
  Info,
  Scale,
  Sparkles,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const scenarios = [
    {
      id: 'DEMO-PARCEL-001',
      scenarioNum: 1,
      title: language === 'bn' ? 'সাম্প্রতিক হস্তান্তর দলিল' : 'Recent Transfer Deed Logged',
      badge: language === 'bn' ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      dag: '402',
      mouza: 'Tejgaon I/A',
      desc: language === 'bn'
        ? 'সাব-রেজিস্ট্রি অফিসে সাফ-কবলা দলিল ও ধারা ৮৯ নোটিশ রয়েছে, কিন্তু নামজারি খতিয়ান জারির তথ্য পাওয়া যায়নি।'
        : 'Registered transfer deed and Section 89 LT notice logged; e-mutation is not completed.',
    },
    {
      id: 'DEMO-PARCEL-002',
      scenarioNum: 2,
      title: language === 'bn' ? 'নামজারি আবেদন চলমান' : 'Mutation Petition Pending',
      badge: language === 'bn' ? 'তথ্য অসম্পূর্ণ' : 'Information Incomplete',
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
      dag: '118',
      mouza: 'Dhanmondi R/A',
      desc: language === 'bn'
        ? 'ই-নামজারি আবেদন দায়ের হয়ে শুনানাধীন রয়েছে। চূড়ান্ত অনুমোদন বা নামজারি খতিয়ান আদেশ এখনো জারি হয়নি।'
        : 'Citizen application logged online and pending hearing at AC (Land). Order not yet granted.',
    },
    {
      id: 'DEMO-PARCEL-003',
      scenarioNum: 3,
      title: language === 'bn' ? 'নামজারি সম্পন্ন' : 'Mutation Completed',
      badge: language === 'bn' ? 'বড় অসঙ্গতি পাওয়া যায়নি' : 'No Major Issue Detected',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      dag: '85',
      mouza: 'Gulshan',
      desc: language === 'bn'
        ? 'নামজারি কেস অনুমোদিত হয়ে খতিয়ান ও দাখিলা হালনাগাদ রেকর্ডভুক্ত হয়েছে। প্রমিত সতর্কতা প্রযোজ্য।'
        : 'AC (Land) order approved; new mutation khatian issued. Standard pre-purchase due diligence required.',
    },
    {
      id: 'DEMO-PARCEL-004',
      scenarioNum: 4,
      title: language === 'bn' ? 'জরিপ রেকর্ড অসঙ্গতি' : 'Conflicting Survey Records',
      badge: language === 'bn' ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
      dag: '999',
      mouza: 'Aminbazar',
      desc: language === 'bn'
        ? 'সাবেক এসএ এবং সাম্প্রতিক আরএস জরিপের মধ্যে সীমানা ও খতিয়ান অসঙ্গতি পাওয়া গেছে।'
        : 'Discrepancy detected between historic SA sheet and modern RS record. Acreage mismatch flagged.',
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-gov-primary">
          <ShieldCheck className="w-4 h-4 text-gov-primary" />
          <span>
            {language === 'bn'
              ? 'ভূমি লেনদেন সংকেত ও ঝুঁকি যাচাই এমভিপি'
              : 'Land Transaction Risk Assessment MVP'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {language === 'bn' ? (
            <>
              জমি কেনার আগে জানুন <span className="text-gov-primary">লেনদেন সংকেত</span> ও সম্ভাব্য ঝুঁকি
            </>
          ) : (
            <>
              Verify Pre-Registration <span className="text-gov-primary">Land Transaction Signals</span> Before You Buy
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {language === 'bn'
            ? 'বাংলাদেশে জমি ক্রয়ের ক্ষেত্রে রেজিস্ট্রিকৃত দলিল, ধারা ৮৯ এলটি নোটিশ এবং ই-নামজারির বর্তমান স্থিতি একটি একক ও সহজ প্রতিবেদনে নিরীক্ষণ করুন।'
            : 'BhumiVerify helps prospective land buyers in Bangladesh assess available deed records, e-mutation progress, and conflicting information before committing money or registering a purchase.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/check"
            className="btn-primary px-6 py-3 text-sm font-bold shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'bn' ? 'জমি যাচাই শুরু করুন' : 'Check Land Parcel'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="btn-secondary px-5 py-3 text-sm font-medium"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>{language === 'bn' ? 'আইনগত প্রেক্ষাপট ও নিয়মাবলি' : 'Diligence Rules & Law'}</span>
          </Link>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'বহুমুখী সনাক্তকারী যাচাই' : 'Multi-Identifier Matching'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'স্বচ্ছ নিয়মভিত্তিক যুক্তি' : 'Transparent Rule-Based Logic'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? '১০০% ক্লায়েন্ট-সাইড প্রোটোটাইপ' : '100% Client-Side Demo Data'}</span>
          </div>
        </div>
      </section>

      {/* 3-Step Primary Journey */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'সহজ ৩ ধাপে জমি যাচাই প্রক্রিয়া' : 'Simple 3-Step Verification Journey'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'bn'
              ? 'জটিল ড্যাশবোর্ড বা অপ্রয়োজনীয় পাতার ঝামেলা ছাড়া সরাসরি মূল লক্ষ্যে পৌঁছান।'
              : 'Focused strictly on the core workflow: identifiers → signals → risk assessment.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-gov-primary border border-emerald-200 flex items-center justify-center font-bold text-sm">
              ১
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? '১. জমির পরিচিতি প্রদান' : '1. Enter Land Identifiers'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান এবং দাগ নম্বর নির্বাচন করুন। দাগ একা অনন্য নয়; পূর্ণ প্রশাসনিক বিন্যাস প্রয়োজনীয়।'
                : 'Provide Division, District, Upazila, Mouza, Khatian, and Dag number. A plot number alone is not unique without complete administrative context.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-sm">
              ২
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? '২. লেনদেন সংকেত পর্যালোচনা' : '2. Review Transaction Signals'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি অফিসে সাম্প্রতিক সাফ-কবলা হস্তান্তর দলিল, ধারা ৮৯ এলটি নোটিশ এবং ই-নামজারি আবেদনের অগ্রগতি লক্ষ্য করুন।'
                : 'Inspect recent Sub-Registry deed execution, Section 89 LT notices to AC (Land), and ongoing e-mutation proceedings.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-sm">
              ৩
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? '৩. ঝুঁকি ব্যাখ্যা ও করণীয়' : '3. Risk Assessment & Next Steps'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'কী পাওয়া গেছে, কেন তা গুরুত্বপূর্ণ, কোন তথ্য অনুপস্থিত এবং পরবর্তীতে কী যাচাই করতে হবে—তা স্বচ্ছভাবে জানুন।'
                : 'Understand clearly what was detected, why it matters, missing information, and specific next verification steps to take.'}
            </p>
          </div>
        </div>
      </section>

      {/* Demo Scenarios Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {language === 'bn' ? 'পরীক্ষামূলক নমুনা দৃশ্যকল্প' : 'Predefined Sample Scenarios'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'বিভিন্ন ফলাফল ও ঝুঁকির ধরন বুঝতে নিচের যেকোনো একটি নমুনা সরাসরি পরীক্ষা করুন।'
                : 'Explore different transaction outcomes using predefined realistic fictional data.'}
            </p>
          </div>

          <Link to="/check" className="text-xs text-gov-primary font-bold hover:underline flex items-center gap-1 self-start sm:self-auto">
            <span>{language === 'bn' ? 'সরাসরি জমি যাচাই পাতায় যান' : 'Go to Check Land'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${sc.badgeClass}`}>
                    {sc.badge}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-slate-400">
                    Dag {sc.dag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {sc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {sc.desc}
                </p>

                <div className="text-[11px] text-slate-500 font-medium">
                  {language === 'bn' ? 'মৌজা: ' : 'Mouza: '}
                  <span className="text-slate-800">{sc.mouza}</span>
                </div>
              </div>

              <Link
                to={`/check?scenario=${sc.scenarioNum}`}
                className="w-full text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-gov-primary hover:text-white text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{language === 'bn' ? 'এই নমুনাটি পরীক্ষা করুন' : 'Test This Scenario'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Core Bangladesh Land Law Diligence Principles */}
      <section className="bg-slate-900 text-slate-200 rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-400 text-xs font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'আইনগত বাস্তবতা ও মূল সতর্কতা' : 'Bangladesh Land Law Principles'}</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {language === 'bn'
              ? 'জমি ক্রেতাদের যে ৩টি মৌলিক নিয়ম জানা আবশ্যক'
              : '3 Core Diligence Rules Every Land Buyer Must Know'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {language === 'bn'
              ? 'বাংলাদেশে জমি ক্রয়ে বিরোধ ও জালিয়াতি রোধ করার মূলনীতিসমূহ:'
              : 'Statutory context governing land deeds, mutation, and record of rights:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <FileText className="w-4 h-4 shrink-0" />
              <span>{language === 'bn' ? '১. দলিল ≠ নামজারি' : '1. Deed ≠ Mutation'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি অফিসে দলিল রেজিস্ট্রি হওয়ার মাধ্যমে মালিকানার চুক্তি সম্পন্ন হয়, কিন্তু সহকারী কমিশনার (ভূমি) দ্বারা নামজারি ও জমাভাগ অনুমোদন না হওয়া পর্যন্ত সরকারি রাজস্ব রেকর্ডে ক্রেতার নাম অন্তর্ভুক্ত হয় না।'
                : 'A registered deed transfers title between parties, but under SAT Act Section 89, it does not update the government record of rights until the Assistant Commissioner (Land) formally approves mutation.'}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{language === 'bn' ? '২. আবেদন ≠ অনুমোদন' : '2. Application ≠ Approval'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'ই-নামজারি আবেদন দায়ের করা মানেই জমিটির নামজারি নিশ্চিত নয়। মাঠপর্যায়ের নায়েবের তদন্ত ও শুনানিতে কোনো আপত্তি বা ত্রুটি পাওয়া গেলে আবেদন খারিজ হতে পারে।'
                : 'Filing an online mutation application is merely a request. During field verification by the Union Land Assistant Officer, petitions may face formal objections or rejection.'}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{language === 'bn' ? '৩. তথ্য না থাকা ≠ নিরাপদ' : '3. No Event Found ≠ Safe'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'ডেমো ডেটায় কোনো সংকেত বা নোটিশ না পাওয়ার অর্থ কখনোই এটি নয় যে জমিটি সম্পূর্ণ নিরাপদ বা বিরোধমুক্ত। কোনো ডিজিটাল সিস্টেমই সশরীরে বায়া দলিল তল্লাশের বিকল্প নয়।'
                : 'The absence of negative signals in demo feeds must never be construed as proof of unencumbered title. In-person inspection of the 25-year chain of deeds (Baya deeds) is indispensable.'}
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/about"
            className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>{language === 'bn' ? 'বিস্তারিত আইনগত ব্যাখ্যা পড়ুন' : 'Read Full Legal Background & SAT Act Sec 89'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          {language === 'bn' ? 'প্রস্তুত আছেন? এখনই জমি যাচাই শুরু করুন' : 'Ready to Assess a Parcel?'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          {language === 'bn'
            ? 'যেকোনো প্লট নম্বর প্রবেশ করিয়ে সরাসরি সাব-রেজিস্ট্রি দলিল ও ই-নামজারি সংকেত নিরীক্ষণ করুন।'
            : 'Enter parcel identifiers or pick one of our preset demo scenarios to evaluate risk signals instantly.'}
        </p>
        <div className="pt-2">
          <Link to="/check" className="btn-primary px-6 py-2.5 text-xs font-bold">
            <Search className="w-4 h-4" />
            <span>{language === 'bn' ? 'জমি যাচাই পাতায় যান' : 'Go to Check Land'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
