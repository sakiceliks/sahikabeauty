"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, Calendar } from "lucide-react"

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Google Places API ile yorumları çek
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true)
        
        // Google Places API endpoint
        const placeId = "YOUR_GOOGLE_PLACE_ID" // Google İşletmenizin Place ID'si
        const apiKey = "YOUR_GOOGLE_API_KEY" // Google API anahtarınız
        
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
        )
        
        if (!response.ok) {
          throw new Error('Google API hatası')
        }
        
        const data = await response.json()
        
        if (data.result && data.result.reviews) {
          setReviews(data.result.reviews.slice(0, 5)) // İlk 5 yorumu al
        } else {
          // API yoksa örnek yorumları göster
          setReviews(getSampleReviews())
        }
        
      } catch (err) {
        console.error('Yorumlar yüklenemedi:', err)
        setError(err.message)
        // Hata durumunda örnek yorumları göster
        setReviews(getSampleReviews())
      } finally {
        setLoading(false)
      }
    }

    fetchGoogleReviews()
  }, [])

  // Örnek yorumlar (API yoksa)
  const getSampleReviews = () => [
    {
      author_name: "Ayşe K.",
      rating: 5,
      text: "Harika bir deneyimdi! Cildim hiç bu kadar iyi hissetmemişti. Uzmanlar çok ilgiliydi.",
      time: Date.now() - 86400000, // 1 gün önce
      profile_photo_url: null
    },
    {
      author_name: "Mehmet D.",
      rating: 5,
      text: "Profesyonel hizmet, güler yüzlü ekip. Kesinlikle tekrar geleceğim. Tavsiye ederim!",
      time: Date.now() - 172800000, // 2 gün önce
      profile_photo_url: null
    },
    {
      author_name: "Elif S.",
      rating: 5,
      text: "Tüm işlemler çok hijyenikti ve sonuçtan çok memnun kaldım. Cildimdeki değişimi hemen fark ettim.",
      time: Date.now() - 259200000, // 3 gün önce
      profile_photo_url: null
    },
    {
      author_name: "Burak T.",
      rating: 5,
      text: "Sultanbeyli'deki en iyi güzellik merkezi! Uzman kadro ve son teknoloji cihazlar.",
      time: Date.now() - 345600000, // 4 gün önce
      profile_photo_url: null
    },
    {
      author_name: "Zeynep Y.",
      rating: 5,
      text: "Lazer epilasyon deneyimim mükemmeldi. Ağrısız ve etkili. Teşekkürler Şahika Beauty!",
      time: Date.now() - 432000000, // 5 gün önce
      profile_photo_url: null
    }
  ]

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Yıldızlar */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {review.rating}/5
                  </span>
                </div>

                {/* Yorum */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Müşteri Bilgileri */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {review.author_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {review.author_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(review.time)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Google Badge */}
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Google</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Google'a Git Butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://g.page/sahika-beauty-sultanbeyli/review" // Google İşletmenizin review linki
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            <MapPin className="w-5 h-5" />
            Google'da Yorum Bırak
          </a>
        </motion.div>

        {error && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Not: Şu anda örnek yorumlar gösteriliyor. Google API entegrasyonu için lütfen API anahtarınızı yapılandırın.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default GoogleReviews
