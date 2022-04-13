console.warn('tailwind', __dirname);

module.exports = {
  mode: 'jit',
  purge: [
    './src/client/pages/**/*.tsx',
    './src/client/features/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
