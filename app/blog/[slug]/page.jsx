"use client"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  Clock,
  Eye,
  Share2,
  ArrowLeft,
  ArrowRight,
  Tag,
  Heart,
  MessageCircle,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
} from "lucide-react"
import { useState, useEffect } from "react"
import JsonLd from "@/components/JsonLd"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo-schemas"

const blogCategories = [
  { id: "epilasyon", name: "Epilasyon" },
  { id: "cilt-bakimi", name: "Cilt Bakımı" },
  { id: "bolgesel-incelme", name: "Bölgesel İncelme" },
  { id: "kalici-makyaj", name: "Kalıcı Makyaj" },
  { id: "tirnak-kirpik", name: "Tırnak & Kirpik" },
  { id: "sac-bakimi", name: "Saç Bakımı" },
  { id: "anti-age", name: "Anti-Age & Özel Bakımlar" },
]

const BlogDetail = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`)
        const data = await res.json()
        if (data.success) {
          setPost(data.data)
        } else {
          setPost(null)
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setPost(null)
      }
    }
    fetchPost()
  }, [slug])

  const currentIndex = post ? blogCategories.findIndex((cat) => cat.id === post.category) : -1
  const prevPost = null // Could implement fetching previous post if needed
  const nextPost = null // Could implement fetching next post if needed

  const relatedPosts = post
    ? [] // Could implement fetching related posts if needed
    : []

  const articleSchema = post ? generateArticleSchema(post) : null
  const breadcrumbSchema = post
    ? generateBreadcrumbSchema([
        { name: "Ana Sayfa", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: blogCategories.find((cat) => cat.id === post.category)?.name, url: `/blog?category=${post.category}` },
        { name: post.title },
      ])
    : null

  // URL copy function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("URL copy failed:", err)
    }
  }

  // Social share functions
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank")
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${post?.title}&url=${window.location.href}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, "_blank")
  }

  if (!post) {
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

      <div className="min-h-screen pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="mb-8"
          >
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Ana Sayfa
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-700">{blogCategories.find((cat) => cat.id === post.category)?.name}</span>
            </div>
          </motion.nav>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {blogCategories.find((cat) => cat.id === post.category)?.name}
              </span>
              {post.featured && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">Öne Çıkan</span>
              )}
            </div>

            <h1 className="h1 mb-6 max-w-4xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.authorImage || "/logo.png"}
                    alt={post.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} okuma</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()} görüntüleme</span>
              </div>
            </div>

            {/* Social Share & Actions */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Paylaş:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={shareOnFacebook}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  aria-label="Facebook'ta paylaş"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  aria-label="Twitter'da paylaş"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                  aria-label="LinkedIn'de paylaş"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`p-2 rounded-full transition-colors ${
                    copySuccess ? "bg-green-600 text-white" : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                  aria-label="Bağlantıyı kopyala"
                >
                  {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                    isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label="Kaydet"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="lg:col-span-3"
            >
              {/* Featured Image */}
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed" />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Etiketler:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.authorImage || "/logo.png"}
                      alt={post.author}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                    <p className="text-gray-600">{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {prevPost && (
                  <Link href={`/blog/${prevPost.slug}`}>
                    <div className="p-6 border rounded-2xl hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        Önceki Yazı
                      </div>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{prevPost.title}</h4>
                    </div>
                  </Link>
                )}

                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`}>
                    <div className="p-6 border rounded-2xl hover:shadow-lg transition-all duration-300 group md:text-right">
                      <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-2">
                        Sonraki Yazı
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{nextPost.title}</h4>
                    </div>
                  </Link>
                )}
              </div>
            </motion.main>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    İlgili Yazılar
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3" />
                              {relatedPost.date}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6">Kategoriler</h3>
                <div className="space-y-2">
                  {blogCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.id}`}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        post.category === category.id ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-accent to-secondary p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Blog Güncellemeleri</h3>
                <p className="text-sm mb-4 opacity-90">
                  Yeni yazılarımızdan haberdar olmak için e-posta listemize katılın
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button className="w-full bg-white text-primary py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                    Abone Ol
                  </button>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Comments Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Yorumlar ({post.comments})</h3>
            </div>

            {/* Comment Form */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold mb-4">Yorum Yap</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Yorumunuzu yazın..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                ></textarea>
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Yorum Gönder
                </button>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">Merve K.</span>
                      <span className="text-sm text-gray-500">2 gün önce</span>
                    </div>
                    <p className="text-gray-700">
                      Çok faydalı bir yazı olmuş. Özellikle hazırlık aşaması hakkındaki bilgiler çok detaylı.
                      Teşekkürler!
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-semibold">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">Ayça D.</span>
                      <span className="text-sm text-gray-500">1 hafta önce</span>
                    </div>
                    <p className="text-gray-700">
                      Lazer epilasyon konusunda çok ayrıntılı bilgi almış oldum. Hemen randevu alacağım!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="text-primary hover:text-secondary transition-colors font-medium">
                Daha fazla yorum göster
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

export default BlogDetail
