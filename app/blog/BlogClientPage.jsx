// pages/blog.tsx
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schemas";

// Static blog categories
export const blogCategories = [
  {
    id: "all",
    name: "Tümü",
    seoTitle: "Sultanbeyli Güzellik Merkezi Blog - Güzellik İpuçları ve Rehberler",
    description:
      "Sultanbeyli güzellik merkezi blog sayfası. Güzellik ipuçları, cilt bakımı rehberleri, epilasyon bilgileri ve uzman tavsiyeleri.",
  },
  {
    id: "epilasyon",
    name: "Epilasyon",
    seoTitle: "Sultanbeyli Epilasyon Rehberleri - Lazer Epilasyon İpuçları",
    description:
      "Sultanbeyli lazer epilasyon rehberleri. Epilasyon öncesi hazırlık, bakım ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "cilt-bakimi",
    name: "Cilt Bakımı",
    seoTitle: "Sultanbeyli Cilt Bakımı Rehberleri - Güzellik İpuçları",
    description: "Sultanbeyli cilt bakımı rehberleri. Cilt bakım rutinleri, leke bakımı ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "bolgesel-incelme",
    name: "Bölgesel İncelme",
    seoTitle: "Sultanbeyli Bölgesel İncelme Rehberleri - Vücut Şekillendirme",
    description:
      "Sultanbeyli bölgesel incelme rehberleri. Vücut şekillendirme ipuçları, masaj teknikleri ve uzman tavsiyeleri.",
  },
  {
    id: "kalici-makyaj",
    name: "Kalıcı Makyaj",
    seoTitle: "Sultanbeyli Kalıcı Makyaj Rehberleri - Microblading İpuçları",
    description:
      "Sultanbeyli kalıcı makyaj rehberleri. Microblading bakımı, kalıcı makyaj ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "tirnak-kirpik",
    name: "Tırnak & Kirpik",
    seoTitle: "Sultanbeyli Tırnak ve Kirpik Bakımı Rehberleri",
    description:
      "Sultanbeyli tırnak ve kirpik bakımı rehberleri. İpek kirpik bakımı, tırnak bakım ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "sac-bakimi",
    name: "Saç Bakımı",
    seoTitle: "Sultanbeyli Saç Bakımı Rehberleri - Saç Dökülmesi İpuçları",
    description: "Sultanbeyli saç bakımı rehberleri. Saç dökülmesi önleme, saç bakım rutinleri ve uzman tavsiyeleri.",
  },
  {
    id: "anti-age",
    name: "Anti-Age & Özel Bakımlar",
    seoTitle: "Sultanbeyli Anti-Age Rehberleri - Cilt Gençleştirme İpuçları",
    description:
      "Sultanbeyli anti-age rehberleri. Cilt gençleştirme ipuçları, yaşlanma karşıtı bakım ve uzman tavsiyeleri.",
  },
];

// Interface for blog posts
// Server-Side Props to fetch only blog posts
export const getServerSideProps = async () => {
  try {
    // Fetch blog posts from the API
    const postsRes = await fetch("https://sultanbeyliguzellikmerkezi.com.tr/api/blog");
    const blogPosts = await postsRes.json();

    return {
      props: {
        blogPosts,
      },
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      props: {
        blogPosts: [],
      },
    };
  }
};

// BlogClientPage component
const BlogClientPage = ({ blogPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Generate SEO schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const currentCategory =
    blogCategories.find((cat) => cat.id === selectedCategory) || blogCategories[0];

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Şahika Beauty Blog - Sultanbeyli Güzellik Merkezi",
    description:
      "Sultanbeyli güzellik merkezi blog sayfası. Güzellik ipuçları, cilt bakımı rehberleri, epilasyon bilgileri ve uzman tavsiyeleri.",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/blog",
    publisher: {
      "@type": "Organization",
      name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
      logo: {
        "@type": "ImageObject",
        url: "https://sultanbeyliguzellikmerkezi.com.tr/assets/logo.png",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: `https://sultanbeyliguzellikmerkezi.com.tr${post.image}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.date,
      url: `https://sultanbeyliguzellikmerkezi.com.tr/blog/${post.slug}`,
    })),
  };

  // Filtering function
  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  // Featured and regular posts
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <>
      {/* SEO structured data */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogListSchema} />
<Head>
  <title>{post.title}</title>
  <meta name="description" content={post.excerpt} />
  <meta name="keywords" content={post.tags} />
</Head>
      <div className="min-h-screen pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* SEO-optimized header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="text-center mb-12"
          >
            <h1 className="h1 mb-4 text-gradient">{currentCategory.seoTitle}</h1>
            <p className="lead max-w-3xl mx-auto text-muted-foreground text-pretty">
              {currentCategory.description}
            </p>

            {/* Location and expertise keywords */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 px-3 py-1 rounded-full">Sultanbeyli Güzellik Merkezi</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Uzman Rehberleri</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Güzellik İpuçları</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Profesyonel Tavsiyeler</span>
            </div>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            className="flex flex-col lg:flex-row gap-6 mb-12"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background/50 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Posts */}
          {selectedCategory === "all" && featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="mb-16"
            >
              <h2 className="h2 mb-8 text-center">Öne Çıkan Yazılar</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.6 + index * 0.1 } }}
                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Öne Çıkan
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.views} görüntülenme</span>
                      </div>
                      <h3 className="h3 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <a
                          href={`/blog/${post.slug}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                        >
                          Devamını Oku →
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Posts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}>
            <h2 className="h2 mb-8 text-center">{selectedCategory === "all" ? "Tüm Yazılar" : currentCategory.name}</h2>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? "Arama kriterlerinize uygun yazı bulunamadı." : "Bu kategoride henüz yazı bulunmuyor."}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === "all" ? regularPosts : filteredPosts).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.8 + index * 0.1 } }}
                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {blogCategories.find((cat) => cat.id === post.category)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="h3 mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <a
                          href={`/blog/${post.slug}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                        >
                          Devamını Oku →
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BlogClientPage;