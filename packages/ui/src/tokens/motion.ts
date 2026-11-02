/**
 * LA MAIA Motion Tokens
 * 150-300ms ease-out, unhurried, respecting reduced motion
 */

export const motion = {
  durations: {
    fast: '150ms',
    DEFAULT: '220ms',
    slow: '320ms',
    editorial: '500ms',
  },
  easings: {
    DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

