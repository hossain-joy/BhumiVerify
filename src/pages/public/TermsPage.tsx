import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, AlertOctagon, FileCheck, ShieldAlert, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Disclaimer } from '../../components/common/Disclaimer';

export const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-gov-primary" />
          <span>{isBn ? 'আইনি চুক্তি ও ব্যবহারের সীমাবদ্ধতা' : 'Legal Agreement & Due Diligence Boundaries'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isBn ? 'ব্যবহারের শর্তাবলী ও সংবিধিবদ্ধ দায়মুক্তি' : 'Terms of Use & Statutory Disclaimers'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn ? 'সর্বশেষ সংস্করণ: মার্চ ২০২৬ • পণ্য: ভূমিভেরিফাই ("Verify Before You Buy")' : 'Last revised: March 2026 • Product: BhumiVerify ("Verify Before You Buy")'}
        </p>
      </div>

      {/* Critical Limitation Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertOctagon className="w-5 h-5 text-amber-700 shrink-0" />
          <span>{isBn ? 'জরুরি আইনি সতর্কতা' : 'Legal Diligence Boundary'}</span>
        </div>
        <p className="leading-relaxed">
          {isBn ? (
            <>
              ভূমিভেরিফাই একটি স্বতন্ত্র নাগরিক তথ্য যাচাই প্ল্যাটফর্ম।{' '}
              <strong>এটি কোনো টাইটেল ইন্স্যুরেন্স, সরকারি রেকর্ড রুম বা আদালতের চূড়ান্ত রায় নয়।</strong>{' '}
              কোনো অনুসন্ধানে বড় অসঙ্গতি না পাওয়ার অর্থ এই নয় যে জমিটি গোপন মামলা, পারিবারিক বিরোধ, বন্ধকি দায় বা ভুয়া দলিল থেকে সম্পূর্ণ মুক্ত।
            </>
          ) : (
            <>
              BhumiVerify is an independent land due diligence platform.{' '}
              <strong>It is NOT a title insurance policy, a certified government record room, or court decree.</strong>{' '}
              A clean result does NOT guarantee that any parcel is free from unrecorded disputes, inherited claims, or mortgage charges.
            </>
          )}
        </p>
      </div>

      {/* Terms Body */}
      <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '১. সেবার পরিধি ও অনুমোদিত ব্যবহার' : '1. Scope of Service & Permitted Use'}</span>
          </h2>
          <p>
            {isBn
              ? 'ভূমিভেরিফাই ক্রেতাদের জমি সংক্রান্ত তথ্য গোছাতে, লেনদেনের কালানুক্রমিক ইতিহাস বুঝতে এবং ব্যক্তিগত যাচাই চেকলিস্ট তৈরি করতে সহায়তা করে।'
              : 'BhumiVerify provides a structured framework for land buyers to organize parcel identifiers, review recorded event progressions, and generate personal verification checklists.'}
          </p>
          <p>
            {isBn
              ? 'আপনি সম্মতি দিচ্ছেন যে এই প্ল্যাটফর্মটি একটি প্রাথমিক যাচাই হাতিয়ার হিসেবে ব্যবহৃত হবে এবং জমি রেজিস্ট্রি বা বায়নার টাকা পরিশোধের পূর্বে সশরীরে ও আইনজীবীর মাধ্যমে নিশ্চিত হতে হবে।'
              : 'You agree to use this platform as a pre-screening tool and conduct full in-person and legal verification before executing sale deeds or disbursing monies.'}
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>{isBn ? '২. তথ্যের অনুপস্থিতি নিরাপত্তার প্রমাণ নয়' : '2. Absence of Data is Not Evidence of Safety'}</span>
          </h2>
          <p>
            {isBn
              ? 'বাংলাদেশের ভূমি ব্যবস্থাপনায় মূল দলিল, বায়া দলিল, নামজারি রেকর্ড ও নিরঙ্কুশ দখলের ধারাবাহিকতার মাধ্যমে স্বত্ব প্রতিষ্ঠিত হয়। "উপলব্ধ তথ্যে কোনো বড় অসঙ্গতি মেলেনি" মানে কেবল এটাই যে উপলব্ধ রেকর্ডে কোনো দ্বৈত এন্ট্রি পাওয়া যায়নি।'
              : 'Under Bangladesh land administration, title is formed by physical continuity of title deeds, mutation records, and unencumbered possession. A "No Major Issue Detected in Available Data" outcome indicates that within available records, no conflicting entries were registered.'}
          </p>
          <p className="font-semibold text-slate-900">
            {isBn
              ? 'কোনো তথ্য না পাওয়া বা ফাঁকা টাইমলাইনকে কখনোই জমি সম্পূর্ণ ঝুঁকিমুক্ত বলে ধরে নেওয়া যাবে না।'
              : 'A no-match or empty timeline must never be interpreted as proof that a parcel has clear title or is safe to buy.'}
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '৩. আইনি বা পেশাদার মতামতের বিকল্প নয়' : '3. No Legal or Professional Opinion'}</span>
          </h2>
          <p>
            {isBn
              ? 'ভূমিভেরিফাই প্রদত্ত তথ্য কোনো আইনি পরামর্শ, সার্ভে সার্টিফিকেট বা কর বিষয়ক পরামর্শ নয়। জমি কেনার আগে আপনাকে অবশ্যই বাংলাদেশ বার কাউন্সিলের তালিকাভুক্ত একজন অভিজ্ঞ আইনজীবী এবং একজন দক্ষ সার্ভেয়ার (আমিন) দিয়ে সরেজমিনে দলিল ও সীমানা যাচাই করাতে হবে।'
              : 'Information provided by BhumiVerify does not constitute legal counsel, cadastral survey certification, or tax advice. You must independently retain a certified advocate enrolled with the Bangladesh Bar Council and a licensed land surveyor (Ameen) to conduct physical title vetting and boundary demarcation before purchasing property.'}
          </p>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gov-primary" />
            <span>{isBn ? '৪. আবশ্যক বাস্তবিক যাচাই পদক্ষেপসমূহ' : '4. Mandatory Physical Due Diligence Steps'}</span>
          </h2>
          <p>
            {isBn
              ? 'এই অ্যাপ্লিকেশন ব্যবহারের মাধ্যমে আপনি স্বীকার করছেন যে বাংলাদেশে যথাযথ ভূমি যাচাইয়ের জন্য আবশ্যক:'
              : 'By using this application, you acknowledge that valid land verification in Bangladesh requires:'}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              {isBn
                ? 'সাব-রেজিস্ট্রি অফিসে বিগত ১২ থেকে ২৫ বছরের বালাম বই তল্লাশি (নিল সার্চ)।'
                : 'Physical Nil Search across Sub-Registry volume books (Book 1 & Book 2 indexes) for at least 12 to 25 years.'}
            </li>
            <li>
              {isBn
                ? 'উপজেলা এসি (ল্যান্ড) অফিসে মূল নামজারি পরচা ও ডিসিআর ফি রসিদ যাচাই।'
                : 'Inspection of original Mutation Porcha (RoR) and DCR fee receipt at the Upazila/Circle AC (Land) office.'}
            </li>
            <li>
              {isBn
                ? 'চলতি বাংলা সনের ভূমি উন্নয়ন কর পরিশোধের অনলাইন দাখিলা নিশ্চিত করা।'
                : 'Verification of current Bengali fiscal year Land Development Tax (LD Tax) Dakhila receipts.'}
            </li>
            <li>
              {isBn
                ? 'জমিতে সরেজমিনে উপস্থিত হয়ে দখলদারিত্ব ও সীমানা যাচাই।'
                : 'Physical site inspection to verify current occupant possession, co-sharer status, and boundary alignment.'}
            </li>
          </ul>
        </section>

        <section className="space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900">
            {isBn ? '৫. ওয়ারেন্টির অস্বীকৃতি ও দায়বদ্ধতার সীমাবদ্ধতা' : '5. Disclaimer of Warranties & Limitation of Liability'}
          </h2>
          <p>
            {isBn
              ? 'ভূমিভেরিফাই কোনো ধরনের প্রত্যক্ষ বা পরোক্ষ নিশ্চয়তা ছাড়াই "যেমন আছে" ভিত্তিতে তথ্য প্রদান করে। জমি ক্রয়ের পূর্বে ক্রেতাকে ব্যক্তিগতভাবে ও আইনজীবীর সহায়তায় সমুদয় স্বত্ব যাচাই করতে হবে।'
              : 'BhumiVerify provides information on an "as is" and "as available" basis. Prospective buyers must conduct independent physical vetting and consult legal professionals.'}
          </p>
        </section>
      </div>

      <div className="pt-2">
        <Link
          to="/how-it-works"
          className="text-xs font-semibold text-gov-primary hover:underline flex items-center gap-1.5"
        >
          <span>{isBn ? 'আমাদের যাচাই পদ্ধতি নির্দেশিকা পড়ুন' : 'Read our Due Diligence Methodology Guide'}</span>
        </Link>
      </div>
    </div>
  );
};
