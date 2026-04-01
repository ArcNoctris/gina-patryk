/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: '#563961',
        gold: '#C5A059',
        wisteria: '#CA99D8',
        almond: '#E3D5C8',
        porcelan: '#FDFBF7'
      }
    },
  },
  plugins: [],
}
