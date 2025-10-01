import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { logAction, logError } from "@/lib/logger"

// GET - Tek bir contact mesajını getir
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz ID" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contacts")
    
    const contact = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Mesaj bulunamadı" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Error getting contact:', error)
    await logError("GET", `/api/contact/${params.id}`, "admin", error)
    return NextResponse.json(
      { success: false, error: "Mesaj getirilemedi" },
      { status: 500 }
    )
  }
}

// PUT - Contact mesajını güncelle
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz ID" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contacts")
    
    const updateData = {}
    if (body.status) updateData.status = body.status
    if (body.notes) updateData.notes = body.notes
    if (body.repliedAt) updateData.repliedAt = new Date()
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Mesaj bulunamadı" },
        { status: 404 }
      )
    }
    
    await logAction("PUT", `/api/contact/${id}`, "admin", "success", `Contact message updated: ${body.status || 'status changed'}`)
    
    return NextResponse.json({
      success: true,
      message: "Mesaj güncellendi"
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    await logError("PUT", `/api/contact/${params.id}`, "admin", error)
    return NextResponse.json(
      { success: false, error: "Mesaj güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Contact mesajını sil
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz ID" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("beauty_center")
    const collection = db.collection("contacts")
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Mesaj bulunamadı" },
        { status: 404 }
      )
    }
    
    await logAction("DELETE", `/api/contact/${id}`, "admin", "success", "Contact message deleted")
    
    return NextResponse.json({
      success: true,
      message: "Mesaj silindi"
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    await logError("DELETE", `/api/contact/${params.id}`, "admin", error)
    return NextResponse.json(
      { success: false, error: "Mesaj silinemedi" },
      { status: 500 }
    )
  }
}
