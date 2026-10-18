import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BANGLADESH_GEO_DATA } from '../lib/mock-data/bangladeshGeo';
import { MOCK_PARCELS, FictionalParcelRecord } from '../data/mockParcels';
import { validateParcelForm, ParcelFormFields, ParcelValidationErrors } from '../utils/validateParcel';
import { matchParcelRecord, MatchOutcome } from '../utils/matchParcel';
import { DigitalBankingModal } from '../components/land/DigitalBankingModal';
import { isParcelPaid, markParcelPaid } from '../utils/paymentStorage';
import { useAuth } from '../context/AuthContext';
import { MonthlyQuotaCard } from '../components/land/MonthlyQuotaCard';
import { getMonthlyQuota, recordVerificationApplication, QuotaStatus } from '../utils/quotaService';
import { toBengaliNumerals } from '../utils/formatStatus';
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
  ShieldAlert,
} from 'lucide-react';

const STORAGE_KEY = 'bhumisure_form_state';

export const CheckLandPage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Monthly 5-application limit quota state
  const [quota, setQuota] = useState<QuotaStatus>(() => getMonthlyQuota(currentUser?.id));
  const [quotaAlert, setQuotaAlert] = useState<string | null>(null);

  // Digital Banking Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingParcel, setPendingParcel] = useState<FictionalParcelRecord | null>(null);

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

  const triggerInspection = (targetParcel: FictionalParcelRecord) => {
    // If user already paid for this parcel in the past, allow access without consuming quota
    if (isParcelPaid(targetParcel.id)) {
      navigate(`/results?id=${targetParcel.id}`);
      return;
    }

    // Check latest monthly quota limit
    const currentQuota = getMonthlyQuota(currentUser?.id);
    setQuota(currentQuota);

    if (currentQuota.isExceeded) {
      setQuotaAlert(
        isBn
          ? `মাসিক আবেদন কোটা পূর্ণ (${toBengaliNumerals(currentQuota.limit)}/${toBengaliNumerals(currentQuota.limit)})। আপনি এই মাসে আর নতুন জমির তথ্য যাচাই বা আবেদন করতে পারবেন না। আগামী ${currentQuota.resetDateFormattedBn} তারিখে কোটা রিসেট হবে।`
          : `Monthly verification quota reached (${currentQuota.limit}/${currentQuota.limit}). Anti-fraud & anti-scraping policy restricts accounts to 5 checks per month. Quota will reset on ${currentQuota.resetDateFormatted}.`
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setQuotaAlert(null);
    setPendingParcel(targetParcel);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (txnId: string) => {
    if (!pendingParcel) return;
    markParcelPaid(pendingParcel.id, txnId);

    // Record verification application against the monthly quota
    const recordResult = recordVerificationApplication({
      parcelId: pendingParcel.id,
      mouza: pendingParcel.mouza,
      dagNumber: pendingParcel.dagNumber,
      khatianNumber: pendingParcel.khatianNumber,
      upazila: pendingParcel.upazila,
      district: pendingParcel.district,
      txnId,
      userId: currentUser?.id || 'USER-DEMO-001',
      amount: 1500,
    });

    setQuota(recordResult.quota);
    setPaymentModalOpen(false);
    navigate(`/results?id=${pendingParcel.id}&txn=${txnId}`);
  };

  const handleGenerateCustomReport = () => {
    const rawDist = formFields.district || 'BD';
    const cleanDist = rawDist.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase() || 'BD';
    const cleanDag = formFields.dagNumber ? formFields.dagNumber.replace(/[^a-zA-Z0-9]/g, '') : '01';
    const parcelId = `GEN-${cleanDist}-${cleanDag}`;

    const customParcel: FictionalParcelRecord = {
      id: parcelId,
      division: formFields.division,
      district: formFields.district,
      upazila: formFields.upazila,
      mouza: formFields.mouza,
      jlNumber: formFields.jlNumber || '12',
      khatianNumber: formFields.khatianNumber,
      dagNumber: formFields.dagNumber,
      area: formFields.area || '10.5',
      areaUnit: 'শতাংশ (Decimals)',
      landClassification: 'নাল (Nal) / সমতল কৃষি-ভিটা',
      landClassificationBn: 'নাল (Nal) / সমতল কৃষি-ভিটা',
      updatedDate: new Date().toISOString().split('T')[0],
      statusKey: 'review_recommended',
      statusExplanation: 'Diligence report compiled from declared identifiers. Sub-Registry 12-year Nil Search and AC Land mutation verification recommended before transaction.',
      statusExplanationBn: 'প্রদত্ত তথ্য অনুযায়ী প্রাথমিক সত্যতা ও স্পষ্ট ধারণা প্রতিবেদন প্রস্তুত করা হয়েছে। আর্থিক লেনদেনের পূর্বে সাব-রেজিস্ট্রি ১২-২৫ বছরের নির্দায় তল্লাশি ও এসিল্যান্ড মিউটেশন নিশ্চিতকরণ আবশ্যক।',
      findings: [
        {
          title: 'Title Lineage & Deed Scrutiny Required',
          titleBn: 'বায়া দলিল ও মূল মালিকানা শৃঙ্খল যাচাইকরণ জরুরি',
          whyItMatters: 'To ensure the current seller has valid registered title without gaps in ownership history.',
          whyItMattersBn: 'বর্তমান বিক্রেতা বৈধ দলিলের মাধ্যমে মালিক হয়েছেন কিনা এবং পূর্ববর্তী মালিকদের হস্তান্তরে কোনো ফাঁক রয়েছে কিনা তা নিশ্চিত হওয়া জরুরি।',
          sampleEvidence: `Deed records under Mouza: ${formFields.mouza}, Dag: ${formFields.dagNumber}.`,
          sampleEvidenceBn: `মৌজা: ${formFields.mouza}, দাগ: ${formFields.dagNumber} এর দলিল বিবরণী।`,
          missingInfo: 'Physical inspection of original registered deed (মূল সাব-কবলা দলিল) and Certified Copy (নকল)।',
          missingInfoBn: 'মূল রেজিস্ট্রিকৃত বায়া দলিল এবং সাব-রেজিস্ট্রি সার্টিফাইড কপি স্বচক্ষে পর্যবেক্ষণ।',
          nextStep: 'Conduct Sub-Registry Search and demand certified true copy.',
          nextStepBn: 'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে বিগত ১২-২৫ বছরের তল্লাশি (Nil Search) সম্পন্ন করুন।'
        },
        {
          title: 'E-Mutation & Separation of Khatian',
          titleBn: 'ই-নামজারি ও পৃথক জমা-খারিজ নিশ্চিতকরণ',
          whyItMatters: 'Mutation proves updated possession and payment of land development tax in government revenue records.',
          whyItMattersBn: 'নামজারি থাকলে সরকারি রাজস্ব নথিতে বিক্রেতার স্বতন্ত্র স্বত্ব ও খাজনা পরিশোধের নিশ্চয়তা থাকে।',
          sampleEvidence: `Declared Khatian: ${formFields.khatianNumber}.`,
          sampleEvidenceBn: `আবেদনকৃত খতিয়ান নং: ${formFields.khatianNumber}।`,
          missingInfo: 'Up-to-date DCR, Mutation Khatian Porcha, and Land Development Tax (LD Tax) Receipt (দাখিলা)।',
          missingInfoBn: 'সর্বশেষ ডিসিআর (DCR), খারিজ খতিয়ান পর্চা এবং হাল সন পর্যন্ত ভূমি উন্নয়ন কর (খাজনা দাখিলা)।',
          nextStep: 'Check mut.land.gov.bd or visit Upazila Land Office (AC Land).',
          nextStepBn: 'ভূমি মন্ত্রণালয়ের পোর্টাল (mut.land.gov.bd) অথবা সহকারী কমিশনার (ভূমি) অফিসে খতিয়ানের বৈধতা যাচাই করুন।'
        },
        {
          title: 'Field Possession & Boundary Demarcation',
          titleBn: 'জমির বাস্তব দখল ও সীমানা পরিমাপ',
          whyItMatters: 'Official paper title is incomplete without peaceful physical possession on the ground matching the mouza map.',
          whyItMattersBn: 'দলিলে জমি থাকলেও মাঠে দখল ও সঠিক সীমানা না থাকলে পরবর্তীতে দখল-পুনরুদ্ধারের জটিল মামলা হতে পারে।',
          sampleEvidence: `Target area: ${formFields.area || '10.5'} decimals under Dag ${formFields.dagNumber}.`,
          sampleEvidenceBn: `দাগ নং ${formFields.dagNumber}-এ বর্ণিত জমি ${formFields.area || '১০.৫'} শতাংশ।`,
          missingInfo: 'On-site boundary survey by licensed Amin and neighbor inquiries.',
          missingInfoBn: 'দক্ষ সার্ভেয়ার/আমিন দিয়ে মৌজা নকশা ধরে সীমানা পরিমাপ ও স্থানীয় প্রতিবেশীদের জবানবন্দী।',
          nextStep: 'Conduct physical site visit and verify boundary pillars.',
          nextStepBn: 'জমির চারপাশের সীমানা ও আইল স্বচক্ষে পরিদর্শন করে পাকা সীমানা পিলার স্থাপন নিশ্চিত করুন।'
        }
      ],
      missingInformation: [
        'Original Registered Sale Deed (মূল সাব-কবলা বায়া দলিল)',
        'Certified Khatian Porcha from District Record Room (কালেক্টরেট রেকর্ড রুম পর্চা)',
        'Current fiscal year Land Development Tax (LD Tax / দাখিলা)',
        'Search for Encumbrances Form 12 (১২ বছরের নির্দায় সনদ)'
      ],
      missingInformationBn: [
        'মূল রেজিস্ট্রিকৃত সাব-কবলা বায়া দলিলসমূহ',
        'জেলা প্রশাসকের রেকর্ড রুম হতে সংগৃহীত সার্টিফাইড পর্চা',
        'চলতি অর্থবছরের হালনাগাদ ভূমি উন্নয়ন কর (খাজনা দাখিলা)',
        'সাব-রেজিস্ট্রি অফিস থেকে ১২-২৫ বছরের নির্দায় প্রত্যয়ন (ফর্ম ১২ তল্লাশি)'
      ],
      recommendedNextSteps: [
        'Review all sequential chain deeds dating back 25 years before signing any agreement.',
        'Verify mutation case number and DCR receipt on the national land portal (land.gov.bd).',
        'Engage a licensed surveyor (Amin) to demarcate exact physical boundaries against the Mouza sheet.',
        'Conduct an encumbrance search (Form 12) at the local Sub-Registry Office.'
      ],
      recommendedNextStepsBn: [
        'বায়না চুক্তি করার পূর্বে বিগত ২৫ বছরের ধারাবাহিক বায়া দলিলের শৃঙ্খল মিলিয়ে নিন।',
        'ভূমি সেবা পোর্টালে (land.gov.bd) নামজারি কেস ও ডিসিআর এর সঠিকতা যাচাই করুন।',
        'মৌজা নকশা নিয়ে সরকার-স্বীকৃত সার্ভেয়ার (আমিন) দ্বারা জমিনের বাস্তব মাপ ও সীমানা নির্ধারণ করুন।',
        'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে তল্লাশি দিয়ে জমিটি ব্যাংক বা কারো নিকট দায়বদ্ধ কিনা নিশ্চিত হোন।'
      ],
      events: [
        {
          id: 'EVT-GEN-01',
          type: 'transfer_related',
          title: 'Title Registration / Baya Record',
          titleBn: 'দলিল নিবন্ধন ও বায়া শৃঙ্খল রেকর্ড',
          date: '2023-04-10',
          reference: `Sub-Registry: ${formFields.upazila}, Deed Ref: Record Initiated`,
          explanation: 'Record initiated for verification in the declared mouza and dag number.',
          explanationBn: 'প্রদত্ত মৌজা ও দাগে জমি হস্তান্তরের দলিল ও মালিকানা রেকর্ড অন্তর্ভুক্ত করা হয়েছে।'
        },
        {
          id: 'EVT-GEN-02',
          type: 'mutation_completed',
          title: 'E-Mutation Review',
          titleBn: 'ই-নামজারি ও খতিয়ান যাচাই',
          date: '2024-01-15',
          reference: `Case: ${formFields.khatianNumber}/MUT-REV`,
          explanation: 'Mutation entry cross-checked against Upazila Land Office revenue register.',
          explanationBn: 'উপজেলা ভূমি অফিসের রেজিস্টার অনুযায়ী নামজারি আবেদনের তথ্য পর্যালোচনায় রাখা হয়েছে।'
        }
      ],
      subRegistryData: {
        isConnected: true,
        gatewayName: `${formFields.upazila || 'Sadar'} Sub-Registry Digital Gateway`,
        gatewayNameBn: `${formFields.upazila || 'সদর'} সাব-রেজিস্ট্রার কার্যালয় ডিজিটাল গেটওয়ে`,
        lastSyncedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        ltNotice: {
          hasNotice: true,
          noticeNumber: `LT-${new Date().getFullYear()}-${formFields.upazila ? formFields.upazila.substring(0, 3).toUpperCase() : 'REG'}-${Math.floor(1000 + Math.random() * 9000)}`,
          noticeDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          subRegistryOffice: `${formFields.upazila || formFields.district} Sub-Registry Office`,
          subRegistryOfficeBn: `${formFields.upazila || formFields.district} সাব-রেজিস্ট্রি অফিস`,
          registrationStatus: 'registered_and_mutation_pending',
          statusExplanation: 'Deed registration was completed at the Sub-Registry. A statutory Section 89 LT Notice has been transmitted to AC (Land), indicating mutation proceedings are initiated.',
          statusExplanationBn: 'সাব-রেজিস্ট্রি অফিসে সাফ-কবলা দলিল রেজিস্ট্রি সম্পন্ন হয়েছে। ৮৯ ধারা অনুযায়ী সরাসরি এসি (ল্যান্ড) অফিসে এলটি নোটিশ পাঠানো হয়েছে—যার মাধ্যমে বোঝা যাচ্ছে জমিতে নামজারি (Mutation) প্রক্রিয়া চলমান রয়েছে।',
        },
        nilSearch: {
          searchYears: 15,
          balamBook: `Book 1 & Index 1-2 (${formFields.mouza || 'Mouza'} Archive)`,
          balamBookBn: `১ নম্বর বালাম ও সূচি বহি (${formFields.mouza || 'মৌজা'} আর্কাইভ)`,
          status: 'clear',
          summary: '15-year Nil Search across volume indexes reveals no registered bank mortgages or undisclosed deeds.',
          summaryBn: 'বিগত ১৫ বছরের বালাম ও ইনডেক্স তল্লাশে কোনো ব্যাংক বন্ধক বা গোপন বায়া দলিলের বিরোধ মেলেনি।',
        },
        litigation: {
          hasLitigation: false,
          caseCount: 0,
          verdictLabel: 'No Lawsuit on File (Clean Title)',
          verdictLabelBn: 'মামলা নাই — জমিতে কোনো দেওয়ানি মামলা বা নিষেধাজ্ঞা নেই',
          cases: [],
        },
      },
    };

    sessionStorage.setItem(`bhumiverify_parcel_${customParcel.id}`, JSON.stringify(customParcel));
    triggerInspection(customParcel);
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
        // Digital Banking fee verification flow with quota check
        triggerInspection(outcome.parcel);
      } else {
        // Stay on page and display dedicated state (conflict, ambiguous, no-match)
        setMatchOutcome(outcome);
      }
    }, 250);
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-up w-full max-w-5xl xl:max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'জমি যাচাই করুন' : 'Check Land Parcel'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isBn
            ? 'জমির প্রশাসনিক অবস্থান ও পরিচিতি তথ্য দিয়ে যাচাই ও অনুসন্ধান করুন।'
            : 'Enter parcel identifiers to verify land records and mutation status.'}
        </p>
      </div>

      {/* Monthly Quota Alert Banner if Exceeded */}
      {quotaAlert && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-3 shadow-xs animate-fade-in">
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm text-rose-950">
              {isBn ? 'মাসিক আবেদন কোটা পূর্ণ (৫/৫)' : 'Monthly Application Quota Reached (5/5)'}
            </div>
            <p className="leading-relaxed">{quotaAlert}</p>
          </div>
        </div>
      )}

      {/* Monthly 5-Application Quota and Policy Card */}
      <MonthlyQuotaCard
        quota={quota}
        onQuotaChange={(newQuota) => {
          setQuota(newQuota);
          setQuotaAlert(null);
        }}
      />

      {/* Outcome Banner (No-Match, JL Conflict, or Ambiguous Match) */}
      {matchOutcome && (
        <div
          role="status"
          aria-live="polite"
          className="animate-fade-up"
        >
          {matchOutcome.type === 'no_match' && (
            <div className="bg-slate-50 border border-slate-300 rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto">
                <Sparkles className="w-6 h-6 text-emerald-700" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {isBn
                    ? 'অন-ডিমান্ড জমির প্রাথমিক সত্যতা ও স্পষ্ট ধারণা রিপোর্ট'
                    : 'On-Demand Land Diligence & Clear Concept Report'}
                </h3>
                <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                  {isBn
                    ? `প্রদত্ত মৌজা (${formFields.mouza || 'প্রদত্ত'}), দাগ (${formFields.dagNumber || 'প্রদত্ত'}) ও খতিয়ান (${formFields.khatianNumber || 'প্রদত্ত'})-এর জন্য ভূমি সত্যতা কাঠামো অনুযায়ী তাৎক্ষণিক পূর্ণাঙ্গ ধারণা রিপোর্ট তৈরি করুন।`
                    : `Generate an instant, comprehensive land concept & due diligence report for Mouza: ${formFields.mouza}, Dag: ${formFields.dagNumber}, Khatian: ${formFields.khatianNumber}.`}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerateCustomReport}
                  className="btn-primary text-xs px-5 py-2.5 font-bold cursor-pointer inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>
                    {isBn
                      ? 'এই জমির পূর্ণাঙ্গ সত্যতা ও ধারণা রিপোর্ট তৈরি করুন'
                      : 'Generate Full Diligence & Concept Report'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-secondary text-xs px-4 py-2.5 cursor-pointer"
                >
                  {isBn ? 'পুনরায় চেষ্টা করুন' : 'Clear & Try Again'}
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
                    onClick={() => triggerInspection(matchOutcome.parcel!)}
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
                      onClick={() => triggerInspection(c)}
                      className="text-left p-3 rounded-lg bg-white border border-amber-300 hover:border-amber-500 hover:bg-amber-100/50 transition-all cursor-pointer shadow-2xs group"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 text-xs mb-1">
                        <span>{c.mouza} • {isBn ? 'দাগ' : 'Dag'} {c.dagNumber}</span>
                        <span className="font-mono text-[10px] text-gov-primary group-hover:underline">
                          {c.id} →
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {c.upazila}, {c.district} ({isBn ? 'জে.এল.' : 'JL'} {c.jlNumber || 'N/A'}, {isBn ? 'পরিমাণ' : 'Area'}: {c.area || 'N/A'} {isBn ? 'শতাংশ' : 'Decimal'})
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
          <h2 className="text-base font-bold text-slate-900">
            {isBn ? 'জমির প্রশাসনিক ও খতিয়ান তথ্য' : 'Parcel Identifiers'}
          </h2>

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
                  placeholder={isBn ? 'যেমন: গুলশান, তেজগাঁও শিল্প এলাকা' : 'e.g. Gulshan, Tejgaon I/A'}
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
                  placeholder={isBn ? 'যেমন: ৫৪১, ১২০৪, ৮৮' : 'e.g. 541, 1204, 88'}
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
                  placeholder={isBn ? 'যেমন: ৮৫, ৪০২, ১১৮' : 'e.g. 85, 402, 118'}
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
                  placeholder={isBn ? 'যেমন: ২৪, ১৪, ০৮' : 'e.g. 24, 14, 08'}
                  className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                />
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
              <span>{showAdditional ? (isBn ? 'অতিরিক্ত তথ্য লুকান' : 'Hide Additional Details') : (isBn ? '+ অতিরিক্ত তথ্য যুক্ত করুন' : '+ Add Optional Details')}</span>
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
                    placeholder={isBn ? 'যেমন: ৬.৫০' : 'e.g. 6.50'}
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

            <div className="flex items-center gap-3">
              {quota.isExceeded && (
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                  <span>{isBn ? 'এই মাসের ৫টি আবেদন সীমা পূর্ণ' : 'Monthly 5-limit reached'}</span>
                </span>
              )}
              <button
                type="submit"
                disabled={isSearching}
                className={`text-sm px-8 py-3 font-extrabold cursor-pointer flex items-center gap-2 transition-all rounded-xl shadow-sm hover:shadow-md ${
                  quota.isExceeded
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'btn-primary'
                } disabled:opacity-50`}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Searching Records...'}</span>
                  </>
                ) : quota.isExceeded ? (
                  <>
                    <AlertOctagon className="w-4 h-4 text-white" aria-hidden="true" />
                    <span>{isBn ? 'মাসিক কোটা পূর্ণ (৫/৫)' : 'Monthly Quota Full (5/5)'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" aria-hidden="true" />
                    <span>{isBn ? 'জমি যাচাই করুন' : 'Check Land'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 1500 Tk Digital Banking Approval Modal */}
      {pendingParcel && (
        <DigitalBankingModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          parcelSummary={{
            id: pendingParcel.id,
            mouza: pendingParcel.mouza,
            khatianNumber: pendingParcel.khatianNumber,
            dagNumber: pendingParcel.dagNumber,
            upazila: pendingParcel.upazila,
            district: pendingParcel.district,
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
