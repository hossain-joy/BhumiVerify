import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Bot,
  User,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionRoute?: string;
  actionLabel?: string;
}

const FAQ_PRESETS = [
  {
    qBn: 'দলিল হয়েছে কিন্তু নামজারি হয়নি — জমি কি কেনা নিরাপদ?',
    qEn: 'Deed is registered but mutation pending — is it safe to buy?',
    aBn:
      'না, শতভাগ নিরাপদ নয়। সাব-রেজিস্ট্রি অফিসে দলিল সম্পাদন করলেই রাজস্ব রেকর্ডে মালিকানা হস্তান্তরিত হয় না। সহকারী কমিশনার (ভূমি) কর্তৃক ই-নামজারি অনুমোদিত হয়ে নতুন খতিয়ান ও ডিসিআর জারি না হওয়া পর্যন্ত বিক্রেতার চূড়ান্ত রাজস্ব মালিকানা প্রতিষ্ঠিত হয় না। বিক্রেতাকে আগে নামজারি সম্পন্ন করতে বলুন।',
    aEn:
      'No, it is not completely safe. A Sub-Registry deed alone does not transfer revenue ownership until an e-Mutation case is approved by the Assistant Commissioner (Land) and a new Khatian & DCR are issued.',
  },
  {
    qBn: 'এক দাগে একাধিক অংশীদার থাকলে কীভাবে কিনতে হবে?',
    qEn: 'How to purchase land when multiple co-sharers share one plot?',
    aBn:
      'যৌথ মালিকানাধীন দাগে জমি কেনার আগে রেজিস্ট্রিকৃত "আপস বণ্টননামা দলিল" (Partition Deed) বা আদালত কর্তৃক বাটোয়ারা ডিক্রি যাচাই করুন। বণ্টননামা ছাড়া জমি কিনলে সুনির্দিষ্ট সীমানা নিয়ে পরবর্তীতে পারিবারিক বা দেওয়ানি বিরোধ হতে পারে।',
    aEn:
      'Before purchasing from a co-shared plot, inspect an officially registered Partition Deed (বাটোয়ারা দলিল). Purchasing without an amicable partition deed risks future boundary and possession litigation.',
  },
  {
    qBn: 'বায়না চুক্তির মেয়াদ সর্বোচ্চ কতদিন কার্যকর থাকে?',
    qEn: 'What is the statutory validity period of a Bayna agreement?',
    aBn:
      'রেজিস্ট্রেশন আইনের ১৭এ ধারা অনুযায়ী, বায়না চুক্তি অবশ্যই রেজিস্ট্রিকৃত হতে হবে। চুক্তিতে সুনির্দিষ্ট মেয়াদ উল্লেখ না থাকলে আইন অনুযায়ী বায়না দলিলের মেয়াদ সর্বোচ্চ ৬ মাস কার্যকর থাকে। বায়না সম্পাদনের পর নামজারি ও সাব-রেজিস্ট্রি তল্লাশি সম্পন্ন করুন।',
    aEn:
      'Under Section 17A of the Registration Act 1908, a contract for sale (Bayna) must be registered. If no specific time limit is stated in the deed, it remains valid for a maximum of 6 months.',
  },
  {
    qBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান কী এবং কেন গুরুত্বপূর্ণ?',
    qEn: 'What are CS, SA, RS and BS surveys and why do they matter?',
    aBn:
      'সিএস (১৯৪০-এর পূর্বে) হলো ব্রিটিশ আমলের আদি জরিপ। এসএ (১৯৫৬-৬২) পাকিস্তান আমলের জমিদারি উচ্ছেদ জরিপ। আরএস (১৯৬৬-৮০) হলো সংশোধনমূলক নির্ভরযোগ্য জরিপ। আর বিএস বা সিটি জরিপ হলো হালনাগাদ রেকর্ড। জমি ক্রয়ের ক্ষেত্রে সিএস থেকে বিএস পর্যন্ত মালিকানার হস্তান্তর শৃঙ্খল (Chain of Ownership) মেলাতে হবে।',
    aEn:
      'CS is the historic British Cadastral survey. SA is the 1956 State Acquisition record. RS is the highly respected Revisional survey. BS/City survey is the modern current record. A buyer must trace the uninterrupted chain from CS to BS.',
  },
];

export const LandAssistantWidget: React.FC = () => {
  const { isAssistantOpen, closeAssistant, openAssistant, openCadastralMap, openCalculator, openChecklist } = useUI();
  const { language } = useLanguage();

  const isBn = language === 'bn';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: isBn
        ? 'আসসালামু আলাইকুম! আমি ভূমিভেরিফাই ডিজিটাল সহকারী। জমি ক্রয়, বায়া দলিল, নামজারি, খতিয়ান বা আইনি তল্লাশি সংক্রান্ত যেকোনো প্রশ্ন করতে পারেন।'
        : 'Welcome! I am the BhumiVerify Diligence Assistant. Ask me anything about Bangladesh land acquisition, deeds, mutations, or survey checks.',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isAssistantOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulated Smart Response
    setTimeout(() => {
      let replyText = isBn
        ? 'আপনার প্রশ্নের জন্য ধন্যবাদ। জমি ক্রয়ের ক্ষেত্রে সর্বদা মূল দলিলের পাশাপাশি সহকারী কমিশনার (ভূমি) অফিসের ই-নামজারি রেকর্ড ও ডিসিআর যাচাই করা সংবিধিবদ্ধ কর্তব্য।'
        : 'Thank you for your inquiry. In Bangladesh land transactions, always verify both the Sub-Registry title deed and AC Land approved e-mutation records.';

      // Pattern matching
      const lower = query.toLowerCase();
      if (lower.includes('দলিল') || lower.includes('নামজারি') || lower.includes('deed') || lower.includes('mutation')) {
        replyText = isBn
          ? 'দলিল রেজিস্ট্রেশন করলেই নামজারি নিশ্চিত হয় না। সাব-রেজিস্ট্রারে দলিল সম্পাদন করার পর এসি ল্যান্ড অফিসে নামজারির আবেদন করতে হয়। ভূমিভেরিফাই প্ল্যাটফর্মে অনুসন্ধান করে আপনি সাম্প্রতিক নামজারি স্ট্যাটাস দেখতে পারেন।'
          : 'Deed execution at the Sub-Registry does not equal completed mutation. An e-mutation petition must be filed and sanctioned by the Assistant Commissioner (Land).';
      } else if (lower.includes('ফি') || lower.includes('খরচ') || lower.includes('fee') || lower.includes('tax')) {
        replyText = isBn
          ? 'জমি রেজিস্ট্রেশনে সাধারণত ১.৫% স্ট্যাম্প শুল্ক, ১% রেজিস্ট্রেশন ফি, এবং এলাকাভেদে ২-৩% স্থানীয় সরকার কর প্রযোজ্য। বিস্তারিত দেখতে আমাদের ফি ক্যালকুলেটর ব্যবহার করুন।'
          : 'Registration entails approx 1.5% Stamp Duty, 1% Registration fee, plus 2-3% local taxes. Use our built-in Fee Estimator for an exact breakdown.';
      } else if (lower.includes('চেকলিস্ট') || lower.includes('ঝুঁকি') || lower.includes('checklist') || lower.includes('risk')) {
        replyText = isBn
          ? 'জমি কেনার আগে আমাদের ১০-দফা চেকলিস্ট যাচাই করুন (মূল দলিল, নামজারি, সাব-রেজিস্ট্রি তল্লাশি, দখল ও মামলা মুক্ততা)।'
          : 'Please review our 10-Point Diligence Checklist covering chain deeds, civil court clearances, and physical demarcation.';
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: replyText,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-widget-title"
      className="fixed bottom-5 left-5 z-[99] w-full max-w-md bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-slide-down"
    >
      {/* Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-gov-dark via-slate-900 to-gov-primary text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-teal-300" />
          </div>
          <div>
            <h3 id="assistant-widget-title" className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>{isBn ? 'ভূমিভেরিফাই ডিজিটাল সহকারী' : 'BhumiVerify Diligence Assistant'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-teal-200/80">
              {isBn ? 'আইনি ও রাজস্ব পরামর্শক • এআই চালিত' : 'AI Diligence Advisor'}
            </p>
          </div>
        </div>

        <button
          onClick={closeAssistant}
          className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
          aria-label="Close assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Tool Links Toolbar */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={openChecklist}
          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-teal-300 font-semibold text-slate-700 hover:text-gov-primary shrink-0 transition-colors shadow-2xs"
        >
          {isBn ? '📋 ১০-দফা চেকলিস্ট' : '📋 10-Pt Checklist'}
        </button>
        <button
          onClick={openCalculator}
          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-300 font-semibold text-slate-700 hover:text-blue-700 shrink-0 transition-colors shadow-2xs"
        >
          {isBn ? '🧮 ফি হিসাব' : '🧮 Fee Calculator'}
        </button>
        <button
          onClick={() => openCadastralMap()}
          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-teal-300 font-semibold text-slate-700 hover:text-gov-primary shrink-0 transition-colors shadow-2xs"
        >
          {isBn ? '🗺️ মৌজা নকশা' : '🗺️ Mouza Map'}
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafaf9]">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                  isUser ? 'bg-gov-primary text-white' : 'bg-white border border-slate-200 text-teal-700'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-gov-primary text-white rounded-tr-none'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-2xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        {/* Suggested FAQ Chips */}
        {messages.length <= 2 && (
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              {isBn ? 'সাধারণ প্রশ্নসমূহ (ট্যাপ করুন):' : 'Frequently Asked Questions:'}
            </span>
            <div className="space-y-1">
              {FAQ_PRESETS.map((f, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(isBn ? f.qBn : f.qEn)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-teal-50/70 border border-slate-200 hover:border-teal-200 text-[11px] font-semibold text-slate-700 hover:text-gov-primary transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{isBn ? f.qBn : f.qEn}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-gov-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isBn ? 'প্রশ্ন লিখুন... (যেমন: বায়া দলিল, নামজারি)' : 'Ask a land question...'}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-gov-primary hover:bg-gov-primaryHover text-white transition-colors"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
