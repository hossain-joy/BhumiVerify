import React, { useState } from 'react';
import { AccessRequest, DATA_CATEGORIES } from '../../types';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  ShieldCheck,
  Clock,
  Layers,
} from 'lucide-react';

interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: AccessRequest;
  onDecisionComplete?: () => void;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  isOpen,
  onClose,
  request,
  onDecisionComplete,
}) => {
  const { reviewRequest, settings } = useApp();
  const { t, language } = useLanguage();

  const [decision, setDecision] = useState<
    'approved' | 'limited_approved' | 'more_info_required' | 'rejected'
  >('approved');

  const [note, setNote] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    request.requestedCategories || []
  );
  const [accessDuration, setAccessDuration] = useState<number>(settings.accessDurationHours);
  const [conditions, setConditions] = useState(
    'Controlled access strictly for pre-registration diligence. No redistribution permitted.'
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!note.trim() || note.trim().length < 5) {
      setError('An official justification note is mandatory (minimum 5 characters).');
      return;
    }

    if (
      (decision === 'approved' || decision === 'limited_approved') &&
      selectedCategories.length === 0
    ) {
      setError('At least one permitted data category must be checked for disclosure.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const result = reviewRequest(request.id, {
        decision,
        reviewerId: 'REV-OFFICER-09',
        reviewerName: 'Kazi Farhana (Senior Land Officer)',
        note: note.trim(),
        approvedCategories:
          decision === 'rejected' || decision === 'more_info_required' ? [] : selectedCategories,
        conditions,
        accessDurationHours: accessDuration,
      });

      setSubmitting(false);

      if (result.success) {
        onClose();
        if (onDecisionComplete) onDecisionComplete();
      } else {
        setError(result.error || 'Failed to record decision');
      }
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.reviewer.decisionModalTitle}
      subtitle={
        language === 'bn'
          ? `আবেদন ${request.id} মূল্যায়ন করুন (মৌজা ${request.parcelDetails.mouza}, দাগ ${request.parcelDetails.dagNumber})`
          : `Evaluate request ${request.id} for Dag ${request.parcelDetails.dagNumber}, ${request.parcelDetails.mouza}`
      }
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Decision Type Buttons */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {language === 'bn' ? 'নিষ্পত্তির ধরন নির্বাচন' : 'Adjudication Decision'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setDecision('approved');
                setSelectedCategories(request.requestedCategories);
              }}
              className={`p-3 rounded-md border text-left flex items-start gap-3 transition-all ${
                decision === 'approved'
                  ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-slate-900">
                  {t.reviewer.approveScope}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'bn'
                    ? 'ফি পরিশোধের পর সকল অনুমোদিত সংকেত দেখার অনুমতি'
                    : 'Grant access to all requested signals after fee payment'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDecision('limited_approved')}
              className={`p-3 rounded-md border text-left flex items-start gap-3 transition-all ${
                decision === 'limited_approved'
                  ? 'border-teal-500 bg-teal-50/60 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <Layers className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-slate-900">
                  {t.reviewer.approveLimited}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'bn'
                    ? 'শুধুমাত্র যাচাইকৃত নির্দিষ্ট কিছু ক্যাটাগরি উন্মুক্ত করা'
                    : 'Restrict disclosure to specific vetted categories only'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDecision('more_info_required')}
              className={`p-3 rounded-md border text-left flex items-start gap-3 transition-all ${
                decision === 'more_info_required'
                  ? 'border-orange-500 bg-orange-50/60 ring-1 ring-orange-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <HelpCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-slate-900">
                  {t.reviewer.requestInfo}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'bn'
                    ? 'আবেদনকারীকে সীমানা বা সাব-রেজিস্ট্রির তথ্য পরিষ্কার করতে তলব'
                    : 'Require applicant to clarify boundaries or jurisdiction'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDecision('rejected')}
              className={`p-3 rounded-md border text-left flex items-start gap-3 transition-all ${
                decision === 'rejected'
                  ? 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-slate-900">
                  {t.reviewer.reject}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'bn'
                    ? 'মামলা বা অপর্যাপ্ত স্বার্থের কারণে আবেদন প্রত্যাখ্যান'
                    : 'Deny request due to active dispute or insufficient standing'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Permitted Categories selection (for approved / limited_approved) */}
        {(decision === 'approved' || decision === 'limited_approved') && (
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {language === 'bn'
                  ? `অনুমোদিত সংকেত ক্যাটাগরি (${selectedCategories.length}টি নির্বাচিত)`
                  : `Permitted Disclosure Categories (${selectedCategories.length} selected)`}
              </label>
              {decision === 'limited_approved' && (
                <span className="text-[10px] text-teal-700 font-semibold bg-teal-100 px-2 py-0.5 rounded">
                  {language === 'bn' ? 'সীমিত প্রবেশাধিকার সক্রিয়' : 'Controlled Redaction Active'}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {DATA_CATEGORIES.map((cat) => {
                const requested = request.requestedCategories?.includes(cat.id);
                const isChecked = selectedCategories.includes(cat.id);

                return (
                  <label
                    key={cat.id}
                    className={`flex items-start gap-2.5 p-2 rounded cursor-pointer transition-colors ${
                      isChecked ? 'bg-white shadow-2xs border border-teal-200' : 'bg-transparent'
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
                        <span className="font-semibold text-slate-900">
                          {language === 'bn' ? cat.bengali : cat.label}
                        </span>
                        {requested && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                            {language === 'bn' ? 'নাগরিক কর্তৃক প্রার্থিত' : 'Requested by Citizen'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{cat.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Access duration hours */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {language === 'bn' ? 'প্রবেশাধিকারের সময়সীমা:' : 'Access Window Duration:'}
              </span>
              <select
                value={accessDuration}
                onChange={(e) => setAccessDuration(Number(e.target.value))}
                className="text-xs border border-slate-300 rounded px-2 py-1 bg-white text-slate-700"
              >
                <option value={24}>{language === 'bn' ? '২৪ ঘণ্টা (১ দিন)' : '24 Hours (1 Day)'}</option>
                <option value={48}>{language === 'bn' ? '৪৮ ঘণ্টা (২ দিন)' : '48 Hours (2 Days)'}</option>
                <option value={72}>{language === 'bn' ? '৭২ ঘণ্টা (৩ দিন — আদর্শ)' : '72 Hours (3 Days — Standard)'}</option>
                <option value={168}>{language === 'bn' ? '১৬৮ ঘণ্টা (৭ দিন)' : '168 Hours (7 Days)'}</option>
              </select>
            </div>
          </div>
        )}

        {/* Mandatory Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            {t.reviewer.officialReason} <span className="text-rose-600">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'আইনগত কারণ বা মন্তব্য লিপিবদ্ধ করুন...'
                : 'State findings of applicant bonafides and statutory justification for release...'
            }
            className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-primary focus:border-gov-primary text-slate-800"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            {language === 'bn'
              ? 'এই মন্তব্য স্থায়ী অডিট ট্রেইলে সংরক্ষিত হবে এবং আবেদনকারী নাগরিকের নিকট পৌঁছাবে।'
              : 'This justification is logged in the permanent audit trail and communicated to the citizen.'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            {language === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-xs font-semibold text-white bg-gov-primary hover:bg-gov-primaryHover rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            {submitting
              ? (language === 'bn' ? 'সিদ্ধান্ত লিপিবদ্ধ হচ্ছে...' : 'Recording Decision...')
              : t.reviewer.confirmDecision}
          </button>
        </div>
      </form>
    </Modal>
  );
};

