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
          dark: '#0a1628',
          primary: '#0d5c58',
          primaryHover: '#0a4946',
          teal: '#0f766e',
          lightTeal: '#f0fdfa',
          accent: '#0284c7',
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
      fontSize: {
        '3xs': ['0.8125rem', { lineHeight: '1.25rem' }],
        '2xs': ['0.875rem', { lineHeight: '1.35rem' }],
        'xs': ['0.95rem', { lineHeight: '1.5rem' }],
        'sm': ['1.05rem', { lineHeight: '1.65rem' }],
        'base': ['1.15rem', { lineHeight: '1.8rem' }],
        'lg': ['1.3rem', { lineHeight: '1.9rem' }],
        'xl': ['1.5rem', { lineHeight: '2.1rem' }],
        '2xl': ['1.85rem', { lineHeight: '2.4rem' }],
        '3xl': ['2.35rem', { lineHeight: '2.8rem' }],
        '4xl': ['2.85rem', { lineHeight: '3.2rem' }],
        '5xl': ['3.6rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'glow-teal': '0 0 20px rgba(13, 92, 88, 0.15)',
        'glow-sm': '0 0 12px rgba(13, 92, 88, 0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'float': '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-down': 'slideDown 0.25s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },

  plugins: [],
}
