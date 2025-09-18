import { NextResponse } from "next/server"
import { BlogModel } from "@/models/blog"
import { ObjectId } from "mongodb"

const blogModel = new BlogModel()

// GET - blog yazısını ID veya slug ile getir
export async function GET(request, { params }) {
  try {
    let blog
    if (ObjectId.isValid(params.id)) {
      blog = await blogModel.findById(params.id)
    } else {
      blog = await blogModel.findBySlug(params.id)
    }
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PUT - blog yazısını güncelle
export async function PUT(request, { params }) {
  try {
    // İstek gövdesini al
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Geçersiz istek gövdesi" },
        { status: 400 }
      )
    }

    // Slug çakışmasını kontrol et
    if (body.slug) {
      const existing = await blogModel.findBySlug(body.slug)
      if (existing && existing.id !== parseInt(params.id)) {
        return NextResponse.json(
          { success: false, error: "Bu slug zaten başka bir blog yazısında kullanılıyor" },
          { status: 400 }
        )
      }
    }

    // Numerik id ile blog yazısını güncelle
    const updated = await blogModel.updateByNumericId(params.id, body)
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Blog yazısı bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("PUT hatası:", error)
    return NextResponse.json(
      { success: false, error: "Bir hata oluştu: " + error.message },
      { status: 500 }
    )
  }
}

// DELETE - blog yazısını sil
export async function DELETE(request, { params }) {
  try {
    const result = await blogModel.delete(params.id)
    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    if (error.message === "Blog not found") {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 })
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
