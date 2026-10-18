import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import { getTaskTitle, getTaskDescription, getTaskNotes } from '../../utils/taskTranslations';
import {
  CheckSquare,
  Plus,
  Clock,
  Calendar,
  Trash2,
  Search,
  Sparkles,
  ExternalLink,
  Check,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { DiligenceSubNav } from '../../components/layout/DiligenceSubNav';

const DEFAULT_RECOMMENDED_TASKS = [
  {
    title: 'Obtain certified copy of Mutation Porcha from AC (Land)',
    titleBn: 'সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি পর্চার সার্টিফাইড কপি সংগ্রহ',
    description: 'Visit the Upazila/Circle Land Revenue office to collect official certified Record of Rights.',
    descriptionBn: 'উপজেলা/সার্কেল ভূমি অফিস থেকে নামজারি অনুমোদনের মোহরাঙ্কিত সার্টিফাইড খতিয়ান ও জমাভাগ যাচাই করুন।',
    reminderDays: 7,
  },
  {
    title: 'Conduct Nil Search at Sub-Registry Office (12–25 Years)',
    titleBn: 'সাব-রেজিস্ট্রি অফিসে ১২-২৫ বছরের বালাম তল্লাশি (Nil Search)',
    description: 'Search Book 1 indexes for at least 12-25 years to uncover unrecorded transfers, mortgages, or duplicate deeds.',
    descriptionBn: '১ নম্বর বালামের ইনডেক্স তল্লাশ করে অপ্রকাশিত কোনো রেজিস্ট্রি দলিল, বাংক বন্ধক বা পাওয়ার অব অ্যাটর্নি রয়েছে কি না তা নিশ্চিত করুন।',
    reminderDays: 14,
  },
  {
    title: 'On-site physical possession and boundary verification',
    titleBn: 'মাঠপর্যায়ে সশরীরে দখল ও সীমানা নির্ধারণ যাচাই',
    description: 'Inspect physical ground boundaries, boundary pillars, and interview adjacent landholders regarding real disputes.',
    descriptionBn: 'জমির চারপাশের সীমানা খুঁটি এবং দাগের প্রকৃত অবস্থান মেপে দেখুন এবং পার্শ্ববর্তী প্রতিবেশীদের সাথে বিরোধের তথ্য যাচাই করুন।',
    reminderDays: 3,
  },
  {
    title: 'Verify LD Tax (Dakhila) payment and Treasury receipt',
    titleBn: 'ভূমি উন্নয়ন কর (দাখিলা) পরিশোধ ও ইউনিয়ন ভূমি অফিসের সিল যাচাই',
    description: 'Confirm current fiscal year land development tax receipt is genuine and recorded in union revenue records.',
    descriptionBn: 'চলতি অর্থবছর পর্যন্ত ভূমি উন্নয়ন কর পরিশোধের দাখিলা অনলাইনে ও ইউনিয়ন ভূমি অফিসে সঠিক রয়েছে কি না তা মিলিয়ে নিন।',
    reminderDays: 5,
  },
];

export const VerificationPlanPage: React.FC = () => {
  const { savedChecks, toggleTaskStatus, addTask, deleteTask } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [searchParams, setSearchParams] = useSearchParams();

  const queryCheckId = searchParams.get('checkId') || searchParams.get('id') || '';

  // Synchronize selectedCheckId safely
  const [selectedCheckId, setSelectedCheckId] = useState<string>(() => {
    if (queryCheckId && (savedChecks || []).some((c) => c?.id === queryCheckId)) {
      return queryCheckId;
    }
    return savedChecks?.[0]?.id || '';
  });

  useEffect(() => {
    if (queryCheckId && (savedChecks || []).some((c) => c?.id === queryCheckId)) {
      setSelectedCheckId(queryCheckId);
    } else if (savedChecks && savedChecks.length > 0 && !savedChecks.some((c) => c?.id === selectedCheckId)) {
      setSelectedCheckId(savedChecks[0].id);
    }
  }, [queryCheckId, savedChecks, selectedCheckId]);

  const queryFilter = searchParams.get('filter') as 'all' | 'pending' | 'completed' | null;
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>(() => {
    if (queryFilter === 'completed' || queryFilter === 'pending') return queryFilter;
    return 'all';
  });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');

  const currentCheck = (savedChecks || []).find((c) => c && c.id === selectedCheckId);

  const handleSelectChange = (id: string) => {
    setSelectedCheckId(id);
    setSearchParams({ checkId: id });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCheck || !newTitle.trim()) return;

    addTask(currentCheck.id, {
      title: newTitle.trim(),
      description: newDesc.trim() || (isBn ? 'স্বাধীন অনুসন্ধানের করণীয়।' : 'Independent diligence follow-up.'),
      status: 'not_started',
      reminderDate: newReminderDate || undefined,
    });

    setNewTitle('');
    setNewDesc('');
    setNewReminderDate('');
    setAddModalOpen(false);
  };

  const handleAddRecommendedTasks = () => {
    if (!currentCheck) return;
    const now = new Date();

    DEFAULT_RECOMMENDED_TASKS.forEach((t) => {
      const dueDate = new Date(now.getTime() + t.reminderDays * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      addTask(currentCheck.id, {
        title: isBn ? t.titleBn : t.title,
        description: isBn ? t.descriptionBn : t.description,
        status: 'not_started',
        reminderDate: dueDate,
      });
    });
  };

  const tasks = (currentCheck?.verificationTasks || []).filter(Boolean);
  const completedCount = tasks.filter((t) => t && t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t && t.status === 'in_progress').length;
  const notStartedCount = tasks.filter((t) => t && t.status === 'not_started').length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (!t) return false;
    if (filterStatus === 'completed') return t.status === 'completed';
    if (filterStatus === 'pending') return t.status !== 'completed';
    return true;
  });

  return (
    <div className="w-full max-w-6xl xl:max-w-7xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Due Diligence Workspace SubNav */}
      <DiligenceSubNav
        activeTab="plan"
        title={isBn ? 'যাচাইকরণ পরিকল্পনা ও অগ্রগতি ট্র্যাকার' : 'Verification Plan & Action Tracker'}
        subtitle={isBn
          ? 'সরকারি দপ্তর, সাব-রেজিস্ট্রি এবং বাস্তব মাঠপর্যায়ের অনুসন্ধানের অগ্রগতি ব্যক্তিগতভাবে ট্র্যাক করুন।'
          : 'Track personal due-diligence milestones across government offices, deed registries, and ground inspections.'}
      />

      {/* Case 1: No saved checks at all */}
      {(!savedChecks || savedChecks.length === 0) ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-5 shadow-xs">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-gov-primary">
            <CheckSquare className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h2 className="text-lg font-bold text-slate-900">
              {isBn ? 'কোনো সংরক্ষিত জমি পাওয়া যায়নি' : 'No Saved Land Checks Found'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'স্বাধীন ডিউ ডিলিজেন্স ট্র্যাকিং এবং চেকলিস্ট পরিচালনা করতে প্রথমে একটি জমি অনুসন্ধান ও সংরক্ষণ করুন।'
                : 'To manage verification checklists and tracking milestones, search and save a land record first.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/check-land"
              className="btn-primary text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2 shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>{isBn ? 'নতুন জমি যাচাই করুন' : 'Start New Land Check'}</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Parcel Selector Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <label htmlFor="plan-parcel-select" className="text-xs font-bold text-slate-700 shrink-0">
                {isBn ? 'সংরক্ষিত জমি নির্বাচন করুন:' : 'Select Parcel Check:'}
              </label>
              <select
                id="plan-parcel-select"
                value={selectedCheckId}
                onChange={(e) => handleSelectChange(e.target.value)}
                className="w-full max-w-md px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:ring-2 focus:ring-gov-primary shadow-2xs"
              >
                {savedChecks.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nickname || c.mouza} ({c.id}) — {c.mouza}, {c.upazila}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                disabled={!currentCheck}
                className="btn-primary text-xs py-2 px-3.5 font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isBn ? 'নতুন কাজ যুক্ত করুন' : 'Add Custom Task'}</span>
              </button>
            </div>
          </div>

          {/* Task List Container */}
          {currentCheck ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
              {/* Parcel Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {currentCheck.nickname || `${currentCheck.mouza} Plot`}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                      {currentCheck.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {currentCheck.mouza}, {currentCheck.upazila}, {currentCheck.district} • {isBn ? 'দাগ:' : 'Dag:'} {isBn ? toBengaliNumerals(currentCheck.dagNumber) : currentCheck.dagNumber} • {isBn ? 'খতিয়ান:' : 'Khatian:'} {isBn ? toBengaliNumerals(currentCheck.khatianNumber) : currentCheck.khatianNumber}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span>
                      {isBn
                        ? `মোট ${toBengaliNumerals(tasks.length)} কাজের মধ্যে ${toBengaliNumerals(completedCount)}টি সম্পন্ন`
                        : `${completedCount} of ${tasks.length} tasks completed`}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gov-primary/10 text-gov-primary">
                      {isBn ? `${toBengaliNumerals(progressPercent)}%` : `${progressPercent}%`}
                    </span>
                  </div>
                  <div className="w-36 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gov-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Filter Tabs & Quick Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80 w-fit">
                  <button
                    type="button"
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      filterStatus === 'all'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isBn ? `সকল কাজ (${toBengaliNumerals(tasks.length)})` : `All (${tasks.length})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('pending')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      filterStatus === 'pending'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isBn ? `বাকি কাজ (${toBengaliNumerals(pendingCount)})` : `Pending (${pendingCount})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      filterStatus === 'completed'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isBn ? `সম্পন্ন (${toBengaliNumerals(completedCount)})` : `Completed (${completedCount})`}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/checks/${currentCheck.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-gov-primary inline-flex items-center gap-1"
                  >
                    <span>{isBn ? 'মূল প্রতিবেদন দেখুন' : 'View Full Report'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Task Cards List */}
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="p-8 sm:p-10 text-center rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-800">
                        {isBn
                          ? 'এই জমির জন্য এখনও কোনো স্বাধীন যাচাইকরণ কাজ যোগ করা হয়নি।'
                          : 'No verification tasks exist for this land check yet.'}
                      </p>
                      <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                        {isBn
                          ? 'সহকারী কমিশনার (ভূমি) অফিস, সাব-রেজিস্ট্রি এবং মাঠপর্যায়ের জন্য প্রস্তাবিত মানসম্মত কাজের তালিকা যোগ করুন।'
                          : 'Add recommended standard milestones across AC Land, Sub-Registry, and ground surveys.'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={handleAddRecommendedTasks}
                        className="btn-primary text-xs py-2 px-3.5 font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isBn ? 'প্রস্তাবিত ৪টি কাজ যোগ করুন' : 'Add 4 Recommended Tasks'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddModalOpen(true)}
                        className="btn-secondary text-xs py-2 px-3.5 font-semibold cursor-pointer"
                      >
                        {isBn ? 'কাস্টম কাজ তৈরি করুন' : 'Custom Task'}
                      </button>
                    </div>
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    {filterStatus === 'completed'
                      ? (isBn ? 'কোনো সম্পন্ন কাজ পাওয়া যায়নি।' : 'No completed tasks found.')
                      : (isBn ? 'সব কাজ সম্পন্ন হয়েছে!' : 'All tasks completed!')}
                  </div>
                ) : (
                  filteredTasks.map((task) => {
                    const isCompleted = task.status === 'completed';
                    const isInProgress = task.status === 'in_progress';
                    const taskTitle = getTaskTitle(task, isBn);
                    const taskDesc = getTaskDescription(task, isBn);
                    const taskNotes = getTaskNotes(task, isBn);

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border flex items-start justify-between gap-3.5 transition-all ${
                          isCompleted
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : isInProgress
                            ? 'bg-amber-50/30 border-amber-200'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Status toggle checkbox button */}
                          <button
                            type="button"
                            onClick={() => toggleTaskStatus(currentCheck.id, task.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border cursor-pointer transition-colors shrink-0 ${
                              isCompleted
                                ? 'bg-gov-primary border-gov-primary text-white'
                                : isInProgress
                                ? 'bg-amber-100 border-amber-300 text-amber-800'
                                : 'border-slate-300 hover:border-gov-primary bg-white text-transparent'
                            }`}
                            aria-label={`Toggle status for task: ${taskTitle}`}
                            title={isBn ? 'অবস্থা পরিবর্তন করতে ক্লিক করুন' : 'Click to cycle task status'}
                          >
                            {isCompleted && <Check className="w-3.5 h-3.5" />}
                            {isInProgress && <Clock className="w-3 h-3" />}
                          </button>

                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-xs font-bold leading-snug ${
                                  isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                                }`}
                              >
                                {taskTitle}
                              </h3>
                              <button
                                type="button"
                                onClick={() => toggleTaskStatus(currentCheck.id, task.id)}
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase cursor-pointer transition-colors ${
                                  isCompleted
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isInProgress
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {isCompleted
                                  ? (isBn ? 'সম্পন্ন' : 'COMPLETED')
                                  : isInProgress
                                  ? (isBn ? 'চলমান' : 'IN PROGRESS')
                                  : (isBn ? 'শুরু হয়নি' : 'NOT STARTED')}
                              </button>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {taskDesc}
                            </p>

                            {taskNotes && (
                              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <span className="font-semibold text-slate-600 not-italic">{isBn ? 'অনুসন্ধান নোট:' : 'Diligence Note:'}</span> {taskNotes}
                              </p>
                            )}

                            {task.reminderDate && (
                              <div className="flex items-center gap-1.5 text-[11px] text-purple-700 font-semibold pt-0.5">
                                <Calendar className="w-3 h-3 text-purple-600 shrink-0" />
                                <span>
                                  {isBn ? 'নির্ধারিত তারিখ:' : 'Target due date:'}{' '}
                                  {isBn ? toBengaliNumerals(task.reminderDate) : task.reminderDate}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Delete Action Button */}
                        <button
                          type="button"
                          onClick={() => deleteTask(currentCheck.id, task.id)}
                          title={isBn ? 'কাজটি মুছুন' : 'Remove task'}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          aria-label="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              {isBn ? 'কোনো সংরক্ষিত জমি নির্বাচিত হয়নি।' : 'No saved land check selected.'}
            </div>
          )}
        </>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title={isBn ? 'স্বাধীন যাচাইকরণ কাজ যুক্ত করুন' : 'Add Independent Verification Task'}
        subtitle={
          currentCheck
            ? `${currentCheck.nickname || currentCheck.mouza} (${currentCheck.id})`
            : undefined
        }
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          {/* Quick preset chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-600 block">
              {isBn ? 'প্রস্তাবিত টেমপ্লেট নির্বাচন করুন:' : 'Or pick from templates:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { title: isBn ? 'সাব-রেজিস্ট্রি বালাম তল্লাশ' : 'Sub-Registry Nil Search', desc: isBn ? '১২-২৫ বছরের ইনডেক্স তল্লাশি সম্পন্ন করুন।' : 'Conduct 12-25 year index search in Book 1.' },
                { title: isBn ? 'নামজারি পর্চা সংগ্রহ' : 'Collect Mutation RoR', desc: isBn ? 'সহকারী কমিশনার (ভূমি) অফিস থেকে সার্টিফাইড কপি আনুন।' : 'Collect certified mutation copy from AC Land office.' },
                { title: isBn ? 'মাঠ পরিদর্শন ও প্রতিবেশী সাক্ষাৎকার' : 'Ground Boundary Inspection', desc: isBn ? 'দখলদারিত্ব এবং সীমানা খুঁটি সরেজমিনে যাচাই।' : 'Verify physical boundary pillars and interview neighbors.' },
                { title: isBn ? 'ব্যাংক এনওসি ও দায়মুক্তি' : 'Bank NOC Clearance', desc: isBn ? 'বন্ধকী ঋণ পরিশোধের প্রত্যয়নপত্র নিশ্চিত করুন।' : 'Verify mortgage liquidation letter from lender.' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setNewTitle(preset.title);
                    setNewDesc(preset.desc);
                  }}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-gov-primary border border-slate-200 transition-colors cursor-pointer"
                >
                  + {preset.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'কাজের শিরোনাম *' : 'Task Title *'}
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={isBn ? 'যেমন: সাব-রেজিস্ট্রির ১ নম্বর বালাম তল্লাশ' : 'e.g. Conduct Sub-Registry Nil Search for Book 1'}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'নির্দেশনা / উদ্দেশ্য' : 'Instructions / Purpose'}
            </label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder={isBn ? 'কী যাচাই করতে হবে এবং কোন সরকারি অফিসে যেতে হবে তার বিবরণ লিখুন...' : 'Describe what to look for and which government office to visit...'}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'অনুস্মারক তারিখ (ঐচ্ছিক)' : 'Optional Reminder Date'}
            </label>
            <input
              type="date"
              value={newReminderDate}
              onChange={(e) => setNewReminderDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="btn-secondary text-xs py-2 px-3.5 font-semibold cursor-pointer"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="btn-primary text-xs py-2 px-4 font-bold cursor-pointer"
            >
              {isBn ? 'কাজ যুক্ত করুন' : 'Add Task'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
