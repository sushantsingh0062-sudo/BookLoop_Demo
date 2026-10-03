/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#102a43',
          900: '#0b1b2b',
          950: '#07111c',
        },
        brand: {
          navy: '#0F2C59',
          navyDark: '#0A1B36',
          teal: '#0D9488',
          tealLight: '#14B8A6',
          tealBg: '#F0FDFA',
          green: '#059669',
          amber: '#F59E0B',
          amberLight: '#FEF3C7',
          bg: '#F8FAFC',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 44, 89, 0.06), 0 2px 6px -1px rgba(15, 44, 89, 0.04)',
        'hover': '0 12px 30px -4px rgba(15, 44, 89, 0.12), 0 4px 12px -2px rgba(15, 44, 89, 0.08)',
        'glass': '0 8px 32px 0 rgba(15, 44, 89, 0.08)',
      }
    },
  },
  plugins: [],
}
