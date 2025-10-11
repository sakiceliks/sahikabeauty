"use client"
import { useEffect } from "react"

const GoogleReviewsEmbed = () => {
  useEffect(() => {
    // Google Reviews embed script'ini yükle
    const script = document.createElement('script')
    script.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=ChIJ98rOb7rRyhQRb45F8AYYa8k'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Google İşletmelerdeki Müşteri Yorumları
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Müşterilerimizin Google İşletmelerde bıraktığı gerçek yorumları
          </p>
        </div>

        {/* Google Reviews Widget */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="g-reviews-widget"
            data-place-id="ChIJ98rOb7rRyhQRb45F8AYYa8k"
            data-max-reviews="6"
            data-review-lang="tr"
          >
            {/* Bu div Google tarafından doldurulacak */}
          </div>
        </div>

        {/* Alternatif: Manuel Yorumlar */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Son Müşteri Yorumları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Manuel yorumlar buraya gelecek */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleReviewsEmbed
