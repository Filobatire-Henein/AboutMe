/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // outside the laptop: light, Apple-style product stage
        ink: { 900: "#1d1d1f", 600: "#424245", 500: "#6e6e73", 300: "#d2d2d7" },
        stage: "#f5f5f7",
        accent: "#0071e3",
        // inside the screen: dark macOS desktop
        sys: { blue: "#0a84ff", green: "#30d158", purple: "#bf5af2", orange: "#ff9f0a", pink: "#ff375f", teal: "#64d2ff", yellow: "#ffd60a" },
        muted: "#a1a1aa",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      screens: { xs: "450px" },
    },
  },
  plugins: [],
};
