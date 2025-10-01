/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-marcellus)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        beauty: {
          light: "#E0E0E0", // Dominant light gray
          medium: "#A0A0A0", // Medium gray
          dark: "#808080", // Dark gray
          darker: "#ADADAD", // Additional gray
          lightest: "#C0C0C0", // Light gray
          black: "#000000", // Pure black
          button: "#174067", // Button background color
        },
        // Proje renk paleti - dikkat çekici renkler
        brand: {
          primary: "#2563eb", // Mavi - başlıklar için
          secondary: "#059669", // Yeşil - linkler için
          accent: "#dc2626", // Kırmızı - önemli vurgular için
          warning: "#d97706", // Turuncu - uyarılar için
          info: "#7c3aed", // Mor - bilgi için
          success: "#16a34a", // Yeşil - başarı için
        },
        // Başlık renkleri
        heading: {
          primary: "#1e40af", // Koyu mavi - ana başlıklar
          secondary: "#059669", // Yeşil - alt başlıklar
          accent: "#dc2626", // Kırmızı - özel başlıklar
        },
        // Link renkleri
        link: {
          primary: "#2563eb", // Mavi - normal linkler
          hover: "#1d4ed8", // Koyu mavi - hover
          active: "#059669", // Yeşil - aktif linkler
          visited: "#7c3aed", // Mor - ziyaret edilmiş
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(228, 194, 159, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(228, 194, 159, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        glow: "glow 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
