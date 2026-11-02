import React from 'react';
import { Wordmark, Button } from '@lamaia/ui';

export interface ComingSoonProps {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  backHref?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  subtitle,
  description,
  badge = 'Coming Soon in Next Phase',
  backHref = '/',
}) => {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
      <div className="inline-block">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold border border-accent/30 px-3 py-1 rounded">
          {badge}
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-display text-ink font-light">
        {title}
      </h1>

      <h2 className="text-lg font-sans text-ink-secondary max-w-xl mx-auto font-light">
        {subtitle}
      </h2>

      <p className="text-sm font-sans text-ink-secondary/80 max-w-lg mx-auto leading-relaxed">
        {description}
      </p>

      <div className="pt-6">
        <a href={backHref}>
          <Button variant="secondary" size="md">
            Return to Atelier
          </Button>
        </a>
      </div>
    </div>
  );
};

