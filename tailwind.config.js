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
        title: {
          DEFAULT: "#1e3a8a", // Lacivert (başlık için kontrast)
        },
  primary: {
    DEFAULT: "#D5E8DB", // Pastel yeşil
    dark: "#BDD9C5",
    light: "#E8F3EB",
  },
  secondary: {
    DEFAULT: "#E2EFE8", // Açık mint
    100: "#F0F7F3",
    200: "#D4E7DD",
  },
  accent: {
    DEFAULT: "#FCE4D8", // Sıcak şeftali
    100: "#FEF1EA",
    200: "#F9D2BC",
  },
        neutral: {
          50: "#f9fafb",  
          100: "#f3f4f6",  
          200: "#e5e7eb",  
          300: "#d1d5db",  
          400: "#9ca3af",  
          500: "#6b7280",  
          600: "#4b5563",  
          700: "#374151",  
          800: "#1f2937",  
          900: "#111827",  
        },
        soft: {
          sky: "#bae6fd",      // Soft gökyüzü mavisi
          powder: "#e0f2fe",   // Pudra mavisi
          ice: "#e0f7fa",      // Buz mavisi
          sand: "#fef9c3",     // Yumuşak pastel bej
        },
        nature: {
          mint: "#bbf7d0",     // Pastel mint yeşili
          sage: "#d9f99d",     // Açık yeşilimsi
          sea: "#7dd3fc",      // Pastel deniz mavisi
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
