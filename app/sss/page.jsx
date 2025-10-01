export const metadata = {
  title: 'Sık Sorulan Sorular | Şahika Beauty',
  description: 'Şahika Beauty güzellik merkezi hakkında sık sorulan sorular ve cevapları. Hizmetlerimiz, randevu, fiyatlar hakkında bilgi alın.',
  keywords: 'sık sorulan sorular, SSS, güzellik merkezi, randevu, fiyatlar',
}

export default function SSS() {
  const faqs = [
    {
      question: "Randevu nasıl alabilirim?",
      answer: "Randevu almak için web sitemizdeki rezervasyon formunu doldurabilir, telefon numaramızı arayabilir veya WhatsApp üzerinden iletişime geçebilirsiniz."
    },
    {
      question: "Hangi hizmetleri sunuyorsunuz?",
      answer: "Cilt bakımı, lazer epilasyon, kalıcı makyaj, bölgesel incelme, tırnak protez, saç bakımı ve daha birçok güzellik hizmeti sunuyoruz."
    },
    {
      question: "Fiyatlarınız nasıl?",
      answer: "Fiyatlarımız hizmet türüne ve seans sayısına göre değişmektedir. Detaylı fiyat bilgisi için iletişime geçebilirsiniz."
    },
    {
      question: "Hangi günlerde hizmet veriyorsunuz?",
      answer: "Pazartesi-Cumartesi 09:00-19:00, Pazar günleri 10:00-17:00 saatleri arasında hizmet veriyoruz."
    },
    {
      question: "Ödeme yöntemleriniz neler?",
      answer: "Nakit, kredi kartı, banka kartı ve taksitli ödeme seçeneklerimiz mevcuttur."
    },
    {
      question: "İlk seans öncesi ne yapmalıyım?",
      answer: "Seans öncesi cildinizi temiz tutmanız, güneş kremi kullanmamanız ve alkol tüketmemeniz önerilir. Detaylı bilgi randevu sırasında verilir."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sık Sorulan Sorular
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Şahika Beauty hakkında merak ettiğiniz her şey burada!
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Sorunuz mu var?</h2>
            <p className="text-xl mb-6">Bize ulaşın, size yardımcı olalım</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/iletisim" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                İletişim
              </a>
              <a 
                href="/rezervasyon" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Randevu Al
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
