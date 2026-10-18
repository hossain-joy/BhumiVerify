import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BANGLADESH_GEO_DATA } from '../lib/mock-data/bangladeshGeo';
import { MOCK_PARCELS, FictionalParcelRecord } from '../data/mockParcels';
import { validateParcelForm, ParcelFormFields, ParcelValidationErrors } from '../utils/validateParcel';
import { matchParcelRecord, MatchOutcome } from '../utils/matchParcel';
import { Disclaimer } from '../components/common/Disclaimer';
import {
  Search,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  AlertOctagon,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Layers,
  FileText,
  Loader2,
} from 'lucide-react';

const STORAGE_KEY = 'bhumisure_form_state';

export const CheckLandPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Form Fields State
  const [formFields, setFormFields] = useState<ParcelFormFields>(() => {
    // Check if edit mode or preserved state exists
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore error
      }
    }
    return {
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Gulshan',
      mouza: 'Gulshan',
      khatianNumber: '541',
      dagNumber: '85',
      jlNumber: '24',
      area: '6.50',
    };
  });

  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [errors, setErrors] = useState<ParcelValidationErrors>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [matchOutcome, setMatchOutcome] = useState<MatchOutcome | null>(null);

  // Field refs for accessible focus on first error
  const fieldRefs = {
    division: useRef<HTMLSelectElement>(null),
    district: useRef<HTMLSelectElement>(null),
    upazila: useRef<HTMLSelectElement>(null),
    mouza: useRef<HTMLInputElement>(null),
    khatianNumber: useRef<HTMLInputElement>(null),
    dagNumber: useRef<HTMLInputElement>(null),
    jlNumber: useRef<HTMLInputElement>(null),
    area: useRef<HTMLInputElement>(null),
  };

  // Geo options derived from Geo Data
  const divisionData = BANGLADESH_GEO_DATA[formFields.division];
  const districtList = divisionData ? Object.keys(divisionData.districts) : [];
  const districtData = divisionData?.districts[formFields.district];
  const upazilaList = districtData ? Object.keys(districtData.upazilas) : [];

  // Check URL params on initial load
  useEffect(() => {
    const clearParam = searchParams.get('clear');
    const parcelId = searchParams.get('parcel') || searchParams.get('id');

    if (clearParam === '1') {
      handleClear();
      return;
    }

    if (parcelId) {
      const match = MOCK_PARCELS.find((p) => p.id === parcelId);
      if (match) {
        loadExample(match);
      }
    }
  }, [searchParams]);

  // Persist form fields into session storage for back/edit support
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formFields));
  }, [formFields]);

  const handleFieldChange = (field: keyof ParcelFormFields, val: string) => {
    setFormFields((prev) => ({ ...prev, [field]: val }));

    // Clear inline error when user edits field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    // Clear prior outcome
    if (matchOutcome) {
      setMatchOutcome(null);
    }
  };

  const handleDivisionChange = (div: string) => {
    const divObj = BANGLADESH_GEO_DATA[div];
    const firstDist = divObj ? Object.keys(divObj.districts)[0] : '';
    const distObj = divObj?.districts[firstDist];
    const firstUpz = distObj ? Object.keys(distObj.upazilas)[0] : '';

    setFormFields((prev) => ({
      ...prev,
      division: div,
      district: firstDist,
      upazila: firstUpz,
    }));
  };

  const handleDistrictChange = (dist: string) => {
    const distObj = divisionData?.districts[dist];
    const firstUpz = distObj ? Object.keys(distObj.upazilas)[0] : '';

    setFormFields((prev) => ({
      ...prev,
      district: dist,
      upazila: firstUpz,
    }));
  };

  const loadExample = (rec: FictionalParcelRecord) => {
    const newFields: ParcelFormFields = {
      division: rec.division,
      district: rec.district,
      upazila: rec.upazila,
      mouza: rec.mouza,
      khatianNumber: rec.khatianNumber,
      dagNumber: rec.dagNumber,
      jlNumber: rec.jlNumber || '',
      area: rec.area || '',
    };
    setFormFields(newFields);
    setErrors({});
    setMatchOutcome(null);
  };

  const handleClear = () => {
    setFormFields({
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Gulshan',
      mouza: '',
      khatianNumber: '',
      dagNumber: '',
      jlNumber: '',
      area: '',
    });
    setErrors({});
    setMatchOutcome(null);
    sessionStorage.removeItem(STORAGE_KEY);
    setSearchParams({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSearching) return; // Prevent double submission

    // 1. Inline validation
    const validation = validateParcelForm(formFields, isBn ? 'bn' : 'en');
    if (!validation.isValid) {
      setErrors(validation.errors);
      if (validation.firstInvalidField && fieldRefs[validation.firstInvalidField]?.current) {
        fieldRefs[validation.firstInvalidField].current?.focus();
        fieldRefs[validation.firstInvalidField].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }

    setErrors({});
    setIsSearching(true);
    setMatchOutcome(null);

    // 2. Simulated local lookup (250ms state transition)
    setTimeout(() => {
      const outcome = matchParcelRecord(formFields, MOCK_PARCELS);
      setIsSearching(false);

      if (outcome.type === 'match' && outcome.parcel) {
        // Direct transition to single results screen
        navigate(`/results?id=${outcome.parcel.id}`);
      } else {
        // Stay on page and display dedicated state (conflict, ambiguous, no-match)
        setMatchOutcome(outcome);
      }
    }, 250);
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-up max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5 space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200 text-xs font-semibold">
            {isBn ? 'ভূমি অনুসন্ধান' : 'Parcel Lookup'}
          </span>
          <span className="text-xs text-slate-400">
            {isBn ? 'কাল্পনিক নমুনা ডেটাসেট' : 'Fictional Demo Dataset'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'জমির পরিচিতি তথ্য যাচাই করুন' : 'Check a Land Parcel'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          {isBn
            ? 'প্রশাসনিক অবস্থান ও প্লট পরিচিতি প্রবেশ করিয়ে নমুনা ডেটাসেটে সংরক্ষিত সংশ্লিষ্ট খতিয়ান, দলিল এবং নামজারি সংক্রান্ত ঘটনাগুলো যাচাই করুন।'
            : 'Enter parcel identifiers to compare against simulated records. The prototype performs multi-identifier matching on composite keys.'}
        </p>
      </div>

      {/* "Try an example" area clearly telling the user it is fictional */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-gov-primary" aria-hidden="true" />
            <span>{isBn ? 'একটি কাল্পনিক নমুনা উদাহরণ লোড করুন:' : 'Try an Example (Fictional Sample Scenarios):'}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {isBn ? 'ক্লিকের মাধ্যমে ফর্ম পূরণ' : '1-Click Pre-fill'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => loadExample(MOCK_PARCELS[0])}
            className="text-left p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all cursor-pointer"
          >
            <div className="text-[11px] font-bold text-emerald-950">1. Consistent Sample</div>
            <div className="text-[10px] text-emerald-800 truncate">Gulshan • Dag 85</div>
          </button>

          <button
            type="button"
            onClick={() => loadExample(MOCK_PARCELS[1])}
            className="text-left p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 transition-all cursor-pointer"
          >
            <div className="text-[11px] font-bold text-amber-950">2. Review Recommended</div>
            <div className="text-[10px] text-amber-800 truncate">Tejgaon • Dag 402</div>
          </button>

          <button
            type="button"
            onClick={() => loadExample(MOCK_PARCELS[2])}
            className="text-left p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 transition-all cursor-pointer"
          >
            <div className="text-[11px] font-bold text-blue-950">3. Incomplete Details</div>
            <div className="text-[10px] text-blue-800 truncate">Dhanmondi • Dag 118</div>
          </button>

          <button
            type="button"
            onClick={() => {
              // Pre-fill with deliberate JL conflict to demonstrate conflict detection rule!
              setFormFields({
                division: 'Chattogram',
                district: 'Chattogram',
                upazila: 'Panchlaish',
                mouza: 'Nasirabad',
                khatianNumber: '210',
                dagNumber: '210',
                jlNumber: '99', // Mismatched from actual JL 32
                area: '8.00',
              });
              setErrors({});
              setMatchOutcome(null);
            }}
            className="text-left p-2.5 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 transition-all cursor-pointer"
          >
            <div className="text-[11px] font-bold text-rose-950">4. JL Conflict Test</div>
            <div className="text-[10px] text-rose-800 truncate">Nasirabad • JL Conflict</div>
          </button>
        </div>
      </div>

      {/* Outcome Banner (No-Match, JL Conflict, or Ambiguous Match) */}
      {matchOutcome && (
        <div
          role="status"
          aria-live="polite"
          className="animate-fade-up"
        >
          {matchOutcome.type === 'no_match' && (
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mx-auto">
                <HelpCircle className="w-6 h-6 text-slate-700" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {isBn ? 'কোনো ম্যাচিং রেকর্ড মেলেনি' : 'No Matching Record in Demo Dataset'}
                </h3>
                <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                  {isBn ? matchOutcome.messageBn : matchOutcome.message}
                </p>
              </div>

              {/* Explicit safety note */}
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 max-w-xl mx-auto leading-relaxed">
                <strong>{isBn ? 'সতর্কতা:' : 'Notice:'}</strong>{' '}
                {isBn
                  ? 'নমুনা ডেটায় রেকর্ড না পাওয়ার অর্থ কখনোই এটি নয় যে জমিটি আইনি ঝামেলা বা প্রতারণামুক্ত। জমি ক্রয়ের পূর্বে সহকারী কমিশনার (ভূমি) এবং সাব-রেজিস্ট্রি অফিসে সশরীরে বায়া দলিল তল্লাশ আবশ্যক।'
                  : 'The absence of mock records must never be interpreted as evidence that the parcel has clear title or is safe. Physical title searches at official land offices are indispensable.'}
              </div>

              <div className="pt-1 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => loadExample(MOCK_PARCELS[0])}
                  className="btn-primary text-xs px-4 py-2 font-semibold cursor-pointer"
                >
                  {isBn ? 'নমুনা ১ দিয়ে পরীক্ষা করুন' : 'Try Demo Scenario 1'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-secondary text-xs px-4 py-2 cursor-pointer"
                >
                  {isBn ? 'ফর্ম খালি করুন' : 'Clear Form'}
                </button>
              </div>
            </div>
          )}

          {matchOutcome.type === 'conflict' && (
            <div className="bg-rose-50 border border-rose-300 rounded-xl p-5 text-rose-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
                <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                <h3>{isBn ? 'পরিচিতি অসঙ্গতি শনাক্ত হয়েছে' : 'Identifier Conflict Detected'}</h3>
              </div>
              <p className="text-xs leading-relaxed">
                {isBn ? matchOutcome.conflictReasonBn : matchOutcome.conflictReason}
              </p>
              <p className="text-xs leading-relaxed text-rose-900">
                {isBn ? matchOutcome.messageBn : matchOutcome.message}
              </p>
              <div className="pt-1 flex gap-2">
                {matchOutcome.parcel && (
                  <button
                    type="button"
                    onClick={() => navigate(`/results?id=${matchOutcome.parcel?.id}`)}
                    className="btn-primary text-xs px-4 py-1.5 font-bold cursor-pointer bg-rose-700 hover:bg-rose-800"
                  >
                    {isBn ? 'অসঙ্গতিসহ ফলাফল দেখুন' : 'View Record with Flagged Conflict'}
                  </button>
                )}
              </div>
            </div>
          )}

          {matchOutcome.type === 'ambiguous' && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
                <h3>{isBn ? 'দ্বৈত বা অস্পষ্ট ফলাফল' : 'Ambiguous Match Detected'}</h3>
              </div>
              <p className="text-xs leading-relaxed">
                {isBn ? matchOutcome.messageBn : matchOutcome.message}
              </p>
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {isBn ? 'নির্দিষ্ট রেকর্ডটি নির্বাচন করুন:' : 'Select which candidate to inspect:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchOutcome.candidates?.map((c) => (
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
                        {c.upazila}, {c.district} (JL {c.jlNumber || 'N/A'}, Area: {c.area || 'N/A'} Decimal)
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Parcel Identifier Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isBn ? 'জমির প্রশাসনিক ও খতিয়ান পরিচিতি' : 'Parcel Identifiers'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn
                ? 'লাল তারকা চিহ্নিত ক্ষেত্রগুলো পূরণ করা বাধ্যতামূলক।'
                : 'Fields marked with * are required for composite matching.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isBn ? 'ফর্ম খালি করুন' : 'Clear form'}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Section 1: Location Identifiers */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-gov-primary" aria-hidden="true" />
              <span>{isBn ? '১. প্রশাসনিক অবস্থান (Location)' : '1. Location Hierarchy'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Division */}
              <div>
                <label
                  htmlFor="field-division"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'বিভাগ (Division) *' : 'Division *'}
                </label>
                <select
                  id="field-division"
                  ref={fieldRefs.division}
                  value={formFields.division}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  aria-invalid={errors.division ? 'true' : 'false'}
                  aria-describedby={errors.division ? 'error-division' : undefined}
                  className={`w-full text-xs rounded-lg border p-2.5 bg-white transition-colors ${
                    errors.division ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                >
                  {Object.keys(BANGLADESH_GEO_DATA).map((divKey) => (
                    <option key={divKey} value={divKey}>
                      {isBn ? BANGLADESH_GEO_DATA[divKey].bengali : divKey}
                    </option>
                  ))}
                </select>
                {errors.division && (
                  <p id="error-division" className="text-[11px] text-rose-600 mt-1">
                    {errors.division}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label
                  htmlFor="field-district"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'জেলা (District) *' : 'District *'}
                </label>
                <select
                  id="field-district"
                  ref={fieldRefs.district}
                  value={formFields.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  aria-invalid={errors.district ? 'true' : 'false'}
                  aria-describedby={errors.district ? 'error-district' : undefined}
                  className={`w-full text-xs rounded-lg border p-2.5 bg-white transition-colors ${
                    errors.district ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                >
                  {districtList.map((distKey) => (
                    <option key={distKey} value={distKey}>
                      {isBn && divisionData?.districts[distKey]?.bengali
                        ? divisionData.districts[distKey].bengali
                        : distKey}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p id="error-district" className="text-[11px] text-rose-600 mt-1">
                    {errors.district}
                  </p>
                )}
              </div>

              {/* Upazila / Thana */}
              <div>
                <label
                  htmlFor="field-upazila"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'উপজেলা / থানা (Upazila) *' : 'Upazila / Thana *'}
                </label>
                <select
                  id="field-upazila"
                  ref={fieldRefs.upazila}
                  value={formFields.upazila}
                  onChange={(e) => handleFieldChange('upazila', e.target.value)}
                  aria-invalid={errors.upazila ? 'true' : 'false'}
                  aria-describedby={errors.upazila ? 'error-upazila' : undefined}
                  className={`w-full text-xs rounded-lg border p-2.5 bg-white transition-colors ${
                    errors.upazila ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                >
                  {upazilaList.map((upzKey) => (
                    <option key={upzKey} value={upzKey}>
                      {isBn && districtData?.upazilas[upzKey]?.bengali
                        ? districtData.upazilas[upzKey].bengali
                        : upzKey}
                    </option>
                  ))}
                </select>
                {errors.upazila && (
                  <p id="error-upazila" className="text-[11px] text-rose-600 mt-1">
                    {errors.upazila}
                  </p>
                )}
              </div>

              {/* Mouza */}
              <div>
                <label
                  htmlFor="field-mouza"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'মৌজা (Mouza) *' : 'Mouza *'}
                </label>
                <input
                  id="field-mouza"
                  ref={fieldRefs.mouza}
                  type="text"
                  value={formFields.mouza}
                  onChange={(e) => handleFieldChange('mouza', e.target.value)}
                  placeholder="e.g. Gulshan, Tejgaon I/A"
                  aria-invalid={errors.mouza ? 'true' : 'false'}
                  aria-describedby={errors.mouza ? 'error-mouza' : undefined}
                  className={`w-full text-xs rounded-lg border p-2.5 transition-colors ${
                    errors.mouza ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.mouza && (
                  <p id="error-mouza" className="text-[11px] text-rose-600 mt-1">
                    {errors.mouza}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Parcel Identifiers */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-gov-primary" aria-hidden="true" />
              <span>{isBn ? '২. প্লট ও রেকর্ড পরিচিতি' : '2. Parcel Identifiers'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Khatian Number */}
              <div>
                <label
                  htmlFor="field-khatian"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'খতিয়ান নম্বর (Khatian No) *' : 'Khatian Number *'}
                </label>
                <input
                  id="field-khatian"
                  ref={fieldRefs.khatianNumber}
                  type="text"
                  value={formFields.khatianNumber}
                  onChange={(e) => handleFieldChange('khatianNumber', e.target.value)}
                  placeholder="e.g. 541, 1204, 88"
                  aria-invalid={errors.khatianNumber ? 'true' : 'false'}
                  aria-describedby={errors.khatianNumber ? 'error-khatian' : undefined}
                  className={`w-full text-xs rounded-lg border p-2.5 transition-colors ${
                    errors.khatianNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.khatianNumber && (
                  <p id="error-khatian" className="text-[11px] text-rose-600 mt-1">
                    {errors.khatianNumber}
                  </p>
                )}
              </div>

              {/* Dag / Plot Number */}
              <div>
                <label
                  htmlFor="field-dag"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'দাগ নম্বর (Dag / Plot No) *' : 'Dag / Plot Number *'}
                </label>
                <input
                  id="field-dag"
                  ref={fieldRefs.dagNumber}
                  type="text"
                  value={formFields.dagNumber}
                  onChange={(e) => handleFieldChange('dagNumber', e.target.value)}
                  placeholder="e.g. 85, 402, 118"
                  aria-invalid={errors.dagNumber ? 'true' : 'false'}
                  aria-describedby={errors.dagNumber ? 'error-dag' : undefined}
                  className={`w-full text-xs rounded-lg border p-2.5 transition-colors ${
                    errors.dagNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.dagNumber && (
                  <p id="error-dag" className="text-[11px] text-rose-600 mt-1">
                    {errors.dagNumber}
                  </p>
                )}
              </div>

              {/* JL Number (Optional) */}
              <div>
                <label
                  htmlFor="field-jl"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isBn ? 'জে.এল. নম্বর (JL No) — ঐচ্ছিক' : 'JL Number (Optional)'}
                </label>
                <input
                  id="field-jl"
                  ref={fieldRefs.jlNumber}
                  type="text"
                  value={formFields.jlNumber || ''}
                  onChange={(e) => handleFieldChange('jlNumber', e.target.value)}
                  placeholder="e.g. 24, 14, 08"
                  className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  {isBn ? 'মৌজা জে.এল. অমিল শনাক্তে ব্যবহৃত' : 'Used for JL conflict verification'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Optional Additional Details (Collapsible) */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdditional(!showAdditional)}
              className="text-xs font-semibold text-gov-primary hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>{showAdditional ? (isBn ? 'অতিরিক্ত তথ্য লুকান' : 'Hide Additional Details') : (isBn ? '+ অতিরিক্ত তথ্য যুক্ত করুন (ঐচ্ছিক)' : '+ Add Optional Details (Area)')}</span>
              {showAdditional ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdditional && (
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
                <div>
                  <label
                    htmlFor="field-area"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    {isBn ? 'জমির পরিমাণ (Decimal Area) — ঐচ্ছিক' : 'Land Area (Decimal) — Optional'}
                  </label>
                  <input
                    id="field-area"
                    ref={fieldRefs.area}
                    type="text"
                    value={formFields.area || ''}
                    onChange={(e) => handleFieldChange('area', e.target.value)}
                    placeholder="e.g. 6.50"
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClear}
              className="btn-secondary text-xs px-4 py-2.5 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'ফর্ম খালি করুন' : 'Clear Form'}</span>
            </button>

            <button
              type="submit"
              disabled={isSearching}
              className="btn-primary text-xs px-7 py-2.5 font-bold cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Searching Sample Records...'}</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span>{isBn ? 'নমুনা রেকর্ড যাচাই করুন' : 'Check a land parcel'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Statutory Diligence Reminder */}
      <Disclaimer compact={true} />
    </div>
  );
};
