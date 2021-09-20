module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        matteBlack: '#131313',
        offWhite: '#d4d6e6',
        cyan: '#6dd3ff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
