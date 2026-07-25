/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Baloo 2", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      fontWeight: {
        400: "400",
        600: "600",
        700: "700",
        800: "800",
      },
      colors: {
        sunshine: {
          50: "#fffbeb",
          100: "#fff3c4",
          300: "#ffe083",
          400: "#ffcf40",
          500: "#ffb703",
          600: "#e89b02",
        },
        sky: {
          50: "#eefaff",
          100: "#d7f3ff",
          300: "#8fdcff",
          400: "#4fc7ff",
          500: "#1fb0ff",
          600: "#0d8fe0",
          700: "#0b6fb3",
        },
        grass: {
          50: "#eefcf0",
          100: "#d5f7dc",
          300: "#8ee7a3",
          400: "#5cd67e",
          500: "#33c05c",
          600: "#24974a",
        },
        coral: {
          50: "#fff1ee",
          100: "#ffe0d9",
          300: "#ffab96",
          400: "#ff8266",
          500: "#fb5e42",
          600: "#e34527",
        },
        grape: {
          50: "#f6f0ff",
          100: "#e8dbff",
          300: "#c4a0ff",
          400: "#a875f5",
          500: "#8c52e0",
          600: "#7038c2",
        },
        ink: {
          700: "#3a3552",
          800: "#2a2640",
          900: "#1c1930",
        },
      },
      boxShadow: {
        pop: "0 6px 0 rgba(0,0,0,0.08)",
        "pop-lg": "0 10px 0 rgba(0,0,0,0.08)",
        card: "0 4px 20px rgba(41, 37, 74, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        pop: "pop 0.25s ease-out",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
