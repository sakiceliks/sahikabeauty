"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import StatsItem from "@/components/StatsItem"

const AboutClient = () => {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Şahika Beauty Güzellik Merkezi",
            description:
              "13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız.",
            url: "https://sultanbeyliguzellikmerkezi.com.tr",
            logo: "/assets/about/img.jpg",
            foundingDate: "2011",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Abdurrahmangazi, Fatih Blv. No:73/1",
              addressLocality: "Sultanbeyli",
              addressRegion: "İstanbul",
              postalCode: "34920",
              addressCountry: "TR",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+90 530 434 83 49",
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
                src="/assets/about/img.jpg"
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
                Cilt Sağlığınız ve Güzelliğiniz İçin Profesyonel Hizmet
              </h1>
              <p className="lead max-w-[600px] mx-auto xl:mx-0 mb-6">
                13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız.
                Doğal içerikli ürünler ve modern cihazlarla kişiye özel çözümler sunuyoruz.
              </p>

              <div className="max-w-[600px] mx-auto xl:mx-0 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#000000]">Misyonumuz</h2>
                <p className="text-[#808080] leading-relaxed mb-6">
                  Sultanbeyli ve çevresinde yaşayan kadınların güzellik ve bakım ihtiyaçlarını en kaliteli hizmet
                  anlayışıyla karşılamak, modern teknoloji ve doğal ürünleri harmanlayarak cilt sağlığınızı korumaktır.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-[#000000]">Neden Bizi Tercih Etmelisiniz?</h3>
                <ul className="text-[#808080] leading-relaxed space-y-2">
                  <li>• 13 yıllık sektör deneyimi ve uzman kadro</li>
                  <li>• %97 doğal içerikli, cilt dostu ürünler</li>
                  <li>• Kişiye özel bakım programları</li>
                  <li>• Modern cihazlar ve hijyenik ortam</li>
                  <li>• Uygun fiyat politikası</li>
                </ul>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-[30px] mb-14 mx-auto xl:mx-0">
                <div>
                  <StatsItem countNum={13} text="Yıllık Deneyim" />
                </div>
                <div>
                  <StatsItem countNum={35} countText="k+" text="Mutlu Müşteri" />
                </div>
                <div>
                  <StatsItem countNum={97} countText="%" text="Doğal İçerik" />
                </div>
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
