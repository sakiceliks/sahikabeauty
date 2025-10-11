"use client"
import { useState, useEffect } from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"

// components
import MobileNav from "./MobileNav"
import Nav from "./Nav"
import Socials from "./Socials"
import { Mail, Phone } from "lucide-react"


const Header = () => {
  const [mobileNav, setMobileNav] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function to reset scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileNav])

  // Close mobile nav on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && mobileNav) {
        setMobileNav(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileNav])

  // Close mobile nav on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileNav) {
        setMobileNav(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileNav])

  const handleMenuToggle = () => {
    setMobileNav(!mobileNav)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleMenuToggle()
    }
  }

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      {mobileNav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      <header className="relative z-50 w-full bg-accent-100 xl:bg-transparent">
        <div className="w-full flex items-center justify-between px-4 sm:px-6 xl:px-8 py-3 xl:py-4">
          {/* Logo - Tam solda */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" aria-label="Şahika Beauty anasayfaya git" className="block">
              <Image 
                src="/assets/wb-2.png" 
                width={500} 
                height={150} 
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1280px) 280px, 320px"
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-18 object-contain transition-transform duration-300 hover:scale-105"
                priority 
                alt="Şahika Beauty Logo"
                quality={100}
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            className="xl:hidden cursor-pointer bg-transparent border-none p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={handleMenuToggle}
            onKeyDown={handleKeyDown}
            aria-label={mobileNav ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileNav}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileNav ? (
              <AiOutlineClose className="text-xl sm:text-2xl text-gray-700" aria-hidden="true" />
            ) : (
              <AiOutlineMenu className="text-xl sm:text-2xl text-gray-700" aria-hidden="true" />
            )}
          </motion.button>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: mobileNav ? 0 : "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 right-0 w-[320px] sm:w-[380px] xl:hidden z-50 shadow-2xl rounded-l-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
            id="mobile-navigation"
            style={{ display: mobileNav ? "block" : "none" }}
          >
            <MobileNav setMobileNav={setMobileNav} />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden xl:flex items-center justify-end flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Nav />
          </motion.div>
        </div>
      </header>
    </>
  )
}

export default Header