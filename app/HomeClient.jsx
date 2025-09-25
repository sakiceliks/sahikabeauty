"use client"

import { motion } from "framer-motion"
import { useContext } from "react"
import { CursorContext } from "@/components/CursorContext"
import HeroCarousel from "@/components/hero-carousel"
import TestimonialsCarousel from "@/components/musteri"
import ServiceCards from "@/components/service-cards"
import FeaturedServices from "@/components/FeaturedServices"
import BlogSection from "@/components/BlogSection"
import StatsSection from "@/components/StatsSection"
import JsonLd from "@/components/JsonLd"
import { 
  HeroSkeleton, 
  StatsSkeleton, 
  ServiceCardSkeleton, 
  FeaturedServiceSkeleton, 
  BlogCardSkeleton, 
  TestimonialsSkeleton 
} from "@/components/Skeletons" // Yeni skeleton'ları import et (oluşturman gerekebilir)

const HomeClient = ({ 
  blogs = [], 
  services = [], 
  featuredServices = [], 
  error = null,
  loading = false 
}) => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Sultanbeyli Güzellik Merkezi - Şahika Beauty",
    description:
      "Sultanbeyli'nin en güvenilir güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme ve daha fazlası.",
    url: "https://sultanbeyliguzellikmerkezi.com.tr",
    telephone: "+90 216 123 45 67",
    email: "info@sultanbeyliguzellikmerkezi.com.tr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sultanbeyli Merkez",
      addressLocality: "Sultanbeyli",
      addressRegion: "İstanbul",
      postalCode: "34935",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.9607",
      longitude: "29.2675",
    },
    openingHours: ["Mo-Sa 09:00-19:00"],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Güzellik Hizmetleri",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Sultanbeyli Güzellik Merkezi",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Güzellik Merkezi",
            description: "Şahika Beauty, lazer epilasyon ve cilt bakımı gibi kapsamlı hizmetlerle güzelliğinizi öne çıkarır. Uzman ekibimizle kişiselleştirilmiş bakım alın.",
            offers: { price: "Paketler 300 TL'den başlar" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Lazer Epilasyon",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Lazer Epilasyon",
            description: "Falcon 4 Pro cihazı ile acısız, kalıcı tüy azaltma. Tüm cilt tiplerine uygun, hızlı seanslar.",
            offers: { price: "Başlangıç 500 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Cilt Bakımı",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Cilt Bakımı",
            description: "Profesyonel temizleme, nemlendirme ve tedavi hizmetleri. Leke ve akne sorunlarınıza özel çözümler.",
            offers: { price: "Seans 250 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Kalıcı Makyaj",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Kalıcı Makyaj",
            description: "Microblading ve pigmentasyonla doğal kaş, dudak ve eyeliner. Uzun süreli, hijyenik uygulama.",
            offers: { price: "Tam set 1000 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Estetik",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Estetik",
            description: "Bölgesel incelme ve vücut şekillendirme tedavileri. Son teknoloji cihazlarla etkili sonuçlar.",
            offers: { price: "Program 800 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli İğneli Epilasyon",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli İğneli Epilasyon",
            description: "Kalın tüyler için kesin çözüm. Ağrısız iğne teknolojisiyle kalıcı epilasyon.",
            offers: { price: "Alan başına 400 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Leke Bakımı",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Leke Bakımı",
            description: "Peeling ve lazerle cilt lekelerini giderin. Eşit tonlu cilt için 4-6 seanslık program.",
            offers: { price: "Seans 300 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Akne Bakımı",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Akne Bakımı",
            description: "Sivilce ve akne tedavisiyle temiz cilt. Antibakteriyel maskeler ve profesyonel bakım.",
            offers: { price: "Kür 600 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Yosun Peeling",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Yosun Peeling",
            description: "Doğal yosun özleri ile detoks ve yenileme. Cildi nemlendirir, parlaklık verir.",
            offers: { price: "Seans 200 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli G5 Masajı",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli G5 Masajı",
            description: "Titreşimli masajla lenf drenajı ve selülit azaltma. Rahatlatıcı vücut bakımı.",
            offers: { price: "Seans 250 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli EmSlim Fit",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli EmSlim Fit",
            description: "Kas güçlendirme ve yağ yakma cihazı. 4 seansla %30 incelme sağlayın.",
            offers: { price: "Paket 1200 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Primex",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Primex",
            description: "RF teknolojisiyle cilt sıkılaştırma. Kırışıklık ve sarkma için ideal.",
            offers: { price: "Seans 350 TL" },
          },
        },
        {
          "@type": "Offer",
          name: "Sultanbeyli Sculpture",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Sculpture",
            description: "Soğuk lipolizle yağ eritme. Vücut kontürü için kalıcı sonuçlar.",
            offers: { price: "Alan 700 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Dudak Renklendirme",
            description: "Doğal renklerle dudakları canlandırın. Kalıcı ve canlı görünüm.",
            offers: { price: "Uygulama 800 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Eyeliner",
            description: "Hassas pigmentasyonla gözleri belirginleştirin. Günlük makyajsız şıklık.",
            offers: { price: "Seans 600 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Kaş Pigmentasyon",
            description: "Boşlukları dolduran doğal kaş tasarımı. 2 seansla 2 yıl kalıcılık.",
            offers: { price: "Tam 700 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Microblading",
            description: "Manuel teknikle gerçekçi kaşlar. İyileşme sonrası doğal efekt.",
            offers: { price: "Uygulama 900 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli İpek Kirpik",
            description: "Hacimli ve doğal kirpik uzatma. 45 dakikada profesyonel sonuç.",
            offers: { price: "Seans 400 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Protez Tırnak",
            description: "Jel ve akrilikle uzun süreli tırnak tasarımı. Çeşitli stiller mevcut.",
            offers: { price: "Tam set 300 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Manikür",
            description: "Hijyenik tırnak bakımı ve oje uygulaması. Gece-gündüz seçenekleri.",
            offers: { price: "Seans 150 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Saç Bakımı",
            description: "Besleme maskeleri ve keratin tedavisiyle saçları onarın. Parlaklık kazanın.",
            offers: { price: "Seans 200 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Cilt Gençleştirme",
            description: "Mezoterapi ve lazerle kırışıklıkları azaltın. Yaşsız cilt için.",
            offers: { price: "Kür 900 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Anti-Age",
            description: "Kolajen artıran tedavilerle yaşlanmayı yavaşlatın. Kişiye özel programlar.",
            offers: { price: "Paket 1000 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli Altın Tozu Cilt Bakımı",
            description: "Lüks altın partikülleriyle cildi aydınlatın ve sıkılaştırın. Canlı görünüm.",
            offers: { price: "Seans 400 TL" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sultanbeyli İğnesiz Mezoterapi",
            description: "Ultrasonla serum beslemesi. Ağrısız cilt yenileme ve nemlendirme.",
            offers: { price: "Seans 350 TL" },
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: {
      "@type": "Place",
      name: "Sultanbeyli, İstanbul",
    },
  }

  if (error) {
    return <div className="text-center py-12">Hata: {error}</div>
  }

  if (loading) {
    return (
      <div className="space-y-12">
        <HeroSkeleton />
        <StatsSkeleton />
        <section className="py-12 bg-secondary-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
        <div className="py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <FeaturedServiceSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
        <TestimonialsSkeleton />
      </div>
    )
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroCarousel />
      <StatsSection />
      <article
        className="py-12 bg-secondary-50"
        itemScope
        itemType="https://schema.org/Service"
      >
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <ServiceCards services={services} loading={loading} />
          </motion.div>
        </motion.section>
      </article>
      <FeaturedServices services={featuredServices} />
      <BlogSection blogs={blogs} />
      <TestimonialsCarousel />
    </>
  )
}

export default HomeClient