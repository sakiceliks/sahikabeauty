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

// DELETE - Carousel slide sil
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const slideId = Number.parseInt(id)

    if (!slideId) {
      return NextResponse.json(
        {
          success: false,
          error: "Geçerli bir slide ID gereklidir",
        },
        { status: 400 },
      )
    }

    const slideIndex = carouselData.findIndex((slide) => slide.id === slideId)
    if (slideIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Slide bulunamadı",
        },
        { status: 404 },
      )
    }

    // Slide'ı sil
    const deletedSlide = carouselData.splice(slideIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedSlide,
    })
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
