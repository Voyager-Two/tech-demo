import { join } from 'path';

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {
      content: [
        join(__dirname, 'src/client/pages/**/*.tsx'),
        join(__dirname, 'src/client/features/**/*.tsx'),
        // "./src/client/pages/**/*.{js,ts,jsx,tsx}",
        // "./src/client/features/**/*.{js,ts,jsx,tsx}",
      ],
    },
    'autoprefixer': {},
 },
};
