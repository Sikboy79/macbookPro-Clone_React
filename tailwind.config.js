/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0071e3", 
        dark100: "#86868b",
        dark200: "#2e2e30",
        light100: "#adb5bd",
      },
      fontFamily: {
        regular: ["Regular"],
        medium: ["Medium"],
        semibold: ["SemiBold"],
        bold: ["Bold"],
      }
    },
  },
  plugins: [],
};

