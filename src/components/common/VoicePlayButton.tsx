import React, { useState, useEffect } from 'react';
import { Volume2, Square, Sparkles } from 'lucide-react';
import { voiceReader } from '../../lib/voiceReader';
import { soundEffects } from '../../lib/soundEffects';

interface VoicePlayButtonProps {
  text: string;
  lang?: 'bn' | 'en';
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const VoicePlayButton: React.FC<VoicePlayButtonProps> = ({
  text,
  lang = 'bn',
  label,
  size = 'sm',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = voiceReader.subscribe((speaking) => {
      if (!speaking) {
        setIsPlaying(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playClick();

    if (isPlaying) {
      voiceReader.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      voiceReader.speak(text, lang);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 rounded-md font-semibold transition-all duration-150 cursor-pointer ${
        isPlaying
          ? 'bg-teal-600 text-white shadow-xs animate-pulse ring-2 ring-teal-400/40'
          : 'bg-teal-50 hover:bg-teal-100 text-gov-primary border border-teal-200'
      } ${size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'} ${className}`}
      title={isPlaying ? (lang === 'bn' ? 'পড়া বন্ধ করুন' : 'Stop voice reading') : (lang === 'bn' ? 'বাংলায় শুনুন' : 'Listen aloud')}
    >
      {isPlaying ? (
        <>
          <Square className="w-3 h-3 fill-current" />
          <span className="flex items-center gap-0.5">
            <span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
          <span>{lang === 'bn' ? 'থামান' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3 h-3 text-teal-600" />
          <span>{label || (lang === 'bn' ? 'শুনুন' : 'Listen')}</span>
        </>
      )}
    </button>
  );
};
