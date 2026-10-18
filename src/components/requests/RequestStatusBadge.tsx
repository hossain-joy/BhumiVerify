import React from 'react';
import { RequestStatus } from '../../types';
import { getStatusMeta } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';

interface RequestStatusBadgeProps {
  status: RequestStatus;
  className?: string;
  showDot?: boolean;
}

export const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({
  status,
  className = '',
  showDot = true,
}) => {
  const meta = getStatusMeta(status);
  const { t } = useLanguage();

  const label = t.status[status] || meta.label;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${meta.badgeClass} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor}`} />}
      {label}
    </span>
  );
};

