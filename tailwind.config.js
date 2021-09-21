module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        matteBlack: '#141414',
        milkyWhite: '#f6f9e4',
        lightGray: '#6b6b6b',
        darkGray: '#333333',
        cyan: '#6dd3ff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
