"use client"
import { useContext, useState } from "react"
import { CursorContext } from "./CursorContext"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

import { AiOutlineMenu } from "react-icons/ai"

// components
import MobileNav from "./MobileNav"
import Nav from "./Nav"
import Socials from "./Socials"
import { FaPhoneAlt } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

const Header = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)
  const [mobileNav, setMobileNav] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setMobileNav(!mobileNav)
    }
  }

  return (
    <header className="pb-6 xl:pb-[50px] static z-40 w-full bg-accent-100 xl:bg-transparent">
      <div className="bg-[#EAEAE8] mb-6 xl:mb-[50px] xl:h-[50px] py-4 xl:py-0">
        <div className="container mx-auto h-full">

        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* logo */}
        <motion.div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
          <Link href="/" aria-label="Sahika Beauty anasayfaya git">
            <Image src="/assets/logo.svg" width={120} height={44} priority alt="Sahika Beauty Logo" />
          </Link>
        </motion.div>
        <button
          className="xl:hidden cursor-pointer bg-transparent border-none p-2"
          onClick={() => setMobileNav(!mobileNav)}
          onKeyDown={handleKeyDown}
          aria-label={mobileNav ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileNav}
          aria-controls="mobile-navigation"
          aria-haspopup="true"
        >
          <AiOutlineMenu className="text-3xl text-primary" aria-hidden="true" />
        </button>
        {/* mobile nav */}
        <motion.div
          initial={{ right: "-100%" }}
          animate={{ right: mobileNav ? 0 : "-100%" }}
          className="fixed bg-primary top-0 bottom-0 right-0 w-[300px] xl:hidden z-50"
          id="mobile-navigation"
        >
          <MobileNav setMobileNav={setMobileNav} />
        </motion.div>
        {/* desktop nav */}
        <motion.div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className="hidden xl:block">
          <Nav />
        </motion.div>
      </div>
    </header>
  )
}

export default Header
