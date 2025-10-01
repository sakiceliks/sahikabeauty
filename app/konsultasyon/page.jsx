export const metadata = {
  title: 'Ücretsiz Konsültasyon | Şahika Beauty',
  description: 'Şahika Beauty güzellik merkezi ücretsiz konsültasyon hizmeti. Uzman doktorlarımızla görüşün, size özel çözümler alın.',
  keywords: 'ücretsiz konsültasyon, güzellik konsültasyonu, cilt analizi, uzman görüşü',
}

export default function Konsultasyon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ücretsiz Konsültasyon
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uzman doktorlarımızla görüşün, size özel çözümler alın!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Konsültasyon Avantajları</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-900">Ücretsiz Cilt Analizi</h3>
                    <p className="text-gray-600">Cildinizin durumunu detaylı analiz ediyoruz</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-900">Kişiye Özel Çözümler</h3>
                    <p className="text-gray-600">Size özel bakım programı hazırlıyoruz</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-900">Uzman Doktor Görüşü</h3>
                    <p className="text-gray-600">Deneyimli doktorlarımızdan profesyonel görüş</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Konsültasyon Süreci</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Randevu Alın</h3>
                    <p className="text-gray-600">Ücretsiz konsültasyon için randevu alın</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Cilt Analizi</h3>
                    <p className="text-gray-600">Cildinizi detaylı analiz ediyoruz</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Öneriler</h3>
                    <p className="text-gray-600">Size özel çözümler sunuyoruz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cilt Analizi</h3>
              <p className="text-gray-600">Profesyonel cilt analizi</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Öneriler</h3>
              <p className="text-gray-600">Kişiye özel çözümler</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Uzman Görüşü</h3>
              <p className="text-gray-600">Doktor konsültasyonu</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ücretsiz Konsültasyon Alın!</h2>
            <p className="text-xl mb-6">Uzman doktorlarımızla görüşün, size özel çözümler alın</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/rezervasyon" 
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Randevu Al
              </a>
              <a 
                href="/iletisim" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-colors"
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
