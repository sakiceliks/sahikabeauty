import { NextResponse } from "next/server"
import { TestimonialModel } from "@/models/testimonial"
import { logAction, logError } from "@/lib/logger"

export async function GET(request) {
  try {
    const testimonialModel = new TestimonialModel()
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')

    let testimonials
    if (serviceId) {
      // Hem number hem de string serviceId'leri kabul et
      const numericServiceId = parseInt(serviceId)
      if (!isNaN(numericServiceId)) {
        testimonials = await testimonialModel.findByServiceId(numericServiceId)
      } else {
        // String ise tüm testimonials'ı getir
        testimonials = await testimonialModel.findAll()
      }
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

    // Log the creation action
    await logAction("POST", "/api/testimonial", "admin", "success", `Testimonial created: ${body.name}`);

    return NextResponse.json(
      {
        success: true,
        data: savedTestimonial,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] POST testimonial error:", error)
    
    // Log the error
    await logError("POST", "/api/testimonial", "admin", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
