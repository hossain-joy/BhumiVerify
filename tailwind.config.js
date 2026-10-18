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
        '3xs': ['0.6875rem', { lineHeight: '0.95rem' }],   // 11px - micro tags, compact timestamps
        '2xs': ['0.75rem', { lineHeight: '1.1rem' }],       // 12px - small pills, table tags
        'xs': ['0.8125rem', { lineHeight: '1.25rem' }],     // 13px - meta, secondary captions
        'sm': ['0.875rem', { lineHeight: '1.4rem' }],       // 14px - inputs, buttons, navigation
        'base': ['0.9375rem', { lineHeight: '1.55rem' }],   // 15px - optimal Bengali body text
        'md': ['1rem', { lineHeight: '1.6rem' }],           // 16px - prominent body text
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],      // 18px - subheadings, card titles
        'xl': ['1.25rem', { lineHeight: '1.85rem' }],       // 20px - section headers
        '2xl': ['1.5rem', { lineHeight: '2rem' }],          // 24px - modal titles, card headlines
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],     // 30px - page titles
        '4xl': ['2.25rem', { lineHeight: '2.6rem' }],       // 36px - hero display
        '5xl': ['2.75rem', { lineHeight: '1.2' }],          // 44px - display headlines
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
