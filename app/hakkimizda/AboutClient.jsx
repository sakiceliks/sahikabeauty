"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import StatsItem from "@/components/StatsItem"
import { useState, useEffect } from "react"

const AboutClient = () => {
  const [aboutData, setAboutData] = useState({
    title: "Hakkımızda",
    subtitle: "13 Yıllık Deneyimimizle",
    description: "13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız. Doğal içerikli ürünler ve modern cihazlarla kişiye özel çözümler sunuyoruz.",
    mainImage: "/assets/about/img.jpg",
    mission: "Sultanbeyli ve çevresinde yaşayan kadınların güzellik ve bakım ihtiyaçlarını en kaliteli hizmet anlayışıyla karşılamak, modern teknoloji ve doğal ürünleri harmanlayarak cilt sağlığınızı korumaktır.",
    stats: [
      { number: "13+", label: "Yıl Deneyim" },
      { number: "35.000+", label: "Mutlu Müşteri" },
      { number: "97%", label: "Doğal İçerik" },
      { number: "100%", label: "Müşteri Memnuniyeti" }
    ],
    features: [
      {
        title: "Profesyonel Ekip",
        description: "Alanında uzman estetisyenlerimizle hizmet veriyoruz.",
        icon: "👩‍⚕️"
      },
      {
        title: "Doğal Ürünler",
        description: "%97 doğal içerikli ürünlerle cilt sağlığınızı koruyoruz.",
        icon: "🌿"
      },
      {
        title: "Modern Teknoloji",
        description: "En son teknoloji cihazlarla profesyonel hizmet sunuyoruz.",
        icon: "⚡"
      }
    ],
    whyChooseUs: [
      "13 yıllık sektör deneyimi ve uzman kadro",
      "%97 doğal içerikli, cilt dostu ürünler",
      "Kişiye özel bakım programları",
      "Modern cihazlar ve hijyenik ortam",
      "Uygun fiyat politikası"
    ],
    address: "Abdurrahmangazi, Fatih Blv. No:73/1, Sultanbeyli/İstanbul",
    phone: "+90 530 434 83 49",
    email: "info@sultanbeyliguzellikmerkezi.com.tr",
    foundingYear: "2011",
    socialMedia: {
      instagram: "https://www.instagram.com/sahikabeauty",
      whatsapp: "https://wa.me/905304348349"
    }
  })

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/about")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAboutData(data.data)
        }
      }
    } catch (error) {
      console.error("Hakkımızda verileri yüklenirken hata:", error)
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Şahika Beauty Güzellik Merkezi",
            description: aboutData.description,
            url: "https://sultanbeyliguzellikmerkezi.com.tr",
            logo: aboutData.mainImage,
            foundingDate: aboutData.foundingYear,
            address: {
              "@type": "PostalAddress",
              streetAddress: aboutData.address,
              addressLocality: "Sultanbeyli",
              addressRegion: "İstanbul",
              postalCode: "34920",
              addressCountry: "TR",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: aboutData.phone,
              contactType: "customer service",
              availableLanguage: "Turkish",
            },
            sameAs: ["https://www.instagram.com/sahikabeauty", "https://wa.me/905304348349"],
          }),
        }}
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="min-h-screen flex items-center overflow-x-hidden"
      >
        <div className="container mx-auto flex items-center pt-32 pb-12 xl:pt-32 xl:pb-0">
          <div className="w-full h-full flex flex-col xl:flex-row items-center justify-between">
            {/* Görsel */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.4, duration: 0.8, ease: "easeInOut" },
              }}
              className="relative w-[304px] h-[423px] xl:w-[384px] xl:h-[534px] mb-8 xl:mx-0"
            >
              <Image
                src={aboutData.mainImage}
                fill
                quality={100}
                priority
                alt="Profesyonel cilt bakımı ve güzellik merkezi"
                className="object-contain"
              />
            </motion.div>

            {/* Metin */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.6, duration: 0.8, ease: "easeInOut" },
              }}
              className="flex flex-col items-start xl:max-w-[650px] text-center xl:text-left mx-auto xl:mx-0"
            >
              <h1 className="h2 mb-6 mx-auto max-w-[540px] xl:max-w-none">
                {aboutData.title}
              </h1>
              <p className="lead max-w-[600px] mx-auto xl:mx-0 mb-6">
                {aboutData.subtitle}
              </p>
              <p className="text-lg text-gray-600 max-w-[600px] mx-auto xl:mx-0 mb-6">
                {aboutData.description}
              </p>

              <div className="max-w-[600px] mx-auto xl:mx-0 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#000000]">Misyonumuz</h2>
                <p className="text-[#808080] leading-relaxed mb-6">
                  {aboutData.mission}
                </p>

                <h3 className="text-xl font-semibold mb-4 text-[#000000]">Neden Bizi Tercih Etmelisiniz?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aboutData.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-[30px] mb-14 mx-auto xl:mx-0">
                {aboutData.stats.map((stat, index) => (
                  <div key={index}>
                    <StatsItem 
                      countNum={parseInt(stat.number.replace(/[^\d]/g, ''))} 
                      countText={stat.number.replace(/[\d]/g, '')} 
                      text={stat.label} 
                    />
                  </div>
                ))}
              </div>

              {/* Buton */}
              <a href="/iletisim">
                <button className="btn mx-auto xl:mx-0">Bizimle İletişime Geçin</button>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default AboutClient
