import { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
        card: 'var(--color-card)',
        input: 'var(--color-input)',
        hover: 'var(--color-hover)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        heading: 'var(--heading-font-weight)',
        body: 'var(--body-font-weight)',
      },
      letterSpacing: {
        heading: 'var(--heading-letter-spacing)',
      },
      lineHeight: {
        body: 'var(--body-line-height)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config