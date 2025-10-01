export const metadata = {
  title: 'Yorum Ekle | Şahika Beauty',
  description: 'Şahika Beauty güzellik merkezi hizmetlerimiz hakkında yorumunuzu paylaşın. Deneyimlerinizi diğer müşterilerle paylaşın.',
  keywords: 'yorum ekle, müşteri yorumu, güzellik merkezi yorumu, deneyim paylaş',
}

export default function YorumEkle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Yorumunuzu Paylaşın
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deneyimlerinizi diğer müşterilerle paylaşın, bizim için çok değerli!
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aldığınız Hizmet *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Hizmet seçin</option>
                  <option value="cilt-bakimi">Cilt Bakımı</option>
                  <option value="lazer-epilasyon">Lazer Epilasyon</option>
                  <option value="kalici-makyaj">Kalıcı Makyaj</option>
                  <option value="bolgesel-incelme">Bölgesel İncelme</option>
                  <option value="tirnak-protez">Tırnak Protez</option>
                  <option value="sac-bakimi">Saç Bakımı</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puanınız *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-3xl text-gray-300 hover:text-yellow-400 focus:text-yellow-400"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yorumunuz *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Hizmetimiz hakkında yorumunuzu yazın..."
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  Yorumumun yayınlanmasını kabul ediyorum *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
              >
                Yorumu Gönder
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Yorumunuz onaylandıktan sonra yayınlanacaktır.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Spam ve uygunsuz içerik yayınlanmayacaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
