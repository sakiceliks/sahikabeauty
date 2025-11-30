"use client"

import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

// Fallback data if API fails
const FALLBACK_SLIDES = [
  {
    id: 1,
    image: "/slide/sld1.png",
    title: "CİLT BAKIMI",
    subtitle: "Yeni Bir Sen Hayali Değil",
    description: "Yaşınızı sorduklarında sadece gülümseyin. Işıltılı bir cilt için profesyonel dokunuşlar.",
  },
  {
    id: 2,
    image: "/slide/sld2.jpg",
    title: "GÜZELLİK BAKIMI",
    subtitle: "Profesyonel Dokunuşlar",
    description: "En son teknoloji ile güzelliğinizi keşfedin. Kendinizi uzman ellere bırakın.",
  },
  {
    id: 3,
    image: "/slide/sld3.png",
    title: "ANTI-AGING",
    subtitle: "Zamanı Durdurun",
    description: "Gençliğinizi koruyun ve yaşlanma karşıtı özel protokollerimizle tanışın.",
  },
]

// --- Animation Variants ---
// 1. Text Reveal Effect (Blur + Slide)
// Smoother, high-end reveal with blur dampening
const textRevealVariants = {
  initial: { 
    y: 40, 
    opacity: 0,
    filter: "blur(10px)"
  },
  animate: { 
    y: 0, 
    opacity: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      ease: [0.33, 1, 0.68, 1] // "Cubic-bezier" for refined deceleration
    } 
  },
  exit: { 
    y: -20, 
    opacity: 0,
    filter: "blur(5px)",
    transition: { duration: 0.5, ease: "easeIn" } 
  }
}

// 2. Container Stagger
const contentContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15, // Delay between subtitle, title, description
      delayChildren: 0.3
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

// 3. Ken Burns + Crossfade
const bgImageVariants = {
  initial: { 
    scale: 1.1,
    opacity: 0
  },
  animate: { 
    scale: 1.0, 
    opacity: 1,
    transition: { 
      scale: {
        duration: 8, 
        ease: "linear" 
      },
      opacity: {
        duration: 1.2,
        ease: "easeInOut"
      }
    } 
  },
  exit: { 
    opacity: 0,
    transition: { duration: 1.2, ease: "easeInOut" } // Slow crossfade exit
  }
}

const AUTOPLAY_DURATION = 7000

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Parallax Effect
  const { scrollY } = useScroll()
  // As user scrolls down 1000px, bg moves down 300px (slower speed = parallax)
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 300])
  
  const timerRef = useRef(null)

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
          setSlides(activeSlides)
        } else {
          console.error("Carousel verileri yüklenemedi:", data.error)
          setSlides(FALLBACK_SLIDES)
        }
      } catch (error) {
        console.error("Carousel API hatası:", error)
        setSlides(FALLBACK_SLIDES)
      } finally {
        setLoading(false)
      }
    }

    fetchCarouselData()
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return

    timerRef.current = setInterval(nextSlide, AUTOPLAY_DURATION)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoPlaying, slides.length, nextSlide])

  const handleManualNavigation = (index) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  if (loading) {
    return (
      <section className="relative h-[90vh] bg-white flex items-center justify-center overflow-hidden">
        <div className="w-12 h-12 border-t-2 border-r-2 border-blue-600 rounded-full animate-spin"></div>
      </section>
    )
  }

  if (slides.length === 0) return null

  return (
    <section 
      className="relative h-[90vh] w-full overflow-hidden bg-slate-900 group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 
         Removed mode="wait" to allow crossfading (slide 1 exits AS slide 2 enters)
         This creates a much smoother, cinematic transition.
      */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`slide-${currentSlide}`}
          className="absolute inset-0 w-full h-full"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* 1. Background Image Container with Parallax & Ken Burns */}
          <div className="absolute inset-0 overflow-hidden">
             <motion.div
              style={{ y: parallaxY }} // Parallax Scroll Effect
              className="w-full h-full"
             >
                <motion.div
                  variants={bgImageVariants}
                  className="w-full h-full"
                >
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-[110%] object-cover" // 110% height to accommodate parallax movement
                  />
                </motion.div>
             </motion.div>
             
             {/* 
                Realistic Overlay: 
                Removed heavy black tint. 
                Using a subtle gradient only at the bottom for text contrast.
             */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
          </div>

          {/* 2. Text Content */}
          <motion.div 
            variants={contentContainerVariants}
            className="absolute inset-0 flex items-center justify-center z-20 px-6 md:px-12"
          >
            <div className="max-w-5xl w-full text-center mt-20 md:mt-0">
              
              {/* Subtitle */}
              <div className="overflow-visible mb-6 flex justify-center">
                <motion.p 
                  variants={textRevealVariants}
                  className="font-marcellus text-blue-100/90 text-sm md:text-base tracking-[0.3em] uppercase font-semibold drop-shadow-md"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>

              {/* Title */}
              <div className="overflow-visible mb-8 flex justify-center">
                <motion.h1 
                  variants={textRevealVariants}
                  className="font-marcellus text-5xl md:text-7xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-xl"
                >
                  {slides[currentSlide].title}
                </motion.h1>
              </div>

              {/* Description */}
              <div className="overflow-visible mb-12 flex justify-center">
                 <motion.p 
                    variants={textRevealVariants}
                    className="font-marcellus text-white/95 text-lg md:text-2xl max-w-2xl leading-relaxed drop-shadow-md"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
              </div>

              {/* Button */}
              <div className="overflow-visible flex justify-center pt-2">
                <motion.div variants={textRevealVariants}>
                   <Link
                     href="/rezervasyon"
                     className="relative px-10 py-4 bg-blue-600 text-white font-marcellus text-sm tracking-[0.2em] uppercase hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg shadow-blue-900/30 hover:scale-105 active:scale-95 inline-block"
                   >
                      <span className="relative z-10 flex items-center gap-2">
                        Randevu Oluştur
                      </span>
                   </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* 3. Navigation Controls */}
      
      {/* Arrows */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(index)}
            className="group relative py-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`h-[3px] rounded-full transition-all duration-500 shadow-sm ${
              currentSlide === index ? "w-12 bg-blue-500" : "w-6 bg-white/50 hover:bg-white"
            }`} />
          </button>
        ))}
      </div>
    </section>
  )
}
