/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f4c81', // Classic Blue - Professional & Trustworthy
        secondary: '#20c997', // Teal - Clean & Modern
        accent: '#fd7e14', // Orange - Call to Action
        dark: '#343a40',
        light: '#f8f9fa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
