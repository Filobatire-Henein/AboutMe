/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        accent: "#915eff",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: { card: "0px 35px 120px -15px #211e35" },
      screens: { xs: "450px" },
    },
  },
  plugins: [],
};
