import  React from "react"
import { Marcellus } from "next/font/google"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import CursorProvider from "@/components/CursorContext"
import Header from "@/components/Header"
import { Toaster } from "@/components/ui/toaster"
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

export const Metadata = {
  title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi | Lazer Epilasyon, Cilt Bakımı, Kalıcı Makyaj",
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
  robots: "index, follow",
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
        url: "/assets/about/img.jpg",
        width: 1200,
        height: 630,
        alt: "Şahika Beauty Güzellik Merkezi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    description:
      "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik hizmetler.",
    images: ["/assets/about/img.jpg"],
  },
  alternates: {
    canonical: "https://sultanbeyliguzellikmerkezi.com.tr",
  },
  generator: "sakicelik",
}

export default function RootLayout({
  children,
}) {
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <html lang="tr" className={`${marcellus.variable} ${poppins.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <meta name="apple-mobile-web-app-title" content="Şahika Beauty" />


        <style>{`
html {
  font-family: ${poppins.style.fontFamily};
  --font-heading: ${marcellus.variable};
  --font-body: ${poppins.variable};
}
        `}</style>
      </head>
      <body className="font-body">
        <CursorProvider>
          <Suspense fallback={null}>

<Header/>
            {children}

            <Toaster />
          </Suspense>
          <Analytics />
        </CursorProvider>
      </body>
    </html>
  )
}
