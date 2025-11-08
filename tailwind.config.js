// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "stitch-dark": "#001a33",
        primary: "#5c8a84",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },

      backgroundImage: {
        "grid-small":
          "linear-gradient(to right, #ffffff0d 1px, transparent 1px), linear-gradient(to bottom, #ffffff0d 1px, transparent 1px)",
      },

      backgroundSize: {
        "grid-size": "20px 20px",
      },
    },
  },
  plugins: [],
};
