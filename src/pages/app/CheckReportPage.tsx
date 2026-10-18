import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { MOCK_PARCELS } from '../../data/mockParcels';
import { Disclaimer } from '../../components/common/Disclaimer';
import { Modal } from '../../components/common/Modal';
import { useLanguage } from '../../context/LanguageContext';
import { formatStatusLabel, toBengaliNumerals } from '../../utils/formatStatus';
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

          {/* Status Alert Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${getStatusBadge(check.statusLabel)}`}>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-extrabold block">
                {isBn ? 'যাচাই ফলাফল' : 'Verification Status'}
              </span>
              <h2 className="text-base font-bold">{formatStatusLabel(check.statusLabel, isBn)}</h2>
              <p className="text-xs opacity-90 leading-relaxed max-w-2xl">
                {isBn && underlyingParcel?.statusExplanationBn ? underlyingParcel.statusExplanationBn : check.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Parcel Identifiers Submitted */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? 'প্রবেশকৃত জমির পরিচিতি' : 'Submitted Parcel Identifiers'}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'বিভাগ' : 'Division'}</span>
              <span className="font-bold text-slate-800">{check.division}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'জেলা' : 'District'}</span>
              <span className="font-bold text-slate-800">{check.district}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'উপজেলা / থানা' : 'Upazila / Thana'}</span>
              <span className="font-bold text-slate-800">{check.upazila}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'মৌজা' : 'Mouza'}</span>
              <span className="font-bold text-slate-800">{check.mouza}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'খতিয়ান নম্বর' : 'Khatian Number'}</span>
              <span className="font-bold text-slate-800 font-mono">{isBn ? toBengaliNumerals(check.khatianNumber) : check.khatianNumber}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'দাগ নম্বর' : 'Dag (Plot) Number'}</span>
              <span className="font-bold text-slate-800 font-mono">{isBn ? toBengaliNumerals(check.dagNumber) : check.dagNumber}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'জে.এল. নম্বর' : 'JL Number'}</span>
              <span className="text-slate-800 font-mono">
                {check.jlNumber ? (isBn ? toBengaliNumerals(check.jlNumber) : check.jlNumber) : (isBn ? 'প্রদান করা হয়নি' : 'Not provided')}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{isBn ? 'জমির পরিমাণ' : 'Recorded Land Area'}</span>
              <span className="text-slate-800">
                {check.area ? (isBn ? `${toBengaliNumerals(check.area)} শতাংশ` : check.area) : (isBn ? 'রেকর্ড করা নেই' : 'Not recorded')}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Simulated Event Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-gov-primary" />
              <span>{isBn ? 'রেকর্ডকৃত ঘটনা প্রবাহ' : 'Recorded Event Timeline'}</span>
            </h2>
            <span className="text-[11px] text-slate-400">
              {isBn
                ? `${toBengaliNumerals(underlyingParcel?.events?.length || 0)}টি ঘটনা অন্তর্ভুক্ত`
                : `${underlyingParcel?.events?.length || 0} event(s) recorded`}
            </span>
          </div>

          {!underlyingParcel || underlyingParcel.events.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center">
              {isBn
                ? 'এই খতিয়ান বা দাগে কোনো সাম্প্রতিক লেনদেন রেকর্ড পাওয়া যায়নি।'
                : 'No recent transaction events recorded for this parcel.'}
            </div>
          ) : (
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
              {underlyingParcel.events.map((evt, idx) => (
                <div key={evt.id || idx} className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-gov-primary" />
                  <div className="flex-1 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getEventBadge(evt.type)}`}>
                        {evt.type === 'transfer_related'
                          ? (isBn ? 'রেজিস্ট্রি দলিল / হস্তান্তর ঘটনা' : 'Registered Deed / Transfer Event')
                          : evt.type === 'mutation_application'
                          ? (isBn ? 'নামজারি আবেদন দাখিল' : 'Mutation Application Submitted')
                          : (isBn ? 'নামজারি চূড়ান্ত নিষ্পত্তি আদেশ' : 'Mutation Completed Order')}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {evt.date ? (isBn ? toBengaliNumerals(evt.date) : evt.date) : (isBn ? 'তারিখ অনুপস্থিত' : 'Date not recorded')}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm">
                      {isBn && evt.titleBn ? evt.titleBn : evt.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {isBn && evt.explanationBn ? evt.explanationBn : evt.explanation}
                    </p>
                    {evt.reference && (
                      <div className="text-[10px] text-slate-400 font-mono pt-1">
                        {isBn ? 'রেফারেন্স:' : 'Reference:'} {evt.reference}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Specific Findings & What this does NOT establish */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Findings */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
            <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-gov-primary" />
              <span>{isBn ? 'অনুসন্ধান পর্যবেক্ষণ' : 'Due Diligence Findings'}</span>
            </h2>
            {underlyingParcel?.findings?.map((f, i) => (
              <div key={i} className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900">
                  {isBn && f.titleBn ? f.titleBn : f.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {isBn && f.whyItMattersBn ? f.whyItMattersBn : f.whyItMatters}
                </p>
                <p className="text-[11px] text-gov-primary font-medium pt-1">
                  {isBn ? 'করণীয়:' : 'Action:'} {isBn && f.nextStepBn ? f.nextStepBn : f.nextStep}
                </p>
              </div>
            )) || (
              <p className="text-slate-500">
                {isBn ? 'রেকর্ডে কোনো বড় ধরনের অসঙ্গতি পরিলক্ষিত হয়নি।' : 'No acute conflicts detected in available records.'}
              </p>
            )}
          </div>

          {/* What This Does NOT Establish */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3 text-xs text-rose-950">
            <h2 className="font-bold text-rose-900 uppercase tracking-wider text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{isBn ? 'এই রিপোর্ট যা প্রমাণ করে না' : 'What This Report Does NOT Establish'}</span>
            </h2>
            <ul className="space-y-2 leading-relaxed text-rose-900">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{isBn ? 'বিক্রেতার প্রকৃত স্বত্ব বা নির্ভেজাল মালিকানা প্রমাণ করে না।' : 'Does NOT establish that the seller holds genuine ownership or marketable title.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{isBn ? 'কোনো অপ্রকাশিত বন্ধক, আদালতের নিষেধাজ্ঞা বা পারিবারিক মোকদ্দমা রয়েছে কি না তা নিশ্চিত করে না।' : 'Does NOT confirm whether unrecorded mortgages, court injunctions, or family suits exist.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{isBn ? 'জমির মাঠপর্যায়ের বাস্তব সীমানা বা প্রত্যক্ষ শারীরিক দখল নিশ্চিত করে না।' : 'Does NOT confirm ground physical boundaries or actual possession.'}</span>
              </li>
            </ul>
          </div>
        </div>

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
                        {task.title}
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
                      {task.description}
                    </p>
                    {task.notes && (
                      <p className="text-[11px] text-slate-500 italic pt-0.5">
                        {isBn ? 'নোট:' : 'Note:'} {task.notes}
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
