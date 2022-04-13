module.exports = {
  plugins: {
    'tailwindcss': {
      purge: [
        './src/client/pages/**/*.tsx',
        './src/client/features/**/*.tsx',
      ],
    },
    'autoprefixer': {},
 },
};
