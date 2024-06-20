/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cyan: '#6dd3ff',
        cream: '#f6f9e4',
        grey: '#a0a0a0',
        midGrey: '#545555',
        darkGrey: '#333333',
        matteBlack: '#141414',
        darkBlack: '#101010',
      },
    },
  },
  plugins: [],
}
