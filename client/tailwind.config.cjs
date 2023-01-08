/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90em",
        "9xl": "100em",
      },
      colors: {
        primary: "#5138EE",
      },
    },
  },
  plugins: [],
};
