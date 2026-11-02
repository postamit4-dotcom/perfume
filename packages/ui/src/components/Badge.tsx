import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'flammable' | 'surface-only' | 'success' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-surface-raised text-ink border-line',
    accent: 'bg-accent/15 text-accent-hover border-accent/30',
    flammable: 'bg-amber-900/10 text-amber-900 border-amber-800/30 font-semibold',
    'surface-only': 'bg-blue-950/10 text-blue-950 border-blue-900/30',
    success: 'bg-emerald-900/10 text-emerald-900 border-emerald-800/30',
    warning: 'bg-orange-900/10 text-orange-900 border-orange-800/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-sans uppercase tracking-wider border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

