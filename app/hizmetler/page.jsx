import ServicesClient from "./ServicesClient"
import { serviceCategories } from "@/data/serviceCategories"

export async function generateMetadata({ searchParams }) {
  const category = searchParams?.category || "all"
  const currentCategory = serviceCategories.find((cat) => cat.id === category) || serviceCategories[0]
  
  // Build canonical URL with query params
  const canonicalUrl = category === "all" 
    ? "https://sultanbeyliguzellikmerkezi.com.tr/hizmetler"
    : `https://sultanbeyliguzellikmerkezi.com.tr/hizmetler?category=${category}`

  return {
    title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler",
    description: currentCategory.description || "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve tüm estetik hizmetler.",
    keywords: [
      "sultanbeyli güzellik merkezi",
      "lazer epilasyon sultanbeyli",
      "cilt bakımı sultanbeyli",
      "kalıcı makyaj sultanbeyli",
      "şahika beauty",
      currentCategory.name.toLowerCase(),
    ],
    openGraph: {
      title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler",
      description: currentCategory.description || "Sultanbeyli'nin en kaliteli güzellik merkezi.",
      type: "website",
      locale: "tr_TR",
      url: canonicalUrl,
      siteName: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    },
    twitter: {
      card: "summary_large_image",
      title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler",
      description: currentCategory.description || "Sultanbeyli'nin en kaliteli güzellik merkezi.",
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
