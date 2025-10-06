export const metadata = {
  title: 'Sultanbeyli Lazer Epilasyon | Şahika Beauty',
  description: 'Sultanbeyli\'de lazer epilasyon hizmetleri. Kalıcı epilasyon çözümü. Uzman ekibimizle randevu alın.',
  keywords: 'Sultanbeyli lazer epilasyon, Sultanbeyli kalıcı epilasyon, Sultanbeyli epilasyon',
}

export default function SultanbeyliLazerEpilasyon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sultanbeyli Lazer Epilasyon
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sultanbeyli'de profesyonel lazer epilasyon hizmetleri. Kalıcı epilasyon çözümü!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sultanbeyli Şubemiz</h2>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Adres:</strong> Sultanbeyli Merkez, İstanbul</p>
                  <p><strong>Telefon:</strong> 0530 434 83 49</p>
                  <p><strong>Çalışma Saatleri:</strong> Pazartesi-Cumartesi 09:00-19:00</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lazer Epilasyon Avantajları</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kalıcı sonuçlar</li>
                  <li>• Ağrısız işlem</li>
                  <li>• Hızlı seanslar</li>
                  <li>• Tüm cilt tiplerinde etkili</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦵</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bacak Epilasyonu</h3>
              <p className="text-gray-600">Tam bacak lazer epilasyon</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

          <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Sultanbeyli'de Randevu Alın!</h2>
            <p className="text-xl mb-6">Uzman ekibimizle kalıcı epilasyon yaptırın</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/rezervasyon" className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Randevu Al
              </a>
              <a href="/iletisim" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-colors">
                İletişim
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
