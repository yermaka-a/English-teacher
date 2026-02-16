/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@rnr/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#8CB1E5", // бирюзовый
        secondary: "#8b5cf6", // фиолетовый
        accent: "#10b981", // зеленый
        background: "#f8fafc",
        card: "#ffffff",
        text: "#1e293b",
        border: "#e2e8f0",
      },
      fontFamily: {
        LoraMediumItalick: ["LoraMediumItalic", "monospace"],
        RobotoBlack: ["RobotoBlack", "monospace"],
      },
    },
  },
  plugins: [],
};
