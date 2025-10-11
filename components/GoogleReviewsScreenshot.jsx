"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Star } from "lucide-react"

const GoogleReviewsScreenshot = () => {
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
            Google İşletmeler sayfamızdaki gerçek müşteri yorumları
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Google İşletmeler Screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-8"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-600 fill-current" />
                </div>
                <span className="text-2xl font-bold text-gray-800">4.8/5</span>
                <span className="text-gray-600">(127 yorum)</span>
              </div>
              <p className="text-gray-600">Google İşletmelerdeki ortalama puanımız</p>
            </div>

            {/* Screenshot Placeholder - Gerçek screenshot'ı buraya ekleyin */}
            <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-lg font-medium">Google İşletmeler Screenshot</p>
                <p className="text-sm">Buraya Google İşletmeler sayfanızın screenshot'ını ekleyin</p>
              </div>
              
              {/* Örnek yorumlar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 text-left">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">"Harika hizmet, çok memnun kaldım!"</p>
                  <p className="text-xs text-gray-500">- Ayşe K.</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-left">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">"Profesyonel ekip, tavsiye ederim!"</p>
                  <p className="text-xs text-gray-500">- Mehmet D.</p>
                </div>
              </div>
            </div>
          </motion.div>

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
              <Star className="w-6 h-6" />
              Google İşletmelerde Görüntüle
              <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Tüm yorumlarımızı Google İşletmeler sayfamızda görüntüleyebilirsiniz
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GoogleReviewsScreenshot
