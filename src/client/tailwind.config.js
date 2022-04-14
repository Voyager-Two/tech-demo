module.exports = {
  content: [
    // Doesn't work for some reason
    // Works inside postcss.config.js
    './src/client/**/*.{js,ts,jsx,tsx}',
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
