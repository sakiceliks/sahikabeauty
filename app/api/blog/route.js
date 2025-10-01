import { NextResponse } from "next/server"
import { BlogModel } from "@/models/blog"
import { logAction, logError } from "@/lib/logger"

const blogModel = new BlogModel()

// GET - tüm blog yazıları veya filtreleme
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const published = searchParams.get("published")

    let blogs

    if (search) {
      blogs = await blogModel.search(search)
    } else if (category) {
      blogs = (await blogModel.findAll()).filter((p) => p.category === category)
    } else if (published === "true") {
      // Frontend için sadece published blogları getir
      blogs = await blogModel.findPublished()
    } else {
      blogs = await blogModel.findAll()
    }

    return NextResponse.json({ success: true, data: blogs, count: blogs.length })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST - yeni blog yazısı oluştur
export async function POST(request) {
  try {
    const body = await request.json()

    const required = ["slug", "title", "content", "category"]
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing field: ${field}` },
          { status: 400 }
        )
      }
    }

    const existing = await blogModel.findBySlug(body.slug)
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 400 }
      )
    }

    const blog = await blogModel.create(body)
    
    // Log the creation action
    await logAction("POST", "/api/blog", "admin", "success", `Blog post created: ${body.title}`);
    
    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (error) {
    // Log the error
    await logError("POST", "/api/blog", "admin", error);
    
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
