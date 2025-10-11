"use client"
import { useState } from "react"
import { MapPin, Copy, Check } from "lucide-react"

const ManualPlaceIdGuide = () => {
  const [copied, setCopied] = useState(false)

  const examplePlaceId = "ChIJN1t_tDeuEmsRUsoyG83frY4"
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Google Place ID Nasıl Bulunur? (API Olmadan)
      </h3>

      <div className="space-y-6">
        {/* Adım 1 */}
        <div className="border-l-4 border-blue-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Adım 1: Google Maps'i Açın
          </h4>
          <p className="text-gray-600 mb-3">
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://maps.google.com
            </a> adresine gidin
          </p>
        </div>

        {/* Adım 2 */}
        <div className="border-l-4 border-green-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Adım 2: İşletmenizi Arayın
          </h4>
          <p className="text-gray-600 mb-3">
            Arama çubuğuna işletmenizin adını yazın:
          </p>
          <div className="bg-gray-100 p-3 rounded-lg">
            <code className="text-gray-800">Şahika Beauty Sultanbeyli</code>
          </div>
        </div>

        {/* Adım 3 */}
        <div className="border-l-4 border-purple-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Adım 3: İşletmenize Tıklayın
          </h4>
          <p className="text-gray-600 mb-3">
            Arama sonuçlarından doğru işletmenizi seçin ve üzerine tıklayın
          </p>
        </div>

        {/* Adım 4 */}
        <div className="border-l-4 border-orange-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Adım 4: URL'den Place ID'yi Bulun
          </h4>
          <p className="text-gray-600 mb-3">
            Tarayıcınızın adres çubuğundaki URL'ye bakın. Place ID şu formatta olacak:
          </p>
          <div className="bg-gray-100 p-3 rounded-lg mb-3">
            <code className="text-gray-800 text-sm break-all">
              https://www.google.com/maps/place/Şahika+Beauty/@40.9607,29.2675,17z/data=!3m1!4b1!4m6!3m5!1s0x14cab5e4d8c8c8c8:0x1234567890abcdef!8m2!3d40.9607!4d29.2675!16s%2Fg%2F11abcdefghijk
            </code>
          </div>
          <p className="text-gray-600 mb-3">
            URL'deki <strong>1s0x14cab5e4d8c8c8c8:0x1234567890abcdef</strong> kısmı Place ID'nizdir.
          </p>
        </div>

        {/* Örnek */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Örnek Place ID:</h4>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white p-2 rounded border text-sm font-mono">
              {examplePlaceId}
            </code>
            <button
              onClick={() => copyToClipboard(examplePlaceId)}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Kopyalandı!" : "Kopyala"}
            </button>
          </div>
        </div>

        {/* Kullanım */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Place ID'yi Nasıl Kullanacaksınız?</h4>
          <p className="text-green-700 text-sm mb-2">
            Bulduğunuz Place ID'yi şu dosyalarda kullanabilirsiniz:
          </p>
          <ul className="text-green-700 text-sm list-disc list-inside space-y-1">
            <li><code>components/ManualGoogleReviews.jsx</code> - Manuel yorum sistemi</li>
            <li><code>components/GoogleReviewsEmbed.jsx</code> - Embed widget</li>
            <li><code>components/GoogleReviews.jsx</code> - API entegrasyonu</li>
          </ul>
        </div>

        {/* Hızlı Linkler */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <MapPin className="w-4 h-4" />
            Google Maps'te Aç
          </a>
          <a
            href="https://developers.google.com/maps/documentation/places/web-service/place-id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <MapPin className="w-4 h-4" />
            Google Dokümantasyonu
          </a>
        </div>
      </div>
    </div>
  )
}

export default ManualPlaceIdGuide
