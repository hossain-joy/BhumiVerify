export interface AppNotification {
  id: string;
  title: string;
  titleBn?: string;
  message: string;
  messageBn?: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'reminder' | 'action';
  link?: string;
  sourceNote?: string;
  sourceNoteBn?: string;
}

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-001',
    title: 'Verification Milestone Reminder: Tejgaon Plot 402',
    titleBn: 'যাচাই মাইলফলক অনুস্মারক: তেজগাঁও প্লট ৪০২',
    message: 'Your verification plan task "Track e-Mutation Case MUT-APP-4421 online" is scheduled for follow-up today.',
    messageBn: 'আপনার যাচাই চেকলিস্টের কাজ "ই-নামজারি কেস MUT-APP-4421 অনলাইনে ট্র্যাক করুন" আজ অনুসরণ করার জন্য নির্ধারিত।',
    timestamp: '2026-03-30T09:00:00.000Z',
    isRead: false,
    type: 'reminder',
    link: '/checks/CHK-2026-002',
    sourceNote: 'Simulated in-app reminder based on your scheduled due date.',
    sourceNoteBn: 'আপনার নির্ধারিত লক্ষ্য তারিখের ভিত্তিতে অভ্যন্তরীণ অনুস্মারক।',
  },
  {
    id: 'NOTIF-002',
    title: 'Bank Mortgage Notice: Nasirabad Plot 210',
    titleBn: 'ব্যাংক বন্ধক সতর্কতা: নাসিরাবাদ প্লট ২১০',
    message: 'Remember to withhold advance payment until obtaining the formal Bank NOC from Agrani Bank PLC.',
    messageBn: 'অগ্রণী ব্যাংক পিএলসি থেকে আনুষ্ঠানিক দায়মুক্তি সনদ (NOC) পাওয়ার আগে বায়না বা অগ্রিম টাকা প্রদান থেকে বিরত থাকুন।',
    timestamp: '2026-03-25T11:30:00.000Z',
    isRead: false,
    type: 'warning',
    link: '/checks/CHK-2026-004',
    sourceNote: 'Guidance generated from record findings.',
    sourceNoteBn: 'রেকর্ড পর্যবেক্ষণ থেকে সংগৃহীত নির্দেশনা।',
  },
  {
    id: 'NOTIF-003',
    title: 'Welcome to BhumiVerify',
    titleBn: 'ভূমিভেরিফাই প্ল্যাটফর্মে স্বাগতম',
    message: 'Track, verify, and maintain land due-diligence records securely before making financial decisions.',
    messageBn: 'জমি ক্রয়ের বা আর্থিক লেনদেনের পূর্বে স্বত্ব ও নামজারি তথ্য সতর্কতার সাথে যাচাই ও সংরক্ষণ করুন।',
    timestamp: '2026-03-20T08:00:00.000Z',
    isRead: true,
    type: 'info',
    link: '/how-it-works',
    sourceNote: 'System notice.',
    sourceNoteBn: 'সিস্টেম বার্তা।',
  },
];
