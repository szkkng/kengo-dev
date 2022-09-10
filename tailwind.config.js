module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost'],
      },
      colors: {
        cyan: '#6dd3ff',
        cream: '#f6f9e4',
        grey: '#8c8c8c',
        midGrey: '#545555',
        darkGrey: '#333333',
        matteBlack: '#141414',
        darkBlack: '#101010',
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
