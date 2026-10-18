# BhumiVerify — Verify Before You Buy.

> **Pre-Registration Land Parcel Due Diligence Web Application • Bangladesh Land Administration Context**  
> *A polished, responsive land-due-diligence platform that helps prospective land buyers organize parcel identifiers, review simulated record events, identify missing/conflicting information, and prepare independent verification steps before purchasing land.*

---

## 🎯 1. Product Purpose & Safety Boundaries

In Bangladesh, land buyers face significant information asymmetry: committing deposits or registering deeds before verifying whether previous transfer deeds exist, an e-mutation petition is contested, or cadastral surveys conflict.

**BhumiVerify** provides an organized due-diligence workspace to structure the pre-purchase inquiry:
$$\text{Enter Identifiers} \longrightarrow \text{Deterministic Composite Match} \longrightarrow \text{Simulated Event Trail} \longrightarrow \text{Actionable Independent Verification Checklist}$$

### Non-Negotiable Diligence Principles
1. **Independent Civic-Tech Prototype:** BhumiVerify is an independent educational tool. It does not connect to live Bangladesh government systems, e-mutation portals, or sub-registry offices.
2. **Never Guarantees Title or Safety:** Clean or positive matching results never prove ownership, legal title, authenticity, or that land is fraud-free.
3. **Absence of Records $\neq$ Safety:** A missing event or no-match result is never treated as evidence of safety.
4. **Three Cautious Status Labels:**
   - `No Major Issue Detected in Available Data`
   - `Review Recommended`
   - `Information Incomplete`
5. **Strictly Distinct Event Types:**
   - *Transfer-related / registered deed event* $\neq$ *Mutation application submitted* $\neq$ *Mutation completed decree*.
   - A registered deed does not update government revenue ownership.
   - An application submitted does not mean mutation was granted.
6. **Composite Identifier Matching:** Requires Division + District + Upazila/Thana + Mouza + Khatian + Dag. A Dag number alone is never matched. JL number mismatch is flagged as an explicit conflict.
7. **No Fabricated AI Claims:** Deterministic rule-based assessment only. No numerical fraud scores or fake AI verification.

---

## 🗺️ 2. Full Application Information Architecture & Routes

### Public Pages
- `/` — Landing page with hero, three-step diligence explainer, sample report cards, and prominent **"Create account"** and **"Log in"** CTAs.
- `/how-it-works` — Due diligence methodology, composite identifier explanation, 3 distinct event categories, and 8-point buyer checklist.
- `/about` — Mission, limitations, and external official government resources.
- `/login` — Sign in with 1-click quick demo login, password toggle, inline validation, and demo mode notices.
- `/register` — Account registration with password strength guidance, terms acceptance, and validation.
- `/forgot-password` — Password reset request UI with clear demo-only email disclosure.
- `/privacy` — Prototype privacy notice disclosing local client storage and zero NID/password collection.
- `/terms` — Terms of use, statutory disclaimers, and mandatory physical search rules.
- `/check-land` (and `/check`) — Interactive parcel lookup form with dependent selects, validation, and sample pre-fill.
- `/results` — Instant assessment report for submitted identifiers or selected demo fixtures.
- `/demo` — Fictional sample report gallery showcasing all 8 edge-case fixtures.

### Authenticated App Pages (Protected via `ProtectedRoute` & `AppLayout`)
- `/dashboard` — Overview cards, active check count, verification task progress bar, recent checks, and quick actions.
- `/check-land/new` — New land check form inside the authenticated shell.
- `/checks` — Saved checks list with search, status filters, division pills, sorting, rename, duplicate, delete modal, and compare integration.
- `/checks/:id` — Comprehensive parcel due diligence report with simulated event timeline, findings, interactive verification plan task toggles, user notes editor, and print-to-PDF layout.
- `/compare` — Accessible side-by-side comparison of two saved parcels (identifiers, match outcomes, event counts, tasks, and notes).
- `/documents` — Buyer's physical document inspection checklist (Baya deeds, CS/SA/RS Porchas, mutation DCR, tax dakhila, mouza map, and nil search).
- `/verification-plan` — Interactive personal task tracker with status toggles (`not_started`, `in_progress`, `completed`), notes, and target reminder dates.
- `/notifications` — In-app reminders and milestone notices with mark-read, delete, and storage sync.
- `/profile` — Personal information display and edit UI with storage parameter disclosures.
- `/settings` — Session controls, logout, and one-click **"Reset All Demo Data"** wiping localStorage.
- `/help` — Frequently Asked Questions accordion and simulated contact/feedback form.

### Optional Staff/Admin Prototype
- `/admin` — System overview, total seed fixture metrics, and links to fixture inspector and audit log.
- `/admin/demo-records` — Interactive JSON payload inspector for all 8 hardcoded demo parcels.
- `/admin/audit-log` — Simulated administrative audit logs tracking composite rule evaluations and integrity checks.

---

## 🔐 3. Authentication & Storage Architecture

### Authentication Mode: Honest Local Demo Adapter
- **Demo Mode:** Disclosed across login, registration, and user session cards.
- **Pre-Seeded Demo User:** `demo@bhumisure.org` (Tanvir Hossain) with 1-click instant login.
- **Passwords:** Never stored in plaintext or sent to an external server.
- **Architecture:** Separated into `AuthProvider` (`src/context/AuthContext.tsx`) and `StorageAdapter` (`src/lib/storageAdapter.ts`), allowing seamless replacement with Supabase Auth, Auth.js, or Firebase Auth without modifying UI pages.

### Data Persistence: Browser `localStorage`
- `bhumisure_auth_user_v2` — Current authenticated demo user profile.
- `bhumisure_saved_checks_v2` — User's saved land checks, custom notes, and task progress (seeded with 4 diverse checks).
- `bhumisure_notifications_v2` — In-app reminder items.
- `bhumisure_settings_v2` — User preference toggles.
- **Data Reset:** Users can reset to default seed fixtures at any time via Settings or Saved Checks.

---

## 💻 4. Getting Started & Commands

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Run Automated Unit Tests
```bash
npm test
```
Executes the domain verification test suite (`scripts/verify-mvp.js`):
- ✅ Identifier normalization (case, whitespace, hyphens)
- ✅ Form validation and accessible focus on first error
- ✅ Composite matching, JL conflict detection, ambiguity, and no-match handling
- ✅ Timeline event sorting (chronological, invalid/null dates at end)
- ✅ Safe date formatting without "Invalid Date" errors

### 4. Run TypeScript Check & Production Build
```bash
npm run build
```
Executes `tsc` and Vite production bundling with zero errors.

---

## 🚀 5. Transition to Real-World Production

To convert this frontend evaluation prototype into a real-world enterprise product:
1. **Connect Real Auth Provider:** Replace `AuthContext` with Supabase Auth, Auth.js, or Ory Kratos with server-side bcrypt/Argon2 password hashing and MFA.
2. **Integrate Real Database:** Replace `StorageAdapter` with PostgreSQL (Prisma or Drizzle ORM) for multi-tenant parcel management.
3. **Official API Licensing:** Formally contract with the Ministry of Land and Directorate of Registration for legal API access to e-Mutation, Land Tax, and Sub-Registry volume indexes.
4. **Legal Vetting Network:** Connect verified Bangladesh Bar Council advocates for certified document reviews.

---

## ⚖️ 6. Statutory Disclaimer

> **BhumiVerify is an independent digital prototype created for educational and evaluation purposes. It does not access real government databases, does not verify official ownership, and does not provide legal title insurance. Physical Nil Search at the Sub-Registry Office, checking certified mutation records at the AC (Land) office, and consulting an experienced property advocate are legally mandatory before purchasing land.**
