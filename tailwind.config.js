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
        // Şahika Beauty Beauty Ana Renk Paleti
        primary: {
          DEFAULT: "#2C1810", // Koyu kahverengi - ana marka rengi
          50: "#FBF9F7",
          100: "#F5F0EA", 
          200: "#E8DAC8",
          300: "#DCC4A6",
          400: "#C89E73",
          500: "#B47F52", // Orta ton
          600: "#8B4513", // Sitedeki ana renk
          700: "#6B3410",
          800: "#4A240B",
          900: "#2C1810", // En koyu
        },
        
        secondary: {
          DEFAULT: "#F5F1ED", // Açık krem/bej - arkaplan
          50: "#FEFDFB",
          100: "#FDF8F4",
          200: "#F9F0E8",
          300: "#F5E8DC",
          400: "#EDD8C4",
          500: "#E5C8AC", // Orta bej
          600: "#D2B48C", // Sitedeki açık kahve
          700: "#BFA082",
          800: "#A08970",
          900: "#857160",
        },
        
        accent: {
          DEFAULT: "#E4C29F", // Altın/bal rengi - vurgular için
          50: "#FDF9F4",
          100: "#EAEAE8",
          200: "#F4E2CA",
          300: "#EDD3AD",
          400: "#E7C5A0",
          500: "#E4C29F", // Ana accent
          600: "#D4A373",
          700: "#B88854",
          800: "#9A6F3C",
          900: "#7D5628",
        },
        
        // Neutral renkler - metin ve arkaplanlar
        neutral: {
          DEFAULT: "#8B7355", // Orta kahve - metin
          50: "#FDFCFA",
          100: "#F8F6F2",
          200: "#F0EAE0",
          300: "#E5DBCB",
          400: "#CFBFA8",
          500: "#B5A085", // Açık neutral
          600: "#9B876B",
          700: "#8B7355", // Ana neutral
          800: "#6B5942",
          900: "#4D3F31",
        },
        
        // Cilt tonları - beauty ürünler için
        skin: {
          fair: "#FDF2E9", // Açık ten
          light: "#F9E6D3", // Açık-orta ten  
          medium: "#F0D0A0", // Orta ten
          warm: "#E8C17D", // Sıcak ton
          deep: "#DEB887", // Derin ton
          golden: "#D4A574", // Altın ton
        },
        
        // Doğal organik renkler
        organic: {
          cream: "#FFFEF7", // Krem
          vanilla: "#F7F3E9", // Vanilya
          honey: "#F0B27A", // Bal
          amber: "#D68910", // Amber
          earth: "#8D6E63", // Toprak
          sage: "#A8B8A0", // Adaçayı
        },
        
        // Duygusal/soft renkler
        soft: {
          blush: "#F8E8E7", // Allık pembe
          powder: "#F5F0F0", // Pudra
          pearl: "#F8F6F0", // İnci
          silk: "#F0EDE8", // İpek
          cashmere: "#EDE7E0", // Kaşmir
          velvet: "#E8E2DD", // Kadife
        },
        
        // Lüks/premium renkler
        luxury: {
          rose: "#E8B4B8", // Rose gold
          champagne: "#F7E7CE", // Şampanya
          platinum: "#E5E4E2", // Platin
          bronze: "#CD7F32", // Bronz
          copper: "#B87333", // Bakır
        },
        
        // State renkleri
        success: "#4CAF50",
        warning: "#FF9800", 
        error: "#F44336",
        info: "#2196F3",
        blue:"#174067",
      },
      
      // Typography
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      
      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem', 
        '3xl': '2rem',
      },
      
      // Box shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'beauty': '0 8px 30px rgba(139, 69, 19, 0.12)',
        'luxury': '0 20px 40px rgba(44, 24, 16, 0.15)',
        'glow': '0 0 20px rgba(228, 194, 159, 0.4)',
      },
      
      // Animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeIn": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slideUp": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(228, 194, 159, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(228, 194, 159, 0.8)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      
      // Background gradients
      backgroundImage: {
        'hero': 'linear-gradient(135deg, #2C1810 0%, #8B4513 50%, #E4C29F 100%)',
        'luxury': 'linear-gradient(135deg, #F5F1ED 0%, #E4C29F 100%)',
        'organic': 'linear-gradient(135deg, #FFFEF7 0%, #F7F3E9 50%, #F0D0A0 100%)',
        'skin': 'linear-gradient(135deg, #FDF2E9 0%, #F9E6D3 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};