import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { IdentityVerificationPage } from './pages/citizen/IdentityVerificationPage';
import { NewRequestPage } from './pages/citizen/NewRequestPage';
import { MyRequestsPage } from './pages/citizen/MyRequestsPage';
import { RequestDetailPage } from './pages/citizen/RequestDetailPage';
import { CitizenParcelRiskCheckPage } from './pages/citizen/CitizenParcelRiskCheckPage';
import { CitizenAccessHistoryPage } from './pages/citizen/CitizenAccessHistoryPage';
import { ParcelRiskPage } from './pages/citizen/ParcelRiskPage';
import { NotificationsPage } from './pages/citizen/NotificationsPage';
import { ProfilePage } from './pages/citizen/ProfilePage';

import { ReviewerDashboard } from './pages/reviewer/ReviewerDashboard';
import { ReviewDetailPage } from './pages/reviewer/ReviewDetailPage';
import { DecisionHistoryPage } from './pages/reviewer/DecisionHistoryPage';
import { ParcelMatchReviewPage } from './pages/reviewer/ParcelMatchReviewPage';

import { AuditLogPage } from './pages/auditor/AuditLogPage';
import { AccessHistoryPage } from './pages/auditor/AccessHistoryPage';
import { DataSourceHealthPage } from './pages/auditor/DataSourceHealthPage';

import { AdminRoleOverviewPage } from './pages/admin/AdminRoleOverviewPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <AppShell>
            <Routes>
              {/* Landing */}
              <Route path="/" element={<LandingPage />} />

            {/* Citizen Portal */}
            <Route path="/citizen" element={<CitizenDashboard />} />
            <Route path="/citizen/verify-identity" element={<IdentityVerificationPage />} />
            <Route path="/citizen/new-request" element={<NewRequestPage />} />
            <Route path="/citizen/requests" element={<MyRequestsPage />} />
            <Route path="/citizen/requests/:id" element={<RequestDetailPage />} />
            <Route path="/citizen/parcel-risk" element={<CitizenParcelRiskCheckPage />} />
            <Route path="/citizen/access-history" element={<CitizenAccessHistoryPage />} />
            <Route path="/citizen/parcel-overview/:parcelId" element={<ParcelRiskPage />} />
            <Route path="/citizen/notifications" element={<NotificationsPage />} />
            <Route path="/citizen/profile" element={<ProfilePage />} />

            {/* Reviewer Portal */}
            <Route path="/reviewer" element={<ReviewerDashboard />} />
            <Route path="/reviewer/requests" element={<ReviewerDashboard />} />
            <Route path="/reviewer/requests/:id" element={<ReviewDetailPage />} />
            <Route path="/reviewer/history" element={<DecisionHistoryPage />} />
            <Route path="/reviewer/parcels" element={<ParcelMatchReviewPage />} />

            {/* Auditor Portal */}
            <Route path="/auditor" element={<AuditLogPage />} />
            <Route path="/auditor/access-history" element={<AccessHistoryPage />} />
            <Route path="/auditor/sources" element={<DataSourceHealthPage />} />

            {/* Admin Portal */}
            <Route path="/admin" element={<AdminRoleOverviewPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/demo-data" element={<ParcelMatchReviewPage />} />
            <Route path="/admin/status" element={<DataSourceHealthPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell>
      </AppProvider>
    </LanguageProvider>
  </BrowserRouter>
  );
}

export default App;
