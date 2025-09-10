"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { CursorContext } from "@/components/CursorContext";
import StatsItem from "@/components/StatsItem";

const About = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      className="min-h-screen flex items-center overflow-x-hidden"
    >
      <div className="container mx-auto flex items-center pt-32 pb-12 xl:pt-32 xl:pb-0">
        <div className="w-full h-full flex flex-col xl:flex-row items-center justify-between">
          {/* Görsel */}
          <motion.div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
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
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            initial={{ opacity: 0, x: 60 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.6, duration: 0.8, ease: "easeInOut" },
            }}
            className="flex flex-col items-start xl:max-w-[650px] text-center xl:text-left mx-auto xl:mx-0"
          >
            <h2 className="h2 mb-6 mx-auto max-w-[540px] xl:max-w-none">
              Cilt Sağlığınız ve Güzelliğiniz İçin Profesyonel Hizmet
            </h2>
            <p className="lead max-w-[600px] mx-auto xl:mx-0">
              13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi
              ön plana çıkarmak için buradayız. Doğal içerikli ürünler ve modern
              cihazlarla kişiye özel çözümler sunuyoruz.
            </p>

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
              <button className="btn mx-auto xl:mx-0">
                Bizimle İletişime Geçin
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
