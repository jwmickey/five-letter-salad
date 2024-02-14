import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
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
