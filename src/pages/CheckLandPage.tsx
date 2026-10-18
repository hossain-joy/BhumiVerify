import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PARCELS } from '../lib/mock-data/parcels';
import { ParcelInputDetails, ParcelReference } from '../types';
import {
  validateParcelInput,
  searchParcel,
  handleNoMatch,
  handleIncompleteData,
} from '../utils/landFunctions';
import { ParcelSearchForm } from '../components/land/ParcelSearchForm';
import { DemoDataTag } from '../components/common/DemoDataTag';
import { Disclaimer } from '../components/common/Disclaimer';
import {
  Search,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Info,
  CheckCircle2,
  FileText,
  Scale,
  MapPin,
  Building,
} from 'lucide-react';

export const CheckLandPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search input state
  const [input, setInput] = useState<ParcelInputDetails>({
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Tejgaon',
    mouza: 'Tejgaon I/A',
    dagNumber: '402',
    khatianNumber: '1204',
    jlNumber: '14',
    area: '5.25',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [noMatchFeedback, setNoMatchFeedback] = useState<string | null>(null);
  const [ambiguousCandidates, setAmbiguousCandidates] = useState<ParcelReference[]>([]);

  // Pre-fill preset scenarios
  const applyPresetScenario = (presetId: string) => {
    const target = INITIAL_PARCELS.find((p) => p.id === presetId);
    if (!target) return;

    setInput({
      division: target.division,
      district: target.district,
      upazila: target.upazila,
      mouza: target.mouza,
      dagNumber: target.dagNumber,
      khatianNumber: target.khatianNumber || '',
      jlNumber: target.jlNumber || '',
      area: target.area ? target.area.toString() : '',
    });
    setErrors({});
    setNoMatchFeedback(null);
    setAmbiguousCandidates([]);

    // Immediately navigate to results for that demo parcel
    navigate(`/results?id=${target.id}`);
  };

  // Check URL params on initial load
  useEffect(() => {
    const parcelParam = searchParams.get('parcel') || searchParams.get('id');
    const scenarioParam = searchParams.get('scenario');

    if (parcelParam) {
      applyPresetScenario(parcelParam);
      return;
    }

    if (scenarioParam) {
      const idx = parseInt(scenarioParam, 10);
      if (idx >= 1 && idx <= INITIAL_PARCELS.length) {
        applyPresetScenario(INITIAL_PARCELS[idx - 1].id);
      }
    }
  }, [searchParams]);

  const handleFieldChange = (field: keyof ParcelInputDetails, value: string) => {
    setInput((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setNoMatchFeedback(null);
  };

  const handleReset = () => {
    setInput({
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Tejgaon',
      mouza: '',
      dagNumber: '',
      khatianNumber: '',
      jlNumber: '',
      area: '',
    });
    setErrors({});
    setNoMatchFeedback(null);
    setAmbiguousCandidates([]);
    setSearchParams({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate inputs using core utility function
    const validation = validateParcelInput(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSearching(true);
    setNoMatchFeedback(null);
    setAmbiguousCandidates([]);

    // 2. Perform search with animated loading indicator
    setTimeout(async () => {
      const searchRes = await searchParcel(input, INITIAL_PARCELS);
      setIsSearching(false);

      if (searchRes.isMatched && searchRes.parcel) {
        // Exact or strong match: navigate to results page
        navigate(`/results?id=${searchRes.parcel.id}`);
      } else if (searchRes.matchType === 'ambiguous' && searchRes.candidates && searchRes.candidates.length > 0) {
        // Multiple candidate matches found
        setAmbiguousCandidates(searchRes.candidates);
      } else {
        // No match found
        const noMatch = handleNoMatch(input);
        setNoMatchFeedback(language === 'bn' ? noMatch.messageBn : noMatch.message);
      }
    }, 350);
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-up">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {language === 'bn' ? 'জমি অনুসন্ধান ও পরিচিতি যাচাই' : 'Land Search & Parcel Identification'}
              </h1>
              <DemoDataTag type="demo_data" />
            </div>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {language === 'bn'
                ? 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান এবং দাগ নম্বর প্রবেশ করিয়ে নমুনা ডেটাসেটে সংরক্ষিত সংশ্লিষ্ট প্লটের দলিল, ধারা ৮৯ নোটিশ, ই-নামজারি এবং আইনি সংকেত যাচাই করুন।'
                : 'Enter Bangladesh land identifiers (Division, District, Upazila, Mouza, JL, Khatian, and Dag Number) to locate parcels and inspect recorded deed, Section 89 notice, and e-mutation activity.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/results?id=DEMO-PARCEL-001"
              className="btn-secondary text-xs px-3.5 py-2 cursor-pointer font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-gov-primary" />
              <span>{language === 'bn' ? 'নমুনা ফলাফল দেখুন' : 'View Sample Report'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Ambiguous Match Alert Box */}
      {ambiguousCandidates.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-xs text-amber-950 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {language === 'bn'
                ? 'একাধিক সম্ভাব্য রেকর্ড পাওয়া গেছে (দ্বৈত ফলাফল):'
                : 'Multiple Matching Candidates Detected in Demonstration Data:'}
            </span>
          </div>
          <p className="leading-relaxed">
            {language === 'bn'
              ? 'প্রদত্ত অনুসন্ধানে একাধিক প্লট পাওয়া গেছে। নির্দিষ্ট ফলাফল দেখতে নিচের তালিকা থেকে কাঙ্ক্ষিত প্লটটি নির্বাচন করুন:'
              : 'The entered identifiers match more than one parcel in the sample dataset. Select which parcel report you wish to inspect:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {ambiguousCandidates.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => navigate(`/results?id=${c.id}`)}
                className="text-left p-3 rounded-lg bg-white border border-amber-300 hover:border-amber-500 hover:bg-amber-100/50 transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between font-bold text-slate-900 text-xs mb-1">
                  <span>{c.mouza} • Dag {c.dagNumber}</span>
                  <span className="font-mono text-[10px] text-gov-primary group-hover:underline">
                    {c.id} →
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  {c.upazila}, {c.district} (Khatian: {c.khatianNumber || 'N/A'}, Area: {c.area} Decimal)
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Match Alert Box */}
      {noMatchFeedback && (
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-6 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mx-auto">
            <HelpCircle className="w-6 h-6 text-slate-700" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? 'নমুনা ডেটাসেটে কোনো ম্যাচিং রেকর্ড মেলেনি' : 'No Matching Record Found in Demonstration Data'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {noMatchFeedback}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 leading-snug">
            <strong>{language === 'bn' ? 'আইনি সতর্কতা:' : 'Important Notice:'}</strong>{' '}
            {language === 'bn'
              ? 'নমুনা ডেটায় রেকর্ড না পাওয়ার অর্থ জমিটি বিরোধমুক্ত বা নিরাপদ নয়। জমি ক্রয়ের আগে সহকারী কমিশনার (ভূমি) এবং সাব-রেজিস্ট্রি অফিসে সশরীরে বায়া দলিল তল্লাশ আবশ্যক।'
              : 'Absence of demo records does not indicate clear title. Physical due diligence at the relevant AC (Land) and Sub-Registry Office is legally required.'}
          </div>

          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => applyPresetScenario('DEMO-PARCEL-001')}
              className="btn-primary text-xs px-4 py-2 font-semibold cursor-pointer"
            >
              {language === 'bn' ? 'নমুনা রেকর্ড ১ দিয়ে পরীক্ষা করুন' : 'Test with Demo Parcel 1'}
            </button>
            <button
              onClick={handleReset}
              className="btn-secondary text-xs px-4 py-2 cursor-pointer"
            >
              {language === 'bn' ? 'ফর্ম খালি করুন' : 'Clear Form'}
            </button>
          </div>
        </div>
      )}

      {/* Main Search Form Component */}
      <ParcelSearchForm
        input={input}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        errors={errors}
        isSearching={isSearching}
        onSelectPreset={applyPresetScenario}
      />

      {/* Buyer Guidance & Land Identifiers Explained */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Info className="w-4 h-4 text-gov-primary" />
          <span>{language === 'bn' ? 'অনুসন্ধান নির্দেশিকা ও তথ্যের গুরুত্ব' : 'Search Guidance & Identifier Integrity'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gov-primary" />
              <span>{language === 'bn' ? 'দাগ নম্বর একা অনন্য নয়' : 'Dag Number is Not Unique Alone'}</span>
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'একটি দাগ নম্বর শুধুমাত্র সংশ্লিষ্ট মৌজা, জে.এল. নম্বর এবং উপজেলার সাথে যুক্ত হয়েই নির্দিষ্ট ভূমিখণ্ড নির্দেশ করে।'
                : 'A plot/dag number repeats across different mouzas. Full administrative nesting (Division down to Mouza) is mandatory.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'bn' ? 'জরিপ খতিয়ান (CS, SA, RS, সিটি)' : 'Survey Porcha (CS, SA, RS, BS)'}</span>
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'পূর্ববর্তী সিএস, এসএ এবং হাল আরএস/বিএস জরিপের খতিয়ান ধারাবাহিকতা পরীক্ষা করে মূল মালিকানার উৎস যাচাই করা হয়।'
                : 'Tracing continuity from historic CS and SA sheets to recent RS/City survey khatians establishes uninterrupted chain of title.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-600" />
              <span>{language === 'bn' ? 'ধারা ৮৯ ও নামজারি' : 'SAT Act Section 89 & Mutation'}</span>
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'দলিল রেজিস্ট্রির পর সাব-রেজিস্ট্রার কর্তৃক এলটি নোটিশ প্রেরিত হলেও সহকারী কমিশনার (ভূমি) দ্বারা নামজারি সম্পন্ন হওয়া অপরিহার্য।'
                : 'Deed registration triggers an LT notice to the AC (Land), but legal transfer in revenue records requires completed e-mutation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Disclaimer */}
      <Disclaimer compact={true} />
    </div>
  );
};
