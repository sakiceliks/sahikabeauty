export const metadata = {
  title: 'Müşteri Yorumları | Şahika Beauty',
  description: 'Şahika Beauty güzellik merkezi müşteri yorumları ve deneyimleri. Gerçek müşteri hikayeleri ve memnuniyet oranları.',
  keywords: 'müşteri yorumları, güzellik merkezi yorumları, Şahika Beauty yorumları',
}

export default function Yorumlar() {
  const testimonials = [
    {
      name: "Ayşe K.",
      service: "Lazer Epilasyon",
      rating: 5,
      comment: "Çok memnun kaldım! Profesyonel hizmet ve harika sonuçlar. Kesinlikle tavsiye ederim."
    },
    {
      name: "Fatma M.",
      service: "Cilt Bakımı",
      rating: 5,
      comment: "Cildim çok daha güzel görünüyor. Uzman ekibinize teşekkürler!"
    },
    {
      name: "Zeynep A.",
      service: "Kalıcı Makyaj",
      rating: 5,
      comment: "Kaşlarım harika oldu! Her zaman makyajlı görünüyorum."
    },
    {
      name: "Elif S.",
      service: "Bölgesel İncelme",
      rating: 5,
      comment: "Hedeflediğim sonuçları aldım. Çok memnunum!"
    },
    {
      name: "Selin Y.",
      service: "Tırnak Protez",
      rating: 5,
      comment: "Tırnaklarım çok güzel oldu. Kaliteli hizmet!"
    },
    {
      name: "Merve D.",
      service: "Saç Bakımı",
      rating: 5,
      comment: "Saçlarım çok daha sağlıklı görünüyor. Teşekkürler!"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Müşteri Yorumları
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Müşterilerimizin deneyimleri ve memnuniyet hikayeleri
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Memnuniyet Oranı</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Mutlu Müşteri</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5★</div>
              <div className="text-gray-600">Ortalama Puan</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.service}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Siz de deneyimleyin!</h2>
            <p className="text-xl mb-6">Müşterilerimiz gibi siz de memnun kalacaksınız</p>
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
