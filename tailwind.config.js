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
          DEFAULT: "#e6a1b3", // Pastel pembe (iddialı ana renk)
          dark: "#cc7f95",    // Daha koyu pembe
          light: "#f3c4d0",   // Daha açık pembe
        },
        title: {
          DEFAULT: "#a05f9e", // Zarif mor/lila (başlık rengi)
        },
        secondary: {
          DEFAULT: "#e6d6f2", // Pastel lila
          100: "#f0e6f7",     
          200: "#d8bde8",     
        },
        accent: {
          DEFAULT: "#f7c58a", // Pastel şeftali / altın
          100: "#f9d7ad",     
          200: "#ecaa62",     
        },
        neutral: {
          50: "#faf7f9",   // Çok açık bej/pembe beyaz
          100: "#f3ecef",  
          200: "#e4d9dd",  
          300: "#cbbac1",  
          400: "#9c8893",  
          500: "#6f5b66",  
        },
        soft: {
          blush: "#f9d0d9",    // Toz pembe
          lavender: "#d9c2f0", // Pastel lavanta
          peach: "#fcd5b5",    // Yumuşak şeftali
          beige: "#f1e2d2",    // Zarif bej
        },
        nature: {
          mint: "#bce3c0",    // Yumuşak nane yeşili (destek)
          sage: "#cfdccf",    // Hafif adaçayı
          olive: "#a6b79b",   // Soft zeytin yeşili
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
