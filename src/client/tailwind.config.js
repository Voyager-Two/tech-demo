// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

module.exports = {
  content: [
    // Doesn't work for some reason
    // Works inside postcss.config.js
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'features/**/*.{js,ts,jsx,tsx}'),
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
