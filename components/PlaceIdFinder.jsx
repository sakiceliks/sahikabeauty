"use client"
import { useState } from "react"
import { Search, MapPin, ExternalLink } from "lucide-react"

const PlaceIdFinder = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [placeId, setPlaceId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const findPlaceId = async () => {
    if (!searchQuery.trim()) {
      setError("Lütfen işletme adını girin")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Google Places API Text Search
      const apiKey = "YOUR_GOOGLE_API_KEY" // Google API anahtarınız
      const query = encodeURIComponent(searchQuery)
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`
      )

      if (!response.ok) {
        throw new Error('API hatası')
      }

      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        // İlk sonucu al
        const firstResult = data.results[0]
        setPlaceId(firstResult.place_id)
      } else {
        setError("İşletme bulunamadı")
      }
    } catch (err) {
      setError("Place ID bulunamadı: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Google Place ID Bulucu
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İşletme Adı veya Adres
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Örn: Şahika Beauty Sultanbeyli"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={findPlaceId}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {loading ? "Aranıyor..." : "Bul"}
            </button>
          </div>
        </div>

        {placeId && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Place ID Bulundu:</h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white p-2 rounded border text-sm font-mono">
                {placeId}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(placeId)}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Kopyala
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Not:</strong> Bu araç Google Places API anahtarı gerektirir.</p>
          <p><strong>Alternatif:</strong> Manuel olarak Google Maps'ten bulabilirsiniz:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Google Maps'te işletmenizi arayın</li>
            <li>İşletmenize tıklayın</li>
            <li>URL'deki Place ID'yi kopyalayın</li>
          </ol>
        </div>

        <div className="flex gap-2">
          <a
            href="https://developers.google.com/maps/documentation/places/web-service/place-id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Google Place ID Dokümantasyonu
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
          >
            <MapPin className="w-4 h-4" />
            Google Maps'te Aç
          </a>
        </div>
      </div>
    </div>
  )
}

export default PlaceIdFinder
