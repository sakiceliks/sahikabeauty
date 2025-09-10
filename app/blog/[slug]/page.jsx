"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Share2, 
  ArrowLeft,
  ArrowRight,
  Tag,
  Heart,
  MessageCircle,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

// Blog verileri (gerçek uygulamada API'den gelecek)
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

// Kategoriler
const blogCategories = [
  { id: "epilasyon", name: "Epilasyon" },
  { id: "cilt-bakimi", name: "Cilt Bakımı" },
  { id: "bolgesel-incelme", name: "Bölgesel İncelme" },
  { id: "kalici-makyaj", name: "Kalıcı Makyaj" },
  { id: "tirnak-kirpik", name: "Tırnak & Kirpik" },
  { id: "sac-bakimi", name: "Saç Bakımı" },
  { id: "anti-age", name: "Anti-Age & Özel Bakımlar" },
];

const BlogDetail = () => {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Blog yazısını bul
  const post = blogPosts.find((p) => p.slug === slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // İlgili yazılar (aynı kategoriden)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  // URL kopyalama fonksiyonu
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('URL kopyalanamadı:', err);
    }
  };

  // Sosyal medya paylaşım fonksiyonları
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${post?.title}&url=${window.location.href}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog yazısı bulunamadı</h1>
          <Link href="/blog" className="text-primary hover:text-secondary transition-colors">
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="mb-8"
        >
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-700">
              {blogCategories.find(cat => cat.id === post.category)?.name}
            </span>
          </div>
        </motion.nav>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {blogCategories.find(cat => cat.id === post.category)?.name}
            </span>
            {post.featured && (
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Öne Çıkan
              </span>
            )}
          </div>

          <h1 className="h1 mb-6 max-w-4xl">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.authorImage || "/assets/default-avatar.jpg"}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} okuma</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} görüntüleme</span>
            </div>
          </div>

          {/* Social Share & Actions */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Paylaş:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={shareOnFacebook}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Facebook'ta paylaş"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnTwitter}
                className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                aria-label="Twitter'da paylaş"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                aria-label="LinkedIn'de paylaş"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-2 rounded-full transition-colors ${
                  copySuccess 
                    ? "bg-green-600 text-white" 
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
                aria-label="Bağlantıyı kopyala"
              >
                {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                  isLiked 
                    ? "bg-red-100 text-red-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label="Kaydet"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            className="lg:col-span-3"
          >
            {/* Featured Image */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-700 leading-relaxed"
              />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium">Etiketler:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.authorImage || "/assets/default-avatar.jpg"}
                    alt={post.author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                  <p className="text-gray-600">{post.authorBio}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`}>
                  <div className="p-6 border rounded-2xl hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <ArrowLeft className="w-4 h-4" />
                      Önceki Yazı
                    </div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {prevPost.title}
                    </h4>
                  </div>
                </Link>
              )}
              
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}>
                  <div className="p-6 border rounded-2xl hover:shadow-lg transition-all duration-300 group md:text-right">
                    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-2">
                      Sonraki Yazı
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </h4>
                  </div>
                </Link>
              )}
            </div>
          </motion.main>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  İlgili Yazılar
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Calendar className="w-3 h-3" />
                            {relatedPost.date}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-6">Kategoriler</h3>
              <div className="space-y-2">
                {blogCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog?category=${category.id}`}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      post.category === category.id
                        ? "bg-accent text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-accent to-secondary p-6 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Blog Güncellemeleri</h3>
              <p className="text-sm mb-4 opacity-90">
                Yeni yazılarımızdan haberdar olmak için e-posta listemize katılın
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-3 py-2 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="w-full bg-white text-primary py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Abone Ol
                </button>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Comments Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Yorumlar ({post.comments})</h3>
          </div>

          {/* Comment Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h4 className="font-semibold mb-4">Yorum Yap</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Yorumunuzu yazın..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              ></textarea>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Yorum Gönder
              </button>
            </div>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Merve K.</span>
                    <span className="text-sm text-gray-500">2 gün önce</span>
                  </div>
                  <p className="text-gray-700">
                    Çok faydalı bir yazı olmuş. Özellikle hazırlık aşaması hakkındaki bilgiler çok detaylı. Teşekkürler!
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-semibold">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Ayça D.</span>
                    <span className="text-sm text-gray-500">1 hafta önce</span>
                  </div>
                  <p className="text-gray-700">
                    Lazer epilasyon konusunda çok ayrıntılı bilgi almış oldum. Hemen randevu alacağım!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="text-primary hover:text-secondary transition-colors font-medium">
              Daha fazla yorum göster
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogDetail;