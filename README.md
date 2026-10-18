# LandTech BD (BhumiVerify) — Pre-Registration Land Fraud Prevention & Controlled Land-Information Access Platform

> **Demonstration Prototype for Hackathon / Mentor Evaluation**  
> *Independent technical demonstrator inspired by Bangladesh public-service land administration portals. Zero external backend or live network calls required.*

---

## ⚠️ Statutory Platform Notice & Limitations

> **“LandTech BD is a demonstration prototype using sample data. It is not an official government service, official land record, title certificate, legal opinion, or guarantee against fraud. Real use would require authorized data access, legal review, privacy safeguards, and approval from the responsible authorities.”**

Every sample record is marked **DEMO DATA** and every simulated feed is marked **SIMULATED SOURCE**.

### Core Land Diligence Principles
1. **Registered Deed ≠ Completed Mutation:** Execution of a deed at the Sub-Registry Office does not transfer ownership in the revenue record until an e-Mutation case is approved by the Assistant Commissioner (Land).
2. **Mutation Application ≠ Proof of Approval:** Filing an application does not guarantee sanction. Petitions can be rejected upon field hearing.
3. **No Matching Event ≠ Land Is Safe:** Absence of transaction signals in demo cache does not guarantee clean title. Always conduct certified searches at Upazila Land Offices and Sub-Registries.

---

## 🏛️ Official Portals Research & Information Architecture

The interface design and workflows were guided by research into Bangladesh's official digital land services:
- **Ministry of Land:** [https://minland.gov.bd/](https://minland.gov.bd/)
- **Land Information Portal:** [https://land.gov.bd/](https://land.gov.bd/)
- **e-Mutation Central System:** [https://mutation.land.gov.bd/](https://mutation.land.gov.bd/)
- **Land Registration Management Automation Project:** [https://eregistration.gov.bd/](https://eregistration.gov.bd/)

### Applied Design Principles:
- **Categorized Services:** Clear separation between parcel requests, compliance review, and audit oversight.
- **Cadastral Terminology:** Familiar Bengali/English terms: Division (বিভাগ), District (জেলা), Upazila (উপজেলা), Mouza (মৌজা), J.L. No. (জে.এল. নং), Khatian (খতিয়ান), Dag/Plot (দাগ), and LT Notice (Section 89 SAT Act).
- **Restrained Civic Palette:** White/off-white background, deep navy/teal navigation, neutral borders, with semantic amber for review warnings, red for rejections/conflicts, and green for approved states.
- **Original Identity:** Custom LandTech BD mark; no government seals or simulated endorsements.

---

## 👥 Simulated Roles & Multi-User Shared State

All roles share synchronized state in `localStorage`. Evaluators can switch roles using the **Top Demo Role Switcher**:

| Role | Responsibility | Primary Views |
|---|---|---|
| **Citizen / Buyer** | Pre-purchase applicant requesting transaction signals for a specific parcel | Overview, New Request, My Requests, Request Details, Simulated Payment, Parcel Risk Overview, Notifications, Profile |
| **Official Reviewer** | Authorized officer evaluating citizen standing and adjudicating disclosure scope | Review Dashboard, Pending Requests Queue, Adjudication Modal (Approve, Limited, More Info, Reject), Decision History |
| **Compliance Auditor** | Independent auditor reviewing immutable audit trails and feed health | Audit Log, Controlled Access Token History, Data Source Health Monitoring |
| **Administrator** | System manager configuring demo fees, review SLAs, and data seeds | Fee Policy (BDT), SLA Timers, Demo Record Overview, Instant Data Reset |

---

## 🧪 Seeded Demo Scenarios (Ready for Evaluation)

Four diverse parcels are pre-seeded to test key evaluation edge cases:

1. **`DEMO-PARCEL-001` (Tejgaon I/A, Dag 402)**
   - *Scenario:* Recent transfer deed registered at Sub-Registry Office 18 days ago; mutation pending/unknown.
   - *Signal:* **"Recent transfer event — verify mutation status."**
   - *Caveat:* Deed registration does not guarantee mutation approval.

2. **`DEMO-PARCEL-002` (Dhanmondi R/A, Dag 118)**
   - *Scenario:* Active e-mutation application filed online; hearing scheduled.
   - *Signal:* **"Mutation application recorded — review recommended."**
   - *Caveat:* Application is not proof of approval; objections may be lodged.

3. **`DEMO-PARCEL-003` (Gulshan, Dag 85)**
   - *Scenario:* Mutation completed; new Khatian 991 issued.
   - *Signal:* **"Mutation completed — standard pre-purchase due diligence still required."**
   - *Caveat:* Completed revenue record does not substitute for civil court search.

4. **`DEMO-PARCEL-004` (Savar / Aminbazar, Dag 999)**
   - *Scenario:* Discrepancy between historic SA survey sheet and RS cadastral sheet.
   - *Signal:* **"Possible match / Conflicting identifiers — official review needed."**
   - *Rule:* Automated disclosure is blocked; physical survey inspection required.

---

## 🔐 Mandatory Business Rules Tested

- **Identity Gate:** Unverified citizens cannot submit requests (evaluators can toggle verification on/off in Profile or Identity page).
- **Cadastral Hierarchy:** Requires Division, District, Upazila, Mouza, and Dag number; warns that Dag alone does not guarantee a unique match.
- **Reviewer Adjudication:** Restricted details appear **only after** an officer reviews and approves the request. Rejection and More-Info require mandatory written justification.
- **Controlled Scope:** Limited approval discloses only permitted categories; redacted categories remain locked.
- **Simulated Payment Gate:** Fee payment is simulated (Mobile Wallet, Card, Bank) and available **only after approval**. Allows simulating both **successful payment** (unlocks signals) and **failed payment** (grants no access).
- **Time-Locked Viewing:** Signals auto-expire after the permitted validity window (default 72 hours).
- **Immutable Audit Trail:** All submissions, adjudications, payment attempts, and disclosures generate audit events.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production / typecheck
npm run build

# 4. Preview production bundle
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 Resetting Demo State

To restore all parcels, requests, audit logs, and settings to the baseline scenarios at any time:
1. Click **"Reset Demo"** in the top role switcher bar, OR
2. Go to **Administrator → Reset All Demo Data**.

---

## 📦 Technology Stack

- **Framework:** React 18 + TypeScript + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (Clean public-service color tokens)
- **Icons:** Lucide React
- **State Management:** React Context API + LocalStorage Synchronization
- **Network:** 100% Mock Services & Data (No external APIs or tracking)
