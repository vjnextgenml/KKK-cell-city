/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#F8FAFC",
        panel: "#FFFFFF",
        line: "#E2E8F0",
        electric: "#2563EB",
        sky: "#60A5FA",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 32px rgba(37, 99, 235, 0.14)",
        "glow-strong": "0 14px 40px rgba(37, 99, 235, 0.2)",
      },
    },
  },
  plugins: [],
};
