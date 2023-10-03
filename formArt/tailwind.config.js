/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        RED: "#E74C3C",
        GREEN: "#2ECC71",
        WHITE: "#ECF0F1",
        BLACK: "#2C3E50",
        MAROON: "#C0392B",
        VIOLET: "#8E44AD",
        SKY_BLUE: "#3498DB",
        PEACH: "#2980B9",
        YELLOW: "#F1C40F",
        ORANGE: "#F39C12"
      }
    },
  },
  plugins: [],
};
