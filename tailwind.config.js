/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#7C3AED', // Deep purple (primary) - violet-600
        'primary-50': '#F3F0FF', // Ultra light purple - violet-50
        'primary-100': '#E9E5FF', // Very light purple - violet-100
        'primary-200': '#D4CDFF', // Light purple - violet-200
        'primary-300': '#B8A8FF', // Medium light purple - violet-300
        'primary-400': '#9B7AFF', // Medium purple - violet-400
        'primary-500': '#8B5CF6', // Standard purple - violet-500
        'primary-600': '#7C3AED', // Deep purple (primary) - violet-600
        'primary-700': '#6D28D9', // Darker purple - violet-700
        'primary-800': '#5B21B6', // Very dark purple - violet-800
        'primary-900': '#4C1D95', // Darkest purple - violet-900

        // Secondary Colors
        'secondary': '#C4B5FD', // Soft lavender (secondary) - violet-300
        'secondary-50': '#F5F3FF', // Ultra light lavender - violet-50
        'secondary-100': '#EDE9FE', // Very light lavender - violet-100
        'secondary-200': '#DDD6FE', // Light lavender - violet-200
        'secondary-300': '#C4B5FD', // Soft lavender (secondary) - violet-300
        'secondary-400': '#A78BFA', // Medium lavender - violet-400
        'secondary-500': '#8B5CF6', // Standard lavender - violet-500

        // Accent Colors
        'accent': '#F472B6', // Warm pink (accent) - pink-400
        'accent-50': '#FDF2F8', // Ultra light pink - pink-50
        'accent-100': '#FCE7F3', // Very light pink - pink-100
        'accent-200': '#FBCFE8', // Light pink - pink-200
        'accent-300': '#F9A8D4', // Medium light pink - pink-300
        'accent-400': '#F472B6', // Warm pink (accent) - pink-400
        'accent-500': '#EC4899', // Standard pink - pink-500
        'accent-600': '#DB2777', // Deep pink - pink-600

        // Background Colors
        'background': '#FEFBFF', // Ultra-light purple-tinted white - custom
        'surface': '#FFFFFF', // Pure white for cards - white
        'surface-50': '#F9FAFB', // Very light gray - gray-50
        'surface-100': '#F3F4F6', // Light gray - gray-100

        // Text Colors
        'text-primary': '#1F2937', // Dark gray (text primary) - gray-800
        'text-secondary': '#6B7280', // Medium gray (text secondary) - gray-500
        'text-tertiary': '#9CA3AF', // Light gray - gray-400
        'text-inverse': '#FFFFFF', // White text - white

        // Status Colors
        'success': '#10B981', // Fresh green (success) - emerald-500
        'success-50': '#ECFDF5', // Ultra light green - emerald-50
        'success-100': '#D1FAE5', // Very light green - emerald-100
        'success-500': '#10B981', // Fresh green (success) - emerald-500
        'success-600': '#059669', // Deep green - emerald-600

        'warning': '#F59E0B', // Warm amber (warning) - amber-500
        'warning-50': '#FFFBEB', // Ultra light amber - amber-50
        'warning-100': '#FEF3C7', // Very light amber - amber-100
        'warning-500': '#F59E0B', // Warm amber (warning) - amber-500
        'warning-600': '#D97706', // Deep amber - amber-600

        'error': '#EF4444', // Clear red (error) - red-500
        'error-50': '#FEF2F2', // Ultra light red - red-50
        'error-100': '#FEE2E2', // Very light red - red-100
        'error-500': '#EF4444', // Clear red (error) - red-500
        'error-600': '#DC2626', // Deep red - red-600

        // Border Colors
        'border': '#E5E7EB', // Light border - gray-200
        'border-light': '#F3F4F6', // Very light border - gray-100
        'border-dark': '#D1D5DB', // Medium border - gray-300
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'primary': '0 8px 25px rgba(124, 58, 237, 0.3)',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      scale: {
        '102': '1.02',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      animation: {
        'heart-beat': 'heartBeat 1.2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        bounceGentle: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '100': '100',
        '101': '101',
        '200': '200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}