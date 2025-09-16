import { NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "blog.json")

// GET - Tüm blog yazılarını getir
export async function GET() {
  console.log("[v0] GET /api/blog called")
  try {
    console.log("[v0] Reading file from:", dataFilePath)
    const data = await readFile(dataFilePath, "utf8")
    console.log("[v0] File content:", data)

    let blogPosts = []
    if (data.trim()) {
      blogPosts = JSON.parse(data)
    }
    console.log("[v0] Parsed blog posts:", blogPosts)

    return NextResponse.json(
      {
        success: true,
        data: blogPosts,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log("[v0] GET error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Blog yazıları okunurken hata oluştu",
      },
      { status: 500 },
    )
  }
}

// POST - Yeni blog yazısı oluştur
export async function POST(request) {
  console.log("[v0] POST /api/blog called")
  try {
    console.log("[v0] Parsing request body...")
    const newPost = await request.json()
    console.log("[v0] New post data:", newPost)

    console.log("[v0] Reading existing blog posts...")
    const data = await readFile(dataFilePath, "utf8")
    console.log("[v0] Existing data:", data)

    let blogPosts = []
    if (data.trim()) {
      blogPosts = JSON.parse(data)
    }
    console.log("[v0] Parsed existing posts:", blogPosts)

    console.log("[v0] Calculating new ID...")
    const existingIds = blogPosts.map((post) => post.id)
    console.log("[v0] Existing IDs:", existingIds)

    const newId = blogPosts.length > 0 ? Math.max(...existingIds) + 1 : 1
    console.log("[v0] Generated new ID:", newId)

    newPost.id = newId

    // Tarih ekle (eğer yoksa)
    if (!newPost.date) {
      newPost.date = new Date().toLocaleDateString("tr-TR")
      console.log("[v0] Added date:", newPost.date)
    }

    // Görüntülenme sayısı (eğer yoksa)
    if (!newPost.views) {
      newPost.views = 0
      console.log("[v0] Added views:", newPost.views)
    }

    console.log("[v0] Final post object:", newPost)
    blogPosts.push(newPost)
    console.log("[v0] Updated posts array:", blogPosts)

    console.log("[v0] Writing to file...")
    await writeFile(dataFilePath, JSON.stringify(blogPosts, null, 2))
    console.log("[v0] File written successfully")

    return NextResponse.json(
      {
        success: true,
        data: newPost,
      },
      { status: 201 },
    )
  } catch (error) {
    console.log("[v0] POST error:", error)
    console.log("[v0] Error stack:", error.stack)
    return NextResponse.json(
      {
        success: false,
        error: "Blog yazısı oluşturulurken hata oluştu: " + error.message,
      },
      { status: 500 },
    )
  }
}

// PUT - Blog yazısını güncelle
export async function PUT(request) {
  console.log("[v0] PUT /api/blog called")
  try {
    console.log("[v0] Parsing update request...")
    const updatedPost = await request.json()
    console.log("[v0] Update data:", updatedPost)

    const { id } = updatedPost
    console.log("[v0] Looking for post with ID:", id)

    const data = await readFile(dataFilePath, "utf8")
    let blogPosts = []
    if (data.trim()) {
      blogPosts = JSON.parse(data)
    }
    console.log("[v0] Current posts count:", blogPosts.length)

    const index = blogPosts.findIndex((post) => post.id === id)
    console.log("[v0] Found post at index:", index)

    if (index === -1) {
      console.log("[v0] Post not found with ID:", id)
      return NextResponse.json(
        {
          success: false,
          error: "Blog yazısı bulunamadı",
        },
        { status: 404 },
      )
    }

    console.log("[v0] Updating post at index:", index)
    blogPosts[index] = { ...blogPosts[index], ...updatedPost }
    console.log("[v0] Updated post:", blogPosts[index])

    await writeFile(dataFilePath, JSON.stringify(blogPosts, null, 2))
    console.log("[v0] Update written to file")

    return NextResponse.json(
      {
        success: true,
        data: blogPosts[index],
      },
      { status: 200 },
    )
  } catch (error) {
    console.log("[v0] PUT error:", error)
    console.log("[v0] Error stack:", error.stack)
    return NextResponse.json(
      {
        success: false,
        error: "Blog yazısı güncellenirken hata oluştu",
      },
      { status: 500 },
    )
  }
}
