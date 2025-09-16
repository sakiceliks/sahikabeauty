"use client"
import { motion } from "framer-motion"
import { useContext } from "react"
import Image from "next/image"
import { CursorContext } from "@/components/CursorContext"
import Form from "@/components/Form"
import { Clock, MapPin, Phone, Mail, MessageCircle } from "lucide-react"

const ContactClient = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)

  // Contact information data
  const contactInfo = [
    {
      icon: <MapPin className="w-7 h-7 text-blue-600" />,
      title: "Adres",
      content: (
        <div>
          <p className="leading-relaxed text-gray-700">
            Abdurrahmangazi, Fatih Blv. No:73/1
          </p>
          <p className="leading-relaxed text-gray-700">
            34920 Sultanbeyli/İstanbul
          </p>
        </div>
      ),
    },
    {
      icon: <Phone className="w-7 h-7 text-green-600" />,
      title: "Telefon",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">
            <a
              href="tel:+905304348349"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
            >
              0530 434 83 49
            </a>
          </p>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <a
              href="https://wa.me/905304348349"
              className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200 hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ile mesaj gönder
            </a>
          </div>
        </div>
      ),
    },
    {
      icon: <Mail className="w-7 h-7 text-purple-600" />,
      title: "E-posta",
      content: (
        <p className="text-gray-700">
          <a
            href="mailto:info@sultanbeyliguzellikmerkezi.com.tr"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline break-all"
          >
            info@sultanbeyliguzellikmerkezi.com.tr
          </a>
        </p>
      ),
    },
    {
      icon: <Clock className="w-7 h-7 text-orange-600" />,
      title: "Çalışma Saatleri",
      content: (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Pazartesi - Cumartesi:</span>
            <span className="text-gray-900 font-semibold">09:00 - 19:00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Pazar:</span>
            <span className="text-red-600 font-semibold">Kapalı</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      {/* JSON-LD LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            name: "Şahika Beauty Güzellik Salonu",
            image: "/assets/about/img.jpg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Abdurrahmangazi, Fatih Blv. No:73/1",
              addressLocality: "Sultanbeyli",
              addressRegion: "İstanbul",
              postalCode: "34920",
              addressCountry: "TR",
            },
            telephone: "+90 530 434 83 49",
            url: "https://sultanbeyliguzellikmerkezi.com.tr/iletisim",
            openingHours: ["Mo-Sa 09:00-19:00"],
            priceRange: "$$",
            geo: {
              "@type": "GeoCoordinates",
              latitude: "40.9607",
              longitude: "29.2675",
            },
            sameAs: [
              "https://www.instagram.com/sahikabeauty",
              "https://wa.me/905304348349",
            ],
          }),
        }}
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.8 } }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 lg:pt-32 lg:pb-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.6 },
            }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              İletişime Geçin
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Güzellik ve bakım ihtiyaçlarınız için bizimle iletişime geçin. 
              Size en iyi hizmeti sunmak için buradayız.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* İletişim Bilgileri */}
            <motion.div
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
              initial={{ opacity: 0, x: -60 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.4, duration: 0.8, ease: "easeInOut" },
              }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                  İletişim Bilgileri
                </h2>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.5 + index * 0.1, duration: 0.6 },
                      }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.content}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.8, duration: 0.6 },
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white text-center"
              >
                <h3 className="text-xl font-semibold mb-4">Sosyal Medyada Takip Edin</h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.instagram.com/sahikabeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Instagram sayfamızı ziyaret edin"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* İletişim Formu */}
            <motion.div
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
              initial={{ opacity: 0, x: 60 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.6, duration: 0.8, ease: "easeInOut" },
              }}
              className="lg:sticky lg:top-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Bize Mesaj Gönderin
                  </h3>
                  <p className="text-gray-600">
                    Sorularınız için formu doldurun, size en kısa sürede dönüş yapalım.
                  </p>
                </div>
                <Form />
              </div>
            </motion.div>
          </div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 0.8 },
            }}
            className="mt-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Konumumuz
              </h3>
              <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8234567890123!2d29.2675!3d40.9607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU3JzM4LjUiTiAyOcKwMTYnMDMuMCJF!5e0!3m2!1str!2str!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Şahika Beauty Güzellik Merkezi Konum Haritası"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Harita üzerine tıklayarak detaylı yön tarifi alabilirsiniz
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}

export default ContactClient