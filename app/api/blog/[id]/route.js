import { NextResponse } from "next/server"
import { BlogModel } from "@/models/blog"
import { ObjectId } from "mongodb"

const blogModel = new BlogModel()

// GET - blog yazısını slug ile getir
export async function GET(request, { params }) {
  try {
    const blog = await blogModel.findBySlug(params.id)
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PUT - blog yazısını slug ile güncelle
export async function PUT(request, { params }) {
  try {
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Geçersiz istek gövdesi" },
        { status: 400 }
      )
    }

    // Önce mevcut blog yazısını bul
    const existingBlog = await blogModel.findBySlug(params.id)
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: "Blog yazısı bulunamadı" },
        { status: 404 }
      )
    }

    // Slug çakışmasını kontrol et (farklı blog için aynı slug kullanılmasın)
    if (body.slug && body.slug !== params.id) {
      const existing = await blogModel.findBySlug(body.slug)
      if (existing) {
        return NextResponse.json(
          { success: false, error: "Bu slug zaten başka bir blog yazısında kullanılıyor" },
          { status: 400 }
        )
      }
    }

    // Slug ile blog yazısını güncelle
    const updated = await blogModel.updateBySlug(params.id, body)
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Blog yazısı güncellenemedi" },
        { status: 500 }
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

// DELETE - blog yazısını slug ile sil
export async function DELETE(request, { params }) {
  try {
    const result = await blogModel.deleteBySlug(params.id)
    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    if (error.message === "Blog not found") {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 })
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
