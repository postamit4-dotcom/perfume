import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variantClasses = {
      primary:
        'bg-accent text-surface hover:bg-accent-hover active:bg-[#684C27] focus-visible:ring-accent focus-visible:ring-offset-surface',
      secondary:
        'border border-line hover:border-ink hover:text-ink text-ink bg-transparent focus-visible:ring-ink focus-visible:ring-offset-surface',
      ghost:
        'text-ink hover:bg-line/20 active:bg-line/40 focus-visible:ring-ink focus-visible:ring-offset-surface',
      dark:
        'bg-surface-dark text-surface hover:bg-black active:bg-black focus-visible:ring-surface-dark focus-visible:ring-offset-surface',
    };

    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5 rounded-sm tracking-wider uppercase',
      md: 'text-sm px-5 py-2.5 rounded tracking-wider uppercase',
      lg: 'text-base px-7 py-3.5 rounded tracking-widest uppercase',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

