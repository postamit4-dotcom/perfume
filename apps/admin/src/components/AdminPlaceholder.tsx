import React from 'react';
import { Card, Badge, Button } from '@lamaia/ui';

export interface AdminPlaceholderProps {
  title: string;
  phase: string;
  description: string;
  capabilities: string[];
}

export const AdminPlaceholder: React.FC<AdminPlaceholderProps> = ({
  title,
  phase,
  description,
  capabilities,
}) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-sans font-semibold text-ink">{title}</h1>
            <Badge variant="accent">{phase}</Badge>
          </div>
          <p className="text-xs text-ink-secondary mt-1">{description}</p>
        </div>
      </div>

      <Card className="space-y-4">
        <h2 className="text-xs uppercase tracking-wider font-sans font-medium text-ink-secondary">
          Planned Module Capabilities
        </h2>
        <ul className="space-y-2 text-xs font-sans text-ink">
          {capabilities.map((cap, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="pt-2">
        <a href="/">
          <Button size="sm" variant="secondary">
            &larr; Back to System Overview
          </Button>
        </a>
      </div>
    </div>
  );
};

