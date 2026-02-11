/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F0F4E8',
          100: '#DDE6CC',
          200: '#C5D4AD',
          300: '#ABBF8D',
          400: '#96B06F',
          500: '#7F9D57',
          600: '#6E8F47',
          700: '#63813F',
          800: '#4A6B28',
          900: '#3D5A1E',
        },
        accent: {
          100: '#FEF3C7',
          300: '#FBC04E',
          400: '#F59E0B',
          500: '#E68A00',
          600: '#D97706',
          700: '#C75B00',
        },
        dark:    '#2D2D2D',
        grey: {
          200: '#E0DFDB',
          400: '#9E9E9E',
          600: '#6B6B6B',
          700: '#4A4A4A',
          800: '#3A3A3A',
        },
        light:   '#F5F3EE',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        sm:  '0.375rem',
        md:  '0.5rem',
        lg:  '0.75rem',
        xl:  '1rem',
      },
      boxShadow: {
        sm:  '0 1px 2px rgba(0,0,0,0.05)',
        md:  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        lg:  '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        xl:  '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
