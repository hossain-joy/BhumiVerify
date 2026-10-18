import { normalizeIdentifier } from './normalizeParcel';
import { FictionalParcelRecord, MOCK_PARCELS } from '../data/mockParcels';
import { ParcelFormFields } from './validateParcel';

export type MatchOutcomeType = 'match' | 'conflict' | 'ambiguous' | 'no_match';

export interface MatchOutcome {
  type: MatchOutcomeType;
  parcel?: FictionalParcelRecord;
  candidates?: FictionalParcelRecord[];
  conflictReason?: string;
  conflictReasonBn?: string;
  message: string;
  messageBn: string;
}

export function matchParcelRecord(
  input: ParcelFormFields,
  dataset: FictionalParcelRecord[] = MOCK_PARCELS
): MatchOutcome {
  const normDiv = normalizeIdentifier(input.division);
  const normDist = normalizeIdentifier(input.district);
  const normUpz = normalizeIdentifier(input.upazila);
  const normMouza = normalizeIdentifier(input.mouza);
  const normKhatian = normalizeIdentifier(input.khatianNumber);
  const normDag = normalizeIdentifier(input.dagNumber);
  const normJl = normalizeIdentifier(input.jlNumber);

  // Filter candidates matching the required 6-part composite key:
  // division, district, upazila, mouza, khatian, and dag
  const compositeMatches = dataset.filter((rec) => {
    return (
      normalizeIdentifier(rec.division) === normDiv &&
      normalizeIdentifier(rec.district) === normDist &&
      normalizeIdentifier(rec.upazila) === normUpz &&
      normalizeIdentifier(rec.mouza) === normMouza &&
      normalizeIdentifier(rec.khatianNumber) === normKhatian &&
      normalizeIdentifier(rec.dagNumber) === normDag
    );
  });

  // Rule 1: No record matches the composite
  if (compositeMatches.length === 0) {
    return {
      type: 'no_match',
      message:
        'No matching record was found in this fictional sample dataset for the entered identifiers. This prototype only searches its internal demo records and has not accessed real official land archives.',
      messageBn:
        'প্রদত্ত তথ্যের সাথে কাল্পনিক নমুনা ডেটাসেটে কোনো রেকর্ড মেলেনি। এই প্রোটোটাইপটি কেবল নিজস্ব নমুনা রেকর্ডে অনুসন্ধান করে এবং বাস্তব সরকারি রেকর্ড রুমে কোনো অনুসন্ধান চালায়নি।',
    };
  }

  // Rule 2: More than one record matches the composite -> Ambiguous State
  if (compositeMatches.length > 1) {
    // If user provided a JL number, see if it resolves ambiguity
    if (normJl) {
      const jlMatches = compositeMatches.filter(
        (rec) => normalizeIdentifier(rec.jlNumber) === normJl
      );
      if (jlMatches.length === 1) {
        return {
          type: 'match',
          parcel: jlMatches[0],
          message: 'Matching sample record located using JL number refinement.',
          messageBn: 'জে.এল. নম্বর সমন্বয়ের মাধ্যমে নির্দিষ্ট নমুনা রেকর্ড পাওয়া গেছে।',
        };
      }
    }

    return {
      type: 'ambiguous',
      candidates: compositeMatches,
      message:
        'Multiple sample records match these identifiers. In land administration, ambiguous records require further identifier clarification or survey sheet inspection.',
      messageBn:
        'একাধিক নমুনা রেকর্ড একই পরিচিতির সাথে মিলে গেছে। ভূমি প্রশাসনে দ্বৈত রেকর্ড দেখা দিলে অতিরিক্ত পরিচিতি বা নকশা যাচাই আবশ্যক।',
    };
  }

  // Exactly one record matches the 6-part composite
  const matched = compositeMatches[0];

  // Rule 3: Compare optional JL number if provided and record has JL number
  if (normJl && matched.jlNumber) {
    const recordJlNorm = normalizeIdentifier(matched.jlNumber);
    if (recordJlNorm !== normJl) {
      return {
        type: 'conflict',
        parcel: matched,
        conflictReason: `Entered JL Number (${input.jlNumber}) conflicts with the recorded sample JL Number (${matched.jlNumber}) for Mouza ${matched.mouza}.`,
        conflictReasonBn: `প্রদত্ত জে.এল. নম্বর (${input.jlNumber}) এবং নমুনা রেকর্ডের জে.এল. নম্বর (${matched.jlNumber}) এর মধ্যে অমিল পাওয়া গেছে।`,
        message:
          'Identifier conflict detected: The entered JL number differs from the matched sample record. Conflicting identifiers must be resolved before proceeding.',
        messageBn:
          'পরিচিতি অসঙ্গতি শনাক্ত হয়েছে: প্রদত্ত জে.এল. নম্বরটি সংরক্ষিত রেকর্ডের সাথে মিলছে না। লেনদেনের পূর্বে এই অমিল দূর করা আবশ্যক।',
      };
    }
  }

  // Rule 4: Successful single composite match
  return {
    type: 'match',
    parcel: matched,
    message: 'Matching sample record found in demonstration dataset.',
    messageBn: 'কাল্পনিক ডেমো ডেটাসেটে ম্যাচিং রেকর্ড পাওয়া গেছে।',
  };
}
