"use client"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { SEOHead } from "@/components/seo-head"
import { 
  Star, Clock, Award, CheckCircle, Phone, MessageCircle, Shield, Users, 
  Sparkles, ArrowRight, MapPin, Calendar, ExternalLink, BookOpen,
  Target, TrendingUp, Heart, Eye, X
} from "lucide-react"
import JsonLd from "@/components/JsonLd"
import { generateServiceSchema, generateBreadcrumbSchema, generateLocalBusinessSchema, generateFAQSchema } from "@/lib/seo-schemas"
import { useState, useEffect } from "react"
import RelatedBlogs from "@/components/RelatedBlogs"

// Enhanced SEO data structure for service pages
const servicePageSEOData = {
  // Internal service links with location targeting
  locationServices: [
    {
      service: "lazer-epilasyon",
      locations: [
        { name: "Sultanbeyli", slug: "sultanbeyli", description: "Sultanbeyli'de en kaliteli lazer epilasyon hizmeti" },
        { name: "Kartal", slug: "kartal", description: "Kartal'da uzman lazer epilasyon merkezi" },
        { name: "Pendik", slug: "pendik", description: "Pendik'te güvenilir lazer epilasyon" }
      ]
    },
    {
      service: "cilt-bakimi", 
      locations: [
        { name: "Sultanbeyli", slug: "sultanbeyli", description: "Sultanbeyli cilt bakım uzmanları" },
        { name: "Maltepe", slug: "maltepe", description: "Maltepe profesyonel cilt bakımı" }
      ]
    }
  ],

  // Competitive advantages
  competitiveAdvantages: [
    {
      title: "8+ Yıl Sultanbeyli Deneyimi",
      description: "2017'den beri Sultanbeyli'de kesintisiz hizmet",
      icon: "🏆"
    },
    {
      title: "1000+ Memnun Müşteri",
      description: "Sultanbeyli ve çevre ilçelerden binlerce memnun müşteri",
      icon: "👥"
    },
    {
      title: "Son Teknoloji Cihazlar",
      description: "FDA onaylı, güncel teknoloji ile güvenli uygulama",
      icon: "⚡"
    },
    {
      title: "Uzman Kadro",
      description: "Sertifikalı ve deneyimli güzellik uzmanları",
      icon: "🎓"
    }
  ],

  // Service comparison data
  competitorComparison: {
    "lazer-epilasyon": [
      { criteria: "Cihaz Teknolojisi", us: "Son nesil Diode Laser", competitors: "Eski teknoloji IPL" },
      { criteria: "Uzman Deneyimi", us: "8+ yıl sektör deneyimi", competitors: "2-3 yıl deneyim" },
      { criteria: "Hijyen Standartları", us: "T.C. Sağlık Bakanlığı standartları", competitors: "Belirsiz hijyen kuralları" },
      { criteria: "Fiyat Garantisi", us: "Şeffaf, sabit fiyatlar", competitors: "Gizli ek ücretler" }
    ]
  },

  // Local business info
  businessInfo: {
    name: "Şahika Beauty Sultanbeyli",
    address: "Abdurrahmangazi, Fatih Blv. No:73/1 34920 Sultanbeyli/İstanbul",
    phone: "+90 530 434 83 49",
    hours: "Pazartesi-Cuma: 09:00-19:00, Cumartesi: 10:00-17:00",
    established: "2017",
    customerCount: "1000+",
    rating: 4.8,
    reviewCount: 247
  },

  // Authority links
  authorityLinks: [
    {
      href: "https://www.saglik.gov.tr/TR,11170/kozmetik-urunler-yonetmeligi.html",
      text: "T.C. Sağlık Bakanlığı Güzellik Düzenlemeleri",
      rel: "nofollow noopener"
    },
    {
      href: "https://www.titubb.gov.tr/",
      text: "TITUBB Kozmetik Standartları", 
      rel: "nofollow noopener"
    }
  ]
}

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-muted rounded-md ${className}`} />
)

const ServiceDetailsSkeleton = () => (
  <div className="min-h-screen bg-background">
    {/* Existing skeleton code remains the same */}
    <section className="hero-gradient pt-2 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Skeleton className="h-4 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-20" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <div className="space-y-2 mb-8 max-w-2xl mx-auto">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-5 h-5" />
                ))}
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </section>
  </div>
)

// Enhanced Price Comparison Component
const ServicePriceComparison = ({ serviceName }) => {
  const comparisonData = servicePageSEOData.competitorComparison[serviceName] || []
  
  if (!comparisonData.length) return null

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden my-12">
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <h3 className="text-2xl font-bold text-white text-center">
          Neden Şahika Beauty Sultanbeyli?
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Özellik</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Şahika Beauty</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Diğer Merkezler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comparisonData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.criteria}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-700 font-medium">{item.us}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-red-600">{item.competitors}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Local SEO Contact Card
const LocalSEOCard = () => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 my-12">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold mb-4 text-primary">
        Sultanbeyli Güzellik Merkezi İletişim
      </h3>
      <p className="text-gray-600">
        8+ yıldır Sultanbeyli'de kaliteli hizmet veren güvenilir adresiniz
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
        <h4 className="font-semibold mb-2">Konum</h4>
        <p className="text-sm text-gray-600 mb-3">
          {servicePageSEOData.businessInfo.address}
        </p>
        <Link 
          href="/iletisim"
          className="text-primary hover:text-secondary transition-colors text-sm font-medium"
        >
          Harita ile Gör →
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
        <h4 className="font-semibold mb-2">Telefon</h4>
        <p className="text-sm text-gray-600 mb-3">
          {servicePageSEOData.businessInfo.phone}
        </p>
        <a 
          href={`tel:${servicePageSEOData.businessInfo.phone}`}
          className="text-primary hover:text-secondary transition-colors text-sm font-medium"
        >
          Hemen Ara →
        </a>
      </div>
      
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
        <h4 className="font-semibold mb-2">Çalışma Saatleri</h4>
        <p className="text-sm text-gray-600 mb-3">
          {servicePageSEOData.businessInfo.hours}
        </p>
        <Link 
          href="/rezervasyon"
          className="text-primary hover:text-secondary transition-colors text-sm font-medium"
        >
          Randevu Al →
        </Link>
      </div>
    </div>
  </div>
)

// Service Area Coverage
const ServiceAreaCoverage = ({ serviceName }) => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 my-12">
    <h3 className="text-2xl font-bold text-center mb-8 text-primary">
      Hizmet Verdiğimiz Bölgeler
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicePageSEOData.locationServices
        .find(s => s.service === serviceName)?.locations.map((location, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-lg">{location.name}</h4>
          </div>
          <p className="text-gray-600 text-sm mb-4">{location.description}</p>
          <Link 
            href={`/hizmetler/${serviceName}-${location.slug}`}
            className="inline-flex items-center gap-1 text-primary hover:text-secondary transition-colors text-sm font-medium"
          >
            Detaylar
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )) || []}
    </div>
  </div>
)

// Competitive Advantages Section
const CompetitiveAdvantages = () => (
  <div className="bg-white rounded-2xl shadow-lg p-8 my-12">
    <h3 className="text-2xl font-bold text-center mb-8">
      Şahika Beauty Sultanbeyli Avantajları
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicePageSEOData.competitiveAdvantages.map((advantage, index) => (
        <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">{advantage.icon}</div>
          <h4 className="font-semibold mb-2 text-primary">{advantage.title}</h4>
          <p className="text-sm text-gray-600">{advantage.description}</p>
        </div>
      ))}
    </div>
  </div>
)

// Enhanced Trust Signals
const TrustSignalsSection = () => (
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 my-12">
    <h3 className="text-2xl font-bold text-center mb-8">
      Güven & Kalite Sertifikalarımız
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h4 className="font-semibold mb-2">T.C. Sağlık Bakanlığı</h4>
        <p className="text-sm text-gray-600">Onaylı Güzellik Merkezi</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h4 className="font-semibold mb-2">ISO Kalite</h4>
        <p className="text-sm text-gray-600">Uluslararası Standartlar</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h4 className="font-semibold mb-2">FDA Onaylı</h4>
        <p className="text-sm text-gray-600">Güvenli Cihaz Kullanımı</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl text-center shadow-sm">
        <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h4 className="font-semibold mb-2">1000+ Müşteri</h4>
        <p className="text-sm text-gray-600">Memnuniyet Garantisi</p>
      </div>
    </div>
    
    <div className="text-center mt-8">
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {servicePageSEOData.authorityLinks.map((link, index) => (
          <a 
            key={index}
            href={link.href}
            target="_blank"
            rel={link.rel}
            className="text-primary hover:text-secondary transition-colors"
          >
            {link.text} <ExternalLink className="w-3 h-3 inline ml-1" />
          </a>
        ))}
      </div>
    </div>
  </div>
)

const ServiceDetails = () => {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dbTestimonials, setDbTestimonials] = useState([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      setLoading(true);

      try {
        const serviceRes = await fetch(`/api/services/${slug}`);
        const serviceData = await serviceRes.json();
        
        if (serviceData.success) {
          setService(serviceData.data);
          
          // Service ID'yi kontrol et - MongoDB _id veya static id
          const serviceId = serviceData.data.id || serviceData.data._id;
          const testimonialsRes = await fetch(`/api/testimonial?serviceId=${serviceId}&approved=true`);
          const testimonialsData = await testimonialsRes.json();
          
          if (testimonialsData.success) {
            setDbTestimonials(testimonialsData.data);
          } else {
            console.error("Error fetching testimonials:", testimonialsData.message);
          }
        } else {
          setService(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setService(null);
      } finally {
        setLoading(false);
        setTestimonialsLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  if (loading) {
    return <ServiceDetailsSkeleton />;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Hizmet Bulunamadı</h2>
          <p className="text-muted-foreground">Aradığınız hizmet mevcut değil.</p>
        </div>
      </div>
    );
  }

  // Enhanced schemas
  const serviceSchema = generateServiceSchema({
    ...service,
    provider: {
      "@type": "MedicalBusiness",
      "name": servicePageSEOData.businessInfo.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Fatih Bulvarı",
        "addressLocality": "Sultanbeyli", 
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      },
      "telephone": servicePageSEOData.businessInfo.phone,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": servicePageSEOData.businessInfo.rating,
        "reviewCount": servicePageSEOData.businessInfo.reviewCount
      }
    }
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetler", url: "/hizmetler" },
    { name: service.category || "Kategori", url: service.category ? `/hizmetler?category=${service.category}` : "/hizmetler" },
    { name: service.title || "Hizmet" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(servicePageSEOData.businessInfo);

  const faqSchema = service?.faq?.length > 0 ? generateFAQSchema(service.faq) : null;

  const allTestimonials = [
    ...(service.reviews || []),
    ...dbTestimonials.map((testimonial) => ({
      id: testimonial._id,
      name: testimonial.name,
      comment: testimonial.comment,
      rating: testimonial.rating,
      date: new Date(testimonial.createdAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
      }),
      beforeImage: testimonial.beforeImage,
      afterImage: testimonial.afterImage,
      isFromDb: true,
    })),
  ];

  const averageRating =
    allTestimonials.length > 0
      ? allTestimonials.reduce((acc, review) => acc + (review.rating || 5), 0) /
        allTestimonials.length
      : 5;

  const getDeviceName = () => {
    if (typeof service.device === "string") return service.device;
    if (service.device && service.device.name) return service.device.name;
    return "Gelişmiş Teknoloji";
  };

  const getDeviceImageUrl = () => {
    if (service.device && service.device.imageUrl) return service.device.imageUrl;
    return "https://styirqnih357hnts.public.blob.vercel-storage.com/devices%5Cfalcon-4pro-png-1757973572136.png";
  };

  // Check if device information exists
  const hasDeviceInfo = () => {
    if (!service.device) return false;
    if (typeof service.device === "string" && service.device.trim() !== "") return true;
    if (typeof service.device === "object" && service.device.name && service.device.name.trim() !== "") return true;
    return false;
  };

  return (
    <>
      <SEOHead
        title={`${service.title} - Sultanbeyli Güzellik Merkezi | Şahika Beauty`}
        description={`Sultanbeyli'de ${service.title} hizmeti. 8+ yıl deneyim, uzman kadro, son teknoloji cihazlarla güvenli uygulama. ${service.description || ''} Ücretsiz konsültasyon, şeffaf fiyatlandırma, 1000+ memnun müşteri.`}
        canonical={`/hizmetler/${service.slug}`}
        ogImage={service.image || "/og-default.png"}
        ogType="service"
        tags={[
          ...(service.keywords || []), 
          'sultanbeyli', 
          'güzellik merkezi', 
          'istanbul',
          `${service.title.toLowerCase()} sultanbeyli`,
          'şahika beauty',
          'sultanbeyli estetik',
          service.category || ''
        ]}
      />
      
      {/* Enhanced Schema Markup */}
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localBusinessSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="min-h-screen bg-background">
        {/* Enhanced Hero Section */}
        <section className="hero-gradient pt-2 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Enhanced Breadcrumb */}
              <nav className="text-sm text-muted-foreground mb-6" itemScope itemType="https://schema.org/BreadcrumbList">
                <Link href="/" itemProp="itemListElement" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                <span className="mx-2">/</span>
                <Link href="/hizmetler" itemProp="itemListElement" className="hover:text-primary transition-colors">Hizmetler</Link>
                {service.category && (
                  <>
                    <span className="mx-2">/</span>
                    <Link href={`/hizmetler?category=${service.category}`} itemProp="itemListElement" className="hover:text-primary transition-colors capitalize">{service.category}</Link>
                  </>
                )}
                <span className="mx-2">/</span>
                <span className="text-primary font-medium" itemProp="name">{service.title}</span>
              </nav>

              <h1 className="h1 text-gradient mb-6" itemProp="name">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty" itemProp="description">{service.description}</p>
              
              {/* Enhanced stats with location info */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {averageRating.toFixed(1)} ({allTestimonials.length} Sultanbeyli müşteri değerlendirmesi)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{service.duration || "30-60 dk"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Sultanbeyli Merkez</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>1000+ Memnun Müşteri</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/905304348349"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex justify-center items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Sultanbeyli'den Randevu Al
                </motion.a>
                <motion.a
                  href="tel:+905304348349"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary flex justify-center items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Hemen Ara
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            {/* Main content grid - same structure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Image section - same as original */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} - Sultanbeyli Güzellik Merkezi`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">%100 Güvenli</p>
                      <p className="text-xs text-muted-foreground">Sultanbeyli'de Sertifikalı</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content section - enhanced with SEO links */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Technology card - enhanced with location context - only show if device info exists */}
                {hasDeviceInfo() && (
                  <div className="card-professional">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold">Sultanbeyli'de Kullanılan Teknoloji</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={getDeviceImageUrl() || "/placeholder.svg"}
                          alt={`${getDeviceName()} - Sultanbeyli güzellik merkezi cihazı`}
                          fill
                          className="object-contain p-4"
                          onError={(e) => {
                            e.target.src = "/assets/devices/default.png";
                          }}
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-primary mb-2">{getDeviceName()}</h3>
                        <p className="text-muted-foreground mb-3">
                          Sultanbeyli şubemizde en son teknoloji cihazlarla güvenli ve etkili uygulama. 
                          FDA onaylı ve klinik olarak test edilmiş.
                        </p>
                        <Link 
                          href="/teknoloji" 
                          className="text-primary hover:text-secondary transition-colors text-sm font-medium"
                        >
                          Teknoloji Detayları →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Benefits with location context */}
                <div className="card-professional">
                  <h2 className="text-2xl font-semibold mb-6">Sultanbeyli Şubemizin Avantajları</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "8+ yıl Sultanbeyli'de hizmet deneyimi",
                      "Hijyenik ve güvenli ortam standardı", 
                      "Son teknoloji FDA onaylı cihazlar",
                      "Kişiye özel tedavi planı",
                      "Ücretsiz park alanı mevcut",
                      "Kolay toplu taşıma erişimi",
                      "Deneyimli uzman kadro",
                      "Seanslar arası ücretsiz kontrol"
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Process section - same as original */}
                <div className="card-professional">
                  <h2 className="text-2xl font-semibold mb-6">Uygulama Süreci</h2>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: "Ücretsiz Konsültasyon", desc: "Sultanbeyli uzmanımız ile değerlendirme ve plan" },
                      { step: 2, title: "Cilt Hazırlığı", desc: "Profesyonel temizlik ve uygulama öncesi hazırlık" },
                      { step: 3, title: "Güvenli Uygulama", desc: "Son teknoloji cihazlarla uzman uygulama" },
                      { step: 4, title: "Takip & Bakım", desc: "Uygulama sonrası bakım rehberi ve kontrolü" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service area quick links */}
                <div className="card-professional bg-gradient-to-r from-blue-50 to-purple-50 border-primary/20">
                  <h3 className="text-lg font-semibold mb-4">Hizmet Verdiğimiz Diğer Bölgeler</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Samandıra", "Pendik", "Sancaktepe", "Kurtköy"].map((location, index) => (
                      <Link
                        key={index}
                        href={`/hizmetler/${service.slug}-${location.toLowerCase()}`}
                        className="bg-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all duration-300 border border-primary/10"
                      >
                        {service.title} - {location}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Detailed Description Section */}
            {service.detailedDescription && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="card-professional bg-gradient-to-br from-white via-primary/5 to-accent/5 border-2 border-primary/10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gradient mb-2">
                          {service.title} Hakkında Detaylı Bilgi
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          Sultanbeyli'de {service.title} hizmetimiz hakkında bilmeniz gereken her şey
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div 
                      className="prose prose-lg max-w-none 
                        prose-headings:text-heading-primary prose-headings:font-bold
                        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                        prose-strong:text-primary prose-strong:font-semibold
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                        prose-li:text-gray-700 prose-li:mb-2
                        prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
                        prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4
                        prose-hr:border-primary/20 prose-hr:my-8
                        [&>h2]:text-gradient [&>h2]:font-heading
                        [&>h3]:text-primary [&>h3]:font-semibold
                        [&>p]:text-pretty
                        [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-2
                        [&>ul>li]:before:content-['✓'] [&>ul>li]:before:text-primary [&>ul>li]:before:font-bold [&>ul>li]:before:mt-1
                        [&>ol>li]:text-gray-700
                        [&>blockquote]:bg-primary/5 [&>blockquote]:p-4 [&>blockquote]:rounded-lg [&>blockquote]:border-l-4 [&>blockquote]:border-primary
                        [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
                        [&>table>thead]:bg-primary/10
                        [&>table>thead>tr>th]:p-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-primary/20
                        [&>table>tbody>tr>td]:p-3 [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-primary/20
                        [&>table>tbody>tr:nth-child(even)]:bg-primary/5"
                      dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
                    />

                    {/* Footer CTA */}
                    <div className="mt-8 pt-6 border-t border-primary/20">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
                        <div className="text-center sm:text-left">
                          <h3 className="font-semibold text-lg mb-2 text-primary">
                            {service.title} Hizmeti Hakkında Sorularınız mı Var?
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Uzman ekibimizle iletişime geçin, size özel bilgilendirme yapalım
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href="https://wa.me/905304348349"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp
                          </a>
                          <a
                            href="tel:+905304348349"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-xl font-medium hover:bg-primary/5 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            <Phone className="w-5 h-5" />
                            Hemen Ara
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Enhanced Competitive Advantages */}
            <CompetitiveAdvantages />

            {/* Service Price Comparison */}
            <ServicePriceComparison serviceName={service.slug} />

            {/* Service Area Coverage */}
            <ServiceAreaCoverage serviceName={service.slug} />

            {/* Local SEO Contact Card */}
            <LocalSEOCard />

            {/* Trust Signals */}
            <TrustSignalsSection />

            {/* Enhanced FAQ Section */}
            {service.faq && service.faq.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="h2 text-gradient mb-4">Sultanbeyli Müşterilerinden Sık Sorulan Sorular</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {service.title} hizmeti hakkında Sultanbeyli ve çevre ilçelerden gelen sorular
                  </p>
                </div>
                <div className="max-w-3xl mx-auto grid gap-6">
                  {service.faq.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card-professional"
                      itemScope 
                      itemType="https://schema.org/Question"
                    >
                      <h3 className="font-semibold text-lg mb-3 text-primary" itemProp="name">
                        {item.question}
                      </h3>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p className="text-muted-foreground leading-relaxed" itemProp="text">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Additional location-specific FAQs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="card-professional"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-primary">
                      Sultanbeyli şubede park alanı var mı?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Evet, Sultanbeyli şubemizde müşterilerimiz için ücretsiz park alanımız bulunmaktadır. 
                      Ayrıca toplu taşıma ile de kolayca ulaşabilirsiniz.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="card-professional"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-primary">
                      Sultanbeyli dışından gelenlere özel indirim var mı?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Kartal, Pendik, Maltepe gibi çevre ilçelerden gelen müşterilerimiz için özel kampanyalarımız mevcuttur. 
                      Detaylar için iletişime geçebilirsiniz.
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Enhanced Testimonials Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg mb-6">
                  <Star className="w-4 h-4 fill-white" />
                  Müşteri Deneyimleri
                </div>
                <h2 className="h2 text-gradient mb-4">Sultanbeyli Müşteri Deneyimleri</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {service.title} hizmetini Sultanbeyli şubemizde deneyimleyen müşterilerimizin gerçek yorumları ve before/after fotoğrafları
                </p>
              </div>
              
              {testimonialsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <div className="text-lg text-muted-foreground">Sultanbeyli müşteri yorumları yükleniyor...</div>
                </div>
              ) : allTestimonials.length > 0 ? (
                <div className="space-y-8">
                  {/* Before/After Gallery */}
                  {allTestimonials.some(review => review.beforeImage || review.afterImage) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="mb-12"
                    >
                      <h3 className="text-2xl font-bold text-center mb-8 text-gradient">Before & After Sonuçlar</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allTestimonials
                          .filter(review => review.beforeImage || review.afterImage)
                          .map((review, index) => (
                            <motion.div
                              key={`gallery-${review.id || index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                              <div className="grid grid-cols-2 gap-1">
                                {review.beforeImage && (
                                  <div className="relative h-48 bg-gray-100">
                                    <Image
                                      src={review.beforeImage}
                                      alt={`${service.title} öncesi - ${review.name}`}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <span className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                                        Öncesi
                                      </span>
                                    </div>
                                  </div>
                                )}
                                {review.afterImage && (
                                  <div className="relative h-48 bg-gray-100">
                                    <Image
                                      src={review.afterImage}
                                      alt={`${service.title} sonrası - ${review.name}`}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <span className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                                        Sonrası
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <div className="flex items-center gap-2 text-white">
                                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                                    {review.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm">{review.name}</p>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-3 h-3 ${
                                            i < (review.rating || 5) ? "fill-amber-400 text-amber-400" : "text-white/30"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Testimonials Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-center mb-8 text-gradient">Müşteri Yorumları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allTestimonials.map((review, index) => (
                        <motion.div
                          key={review.id || index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="group relative bg-white dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden"
                          itemScope
                          itemType="https://schema.org/Review"
                        >
                          {/* Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="relative p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                                <meta itemProp="ratingValue" content={review.rating || 5} />
                                <meta itemProp="bestRating" content="5" />
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < (review.rating || 5) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                                  Sultanbeyli
                                </span>
                                <span className="text-xs text-muted-foreground" itemProp="datePublished">
                                  {review.date || "2024"}
                                </span>
                              </div>
                            </div>
                            
                            {/* Quote */}
                            <blockquote className="text-muted-foreground italic mb-6 leading-relaxed relative" itemProp="reviewBody">
                              <div className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif">"</div>
                              <div className="relative z-10 pl-4">
                                {review.comment}
                              </div>
                              <div className="absolute -bottom-4 -right-2 text-4xl text-primary/20 font-serif">"</div>
                            </blockquote>
                            
                            {/* Author */}
                            <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                                {review.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-sm" itemProp="name">{review.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  Sultanbeyli Doğrulanmış Müşteri
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center py-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-2 border-dashed border-primary/20"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient">İlk Sultanbeyli Yorumu Siz Yapın!</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Bu hizmet için Sultanbeyli'den henüz yorum yapılmamış. Deneyiminizi paylaşın ve diğer müşterilere yardımcı olun.
                  </p>
                  <Link href="/yorum-yap" className="btn-primary inline-flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Yorum Yap
                  </Link>
                </motion.div>
              )}
            </motion.section>

            {/* Enhanced Featured Blog Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="card-professional bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg mb-4">
                    ⭐ Sultanbeyli Güzellik Merkezi Rehberi
                  </div>
                  <h2 className="h2 text-gradient mb-4">
                    {service.title} Hakkında Detaylı Bilgi
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Sultanbeyli güzellik merkezi olarak {service.title} hizmetimiz hakkında 
                    bilmeniz gereken her şeyi uzman rehberimizde bulabilirsiniz
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                      Sultanbeyli'de {service.title} için Neden Biz?
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {servicePageSEOData.businessInfo.established} yılından bu yana Sultanbeyli'de hizmet veren merkezimiz, 
                      {service.title} alanında uzmanlaşmış kadrosu ve son teknoloji cihazları ile 
                      güvenilir sonuçlar sunmaktadır. {servicePageSEOData.businessInfo.customerCount} memnun müşterimiz 
                      bizim en büyük referansımızdır.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <div className="text-2xl font-bold text-primary">{servicePageSEOData.businessInfo.rating}</div>
                        <div className="text-sm text-gray-600">Müşteri Puanı</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <div className="text-2xl font-bold text-primary">{servicePageSEOData.businessInfo.customerCount}</div>
                        <div className="text-sm text-gray-600">Memnun Müşteri</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">✨ 8+ Yıl Deneyim</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">🔬 FDA Onaylı Cihazlar</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">🛡️ Güvenli Uygulama</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">📍 Kolay Ulaşım</span>
                    </div>
                    
                    <Link 
                      href="/blog/sultanbeyli-guzellik-merkezi"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg"
                    >
                      📖 Sultanbeyli Rehberini Oku
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
                      <div className="text-6xl mb-4">🏥</div>
                      <h4 className="text-xl font-semibold mb-2">Sultanbeyli'nin Güvenilir Adresi</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        {service.title}, cilt bakımı, kalıcı makyaj ve daha fazlası için kaliteli hizmet
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-primary">
                        <MapPin className="w-4 h-4" />
                        <span>Fatih Bulvarı, Sultanbeyli</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Related Blogs with location context */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="h2 text-gradient mb-4">İlgili Blog Yazıları</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {service.title} ve Sultanbeyli güzellik merkezi hakkında detaylı bilgiler
                </p>
              </div>
              <RelatedBlogs 
                serviceCategory={service.category} 
                serviceTitle={service.title}
                location="sultanbeyli"
                limit={3}
              />
            </motion.section>

            {/* Enhanced CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="bg-gradient-to-r from-primary via-accent to-primary p-12 text-center text-white">
                <div className="relative z-10">
                  <h2 className="h2 mb-4">Sultanbeyli'de Güzellik Yolculuğunuz Başlasın</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
                    8+ yıldır Sultanbeyli'de hizmet veren uzman ekibimizle iletişime geçin. 
                    {service.title} için size özel tedavi planınızı oluşturalım. İlk konsültasyonunuz ücretsiz!
                  </p>
                  
                  {/* Enhanced contact options */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
                    <a
                      href="https://wa.me/905304348349"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white text-primary px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp'tan Randevu
                    </a>
                    <a
                      href="tel:+905304348349"
                      className="flex-1 border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Hemen Ara
                    </a>
                  </div>

                  {/* Business stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">8+</div>
                      <div className="text-sm opacity-80">Yıl Sultanbeyli'de</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">1000+</div>
                      <div className="text-sm opacity-80">Memnun Müşteri</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">4.8</div>
                      <div className="text-sm opacity-80">Müşteri Puanı</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">%100</div>
                      <div className="text-sm opacity-80">Memnuniyet</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 text-sm opacity-80">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Ücretsiz Konsültasyon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Güvenli Uygulama</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Uzman Ekip</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Ücretsiz Park</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
                </div>
              </div>
            </motion.section>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetails;