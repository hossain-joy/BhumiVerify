import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { SavedChecksProvider } from './context/SavedChecksContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { ToastProvider } from './context/ToastContext';
import { UIProvider } from './context/UIContext';

// Layouts & Guards
import { AppShell } from './components/layout/AppShell';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { DemoGalleryPage } from './pages/public/DemoGalleryPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { TermsPage } from './pages/public/TermsPage';
import { CheckLandPage } from './pages/CheckLandPage';
import { ParcelResultsPage } from './pages/ParcelResultsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Authenticated App Pages
import { DashboardPage } from './pages/app/DashboardPage';
import { SavedChecksListPage } from './pages/app/SavedChecksListPage';
import { CheckReportPage } from './pages/app/CheckReportPage';
import { CompareReportsPage } from './pages/app/CompareReportsPage';
import { DocumentChecklistPage } from './pages/app/DocumentChecklistPage';
import { VerificationPlanPage } from './pages/app/VerificationPlanPage';
import { NotificationsPage } from './pages/app/NotificationsPage';
import { ProfilePage } from './pages/app/ProfilePage';
import { SettingsPage } from './pages/app/SettingsPage';
import { HelpPage } from './pages/app/HelpPage';

// Admin Demo Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminDemoRecordsPage } from './pages/admin/AdminDemoRecordsPage';
import { AdminAuditLogPage } from './pages/admin/AdminAuditLogPage';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <SavedChecksProvider>
            <NotificationsProvider>
              <ToastProvider>
                <UIProvider>
                  <Routes>
                    {/* =========================================
                        PUBLIC ROUTES (Wrapped in AppShell)
                    ========================================== */}
                    <Route
                      path="/"
                      element={
                        <AppShell>
                          <HomePage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/how-it-works"
                      element={
                        <AppShell>
                          <HowItWorksPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/demo"
                      element={
                        <AppShell>
                          <DemoGalleryPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <AppShell>
                          <AboutPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/privacy"
                      element={
                        <AppShell>
                          <PrivacyPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/terms"
                      element={
                        <AppShell>
                          <TermsPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <AppShell>
                          <LoginPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <AppShell>
                          <RegisterPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={
                        <AppShell>
                          <ForgotPasswordPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/check-land"
                      element={
                        <AppShell>
                          <CheckLandPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/check"
                      element={
                        <AppShell>
                          <CheckLandPage />
                        </AppShell>
                      }
                    />
                    <Route
                      path="/results"
                      element={
                        <AppShell>
                          <ParcelResultsPage />
                        </AppShell>
                      }
                    />

                    {/* =========================================
                        AUTHENTICATED APP ROUTES (ProtectedRoute + AppLayout)
                    ========================================== */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <DashboardPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/check-land/new"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <CheckLandPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checks"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <SavedChecksListPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checks/:id"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <CheckReportPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/compare"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <CompareReportsPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/documents"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <DocumentChecklistPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/verification-plan"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <VerificationPlanPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/notifications"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <NotificationsPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <ProfilePage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <SettingsPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/help"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <HelpPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />

                    {/* =========================================
                        ADMIN CONSOLE ROUTES
                    ========================================== */}
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AppLayout>
                            <AdminDashboardPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/demo-records"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AppLayout>
                            <AdminDemoRecordsPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/audit-log"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AppLayout>
                            <AdminAuditLogPage />
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />

                    {/* Legacy / Alias Redirects */}
                    <Route path="/citizen" element={<Navigate to="/check-land" replace />} />
                    <Route path="/citizen/parcel-risk" element={<Navigate to="/check-land" replace />} />

                    {/* 404 Catch-All */}
                    <Route
                      path="*"
                      element={
                        <AppShell>
                          <NotFoundPage />
                        </AppShell>
                      }
                    />
                  </Routes>
                </UIProvider>
              </ToastProvider>
            </NotificationsProvider>
          </SavedChecksProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
