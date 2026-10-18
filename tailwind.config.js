/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          dark: '#0f2937',      // Deep navy/slate for formal headers
          primary: '#0d5c58',   // Deep green-teal (Bangladesh civic official tone)
          primaryHover: '#0a4946',
          teal: '#0f766e',
          lightTeal: '#f0fdfa',
          accent: '#0284c7',    // Civic information blue
          lightBlue: '#f0f9ff',
          muted: '#64748b',
          border: '#e2e8f0',
          card: '#ffffff',
          surface: '#f8fafc',
          warn: '#d97706',
          warnBg: '#fffbeb',
          danger: '#dc2626',
          dangerBg: '#fef2f2',
          success: '#16a34a',
          successBg: '#f0fdf4',
        }
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },

  plugins: [],
}
