import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BANGLADESH_GEO_DATA } from '../../lib/mock-data/bangladeshGeo';
import { ParcelInputDetails } from '../../types';
import { Search, RotateCcw, MapPin, Sparkles, Loader2 } from 'lucide-react';

interface ParcelSearchFormProps {
  input: ParcelInputDetails;
  onChange: (field: keyof ParcelInputDetails, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  errors: Record<string, string>;
  isSearching: boolean;
  onSelectPreset: (presetId: string) => void;
}

export const ParcelSearchForm: React.FC<ParcelSearchFormProps> = ({
  input,
  onChange,
  onSubmit,
  onReset,
  errors,
  isSearching,
  onSelectPreset,
}) => {
  const { language } = useLanguage();

  const divisionData = BANGLADESH_GEO_DATA[input.division];
  const districtList = divisionData ? Object.keys(divisionData.districts) : [];
  const districtData = divisionData?.districts[input.district];
  const upazilaList = districtData ? Object.keys(districtData.upazilas) : [];
  const upazilaData = districtData?.upazilas[input.upazila];
  const mouzaList = upazilaData ? upazilaData.mouzas : [];

  const handleDivisionSelect = (divKey: string) => {
    onChange('division', divKey);
    const divObj = BANGLADESH_GEO_DATA[divKey];
    const firstDist = divObj ? Object.keys(divObj.districts)[0] : '';
    onChange('district', firstDist);
    const distObj = divObj?.districts[firstDist];
    const firstUpz = distObj ? Object.keys(distObj.upazilas)[0] : '';
    onChange('upazila', firstUpz);
    const upzObj = distObj?.upazilas[firstUpz];
    const firstMouza = upzObj && upzObj.mouzas[0] ? upzObj.mouzas[0].name : '';
    onChange('mouza', firstMouza);
  };

  const handleDistrictSelect = (distKey: string) => {
    onChange('district', distKey);
    const distObj = divisionData?.districts[distKey];
    const firstUpz = distObj ? Object.keys(distObj.upazilas)[0] : '';
    onChange('upazila', firstUpz);
    const upzObj = distObj?.upazilas[firstUpz];
    const firstMouza = upzObj && upzObj.mouzas[0] ? upzObj.mouzas[0].name : '';
    onChange('mouza', firstMouza);
  };

  const handleUpazilaSelect = (upzKey: string) => {
    onChange('upazila', upzKey);
    const upzObj = districtData?.upazilas[upzKey];
    const firstMouza = upzObj && upzObj.mouzas[0] ? upzObj.mouzas[0].name : '';
    onChange('mouza', firstMouza);
    if (upzObj && upzObj.mouzas[0]) {
      onChange('dagNumber', upzObj.mouzas[0].defaultDag || '');
      onChange('khatianNumber', upzObj.mouzas[0].defaultKhatian || '');
      onChange('jlNumber', upzObj.mouzas[0].jl || '');
    }
  };

  const handleMouzaSelect = (mouzaName: string) => {
    onChange('mouza', mouzaName);
    const matched = mouzaList.find((m) => m.name === mouzaName);
    if (matched) {
      if (matched.defaultDag) onChange('dagNumber', matched.defaultDag);
      if (matched.defaultKhatian) onChange('khatianNumber', matched.defaultKhatian);
      if (matched.jl) onChange('jlNumber', matched.jl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Demo Pre-fill Selector (8 Diverse Scenarios) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Sparkles className="w-4 h-4 text-gov-primary" />
            <span>{language === 'bn' ? 'নমুনা ডেটা দিয়ে দ্রুত ফর্ম পূরণ করুন (১-ক্লিক):' : 'Pre-fill with Sample Scenarios (1-Click):'}</span>
          </div>
          <span className="text-[11px] text-slate-400">৮টি ভিন্ন নমুনা</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-001')}
            className="text-left p-2 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-amber-900">১. সাম্প্রতিক দলিল</div>
            <div className="text-[10px] text-amber-800 truncate">তেজগাঁও • দাগ ৪০২</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-002')}
            className="text-left p-2 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-blue-900">২. আবেদন চলমান</div>
            <div className="text-[10px] text-blue-800 truncate">ধানমন্ডি • দাগ ১১৮</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-003')}
            className="text-left p-2 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-emerald-900">৩. নামজারি সম্পন্ন</div>
            <div className="text-[10px] text-emerald-800 truncate">গুলশান • দাগ ৮৫</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-004')}
            className="text-left p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-rose-900">৪. জরিপ দ্বৈততা</div>
            <div className="text-[10px] text-rose-800 truncate">আমিনবাজার • দাগ ৯৯৯</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-005')}
            className="text-left p-2 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-purple-900">৫. ব্যাংক মর্টগেজ</div>
            <div className="text-[10px] text-purple-800 truncate">চট্টগ্রাম • দাগ ২১০</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-006')}
            className="text-left p-2 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-amber-900">৬. শ্রেণি অমিল</div>
            <div className="text-[10px] text-amber-800 truncate">গাজীপুর • দাগ ২০১</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-007')}
            className="text-left p-2 rounded-lg border border-orange-200 bg-orange-50/50 hover:bg-orange-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-orange-900">৭. শরিকি আপত্তি</div>
            <div className="text-[10px] text-orange-800 truncate">সিলেট • দাগ ৬৪</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('DEMO-PARCEL-008')}
            className="text-left p-2 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-emerald-900">৮. নিখুঁত রেকর্ড</div>
            <div className="text-[10px] text-emerald-800 truncate">মিরপুর • দাগ ৩০৪</div>
          </button>
        </div>
      </div>

      {/* Main Search Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gov-primary" />
            <h2 className="text-base font-bold text-slate-900">
              {language === 'bn' ? 'জমির পরিচিতি তথ্য প্রবেশ করান' : 'Land Search & Parcel Identifiers'}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {language === 'bn' ? '*চিহ্নিত ক্ষেত্রগুলো আবশ্যক' : '*Required fields'}
          </span>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Division */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'বিভাগ (Division) *' : 'Division *'}
              </label>
              <select
                value={input.division}
                onChange={(e) => handleDivisionSelect(e.target.value)}
                className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                  errors.division ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              >
                {Object.keys(BANGLADESH_GEO_DATA).map((divKey) => (
                  <option key={divKey} value={divKey}>
                    {language === 'bn' ? BANGLADESH_GEO_DATA[divKey].bengali : divKey}
                  </option>
                ))}
              </select>
              {errors.division && <p className="text-[11px] text-rose-600 mt-1">{errors.division}</p>}
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'জেলা (District) *' : 'District *'}
              </label>
              <select
                value={input.district}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                  errors.district ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              >
                {districtList.map((distKey) => (
                  <option key={distKey} value={distKey}>
                    {language === 'bn' && divisionData?.districts[distKey]?.bengali
                      ? divisionData.districts[distKey].bengali
                      : distKey}
                  </option>
                ))}
              </select>
              {errors.district && <p className="text-[11px] text-rose-600 mt-1">{errors.district}</p>}
            </div>

            {/* Upazila / Thana */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'উপজেলা / থানা (Upazila/Thana) *' : 'Upazila / Thana *'}
              </label>
              <select
                value={input.upazila}
                onChange={(e) => handleUpazilaSelect(e.target.value)}
                className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                  errors.upazila ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              >
                {upazilaList.map((upzKey) => (
                  <option key={upzKey} value={upzKey}>
                    {language === 'bn' && districtData?.upazilas[upzKey]?.bengali
                      ? districtData.upazilas[upzKey].bengali
                      : upzKey}
                  </option>
                ))}
              </select>
              {errors.upazila && <p className="text-[11px] text-rose-600 mt-1">{errors.upazila}</p>}
            </div>

            {/* Mouza */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'মৌজা (Mouza) *' : 'Mouza *'}
              </label>
              {mouzaList.length > 0 ? (
                <select
                  value={input.mouza}
                  onChange={(e) => handleMouzaSelect(e.target.value)}
                  className={`w-full text-xs rounded-lg border p-2.5 bg-white ${
                    errors.mouza ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                >
                  <option value="">{language === 'bn' ? '-- মৌজা নির্বাচন করুন --' : '-- Select Mouza --'}</option>
                  {mouzaList.map((m) => (
                    <option key={m.name} value={m.name}>
                      {language === 'bn' ? m.bengali : m.name} (JL {m.jl})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={input.mouza}
                  onChange={(e) => onChange('mouza', e.target.value)}
                  placeholder="e.g. Tejgaon I/A"
                  className={`w-full text-xs rounded-lg border p-2.5 ${
                    errors.mouza ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
              )}
              {errors.mouza && <p className="text-[11px] text-rose-600 mt-1">{errors.mouza}</p>}
            </div>

            {/* JL Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'জে.এল. নম্বর (JL No) — ঐচ্ছিক' : 'JL Number (Optional)'}
              </label>
              <input
                type="text"
                value={input.jlNumber || ''}
                onChange={(e) => onChange('jlNumber', e.target.value)}
                placeholder="e.g. 14, 08, 05"
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
              />
            </div>

            {/* Khatian Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'খতিয়ান নম্বর (Khatian No)' : 'Khatian Number'}
              </label>
              <input
                type="text"
                value={input.khatianNumber || ''}
                onChange={(e) => onChange('khatianNumber', e.target.value)}
                placeholder="e.g. 1204, 541, 991"
                className={`w-full text-xs rounded-lg border p-2.5 ${
                  errors.khatianNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              />
              {errors.khatianNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.khatianNumber}</p>}
            </div>

            {/* Dag / Plot Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'দাগ নম্বর (Dag / Plot No) *' : 'Dag / Plot Number *'}
              </label>
              <input
                type="text"
                value={input.dagNumber}
                onChange={(e) => onChange('dagNumber', e.target.value)}
                placeholder="e.g. 402, 118, 85, 999"
                className={`w-full text-xs rounded-lg border p-2.5 ${
                  errors.dagNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                }`}
              />
              {errors.dagNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.dagNumber}</p>}
            </div>

            {/* Land Area (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'জমির পরিমাণ (Area Decimal) — ঐচ্ছিক' : 'Land Area (Optional)'}
              </label>
              <input
                type="text"
                value={input.area || ''}
                onChange={(e) => onChange('area', e.target.value)}
                placeholder="e.g. 5.25"
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
              />
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onReset}
              className="btn-secondary text-xs px-4 py-2 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফর্ম রিসেট' : 'Clear Form'}</span>
            </button>

            <button
              type="submit"
              disabled={isSearching}
              className="btn-primary text-xs px-6 py-2.5 font-bold cursor-pointer disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Processing Search...'}</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{language === 'bn' ? 'জমি অনুসন্ধান ও যাচাই করুন' : 'Search & Verify Parcel'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
