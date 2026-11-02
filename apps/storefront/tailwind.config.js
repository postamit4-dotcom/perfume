import { lamaiaTailwindPreset } from '@lamaia/ui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [lamaiaTailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};

