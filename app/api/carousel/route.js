import { NextResponse } from "next/server"

// Geçici veri - gerçek uygulamada veritabanından gelecek
const carouselData = [
  {
    id: 1,
    title: "•CİLT BAKIMI•",
    subtitle: "Yeni Bir Sen Hayali Değil",
    description: "Yaşınızı sorduklarında sadece gülümseyini",
    image: "/slide/sld1.png",
    order: 1,
    active: true,
  },
  {
    id: 2,
    title: "•GÜZELLIK BAKIMI•",
    subtitle: "Profesyonel Cilt Bakımı",
    description: "En son teknoloji ile güzelliğinizi keşfedin",
    image: "/slide/sld2.jpg",
    order: 2,
    active: true,
  },
  {
    id: 3,
    title: "•ANTI-AGING•",
    subtitle: "Zamanı Durdurun",
    description: "Gençliğinizi koruyun ve yaşlanma karşıtı bakım alın",
    image: "/slide/sld3.png",
    order: 3,
    active: true,
  },
]

// GET - Tüm carousel verilerini getir
export async function GET() {
  try {
    const sortedData = carouselData.sort((a, b) => (a.order || 0) - (b.order || 0))
    return NextResponse.json({
      success: true,
      data: sortedData,
    })
  } catch (error) {
    console.error("Carousel verileri getirirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Carousel verileri getirilemedi",
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

    const newSlide = {
      id: Math.max(...carouselData.map((s) => s.id), 0) + 1,
      title,
      subtitle,
      description,
      image: image || "",
      order: order || carouselData.length + 1,
      active: active !== false,
    }

    carouselData.push(newSlide)

    return NextResponse.json({
      success: true,
      data: newSlide,
    })
  } catch (error) {
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

    const slideIndex = carouselData.findIndex((slide) => slide.id === id)
    if (slideIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Slide bulunamadı",
        },
        { status: 404 },
      )
    }

    // Güncelle
    carouselData[slideIndex] = {
      ...carouselData[slideIndex],
      ...(title !== undefined && { title }),
      ...(subtitle !== undefined && { subtitle }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(order !== undefined && { order }),
      ...(active !== undefined && { active }),
    }

    return NextResponse.json({
      success: true,
      data: carouselData[slideIndex],
    })
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
