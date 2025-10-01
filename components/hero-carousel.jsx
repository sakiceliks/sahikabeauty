"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => 
            index === currentSlide ? (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image with Enhanced Parallax and Zoom Effect */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                  initial={{ scale: 1.1, x: 0, y: 0 }}
                  animate={{ 
                    scale: 1.15,
                    x: [0, -10, 10, 0],
                    y: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
                </motion.div>

                {/* Content Overlay - Symmetric and Centered */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center text-white px-6 md:px-8 lg:px-12 max-w-5xl mx-auto"
                  >
                    {/* Subtitle with animated entrance and floating effect */}
                    <motion.p 
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        y: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.4,
                        y: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="text-lg md:text-xl lg:text-2xl font-light italic mb-6 tracking-wide text-center drop-shadow-lg"
                    >
                      {slide.subtitle}
                    </motion.p>
                    
                    {/* Main Title with staggered animation and subtle floating */}
                    <motion.h1 
                      initial={{ opacity: 0, y: 40, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        y: [0, -3, 0]
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.6, 
                        ease: "easeOut",
                        y: {
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5
                        }
                      }}
                      className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.15em] md:tracking-[0.25em] mb-6 md:mb-8 text-center leading-tight drop-shadow-2xl"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    {/* Description with fade-in animation and subtle floating */}
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        y: [0, -2, 0]
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.8,
                        y: {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }
                      }}
                      className="text-sm md:text-base lg:text-lg font-light tracking-widest uppercase mb-10 text-center max-w-2xl mx-auto drop-shadow-md"
                    >
                      {slide.description}
                    </motion.p>
                    
                    {/* Randevu Al Butonu with enhanced animation */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="flex justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href="/rezervasyon"
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:shadow-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                        >
                          📅 Randevu Al
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
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
