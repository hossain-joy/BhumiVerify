import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useLanguage } from '../../context/LanguageContext';
import { useUI } from '../../context/UIContext';
import { INITIAL_PARCELS } from '../../lib/mock-data/parcels';
import { ParcelReference } from '../../types';
import { VoicePlayButton } from '../common/VoicePlayButton';
import {
  ArrowLeftRight,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Scale,
  Sparkles,
  ArrowRight,
  Printer,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ParcelComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParcelComparatorModal: React.FC<ParcelComparatorModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { openCadastralMap } = useUI();
  const navigate = useNavigate();

  const [parcelAId, setParcelAId] = useState<string>(INITIAL_PARCELS[0].id);
  const [parcelBId, setParcelBId] = useState<string>(INITIAL_PARCELS[1].id);

  const parcelA = INITIAL_PARCELS.find((p) => p.id === parcelAId) || INITIAL_PARCELS[0];
  const parcelB = INITIAL_PARCELS.find((p) => p.id === parcelBId) || INITIAL_PARCELS[1];

  const getRiskBadge = (score?: number) => {
    if (!score || score < 30) {
      return {
        label: language === 'bn' ? 'স্বাভাবিক / অপেক্ষাকৃত কম ঝুঁকি' : 'Low Attention Required',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
      };
    }
    if (score < 60) {
      return {
        label: language === 'bn' ? 'মধ্যম মনোযোগ প্রয়োজন' : 'Moderate Attention Required',
        color: 'bg-amber-50 text-amber-800 border-amber-300',
        icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
      };
    }
    return {
      label: language === 'bn' ? 'উচ্চ সতর্কতা / অসঙ্গতি বিদ্যমান' : 'High Alert / Discrepancy',
      color: 'bg-rose-50 text-rose-800 border-rose-300',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
    };
  };

  const riskA = getRiskBadge(parcelA.demoAttentionScore);
  const riskB = getRiskBadge(parcelB.demoAttentionScore);

  const voiceSummaryText =
    language === 'bn'
      ? `প্লট এ: মৌজা ${parcelA.mouza}, দাগ ${parcelA.dagNumber}, আয়তন ${parcelA.area} শতাংশ। ঝুঁকি স্কোর ${parcelA.demoAttentionScore || 0}। প্লট বি: মৌজা ${parcelB.mouza}, দাগ ${parcelB.dagNumber}, আয়তন ${parcelB.area} শতাংশ। ঝুঁকি স্কোর ${parcelB.demoAttentionScore || 0}।`
      : `Comparing Plot A: Mouza ${parcelA.mouza}, Dag ${parcelA.dagNumber}, area ${parcelA.area} decimals. Attention score ${parcelA.demoAttentionScore || 0}. Plot B: Mouza ${parcelB.mouza}, Dag ${parcelB.dagNumber}, area ${parcelB.area} decimals. Attention score ${parcelB.demoAttentionScore || 0}.`;

  const comparisonRows: Array<{
    titleBn: string;
    titleEn: string;
    renderA: () => React.ReactNode;
    renderB: () => React.ReactNode;
  }> = [
    {
      titleBn: 'মৌজা ও জে.এল. নম্বর',
      titleEn: 'Mouza & J.L. Number',
      renderA: () => (
        <span className="font-semibold text-slate-800">
          {parcelA.mouza} (J.L. {parcelA.jlNumber})
        </span>
      ),
      renderB: () => (
        <span className="font-semibold text-slate-800">
          {parcelB.mouza} (J.L. {parcelB.jlNumber})
        </span>
      ),
    },
    {
      titleBn: 'দাগ / প্লট নম্বর',
      titleEn: 'Dag / Plot Demarcation',
      renderA: () => (
        <span className="font-bold text-gov-primary font-mono text-sm">
          {language === 'bn' ? `দাগ ${parcelA.dagNumber}` : `Plot ${parcelA.dagNumber}`}
        </span>
      ),
      renderB: () => (
        <span className="font-bold text-gov-primary font-mono text-sm">
          {language === 'bn' ? `দাগ ${parcelB.dagNumber}` : `Plot ${parcelB.dagNumber}`}
        </span>
      ),
    },
    {
      titleBn: 'খতিয়ান ও জরিপ প্রকার',
      titleEn: 'Khatian & Survey Type',
      renderA: () => (
        <div>
          <span className="font-medium text-slate-800">Khatian {parcelA.khatianNumber}</span>
          <span className="ml-1.5 px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono font-semibold">
            {parcelA.khatianType}
          </span>
        </div>
      ),
      renderB: () => (
        <div>
          <span className="font-medium text-slate-800">Khatian {parcelB.khatianNumber}</span>
          <span className="ml-1.5 px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono font-semibold">
            {parcelB.khatianType}
          </span>
        </div>
      ),
    },
    {
      titleBn: 'ঘোষিত জমির পরিমাণ',
      titleEn: 'Recorded Land Area',
      renderA: () => (
        <span className="font-bold text-slate-900">
          {parcelA.area} {parcelA.areaUnit}
        </span>
      ),
      renderB: () => (
        <span className="font-bold text-slate-900">
          {parcelB.area} {parcelB.areaUnit}
        </span>
      ),
    },
    {
      titleBn: 'রেকর্ড মিলের নিশ্চয়তা',
      titleEn: 'Match Confidence Level',
      renderA: () => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
            parcelA.matchConfidence === 'exact'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {parcelA.matchConfidence}
        </span>
      ),
      renderB: () => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
            parcelB.matchConfidence === 'exact'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {parcelB.matchConfidence}
        </span>
      ),
    },
    {
      titleBn: 'ঝুঁকি মনোযোগ স্কোর (০-১০০)',
      titleEn: 'Diligence Attention Score',
      renderA: () => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-mono text-slate-900">
              {parcelA.demoAttentionScore || 0} / 100
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold ${riskA.color}`}>
              {riskA.icon}
              {riskA.label}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                (parcelA.demoAttentionScore || 0) > 60
                  ? 'bg-rose-500'
                  : (parcelA.demoAttentionScore || 0) > 30
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${parcelA.demoAttentionScore || 0}%` }}
            />
          </div>
        </div>
      ),
      renderB: () => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-mono text-slate-900">
              {parcelB.demoAttentionScore || 0} / 100
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold ${riskB.color}`}>
              {riskB.icon}
              {riskB.label}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                (parcelB.demoAttentionScore || 0) > 60
                  ? 'bg-rose-500'
                  : (parcelB.demoAttentionScore || 0) > 30
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${parcelB.demoAttentionScore || 0}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      titleBn: 'চৌহদ্দি ও সীমানা বিবরণ',
      titleEn: 'Boundary Demarcation',
      renderA: () => (
        <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 font-mono">
          {parcelA.boundaryNotes}
        </p>
      ),
      renderB: () => (
        <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 font-mono">
          {parcelB.boundaryNotes}
        </p>
      ),
    },
    {
      titleBn: 'সংকেতের সারসংক্ষেপ',
      titleEn: 'Recorded Signal Summary',
      renderA: () => (
        <p className="text-xs text-slate-700 leading-relaxed">
          {parcelA.riskSummary}
        </p>
      ),
      renderB: () => (
        <p className="text-xs text-slate-700 leading-relaxed">
          {parcelB.riskSummary}
        </p>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'bn' ? 'পার্সেল দ্বৈত তুলনা ম্যাট্রিক্স (Side-by-Side)' : 'Side-by-Side Parcel Comparator'}
      subtitle={
        language === 'bn'
          ? 'দুটি ভিন্ন জমির খতিয়ান, দাগ, সীমানা ও ঝুঁকি সংকেত পাশাপাশি রেখে সরাসরি তুলনা করুন'
          : 'Compare title characteristics, mutation status, and recorded flags between two parcels'
      }
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Top Controls: Selectors & Voice Reader */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-gov-primary" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {language === 'bn' ? 'তুলনা করার পার্সেল নির্বাচন করুন' : 'Select Parcels to Compare'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <VoicePlayButton text={voiceSummaryText} lang={language as 'bn' | 'en'} label={language === 'bn' ? 'তুলনা শুনুন' : 'Listen'} />
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
              title={language === 'bn' ? 'তুলনা প্রিন্ট করুন' : 'Print comparison'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
            </button>
          </div>
        </div>

        {/* Dropdown Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Plot A Selector */}
          <div className="p-3.5 rounded-xl border-2 border-teal-500/40 bg-teal-50/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gov-primary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center">
                  A
                </span>
                {language === 'bn' ? 'প্রথম জমি (প্লট এ)' : 'Parcel A (Reference)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCadastralMap(parcelA.dagNumber);
                }}
                className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <MapPin className="w-3 h-3" />
                {language === 'bn' ? 'নকশায় দেখুন' : 'View on Map'}
              </button>
            </div>
            <select
              value={parcelAId}
              onChange={(e) => setParcelAId(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500/30"
            >
              {INITIAL_PARCELS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.mouza} — দাগ {p.dagNumber} ({p.upazila}, খতিয়ান {p.khatianNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Plot B Selector */}
          <div className="p-3.5 rounded-xl border-2 border-blue-500/40 bg-blue-50/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                  B
                </span>
                {language === 'bn' ? 'দ্বিতীয় জমি (প্লট বি)' : 'Parcel B (Target)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCadastralMap(parcelB.dagNumber);
                }}
                className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <MapPin className="w-3 h-3" />
                {language === 'bn' ? 'নকশায় দেখুন' : 'View on Map'}
              </button>
            </div>
            <select
              value={parcelBId}
              onChange={(e) => setParcelBId(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500/30"
            >
              {INITIAL_PARCELS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.mouza} — দাগ {p.dagNumber} ({p.upazila}, খতিয়ান {p.khatianNumber})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matrix Comparison Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3 w-1/3">{language === 'bn' ? 'তুলনামূলক মানদণ্ড' : 'Comparison Criterion'}</th>
                <th className="p-3 w-1/3 bg-teal-50/50 text-teal-900">
                  {language === 'bn' ? `প্লট এ (দাগ ${parcelA.dagNumber})` : `Plot A (Dag ${parcelA.dagNumber})`}
                </th>
                <th className="p-3 w-1/3 bg-blue-50/50 text-blue-900">
                  {language === 'bn' ? `প্লট বি (দাগ ${parcelB.dagNumber})` : `Plot B (Dag ${parcelB.dagNumber})`}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/40 align-top">
                    {language === 'bn' ? row.titleBn : row.titleEn}
                  </td>
                  <td className="p-3 bg-teal-50/20 align-top">{row.renderA()}</td>
                  <td className="p-3 bg-blue-50/20 align-top">{row.renderB()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/citizen/new-request');
            }}
            className="p-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-gov-primary border border-teal-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <span>{language === 'bn' ? `প্লট এ (দাগ ${parcelA.dagNumber}) নিয়ে আবেদন করুন` : `Initiate Inquiry for Plot A (${parcelA.dagNumber})`}</span>
            <ArrowRight className="w-4 h-4 text-gov-primary" />
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/citizen/new-request');
            }}
            className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <span>{language === 'bn' ? `প্লট বি (দাগ ${parcelB.dagNumber}) নিয়ে আবেদন করুন` : `Initiate Inquiry for Plot B (${parcelB.dagNumber})`}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
