/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      // sans: ['"Comic Sans MS"', 'cursive', 'sans-serif'],
    },
    extend: {
      screens: {
        xs: '375px',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00837e',

          secondary: '#ccfbf1',

          accent: '#eab308',

          neutral: '#080a06',

          'base-100': '#f1f5f9',

          info: '#1d4ed8',

          success: '#4ade80',

          warning: '#eab308',

          error: '#be123c',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
