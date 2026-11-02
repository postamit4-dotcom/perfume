import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevated = false,
}) => {
  return (
    <div
      className={`rounded border border-line ${
        elevated ? 'bg-surface-raised shadow-sm' : 'bg-surface'
      } p-6 transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

