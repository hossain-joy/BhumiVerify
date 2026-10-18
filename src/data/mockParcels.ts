import { ParcelReference, LandEvent } from '../types';

export interface FictionalFinding {
  title: string;
  whyItMatters: string;
  sampleEvidence: string;
  missingInfo: string;
  nextStep: string;
}

export interface FictionalParcelRecord {
  id: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber: string | null;
  khatianNumber: string;
  dagNumber: string;
  area: string | null;
  areaUnit: string;
  landClassification: string | null;
  updatedDate: string;
  statusKey: 'no_major_issue' | 'review_recommended' | 'information_incomplete';
  statusExplanation: string;
  findings: FictionalFinding[];
  missingInformation: string[];
  recommendedNextSteps: string[];
  events: {
    id: string;
    type: 'transfer_related' | 'mutation_application' | 'mutation_completed';
    title: string;
    date: string | null;
    reference: string | null;
    explanation: string;
  }[];
}

export const MOCK_PARCELS: FictionalParcelRecord[] = [
  // 1. Consistent sample information
  // Status: "No Major Issue Detected in Available Data" (Never "Safe")
  {
    id: 'BS-DEMO-001',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Gulshan',
    mouza: 'Gulshan',
    jlNumber: '24',
    khatianNumber: '541',
    dagNumber: '85',
    area: '6.50',
    areaUnit: 'Decimal',
    landClassification: 'Residential / Bastu',
    updatedDate: '2026-03-15',
    statusKey: 'no_major_issue',
    statusExplanation: 'The available sample record reflects a consistent sequence of registered deed, mutation petition, and completed mutation order. Standard pre-purchase verification remains necessary.',
    findings: [
      {
        title: 'Documented Transfer and Mutation Sequence in Sample',
        whyItMatters: 'A registered transfer deed was followed by a formal mutation petition and an approved mutation order in the available sample records.',
        sampleEvidence: 'Transfer Deed DEED-DEMO-5541 registered on 2024-05-10, followed by e-Mutation order MUT-ORD-9011 on 2024-07-18.',
        missingInfo: 'Civil court non-litigation certificate and recent physical demarcation beacon verification.',
        nextStep: 'Obtain certified physical copies of the Mutation Porcha and tax dakhila from the AC (Land) office, and verify physical possession on site.',
      },
    ],
    missingInformation: [
      'Original volume book entry at Sub-Registry Office (requires physical nil search)',
      'Ground boundary pillar demarcation and physical access road verification',
      'Civil court non-encumbrance certificate (not included in this sample)',
    ],
    recommendedNextSteps: [
      'Compare all parcel identifiers with original and certified record copies.',
      'Independently verify the current record and mutation status through appropriate official channels.',
      'Conduct an in-person title search (Nil Search) for unrecorded encumbrances at the Sub-Registry Office.',
      'Physically inspect plot boundaries, access roads, and current occupants on site.',
      'Do not make a purchase decision based only on this prototype.',
    ],
    events: [
      {
        id: 'EVT-001-A',
        type: 'transfer_related',
        title: 'Registered Transfer Deed Executed',
        date: '2024-05-10',
        reference: 'DEED-DEMO-5541',
        explanation: 'Indicates that a deed was registered between parties at the Sub-Registry Office. A deed alone does not update government revenue records.',
      },
      {
        id: 'EVT-001-B',
        type: 'mutation_application',
        title: 'e-Mutation Application Submitted',
        date: '2024-06-02',
        reference: 'MUT-APP-8842',
        explanation: 'A formal petition filed with the Assistant Commissioner (Land) to open a new mutation khatian and transfer revenue liability.',
      },
      {
        id: 'EVT-001-C',
        type: 'mutation_completed',
        title: 'Mutation Order Approved & RoR Issued',
        date: '2024-07-18',
        reference: 'MUT-ORD-9011',
        explanation: 'AC (Land) formally approved the petition, issued a new mutated Khatian, and opened a new Jamabandi ledger.',
      },
    ],
  },

  // 2. Review recommended
  // Includes transfer-related event and mutation application, but no completion event in the sample.
  {
    id: 'BS-DEMO-002',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Tejgaon',
    mouza: 'Tejgaon I/A',
    jlNumber: '14',
    khatianNumber: '1204',
    dagNumber: '402',
    area: '5.25',
    areaUnit: 'Decimal',
    landClassification: 'Commercial / Factory Plot',
    updatedDate: '2026-02-20',
    statusKey: 'review_recommended',
    statusExplanation: 'A transfer deed and mutation application are recorded, but no completion event is included in this sample. Completion must be checked independently.',
    findings: [
      {
        title: 'Mutation Application Filed Without Completion Event in Sample',
        whyItMatters: 'Under Bangladesh land law (SAT Act Section 89), a registered transfer deed does not update government records until the AC (Land) signs a final mutation order. The application may be pending, contested, or rejected.',
        sampleEvidence: 'Deed DEED-DEMO-9912 logged on 2025-08-14 and mutation petition MUT-APP-4421 filed on 2025-09-01; no completion order exists in this sample.',
        missingInfo: 'Final hearing order, official DCR receipt, and newly issued mutation khatian.',
        nextStep: 'Track petition MUT-APP-4421 on mutation.land.gov.bd and verify at the Tejgaon Revenue Circle whether any objection has been lodged.',
      },
    ],
    missingInformation: [
      'AC (Land) formal approval order and Jamabandi update (not included in this sample)',
      'Official DCR fee payment receipt and issued Mutation Khatian',
      'Up-to-date Land Development Tax Dakhila in current claimant’s name',
      'Record of co-sharer notification under SAT Act Section 89',
    ],
    recommendedNextSteps: [
      'Track ongoing mutation petition MUT-APP-4421 directly through official AC (Land) channels.',
      'Do not disburse full payment or proceed to registry until a formal mutation order is approved.',
      'Review the underlying registered deed and relevant supporting documents.',
      'Confirm whether any co-sharer or interested party has filed an objection.',
      'Consult a qualified land professional or lawyer.',
    ],
    events: [
      {
        id: 'EVT-002-A',
        type: 'transfer_related',
        title: 'Registered Transfer Deed Recorded',
        date: '2025-08-14',
        reference: 'DEED-DEMO-9912',
        explanation: 'Deed executed at the Sub-Registry. Does not prove that the buyer has valid revenue title until mutation is complete.',
      },
      {
        id: 'EVT-002-B',
        type: 'mutation_application',
        title: 'e-Mutation Application Filed & Pending Hearing',
        date: '2025-09-01',
        reference: 'MUT-APP-4421',
        explanation: 'An application is active. Does not mean mutation is granted; petitions may be rejected during field inquiry.',
      },
    ],
  },

  // 3. Information incomplete
  // Limited event history and missing supporting identifiers/details.
  {
    id: 'BS-DEMO-003',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    mouza: 'Dhanmondi R/A',
    jlNumber: '08',
    khatianNumber: '88',
    dagNumber: '118',
    area: null,
    areaUnit: 'Decimal',
    landClassification: null,
    updatedDate: '2025-11-05',
    statusKey: 'information_incomplete',
    statusExplanation: 'Sample records contain limited event information and missing parcel details (e.g. area and deed baseline are unavailable).',
    findings: [
      {
        title: 'Underlying Deed Baseline and Land Area Missing in Sample',
        whyItMatters: 'Without recorded transfer deed details or land acreage, the basis and extent of ownership cannot be evaluated from this sample data.',
        sampleEvidence: 'Mutation application MUT-APP-3019 is logged on 2025-10-12 without prior deed references or recorded land area.',
        missingInfo: 'Acreage measurement, registered deed reference, and 25-year chain of title (Baya deeds).',
        nextStep: 'Request certified copies of the baseline registered deed, inheritance succession certificate (if applicable), and partition deed from the seller.',
      },
    ],
    missingInformation: [
      'Demarcated land area and boundaries (not available in this sample)',
      'Underlying registered transfer deed number and registration volume book reference',
      'Historical survey continuity (CS, SA, and RS sheets)',
      'Land Development Tax clearance history',
    ],
    recommendedNextSteps: [
      'Compare all parcel identifiers with original and certified record copies.',
      'Require the seller to produce the complete 25-year chain of Baya deeds.',
      'Independently verify the current record and mutation status through appropriate official channels.',
      'Consult a qualified land lawyer before paying any deposit or advance.',
    ],
    events: [
      {
        id: 'EVT-003-A',
        type: 'mutation_application',
        title: 'e-Mutation Petition Submitted',
        date: '2025-10-12',
        reference: 'MUT-APP-3019',
        explanation: 'Online petition submitted to Dhanmondi AC (Land). No prior deed or subsequent approval order is contained in this sample.',
      },
    ],
  },

  // 4. Test Scenario: JL Number Conflict
  // Demonstrates: if composite matches but JL differs, produces conflict result!
  {
    id: 'BS-DEMO-004',
    division: 'Chattogram',
    district: 'Chattogram',
    upazila: 'Panchlaish',
    mouza: 'Nasirabad',
    jlNumber: '32',
    khatianNumber: '210',
    dagNumber: '210',
    area: '8.00',
    areaUnit: 'Decimal',
    landClassification: 'Commercial',
    updatedDate: '2026-01-10',
    statusKey: 'review_recommended',
    statusExplanation: 'The record contains a bank mortgage lien and a Power of Attorney notation. If a different JL number is entered, a conflict is detected.',
    findings: [
      {
        title: 'Registered Bank Mortgage Lien on Record',
        whyItMatters: 'A registered mortgage creates a legal charge over the parcel. Land cannot be validly transferred without formal lender clearance.',
        sampleEvidence: 'Registered charge MTG-DEMO-771 in favor of Agrani Bank PLC.',
        missingInfo: 'Written mortgage redemption release certificate from the bank.',
        nextStep: 'Obtain formal written confirmation from the lender regarding full loan settlement and release of original title deeds.',
      },
    ],
    missingInformation: [
      'Bank Non-Encumbrance clearance certificate (not included in this sample)',
      'Power of Attorney validity and revocation check',
    ],
    recommendedNextSteps: [
      'Verify with the bank that the mortgage liability has been fully satisfied.',
      'Review original deed custody with the lending institution.',
      'Independently verify the current record and mutation status through official channels.',
    ],
    events: [
      {
        id: 'EVT-004-A',
        type: 'transfer_related',
        title: 'Power of Attorney Registered',
        date: '2024-02-15',
        reference: 'POA-DEMO-102',
        explanation: 'Registered irrevocable POA. Requires verification that the principal is alive and has not revoked authority.',
      },
      {
        id: 'EVT-004-B',
        type: 'transfer_related',
        title: 'Bank Mortgage Charge Registered',
        date: '2024-06-30',
        reference: 'MTG-DEMO-771',
        explanation: 'Formal financial mortgage registered with Agrani Bank PLC.',
      },
    ],
  },

  // 5 & 6. Test Scenario: Ambiguous Match (Two records share identical composite keys)
  {
    id: 'BS-DEMO-005',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    mouza: 'Aminbazar',
    jlNumber: '45',
    khatianNumber: '999',
    dagNumber: '999',
    area: '10.00',
    areaUnit: 'Decimal',
    landClassification: 'Nal / Agricultural',
    updatedDate: '2025-09-18',
    statusKey: 'review_recommended',
    statusExplanation: 'Historical SA Survey sheet for Dag 999. Inconsistent with RS sheet.',
    findings: [
      {
        title: 'Survey Discrepancy Across Cadastral Sheets',
        whyItMatters: 'SA sheet lists 10.00 decimal while RS revision lists 8.40 decimal, indicating an unresolved boundary or acreage variance.',
        sampleEvidence: 'Cadastral records SA Khatian 999 vs RS revision map.',
        missingInfo: 'Reconciled field survey map and joint demarcation decree.',
        nextStep: 'Commission an independent physical ameen survey before proceeding.',
      },
    ],
    missingInformation: [
      'Reconciled joint field survey map',
      'Court decree verification on boundary disputes',
    ],
    recommendedNextSteps: [
      'Resolve inconsistent identifiers with the appropriate land office before paying.',
      'Compare parcel identifiers with original and certified record copies.',
    ],
    events: [
      {
        id: 'EVT-005-A',
        type: 'transfer_related',
        title: 'Historical SA Porcha Logged',
        date: '2023-01-15',
        reference: 'SA-PORCHA-999',
        explanation: 'Historical state acquisition record of rights.',
      },
    ],
  },
  {
    id: 'BS-DEMO-006',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    mouza: 'Aminbazar',
    jlNumber: '46', // Differs by JL
    khatianNumber: '999',
    dagNumber: '999',
    area: '8.40',
    areaUnit: 'Decimal',
    landClassification: 'Viti / Commercial',
    updatedDate: '2025-10-22',
    statusKey: 'review_recommended',
    statusExplanation: 'Modern RS revision sheet for Dag 999. Inconsistent with SA sheet.',
    findings: [
      {
        title: 'Modern RS Revision with Altered Acreage',
        whyItMatters: 'Acreage reduced from 10.00 to 8.40 decimal in recent survey; possible government acquisition or boundary adjustment.',
        sampleEvidence: 'RS Khatian 999 dated 2025-10-22.',
        missingInfo: 'Gazette notification of land acquisition or compensation records.',
        nextStep: 'Check Savar Upazila revenue records for Section 4 acquisition notices.',
      },
    ],
    missingInformation: [
      'Acquisition gazette records',
      'Up-to-date revised field book (Khasra)',
    ],
    recommendedNextSteps: [
      'Resolve inconsistent identifiers with the AC (Land) office.',
      'Consult a qualified land professional.',
    ],
    events: [
      {
        id: 'EVT-006-A',
        type: 'transfer_related',
        title: 'Modern RS Porcha Logged',
        date: '2025-10-22',
        reference: 'RS-PORCHA-999',
        explanation: 'RS record of rights showing altered acreage.',
      },
    ],
  },

  // 7. Test Scenario: Empty event timeline
  // Demonstrates graceful empty timeline handling
  {
    id: 'BS-DEMO-007',
    division: 'Sylhet',
    district: 'Sylhet',
    upazila: 'Kotwali',
    mouza: 'Zindabazar',
    jlNumber: '19',
    khatianNumber: '64',
    dagNumber: '64',
    area: '4.10',
    areaUnit: 'Decimal',
    landClassification: 'Commercial',
    updatedDate: '2025-08-01',
    statusKey: 'information_incomplete',
    statusExplanation: 'No event records are included in this sample. This does not establish that no events exist in reality.',
    findings: [
      {
        title: 'No Transaction Events Included in Sample',
        whyItMatters: 'The absence of sample events reflects the limited scope of this prototype dataset, not an unencumbered or quiet title in reality.',
        sampleEvidence: 'Timeline event array for BS-DEMO-007 is empty in this demonstration feed.',
        missingInfo: 'All transaction history, deed registers, and mutation petitions.',
        nextStep: 'Conduct a comprehensive in-person title search at the Sub-Registry and AC (Land) offices.',
      },
    ],
    missingInformation: [
      'Transfer deed registers at Sub-Registry Office',
      'Mutation and RoR petitions at AC (Land) Office',
      'Land Development Tax dakhilas',
    ],
    recommendedNextSteps: [
      'Do not assume absence of records means clear title.',
      'Independently verify the current record and mutation status through official channels.',
      'Consult a qualified land professional.',
    ],
    events: [],
  },

  // 8. Test Scenario: Missing event date and reference
  // Demonstrates: missing/null dates and references do not crash rendering
  {
    id: 'BS-DEMO-008',
    division: 'Gazipur',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    mouza: 'Joydebpur',
    jlNumber: '11',
    khatianNumber: '301',
    dagNumber: '201',
    area: '12.50',
    areaUnit: 'Decimal',
    landClassification: 'Nal / Agricultural',
    updatedDate: '2026-01-05',
    statusKey: 'review_recommended',
    statusExplanation: 'Sample contains recorded events with unknown dates and missing references. System handles these gracefully without crashing.',
    findings: [
      {
        title: 'Event Records with Incomplete Date or Reference Metadata',
        whyItMatters: 'Events without verified dates or official reference numbers cannot be sequenced reliably and require manual ledger inspection.',
        sampleEvidence: 'Legacy transfer logged with date=null and reference=null in sample.',
        missingInfo: 'Exact registration date, volume book number, and deed receipt.',
        nextStep: 'Request the physical registered deed copy from the seller to ascertain exact execution and registration dates.',
      },
    ],
    missingInformation: [
      'Official deed registration volume book and page numbers',
      'Exact execution date of legacy transaction',
    ],
    recommendedNextSteps: [
      'Compare parcel identifiers with original and certified record copies.',
      'Review the underlying registered deed and supporting documents.',
    ],
    events: [
      {
        id: 'EVT-008-A',
        type: 'transfer_related',
        title: 'Legacy Transfer Record (Unspecified Date)',
        date: null, // Test null date
        reference: null, // Test null reference
        explanation: 'Historical transaction noted in index without machine-readable date. App renders "Date not available".',
      },
      {
        id: 'EVT-008-B',
        type: 'mutation_application',
        title: 'Recent Mutation Petition Logged',
        date: '2025-11-20',
        reference: 'MUT-APP-9988',
        explanation: 'Mutation petition submitted online.',
      },
    ],
  },
];
