export const categories = [
  { id: "epilasyon", name: "Epilasyon" },
  { id: "cilt-bakimi", name: "Cilt Bakımı" },
  { id: "bolgesel-incelme", name: "Bölgesel İncelme" },
  { id: "kalici-makyaj", name: "Kalıcı Makyaj" },
  { id: "tirnak-kirpik", name: "Tırnak & Kirpik" },
  { id: "sac-bakimi", name: "Saç Bakımı" },
  { id: "anti-age", name: "Anti-Age & Özel Bakımlar" },
]

export const services = [
  // 🟢 Epilasyon
  {
    id: 1,
    slug: "lazer-epilasyon",
    category: "epilasyon",
    title: "Lazer Epilasyon",
    description:
      "Falcon 4 Pro cihazıyla kalıcı ve etkili lazer epilasyon. Sultanbeyli'nin en kaliteli lazer epilasyon merkezi.",
    seoTitle: "Sultanbeyli Lazer Epilasyon - Falcon 4 Pro ile Kalıcı Tüy Azaltma",
    seoDescription:
      "Sultanbeyli lazer epilasyon merkezi. Falcon 4 Pro cihazı ile acısız ve kalıcı tüy azaltma. Uzman kadro, hijyenik ortam. Hemen randevu alın!",
    seoKeywords:
      "sultanbeyli lazer epilasyon, lazer epilasyon sultanbeyli, falcon 4 pro, kalıcı epilasyon, tüy azaltma",
    image: "/slide/sld1.png",
    device: {
      name: "Falcon 4 Pro",
      imageUrl: "https://styirqnih357hnts.public.blob.vercel-storage.com/devices%5Cfalcon-4pro-png-1757973572136.png",
    },
    duration: "45-60 dk",
    benefits: [
      "Uzman ekip tarafından uygulama",
      "Hijyenik ve güvenli ortam",
      "Son teknoloji Falcon 4 Pro cihazı",
      "Kişiye özel tedavi planı",
      "Acısız ve konforlu uygulama",
      "Tüm cilt tiplerine uygun",
    ],
    detailedDescription:
      "Sultanbeyli'nin en kaliteli lazer epilasyon merkezi olarak, Falcon 4 Pro cihazımızla kalıcı tüy azaltma hizmeti sunuyoruz. Lazer epilasyon, istenmeyen tüylerden kalıcı olarak kurtulmanın en etkili ve modern yollarından biridir. Falcon 4 Pro cihazımız, tüm cilt tiplerine uyumlu başlıkları sayesinde acısız ve konforlu bir deneyim sunar. Uygulama süresi, bölgeye göre değişiklik gösterir. Genellikle 6-8 seans sonunda kalıcı sonuçlar elde edilir. Sultanbeyli güzellik merkezi olarak hijyenik ortamımızda uzman kadromuzla hizmet veriyoruz.",
    faq: [
      {
        question: "Sultanbeyli lazer epilasyon kaç seans gerekir?",
        answer:
          "Ortalama olarak 6-8 seans yeterli olmaktadır. Bu sayı, kıl yapınıza ve hormonel durumunuza göre değişebilir. Sultanbeyli uzmanlarımız size kişiye özel plan hazırlar.",
      },
      {
        question: "Lazer epilasyon uygulama acı verir mi?",
        answer:
          "Hayır. Falcon 4 Pro'nun soğutma sistemi sayesinde işlem sırasında minimal düzeyde bir rahatsızlık hissedilir. Sultanbeyli'nin en konforlu lazer epilasyon deneyimini sunuyoruz.",
      },
      {
        question: "Sultanbeyli lazer epilasyon fiyatları nasıl?",
        answer:
          "Fiyatlarımız bölgeye ve seans sayısına göre değişmektedir. Detaylı bilgi için merkezimizi arayabilir veya WhatsApp'tan iletişime geçebilirsiniz.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Ayşe K.",
        comment: "Sultanbeyli'de en iyi lazer epilasyon merkezi. İlk seansımdan sonra farkı gördüm, çok memnun kaldım.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Zeynep D.",
        comment: "Falcon 4 Pro cihazı gerçekten acısız. Sultanbeyli'de böyle kaliteli bir merkez olması harika.",
        rating: 5,
        date: "Kasım 2024",
      },
      {
        id: 3,
        name: "Burcu M.",
        comment: "Personel çok ilgili, sonuçlar harika! Sultanbeyli lazer epilasyon için en doğru adres.",
        rating: 5,
        date: "Ocak 2025",
      },
    ],
  },
  {
    id: 2,
    slug: "igneli-epilasyon",
    category: "epilasyon",
    title: "İğneli Epilasyon",
    description:
      "Kalıcı tüy giderimi için profesyonel iğneli epilasyon. Sultanbeyli'de uzman kadroyla güvenli uygulama.",
    seoTitle: "Sultanbeyli İğneli Epilasyon - Kalıcı Tüy Giderme Merkezi",
    seoDescription:
      "Sultanbeyli iğneli epilasyon merkezi. Beyaz ve ince tüyler için kalıcı çözüm. Steril ortam, uzman kadro. Randevu için hemen arayın!",
    seoKeywords: "sultanbeyli iğneli epilasyon, elektroliz epilasyon, kalıcı tüy giderme, beyaz tüy epilasyonu",
    image: "/slide/sld2.jpg",
    device: {
      name: "Profesyonel İğneli Epilasyon Cihazı",
      imageUrl: "/assets/devices/igneli-epilasyon.png",
    },
    duration: "15-60 dk",
    benefits: [
      "İnce ve beyaz tüylerde etkili sonuç",
      "Kalıcı çözüm",
      "Uzman estetisyen tarafından uygulama",
      "Steril ortam",
      "Lazer epilasyonun etki etmediği tüyler için ideal",
      "Kişiye özel tedavi planı",
    ],
    detailedDescription:
      "Sultanbeyli iğneli epilasyon merkezi olarak, lazerin etki etmediği ince ve beyaz tüyler için ideal çözüm sunuyoruz. İğneli epilasyon, her bir kıl köküne özel bir iğne ile elektrik akımı verilerek kökün tahrip edilmesi sağlanır. Uzmanlarımız tarafından steril bir ortamda gerçekleştirilen bu işlem, kalıcı ve kesin sonuçlar sunar. Sultanbeyli güzellik merkezi olarak hijyenik koşullarda hizmet veriyoruz.",
    faq: [
      {
        question: "Sultanbeyli iğneli epilasyon ağrılı mıdır?",
        answer:
          "Uygulama sırasında hafif bir batma hissi oluşabilir. İhtiyaç duyulursa lokal anestezi kremleri kullanılabilir. Sultanbeyli merkezimizde konforunuz önceliğimizdir.",
      },
      {
        question: "İğneli epilasyon kaç seans sürer?",
        answer:
          "Kıl yoğunluğuna ve bölgeye bağlı olarak seans sayısı değişir. Kılların büyüme döngüsüne uygun plan yapılır. Sultanbeyli uzmanlarımız size detaylı bilgi verir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Elif S.",
        comment: "Sultanbeyli'de kalıcı çözüm arayanlar için en doğru adres. Çok titiz çalışıyorlar.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Seda A.",
        comment: "Çok memnun kaldım, artık tüylerimden kurtuldum. Sultanbeyli'nin en iyi merkezi.",
        rating: 5,
        date: "Aralık 2024",
      },
    ],
  },

  // 🟢 Cilt Bakımı
  {
    id: 3,
    slug: "cilt-bakimi",
    category: "cilt-bakimi",
    title: "Cilt Bakımı",
    description: "Cildinizi yenileyen ve canlandıran bakım çözümleri. Sultanbeyli'nin en kaliteli cilt bakım merkezi.",
    seoTitle: "Sultanbeyli Cilt Bakımı - HydraFacial ile Profesyonel Bakım",
    seoDescription:
      "Sultanbeyli cilt bakımı merkezi. HydraFacial cihazı ile derinlemesine temizlik ve gençleştirme. Tüm cilt tiplerine uygun. Randevu alın!",
    seoKeywords: "sultanbeyli cilt bakımı, hydrafacial, cilt temizliği, cilt gençleştirme, profesyonel cilt bakımı",
    image: "/slide/sld3.png",
    device: {
      name: "HydraFacial Cihazı",
      imageUrl: "/assets/devices/hydrafacial.png",
    },
    duration: "60-90 dk",
    benefits: [
      "Cildin derinlemesine temizliği",
      "Gözeneklerin sıkılaşması",
      "Canlı ve parlak bir görünüm",
      "Tüm cilt tiplerine uygunluk",
      "Anında görülen sonuçlar",
      "Ağrısız ve konforlu uygulama",
    ],
    detailedDescription:
      "Sultanbeyli cilt bakımı merkezi olarak, profesyonel cilt bakımı hizmetleri sunuyoruz. Cildinizi ölü hücrelerden arındırır, gözenekleri temizler ve nem dengesini sağlar. HydraFacial gibi son teknoloji cihazlarla uygulanan bakımlarımız, cildinize ihtiyaç duyduğu vitamin ve mineralleri kazandırarak daha sağlıklı ve genç bir görünüm elde etmenizi sağlar. Sultanbeyli güzellik merkezi olarak her cilt tipine uygun çözümler sunuyoruz.",
    faq: [
      {
        question: "Sultanbeyli cilt bakımı ne sıklıkla yapılmalı?",
        answer:
          "Ayda bir seans düzenli bakım yapılması cildin sağlığı için idealdir. Sultanbeyli merkezimizde uzmanlarımız size kişiye özel program hazırlar.",
      },
      {
        question: "Hassas ciltler için uygun mu?",
        answer:
          "Evet, kullandığımız ürünler ve cihazlar hassas ciltler de dahil olmak üzere tüm cilt tiplerine uygundur. Sultanbeyli cilt bakım uzmanlarımız size en uygun tedaviyi belirler.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Fatma Y.",
        comment: "Sultanbeyli'de en iyi cilt bakımı burada. Cildim ışıl ışıl oldu. Kendimi çok iyi hissediyorum.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Ebru G.",
        comment: "Profesyonel bir ekip ve harika bir hizmet. Sultanbeyli cilt bakımı için kesinlikle tavsiye ederim.",
        rating: 5,
        date: "Ocak 2025",
      },
    ],
  },
  {
    id: 4,
    slug: "leke-bakimi",
    category: "cilt-bakimi",
    title: "Leke Bakımı",
    description:
      "Cilt lekelerini azaltmaya yönelik özel bakım. Sultanbeyli'de Q-Switched lazer ile etkili leke tedavisi.",
    seoTitle: "Sultanbeyli Leke Bakımı - Q-Switched Lazer ile Leke Tedavisi",
    seoDescription:
      "Sultanbeyli leke bakımı merkezi. Güneş lekeleri, yaşlılık lekeleri için Q-Switched lazer tedavisi. Uzman kadro, etkili sonuçlar.",
    seoKeywords: "sultanbeyli leke bakımı, leke tedavisi, güneş lekesi, yaşlılık lekesi, q-switched lazer",
    image: "/slide/sld1.png",
    device: {
      name: "Q-Switched Lazer",
      imageUrl: "/assets/devices/q-switched.png",
    },
    duration: "45-60 dk",
    benefits: [
      "Güneş ve yaşlılık lekelerinde azalma",
      "Cilt tonu eşitsizliğinin giderilmesi",
      "Ciltte aydınlanma",
      "Kişiye özel protokol",
      "Güvenli ve etkili tedavi",
      "Hızlı iyileşme süreci",
    ],
    detailedDescription:
      "Sultanbeyli leke bakımı merkezi olarak, cilt lekeleriniz için etkili çözümler sunuyoruz. Cilt lekeleri, güneş ışınları, yaşlanma ve hormonal değişimler gibi birçok nedenle oluşabilir. Leke bakımımız, Q-Switched lazer ve özel serumlarla cildin üst katmanındaki melanin pigmentini hedef alarak lekelerin görünümünü azaltmayı amaçlar. Uygulama sonrasında cildiniz daha aydınlık ve eşit bir tona kavuşur.",
    faq: [
      {
        question: "Sultanbeyli leke bakımı kalıcı mıdır?",
        answer:
          "Lekelerin büyük bir kısmı kalıcı olarak yok edilebilir. Ancak yeni leke oluşumunu önlemek için güneşten korunmak çok önemlidir. Sultanbeyli uzmanlarımız size detaylı bakım önerileri verir.",
      },
      {
        question: "Leke tedavisi sonrası nelere dikkat etmeliyim?",
        answer:
          "Güneş kremi kullanımı ve cildi tahriş edecek ürünlerden uzak durmak gereklidir. Sultanbeyli merkezimizde size özel bakım protokolü hazırlanır.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Demet P.",
        comment:
          "Sultanbeyli'de leke tedavisi için en iyi merkez. Güneş lekelerim belirgin bir şekilde azaldı. Sonuçtan çok memnunum.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Funda Ö.",
        comment: "Uzmanlar çok bilgili, cildimdeki farkı hemen hissettim. Sultanbeyli leke bakımı için tavsiye ederim.",
        rating: 5,
        date: "Aralık 2024",
      },
    ],
  },
  {
    id: 5,
    slug: "akne-bakimi",
    category: "cilt-bakimi",
    title: "Akne Bakımı",
    description: "Akne ve sivilce tedavisine özel bakım.",
    image: "/slide/sld2.jpg",
    device: "Mavi Işık Terapi Cihazı",
    duration: "45-60 dk",
    deviceImg: "",
    benefits: [
      "Akne oluşumunu önleme",
      "Var olan akneleri kurutma",
      "Akne izlerini azaltma",
      "Ciltteki iltihabı giderme",
    ],
    detailedDescription:
      "Akne bakımı, cildin alt katmanlarındaki bakterileri hedef alarak akne oluşumunu engeller ve mevcut sivilcelerin iyileşmesini hızlandırır. Mavi ışık terapi ve özel sterilizasyon ürünleri kullanılarak uygulanan bu bakım, ciltteki iltihabı ve kızarıklığı azaltır. Düzenli seanslar ile cildinizin daha pürüzsüz olmasına yardımcı oluruz.",
    faq: [
      {
        question: "Tedavi ne kadar sürede sonuç verir?",
        answer:
          "İlk seanslardan itibaren aknelerde belirgin bir azalma görülür. Kalıcı sonuç için seanslara düzenli devam etmek önemlidir.",
      },
      {
        question: "Hangi yaş aralığına uygundur?",
        answer: "Ergenlikten itibaren her yaş grubundaki akne problemi olan bireyler için uygundur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Cemre T.",
        comment: "Akne problemim büyük oranda çözüldü. Düzenli seanslar çok etkili oldu.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Kerem B.",
        comment: "İnanılmaz bir değişim yaşadım, cildim pürüzsüzleşti.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },
  {
    id: 6,
    slug: "yosun-peeling",
    category: "cilt-bakimi",
    title: "Yosun Peeling",
    description: "Doğal yosun özleriyle cilt yenileyici peeling.",
    image: "/slide/sld3.png",
    device: "Profesyonel Peeling Sistemi",
    duration: "45-60 dk",
    deviceImg: "",
    benefits: [
      "Cilt tonunu eşitleme",
      "Sivilce ve akne izlerini azaltma",
      "İnce çizgi ve kırışıklıklarda azalma",
      "Cildin doğal yenilenme sürecini hızlandırma",
    ],
    detailedDescription:
      "Yosun peeling, tamamen doğal içeriğe sahip bir cilt yenileme yöntemidir. Cildin üst katmanındaki ölü hücreleri ve lekeleri yosun özleri sayesinde nazikçe soyar. Bu işlem, cildin kendini yenilemesini tetikleyerek daha pürüzsüz, genç ve aydınlık bir görünüme kavuşmanızı sağlar. Özellikle akne izleri ve leke problemlerinde oldukça etkilidir.",
    faq: [
      {
        question: "İşlem sonrası ne gibi etkiler görülür?",
        answer:
          "İşlemden sonra hafif kızarıklık ve soyulma görülebilir. Bu süreç, cildin yenilendiğini gösterir ve birkaç gün içinde geçer.",
      },
      {
        question: "Hangi mevsimde yapılmalıdır?",
        answer: "Yosun peeling, özellikle sonbahar ve kış aylarında yapılması önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Melike N.",
        comment: "Doğal içerikli olması çok hoşuma gitti. Cildim canlandı ve nefes aldı.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Gizem A.",
        comment: "Harika bir deneyimdi, cildim bebek gibi oldu.",
        rating: 5,
        date: "Ocak 2025",
      },
    ],
  },

  // 🟢 Bölgesel İncelme
  {
    id: 7,
    slug: "g5-masaji",
    category: "bolgesel-incelme",
    title: "G5 Masajı",
    description: "Ödem attırıcı ve selülit karşıtı masaj uygulaması.",
    image: "/slide/sld1.png",
    device: "G5 Masaj Cihazı",
    duration: "30-45 dk",
    deviceImg: "",
    benefits: ["Selülit görünümünde azalma", "Bölgesel incelme", "Ödem atma", "Kan dolaşımını hızlandırma"],
    detailedDescription:
      "G5 masajı, özel bir cihazla yapılan ritmik titreşimli bir masaj yöntemidir. Bu masaj, özellikle selülitli bölgelerde kan dolaşımını hızlandırır, lenfatik drenajı artırır ve yağ hücrelerinin parçalanmasına yardımcı olur. Sonuç olarak, vücudunuz daha sıkı ve pürüzsüz bir görünüme kavuşur.",
    faq: [
      {
        question: "G5 masajı acı verir mi?",
        answer:
          "İşlem sırasında hafif bir titreşim hissedilir, ancak acı verici değildir. Seanslar konforlu bir şekilde tamamlanır.",
      },
      {
        question: "Kaç seans sonunda etkisini görürüm?",
        answer: "Genellikle 5-10 seans sonrasında gözle görülür sonuçlar elde edilebilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Didem F.",
        comment: "Selülitlerim gözle görülür şekilde azaldı. Masaj çok rahatlatıcı.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Pınar K.",
        comment: "Ödemimden kurtuldum ve vücudum daha sıkı hissediyorum.",
        rating: 5,
        date: "Ocak 2025",
      },
    ],
  },
  {
    id: 8,
    slug: "emslim-fit",
    category: "bolgesel-incelme",
    title: "EmSlim Fit",
    description: "Kas yapımını destekleyen EMS teknolojisi.",
    image: "/slide/sld2.jpg",
    device: "EmSlimFit",
    duration: "30 dk",
    deviceImg: "",
    benefits: ["Yağ yakımını hızlandırma", "Kas kütlesini artırma", "Vücut şekillendirme", "Bölgesel sıkılaştırma"],
    detailedDescription:
      "EmSlim Fit, yüksek yoğunluklu elektromanyetik alan (HIFEM) teknolojisi kullanarak kasları yoğun bir şekilde çalıştırır. 30 dakikalık bir seans, binlerce mekik veya squat hareketine eşdeğer kas kasılması sağlar. Bu sayede hem yağ yakımı hızlanır hem de kaslar belirginleşerek daha fit bir vücut yapısı elde edilir.",
    faq: [
      {
        question: "Acı verici bir işlem midir?",
        answer: "Hayır, işlem sırasında kaslarda yoğun bir kasılma hissedilir, ancak ağrı veya acı olmaz.",
      },
      {
        question: "Ne sıklıkla uygulanmalıdır?",
        answer: "İhtiyaca göre haftada 2-3 seans uygulanması tavsiye edilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Hakan U.",
        comment: "Spor yapmaya vakti olmayanlar için mükemmel bir yöntem. Karnımdaki kaslar belirginleşti.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Selin S.",
        comment: "Sadece birkaç seansla harika sonuçlar aldım. Çok memnunum, herkese tavsiye ederim.",
        rating: 5,
        date: "Aralık 2024",
      },
    ],
  },
  {
    id: 9,
    slug: "primex",
    category: "bolgesel-incelme",
    title: "Primex",
    description: "Cilt gençleştirme ve sıkılaştırmada etkili cihaz.",
    image: "/slide/sld3.png",
    device: "Primex",
    duration: "45-60 dk",
    deviceImg: "",
    benefits: [
      "Cilt gençleştirme",
      "Vücut ve yüz sıkılaştırma",
      "Selülit görünümünde azalma",
      "Kolajen üretimini destekleme",
    ],
    detailedDescription:
      "Primex, radyofrekans ve ultrason teknolojilerini birleştirerek cildin alt katmanlarındaki kolajen ve elastin üretimini artırır. Bu sayede cilt sıkılaşır, sarkmalar azalır ve daha genç bir görünüm elde edilir. Özellikle yüz, boyun ve karın gibi bölgelerdeki gevşeklikler için ideal bir çözümdür.",
    faq: [
      {
        question: "İşlem sonrası ne zaman sosyal hayatıma dönebilirim?",
        answer: "İşlem sonrası herhangi bir yan etki görülmez. Günlük hayatınıza hemen devam edebilirsiniz.",
      },
      {
        question: "Sonuçlar kalıcı mı?",
        answer: "Evet, doğru bakım ile sonuçlar uzun süre kalıcıdır. Yıllık hatırlatma seansları önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Nazan C.",
        comment: "Cildimdeki sarkmalar için harika bir çözüm. Yüzüm daha gergin görünüyor.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Zehra D.",
        comment: "Çok rahat bir seans, ağrısız ve etkili.",
        rating: 5,
        date: "Ocak 2025",
      },
    ],
  },
  {
    id: 10,
    slug: "sculpture",
    category: "bolgesel-incelme",
    title: "Sculpture Heykeltraş",
    description: "Vücut şekillendirme ve sıkılaştırma uygulaması.",
    image: "/slide/sld1.png",
    device: "Sculpture Heykeltraş Cihazı",
    duration: "45-60 dk",
    deviceImg: "",
    benefits: ["Bölgesel incelme", "Yağ dokusunda azalma", "Vücut kontürünü belirginleştirme", "Cilt sıkılaştırma"],
    detailedDescription:
      "Sculpture Heykeltraş, ultrasonik ve radyofrekans teknolojilerini kullanarak inatçı yağ birikimlerini hedefler ve parçalar. Bu işlem, cerrahi olmayan bir vücut şekillendirme yöntemidir. Bel, karın ve basen gibi bölgelerde incelme ve sıkılaşma sağlayarak hayalinizdeki vücut formuna ulaşmanıza yardımcı olur.",
    faq: [
      {
        question: "Kaç seans gereklidir?",
        answer: "Kişinin ihtiyacına göre değişmekle birlikte, ortalama 6-10 seans önerilmektedir.",
      },
      {
        question: "Uygulama güvenli midir?",
        answer: "Evet, Sculpture Heykeltraş FDA onaylı bir cihazdır ve güvenli bir şekilde uygulanır.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Oya E.",
        comment: "Bölgesel fazlalıklarımdan kurtulmak için harika bir yöntem. Kesinlikle tavsiye ederim.",
        rating: 5,
        date: "Mart 2025",
      },
      {
        id: 2,
        name: "Levent Y.",
        comment: "Kısa sürede incelme sağladı. Profesyonel hizmet için teşekkürler.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },

  // 🟢 Kalıcı Makyaj
  {
    id: 11,
    slug: "dudak-renklendirme",
    category: "kalici-makyaj",
    title: "Dudak Renklendirme",
    description: "Doğal ve kalıcı dudak renklendirme.",
    image: "/slide/sld2.jpg",
    device: "Kalıcı Makyaj Cihazı",
    duration: "120-150 dk",
    deviceImg: "",
    benefits: [
      "Dudaklara daha canlı bir görünüm",
      "Asimetri problemini giderme",
      "Her zaman bakımlı dudaklar",
      "Makyajdan tasarruf",
    ],
    detailedDescription:
      "Dudak renklendirme, dudaklarınıza doğal bir renk ve dolgunluk kazandıran kalıcı makyaj uygulamasıdır. Renk seçimi tamamen kişiye özel yapılır ve dudak yapınızdaki asimetriler giderilebilir. İşlem sonrasında dudaklarınız daha belirgin ve canlı bir görünüme sahip olur.",
    faq: [
      {
        question: "Acı hissi olur mu?",
        answer: "İşlem öncesinde lokal anestezi kremi kullanıldığı için minimal düzeyde acı hissedilir.",
      },
      {
        question: "Ne kadar süre kalıcıdır?",
        answer: "Kişiden kişiye değişmekle birlikte, ortalama 1-2 yıl kalıcılığını korur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "İrem B.",
        comment: "Dudaklarım artık daha canlı ve dolgun görünüyor. Sabahları makyaj yapma derdim kalmadı.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Ceyda M.",
        comment: "Doğal tonlarda harika bir işçilik. Çok memnunum.",
        rating: 5,
        date: "Ocak 2025",
      },
    ],
  },
  {
    id: 12,
    slug: "eyeliner-dipliner",
    category: "kalici-makyaj",
    title: "Eyeliner & Dipliner",
    description: "Kalıcı eyeliner ve dipliner uygulaması.",
    image: "/slide/sld3.png",
    device: "Kalıcı Makyaj Cihazı",
    duration: "60-90 dk",
    deviceImg: "",
    benefits: [
      "Gözlerin daha belirgin görünmesi",
      "Makyaja harcanan zamanı azaltma",
      "Terlemeye ve suya dayanıklı",
      "Her zaman kusursuz bir görünüm",
    ],
    detailedDescription:
      "Kalıcı eyeliner ve dipliner, gözlerinizi daha belirgin hale getirerek bakışlarınıza derinlik katar. Göz kapağınızın hemen üstüne veya kirpik diplerine uygulanan bu işlem, her zaman kusursuz ve taze bir makyaja sahip olmanızı sağlar. Uygulama, steril koşullarda ve profesyonel bir ekip tarafından yapılır.",
    faq: [
      {
        question: "İşlem sırasında şişme veya kızarıklık olur mu?",
        answer: "Hafif bir şişlik ve kızarıklık oluşabilir ancak bu durum kısa sürede geçer.",
      },
      {
        question: "Ne kadar kalıcıdır?",
        answer: "Kişiden kişiye ve cilt tipine göre değişmekle birlikte, 2-3 yıl kalıcılığını korur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sibel V.",
        comment: "Gözlerim daha belirginleşti, çok doğal duruyor. Gündelik hayatta büyük kolaylık.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Deniz A.",
        comment: "İşlem sırasında hiç acı hissetmedim. Sonuçlar beklentimin üstünde.",
        rating: 5,
        date: "Aralık 2024",
      },
    ],
  },
  {
    id: 13,
    slug: "kas-pigmentasyon",
    category: "kalici-makyaj",
    title: "Kaş Pigmentasyon",
    description: "Kalıcı kaş şekillendirme uygulaması.",
    image: "/slide/sld1.png",
    device: "Kalıcı Makyaj Cihazı",
    duration: "90-120 dk",
    deviceImg: "",
    benefits: [
      "Kaşlardaki boşlukları doldurma",
      "Daha dolgun ve simetrik kaşlar",
      "Yüz hatlarını belirginleştirme",
      "Doğal ve bakımlı bir görünüm",
    ],
    detailedDescription:
      "Kaş pigmentasyonu, kaşlarınızın daha dolgun, simetrik ve belirgin görünmesini sağlayan bir kalıcı makyaj tekniğidir. Kaş yapınıza ve yüz hatlarınıza en uygun şekil ve renk seçimi yapılarak, doğal bir görünüm elde edilir. Seyrek kaşları olan veya kaş şeklinden memnun olmayanlar için ideal bir çözümdür.",
    faq: [
      {
        question: "İşlem ne kadar acılıdır?",
        answer: "Uygulama öncesinde kullanılan anestezik kremler sayesinde işlem neredeyse ağrısızdır.",
      },
      {
        question: "Kaşlar ne kadar süre dayanır?",
        answer: "Ortalama olarak 1-2 yıl kalıcılığını korur. Yıllık rötuşlar ile ömrü uzatılabilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Eda K.",
        comment: "Kaşlarım artık çok daha dolgun ve düzgün. Yüzüme farklı bir ifade kattı.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Pelin Ö.",
        comment: "Uzmanlar çok profesyonel, istediğim kaş şeklini tam olarak yaptılar.",
        rating: 5,
        date: "Aralık 2024",
      },
    ],
  },
  {
    id: 14,
    slug: "microblading",
    category: "kalici-makyaj",
    title: "Microblading",
    description: "Kıl tekniğiyle doğal kaş tasarımı.",
    image: "/slide/sld2.jpg",
    device: "Microblading Kalemi",
    duration: "90-120 dk",
    deviceImg: "",
    benefits: ["Doğal kıl görünümü", "Seyrek kaşları doldurma", "Simetrik kaşlar", "Yüz hatlarına uygun tasarım"],
    detailedDescription:
      "Microblading, özel bir kalem ve mikro iğneler kullanılarak kaşlara kıl görünümlü pigmentlerin işlendiği bir tekniktir. Kaşları seyrek olan veya doğal bir kaş yapısı isteyenler için en ideal yöntemdir. Bu işlem, kaşların daha dolgun ve doğal bir görünüm kazanmasını sağlar.",
    faq: [
      {
        question: "Microblading ile normal kaş pigmentasyonu arasındaki fark nedir?",
        answer:
          "Microblading, kıl görünümü sağlayan daha ince ve doğal bir tekniktir, pigmentasyon ise pudralama veya dolgu etkisi yaratır.",
      },
      {
        question: "İşlem sonrası nelere dikkat etmeliyim?",
        answer: "İşlem sonrası ilk günlerde su temasından kaçınmak ve verilen özel kremleri kullanmak önemlidir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Büşra E.",
        comment: "Çok doğal duruyor, kimse kalıcı makyaj olduğunu anlamıyor. Mükemmel bir işçilik.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Selin P.",
        comment: "Seyrek kaşlarıma çare oldu. Çok memnunum, herkese tavsiye ederim.",
        rating: 5,
        date: "Mart 2025",
      },
    ],
  },

  // 🟢 Tırnak & Kirpik
  {
    id: 15,
    slug: "ipek-kirpik",
    category: "tirnak-kirpik",
    title: "İpek Kirpik",
    description: "Daha uzun ve dolgun kirpikler için uygulama.",
    image: "/slide/sld3.png",
    device: "Profesyonel Kirpik Uygulama Kiti",
    duration: "90-120 dk",
    deviceImg: "",
    benefits: [
      "Daha uzun ve dolgun kirpikler",
      "Makyaja ihtiyaç duymama",
      "Gözlerin daha çekici görünmesi",
      "Doğal ve hafif bir his",
    ],
    detailedDescription:
      "İpek kirpik, kendi kirpiklerinizin üzerine tek tek yapay ipek kirpiklerin eklenmesiyle yapılan bir işlemdir. Bu işlem sayesinde kirpikleriniz daha uzun, hacimli ve kıvrık bir görünüme sahip olur. Uygulama, göz yapınıza uygun olarak kişiye özel tasarlanır.",
    faq: [
      {
        question: "İpek kirpikler ne kadar süre dayanır?",
        answer: "Doğal kirpiklerin dökülme döngüsüne bağlı olarak ortalama 3-4 hafta kalıcılığını korur.",
      },
      {
        question: "Uygulama sonrası nelere dikkat etmeliyim?",
        answer: "Yağ bazlı makyaj temizleyicilerden kaçınmak, kirpikleri ovalamamak ve düzenli taramak önemlidir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Merve D.",
        comment: "Gözlerim çok daha anlamlı bakıyor. Uygulama sırasında hiç rahatsız olmadım.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Özlem S.",
        comment: "Sonuçlar harika, kirpiklerim doğal görünüyor ama çok daha dolgun.",
        rating: 5,
        date: "Aralık 2024",
      },
    ],
  },
  {
    id: 16,
    slug: "protez-tirnak",
    category: "tirnak-kirpik",
    title: "Protez Tırnak & Manikür",
    description: "Bakımlı eller için protez tırnak ve manikür.",
    image: "/slide/sld1.png",
    device: "UV/LED Tırnak Kurutma Lambası",
    duration: "90-120 dk",
    deviceImg: "",
    benefits: [
      "Dayanıklı ve sağlam tırnaklar",
      "Estetik ve şık görünüm",
      "Tırnak yeme alışkanlığından kurtulma",
      "Uzun süre kalıcı manikür",
    ],
    detailedDescription:
      "Protez tırnak, zayıf ve çabuk kırılan tırnaklar için ideal bir çözümdür. Tırnağın üzerine jel veya akrilik gibi özel malzemeler uygulanarak hem estetik hem de dayanıklı bir tırnak yapısı oluşturulur. Bu işlem, ellerinizin her zaman bakımlı ve şık görünmesini sağlar.",
    faq: [
      {
        question: "Protez tırnaklar doğal tırnağıma zarar verir mi?",
        answer: "Profesyonel bir şekilde uygulandığında ve çıkarıldığında doğal tırnağa zarar vermez.",
      },
      {
        question: "Ne sıklıkla bakımı yapılmalıdır?",
        answer: "Ortalama 3-4 haftada bir dolgu veya bakım yapılması önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sultan G.",
        comment: "Tırnaklarım artık kırılmıyor ve her zaman bakımlı görünüyor. Hizmet kalitesi harika.",
        rating: 5,
        date: "Mart 2025",
      },
      {
        id: 2,
        name: "Ayten H.",
        comment: "Protez tırnaklarım çok dayanıklı ve estetik duruyor. Manikür de çok özenliydi.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },

  // 🟢 Saç Bakımı
  {
    id: 17,
    slug: "sac-bakimi",
    category: "sac-bakimi",
    title: "Saç Bakımı",
    description: "Saç dökülmesi ve cansız saçlar için bakım.",
    image: "/slide/sld2.jpg",
    device: "Profesyonel Saç Bakım Cihazları",
    duration: "60-90 dk",
    deviceImg: "",
    benefits: [
      "Saç dökülmesini azaltma",
      "Saçları güçlendirme",
      "Canlı ve parlak saçlar",
      "Saç derisi sağlığını iyileştirme",
    ],
    detailedDescription:
      "Saç dökülmesi, kepek veya cansız saçlar için özel olarak tasarlanmış bakım hizmetleri sunuyoruz. Saç tipinize ve probleminize uygun olarak vitamin ve mineral takviyeleri yapılır. Profesyonel cihazlarla desteklenen bu bakımlar, saç köklerinizi besleyerek saçlarınızın daha sağlıklı ve gür uzamasını sağlar.",
    faq: [
      {
        question: "Saç bakımı kimler için uygundur?",
        answer: "Saç dökülmesi, yıpranmış ve cansız saçlara sahip olan herkes için uygundur.",
      },
      {
        question: "Kaç seans gereklidir?",
        answer: "Problemin ciddiyetine bağlı olarak değişir, ancak ortalama 4-6 seans önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Gülşah M.",
        comment: "Saç dökülmem azaldı ve saçlarım daha parlak oldu. Uzmanlar çok ilgili ve bilgili.",
        rating: 5,
        date: "Mart 2025",
      },
      {
        id: 2,
        name: "Ali R.",
        comment: "Kepek problemim çözüldü, saç derim rahatladı. Tavsiye ederim.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },

  // 🟢 Anti-Age & Özel Bakımlar
  {
    id: 18,
    slug: "cilt-genclestirme",
    category: "anti-age",
    title: "Cilt Gençleştirme & Anti-Age",
    description: "Yaşlanma karşıtı gençleştirme uygulamaları.",
    image: "/slide/sld3.png",
    device: "HIFU Cihazı",
    duration: "60-90 dk",
    deviceImg: "",
    benefits: [
      "İnce çizgi ve kırışıklıklarda azalma",
      "Yüzde lifting etkisi",
      "Kolajen üretimini artırma",
      "Ciltte sıkılaşma ve toparlanma",
    ],
    detailedDescription:
      "Cilt gençleştirme uygulamalarımız, cildin alt katmanlarındaki kolajen ve elastin liflerini uyararak cildin kendini yenilemesini sağlar. HIFU gibi yüksek teknoloji cihazlarla uygulanan bu bakımlar, cerrahi olmayan bir şekilde yüz ve boyun bölgesinde lifting etkisi yaratır. Daha genç ve dinlenmiş bir görünüme kavuşmanıza yardımcı olur.",
    faq: [
      {
        question: "Hangi yaş aralığı için uygundur?",
        answer: "Genellikle 30 yaş ve üzeri, cilt sarkması ve kırışıklık problemi olan herkes için uygundur.",
      },
      {
        question: "Kaç seans gerekir?",
        answer: "Tek seans genellikle yeterli olmakla birlikte, cilt yapısına göre ek seanslar önerilebilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Nermin A.",
        comment: "Yüzümdeki ince çizgiler azaldı, daha genç görünüyorum. Harika bir deneyim.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Hülya Y.",
        comment: "Acısız ve etkili bir yöntem. Cildim daha sıkı hissediyorum.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },
  {
    id: 19,
    slug: "24k-altin-tozu",
    category: "anti-age",
    title: "24K Altın Tozu Cilt Bakımı",
    description: "Cildinize ışıltı kazandıran altın tozlu bakım.",
    image: "/slide/sld1.png",
    device: "Ultrasonik Cilt Bakım Cihazı",
    duration: "60 dk",
    deviceImg: "",
    benefits: [
      "Cilde parlaklık ve ışıltı katma",
      "Cilt yenilenmesini hızlandırma",
      "Detoks etkisi",
      "İnce çizgi görünümünü azaltma",
    ],
    detailedDescription:
      "24K altın tozu bakımı, cildinize lüks ve etkili bir dokunuş sunar. Altın partikülleri, cildin yenilenme sürecini destekler, toksinleri atar ve kan dolaşımını hızlandırır. Bu bakım sonrasında cildiniz daha canlı, parlak ve genç bir görünüme kavuşur.",
    faq: [
      {
        question: "Bakım sonrası nelere dikkat etmeliyim?",
        answer: "Cildin nemli tutulması ve güneşten korunması önemlidir.",
      },
      {
        question: "Hangi cilt tiplerine uygundur?",
        answer: "Tüm cilt tipleri için uygundur, özellikle solgun ve yorgun ciltler için idealdir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Aslı D.",
        comment: "Cildim altın gibi parladı. Çok özel ve lüks bir his.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Ayşe Z.",
        comment: "Cildim nemlendi ve daha canlı görünüyor. Çok rahatlatıcı bir seanstı.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },
  {
    id: 20,
    slug: "ignesiz-mezoterapi",
    category: "anti-age",
    title: "İğnesiz Mezoterapi",
    description: "Cilt altına iğnesiz yöntemle vitamin uygulaması.",
    image: "/slide/sld2.jpg",
    device: "Elektroporasyon Cihazı",
    duration: "45-60 dk",
    deviceImg: "",
    benefits: [
      "Ciltte gençleşme ve sıkılaşma",
      "Kırışıklık ve leke görünümünde azalma",
      "Ağrısız ve konforlu işlem",
      "Cildin nem dengesini sağlama",
    ],
    detailedDescription:
      "İğnesiz mezoterapi, cildin ihtiyacı olan vitamin, mineral ve hyaluronik asit gibi maddelerin, özel bir cihaz (elektroporasyon) yardımıyla iğne kullanılmadan cilt altına ulaştırılmasıdır. Bu yöntem, iğne fobisi olanlar için ideal bir alternatif sunar. Cildin kolajen üretimini tetikleyerek daha genç ve sağlıklı bir görünüm sağlar.",
    faq: [
      {
        question: "İşlem sırasında herhangi bir acı olur mu?",
        answer: "Hayır, işlem tamamen ağrısız ve konforludur. Cildinizde hafif bir karıncalanma hissi oluşabilir.",
      },
      {
        question: "Kaç seans gereklidir?",
        answer: "Cilt problemine bağlı olarak değişir, ancak ortalama 4-6 seanslık bir kür önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sibel P.",
        comment: "İğneden korkanlar için harika bir alternatif. Cildim beslendi ve toparlandı.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Kader S.",
        comment: "Ağrısız bir işlem ve sonuçları çok etkili. Yüzüm daha gergin görünüyor.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },
]

export const serviceCategories = [
  {
    id: "epilasyon",
    name: "Epilasyon",
    seoTitle: "Sultanbeyli Epilasyon Merkezi - Lazer ve İğneli Epilasyon",
    description:
      "Sultanbeyli epilasyon merkezi. Lazer epilasyon ve iğneli epilasyon hizmetleri. Falcon 4 Pro cihazı ile kalıcı tüy azaltma.",
    keywords: ["sultanbeyli lazer epilasyon", "sultanbeyli iğneli epilasyon", "kalıcı epilasyon", "tüy azaltma"],
  },
  {
    id: "cilt-bakimi",
    name: "Cilt Bakımı",
    seoTitle: "Sultanbeyli Cilt Bakımı - Leke Bakımı, Akne Tedavisi",
    description:
      "Sultanbeyli cilt bakımı merkezi. Leke bakımı, akne tedavisi, yosun peeling ve profesyonel cilt bakım hizmetleri.",
    keywords: ["sultanbeyli cilt bakımı", "sultanbeyli leke bakımı", "sultanbeyli akne bakımı", "yosun peeling"],
  },
  {
    id: "bolgesel-incelme",
    name: "Bölgesel İncelme",
    seoTitle: "Sultanbeyli Bölgesel İncelme - G5 Masajı, EmSlim Fit",
    description:
      "Sultanbeyli bölgesel incelme merkezi. G5 masajı, EmSlim Fit, Primex ve Sculpture ile vücut şekillendirme.",
    keywords: ["sultanbeyli g5 masajı", "sultanbeyli emslim fit", "sultanbeyli primex", "sultanbeyli sculpture"],
  },
  {
    id: "kalici-makyaj",
    name: "Kalıcı Makyaj",
    seoTitle: "Sultanbeyli Kalıcı Makyaj - Microblading, Dudak Renklendirme",
    description:
      "Sultanbeyli kalıcı makyaj merkezi. Microblading, kaş pigmentasyon, dudak renklendirme ve eyeliner uygulamaları.",
    keywords: [
      "sultanbeyli microblading",
      "sultanbeyli kaş pigmentasyon",
      "sultanbeyli dudak renklendirme",
      "sultanbeyli eyeliner",
    ],
  },
  {
    id: "tirnak-kirpik",
    name: "Tırnak & Kirpik",
    seoTitle: "Sultanbeyli İpek Kirpik - Protez Tırnak, Manikür",
    description:
      "Sultanbeyli ipek kirpik ve protez tırnak hizmetleri. Profesyonel manikür ve kirpik uzatma uygulamaları.",
    keywords: ["sultanbeyli ipek kirpik", "sultanbeyli protez tırnak", "sultanbeyli manikür"],
  },
  {
    id: "sac-bakimi",
    name: "Saç Bakımı",
    seoTitle: "Sultanbeyli Saç Bakımı - Saç Dökülmesi Tedavisi",
    description: "Sultanbeyli saç bakımı merkezi. Saç dökülmesi tedavisi ve profesyonel saç bakım hizmetleri.",
    keywords: ["sultanbeyli saç bakımı", "saç dökülmesi tedavisi"],
  },
  {
    id: "anti-age",
    name: "Anti-Age & Özel Bakımlar",
    seoTitle: "Sultanbeyli Cilt Gençleştirme - Anti-Age, Altın Tozu Bakımı",
    description:
      "Sultanbeyli anti-age merkezi. Cilt gençleştirme, 24K altın tozu bakımı ve iğnesiz mezoterapi hizmetleri.",
    keywords: [
      "sultanbeyli cilt gençleştirme",
      "sultanbeyli anti-age",
      "sultanbeyli altın tozu bakımı",
      "sultanbeyli iğnesiz mezoterapi",
    ],
  },
]
