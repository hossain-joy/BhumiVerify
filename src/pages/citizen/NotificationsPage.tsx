import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatDateTime } from '../../lib/utils';
import { DemoDataTag } from '../../components/common/DemoDataTag';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  CreditCard,
  Clock,
  Check,
  ChevronRight,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    currentRole,
    markNotificationRead,
    markAllNotificationsRead,
  } = useApp();
  const { language } = useLanguage();

  const roleNotifs = notifications.filter((n) => n.recipientRole === currentRole);

  const getIcon = (type: string) => {
    switch (type) {
      case 'decision':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-gov-primary" />;
      case 'expiry':
        return <Clock className="w-5 h-5 text-rose-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'নোটিফিকেশন ও অ্যালার্ট' : 'Notifications & Alerts'}
            </h1>
            <DemoDataTag type="demo_data" />
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'কর্মকর্তার সিদ্ধান্ত, পেমেন্ট রসিদ এবং এসএলএ সময়সীমা সংক্রান্ত তাৎক্ষণিক আপডেট।'
              : 'Real-time status alerts for officer decisions, payment vouchers, and SLA timers.'}
          </p>
        </div>

        {roleNotifs.some((n) => !n.isRead) && (
          <button
            onClick={markAllNotificationsRead}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 text-slate-600" />
            {language === 'bn' ? 'সব পঠিত হিসেবে চিহ্নিত করুন' : 'Mark all read'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
        {roleNotifs.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-2">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">
              {language === 'bn' ? 'আপনার তালিকায় কোনো নতুন নোটিফিকেশন নেই।' : 'No notifications in your queue.'}
            </p>
            <p>
              {language === 'bn'
                ? 'কর্মকর্তার কোনো সিদ্ধান্ত বা নতুন সতর্কবার্তা আসলে এখানে স্বয়ংক্রিয়ভাবে প্রদর্শিত হবে।'
                : 'New reviewer decisions or system alerts will appear here automatically.'}
            </p>
          </div>
        ) : (
          roleNotifs.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-start gap-3.5 transition-colors ${
                item.isRead ? 'bg-white hover:bg-slate-50' : 'bg-teal-50/40 hover:bg-teal-50/60'
              }`}
            >
              <div className="shrink-0 mt-0.5">{getIcon(item.type)}</div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-slate-900">{item.title}</h4>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">{item.message}</p>

                <div className="mt-2.5 flex items-center gap-3">
                  {item.link && (
                    <Link
                      to={item.link}
                      onClick={() => markNotificationRead(item.id)}
                      className="font-semibold text-gov-primary hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}{' '}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                  {!item.isRead && (
                    <button
                      onClick={() => markNotificationRead(item.id)}
                      className="text-slate-400 hover:text-slate-600 text-[11px] cursor-pointer"
                    >
                      {language === 'bn' ? 'মুছে ফেলুন' : 'Dismiss'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
