// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

module.exports = {
  plugins: {
    'tailwindcss': {
      content: [
        join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
        join(__dirname, 'features/**/*.{js,ts,jsx,tsx}'),
      ],
    },
    'autoprefixer': {},
 },
};
