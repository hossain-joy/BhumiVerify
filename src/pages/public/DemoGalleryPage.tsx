import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PARCELS } from '../../data/mockParcels';
import { Disclaimer } from '../../components/common/Disclaimer';
import { useLanguage } from '../../context/LanguageContext';
import { formatStatusLabel, toBengaliNumerals } from '../../utils/formatStatus';
import {
  FileSearch,
  ArrowRight,
  ShieldAlert,
  Search,
} from 'lucide-react';

export const DemoGalleryPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const getBadgeStyle = (statusKey: string) => {
    switch (statusKey) {
      case 'no_major_issue':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      case 'review_recommended':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'information_incomplete':
      default:
        return 'bg-blue-50 text-blue-900 border-blue-300';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16 animate-fade-up">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-gov-primary border border-emerald-200 text-xs font-semibold">
          <FileSearch className="w-3.5 h-3.5" />
          <span>{isBn ? 'কেস স্টাডি ও প্রতিবেদন গ্যালারি' : 'Case Studies & Report Gallery'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'বাস্তব জমি যাচাই প্রতিবেদনসমূহ' : 'Land Verification Reports'}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isBn
            ? 'বিভিন্ন পরিস্থিতি ও রেকর্ডের জমি প্রতিবেদন ঘুরে দেখুন। প্রতিটিতে খতিয়ান-দাগের মিল, পর্যালোচনা এবং করণীয় ধাপ প্রদর্শিত হয়েছে।'
            : 'Explore standard parcel assessment scenarios demonstrating distinct diligence findings, matching outcomes, and action steps.'}
        </p>
      </div>



      {/* Grid of Recorded Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PARCELS.map((p) => {
          const badgeClass = getBadgeStyle(p.statusKey);
          const statusText = formatStatusLabel(p.statusKey, isBn);

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                    {statusText}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    {p.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {p.mouza}, {p.upazila}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {p.district}, {p.division}
                  </p>
                </div>

                {/* Identifiers Badge List */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-700 font-mono">
                  <div>
                    <span className="block text-[9px] text-slate-400 font-sans uppercase">
                      {isBn ? 'খতিয়ান' : 'Khatian'}
                    </span>
                    <span className="font-bold">{toBengaliNumerals(p.khatianNumber, isBn)}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-sans uppercase">
                      {isBn ? 'দাগ নম্বর' : 'Dag (Plot)'}
                    </span>
                    <span className="font-bold">{toBengaliNumerals(p.dagNumber, isBn)}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-sans uppercase">
                      {isBn ? 'জেএল নং' : 'JL No'}
                    </span>
                    <span>{toBengaliNumerals(p.jlNumber || (isBn ? 'প্রযোজ্য নয়' : 'N/A'), isBn)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn && p.statusExplanationBn ? p.statusExplanationBn : p.statusExplanation}
                </p>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                  <span>
                    {toBengaliNumerals(p.events.length, isBn)} {isBn ? 'টি নথিবদ্ধ ঘটনা' : 'Recorded Event(s)'}
                  </span>
                  <span>
                    {toBengaliNumerals(p.findings.length, isBn)} {isBn ? 'টি পর্যবেক্ষণ' : 'Finding(s)'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/results?id=${p.id}`}
                  className="w-full btn-secondary py-2 px-3 text-xs font-bold text-gov-primary hover:bg-emerald-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{isBn ? 'সম্পূর্ণ প্রতিবেদন দেখুন' : 'Open Full Report'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom check CTA */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          {isBn ? 'নিজের মতো করে খতিয়ান ও দাগ দিয়ে যাচাই করতে চান?' : 'Want to verify specific parcel identifiers?'}
        </h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
          {isBn
            ? 'জমি যাচাই ফর্মে আপনার বিভাগ, জেলা, মৌজা, খতিয়ান ও দাগ নম্বর প্রবেশ করিয়ে তাৎক্ষণিক ফলাফল যাচাই করুন।'
            : 'Verify land records by entering your division, district, mouza, khatian, and dag numbers into the land verification form.'}
        </p>
        <Link
          to="/check-land"
          className="btn-primary py-2.5 px-6 font-bold text-xs inline-flex items-center gap-2"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isBn ? 'জমি যাচাই ফর্মে যান' : 'Launch Land Check Form'}</span>
        </Link>
      </div>
    </div>
  );
};
