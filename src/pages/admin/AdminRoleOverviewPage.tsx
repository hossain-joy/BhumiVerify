import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import { formatBDT } from '../../lib/utils';
import {
  Shield,
  Users,
  Settings2,
  Database,
  Activity,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const AdminRoleOverviewPage: React.FC = () => {
  const { currentRole, setRole, requests, parcels, auditEvents, settings } = useApp();
  const { language } = useLanguage();

  const totalRequests = requests.length;
  const approved = requests.filter(
    (r) =>
      r.status === 'approved' ||
      r.status === 'limited_approved' ||
      r.status === 'access_active' ||
      r.status === 'payment_pending'
  ).length;
  const rejected = requests.filter((r) => r.status === 'rejected').length;
  const activeSessions = requests.filter((r) => r.status === 'access_active').length;
  const totalPaid = requests.reduce(
    (acc, r) => acc + (r.payment?.status === 'success' ? r.payment.amountBdt : 0),
    0
  );

  const rolesMatrix = [
    {
      role: language === 'bn' ? 'নাগরিক / ক্রেতা' : 'Citizen / Buyer',
      id: 'citizen',
      desc:
        language === 'bn'
          ? 'জমির সম্ভাব্য ক্রেতা বা তাদের ক্ষমতাপ্রাপ্ত প্রতিনিধি যারা রেজিস্ট্রেশন-পূর্ব ঝুঁকি ও লেনদেন সংকেত যাচাই করতে চান।'
          : 'Prospective buyers or legal representatives requesting pre-registration transaction checks.',
      permissions:
        language === 'bn'
          ? [
              'ডেমো জাতীয় পরিচয়পত্র যাচাই (DEMO-NID-0001)',
              'বৈধ ক্রয়ের উদ্দেশ্য ঘোষণা করে নির্দিষ্ট প্লটের তথ্য আবেদন',
              'কর্মকর্তার স্পষ্টীকরণ নোটিশের উত্তর প্রদান',
              'মোবাইল ব্যাংকিং (বিকাশ, নগদ) বা কার্ডের মাধ্যমে ডেমো ফি প্রদান',
              'অনুমোদিত লেনদেন সংকেত ও কালানুক্রমিক টাইমলাইন পরিদর্শন',
            ]
          : [
              'Simulate identity verification (DEMO-NID-0001)',
              'Submit cadastral parcel inquiry with legitimate interest',
              'Respond to reviewer clarification notices',
              'Simulate mobile wallet, card, or bank fee payment',
              'View approved transaction signals and chronological timeline',
            ],
      restrictions:
        language === 'bn'
          ? [
              'নিজের বা অপরের আবেদন নিজ দায়িত্বে অনুমোদন করতে পারেন না',
              'অননুমোদিত বা অপরীক্ষিত কাঁচা ডেটাবেস অনুসন্ধান নিষিদ্ধ',
              'কর্মকর্তার অনুমোদন ও ফি প্রদান ছাড়া তথ্য দেখা অসম্ভব',
            ]
          : [
              'Cannot approve own or other requests',
              'Cannot query raw unvetted feeds',
              'Cannot access signals without approval and payment',
            ],
    },
    {
      role: language === 'bn' ? 'অফিসিয়াল রিভিউয়ার' : 'Official Reviewer',
      id: 'reviewer',
      desc:
        language === 'bn'
          ? 'সহকারী কমিশনার (ভূমি) এবং সাব-রেজিস্ট্রার কার্যালয়ের দায়িত্বপ্রাপ্ত কর্মকর্তা যারা আবেদনের ন্যায্যতা নিরীক্ষা করেন।'
          : 'Assistant Commissioner (Land) & Joint Sub-Registry Compliance Officers.',
      permissions:
        language === 'bn'
          ? [
              'নাগরিকের পরিচয় ও ক্রয়ের উদ্দেশ্য যাচাই',
              'মৌজা ম্যাপ ও খতিয়ানের সাথে দাগের মিলের নির্ভরযোগ্যতা নিরীক্ষা',
              'আবেদন নিষ্পত্তি: অনুমোদন, সীমিত অনুমোদন, স্পষ্টীকরণ তলব, বাতিল',
              'তথ্য প্রকাশের সুনির্দিষ্ট ক্যাটাগরি ও সময়সীমা নির্ধারণ',
              'অফিসিয়াল সিদ্ধান্তের আর্কাইভ ও ঐতিহাসিক রেকর্ড পর্যবেক্ষণ',
            ]
          : [
              'Inspect citizen standing and legitimate purpose',
              'Evaluate cadastral match confidence against survey maps',
              'Adjudicate requests: Approve, Limited Scope, More Info, Reject',
              'Set custom disclosure categories and validity duration',
              'View full historical determination archive',
            ],
      restrictions:
        language === 'bn'
          ? [
              'লিখিত কারণ বা পর্যবেক্ষণ উল্লেখ ছাড়া আবেদন বাতিল করতে পারেন না',
              'বাস্তব আর্থিক লেনদেন সম্পন্ন করতে পারেন না',
            ]
          : [
              'Cannot bypass mandatory written reasoning for rejections',
              'Cannot execute real financial fee transactions',
            ],
    },
    {
      role: language === 'bn' ? 'কমপ্লায়েন্স অডিটর' : 'Compliance Auditor',
      id: 'auditor',
      desc:
        language === 'bn'
          ? 'ভূমি মন্ত্রণালয় ও নিবন্ধন অধিদপ্তরের স্বাধীন তদারকি কর্মকর্তা ও অডিটর।'
          : 'Independent Directorate of Registration & Ministry of Land oversight inspectors.',
      permissions:
        language === 'bn'
          ? [
              'অপরিবর্তনীয় ও সিলমোহরকৃত অডিট ট্রেইল পর্যবেক্ষণ',
              'কর্তা, অ্যাকশন টাইপ, আবেদন আইডি ও তারিখ অনুযায়ী ফিল্টার',
              'অডিট লগ JSON অথবা স্ট্রাকচার্ড ফরম্যাটে এক্সপোর্ট',
              'সিমুলেটেড ডেটা সোর্সের লেটেন্সি ও হার্টবিট মনিটরিং',
              'নিয়ন্ত্রিত তথ্য প্রকাশের টোকেন ও মেয়াদোত্তীর্ণতার লাইফসাইকেল নিরীক্ষা',
            ]
          : [
              'View cryptographically sealed immutable audit log',
              'Filter audit events by actor, action type, request ID, date',
              'Export audit log as JSON or structured records',
              'Monitor simulated feed latency and heartbeat timestamps',
              'Inspect controlled token lifecycle and revocation state',
            ],
      restrictions:
        language === 'bn'
          ? [
              'পূর্ববর্তী কোনো অডিট রেকর্ড পরিবর্তন বা মুছে ফেলতে পারেন না',
              'কোনো আবেদনের বিচার বা নতুন আবেদন তৈরি করতে পারেন না',
            ]
          : [
              'Cannot alter past audit entries',
              'Cannot adjudicate or create requests',
            ],
    },
    {
      role: language === 'bn' ? 'সিস্টেম অ্যাডমিন' : 'System Administrator',
      id: 'admin',
      desc:
        language === 'bn'
          ? 'হ্যাকাথন মূল্যায়ন ও প্ল্যাটফর্মের কারিগরি পলিসি নিয়ন্ত্রণকারী।'
          : 'Technical policy controller for hackathon evaluation and demonstration settings.',
      permissions:
        language === 'bn'
          ? [
              'সিমুলেটেড সেবা ফি কার্যকর বা নিষ্ক্রিয়করণ',
              'বাংলাদেশি টাকায় (৳) ফি-এর পরিমাণ নির্ধারণ',
              'রিভিউ এসএলএ সময়সীমা ও টোকেন মেয়াদের ঘন্টা সামঞ্জস্যকরণ',
              'ডেমো ডেটা রিসেট ও ৪টি মূল দৃশ্যপট পুনঃস্থাপন',
              'লোকাল ক্যাশ সাইজ ও সিমুলেটেড সার্ভিসের স্বাস্থ্য পর্যবেক্ষণ',
            ]
          : [
              'Toggle simulated access fee requirement',
              'Configure fee amount in BDT (৳)',
              'Adjust review SLA target hours and token validity window',
              'Reset demo state and reseed scenario records',
              'Monitor local cache size and simulated service status',
            ],
      restrictions:
        language === 'bn'
          ? ['সকল সেটিংস শুধুমাত্র ব্রাউজার স্যান্ডবক্স ডেমো কনফিগারেশন']
          : ['Settings are sandbox demo configurations only'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn'
                ? 'সিস্টেম প্রশাসন ও ভূমিকা সুশাসন ম্যাট্রিক্স'
                : 'System Administration & Role Governance Matrix'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সিমুলেটেড রোল-বেসড অ্যাক্সেস কন্ট্রোল (RBAC), অপারেশনাল কেপিআই এবং প্ল্যাটফর্ম তদারকি।'
              : 'Simulated role-based access control (RBAC), operational KPIs, and platform oversight.'}
          </p>
        </div>

        <Link
          to="/admin/settings"
          className="px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Settings2 className="w-4 h-4" />
          {language === 'bn' ? 'এসএলএ ও ফি পলিসি কনফিগার করুন' : 'Configure SLA & Fee Policy'}
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'মোট আবেদন' : 'Total Requests'}
          </span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">{totalRequests}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-emerald-700 block text-[11px]">
            {language === 'bn' ? 'অনুমোদিত' : 'Approved Requests'}
          </span>
          <span className="text-lg font-bold text-emerald-800 mt-0.5 block">{approved}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-rose-700 block text-[11px]">
            {language === 'bn' ? 'বাতিলকৃত' : 'Rejected'}
          </span>
          <span className="text-lg font-bold text-rose-800 mt-0.5 block">{rejected}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-teal-700 block text-[11px]">
            {language === 'bn' ? 'সক্রিয় সেশন' : 'Active Sessions'}
          </span>
          <span className="text-lg font-bold text-teal-800 mt-0.5 block">{activeSessions}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-500 block text-[11px]">
            {language === 'bn' ? 'অডিট লগ এন্ট্রি' : 'Audit Logs'}
          </span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">{auditEvents.length}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-400 block text-[11px]">
            {language === 'bn' ? 'ডেমো ফি সংগ্রহ' : 'Demo Fees BDT'}
          </span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">{formatBDT(totalPaid)}</span>
        </div>
      </div>

      {/* Roles & Permissions Matrix */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-gov-primary" />
          {language === 'bn'
            ? 'সিমুলেটেড ভূমিকা, অনুমতি ও প্রাতিষ্ঠানিক সীমাবদ্ধতা'
            : 'Simulated Persona Capabilities & Governance Rules'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {rolesMatrix.map((item) => {
            const isCurrent = currentRole === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-lg border p-5 shadow-2xs space-y-3.5 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-gov-primary ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900">{item.role}</span>
                    {isCurrent ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-gov-primary text-white">
                        {language === 'bn' ? 'বর্তমান সক্রিয় রোল' : 'ACTIVE DEMO ROLE'}
                      </span>
                    ) : (
                      <button
                        onClick={() => setRole(item.id as any)}
                        className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-100 hover:bg-gov-primary hover:text-white text-slate-700 border border-slate-300 transition-colors"
                      >
                        {language === 'bn' ? 'এই রোলে স্যুইচ করুন →' : 'Switch to Role →'}
                      </button>
                    )}
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="font-semibold text-emerald-800 text-[11px] block mb-1.5">
                        {language === 'bn' ? 'অনুমোদিত সুবিধাসমূহ:' : 'Permitted Capabilities:'}
                      </span>
                      <ul className="space-y-1.5 text-slate-700 text-[11px]">
                        {item.permissions.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100">
                      <span className="font-semibold text-rose-800 text-[11px] block mb-1.5">
                        {language === 'bn'
                          ? 'বাধ্যতামূলক প্রাতিষ্ঠানিক সীমাবদ্ধতা:'
                          : 'Enforced Architectural Boundaries:'}
                      </span>
                      <ul className="space-y-1.5 text-slate-500 text-[11px]">
                        {item.restrictions.map((r, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
