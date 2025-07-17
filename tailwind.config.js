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
        'cep-primary': '#f2014b', // Color principal CEP (rosa/rojo)
        'cep-primary-dark': '#d0013f',
        'cep-primary-light': '#ff4d80',
        'cep-secondary': '#FF6D00', // Un naranja vibrante para acentos
      },
    },
  },
  plugins: [],
}