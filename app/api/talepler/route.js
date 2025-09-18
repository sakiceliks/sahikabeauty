import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Telegram bot konfigürasyonu
const getTelegramConfig = async () => {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const config = await db.collection("telegram_config").findOne({})
    return config || {
      token: process.env.TELEGRAM_BOT_TOKEN || '7029953498:AAEHhXGk-O-xClN9h6AIzYVmORNuUbbREHU',
      chatId: process.env.TELEGRAM_CHAT_ID || '7587818925'
    }
  } catch (error) {
    console.error('Telegram config error:', error)
    return {
      token: process.env.TELEGRAM_BOT_TOKEN || '7029953498:AAEHhXGk-O-xClN9h6AIzYVmORNuUbbREHU',
      chatId: process.env.TELEGRAM_CHAT_ID || '7587818925'
    }
  }
}

// Telegram mesajı gönder
const sendTelegramMessage = async (message) => {
  try {
    const config = await getTelegramConfig()
    const response = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })
    
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Telegram send error:', error)
    throw error
  }
}

// GET - Tüm talepleri getir
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("talepler")
    
    const allTaleps = await collection.find().sort({ olusturmaTarihi: -1 }).toArray()
    
    return NextResponse.json({ success: true, data: allTaleps })
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json(
      { success: false, error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}

// POST - Yeni talep oluştur
export async function POST(request) {
  try {
    const body = await request.json()
    const now = new Date()
    const generatedTalepId = Math.floor(100000 + Math.random() * 900000)
    
    const formData = {
      talepId: generatedTalepId,
      isimSoyisim: body.isimSoyisim,
      markaModel: body.markaModel,
      sorun: body.sorun,
      telefonNo: body.telefonNo,
      ekranSifresi: body.ekranSifresi || "",
      adres: body.adres,
      not: body.not || "",
      durumId: 1, // Başlangıç durumu: Talebiniz Alındı
      olusturmaTarihi: now,
      guncellenmeTarihi: now
    }

    const message = `
    📌 Yeni Talep Oluşturuldu ⚡️
    
    ┌─────────────────────────────┐
    │ 🆔 Talep No       : ${generatedTalepId}
    │ 👤 Ad Soyad       : ${body.isimSoyisim}
    │ 🛠️ Hizmet         : ${body.markaModel}
    │ 📞 Telefon        : ${body.telefonNo}
    │ 📅 Randevu Tarihi : ${body.adres}
    │ 🛑: ${body.sorun}
    │ 🕒 Oluşturma      : ${now.toLocaleString('tr-TR')}
    │ 📝 Not            : ${body.not || "Yok"}
    └─────────────────────────────┘
    `
    

    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("talepler")
    
    // Veritabanına kaydet
    await collection.insertOne(formData)
    
    // Telegram'a mesaj gönder
    try {
      await sendTelegramMessage(message)
    } catch (telegramError) {
      console.error('Telegram mesajı gönderilemedi:', telegramError)
      // Telegram hatası olsa bile veritabanına kaydedildiği için devam et
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { talepId: generatedTalepId },
      message: "Form başarıyla kaydedildi ve Telegram'a gönderildi"
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: "Veri kaydedilemedi" },
      { status: 500 }
    )
  }
}