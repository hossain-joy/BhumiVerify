export function formatStatusLabel(label: string, isBn: boolean): string {
  if (!isBn) {
    if (
      label === 'বড় অসঙ্গতি পাওয়া যায়নি' ||
      label === 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি' ||
      label === 'No Major Issue Detected in Available Data' ||
      label === 'no_major_issue' ||
      label === 'নির্দায়'
    ) {
      return 'Clear';
    }
    if (
      label === 'পর্যালোচনা জরুরি' ||
      label === 'Review Recommended' ||
      label === 'review_recommended' ||
      label === 'সতর্কতা' ||
      label === 'পর্যালোচনা'
    ) {
      return 'Review';
    }
    if (
      label === 'তথ্য অসম্পূর্ণ' ||
      label === 'Information Incomplete' ||
      label === 'information_incomplete' ||
      label === 'অসম্পূর্ণ'
    ) {
      return 'Incomplete';
    }
    return label;
  }

  // Bangla conversions - Ultra Short
  if (
    label === 'No Major Issue Detected in Available Data' ||
    label === 'no_major_issue' ||
    label === 'বড় অসঙ্গতি পাওয়া যায়নি' ||
    label === 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি' ||
    label === 'Clear' ||
    label === 'নির্দায়'
  ) {
    return 'নির্দায়';
  }
  if (
    label === 'Review Recommended' ||
    label === 'review_recommended' ||
    label === 'পর্যালোচনা জরুরি' ||
    label === 'Review' ||
    label === 'সতর্কতা'
  ) {
    return 'সতর্কতা';
  }
  if (
    label === 'Information Incomplete' ||
    label === 'information_incomplete' ||
    label === 'তথ্য অসম্পূর্ণ' ||
    label === 'Incomplete' ||
    label === 'অসম্পূর্ণ'
  ) {
    return 'অসম্পূর্ণ';
  }

  return label;
}

export function toBengaliNumerals(input: string | number | undefined, isBn: boolean = true): string {
  if (input === undefined || input === null) return '';
  if (!isBn) return String(input);
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (w) => bnDigits[parseInt(w, 10)]);
}
