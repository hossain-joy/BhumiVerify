import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationsContext';
import { useLanguage } from '../../context/LanguageContext';
import { toBengaliNumerals } from '../../utils/formatStatus';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Clock,
  Info,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Disclaimer } from '../../components/common/Disclaimer';

export const NotificationsPage: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    resetNotifications,
  } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-purple-600" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isBn ? 'ইন-অ্যাপ অনুস্মারক ও বিজ্ঞপ্তি' : 'In-App Reminders & Notices'}
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                {isBn ? `${toBengaliNumerals(unreadCount)}টি নতুন` : `${unreadCount} new`}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {isBn
              ? 'আপনার জমি যাচাই ও অনুসন্ধানের কাজের হালনাগাদ নোটিফিকেশন।'
              : 'Updates and task reminders for your land verification checks.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="btn-secondary text-xs py-1.5 px-3 font-semibold flex items-center gap-1.5 text-slate-700 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isBn ? 'সব পড়া হয়েছে' : 'Mark all read'}</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAllNotifications}
              className="text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'সব মুছুন' : 'Clear all'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-slate-800">{isBn ? 'এই মুহূর্তে কোনো বিজ্ঞপ্তি নেই' : 'No notifications at this time'}</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isBn
              ? 'আপনার সব বার্তা পড়া হয়ে গেছে। নতুন কোনো আপডেট বা নোটিশ এলে এখানে প্রদর্শিত হবে।'
              : "You're all caught up. New updates and notices will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                item.isRead
                  ? 'bg-white border-slate-200'
                  : 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 shrink-0">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-xs font-bold ${
                        item.isRead ? 'text-slate-800' : 'text-slate-900'
                      }`}
                    >
                      {isBn && item.titleBn ? item.titleBn : item.title}
                    </h3>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-gov-primary" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isBn && item.messageBn ? item.messageBn : item.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                    <span>{new Date(item.timestamp).toLocaleString(isBn ? 'bn-BD' : 'en-US')}</span>
                    {(item.sourceNoteBn || item.sourceNote) && (
                      <>
                        <span>•</span>
                        <span className="italic">{isBn && item.sourceNoteBn ? item.sourceNoteBn : item.sourceNote}</span>
                      </>
                    )}
                    {item.link && (
                      <>
                        <span>•</span>
                        <Link
                          to={item.link}
                          className="font-bold text-gov-primary hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>{isBn ? 'সংশ্লিষ্ট জমি যাচাই দেখুন' : 'Open related check'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!item.isRead && (
                  <button
                    type="button"
                    onClick={() => markAsRead(item.id)}
                    title={isBn ? 'পঠিত হিসেবে চিহ্নিত করুন' : 'Mark as read'}
                    className="p-1 text-slate-400 hover:text-gov-primary rounded cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deleteNotification(item.id)}
                  title={isBn ? 'বিজ্ঞপ্তিটি বাতিল করুন' : 'Dismiss notification'}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
