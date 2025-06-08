const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        correct: colors.green,
        incorrect: colors.neutral,
        inword: colors.yellow,
        letter: colors.slate,
      },
    },
  },
  plugins: [],
};
