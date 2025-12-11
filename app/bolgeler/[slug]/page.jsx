import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ContactButton from '@/app/components/ContactButton'
import { MapPin, Phone, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react'
import JsonLd from '@/components/JsonLd'

// Bölge verileri
const regionData = {
  'sultanbeyli': {
    name: 'Sultanbeyli',
    title: 'Sultanbeyli Güzellik Merkezi',
    description: 'Sultanbeyli\'de profesyonel güzellik hizmetleri. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve daha fazlası.',
    image: '/assets/home/img.png',
    address: 'Sultanbeyli, İstanbul',
    phone: '0530 434 83 49',
    hours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
    services: [
      'Lazer Epilasyon',
      'Cilt Bakımı', 
      'Kalıcı Makyaj',
      'Bölgesel İncelme',
      'Tırnak & Kirpik'
    ],
    features: [
      'Uzman Kadro',
      'Modern Teknoloji',
      'Hijyenik Ortam',
      'Uygun Fiyatlar'
    ],
    coordinates: {
      lat: 40.9923,
      lng: 29.2044
    }
  },
  'samandira': {
    name: 'Samandıra',
    title: 'Samandıra Güzellik Merkezi',
    description: 'Samandıra\'da kaliteli güzellik hizmetleri. Lazer epilasyon, cilt bakımı ve kalıcı makyaj uzman ekibimizle.',
    image: '/assets/home/img.png',
    address: 'Samandıra, İstanbul',
    phone: '0530 434 83 49',
    hours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
    services: [
      'Lazer Epilasyon',
      'Cilt Bakımı',
      'Kalıcı Makyaj',
      'Bölgesel İncelme'
    ],
    features: [
      'Profesyonel Hizmet',
      'Son Teknoloji',
      'Temiz Ortam',
      'Rezervasyon Kolaylığı'
    ],
    coordinates: {
      lat: 40.9923,
      lng: 29.2044
    }
  },
  'pendik': {
    name: 'Pendik',
    title: 'Pendik Güzellik Merkezi',
    description: 'Pendik\'te güvenilir güzellik hizmetleri. Lazer epilasyon, cilt bakımı ve kalıcı makyaj deneyimli ekibimizle.',
    image: '/assets/home/img.png',
    address: 'Pendik, İstanbul',
    phone: '0530 434 83 49',
    hours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
    services: [
      'Lazer Epilasyon',
      'Cilt Bakımı',
      'Kalıcı Makyaj',
      'Bölgesel İncelme'
    ],
    features: [
      'Deneyimli Ekip',
      'Modern Cihazlar',
      'Hijyenik Ortam',
      'Uygun Fiyatlar'
    ],
    coordinates: {
      lat: 40.9923,
      lng: 29.2044
    }
  },
  'sancaktepe': {
    name: 'Sancaktepe',
    title: 'Sancaktepe Güzellik Merkezi',
    description: 'Sancaktepe\'de kaliteli güzellik hizmetleri. Lazer epilasyon, cilt bakımı ve kalıcı makyaj uzman kadromuzla.',
    image: '/assets/home/img.png',
    address: 'Sancaktepe, İstanbul',
    phone: '0530 434 83 49',
    hours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
    services: [
      'Lazer Epilasyon',
      'Cilt Bakımı',
      'Kalıcı Makyaj',
      'Bölgesel İncelme'
    ],
    features: [
      'Uzman Kadro',
      'Son Teknoloji',
      'Temiz Ortam',
      'Rezervasyon Kolaylığı'
    ],
    coordinates: {
      lat: 40.9923,
      lng: 29.2044
    }
  },
  'kurtkoy': {
    name: 'Kurtköy',
    title: 'Kurtköy Güzellik Merkezi',
    description: 'Kurtköy\'de profesyonel güzellik hizmetleri. Lazer epilasyon, cilt bakımı ve kalıcı makyaj deneyimli ekibimizle.',
    image: '/assets/home/img.png',
    address: 'Kurtköy, İstanbul',
    phone: '0530 434 83 49',
    hours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
    services: [
      'Lazer Epilasyon',
      'Cilt Bakımı',
      'Kalıcı Makyaj',
      'Bölgesel İncelme'
    ],
    features: [
      'Profesyonel Hizmet',
      'Modern Cihazlar',
      'Hijyenik Ortam',
      'Uygun Fiyatlar'
    ],
    coordinates: {
      lat: 40.9923,
      lng: 29.2044
    }
  }
}

// Metadata oluşturma
export async function generateMetadata({ params }) {
  const region = regionData[params.slug]
  
  if (!region) {
    return {
      title: 'Bölge Bulunamadı | Şahika Beauty',
      description: 'Aradığınız bölge bulunamadı.'
    }
  }

  return {
    title: `${region.title} | ${region.name} Güzellik Hizmetleri - Şahika Beauty`,
    description: region.description,
    keywords: [
      `${region.name} güzellik merkezi`,
      `${region.name} lazer epilasyon`,
      `${region.name} cilt bakımı`,
      `${region.name} kalıcı makyaj`,
      `${region.name} bölgesel incelme`,
      'Şahika Beauty',
      'güzellik hizmetleri'
    ].join(', '),
    openGraph: {
      title: `${region.title} | Şahika Beauty`,
      description: region.description,
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Şahika Beauty',
      images: [
        {
          url: region.image,
          width: 1200,
          height: 630,
          alt: region.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${region.title} | Şahika Beauty`,
      description: region.description,
      images: [region.image]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// JSON-LD Schema oluşturma
const generateLocalBusinessSchema = (region) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `https://sultanbeyliguzellikmerkezi.com.tr/bolgeler/${region.name.toLowerCase()}`,
  "name": region.title,
  "alternateName": `Şahika Beauty ${region.name}`,
  "description": region.description,
  "url": `https://sultanbeyliguzellikmerkezi.com.tr/bolgeler/${region.name.toLowerCase()}`,
  "telephone": region.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": region.address,
    "addressLocality": region.name,
    "addressRegion": "İstanbul",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": region.coordinates.lat,
    "longitude": region.coordinates.lng
  },
  "openingHours": "Mo-Sa 09:00-19:00",
  "image": region.image,
  "logo": "https://sultanbeyliguzellikmerkezi.com.tr/logo.png",
  "sameAs": [
    "https://www.instagram.com/sahikabeauty",
    "https://www.facebook.com/sahikabeauty"
  ],
  "priceRange": "$$",
  "currenciesAccepted": "TRY",
  "paymentAccepted": "Cash, Credit Card",
  "areaServed": {
    "@type": "City",
    "name": region.name
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": region.coordinates.lat,
      "longitude": region.coordinates.lng
    },
    "geoRadius": "10000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Güzellik Hizmetleri",
    "itemListElement": region.services.map((service, index) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service
      }
    }))
  }
})

const generateBreadcrumbSchema = (region) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://sultanbeyliguzellikmerkezi.com.tr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Bölgeler",
      "item": "https://sultanbeyliguzellikmerkezi.com.tr/bolgeler"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": region.name,
      "item": `https://sultanbeyliguzellikmerkezi.com.tr/bolgeler/${region.name.toLowerCase()}`
    }
  ]
})

const generateFAQSchema = (region) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": `${region.name} güzellik merkezinde hangi hizmetler sunuluyor?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${region.name} şubemizde lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme ve tırnak-kirpik hizmetleri sunuyoruz. Tüm hizmetlerimiz uzman kadromuz tarafından son teknoloji cihazlarla gerçekleştirilir.`
      }
    },
    {
      "@type": "Question",
      "name": `${region.name} şubesinden nasıl randevu alabilirim?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Online randevu sistemimizi kullanarak 7/24 randevu alabilir, telefon ile arayabilir veya WhatsApp üzerinden iletişime geçebilirsiniz. Acil durumlar için aynı gün randevu imkanı da mevcuttur."
      }
    },
    {
      "@type": "Question",
      "name": `${region.name} güzellik merkezi fiyatları nasıl?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Şahika Beauty olarak en uygun fiyatlarla kaliteli hizmet sunuyoruz. Fiyatlarımız şeffaf olup, paket indirimleri ve kampanyalarımızla daha da avantajlı hale geliyor."
      }
    }
  ]
})

// Ana sayfa komponenti
export default function RegionPage({ params }) {
  const region = regionData[params.slug]
  
  if (!region) {
    notFound()
  }

  const localBusinessSchema = generateLocalBusinessSchema(region)
  const breadcrumbSchema = generateBreadcrumbSchema(region)
  const faqSchema = generateFAQSchema(region)

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {region.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {region.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/rezervasyon"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Randevu Al
                </Link>
                <ContactButton
                  type="phone"
                  phoneNumber="905304348349"
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
                  trackingLabel="bolgeler_hero_phone"
                >
                  Hemen Ara
                </ContactButton>
              </div>
            </div>
          </div>
        </section>

        {/* Hizmetler Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-heading-primary">
                {region.name} Hizmetlerimiz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {region.services.map((service, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service}</h3>
                      <p className="text-gray-600">
                        {region.name} şubemizde {service.toLowerCase()} hizmeti uzman kadromuzla sunulmaktadır.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Özellikler Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-heading-secondary">
                Neden {region.name} Şahika Beauty?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {region.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                    <p className="text-gray-600 text-sm">
                      {region.name} şubemizde {feature.toLowerCase()} konusunda uzmanız.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* İletişim Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-heading-accent">
                {region.name} İletişim Bilgileri
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Adres</h3>
                        <p className="text-gray-600">{region.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Telefon</h3>
                        <p className="text-gray-600">{region.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Çalışma Saatleri</h3>
                        <p className="text-gray-600">{region.hours}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Link 
                      href="/rezervasyon"
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center block"
                    >
                      Online Randevu Al
                    </Link>
                    <ContactButton
                      type="phone"
                      phoneNumber="905304348349"
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-green-600 text-green-600 py-4 px-6 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors text-center block"
                      trackingLabel="bolgeler_sidebar_phone"
                    >
                      Telefon ile Randevu
                    </ContactButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diğer Bölgeler Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-heading-primary">
                Diğer Hizmet Bölgelerimiz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(regionData)
                  .filter(([slug]) => slug !== params.slug)
                  .map(([slug, data]) => (
                    <Link 
                      key={slug}
                      href={`/bolgeler/${slug}`}
                      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold group-hover:text-green-600 transition-colors">
                          {data.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{data.description}</p>
                      <div className="flex items-center text-green-600 font-medium">
                        Detayları Gör
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

// Static generation için bölge listesi
export async function generateStaticParams() {
  return Object.keys(regionData).map((slug) => ({
    slug: slug,
  }))
}
