import React from 'react';
import { RoleSwitcher } from './RoleSwitcher';
import { DisclaimerBanner } from './DisclaimerBanner';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from '../common/CommandPalette';
import { CadastralMapModal } from '../land/CadastralMapModal';
import { LandFeeCalculatorModal } from '../common/LandFeeCalculatorModal';
import { FeatureTourModal } from '../common/FeatureTourModal';
import { BuyerDiligenceChecklistModal } from '../common/BuyerDiligenceChecklistModal';
import { LandUnitConverterModal } from '../common/LandUnitConverterModal';
import { OfficialCertificateModal } from '../common/OfficialCertificateModal';
import { ParcelComparatorModal } from '../land/ParcelComparatorModal';
import { KeyboardShortcutsModal } from '../common/KeyboardShortcutsModal';
import { ToastContainer } from '../common/ToastContainer';
import { useUI } from '../../context/UIContext';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isComparatorOpen, closeComparator, isShortcutsOpen, closeShortcuts } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative selection:bg-teal-700 selection:text-white">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Global Interactive Modals & Overlays */}
      <CommandPalette />
      <CadastralMapModal />
      <LandFeeCalculatorModal />
      <FeatureTourModal />
      <BuyerDiligenceChecklistModal />
      <LandUnitConverterModal />
      <OfficialCertificateModal />
      <ParcelComparatorModal isOpen={isComparatorOpen} onClose={closeComparator} />
      <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={closeShortcuts} />
      <ToastContainer />

      {/* Main Layout Chrome */}
      <RoleSwitcher />
      <DisclaimerBanner />
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 sm:py-8 animate-fade-up"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};
