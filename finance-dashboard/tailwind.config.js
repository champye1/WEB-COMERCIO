/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        income: '#22c55e',
        expense: '#ef4444',
        balance: '#3b82f6',
      }
    },
  },
  plugins: [],
}
