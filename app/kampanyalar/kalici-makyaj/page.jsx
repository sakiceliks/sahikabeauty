export const metadata = {
  title: 'Kalıcı Makyaj Kampanyası | Şahika Beauty',
  description: 'Kalıcı makyaj kampanyamızla her zaman makyajlı görünün! Kaş, dudak ve göz kalıcı makyaj hizmetleri.',
  keywords: 'kalıcı makyaj, kaş kalıcı makyaj, dudak kalıcı makyaj, göz kalıcı makyaj',
}

export default function KaliciMakyaj() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kalıcı Makyaj Kampanyası
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Her zaman makyajlı görünün! Kalıcı makyaj kampanyamızla doğal ve güzel görünüm.
            </p>
          </div>

          {/* Campaign Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Kalıcı Makyajın Avantajları</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold">•</span>
                    Her zaman makyajlı görünüm
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold">•</span>
                    Zaman tasarrufu sağlar
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold">•</span>
                    Doğal ve güzel sonuçlar
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kampanya Detayları</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>%20 İndirim</strong> - Tüm kalıcı makyaj hizmetlerinde</p>
                  <p><strong>Ücretsiz Tasarım</strong> - Kişiye özel makyaj tasarımı</p>
                  <p><strong>Garanti</strong> - 2 yıl sonuç garantisi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kaş Kalıcı Makyaj</h3>
              <p className="text-gray-600">Doğal ve şekilli kaşlar</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dudak Kalıcı Makyaj</h3>
              <p className="text-gray-600">Dolgun ve renkli dudaklar</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Göz Kalıcı Makyaj</h3>
              <p className="text-gray-600">Çizgili ve belirgin gözler</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Hemen Randevu Alın!</h2>
            <p className="text-xl mb-6">Kampanyadan yararlanmak için hemen iletişime geçin</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/rezervasyon" 
                className="bg-white text-rose-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Randevu Al
              </a>
              <a 
                href="/iletisim" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-rose-600 transition-colors"
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
