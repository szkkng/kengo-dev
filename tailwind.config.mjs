import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cyan: '#6dd3ff',
        cream: '#f6f9e4',
        grey: '#a0a0a0',
        midGrey: '#7e7e7e',
        darkGrey: '#333333',
        matteBlack: '#141414',
        darkBlack: '#101010',
      },
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
