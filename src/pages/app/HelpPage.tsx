import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare, BookOpen, AlertTriangle, Send } from 'lucide-react';
import { Disclaimer } from '../../components/common/Disclaimer';

interface FaqItem {
  q: string;
  qBn: string;
  a: string;
  aBn: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Does a clean check result prove that land is safe to buy?',
    qBn: 'একটি ক্লিন বা সামঞ্জস্যপূর্ণ ফলাফল কি প্রমাণ করে যে জমিটি কেনা সম্পূর্ণ নিরাপদ?',
    a: 'No. A clean result only indicates that within available records, no conflicting entries were recorded. It does not replace physical volume search at the Sub-Registry Office, checking AC (Land) records, or physical boundary inspection.',
    aBn: 'না। একটি ক্লিন ফলাফল শুধুমাত্র নির্দেশ করে যে আমাদের সিস্টেমে সংরক্ষিত তথ্যে কোনো অসঙ্গতি ধরা পড়েনি। এটি কখনোই সাব-রেজিস্ট্রি অফিসে বালাম বই তল্লাশ, এসি (ল্যান্ড) অফিসের রাজস্ব রেকর্ড যাচাই বা মাঠপর্যায়ে বাস্তব সীমানা পরিমাপের বিকল্প নয়।',
  },
  {
    q: 'Why can’t I search by Dag (Plot) number alone?',
    qBn: 'শুধু দাগ নম্বর দিয়ে কেন জমি অনুসন্ধান করা যায় না?',
    a: 'Under Bangladesh land administration, plot numbers are repeated in every Mouza and Khatian. Searching by Dag number alone produces hundreds of completely unrelated plots. The composite key (Division, District, Upazila, Mouza, Khatian, Dag) is strictly necessary to uniquely identify a parcel.',
    aBn: 'বাংলাদেশের ভূমি প্রশাসন ব্যবস্থায় প্রতিটি মৌজা ও খতিয়ানে দাগ নম্বরের পুনরাবৃত্তি ঘটে। শুধু দাগ নম্বর দিয়ে খুঁজলে শত শত সম্পর্কহীন প্লটের ফল আসবে। নির্দিষ্ট কোনো জমিকে সঠিকভাবে চিহ্নিত করতে বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান ও দাগ নম্বরের সমন্বিত পরিচিতি আবশ্যক।',
  },
  {
    q: 'What is the difference between a Registered Deed and a Mutation Khatian?',
    qBn: 'রেজিস্ট্রি দলিল এবং নামজারি খতিয়ানের মধ্যে পার্থক্য কী?',
    a: 'A registered deed (executed at the Sub-Registry Office) proves a transaction occurred between the seller and buyer. However, government revenue ownership is not recognized until the AC (Land) office conducts an inquiry, approves the mutation petition, and issues a new Mutated Khatian and Jamabandi page.',
    aBn: 'সাব-রেজিস্ট্রি অফিসে সম্পাদিত রেজিস্ট্রি দলিল ক্রেতা ও বিক্রেতার মধ্যে আর্থিক ও মালিকানা হস্তান্তর লেনদেন প্রমাণ করে। কিন্তু সহকারী কমিশনার (ভূমি) অফিস তদন্ত শেষে নামজারি আবেদন মঞ্জুর করে নতুন জমাভাগ ও নামজারি খতিয়ান না দেওয়া পর্যন্ত সরকারি রাজস্ব রেকর্ডে ক্রেতার মালিকানা প্রতিষ্ঠিত হয় না।',
  },
  {
    q: 'What is a "Nil Search" and why is it mandatory?',
    qBn: '"নিল সার্চ" বা তল্লাশ কী এবং এটি কেন বাধ্যতামূলক?',
    a: 'A Nil Search (Form 52) is an in-person physical search of Sub-Registry volume book indexes (Book 1 and Book 2) for the last 12 to 25 years. It is the only reliable way to uncover unrecorded mortgage charges, court attachments, or prior deeds executed by previous owners.',
    aBn: 'নিল সার্চ (৫২ নম্বর ফরম) হলো বিগত ১২ থেকে ২৫ বছরের জন্য সাব-রেজিস্ট্রি অফিসের ১ ও ২ নম্বর বালাম বই সশরীরে তল্লাশ করা। পূর্ববর্তী মালিকদের দ্বারা জমি গোপনে বিক্রয়, ব্যাংকে দায়বদ্ধতা বা আদালতের নিষেধাজ্ঞা আছে কি না তা জানার এটাই একমাত্র নির্ভরযোগ্য আইনি উপায়।',
  },
  {
    q: 'Where is my search data saved?',
    qBn: 'আমার অনুসন্ধানের তথ্য কোথায় সংরক্ষিত হয়?',
    a: 'Your saved checks and verification notes are saved strictly in your browser’s localStorage. They are never transmitted to external servers or government databases.',
    aBn: 'আপনার সংরক্ষিত জমি যাচাই ও ব্যক্তিগত নোট সম্পূর্ণভাবে আপনার নিজস্ব ব্রাউজারের লোকাল স্টোরেজে সংরক্ষিত থাকে। কোনো দূরবর্তী সার্ভার বা সরকারি ডেটাবেজে তা পাঠানো হয় না।',
  },
];

export const HelpPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-up">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-gov-primary" />
          <span>{isBn ? 'সহায়তা ও প্রশ্নোত্তর' : 'Knowledge Base & Support'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {isBn ? 'সহায়তা ও সাধারণ জিজ্ঞাসা (FAQ)' : 'Help & Frequently Asked Questions'}
        </h1>
        <p className="text-xs text-slate-500">
          {isBn
            ? 'বাংলাদেশে জমি ক্রয়ের সাধারণ প্রশ্নের উত্তর ও দিকনির্দেশনা জেনে নিন।'
            : 'Find answers to common questions about Bangladesh land verification and due diligence.'}
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gov-primary" />
          <span>{isBn ? 'সাধারণ জিজ্ঞাসা ও উত্তর' : 'Frequently Asked Questions'}</span>
        </h2>

        <div className="space-y-2 pt-1">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{isBn ? faq.qBn : faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {isBn ? faq.aBn : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Message Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gov-primary" />
          <span>{isBn ? 'মতামত ও অনুসন্ধান' : 'Feedback & Inquiries'}</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          {isBn
            ? 'আপনার কোনো প্রশ্ন বা যাচাইকরণ প্রক্রিয়ায় কোনো মতামত থাকলে নিচের ফর্মে লিখুন:'
            : 'Have questions or feedback on our verification workflow? Submit your message below:'}
        </p>

        {submitted ? (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            {isBn ? 'ধন্যবাদ! আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে।' : 'Thank you! Your feedback has been received.'}
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isBn ? 'আপনার বার্তা, প্রশ্ন বা পরামর্শ এখানে লিখুন...' : 'Type your message, question, or suggestion here...'}
              className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-primary"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary py-2 px-4 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isBn ? 'বার্তা পাঠান' : 'Submit Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
