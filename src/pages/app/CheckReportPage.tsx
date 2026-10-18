import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { MOCK_PARCELS, FictionalParcelRecord } from '../../data/mockParcels';
import { Modal } from '../../components/common/Modal';
import { ClearLandConceptCard } from '../../components/land/ClearLandConceptCard';
import { SubRegistryLiveCard } from '../../components/land/SubRegistryLiveCard';
import { OrganizedLandReport, ParcelTimelineEvent } from '../../components/land/OrganizedLandReport';
import { assessParcel } from '../../utils/assessParcel';
import { sortTimelineEvents } from '../../utils/sortEvents';
import { useLanguage } from '../../context/LanguageContext';
import { formatStatusLabel, toBengaliNumerals } from '../../utils/formatStatus';
import { getTaskTitle, getTaskDescription, getTaskNotes } from '../../utils/taskTranslations';
import {
  FileText,
  Printer,
  Trash2,
  Edit3,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Share2,
  Layers,
  MapPin,
  Save,
  CheckSquare,
  ShieldAlert,
  Info,
  GitCompare,
} from 'lucide-react';

export const CheckReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const {
    savedChecks,
    updateCheck,
    deleteCheck,
    toggleTaskStatus,
    updateNotes,
    toggleCompareId,
    compareIds,
  } = useSavedChecks();

  const check = savedChecks.find((c) => c.id === id);

  // Link to underlying mock parcel if available
  const underlyingParcel = MOCK_PARCELS.find(
    (p) =>
      p.id === check?.parcelId ||
      (check &&
        p.division.toLowerCase() === check.division.toLowerCase() &&
        p.khatianNumber === check.khatianNumber &&
        p.dagNumber === check.dagNumber)
  );

  const [notes, setNotes] = useState(check?.userNotes || '');
  const [notesSaved, setNotesSaved] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Synthesize concept parcel record if not directly in mock records
  const parcelForConcept: FictionalParcelRecord | null = check
    ? underlyingParcel || {
        id: check.parcelId || check.id,
        division: check.division,
        district: check.district,
        upazila: check.upazila,
        mouza: check.mouza,
        jlNumber: check.jlNumber || null,
        khatianNumber: check.khatianNumber,
        dagNumber: check.dagNumber,
        area: check.area?.replace(/[^0-9.]/g, '') || '10.0',
        areaUnit: 'Decimal',
        landClassification: 'Residential / Bastu',
        landClassificationBn: 'আবাসিক / বাস্তুভিটা',
        updatedDate: check.updatedAt,
        statusKey:
          check.statusLabel.includes('No Major') || check.statusLabel.includes('বড় অসঙ্গতি')
            ? 'no_major_issue'
            : check.statusLabel.includes('Review') || check.statusLabel.includes('পর্যালোচনা')
            ? 'review_recommended'
            : 'information_incomplete',
        statusExplanation: check.summary,
        statusExplanationBn: check.summary,
        findings: [],
        missingInformation: [],
        recommendedNextSteps: [],
        events: [
          {
            id: 'EVT-GEN-1',
            type: 'transfer_related',
            title: 'Registered Transfer Deed',
            titleBn: 'রেজিস্ট্রিকৃত হস্তান্তর বায়া দলিল',
            date: '2024-02-10',
            reference: 'DEED-REG-2024',
            explanation: 'Transfer deed registered in local Sub-Registry office.',
            explanationBn: 'স্থানীয় সাব-রেজিস্ট্রি অফিসে হস্তান্তরিত বায়া দলিল সম্পন্ন।',
          },
          ...(check.statusLabel.includes('No Major') || check.statusLabel.includes('বড় অসঙ্গতি')
            ? [
                {
                  id: 'EVT-GEN-2',
                  type: 'mutation_completed' as const,
                  title: 'Approved e-Mutation Decree',
                  titleBn: 'অনুমোদিত ই-নামজারি ও জমাভাগ খতিয়ান',
                  date: '2024-05-18',
                  reference: 'MUT-ORD-OK',
                  explanation: 'Approved e-mutation order issued with separate 1-number khatian.',
                  explanationBn: 'সহকারী কমিশনার (ভূমি) কর্তৃক পৃথক ১ নম্বর খতিয়ান ও নামজারি চূড়ান্ত অনুমোদন।',
                },
              ]
            : []),
        ],
        subRegistryData: {
          isConnected: true,
          gatewayName: `${check.upazila || 'Sadar'} Sub-Registry Digital Gateway`,
          gatewayNameBn: `${check.upazila || 'সদর'} সাব-রেজিস্ট্রার কার্যালয় ডিজিটাল গেটওয়ে`,
          lastSyncedAt: new Date(check.createdAt).toISOString().replace('T', ' ').substring(0, 16),
          ltNotice: {
            hasNotice: true,
            noticeNumber: `LT-${new Date().getFullYear()}-${check.upazila ? check.upazila.substring(0, 3).toUpperCase() : 'REG'}-4401`,
            noticeDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            subRegistryOffice: `${check.upazila || check.district} Sub-Registry Office`,
            subRegistryOfficeBn: `${check.upazila || check.district} সাব-রেজিস্ট্রি অফিস`,
            registrationStatus: check.statusLabel.includes('No Major') || check.statusLabel.includes('বড় অসঙ্গতি')
              ? 'registered_and_mutation_completed'
              : 'registered_and_mutation_pending',
            statusExplanation: 'Deed registration recorded. Statutory Section 89 LT Notice transmitted from Sub-Registry to AC (Land).',
            statusExplanationBn: 'দলিল রেজিস্ট্রি সম্পন্ন হয়েছে এবং ৮৯ ধারা অনুযায়ী সাব-রেজিস্ট্রি অফিস থেকে এসি (ল্যান্ড) অফিসে এলটি নোটিশ পাঠানো হয়েছে।',
          },
          nilSearch: {
            searchYears: 15,
            balamBook: `Book 1 & Index 1-2 (${check.mouza || 'Mouza'} Archive)`,
            balamBookBn: `১ নম্বর বালাম ও সূচি বহি (${check.mouza || 'মৌজা'} আর্কাইভ)`,
            status: check.statusLabel.includes('No Major') || check.statusLabel.includes('বড় অসঙ্গতি') ? 'clear' : 'incomplete',
            summary: '15-year Nil Search across volume indexes reveals no registered bank mortgages or conflicts.',
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
      }
    : null;

  const assessment = parcelForConcept ? assessParcel(parcelForConcept) : null;
  const sortedEvents: ParcelTimelineEvent[] = parcelForConcept ? sortTimelineEvents(parcelForConcept.events || []) : [];

  if (!check) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4 animate-fade-up">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">{isBn ? 'যাচাই রিপোর্ট পাওয়া যায়নি' : 'Check Report Not Found'}</h1>
        <p className="text-xs text-slate-600">
          {isBn
            ? `অনুরোধকৃত রিপোর্ট আইডি "${id}" পাওয়া যায়নি।`
            : `The requested report identifier "${id}" does not exist.`}
        </p>
        <Link to="/checks" className="btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'সংরক্ষিত তালিকায় ফিরে যান' : 'Return to Saved Checks'}</span>
        </Link>
      </div>
    );
  }

  const handleSaveNotes = () => {
    updateNotes(check.id, notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    deleteCheck(check.id);
    navigate('/checks');
  };

  const getStatusBadge = (status: string) => {
    if (
      status === 'No Major Issue Detected in Available Data' ||
      status === 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি' ||
      status === 'বড় অসঙ্গতি পাওয়া যায়নি'
    ) {
      return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    }
    if (status === 'Review Recommended' || status === 'পর্যালোচনা জরুরি') {
      return 'bg-amber-50 text-amber-900 border-amber-300';
    }
    return 'bg-blue-50 text-blue-900 border-blue-300';
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'registered_deed':
      case 'transfer_related':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'mutation_application':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'mutation_completed':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-900 border-slate-200';
    }
  };

  const isCompared = compareIds.includes(check.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Top Breadcrumb & Print/Action Bar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          to="/checks"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'সংরক্ষিত তালিকায় ফিরে যান' : 'Back to Saved Checks'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleCompareId(check.id)}
            className={`text-xs py-1.5 px-3 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCompared
                ? 'bg-gov-primary text-white border-gov-primary'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompared ? (isBn ? 'তুলনায় যুক্ত' : 'Comparing') : (isBn ? 'তুলনা করুন' : 'Compare')}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-secondary text-xs py-1.5 px-3 font-semibold flex items-center gap-1.5 text-slate-700 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isBn ? 'রিপোর্ট প্রিন্ট করুন' : 'Print Report'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title={isBn ? 'রিপোর্ট মুছুন' : 'Delete report'}
            aria-label="Delete report"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Report Header */}
        <div className="border-b border-slate-200 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                <img src="/logo.png" alt="গণপ্রজাতন্ত্রী বাংলাদেশ সরকার - ভূমি মন্ত্রণালয়" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 leading-tight">
                  {isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • ভূমি মন্ত্রণালয়' : "Government of the People's Republic of Bangladesh • Ministry of Land"}
                </h2>
                <p className="text-[11px] text-gov-primary font-semibold">
                  {isBn ? 'ভূমিভেরিফাই — জমি সত্যতা ও প্রাক-নিবন্ধন যাচাই প্রতিবেদন' : 'BhumiVerify — Land Pre-Registration Diligence Report'}
                </p>
              </div>
            </div>
            <div className="sm:text-right text-xs text-slate-500">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded inline-block sm:block">
                {isBn ? 'রিপোর্ট ID: ' : 'REPORT: '}{check.id}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {isBn ? 'তৈরির তারিখ: ' : 'Generated: '}{new Date(check.createdAt).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {check.nickname}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn ? 'অবস্থান:' : 'Location:'} {check.mouza}, {check.upazila}, {check.district}, {check.division}
            </p>
          </div>

        </div>

        {/* Master Unified Organized Land Diligence Report */}
        {parcelForConcept && assessment && (
          <OrganizedLandReport
            parcel={parcelForConcept}
            isBn={isBn}
            assessment={assessment}
            sortedEvents={sortedEvents}
          />
        )}

        {/* Section: Interactive Verification Plan Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-gov-primary" />
              <span>{isBn ? 'এই জমির জন্য স্বাধীন যাচাইকরণ চেকলিস্ট' : 'Independent Verification Tasks for this Parcel'}</span>
            </h2>
            <span className="text-xs text-slate-400">
              {isBn ? 'স্ট্যাটাস পরিবর্তন করতে চেকবক্সে ক্লিক করুন' : 'Click task checkbox to update status'}
            </span>
          </div>

          <div className="space-y-2">
            {(check.verificationTasks || []).map((task) => {
              const isDone = task.status === 'completed';
              const isInProgress = task.status === 'in_progress';
              const taskTitle = getTaskTitle(task, isBn);
              const taskDesc = getTaskDescription(task, isBn);
              const taskNotes = getTaskNotes(task, isBn);

              return (
                <div
                  key={task.id}
                  onClick={() => toggleTaskStatus(check.id, task.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : isInProgress
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}} // Handled by parent click
                      className="w-4 h-4 rounded border-slate-300 text-gov-primary focus:ring-gov-primary cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-xs font-bold ${
                          isDone ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {taskTitle}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isDone
                          ? (isBn ? 'সম্পন্ন' : 'Completed')
                          : isInProgress
                          ? (isBn ? 'চলমান' : 'In Progress')
                          : (isBn ? 'শুরু হয়নি' : 'Not Started')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {taskDesc}
                    </p>
                    {taskNotes && (
                      <p className="text-[11px] text-slate-500 italic pt-0.5">
                        {isBn ? 'নোট:' : 'Note:'} {taskNotes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: User Notes */}
        <div className="space-y-3 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-gov-primary" />
              <span>{isBn ? 'ব্যক্তিগত নোট ও অনুসন্ধান স্মারক' : 'Personal Notes & Buyer Reminders'}</span>
            </h2>
            {notesSaved && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isBn ? 'নোট সংরক্ষিত হয়েছে' : 'Notes Saved'}</span>
              </span>
            )}
          </div>
          <div className="space-y-2">
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isBn ? 'আপনার আইনজীবী, আমিন জরিপ পরিমাপ, দালাল বা বিক্রেতার বক্তব্য, কিংবা এসি (ল্যান্ড) অফিস পরিদর্শনের নোট লিখে রাখুন...' : 'Record notes from your lawyer, Ameen survey measurements, broker statements, or AC (Land) office visits...'}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="btn-primary text-xs py-1.5 px-4 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isBn ? 'নোট সংরক্ষণ করুন' : 'Save Notes'}</span>
              </button>
            </div>
          </div>
        </div>


      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={isBn ? 'সংরক্ষিত জমি যাচাই মুছে ফেলা' : 'Delete Saved Land Check'}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {isBn
              ? 'আপনি কি নিশ্চিত যে এই রিপোর্টটি মুছে ফেলতে চান? এটি ব্রাউজার সেশন থেকে চিরতরে মুছে যাবে।'
              : 'Are you sure you want to delete this saved land check? This action cannot be undone in your browser session.'}
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="btn-secondary text-xs py-2 px-3.5 font-semibold cursor-pointer"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
            >
              {isBn ? 'রিপোর্ট মুছুন' : 'Delete Report'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
