module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['src/**/*.tsx', 'src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '9rem',
      },
      flexGrow: () =>
        [...new Array(8)]
          .map((_, i) => i)
          .reduce((all, i) => ({ ...all, [i]: i }), {}),
    },
    height: (theme) => ({
      ...theme('width'),
      screen: '100vh',
    }),
    inset: (theme) => ({
      ...theme('width'),
      screen: undefined,
    }),
  },
  variants: {},
  plugins: [],
};
