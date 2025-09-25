import { Metadata } from "next"
import EnhancedBlogDetail from "./BlogDetail" // Client component
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo-schemas"
import JsonLd from "@/components/JsonLd"

const blogCategories = [
  { id: "epilasyon", name: "Epilasyon" },
  { id: "cilt-bakimi", name: "Cilt Bakımı" },
  { id: "bolgesel-incelme", name: "Bölgesel İncelme" },
  { id: "kalici-makyaj", name: "Kalıcı Makyaj" },
  { id: "tirnak-kirpik", name: "Tırnak & Kirpik" },
  { id: "sac-bakimi", name: "Saç Bakımı" },
  { id: "anti-age", name: "Anti-Age & Özel Bakımlar" },
]
const BlogDetailSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-muted rounded-md ${className}`} />
)
export async function generateMetadata({ params}) {
  let post = null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${params.slug}`, { next: { revalidate: 3600 } }) // ISR cache
    const data = await res.json()
    post = data.success ? data.data : null
  } catch (err) {
    console.error("Metadata fetch error:", err)
  }

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı | Şahika Beauty",
      description: "Aradığınız blog yazısı mevcut değil. Sultanbeyli güzellik merkezi blog'umuza göz atın.",
    }
  }

  const categoryName = blogCategories.find((cat) => cat.id === post.category)?.name || "Blog"
  const keywords = [...post.tags, `${categoryName.toLowerCase()} sultanbeyli`, "şahika beauty blog"].join(", ")

  return {
    title: `${post.title} | ${categoryName} - Şahika Beauty Blog`,
    description: post.excerpt || `${post.title.substring(0, 160)}... Sultanbeyli'nin en iyi güzellik merkezi Şahika Beauty'den uzman tavsiyeleri.`,
    keywords: `sultanbeyli ${categoryName.toLowerCase()}, ${keywords}, lazer epilasyon blog, cilt bakımı ipuçları`,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description,
      type: "article",
      locale: "tr_TR",
      url: `https://sultanbeyliguzellikmerkezi.com.tr/blog/${params.slug}`,
      siteName: "Şahika Beauty Blog",
      images: [
        {
          url: post.image || "https://sultanbeyliguzellikmerkezi.com.tr/og-default.png",
          width: 1200,
          height: 630,
          alt: `${post.title} - Şahika Beauty`,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.description,
      images: [post.image || "https://sultanbeyliguzellikmerkezi.com.tr/og-default.png"],
    },
    alternates: {
      canonical: `https://sultanbeyliguzellikmerkezi.com.tr/blog/${params.slug}`,
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

const Page = async ({ params }) => {
  let post = null
  let loading = true
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${params.slug}`, { cache: "force-cache" })
    const data = await res.json()
    post = data.success ? data.data : null
    loading = false
  } catch (err) {
    console.error("Server fetch error:", err)
    loading = false
  }


  const articleSchema = post ? generateArticleSchema(post) : null
  const breadcrumbSchema = post
    ? generateBreadcrumbSchema([
        { name: "Ana Sayfa", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: blogCategories.find((cat) => cat.id === post.category)?.name || "Blog", url: `/blog?category=${post.category}` },
        { name: post.title },
      ])
    : null

  if (loading) {
    return <BlogDetailSkeleton />
  }

  if (!post) {
    // Not found logic
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog yazısı bulunamadı</h1>
          <Link href="/blog" className="text-primary hover:text-secondary transition-colors">
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
      <EnhancedBlogDetail post={post} loading={false} />
    </>
  )
}

export default Page