import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://saki:IzogizG02A6yNCBW@mern.mhhyfp6.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

const carouselData = [
  {
    title: "•CİLT BAKIMI•",
    subtitle: "Yeni Bir Sen Hayali Değil",
    description: "Yaşınızı sorduklarında sadece gülümseyini",
    image: "/slide/sld1.png",
    order: 1,
    active: true,
  },
  {
    title: "•GÜZELLIK BAKIMI•",
    subtitle: "Profesyonel Cilt Bakımı",
    description: "En son teknoloji ile güzelliğinizi keşfedin",
    image: "/slide/sld2.jpg",
    order: 2,
    active: true,
  },
  {
    title: "•ANTI-AGING•",
    subtitle: "Zamanı Durdurun",
    description: "Gençliğinizi koruyun ve yaşlanma karşıtı bakım alın",
    image: "/slide/sld3.png",
    order: 3,
    active: true,
  },
]

async function seedCarousel() {
  try {
    await client.connect()
    console.log("MongoDB'ye bağlandı")

    const db = client.db('beauty_center')
    const collection = db.collection("carousel")

    // Mevcut verileri temizle
    await collection.deleteMany({})
    console.log("Mevcut carousel verileri temizlendi")

    // Yeni verileri ekle
    const result = await collection.insertMany(
      carouselData.map(slide => ({
        ...slide,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    )

    console.log(`${result.insertedCount} carousel slide eklendi`)
    console.log("Carousel verileri başarıyla seed edildi")
  } catch (error) {
    console.error("Carousel seed işlemi sırasında hata:", error)
  } finally {
    await client.close()
    console.log("MongoDB bağlantısı kapatıldı")
  }
}

seedCarousel()
