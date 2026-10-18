import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface MapPlot {
  id: string;
  dagNumber: string;
  mouza: string;
  upazila: string;
  khatian: string;
  areaDecimals: number;
  status: 'clean' | 'transfer_pending' | 'mutation_active' | 'dispute' | 'neutral';
  statusTitleBn: string;
  statusTitleEn: string;
  detailsBn: string;
  detailsEn: string;
  polygon: string;
  labelX: number;
  labelY: number;
  scenarioId?: string;
}

const PLOTS: MapPlot[] = [
  {
    id: 'DEMO-PARCEL-001',
    dagNumber: '402',
    mouza: 'Tejgaon I/A (তেজগাঁও শিল্পাঞ্চল)',
    upazila: 'Tejgaon Circle',
    khatian: '812',
    areaDecimals: 14.5,
    status: 'transfer_pending',
    statusTitleBn: 'সাম্প্রতিক হস্তান্তর দলিল নিবন্ধিত',
    statusTitleEn: 'Recent Transfer Deed Registered',
    detailsBn: '১৮ দিন আগে সাব-রেজিস্ট্রি অফিসে হস্তান্তরের দলিল নিবন্ধিত। নামজারি অনিষ্পন্ন।',
    detailsEn: 'Deed registered 18 days ago at Sub-Registry. e-Mutation status pending.',
    polygon: '140,80 260,70 270,180 150,190',
    labelX: 200,
    labelY: 135,
    scenarioId: 'REQ-2026-001',
  },
  {
    id: 'DEMO-PARCEL-002',
    dagNumber: '118',
    mouza: 'Dhanmondi R/A (ধানমন্ডি)',
    upazila: 'Dhanmondi Revenue Circle',
    khatian: '429',
    areaDecimals: 8.25,
    status: 'mutation_active',
    statusTitleBn: 'ই-নামজারি আবেদন চলমান',
    statusTitleEn: 'e-Mutation Application Active',
    detailsBn: 'অনলাইনে সহকারী কমিশনার (ভূমি) বরাবর আবেদন দাখিলকৃত। শুনানি নির্ধারিত।',
    detailsEn: 'Petition filed online at AC Land office. Hearing date scheduled.',
    polygon: '270,180 390,170 380,280 260,290',
    labelX: 320,
    labelY: 235,
    scenarioId: 'REQ-2026-002',
  },
  {
    id: 'DEMO-PARCEL-003',
    dagNumber: '85',
    mouza: 'Gulshan (গুলশান)',
    upazila: 'Gulshan Circle',
    khatian: '991',
    areaDecimals: 12.0,
    status: 'clean',
    statusTitleBn: 'নামজারি সম্পন্ন ও হালনাগাদ',
    statusTitleEn: 'Mutation Approved & Clean',
    detailsBn: 'ই-নামজারি অনুমোদিত হয়ে নতুন খতিয়ান ৯৯১ জারি হয়েছে। হাল খাজনা পরিশোধিত।',
    detailsEn: 'e-Mutation approved, new Khatian 991 issued. Updated revenue rent paid.',
    polygon: '390,70 510,80 500,190 380,180',
    labelX: 445,
    labelY: 135,
    scenarioId: 'REQ-2026-003',
  },
  {
    id: 'DEMO-PARCEL-004',
    dagNumber: '999',
    mouza: 'Aminbazar (আমিনবাজার)',
    upazila: 'Savar',
    khatian: '124',
    areaDecimals: 22.8,
    status: 'dispute',
    statusTitleBn: 'এসএ-আরএস নকশা বিরোধ',
    statusTitleEn: 'SA-RS Boundary Conflict',
    detailsBn: 'ঐতিহাসিক এসএ এবং আরএস জরিপ শিটের মধ্যে দাগ সীমানায় বৈসাদৃশ্য। প্রাতিষ্ঠানিক তদন্ত প্রয়োজন।',
    detailsEn: 'Discrepancy between historic SA survey sheet and RS cadastral sheet. Official review required.',
    polygon: '150,190 260,190 250,300 130,290',
    labelX: 195,
    labelY: 245,
    scenarioId: 'REQ-2026-004',
  },
  {
    id: 'PARCEL-ADJ-401',
    dagNumber: '401',
    mouza: 'Tejgaon I/A',
    upazila: 'Tejgaon Circle',
    khatian: '811',
    areaDecimals: 10.2,
    status: 'neutral',
    statusTitleBn: 'পাশ্ববর্তী প্লট (সংলগ্ন দাগ)',
    statusTitleEn: 'Adjacent Parcel',
    detailsBn: 'রেকর্ড সাধারণ ও স্বাভাবিক। কোনো চলমান আপত্তি নেই।',
    detailsEn: 'Normal revenue record. No pending adverse notices recorded.',
    polygon: '30,85 140,80 150,190 40,195',
    labelX: 85,
    labelY: 140,
  },
  {
    id: 'PARCEL-ADJ-403',
    dagNumber: '403',
    mouza: 'Tejgaon I/A',
    upazila: 'Tejgaon Circle',
    khatian: '813',
    areaDecimals: 16.0,
    status: 'neutral',
    statusTitleBn: 'পাশ্ববর্তী প্লট (সংলগ্ন দাগ)',
    statusTitleEn: 'Adjacent Parcel',
    detailsBn: 'বাণিজ্যিক প্লট। সরকারি ড্রেইনেজ ও রাস্তা সংলগ্ন।',
    detailsEn: 'Commercial land parcel adjacent to municipal drainage road.',
    polygon: '260,70 390,70 380,170 270,180',
    labelX: 325,
    labelY: 125,
  },
  {
    id: 'PARCEL-ADJ-405',
    dagNumber: '405',
    mouza: 'Tejgaon I/A',
    upazila: 'Tejgaon Circle',
    khatian: '815',
    areaDecimals: 7.5,
    status: 'neutral',
    statusTitleBn: 'দক্ষিণ পার্শ্বের প্লট',
    statusTitleEn: 'Southern Adjacent Parcel',
    detailsBn: 'আবাসিক ব্যবহার। সাম্প্রতিক কোনো লেনদেন নেই।',
    detailsEn: 'Residential use. No recorded recent transfers.',
    polygon: '130,290 250,300 240,390 120,380',
    labelX: 185,
    labelY: 345,
  },
  {
    id: 'PARCEL-ADJ-406',
    dagNumber: '406',
    mouza: 'Tejgaon I/A',
    upazila: 'Tejgaon Circle',
    khatian: '816',
    areaDecimals: 11.4,
    status: 'neutral',
    statusTitleBn: 'দক্ষিণ-পূর্ব প্লট',
    statusTitleEn: 'South-Eastern Parcel',
    detailsBn: 'যৌথ মালিকানাধীন খতিয়ান রেকর্ড।',
    detailsEn: 'Joint ownership revenue khatian record.',
    polygon: '250,300 370,290 360,390 240,390',
    labelX: 305,
    labelY: 345,
  },
];

export const CadastralMapModal: React.FC = () => {
  const { isCadastralMapOpen, closeCadastralMap, activeMapDag } = useUI();
  const { language } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedPlot, setSelectedPlot] = useState<MapPlot>(() => {
    return PLOTS.find((p) => p.dagNumber === activeMapDag) || PLOTS[0];
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'alert' | 'clean'>('all');

  useEffect(() => {
    if (activeMapDag) {
      const match = PLOTS.find((p) => p.dagNumber === activeMapDag);
      if (match) setSelectedPlot(match);
    }
  }, [activeMapDag]);

  if (!isCadastralMapOpen) return null;

  const isBn = language === 'bn';

  const getStatusColors = (status: MapPlot['status']) => {
    switch (status) {
      case 'clean':
        return {
          fill: '#ecfdf5',
          stroke: '#10b981',
          hoverFill: '#d1fae5',
          textClass: 'text-emerald-800 bg-emerald-100 border-emerald-300',
          dot: 'bg-emerald-500',
        };
      case 'transfer_pending':
        return {
          fill: '#fffbeb',
          stroke: '#f59e0b',
          hoverFill: '#fef3c7',
          textClass: 'text-amber-800 bg-amber-100 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'mutation_active':
        return {
          fill: '#eff6ff',
          stroke: '#3b82f6',
          hoverFill: '#dbeafe',
          textClass: 'text-blue-800 bg-blue-100 border-blue-300',
          dot: 'bg-blue-500',
        };
      case 'dispute':
        return {
          fill: '#fff1f2',
          stroke: '#f43f5e',
          hoverFill: '#ffe4e6',
          textClass: 'text-rose-800 bg-rose-100 border-rose-300',
          dot: 'bg-rose-500',
        };
      default:
        return {
          fill: '#f8fafc',
          stroke: '#94a3b8',
          hoverFill: '#e2e8f0',
          textClass: 'text-slate-700 bg-slate-100 border-slate-300',
          dot: 'bg-slate-400',
        };
    }
  };

  const filteredPlots = PLOTS.filter((plot) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'clean') return plot.status === 'clean' || plot.status === 'neutral';
    if (statusFilter === 'alert') return plot.status === 'transfer_pending' || plot.status === 'mutation_active' || plot.status === 'dispute';
    return true;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cadastral-map-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={closeCadastralMap}
    >
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-gov-dark via-slate-900 to-gov-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 id="cadastral-map-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {isBn ? 'ডিজিটাল ক্যাডাস্ট্রাল মৌজা নকশা (Mouza Cadastral Sheet)' : 'Digital Cadastral Survey Sheet'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-teal-200">
                  {isBn ? 'সিমুলেটেড সিট' : 'Simulated Sheet'}
                </span>
              </h2>
              <p className="text-xs text-teal-200/80">
                {isBn
                  ? 'ঢাকা জেলা • তেজগাঁও / সাভার মৌজা নকশা • দাগের সীমানা ও বিরোধ যাচাই'
                  : 'Dhaka District • Survey Sheet • Plot boundaries, conflicts & early signals'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeCadastralMap}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Map Toolbar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">{isBn ? 'ফিল্টার:' : 'Filter:'}</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === 'all'
                  ? 'bg-gov-primary text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isBn ? 'সব দাগ (৮)' : 'All Plots (8)'}
            </button>
            <button
              onClick={() => setStatusFilter('alert')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === 'alert'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isBn ? 'সতর্কতা ও বিরোধ' : 'Alerts & Disputes'}
            </button>
            <button
              onClick={() => setStatusFilter('clean')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === 'clean'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isBn ? 'স্বাভাবিক রেকর্ড' : 'Clean & Normal'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="p-1 hover:bg-slate-100 rounded text-slate-600"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px] font-bold text-slate-600">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.2))}
                className="p-1 hover:bg-slate-100 rounded text-slate-600"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:bg-slate-100 rounded text-slate-600 ml-1 border-l pl-1.5"
                title="Reset Zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Body: Interactive Map Canvas + Inspector Panel */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          {/* Map SVG Canvas (8 cols) */}
          <div className="lg:col-span-8 p-4 bg-[#fcfbfa] overflow-auto flex items-center justify-center relative select-none border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Cadastral Sheet Watermark / Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* SVG Cadastral Sheet */}
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
              className="relative p-2"
            >
              <svg
                viewBox="0 0 540 430"
                className="w-[500px] h-[390px] drop-shadow-sm font-sans"
              >
                {/* Background sheet border */}
                <rect
                  x="10"
                  y="10"
                  width="520"
                  height="410"
                  rx="8"
                  fill="#fffdf8"
                  stroke="#d6d3cb"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />

                {/* Road / Canal Infrastructure Line */}
                <path
                  d="M 10 240 Q 260 230 530 250"
                  stroke="#cbd5e1"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 240 Q 260 230 530 250"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  fill="none"
                />
                <text x="270" y="244" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">
                  {isBn ? 'পাকারাস্তা (Municipal Access Road)' : 'Municipal Access Road'}
                </text>

                {/* Water Body / Khal Buffer */}
                <path
                  d="M 470 10 Q 480 200 520 420"
                  stroke="#bae6fd"
                  strokeWidth="16"
                  fill="none"
                  opacity="0.6"
                />
                <text x="500" y="380" fill="#0284c7" fontSize="7" fontWeight="bold" transform="rotate(85 500 380)">
                  {isBn ? 'খাল / জলাধার (Canal Buffer)' : 'Natural Canal Buffer'}
                </text>

                {/* Plots / Dags */}
                {filteredPlots.map((plot) => {
                  const isSelected = selectedPlot.id === plot.id;
                  const style = getStatusColors(plot.status);

                  return (
                    <g
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className="cursor-pointer group"
                    >
                      <polygon
                        points={plot.polygon}
                        fill={isSelected ? style.hoverFill : style.fill}
                        stroke={isSelected ? '#0f766e' : style.stroke}
                        strokeWidth={isSelected ? '3.5' : '1.8'}
                        className="transition-all duration-150 group-hover:opacity-90"
                      />

                      {/* Dag Number and Area Label */}
                      <text
                        x={plot.labelX}
                        y={plot.labelY}
                        textAnchor="middle"
                        className="select-none pointer-events-none"
                      >
                        <tspan
                          x={plot.labelX}
                          dy="-2"
                          fontSize="12"
                          fontWeight="bold"
                          fill={isSelected ? '#0f766e' : '#1e293b'}
                        >
                          দাগ {plot.dagNumber}
                        </tspan>
                        <tspan
                          x={plot.labelX}
                          dy="12"
                          fontSize="8.5"
                          fill="#64748b"
                          fontWeight="semibold"
                        >
                          {plot.areaDecimals} শতক
                        </tspan>
                      </text>

                      {/* Small Status Indicator Pin */}
                      <circle
                        cx={plot.labelX + 24}
                        cy={plot.labelY - 14}
                        r="3.5"
                        fill={style.stroke}
                      />
                    </g>
                  );
                })}

                {/* Compass / North Arrow */}
                <g transform="translate(485, 35)">
                  <circle cx="0" cy="0" r="16" fill="white" stroke="#94a3b8" strokeWidth="1" />
                  <path d="M 0 -11 L 4 3 L 0 1 L -4 3 Z" fill="#dc2626" />
                  <path d="M 0 11 L 4 -3 L 0 -1 L -4 -3 Z" fill="#94a3b8" />
                  <text x="0" y="-13" fontSize="8" fontWeight="bold" fill="#dc2626" textAnchor="middle">
                    N
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick legend pill bottom-left */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg p-2 text-[10px] space-y-1 shadow-2xs hidden sm:block">
              <div className="font-bold text-slate-700">{isBn ? 'নির্দেশিকা (Legend)' : 'Legend'}</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-100 border border-amber-400" />
                <span className="text-slate-600">{isBn ? 'হস্তান্তর অনিষ্পন্ন' : 'Transfer Pending'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-100 border border-blue-400" />
                <span className="text-slate-600">{isBn ? 'ই-নামজারি শুনানিতে' : 'e-Mutation Active'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-100 border border-rose-400" />
                <span className="text-slate-600">{isBn ? 'জরিপ সীমানা বিরোধ' : 'Survey Conflict'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-400" />
                <span className="text-slate-600">{isBn ? 'নামজারি হালনাগাদ' : 'Clean & Approved'}</span>
              </div>
            </div>
          </div>

          {/* Plot Inspector Side Panel (4 cols) */}
          <div className="lg:col-span-4 p-5 bg-white flex flex-col justify-between space-y-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {isBn ? 'নির্বাচিত ক্যাডাস্ট্রাল দাগ' : 'Selected Cadastral Plot'}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {isBn ? `দাগ নং ${selectedPlot.dagNumber}` : `Plot / Dag ${selectedPlot.dagNumber}`}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedPlot.mouza}</p>
                </div>

                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                    getStatusColors(selectedPlot.status).textClass
                  }`}
                >
                  {isBn ? selectedPlot.statusTitleBn : selectedPlot.statusTitleEn}
                </span>
              </div>

              {/* Cadastral Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold">{isBn ? 'খতিয়ান নং' : 'Khatian No.'}</span>
                  <p className="text-sm font-bold text-slate-800">{selectedPlot.khatian}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold">{isBn ? 'জমির পরিমাণ' : 'Plot Area'}</span>
                  <p className="text-sm font-bold text-slate-800">{selectedPlot.areaDecimals} {isBn ? 'শতক' : 'Decimals'}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 col-span-2">
                  <span className="text-[10px] text-slate-400 font-semibold">{isBn ? 'সার্কেল / রাজস্ব এলাকা' : 'Revenue Circle'}</span>
                  <p className="text-xs font-semibold text-slate-700">{selectedPlot.upazila}</p>
                </div>
              </div>

              {/* Status & Signal Notice */}
              <div className="rounded-xl border p-3.5 space-y-1.5 bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColors(selectedPlot.status).dot}`} />
                  <p className="text-xs font-bold text-slate-900">
                    {isBn ? 'প্রাথমিক তল্লাশি সংকেত' : 'Pre-Registration Signal'}
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn ? selectedPlot.detailsBn : selectedPlot.detailsEn}
                </p>
              </div>

              {/* Caution Callout */}
              <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-amber-50/60 border border-amber-200/60 rounded-lg p-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  {isBn
                    ? 'নকশার দাগ কেবল অবস্থান নির্দেশ করে। প্রকৃত স্বত্ব নিশ্চিত হতে সহকারী কমিশনার (ভূমি) অফিসের মাধ্যমে তদন্ত সম্পন্ন করুন।'
                    : 'Survey plot boundaries are demonstrative. Certified search at the Upazila Land Office is statutory.'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {selectedPlot.scenarioId ? (
                <button
                  onClick={() => {
                    closeCadastralMap();
                    navigate(`/citizen/requests/${selectedPlot.scenarioId}`);
                    showToast({
                      type: 'info',
                      title: isBn ? 'দৃশ্যপট ওপেন করা হয়েছে' : 'Scenario Opened',
                      message: isBn ? `দাগ ${selectedPlot.dagNumber}-এর আবেদন লোড হয়েছে` : `Request loaded for Dag ${selectedPlot.dagNumber}`,
                    });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isBn ? 'আবেদনের স্ট্যাটাস ও বিস্তারিত দেখুন' : 'View Request Details & Signals'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    closeCadastralMap();
                    navigate('/citizen/new-request');
                    showToast({
                      type: 'info',
                      title: isBn ? 'নতুন আবেদন ফরম' : 'New Request Form',
                      message: isBn ? `দাগ ${selectedPlot.dagNumber} দিয়ে অনুসন্ধান শুরু করুন` : `Inquire for plot ${selectedPlot.dagNumber}`,
                    });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>{isBn ? 'এই দাগের জন্য আবেদন করুন' : 'Submit Inquire for this Dag'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
