const { MongoClient } = require("mongodb")
require('dotenv').config({ path: '.env.local' })

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const servicesData = [
  {
    slug: "lazer-epilasyon",
    category: "epilasyon",
    title: "Lazer Epilasyon",
    description: "Kalıcı epilasyon çözümü",
    image: "/slide/sld1.png",
    device: { name: "Alexandrite Lazer", imageUrl: "/slide/sld1.png" },
    duration: "60-75 dk",
    price: "₺300-500",
    icon: "Zap",
    color: "from-pink-500 to-purple-500",
    popular: true,
    areas: ["Yüz", "Boyun", "Dekolte"],
    benefits: ["Kalıcı sonuç", "Ağrısız işlem", "Hızlı uygulama"],
    detailedDescription: "En son teknoloji lazer cihazları ile kalıcı epilasyon",
    faq: [
      { question: "Kaç seans gerekir?", answer: "Genellikle 6-8 seans yeterlidir" }
    ],
    reviews: [],
    published: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: "igneli-epilasyon",
    category: "epilasyon",
    title: "İğneli Epilasyon",
    description: "Geleneksel epilasyon yöntemi",
    image: "/slide/sld2.jpg",
    device: { name: "İğne Epilasyon", imageUrl: "/slide/sld2.jpg" },
    duration: "45-60 dk",
    price: "₺200-400",
    icon: "Scissors",
    color: "from-blue-500 to-cyan-500",
    popular: false,
    areas: ["Kaş", "Bıyık", "Çene"],
    benefits: ["Doğal yöntem", "Uzun süreli sonuç", "Güvenli"],
    detailedDescription: "Geleneksel iğne epilasyon yöntemi",
    faq: [
      { question: "Ağrılı mı?", answer: "Hafif ağrı olabilir" }
    ],
    reviews: [],
    published: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: "cilt-bakimi",
    category: "cilt-bakimi",
    title: "Cilt Bakımı",
    description: "Profesyonel cilt bakım hizmetleri",
    image: "/slide/sld3.png",
    device: { name: "Cilt Bakım Cihazı", imageUrl: "/slide/sld3.png" },
    duration: "90-120 dk",
    price: "₺400-600",
    icon: "Droplets",
    color: "from-green-500 to-teal-500",
    popular: true,
    areas: ["Yüz", "Boyun", "Dekolte"],
    benefits: ["Cilt yenileme", "Nemlendirme", "Anti-aging"],
    detailedDescription: "Uzman kadromuzla profesyonel cilt bakımı",
    faq: [
      { question: "Hangi cilt tipleri için uygun?", answer: "Tüm cilt tipleri için uygundur" }
    ],
    reviews: [],
    published: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function seedServices() {
  try {
    await client.connect()
    const db = client.db("beauty_center")
    const collection = db.collection("services")

    console.log("Seeding services data...")

    // Clear existing data
    await collection.deleteMany({})
    console.log("Existing services data cleared.")

    // Insert new data
    const result = await collection.insertMany(servicesData)
    console.log(`${result.insertedCount} services inserted.`)

    console.log("Services seeding complete.")
  } catch (e) {
    console.error("Error seeding services data:", e)
  } finally {
    await client.close()
  }
}

seedServices()
