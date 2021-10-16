module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        matteBlack: '#141414',
        darkBlack: '#101010',
        milkyWhite: '#f6f9e4',
        offWhite: '#d4d6e6',
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
