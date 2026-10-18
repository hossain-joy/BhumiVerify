import React from 'react';
import { RoleSwitcher } from './RoleSwitcher';
import { DisclaimerBanner } from './DisclaimerBanner';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Demo Switcher bar */}
      <RoleSwitcher />

      {/* Mandatory Statutory Platform Disclaimer */}
      <DisclaimerBanner />

      {/* Primary Civic Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Civic Footer with portal citations */}
      <Footer />
    </div>
  );
};
