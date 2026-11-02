import React from 'react';

export interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  className = '',
  size = 'md',
  dark = false,
}) => {
  const sizeClasses = {
    sm: 'text-xl tracking-widest',
    md: 'text-2xl tracking-[0.2em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.22em]',
    xl: 'text-4xl sm:text-5xl tracking-[0.25em]',
  };

  return (
    <span
      className={`font-display font-light lowercase transition-colors ${sizeClasses[size]} ${
        dark ? 'text-surface' : 'text-ink'
      } ${className}`}
      aria-label="la maia"
    >
      la maia
    </span>
  );
};

