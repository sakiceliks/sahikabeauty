import ServicesClient from "./ServicesClient"
import { serviceCategories } from "@/data/serviceCategories"

export async function generateMetadata({ searchParams }) {
  const category = searchParams?.category || "all"
  const currentCategory = serviceCategories.find((cat) => cat.id === category) || serviceCategories[0]
  
  // Always use clean canonical URL without query params for better SEO
  // Query params are for filtering only, canonical should point to main page
  const canonicalUrl = "https://sultanbeyliguzellikmerkezi.com.tr/hizmetler"
  const pageUrl = category === "all" 
    ? canonicalUrl
    : `https://sultanbeyliguzellikmerkezi.com.tr/hizmetler?category=${category}`

  return {
    metadataBase: new URL("https://sultanbeyliguzellikmerkezi.com.tr"),
    title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler | Şahika Beauty",
    description: currentCategory.description || "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve tüm estetik hizmetler. 8+ yıl deneyim, uzman kadro, son teknoloji cihazlar.",
    keywords: [
      "sultanbeyli güzellik merkezi",
      "lazer epilasyon sultanbeyli",
      "cilt bakımı sultanbeyli",
      "kalıcı makyaj sultanbeyli",
      "şahika beauty",
      "sultanbeyli estetik",
      "sultanbeyli güzellik salonu",
      currentCategory.name.toLowerCase(),
    ].join(", "),
    authors: [{ name: "Şahika Beauty" }],
    creator: "Şahika Beauty",
    publisher: "Şahika Beauty",
    openGraph: {
      title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler | Şahika Beauty",
      description: currentCategory.description || "Sultanbeyli'nin en kaliteli güzellik merkezi. 8+ yıl deneyim, uzman kadro, son teknoloji cihazlar.",
      type: "website",
      locale: "tr_TR",
      url: pageUrl,
      siteName: "Şahika Beauty",
      images: [
        {
          url: "https://sultanbeyliguzellikmerkezi.com.tr/og-default.png",
          width: 1200,
          height: 630,
          alt: `${currentCategory.name} - Şahika Beauty Sultanbeyli`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler | Şahika Beauty",
      description: currentCategory.description || "Sultanbeyli'nin en kaliteli güzellik merkezi. 8+ yıl deneyim, uzman kadro, son teknoloji cihazlar.",
      images: ["https://sultanbeyliguzellikmerkezi.com.tr/og-default.png"],
    },
    alternates: {
      canonical: canonicalUrl,
    },
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
  }
}

export default function ServicesPage({ searchParams }) {
  const category = searchParams?.category || "all"
  return <ServicesClient initialCategory={category} />
}
