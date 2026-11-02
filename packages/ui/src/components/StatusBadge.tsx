import React from 'react';

export type StatusType =
  | 'AVAILABLE'
  | 'QUARANTINED'
  | 'EXPIRED'
  | 'DAMAGED'
  | 'PENDING'
  | 'CONFIRMED'
  | 'FULFILLED'
  | 'CANCELLED';

export interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getBadgeStyle = (s: string) => {
    switch (s.toUpperCase()) {
      case 'AVAILABLE':
      case 'CONFIRMED':
      case 'FULFILLED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'QUARANTINED':
      case 'PENDING':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'EXPIRED':
      case 'DAMAGED':
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-sans font-medium uppercase tracking-wider border ${getBadgeStyle(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
};

