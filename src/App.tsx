import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { UIProvider } from './context/UIContext';
import { AppShell } from './components/layout/AppShell';

// Core MVP Pages
import { HomePage } from './pages/HomePage';
import { CheckLandPage } from './pages/CheckLandPage';
import { ParcelResultsPage } from './pages/ParcelResultsPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <ToastProvider>
            <UIProvider>
              <AppShell>
                <Routes>
                  {/* Core 3-Page MVP Workflow */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/check" element={<CheckLandPage />} />
                  <Route path="/results" element={<ParcelResultsPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  {/* Backward-compatibility redirects for any old bookmarks */}
                  <Route path="/citizen" element={<CheckLandPage />} />
                  <Route path="/citizen/parcel-risk" element={<CheckLandPage />} />

                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AppShell>
            </UIProvider>
          </ToastProvider>
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
