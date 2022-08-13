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
        lightGray: '#8c8c8c',
        midGray: '#545555',
        darkGray: '#333333',
        cyan: '#6dd3ff',
      },
      width: {},
      height: {
        600: '600px',
      },
      maxHeight: {
        700: '700px',
      },
      inset: {
        '11px': '11px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
