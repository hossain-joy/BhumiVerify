import assert from 'node:assert';

// 1. Normalization Logic
function normalizeIdentifier(val) {
  if (!val) return '';
  return val.toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

// 2. Validation Logic
function validateParcelForm(fields) {
  const errors = {};
  if (!normalizeIdentifier(fields.division)) errors.division = 'Division is required';
  if (!normalizeIdentifier(fields.district)) errors.district = 'District is required';
  if (!normalizeIdentifier(fields.upazila)) errors.upazila = 'Upazila is required';
  if (!normalizeIdentifier(fields.mouza)) errors.mouza = 'Mouza is required';
  if (!normalizeIdentifier(fields.khatianNumber)) errors.khatianNumber = 'Khatian is required';
  if (!normalizeIdentifier(fields.dagNumber)) errors.dagNumber = 'Dag is required';
  return { isValid: Object.keys(errors).length === 0, errors };
}

// 3. Matching Logic
function matchParcelRecord(input, dataset) {
  const normDiv = normalizeIdentifier(input.division);
  const normDist = normalizeIdentifier(input.district);
  const normUpz = normalizeIdentifier(input.upazila);
  const normMouza = normalizeIdentifier(input.mouza);
  const normKhatian = normalizeIdentifier(input.khatianNumber);
  const normDag = normalizeIdentifier(input.dagNumber);
  const normJl = normalizeIdentifier(input.jlNumber);

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

  if (compositeMatches.length === 0) return { type: 'no_match' };
  if (compositeMatches.length > 1) return { type: 'ambiguous', candidates: compositeMatches };

  const matched = compositeMatches[0];
  if (normJl && matched.jlNumber && normalizeIdentifier(matched.jlNumber) !== normJl) {
    return { type: 'conflict', parcel: matched };
  }
  return { type: 'match', parcel: matched };
}

// 4. Sorting Logic
function sortTimelineEvents(events) {
  return [...events].sort((a, b) => {
    const aValid = a.date && !isNaN(Date.parse(a.date));
    const bValid = b.date && !isNaN(Date.parse(b.date));
    if (aValid && bValid) return Date.parse(a.date) - Date.parse(b.date);
    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;
    return 0;
  });
}

// 5. Date formatting
function formatSafeDate(dateStr, fallback = 'Date not available') {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.trim()) return fallback;
  const timestamp = Date.parse(dateStr.trim());
  if (isNaN(timestamp)) return fallback;
  return new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// --- RUN TESTS ---
console.log('Running BhumiSure unit tests...');

// Test 1: Normalization
assert.strictEqual(normalizeIdentifier('  Dhaka  R/A   '), 'dhaka r/a');
assert.strictEqual(normalizeIdentifier(null), '');
console.log('✔ Test 1: Normalization logic passed.');

// Test 2: Validation
const invalidForm = validateParcelForm({ division: '', district: 'Dhaka', upazila: '', mouza: '', khatianNumber: '', dagNumber: '' });
assert.strictEqual(invalidForm.isValid, false);
assert.ok(invalidForm.errors.division);
assert.ok(invalidForm.errors.upazila);
const validForm = validateParcelForm({ division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '541', dagNumber: '85' });
assert.strictEqual(validForm.isValid, true);
console.log('✔ Test 2: Form validation passed.');

// Test 3: Composite Matching
const mockDataset = [
  { id: 'REC-1', division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '541', dagNumber: '85', jlNumber: '24' },
  { id: 'REC-2', division: 'Dhaka', district: 'Dhaka', upazila: 'Savar', mouza: 'Aminbazar', khatianNumber: '999', dagNumber: '999', jlNumber: '45' },
  { id: 'REC-3', division: 'Dhaka', district: 'Dhaka', upazila: 'Savar', mouza: 'Aminbazar', khatianNumber: '999', dagNumber: '999', jlNumber: '46' },
];

// Match
const resMatch = matchParcelRecord({ division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '541', dagNumber: '85' }, mockDataset);
assert.strictEqual(resMatch.type, 'match');
assert.strictEqual(resMatch.parcel.id, 'REC-1');

// No Match (differing khatian)
const resNoMatch = matchParcelRecord({ division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '9999', dagNumber: '85' }, mockDataset);
assert.strictEqual(resNoMatch.type, 'no_match');

// JL Conflict (composite matches, but JL differs)
const resConflict = matchParcelRecord({ division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '541', dagNumber: '85', jlNumber: '99' }, mockDataset);
assert.strictEqual(resConflict.type, 'conflict');

// Ambiguous Match (multiple records share composite)
const resAmbig = matchParcelRecord({ division: 'Dhaka', district: 'Dhaka', upazila: 'Savar', mouza: 'Aminbazar', khatianNumber: '999', dagNumber: '999' }, mockDataset);
assert.strictEqual(resAmbig.type, 'ambiguous');
assert.strictEqual(resAmbig.candidates.length, 2);
console.log('✔ Test 3: Composite matching, JL conflict, ambiguous match, and no-match passed.');

// Test 4: Event Chronological Sorting
const rawEvents = [
  { id: '3', title: 'Late event', date: '2025-05-01' },
  { id: '1', title: 'Early event', date: '2023-01-15' },
  { id: '4', title: 'Null date event', date: null },
  { id: '2', title: 'Middle event', date: '2024-06-10' },
  { id: '5', title: 'Invalid date event', date: 'invalid-string' },
];
const sorted = sortTimelineEvents(rawEvents);
assert.strictEqual(sorted[0].id, '1');
assert.strictEqual(sorted[1].id, '2');
assert.strictEqual(sorted[2].id, '3');
// Events with null or invalid dates are placed at the end
assert.ok(sorted[3].id === '4' || sorted[3].id === '5');
assert.ok(sorted[4].id === '4' || sorted[4].id === '5');
console.log('✔ Test 4: Timeline sorting with unknown/invalid date placement passed.');

// Test 5: Safe Date Formatting
assert.strictEqual(formatSafeDate(null), 'Date not available');
assert.strictEqual(formatSafeDate('invalid-date'), 'Date not available');
assert.strictEqual(formatSafeDate('2024-05-10'), 'May 10, 2024');
console.log('✔ Test 5: Safe date formatting passed without "Invalid Date".');

// Test 6: Monthly 5-Application Quota System (Anti-Scraping / Limit Enforcement)
const MONTHLY_LIMIT = 5;
function evaluateQuota(applications, currentYear, currentMonth) {
  const currentMonthApps = applications.filter(app => {
    const d = new Date(app.timestamp);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });
  const used = currentMonthApps.length;
  return {
    limit: MONTHLY_LIMIT,
    used,
    remaining: Math.max(0, MONTHLY_LIMIT - used),
    isExceeded: used >= MONTHLY_LIMIT,
  };
}

function applyForVerification(applications, newApp, currentYear, currentMonth) {
  const current = evaluateQuota(applications, currentYear, currentMonth);
  if (current.isExceeded) {
    return { success: false, error: 'Monthly quota reached (5/5). Cannot apply for more.' };
  }
  const updated = [...applications, { ...newApp, timestamp: new Date(currentYear, currentMonth, 15).toISOString() }];
  return { success: true, applications: updated, quota: evaluateQuota(updated, currentYear, currentMonth) };
}

let testApps = [];
const tYear = 2026;
const tMonth = 3; // April

// Apply 5 times successfully
for (let i = 1; i <= 5; i++) {
  const res = applyForVerification(testApps, { id: `APP-${i}`, parcelId: `P-${i}`, amount: 1500 }, tYear, tMonth);
  assert.strictEqual(res.success, true);
  testApps = res.applications;
  assert.strictEqual(res.quota.used, i);
  assert.strictEqual(res.quota.remaining, 5 - i);
}

// 6th application attempt MUST BE REJECTED!
const sixthAttempt = applyForVerification(testApps, { id: 'APP-6', parcelId: 'P-6', amount: 1500 }, tYear, tMonth);
assert.strictEqual(sixthAttempt.success, false);
assert.ok(sixthAttempt.error.includes('Monthly quota reached (5/5)'));
assert.strictEqual(testApps.length, 5); // Total count unchanged

console.log('✔ Test 6: Monthly 5-application quota enforcement & 6th attempt block passed.');

console.log('ALL UNIT TESTS PASSED SUCCESSFULLY! (6/6)');
