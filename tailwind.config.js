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
    },
    height: (theme) => ({
      ...theme('width'),
      screen: '100vh',
    }),
  },
  variants: {},
  plugins: [],
};
