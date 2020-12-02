module.exports = {
  purge: ['src/**/*.tsx', 'src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '6.5xl': ['4rem', 1],
      },
    },
    height: (theme) => ({
      ...theme('width'),
      screen: '100vh',
    }),
    inset: (theme) => ({
      ...theme('width'),
      screen: undefined,
    }),
    colors: {
      primary: '#2F75C6',
      'primary-light': '#498AD4',
      'primary-dark': '#2762A5',
      positive: '#45CB85',
      'positive-light': '#70D7A1',
      'positive-dark': '#36BF78',
      light: '#FFFFFF',
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
  },
  plugins: [],
};
