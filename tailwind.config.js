/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        row5: "repeat(5, minmax(6rem, auto))",
      },
      gridTemplateColumns: {
        col4: "repeat(4, minmax(6rem, auto))",
      },
    },
  },
  plugins: [],
};
