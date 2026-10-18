import { normalizeIdentifier } from './normalizeParcel';

export interface ParcelValidationErrors {
  division?: string;
  district?: string;
  upazila?: string;
  mouza?: string;
  khatianNumber?: string;
  dagNumber?: string;
  jlNumber?: string;
  area?: string;
}

export interface ParcelValidationResult {
  isValid: boolean;
  errors: ParcelValidationErrors;
  firstInvalidField?: keyof ParcelValidationErrors;
}

export interface ParcelFormFields {
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  khatianNumber: string;
  dagNumber: string;
  jlNumber?: string;
  area?: string;
}

export function validateParcelForm(
  fields: ParcelFormFields,
  language: 'en' | 'bn' = 'en'
): ParcelValidationResult {
  const errors: ParcelValidationErrors = {};
  const isBn = language === 'bn';

  // 1. Division (required)
  if (!normalizeIdentifier(fields.division)) {
    errors.division = isBn ? 'বিভাগ নির্বাচন আবশ্যক।' : 'Division is required.';
  }

  // 2. District (required)
  if (!normalizeIdentifier(fields.district)) {
    errors.district = isBn ? 'জেলা নির্বাচন আবশ্যক।' : 'District is required.';
  }

  // 3. Upazila (required)
  if (!normalizeIdentifier(fields.upazila)) {
    errors.upazila = isBn ? 'উপজেলা / থানা নির্বাচন আবশ্যক।' : 'Upazila / Thana is required.';
  }

  // 4. Mouza (required)
  if (!normalizeIdentifier(fields.mouza)) {
    errors.mouza = isBn ? 'মৌজা প্রদান বা নির্বাচন আবশ্যক।' : 'Mouza is required.';
  }

  // 5. Khatian Number (required)
  if (!normalizeIdentifier(fields.khatianNumber)) {
    errors.khatianNumber = isBn ? 'খতিয়ান নম্বর প্রদান আবশ্যক।' : 'Khatian number is required.';
  }

  // 6. Dag / Plot Number (required)
  if (!normalizeIdentifier(fields.dagNumber)) {
    errors.dagNumber = isBn ? 'দাগ / প্লট নম্বর প্রদান আবশ্যক।' : 'Dag / plot number is required.';
  }

  const keys: (keyof ParcelValidationErrors)[] = [
    'division',
    'district',
    'upazila',
    'mouza',
    'khatianNumber',
    'dagNumber',
  ];

  const firstInvalid = keys.find((key) => errors[key] !== undefined);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstInvalidField: firstInvalid,
  };
}
