import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { CheckCircle2, Activity, ShieldAlert } from 'lucide-react';

export const DataSourceHealthPage: React.FC = () => {
  const { parcels } = useApp();
  const { language } = useLanguage();

  const totalEvents = parcels.reduce((acc, p) => acc + p.events.length, 0);

  const sources = [
    {
      id: 'SRC-SUBREG',
      name:
        language === 'bn'
          ? 'নমুনা সাব-রেজিস্ট্রি দলিল সম্পাদন ফিড'
          : 'Mock Sub-Registry Deed Execution Feed',
      jurisdiction:
        language === 'bn'
          ? 'তেজগাঁও, ধানমন্ডি, গুলশান, সাভার যুগ্ম সাব-রেজিস্ট্রি অফিস'
          : 'Tejgaon, Dhanmondi, Gulshan, Savar Joint Sub-Registry Offices',
      status: language === 'bn' ? 'সক্রিয় (সিমুলেটেড)' : 'Active (Simulated)',
      latencyMs: '42ms',
      lastSync: language === 'bn' ? '১০ মিনিট পূর্বে' : '10 mins ago',
      recordsCount: totalEvents,
      protocol: 'Secure Local Mock Stream',
    },
    {
      id: 'SRC-MUTATION',
      name:
        language === 'bn'
          ? 'নমুনা ই-নামজারি শুনানি ও মঞ্জুরি ফিড'
          : 'Mock e-Mutation Hearing & Sanction Feed',
      jurisdiction:
        language === 'bn'
          ? 'সহকারী কমিশনার (ভূমি) কেন্দ্রীয় রাজস্ব পোর্টাল'
          : 'AC (Land) Central Revenue Portal',
      status: language === 'bn' ? 'সক্রিয় (সিমুলেটেড)' : 'Active (Simulated)',
      latencyMs: '38ms',
      lastSync: language === 'bn' ? '১৫ মিনিট পূর্বে' : '15 mins ago',
      recordsCount: totalEvents,
      protocol: 'Simulated REST Gateway',
    },
    {
      id: 'SRC-LTNOTICE',
      name:
        language === 'bn'
          ? 'নমুনা ধারা ৮৯ এলটি নোটিশ গেটওয়ে'
          : 'Mock Section 89 LT Notice Gateway',
      jurisdiction:
        language === 'bn'
          ? 'রাষ্ট্রীয় অধিগ্রহণ আইনের ৮৯ ধারা নোটিশ প্রেরণ কিউ'
          : 'SAT Act Section 89 Dispatch Queue',
      status: language === 'bn' ? 'সক্রিয় (সিমুলেটেড)' : 'Active (Simulated)',
      latencyMs: '61ms',
      lastSync: language === 'bn' ? '২২ মিনিট পূর্বে' : '22 mins ago',
      recordsCount: totalEvents,
      protocol: 'Simulated EDI Stream',
    },
    {
      id: 'SRC-DLRS',
      name:
        language === 'bn'
          ? 'নমুনা ডিএলআরএস নকশা ও পরচা রেজিস্ট্রি'
          : 'Mock DLRS Cadastral Map & Porcha Registry',
      jurisdiction:
        language === 'bn'
          ? 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (সিটি জরিপ / আরএস / সিএস)'
          : 'Directorate of Land Records and Surveys (City Survey/RS/CS/SA)',
      status: language === 'bn' ? 'সক্রিয় (সিমুলেটেড)' : 'Active (Simulated)',
      latencyMs: '55ms',
      lastSync: language === 'bn' ? '৩০ মিনিট পূর্বে' : '30 mins ago',
      recordsCount: parcels.length,
      protocol: 'Cadastral Mock Cache',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn'
                ? 'সিমুলেটেড ফিড পর্যবেক্ষণ ও ডেটা স্বাস্থ্য'
                : 'Simulated Feed Health & Synchronization'}
            </h1>
            <DemoDataTag type="simulated_source" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'মূল্যায়নের সুবিধার্থে সিমুলেটেড লেটেন্সি, উৎসের স্থিতি এবং সংযোগ মনিটরিং।'
              : 'Monitoring simulated latency, source freshness, and connection uptime for hackathon evaluation.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span className="font-semibold">
            {language === 'bn' ? 'মক ফিডসমূহ সিঙ্ক্রোনাইজড' : 'Mock Feeds Synchronized'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src) => (
          <div
            key={src.id}
            className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                  {src.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{src.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{src.jurisdiction}</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {src.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {language === 'bn' ? 'সিমুলেটেড লেটেন্সি' : 'Simulated Latency'}
                </span>
                <span className="font-mono font-semibold text-slate-800">{src.latencyMs}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {language === 'bn' ? 'সর্বশেষ হার্টবিট' : 'Last Heartbeat'}
                </span>
                <span className="text-slate-700 font-medium">{src.lastSync}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {language === 'bn' ? 'মক ক্যাশ' : 'Mock Cache'}
                </span>
                <span className="font-semibold text-slate-800">
                  {src.recordsCount} {language === 'bn' ? 'টি আইটেম' : 'items'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Protocol: {src.protocol}</span>
              <DemoDataTag type="demo_data" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 space-y-1">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-slate-600" />
          {language === 'bn' ? 'মূল্যায়নকারীদের জন্য প্রযুক্তিগত স্থাপত্য নোট' : 'Technical Architecture Note for Evaluators'}
        </span>
        <p className="leading-relaxed">
          {language === 'bn'
            ? 'ভূমি মন্ত্রণালয় ও রেজিস্ট্রি অধিদপ্তরের বাস্তব রূপায়নে এই ফিডগুলো বাংলাদেশ ন্যাশনাল ডিজিটাল আর্কিটেকচার (বিএনডিএ) মানসম্পন্ন সরকারি নিরাপদ এপিআই গেটওয়ের মাধ্যমে পরিচালিত হবে।'
            : 'In a production deployment under the Ministry of Land and Registration Automation Project, these feeds would connect via national secure governmental API gateways adhering to Bangladesh National Digital Architecture (BNDA) standards.'}
        </p>
      </div>
    </div>
  );
};
