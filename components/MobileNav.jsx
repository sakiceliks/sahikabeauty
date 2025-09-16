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
    <nav className="relative flex flex-col justify-between h-full p-8" role="navigation" aria-label="Mobil navigasyon">
      <button
        className="cursor-pointer text-accent bg-transparent border-none p-2 self-start"
        onClick={() => setMobileNav(false)}
        onKeyDown={handleKeyDown}
        aria-label="Menüyü kapat"
      >
        <IoCloseOutline className="text-4xl" aria-hidden="true" />
      </button>
      <ul className="flex flex-col gap-10 text-white text-xl" role="list">
        {links.map((link, index) => {
          return (
            <li key={index} role="listitem">
              <Link
                href={link.href}
                className={`${
                  pathname === link.href && "border-b-2 border-accent"
                } uppercase max-w-max mx-auto block text-center hover:text-accent transition`}
                onClick={() => setMobileNav(false)}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Socials containerStyles="text-white text-lg flex gap-6 justify-center" />
    </nav>
  )
}

export default MobileNav
