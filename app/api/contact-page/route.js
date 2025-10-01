import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { logAction, logError } from "@/lib/logger"

// GET - İletişim sayfası verilerini getir
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contact_page")
    
    const contactData = await collection.findOne({})
    
    if (contactData) {
      return NextResponse.json({
        success: true,
        data: contactData
      })
    } else {
      // Varsayılan veriler
      const defaultData = {
        title: "İletişim",
        subtitle: "Bizimle İletişime Geçin",
        description: "Sultanbeyli'de profesyonel güzellik hizmetleri için bizimle iletişime geçin. Uzman kadromuzla cilt sağlığınız için buradayız.",
        mainImage: "/assets/about/img.jpg",
        address: {
          street: "Abdurrahmangazi, Fatih Blv. No:73/1",
          city: "34920 Sultanbeyli/İstanbul",
          full: "Abdurrahmangazi, Fatih Blv. No:73/1, 34920 Sultanbeyli/İstanbul"
        },
        phone: "+90 530 434 83 49",
        email: "info@sahikabeauty.com",
        whatsapp: "https://wa.me/905304348349",
        workingHours: {
          weekdays: "09:00 - 19:00",
          saturday: "09:00 - 18:00",
          sunday: "Kapalı"
        },
        socialMedia: {
          instagram: "https://www.instagram.com/sahikabeauty",
          facebook: "",
          twitter: ""
        },
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.123456789!2d29.123456789!3d40.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzI0LjQiTiAyOcKwMDcnMjQuNCJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str",
        features: [
          {
            title: "Ücretsiz Danışmanlık",
            description: "İlk görüşmede ücretsiz cilt analizi ve danışmanlık hizmeti sunuyoruz.",
            icon: "💬"
          },
          {
            title: "Randevu Sistemi",
            description: "Online randevu sistemi ile kolayca randevu alabilirsiniz.",
            icon: "📅"
          },
          {
            title: "Uzman Kadro",
            description: "Alanında uzman estetisyenlerimizle profesyonel hizmet alırsınız.",
            icon: "👩‍⚕️"
          }
        ]
      }
      
      return NextResponse.json({
        success: true,
        data: defaultData
      })
    }
  } catch (error) {
    console.error("İletişim sayfası verileri getirirken hata:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Veriler yüklenirken hata oluştu" 
      },
      { status: 500 }
    )
  }
}

// PUT - İletişim sayfası verilerini güncelle
export async function PUT(request) {
  try {
    const body = await request.json()
    
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contact_page")
    
    // Mevcut veriyi güncelle veya yeni oluştur
    const result = await collection.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, returnDocument: "after" }
    )
    
    // Log the update action
    await logAction("PUT", "/api/contact-page", "admin", "success", "Contact page updated");
    
    return NextResponse.json({
      success: true,
      data: result.value
    })
  } catch (error) {
    console.error("İletişim sayfası verileri güncellenirken hata:", error)
    
    // Log the error
    await logError("PUT", "/api/contact-page", "admin", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Veriler güncellenirken hata oluştu" 
      },
      { status: 500 }
    )
  }
}
