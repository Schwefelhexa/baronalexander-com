module.exports = {
  purge: ['src/**/*.tsx', 'src/**/*.ts'],
  darkMode: 'class',
  theme: {
    colors: {
      light: '#FFFFFF',
      dark: '#0E181B',
    },
    extend: {
      spacing: {
        'screen-1/2': '50vh',
        'screen-2/3': '66.66667vh',
      },
    },
  },
  plugins: [],
};
