/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
      },
      animation: {
        shine: 'shine 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
}