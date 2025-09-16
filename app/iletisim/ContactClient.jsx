"use client"
import { motion } from "framer-motion"
import { useContext } from "react"
import Image from "next/image"
import { CursorContext } from "@/components/CursorContext"
import Form from "@/components/Form"

const ContactClient = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)

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
            sameAs: ["https://www.instagram.com/sahikabeauty", "https://wa.me/905304348349"],
          }),
        }}
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="min-h-screen flex items-center overflow-x-hidden"
      >
        <div className="container mx-auto pt-32 pb-12 xl:pt-32 xl:pb-0">
          <div className="flex flex-col gap-12 xl:flex-row h-full">
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
              className="flex-1 flex flex-col justify-center"
            >
              <h1 className="h3 mb-8 text-center xl:text-left">İletişim Bilgileri</h1>
              <div className="flex flex-col items-center xl:items-start gap-12">
                {/* Adres */}
                <div className="flex items-start gap-4">
                  <div className="relative w-[36px] h-[36px]">
                    <Image src="/assets/contact/pin.svg" fill alt="Adres konum ikonu" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h2 className="h4 mb-2">Adres</h2>
                    <p className="leading-relaxed">
                      Abdurrahmangazi, Fatih Blv. No:73/1 <br />
                      34920 Sultanbeyli/İstanbul
                    </p>
                  </div>
                </div>
                {/* Telefon */}
                <div className="flex items-start gap-4">
                  <div className="relative w-[36px] h-[36px]">
                    <Image src="/assets/contact/phone.svg" fill alt="Telefon ikonu" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h3 className="h4 mb-2">Telefon Numarası</h3>
                    <div className="pt-1 flex-1">
                      <p>
                        Tel:{" "}
                        <a
                          href="tel:+905304348349"
                          className="text-[#174067] underline hover:no-underline transition-all"
                        >
                          0530 434 83 49
                        </a>
                      </p>
                      <p className="mt-2">
                        <a
                          href="https://wa.me/905304348349"
                          className="text-green-600 underline hover:no-underline transition-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp ile iletişime geç
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="relative w-[36px] h-[36px]">
                    <Image src="/assets/contact/email.svg" fill alt="E-posta ikonu" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="h4 mb-2">E-posta Adresi</h4>
                    <div className="flex flex-col gap-1">
                      <p>
                        <a
                          href="mailto:info@sultanbeyliguzellikmerkezi.com.tr"
                          className="text-[#174067] underline hover:no-underline transition-all"
                        >
                          info@sultanbeyliguzellikmerkezi.com.tr
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="relative w-[36px] h-[36px]">
                    <Image src="/assets/contact/clock.svg" fill alt="Çalışma saatleri ikonu" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h5 className="h4 mb-2">Çalışma Saatleri</h5>
                    <div className="flex flex-col gap-1">
                      <p>Pazartesi - Cumartesi: 09:00 - 19:00</p>
                      <p>Pazar: Kapalı</p>
                    </div>
                  </div>
                </div>
              </div>
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
              className="flex-1"
            >
              <div className="bg-[#E0E0E0] w-full max-w-[580px] gap-4 p-10 mx-auto xl:mx-0 rounded-2xl shadow-lg">
                <h3 className="h3 mb-8 text-center text-[#000000]">Bize Ulaşın</h3>
                <Form />
              </div>
            </motion.div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-12 w-full h-[300px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Abdurrahmangazi,+Fatih+Blv.+No:73/1,+34920+Sultanbeyli/İstanbul&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Şahika Beauty Güzellik Merkezi Konum"
            ></iframe>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default ContactClient
