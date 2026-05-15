/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hackerGreen: '#00ff00',
        darkBg: '#0a0a0a',
        darkerBg: '#050505'
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], // Hacker style font
      }
    },
  },
  plugins: [],
}