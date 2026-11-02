/**
 * LA MAIA Typography Scale
 * Display: High-contrast serif (Cormorant Garamond)
 * Body: Clean humanist sans (Manrope)
 */

export const typography = {
  fonts: {
    display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
    sans: ['var(--font-sans)', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
  },
  sizes: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.02em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    xl: ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
    '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
    '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
  },
  tracking: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.18em', // Signature luxury letter-spacing for small uppercase labels
  },
} as const;

