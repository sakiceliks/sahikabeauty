"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
// Adding SEO components and schemas
import JsonLd from "@/components/JsonLd"
import { generateBreadcrumbSchema } from "@/lib/seo-schemas"

// SEO-optimized blog categories with keywords
export const blogCategories = [
  {
    id: "all",
    name: "Tümü",
    seoTitle: "Sultanbeyli Güzellik Merkezi Blog - Güzellik İpuçları ve Rehberler",
    description:
      "Sultanbeyli güzellik merkezi blog sayfası. Güzellik ipuçları, cilt bakımı rehberleri, epilasyon bilgileri ve uzman tavsiyeleri.",
  },
  {
    id: "epilasyon",
    name: "Epilasyon",
    seoTitle: "Sultanbeyli Epilasyon Rehberleri - Lazer Epilasyon İpuçları",
    description:
      "Sultanbeyli lazer epilasyon rehberleri. Epilasyon öncesi hazırlık, bakım ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "cilt-bakimi",
    name: "Cilt Bakımı",
    seoTitle: "Sultanbeyli Cilt Bakımı Rehberleri - Güzellik İpuçları",
    description: "Sultanbeyli cilt bakımı rehberleri. Cilt bakım rutinleri, leke bakımı ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "bolgesel-incelme",
    name: "Bölgesel İncelme",
    seoTitle: "Sultanbeyli Bölgesel İncelme Rehberleri - Vücut Şekillendirme",
    description:
      "Sultanbeyli bölgesel incelme rehberleri. Vücut şekillendirme ipuçları, masaj teknikleri ve uzman tavsiyeleri.",
  },
  {
    id: "kalici-makyaj",
    name: "Kalıcı Makyaj",
    seoTitle: "Sultanbeyli Kalıcı Makyaj Rehberleri - Microblading İpuçları",
    description:
      "Sultanbeyli kalıcı makyaj rehberleri. Microblading bakımı, kalıcı makyaj ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "tirnak-kirpik",
    name: "Tırnak & Kirpik",
    seoTitle: "Sultanbeyli Tırnak ve Kirpik Bakımı Rehberleri",
    description:
      "Sultanbeyli tırnak ve kirpik bakımı rehberleri. İpek kirpik bakımı, tırnak bakım ipuçları ve uzman tavsiyeleri.",
  },
  {
    id: "sac-bakimi",
    name: "Saç Bakımı",
    seoTitle: "Sultanbeyli Saç Bakımı Rehberleri - Saç Dökülmesi İpuçları",
    description: "Sultanbeyli saç bakımı rehberleri. Saç dökülmesi önleme, saç bakım rutinleri ve uzman tavsiyeleri.",
  },
  {
    id: "anti-age",
    name: "Anti-Age & Özel Bakımlar",
    seoTitle: "Sultanbeyli Anti-Age Rehberleri - Cilt Gençleştirme İpuçları",
    description:
      "Sultanbeyli anti-age rehberleri. Cilt gençleştirme ipuçları, yaşlanma karşıtı bakım ve uzman tavsiyeleri.",
  },
]

// SEO-optimized blog posts with Sultanbeyli keywords
const blogPosts = [
  {
    id: 1,
    title: "2024'te En Popüler Güzellik Trendleri - Sultanbeyli Güzellik Merkezi",
    slug: "2024-guzellik-trendleri",
    excerpt:
      "Bu yılın en çok konuşulan güzellik uygulamaları ve yenilikçi trendleri neler? Sultanbeyli güzellik merkezi olarak minimalist cilt bakımından teknolojik gelişmelere kadar 2024'e damgasını vuran güzellik sırlarını keşfedin.",
    content:
      "2024 yılı, güzellik sektöründe önemli dönüşümlere sahne oluyor. Sultanbeyli güzellik merkezi olarak, artık daha çok doğal görünümü destekleyen, kişiye özel ve sürdürülebilir uygulamalar ön planda olduğunu görüyoruz. Bu yılın en dikkat çeken trendlerinden biri, 'Glass Skin' (Cam Cilt) etkisi yaratan çok adımlı cilt bakım rutinleri. Cildin derinlemesine nemlendirilmesi ve parlak bir görünüm kazanması hedefleniyor. Bunun için hyaluronik asit, C vitamini ve niacinamide gibi içerikler daha sık tercih ediliyor. Sultanbeyli'de de bu trend büyük ilgi görüyor. Bir diğer popüler trend ise, daha az invaziv, acısız ve kısa sürede sonuç veren teknolojik cihazlar. Örneğin, HIFU (Yüksek Yoğunluklu Odaklanmış Ultrason) ve radyofrekans gibi uygulamalar, ameliyatsız yüz germe ve sıkılaştırma için büyük ilgi görüyor. Bu cihazlar, cildin alt katmanlarındaki kolajen üretimini tetikleyerek uzun vadeli gençleşme sağlıyor. Ayrıca, kalıcı makyaj uygulamalarında da doğallık ön planda. Microblading yerine Powder Brows (Pudra Kaş) ve Nano Brows gibi daha yumuşak geçişli teknikler popülerlik kazanıyor. Sultanbeyli kalıcı makyaj merkezi olarak bu teknikleri uyguluyoruz. Dudak renklendirme işlemleri ise, daha canlı ve dolgun bir görünüm için tercih ediliyor. Bu trendler, güzelliğin sadece dış görünüşle sınırlı olmadığını, aynı zamanda kişisel sağlığı ve kendine güveni artırdığını gösteriyor. 2024, güzellik dünyasında kişisel dokunuşların ve bilimsel yaklaşımların birleştiği bir yıl olacak gibi görünüyor. Sultanbeyli güzellik merkezi olarak bu trendleri yakından takip ediyoruz.",
    image: "/assets/blog/trends-2024.jpg",
    category: "cilt-bakimi",
    author: "Dr. Ayşe Kaya",
    authorImage: "/assets/authors/ayse-kaya.jpg",
    authorBio:
      "Dr. Ayşe Kaya, Sultanbeyli güzellik merkezi cilt bakım uzmanıdır. 10 yıllık deneyimi ile cilt bakımı ve güzellik alanında hizmet vermektedir.",
    date: "15 Mart 2024",
    readTime: "5 dk",
    views: 1250,
    likes: 100,
    comments: 25,
    tags: ["sultanbeyli güzellik", "güzellik trendleri", "2024", "cilt bakımı", "sultanbeyli"],
    featured: true,
    seoTitle: "2024 Güzellik Trendleri - Sultanbeyli Güzellik Merkezi Blog",
    seoDescription:
      "2024'ün en popüler güzellik trendlerini Sultanbeyli güzellik merkezi uzmanlarından öğrenin. Glass skin, HIFU, kalıcı makyaj trendleri ve daha fazlası.",
    seoKeywords:
      "sultanbeyli güzellik trendleri, 2024 güzellik, glass skin, sultanbeyli cilt bakımı, güzellik merkezi blog",
  },
  {
    id: 2,
    title: "Sultanbeyli Lazer Epilasyon: Kapsamlı Rehber",
    slug: "lazer-epilasyon-rehberi",
    excerpt:
      "Sultanbeyli lazer epilasyon merkezi olarak, lazer epilasyonun ne olduğunu, nasıl çalıştığını ve en etkili sonuçları almak için nelere dikkat etmeniz gerektiğini öğrenin. Bu kapsamlı rehber, tüm sorularınıza yanıt veriyor.",
    content:
      "Sultanbeyli lazer epilasyon merkezi olarak, lazer epilasyonun günümüzde istenmeyen tüylerden kurtulmanın en etkili ve kalıcı yollarından biri olduğunu biliyoruz. Bu yöntem, yoğunlaştırılmış bir ışık demeti kullanarak tüy köklerini hedef alır ve kalıcı olarak yok etmeyi amaçlar. İşlem sırasında lazer, tüydeki melanin pigmentini yakalar ve köke ısı enerjisi gönderir. Bu ısı, tüy kökünü tahrip ederek yeniden tüy çıkmasını engeller. Sultanbeyli'de lazer epilasyonun başarısı, kullanılan cihazın teknolojisine, tüy ve cilt tipinize göre değişir. Alexandrite lazerler, açık tenli ve koyu renk tüylere sahip kişiler için idealken, Nd:YAG lazerler daha koyu cilt tipleri için güvenli bir seçenektir. Diode lazerler ise geniş bir yelpazede kullanılabilir ve hem açık hem de koyu tenlilerde etkili sonuçlar verebilir. Sultanbeyli güzellik merkezi olarak Falcon 4 Pro cihazını kullanıyoruz. İşlem öncesinde, tüy köklerinin lazer ışığını daha iyi absorbe etmesi için tüylerin jiletle kesilmesi önerilir. İşlem sonrası ciltte hafif kızarıklık ve hassasiyet oluşabilir. Bu yan etkileri en aza indirmek için güneşten kaçınmak, nemlendirici ve yatıştırıcı kremler kullanmak önemlidir. Ortalama 6 ila 8 seans sonrasında istenen sonuçlara ulaşılır, ancak bu sayı kişiden kişiye farklılık gösterebilir. Sultanbeyli lazer epilasyon merkezi olarak, doğru merkezde ve uzman kişiler tarafından yapıldığında oldukça güvenli ve etkili bir çözüm sunuyoruz. Unutmayın, en doğru seans planı için Sultanbeyli uzmanlarımıza danışmak şarttır.",
    image: "/assets/blog/lazer-rehberi.jpg",
    category: "epilasyon",
    author: "Uzm. Zeynep Demir",
    authorImage: "/assets/authors/zeynep-demir.jpg",
    authorBio:
      "Uzm. Zeynep Demir, Sultanbeyli güzellik merkezi epilasyon uzmanıdır. Lazer epilasyon ve diğer cilt bakım uygulamalarında 8 yıllık deneyime sahiptir.",
    date: "10 Mart 2024",
    readTime: "7 dk",
    views: 2100,
    likes: 150,
    comments: 30,
    tags: ["sultanbeyli lazer epilasyon", "lazer epilasyon", "kalıcı epilasyon", "sultanbeyli", "falcon 4 pro"],
    featured: true,
    seoTitle: "Sultanbeyli Lazer Epilasyon Rehberi - Falcon 4 Pro ile Kalıcı Çözüm",
    seoDescription:
      "Sultanbeyli lazer epilasyon merkezi rehberi. Falcon 4 Pro cihazı, seans sayısı, hazırlık ve bakım ipuçları. Uzman tavsiyeleri ile kalıcı sonuçlar.",
    seoKeywords:
      "sultanbeyli lazer epilasyon, lazer epilasyon rehberi, falcon 4 pro, sultanbeyli epilasyon merkezi, kalıcı tüy azaltma",
  },
  {
    id: 3,
    title: "Kışın Cilt Bakımı İpuçları - Sultanbeyli Güzellik Merkezi",
    slug: "kis-cilt-bakimi",
    excerpt:
      "Soğuk hava, rüzgar ve ısıtma sistemleri cildinizi kurutup yıpratabilir. Sultanbeyli güzellik merkezi uzmanları olarak kış aylarında cildinizi korumak ve sağlıklı tutmak için en etkili yöntemleri ve ürünleri bu yazımızda bulabilirsiniz.",
    content:
      "Sultanbeyli güzellik merkezi uzmanları olarak, kış aylarının cilt sağlığı için zorlayıcı olabileceğini biliyoruz. Soğuk hava, dışarıda cildinizi kurutup yıpratabilir. Ancak, içerideki kuru ve sıcak hava cildin bariyerini zayıflatır. Bu durum, ciltte kuruluk, kaşıntı, kızarıklık ve pul pul dökülmelere yol açabilir. Sultanbeyli'de kışın cilt bakımı rutininizi gözden geçirmek, bu sorunların önüne geçmek için kritik öneme sahiptir. İlk olarak, nemlendirici seçiminizi değiştirmelisiniz. Yazın kullanılan hafif jel formülleri yerine, kış aylarında daha yoğun ve zengin içerikli kremler tercih edilmelidir. Seramid ve hyaluronik asit gibi bileşenler içeren ürünler, cildin nem bariyerini güçlendirir. Sultanbeyli güzellik merkezi olarak bu ürünleri öneriyoruz. İkinci olarak, sıcak duş ve banyolardan kaçınmalısınız. Çok sıcak su, cildin doğal yağlarını yok ederek kuruluğu artırır. Ilık suyla duş almak ve duş sonrasında hemen nemlendirici uygulamak en iyisidir. Üçüncü olarak, evdeki nem oranını artırmak için nemlendirici (humidifier) kullanmayı düşünebilirsiniz. Bu cihazlar, havadaki nemi artırarak cildin daha az kurumasını sağlar. Dördüncü olarak, peeling ve sert temizleyicilerden uzak durmalısınız. Kışın cildiniz daha hassas olacağı için, agresif ürünler yerine nazik ve pH dengeli temizleyiciler tercih edilmelidir. Son olarak, kış güneşi masum görünse de UVA/UVB ışınları her mevsim etkilidir. Dışarı çıkmadan önce mutlaka SPF'li bir nemlendirici veya güneş kremi kullanmalısınız. Bu basit ama etkili ipuçları, kış boyunca cildinizin pürüzsüz, nemli ve canlı kalmasına yardımcı olacaktır. Sultanbeyli güzellik merkezi olarak profesyonel cilt bakımı da öneriyoruz.",
    image: "/assets/blog/kis-bakim.jpg",
    category: "cilt-bakimi",
    author: "Dr. Burcu Yılmaz",
    authorImage: "/assets/authors/burcu-yilmaz.jpg",
    authorBio:
      "Dr. Burcu Yılmaz, Sultanbeyli güzellik merkezi cilt bakım uzmanıdır. Cilt bakım ve sağlık alanında 12 yıllık deneyime sahiptir.",
    date: "5 Mart 2024",
    readTime: "4 dk",
    views: 890,
    likes: 80,
    comments: 15,
    tags: ["sultanbeyli cilt bakımı", "kış cilt bakımı", "cilt koruma", "sultanbeyli", "güzellik ipuçları"],
    featured: false,
    seoTitle: "Kış Cilt Bakımı İpuçları - Sultanbeyli Güzellik Merkezi",
    seoDescription:
      "Sultanbeyli güzellik merkezi uzmanlarından kış cilt bakımı ipuçları. Cildinizi soğuktan koruma, nemlendirme ve bakım önerileri.",
    seoKeywords:
      "sultanbeyli cilt bakımı, kış cilt bakımı, cilt koruma, sultanbeyli güzellik merkezi, cilt bakım ipuçları",
  },
  {
    id: 4,
    title: "Sultanbeyli Kalıcı Makyaj Teknikleri ve İpuçları",
    slug: "kalici-makyaj-teknikleri",
    excerpt:
      "Sultanbeyli kalıcı makyaj merkezi olarak, kalıcı makyajın inceliklerini ve en son tekniklerini keşfedin. Kaş, eyeliner ve dudak uygulamalarında doğal ve kalıcı sonuçlar elde etmenin sırlarını bu yazıda bulacaksınız.",
    content:
      "Sultanbeyli kalıcı makyaj merkezi olarak, kalıcı makyajın yoğun tempolu hayatlar için büyük bir kolaylık sunan, kozmetik dövme sanatı olduğunu biliyoruz. Bu teknikte, özel cihazlar ve pigmentler kullanılarak cilt altına renk enjekte edilir. En popüler kalıcı makyaj uygulamaları arasında kaş kontürü, eyeliner ve dudak renklendirme yer alır. Sultanbeyli'de kaş uygulamalarında en çok tercih edilen tekniklerden biri Powder Brows'tur. Bu teknik, kaşlara kalemle doldurulmuş gibi doğal ve pudralı bir görünüm kazandırır. Microblading'e göre daha yumuşak bir etki yaratır ve her cilt tipi için uygundur. Sultanbeyli güzellik merkezi olarak bu tekniği uyguluyoruz. Dudak renklendirme, soluk ve cansız dudaklara canlılık katmak için harika bir yoldur. Dudak sınırları belirginleştirilir ve doğal bir renk tonuyla doldurulur. Bu sayede dudaklar daha dolgun ve çekici görünür. Sultanbeyli kalıcı makyaj merkezi olarak doğal sonuçlar elde ediyoruz. Kalıcı eyeliner ise, gözlere derinlik katmak ve makyaj rutinini kısaltmak için idealdir. Doğru teknikle yapılan kalıcı makyaj, yüz hatlarını belirginleştirir ve daha simetrik bir görünüm sağlar. İşlem öncesi, uzmanın hijyen kurallarına uyduğundan ve kaliteli pigmentler kullandığından emin olmalısınız. Sultanbeyli'de bu standartları sağlıyoruz. İşlem sonrası ilk birkaç gün hafif şişlik ve kızarıklık normaldir. Uzmanınızın önerdiği bakım talimatlarına uymak, kalıcılığı ve sonuçların mükemmelliğini artıracaktır. Sultanbeyli kalıcı makyaj merkezi olarak, doğru ellere teslim edildiğinde, günlük hayatınızı kolaylaştıran ve kendinize olan güveninizi artıran bir yatırım sunuyoruz.",
    image: "/assets/blog/kalici-makyaj.jpg",
    category: "kalici-makyaj",
    author: "Uzm. Selin Kaya",
    authorImage: "/assets/authors/selin-kaya.jpg",
    authorBio:
      "Uzm. Selin Kaya, Sultanbeyli güzellik merkezi kalıcı makyaj uzmanıdır. Microblading, kaş pigmentasyon ve diğer kalıcı makyaj uygulamalarında 6 yıllık deneyime sahiptir.",
    date: "1 Mart 2024",
    readTime: "6 dk",
    views: 1580,
    likes: 120,
    comments: 20,
    tags: ["sultanbeyli kalıcı makyaj", "microblading", "kaş pigmentasyon", "dudak renklendirme", "sultanbeyli"],
    featured: false,
    seoTitle: "Sultanbeyli Kalıcı Makyaj Teknikleri - Microblading ve Dudak Renklendirme",
    seoDescription:
      "Sultanbeyli kalıcı makyaj merkezi teknikleri. Microblading, kaş pigmentasyon, dudak renklendirme ve eyeliner uygulamaları hakkında uzman rehberi.",
    seoKeywords:
      "sultanbeyli kalıcı makyaj, sultanbeyli microblading, kaş pigmentasyon, dudak renklendirme, kalıcı makyaj teknikleri",
  },
  {
    id: 5,
    title: "Sultanbeyli Bölgesel İncelme Yöntemleri",
    slug: "bolgesel-incelme-yontemleri",
    excerpt:
      "Diyet ve spora rağmen gitmeyen inatçı yağlarınızdan kurtulmak mı istiyorsunuz? Sultanbeyli güzellik merkezi olarak soğuk lipoliz (kriyolipoliz) ve radyofrekans gibi bölgesel incelme yöntemlerini keşfedin.",
    content:
      "Sultanbeyli güzellik merkezi olarak, bölgesel incelmenin genel kilo kaybının aksine, vücudun belirli bölgelerindeki inatçı yağ birikimlerini hedef alan uygulamalar olduğunu biliyoruz. Bu yöntemler, genellikle diyet ve sporla erimeyen yağlara sahip kişiler tarafından tercih edilir. Sultanbeyli'de en popüler ve etkili bölgesel incelme yöntemlerinden biri **kriyolipoliz** (soğuk lipoliz)'dir. Bu yöntemde, özel bir cihaz kullanılarak yağ hücreleri kontrollü bir şekilde soğutulur. Yağ hücreleri soğuğa karşı dayanıksız olduğu için kristalleşerek parçalanır ve vücut tarafından doğal yollarla atılır. İşlem sonrası birkaç hafta içinde incelme fark edilir hale gelir. Sultanbeyli güzellik merkezi olarak bu yöntemi uyguluyoruz. Diğer bir etkili yöntem ise **radyofrekans** (RF) teknolojisidir. Radyofrekans dalgaları, cilt altına ısı göndererek yağ hücrelerinin parçalanmasını ve cildin sıkılaşmasını sağlar. Bu yöntem, aynı zamanda kolajen üretimini artırarak ciltteki sarkmaları da azaltır. Sultanbeyli'de Primex ve Sculpture cihazlarını kullanıyoruz. Lazer lipoliz ve ultrasonik kavitasyon gibi yöntemler de bölgesel incelmede sıkça kullanılır. Bu uygulamalar, ameliyatsız oldukları için iyileşme süreleri çok kısadır ve günlük hayata hemen dönülebilir. Ancak her yöntemin her vücut tipi için uygun olmadığını unutmamalısınız. Hangi yöntemin sizin için en uygun olduğunu belirlemek için Sultanbeyli uzmanlarımıza danışmak ve kişisel bir incelme planı oluşturmak en doğru yaklaşım olacaktır. Bu yöntemler, sağlıklı bir yaşam tarzının ve dengeli beslenmenin yerini almaz, ancak hedeflenen bölgelerde istenen sonuca ulaşmaya yardımcı olabilir. Sultanbeyli güzellik merkezi olarak G5 masajı, EmSlim Fit gibi seçenekler de sunuyoruz.",
    image: "/assets/blog/bolgesel-incelme.jpg",
    category: "bolgesel-incelme",
    author: "Dr. Mehmet Özkan",
    authorImage: "/assets/authors/mehmet-ozkan.jpg",
    authorBio:
      "Dr. Mehmet Özkan, Sultanbeyli güzellik merkezi bölgesel incelme uzmanıdır. Vücut şekillendirme ve fizyoterapi uygulamalarında 15 yıllık deneyime sahiptir.",
    date: "28 Şubat 2024",
    readTime: "8 dk",
    views: 1750,
    likes: 130,
    comments: 28,
    tags: ["sultanbeyli bölgesel incelme", "kriyolipoliz", "radyofrekans", "vücut şekillendirme", "sultanbeyli"],
    featured: false,
    seoTitle: "Sultanbeyli Bölgesel İncelme Yöntemleri - Kriyolipoliz ve RF",
    seoDescription:
      "Sultanbeyli bölgesel incelme merkezi yöntemleri. Kriyolipoliz, radyofrekans, G5 masajı ve EmSlim Fit ile vücut şekillendirme rehberi.",
    seoKeywords: "sultanbeyli bölgesel incelme, kriyolipoliz, radyofrekans, g5 masajı, emslim fit, vücut şekillendirme",
  },
  {
    id: 6,
    title: "Sultanbeyli Kirpik Perması ve Bakımı",
    slug: "kirpik-permasi-bakim",
    excerpt:
      "Daha kıvrık ve dolgun kirpikler için kirpik perması nasıl yapılır, kimler için uygundur ve kalıcılığını artırmak için hangi bakım adımlarını uygulamalısınız? Sultanbeyli güzellik merkezi uzmanlarından öğrenin.",
    content:
      "Sultanbeyli güzellik merkezi uzmanları olarak, kirpik permasının doğal kirpiklere kalıcı olarak kıvrım ve hacim kazandıran bir güzellik uygulaması olduğunu biliyoruz. Kirpik kıvırıcıyla uğraşmaktan sıkılanlar ve makyajsız bile belirgin kirpiklere sahip olmak isteyenler için harika bir alternatiftir. İşlem, kirpiklerin özel bir silikon ped üzerine yapıştırılması ve ardından iki farklı solüsyonun uygulanmasıyla gerçekleştirilir. Birinci solüsyon, kirpikleri istenen kıvrıma getirmek için bağları gevşetir, ikinci solüsyon ise bu yeni şekli sabitlemek için kullanılır. Sonuç, kirpiklerinizin birkaç ay boyunca kıvrık ve canlı kalmasıdır. Sultanbeyli'de kirpik perması, kirpikleri daha uzun ve dolgun gösterir, ayrıca gözlerinizi daha belirgin hale getirir. İşlem ortalama 45-60 dakika sürer ve tamamen acısızdır. Sultanbeyli güzellik merkezi olarak konforlu bir deneyim sunuyoruz. İşlemin kalıcılığını artırmak için bazı bakım adımlarına dikkat etmek önemlidir. İlk 24 saat boyunca kirpiklerin suyla temasından kaçınmak gerekir. Ayrıca, yağ bazlı makyaj temizleyiciler ve maskaralar kirpik permasının etkisini azaltabilir, bu nedenle su bazlı ürünler tercih edilmelidir. Her gece kirpiklere özel bir bakım serumu veya doğal yağ (örn. hint yağı) uygulamak, kirpiklerin güçlenmesine ve daha sağlıklı görünmesine yardımcı olur. Sultanbeyli güzellik merkezi olarak bu ürünleri öneriyoruz. Kirpik perması, doğru bir uzman tarafından yapıldığında göz sağlığına zarar vermez ve güvenli bir şekilde uygulanabilir. Kirpiklerinizin doğal güzelliğini ortaya çıkarmak için bu pratik ve etkili yöntemi Sultanbeyli'de deneyebilirsiniz.",
    image: "/assets/blog/kirpik-perma.jpg",
    category: "tirnak-kirpik",
    author: "Uzm. Deniz Aktaş",
    authorImage: "/assets/authors/deniz-aktas.jpg",
    authorBio:
      "Uzm. Deniz Aktaş, Sultanbeyli güzellik merkezi tırnak ve kirpik bakım uzmanıdır. İpek kirpik, kirpik perması ve tırnak bakımında 7 yıllık deneyime sahiptir.",
    date: "25 Şubat 2024",
    readTime: "5 dk",
    views: 920,
    likes: 90,
    comments: 10,
    tags: ["sultanbeyli kirpik perması", "kirpik bakımı", "ipek kirpik", "sultanbeyli", "güzellik bakımı"],
    featured: false,
    seoTitle: "Sultanbeyli Kirpik Perması ve Bakımı - İpek Kirpik Uzmanları",
    seoDescription:
      "Sultanbeyli kirpik perması ve bakım rehberi. Kirpik perması nasıl yapılır, bakım ipuçları ve uzman tavsiyeleri. İpek kirpik hizmetleri.",
    seoKeywords: "sultanbeyli kirpik perması, kirpik bakımı, ipek kirpik, sultanbeyli güzellik merkezi, kirpik uzatma",
  },
]

const BlogClientPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Generate SEO schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
  ])

  const currentCategory = blogCategories.find((cat) => cat.id === selectedCategory) || blogCategories[0]

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Şahika Beauty Blog - Sultanbeyli Güzellik Merkezi",
    description:
      "Sultanbeyli güzellik merkezi blog sayfası. Güzellik ipuçları, cilt bakımı rehberleri, epilasyon bilgileri ve uzman tavsiyeleri.",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/blog",
    publisher: {
      "@type": "Organization",
      name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
      logo: {
        "@type": "ImageObject",
        url: "https://sultanbeyliguzellikmerkezi.com.tr/assets/logo.png",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: `https://sultanbeyliguzellikmerkezi.com.tr${post.image}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.date,
      url: `https://sultanbeyliguzellikmerkezi.com.tr/blog/${post.slug}`,
    })),
  }

  // Filtreleme fonksiyonu
  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return categoryMatch && searchMatch
  })

  // Öne çıkan yazılar
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <>
      {/* Adding SEO structured data */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogListSchema} />

      <div className="min-h-screen pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* SEO-optimized header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="text-center mb-12"
          >
            <h1 className="h1 mb-4 text-gradient">{currentCategory.seoTitle || "Sultanbeyli Güzellik Merkezi Blog"}</h1>
            <p className="lead max-w-3xl mx-auto text-muted-foreground text-pretty">
              {currentCategory.description ||
                "Güzellik, bakım ve sağlık hakkında güncel bilgiler, ipuçları ve uzman görüşleri. Sultanbeyli güzellik merkezi uzmanlarından profesyonel rehberler."}
            </p>

            {/* Adding location and expertise keywords */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 px-3 py-1 rounded-full">Sultanbeyli Güzellik Merkezi</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Uzman Rehberleri</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Güzellik İpuçları</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">Profesyonel Tavsiyeler</span>
            </div>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            className="flex flex-col lg:flex-row gap-6 mb-12"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background/50 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Posts */}
          {selectedCategory === "all" && featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="mb-16"
            >
              <h2 className="h2 mb-8 text-center">Öne Çıkan Yazılar</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.6 + index * 0.1 } }}
                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Öne Çıkan
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.views} görüntülenme</span>
                      </div>
                      <h3 className="h3 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <a
                          href={`/blog/${post.slug}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                        >
                          Devamını Oku →
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Posts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}>
            <h2 className="h2 mb-8 text-center">{selectedCategory === "all" ? "Tüm Yazılar" : currentCategory.name}</h2>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? "Arama kriterlerinize uygun yazı bulunamadı." : "Bu kategoride henüz yazı bulunmuyor."}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === "all" ? regularPosts : filteredPosts).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.8 + index * 0.1 } }}
                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {blogCategories.find((cat) => cat.id === post.category)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="h3 mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <a
                          href={`/blog/${post.slug}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                        >
                          Devamını Oku →
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default BlogClientPage
