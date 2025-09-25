"use client"

import { useState, useEffect } from "react"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [heroSlides, setHeroSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch("/api/carousel")
        const data = await response.json()

        if (data.success) {
          // Only show active slides, sorted by order
          const activeSlides = data.data
            .filter((slide) => slide.active !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
          setHeroSlides(activeSlides)
        } else {
          console.error("Carousel verileri yüklenemedi:", data.error)
          // Fallback to static data if API fails
          setHeroSlides([
            {
              id: 1,
              image: "/slide/sld1.png",
              title: "•CİLT BAKIMI•",
              subtitle: "Yeni Bir Sen Hayali Değil",
              description: "Yaşınızı sorduklarında sadece gülümseyini",
            },
            {
              id: 2,
              image: "/slide/sld2.jpg",
              title: "•GÜZELLIK BAKIMI•",
              subtitle: "Profesyonel Cilt Bakımı",
              description: "En son teknoloji ile güzelliğinizi keşfedin",
            },
            {
              id: 3,
              image: "/slide/sld3.png",
              title: "•ANTI-AGING•",
              subtitle: "Zamanı Durdurun",
              description: "Gençliğinizi koruyun ve yaşlanma karşıtı bakım alın",
            },
          ])
        }
      } catch (error) {
        console.error("Carousel API hatası:", error)
        // Fallback to static data
        setHeroSlides([
          {
            id: 1,
            image: "/slide/sld1.png",
            title: "•CİLT BAKIMI•",
            subtitle: "Yeni Bir Sen Hayali Değil",
            description: "Yaşınızı sorduklarında sadece gülümseyini",
          },
          {
            id: 2,
            image: "/slide/sld2.jpg",
            title: "•GÜZELLIK BAKIMI•",
            subtitle: "Profesyonel Cilt Bakımı",
            description: "En son teknoloji ile güzelliğinizi keşfedin",
          },
          {
            id: 3,
            image: "/slide/sld3.png",
            title: "•ANTI-AGING•",
            subtitle: "Zamanı Durdurun",
            description: "Gençliğinizi koruyun ve yaşlanma karşıtı bakım alın",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCarouselData()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroSlides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  if (loading) {
    return (
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-screen px-6 md:px-20 lg:px-32">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
        </div>
      </div>
    )
  }

  if (heroSlides.length === 0) {
    return (
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">Carousel verisi bulunamadı</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            {/* Background Image with Parallax and Zoom Effect */}
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[6000ms] ease-out ${
                index === currentSlide ? "scale-110" : "scale-105"
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? "scale(1.1)" : "scale(1.05)",
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div
                className={`text-center text-white px-4 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-base md:text-lg lg:text-xl font-light italic mb-4 tracking-wide">{slide.subtitle}</p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6">
                  Şahika Beauty - Sultanbeyli Güzellik Merkezi
                </h1>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
                  {slide.title}
                </h2>
                <p className="text-xs md:text-sm lg:text-base font-light tracking-widest uppercase mb-8">
                  {slide.description}
                </p>
                
                {/* Randevu Al Butonu */}
                <div className="flex justify-center">
                  <a
                    href="/rezervasyon"
                    className="bg-primary hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-sm border border-white/20"
                  >
                    📅 Randevu Al
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
