module.exports = {
  plugins: {
    'tailwindcss': {
      content: [
        './src/client/pages/**/*.tsx',
        './src/client/features/**/*.tsx',
      ],
    },
    'autoprefixer': {},
  },
};
