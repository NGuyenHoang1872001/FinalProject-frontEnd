/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        red: "#FF0000",
      },
      margin: {
        "160px": "160px",
      },
    },
  },
  plugins: [require("daisyui")],
};
