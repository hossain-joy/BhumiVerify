import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataTag } from '../components/common/DemoDataTag';
import { Disclaimer } from '../components/common/Disclaimer';
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
  ShieldAlert,
  MapPin,
  Building,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const scenarios = [
    {
      id: 'DEMO-PARCEL-001',
      scenarioNum: 1,
      title: language === 'bn' ? '১. সাম্প্রতিক হস্তান্তর দলিল' : '1. Recent Deed Logged',
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
      title: language === 'bn' ? '২. নামজারি আবেদন চলমান' : '2. Mutation Petition Pending',
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
      title: language === 'bn' ? '৩. নামজারি সম্পন্ন' : '3. Mutation Completed',
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
      title: language === 'bn' ? '৪. জরিপ রেকর্ড অসঙ্গতি' : '4. Conflicting Survey Records',
      badge: language === 'bn' ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
      dag: '999',
      mouza: 'Aminbazar',
      desc: language === 'bn'
        ? 'সাবেক এসএ এবং সাম্প্রতিক আরএস জরিপের মধ্যে সীমানা ও খতিয়ান অসঙ্গতি পাওয়া গেছে।'
        : 'Discrepancy detected between historic SA sheet and modern RS record. Acreage mismatch flagged.',
    },
    {
      id: 'DEMO-PARCEL-005',
      scenarioNum: 5,
      title: language === 'bn' ? '৫. ব্যাংক মর্টগেজ ও আমমোক্তারনামা' : '5. Bank Mortgage & Disputed POA',
      badge: language === 'bn' ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
      dag: '210',
      mouza: 'Nasirabad (Ctg)',
      desc: language === 'bn'
        ? 'অগ্রণী ব্যাংকে রেজিস্ট্রিকৃত মর্টগেজ দায় ও মূল মালিক কর্তৃক পাওয়ার অব অ্যাটর্নি প্রত্যাহারের নোটিশ।'
        : 'Registered bank mortgage lien with Agrani Bank PLC and disputed Power of Attorney revocation.',
    },
    {
      id: 'DEMO-PARCEL-006',
      scenarioNum: 6,
      title: language === 'bn' ? '৬. শ্রেণির অমিল (কৃষি বনাম শিল্প)' : '6. Classification Mismatch',
      badge: language === 'bn' ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      dag: '201',
      mouza: 'Joydebpur (Gzp)',
      desc: language === 'bn'
        ? 'খতিয়ানে কৃষিজমি হিসেবে চিহ্নিত কিন্তু বাণিজ্যিক শিল্প কারখানা হিসেবে বিক্রয়ের চুক্তি; ডিসি অনুমোদন নেই।'
        : 'Classified as agricultural Nal in porcha, sold as industrial factory plot without DC clearance.',
    },
    {
      id: 'DEMO-PARCEL-007',
      scenarioNum: 7,
      title: language === 'bn' ? '৭. শরিকি অগ্রক্রয় মামলা (ধারা ৯৬)' : '7. Co-Sharer Pre-emption Case',
      badge: language === 'bn' ? 'পর্যালোচনা জরুরি' : 'Review Recommended',
      badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
      dag: '64',
      mouza: 'Zindabazar (Syl)',
      desc: language === 'bn'
        ? 'নোটিশ ব্যতীত জমি বিক্রির অভিযোগে শরিক কর্তৃক এসএটি আইন ধারা ৯৬ অনুযায়ী অগ্রক্রয় মোকদ্দমা দায়ের।'
        : 'Sibling co-sharer lodged formal pre-emption objection under SAT Act Section 96; mutation contested.',
    },
    {
      id: 'DEMO-PARCEL-008',
      scenarioNum: 8,
      title: language === 'bn' ? '৮. নিখুঁত ধারাবাহিকতা ও নিয়মিত কর' : '8. Clean Title Chain & Paid Tax',
      badge: language === 'bn' ? 'বড় অসঙ্গতি পাওয়া যায়নি' : 'No Major Issue Detected',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      dag: '304',
      mouza: 'Senpara (Mirpur)',
      desc: language === 'bn'
        ? 'সিএস-এসএ-আরএস খতিয়ান ও বায়া দলিলের অবিকল ধারাবাহিকতা, নামজারি সম্পন্ন ও হাল সনের কর পরিশোধিত।'
        : 'CS-SA-RS uninterrupted chain of title, completed mutation porcha, and tax paid to date.',
    },
  ];

  return (
    <div className="space-y-12 pb-16 animate-fade-up">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-gov-primary">
          <ShieldCheck className="w-4 h-4 text-gov-primary" />
          <span>
            {language === 'bn'
              ? 'ভূমিভেরিফাই (BhumiSure) • Verify Before You Buy'
              : 'BhumiSure (BhumiVerify) • Verify Before You Buy'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {language === 'bn' ? (
            <>
              জমি কেনার আগে জানুন <span className="text-gov-primary">লেনদেন সংকেত</span> ও সম্ভাব্য ঝুঁকি
            </>
          ) : (
            <>
              Verify Land Records & <span className="text-gov-primary">Transaction Risks</span> Before You Buy
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {language === 'bn'
            ? 'বাংলাদেশে জমি ক্রয়ের ক্ষেত্রে সম্ভাব্য লেনদেন ঝুঁকি শনাক্ত করতে, উপলব্ধ রেকর্ড ও দলিল বুঝতে এবং অর্থ পরিশোধের পূর্বে কী যাচাই করতে হবে তা নিরূপণ করতে সহায়তা করে ভূমিভেরিফাই।'
            : 'BhumiSure helps prospective land buyers in Bangladesh identify potential transaction risks, understand available land-related records, and determine what they should verify before purchasing.'}
        </p>

        {/* Primary CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/check"
            className="btn-primary px-7 py-3 text-sm font-bold shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'bn' ? 'জমি যাচাই শুরু করুন (Check Land)' : 'Check Land Parcel'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/results?id=DEMO-PARCEL-001"
            className="btn-secondary px-6 py-3 text-sm font-medium"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>{language === 'bn' ? 'নমুনা ফলাফল পৃষ্ঠা দেখুন' : 'View Sample Results'}</span>
          </Link>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="pt-4 max-w-2xl mx-auto">
          <Disclaimer compact={true} />
        </div>
      </section>

      {/* 3-Step Primary Journey: Enter details → Review records → Identify what to verify */}
      <section className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'সহজ ৩ ধাপে জমি যাচাই প্রক্রিয়া' : 'Three-Step Verification Process'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'bn'
              ? 'তথ্য প্রবেশ → রেকর্ড পর্যালোচনা → কী যাচাই করতে হবে নিরূপণ'
              : 'Enter details → Review records → Identify what to verify'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Enter details */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-gov-primary border border-emerald-200 flex items-center justify-center font-bold text-sm">
              ১
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? '১. জমির পরিচিতি প্রদান (Enter Details)' : '1. Enter Land Details'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'বিভাগ, জেলা, উপজেলা/থানা, মৌজা, জে.এল. নম্বর, খতিয়ান এবং দাগ নম্বর প্রদান করুন। দাগ একা অনন্য নয়; পূর্ণ মৌজা পরিচয় জরুরি।'
                : 'Enter Division, District, Upazila/Thana, Mouza, JL number, Khatian number, and Dag/plot number to identify the parcel accurately.'}
            </p>
          </div>

          {/* Step 2: Review records */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-sm">
              ২
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? '২. রেকর্ড পর্যালোচনা (Review Records)' : '2. Review Available Records'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি হস্তান্তর দলিল, ধারা ৮৯ এলটি নোটিশ, ই-নামজারি আবেদন এবং চূড়ান্ত নিষ্পত্তির কালানুক্রমিক টাইমলাইন নিরীক্ষণ করুন।'
                : 'Inspect registered transfer deeds, Section 89 LT notices, pending mutation applications, and completed mutation in chronological order.'}
            </p>
          </div>

          {/* Step 3: Identify what to verify */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-sm">
              ৩
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? '৩. কী যাচাই করতে হবে নিরূপণ (Identify Next Steps)' : '3. Identify What to Verify'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'শনাক্তকৃত ঝুঁকির সহজ ব্যাখ্যা জানুন, কোন তথ্য অনুপস্থিত তা দেখুন এবং সহকারী কমিশনার (ভূমি) বা সাব-রেজিস্ট্রিতে কী তল্লাশ করতে হবে তা জানুন।'
                : 'Get clear, deterministic risk status, plain-language explanations of warnings, missing evidence, and recommended institutional checks.'}
            </p>
          </div>
        </div>
      </section>

      {/* Predefined Sample Scenarios */}
      <section className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {language === 'bn' ? '৮টি পরীক্ষামূলক নমুনা দৃশ্যকল্প' : 'Predefined Demonstration Scenarios'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'বিভিন্ন সম্ভাব্য ফলাফল এবং ঝুঁকির ধরন পরীক্ষা করতে নিচের যেকোনো একটি নমুনা সরাসরি ক্লিক করুন।'
                : 'Test different transaction outcomes, pending mutations, missing records, and conflict states in 1 click.'}
            </p>
          </div>

          <Link to="/check" className="text-xs text-gov-primary font-bold hover:underline flex items-center gap-1 self-start sm:self-auto">
            <span>{language === 'bn' ? 'সব দাগ অনুসন্ধান করুন' : 'Open Search Form'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all group"
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

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-gov-primary transition-colors">
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

              <div className="pt-2 flex flex-col gap-1.5">
                <Link
                  to={`/results?id=${sc.id}`}
                  className="w-full text-center py-2 px-3 rounded-lg bg-emerald-50 hover:bg-gov-primary hover:text-white text-gov-primary text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{language === 'bn' ? 'ফলাফল রিপোর্ট দেখুন' : 'View Result Report'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/check?parcel=${sc.id}`}
                  className="w-full text-center py-1.5 px-3 rounded-lg text-slate-500 hover:text-slate-800 text-[11px] font-medium transition-colors"
                >
                  {language === 'bn' ? 'ফর্মে প্রি-ফিল করুন' : 'Pre-fill Form'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Core Legal Principles: Deed ≠ Mutation Application ≠ Mutation Completed */}
      <section className="bg-slate-900 text-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 max-w-5xl mx-auto">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-400 text-xs font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'আইনগত বাস্তবতা ও মূল সতর্কতা' : 'Land Law Diligence Essentials'}</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {language === 'bn'
              ? '৩টি আলাদা বিষয় যা কখনোই এক নয়'
              : 'Three Distinct Events That Must Never Be Confused'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {language === 'bn'
              ? 'বাংলাদেশে জমি ক্রয়ে বিরোধ ও জালিয়াতি রোধ করার প্রধান পার্থক্যসমূহ:'
              : 'Important: a transfer-related event, a mutation application, and completed mutation are three different things.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
              <FileText className="w-4 h-4 shrink-0" />
              <span>{language === 'bn' ? '১. রেজিস্ট্রিকৃত দলিল' : '1. Transfer Deed Event'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি অফিসে দলিল রেজিস্ট্রির মাধ্যমে ক্রেতা-বিক্রেতার চুক্তি সম্পাদিত হয়। কিন্তু এটি স্বয়ংক্রিয়ভাবে খতিয়ান পরিবর্তন করে না।'
                : 'A registered deed transfers title between parties, but under SAT Act Section 89, it does not update the government record of rights until mutation.'}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{language === 'bn' ? '২. নামজারি আবেদন' : '2. Mutation Application'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'ই-নামজারি আবেদন দায়ের করা কেবল একটি প্রশাসনিক অনুরোধ। নায়েবের তদন্ত ও শুনানিতে আপত্তি আসলে তা বাতিল হতে পারে।'
                : 'Filing an online application is merely an active petition. During field verification by the revenue officer, petitions may face objections or denial.'}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{language === 'bn' ? '৩. নামজারি সম্পন্ন' : '3. Completed Mutation'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'সহকারী কমিশনার (ভূমি) আদেশ পাস করে নতুন খতিয়ান সৃষ্টি ও দাখিলা চালু করলেই কেবল নামজারি চূড়ান্ত ও নিষ্পন্ন বলে গণ্য হয়।'
                : 'Only when the AC (Land) signs the final mutation order, opens a new Jamabandi, and issues a mutated RoR is the process legally completed.'}
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/about"
            className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>{language === 'bn' ? 'আইনগত কাঠামো ও ধারা ৮৯ বিস্তারিত পড়ুন' : 'Read Section 89 Legal Guidance'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Full Statutory Disclaimer */}
      <section className="max-w-5xl mx-auto">
        <Disclaimer compact={false} />
      </section>
    </div>
  );
};
