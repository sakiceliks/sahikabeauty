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
    console.log("PUT API - params.id:", params.id)
    
    let body
    try {
      body = await request.json()
      console.log("PUT API - body:", body)
    } catch (error) {
      console.error("PUT API - JSON parse error:", error)
      return NextResponse.json(
        { success: false, error: "Geçersiz istek gövdesi" },
        { status: 400 }
      )
    }

    // Önce mevcut blog yazısını bul
    console.log("PUT API - searching for blog with slug:", params.id)
    const existingBlog = await blogModel.findBySlug(params.id)
    console.log("PUT API - existingBlog:", existingBlog)
    
    if (!existingBlog) {
      console.log("PUT API - blog not found for slug:", params.id)
      return NextResponse.json(
        { success: false, error: `Blog yazısı bulunamadı (slug: ${params.id})` },
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
    console.log("API - params.id:", params.id, "body:", body)
    
    try {
      const updated = await blogModel.updateBySlug(params.id, body)
      console.log("API - updated result:", updated)
      
      if (!updated) {
        console.log("API - update failed, returning error")
        return NextResponse.json(
          { success: false, error: "Blog yazısı güncellenemedi" },
          { status: 500 }
        )
      }

      console.log("API - update successful, returning success")
      return NextResponse.json({ success: true, data: updated })
    } catch (updateError) {
      console.error("API - updateBySlug error:", updateError)
      return NextResponse.json(
        { success: false, error: "Güncelleme hatası: " + updateError.message },
        { status: 500 }
      )
    }
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
