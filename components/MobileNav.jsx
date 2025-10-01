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
  },
  {
    href: "/hakkimizda",
    name: "Hakkımızda",
  },
  {
    href: "/hizmetler",
    name: "Hizmetler",
  },
  {
    href: "/blog",
    name: "Blog",
  },
  {
    href: "/iletisim",
    name: "İletişim",
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
      <div className="flex items-center justify-between p-6 border-b border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Ş</span>
          </div>
          <span className="font-thin text-lg text-heading-primary">Şahika Beauty</span>
        </div>
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-800 bg-transparent border-none p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
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
                      ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-l-4 border-green-500" 
                      : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                  } flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-thin`}
                  onClick={() => setMobileNav(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  title={`${link.name} sayfasına git`}
                >
                  <span className="text-lg">{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer with social links */}
      <div className="border-t border-green-200 p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="text-center mb-4">
          <p className="text-green-600 text-sm font-thin">Bizi Takip Edin</p>
        </div>
        <Socials containerStyles="text-green-600 text-lg flex gap-6 justify-center" />
      </div>
    </nav>
  )
}

export default MobileNav
