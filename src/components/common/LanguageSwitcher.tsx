import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  compact = false,
}) => {
  const { language, setLanguage } = useLanguage();

  if (compact) {
    return (
      <button
        onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
          language === 'bn'
            ? 'bg-teal-50 border-teal-300 text-gov-primary'
            : 'bg-white border-slate-300 text-slate-700'
        } ${className}`}
        title="ভাষা পরিবর্তন করুন / Switch Language"
      >
        <Globe className="w-3.5 h-3.5 text-gov-primary" />
        <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 p-0.5 rounded-md bg-slate-100 border border-slate-300 text-xs shadow-2xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="pl-1.5 pr-0.5 text-slate-400 select-none">
        <Globe className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
          language === 'bn'
            ? 'bg-gov-primary text-white shadow-2xs font-bold ring-1 ring-teal-600'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        title="বাংলা (বাংলাদেশ)"
      >
        বাংলা
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
          language === 'en'
            ? 'bg-gov-primary text-white shadow-2xs font-bold ring-1 ring-teal-600'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        title="English"
      >
        English
      </button>
    </div>
  );
};

