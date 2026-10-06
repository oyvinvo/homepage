/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          yellow: '#FFB800',
          darkYellow: '#E5A500',
          black: '#121316',
          charcoal: '#1E2024',
          panel: '#282B30',
          accent: '#00F0FF',
          hazard: '#FBBF24',
          shipped: '#10B981',
        },
      },
    },
  },
  plugins: [],
}
