"use client"
import { IoCloseOutline } from "react-icons/io5"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Socials from "./Socials"
import { useEffect } from "react"

const links = [
  {
    href: "/",
    name: "Anasayfa",
    icon: "🏠",
  },
  {
    href: "/hakkimizda",
    name: "Hakkımızda",
    icon: "👥",
  },
  {
    href: "/hizmetler",
    name: "Hizmetler",
    icon: "✨",
  },
  {
    href: "/blog",
    name: "Blog",
    icon: "📝",
  },
  {
    href: "/iletisim",
    name: "İletişim",
    icon: "📞",
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
    <nav className="relative flex flex-col h-full" role="navigation" aria-label="Mobil navigasyon">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Ş</span>
          </div>
          <span className="font-elegant text-lg font-semibold text-slate-800">Şahika Beauty</span>
        </div>
        <button
          className="cursor-pointer text-slate-600 hover:text-slate-800 bg-transparent border-none p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
          onClick={() => setMobileNav(false)}
          onKeyDown={handleKeyDown}
          aria-label="Menüyü kapat"
        >
          <IoCloseOutline className="text-2xl" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-6 py-8">
        <ul className="flex flex-col gap-2" role="list">
          {links.map((link, index) => {
            return (
              <li key={index} role="listitem">
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href 
                      ? "bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border-l-4 border-pink-400" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  } flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium`}
                  onClick={() => setMobileNav(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  title={`${link.name} sayfasına git`}
                >
                  <span className="text-2xl" aria-hidden="true">{link.icon}</span>
                  <span className="text-lg">{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer with social links */}
      <div className="border-t border-slate-200 p-6">
        <div className="text-center mb-4">
          <p className="text-slate-600 text-sm font-medium">Bizi Takip Edin</p>
        </div>
        <Socials containerStyles="text-slate-600 text-lg flex gap-6 justify-center" />
      </div>
    </nav>
  )
}

export default MobileNav
