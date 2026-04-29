/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        fraunces: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#171717',
      },
    },
  },
  plugins: [],
}
