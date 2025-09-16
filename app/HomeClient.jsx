"use client"

import { motion } from "framer-motion"
import { useContext, useState, useEffect } from "react"
import { CursorContext } from "@/components/CursorContext"
import HeroCarousel from "@/components/hero-carousel"
import TestimonialsCarousel from "@/components/musteri"
import ServiceCards from "@/components/service-cards"
import FeaturedServices from "@/components/FeaturedServices"
import BlogSection from "@/components/BlogSection"
import StatsSection from "@/components/StatsSection"
import JsonLd from "@/components/JsonLd"
import { generateBreadcrumbSchema, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo-schemas"
import { BlogCardSkeleton, ServiceCardSkeleton } from "@/components/Skeletons"

const HomeClient = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)
  const [blogs, setBlogs] = useState([])
  const [services, setServices] = useState([])
  const [featuredServices, setFeaturedServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Ana Sayfa", url: "/" }])

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
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
    servedCuisine: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Güzellik Hizmetleri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lazer Epilasyon",
            description: "Falcon 4 Pro cihazı ile kalıcı tüy azaltma",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cilt Bakımı",
            description: "Profesyonel cilt bakım ve tedavi hizmetleri",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kalıcı Makyaj",
            description: "Microblading, kaş pigmentasyon ve dudak renklendirme",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [blogsRes, servicesRes] = await Promise.all([
          fetch("/api/blog").catch((err) => ({ ok: false, error: err })),
          fetch("/api/services").catch((err) => ({ ok: false, error: err })),
        ])

        if (blogsRes.ok) {
          const blogsData = await blogsRes.json()
          if (blogsData && Array.isArray(blogsData)) {
            setBlogs(blogsData.slice(0, 3))
          }
        }

        if (servicesRes.ok) {
          const servicesJson = await servicesRes.json()
          const servicesData = servicesJson?.data || []

          if (Array.isArray(servicesData)) {
            setServices(servicesData.slice(0, 3))
            const featured = servicesData.filter((service) => service.featured === true)
            setFeaturedServices(featured)
          }
        }
      } catch (error) {
        console.error("Veri yükleme hatası:", error)
        setError("Veriler yüklenirken bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localBusinessSchema} />

      <HeroCarousel />

      <StatsSection />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="py-12 bg-secondary-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <ServiceCards services={services} loading={false} />
            )}
          </motion.div>
        </div>
      </motion.section>

      <FeaturedServices services={featuredServices} />

      {loading ? (
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
      ) : (
        <BlogSection blogs={blogs} />
      )}

      <TestimonialsCarousel />
    </>
  )
}

export default HomeClient
