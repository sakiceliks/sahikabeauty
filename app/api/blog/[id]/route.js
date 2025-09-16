import { NextResponse } from "next/server"
import { BlogModel } from "@/models/blog"

const blogModel = new BlogModel()

// GET - blog yazısını ID ile getir
export async function GET(request, { params }) {
  try {
    const blog = await blogModel.findById(params.id)
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
    const body = await request.json()

    if (body.slug) {
      const existing = await blogModel.findBySlug(body.slug)
      if (existing && existing._id.toString() !== params.id) {
        return NextResponse.json(
          { success: false, error: "Slug already exists" },
          { status: 400 }
        )
      }
    }

    const updated = await blogModel.update(params.id, body)
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    if (error.message === "Blog not found") {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 })
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
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
