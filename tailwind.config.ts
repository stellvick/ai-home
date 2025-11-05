/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lunar theme
        lunar: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c1d3ff',
          300: '#a2bdff',
          400: '#8ba6ff',
          500: '#748fff',
          600: '#5d78ff',
          700: '#4661e6',
          800: '#2f4ac1',
          900: '#1a339e',
        },
        // Shadow theme
        shadow: {
          50: '#f5f1f0',
          100: '#ebe2e0',
          200: '#d8c5c0',
          300: '#c4a89f',
          400: '#b18b7e',
          500: '#9d6e5d',
          600: '#8a573e',
          700: '#77402f',
          800: '#642920',
          900: '#4d1a13',
        },
        // Mystical accents
        mystical: {
          gold: '#d4af37',
          purple: '#8b00ff',
          cyan: '#00d4ff',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
