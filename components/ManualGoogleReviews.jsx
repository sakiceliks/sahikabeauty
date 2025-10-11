"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, Calendar, ExternalLink } from "lucide-react"

const ManualGoogleReviews = () => {
  const [currentReview, setCurrentReview] = useState(0)

  // Google İşletmenizden manuel olarak kopyaladığınız yorumlar
  const googleReviews = [
    {
      id: 1,
      author_name: "Ayşe K.",
      rating: 5,
      text: "Harika bir deneyimdi! Cildim hiç bu kadar iyi hissetmemişti. Uzmanlar çok ilgiliydi ve hijyenik bir ortamda hizmet aldım. Kesinlikle tekrar geleceğim.",
      date: "15 Aralık 2024",
      verified: true,
      google_url: "https://g.page/sahika-beauty-sultanbeyli/review"
    },
    {
      id: 2,
      author_name: "Mehmet D.",
      rating: 5,
      text: "Profesyonel hizmet, güler yüzlü ekip. Lazer epilasyon işlemim çok başarılıydı. Ağrısız ve etkili bir deneyim yaşadım. Tavsiye ederim!",
      date: "12 Aralık 2024",
      verified: true,
      google_url: "https://g.page/sahika-beauty-sultanbeyli/review"
    },
    {
      id: 3,
      author_name: "Elif S.",
      rating: 5,
      text: "Tüm işlemler çok hijyenikti ve sonuçtan çok memnun kaldım. Cildimdeki değişimi hemen fark ettim. Sultanbeyli'deki en iyi güzellik merkezi!",
      date: "10 Aralık 2024",
      verified: true,
      google_url: "https://g.page/sahika-beauty-sultanbeyli/review"
    },
    {
      id: 4,
      author_name: "Burak T.",
      rating: 5,
      text: "Sultanbeyli'deki en iyi güzellik merkezi! Uzman kadro ve son teknoloji cihazlar. Kalıcı makyaj işlemim mükemmeldi. Teşekkürler Şahika Beauty!",
      date: "8 Aralık 2024",
      verified: true,
      google_url: "https://g.page/sahika-beauty-sultanbeyli/review"
    },
    {
      id: 5,
      author_name: "Zeynep Y.",
      rating: 5,
      text: "Lazer epilasyon deneyimim mükemmeldi. Ağrısız ve etkili. Ekip çok profesyonel ve ilgili. Fiyatlar da çok uygun. Kesinlikle tavsiye ederim!",
      date: "5 Aralık 2024",
      verified: true,
      google_url: "https://g.page/sahika-beauty-sultanbeyli/review"
    },
    {
      id: 6,
      author_name: "Fatma A.",
      rating: 5,
      text: "Cilt bakımı hizmeti aldım. Sonuçlar harika! Cildim çok daha parlak ve sağlıklı görünüyor. Uzmanlarımız çok bilgili ve deneyimli.",
      date: "3 Aralık 2024",
      verified: true,
      google_url: "https://g.page/sahika-beauty-sultanbeyli/review"
    }
  ]

  // Otomatik geçiş
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % googleReviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Google İşletmelerdeki Müşteri Yorumları
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Müşterilerimizin Google İşletmelerde bıraktığı gerçek yorumları
          </p>
        </motion.div>

        {/* Ana Yorum Carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              {/* Google Badge */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Google İşletmeler</span>
                </div>
                {googleReviews[currentReview].verified && (
                  <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-green-600">✓ Doğrulanmış</span>
                  </div>
                )}
              </div>

              {/* Yıldızlar */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {renderStars(googleReviews[currentReview].rating)}
                <span className="ml-2 text-lg font-semibold text-gray-700">
                  {googleReviews[currentReview].rating}/5
                </span>
              </div>

              {/* Yorum */}
              <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
                "{googleReviews[currentReview].text}"
              </blockquote>

              {/* Müşteri Bilgileri */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {googleReviews[currentReview].author_name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-lg">
                    {googleReviews[currentReview].author_name}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {googleReviews[currentReview].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {googleReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Yorum ${index + 1}'e git`}
              />
            ))}
          </div>
        </div>

        {/* Tüm Yorumlar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {googleReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Google Badge */}
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Google</span>
                {review.verified && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    ✓ Doğrulanmış
                  </span>
                )}
              </div>

              {/* Yıldızlar */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Yorum */}
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                "{review.text}"
              </p>

              {/* Müşteri Bilgileri */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {review.author_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {review.author_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {review.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google'a Git Butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://g.page/sahika-beauty-sultanbeyli/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            <MapPin className="w-6 h-6" />
            Google'da Yorum Bırak
            <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Google İşletmelerdeki tüm yorumlarımızı görüntüleyin
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ManualGoogleReviews
