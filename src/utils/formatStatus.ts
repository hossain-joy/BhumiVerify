export function formatStatusLabel(label: string, isBn: boolean): string {
  if (!isBn) {
    if (label === 'বড় অসঙ্গতি পাওয়া যায়নি' || label === 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি') {
      return 'No Major Issue Detected in Available Data';
    }
    if (label === 'পর্যালোচনা জরুরি') {
      return 'Review Recommended';
    }
    if (label === 'তথ্য অসম্পূর্ণ') {
      return 'Information Incomplete';
    }
    return label;
  }

  // Bangla conversions
  if (
    label === 'No Major Issue Detected in Available Data' ||
    label === 'no_major_issue' ||
    label === 'বড় অসঙ্গতি পাওয়া যায়নি'
  ) {
    return 'উপলব্ধ তথ্যে বড় অসঙ্গতি পাওয়া যায়নি';
  }
  if (
    label === 'Review Recommended' ||
    label === 'review_recommended' ||
    label === 'পর্যালোচনা জরুরি'
  ) {
    return 'পর্যালোচনা জরুরি';
  }
  if (
    label === 'Information Incomplete' ||
    label === 'information_incomplete' ||
    label === 'তথ্য অসম্পূর্ণ'
  ) {
    return 'তথ্য অসম্পূর্ণ';
  }

  return label;
}

export function toBengaliNumerals(input: string | number | undefined, isBn: boolean = true): string {
  if (input === undefined || input === null) return '';
  if (!isBn) return String(input);
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (w) => bnDigits[parseInt(w, 10)]);
}
