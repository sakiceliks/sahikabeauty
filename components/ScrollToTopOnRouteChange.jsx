"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const ScrollToTopOnRouteChange = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Her route değişiminde sayfanın en üstüne git
    // setTimeout ile DOM'un tamamen yüklenmesini bekle
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Anında scroll, smooth değil
      })
    }, 0)

    // Cleanup timer
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

export default ScrollToTopOnRouteChange
