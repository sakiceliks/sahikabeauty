"use client"
import { IoCloseOutline } from "react-icons/io5"
import { Home, Users, Sparkles, BookOpen, Phone, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Socials from "./Socials"
import { useEffect } from "react"

const links = [
  {
    href: "/",
    name: "Anasayfa",
    icon: Home,
  },
  {
    href: "/hakkimizda",
    name: "Hakkımızda",
    icon: Users,
  },
  {
    href: "/hizmetler",
    name: "Hizmetler",
    icon: Sparkles,
  },
  {
    href: "/blog",
    name: "Blog",
    icon: BookOpen,
  },
  {
    href: "/iletisim",
    name: "İletişim",
    icon: Phone,
  },
]

const MobileNav = ({ setMobileNav }) => {
  const pathname = usePathname()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileNav(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [setMobileNav])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setMobileNav(false)
    }
  }

  return (
    <nav className="relative flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-pink-50" role="navigation" aria-label="Mobil navigasyon">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <span className="font-elegant text-xl text-gray-800 font-semibold">Şahika Beauty</span>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setMobileNav(false)}
          onKeyDown={handleKeyDown}
          aria-label="Menüyü kapat"
        >
          <IoCloseOutline className="text-2xl text-gray-600" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-6 py-8">
        <ul className="space-y-2" role="list">
          {links.map((link, index) => {
            const IconComponent = link.icon
            const isActive = pathname === link.href
            
            return (
              <li key={index} role="listitem">
                <Link
                  href={link.href}
                  className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" 
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600"
                  }`}
                  onClick={() => setMobileNav(false)}
                  aria-current={isActive ? "page" : undefined}
                  title={`${link.name} sayfasına git`}
                >
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isActive 
                      ? "bg-white/20" 
                      : "bg-gray-100 group-hover:bg-pink-100"
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-600 group-hover:text-pink-600"
                    }`} />
                  </div>
                  <span className="font-elegant text-lg font-medium">{link.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer with social links */}
      <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="text-center mb-4">
          <p className="font-elegant text-sm text-gray-600 mb-2">Bizi Takip Edin</p>
          <Socials containerStyles="text-pink-600 text-lg flex gap-4 justify-center" />
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 font-elegant">© 2024 Şahika Beauty. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav
