import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { TestimonialModel } from "@/models/testimonial"

export async function GET(request, { params }) {
  console.log("[v0] GET /api/testimonial/[id] - Starting request")

  try {
    const testimonialModel = new TestimonialModel()
    const testimonial = await testimonialModel.findById(new ObjectId(params.id))

    if (!testimonial) {
      console.log("[v0] Testimonial not found:", params.id)
      return NextResponse.json(
        {
          success: false,
          error: "Testimonial not found",
        },
        { status: 404 },
      )
    }

    console.log("[v0] Found testimonial:", testimonial._id)

    return NextResponse.json(
      {
        success: true,
        data: testimonial,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] GET testimonial error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function PUT(request, { params }) {
  console.log("[v0] PUT /api/testimonial/[id] - Starting request")

  try {
    const testimonialModel = new TestimonialModel()
    const body = await request.json()
    console.log("[v0] Request body:", body)

    const testimonial = await testimonialModel.update(new ObjectId(params.id), body)

    if (!testimonial) {
      console.log("[v0] Testimonial not found:", params.id)
      return NextResponse.json(
        {
          success: false,
          error: "Testimonial not found",
        },
        { status: 404 },
      )
    }

    console.log("[v0] Testimonial updated:", testimonial._id)

    return NextResponse.json(
      {
        success: true,
        data: testimonial,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] PUT testimonial error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  console.log("[v0] DELETE /api/testimonial/[id] - Starting request")

  try {
    const testimonialModel = new TestimonialModel()
    const deleted = await testimonialModel.delete(new ObjectId(params.id))

    if (!deleted.success) {
      console.log("[v0] Testimonial not found:", params.id)
      return NextResponse.json(
        {
          success: false,
          error: "Testimonial not found",
        },
        { status: 404 },
      )
    }

    console.log("[v0] Testimonial deleted:", params.id)

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] DELETE testimonial error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
