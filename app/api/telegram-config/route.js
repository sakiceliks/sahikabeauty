import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// GET - Telegram konfigürasyonunu getir
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("telegram_config")
    
    let config = await collection.findOne({})
    
    if (!config) {
      // Varsayılan konfigürasyon oluştur
      config = {
        token: process.env.TELEGRAM_BOT_TOKEN || '',
        chatId: process.env.TELEGRAM_CHAT_ID || '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await collection.insertOne(config)
    }
    
    // Token'ı güvenlik için maskeliyoruz
    const maskedConfig = {
      ...config,
      token: config.token ? `${config.token.substring(0, 10)}...${config.token.substring(config.token.length - 4)}` : '',
      _id: undefined
    }
    
    return NextResponse.json({ success: true, data: maskedConfig })
  } catch (error) {
    console.error('Telegram config get error:', error)
    return NextResponse.json(
      { success: false, error: "Konfigürasyon getirilemedi" },
      { status: 500 }
    )
  }
}

// PUT - Telegram konfigürasyonunu güncelle
export async function PUT(request) {
  try {
    const body = await request.json()
    const { token, chatId } = body
    
    if (!token || !chatId) {
      return NextResponse.json(
        { success: false, error: "Token ve Chat ID gerekli" },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("telegram_config")
    
    // Test mesajı gönder
    try {
      const testResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: '🔧 Telegram bot konfigürasyonu test edildi! Bot çalışıyor.'
        })
      })
      
      if (!testResponse.ok) {
        const errorData = await testResponse.json()
        return NextResponse.json(
          { success: false, error: `Telegram test hatası: ${errorData.description || 'Bilinmeyen hata'}` },
          { status: 400 }
        )
      }
    } catch (testError) {
      return NextResponse.json(
        { success: false, error: `Telegram bağlantı hatası: ${testError.message}` },
        { status: 400 }
      )
    }
    
    // Konfigürasyonu güncelle
    const result = await collection.updateOne(
      {},
      {
        $set: {
          token,
          chatId,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    
    return NextResponse.json({ 
      success: true, 
      message: "Telegram konfigürasyonu başarıyla güncellendi ve test edildi"
    })
  } catch (error) {
    console.error('Telegram config update error:', error)
    return NextResponse.json(
      { success: false, error: "Konfigürasyon güncellenemedi" },
      { status: 500 }
    )
  }
}
