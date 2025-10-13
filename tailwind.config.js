// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "stitch-dark": "#001a33",
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
