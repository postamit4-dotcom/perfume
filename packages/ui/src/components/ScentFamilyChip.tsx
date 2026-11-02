import React from 'react';
import { colors, ScentFamily } from '../tokens/colors';

export interface ScentFamilyChipProps {
  family: ScentFamily;
  label?: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const familyLabels: Record<ScentFamily, string> = {
  floral: 'Floral',
  woody: 'Woody',
  amber: 'Amber',
  fresh: 'Fresh',
  citrus: 'Citrus',
  gourmand: 'Gourmand',
  earthy: 'Earthy',
};

export const ScentFamilyChip: React.FC<ScentFamilyChipProps> = ({
  family,
  label,
  className = '',
  onClick,
  selected = false,
}) => {
  const displayLabel = label || familyLabels[family] || family;
  const dotColor = colors.scentFamily[family] || colors.accent.DEFAULT;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      aria-pressed={selected}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors border ${
        selected
          ? 'bg-ink text-surface border-ink'
          : 'bg-surface-raised text-ink border-line hover:border-ink/60'
      } ${!onClick ? 'cursor-default pointer-events-none' : 'cursor-pointer'} ${className}`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: dotColor }}
        aria-hidden="true"
      />
      <span>{displayLabel}</span>
    </button>
  );
};

