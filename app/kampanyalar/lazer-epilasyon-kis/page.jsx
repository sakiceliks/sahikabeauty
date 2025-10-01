export const metadata = {
  title: 'Kış Lazer Epilasyon Kampanyası | Şahika Beauty',
  description: 'Kış aylarında lazer epilasyon yaptırın! En uygun fiyatlarla kalıcı epilasyon çözümü.',
  keywords: 'kış lazer epilasyon, lazer epilasyon kampanyası, kalıcı epilasyon, lazer fiyatları',
}

export default function LazerEpilasyonKis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kış Lazer Epilasyon Kampanyası
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kış aylarında lazer epilasyon yaptırın! En uygun fiyatlarla kalıcı epilasyon çözümü.
            </p>
          </div>

          {/* Campaign Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Neden Kış Aylarında Lazer?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold">•</span>
                    Güneş ışınlarından uzak, daha güvenli seanslar
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold">•</span>
                    Kış aylarında daha etkili sonuçlar
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold">•</span>
                    Yaz aylarında pürüzsüz cilt
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kampanya Avantajları</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>%25 İndirim</strong> - Tüm lazer epilasyon seanslarında</p>
                  <p><strong>Ücretsiz Test</strong> - Cilt analizi ve test seansı</p>
                  <p><strong>Garanti</strong> - %100 memnuniyet garantisi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦵</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bacak Epilasyonu</h3>
              <p className="text-gray-600">Tam bacak lazer epilasyon</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦵</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bikini Epilasyonu</h3>
              <p className="text-gray-600">Bikini bölgesi lazer epilasyon</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦵</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Koltuk Altı</h3>
              <p className="text-gray-600">Koltuk altı lazer epilasyon</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Hemen Randevu Alın!</h2>
            <p className="text-xl mb-6">Kampanyadan yararlanmak için hemen iletişime geçin</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/rezervasyon" 
                className="bg-white text-pink-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Randevu Al
              </a>
              <a 
                href="/iletisim" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-pink-600 transition-colors"
              >
                İletişim
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
