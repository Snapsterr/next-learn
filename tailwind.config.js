/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);",
      },
      transitionTimingFunction: {
        "search-in-out": "cubic-bezier(0, 0.25, 0.5, 1)",
      },
      animation: {
        slideDown: "slideDown 0.6s ease-out",
        customSpin: "customSpin 1s linear infinite",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-500%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        customSpin: {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
  ],
}
