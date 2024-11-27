/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e2c765',
        'white': '#ffffff', // Default white (optional)
        'charcoal-gray': '#2e2e2e',
        'button-cta': '#c7a647',
        'link-icons': '#6574e2',
      },
      fontFamily: {
        sans: ["Roboto", 'sans-serif'], // Add your new font
      },

    },
  },
  plugins: [],
}