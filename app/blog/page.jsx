import BlogClient from "./BlogClient"
import { blogCategories } from "@/data/blogCategories"

export async function generateMetadata({ searchParams }) {
  const category = searchParams?.category || "all"
  const currentCategory = blogCategories.find((cat) => cat.id === category) || blogCategories[0]
  
  // Build canonical URL with query params
  const canonicalUrl = category === "all" 
    ? "https://sultanbeyliguzellikmerkezi.com.tr/blog"
    : `https://sultanbeyliguzellikmerkezi.com.tr/blog?category=${category}`

  return {
    title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Blog Yazıları",
    description: currentCategory.description || "Sultanbeyli Güzellik Merkezi'nin blog sayfasında güzellik, cilt bakımı, epilasyon ve daha fazlası hakkında en güncel rehberler ve ipuçları.",
    keywords: [
      "sultanbeyli güzellik merkezi blog",
      "güzellik ipuçları",
      "cilt bakımı rehberleri",
      "lazer epilasyon blog",
      "şahika beauty blog",
      currentCategory.name.toLowerCase(),
    ],
    openGraph: {
      title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Blog Yazıları",
      description: currentCategory.description || "Sultanbeyli Güzellik Merkezi'nin blog sayfası.",
      type: "website",
      locale: "tr_TR",
      url: canonicalUrl,
      siteName: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    },
    twitter: {
      card: "summary_large_image",
      title: currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi - Blog Yazıları",
      description: currentCategory.description || "Sultanbeyli Güzellik Merkezi'nin blog sayfası.",
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

export default function BlogPage({ searchParams }) {
  const category = searchParams?.category || "all"
  return <BlogClient initialCategory={category} />
}