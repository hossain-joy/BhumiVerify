import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  FileText,
  Search,
  Filter,
  ArrowUpDown,
  Trash2,
  Copy,
  Edit2,
  ArrowRight,
  GitCompare,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { formatStatusLabel, toBengaliNumerals } from '../../utils/formatStatus';
import { DiligenceSubNav } from '../../components/layout/DiligenceSubNav';

export const SavedChecksListPage: React.FC = () => {
  const {
    savedChecks,
    deleteCheck,
    duplicateCheck,
    updateCheck,
    compareIds,
    toggleCompareId,
  } = useSavedChecks();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const navigate = useNavigate();

  // Search, filter, and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated_desc' | 'updated_asc' | 'nickname_asc'>('updated_desc');

  // Modal states for delete, rename
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState<string | null>(null);

  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [targetRenameId, setTargetRenameId] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState('');

  // Extract unique divisions
  const uniqueDivisions = useMemo(() => {
    const set = new Set<string>();
    savedChecks.forEach((c) => {
      if (c.division) set.add(c.division);
    });
    return Array.from(set);
  }, [savedChecks]);

  // Filtered & sorted checks
  const filteredChecks = useMemo(() => {
    return savedChecks
      .filter((check) => {
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matches =
            check.nickname.toLowerCase().includes(q) ||
            check.mouza.toLowerCase().includes(q) ||
            check.upazila.toLowerCase().includes(q) ||
            check.khatianNumber.includes(q) ||
            check.dagNumber.includes(q) ||
            check.id.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Status Filter
        if (statusFilter !== 'all') {
          if (statusFilter === 'no_major_issue' && check.statusLabel !== 'No Major Issue Detected in Available Data')
            return false;
          if (statusFilter === 'review_recommended' && check.statusLabel !== 'Review Recommended')
            return false;
          if (statusFilter === 'information_incomplete' && check.statusLabel !== 'Information Incomplete')
            return false;
        }

        // Division Filter
        if (divisionFilter !== 'all' && check.division !== divisionFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'updated_desc') {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        if (sortBy === 'updated_asc') {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        if (sortBy === 'nickname_asc') {
          return a.nickname.localeCompare(b.nickname);
        }
        return 0;
      });
  }, [savedChecks, searchTerm, statusFilter, divisionFilter, sortBy]);

  const confirmDelete = (id: string) => {
    setTargetDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleExecuteDelete = () => {
    if (targetDeleteId) {
      deleteCheck(targetDeleteId);
      setDeleteModalOpen(false);
      setTargetDeleteId(null);
    }
  };

  const startRename = (id: string, currentNickname: string) => {
    setTargetRenameId(id);
    setNewNickname(currentNickname);
    setRenameModalOpen(true);
  };

  const handleExecuteRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetRenameId && newNickname.trim()) {
      updateCheck(targetRenameId, { nickname: newNickname.trim() });
      setRenameModalOpen(false);
      setTargetRenameId(null);
    }
  };

  const handleDuplicate = (id: string) => {
    const duplicated = duplicateCheck(id);
    if (duplicated) {
      // Duplicated cleanly
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'No Major Issue Detected in Available Data':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      case 'Review Recommended':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'Information Incomplete':
      default:
        return 'bg-blue-50 text-blue-900 border-blue-300';
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Due Diligence Workspace SubNav */}
      <DiligenceSubNav
        activeTab="checks"
        title={isBn ? 'সংরক্ষিত জমি ও ডিউ ডিলিজেন্স ট্র্যাকিং' : 'Saved Land Checks & Records'}
        subtitle={isBn
          ? 'আপনার ব্যক্তিগত জমি যাচাইসমূহ পরিচালনা করুন, নোট সম্পাদনা করুন এবং রিপোর্ট তুলনা করুন।'
          : 'Manage your personal parcel reviews, edit notes, track tasks, and compare reports.'}
        rightAction={
          compareIds.length > 0 ? (
            <Link
              to="/compare"
              className="btn-secondary text-xs py-2 px-3.5 font-bold flex items-center gap-1.5 text-gov-primary"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>{isBn ? `তুলনা (${toBengaliNumerals(compareIds.length)}/২)` : `Compare (${compareIds.length}/2)`}</span>
            </Link>
          ) : undefined
        }
      />



      {/* Search & Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBn ? 'নাম, মৌজা, উপজেলা, খতিয়ান বা দাগ নম্বর দিয়ে খুঁজুন...' : 'Search by nickname, mouza, upazila, khatian or dag...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary text-slate-700 bg-white"
            >
              <option value="all">{isBn ? 'সকল ফলাফল স্থিতি' : 'All Result Statuses'}</option>
              <option value="no_major_issue">{isBn ? 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি' : 'No Major Issue Detected'}</option>
              <option value="review_recommended">{isBn ? 'পর্যালোচনা জরুরি' : 'Review Recommended'}</option>
              <option value="information_incomplete">{isBn ? 'তথ্য অসম্পূর্ণ' : 'Information Incomplete'}</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary text-slate-700 bg-white"
            >
              <option value="updated_desc">{isBn ? 'সম্প্রতি হালনাগাদকৃত (নতুন)' : 'Recently Updated (Newest)'}</option>
              <option value="updated_asc">{isBn ? 'পূর্বে হালনাগাদকৃত (পুরাতন)' : 'Oldest Updated'}</option>
              <option value="nickname_asc">{isBn ? 'নাম অনুযায়ী (A-Z)' : 'Alphabetical (A-Z)'}</option>
            </select>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">{isBn ? 'বিভাগ:' : 'Division:'}</span>
          <button
            type="button"
            onClick={() => setDivisionFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              divisionFilter === 'all'
                ? 'bg-gov-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isBn ? 'সকল বিভাগ' : 'All Divisions'}
          </button>
          {uniqueDivisions.map((div) => (
            <button
              key={div}
              type="button"
              onClick={() => setDivisionFilter(div)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                divisionFilter === div
                  ? 'bg-gov-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {div}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Checks List */}
      {filteredChecks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">{isBn ? 'কোনো সংরক্ষিত যাচাই মেলেনি' : 'No matching saved checks'}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isBn
              ? 'আপনার অনুসন্ধান শব্দ পরিবর্তন করুন অথবা সকল সংরক্ষিত রেকর্ড দেখতে ফিল্টার ক্লিয়ার করুন।'
              : 'Try adjusting your search query or reset the filters to show all saved land checks.'}
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDivisionFilter('all');
              }}
              className="btn-secondary text-xs py-1.5 px-3 font-semibold"
            >
              {isBn ? 'সকল ফিল্টার মুছুন' : 'Clear All Filters'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredChecks.map((check) => {
            const isCompared = compareIds.includes(check.id);
            const tasks = check?.verificationTasks || [];
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(
              (t) => t && t.status === 'completed'
            ).length;

            return (
              <div
                key={check.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          check.statusLabel
                        )}`}
                      >
                        {formatStatusLabel(check.statusLabel, isBn)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {check.id}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        • {isBn ? 'হালনাগাদ:' : 'Updated'} {new Date(check.updatedAt).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {check.nickname}
                      </h3>
                      <button
                        type="button"
                        onClick={() => startRename(check.id, check.nickname)}
                        title={isBn ? 'নাম পরিবর্তন' : 'Rename check'}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                        aria-label="Rename check"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                      <span>{check.mouza}, {check.upazila}, {check.district}</span>
                      <span>•</span>
                      <span className="font-mono">{isBn ? 'খতিয়ান:' : 'Khatian:'} {isBn ? toBengaliNumerals(check.khatianNumber) : check.khatianNumber}</span>
                      <span>•</span>
                      <span className="font-mono">{isBn ? 'দাগ:' : 'Dag:'} {isBn ? toBengaliNumerals(check.dagNumber) : check.dagNumber}</span>
                      {check.jlNumber && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{isBn ? 'জে.এল.:' : 'JL:'} {isBn ? toBengaliNumerals(check.jlNumber) : check.jlNumber}</span>
                        </>
                      )}
                      {check.area && (
                        <>
                          <span>•</span>
                          <span>{isBn ? 'পরিমাণ:' : 'Area:'} {isBn ? toBengaliNumerals(check.area) : check.area} {isBn ? 'শতাংশ' : ''}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleCompareId(check.id)}
                      className={`text-xs py-1.5 px-2.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-gov-primary text-white border-gov-primary'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>{isCompared ? (isBn ? 'তুলনায় যুক্ত' : 'Comparing') : (isBn ? 'তুলনা করুন' : 'Compare')}</span>
                    </button>

                    <Link
                      to={`/checks/${check.id}`}
                      className="btn-primary text-xs py-1.5 px-3.5 font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>{isBn ? 'রিপোর্ট খুলুন' : 'Open Report'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(check.id)}
                      title={isBn ? 'অনুলিপি তৈরি করুন' : 'Duplicate check'}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      aria-label="Duplicate check"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => confirmDelete(check.id)}
                      title={isBn ? 'মুছে ফেলুন' : 'Delete check'}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      aria-label="Delete check"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-bar: Tasks summary & User Notes snippet */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">{isBn ? 'যাচাইকরণ কাজ:' : 'Verification Tasks:'}</span>
                    <span>
                      {isBn
                        ? `${toBengaliNumerals(completedTasks)} / ${toBengaliNumerals(totalTasks)} সম্পন্ন (${toBengaliNumerals(totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0)}%)`
                        : `${completedTasks} of ${totalTasks} done (${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%)`}
                    </span>
                  </div>

                  {check.userNotes && (
                    <div className="italic text-slate-600 truncate max-w-md">
                      {isBn ? 'নোট:' : 'Note:'} "{check.userNotes}"
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={isBn ? 'সংরক্ষিত জমি যাচাই মুছে ফেলা' : 'Delete Saved Land Check'}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {isBn
              ? 'আপনি কি নিশ্চিত যে এই সংরক্ষিত জমি যাচাইটি মুছে ফেলতে চান? সংশ্লিষ্ট সমস্ত ব্যক্তিগত নোট এবং অনুসন্ধান চেকলিস্টের অগ্রগতি ব্রাউজার মেমরি থেকে স্থায়ীভাবে মুছে যাবে।'
              : 'Are you sure you want to delete this saved land check? All associated notes and verification checklist progress for this parcel will be permanently removed from your browser.'}
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
              onClick={handleExecuteDelete}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
            >
              {isBn ? 'মুছে ফেলা নিশ্চিত করুন' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Rename Modal */}
      <Modal
        isOpen={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        title={isBn ? 'যাচাইয়ের নাম পরিবর্তন' : 'Rename Land Check'}
      >
        <form onSubmit={handleExecuteRename} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isBn ? 'যাচাইয়ের পরিচিতি নাম' : 'Check Nickname'}
            </label>
            <input
              type="text"
              required
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-gov-primary"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setRenameModalOpen(false)}
              className="btn-secondary text-xs py-2 px-3.5 font-semibold cursor-pointer"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="btn-primary text-xs py-2 px-4 font-bold cursor-pointer"
            >
              {isBn ? 'সংরক্ষণ করুন' : 'Save Nickname'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
