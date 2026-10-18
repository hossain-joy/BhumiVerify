import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { soundEffects } from '../lib/soundEffects';
import { AccessRequest } from '../types';

interface UIContextType {
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  isCadastralMapOpen: boolean;
  openCadastralMap: (targetDag?: string) => void;
  closeCadastralMap: () => void;
  activeMapDag?: string;

  isCalculatorOpen: boolean;
  openCalculator: () => void;
  closeCalculator: () => void;

  isTourOpen: boolean;
  openTour: () => void;
  closeTour: () => void;

  isChecklistOpen: boolean;
  openChecklist: () => void;
  closeChecklist: () => void;

  isUnitConverterOpen: boolean;
  openUnitConverter: () => void;
  closeUnitConverter: () => void;

  isAssistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;

  isCertificateOpen: boolean;
  openCertificate: (req?: AccessRequest) => void;
  closeCertificate: () => void;
  activeCertificateRequest?: AccessRequest;

  soundEnabled: boolean;
  toggleSound: () => boolean;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCadastralMapOpen, setIsCadastralMapOpen] = useState(false);
  const [activeMapDag, setActiveMapDag] = useState<string | undefined>(undefined);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isUnitConverterOpen, setIsUnitConverterOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [activeCertificateRequest, setActiveCertificateRequest] = useState<AccessRequest | undefined>(undefined);
  const [soundEnabled, setSoundEnabled] = useState(() => soundEffects.isEnabled());

  const openCommandPalette = useCallback(() => {
    soundEffects.playClick();
    setIsCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  const openCadastralMap = useCallback((targetDag?: string) => {
    soundEffects.playClick();
    setActiveMapDag(targetDag);
    setIsCadastralMapOpen(true);
  }, []);

  const closeCadastralMap = useCallback(() => {
    setIsCadastralMapOpen(false);
  }, []);

  const openCalculator = useCallback(() => {
    soundEffects.playClick();
    setIsCalculatorOpen(true);
  }, []);

  const closeCalculator = useCallback(() => {
    setIsCalculatorOpen(false);
  }, []);

  const openTour = useCallback(() => {
    soundEffects.playClick();
    setIsTourOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, []);

  const openChecklist = useCallback(() => {
    soundEffects.playClick();
    setIsChecklistOpen(true);
  }, []);

  const closeChecklist = useCallback(() => {
    setIsChecklistOpen(false);
  }, []);

  const openUnitConverter = useCallback(() => {
    soundEffects.playClick();
    setIsUnitConverterOpen(true);
  }, []);

  const closeUnitConverter = useCallback(() => {
    setIsUnitConverterOpen(false);
  }, []);

  const openAssistant = useCallback(() => {
    soundEffects.playClick();
    setIsAssistantOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsAssistantOpen(false);
  }, []);

  const toggleAssistant = useCallback(() => {
    soundEffects.playClick();
    setIsAssistantOpen((prev) => !prev);
  }, []);

  const openCertificate = useCallback((req?: AccessRequest) => {
    soundEffects.playClick();
    setActiveCertificateRequest(req);
    setIsCertificateOpen(true);
  }, []);

  const closeCertificate = useCallback(() => {
    setIsCertificateOpen(false);
  }, []);

  const toggleSound = useCallback(() => {
    const newState = soundEffects.toggle();
    setSoundEnabled(newState);
    return newState;
  }, []);

  // Global keyboard shortcut for Command Palette: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsCadastralMapOpen(false);
        setIsCalculatorOpen(false);
        setIsTourOpen(false);
        setIsChecklistOpen(false);
        setIsUnitConverterOpen(false);
        setIsAssistantOpen(false);
        setIsCertificateOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <UIContext.Provider
      value={{
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        isCadastralMapOpen,
        openCadastralMap,
        closeCadastralMap,
        activeMapDag,
        isCalculatorOpen,
        openCalculator,
        closeCalculator,
        isTourOpen,
        openTour,
        closeTour,
        isChecklistOpen,
        openChecklist,
        closeChecklist,
        isUnitConverterOpen,
        openUnitConverter,
        closeUnitConverter,
        isAssistantOpen,
        openAssistant,
        closeAssistant,
        toggleAssistant,
        isCertificateOpen,
        openCertificate,
        closeCertificate,
        activeCertificateRequest,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
