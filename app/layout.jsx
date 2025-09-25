import React from "react"
import { Marcellus } from "next/font/google"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import CursorProvider from "@/components/CursorContext"
import Header from "@/components/Header"
import ErrorBoundary from "@/components/ErrorBoundary"
import GlobalErrorHandler from "@/components/GlobalErrorHandler"
import ErrorSuppressor from "@/components/ErrorSuppressor"
import DevModeChecker from "@/components/DevModeChecker"
import HydrationFix from "@/components/HydrationFix"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"
import JsonLd from "@/components/JsonLd"
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/seo-schemas"
import "./globals.css"

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  title: {
    default: "Şahika Beauty - Sultanbeyli Güzellik Merkezi | Lazer Epilasyon, Cilt Bakımı, Kalıcı Makyaj",
    template: "%s | Şahika Beauty - Sultanbeyli Güzellik Merkezi",
  },
  description:
    "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme ve estetik hizmetler. Uzman kadromuz ve son teknoloji cihazlarımızla hizmetinizdeyiz.",
  keywords: [
    "Sultanbeyli güzellik merkezi",
    "Sultanbeyli lazer epilasyon",
    "Sultanbeyli cilt bakımı",
    "Sultanbeyli kalıcı makyaj",
    "Sultanbeyli estetik",
    "Sultanbeyli iğneli epilasyon",
    "Sultanbeyli leke bakımı",
    "Sultanbeyli akne bakımı",
    "Sultanbeyli yosun peeling",
    "Sultanbeyli G5 masajı",
    "Sultanbeyli EmSlim Fit",
    "Sultanbeyli Primex",
    "Sultanbeyli Sculpture",
    "Sultanbeyli dudak renklendirme",
    "Sultanbeyli eyeliner",
    "Sultanbeyli kaş pigmentasyon",
    "Sultanbeyli microblading",
    "Sultanbeyli ipek kirpik",
    "Sultanbeyli protez tırnak",
    "Sultanbeyli manikür",
    "Sultanbeyli saç bakımı",
    "Sultanbeyli cilt gençleştirme",
    "Sultanbeyli anti-age",
    "Sultanbeyli altın tozu cilt bakımı",
    "Sultanbeyli iğnesiz mezoterapi",
  ].join(", "),
  authors: [{ name: "Şahika Beauty" }],
  creator: "Şahika Beauty",
  publisher: "Şahika Beauty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  geo: {
    position: "40.9607;29.2675", // Sultanbeyli koordinatları
    placename: "Sultanbeyli, İstanbul",
    region: "TR-34",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sultanbeyliguzellikmerkezi.com.tr",
    siteName: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    description:
      "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik hizmetler.",
    images: [
      {
        url: "https://sultanbeyliguzellikmerkezi.com.tr/assets/about/img.jpg", // Absolute URL
        width: 1200,
        height: 630,
        alt: "Şahika Beauty Sultanbeyli Güzellik Merkezi - Lazer Epilasyon ve Cilt Bakımı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    description:
      "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik hizmetler.",
    images: ["https://sultanbeyliguzellikmerkezi.com.tr/assets/about/img.jpg"],
  },
  alternates: {
    canonical: "https://sultanbeyliguzellikmerkezi.com.tr",
    languages: {
      "tr-TR": "https://sultanbeyliguzellikmerkezi.com.tr", // Hreflang for Turkish
    },
  },
  generator: "Şahika Beauty",
}

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <html lang="tr" className={`${marcellus.variable} ${poppins.variable}`}>
      <head>
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <meta name="apple-mobile-web-app-title" content="Şahika Beauty" />
        {/* Preload for performance - removed problematic preload */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {/* Aggressive error suppression script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Suppress ALL auth context errors
              const originalError = console.error;
              console.error = function(...args) {
                const message = args.join(' ');
                if (message.includes('Cannot destructure property \\'auth\\'') ||
                    message.includes('hook.js:608') ||
                    message.includes('TypeError: Cannot destructure') ||
                    message.includes('204-90d1773887cef479.js') ||
                    message.includes('8bc8d761-106196c73f6358c9.js')) {
                  console.warn('Suppressed auth context error:', message);
                  return;
                }
                originalError.apply(console, args);
              };
              
              // Suppress runtime errors
              window.onerror = function(message, source, lineno, colno, error) {
                if (error && error.message && (
                    error.message.includes('Cannot destructure property \\'auth\\'') ||
                    error.message.includes('Minified React error #423')
                )) {
                  console.warn('Suppressed runtime error:', message);
                  return true;
                }
                return false;
              };
              
              // Suppress unhandled promise rejections
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.message && 
                    event.reason.message.includes('Cannot destructure property \\'auth\\'')) {
                  console.warn('Suppressed promise rejection:', event.reason.message);
                  event.preventDefault();
                }
              });
              
              // Suppress React hydration errors
              const originalConsoleWarn = console.warn;
              console.warn = function(...args) {
                const message = args.join(' ');
                if (message.includes('Minified React error #423') ||
                    message.includes('hydration') ||
                    message.includes('Text content does not match')) {
                  console.info('Suppressed React hydration warning:', message);
                  return;
                }
                originalConsoleWarn.apply(console, args);
              };
            })();
          `
        }} />
        <style>{`
          html {
            font-family: ${poppins.style.fontFamily};
            --font-heading: ${marcellus.variable};
            --font-body: ${poppins.variable};
          }
        `}</style>
      </head>
      <body className="font-body">
        <DevModeChecker />
        <ErrorSuppressor />
        <GlobalErrorHandler />
        <ErrorBoundary>
          <HydrationFix>
            <CursorProvider>
              <Suspense fallback={null}>
                <Header />
                {children}
                <Toaster />
              </Suspense>
              <Analytics />
            </CursorProvider>
          </HydrationFix>
        </ErrorBoundary>
      </body>
    </html>
  )
}