import React from 'react';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { AccessRequest } from '../../types';
import { formatDate, formatDateTime, formatBDT } from '../../lib/utils';
import {
  X,
  Printer,
  ShieldCheck,
  Award,
  CheckCircle2,
  QrCode,
  Sparkles,
  Download,
} from 'lucide-react';

interface OfficialCertificateModalProps {
  request?: AccessRequest;
}

export const OfficialCertificateModal: React.FC<OfficialCertificateModalProps> = ({ request }) => {
  const { isCertificateOpen, closeCertificate, activeCertificateRequest } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();

  const currentReq = request || activeCertificateRequest;

  if (!isCertificateOpen || !currentReq) return null;

  const isBn = language === 'bn';
  const p = currentReq.parcelDetails;

  const handlePrint = () => {
    window.print();
    showToast({
      type: 'info',
      title: isBn ? 'প্রিন্ট ডায়ালগ ওপেন হয়েছে' : 'Print Dialog Opened',
      message: isBn ? 'প্রত্যয়নপত্রটি পিডিএফ হিসেবে সংরক্ষণ করতে পারেন' : 'You can save this certificate as PDF',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={closeCertificate}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden in print) */}
        <div className="no-print px-6 py-3 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold">
              {isBn ? 'ডিজিটাল ভূমি যাচাই প্রত্যয়নপত্র' : 'Digital Land Diligence Certificate'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
              ID: {currentReq.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রিন্ট / পিডিএফ ডাউনলোড' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={closeCertificate}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
              aria-label="Close certificate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Sheet (Designed for printing) */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white flex justify-center">
          <div className="w-full max-w-2xl border-4 border-double border-teal-900 p-6 sm:p-8 rounded-xl relative bg-[#fdfdfc] shadow-xs">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none rotate-[-25deg]">
              <span className="text-6xl sm:text-7xl font-black text-slate-900 uppercase tracking-widest text-center">
                BHUMIVERIFY<br />CERTIFIED
              </span>
            </div>

            {/* Official Header */}
            <div className="text-center space-y-1 pb-5 border-b-2 border-slate-300 relative z-10">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-teal-700 to-gov-primary text-white flex items-center justify-center font-bold text-lg shadow-xs mb-1">
                🇧🇩
              </div>
              <h2 id="certificate-modal-title" className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight">
                {isBn ? 'ভূমিভেরিফাই ডিজিটাল প্রাক-রেজিস্ট্রেশন প্রত্যয়নপত্র' : 'BhumiVerify Digital Pre-Registration Certificate'}
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                {isBn
                  ? 'জমি রেজিস্ট্রেশন পূর্ববর্তী লেনদেন সংকেত ও নিয়ন্ত্রিত খতিয়ান যাচাই বিবরণী'
                  : 'Pre-Registration Land Transaction Signals & Controlled Diligence Record'}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-1">
                CERTIFICATE REF: {currentReq.id} • DATE: {formatDate(currentReq.submittedAt)}
              </p>
            </div>

            {/* Certified Body Content */}
            <div className="py-5 space-y-5 text-xs text-slate-800 relative z-10">
              {/* Applicant Standing */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isBn ? 'আবেদনকারীর নাম:' : 'Applicant Name:'}</span>
                  <span className="font-bold text-slate-900">{currentReq.userName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isBn ? 'জাতীয় পরিচয়পত্র (NID):' : 'National ID:'}</span>
                  <span className="font-mono font-semibold text-slate-800">{currentReq.userMaskedNid}</span>
                </div>
              </div>

              {/* Cadastral Parcel Breakdown */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>{isBn ? 'তল্লাশিকৃত ভূমির তফসিল ও ক্যাডাস্ট্রাল বিবরণ' : 'Surveyed Parcel Cadastral Schedule'}</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'বিভাগ ও জেলা' : 'Division & District'}</span>
                    <span className="font-semibold">{p.district}, {p.division}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'উপজেলা / সার্কেল' : 'Upazila / Circle'}</span>
                    <span className="font-semibold">{p.upazila}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'মৌজা ও জে.এল.' : 'Mouza & J.L.'}</span>
                    <span className="font-semibold">{p.mouza} (জে.এল. {p.jlNumber})</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'দাগ নম্বর' : 'Dag / Plot No.'}</span>
                    <span className="font-bold text-gov-primary text-sm">দাগ নং {p.dagNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'খতিয়ান নম্বর ও ধরন' : 'Khatian Number & Type'}</span>
                    <span className="font-semibold">খতিয়ান {p.khatianNumber} ({p.khatianType})</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'জমির পরিমাণ' : 'Land Area'}</span>
                    <span className="font-semibold">{p.area} {p.areaUnit}</span>
                  </div>
                </div>
              </div>

              {/* Verified Status & Adjudication */}
              <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>{isBn ? 'প্রাতিষ্ঠানিক পর্যালোচনা ও প্রাপ্ত সংকেত' : 'Official Findings & Signals'}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-teal-800 border border-teal-200">
                    {currentReq.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {currentReq.reviewerDecision?.note ||
                    (isBn
                      ? 'রেকর্ড পর্যালোচনাপূর্বক আবেদনটি শর্তসাপেক্ষে প্রাক-রেজিস্ট্রেশন যাচাইয়ের জন্য অনুমোদিত হয়েছে।'
                      : 'Parcel diligence records evaluated and approved under controlled disclosure safeguards.')}
                </p>
              </div>

              {/* QR Code & Digital Signature Stamp */}
              <div className="pt-4 border-t-2 border-slate-200 flex items-end justify-between gap-4">
                {/* QR Code */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 p-1 bg-white border border-slate-300 rounded-lg shadow-2xs flex items-center justify-center">
                    <QrCode className="w-14 h-14 text-slate-800" />
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    <p className="font-bold text-slate-700">{isBn ? 'ডিজিটাল ভেরিফিকেশন কিউআর' : 'Verification QR'}</p>
                    <p>{isBn ? 'স্ক্যান করে সত্যতা যাচাই করুন' : 'Scan to verify certificate'}</p>
                    <p className="font-mono text-[9px] text-slate-400 mt-0.5">HASH: SHA256-8F7D...A902</p>
                  </div>
                </div>

                {/* Signature Box */}
                <div className="text-right space-y-1">
                  <div className="font-serif italic text-sm text-slate-700 font-bold border-b border-slate-400 pb-1">
                    Kazi Farhana
                  </div>
                  <p className="text-[10px] font-bold text-slate-800">
                    {isBn ? 'সহকারী কমিশনার (ভূমি) সার্কেল' : 'Assistant Commissioner (Land)'}
                  </p>
                  <p className="text-[9px] text-slate-400">
                    {isBn ? 'ঢাকা রাজস্ব এলাকা • গণপ্রজাতন্ত্রী বাংলাদেশ' : 'Dhaka Revenue Circle, Bangladesh'}
                  </p>
                </div>
              </div>

              {/* Statutory Legal Disclaimer */}
              <div className="pt-2 text-[9px] text-slate-400 text-center leading-normal">
                {isBn
                  ? 'এই প্রত্যয়নপত্রটি একটি ডেমো প্রোটোটাইপের নমুনা সারাংশ। এটি কোনো মূল খতিয়ান বা স্বত্ব সনদের বিকল্প নয়।'
                  : 'This certificate is a demonstrative sample output of LandTech BD. It does not replace official Sub-Registry or AC Land searches.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
