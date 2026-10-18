import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSavedChecks } from '../../context/SavedChecksContext';
import { useNotifications } from '../../context/NotificationsContext';
import { useLanguage } from '../../context/LanguageContext';
import { StorageAdapter } from '../../lib/storageAdapter';
import { Modal } from '../../components/common/Modal';
import {
  Settings,
  Shield,
  Trash2,
  RotateCcw,
  LogOut,
  AlertTriangle,
  HardDrive,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Disclaimer } from '../../components/common/Disclaimer';

export const SettingsPage: React.FC = () => {
  const { logout, resetDemoUser } = useAuth();
  const { resetToSeedChecks } = useSavedChecks();
  const { resetNotifications } = useNotifications();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const navigate = useNavigate();

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleResetAllData = () => {
    StorageAdapter.clearAllDemoData();
    resetDemoUser();
    resetToSeedChecks();
    resetNotifications();
    setResetModalOpen(false);
    setFeedback(
      isBn
        ? 'অ্যাপ্লিকেশন ডেটা সফলভাবে রিসেট করা হয়েছে।'
        : 'Application data has been successfully reset.'
    );
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Settings className="w-3.5 h-3.5 text-gov-primary" />
          <span>{isBn ? 'সিস্টেম ও ডেটা নিয়ন্ত্রণ' : 'System & Data Controls'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {isBn ? 'অ্যাপ্লিকেশন সেটিংস' : 'Application Settings'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'সেশন পরিচালনা করুন এবং অ্যাপ্লিকেশন ডেটা নিয়ন্ত্রণ করুন।'
            : 'Manage account sessions and application storage settings.'}
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Session Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">{isBn ? 'সেশন নিয়ন্ত্রণ' : 'Session Controls'}</h2>
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-800">{isBn ? 'অ্যাকাউন্ট থেকে সাইন আউট' : 'Sign Out of Account'}</h3>
            <p className="text-[11px] text-slate-500">{isBn ? 'এই ব্রাউজার উইন্ডোতে আপনার বর্তমান সেশন সমাপ্ত করুন।' : 'End your current session in this browser window.'}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-secondary text-xs py-2 px-3.5 font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isBn ? 'সাইন আউট' : 'Sign Out'}</span>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-800">
          <Trash2 className="w-4 h-4" />
          <h2 className="text-sm font-bold">{isBn ? 'অ্যাপ্লিকেশন ডেটা ও ক্যাশ ক্লিয়ার' : 'Clear Application Storage'}</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {isBn
            ? 'আপনি যদি সংরক্ষিত জমি যাচাই, চেকলিস্ট ও ব্যক্তিগত অনুসন্ধান নোট মুছে ফেলতে চান, তবে অ্যাপ্লিকেশনকে প্রাথমিক অবস্থায় রিসেট করতে পারেন।'
            : 'Clear locally saved parcel reviews, personal checklist items, and notification logs to reset the workspace.'}
        </p>

        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isBn ? 'অ্যাপ্লিকেশন ডেটা রিসেট করুন' : 'Reset Application Data'}</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title={isBn ? 'অ্যাপ্লিকেশন ডেটা রিসেট নিশ্চিতকরণ' : 'Confirm Reset Data'}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {isBn ? (
              <>এটি আপনার সংরক্ষিত সমস্ত জমি যাচাই ও চেকলিস্টের অগ্রগতি খালি করবে। আপনি কি এগিয়ে যেতে চান?</>
            ) : (
              <>This will clear your locally saved parcel checks and verification checklist progress. Are you sure you wish to continue?</>
            )}
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setResetModalOpen(false)}
              className="btn-secondary text-xs py-2 px-3.5 font-semibold cursor-pointer"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleResetAllData}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
            >
              {isBn ? 'রিসেট নিশ্চিত করুন' : 'Confirm Reset'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
