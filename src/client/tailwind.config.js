import { join } from 'path';

module.exports = {
  content: [
    join(__dirname, 'src/client/pages/**/*.tsx'),
    join(__dirname, 'src/client/features/**/*.tsx'),
    // "./src/client/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/client/features/**/*.{js,ts,jsx,tsx}",
  ],
  // https://tailwindcss.com/docs/theme#customizing-the-default-theme
  theme: {
    extend: {
      // Add configs here to extend default theme
    },
    // Add config here if you want to override default theme
  },
  plugins: [],
}
