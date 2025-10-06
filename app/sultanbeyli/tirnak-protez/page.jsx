export const metadata = {
  title: 'Sultanbeyli Tırnak Protez | Şahika Beauty',
  description: 'Sultanbeyli\'de tırnak protez hizmetleri. Uzun ve güzel tırnaklar. Uzman ekibimizle randevu alın.',
  keywords: 'Sultanbeyli tırnak protez, Sultanbeyli nail art, Sultanbeyli tırnak bakımı',
}

export default function SultanbeyliTirnakProtez() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sultanbeyli Tırnak Protez
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sultanbeyli'de profesyonel tırnak protez hizmetleri. Uzun ve güzel tırnaklar!
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
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tırnak Protez Avantajları</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Uzun ve güzel tırnaklar</li>
                  <li>• Dayanıklı yapı</li>
                  <li>• Çeşitli tasarım seçenekleri</li>
                  <li>• Uzun süreli kullanım</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gel Tırnak</h3>
              <p className="text-gray-600">Esnek ve dayanıklı tırnak</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Akrilik Tırnak</h3>
              <p className="text-gray-600">Güçlü ve uzun tırnak</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nail Art</h3>
              <p className="text-gray-600">Özel tasarım ve süslemeler</p>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Sultanbeyli'de Randevu Alın!</h2>
            <p className="text-xl mb-6">Uzman ekibimizle güzel tırnaklar yaptırın</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/rezervasyon" className="bg-white text-pink-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Randevu Al
              </a>
              <a href="/iletisim" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-pink-600 transition-colors">
                İletişim
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
