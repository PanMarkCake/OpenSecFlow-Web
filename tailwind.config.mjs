/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#f0f5fa',
          100: '#dae8f3',
          200: '#b5d0e7',
          300: '#8fb8db',
          400: '#6a9fcf',
          500: '#4586c3',
          600: '#2c5282',
          700: '#1e3a5f',
          800: '#142840',
          900: '#0a1520',
        },
        'sky': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#5b9bd5',
          500: '#4a90c9',
          600: '#3b7bb8',
          700: '#2d5f8e',
          800: '#1e4164',
          900: '#0f293a',
        },
        'slate-blue': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#a5bcd4',
          500: '#8fa9c4',
          600: '#6b8caf',
          700: '#4a6c8f',
          800: '#334d6f',
          900: '#1e2f4f',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

