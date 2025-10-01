import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { broadcastNotification } from "../notifications/route"

// POST - İletişim formu gönderimi
export async function POST(request) {
  try {
    const body = await request.json()
    const now = new Date()
    
    const contactData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      createdAt: now,
      status: 'new' // new, read, replied
    }

    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contacts")
    
    // Veritabanına kaydet
    const result = await collection.insertOne(contactData)
    
    // Admin'lere SSE bildirimi gönder
    try {
      console.log('Contact API: Sending SSE notification...')
      const notificationData = {
        type: 'new_contact',
        title: 'Yeni İletişim Mesajı',
        message: `${body.name} adlı kişiden yeni mesaj alındı`,
        data: {
          id: result.insertedId,
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message,
          timestamp: now.toISOString()
        }
      }
      console.log('Contact API: Notification data:', notificationData)
      broadcastNotification(notificationData)
      console.log('Contact API: SSE notification sent successfully')
    } catch (sseError) {
      console.error('SSE bildirimi gönderilemedi:', sseError)
      // SSE hatası olsa bile devam et
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { id: result.insertedId },
      message: "Mesajınız başarıyla gönderildi"
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: "Mesaj gönderilemedi" },
      { status: 500 }
    )
  }
}

// GET - İletişim mesajlarını getir (admin için)
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contacts")
    
    const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    return NextResponse.json({
      success: true,
      data: contacts
    })
  } catch (error) {
    console.error('Error getting contacts:', error)
    return NextResponse.json(
      { success: false, error: "Mesajlar getirilemedi" },
      { status: 500 }
    )
  }
}
