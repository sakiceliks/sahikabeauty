import { NextResponse } from "next/server"
import { CarouselModel } from "@/models/carousel.js"
import { logPutAction, logDeleteAction } from "@/lib/logger"

// GET - Tüm carousel verilerini getir
export async function GET() {
  try {
    console.log("Carousel API: GET request received")
    
    // Test MongoDB connection
    try {
      const client = await import('@/lib/mongodb').then(m => m.default);
      await client;
      console.log("Carousel API: MongoDB connection test passed");
    } catch (connectionError) {
      console.error("Carousel API: MongoDB connection test failed:", connectionError);
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed"
        },
        { status: 500 }
      );
    }
    
    const result = await CarouselModel.getAll()
    console.log("Carousel API: Model result:", result)
    
    if (result.success) {
      console.log("Carousel API: Success, returning", result.data?.length || 0, "slides")
      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
      console.error("Carousel API: Model error:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Carousel API: Unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Carousel verileri getirilemedi",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 },
    )
  }
}

// POST - Yeni carousel slide ekle
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, subtitle, description, image, order, active } = body

    if (!title || !subtitle || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Başlık, alt başlık ve açıklama gereklidir",
        },
        { status: 400 },
      )
    }

    const slideData = {
      title,
      subtitle,
      description,
      image: image || "",
      order: order || 1,
      active: active !== false,
    }

    const result = await CarouselModel.create(slideData)

    if (result.success) {
      // Log the creation action
      await logAction("POST", "/api/carousel", "admin", "success", `Carousel slide created: ${title}`);
      
      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
      // Log the error
      await logError("POST", "/api/carousel", "admin", new Error(result.error));
      
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    // Log the error
    await logError("POST", "/api/carousel", "admin", error);
    console.error("Carousel slide eklenirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Carousel slide eklenemedi",
      },
      { status: 500 },
    )
  }
}

// PUT - Carousel slide güncelle
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, title, subtitle, description, image, order, active } = body

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Slide ID gereklidir",
        },
        { status: 400 },
      )
    }

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (subtitle !== undefined) updateData.subtitle = subtitle
    if (description !== undefined) updateData.description = description
    if (image !== undefined) updateData.image = image
    if (order !== undefined) updateData.order = order
    if (active !== undefined) updateData.active = active

    const result = await CarouselModel.update(id, updateData)

    if (result.success) {
      // Log the action
      await logPutAction(`/api/carousel/${id}`, "admin", `Carousel slide güncellendi: ${title}`)

      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
      // Log the error
      await logError("PUT", `/api/carousel/${id}`, "admin", new Error(result.error));
      
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("Carousel slide güncellenirken hata:", error)
    
    // Log the error
    await logError("PUT", `/api/carousel/${id}`, "admin", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Carousel slide güncellenemedi",
      },
      { status: 500 },
    )
  }
}
