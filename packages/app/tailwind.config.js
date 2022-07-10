// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: ["pixeloid"],
    },
    extend: {
      colors: {
        bg: "#131313",
      },
    },
  },
  plugins: [],
};
