import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://saki:IzogizG02A6yNCBW@mern.mhhyfp6.mongodb.net/?retryWrites=true&w=majority";

const blogPosts = [
  {
    title: "2024'te En Popüler Güzellik Trendleri",
    slug: "2024-guzellik-trendleri",
    excerpt:
      "Bu yılın en çok konuşulan güzellik uygulamaları ve yenilikçi trendleri neler? Minimalist cilt bakımından teknolojik gelişmelere kadar 2024'e damgasını vuran güzellik sırlarını keşfedin.",
    content:
      "2024 yılı, güzellik sektöründe önemli dönüşümlere sahne oluyor. Artık daha çok, doğal görünümü destekleyen, kişiye özel ve sürdürülebilir uygulamalar ön planda. Bu yılın en dikkat çeken trendlerinden biri, 'Glass Skin' (Cam Cilt) etkisi yaratan çok adımlı cilt bakım rutinleri. Cildin derinlemesine nemlendirilmesi ve parlak bir görünüm kazanması hedefleniyor. Bunun için hyaluronik asit, C vitamini ve niacinamide gibi içerikler daha sık tercih ediliyor. Bir diğer popüler trend ise, daha az invaziv, acısız ve kısa sürede sonuç veren teknolojik cihazlar. Örneğin, HIFU (Yüksek Yoğunluklu Odaklanmış Ultrason) ve radyofrekans gibi uygulamalar, ameliyatsız yüz germe ve sıkılaştırma için büyük ilgi görüyor. Bu cihazlar, cildin alt katmanlarındaki kolajen üretimini tetikleyerek uzun vadeli gençleşme sağlıyor. Ayrıca, kalıcı makyaj uygulamalarında da doğallık ön planda. Microblading yerine Powder Brows (Pudra Kaş) ve Nano Brows gibi daha yumuşak geçişli teknikler popülerlik kazanıyor. Dudak renklendirme işlemleri ise, daha canlı ve dolgun bir görünüm için tercih ediliyor. Bu trendler, güzelliğin sadece dış görünüşle sınırlı olmadığını, aynı zamanda kişisel sağlığı ve kendine güveni artırdığını gösteriyor. 2024, güzellik dünyasında kişisel dokunuşların ve bilimsel yaklaşımların birleştiği bir yıl olacak gibi görünüyor. Daha fazla bilgi ve detaylı analiz için blogumuzdaki diğer yazıları da inceleyebilirsiniz.",
    image: "/assets/blog/trends-2024.jpg",
    category: "cilt-bakimi",
    author: "Dr. Ayşe Kaya",
    authorImage: "/assets/authors/ayse-kaya.jpg",
    authorBio: "Dr. Ayşe Kaya, cilt bakım ve güzellik alanında uzman bir doktorudur.",
    date: "15 Mart 2024",
    readTime: "5 dk",
    views: 1250,
    likes: 100,
    comments: 25,
    tags: ["trend", "güzellik", "2024", "yenilik"],
    featured: true,
  },
  {
    title: "Lazer Epilasyon: Kapsamlı Rehber",
    slug: "lazer-epilasyon-rehberi",
    excerpt:
      "Lazer epilasyonun ne olduğunu, nasıl çalıştığını ve en etkili sonuçları almak için nelere dikkat etmeniz gerektiğini öğrenin. Bu kapsamlı rehber, tüm sorularınıza yanıt veriyor.",
    content:
      "Lazer epilasyon, günümüzde istenmeyen tüylerden kurtulmanın en etkili ve kalıcı yollarından biri olarak kabul ediliyor. Bu yöntem, yoğunlaştırılmış bir ışık demeti kullanarak tüy köklerini hedef alır ve kalıcı olarak yok etmeyi amaçlar. İşlem sırasında lazer, tüydeki melanin pigmentini yakalar ve köke ısı enerjisi gönderir. Bu ısı, tüy kökünü tahrip ederek yeniden tüy çıkmasını engeller. Lazer epilasyonun başarısı, kullanılan cihazın teknolojisine, tüy ve cilt tipinize göre değişir. Alexandrite lazerler, açık tenli ve koyu renk tüylere sahip kişiler için idealken, Nd:YAG lazerler daha koyu cilt tipleri için güvenli bir seçenektir. Diode lazerler ise geniş bir yelpazede kullanılabilir ve hem açık hem de koyu tenlilerde etkili sonuçlar verebilir. İşlem öncesinde, tüy köklerinin lazer ışığını daha iyi absorbe etmesi için tüylerin jiletle kesilmesi önerilir. İşlem sonrası ciltte hafif kızarıklık ve hassasiyet oluşabilir. Bu yan etkileri en aza indirmek için güneşten kaçınmak, nemlendirici ve yatıştırıcı kremler kullanmak önemlidir. Ortalama 6 ila 8 seans sonrasında istenen sonuçlara ulaşılır, ancak bu sayı kişiden kişiye farklılık gösterebilir. Lazer epilasyon, doğru merkezde ve uzman kişiler tarafından yapıldığında oldukça güvenli ve etkili bir çözümdür. Unutmayın, en doğru seans planı için bir uzmana danışmak şarttır.",
    image: "/assets/blog/lazer-rehberi.jpg",
    category: "epilasyon",
    author: "Uzm. Zeynep Demir",
    authorImage: "/assets/authors/zeynep-demir.jpg",
    authorBio: "Uzm. Zeynep Demir, epilasyon ve diğer cilt bakım uygulamalarında uzmandır.",
    date: "10 Mart 2024",
    readTime: "7 dk",
    views: 2100,
    likes: 150,
    comments: 30,
    tags: ["lazer", "epilasyon", "kalıcı", "rehber"],
    featured: true,
  },
];

async function seedBlogs() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('beauty_center');
    const collection = db.collection('blogs');

    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing blogs');

    // Add timestamps to blogs
    const blogsWithTimestamps = blogPosts.map(blog => ({
      ...blog,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert blogs
    const result = await collection.insertMany(blogsWithTimestamps);
    console.log(`Inserted ${result.insertedCount} blogs`);

    // Create indexes
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ title: "text", content: "text", excerpt: "text" });

    console.log('Created indexes');
    console.log('✅ Blogs seeded successfully!');

  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    await client.close();
  }
}

seedBlogs();
