/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-marcellus)",
      secondary: "var(--font-montserrat)",
    },
    extend: {
     colors: {
  primary: {
    DEFAULT: "#8fbc8f", // Ana pastel yeşil (Dark Sea Green)
    dark: "#7aa67a",    // Daha koyu ton
    light: "#a8d1a8",   // Daha açık ton
  },
  title:{
    DEFAULT:"#BE3D2B"
  },
  secondary: {
    DEFAULT: "#f0f8f0", // Çok açık pastel yeşil/beyaz
    100: "#e6f2e6",     // Hafif pastel yeşil
    200: "#d4e8d4",     // Orta pastel yeşil
  },
  accent: {
    DEFAULT: "#98d4aa", // Accent pastel yeşil (Mint Green)
    100: "#c1e7ce",     // Açık accent
    200: "#7fc693",     // Daha canlı accent
  },
  neutral: {
    50: "#f9faf9",      // En açık nötr
    100: "#f3f6f3",     // Açık gri-yeşil
    200: "#e8ebe8",     // Orta açık gri
    300: "#d6dad6",     // Orta gri
    400: "#a8b0a8",     // Koyu gri
    500: "#758075",     // Ana nötr
  },
  // Ek renkler
  soft: {
    mint: "#b8e6b8",    // Yumuşak nane yeşili
    sage: "#c9d6c9",    // Adaçayı yeşili
    eucalyptus: "#a8d8a8", // Okaliptüs yeşili
    seafoam: "#9fd9b7",    // Deniz köpüğü yeşili
  },
  // Doğal tonlar
  nature: {
    moss: "#8db68d",    // Yosun yeşili
    leaf: "#7fb069",    // Yaprak yeşili
    bamboo: "#a4c49a",  // Bambu yeşili
  }
},
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
