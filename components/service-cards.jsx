"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    id: 1,
    title: "UZMANA SOR",
    scriptText: "Şahika Beauty",
    description: "Tüm operasyonlarımız hakkında aradığınız bilgiyi uzmanımıza sorabilirsiniz.",
    buttonText: "UZMANA SORUN",
    link: "https://wa.me/905304348349",
    bgColor: "bg-white",
    textColor: "text-gray-800",
    scriptColor: "text-blue-600",
    buttonStyle: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  },
  {
    id: 2,
    title: "ONLİNE RANDEVU",
    scriptText: "Şahika Beauty",
    description: "Size bilgilerinizi gönderebilir ya da arayarak ücretsiz randevu kaydı oluşturabilirsiniz.",
    buttonText: "RANDEVU AL",
    link: "/rezervasyon",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    scriptColor: "text-blue-600",
    buttonStyle: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  },
  {
    id: 3,
    title: "İLETİŞİME GEÇİN",
    scriptText: "Şahika Beauty",
    description: "Bizimle iletişime geçebilir, operasyon hakkında detaylı bilgi alabilirsiniz.",
    buttonText: "İLETİŞİM BİLGİLERİ",
    link: "/iletisim",
    bgColor: "bg-black",
    textColor: "text-white",
    scriptColor: "text-white",
    buttonStyle: "border-blue-400 text-white hover:bg-blue-400 hover:text-white",
  },
]

export default function ServiceCards() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="px-4 md:px-8 py-12 md:py-16" 
      aria-label="Hizmet kartları"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="h-full"
          >
            <Card
              className={`${service.bgColor} dark:bg-card dark:border-border border-0 hover:shadow-lg transition-all duration-300 h-full`}
            >
            <CardContent className="p-6 md:p-8 text-center">
              <p className={`text-xl md:text-2xl font-light italic ${service.scriptColor} dark:text-primary mb-2`}>
                {service.scriptText}
              </p>
              <h3 className={`text-lg md:text-xl font-bold tracking-wider mb-4 md:mb-6 ${service.textColor} dark:text-card-foreground`}>
                {service.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-6 md:mb-8 ${
                  service.textColor === "text-white" ? "text-gray-300 dark:text-muted-foreground" : "text-gray-600 dark:text-muted-foreground"
                }`}
              >
                {service.description}
              </p>
              <Link
                href={service.link}
                target={service.id === 1 ? "_blank" : "_self"}
                aria-label={`${service.title} - ${service.buttonText}`}
              >
                <Button
                  variant="outline"
                  className={`${service.buttonStyle} dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground tracking-wider font-light bg-transparent text-xs md:text-sm px-4 md:px-6 py-2 min-h-[44px] transition-all duration-300`}
                >
                  {service.buttonText}
                </Button>
              </Link>
            </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
