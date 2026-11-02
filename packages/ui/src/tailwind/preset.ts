import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { radii } from '../tokens/radii';

export const lamaiaTailwindPreset = {
  theme: {
    extend: {
      colors: {
        surface: colors.surface,
        ink: colors.ink,
        line: colors.line,
        accent: colors.accent,
        scent: colors.scentFamily,
        state: colors.state,
      },
      fontFamily: {
        display: typography.fonts.display,
        sans: typography.fonts.sans,
      },
      letterSpacing: {
        widest: typography.tracking.widest,
        wider: typography.tracking.wider,
      },
      borderRadius: {
        DEFAULT: radii.DEFAULT,
        sm: radii.sm,
        md: radii.md,
        lg: radii.lg,
      },
    },
  },
};

