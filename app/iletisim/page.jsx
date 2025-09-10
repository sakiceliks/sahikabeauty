"use client";
import { motion } from "framer-motion";
import { useContext } from "react";
import Image from "next/image";
import { CursorContext } from "@/components/CursorContext";
import Form from "@/components/Form";

const Contact = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);

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
              <h3 className="h3 mb-8 text-center xl:text-left">
                İletişim Bilgileri
              </h3>
              <div className="flex flex-col items-center xl:items-start gap-12">
                {/* Adres */}
                <div className="flex items-start gap-4">
                  <div className="relative w-[36px] h-[36px]">
                    <Image
                      src="/assets/contact/pin.svg"
                      fill
                      alt="Adres konum ikonu"
                    />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="h4 mb-2">Adres</h4>
                    <p className="leading-relaxed">
                      Abdurrahmangazi, Fatih Blv. No:73/1 <br />
                      34920 Sultanbeyli/İstanbul
                    </p>
                  </div>
                </div>
                {/* Telefon */}
                <div className="flex items-start gap-4">
                  <div className="relative w-[36px] h-[36px]">
                    <Image
                      src="/assets/contact/phone.svg"
                      fill
                      alt="Telefon ikonu"
                    />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="h4 mb-2">Telefon Numarası</h4>
                    <div className="pt-1 flex-1">
                      <p>
                        Tel:{" "}
                        <a
                          href="tel:+905304348349"
                          className="text-blue-600 underline"
                        >
                          0530 434 83 49
                        </a>
                      </p>
                      <p>
                        <a
                          href="https://wa.me/905304348349"
                          className="text-green-600 underline"
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
                    <Image
                      src="/assets/contact/email.svg"
                      fill
                      alt="E-posta ikonu"
                    />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="h4 mb-2">E-posta Adresi</h4>
                    <div className="flex flex-col gap-1">
                      <p>
                        <a
                          href="mailto:info@merkeziniz.com"
                          className="text-blue-600 underline"
                        >
                          info@sultanbeyliguzellikmerkezi.com.tr
                        </a>
                      </p>
                      <p>
                        <a
                          href="mailto:destek@merkeziniz.com"
                          className="text-blue-600 underline"
                        >
                          destek@merkeziniz.com
                        </a>
                      </p>
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
              <div className="bg-[#f0cfbc] w-full max-w-[580px] gap-4 p-10 mx-auto xl:mx-0 rounded-2xl shadow-lg">
                <h3 className="h3 mb-8 text-center">Bize Ulaşın</h3>
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
            ></iframe>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;
