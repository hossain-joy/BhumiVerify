import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  isComparatorOpen: boolean;
  openComparator: () => void;
  closeComparator: () => void;

  isShortcutsOpen: boolean;
  openShortcuts: () => void;
  closeShortcuts: () => void;
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
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const openCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  const openCadastralMap = useCallback((targetDag?: string) => {
    setActiveMapDag(targetDag);
    setIsCadastralMapOpen(true);
  }, []);

  const closeCadastralMap = useCallback(() => {
    setIsCadastralMapOpen(false);
  }, []);

  const openCalculator = useCallback(() => {
    setIsCalculatorOpen(true);
  }, []);

  const closeCalculator = useCallback(() => {
    setIsCalculatorOpen(false);
  }, []);

  const openTour = useCallback(() => {
    setIsTourOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, []);

  const openChecklist = useCallback(() => {
    setIsChecklistOpen(true);
  }, []);

  const closeChecklist = useCallback(() => {
    setIsChecklistOpen(false);
  }, []);

  const openUnitConverter = useCallback(() => {
    setIsUnitConverterOpen(true);
  }, []);

  const closeUnitConverter = useCallback(() => {
    setIsUnitConverterOpen(false);
  }, []);

  const openAssistant = useCallback(() => {
    setIsAssistantOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsAssistantOpen(false);
  }, []);

  const toggleAssistant = useCallback(() => {
    setIsAssistantOpen((prev) => !prev);
  }, []);

  const openCertificate = useCallback((req?: AccessRequest) => {
    setActiveCertificateRequest(req);
    setIsCertificateOpen(true);
  }, []);

  const closeCertificate = useCallback(() => {
    setIsCertificateOpen(false);
  }, []);

  const openComparator = useCallback(() => {
    setIsComparatorOpen(true);
  }, []);

  const closeComparator = useCallback(() => {
    setIsComparatorOpen(false);
  }, []);

  const openShortcuts = useCallback(() => {
    setIsShortcutsOpen(true);
  }, []);

  const closeShortcuts = useCallback(() => {
    setIsShortcutsOpen(false);
  }, []);

  // Global keyboard shortcuts: Ctrl+K, Escape, and single-key accelerators
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
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
        setIsComparatorOpen(false);
        setIsShortcutsOpen(false);
        return;
      }

      // Check if user is typing in form controls
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Hotkeys when no input is focused
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsCadastralMapOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsCalculatorOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'u' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsUnitConverterOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'l' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsChecklistOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsComparatorOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsAssistantOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsTourOpen((prev) => !prev);
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
        isComparatorOpen,
        openComparator,
        closeComparator,
        isShortcutsOpen,
        openShortcuts,
        closeShortcuts,
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
