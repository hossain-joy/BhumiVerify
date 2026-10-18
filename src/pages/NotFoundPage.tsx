import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
        <FileQuestion className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">
        {language === 'bn' ? '৪০৪ — পৃষ্ঠাটি পাওয়া যায়নি' : '404 — Page Not Found'}
      </h2>
      <p className="text-xs text-slate-500 leading-relaxed">
        {language === 'bn'
          ? 'অনুরোধকৃত রুট বা পাতাটি ল্যান্ডটেক বিডি প্ল্যাটফর্মে বিদ্যমান নেই।'
          : 'The requested public service route or dossier does not exist in LandTech BD.'}
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gov-primary hover:bg-gov-primaryHover text-white text-xs font-semibold rounded-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'হোমপেজে ফিরে যান' : 'Return to Platform Home'}</span>
        </Link>
      </div>
    </div>
  );
};
