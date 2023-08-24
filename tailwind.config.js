/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'darkblue': '#264653',
      'turqoise': '#2A9D8F',
      'yellow': '#E9C46A',
      'orange': '#F4A261',
      'red':'#E76F51'
    },
    extend: {
      fontFamily: {
        // eslint-disable-next-line no-undef
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
