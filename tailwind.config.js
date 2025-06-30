/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'cep-primary': '#1A237E', // Un azul oscuro y profesional
        'cep-primary-dark': '#0D1B57',
        'cep-secondary': '#FF6D00', // Un naranja vibrante para acentos
      },
    },
  },
  plugins: [],
} 