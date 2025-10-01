import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { logAction, logError } from "@/lib/logger"

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
    
    // Log the creation action
    await logAction("POST", "/api/contact", "admin", "success", `Contact message received: ${body.name} - ${body.email}`);
    
    return NextResponse.json({ 
      success: true, 
      data: { id: result.insertedId },
      message: "Mesajınız başarıyla gönderildi"
    })
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Log the error
    await logError("POST", "/api/contact", "admin", error);
    
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
