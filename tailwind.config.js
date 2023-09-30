module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
  variants: {
    extend: {},
  },
  plugins: [],
};
