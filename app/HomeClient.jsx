"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import HeroCarousel from "@/components/hero-carousel"
import TestimonialsCarousel from "@/components/musteri"
import ServiceCards from "@/components/service-cards"
import FeaturedServices from "@/components/FeaturedServices"
import BlogSection from "@/components/BlogSection"
import StatsSection from "@/components/StatsSection"
import ManualGoogleReviews from "@/components/ManualGoogleReviews"
import JsonLd from "@/components/JsonLd"
import { 
  HeroSkeleton, 
  StatsSkeleton, 
  ServiceCardSkeleton, 
  FeaturedServiceSkeleton, 
  BlogCardSkeleton, 
  TestimonialsSkeleton 
} from "@/components/Skeletons"
// ÖNEMLİ: Import'u düzelttik - artık components klasöründen alıyoruz
import TrustmaryWidget from "@/components/TrustmaryWidget"

const HomeClient = ({ 
  blogs: initialBlogs = [], 
  services: initialServices = [], 
  featuredServices: initialFeaturedServices = [], 
  error: initialError = null,
  loading = false 
}) => {
  
  // Client-side state
  const [blogs, setBlogs] = useState(initialBlogs)
  const [services, setServices] = useState(initialServices)
  const [featuredServices, setFeaturedServices] = useState(initialFeaturedServices)
  const [error, setError] = useState(initialError)
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(initialBlogs.length > 0 || initialServices.length > 0)

  // Verileri client-side'da çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [blogsRes, servicesRes] = await Promise.all([
          fetch('/api/blog?published=true'),
          fetch('/api/services')
        ])

        if (blogsRes.ok) {
          const blogsData = await blogsRes.json()
          setBlogs(blogsData?.data?.slice(0, 3) || [])
        }

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          const servicesList = servicesData?.data?.slice(0, 3) || []
          setServices(servicesList)
          setFeaturedServices(servicesList.filter(service => service.featured === true))
        }
        
        setDataLoaded(true)
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu')
        setDataLoaded(true)
      } finally {
        setIsLoading(false)
      }
    }

    // Sadece başlangıç verisi yoksa fetch et
    if (initialBlogs.length === 0 && initialServices.length === 0) {
      fetchData()
    } else {
      setDataLoaded(true)
    }
  }, [initialBlogs.length, initialServices.length])

  // JSON-LD Schema
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

  // Hata durumu
  if (error) {
    return <div className="text-center py-12">Hata: {error}</div>
  }

  // Yükleme durumu - sadece ilk yüklemede göster
  if (isLoading && !dataLoaded) {
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

  // Ana içerik
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      {/* SEO için H1 başlığı */}
      <h1 className="sr-only">Şahika Beauty - Sultanbeyli Güzellik Merkezi</h1>
      
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
            <ServiceCards services={services} loading={isLoading} />
          </motion.div>
        </motion.section>
      </article>
      
      <FeaturedServices services={featuredServices} />
      
      {/* Trustmary Widget - Artık doğru şekilde import edildi */}
      <TrustmaryWidget />
      
      <BlogSection blogs={blogs} />
      <TestimonialsCarousel />
    </>
  )
}

export default HomeClient