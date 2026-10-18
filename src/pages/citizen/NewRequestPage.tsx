import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { useUI } from '../../context/UIContext';
import { useToast } from '../../context/ToastContext';
import { DATA_CATEGORIES, ParcelInputDetails } from '../../types';
import { BANGLADESH_GEO_DATA } from '../../lib/mock-data/bangladeshGeo';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { LAND_CIVIC_GLOSSARY } from '../../lib/utils';
import {
  FilePlus,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowRight,
  Info,
  MapPin,
  Compass,
  Calculator,
} from 'lucide-react';

export const NewRequestPage: React.FC = () => {
  const { currentUser, createRequest, settings } = useApp();
  const { t, language } = useLanguage();
  const { openCadastralMap, openCalculator } = useUI();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isVerified = currentUser.identityStatus === 'verified_demo';

  // Cascading Geography States
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState('Dhaka');
  const [selectedUpazila, setSelectedUpazila] = useState('Tejgaon');
  const [selectedMouza, setSelectedMouza] = useState('Tejgaon I/A');

  const [jlNumber, setJlNumber] = useState('14');
  const [khatianNumber, setKhatianNumber] = useState('1204');
  const [khatianType, setKhatianType] = useState('RS');
  const [dagNumber, setDagNumber] = useState('402');
  const [area, setArea] = useState('5.25');
  const [areaUnit, setAreaUnit] = useState('Decimal (শতাংশ)');
  const [boundaryNorth, setBoundaryNorth] = useState('20ft Municipal Road');
  const [boundarySouth, setBoundarySouth] = useState('Dag 403 (Private Property)');
  const [boundaryEast, setBoundaryEast] = useState('Dag 401 (Drain & Walkway)');
  const [boundaryWest, setBoundaryWest] = useState('Vacant Plot 405');

  const [purpose, setPurpose] = useState('Prospective purchase due diligence');
  const [explanation, setExplanation] = useState(
    'Negotiating bayna agreement with purported landowner to purchase 5.25 decimals; requesting transaction signals before deed execution.'
  );
  const [requestedCategories, setRequestedCategories] = useState<string[]>([
    'mutation_application_status',
    'registered_deed_event',
    'lt_notice_event',
    'mutation_completion_status',
    'data_freshness_metadata',
  ]);
  const [privacyAck, setPrivacyAck] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadedScenario, setLoadedScenario] = useState<number | null>(1);


  // Derived geographical lists
  const divisionData = BANGLADESH_GEO_DATA[selectedDivision] || BANGLADESH_GEO_DATA['Dhaka'];
  const districtList = Object.keys(divisionData.districts);
  const currentDistrictData = divisionData.districts[selectedDistrict] || divisionData.districts[districtList[0]];
  const upazilaList = currentDistrictData ? Object.keys(currentDistrictData.upazilas) : [];
  const currentUpazilaData = currentDistrictData?.upazilas[selectedUpazila];
  const mouzaList = currentUpazilaData ? currentUpazilaData.mouzas : [];

  // Update cascade when division changes
  const handleDivisionChange = (div: string) => {
    setSelectedDivision(div);
    const newDivData = BANGLADESH_GEO_DATA[div];
    if (newDivData) {
      const dists = Object.keys(newDivData.districts);
      const firstDist = dists[0];
      setSelectedDistrict(firstDist);
      const upazs = Object.keys(newDivData.districts[firstDist].upazilas);
      const firstUpaz = upazs[0];
      setSelectedUpazila(firstUpaz);
      const mouzas = newDivData.districts[firstDist].upazilas[firstUpaz].mouzas;
      if (mouzas.length > 0) {
        setSelectedMouza(mouzas[0].name);
        setJlNumber(mouzas[0].jl);
        setDagNumber(mouzas[0].defaultDag);
        setKhatianNumber(mouzas[0].defaultKhatian);
      }
    }
  };

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    const distData = divisionData.districts[dist];
    if (distData) {
      const upazs = Object.keys(distData.upazilas);
      const firstUpaz = upazs[0];
      setSelectedUpazila(firstUpaz);
      const mouzas = distData.upazilas[firstUpaz].mouzas;
      if (mouzas.length > 0) {
        setSelectedMouza(mouzas[0].name);
        setJlNumber(mouzas[0].jl);
        setDagNumber(mouzas[0].defaultDag);
        setKhatianNumber(mouzas[0].defaultKhatian);
      }
    }
  };

  const handleUpazilaChange = (upaz: string) => {
    setSelectedUpazila(upaz);
    if (currentDistrictData && currentDistrictData.upazilas[upaz]) {
      const mouzas = currentDistrictData.upazilas[upaz].mouzas;
      if (mouzas.length > 0) {
        setSelectedMouza(mouzas[0].name);
        setJlNumber(mouzas[0].jl);
        setDagNumber(mouzas[0].defaultDag);
        setKhatianNumber(mouzas[0].defaultKhatian);
      }
    }
  };

  const handleMouzaChange = (mouzaName: string) => {
    setSelectedMouza(mouzaName);
    const found = mouzaList.find((m) => m.name === mouzaName);
    if (found) {
      setJlNumber(found.jl);
      setDagNumber(found.defaultDag);
      setKhatianNumber(found.defaultKhatian);
    }
  };

  // Quick fill helper for mentors
  const handlePreFill = (scenarioNum: number) => {
    setLoadedScenario(scenarioNum);
    setSelectedDivision('Dhaka');
    setSelectedDistrict('Dhaka');

    if (scenarioNum === 1) {
      setSelectedUpazila('Tejgaon');
      setSelectedMouza('Tejgaon I/A');
      setJlNumber('14');
      setKhatianNumber('1204');
      setKhatianType('RS');
      setDagNumber('402');
      setArea('5.25');
      setBoundaryNorth('20ft Municipal Road');
      setBoundarySouth('Dag 403 (Private Property)');
      setBoundaryEast('Dag 401 (Drain)');
      setBoundaryWest('Vacant Plot 405');
      setExplanation('Prospective buyer due diligence: Checking recent Sub-Registry deed transfer and mutation status.');
    } else if (scenarioNum === 2) {
      setSelectedUpazila('Dhanmondi');
      setSelectedMouza('Dhanmondi R/A');
      setJlNumber('08');
      setKhatianNumber('541');
      setKhatianType('City Survey (সিটি জরিপ)');
      setDagNumber('118');
      setArea('4.50');
      setBoundaryNorth('Road 7/A');
      setBoundarySouth('Plot 119');
      setBoundaryEast('Plot 117');
      setBoundaryWest('Access Lane');
      setExplanation('Prospective lease pre-screening: verifying ongoing e-mutation application hearing signals.');
    } else if (scenarioNum === 3) {
      setSelectedUpazila('Gulshan');
      setSelectedMouza('Gulshan');
      setJlNumber('05');
      setKhatianNumber('991');
      setKhatianType('City Survey (সিটি জরিপ)');
      setDagNumber('85');
      setArea('7.00');
      setBoundaryNorth('Gulshan Avenue');
      setBoundarySouth('Road 45');
      setBoundaryEast('Plot 84');
      setBoundaryWest('Plot 86');
      setExplanation('Standard purchase due diligence: verifying completed mutation khatian and Dakhila status.');
    } else if (scenarioNum === 4) {
      setSelectedUpazila('Savar');
      setSelectedMouza('Aminbazar');
      setJlNumber('22');
      setKhatianNumber('301');
      setKhatianType('RS / SA Contested');
      setDagNumber('999');
      setArea('10.00');
      setBoundaryNorth('Highway approach');
      setBoundarySouth('River embankment');
      setBoundaryEast('Survey boundary dispute');
      setBoundaryWest('Commercial godown');
      setExplanation('Boundary check: resolving ambiguous parcel identifiers between SA and RS sheets.');
    }
  };

  const toggleCategory = (catId: string) => {
    if (requestedCategories.includes(catId)) {
      setRequestedCategories(requestedCategories.filter((c) => c !== catId));
    } else {
      setRequestedCategories([...requestedCategories, catId]);
    }
  };

  const combinedBoundaryNotes = `North: ${boundaryNorth}; South: ${boundarySouth}; East: ${boundaryEast}; West: ${boundaryWest}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isVerified) {
      setError('Identity verification is mandatory before submitting a parcel information request.');
      return;
    }

    if (!dagNumber.trim()) {
      setError('Dag (Plot) Number is required.');
      return;
    }

    if (!selectedMouza.trim()) {
      setError('Mouza is required.');
      return;
    }

    if (requestedCategories.length === 0) {
      setError('Select at least one signal category.');
      return;
    }

    if (!privacyAck) {
      setError('You must acknowledge the statutory due diligence notice.');
      return;
    }

    setSubmitting(true);

    const parcelDetails: ParcelInputDetails = {
      division: selectedDivision,
      district: selectedDistrict,
      upazila: selectedUpazila,
      mouza: selectedMouza,
      jlNumber,
      khatianNumber,
      khatianType,
      dagNumber,
      area,
      areaUnit,
      boundaryNotes: combinedBoundaryNotes,
    };

    setTimeout(() => {
      const res = createRequest({
        parcelDetails,
        purpose,
        explanation,
        requestedCategories,
      });

      setSubmitting(false);

      if (res.success && res.request) {
        showToast({
          type: 'success',
          title: language === 'bn' ? 'আবেদন সফলভাবে দাখিল হয়েছে!' : 'Inquiry Submitted Successfully!',
          message: language === 'bn' ? `ট্র্যাকিং নম্বর: ${res.request.id}` : `Tracking ID: ${res.request.id}`,
        });
        navigate(`/citizen/requests/${res.request.id}`);
      } else {
        showToast({
          type: 'error',
          title: language === 'bn' ? 'আবেদন দাখিল ব্যর্থ' : 'Submission Failed',
          message: res.error || (language === 'bn' ? 'দয়া করে সকল তথ্য পূরণ করুন' : 'Please check required fields'),
        });
        setError(res.error || 'Failed to submit request');
      }
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {t.newRequest.title}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-600">
            {t.newRequest.subtitle}
          </p>
        </div>

        {/* Quick Fill Dropdown / Buttons for Mentors */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {t.newRequest.quickSeeds}
          </span>
          <button
            type="button"
            onClick={() => handlePreFill(1)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
              loadedScenario === 1
                ? 'bg-gov-primary text-white border-gov-primary shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Recent transfer deed, mutation pending"
          >
            {language === 'bn' ? 'দৃশ্যপট ১ (তেজগাঁও ৪০২)' : 'Scenario 1 (Tejgaon 402)'}
          </button>
          <button
            type="button"
            onClick={() => handlePreFill(2)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
              loadedScenario === 2
                ? 'bg-gov-primary text-white border-gov-primary shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Mutation application recorded"
          >
            {language === 'bn' ? 'দৃশ্যপট ২ (ধানমন্ডি ১১৮)' : 'Scenario 2 (Dhanmondi 118)'}
          </button>
          <button
            type="button"
            onClick={() => handlePreFill(3)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
              loadedScenario === 3
                ? 'bg-gov-primary text-white border-gov-primary shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Completed mutation"
          >
            {language === 'bn' ? 'দৃশ্যপট ৩ (গুলশান ৮৫)' : 'Scenario 3 (Gulshan 85)'}
          </button>
          <button
            type="button"
            onClick={() => handlePreFill(4)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
              loadedScenario === 4
                ? 'bg-gov-primary text-white border-gov-primary shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Ambiguous / conflicting match"
          >
            {language === 'bn' ? 'দৃশ্যপট ৪ (সাভার ৯৯৯)' : 'Scenario 4 (Savar 999)'}
          </button>
        </div>
      </div>

      {/* Auto-filled Scenario Banner */}
      {loadedScenario && (
        <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gov-primary shrink-0" />
            <span>
              {language === 'bn' ? (
                <>
                  <strong>টেস্ট ডেটা লোড হয়েছে:</strong> দৃশ্যপট {loadedScenario} — মৌজা{' '}
                  <strong>{selectedMouza}</strong>, দাগ <strong>{dagNumber}</strong>, খতিয়ান{' '}
                  <strong>{khatianNumber}</strong> ({khatianType})। আপনি চাইলে এডিট করতে পারেন বা সরাসরি জমা দিতে পারেন।
                </>
              ) : (
                <>
                  <strong>Pre-filled for Evaluation:</strong> Scenario {loadedScenario} — Mouza{' '}
                  <strong>{selectedMouza}</strong>, Dag <strong>{dagNumber}</strong>, Khatian{' '}
                  <strong>{khatianNumber}</strong> ({khatianType}). You may customize or submit directly.
                </>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLoadedScenario(null)}
            className="text-teal-700 hover:text-teal-900 text-xs underline shrink-0 ml-2 font-medium"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Identity Verification Warning Gate (Mandatory Business Rule) */}
      {!isVerified && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">
                {language === 'bn'
                  ? 'প্রবেশাধিকার সংরক্ষিত: নাগরিক পরিচয় যাচাই আবশ্যক'
                  : 'Restricted Access Gate: Identity Verification Required'}
              </p>
              <p className="mt-0.5 leading-relaxed text-rose-900">
                {language === 'bn'
                  ? 'ব্যক্তিগত গোপনীয়তা রক্ষা এবং অননুমোদিত অনুসন্ধান রোধে অযাচাইকৃত পরিচয়ে আবেদন করা নিষিদ্ধ। অনুগ্রহ করে এক ক্লিকে ডেমো যাচাই সম্পন্ন করুন।'
                  : 'In compliance with statutory privacy safeguards, unverified citizens cannot submit requests for parcel transaction records. Please complete the one-click simulated identity verification.'}
              </p>
            </div>
          </div>
          <Link
            to="/citizen/verify-identity"
            className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-md shrink-0 text-center transition-colors shadow-xs"
          >
            {language === 'bn' ? 'ডেমো পরিচয় যাচাই করুন' : 'Complete Demo Verification'}
          </Link>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Cadastral Hierarchy with Cascading Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
          <div className="pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {language === 'bn' ? '১. প্রশাসনিক ও ভৌগোলিক এখতিয়ার' : '1. Cadastral Jurisdiction & Administrative Hierarchy'}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn' ? 'বাংলাদেশ ডিজিটাল ভূমি রেকর্ড কাঠামো' : 'Digital Land Administration Structure'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openCadastralMap(dagNumber)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-gov-primary border border-teal-200 rounded-lg text-xs font-bold transition-all shadow-2xs hover:scale-[1.02]"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{language === 'bn' ? 'মৌজা নকশা থেকে দাগ নির্বাচন' : 'Pick from Cadastral Map'}</span>
              </button>

              <button
                type="button"
                onClick={openCalculator}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-all shadow-2xs hover:scale-[1.02]"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'bn' ? 'ফি হিসাব' : 'Fee Estimator'}</span>
              </button>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Division (বিভাগ) <span className="text-rose-600">*</span>
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 bg-white"
              >
                {Object.keys(BANGLADESH_GEO_DATA).map((div) => (
                  <option key={div} value={div}>
                    {div} ({BANGLADESH_GEO_DATA[div].bengali})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                District (জেলা) <span className="text-rose-600">*</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 bg-white"
              >
                {districtList.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist} ({divisionData.districts[dist]?.bengali || dist})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Upazila / Thana (উপজেলা / সার্কেল) <span className="text-rose-600">*</span>
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => handleUpazilaChange(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 bg-white"
              >
                {upazilaList.map((upaz) => (
                  <option key={upaz} value={upaz}>
                    {upaz} ({currentDistrictData?.upazilas[upaz]?.bengali || upaz})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Mouza (মৌজা) <span className="text-rose-600">*</span>
                </label>
                <span className="text-[10px] text-slate-400" title={LAND_CIVIC_GLOSSARY.mouza.explanation}>
                  Survey village
                </span>
              </div>
              <select
                value={selectedMouza}
                onChange={(e) => handleMouzaChange(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 bg-white font-medium"
              >
                {mouzaList.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} ({m.bengali})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  J.L. Number (জে.এল. নং)
                </label>
                <span className="text-[10px] text-slate-400" title={LAND_CIVIC_GLOSSARY.jlNumber.explanation}>
                  Jurisdiction List
                </span>
              </div>
              <input
                type="text"
                value={jlNumber}
                onChange={(e) => setJlNumber(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Khatian Survey Record Type (জরিপের ধরন)
              </label>
              <select
                value={khatianType}
                onChange={(e) => setKhatianType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 bg-white"
              >
                <option value="City Survey (সিটি জরিপ)">City Survey (ঢাকা সিটি জরিপ)</option>
                <option value="RS">RS (রিভিশনাল সার্ভে)</option>
                <option value="SA">SA (স্টেট একুইজিশন ১৯৫৬)</option>
                <option value="CS">CS (ক্যাডেলস্ট্রাল সার্ভে)</option>
                <option value="Mutation Khatian">Mutation Khatian (খারিজ খতিয়ান)</option>
                <option value="RS / SA Contested">RS / SA Contested (দ্বৈত রেকর্ড)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Khatian Number (খতিয়ান নং)
              </label>
              <input
                type="text"
                value={khatianNumber}
                onChange={(e) => setKhatianNumber(e.target.value)}
                placeholder="e.g. 1204"
                className="w-full p-2 border border-slate-300 rounded text-slate-800 font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Dag / Plot Number (দাগ নম্বর) <span className="text-rose-600">*</span>
                </label>
                <span className="text-[10px] text-rose-600 font-semibold">Mandatory</span>
              </div>
              <input
                type="text"
                required
                value={dagNumber}
                onChange={(e) => setDagNumber(e.target.value)}
                placeholder="e.g. 402"
                className="w-full p-2 border border-slate-300 rounded text-slate-800 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Approx. Area & Unit (জমির পরিমাণ)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 5.25"
                  className="w-1/2 p-2 border border-slate-300 rounded text-slate-800 font-semibold"
                />
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-1/2 p-2 border border-slate-300 rounded text-slate-800 bg-white"
                >
                  <option value="Decimal (শতাংশ)">Decimal (শতাংশ)</option>
                  <option value="Katha (কাঠা)">Katha (কাঠা)</option>
                  <option value="Bigha (বিঘা)">Bigha (বিঘা)</option>
                  <option value="Acre (একর)">Acre (একর)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Warning that Dag alone does not guarantee a unique match */}
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Cadastral Warning: </strong>
              Dag (Plot) number alone does not guarantee a unique match in Bangladesh records. Identical plot numbers exist in different mouzas and survey editions. Supplying Mouza name and Khatian reference is essential to eliminate ambiguous correlation.
            </p>
          </div>
        </div>

        {/* Section 2: Visual Cadastral Boundary Demarcation (চৌহদ্দি) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-gov-primary" />
              2. Boundary Demarcation (চৌহদ্দি) & Cadastral Verification
            </h3>
            <span className="text-[11px] text-slate-500">Adjoining plot coordinates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                North Boundary (উত্তরে)
              </label>
              <input
                type="text"
                value={boundaryNorth}
                onChange={(e) => setBoundaryNorth(e.target.value)}
                placeholder="e.g. 20ft road"
                className="w-full p-2 border border-slate-300 rounded text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                South Boundary (দক্ষিণে)
              </label>
              <input
                type="text"
                value={boundarySouth}
                onChange={(e) => setBoundarySouth(e.target.value)}
                placeholder="e.g. Dag 403"
                className="w-full p-2 border border-slate-300 rounded text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                East Boundary (পূর্বে)
              </label>
              <input
                type="text"
                value={boundaryEast}
                onChange={(e) => setBoundaryEast(e.target.value)}
                placeholder="e.g. Dag 401"
                className="w-full p-2 border border-slate-300 rounded text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                West Boundary (পশ্চিমে)
              </label>
              <input
                type="text"
                value={boundaryWest}
                onChange={(e) => setBoundaryWest(e.target.value)}
                placeholder="e.g. Drain / Plot 405"
                className="w-full p-2 border border-slate-300 rounded text-slate-800"
              />
            </div>
          </div>

          {/* Visual Plot Preview Card */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Simulated Cadastral Boundary Representation
            </span>
            <div className="max-w-xs mx-auto border-2 border-dashed border-gov-primary bg-white p-4 rounded-md shadow-2xs text-xs space-y-2">
              <div className="text-[10px] text-slate-400 font-semibold border-b border-slate-100 pb-1">
                ↑ NORTH: {boundaryNorth || 'Unspecified'}
              </div>
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-[10px] text-slate-400 font-semibold">← WEST: {boundaryWest}</span>
                <div className="bg-teal-50 border border-teal-300 p-2 rounded text-center">
                  <div className="font-extrabold text-gov-primary text-sm">DAG {dagNumber || '---'}</div>
                  <div className="text-[10px] text-slate-500">{area || '0'} {areaUnit.split(' ')[0]}</div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">EAST: {boundaryEast} →</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-1">
                ↓ SOUTH: {boundarySouth || 'Unspecified'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Purpose & Legitimate Interest */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Legitimate Interest & Transaction Context
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Primary Inquiry Purpose <span className="text-rose-600">*</span>
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 bg-white"
              >
                <option value="Prospective purchase due diligence">
                  Prospective purchase due diligence (জমি ক্রয়ের পূর্ব সতর্কতা)
                </option>
                <option value="Boundary clarification">
                  Boundary clarification & survey cross-check (সীমানা ও দাগ যাচাই)
                </option>
                <option value="Family settlement check">
                  Family settlement / Partition verification (আপস বণ্টন যাচাই)
                </option>
                <option value="Collateral review">
                  Bank / Institutional collateral check (বন্ধকি যাচাই)
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Detailed Explanation & Justification <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-slate-800 text-xs focus:ring-1 focus:ring-gov-primary"
                placeholder="Explain the background of your purchase transaction or legitimate interest..."
              />
            </div>
          </div>
        </div>

        {/* Section 4: Requested Categories */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              4. Requested Signal Categories
            </h3>
            <span className="text-xs text-slate-500">
              {requestedCategories.length} categories selected
            </span>
          </div>

          <div className="space-y-2.5">
            {DATA_CATEGORIES.map((cat) => {
              const isChecked = requestedCategories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-teal-50/50 border-teal-300 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.id)}
                    className="mt-1 rounded text-gov-primary focus:ring-gov-primary"
                  />
                  <div className="text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{cat.label}</span>
                      <span className="text-[11px] text-gov-primary font-medium">{cat.bengali}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Statutory Acknowledgement & Due Diligence Term */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-3 text-xs">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={privacyAck}
              onChange={(e) => setPrivacyAck(e.target.checked)}
              className="mt-0.5 rounded text-gov-primary focus:ring-gov-primary"
            />
            <span className="text-slate-700 leading-relaxed">
              {language === 'bn' ? (
                <>
                  আমি স্বীকার করছি যে <strong>ল্যান্ডটেক বিডি একটি নমুনা ডেমো প্ল্যাটফর্ম</strong> যা সিমুলেটেড ফিড ব্যবহার করে। আমি অবগত যে রেজিস্ট্রিকৃত দলিল হওয়া মানেই নামজারি সম্পন্ন হওয়া নয়, নামজারি আবেদন কোনো মঞ্জুরির প্রমাণ নয় এবং <strong>সিস্টেমে কোনো তথ্য না পাওয়ার অর্থ এই নয় যে জমিটি সম্পূর্ণ নির্ভেজাল</strong>।
                </>
              ) : (
                <>
                  I acknowledge that <strong>LandTech BD is a demonstration prototype</strong> using simulated feeds. I understand that a registered deed event is not the same as completed mutation, a mutation application is not proof of approval, and <strong>no matching event found is not proof that the land is safe</strong>.
                </>
              )}
            </span>
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 text-xs rounded flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            {language === 'bn' ? 'রিভিউ এসএলএ লক্ষ্যমাত্রা:' : 'Target review SLA:'}{' '}
            <strong>{settings.targetReviewHours} {language === 'bn' ? 'ঘণ্টা' : 'hours'}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/citizen"
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded text-center"
            >
              {t.newRequest.cancel}
            </Link>
            <button
              type="submit"
              disabled={!isVerified || submitting}
              className="w-full sm:w-auto px-6 py-2.5 bg-gov-primary hover:bg-gov-primaryHover disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              {submitting ? t.newRequest.submitting : t.newRequest.submitButton}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
