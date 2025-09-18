"use client";
import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CursorContext } from "@/components/CursorContext";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schemas";
import Link from "next/link";

// Blog kategorileri
const blogCategories = [
  {
    id: "all",
    name: "Tüm Yazılar",
    seoTitle: "Sultanbeyli Güzellik Merkezi - Blog Yazıları",
    description:
      "Sultanbeyli Güzellik Merkezi’nin blog sayfasında güzellik, cilt bakımı, epilasyon ve daha fazlası hakkında en güncel rehberler ve ipuçları.",
  },
  {
    id: "epilasyon",
    name: "Epilasyon",
    seoTitle: "Sultanbeyli Lazer Epilasyon - Blog Yazıları",
    description:
      "Lazer epilasyon ve iğneli epilasyon hakkında bilgilendirici yazılar. Şahika Beauty’den uzman tavsiyeleri.",
  },
  {
    id: "cilt-bakimi",
    name: "Cilt Bakımı",
    seoTitle: "Sultanbeyli Cilt Bakımı - Blog Yazıları",
    description:
      "Cilt bakımı, leke tedavisi ve gençleştirme üzerine yazılar. Şahika Beauty ile cildinizi yenileyin.",
  },
  {
    id: "bolgesel-incelme",
    name: "Bölgesel İncelme",
    seoTitle: "Sultanbeyli Bölgesel İncelme - Blog Yazıları",
    description:
      "Bölgesel incelme teknikleri ve vücut şekillendirme üzerine yazılar. Şahika Beauty’den ipuçları.",
  },
  {
    id: "kalici-makyaj",
    name: "Kalıcı Makyaj",
    seoTitle: "Sultanbeyli Kalıcı Makyaj - Blog Yazıları",
    description:
      "Microblading, dudak renklendirme ve kalıcı makyaj üzerine bilgilendirici yazılar.",
  },
  {
    id: "tirnak-kirpik",
    name: "Tırnak & Kirpik",
    seoTitle: "Sultanbeyli Tırnak ve Kirpik - Blog Yazıları",
    description:
      "İpek kirpik, protez tırnak ve manikür üzerine yazılar. Şahika Beauty ile güzelliğinizi tamamlayın.",
  },
  {
    id: "sac-bakimi",
    name: "Saç Bakımı",
    seoTitle: "Sultanbeyli Saç Bakımı - Blog Yazıları",
    description:
      "Saç dökülmesi tedavisi ve saç bakımı üzerine yazılar. Şahika Beauty’den uzman önerileri.",
  },
  {
    id: "anti-age",
    name: "Anti-Age & Özel Bakımlar",
    seoTitle: "Sultanbeyli Anti-Age ve Özel Bakımlar - Blog Yazıları",
    description:
      "Cilt gençleştirme ve özel bakım teknikleri üzerine yazılar. Şahika Beauty ile genç kalın.",
  },
];

const skeletonCount = 6;

const BlogPage = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Breadcrumb şeması
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  // Blog kataloğu şeması
  const blogCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Şahika Beauty Blog Yazıları",
    description:
      "Sultanbeyli Güzellik Merkezi’nin blog yazıları. Güzellik, cilt bakımı, epilasyon ve daha fazlası hakkında rehberler.",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/blog",
    numberOfItems: blogs.length,
    itemListElement: blogs.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt,
        url: `https://sultanbeyliguzellikmerkezi.com.tr/blog/${blog.slug}`,
        author: {
          "@type": "Organization",
          name: "Şahika Beauty",
        },
        publisher: {
          "@type": "Organization",
          name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
        },
        image: blog.image || "https://sultanbeyliguzellikmerkezi.com.tr/og-default.png",
        datePublished: blog.date,
      },
    })),
  };

  // FAQ şeması
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Lazer epilasyon nedir ve nasıl çalışır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lazer epilasyon, istenmeyen tüylerden kurtulmanın kalıcı bir yoludur. Yoğunlaştırılmış ışık, tüy köklerindeki melanin pigmentini hedef alarak tüy üretimini durdurur.",
        },
      },
      {
        "@type": "Question",
        name: "Lazer epilasyon kaç seans sürer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ortalama 6-8 seans gerekir, ancak bu sayı cilt ve tüy tipine göre değişir.",
        },
      },
    ],
  };

  // Veri çekme
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/blog", {
          cache: "force-cache", // İstemci tarafında önbellekleme
        });
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data || []);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Blog yazıları çekilirken hata oluştu:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Kategoriye göre filtreleme
  const filteredBlogs =
    activeCategory === "all" ? blogs : blogs.filter((blog) => blog.category.toLowerCase() === activeCategory);

  const currentCategory = blogCategories.find((cat) => cat.id === activeCategory) || blogCategories[0];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogCatalogSchema} />
      <JsonLd data={faqSchema} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="min-h-screen flex flex-col items-center overflow-x-hidden"
      >
        <div className="container mx-auto pt-32 pb-12 px-6 xl:px-0">
          <div className="text-center mb-10">
            <h1 className="h1 mb-4 text-gradient">
              {currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi Blog Yazıları"}
            </h1>
            <p className="lead max-w-[800px] mx-auto text-pretty">
              {currentCategory.description ||
                "Güzellik, cilt bakımı ve epilasyon hakkında en güncel rehberler, ipuçları ve uzman tavsiyeleri."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 px-3 py-1 rounded-full">Sultanbeyli Güzellik Merkezi</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Güzellik İpuçları</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Uzman Tavsiyeleri</span>
            </div>
          </div>

          {/* Kategori Filtreleri */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {blogCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-card-foreground hover:bg-muted border-border"
                }`}
                aria-label={`${cat.name} blog yazılarını görüntüle`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              <span className="font-semibold text-primary">{filteredBlogs.length}</span> yazı bulundu
              {activeCategory !== "all" && (
                <span>
                  {" "}
                  - <strong>{currentCategory.name}</strong> kategorisinde
                </span>
              )}
            </p>
          </div>

          {/* Blog Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, i) => <ServiceCardSkeleton key={i} />)
              : filteredBlogs.length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground">
                    Bu kategoride henüz yazı bulunmuyor.
                  </div>
                ) : (
                  filteredBlogs.map((blog, index) => (
                    <motion.article
                      key={blog._id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.2 * index },
                      }}
                      onMouseEnter={mouseEnterHandler}
                      onMouseLeave={mouseLeaveHandler}
                      className="beauty-card group hover:pastel-glow flex flex-col items-center text-center"
                      itemScope
                      itemType="https://schema.org/BlogPosting"
                    >
                      <div className="relative w-[120px] h-[120px] mb-6 overflow-hidden rounded-xl">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={`${blog.title} - Sultanbeyli güzellik merkezi`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          itemProp="image"
                        />
                      </div>

                      <h2
                        className="text-xl font-heading font-semibold mb-3 text-primary group-hover:text-accent transition-colors"
                        itemProp="headline"
                      >
                        {blog.title}
                      </h2>

                      <p
                        className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed"
                        itemProp="description"
                      >
                        {blog.excerpt}
                      </p>

                      <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {blog.readTime && (
                          <span className="service-badge text-xs">⏱️ {blog.readTime}</span>
                        )}
                        {blog.category && (
                          <span className="service-badge text-xs">📚 {blog.category}</span>
                        )}
                      </div>

                      <Link href={`/blog/${blog.slug}`} className="mt-auto" itemProp="url">
                        <button className="btn-primary group-hover:scale-105 transition-transform">
                          Yazıyı Oku
                        </button>
                      </Link>

                      <div className="sr-only">
                        <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                          <span itemProp="name">Şahika Beauty</span>
                        </span>
                        <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                          <span itemProp="name">Şahika Beauty - Sultanbeyli Güzellik Merkezi</span>
                        </span>
                        <span itemProp="datePublished">{blog.date}</span>
                      </div>
                    </motion.article>
                  ))
                )}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
            className="mt-16 text-center"
          >
            <div className="beauty-card max-w-4xl mx-auto">
              <h2 className="h2 text-gradient mb-4">Sultanbeyli Güzellik Merkezi Blog</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Güzellik ve bakım dünyasındaki en son trendleri ve uzman önerilerini keşfedin. Daha fazla bilgi için
                blogumuzu takip edin!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/905304348349" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  WhatsApp ile İletişime Geç
                </a>
                <a href="tel:+905304348349" className="btn-secondary">
                  Hemen Ara
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.section>
    </>
  );
};

export default BlogPage;