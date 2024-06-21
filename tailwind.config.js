module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
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
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
