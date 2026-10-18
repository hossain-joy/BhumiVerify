import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from '../common/ToastContainer';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative selection:bg-teal-700 selection:text-white">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Notifications / Toast container */}
      <ToastContainer />

      {/* Minimal Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {children}
      </main>

      {/* Public Service Footer */}
      <Footer />
    </div>
  );
};
