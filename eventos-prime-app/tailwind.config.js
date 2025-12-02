/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'monday': {
          'blue': '#0073ea',
          'green': '#00c875',
          'yellow': '#fdab3d',
          'red': '#e2445c',
          'purple': '#a25ddc',
          'dark': '#1c1f3b',
          'gray': '#676879',
        }
      }
    },
  },
  plugins: [],
}
