import assert from 'node:assert';

console.log('====================================================');
console.log('   BHUMIVERIFY COMPREHENSIVE FUNCTION & SECURITY AUDIT');
console.log('====================================================\n');

// ----------------------------------------------------
// 1. SECURITY AUDIT: Input Normalization & Injection Defense
// ----------------------------------------------------
function normalizeIdentifier(val) {
  if (!val) return '';
  return val.toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

assert.strictEqual(normalizeIdentifier('  Dhaka   R/A  '), 'dhaka r/a');
assert.strictEqual(normalizeIdentifier(null), '');
assert.strictEqual(normalizeIdentifier('<script>alert("xss")</script>'), '<script>alert("xss")</script>');
console.log('✔ Security 1: Normalization & input trimming passed.');

// ----------------------------------------------------
// 2. SECURITY AUDIT: Parcel Form Validation (Required Fields & RegEx)
// ----------------------------------------------------
function validateParcelForm(fields) {
  const errors = {};
  if (!normalizeIdentifier(fields.division)) errors.division = 'Division is required';
  if (!normalizeIdentifier(fields.district)) errors.district = 'District is required';
  if (!normalizeIdentifier(fields.upazila)) errors.upazila = 'Upazila is required';
  if (!normalizeIdentifier(fields.mouza)) errors.mouza = 'Mouza is required';
  if (!normalizeIdentifier(fields.khatianNumber)) errors.khatianNumber = 'Khatian is required';
  if (!normalizeIdentifier(fields.dagNumber)) errors.dagNumber = 'Dag is required';
  
  // RegEx check for numbers and hyphens
  if (fields.dagNumber && !/^[0-9A-Za-z\u09E6-\u09EF\-\/\s]+$/.test(fields.dagNumber)) {
    errors.dagNumber = 'Invalid characters in Dag';
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

const badForm = validateParcelForm({ division: '', district: '', upazila: '', mouza: '', khatianNumber: '', dagNumber: '' });
assert.strictEqual(badForm.isValid, false);
assert.strictEqual(Object.keys(badForm.errors).length, 6);

const sqlInjectionDag = validateParcelForm({
  division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '541',
  dagNumber: "85'; DROP TABLE parcels;--"
});
assert.strictEqual(sqlInjectionDag.isValid, false);
assert.ok(sqlInjectionDag.errors.dagNumber);

const validForm = validateParcelForm({
  division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', mouza: 'Gulshan', khatianNumber: '541', dagNumber: '85'
});
assert.strictEqual(validForm.isValid, true);
console.log('✔ Security 2: Mandatory validation & character whitelist passed.');

// ----------------------------------------------------
// 3. SECURITY AUDIT: PII Masking (NID & Phone Numbers)
// ----------------------------------------------------
function maskNid(nid) {
  if (!nid || nid.length < 10) return '**********';
  return nid.slice(0, 4) + '********' + nid.slice(-4);
}

function maskPhone(phone) {
  if (!phone || phone.length < 11) return '+880 1***-***';
  const clean = phone.replace(/\D/g, '');
  return `+880 ${clean.slice(1, 3)}**-***${clean.slice(-3)}`;
}

const sampleNid = '19885412987419';
const samplePhone = '01712345892';
assert.strictEqual(maskNid(sampleNid), '1988********7419');
assert.strictEqual(maskPhone(samplePhone), '+880 17**-***892');
console.log('✔ Security 3: PII Masking for NID and Mobile Phone passed.');

// ----------------------------------------------------
// 4. SECURITY AUDIT: Monthly Anti-Scraping Quota Limit (5 Max)
// ----------------------------------------------------
const MONTHLY_LIMIT = 5;
function evaluateQuota(apps, year, month) {
  const currentMonthApps = apps.filter(app => {
    const d = new Date(app.timestamp);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const used = currentMonthApps.length;
  return {
    limit: MONTHLY_LIMIT,
    used,
    remaining: Math.max(0, MONTHLY_LIMIT - used),
    isExceeded: used >= MONTHLY_LIMIT,
    percentage: Math.min(100, Math.round((used / MONTHLY_LIMIT) * 100)),
  };
}

let testApps = [];
const curYear = 2026;
const curMonth = 9; // October

for (let i = 1; i <= 5; i++) {
  const qBefore = evaluateQuota(testApps, curYear, curMonth);
  assert.strictEqual(qBefore.isExceeded, false);
  testApps.push({ id: `APP-${i}`, timestamp: new Date(curYear, curMonth, i).toISOString() });
}

const qFull = evaluateQuota(testApps, curYear, curMonth);
assert.strictEqual(qFull.used, 5);
assert.strictEqual(qFull.remaining, 0);
assert.strictEqual(qFull.isExceeded, true);
assert.strictEqual(qFull.percentage, 100);

// 6th attempt must be blocked
const canApplySixth = !qFull.isExceeded;
assert.strictEqual(canApplySixth, false);
console.log('✔ Security 4: Anti-scraping quota enforcement (5/5 block) passed.');

// ----------------------------------------------------
// 5. SECURITY AUDIT: Role-Based Access Control (RBAC)
// ----------------------------------------------------
function canAccessRoute(route, user) {
  const adminRoutes = ['/admin', '/admin/demo-records', '/admin/audit-log'];
  const protectedRoutes = ['/dashboard', '/checks', '/compare', '/verification-plan', '/documents', '/settings', '/profile'];
  
  if (adminRoutes.some(r => route.startsWith(r))) {
    return user !== null && user.role === 'admin';
  }
  if (protectedRoutes.some(r => route.startsWith(r))) {
    return user !== null;
  }
  return true; // Public route
}

// Anonymous
assert.strictEqual(canAccessRoute('/', null), true);
assert.strictEqual(canAccessRoute('/how-it-works', null), true);
assert.strictEqual(canAccessRoute('/dashboard', null), false);
assert.strictEqual(canAccessRoute('/admin', null), false);

// Buyer / Citizen
const buyerUser = { id: 'U-1', role: 'buyer' };
assert.strictEqual(canAccessRoute('/dashboard', buyerUser), true);
assert.strictEqual(canAccessRoute('/checks', buyerUser), true);
assert.strictEqual(canAccessRoute('/admin', buyerUser), false);
assert.strictEqual(canAccessRoute('/admin/audit-log', buyerUser), false);

// Admin
const adminUser = { id: 'U-2', role: 'admin' };
assert.strictEqual(canAccessRoute('/admin', adminUser), true);
assert.strictEqual(canAccessRoute('/admin/audit-log', adminUser), true);
assert.strictEqual(canAccessRoute('/dashboard', adminUser), true);
console.log('✔ Security 5: Route guards & Role-Based Access Control passed.');

// ----------------------------------------------------
// 6. FUNCTIONAL AUDIT: Bengali & English Numerals & Formatting
// ----------------------------------------------------
function toBengaliNumerals(val) {
  if (val === undefined || val === null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(val).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

assert.strictEqual(toBengaliNumerals(12345), '১২৩৪৫');
assert.strictEqual(toBengaliNumerals('Khatian 541, Dag 85'), 'Khatian ৫৪১, Dag ৮৫');
console.log('✔ Function 6: Bengali numeral formatting passed.');

// ----------------------------------------------------
// 7. FUNCTIONAL AUDIT: Deterministic Risk Assessment Rules
// ----------------------------------------------------
function assessParcel(record) {
  const events = record.events || [];
  const hasTransfer = events.some((e) => e.type === 'transfer_related');
  const hasApp = events.some((e) => e.type === 'mutation_application');
  const hasCompletion = events.some((e) => e.type === 'mutation_completed');

  if (record.statusKey === 'information_incomplete' || record.area === null || events.length === 0) {
    return { label: 'Information Incomplete', severity: 'info' };
  }
  if (record.statusKey === 'review_recommended' || (hasTransfer && !hasCompletion) || (hasApp && !hasCompletion)) {
    return { label: 'Review Recommended', severity: 'warning' };
  }
  return { label: 'No Major Issue Detected in Available Data', severity: 'success' };
}

const incompleteParcel = { statusKey: 'information_incomplete', area: null, events: [] };
assert.strictEqual(assessParcel(incompleteParcel).label, 'Information Incomplete');

const unmutatedParcel = {
  statusKey: 'review_recommended', area: '5.25',
  events: [{ type: 'transfer_related' }]
};
assert.strictEqual(assessParcel(unmutatedParcel).label, 'Review Recommended');

const completedParcel = {
  statusKey: 'no_major_issue', area: '6.50',
  events: [{ type: 'transfer_related' }, { type: 'mutation_completed' }]
};
assert.strictEqual(assessParcel(completedParcel).label, 'No Major Issue Detected in Available Data');
console.log('✔ Function 7: Deterministic rule-based assessment passed.');

// ----------------------------------------------------
// 8. FUNCTIONAL AUDIT: Safe Date & Timeline Sorting
// ----------------------------------------------------
function formatSafeDate(dateStr, fallback = 'Date not available') {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.trim()) return fallback;
  const timestamp = Date.parse(dateStr.trim());
  if (isNaN(timestamp)) return fallback;
  return new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

assert.strictEqual(formatSafeDate(null), 'Date not available');
assert.strictEqual(formatSafeDate('invalid-string'), 'Date not available');
assert.strictEqual(formatSafeDate('2026-03-24'), 'Mar 24, 2026');

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

const unsortedEvents = [
  { id: 'ev3', date: '2026-05-10' },
  { id: 'ev1', date: '2025-01-01' },
  { id: 'ev4', date: null },
  { id: 'ev2', date: '2025-11-20' },
];
const sorted = sortTimelineEvents(unsortedEvents);
assert.strictEqual(sorted[0].id, 'ev1');
assert.strictEqual(sorted[1].id, 'ev2');
assert.strictEqual(sorted[2].id, 'ev3');
assert.strictEqual(sorted[3].id, 'ev4');
console.log('✔ Function 8: Safe dates & chronological sorting passed.');

// ----------------------------------------------------
// 9. FUNCTIONAL AUDIT: Verification Tasks Progress & Toggle Cycling
// ----------------------------------------------------
function toggleTaskStatus(currentStatus) {
  if (currentStatus === 'not_started') return 'in_progress';
  if (currentStatus === 'in_progress') return 'completed';
  return 'not_started';
}

assert.strictEqual(toggleTaskStatus('not_started'), 'in_progress');
assert.strictEqual(toggleTaskStatus('in_progress'), 'completed');
assert.strictEqual(toggleTaskStatus('completed'), 'not_started');

const sampleTasks = [
  { id: 't1', status: 'completed' },
  { id: 't2', status: 'completed' },
  { id: 't3', status: 'completed' },
  { id: 't4', status: 'in_progress' },
  { id: 't5', status: 'in_progress' },
  { id: 't6', status: 'in_progress' },
  { id: 't7', status: 'in_progress' },
  { id: 't8', status: 'not_started' },
  { id: 't9', status: 'not_started' },
  { id: 't10', status: 'not_started' },
];

function calculateTaskMetrics(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const pending = tasks.filter(t => t.status === 'not_started').length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, inProgress, pending, pct };
}

const metrics = calculateTaskMetrics(sampleTasks);
assert.strictEqual(metrics.total, 10);
assert.strictEqual(metrics.completed, 3);
assert.strictEqual(metrics.inProgress, 4);
assert.strictEqual(metrics.pending, 3);
assert.strictEqual(metrics.pct, 30);
console.log('✔ Function 9: Verification tasks calculation & cycling passed (3/10 = 30%).');

console.log('\n====================================================');
console.log('   ALL 9 FUNCTION & SECURITY SUITES PASSED! (9/9)   ');
console.log('====================================================\n');
