/**
 * Monthly Verification Quota Service for BhumiVerify
 * Enforces a strict limit of 5 land verification applications per user per calendar month.
 * Designed to prevent fraudulent bulk inquiries, title speculation, and predatory broker scraping.
 */

export interface VerificationApplication {
  id: string;
  parcelId: string;
  mouza: string;
  dagNumber: string;
  khatianNumber: string;
  upazila: string;
  district: string;
  timestamp: string; // ISO string
  txnId: string;
  userId: string;
  amount: number; // 1500 Tk
}

export interface QuotaStatus {
  limit: number;
  used: number;
  remaining: number;
  isExceeded: boolean;
  percentage: number;
  resetDateFormatted: string;
  resetDateFormattedBn: string;
  currentMonthName: string;
  currentMonthNameBn: string;
  applications: VerificationApplication[];
}

export const MONTHLY_QUOTA_LIMIT = 5;
const STORAGE_KEY = 'bhumiverify_monthly_quotas_v2';

const BN_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function toBnNumber(num: number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

/**
 * Returns all stored applications from local persistence
 */
function getAllApplications(): VerificationApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed 2 realistic pre-existing applications for current month evaluation
      const seeded = getInitialSeedApplications();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getInitialSeedApplications(): VerificationApplication[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return [
    {
      id: `APP-${year}${month + 1}-001`,
      parcelId: 'BS-DEMO-001',
      mouza: 'Gulshan',
      dagNumber: '85',
      khatianNumber: '541',
      upazila: 'Gulshan',
      district: 'Dhaka',
      timestamp: new Date(year, month, 2, 10, 30).toISOString(),
      txnId: 'TXN-BKASH-748920',
      userId: 'USER-DEMO-001',
      amount: 1500,
    },
    {
      id: `APP-${year}${month + 1}-002`,
      parcelId: 'BS-DEMO-002',
      mouza: 'Tejgaon I/A',
      dagNumber: '402',
      khatianNumber: '1204',
      upazila: 'Tejgaon',
      district: 'Dhaka',
      timestamp: new Date(year, month, 10, 14, 15).toISOString(),
      txnId: 'TXN-NAGAD-981244',
      userId: 'USER-DEMO-001',
      amount: 1500,
    },
  ];
}

/**
 * Calculates current month quota status for a specific user
 */
export function getMonthlyQuota(userId: string = 'USER-DEMO-001'): QuotaStatus {
  const all = getAllApplications();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Filter for applications made in the current calendar month
  const monthlyApplications = all.filter((app) => {
    if (!app || !app.timestamp) return false;
    const appDate = new Date(app.timestamp);
    const sameMonth = appDate.getFullYear() === currentYear && appDate.getMonth() === currentMonth;
    const sameUser = !app.userId || app.userId === userId || userId === 'USER-DEMO-001';
    return sameMonth && sameUser;
  });

  const used = monthlyApplications.length;
  const remaining = Math.max(0, MONTHLY_QUOTA_LIMIT - used);
  const isExceeded = used >= MONTHLY_QUOTA_LIMIT;
  const percentage = Math.min(100, Math.round((used / MONTHLY_QUOTA_LIMIT) * 100));

  // Next reset date is the 1st of the next month
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const resetDateFormatted = `1 ${EN_MONTHS[nextMonthDate.getMonth()]} ${nextMonthDate.getFullYear()}`;
  const resetDateFormattedBn = `১ ${BN_MONTHS[nextMonthDate.getMonth()]} ${toBnNumber(nextMonthDate.getFullYear())}`;

  return {
    limit: MONTHLY_QUOTA_LIMIT,
    used,
    remaining,
    isExceeded,
    percentage,
    resetDateFormatted,
    resetDateFormattedBn,
    currentMonthName: EN_MONTHS[currentMonth],
    currentMonthNameBn: BN_MONTHS[currentMonth],
    applications: monthlyApplications.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
  };
}

/**
 * Checks whether user has remaining quota to perform an application
 */
export function canApply(userId: string = 'USER-DEMO-001'): boolean {
  const status = getMonthlyQuota(userId);
  return !status.isExceeded;
}

/**
 * Records a new verification application after successful 1500 Tk digital payment approval
 */
export function recordVerificationApplication(
  app: Omit<VerificationApplication, 'id' | 'timestamp'>
): { success: boolean; error?: string; errorBn?: string; quota: QuotaStatus } {
  const currentQuota = getMonthlyQuota(app.userId);

  if (currentQuota.isExceeded) {
    return {
      success: false,
      error: `Monthly quota reached (${MONTHLY_QUOTA_LIMIT}/${MONTHLY_QUOTA_LIMIT}). Anti-scraping policy restricts accounts to 5 checks per month.`,
      errorBn: `মাসিক আবেদন কোটা পূর্ণ (${toBnNumber(MONTHLY_QUOTA_LIMIT)}/${toBnNumber(MONTHLY_QUOTA_LIMIT)})। স্পেকুলেশন ও ডেটা স্ক্র্যাপিং রোধে প্রতি মাসে সর্বোচ্চ ৫টি আবেদনের সীমা নির্ধারিত।`,
      quota: currentQuota,
    };
  }

  const newRecord: VerificationApplication = {
    ...app,
    id: `APP-${Date.now().toString().slice(-8)}`,
    timestamp: new Date().toISOString(),
  };

  const all = getAllApplications();
  const updated = [newRecord, ...all];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore local storage errors
  }

  const updatedQuota = getMonthlyQuota(app.userId);
  return {
    success: true,
    quota: updatedQuota,
  };
}

/**
 * Resets monthly quota to 0 for demo/testing convenience
 */
export function resetMonthlyQuota(userId: string = 'USER-DEMO-001'): QuotaStatus {
  const all = getAllApplications();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Keep records from previous months, purge only current month
  const filtered = all.filter((app) => {
    if (!app || !app.timestamp) return false;
    const appDate = new Date(app.timestamp);
    const sameMonth = appDate.getFullYear() === currentYear && appDate.getMonth() === currentMonth;
    return !sameMonth;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }

  return getMonthlyQuota(userId);
}

/**
 * Sets quota to fully used (5/5) for testing and evaluation
 */
export function simulateFullQuota(userId: string = 'USER-DEMO-001'): QuotaStatus {
  const all = getAllApplications();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Remove existing current month records first
  const others = all.filter((app) => {
    const appDate = new Date(app.timestamp);
    return !(appDate.getFullYear() === currentYear && appDate.getMonth() === currentMonth);
  });

  const filled: VerificationApplication[] = [];
  for (let i = 1; i <= 5; i++) {
    filled.push({
      id: `APP-FULL-${i}`,
      parcelId: `BS-DEMO-00${i}`,
      mouza: `Gulshan Plot ${i}`,
      dagNumber: String(100 + i),
      khatianNumber: String(50 + i),
      upazila: 'Gulshan',
      district: 'Dhaka',
      timestamp: new Date(yearMonthDate(now, i)).toISOString(),
      txnId: `TXN-DEMO-FULL-${i}`,
      userId,
      amount: 1500,
    });
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...filled, ...others]));
  } catch {
    // ignore
  }

  return getMonthlyQuota(userId);
}

function yearMonthDate(now: Date, day: number): Date {
  return new Date(now.getFullYear(), now.getMonth(), Math.min(day * 4, 25), 10, 0, 0);
}
