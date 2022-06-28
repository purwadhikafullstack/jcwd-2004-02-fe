module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "#6b4c92",
        secondary: "#c86eac",
        warning: "#fff5d3",
        "warning-text": "##cbaf4e",
        // orenji: "##f99746",
        "hover-button": "#efebf2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
