/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1d4ed8",
          100: "#1e3a8a",
        },
        secondary: "#1e1b4b",
      },
    },
  },
  plugins: [],
};

