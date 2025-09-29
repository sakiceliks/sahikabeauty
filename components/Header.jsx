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

      <header className="pb-4 sm:pb-6 xl:pb-0 relative z-50 w-full bg-accent-100 xl:bg-transparent">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4 xl:py-6 xl:min-h-[100px]">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center h-full"
          >
            <Link href="/" aria-label="Sahika Beauty anasayfaya git">
              <Image 
                src="/assets/logo.svg" 
                width={400} 
                height={152} 
                sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
                className="w-40 h-auto sm:w-[200px] xl:w-[240px]"
                priority 
                alt="Sahika Beauty Logo"
                quality={100}
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="xl:hidden cursor-pointer bg-transparent border-none p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
            onClick={handleMenuToggle}
            onKeyDown={handleKeyDown}
            aria-label={mobileNav ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileNav}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
          >
            {mobileNav ? (
              <AiOutlineClose className="text-2xl sm:text-3xl text-primary" aria-hidden="true" />
            ) : (
              <AiOutlineMenu className="text-2xl sm:text-3xl text-primary" aria-hidden="true" />
            )}
          </button>

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
            className="hidden xl:flex items-center justify-center h-full"
          >
            <Nav />
          </motion.div>
        </div>
      </header>
    </>
  )
}

export default Header