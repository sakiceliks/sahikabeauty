"use client"
import { IoCloseOutline } from "react-icons/io5"
import Link from "next/link"
import Image from "next/image"
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
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Şahika Beauty anasayfaya git" className="block">
            <Image 
              src="/assets/wb-2.png" 
              width={200} 
              height={60} 
              sizes="(max-width: 640px) 120px, 150px"
              className="h-8 w-auto object-contain"
              priority 
              alt="Şahika Beauty Logo"
              quality={100}
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>
        </div>
        <button
          className="cursor-pointer text-gray-600 hover:text-gray-800 bg-transparent border-none p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setMobileNav(false)}
          onKeyDown={handleKeyDown}
          aria-label="Menüyü kapat"
        >
          <IoCloseOutline className="text-2xl" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-6 py-8">
        <ul className="flex flex-col gap-3" role="list">
          {links.map((link, index) => {
            return (
              <li key={index} role="listitem">
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href 
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-l-4 border-blue-500" 
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                  } flex items-center px-4 py-4 rounded-lg transition-all duration-200 font-medium text-lg`}
                  onClick={() => setMobileNav(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  title={`${link.name} sayfasına git`}
                >
                  <span>{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        
        {/* Randevu Al Butonu */}
        <div className="mt-8">
          <Link
            href="/rezervasyon"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-full font-semibold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg w-full text-center block"
            onClick={() => setMobileNav(false)}
          >
            📅 Randevu Al
          </Link>
        </div>
      </div>

      {/* Footer with social links */}
      <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-center mb-4">
          <p className="text-blue-600 text-sm font-medium">Bizi Takip Edin</p>
        </div>
        <Socials containerStyles="text-blue-600 text-xl flex gap-6 justify-center" />
      </div>
    </nav>
  )
}

export default MobileNav
