import { NextResponse } from "next/server"
import { TestimonialModel } from "@/models/testimonial"

export async function GET(request) {
  try {
    const testimonialModel = new TestimonialModel()
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')

    let testimonials
    if (serviceId) {
      testimonials = await testimonialModel.findByServiceId(parseInt(serviceId))
    } else {
      testimonials = await testimonialModel.findAll()
    }

    return NextResponse.json(
      {
        success: true,
        data: testimonials,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] GET testimonials error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  console.log("[v0] POST /api/testimonial - Starting request")

  try {
    const testimonialModel = new TestimonialModel()

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const savedTestimonial = await testimonialModel.create(body)

    console.log("[v0] Testimonial saved:", savedTestimonial._id)

    return NextResponse.json(
      {
        success: true,
        data: savedTestimonial,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] POST testimonial error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
