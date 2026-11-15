import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        ink: {
          950: '#0B0B0D',
          900: '#141317',
          800: '#232127',
          700: '#353139',
        },
        cream: {
          50: '#FAF7F1',
          100: '#EFE9DF',
          300: '#D2C9BC',
        },
        gold: {
          300: '#F7D995',
          400: '#EFC16B',
          500: '#DDA84E',
          700: '#805514',
        },
        wine: {
          700: '#732D45',
          900: '#391924',
        },
        status: {
          success: '#4ADE80',
          warning: '#FBBF24',
          danger: '#FB7185',
        },
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        border: 'var(--color-border)',
        'border-subtle': 'var(--color-border-subtle)',
        focus: 'var(--color-focus)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '24px',
        '2xl': '32px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 12px 32px rgba(0, 0, 0, 0.20)',
        modal: '0 24px 64px rgba(0, 0, 0, 0.36)',
      },
      maxWidth: {
        container: '1280px',
        form: '760px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

