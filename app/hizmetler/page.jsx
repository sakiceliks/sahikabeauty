"use client"
import { useState, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CursorContext } from "@/components/CursorContext"
import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import { generateBreadcrumbSchema } from "@/lib/seo-schemas"
import { ServiceCardSkeleton } from "@/components/Skeletons"

const skeletonCount = 6

const serviceCategories = [
  {
    id: "all",
    name: "Tüm Hizmetler",
    seoTitle: "Sultanbeyli Güzellik Merkezi - Tüm Hizmetler",
    description:
      "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve tüm estetik hizmetler.",
  },
  {
    id: "epilasyon",
    name: "Epilasyon",
    seoTitle: "Sultanbeyli Lazer Epilasyon - İğneli Epilasyon Hizmetleri",
    description:
      "Sultanbeyli'de profesyonel lazer epilasyon ve iğneli epilasyon hizmetleri. Falcon 4 Pro cihazı ile kalıcı tüy azaltma.",
  },
  {
    id: "cilt-bakimi",
    name: "Cilt Bakımı",
    seoTitle: "Sultanbeyli Cilt Bakımı - Leke Bakımı, Akne Tedavisi",
    description:
      "Sultanbeyli cilt bakımı merkezi. Leke bakımı, akne tedavisi, yosun peeling ve profesyonel cilt gençleştirme hizmetleri.",
  },
  {
    id: "bolgesel-incelme",
    name: "Bölgesel İncelme",
    seoTitle: "Sultanbeyli Bölgesel İncelme - G5 Masajı, EmSlim Fit",
    description:
      "Sultanbeyli bölgesel incelme merkezi. G5 masajı, EmSlim Fit, Primex ve Sculpture heykeltraş ile vücut şekillendirme.",
  },
  {
    id: "kalici-makyaj",
    name: "Kalıcı Makyaj",
    seoTitle: "Sultanbeyli Kalıcı Makyaj - Microblading, Dudak Renklendirme",
    description:
      "Sultanbeyli kalıcı makyaj merkezi. Microblading, kaş pigmentasyon, dudak renklendirme ve eyeliner uygulamaları.",
  },
  {
    id: "tirnak-kirpik",
    name: "Tırnak & Kirpik",
    seoTitle: "Sultanbeyli İpek Kirpik - Protez Tırnak, Manikür",
    description:
      "Sultanbeyli ipek kirpik ve protez tırnak hizmetleri. Profesyonel manikür ve kirpik uzatma uygulamaları.",
  },
  {
    id: "sac-bakimi",
    name: "Saç Bakımı",
    seoTitle: "Sultanbeyli Saç Bakımı - Saç Dökülmesi Tedavisi",
    description: "Sultanbeyli saç bakımı merkezi. Saç dökülmesi tedavisi ve profesyonel saç bakım hizmetleri.",
  },
  {
    id: "anti-age",
    name: "Anti-Age & Özel Bakımlar",
    seoTitle: "Sultanbeyli Cilt Gençleştirme - Anti-Age, Altın Tozu Bakımı",
    description:
      "Sultanbeyli anti-age merkezi. Cilt gençleştirme, 24K altın tozu bakımı ve iğnesiz mezoterapi hizmetleri.",
  },
]

const Services = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)
  const [activeCategory, setActiveCategory] = useState("all")
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
        <div className="container mx-auto pt-32 pb-12 px-6 xl:px-0">
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
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-card-foreground hover:bg-muted border-border"
                }`}
                aria-label={`${cat.name} hizmetlerini görüntüle`}
              >
                {cat.name}
              </button>
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
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
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

export default Services
