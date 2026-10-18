# BhumiVerify — Full Project Plan

**Project blueprint • Bangladesh GovTech • Land transaction risk assessment**  
*Reference: [news24bd.tv](https://www.news24bd.tv/details/255835?utm_source=chatgpt.com)*

---

### **BhumiVerify**
**Tagline:** *Verify Before You Buy.*

**BhumiVerify** is a proposed digital platform that helps people assess potential risks associated with a land transaction in Bangladesh before they commit money or proceed with registration. It organizes parcel identifiers, available transaction-related events, mutation status, conflicting information, and review decisions into one understandable report.

The goal is not simply to build a dashboard. It is to demonstrate a complete, trustworthy workflow that helps a prospective land buyer understand what information is available, what it indicates, what remains uncertain, and what should be checked next.

For the hackathon, build a working frontend prototype with realistic fictional data. A real government-connected service would require authorized data access, legal approval, privacy and security reviews, and cooperation from the relevant authorities.

---

### 1. The problem BhumiVerify solves
Land buyers may need to inspect multiple documents and interact with different offices or services to understand a property's history. They can struggle to determine whether:
- A mutation application has been submitted.
- A transfer-related event or registered deed has been recorded in the available dataset.
- Mutation has actually been completed.
- The identifiers in different records refer to the same parcel.
- Records conflict, are incomplete, or need further verification.
- A seemingly clean record is simply missing information.

**BhumiVerify** brings these signals together into a parcel-specific, explainable risk assessment.

#### The core promise
Before proceeding with a land transaction, help the buyer identify available evidence, possible warning signs, missing information, and the appropriate next verification steps.

> **Important:** **BhumiVerify** does not certify ownership, determine legal title, replace a lawyer or land office, or guarantee that a parcel is free from fraud.

---

### 2. Project objectives

1. **Identify the parcel accurately**: Collect enough administrative and cadastral identifiers to avoid relying on a dag number alone.
2. **Organize transaction signals**: Display available transfer-related events, mutation applications, mutation completion, and record inconsistencies.
3. **Explain potential risks**: Show the evidence behind each warning, its source status, its uncertainty, and what the buyer should verify.
4. **Protect restricted information**: Separate identity verification from permission to access a specific parcel's information.
5. **Maintain accountability**: Track requests, reviewer decisions, access expiry, and audit events.

---

### 3. Scope: what to build first

#### MVP — Must have
Parcel search and matching, demo identity verification, parcel access requests, reviewer approval, mock payment, risk overview, transaction timeline, request tracking, and audit log.

#### Version 2 — If time permits
Bangla localization, downloadable sample report, richer filters, map-based parcel visualization, and improved risk explanations.

#### Future production system
Authorized government integrations, real identity checks, official fee policy, secure server-side authorization, formal data-sharing agreements, and legally reviewed risk rules.

---

### 4. Recommended technology stack
Since your target is a frontend-first React prototype, keep the stack simple and fast to develop.

- **React + TypeScript + Vite**: Frontend foundation, component-based UI, and fast development server.
- **Tailwind CSS**: Responsive layouts, spacing, typography, and reusable design patterns.
- **React Router + Lucide React**: Page navigation and consistent icons.
- **React Hook Form + Zod**: Form validation for parcel requests, identity demo, and reviewer decisions.

*For the prototype:* Use a typed mock-service layer and browser persistence for demo state. Do not add a real database or government API simply to make the demo appear more advanced.

*Production architecture later:* React frontend → secure backend API → authorization and audit services → approved government data sources. The browser must never be the authority for access permissions.

---

### 5. User roles and permissions

| Feature | Citizen / Buyer | Reviewer | Auditor | Admin |
| :--- | :--- | :--- | :--- | :--- |
| Complete demo identity check | Yes | — | — | Demo support |
| Submit parcel request | Yes | — | — | — |
| Track own requests | Yes | — | Read-only oversight | Oversight |
| Approve or reject requests | No | Yes | No | Policy-dependent |
| View approved parcel information | Yes | Review scope | Masked audit view | Authorized demo configuration |
| View audit events | Own relevant history | Review actions | Yes | Yes |
| Configure demo SLA, fee and expiry | No | No | No | Yes |

*The prototype can include a role switcher so a mentor can test all flows without creating multiple accounts. It must be labelled **Demo role switcher**. In production, the server must enforce each permission independently of the selected UI role.*

---

### 6. Complete application workflow
From parcel request to risk report:

1. **Open BhumiVerify**: The landing page explains the service, limitations, privacy approach, and the steps needed to request parcel information.
2. **Verify identity (demo)**: The user completes a simulated identity check. No real NID number, document image, or sensitive credential is required.
3. **Identify the parcel**: The user enters the administrative location and parcel identifiers. The application checks the supplied identifiers against seeded mock records.
4. **Submit an access request**: The user specifies the purpose, requested information categories, and the parcel. The system generates a request ID and target review deadline.
5. **Reviewer assesses the request**: The reviewer checks identity status, parcel match, purpose, scope, sensitivity, and data availability.
6. **Decision is recorded**: The reviewer approves, approves selected categories only, requests more information, or rejects with a reason.
7. **Simulated payment, if configured**: Payment is shown only after approval. It is a demonstration of a potential future policy, not an official government fee.
8. **Display authorized information**: The citizen sees only the approved categories, the evidence timeline, risk explanations, caveats, and recommended next steps.
9. **Expire access and retain an audit trail**: Access ends at the configured expiry. The demo shows the request, decision, and access events in an audit history.

#### Proposed review SLA
*These are prototype targets, not confirmed government service commitments.*

| Event | Proposed target |
| :--- | :--- |
| Request receipt | Immediately |
| Initial review | Within 4 business hours |
| Update when further review is required | Within 1 business day |
| Decision notification | When the decision is recorded |
| Access activation | After approval and any configured mock payment |

The UI should display the submission time, target deadline, elapsed time, and current status. In the real system, official SLA rules would need authorization and formal publication.

---

### 7. Parcel identification and matching
Do not identify land by dag number alone. A number may recur in different administrative locations, and records may contain incomplete or inconsistent identifiers.

#### Collect the available fields below:
| Field | Purpose |
| :--- | :--- |
| **Division** | Broad administrative location |
| **District** | Narrower location |
| **Upazila / Thana** | Local administrative location |
| **Mouza** | Identifies the relevant cadastral area |
| **JL number** | Additional mouza identifier, where applicable |
| **Khatian number** | Identifies the relevant record |
| **Dag number** | Identifies the plot within its relevant record context |
| **Land area and unit** | Helps compare parcel descriptions |
| **Boundary or adjacent-plot details** | Additional cross-check when available |
| **Record type and source reference** | Clarifies which record is being compared |

*Not every field will necessarily be available in every record. Show missing values explicitly rather than inventing them.*

#### Matching outcomes:
- **Strong match:** key identifiers are consistent across the supplied records.
- **Partial match:** some identifiers agree, but important details are missing.
- **Conflicting match:** identifiers disagree and need manual review.
- **No match:** no corresponding mock record was found.
- **Insufficient data:** there is not enough evidence to assess a match.

> *A matching result is not proof of ownership or title.*

---

### 8. Risk assessment engine
The core feature is an understandable explanation of possible risk, not an unexplained AI-generated score.

#### Transaction events to distinguish:
- **A. Mutation application submitted:** An application event exists in the available dataset. This does not mean mutation has been completed.
- **B. Registered deed / transfer-related event or LT Notice:** A registration-related event is recorded in the available dataset. It is not automatically proof that every land-record system has updated.
- **C. Mutation completed:** The dataset marks mutation as completed. This status must not be treated as a substitute for checking title, encumbrances, disputes, or other relevant documents.

#### Recommended risk labels:
Use four clearly distinguishable outcomes:
1. **Elevated concern:** a documented conflicting identifier or a significant unresolved inconsistency exists.
2. **Review recommended:** a relevant event or unresolved status warrants further checking.
3. **No major issue detected in available data:** the checked mock records did not reveal a defined warning. This is not a declaration of safety.
4. **Insufficient information:** data is missing, stale, ambiguous, or not matched well enough to support a conclusion.

> *The UI should never label a parcel simply “Safe” or “Fraud-free.”*

#### Explain every warning:
Each risk indicator should show:
- What was detected.
- Which event or record supports it.
- The source and timestamp in the demo dataset.
- Why the signal may matter.
- What remains unverified.
- The recommended next step.

*For example, a recent transfer-related event combined with mutation still pending or unknown may justify a review warning. The application should explain the combination, rather than claiming that a crime or fraud has occurred.*

---

### 9. Full page and navigation plan
The app has two clear areas: the public/citizen experience and the internal review workspace.

#### Page map:
- **Citizen Area:**
  - Landing page: `/` — Explain the service, how it works, limitations, and primary call to action.
  - Citizen dashboard: `/dashboard` — Show recent requests, request statuses, deadlines, and approved reports.
  - Identity verification demo: `/identity-verification` — Simulate identity verification and show verification status.
  - New parcel request: `/requests/new` — Enter parcel identifiers, purpose, and requested information categories.
  - Request tracking: `/requests/:id` — Show timeline, SLA deadline, reviewer messages, and decision.
  - Parcel risk report: `/parcels/:id/report` — Show available-data summary, event timeline, risk explanations, and caveats.
  - Profile and notifications: `/profile` — Show demo profile, notification history, and access sessions.
- **Staff Area:**
  - Reviewer dashboard: `/reviewer` — Review queue, case detail inspection, decision actions.
  - Auditor dashboard: `/auditor` — Audit log trail, verification integrity metrics.
  - Admin settings: `/admin` — SLA rules, fee policies, simulation controls.

#### Essential page behavior:
- **Landing page:**
  - BhumiVerify logo and primary navigation.
  - “Check Land Transaction Risks” primary call to action.
  - Three-step service explanation.
  - Example of a risk report.
  - Privacy and eligibility explanation.
  - Prominent prototype disclaimer.
- **Citizen dashboard:**
  - Identity status.
  - New request button.
  - Requests grouped by status.
  - Target deadlines and overdue indicators.
  - Approved report links and access expiry.
  - Notifications for reviewer decisions or requests for more information.
- **New parcel request:**
  - Structured parcel form with inline validation.
  - Purpose of request.
  - Selectable data categories.
  - Confirmation that submitted details are sample/demo data.
  - Submission receipt with a unique request ID.
- **Reviewer workspace:**
  - Searchable and filterable queue.
  - Request age, target deadline, and current status.
  - Parcel matching results and unresolved conflicts.
  - Purpose and requested information scope.
  - Decision controls and mandatory reasons where applicable.
- **Parcel report:**
  - Overall assessment label and its limitations.
  - Parcel identifier summary.
  - Activity timeline.
  - Matched and unmatched record indicators.
  - Individual risk signals with supporting evidence.
  - Missing-information section.
  - Suggested next checks.
  - Data freshness and source labels.

---

### 10. Main dashboard design

```text
BhumiVerify
Land transaction risk assessment | DEMO
Good morning
Review your parcel requests and check their latest status.

Identity verification: Verified (demo)
(Your demo identity status is separate from permission to access parcel information.)

Open requests: 02  |  Available reports: 01

Recent parcel request:
DEMO-PARCEL-001 [Under review]
Request: BV-DEMO-1001
Next step: reviewer assessment
Target deadline shown from the configured demo SLA
```

#### Visual style
- White or warm off-white page backgrounds.
- Deep green or navy for primary actions, with restrained teal accents.
- Neutral borders, consistent spacing, modest rounded cards.
- Clear tables, status badges, forms, and timelines.
- No excessive gradients, oversized charts, or unnecessary animations.
- Mobile-responsive layout with accessible contrast and keyboard navigation.
- English for the initial prototype, with components designed for future Bangla localization.
- Use original **BhumiVerify** branding. The interface may be inspired by the clarity of public-service websites, but must not copy government seals, logos, or claim government endorsement.

---

### 11. Data model
Use shared TypeScript types across pages and the mock-service layer. The following entities are sufficient for the first version:

| Entity | Important fields |
| :--- | :--- |
| **User** | id, displayName, role, identityStatus |
| **Parcel** | id, location fields, mouza, JL, khatian, dag, area |
| **ParcelRecord** | id, parcelId, record type, source label, timestamp, match status |
| **TransactionEvent** | id, parcelId, event type, event date, source reference, status |
| **AccessRequest** | id, userId, parcelId, purpose, requested categories, status, submitted time, deadline |
| **ReviewDecision** | id, requestId, reviewer ID, decision, approved categories, reason, timestamp |
| **PaymentRecord** | id, requestId, amount, status, mock receipt ID |
| **AccessGrant** | id, requestId, permitted categories, start time, expiry time |
| **Notification** | id, userId, requestId, type, message, read state |
| **AuditEvent** | id, actor ID, action, target ID, timestamp, masked metadata |

#### Request status lifecycle:
- **Submitted**
- **Under review**
- **Approved / limited** (Continue to payment, if configured, then grant access)
- **More information** (Citizen responds; reviewer reassesses)
- **Rejected** (Decision and reason shown to the citizen)
- **Expired** (Previously granted access is no longer active)

---

### 12. Seed data for the demo
Four fictional parcels representing diverse scenarios:

1. **Scenario 001 — Recent transfer signal (Review recommended)**  
   *Parcel ID: DEMO-PARCEL-001*  
   A transfer-related event is recorded in the sample dataset. Mutation status is pending or unknown. The report explains why this combination needs further verification.
2. **Scenario 002 — Mutation application (Pending event)**  
   *Parcel ID: DEMO-PARCEL-002*  
   A mutation application event exists. No completion event is included in the mock records. The report explicitly says that an application is not completed mutation.
3. **Scenario 003 — Mutation marked complete (Status recorded)**  
   *Parcel ID: DEMO-PARCEL-003*  
   The mock record marks mutation as completed. The report still explains that title, disputes, encumbrances, and other relevant issues are not thereby cleared.
4. **Scenario 004 — Conflicting identifiers (Manual review)**  
   *Parcel ID: DEMO-PARCEL-004*  
   Dag or khatian information conflicts between fictional records. The system flags the mismatch and does not confidently combine the records.

---

### 13. Privacy, security, and trust
- **Fake identity only:** never collect real NID data or real identity-document images.
- **Least privilege:** display only the categories approved for the current request.
- **Purpose limitation:** request information for a specific parcel and stated purpose.
- **Time-limited access:** visibly show when an access grant expires.
- **Masked audit records:** avoid exposing sensitive personal information in the audit interface.
- **No sensitive logs:** do not log real credentials, payment details, or personal identifiers.
- **Clear mock labels:** every sample record, identity status, payment, and event must be identifiable as demo data.
- **Production authorization:** validate roles, access grants, expiry, and data categories on the backend.
- **Rate limiting and monitoring:** add these before exposing real APIs.
- **Correction and appeal:** design a future process for reporting errors, disputing a record match, and requesting review.

---

### 14. Functional requirements and acceptance checklist
- [x] Landing page explains the purpose and limitations.
- [x] Demo identity verification changes the user's status.
- [x] Unverified users cannot submit restricted-information requests.
- [x] Parcel form validates required fields and creates a request ID.
- [x] Citizen can track the request and see its deadline.
- [x] Reviewer can approve, limit approval, request more information, or reject.
- [x] Requesting more information and rejecting require a reason.
- [x] Decision notifications appear in the citizen workspace.
- [x] Mock payment is available only after approval, when configured.
- [x] Only approved information categories are visible.
- [x] Access expires and the report reflects the expired state.
- [x] Timeline distinguishes transfer-related events, mutation applications, and completed mutation.
- [x] Every risk warning includes its supporting evidence and limitations.
- [x] No-match or missing data never results in a claim that land is safe.
- [x] Audit log records key actions.
- [x] All seed data is clearly marked as fictional.
- [x] Mobile layouts, form validation, loading, empty, and error states work.
- [x] Reset demo restores the initial seed data.
- [x] README explains setup, demo scenarios, limitations, and production gaps.

---

### 15. Development roadmap
- **Week 1: Foundation and design** — Initialize React, TypeScript, and Vite. Set up routes, navigation, design tokens, and reusable components. Build the landing page, dashboard shell, and role switcher. Define typed data models and seed records.
- **Week 2: Citizen journey** — Implement demo identity verification. Build parcel search and request forms. Add request tracking, deadlines, and notifications. Persist demo state and implement reset functionality.
- **Week 3: Review and risk engine** — Implement the reviewer queue and decision actions. Add approved-category filtering and mock payment. Build the parcel report and event timeline. Add explainable risk rules, audit history, and access expiry.
- **Week 4: Testing and presentation** — Test all request statuses and edge cases. Fix mobile layouts, accessibility issues, and broken interactions. Write the README and project documentation. Prepare demo scenarios and rehearse the presentation.

---

### 16. Testing plan

| Test case | Expected result |
| :--- | :--- |
| Unverified citizen submits a request | Restricted request is blocked with a clear explanation |
| Verified citizen submits valid parcel details | Request ID is created |
| Required parcel identifiers are missing | Validation message is shown |
| Multiple identifiers conflict | Match is flagged for manual review |
| Reviewer approves selected categories | Only those categories become accessible |
| Reviewer rejects without a reason | Decision is not accepted until a reason is supplied |
| Citizen pays before approval | Payment action is unavailable |
| Access grant expires | Restricted report access ends |
| No transaction event exists | Report shows missing/unknown evidence, not “safe” |
| Mock source is outdated | Report displays a freshness warning |
| Demo state is reset | Initial seed scenarios return |
| User switches to an unauthorized role in production | Backend denies the unauthorized action |

---

### 17. Suggested project structure
```text
bhumiverify/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── data-display/
│   │   ├── timeline/
│   │   └── status/
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── IdentityVerificationPage.tsx
│   │   ├── NewRequestPage.tsx
│   │   ├── RequestDetailsPage.tsx
│   │   ├── ParcelReportPage.tsx
│   │   ├── ReviewerPage.tsx
│   │   ├── AuditorPage.tsx
│   │   └── AdminPage.tsx
│   ├── features/
│   │   ├── identity/
│   │   ├── parcels/
│   │   ├── requests/
│   │   ├── review/
│   │   ├── risk/
│   │   ├── payments/
│   │   └── audit/
│   ├── services/
│   │   └── mockApi.ts
│   ├── data/
│   │   └── seedData.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   └── styles/
├── README.md
└── package.json
```

---

### 18. Mentor presentation plan
Aim for a 5-to-7 minute demonstration:
1. **Introduce the problem:** Explain why buyers need clearer visibility into available transaction-related events before proceeding.
2. **Show the citizen dashboard:** Demonstrate the fictional verified identity status and explain why identity verification does not automatically grant parcel access.
3. **Submit a request:** Use `DEMO-PARCEL-001`, select a purpose and categories, and show the generated request ID and review target.
4. **Switch to the reviewer workspace:** Inspect the parcel match, requested scope, and supporting sample records.
5. **Make a limited approval:** Explain the reviewer’s reasoning and show the notification on the citizen side.
6. **Complete the simulated payment:** Show that it becomes available only after approval.
7. **Open the parcel report:** Explain the transfer-related event and pending/unknown mutation status through the timeline.
8. **Show a conflict scenario:** Use `DEMO-PARCEL-004` to demonstrate why ambiguous matching should not generate a confident assessment.
9. **Finish with accountability and future scope:** Show access expiry, audit history, the demo disclaimer, and what official integration would require.

#### Questions your presentation should answer:
- What specific problem does **BhumiVerify** solve?
- Why is it more useful than simply displaying a land record?
- How does it distinguish an application from a completed process?
- How does the platform prevent payment from bypassing approval?
- What happens when data is missing or contradictory?
- How would authorized government integration and legal review change the prototype?

---

### 19. Project deliverables
- Working React frontend.
- Responsive citizen and reviewer interfaces.
- Fictional seed data for all four parcel scenarios.
- End-to-end request, decision, payment, report, and expiry workflow.
- Explainable risk rules and parcel matching.
- Mock audit log and notifications.
- Persistent prototype disclaimer and demo labels.
- README with installation and run instructions.
- Full project documentation and architecture diagram.
- Test checklist and mentor presentation script.
- A list of limitations and production requirements.

---

### 20. Final product disclaimer
Display this notice on the landing page, sample reports, and relevant decision screens:

> #### About BhumiVerify
> **BhumiVerify** is a demonstration prototype using fictional sample data. It is not an official government service, official land record, title certificate, legal opinion, or guarantee against fraud. Risk indicators are illustrative and depend on the data available in the prototype. Real deployment would require authorized data access, legal review, privacy and security safeguards, and approval from the responsible authorities.

---

### 21. Research and official reference points
The product design should be informed by the actual responsibilities and workflows of Bangladesh's land and registration services, without implying that the prototype has access to their systems:
- [Ministry of Land](https://minland.gov.bd/?utm_source=chatgpt.com) — ministry information, notices, laws, forms, and service links.
- [Land Information Portal](https://land.gov.bd/?utm_source=chatgpt.com) — public-facing land service categories and guidance.
- [e-Mutation portal](https://mutation.land.gov.bd/?utm_source=chatgpt.com) — mutation-related service workflows and guidance.
- [Land Registration Management Automation Project](https://eregistration.gov.bd/?utm_source=chatgpt.com) — registration-related service and project information.
- [Registration Act, 1908](https://bdlaws.minlaw.gov.bd/act-90/act-part-print-562.html?utm_source=chatgpt.com) — legal reference for registration processes.

*These references are starting points for research, not confirmation that a usable API exists or that any particular information can legally be disclosed through **BhumiVerify**.*

---

### Final recommendation
Build **BhumiVerify** as a trustworthy, explainable land transaction risk-review prototype, not as a fictional system that claims to verify legal ownership automatically.

Prioritize these five things first:
1. A clean and professional citizen dashboard.
2. Accurate parcel identification and matching.
3. A complete request → review → decision → optional payment → report workflow.
4. An evidence-backed timeline and understandable risk explanations.
5. Clear handling of missing data, conflicting records, access expiry, and privacy.
