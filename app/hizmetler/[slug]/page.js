"use client"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Clock, Award, CheckCircle, Phone, MessageCircle, Shield, Users, Sparkles } from "lucide-react"
import { services } from "@/data/services"
import JsonLd from "@/components/JsonLd"
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schemas"
import { useState, useEffect } from "react"

const ServiceDetails = () => {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const [dbTestimonials, setDbTestimonials] = useState([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  useEffect(() => {
    if (service) {
      fetchTestimonials()
    }
  }, [service])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/testimonial?serviceId=${service.id}&approved=true`)
      const data = await response.json()

      if (data.success) {
        setDbTestimonials(data.data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setTestimonialsLoading(false)
    }
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
    )
  }

  const serviceSchema = generateServiceSchema(service)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetler", url: "/hizmetler" },
    { name: service.category, url: `/hizmetler?category=${service.category}` },
    { name: service.title },
  ])

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
  ]

  const averageRating =
    allTestimonials.length > 0
      ? allTestimonials.reduce((acc, review) => acc + (review.rating || 5), 0) / allTestimonials.length
      : 5

  const getDeviceName = () => {
    if (typeof service.device === "string") return service.device
    if (service.device && service.device.name) return service.device.name
    return "Gelişmiş Teknoloji"
  }

  const getDeviceImageUrl = () => {
    if (service.device && service.device.imageUrl) return service.device.imageUrl
    return "https://styirqnih357hnts.public.blob.vercel-storage.com/devices%5Cfalcon-4pro-png-1757973572136.png"
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-background">
        <section className="hero-gradient pt-32 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Breadcrumb */}
              <nav className="text-sm text-muted-foreground mb-6">
                <span>Ana Sayfa</span>
                <span className="mx-2">/</span>
                <span>Hizmetler</span>
                <span className="mx-2">/</span>
                <span className="text-primary font-medium">{service.category}</span>
              </nav>

              {/* Title */}
              <h1 className="h1 text-gradient mb-6">{service.title}</h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">{service.description}</p>

              {/* Rating & Stats */}
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
                    {averageRating.toFixed(1)} ({allTestimonials.length} değerlendirme)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{service.duration || "30-60 dk"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>1000+ Memnun Müşteri</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex justify-evenly"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hemen Randevu Al
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex justify-evenly"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Bilgi Al
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Service Image */}
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
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">%100 Güvenli</p>
                      <p className="text-xs text-muted-foreground">Sertifikalı Uygulama</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Service Information */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Technology Card */}
                <div className="card-professional">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Kullanılan Teknoloji</h2>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={getDeviceImageUrl() || "/placeholder.svg"}
                        alt={getDeviceName()}
                        fill
                        className="object-contain p-4"
                        onError={(e) => {
                          e.target.src = "/assets/devices/default.png"
                        }}
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-primary mb-2">{getDeviceName()}</h3>
                      <p className="text-muted-foreground">
                        En son teknoloji cihazlarla güvenli ve etkili uygulama. FDA onaylı ve klinik olarak test
                        edilmiş.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="card-professional">
                  <h2 className="text-2xl font-semibold mb-6">Avantajlar</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(
                      service.benefits || [
                        "Uzman ekip tarafından uygulama",
                        "Hijyenik ve güvenli ortam",
                        "Son teknoloji cihazlar",
                        "Kişiye özel tedavi planı",
                      ]
                    ).map((benefit, index) => (
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

                {/* Process Steps */}
                <div className="card-professional">
                  <h2 className="text-2xl font-semibold mb-6">Uygulama Süreci</h2>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: "Konsültasyon", desc: "Uzman değerlendirmesi ve plan oluşturma" },
                      { step: 2, title: "Hazırlık", desc: "Cilt temizliği ve uygulama öncesi hazırlık" },
                      { step: 3, title: "Uygulama", desc: "Profesyonel cihazlarla güvenli uygulama" },
                      { step: 4, title: "Bakım", desc: "Uygulama sonrası bakım ve takip" },
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
              </motion.div>
            </div>

            {service.faq && service.faq.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="h2 text-gradient mb-4">Sık Sorulan Sorular</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Hizmetimiz hakkında merak ettiğiniz soruların yanıtları
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
                    >
                      <h3 className="font-semibold text-lg mb-3 text-primary">{item.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="h2 text-gradient mb-4">Müşteri Deneyimleri</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hizmetimizi deneyimleyen müşterilerimizin görüşleri ve sonuçları
                </p>
              </div>

              {testimonialsLoading ? (
                <div className="text-center py-8">
                  <div className="text-lg">Yorumlar yükleniyor...</div>
                </div>
              ) : allTestimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTestimonials.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card-professional group hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (review.rating || 5) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date || "2024"}</span>
                      </div>

                      <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                        "{review.comment}"
                      </blockquote>

                      {(review.beforeImage || review.afterImage) && (
                        <div className="mb-4">
                          <div className="grid grid-cols-2 gap-2">
                            {review.beforeImage && (
                              <div>
                                <p className="text-xs font-medium mb-1 text-center">Öncesi</p>
                                <div className="relative w-full h-24 rounded-md overflow-hidden">
                                  <Image
                                    src={review.beforeImage || "/placeholder.svg"}
                                    alt="Before"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            )}
                            {review.afterImage && (
                              <div>
                                <p className="text-xs font-medium mb-1 text-center">Sonrası</p>
                                <div className="relative w-full h-24 rounded-md overflow-hidden">
                                  <Image
                                    src={review.afterImage || "/placeholder.svg"}
                                    alt="After"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.name}</p>
                          <p className="text-xs text-muted-foreground">Doğrulanmış Müşteri</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 card-professional">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">İlk Yorumu Siz Yapın!</h3>
                  <p className="text-muted-foreground mb-6">
                    Bu hizmet için henüz yorum yapılmamış. Deneyiminizi paylaşın.
                  </p>
                  <button className="btn-primary">Yorum Yap</button>
                </div>
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="bg-gradient-to-r from-primary via-accent to-primary p-12 text-center text-white">
                <div className="relative z-10">
                  <h2 className="h2 mb-4">Hemen Başlayın</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
                    Uzman ekibimizle iletişime geçin ve size özel tedavi planınızı oluşturalım. İlk konsültasyonunuz
                    ücretsiz!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <a
                      href="https://wa.me/905304348349"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white text-primary px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:+905304348349"
                      className="flex-1 border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Ara
                    </a>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-80">
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
                  </div>
                </div>

                {/* Background decoration */}
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
  )
}

export default ServiceDetails
