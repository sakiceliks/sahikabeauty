import { NextResponse } from "next/server"
import { CarouselModel } from "@/models/carousel.js"
import { logDeleteAction, logPutAction } from "@/lib/logger"

// PUT - Carousel slide güncelle
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, subtitle, description, image, order, active } = body

    console.log("Carousel PUT: Updating slide with ID:", id)
    console.log("Carousel PUT: Update data:", body)

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Geçerli bir slide ID gereklidir",
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

    console.log("Carousel PUT: Update data to send:", updateData)

    const result = await CarouselModel.update(id, updateData)

    if (result.success) {
      // Log the action
      await logPutAction(`/api/carousel/${id}`, "admin", `Carousel slide güncellendi: ${title}`)

      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
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
    return NextResponse.json(
      {
        success: false,
        error: "Carousel slide güncellenemedi",
      },
      { status: 500 },
    )
  }
}

// DELETE - Carousel slide sil
export async function DELETE(request, { params }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Geçerli bir slide ID gereklidir",
        },
        { status: 400 },
      )
    }

    const result = await CarouselModel.delete(id)

    if (result.success) {
      // Log the action
      await logDeleteAction(`/api/carousel/${id}`, "admin", `Carousel slide silindi`)

      return NextResponse.json({
        success: true,
        data: result.data,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("Carousel slide silinirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Carousel slide silinemedi",
      },
      { status: 500 },
    )
  }
}
