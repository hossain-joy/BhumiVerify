# ভূমিভেরিফাই (BhumiVerify)
### Pre-Registration Land Transaction Risk Assessment MVP • Bangladesh GovTech

> **A focused, clean, functional MVP for assessing pre-registration land transaction signals in Bangladesh.**  
> *Built with React, TypeScript, and Tailwind CSS. Client-side prototype powered entirely by realistic fictional demo records. No external API calls or live database dependencies required.*

---

## 🎯 1. Core Purpose & Objective

In Bangladesh, prospective land buyers face a dangerous information gap: committing money or executing deed registration before knowing whether a transfer deed has already been registered, an e-mutation petition is pending, or historical survey sheets conflict.

**BhumiVerify solves this by providing one primary, transparent journey:**
$$\text{Enter parcel identifiers} \longrightarrow \text{Review matched sample parcel} \longrightarrow \text{View risk overview \& activity timeline}$$

---

## 🌟 2. Minimal 3-Page Structure

Instead of fragmented administrative portals, the application is streamlined into three essential public-service pages:

1. **Home (`/`)**:
   - Platform value proposition and problem statement.
   - 3-step verification guide.
   - 4 pre-configured demo scenario cards for instant 1-click testing.
   - Core statutory land diligence principles under Bangladesh law.
2. **Check Land (`/check`)**:
   - Multi-identifier input form (Division, District, Upazila, Mouza, Khatian, Dag number).
   - Form validation & pre-fill scenario buttons.
   - Parcel identification summary for the matched record.
   - 3 core status checkpoints (Transfer Deed Event, Mutation Application Status, Mutation Completion Status).
   - Rule-based risk assessment badge (`Review Recommended`, `Information Incomplete`, `No Major Issue Detected in Available Data`).
   - 4-box transparent explanation:
     - **What was detected**
     - **Why it may matter**
     - **What information is missing**
     - **What the user should verify next**
   - Chronological activity timeline with dates, sources, and caveats.
   - Action to start a new search or print summary report.
3. **About (`/about`)**:
   - Institutional context: The structural disconnect between Sub-Registry deed registration (Ministry of Law) and AC Land mutation (Ministry of Land).
   - Section 89 of the State Acquisition and Tenancy (SAT) Act, 1950 (Statutory Land Transfer / LT Notice).
   - Rule-based transparent methodology (deterministic logic without opaque AI).
   - Statutory disclaimers and links to official Bangladesh government land portals.

---

## 🧪 3. Predefined Fictional Demo Scenarios

The system includes 8 realistic fictional parcel records demonstrating distinct transaction outcomes across Bangladesh:

| Parcel ID | Location | Identifiers | Risk Assessment Label | Key Signal & Caveat |
|---|---|---|---|---|
| **`DEMO-PARCEL-001`** | Tejgaon, Dhaka | Mouza: Tejgaon I/A<br>Dag: **402**, Khatian: 1204 | **Review Recommended** | **Recent Transfer Deed Recorded:** Saf-Kabala deed executed and Section 89 LT notice dispatched, but e-mutation is not completed in land records. *Deed does not equal mutation.* |
| **`DEMO-PARCEL-002`** | Dhanmondi, Dhaka | Mouza: Dhanmondi R/A<br>Dag: **118**, Khatian: 541 | **Information Incomplete** | **Mutation Petition Pending:** Online application filed and hearing scheduled at AC Land; final order not yet issued; registered Power of Attorney. *Application is not proof of approval.* |
| **`DEMO-PARCEL-003`** | Gulshan, Dhaka | Mouza: Gulshan<br>Dag: **85**, Khatian: 991 | **No Major Issue Detected in Available Data** | **Mutation Completed:** AC Land order approved and updated mutation khatian issued. Tax paid to date. *Pre-purchase due diligence, physical beacon check, and civil title search still required.* |
| **`DEMO-PARCEL-004`** | Savar / Aminbazar | Mouza: Aminbazar<br>Dag: **999**, Khatian: 301 | **Review Recommended** | **Conflicting Survey Records:** Discrepancy detected between historic SA sheet and modern RS digitization with acreage mismatch. Active civil court stay order flagged. *Ground survey required.* |
| **`DEMO-PARCEL-005`** | Nasirabad, Chattogram | Mouza: Nasirabad<br>Dag: **210**, Khatian: 540 | **Review Recommended** | **Bank Mortgage & Contested POA:** Registered mortgage charge with Agrani Bank PLC (Ref: MORT-2024-CTG-901) and principal filed Power of Attorney revocation notice. *Bank NOC mandatory.* |
| **`DEMO-PARCEL-006`** | Joydebpur, Gazipur | Mouza: Joydebpur<br>Dag: **201**, Khatian: 440 | **Review Recommended** | **Land Classification Mismatch:** Recorded as agricultural Nal in RS porcha, but transacted as industrial factory plot without DC Office land conversion clearance. *High penalty risk.* |
| **`DEMO-PARCEL-007`** | Zindabazar, Sylhet | Mouza: Zindabazar<br>Dag: **64**, Khatian: 190 | **Review Recommended** | **Co-Sharer Pre-Emption Lawsuit:** Family co-sharer lodged formal objection under SAT Act Section 96 alleging lack of statutory notice. *Partition deed needed.* |
| **`DEMO-PARCEL-008`** | Mirpur, Dhaka | Mouza: Senpara Parbata<br>Dag: **304**, Khatian: 580 | **No Major Issue Detected in Available Data** | **Clean Title Chain & Regular Tax:** CS -> SA -> RS -> City Survey uninterrupted chain, mutated porcha issued, e-Dakhila paid up to 1431 BS. *Standard precautions apply.* |

*Non-Existent Parcels (e.g., Dag 88888)*: Display a clear empty state explaining that no records were found in demo data, along with the warning that missing records do not guarantee the land is unencumbered.

---

## ⚖️ 4. Core Land Diligence Principles

BhumiVerify educates citizens on three fundamental legal tenets:

1. **Deed ≠ Mutation (দলিল ≠ নামজারি):** Under Section 89 of the SAT Act, 1950, a registered transfer deed transfers ownership between parties, but revenue records and tax liability (Dakhila) are only updated when the Assistant Commissioner (Land) approves an e-mutation.
2. **Application ≠ Approval (আবেদন ≠ অনুমোদন):** An active e-mutation petition submitted online is not proof of approval. Applications may be objected to or rejected during field verification by the Union Land Assistant Officer (ULAO).
3. **No Record Found ≠ Parcel is Safe (তথ্য না থাকা ≠ নিরাপদ):** The absence of negative signals in demo feeds must never be treated as evidence that the land is dispute-free. In-person physical possession verification and a 25-year chain-of-deeds (Baya deeds) title search at the Sub-Registry Office are mandatory.

---

## 🚫 5. Removed Complexities & Non-Core Features

To preserve simplicity, usability, and a complete working core workflow, the following unnecessary complexities were eliminated:
- ❌ Role-switching systems (Citizen, Reviewer, Auditor, Admin).
- ❌ Separate reviewer queues, auditor logs, and administrator settings dashboards.
- ❌ Identity verification gates (simulated NID uploads).
- ❌ Access-request approval workflows and SLA countdown timers.
- ❌ Simulated payment gateways and payment receipts.
- ❌ Notification center and user profile management.
- ❌ Complex decorative popups (cadastral map overlay, fee calculator, feature tour, parcel comparator, keyboard shortcuts).

---

## 💻 6. Technical Stack & Local Setup

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Vanilla CSS + Tailwind CSS (GovTech deep green & navy design system)
- **Icons:** Lucide React
- **Internationalization:** Bilingual (Bangla default with instant English toggle)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Execution
```bash
# Clone the repository
git clone https://github.com/hossain-joy/BhumiVerify.git
cd BhumiVerify

# Install dependencies
npm install

# Start the Vite development server
npm run dev

# Build production bundle with TypeScript type-checking
npm run build
```

---

## ⚠️ 7. Statutory Notice & Limitations

> **"BhumiVerify is an independent digital prototype created for educational and hackathon demonstration purposes. It does not access real government databases, does not contain real citizen records, and does not provide legal title clearance, ownership certification, or fraud warranties. Formal land transactions require certified physical documents and consultation with an authorized property attorney and local land authorities."**

---

### Official Bangladesh Land Administration Portals
- **National Land Portal:** [https://land.gov.bd/](https://land.gov.bd/)
- **e-Mutation Central System:** [https://mutation.land.gov.bd/](https://mutation.land.gov.bd/)
- **Ministry of Land:** [https://minland.gov.bd/](https://minland.gov.bd/)
- **Directorate of Registration:** [https://eregistration.gov.bd/](https://eregistration.gov.bd/)
