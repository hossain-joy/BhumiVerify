import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PARCELS, FictionalParcelRecord } from '../../data/mockParcels';
import { ArrowLeft, Layers, Code, CheckCircle, Search, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import { Disclaimer } from '../../components/common/Disclaimer';

export const AdminDemoRecordsPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [selectedParcel, setSelectedParcel] = useState<FictionalParcelRecord>(
    MOCK_PARCELS[0]
  );
  const [search, setSearch] = useState('');

  const filtered = MOCK_PARCELS.filter(
    (p) =>
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.mouza.toLowerCase().includes(search.toLowerCase()) ||
      p.khatianNumber.includes(search) ||
      p.dagNumber.includes(search)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'অ্যাডমিন কনসোলে ফিরে যান' : 'Back to Admin Console'}</span>
        </Link>
        <span className="text-xs text-slate-500 font-mono">
          {isBn ? 'মোট সংরক্ষিত রেকর্ড:' : 'Total Parcel Records:'} {toBengaliNumerals(MOCK_PARCELS.length, isBn)}
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {isBn ? 'জমি রেকর্ড পরিদর্শন' : 'Manage Parcel Records'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'যৌথ খতিয়ান-দাগ অবজেক্ট, প্রান্তিক জটিলতা এবং ঘটনার বিবরণ পরিদর্শন করুন।'
            : 'Inspect normalized composite parcel objects, edge cases, and transaction event payloads.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: List of fixtures */}
        <div className="space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? 'আইডি, মৌজা, দাগ দিয়ে খুঁজুন...' : 'Search records by ID, Mouza, Dag...'}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary"
          />

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((parcel) => {
              const isSelected = selectedParcel.id === parcel.id;
              return (
                <div
                  key={parcel.id}
                  onClick={() => setSelectedParcel(parcel)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-gov-primary text-slate-900 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold">{parcel.id}</span>
                    <span className="text-[10px] text-slate-400">
                      {toBengaliNumerals(parcel.events.length, isBn)} {isBn ? 'টি ঘটনা' : 'events'}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {parcel.mouza}, {parcel.upazila}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isBn ? 'দাগ:' : 'Dag:'} {toBengaliNumerals(parcel.dagNumber, isBn)} • {isBn ? 'খতিয়ান:' : 'Khatian:'} {toBengaliNumerals(parcel.khatianNumber, isBn)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: JSON Inspection & Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {isBn ? 'নির্বাচিত ফিক্সচার' : 'Selected Fixture'}
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  {selectedParcel.id} — {selectedParcel.mouza} ({selectedParcel.statusKey})
                </h2>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-mono text-slate-600">
                {(isBn && selectedParcel.landClassificationBn ? selectedParcel.landClassificationBn : selectedParcel.landClassification) || (isBn ? 'শ্রেণি অনির্ধারিত' : 'Classification Unspecified')}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase">
                {isBn ? 'পর্যালোচনার সারাংশ:' : 'Status Explanation:'}
              </h3>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                {isBn && selectedParcel.statusExplanationBn ? selectedParcel.statusExplanationBn : selectedParcel.statusExplanation}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-gov-primary" />
                  <span>{isBn ? 'মূল ফিক্সচার পেলোড (JSON)' : 'Raw Fixture Payload'}</span>
                </h3>
              </div>
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-96">
                {JSON.stringify(selectedParcel, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <Disclaimer compact={false} />
    </div>
  );
};
