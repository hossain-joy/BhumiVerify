import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BANGLADESH_GEO_DATA } from '../lib/mock-data/bangladeshGeo';
import { INITIAL_PARCELS } from '../lib/mock-data/parcels';
import { ParcelInputDetails, ParcelReference, LandEvent } from '../types';
import {
  matchParcelMultiIdentifier,
  ParcelMatchEvaluation,
  extractCoreStatus,
} from '../lib/riskEngine';
import { DemoDataTag } from '../components/common/DemoDataTag';
import { formatDate } from '../lib/utils';
import {
  Search,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock,
  Printer,
  FileCheck2,
  Layers,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  Sparkles,
  MapPin,
  Building,
  Users,
  Receipt,
  Landmark,
  Scale,
  FileSpreadsheet,
  AlertOctagon,
} from 'lucide-react';

export const CheckLandPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Form State
  const [division, setDivision] = useState<string>('Dhaka');
  const [district, setDistrict] = useState<string>('Dhaka');
  const [upazila, setUpazila] = useState<string>('Tejgaon');
  const [mouza, setMouza] = useState<string>('Tejgaon I/A');
  const [khatianNumber, setKhatianNumber] = useState<string>('1204');
  const [dagNumber, setDagNumber] = useState<string>('402');

  // Validation & Results State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<ParcelMatchEvaluation | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Geo options derived from mock data
  const divisionData = BANGLADESH_GEO_DATA[division];
  const districtList = divisionData ? Object.keys(divisionData.districts) : [];
  const districtData = divisionData?.districts[district];
  const upazilaList = districtData ? Object.keys(districtData.upazilas) : [];
  const upazilaData = districtData?.upazilas[upazila];
  const mouzaList = upazilaData ? upazilaData.mouzas : [];

  // Update cascade selections when parents change
  const handleDivisionChange = (newDiv: string) => {
    setDivision(newDiv);
    const divObj = BANGLADESH_GEO_DATA[newDiv];
    const firstDist = divObj ? Object.keys(divObj.districts)[0] : '';
    setDistrict(firstDist);
    const distObj = divObj?.districts[firstDist];
    const firstUpz = distObj ? Object.keys(distObj.upazilas)[0] : '';
    setUpazila(firstUpz);
    const upzObj = distObj?.upazilas[firstUpz];
    const firstMouza = upzObj && upzObj.mouzas[0] ? upzObj.mouzas[0].name : '';
    setMouza(firstMouza);
  };

  const handleDistrictChange = (newDist: string) => {
    setDistrict(newDist);
    const distObj = divisionData?.districts[newDist];
    const firstUpz = distObj ? Object.keys(distObj.upazilas)[0] : '';
    setUpazila(firstUpz);
    const upzObj = distObj?.upazilas[firstUpz];
    const firstMouza = upzObj && upzObj.mouzas[0] ? upzObj.mouzas[0].name : '';
    setMouza(firstMouza);
  };

  const handleUpazilaChange = (newUpz: string) => {
    setUpazila(newUpz);
    const upzObj = districtData?.upazilas[newUpz];
    const firstMouza = upzObj && upzObj.mouzas[0] ? upzObj.mouzas[0].name : '';
    setMouza(firstMouza);
    if (upzObj && upzObj.mouzas[0]) {
      setDagNumber(upzObj.mouzas[0].defaultDag || '');
      setKhatianNumber(upzObj.mouzas[0].defaultKhatian || '');
    }
  };

  const handleMouzaChange = (newMouzaName: string) => {
    setMouza(newMouzaName);
    const matched = mouzaList.find((m) => m.name === newMouzaName);
    if (matched) {
      if (matched.defaultDag) setDagNumber(matched.defaultDag);
      if (matched.defaultKhatian) setKhatianNumber(matched.defaultKhatian);
    }
  };

  // Pre-fill demo scenarios
  const applyPresetScenario = (presetId: string) => {
    const target = INITIAL_PARCELS.find((p) => p.id === presetId);
    if (!target) return;

    setDivision(target.division);
    setDistrict(target.district);
    setUpazila(target.upazila);
    setMouza(target.mouza);
    setKhatianNumber(target.khatianNumber || '');
    setDagNumber(target.dagNumber);
    setErrors({});

    // Automatically trigger match
    runEvaluation({
      division: target.division,
      district: target.district,
      upazila: target.upazila,
      mouza: target.mouza,
      dagNumber: target.dagNumber,
      khatianNumber: target.khatianNumber,
    });
  };

  // Check URL params on load
  useEffect(() => {
    const pParam = searchParams.get('parcel');
    const sParam = searchParams.get('scenario');
    if (pParam) {
      const match = INITIAL_PARCELS.find((p) => p.id === pParam);
      if (match) {
        applyPresetScenario(match.id);
        return;
      }
    }
    if (sParam === '1') applyPresetScenario('DEMO-PARCEL-001');
    else if (sParam === '2') applyPresetScenario('DEMO-PARCEL-002');
    else if (sParam === '3') applyPresetScenario('DEMO-PARCEL-003');
    else if (sParam === '4') applyPresetScenario('DEMO-PARCEL-004');
    else if (sParam === '5') applyPresetScenario('DEMO-PARCEL-005');
    else if (sParam === '6') applyPresetScenario('DEMO-PARCEL-006');
    else if (sParam === '7') applyPresetScenario('DEMO-PARCEL-007');
    else if (sParam === '8') applyPresetScenario('DEMO-PARCEL-008');
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!division.trim()) newErrors.division = language === 'bn' ? 'বিভাগ নির্বাচন আবশ্যক' : 'Division is required';
    if (!district.trim()) newErrors.district = language === 'bn' ? 'জেলা নির্বাচন আবশ্যক' : 'District is required';
    if (!upazila.trim()) newErrors.upazila = language === 'bn' ? 'উপজেলা নির্বাচন আবশ্যক' : 'Upazila is required';
    if (!mouza.trim()) newErrors.mouza = language === 'bn' ? 'মৌজা নির্বাচন বা প্রদান আবশ্যক' : 'Mouza is required';
    if (!dagNumber.trim()) newErrors.dagNumber = language === 'bn' ? 'দাগ নম্বর প্রদান আবশ্যক' : 'Dag number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const runEvaluation = (input: ParcelInputDetails) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate realistic instant verification response
    setTimeout(() => {
      const res = matchParcelMultiIdentifier(input, INITIAL_PARCELS);
      setEvaluation(res);
      setIsSearching(false);
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    runEvaluation({
      division,
      district,
      upazila,
      mouza,
      dagNumber,
      khatianNumber,
    });
  };

  const handleReset = () => {
    setEvaluation(null);
    setHasSearched(false);
    setErrors({});
    setDagNumber('');
    setKhatianNumber('');
    setSearchParams({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {language === 'bn' ? 'জমি যাচাই ও লেনদেন সংকেত রিপোর্ট' : 'Check Land & Transaction Risk Overview'}
              </h1>
              <DemoDataTag type="demo_data" />
            </div>
            <p className="text-sm text-slate-600 max-w-3xl">
              {language === 'bn'
                ? 'বিভাগ, জেলা, উপজেলা, মৌজা এবং দাগ নম্বর প্রবেশ করিয়ে সংশ্লিষ্ট প্লটের সাব-রেজিস্ট্রি দলিল, ধারা ৮৯ নোটিশ, নামজারি, মালিকানা অংশ, কর দাখিলা এবং আইনগত দায় খতিয়ে দেখুন।'
                : 'Enter multi-level land identifiers (Division, District, Upazila, Mouza, Dag, Khatian) to inspect recorded transfer deeds, Section 89 LT notices, mutation proceedings, ownership shares, tax receipts, and legal encumbrance signals.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {evaluation && (
              <button
                onClick={handlePrint}
                className="btn-secondary text-xs px-3 py-1.5 cursor-pointer"
                title="Print Summary Report"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'রিপোর্ট প্রিন্ট' : 'Print'}</span>
              </button>
            )}
            <button
              onClick={handleReset}
              className="btn-secondary text-xs px-3 py-1.5 cursor-pointer text-slate-600 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'নতুন অনুসন্ধান' : 'New Search'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Demo Pre-fill Selector (8 Diverse Scenarios) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Sparkles className="w-4 h-4 text-gov-primary" />
            <span>{language === 'bn' ? 'দ্রুত পরীক্ষামূলক নমুনা রেকর্ড বাছাই করুন (১-ক্লিকে ফর্ম পূরণ ও ফলাফল):' : 'Quick Demo Scenarios (1-Click Pre-fill & Instant Evaluation):'}</span>
          </div>
          <span className="text-[11px] text-slate-400">৮টি ভিন্ন প্রেক্ষাপট</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* 1. Recent Transfer */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-001')}
            className="text-left p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 mb-0.5">
              <span>{language === 'bn' ? '১. সাম্প্রতিক দলিল' : '1. Recent Deed'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-950 font-mono">Dag 402</span>
            </div>
            <p className="text-[10px] text-amber-800 leading-snug">
              {language === 'bn' ? 'তেজগাঁও: দলিল ও নোটিশ আছে, নামজারি অনিষ্পন্ন।' : 'Tejgaon: Registered deed logged; mutation pending.'}
            </p>
          </button>

          {/* 2. Mutation Application */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-002')}
            className="text-left p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-blue-900 mb-0.5">
              <span>{language === 'bn' ? '২. নামজারি আবেদন' : '2. Petition Active'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-200/70 text-blue-950 font-mono">Dag 118</span>
            </div>
            <p className="text-[10px] text-blue-800 leading-snug">
              {language === 'bn' ? 'ধানমন্ডি: আবেদন শুনানাধীন, পাওয়ার অব অ্যাটর্নি।' : 'Dhanmondi: e-Mutation filed; hearing pending; POA.'}
            </p>
          </button>

          {/* 3. Mutation Complete */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-003')}
            className="text-left p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-0.5">
              <span>{language === 'bn' ? '৩. নামজারি সম্পন্ন' : '3. Mutation Done'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200/70 text-emerald-950 font-mono">Dag 85</span>
            </div>
            <p className="text-[10px] text-emerald-800 leading-snug">
              {language === 'bn' ? 'গুলশান: নামজারি খতিয়ান জারিকৃত ও দাখিলা হালনাগাদ।' : 'Gulshan: Mutated RoR issued; tax paid to date.'}
            </p>
          </button>

          {/* 4. Conflicting Records */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-004')}
            className="text-left p-2.5 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-rose-900 mb-0.5">
              <span>{language === 'bn' ? '৪. জরিপ বিরোধ' : '4. Survey Clash'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-200/70 text-rose-950 font-mono">Dag 999</span>
            </div>
            <p className="text-[10px] text-rose-800 leading-snug">
              {language === 'bn' ? 'আমিনবাজার: এসএ ও আরএস অমিল, আদালতের নিষেধাজ্ঞা।' : 'Aminbazar: SA vs RS dispute; court stay order.'}
            </p>
          </button>

          {/* 5. Bank Mortgage Lien */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-005')}
            className="text-left p-2.5 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-900 mb-0.5">
              <span>{language === 'bn' ? '৫. ব্যাংক মর্টগেজ' : '5. Bank Mortgage'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-200/70 text-purple-950 font-mono">Dag 210</span>
            </div>
            <p className="text-[10px] text-purple-800 leading-snug">
              {language === 'bn' ? 'চট্টগ্রাম (নাসিরাবাদ): অগ্রণী ব্যাংক ঋণ দায় ও POA বিরোধ।' : 'Chittagong: Bank mortgage lien & disputed POA.'}
            </p>
          </button>

          {/* 6. Classification Mismatch */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-006')}
            className="text-left p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 mb-0.5">
              <span>{language === 'bn' ? '৬. শ্রেণি অমিল' : '6. Class Mismatch'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-950 font-mono">Dag 201</span>
            </div>
            <p className="text-[10px] text-amber-800 leading-snug">
              {language === 'bn' ? 'গাজীপুর: খতিয়ানে কৃষিজমি কিন্তু বাণিজ্যিক বিক্রি।' : 'Gazipur: Nal in porcha sold as commercial factory.'}
            </p>
          </button>

          {/* 7. Co-Sharer Pre-emption Objection */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-007')}
            className="text-left p-2.5 rounded-lg border border-orange-200 bg-orange-50/50 hover:bg-orange-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-orange-900 mb-0.5">
              <span>{language === 'bn' ? '৭. শরিকি আপত্তি' : '7. Co-Sharer Issue'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-200/70 text-orange-950 font-mono">Dag 64</span>
            </div>
            <p className="text-[10px] text-orange-800 leading-snug">
              {language === 'bn' ? 'সিলেট (জিন্দাবাজার): ধারা ৯৬ শরিকি অগ্রক্রয় মামলা।' : 'Sylhet: Co-sharer pre-emption objection (SAT Sec 96).'}
            </p>
          </button>

          {/* 8. Clean Complete Title */}
          <button
            type="button"
            onClick={() => applyPresetScenario('DEMO-PARCEL-008')}
            className="text-left p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-0.5">
              <span>{language === 'bn' ? '৮. নিখুঁত ধারাবাহিকতা' : '8. Clean Record'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200/70 text-emerald-950 font-mono">Dag 304</span>
            </div>
            <p className="text-[10px] text-emerald-800 leading-snug">
              {language === 'bn' ? 'মিরপুর: সিএস-এসএ-আরএস ধারাবাহিক, কর পরিশোধিত।' : 'Mirpur: CS-SA-RS uninterrupted chain & tax paid.'}
            </p>
          </button>
        </div>
      </div>

      {/* Main Form: Multi-Identifier Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gov-primary" />
            <h2 className="text-base font-bold text-slate-900">
              {language === 'bn' ? '১. জমির সুনির্দিষ্ট প্রশাসনিক পরিচিতি প্রদান করুন' : '1. Enter Parcel Identifiers'}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {language === 'bn' ? '*চিহ্নিত ক্ষেত্রগুলো আবশ্যক' : '*Required fields'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Division */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'বিভাগ (Division) *' : 'Division *'}
              </label>
              <select
                value={division}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                  errors.division ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              >
                {Object.keys(BANGLADESH_GEO_DATA).map((divKey) => (
                  <option key={divKey} value={divKey}>
                    {language === 'bn' ? BANGLADESH_GEO_DATA[divKey].bengali : divKey}
                  </option>
                ))}
              </select>
              {errors.division && <p className="text-[11px] text-rose-600 mt-1">{errors.division}</p>}
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'জেলা (District) *' : 'District *'}
              </label>
              <select
                value={district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                  errors.district ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              >
                {districtList.map((distKey) => (
                  <option key={distKey} value={distKey}>
                    {language === 'bn' && divisionData?.districts[distKey]?.bengali
                      ? divisionData.districts[distKey].bengali
                      : distKey}
                  </option>
                ))}
              </select>
              {errors.district && <p className="text-[11px] text-rose-600 mt-1">{errors.district}</p>}
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'উপজেলা / রাজস্ব সার্কেল (Upazila) *' : 'Upazila / Circle *'}
              </label>
              <select
                value={upazila}
                onChange={(e) => handleUpazilaChange(e.target.value)}
                className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                  errors.upazila ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              >
                {upazilaList.map((upzKey) => (
                  <option key={upzKey} value={upzKey}>
                    {language === 'bn' && districtData?.upazilas[upzKey]?.bengali
                      ? districtData.upazilas[upzKey].bengali
                      : upzKey}
                  </option>
                ))}
              </select>
              {errors.upazila && <p className="text-[11px] text-rose-600 mt-1">{errors.upazila}</p>}
            </div>

            {/* Mouza */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'মৌজা (Mouza) *' : 'Mouza *'}
              </label>
              {mouzaList.length > 0 ? (
                <select
                  value={mouza}
                  onChange={(e) => handleMouzaChange(e.target.value)}
                  className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                    errors.mouza ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                >
                  {mouzaList.map((m) => (
                    <option key={m.name} value={m.name}>
                      {language === 'bn' ? m.bengali : m.name} (JL {m.jl})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={mouza}
                  onChange={(e) => setMouza(e.target.value)}
                  placeholder="e.g. Tejgaon I/A"
                  className={`w-full text-xs rounded-lg border p-2.5 ${
                    errors.mouza ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
              )}
              {errors.mouza && <p className="text-[11px] text-rose-600 mt-1">{errors.mouza}</p>}
            </div>

            {/* Dag Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'দাগ নম্বর (Plot / Dag No) *' : 'Dag / Plot Number *'}
              </label>
              <input
                type="text"
                value={dagNumber}
                onChange={(e) => setDagNumber(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: 402, 118, 85, 999, 210' : 'e.g. 402, 118, 85, 999, 210'}
                className={`w-full text-xs rounded-lg border p-2.5 ${
                  errors.dagNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              />
              {errors.dagNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.dagNumber}</p>}
              <p className="text-[10px] text-slate-400 mt-1">
                {language === 'bn'
                  ? 'দাগ নম্বর একা অনন্য নয়; এটি মৌজা ও উপজেলার সাথে যুক্ত।'
                  : 'Dag number is unique only in combination with Mouza & Upazila.'}
              </p>
            </div>

            {/* Khatian Number (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'খতিয়ান নম্বর (Khatian No) — ঐচ্ছিক' : 'Khatian Number (Optional)'}
              </label>
              <input
                type="text"
                value={khatianNumber}
                onChange={(e) => setKhatianNumber(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: 1204, 541, 991, 301, 540' : 'e.g. 1204, 541, 991, 301, 540'}
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                {language === 'bn' ? 'সিএস/এসএ/আরএস বা নামজারি পরচা নম্বর' : 'CS/SA/RS or Mutation Khatian record'}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {language === 'bn'
                ? 'অনুরোধ করার সাথে সাথে স্থানীয় কাল্পনিক ডেমো ডেটাসেটে অনুসন্ধান চালানো হবে।'
                : 'Instantly matches against client-side fictional demo records. No external API calls.'}
            </span>

            <button
              type="submit"
              disabled={isSearching}
              className="btn-primary text-xs px-6 py-2.5 font-bold cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>
                {isSearching
                  ? language === 'bn'
                    ? 'যাচাই করা হচ্ছে...'
                    : 'Checking Records...'
                  : language === 'bn'
                  ? 'জমি যাচাই করুন'
                  : 'Check Parcel Signals'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {hasSearched && evaluation && (
        <div id="results" className="space-y-6 animate-fade-up">
          {/* No Match State */}
          {!evaluation.isMatched ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-2xl mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto mb-3">
                <HelpCircle className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'ডেমো ডেটায় কোনো ম্যাচিং রেকর্ড পাওয়া যায়নি' : 'No Matching Record Found in Demo Data'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {language === 'bn' ? evaluation.messageBn : evaluation.message}
              </p>

              {/* Critical Reminder Box */}
              <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <div className="font-semibold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{language === 'bn' ? 'গুরুত্বপূর্ণ আইনি সতর্কতা:' : 'Statutory Due Diligence Notice:'}</span>
                </div>
                <p className="leading-relaxed">
                  {language === 'bn'
                    ? 'ডেমো ডেটায় তথ্য না পাওয়ার অর্থ কখনোই এটি নয় যে জমিটি বিরোধমুক্ত বা নিরাপদ। জমি ক্রয়ের পূর্বে সহকারী কমিশনার (ভূমি) এবং সাব-রেজিস্ট্রি অফিসে সশরীরে যাচাই ও বায়া দলিল তল্লাশ আবশ্যক।'
                    : 'The absence of demo records must NEVER be treated as evidence that the land is unencumbered or fraud-free. Always conduct in-person physical due diligence at the relevant AC (Land) and Sub-Registry Office.'}
                </p>
              </div>

              <div className="mt-6">
                <button onClick={handleReset} className="btn-primary text-xs px-4 py-2 cursor-pointer">
                  {language === 'bn' ? 'অন্য দাগ অনুসন্ধান করুন' : 'Search Another Parcel'}
                </button>
              </div>
            </div>
          ) : (
            /* Matched State with Comprehensive Data Sections */
            <div className="space-y-6">
              {/* 1. Primary Parcel Identification & Land Classification Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-gov-primary border border-teal-200 text-xs font-bold font-mono">
                        {evaluation.parcel?.id}
                      </span>
                      <DemoDataTag type="demo_data" />
                      {evaluation.matchType === 'ambiguous' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          {language === 'bn' ? 'রেকর্ড অসঙ্গতি' : 'Record Conflict'}
                        </span>
                      )}
                      {evaluation.parcel?.landClassification && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span>{evaluation.parcel.landClassification}</span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mt-1">
                      {language === 'bn'
                        ? `মৌজা: ${evaluation.parcel?.mouza}, দাগ নম্বর: ${evaluation.parcel?.dagNumber}`
                        : `Mouza: ${evaluation.parcel?.mouza}, Dag Plot: ${evaluation.parcel?.dagNumber}`}
                    </h2>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-[11px] text-slate-400 block">
                      {language === 'bn' ? 'সিমুলেটেড ডেটা সোর্স:' : 'Simulated Feed:'}
                    </span>
                    <span className="text-xs font-medium text-slate-700">
                      {evaluation.parcel?.mockSource}
                    </span>
                  </div>
                </div>

                {/* Identifier Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {language === 'bn' ? 'বিভাগ' : 'Division'}
                    </span>
                    <span className="font-semibold text-slate-800">{evaluation.parcel?.division}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {language === 'bn' ? 'জেলা' : 'District'}
                    </span>
                    <span className="font-semibold text-slate-800">{evaluation.parcel?.district}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {language === 'bn' ? 'উপজেলা' : 'Upazila'}
                    </span>
                    <span className="font-semibold text-slate-800">{evaluation.parcel?.upazila}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {language === 'bn' ? 'জে.এল. নম্বর' : 'J.L. Number'}
                    </span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {evaluation.parcel?.jlNumber || 'N/A'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {language === 'bn' ? 'খতিয়ান ও ধরন' : 'Khatian & Type'}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {evaluation.parcel?.khatianNumber || 'N/A'} ({evaluation.parcel?.khatianType || 'RS'})
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {language === 'bn' ? 'রেকর্ডকৃত জমির পরিমাণ' : 'Recorded Area'}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {evaluation.parcel?.area} {evaluation.parcel?.areaUnit || 'Decimal'}
                    </span>
                  </div>
                </div>

                {/* Boundaries & Physical Demarcations */}
                {evaluation.parcel?.boundaryNotes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-100">
                    <strong className="text-slate-700">{language === 'bn' ? 'চৌহদ্দি বা সীমানা বিবরণ:' : 'Boundary Notes:'}</strong>{' '}
                    {evaluation.parcel.boundaryNotes}
                  </div>
                )}
              </div>

              {/* 2. Recorded Ownership, Co-Sharers & Tax Revenue Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* A. Recorded Owners in RoR */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Users className="w-4 h-4 text-gov-primary" />
                      <span>{language === 'bn' ? 'খতিয়ানভুক্ত রেকর্ডীয় মালিক ও অংশীদার' : 'Recorded Owners in RoR & Shares'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {evaluation.parcel?.recordedOwners?.length || 0} জন মালিক
                    </span>
                  </div>

                  {evaluation.parcel?.recordedOwners && evaluation.parcel.recordedOwners.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {evaluation.parcel.recordedOwners.map((owner, idx) => (
                        <li key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{owner}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      {language === 'bn' ? 'মালিকানার বিস্তারিত নাম উপলব্ধ রেকর্ডে নেই।' : 'Detailed claimant names not recorded in available demo feed.'}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 leading-tight pt-1">
                    {language === 'bn'
                      ? 'সতর্কতা: শরিকদের সম্মতি ছাড়া একা কোনো অংশীদারের বিক্রয় অগ্রক্রয় (Pre-emption) বা স্বত্ব মামলার ঝুঁকিতে পড়তে পারে।'
                      : 'Notice: Purchasing undivided shares without co-sharer partition exposes buyers to Section 96 SAT Act pre-emption.'}
                  </p>
                </div>

                {/* B. Land Development Tax & Revenue Clearance */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Receipt className="w-4 h-4 text-gov-primary" />
                      <span>{language === 'bn' ? 'ভূমি উন্নয়ন কর (খাজনা) ও দাখিলা স্থিতি' : 'Land Development Tax & Dakhila Status'}</span>
                    </div>
                    {evaluation.parcel?.taxStatus?.status === 'paid' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {language === 'bn' ? 'পরিশোধিত' : 'Paid Up to Date'}
                      </span>
                    ) : evaluation.parcel?.taxStatus?.status === 'arrears' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-900 border border-rose-300">
                        {language === 'bn' ? 'বকেয়া কর' : 'Tax Arrears'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {language === 'bn' ? 'অনিশ্চিত' : 'Status Unknown'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">{language === 'bn' ? 'সর্বশেষ পরিশোধিত বছর:' : 'Last Paid Year:'}</span>
                      <span className="font-semibold text-slate-800">{evaluation.parcel?.taxStatus?.lastPaidYearBS || 'রেকর্ড নেই (N/A)'}</span>
                    </div>

                    {evaluation.parcel?.taxStatus?.dakhilaNumber && (
                      <div className="flex justify-between py-1 border-b border-slate-50 font-mono text-[11px]">
                        <span className="text-slate-500">{language === 'bn' ? 'দাখিলা / রসিদ নং:' : 'Dakhila / Receipt #:'}</span>
                        <span className="font-bold text-slate-800">{evaluation.parcel.taxStatus.dakhilaNumber}</span>
                      </div>
                    )}

                    {evaluation.parcel?.taxStatus?.amountBdt && (
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">{language === 'bn' ? 'ধার্যকৃত করের পরিমাণ:' : 'Assessed Amount:'}</span>
                        <span className="font-bold text-slate-800">৳{evaluation.parcel.taxStatus.amountBdt.toLocaleString('en-BD')}</span>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-600 pt-1 leading-snug">
                      {evaluation.parcel?.taxStatus?.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Institutional Encumbrances, Litigation, Mortgage & Baya Deed Chain */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Landmark className="w-4 h-4 text-gov-primary" />
                    <span>{language === 'bn' ? 'প্রাতিষ্ঠানিক দায়, নিষেধাজ্ঞা ও বায়া দলিলের ধারাবাহিকতা' : 'Encumbrance, Court Orders & Baya Deed Chain Signals'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {language === 'bn' ? 'ব্যাংক, আদালত ও রেজিস্ট্রেশন রেকর্ড সংকেত' : 'Bank, Court, and Deed Registry Signals'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Mortgage Check */}
                  <div className={`p-3 rounded-lg border ${
                    evaluation.parcel?.encumbranceSignals?.hasMortgage
                      ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {language === 'bn' ? 'ব্যাংক মর্টগেজ / দায়' : 'Bank Mortgage / Lien'}
                      </span>
                      {evaluation.parcel?.encumbranceSignals?.hasMortgage ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-200 text-rose-900">মর্টগেজ বিদ্যমান</span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800">দায়মুক্ত</span>
                      )}
                    </div>
                    <p className="text-[11px] leading-snug">
                      {evaluation.parcel?.encumbranceSignals?.hasMortgage
                        ? `${evaluation.parcel.encumbranceSignals.bankOrLender} — ${evaluation.parcel.encumbranceSignals.mortgageNote}`
                        : language === 'bn'
                        ? 'সিমুলেটেড লেজারে কোনো রেজিস্ট্রিকৃত ব্যাংক চার্জ নেই।'
                        : 'No active registered bank mortgage on demo record.'}
                    </p>
                  </div>

                  {/* Court Stay Order Check */}
                  <div className={`p-3 rounded-lg border ${
                    evaluation.parcel?.encumbranceSignals?.hasStayOrder
                      ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {language === 'bn' ? 'আদালতের নিষেধাজ্ঞা' : 'Civil Court Injunction'}
                      </span>
                      {evaluation.parcel?.encumbranceSignals?.hasStayOrder ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-200 text-rose-900">নিষেধাজ্ঞা জারি</span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800">অর্ডার নেই</span>
                      )}
                    </div>
                    <p className="text-[11px] leading-snug">
                      {evaluation.parcel?.encumbranceSignals?.hasStayOrder
                        ? `${evaluation.parcel.encumbranceSignals.courtName} (${evaluation.parcel.encumbranceSignals.caseRef}) — ${evaluation.parcel.encumbranceSignals.litigationNote}`
                        : language === 'bn'
                        ? 'উপলব্ধ রেকর্ডে কোনো আদালতের স্থগিতাদেশ নেই।'
                        : 'No pending civil court injunction reported in demo data.'}
                    </p>
                  </div>

                  {/* Khas / Vested Property */}
                  <div className={`p-3 rounded-lg border ${
                    evaluation.parcel?.encumbranceSignals?.isKhasOrVested
                      ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {language === 'bn' ? 'খাস / অর্পিত সম্পত্তি' : 'Khas / Vested Property'}
                      </span>
                      {evaluation.parcel?.encumbranceSignals?.isKhasOrVested ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-200 text-rose-900">তালিকাভুক্ত</span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800">মুক্ত</span>
                      )}
                    </div>
                    <p className="text-[11px] leading-snug">
                      {evaluation.parcel?.encumbranceSignals?.isKhasOrVested
                        ? evaluation.parcel.encumbranceSignals.vestedNote
                        : language === 'bn'
                        ? 'সরকারি খাস বা অর্পিত সম্পত্তি তালিকায় অন্তর্ভুক্ত নয়।'
                        : 'Not listed in government khas or vested property schedule.'}
                    </p>
                  </div>

                  {/* Baya Deed Chain (25 Years) */}
                  <div className={`p-3 rounded-lg border ${
                    evaluation.parcel?.bayaChain?.chainIntact
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-amber-50/80 border-amber-300 text-amber-950'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {language === 'bn' ? '২৫ বছরের বায়া দলিল' : '25-Year Baya Chain'}
                      </span>
                      {evaluation.parcel?.bayaChain?.chainIntact ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">অবিচ্ছিন্ন</span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-200 text-amber-900">ধারাবাহিকতায় ফাঁক</span>
                      )}
                    </div>
                    <p className="text-[11px] leading-snug">
                      {evaluation.parcel?.bayaChain?.note || (language === 'bn' ? 'বায়া দলিলের রেকর্ড পরীক্ষিত।' : 'Baya deeds verified in record.')}
                    </p>
                  </div>
                </div>

                {evaluation.parcel?.encumbranceSignals?.hasPowerOfAttorney && (
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>{language === 'bn' ? 'আমমোক্তারনামা (Power of Attorney) সতর্কতা:' : 'Power of Attorney Notice:'}</strong>{' '}
                      {evaluation.parcel.encumbranceSignals.poaDetails}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Core Status Checkpoints: Transfer, Mutation Application, Mutation Completion */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Checkpoint 1: Transfer / Registered Deed */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      {language === 'bn' ? '১. সাব-রেজিস্ট্রি দলিল সংকেত' : '1. Transfer Deed Event'}
                    </span>
                    {evaluation.coreStatus?.transferEvent.recorded ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {language === 'bn' ? 'রেকর্ড বিদ্যমান' : 'Logged in Feed'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {language === 'bn' ? 'কোনো দলিল নেই' : 'No Deed Logged'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {language === 'bn'
                      ? evaluation.coreStatus?.transferEvent.labelBn
                      : evaluation.coreStatus?.transferEvent.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {language === 'bn'
                      ? evaluation.coreStatus?.transferEvent.detailsBn
                      : evaluation.coreStatus?.transferEvent.details}
                  </p>
                  {evaluation.coreStatus?.transferEvent.reference && (
                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
                      Ref: {evaluation.coreStatus.transferEvent.reference} (Date: {evaluation.coreStatus.transferEvent.date})
                    </div>
                  )}
                </div>

                {/* Checkpoint 2: Mutation Application */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      {language === 'bn' ? '২. ই-নামজারি আবেদন স্থিতি' : '2. Mutation Application'}
                    </span>
                    {evaluation.coreStatus?.mutationApplication.status === 'submitted' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                        {language === 'bn' ? 'আবেদন দাখিলকৃত' : 'Petition Active'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {language === 'bn' ? 'আবেদন নেই' : 'No Petition'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {language === 'bn'
                      ? evaluation.coreStatus?.mutationApplication.labelBn
                      : evaluation.coreStatus?.mutationApplication.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {language === 'bn'
                      ? evaluation.coreStatus?.mutationApplication.detailsBn
                      : evaluation.coreStatus?.mutationApplication.details}
                  </p>
                  {evaluation.coreStatus?.mutationApplication.reference && (
                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
                      Case: {evaluation.coreStatus.mutationApplication.reference} (Date: {evaluation.coreStatus.mutationApplication.date})
                    </div>
                  )}
                </div>

                {/* Checkpoint 3: Mutation Completion */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      {language === 'bn' ? '৩. নামজারি চূড়ান্ত নিষ্পত্তি' : '3. Mutation Completed'}
                    </span>
                    {evaluation.coreStatus?.mutationCompletion.status === 'completed' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {language === 'bn' ? 'নিষ্পত্তি সম্পন্ন' : 'RoR Mutated'}
                      </span>
                    ) : evaluation.coreStatus?.mutationCompletion.status === 'pending' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {language === 'bn' ? 'অনিষ্পন্ন / শুনানাধীন' : 'Pending Order'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {language === 'bn' ? 'রেকর্ড পাওয়া যায়নি' : 'Not Recorded'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {language === 'bn'
                      ? evaluation.coreStatus?.mutationCompletion.labelBn
                      : evaluation.coreStatus?.mutationCompletion.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {language === 'bn'
                      ? evaluation.coreStatus?.mutationCompletion.detailsBn
                      : evaluation.coreStatus?.mutationCompletion.details}
                  </p>
                  {evaluation.coreStatus?.mutationCompletion.date && (
                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
                      Order Date: {evaluation.coreStatus.mutationCompletion.date} (Khatian: {evaluation.coreStatus.mutationCompletion.newKhatian || 'N/A'})
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Transparent Rule-Based Risk Assessment Card */}
              {evaluation.risk && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        {language === 'bn' ? 'স্বচ্ছ মূল্যায়ন ফলাফল' : 'Rule-Based Risk Assessment'}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${evaluation.risk.badgeColor}`}
                        >
                          {language === 'bn' ? evaluation.risk.labelBn : evaluation.risk.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 max-w-md italic sm:text-right">
                      {language === 'bn' ? evaluation.risk.summaryBn : evaluation.risk.summary}
                    </p>
                  </div>

                  {/* 4-Box Detailed Rule Explanation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* A. What was detected */}
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <FileText className="w-4 h-4 text-gov-primary" />
                        <span>{language === 'bn' ? '১. কী পাওয়া গেছে (What Was Detected):' : '1. What Was Detected:'}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === 'bn' ? evaluation.risk.whatDetectedBn : evaluation.risk.whatDetected}
                      </p>
                    </div>

                    {/* B. Why it may matter */}
                    <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{language === 'bn' ? '২. এটি কেন গুরুত্বপূর্ণ (Why It May Matter):' : '2. Why It May Matter:'}</span>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        {language === 'bn' ? evaluation.risk.whyItMattersBn : evaluation.risk.whyItMatters}
                      </p>
                    </div>

                    {/* C. What information is missing */}
                    <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span>{language === 'bn' ? '৩. কোন তথ্য অনুপস্থিত (What Information Is Missing):' : '3. What Information Is Missing:'}</span>
                      </div>
                      <p className="text-xs text-blue-900 leading-relaxed">
                        {language === 'bn' ? evaluation.risk.missingInfoBn : evaluation.risk.missingInfo}
                      </p>
                    </div>

                    {/* D. What the user should verify next */}
                    <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'bn' ? '৪. আপনার পরবর্তী করণীয় (Next Verification Steps):' : '4. What to Verify Next:'}</span>
                      </div>
                      <ul className="text-xs text-emerald-900 space-y-1 pl-1">
                        {(language === 'bn'
                          ? evaluation.risk.whatToVerifyNextBn
                          : evaluation.risk.whatToVerifyNext
                        ).map((step, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Explicit Mandatory Legal Caveat */}
                  <div className="p-3.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] leading-relaxed border border-slate-200 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>{language === 'bn' ? 'আইনগত সীমাবদ্ধতা:' : 'Statutory Disclaimer:'}</strong>{' '}
                      {language === 'bn'
                        ? 'ভূমিভেরিফাই কোনো আদালত বা ভূমি রেকর্ড রুম নয়। এই প্ল্যাটফর্ম কোনো জমিকে সম্পূর্ণ নিরাপদ, প্রতারণামুক্ত বা নিরঙ্কুশ মালিকানাপ্রাপ্ত বলে প্রত্যয়ন করে না। এটি শুধুমাত্র উপলব্ধ ডেমো সংকেতের বিশ্লেষণ প্রদর্শন করে।'
                        : 'BhumiVerify is not a court of law or government land archive. This platform never certifies that a parcel is completely safe, fraud-free, or legally verified. It solely presents an automated analysis of available signals.'}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Chronological Transaction Activity Timeline */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gov-primary" />
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'bn' ? 'কালানুক্রমিক লেনদেন ও রেকর্ড টাইমলাইন' : 'Transaction Activity Timeline'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {language === 'bn'
                      ? 'সর্বশেষ ইভেন্ট থেকে পূর্ববর্তী ক্রম'
                      : 'Chronological order of recorded events'}
                  </span>
                </div>

                {evaluation.timelineEvents.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                    {language === 'bn'
                      ? 'বর্তমান ডেমো ডেটায় কোনো সংকেত বা ইভেন্ট রেকর্ড পাওয়া যায়নি।'
                      : 'No event found in demo data for this parcel.'}
                  </div>
                ) : (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {evaluation.timelineEvents.map((evt, idx) => (
                      <div key={evt.id || idx} className="relative group">
                        {/* Timeline Marker */}
                        <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center shadow-xs">
                          <div className="w-2 h-2 rounded-full bg-teal-600" />
                        </div>

                        {/* Event Content Card */}
                        <div className="bg-slate-50 hover:bg-slate-100/80 rounded-lg p-3.5 border border-slate-200/80 transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-900">
                              {evt.eventTitle}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{formatDate(evt.eventDate)}</span>
                              <span className="text-slate-300">•</span>
                              <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                                {evt.maskedReference}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed mb-2">
                            {evt.summary}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-200/60">
                            <span>
                              {language === 'bn' ? 'উৎস: ' : 'Source: '}
                              <strong>{evt.sourceLabel}</strong>
                            </span>
                            <span className="text-amber-800 italic bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60">
                              {evt.caveat}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions: New Search */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/about"
                  className="text-xs text-gov-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আইনগত কাঠামো ও ধারা ৮৯ ব্যাখ্যা পড়ুন' : 'Read Section 89 Legal Background'}</span>
                </Link>

                <button
                  onClick={handleReset}
                  className="btn-primary text-xs px-5 py-2 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আরেকটি দাগ অনুসন্ধান করুন' : 'Check Another Parcel'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
