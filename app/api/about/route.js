import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { logAction, logError } from "@/lib/logger"

// GET - Hakkımızda verilerini getir
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("about")
    
    const aboutData = await collection.findOne({})
    
    if (aboutData) {
      return NextResponse.json({
        success: true,
        data: aboutData
      })
    } else {
      // Varsayılan veriler
      const defaultData = {
        title: "Hakkımızda",
        subtitle: "13 Yıllık Deneyimimizle",
        description: "13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız. Doğal içerikli ürünler ve modern cihazlarla kişiye özel çözümler sunuyoruz.",
        mainImage: "/assets/about/img.jpg",
        mission: "Sultanbeyli ve çevresinde yaşayan kadınların güzellik ve bakım ihtiyaçlarını en kaliteli hizmet anlayışıyla karşılamak, modern teknoloji ve doğal ürünleri harmanlayarak cilt sağlığınızı korumaktır.",
        stats: [
          { number: "13+", label: "Yıl Deneyim" },
          { number: "35.000+", label: "Mutlu Müşteri" },
          { number: "97%", label: "Doğal İçerik" },
          { number: "100%", label: "Müşteri Memnuniyeti" }
        ],
        features: [
          {
            title: "Profesyonel Ekip",
            description: "Alanında uzman estetisyenlerimizle hizmet veriyoruz.",
            icon: "👩‍⚕️"
          },
          {
            title: "Doğal Ürünler",
            description: "%97 doğal içerikli ürünlerle cilt sağlığınızı koruyoruz.",
            icon: "🌿"
          },
          {
            title: "Modern Teknoloji",
            description: "En son teknoloji cihazlarla profesyonel hizmet sunuyoruz.",
            icon: "⚡"
          }
        ],
        whyChooseUs: [
          "13 yıllık sektör deneyimi ve uzman kadro",
          "%97 doğal içerikli, cilt dostu ürünler",
          "Kişiye özel bakım programları",
          "Modern cihazlar ve hijyenik ortam",
          "Uygun fiyat politikası"
        ],
        address: "Abdurrahmangazi, Fatih Blv. No:73/1, Sultanbeyli/İstanbul",
        phone: "+90 530 434 83 49",
        email: "info@sultanbeyliguzellikmerkezi.com.tr",
        foundingYear: "2011",
        socialMedia: {
          instagram: "https://www.instagram.com/sahikabeauty",
          whatsapp: "https://wa.me/905304348349"
        }
      }
      
      return NextResponse.json({
        success: true,
        data: defaultData
      })
    }
  } catch (error) {
    console.error("Hakkımızda verileri getirirken hata:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Veriler yüklenirken hata oluştu" 
      },
      { status: 500 }
    )
  }
}

// PUT - Hakkımızda verilerini güncelle
export async function PUT(request) {
  try {
    const body = await request.json()
    
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("about")
    
    // Mevcut veriyi güncelle veya yeni oluştur
    const result = await collection.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, returnDocument: "after" }
    )
    
    // Log the update action
    await logAction("PUT", "/api/about", "admin", "success", "About page updated");
    
    return NextResponse.json({
      success: true,
      data: result.value
    })
  } catch (error) {
    console.error("Hakkımızda verileri güncellenirken hata:", error)
    
    // Log the error
    await logError("PUT", "/api/about", "admin", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Veriler güncellenirken hata oluştu" 
      },
      { status: 500 }
    )
  }
}
