"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Clock, Users, Award, CheckCircle } from "lucide-react";
import { services } from "@/data/services";

const ServiceDetails = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Hizmet bulunamadı.</p>
      </div>
    );
  }

  // Ortalama puan hesaplama (eğer reviews'da rating varsa)
  const averageRating = service.reviews?.length > 0
    ? service.reviews.reduce((acc, review) => acc + (review.rating || 5), 0) / service.reviews.length
    : 5;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      className="min-h-screen overflow-x-hidden"
    >
      <div className="container mx-auto pt-32 pb-12 px-6 xl:px-0">
        {/* Başlık ve Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          className="text-center mb-12"
        >
          <div className="text-sm text-gray-500 mb-2">
            Ana Sayfa / Hizmetler / {service.category}
          </div>
          <h1 className="h1 mb-4 text-gradient">{service.title}</h1>
          <p className="lead max-w-[800px] mx-auto text-gray-600">
            {service.description}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({service.reviews?.length || 0} değerlendirme)
            </span>
          </div>
        </motion.div>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start mb-16">
          {/* Görsel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
            className="relative w-full h-[400px] xl:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>

          {/* Hizmet Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
            className="flex flex-col gap-6"
          >
            {/* Hızlı Bilgiler */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Süre</h3>
                <p className="text-gray-600 text-sm">{service.duration || "30-60 dk"}</p>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Kullanılan Cihaz</h3>
                <div className="relative w-full h-20 mb-2">
                  <Image
                    src={`/assets/devices/${service.slug}.png`}
                    alt={service.device}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-600 text-sm">{service.device || "Gelişmiş Teknoloji"}</p>
              </div>
            </div>

            {/* Kullanılan Cihaz */}
            {service.device && (
              <div className="bg-gradient-to-r from-accent/5 to-secondary/5 border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold">Kullanılan Teknoloji</h2>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32 bg-white/50 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={`/assets/devices/${service.slug}.png`}
                      alt={service.device}
                      fill
                      className="object-contain p-2"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium text-lg mb-2">{service.device}</p>
                    <p className="text-sm text-gray-600">
                      En son teknoloji cihazlarla güvenli ve etkili uygulama
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Avantajlar */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Avantajlar</h2>
              <div className="space-y-3">
                {(service.benefits || [
                  "Uzman ekip tarafından uygulama",
                  "Hijyenik ve güvenli ortam",
                  "Son teknoloji cihazlar",
                  "Kişiye özel tedavi planı"
                ]).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-accent to-secondary text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Randevu Al
            </motion.button>
          </motion.div>
        </div>

        {/* Detaylı Açıklama */}
        {service.detailedDescription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="h2 text-center mb-8">Hizmet Detayları</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">{service.detailedDescription}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sık Sorulan Sorular */}
        {service.faq && service.faq.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
            className="mb-16"
          >
            <h2 className="h2 text-center mb-8">Sık Sorulan Sorular</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {service.faq.map((item, index) => (
                <div key={index} className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Müşteri Yorumları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.9 } }}
          className="mb-16"
        >
          <h2 className="h2 text-center mb-8">Müşteri Deneyimleri</h2>
          {service.reviews?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1 + index * 0.1 } }}
                  className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (review.rating || 5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date || "2024"}</span>
                  </div>
                  <p className="text-gray-800 italic mb-3">"{review.comment}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {review.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Bu hizmet için henüz yorum yapılmamış.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                İlk yorumu yapan siz olun!
              </p>
            </div>
          )}
        </motion.div>

        {/* İletişim CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.1 } }}
          className="bg-gradient-to-r from-accent to-secondary rounded-2xl p-8 text-center text-white"
        >
          <h2 className="h2 mb-4">Daha Fazla Bilgi İçin</h2>
          <p className="text-lg mb-6 opacity-90">
            Uzman ekibimizle iletişime geçin ve size özel tedavi planınızı oluşturalım
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905304348349"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Whatsapp ile İletişim
            </a>
            <a
              href="tel:+905304348349"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors flex items-center justify-center"
            >
              Telefon ile Ara
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceDetails;