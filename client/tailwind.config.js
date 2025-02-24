/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";
import colors from "tailwindcss/colors";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'my-custom-img-silver': "url('/src/assets/Images/silver-img.jpg')",
        'image' : "url('/src/assets/Images/dark_blue_spotlight.jpg')",
        'blue-gradient' : "url('/src/assets/Images/intro_blue_ball.png')",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",

      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      colors : {
        'correct-black-dark' : 'rgb(26 34 44)',
        'correct-black-light' : 'rgb(36 48 63)',
        'txt-dark' : 'rgb(174 183 192)',
        'border-table-dark-light' : 'rgb(46 58 71)',
      },
      gradientColorStops: {
        'rgb-255-97-97-025': 'rgba(255, 97, 97, 0.25)',
        'custom-gradient-from': 'var(--tw-gradient-from)',
        'custom-gradient-via': 'transparent var(--tw-gradient-via-position)',
        'custom-gradient-to': 'var(--tw-gradient-to)',
      },
    },
    screens: {
      '2xl': {'max': '1340px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1150px'},
      // => @media (max-width: 1023px) { ... }
      
      'lg2': {'max': '1105px'},

      'md': {'max': '950px'},
      // => @media (max-width: 767px) { ... }
      
      'TableBench' : {'max': '700px'},

      'md2': {'max': '780px'},

      'sm': {'max': '550px'},
      // => @media (max-width: 639px) { ... }
      
      'mobile': {'max': '470px'},
      
    }
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}







