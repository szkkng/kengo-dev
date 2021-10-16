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
      width: {
        '9px': '9px',
      },
      height: {
        600: '600px',
        '9px': '9px',
      },
      maxHeight: {
        600: '600px',
      },
      inset: {
        '10px': '10px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
