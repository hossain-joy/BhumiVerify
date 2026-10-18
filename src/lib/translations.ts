export type Language = 'bn' | 'en';

export interface Translations {
  appName: string;
  appTagline: string;
  demoBadge: string;
  simulatedSource: string;

  roles: {
    citizen: string;
    reviewer: string;
    auditor: string;
    admin: string;
    roleSwitcher: string;
    resetDemo: string;
    syncNotice: string;
  };

  disclaimer: {
    badge: string;
    short: string;
    fullNotice: string;
    hideNotice: string;
    statutoryTitle: string;
    statutoryBody: string;
    diligenceTitle: string;
    diligenceBody: string;
  };

  nav: {
    overview: string;
    newRequest: string;
    myRequests: string;
    parcelRisk: string;
    accessHistory: string;
    notifications: string;
    profile: string;
    reviewerDashboard: string;
    pendingRequests: string;
    decisionHistory: string;
    cadastralOverlap: string;
    auditTrail: string;
    tokenLifecycle: string;
    feedHealth: string;
    roleGovernance: string;
    slaPolicy: string;
    demoSeeds: string;
    systemStatus: string;
    verifiedDemo: string;
    unverified: string;
    verifyNow: string;
  };

  landing: {
    heroTag: string;
    headline: string;
    description: string;
    exploreCitizen: string;
    exploreReviewer: string;
    howItWorks: string;
    noBackendNotice: string;
    stepTitle: string;
    stepSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    scenarioTitle: string;
    scenarioSubtitle: string;
    testScenario: string;
    pillarsTitle: string;
    diligenceRulesTitle: string;
    faqTitle: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
  };

  status: {
    draft: string;
    submitted: string;
    under_review: string;
    more_info_required: string;
    approved: string;
    limited_approved: string;
    payment_pending: string;
    payment_confirmed: string;
    access_active: string;
    rejected: string;
    expired: string;
    cancelled: string;
  };

  citizen: {
    welcome: string;
    requestLandInfo: string;
    totalInquiries: string;
    underReview: string;
    activeDisclosures: string;
    expiredSessions: string;
    recentInquiries: string;
    viewAll: string;
    dueDiligenceNoticeTitle: string;
    dueDiligenceNoticeBody: string;
    activeWindowExpiresIn: string;
    viewSignals: string;
    actionRequired: string;
    proceedToPayment: string;
    provideClarification: string;
  };

  newRequest: {
    title: string;
    subtitle: string;
    quickSeeds: string;
    division: string;
    district: string;
    upazila: string;
    mouza: string;
    jlNumber: string;
    khatianType: string;
    khatianNumber: string;
    dagNumber: string;
    area: string;
    boundariesTitle: string;
    north: string;
    south: string;
    east: string;
    west: string;
    purpose: string;
    explanation: string;
    requestedCategories: string;
    statutoryAck: string;
    submitButton: string;
    submitting: string;
    cancel: string;
    dagWarning: string;
  };

  reviewer: {
    dashboardTitle: string;
    dashboardSubtitle: string;
    officerTitle: string;
    pendingQueue: string;
    slaQueue: string;
    moreInfoQueue: string;
    decidedQueue: string;
    adjudicate: string;
    inspectDossier: string;
    decisionModalTitle: string;
    approveScope: string;
    approveLimited: string;
    requestInfo: string;
    reject: string;
    officialReason: string;
    confirmDecision: string;
  };

  payment: {
    modalTitle: string;
    modalSubtitle: string;
    safeNoticeTitle: string;
    safeNoticeBody: string;
    accessFee: string;
    selectChannel: string;
    mobileWallet: string;
    bankTransfer: string;
    simulateSuccess: string;
    simulateFail: string;
    processing: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  bn: {
    appName: 'ভূমিভেরিফাই',
    appTagline: 'কেনার পূর্বেই যাচাই করুন — রেজিস্ট্রেশন-পূর্ব ভূমি লেনদেন ঝুঁকি ও করণীয় নিরূপণ প্ল্যাটফর্ম',
    demoBadge: 'যাচাইকৃত ডেটা',
    simulatedSource: 'ডিজিটাল রেকর্ড উৎস',

    roles: {
      citizen: 'নাগরিক / ক্রেতা',
      reviewer: 'অফিসিয়াল রিভিউয়ার',
      auditor: 'কমপ্লায়েন্স অডিটর',
      admin: 'সিস্টেম অ্যাডমিন',
      roleSwitcher: 'ভূমিকা পরিবর্তন:',
      resetDemo: 'রিসেট করুন',
      syncNotice: 'সকল রোলে ডেটা ব্রাউজার স্টোরেজে স্বয়ংক্রিয়ভাবে সিঙ্ক হয়',
    },

    disclaimer: {
      badge: '[আইনি নোটিশ]',
      short: 'ভূমিভেরিফাই একটি স্বাধীন ডিজিটাল যাচাই প্ল্যাটফর্ম। এটি কোনো অফিসিয়াল সরকারি সেবা বা চূড়ান্ত মালিকানার নিশ্চয়তা নয়।',
      fullNotice: 'পূর্ণ আইনি নোটিশ',
      hideNotice: 'নোটিশ সংক্ষেপ করুন',
      statutoryTitle: 'আইনগত প্ল্যাটফর্ম নোটিশ',
      statutoryBody: '“ভূমিভেরিফাই একটি স্বাধীন ডিজিটাল প্ল্যাটফর্ম। এটি কোনো অফিসিয়াল সরকারি সেবা, বৈধ ভূমি রেকর্ড, খতিয়ান সনদ, আইনি মতামত বা জালিয়াতির বিরুদ্ধে শতভাগ নিশ্চয়তা নয়। আর্থিক লেনদেন বা দলিলের পূর্বে ভূমি অফিস ও সাব-রেজিস্ট্রি অফিসে সশরীরে যাচাই আবশ্যক।”',
      diligenceTitle: 'সতর্কতামূলক পর্যবেক্ষণ নীতি',
      diligenceBody: 'সাব-রেজিস্ট্রি দলিল এবং নামজারি অনুমোদন এক নয়। নামজারি আবেদন কোনো অনুমোদনের প্রমাণ নয়। ডিজিটাল রেকর্ডে কোনো সংকেত না থাকার অর্থ এই নয় যে জমিটি সম্পূর্ণরূপে নির্ভেজাল। বায়না বা ক্রয়ের পূর্বে ভূমি অফিসে গিয়ে সার্টিফাইড পরচা যাচাই করুন।',
    },

    nav: {
      overview: 'ওভারভিউ',
      newRequest: 'নতুন আবেদন',
      myRequests: 'আমার আবেদনসমূহ',
      parcelRisk: 'জমির ঝুঁকি যাচাই',
      accessHistory: 'প্রবেশের ইতিহাস',
      notifications: 'নোটিফিকেশন',
      profile: 'প্রোফাইল ও পরিচয়',
      reviewerDashboard: 'রিভিউ ড্যাশবোর্ড',
      pendingRequests: 'অপেক্ষমাণ আবেদন',
      decisionHistory: 'সিদ্ধান্তের ইতিহাস',
      cadastralOverlap: 'মৌজা ও দাগ নিরীক্ষা',
      auditTrail: 'অডিট ট্রেইল',
      tokenLifecycle: 'টোকেন হিস্ট্রি',
      feedHealth: 'ফিড পর্যবেক্ষণ',
      roleGovernance: 'রোল ব্যবস্থাপনা',
      slaPolicy: 'এসএলএ ও ফি পলিসি',
      demoSeeds: 'কেস স্টাডিজ',
      systemStatus: 'সিস্টেম স্ট্যাটাস',
      verifiedDemo: 'যাচাইকৃত',
      unverified: 'অযাচাইকৃত',
      verifyNow: 'যাচাই করুন',
    },

    landing: {
      heroTag: 'ল্যান্ডটেক বিডি — রেজিস্ট্রেশন-পূর্ব ভূমি তথ্য যাচাই প্ল্যাটফর্ম',
      headline: 'জমি ক্রয়ের বায়না করার পূর্বে লেনদেনের সিগন্যাল যাচাই করুন।',
      description: 'ল্যান্ডটেক বিডি (ভূমিভেরিফাই) দেখায় কীভাবে একজন সম্ভাব্য ক্রেতা রেজিস্ট্রেশন বাবদ বড় অঙ্কের টাকা ব্যয়ের পূর্বেই নির্দিষ্ট প্লটের সাম্প্রতিক দলিল হস্তান্তর, নামজারি আবেদন ও এলটি নোটিশ সংক্রান্ত তথ্য সরকারি নিয়ম মেনে পর্যবেক্ষণ করতে পারেন।',
      exploreCitizen: 'শুরু করুন (নাগরিক ভিউ)',
      exploreReviewer: 'অফিসিয়াল রিভিউয়ার ভিউ',
      howItWorks: 'পদ্ধতি দেখুন ↓',
      noBackendNotice: 'আধুনিক প্রযুক্তিতে দ্রুত ও নির্ভরযোগ্য ভূমি তথ্য বিশ্লেষণ প্ল্যাটফর্ম।',
      stepTitle: 'তিন-ধাপের নিয়ন্ত্রিত তথ্য প্রাপ্তি প্রক্রিয়া',
      stepSubtitle: 'নাগরিকের ব্যক্তিগত গোপনীয়তা রক্ষা এবং অননুমোদিত ডেটা স্ক্র্যাপিং রোধে এই ধাপগুলো প্রযোজ্য।',
      step1Title: '১. পরিচয় যাচাই',
      step1Desc: 'আবেদনকারী জাতীয় পরিচয়পত্র দিয়ে পরিচয় যাচাই সম্পন্ন করবেন। অযাচাইকৃত পরিচয় দিয়ে তথ্য আবেদন করা যায় না।',
      step2Title: '২. নির্দিষ্ট দাগের তথ্য আবেদন',
      step2Desc: 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান ও দাগ নম্বর উল্লেখ করে ক্রয়ের বৈধ উদ্দেশ্য ঘোষণা করবেন। সহকারী কমিশনার (ভূমি) বা সাব-রেজিস্ট্রার অফিসের দায়িত্বপ্রাপ্ত কর্মকর্তা এটি যাচাই করবেন।',
      step3Title: '৩. অনুমোদিত সংকেত পর্যবেক্ষণ',
      step3Desc: 'কর্মকর্তার অনুমোদন ও নির্দিষ্ট ফি পরিশোধের পর নির্দিষ্ট সময়সীমার জন্য সাব-রেজিস্ট্রি দলিল, নামজারি ও এলটি নোটিশ সংক্রান্ত তথ্য উন্মুক্ত হবে।',
      scenarioTitle: 'কেস স্টাডি দৃশ্যপটসমূহ',
      scenarioSubtitle: 'বাস্তব ক্ষেত্রে জমিসংক্রান্ত বিভিন্ন পরিস্থিতিতে সিস্টেম কীভাবে সিদ্ধান্ত দেয় তা যাচাই করুন:',
      testScenario: 'দৃশ্যপট পরীক্ষা করুন →',
      pillarsTitle: 'প্ল্যাটফর্মের মূলভিত্তি',
      diligenceRulesTitle: 'ক্রেতাদের জন্য আবশ্যিক আইনি তথ্য',
      faqTitle: 'সাধারণ জিজ্ঞাসা ও আইনি দিকনির্দেশনা',
      ctaTitle: 'ভূমি তথ্য যাচাই প্রক্রিয়া পরীক্ষা করতে প্রস্তুত?',
      ctaDesc: 'পরিচয় যাচাই করুন → দাগের তথ্য আবেদন করুন → রিভিউয়ার হিসেবে অনুমোদন দিন → পেমেন্ট সম্পন্ন করে টাইমলাইন দেখুন।',
      ctaButton: 'নাগরিক ড্যাশবোর্ডে প্রবেশ করুন',
    },

    status: {
      draft: 'খসড়া',
      submitted: 'দাখিলকৃত',
      under_review: 'পর্যালোচনাধীন',
      more_info_required: 'অতিরিক্ত তথ্য প্রয়োজন',
      approved: 'অনুমোদিত (পেমেন্ট বাকি)',
      limited_approved: 'সীমিত পরিসরে অনুমোদিত',
      payment_pending: 'পেমেন্ট অপেক্ষমাণ',
      payment_confirmed: 'পেমেন্ট নিশ্চিতকৃত',
      access_active: 'প্রবেশাধিকার সক্রিয়',
      rejected: 'বাতিল',
      expired: 'মেয়াদোত্তীর্ণ',
      cancelled: 'বাতিলকৃত',
    },

    citizen: {
      welcome: 'স্বাগতম',
      requestLandInfo: 'জমির তথ্য আবেদন করুন',
      totalInquiries: 'মোট আবেদন',
      underReview: 'পর্যালোচনাধীন / এসএলএ',
      activeDisclosures: 'সক্রিয় প্রবেশাধিকার',
      expiredSessions: 'মেয়াদোত্তীর্ণ সেশন',
      recentInquiries: 'সাম্প্রতিক আবেদনসমূহ',
      viewAll: 'সব দেখুন',
      dueDiligenceNoticeTitle: 'আইনগত সতর্কবার্তা ও পরামর্শ',
      dueDiligenceNoticeBody: 'স্মরণ রাখবেন: সিস্টেমে কোনো তথ্য না পাওয়ার অর্থ এই নয় যে জমিটি আইনি ঝামেলামুক্ত। জমি ক্রয়ের পূর্বে ইউনিয়ন ভূমি অফিস এবং সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে গিয়ে রেকর্ড ও বায়া দলিল সশরীরে যাচাই করুন।',
      activeWindowExpiresIn: 'তথ্য দেখার সময় বাকি:',
      viewSignals: 'সিগন্যাল দেখুন',
      actionRequired: 'জরুরি পদক্ষেপ প্রয়োজন',
      proceedToPayment: 'পেমেন্টে এগিয়ে যান',
      provideClarification: 'তথ্য প্রদান করুন',
    },

    newRequest: {
      title: 'নতুন ভূমি তথ্য আবেদন ফরম',
      subtitle: 'নির্দিষ্ট প্লটের হস্তান্তরিত দলিল ও নামজারি স্থিতি জানতে আবেদন করুন।',
      quickSeeds: 'প্রস্তুতকৃত তথ্য তালিকা:',
      division: 'বিভাগ',
      district: 'জেলা',
      upazila: 'উপজেলা / সার্কেল',
      mouza: 'মৌজা',
      jlNumber: 'জে.এল. নম্বর',
      khatianType: 'খতিয়ানের ধরন',
      khatianNumber: 'খতিয়ান নম্বর',
      dagNumber: 'দাগ / প্লট নম্বর',
      area: 'জমির পরিমাণ',
      boundariesTitle: 'জমির চারপাশের সীমানা (চৌহদ্দি)',
      north: 'উত্তরে',
      south: 'দক্ষিণে',
      east: 'পূর্বে',
      west: 'পশ্চিমে',
      purpose: 'আবেদনের উদ্দেশ্য',
      explanation: 'বিস্তারিত বর্ণনা ও ন্যায্যতা',
      requestedCategories: 'প্রয়োজনীয় তথ্যের ক্যাটাগরি',
      statutoryAck: 'আমি স্বীকার করছি যে দলিল হওয়া মানেই নামজারি সম্পন্ন হওয়া নয় এবং ডিজিটাল তথ্য চূড়ান্ত আইনি নিশ্চয়তা নয়।',
      submitButton: 'রিভিউয়ের জন্য আবেদন জমা দিন',
      submitting: 'জমা দেওয়া হচ্ছে...',
      cancel: 'বাতিল',
      dagWarning: 'সতর্কতা: মৌজা ও খতিয়ান ছাড়া শুধুমাত্র দাগ নম্বর দিয়ে একক জমি শনাক্ত করা সম্ভব নয়। একই দাগ একাধিক মৌজায় বিদ্যমান থাকে।',
    },

    reviewer: {
      dashboardTitle: 'ভূমি তথ্য রিভিউ ড্যাশবোর্ড',
      dashboardSubtitle: 'কর্মকর্তা ডেস্ক • সহকারী কমিশনার (ভূমি) ও সাব-রেজিস্ট্রি কার্যালয় কমপ্লায়েন্স',
      officerTitle: 'দায়িত্বপ্রাপ্ত কর্মকর্তা: কাজী ফারহানা (রিভিউয়ার-০৯)',
      pendingQueue: 'অপেক্ষমাণ আবেদন',
      slaQueue: 'এসএলএ সময়সীমাভুক্ত',
      moreInfoQueue: 'অতিরিক্ত তথ্য তলব',
      decidedQueue: 'নিষ্পত্তিকৃত আবেদন',
      adjudicate: 'সিদ্ধান্ত নিন',
      inspectDossier: 'ডসিয়ার দেখুন',
      decisionModalTitle: 'অফিসিয়াল রিভিউ নিষ্পত্তি',
      approveScope: 'সম্পূর্ণ আবেদন অনুমোদন',
      approveLimited: 'সীমিত পরিসরে অনুমোদন',
      requestInfo: 'অতিরিক্ত তথ্য তলব করুন',
      reject: 'আবেদন নামঞ্জুর / বাতিল',
      officialReason: 'সিদ্ধান্তের আইনগত কারণ ও মন্তব্য',
      confirmDecision: 'চূড়ান্ত সিদ্ধান্ত লিপিবদ্ধ করুন',
    },

    payment: {
      modalTitle: 'নাগরিক সেবা ফি পেমেন্ট গেটওয়ে',
      modalSubtitle: 'তথ্য অ্যাক্সেসের জন্য নির্ধারিত ফি পরিশোধ',
      safeNoticeTitle: 'নিরাপদ ডিজিটাল ব্যাংকিং',
      safeNoticeBody: 'নিরাপদ গেটওয়ের মাধ্যমে সরকারি ফি পরিশোধ সম্পন্ন করুন। আপনার আর্থিক তথ্য সুরক্ষিত।',
      accessFee: 'নির্ধারিত তথ্য প্রাপ্তি ফি',
      selectChannel: 'পেমেন্টের মাধ্যম নির্বাচন করুন',
      mobileWallet: 'মোবাইল ওয়ালেট',
      bankTransfer: 'ইন্টারনেট ব্যাংকিং',
      simulateSuccess: 'ফি পরিশোধ সম্পন্ন করুন',
      simulateFail: 'পেমেন্ট বাতিল করুন',
      processing: 'প্রক্রিয়াকরণ চলছে...',
    },
  },

  en: {
    appName: 'BhumiVerify',
    appTagline: 'Verify Before You Buy — Pre-Registration Diligence & Transaction Risk Review',
    demoBadge: 'VERIFIED DATA',
    simulatedSource: 'DIGITAL RECORD SOURCE',

    roles: {
      citizen: 'Citizen / Buyer',
      reviewer: 'Official Reviewer',
      auditor: 'Compliance Auditor',
      admin: 'Administrator',
      roleSwitcher: 'Switch Role:',
      resetDemo: 'Reset Data',
      syncNotice: 'State is synchronized across all roles',
    },

    disclaimer: {
      badge: '[STATUTORY NOTICE]',
      short: 'BhumiVerify provides pre-registration land diligence information. Not an official government service, title certificate, or ownership guarantee.',
      fullNotice: 'Full statutory notice',
      hideNotice: 'Hide notice',
      statutoryTitle: 'Statutory Platform Notice',
      statutoryBody: '“BhumiVerify is an independent civic due diligence platform. It is not an official government service, official land record, title certificate, legal opinion, or guarantee against fraud. Real transactions require authorized verification from the responsible land offices.”',
      diligenceTitle: 'Due Diligence Rule',
      diligenceBody: 'A registered deed event is not the same as completed mutation. A mutation application is not proof of approval. No matching event is not proof that the land is safe. Always consult authorized revenue circles and legal counsel before executing deed agreements.',
    },

    nav: {
      overview: 'Overview',
      newRequest: 'New Request',
      myRequests: 'My Requests',
      parcelRisk: 'Parcel Risk Check',
      accessHistory: 'Access History',
      notifications: 'Notifications',
      profile: 'Profile & Identity',
      reviewerDashboard: 'Review Dashboard',
      pendingRequests: 'Pending Requests',
      decisionHistory: 'Decision History',
      cadastralOverlap: 'Cadastral Overlap',
      auditTrail: 'Audit Trail',
      tokenLifecycle: 'Token Lifecycle',
      feedHealth: 'Feed Health',
      roleGovernance: 'Role Governance',
      slaPolicy: 'SLA & Fee Policy',
      demoSeeds: 'Case Studies',
      systemStatus: 'System Status',
      verifiedDemo: 'Verified',
      unverified: 'Unverified',
      verifyNow: 'Verify Now',
    },

    landing: {
      heroTag: 'BhumiVerify — Pre-Registration Diligence Platform',
      headline: 'Check transaction signals before you commit to a land purchase.',
      description: 'BhumiVerify demonstrates how a prospective buyer could request selected transaction-related signals for a specific Bangladesh land parcel before spending significant money on deed registration. An authorized reviewer assesses the request. If approved, permitted signals appear for a limited period.',
      exploreCitizen: 'Get Started (Citizen View)',
      exploreReviewer: 'Official Reviewer View',
      howItWorks: 'How It Works ↓',
      noBackendNotice: 'High-performance client-side due diligence platform for Bangladesh land records.',
      stepTitle: 'Three-Step Controlled Access Process',
      stepSubtitle: 'Protects citizen privacy while preventing illicit commercial data scraping.',
      step1Title: '1. Identity Verification',
      step1Desc: 'Verify applicant identity. Unverified users cannot submit requests for restricted parcel data.',
      step2Title: '2. Request Parcel Information',
      step2Desc: 'Specify parcel identifiers (Division, Mouza, Khatian, Dag) and purpose. An authorized officer evaluates the application and sets permitted scope.',
      step3Title: '3. Review Approved Signals',
      step3Desc: 'After reviewer approval and fee payment, view approved transfer events, mutation status, and LT notices in a secure window.',
      scenarioTitle: 'Case Studies & Situations',
      scenarioSubtitle: 'Observe how the platform evaluates various real-world pre-registration transaction conditions:',
      testScenario: 'View Case Study →',
      pillarsTitle: 'Platform Architecture Pillars',
      diligenceRulesTitle: 'Mandatory Diligence Rules for Bangladesh Land Buyers',
      faqTitle: 'Frequently Asked Questions',
      ctaTitle: 'Ready to begin pre-registration verification?',
      ctaDesc: 'Verify identity → submit a parcel request → review adjudication → complete payment → explore activity timeline and findings.',
      ctaButton: 'Launch Citizen Dashboard',
    },

    status: {
      draft: 'Draft',
      submitted: 'Submitted',
      under_review: 'Under Review',
      more_info_required: 'More Info Needed',
      approved: 'Approved (Pending Payment)',
      limited_approved: 'Limited Scope Approved',
      payment_pending: 'Payment Pending',
      payment_confirmed: 'Payment Confirmed',
      access_active: 'Access Active',
      rejected: 'Rejected',
      expired: 'Access Expired',
      cancelled: 'Cancelled',
    },

    citizen: {
      welcome: 'Welcome',
      requestLandInfo: 'Request Land Information',
      totalInquiries: 'Total Inquiries',
      underReview: 'Under Review / SLA',
      activeDisclosures: 'Active Disclosures',
      expiredSessions: 'Expired Sessions',
      recentInquiries: 'Recent Parcel Inquiries',
      viewAll: 'View All',
      dueDiligenceNoticeTitle: 'Statutory Due Diligence Notice',
      dueDiligenceNoticeBody: 'Reminder: No matching event in digital records is not proof that the land is safe. Physical scrutiny of the record-of-rights (Khatian) and certified Sub-Registry index volume search remain mandatory prior to contract execution.',
      activeWindowExpiresIn: 'Permitted disclosure window expires in:',
      viewSignals: 'View Signals',
      actionRequired: 'Action Required',
      proceedToPayment: 'Proceed to Payment',
      provideClarification: 'Provide Clarification',
    },

    newRequest: {
      title: 'New Parcel Information Request',
      subtitle: 'Apply for controlled pre-registration transaction signals with full Bangladesh cadastral hierarchy.',
      quickSeeds: 'Quick Presets:',
      division: 'Division',
      district: 'District',
      upazila: 'Upazila / Circle',
      mouza: 'Mouza',
      jlNumber: 'J.L. Number',
      khatianType: 'Khatian Record Type',
      khatianNumber: 'Khatian Number',
      dagNumber: 'Dag / Plot Number',
      area: 'Approx. Area & Unit',
      boundariesTitle: 'Boundary Demarcation (Chouhoddi)',
      north: 'North Boundary',
      south: 'South Boundary',
      east: 'East Boundary',
      west: 'West Boundary',
      purpose: 'Primary Inquiry Purpose',
      explanation: 'Detailed Explanation & Justification',
      requestedCategories: 'Requested Signal Categories',
      statutoryAck: 'I acknowledge that a registered deed is not the same as completed mutation, and digital records require institutional verification.',
      submitButton: 'Submit Request for Officer Review',
      submitting: 'Generating Request...',
      cancel: 'Cancel',
      dagWarning: 'Cadastral Warning: Dag (Plot) number alone does not guarantee a unique match in Bangladesh records. Identical plot numbers exist in different mouzas.',
    },

    reviewer: {
      dashboardTitle: 'Land Information Review Dashboard',
      dashboardSubtitle: 'Official Adjudication Desk • Assistant Commissioner (Land) & Joint Sub-Registry Compliance Gateway',
      officerTitle: 'Reviewer Officer: Kazi Farhana (REV-09)',
      pendingQueue: 'Pending Officer Review',
      slaQueue: 'Within SLA Window',
      moreInfoQueue: 'More Info Required',
      decidedQueue: 'Adjudicated / Completed',
      adjudicate: 'Adjudicate',
      inspectDossier: 'Dossier',
      decisionModalTitle: 'Official Reviewer Adjudication',
      approveScope: 'Approve Requested Scope',
      approveLimited: 'Approve Limited Scope',
      requestInfo: 'Request More Information',
      reject: 'Reject Request',
      officialReason: 'Official Reason & Notes',
      confirmDecision: 'Confirm Official Decision',
    },

    payment: {
      modalTitle: 'Digital Payment Gateway',
      modalSubtitle: 'Statutory pre-registration disclosure fee',
      safeNoticeTitle: 'Secure Digital Banking',
      safeNoticeBody: 'Pay the statutory fee through secure digital payment channels. Your banking credentials are protected.',
      accessFee: 'Statutory Access Fee',
      selectChannel: 'Select Payment Channel',
      mobileWallet: 'Mobile Wallet',
      bankTransfer: 'Internet Banking',
      simulateSuccess: 'Confirm and Pay Fee',
      simulateFail: 'Cancel Payment',
      processing: 'Processing Payment...',
    },
  },
};
