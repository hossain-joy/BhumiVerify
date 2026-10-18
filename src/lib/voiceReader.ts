/**
 * Voice Reader (Text-to-Speech) for Bengali & English Land Diligence explanations.
 * Uses browser-native window.speechSynthesis with automatic Bengali voice detection
 * and fallback mechanisms.
 */

type VoiceStateCallback = (speaking: boolean) => void;
const listeners = new Set<VoiceStateCallback>();

let currentSpeaking = false;

function notifyListeners(speaking: boolean) {
  currentSpeaking = speaking;
  listeners.forEach((cb) => {
    try {
      cb(speaking);
    } catch {
      // ignore
    }
  });
}

export const voiceReader = {
  subscribe(callback: VoiceStateCallback) {
    listeners.add(callback);
    callback(currentSpeaking);
    return () => {
      listeners.delete(callback);
    };
  },

  isSpeaking(): boolean {
    return currentSpeaking || (typeof window !== 'undefined' && window.speechSynthesis?.speaking);
  },

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      notifyListeners(false);
    }
  },

  speak(text: string, lang: 'bn' | 'en' = 'bn') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this environment');
      return;
    }

    // Stop any existing speech
    window.speechSynthesis.cancel();

    // Clean markdown/symbols
    const cleanText = text
      .replace(/[#*_`~[\]()<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = lang === 'bn' ? 0.95 : 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (lang === 'bn') {
      selectedVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('bn') ||
          v.name.toLowerCase().includes('bangla') ||
          v.name.toLowerCase().includes('bengali')
      );
      utterance.lang = selectedVoice ? selectedVoice.lang : 'bn-BD';
    } else {
      selectedVoice = voices.find((v) => v.lang.startsWith('en'));
      utterance.lang = 'en-US';
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      notifyListeners(true);
    };

    utterance.onend = () => {
      notifyListeners(false);
    };

    utterance.onerror = () => {
      notifyListeners(false);
    };

    window.speechSynthesis.speak(utterance);
  },
};
