/**
 * LA MAIA Palette and Scent Family Tokens
 * Defined in Codex Master UI Specification
 */

export const colors = {
  surface: {
    DEFAULT: '#F4EEE4', // Warm ivory
    raised: '#FBF8F3',  // Raised ivory surface
    dark: '#211D1A',    // Deep smoke
  },
  ink: {
    DEFAULT: '#1B1916', // Near-black primary text
    secondary: '#5E574E', // Muted secondary text
    inverse: '#F4EEE4',  // Light text on dark surfaces
  },
  line: {
    DEFAULT: '#D9CFC1', // Border / separator line
    muted: '#EAE2D7',
    dark: '#3E3731',
  },
  accent: {
    DEFAULT: '#9C7440', // Aged brass
    hover: '#7F5D31',   // Darker brass on hover
    subtle: '#E8DFD1',  // Subtle brass highlight
  },
  scentFamily: {
    floral: '#C98B8B',
    woody: '#8A6A4F',
    amber: '#B5763A',
    fresh: '#6F9A94',
    citrus: '#C9A43B',
    gourmand: '#8E5B4A',
    earthy: '#7A6B55',
  },
  state: {
    success: '#3D6B50',
    warning: '#A06B29',
    error: '#8F3434',
    info: '#4B6B7C',
  },
} as const;

export type ScentFamily = keyof typeof colors.scentFamily;

