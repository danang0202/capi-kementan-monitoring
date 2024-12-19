/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00837e',

          secondary: '#ccfbf1',

          accent: '#eab308',

          neutral: '#080a06',

          'base-100': '#fff7ff',

          info: '#00b5ff',

          success: '#008f00',

          warning: '#eab308',

          error: '#be123c',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
