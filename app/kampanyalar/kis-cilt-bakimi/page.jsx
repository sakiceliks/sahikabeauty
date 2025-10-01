export const metadata = {
  title: 'Kış Cilt Bakımı Kampanyası | Şahika Beauty',
  description: 'Kış aylarında cildinizi koruyun! Özel kış cilt bakımı kampanyamızla cildinizi nemlendirin ve gençleştirin.',
  keywords: 'kış cilt bakımı, cilt nemlendirme, kış bakımı, cilt bakım kampanyası',
}

export default function KisCiltBakimi() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kış Cilt Bakımı Kampanyası
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kış aylarında cildinizi koruyun ve gençleştirin. Özel kampanyamızla cildinizi nemlendirin!
            </p>
          </div>

          {/* Campaign Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Kış Cilt Bakımı Neden Önemli?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    Soğuk hava cildinizi kurutur ve hassaslaştırır
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    Nem kaybı cilt yaşlanmasını hızlandırır
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    Doğru bakım ile cildinizi koruyabilirsiniz
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kampanya Detayları</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>%30 İndirim</strong> - Tüm cilt bakımı hizmetlerinde</p>
                  <p><strong>Ücretsiz Konsültasyon</strong> - Uzman doktor görüşü</p>
                  <p><strong>Hediye Ürün</strong> - Ev bakım seti</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hidrafacial</h3>
              <p className="text-gray-600">Derinlemesine temizlik ve nemlendirme</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Peeling</h3>
              <p className="text-gray-600">Ölü deri hücrelerini temizleme</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vitamin C Serum</h3>
              <p className="text-gray-600">Anti-aging ve nemlendirme</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Hemen Randevu Alın!</h2>
            <p className="text-xl mb-6">Kampanyadan yararlanmak için hemen iletişime geçin</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/rezervasyon" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Randevu Al
              </a>
              <a 
                href="/iletisim" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors"
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
