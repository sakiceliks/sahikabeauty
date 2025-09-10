"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Filter,
  Tag,
  User,
  Eye
} from "lucide-react";

// Blog kategorileri
export const blogCategories = [
  { id: "all", name: "Tümü" },
  { id: "epilasyon", name: "Epilasyon" },
  { id: "cilt-bakimi", name: "Cilt Bakımı" },
  { id: "bolgesel-incelme", name: "Bölgesel İncelme" },
  { id: "kalici-makyaj", name: "Kalıcı Makyaj" },
  { id: "tirnak-kirpik", name: "Tırnak & Kirpik" },
  { id: "sac-bakimi", name: "Saç Bakımı" },
  { id: "anti-age", name: "Anti-Age & Özel Bakımlar" },
];

// Örnek blog verileri
const blogPosts = [
  {
    id: 1,
    title: "2024'te En Popüler Güzellik Trendleri",
    slug: "2024-guzellik-trendleri",
    excerpt: "Bu yılın en çok konuşulan güzellik uygulamaları ve yenilikçi trendleri neler? Minimalist cilt bakımından teknolojik gelişmelere kadar 2024'e damgasını vuran güzellik sırlarını keşfedin.",
    content: "2024 yılı, güzellik sektöründe önemli dönüşümlere sahne oluyor. Artık daha çok, doğal görünümü destekleyen, kişiye özel ve sürdürülebilir uygulamalar ön planda. Bu yılın en dikkat çeken trendlerinden biri, 'Glass Skin' (Cam Cilt) etkisi yaratan çok adımlı cilt bakım rutinleri. Cildin derinlemesine nemlendirilmesi ve parlak bir görünüm kazanması hedefleniyor. Bunun için hyaluronik asit, C vitamini ve niacinamide gibi içerikler daha sık tercih ediliyor. Bir diğer popüler trend ise, daha az invaziv, acısız ve kısa sürede sonuç veren teknolojik cihazlar. Örneğin, HIFU (Yüksek Yoğunluklu Odaklanmış Ultrason) ve radyofrekans gibi uygulamalar, ameliyatsız yüz germe ve sıkılaştırma için büyük ilgi görüyor. Bu cihazlar, cildin alt katmanlarındaki kolajen üretimini tetikleyerek uzun vadeli gençleşme sağlıyor. Ayrıca, kalıcı makyaj uygulamalarında da doğallık ön planda. Microblading yerine Powder Brows (Pudra Kaş) ve Nano Brows gibi daha yumuşak geçişli teknikler popülerlik kazanıyor. Dudak renklendirme işlemleri ise, daha canlı ve dolgun bir görünüm için tercih ediliyor. Bu trendler, güzelliğin sadece dış görünüşle sınırlı olmadığını, aynı zamanda kişisel sağlığı ve kendine güveni artırdığını gösteriyor. 2024, güzellik dünyasında kişisel dokunuşların ve bilimsel yaklaşımların birleştiği bir yıl olacak gibi görünüyor. Daha fazla bilgi ve detaylı analiz için blogumuzdaki diğer yazıları da inceleyebilirsiniz.",
    image: "/assets/blog/trends-2024.jpg",
    category: "cilt-bakimi",
    author: "Dr. Ayşe Kaya",
    date: "15 Mart 2024",
    readTime: "5 dk",
    views: 1250,
    tags: ["trend", "güzellik", "2024", "yenilik"],
    featured: true
  },
  {
    id: 2,
    title: "Lazer Epilasyon: Kapsamlı Rehber",
    slug: "lazer-epilasyon-rehberi",
    excerpt: "Lazer epilasyonun ne olduğunu, nasıl çalıştığını ve en etkili sonuçları almak için nelere dikkat etmeniz gerektiğini öğrenin. Bu kapsamlı rehber, tüm sorularınıza yanıt veriyor.",
    content: "Lazer epilasyon, günümüzde istenmeyen tüylerden kurtulmanın en etkili ve kalıcı yollarından biri olarak kabul ediliyor. Bu yöntem, yoğunlaştırılmış bir ışık demeti kullanarak tüy köklerini hedef alır ve kalıcı olarak yok etmeyi amaçlar. İşlem sırasında lazer, tüydeki melanin pigmentini yakalar ve köke ısı enerjisi gönderir. Bu ısı, tüy kökünü tahrip ederek yeniden tüy çıkmasını engeller. Lazer epilasyonun başarısı, kullanılan cihazın teknolojisine, tüy ve cilt tipinize göre değişir. Alexandrite lazerler, açık tenli ve koyu renk tüylere sahip kişiler için idealken, Nd:YAG lazerler daha koyu cilt tipleri için güvenli bir seçenektir. Diode lazerler ise geniş bir yelpazede kullanılabilir ve hem açık hem de koyu tenlilerde etkili sonuçlar verebilir. İşlem öncesinde, tüy köklerinin lazer ışığını daha iyi absorbe etmesi için tüylerin jiletle kesilmesi önerilir. İşlem sonrası ciltte hafif kızarıklık ve hassasiyet oluşabilir. Bu yan etkileri en aza indirmek için güneşten kaçınmak, nemlendirici ve yatıştırıcı kremler kullanmak önemlidir. Ortalama 6 ila 8 seans sonrasında istenen sonuçlara ulaşılır, ancak bu sayı kişiden kişiye farklılık gösterebilir. Lazer epilasyon, doğru merkezde ve uzman kişiler tarafından yapıldığında oldukça güvenli ve etkili bir çözümdür. Unutmayın, en doğru seans planı için bir uzmana danışmak şarttır.",
    image: "/assets/blog/lazer-rehberi.jpg",
    category: "epilasyon",
    author: "Uzm. Zeynep Demir",
    date: "10 Mart 2024",
    readTime: "7 dk",
    views: 2100,
    tags: ["lazer", "epilasyon", "kalıcı", "rehber"],
    featured: true
  },
  {
    id: 3,
    title: "Kışın Cilt Bakımı İpuçları",
    slug: "kis-cilt-bakimi",
    excerpt: "Soğuk hava, rüzgar ve ısıtma sistemleri cildinizi kurutup yıpratabilir. Kış aylarında cildinizi korumak ve sağlıklı tutmak için en etkili yöntemleri ve ürünleri bu yazımızda bulabilirsiniz.",
    content: "Kış ayları, cilt sağlığı için zorlayıcı olabilir. Soğuk hava, dışarıda cildin nemini alırken, içerideki kuru ve sıcak hava cildin bariyerini zayıflatır. Bu durum, ciltte kuruluk, kaşıntı, kızarıklık ve pul pul dökülmelere yol açabilir. Kışın cilt bakımı rutininizi gözden geçirmek, bu sorunların önüne geçmek için kritik öneme sahiptir. İlk olarak, nemlendirici seçiminizi değiştirmelisiniz. Yazın kullanılan hafif jel formülleri yerine, kış aylarında daha yoğun ve zengin içerikli kremler tercih edilmelidir. Seramid ve hyaluronik asit gibi bileşenler içeren ürünler, cildin nem bariyerini güçlendirir. İkinci olarak, sıcak duş ve banyolardan kaçınmalısınız. Çok sıcak su, cildin doğal yağlarını yok ederek kuruluğu artırır. Ilık suyla duş almak ve duş sonrasında hemen nemlendirici uygulamak en iyisidir. Üçüncü olarak, evdeki nem oranını artırmak için nemlendirici (humidifier) kullanmayı düşünebilirsiniz. Bu cihazlar, havadaki nemi artırarak cildin daha az kurumasını sağlar. Dördüncü olarak, peeling ve sert temizleyicilerden uzak durmalısınız. Kışın cildiniz daha hassas olacağı için, agresif ürünler yerine nazik ve pH dengeli temizleyiciler tercih edilmelidir. Son olarak, kış güneşi masum görünse de UVA/UVB ışınları her mevsim etkilidir. Dışarı çıkmadan önce mutlaka SPF'li bir nemlendirici veya güneş kremi kullanmalısınız. Bu basit ama etkili ipuçları, kış boyunca cildinizin pürüzsüz, nemli ve canlı kalmasına yardımcı olacaktır.",
    image: "/assets/blog/kis-bakim.jpg",
    category: "cilt-bakimi",
    author: "Dr. Burcu Yılmaz",
    date: "5 Mart 2024",
    readTime: "4 dk",
    views: 890,
    tags: ["kış", "cilt", "bakım", "koruma"],
    featured: false
  },
  {
    id: 4,
    title: "Kalıcı Makyaj Teknikleri ve İpuçları",
    slug: "kalici-makyaj-teknikleri",
    excerpt: "Kalıcı makyajın inceliklerini ve en son tekniklerini keşfedin. Kaş, eyeliner ve dudak uygulamalarında doğal ve kalıcı sonuçlar elde etmenin sırlarını bu yazıda bulacaksınız.",
    content: "Kalıcı makyaj, yoğun tempolu hayatlar için büyük bir kolaylık sunan, kozmetik dövme sanatıdır. Bu teknikte, özel cihazlar ve pigmentler kullanılarak cilt altına renk enjekte edilir. En popüler kalıcı makyaj uygulamaları arasında kaş kontürü, eyeliner ve dudak renklendirme yer alır. Kaş uygulamalarında en çok tercih edilen tekniklerden biri Powder Brows'tur. Bu teknik, kaşlara kalemle doldurulmuş gibi doğal ve pudralı bir görünüm kazandırır. Microblading'e göre daha yumuşak bir etki yaratır ve her cilt tipi için uygundur. Dudak renklendirme, soluk ve cansız dudaklara canlılık katmak için harika bir yoldur. Dudak sınırları belirginleştirilir ve doğal bir renk tonuyla doldurulur. Bu sayede dudaklar daha dolgun ve çekici görünür. Kalıcı eyeliner ise, gözlere derinlik katmak ve makyaj rutinini kısaltmak için idealdir. Doğru teknikle yapılan kalıcı makyaj, yüz hatlarını belirginleştirir ve daha simetrik bir görünüm sağlar. İşlem öncesi, uzmanın hijyen kurallarına uyduğundan ve kaliteli pigmentler kullandığından emin olmalısınız. İşlem sonrası ilk birkaç gün hafif şişlik ve kızarıklık normaldir. Uzmanınızın önerdiği bakım talimatlarına uymak, kalıcılığı ve sonuçların mükemmelliğini artıracaktır. Kalıcı makyaj, doğru ellere teslim edildiğinde, günlük hayatınızı kolaylaştıran ve kendinize olan güveninizi artıran bir yatırımdır.",
    image: "/assets/blog/kalici-makyaj.jpg",
    category: "kalici-makyaj",
    author: "Uzm. Selin Kaya",
    date: "1 Mart 2024",
    readTime: "6 dk",
    views: 1580,
    tags: ["kalıcı makyaj", "teknik", "kaş", "dudak"],
    featured: false
  },
  {
    id: 5,
    title: "Bölgesel İncelme Yöntemleri",
    slug: "bolgesel-incelme-yontemleri",
    excerpt: "Diyet ve spora rağmen gitmeyen inatçı yağlarınızdan kurtulmak mı istiyorsunuz? Soğuk lipoliz (kriyolipoliz) ve radyofrekans gibi bölgesel incelme yöntemlerini keşfedin.",
    content: "Bölgesel incelme, genel kilo kaybının aksine, vücudun belirli bölgelerindeki inatçı yağ birikimlerini hedef alan uygulamalardır. Bu yöntemler, genellikle diyet ve sporla erimeyen yağlara sahip kişiler tarafından tercih edilir. En popüler ve etkili bölgesel incelme yöntemlerinden biri **kriyolipoliz** (soğuk lipoliz)'dir. Bu yöntemde, özel bir cihaz kullanılarak yağ hücreleri kontrollü bir şekilde soğutulur. Yağ hücreleri soğuğa karşı dayanıksız olduğu için kristalleşerek parçalanır ve vücut tarafından doğal yollarla atılır. İşlem sonrası birkaç hafta içinde incelme fark edilir hale gelir. Diğer bir etkili yöntem ise **radyofrekans** (RF) teknolojisidir. Radyofrekans dalgaları, cilt altına ısı göndererek yağ hücrelerinin parçalanmasını ve cildin sıkılaşmasını sağlar. Bu yöntem, aynı zamanda kolajen üretimini artırarak ciltteki sarkmaları da azaltır. Lazer lipoliz ve ultrasonik kavitasyon gibi yöntemler de bölgesel incelmede sıkça kullanılır. Bu uygulamalar, ameliyatsız oldukları için iyileşme süreleri çok kısadır ve günlük hayata hemen dönülebilir. Ancak her yöntemin her vücut tipi için uygun olmadığını unutmamalısınız. Hangi yöntemin sizin için en uygun olduğunu belirlemek için bir uzmana danışmak ve kişisel bir incelme planı oluşturmak en doğru yaklaşım olacaktır. Bu yöntemler, sağlıklı bir yaşam tarzının ve dengeli beslenmenin yerini almaz, ancak hedeflenen bölgelerde istenen sonuca ulaşmaya yardımcı olabilir.",
    image: "/assets/blog/bolgesel-incelme.jpg",
    category: "bolgesel-incelme",
    author: "Dr. Mehmet Özkan",
    date: "28 Şubat 2024",
    readTime: "8 dk",
    views: 1750,
    tags: ["incelme", "yağ", "kriyolipoliz", "bölgesel"],
    featured: false
  },
  {
    id: 6,
    title: "Kirpik Perması ve Bakımı",
    slug: "kirpik-permasi-bakim",
    excerpt: "Daha kıvrık ve dolgun kirpikler için kirpik perması nasıl yapılır, kimler için uygundur ve kalıcılığını artırmak için hangi bakım adımlarını uygulamalısınız?",
    content: "Kirpik perması, doğal kirpiklere kalıcı olarak kıvrım ve hacim kazandıran bir güzellik uygulamasıdır. Kirpik kıvırıcıyla uğraşmaktan sıkılanlar ve makyajsız bile belirgin kirpiklere sahip olmak isteyenler için harika bir alternatiftir. İşlem, kirpiklerin özel bir silikon ped üzerine yapıştırılması ve ardından iki farklı solüsyonun uygulanmasıyla gerçekleştirilir. Birinci solüsyon, kirpikleri istenen kıvrıma getirmek için bağları gevşetir, ikinci solüsyon ise bu yeni şekli sabitlemek için kullanılır. Sonuç, kirpiklerinizin birkaç ay boyunca kıvrık ve canlı kalmasıdır. Kirpik perması, kirpikleri daha uzun ve dolgun gösterir, ayrıca gözlerinizi daha belirgin hale getirir. İşlem ortalama 45-60 dakika sürer ve tamamen acısızdır. İşlemin kalıcılığını artırmak için bazı bakım adımlarına dikkat etmek önemlidir. İlk 24 saat boyunca kirpiklerin suyla temasından kaçınmak gerekir. Ayrıca, yağ bazlı makyaj temizleyiciler ve maskaralar kirpik permasının etkisini azaltabilir, bu nedenle su bazlı ürünler tercih edilmelidir. Her gece kirpiklere özel bir bakım serumu veya doğal yağ (örn. hint yağı) uygulamak, kirpiklerin güçlenmesine ve daha sağlıklı görünmesine yardımcı olur. Kirpik perması, doğru bir uzman tarafından yapıldığında göz sağlığına zarar vermez ve güvenli bir şekilde uygulanabilir. Kirpiklerinizin doğal güzelliğini ortaya çıkarmak için bu pratik ve etkili yöntemi düşünebilirsiniz.",
    image: "/assets/blog/kirpik-perma.jpg",
    category: "tirnak-kirpik",
    author: "Uzm. Deniz Aktaş",
    date: "25 Şubat 2024",
    readTime: "5 dk",
    views: 920,
    tags: ["kirpik", "perma", "bakım", "güzellik"],
    featured: false
  }
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtreleme fonksiyonu
  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  // Öne çıkan yazılar
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          className="text-center mb-12"
        >
          <h1 className="h1 mb-4 text-gradient">Blog</h1>
          <p className="lead max-w-2xl mx-auto text-gray-600">
            Güzellik, bakım ve sağlık hakkında güncel bilgiler, ipuçları ve uzman görüşleri
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          className="flex flex-col lg:flex-row gap-6 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Blog yazılarında ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <div className="flex gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === "all" && featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className="mb-16"
          >
            <h2 className="h2 mb-8 flex items-center gap-2">
              <Tag className="w-6 h-6 text-primary" />
              Öne Çıkan Yazılar
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.6 + index * 0.1 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium">
                        {blogCategories.find(cat => cat.id === post.category)?.name}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-primary">
                      Öne Çıkan
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()} görüntüleme
                      </div>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
                      >
                        Oku
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Posts Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="h2">
              {selectedCategory === "all" ? "Tüm Yazılar" : 
               `${blogCategories.find(cat => cat.id === selectedCategory)?.name} Yazıları`}
            </h2>
            <span className="text-gray-500">
              {filteredPosts.length} yazı bulundu
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === "all" ? regularPosts : filteredPosts).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.8 + index * 0.1 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {blogCategories.find(cat => cat.id === post.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.views} görüntülenme</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-primary hover:text-secondary transition-colors font-semibold text-sm"
                      >
                        Devamını Oku
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aradığınız kriterlere uygun yazı bulunamadı
              </h3>
              <p className="text-gray-500">
                Farklı kategoriler seçerek veya arama teriminizi değiştirerek tekrar deneyebilirsiniz
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Newsletter Subscription */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
          className="mt-20 bg-gradient-to-r from-accent to-secondary rounded-2xl p-8 text-center text-white"
        >
          <h2 className="h2 mb-4">Blog Güncellemelerini Kaçırma</h2>
          <p className="text-lg mb-6 opacity-90">
            Yeni yazılarımızdan haberdar olmak için e-posta listemize katılın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Abone Ol
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogPage;