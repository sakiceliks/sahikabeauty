import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// GET - Tek bir talep getir
export async function GET(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("talepler")

    const talepId = parseInt(params.id) // talepId'nin sayısal olduğunu varsayıyoruz

    if (isNaN(talepId)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz Talep ID formatı" },
        { status: 400 }
      )
    }

    const talep = await collection.findOne({ talepId: talepId })

    if (!talep) {
      return NextResponse.json({ success: false, error: "Talep bulunamadı" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: talep })
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json(
      { success: false, error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}

// PUT - Talep durumunu güncelle
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const { durumId, not } = body

    if (!durumId) {
      return NextResponse.json(
        { success: false, error: "Durum ID gereklidir" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("talepler")

    const talepId = parseInt(params.id)

    if (isNaN(talepId)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz Talep ID formatı" },
        { status: 400 }
      )
    }

    const updateData = {
      durumId: durumId,
      guncellenmeTarihi: new Date()
    }

    if (not) {
      updateData.not = not
    }

    const result = await collection.updateOne(
      { talepId: talepId },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Talep bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Talep durumu başarıyla güncellendi" 
    })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { success: false, error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}

// DELETE - Talep sil
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("talepler")

    const talepId = parseInt(params.id)

    if (isNaN(talepId)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz Talep ID formatı" },
        { status: 400 }
      )
    }

    const result = await collection.deleteOne({ talepId: talepId })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Talep bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Talep başarıyla silindi" 
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { success: false, error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}