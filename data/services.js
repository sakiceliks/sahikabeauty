export const categories = [
  { id: "epilasyon", name: "Epilasyon" },
  { id: "cilt-bakimi", name: "Cilt Bakımı" },
  { id: "bolgesel-incelme", name: "Bölgesel İncelme" },
  { id: "kalici-makyaj", name: "Kalıcı Makyaj" },
  { id: "tirnak-kirpik", name: "Tırnak & Kirpik" },
  { id: "sac-bakimi", name: "Saç Bakımı" },
  { id: "anti-age", name: "Anti-Age & Özel Bakımlar" },
];

export const services = [
  // 🟢 Epilasyon
  {
    id: 1,
    slug: "lazer-epilasyon",
    category: "epilasyon",
    title: "Lazer Epilasyon",
    description: "Falcon 4 Pro cihazıyla kalıcı ve etkili lazer epilasyon.",
    image: "/assets/services/lazer-epilasyon.png",
    device: "Falcon 4 Pro",
    duration: "45-60 dk",
 deviceImg:"",   
benefits: [
      "Uzman ekip tarafından uygulama",
      "Hijyenik ve güvenli ortam",
      "Son teknoloji cihazlar",
      "Kişiye özel tedavi planı",
    ],
    detailedDescription:
      "Lazer epilasyon, istenmeyen tüylerden kalıcı olarak kurtulmanın en etkili ve modern yollarından biridir. Falcon 4 Pro cihazımız, tüm cilt tiplerine uyumlu başlıkları sayesinde acısız ve konforlu bir deneyim sunar. Uygulama süresi, bölgeye göre değişiklik gösterir. Genellikle 6-8 seans sonunda kalıcı sonuçlar elde edilir.",
    faq: [
      {
        question: "Kaç seans gerekir?",
        answer:
          "Ortalama olarak 6-8 seans yeterli olmaktadır. Bu sayı, kıl yapınıza ve hormonel durumunuza göre değişebilir.",
      },
      {
        question: "Uygulama acı verir mi?",
        answer:
          "Hayır. Falcon 4 Pro'nun soğutma sistemi sayesinde işlem sırasında minimal düzeyde bir rahatsızlık hissedilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Ayşe K.",
        comment: "İlk seansımdan sonra farkı gördüm, çok memnun kaldım.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Zeynep D.",
        comment: "Acısız ve etkili bir uygulama, kesinlikle tavsiye ederim.",
        rating: 5,
        date: "Kasım 2024",
      },
      {
        id: 3,
        name: "Burcu M.",
        comment: "Personel çok ilgili, sonuçlar harika!",
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
    description: "Kalıcı tüy giderimi için profesyonel iğneli epilasyon.",
    image: "/assets/services/igneli-epilasyon.png",
    device: "Profesyonel İğneli Epilasyon Cihazı",
    duration: "15-60 dk",
 deviceImg:"",   
benefits: [
      "İnce ve beyaz tüylerde etkili sonuç",
      "Kalıcı çözüm",
      "Uzman estetisyen tarafından uygulama",
      "Steril ortam",
    ],
    detailedDescription:
      "İğneli epilasyon, lazerin etki etmediği ince ve beyaz tüyler için ideal bir çözümdür. Her bir kıl köküne özel bir iğne ile elektrik akımı verilerek kökün tahrip edilmesi sağlanır. Uzmanlarımız tarafından steril bir ortamda gerçekleştirilen bu işlem, kalıcı ve kesin sonuçlar sunar.",
    faq: [
      {
        question: "İğneli epilasyon ağrılı mıdır?",
        answer:
          "Uygulama sırasında hafif bir batma hissi oluşabilir. İhtiyaç duyulursa lokal anestezi kremleri kullanılabilir.",
      },
      {
        question: "Kaç seans sürer?",
        answer:
          "Kıl yoğunluğuna ve bölgeye bağlı olarak seans sayısı değişir. Kılların büyüme döngüsüne uygun plan yapılır.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Elif S.",
        comment:
          "Kalıcı çözüm arayanlar için en doğru adres. Çok titiz çalışıyorlar.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Seda A.",
        comment: "Çok memnun kaldım, artık tüylerimden kurtuldum. Teşekkürler.",
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
    description: "Cildinizi yenileyen ve canlandıran bakım çözümleri.",
    image: "/assets/services/cilt-bakimi.png",
    device: "HydraFacial Cihazı",
    duration: "60-90 dk",
 deviceImg:"",   
benefits: [
      "Cildin derinlemesine temizliği",
      "Gözeneklerin sıkılaşması",
      "Canlı ve parlak bir görünüm",
      "Tüm cilt tiplerine uygunluk",
    ],
    detailedDescription:
      "Profesyonel cilt bakımı, cildinizi ölü hücrelerden arındırır, gözenekleri temizler ve nem dengesini sağlar. HydraFacial gibi son teknoloji cihazlarla uygulanan bakımlarımız, cildinize ihtiyaç duyduğu vitamin ve mineralleri kazandırarak daha sağlıklı ve genç bir görünüm elde etmenizi sağlar.",
    faq: [
      {
        question: "Cilt bakımı ne sıklıkla yapılmalı?",
        answer:
          "Ayda bir seans düzenli bakım yapılması cildin sağlığı için idealdir.",
      },
      {
        question: "Hassas ciltler için uygun mu?",
        answer:
          "Evet, kullandığımız ürünler ve cihazlar hassas ciltler de dahil olmak üzere tüm cilt tiplerine uygundur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Fatma Y.",
        comment: "Cildim ışıl ışıl oldu. Kendimi çok iyi hissediyorum.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Ebru G.",
        comment:
          "Profesyonel bir ekip ve harika bir hizmet. Kesinlikle tavsiye ederim.",
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
    description: "Cilt lekelerini azaltmaya yönelik özel bakım.",
    image: "/assets/services/leke-bakimi.png",
    device: "Q-Switched Lazer",
    duration: "45-60 dk",
 deviceImg:"",   
benefits: [
      "Güneş ve yaşlılık lekelerinde azalma",
      "Cilt tonu eşitsizliğinin giderilmesi",
      "Ciltte aydınlanma",
      "Kişiye özel protokol",
    ],
    detailedDescription:
      "Cilt lekeleri, güneş ışınları, yaşlanma ve hormonal değişimler gibi birçok nedenle oluşabilir. Leke bakımımız, Q-Switched lazer ve özel serumlarla cildin üst katmanındaki melanin pigmentini hedef alarak lekelerin görünümünü azaltmayı amaçlar. Uygulama sonrasında cildiniz daha aydınlık ve eşit bir tona kavuşur.",
    faq: [
      {
        question: "Leke bakımı kalıcı mıdır?",
        answer:
          "Lekelerin büyük bir kısmı kalıcı olarak yok edilebilir. Ancak yeni leke oluşumunu önlemek için güneşten korunmak çok önemlidir.",
      },
      {
        question: "Tedavi sonrası nelere dikkat etmeliyim?",
        answer:
          "Güneş kremi kullanımı ve cildi tahriş edecek ürünlerden uzak durmak gereklidir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Demet P.",
        comment:
          "Güneş lekelerim belirgin bir şekilde azaldı. Sonuçtan çok memnunum.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Funda Ö.",
        comment:
          "Uzmanlar çok bilgili, cildimdeki farkı hemen hissettim.",
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
    image: "/assets/services/akne-bakimi.png",
    device: "Mavi Işık Terapi Cihazı",
    duration: "45-60 dk",
 deviceImg:"",   
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
        answer:
          "Ergenlikten itibaren her yaş grubundaki akne problemi olan bireyler için uygundur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Cemre T.",
        comment:
          "Akne problemim büyük oranda çözüldü. Düzenli seanslar çok etkili oldu.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Kerem B.",
        comment:
          "İnanılmaz bir değişim yaşadım, cildim pürüzsüzleşti.",
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
    image: "/assets/services/yosun-peeling.png",
    device: "Profesyonel Peeling Sistemi",
    duration: "45-60 dk",
 deviceImg:"",   
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
        answer:
          "Yosun peeling, özellikle sonbahar ve kış aylarında yapılması önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Melike N.",
        comment:
          "Doğal içerikli olması çok hoşuma gitti. Cildim canlandı ve nefes aldı.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Gizem A.",
        comment:
          "Harika bir deneyimdi, cildim bebek gibi oldu.",
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
    image: "/assets/services/g5-masaji.png",
    device: "G5 Masaj Cihazı",
    duration: "30-45 dk",
 deviceImg:"",   
benefits: [
      "Selülit görünümünde azalma",
      "Bölgesel incelme",
      "Ödem atma",
      "Kan dolaşımını hızlandırma",
    ],
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
        answer:
          "Genellikle 5-10 seans sonrasında gözle görülür sonuçlar elde edilebilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Didem F.",
        comment:
          "Selülitlerim gözle görülür şekilde azaldı. Masaj çok rahatlatıcı.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Pınar K.",
        comment:
          "Ödemimden kurtuldum ve vücudum daha sıkı hissediyorum.",
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
    image: "/assets/services/emslimfit.png",
    device: "EmSlimFit",
    duration: "30 dk",
 deviceImg:"",   
benefits: [
      "Yağ yakımını hızlandırma",
      "Kas kütlesini artırma",
      "Vücut şekillendirme",
      "Bölgesel sıkılaştırma",
    ],
    detailedDescription:
      "EmSlim Fit, yüksek yoğunluklu elektromanyetik alan (HIFEM) teknolojisi kullanarak kasları yoğun bir şekilde çalıştırır. 30 dakikalık bir seans, binlerce mekik veya squat hareketine eşdeğer kas kasılması sağlar. Bu sayede hem yağ yakımı hızlanır hem de kaslar belirginleşerek daha fit bir vücut yapısı elde edilir.",
    faq: [
      {
        question: "Acı verici bir işlem midir?",
        answer:
          "Hayır, işlem sırasında kaslarda yoğun bir kasılma hissedilir, ancak ağrı veya acı olmaz.",
      },
      {
        question: "Ne sıklıkla uygulanmalıdır?",
        answer:
          "İhtiyaca göre haftada 2-3 seans uygulanması tavsiye edilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Hakan U.",
        comment:
          "Spor yapmaya vakti olmayanlar için mükemmel bir yöntem. Karnımdaki kaslar belirginleşti.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Selin S.",
        comment:
          "Sadece birkaç seansla harika sonuçlar aldım. Çok mutluyum.",
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
    image: "/assets/services/primex.png",
    device: "Primex",
    duration: "45-60 dk",
 deviceImg:"",   
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
        answer:
          "İşlem sonrası herhangi bir yan etki görülmez. Günlük hayatınıza hemen devam edebilirsiniz.",
      },
      {
        question: "Sonuçlar kalıcı mı?",
        answer:
          "Evet, doğru bakım ile sonuçlar uzun süre kalıcıdır. Yıllık hatırlatma seansları önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Nazan C.",
        comment:
          "Cildimdeki sarkmalar için harika bir çözüm. Yüzüm daha gergin görünüyor.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Zehra D.",
        comment:
          "Çok rahat bir seans, ağrısız ve etkili.",
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
    image: "/assets/services/sculpture.png",
    device: "Sculpture Heykeltraş Cihazı",
    duration: "45-60 dk",
 deviceImg:"",   
benefits: [
      "Bölgesel incelme",
      "Yağ dokusunda azalma",
      "Vücut kontürünü belirginleştirme",
      "Cilt sıkılaştırma",
    ],
    detailedDescription:
      "Sculpture Heykeltraş, ultrasonik ve radyofrekans teknolojilerini kullanarak inatçı yağ birikimlerini hedefler ve parçalar. Bu işlem, cerrahi olmayan bir vücut şekillendirme yöntemidir. Bel, karın ve basen gibi bölgelerde incelme ve sıkılaşma sağlayarak hayalinizdeki vücut formuna ulaşmanıza yardımcı olur.",
    faq: [
      {
        question: "Kaç seans gereklidir?",
        answer:
          "Kişinin ihtiyacına göre değişmekle birlikte, ortalama 6-10 seans önerilmektedir.",
      },
      {
        question: "Uygulama güvenli midir?",
        answer:
          "Evet, Sculpture Heykeltraş FDA onaylı bir cihazdır ve güvenli bir şekilde uygulanır.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Oya E.",
        comment:
          "Bölgesel fazlalıklarımdan kurtulmak için harika bir yöntem. Kesinlikle tavsiye ederim.",
        rating: 5,
        date: "Mart 2025",
      },
      {
        id: 2,
        name: "Levent Y.",
        comment:
          "Kısa sürede incelme sağladı. Profesyonel hizmet için teşekkürler.",
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
    image: "/assets/services/dudak-renklendirme.png",
    device: "Kalıcı Makyaj Cihazı",
    duration: "120-150 dk",
 deviceImg:"",   
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
        answer:
          "İşlem öncesinde lokal anestezi kremi kullanıldığı için minimal düzeyde acı hissedilir.",
      },
      {
        question: "Ne kadar süre kalıcıdır?",
        answer:
          "Kişiden kişiye değişmekle birlikte, ortalama 1-2 yıl kalıcılığını korur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "İrem B.",
        comment:
          "Dudaklarım artık daha canlı ve dolgun görünüyor. Sabahları makyaj yapma derdim kalmadı.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Ceyda M.",
        comment:
          "Doğal tonlarda harika bir işçilik. Çok memnunum.",
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
    image: "/assets/services/eyeliner-dipliner.png",
    device: "Kalıcı Makyaj Cihazı",
    duration: "60-90 dk",
 deviceImg:"",   
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
        answer:
          "Hafif bir şişlik ve kızarıklık oluşabilir ancak bu durum kısa sürede geçer.",
      },
      {
        question: "Ne kadar kalıcıdır?",
        answer:
          "Kişiden kişiye ve cilt tipine göre değişmekle birlikte, 2-3 yıl kalıcılığını korur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sibel V.",
        comment:
          "Gözlerim daha belirginleşti, çok doğal duruyor. Gündelik hayatta büyük kolaylık.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Deniz A.",
        comment:
          "İşlem sırasında hiç acı hissetmedim. Sonuçlar beklentimin üstünde.",
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
    image: "/assets/services/kas-pigmentasyon.png",
    device: "Kalıcı Makyaj Cihazı",
    duration: "90-120 dk",
 deviceImg:"",   
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
        answer:
          "Uygulama öncesinde kullanılan anestezik kremler sayesinde işlem neredeyse ağrısızdır.",
      },
      {
        question: "Kaşlar ne kadar süre dayanır?",
        answer:
          "Ortalama olarak 1-2 yıl kalıcılığını korur. Yıllık rötuşlar ile ömrü uzatılabilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Eda K.",
        comment:
          "Kaşlarım artık çok daha dolgun ve düzgün. Yüzüme farklı bir ifade kattı.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Pelin Ö.",
        comment:
          "Uzmanlar çok profesyonel, istediğim kaş şeklini tam olarak yaptılar.",
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
    image: "/assets/services/microblading.png",
    device: "Microblading Kalemi",
    duration: "90-120 dk",
 deviceImg:"",   
benefits: [
      "Doğal kıl görünümü",
      "Seyrek kaşları doldurma",
      "Simetrik kaşlar",
      "Yüz hatlarına uygun tasarım",
    ],
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
        answer:
          "İşlem sonrası ilk günlerde su temasından kaçınmak ve verilen özel kremleri kullanmak önemlidir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Büşra E.",
        comment:
          "Çok doğal duruyor, kimse kalıcı makyaj olduğunu anlamıyor. Mükemmel bir işçilik.",
        rating: 5,
        date: "Şubat 2025",
      },
      {
        id: 2,
        name: "Selin P.",
        comment:
          "Seyrek kaşlarıma çare oldu. Çok memnunum, herkese tavsiye ederim.",
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
    image: "/assets/services/ipek-kirpik.png",
    device: "Profesyonel Kirpik Uygulama Kiti",
    duration: "90-120 dk",
 deviceImg:"",   
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
        answer:
          "Doğal kirpiklerin dökülme döngüsüne bağlı olarak ortalama 3-4 hafta kalıcılığını korur.",
      },
      {
        question: "Uygulama sonrası nelere dikkat etmeliyim?",
        answer:
          "Yağ bazlı makyaj temizleyicilerden kaçınmak, kirpikleri ovalamamak ve düzenli taramak önemlidir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Merve D.",
        comment:
          "Gözlerim çok daha anlamlı bakıyor. Uygulama sırasında hiç rahatsız olmadım.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Özlem S.",
        comment:
          "Sonuçlar harika, kirpiklerim doğal görünüyor ama çok daha dolgun.",
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
    image: "/assets/services/protez-tirnak.png",
    device: "UV/LED Tırnak Kurutma Lambası",
    duration: "90-120 dk",
 deviceImg:"",   
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
        answer:
          "Profesyonel bir şekilde uygulandığında ve çıkarıldığında doğal tırnağa zarar vermez.",
      },
      {
        question: "Ne sıklıkla bakımı yapılmalıdır?",
        answer:
          "Ortalama 3-4 haftada bir dolgu veya bakım yapılması önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sultan G.",
        comment:
          "Tırnaklarım artık kırılmıyor ve her zaman bakımlı görünüyor. Hizmet kalitesi harika.",
        rating: 5,
        date: "Mart 2025",
      },
      {
        id: 2,
        name: "Ayten H.",
        comment:
          "Protez tırnaklarım çok dayanıklı ve estetik duruyor. Manikür de çok özenliydi.",
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
    image: "/assets/services/sac-bakimi.png",
    device: "Profesyonel Saç Bakım Cihazları",
    duration: "60-90 dk",
 deviceImg:"",   
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
        answer:
          "Saç dökülmesi, yıpranmış ve cansız saçlara sahip olan herkes için uygundur.",
      },
      {
        question: "Kaç seans gereklidir?",
        answer:
          "Problemin ciddiyetine bağlı olarak değişir, ancak ortalama 4-6 seans önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Gülşah M.",
        comment:
          "Saç dökülmem azaldı ve saçlarım daha parlak oldu. Uzmanlar çok ilgili ve bilgili.",
        rating: 5,
        date: "Mart 2025",
      },
      {
        id: 2,
        name: "Ali R.",
        comment:
          "Kepek problemim çözüldü, saç derim rahatladı. Tavsiye ederim.",
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
    image: "/assets/services/cilt-genclestirme.png",
    device: "HIFU Cihazı",
    duration: "60-90 dk",
 deviceImg:"",   
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
        answer:
          "Genellikle 30 yaş ve üzeri, cilt sarkması ve kırışıklık problemi olan herkes için uygundur.",
      },
      {
        question: "Kaç seans gerekir?",
        answer:
          "Tek seans genellikle yeterli olmakla birlikte, cilt yapısına göre ek seanslar önerilebilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Nermin A.",
        comment:
          "Yüzümdeki ince çizgiler azaldı, daha genç görünüyorum. Harika bir deneyim.",
        rating: 5,
        date: "Aralık 2024",
      },
      {
        id: 2,
        name: "Hülya Y.",
        comment:
          "Acısız ve etkili bir yöntem. Cildim daha sıkı hissediyorum.",
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
    image: "/assets/services/24k-altin-bakim.png",
    device: "Ultrasonik Cilt Bakım Cihazı",
    duration: "60 dk",
 deviceImg:"",   
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
        answer:
          "Cildin nemli tutulması ve güneşten korunması önemlidir.",
      },
      {
        question: "Hangi cilt tiplerine uygundur?",
        answer:
          "Tüm cilt tipleri için uygundur, özellikle solgun ve yorgun ciltler için idealdir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Aslı D.",
        comment:
          "Cildim altın gibi parladı. Çok özel ve lüks bir his.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Ayşe Z.",
        comment:
          "Cildim nemlendi ve daha canlı görünüyor. Çok rahatlatıcı bir seanstı.",
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
    image: "/assets/services/ignesiz-mezoterapi.png",
    device: "Elektroporasyon Cihazı",
    duration: "45-60 dk",
 deviceImg:"",   
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
        answer:
          "Hayır, işlem tamamen ağrısız ve konforludur. Cildinizde hafif bir karıncalanma hissi oluşabilir.",
      },
      {
        question: "Kaç seans gereklidir?",
        answer:
          "Cilt problemine bağlı olarak değişir, ancak ortalama 4-6 seanslık bir kür önerilir.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sibel P.",
        comment:
          "İğneden korkanlar için harika bir alternatif. Cildim beslendi ve toparlandı.",
        rating: 5,
        date: "Ocak 2025",
      },
      {
        id: 2,
        name: "Kader S.",
        comment:
          "Ağrısız bir işlem ve sonuçları çok etkili. Yüzüm daha gergin görünüyor.",
        rating: 5,
        date: "Şubat 2025",
      },
    ],
  },
];