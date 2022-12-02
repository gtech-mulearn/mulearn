/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
      colors: {
        orange: "#f78c40",
      },
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
