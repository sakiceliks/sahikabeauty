import { Metadata } from "next"
import Link from "next/link"
import EnhancedBlogDetail from "./BlogDetail" // Client component
import BlogErrorBoundary from "@/components/BlogErrorBoundary"
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

export async function generateMetadata({ params }) {
  return {
    title: "Blog Yazısı | Şahika Beauty",
    description: "Sultanbeyli'nin en iyi güzellik merkezi Şahika Beauty'den uzman tavsiyeleri ve blog yazıları.",
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
      <BlogErrorBoundary>
        <EnhancedBlogDetail post={post} loading={false} />
      </BlogErrorBoundary>
    </>
  )
}

export default Page