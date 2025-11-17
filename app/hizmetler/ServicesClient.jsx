"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import JsonLd from "@/components/JsonLd"
import { generateBreadcrumbSchema } from "@/lib/seo-schemas"
import { ServiceCardSkeleton } from "@/components/Skeletons"
import Link from "next/link"
import RelatedBlogs from "@/components/RelatedBlogs"
import { ArrowRight } from "lucide-react"
import { serviceCategories } from "@/data/serviceCategories"

const skeletonCount = 6

const ServicesClient = ({ initialCategory = "all" }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetler", url: "/hizmetler" },
  ])

  const servicesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Şahika Beauty Güzellik Hizmetleri",
    description:
      "Sultanbeyli'nin en kaliteli güzellik merkezi hizmetleri. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik uygulamalar.",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/hizmetler",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `https://sultanbeyliguzellikmerkezi.com.tr/hizmetler/${service.slug}`,
        provider: {
          "@type": "BeautySalon",
          name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
        },
      },
    })),
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/services")
        const data = await res.json()
        if (data.success) {
          setCategories(data.categories || [])
          setServices(data.data || [])
        }
      } catch (err) {
        setCategories([])
        setServices([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Update active category when initialCategory prop changes
  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  const filteredServices =
    activeCategory === "all" ? services : services.filter((service) => service.category === activeCategory)

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory) || serviceCategories[0]

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={servicesCatalogSchema} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="min-h-screen flex flex-col items-center overflow-x-hidden"
      >
        <div className="container mx-auto pt-2 pb-12 px-6 xl:px-0">
          <div className="text-center mb-10">
            <h1 className="h1 mb-4 text-gradient">
              {currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi Hizmetleri"}
            </h1>
            <p className="lead max-w-[800px] mx-auto text-pretty">
              {currentCategory.description ||
                "Cilt bakımından kalıcı makyaja kadar geniş hizmet yelpazemizle yanınızdayız. Sultanbeyli'nin en kaliteli güzellik merkezi."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 px-3 py-1 rounded-full">Sultanbeyli Güzellik Merkezi</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Profesyonel Hizmet</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Uzman Kadro</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Son Teknoloji</span>
            </div>
          </div>

          {/* Kategori Filtreleri */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === "all" ? "/hizmetler" : `/hizmetler?category=${cat.id}`}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-card-foreground hover:bg-muted border-border"
                }`}
                aria-label={`${cat.name} hizmetlerini görüntüle`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              <span className="font-semibold text-primary">{filteredServices.length}</span> hizmet bulundu
              {activeCategory !== "all" && (
                <span>
                  {" "}
                  - <strong>{currentCategory.name}</strong> kategorisinde
                </span>
              )}
            </p>
          </div>

          {/* Hizmet Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, i) => <ServiceCardSkeleton key={i} />)
              : filteredServices.map((service, index) => (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2 * index },
                    }}
                    className="beauty-card group hover:pastel-glow flex flex-col items-center text-center"
                    itemScope
                    itemType="https://schema.org/Service"
                  >
                    <div className="relative w-[120px] h-[120px] mb-6 overflow-hidden rounded-xl">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={`${service.title} - Sultanbeyli güzellik merkezi`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        itemProp="image"
                      />
                    </div>

                    <h2
                      className="text-xl font-heading font-semibold mb-3 text-primary group-hover:text-accent transition-colors"
                      itemProp="name"
                    >
                      {service.title}
                    </h2>

                    <p
                      className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed"
                      itemProp="description"
                    >
                      {service.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {service.duration && <span className="service-badge text-xs">⏱️ {service.duration}</span>}
                      {service.device && (
                        <span className="service-badge text-xs">
                          🔬 {typeof service.device === "string" ? service.device : service.device.name}
                        </span>
                      )}
                    </div>

                    <Link href={`/hizmetler/${service.slug}`} className="mt-auto" itemProp="url">
                      <button className="btn-primary group-hover:scale-105 transition-transform">Detayları Gör</button>
                    </Link>

                    <div className="sr-only">
                      <span itemProp="provider" itemScope itemType="https://schema.org/BeautySalon">
                        <span itemProp="name">Şahika Beauty - Sultanbeyli Güzellik Merkezi</span>
                        <span itemProp="address">Sultanbeyli, İstanbul</span>
                      </span>
                      <span itemProp="serviceType">{service.category}</span>
                      <span itemProp="areaServed">Sultanbeyli, İstanbul</span>
                    </div>
                  </motion.article>
                ))}
          </div>

          {/* Featured Blog Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            className="mb-16"
          >
            <div className="beauty-card bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg mb-4">
                  ⭐ Öne Çıkan Blog Yazısı
                </div>
                <h2 className="h2 text-gradient mb-4">
                  Sultanbeyli Güzellik Merkezi Rehberi
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Tüm hizmetlerimiz hakkında detaylı bilgi almak için uzman rehberimizi inceleyin
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-primary">
                    Aradığınız Tüm Hizmetler Bir Arada
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Sultanbeyli güzellik merkezi arayışınızda doğru adresi bulmak, kendinize yaptığınız en iyi yatırımlardan biridir. 
                    Kaliteli bir merkez, yalnızca estetik hizmetler sunmakla kalmaz, aynı zamanda hijyen, uzman kadro ve son teknoloji cihazlarla da güven verir.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-white/50 rounded-lg p-3">
                      <span className="text-2xl">✨</span>
                      <span className="text-sm font-medium">Uzman Kadro</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 rounded-lg p-3">
                      <span className="text-2xl">🔬</span>
                      <span className="text-sm font-medium">Son Teknoloji</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 rounded-lg p-3">
                      <span className="text-2xl">🛡️</span>
                      <span className="text-sm font-medium">Güvenli Uygulama</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 rounded-lg p-3">
                      <span className="text-2xl">⭐</span>
                      <span className="text-sm font-medium">1000+ Memnun Müşteri</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/sultanbeyli-guzellik-merkezi"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg"
                  >
                    📖 Detaylı Rehberi Oku
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4">🏥</div>
                    <h4 className="text-xl font-semibold mb-2">Sultanbeyli'nin En Kaliteli Merkezi</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Lazer epilasyon, cilt bakımı, kalıcı makyaj ve daha fazlası için güvenilir adresiniz
                    </p>
                    <div className="flex justify-center gap-4 text-2xl">
                      <span>⚡</span>
                      <span>✨</span>
                      <span>💄</span>
                      <span>🏃‍♀️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Blogs Section */}
          <RelatedBlogs 
            serviceCategory="all" 
            serviceTitle="Güzellik Hizmetleri"
            limit={6}
          />

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
            className="mt-16 text-center"
          >
            <div className="beauty-card max-w-4xl mx-auto">
              <h2 className="h2 text-gradient mb-4">Sultanbeyli'nin En Kaliteli Güzellik Merkezi</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Uzman kadromuz ve son teknoloji cihazlarımızla size en iyi hizmeti sunuyoruz. Randevunuz için hemen
                iletişime geçin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/905304348349" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  WhatsApp ile Randevu Al
                </a>
                <a href="tel:+905304348349" className="btn-secondary">
                  Hemen Ara
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>1000+ Memnun Müşteri</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Uzman Kadro</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Hijyenik Ortam</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Son Teknoloji Cihazlar</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.section>
    </>
  )
}

export default ServicesClient

