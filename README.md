# BhumiSure — Verify Before You Buy.

> **Pre-Registration Land Parcel Diligence MVP • Bangladesh Land Administration Context**  
> *A clean, focused, trustworthy frontend prototype that helps prospective land buyers identify transaction risks, understand simulated records, and determine what to verify before purchasing.*

---

## 🎯 1. Product Purpose & Principles

In Bangladesh, prospective land buyers face a dangerous information gap: committing money or executing deed registration before knowing whether a transfer deed has already been registered, an e-mutation petition is pending, or historical survey sheets conflict.

**BhumiSure solves this by providing one primary, transparent journey:**
$$\text{Home} \longrightarrow \text{Check Land} \longrightarrow \text{Enter Identifiers} \longrightarrow \text{Composite Match} \longrightarrow \text{Review Available Records \& Next Steps}$$

### Non-Negotiable Diligence Principles
- **Original Identity:** BhumiSure is an independent evaluation prototype. It does not copy government seals or claim official endorsement.
- **Plain English & Bangla:** Clear explanations for every warning; legal jargon is avoided or clearly unpacked.
- **Separate Facts from Interpretation:** Facts in the sample record are distinguished from assessments and buyer next steps.
- **Explicit Unknowns:** Missing or unavailable information is explicitly flagged ("Not available in this sample"), never fabricated or treated as evidence of safety.
- **No Claims of Title Safety:** Never uses *"Safe"*, *"Fraud-free"*, *"Ownership verified"*, *"Title confirmed"*, or numerical fraud probability scores.
- **Three Distinct Event Types:**
  1. *Transfer-related / registered deed event* $\neq$ *Mutation application* $\neq$ *Completed mutation*.
  2. A transfer-related event does not prove that current title is legally valid in revenue records.
  3. A mutation application does not mean mutation is granted.
  4. A missing completion event in this sample means *"not present in this sample"*, not *"not completed in reality"*.
- **Composite Matching:** Matching compares Division, District, Upazila/Thana, Mouza, Khatian, and Dag number. A Dag number alone is never used for matching.
- **Deterministic Logic:** Transparent, explainable rules. No opaque ML models or fake AI fraud detectors.

---

## 🌟 2. Information Architecture & Four Screens

The user experience is structured into four primary views:

1. **Shared Application Shell**:
   - Header with BhumiSure brand, tagline *"Verify Before You Buy."*, and only three navigation links: **Home**, **Check Land**, **About**.
   - Primary CTA: **Check a land parcel**.
   - Accessible keyboard-operable responsive mobile menu.
   - Footer with brand, independent prototype disclosure, external reference links with safe attributes (`target="_blank" rel="noopener noreferrer"`), and statutory disclaimer.
2. **Home (`/`)**:
   - Hero: *"Know what to check before you buy land."*
   - Three-step explainer (Enter identifiers $\rightarrow$ Review simulated event history $\rightarrow$ Understand missing information and next checks).
   - Three primary fictional scenario cards with 1-click execution:
     - **Consistent sample information** (`BS-DEMO-001`)
     - **Review recommended** (`BS-DEMO-002`)
     - **Information incomplete** (`BS-DEMO-003`)
   - Visible, concise prototype disclaimer.
3. **Check Land (`/check`)**:
   - Grouped fields: Location hierarchy first (Division, District, Upazila, Mouza), then Parcel identifiers (Khatian, Dag, optional JL number).
   - Optional collapsible Additional Details (Land Area).
   - Inline validation with immediate focus/scroll to the first invalid field.
   - Enter-key submission and double-submission prevention.
   - Local simulated lookup state (loading indicator with restored button).
   - "Try an example" 1-click pre-fill area.
   - Clear form action.
   - Dedicated states for **No-Match**, **JL Conflict**, and **Ambiguous Match**.
4. **Results — Parcel Review (`/results?id=...`)**:
   - Single well-organized page:
     - Fictional record ID and update date.
     - Assessment summary using only 3 cautious statuses:
       * *No Major Issue Detected in Available Data*
       * *Review Recommended*
       * *Information Incomplete*
     - Mandatory limitation note on every state.
     - Parcel summary showing only real mock data (absent fields show *"Not available in this sample"*).
     - Chronological event timeline (dated events sorted; unknown/invalid dates at the end).
     - Findings breakdown (What was detected, Why it matters, Evidence in sample, Missing information, Practical next step).
     - Explicit missing information section.
     - Recommended actionable next steps.
     - Actions: **"Check another parcel"** (clears form) and **"Edit parcel details"** (preserves entered values).
5. **About & Limitations (`/about`)**:
   - Comprehensive explanation of what the prototype does and what it does NOT do.
   - Clarification that no-match and missing events are not evidence of safety.
   - Educational breakdown of Section 89 of the SAT Act, 1950 (LT Notices).
   - External official resource links clearly marked as external with safe attributes.

---

## 🏗️ 3. Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Disclaimer.tsx          # Statutory notices (compact & full)
│   │   ├── LanguageSwitcher.tsx    # Bilingual toggle (English / Bangla)
│   │   └── ToastContainer.tsx
│   ├── layout/
│   │   ├── AppShell.tsx            # Main shell with skip-to-content
│   │   ├── Header.tsx              # BhumiSure branding, 3 nav links, CTA
│   │   └── Footer.tsx              # Prototype disclaimer & external links
│   └── land/                       # Modular parcel components
├── data/
│   └── mockParcels.ts              # Dedicated fictional parcel dataset (BS-DEMO-001 to 008)
├── pages/
│   ├── HomePage.tsx                # Page 1: Home
│   ├── CheckLandPage.tsx           # Page 2: Check Land form
│   ├── ParcelResultsPage.tsx       # Page 3: Single-screen Parcel Results
│   ├── AboutPage.tsx               # Page 4: About & Limitations
│   └── NotFoundPage.tsx            # 404 Route fallback
├── utils/
│   ├── normalizeParcel.ts          # String normalization (whitespace, lowercase)
│   ├── validateParcel.ts           # Form validation & first-invalid field focus
│   ├── matchParcel.ts              # Composite matching, JL conflict, ambiguity
│   ├── assessParcel.ts             # Deterministic rules (3 cautious statuses)
│   ├── sortEvents.ts               # Chronological timeline sorting
│   └── formatDate.ts               # Safe date formatting without "Invalid Date"
├── App.tsx                         # Client-side router configuration
└── main.tsx                        # React application entry point
```

---

## 💻 4. Getting Started & Available Commands

### Prerequisites
- Node.js (v18 or higher recommended)
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
Executes the pure domain logic test suite (`scripts/verify-mvp.js`) testing:
- Identifier normalization
- Required-field validation
- Composite matching, JL conflicts, and ambiguous detections
- Event chronological sorting with null/invalid date placement
- Safe date formatting

### 4. Build Production Bundle
```bash
npm run build
```
Runs the TypeScript type-checker (`tsc`) and Vite production bundler (`vite build`).

---

## ⚠️ 5. Statutory Limitations & Disclaimer

> **BhumiSure is an independent digital prototype created for educational and evaluation purposes. It does not access real government databases, does not contain real citizen records, and does not provide legal title clearance, ownership certification, or fraud warranties. Formal land transactions require certified physical documents and consultation with an authorized property attorney and local land authorities.**
