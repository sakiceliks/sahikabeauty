"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MENU_ITEMS = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect to toggle background style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open and prevent layout jump
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = '0px'
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.paddingRight = '0px'
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Determine styles based on scroll state
  const navBgClass = isScrolled 
    ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100' 
    : 'bg-transparent py-6'
  
  const textColorClass = isScrolled ? 'text-slate-800' : 'text-white'

  // If scrolled, use normal logo. If transparent (top), use white logo.
  const logoClass = isScrolled ? '' : 'brightness-0 invert' 

  const hamburgerColor = isMobileMenuOpen ? 'bg-slate-800' : (isScrolled ? 'bg-slate-800' : 'bg-white')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex-shrink-0 relative z-50">
          <Link href="/" className="block group">
            <img 
              src="https://sultanbeyliguzellikmerkezi.com.tr/assets/wb-2.png" 
              alt="Şahika Beauty" 
              className={`h-10 md:h-14 w-auto transition-all duration-500 group-hover:scale-105 object-contain ${logoClass}`} 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${pathname === item.href ? 'text-blue-600' : textColorClass} hover:text-blue-600 font-marcellus text-lg tracking-wide transition-colors duration-300 relative group`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-blue-600 transition-all duration-300 ${
                pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          
          <Link 
            href="/rezervasyon"
            className="ml-6 px-8 py-3 bg-blue-600 text-white font-marcellus text-sm font-bold tracking-widest uppercase hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 rounded-full shadow-md"
          >
            Randevu Al
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`w-full h-0.5 origin-center transition-all duration-300 ${hamburgerColor}`}
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              className={`w-4 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'bg-slate-800' : 'bg-blue-600'}`}
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`w-full h-0.5 origin-center transition-all duration-300 ${hamburgerColor}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col"
          >
            {/* Header placeholder to push content down */}
            <div className="h-24"></div>

            <div className="flex-1 flex flex-col items-start px-8 space-y-6 relative z-10 w-full overflow-y-auto">
              {MENU_ITEMS.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-marcellus transition-colors block w-full py-2 border-b border-gray-100 ${
                    pathname === item.href ? 'text-blue-600 font-bold' : 'text-slate-800 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  window.location.href = '/rezervasyon'
                }}
                className="w-full mt-4 px-10 py-4 bg-blue-600 text-white font-marcellus text-lg hover:bg-blue-700 transition-all duration-300 rounded-xl shadow-lg shadow-blue-200"
              >
                📅 Randevu Al
              </motion.button>

               {/* Social Media Footer inside Menu */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-8 flex flex-col gap-4 w-full"
              >
                <p className="text-slate-400 font-marcellus text-sm tracking-widest text-center">Bizi Takip Edin</p>
                <div className="flex justify-center space-x-6">
                  {['Youtube', 'Facebook', 'Twitter', 'Instagram'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
                    >
                      {/* Icons */}
                      {social === 'Instagram' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-3.77 1.795c-.95.043-1.46.25-1.813.388a2.95 2.95 0 00-1.09.713 2.95 2.95 0 00-.713 1.093c-.138.353-.346.862-.389 1.814-.042.936-.052 1.22-.052 3.864s.01 2.928.052 3.864c.043.952.25 1.461.389 1.814.192.492.46.905.813 1.259.354.353.767.62 1.259.813.353.138.862.346 1.814.389.936.042 1.22.052 3.864.052s2.928-.01 3.864-.052c.951-.043 1.46-.25 1.814-.389a2.95 2.95 0 001.092-.713 2.95 2.95 0 00.713-1.092c.138-.353.346-.862.389-1.814.042-.936.052-1.22.052-3.864s-.01-2.928-.052-3.864c-.043-.952-.25-1.461-.389-1.814a2.95 2.95 0 00-.813-1.259 2.95 2.95 0 00-1.259-.813c-.353-.138-.862-.346-1.814-.389-.936-.042-1.22-.052-3.864-.052s-2.928.01-3.864.052h.001zm6.927 4.396a1.082 1.082 0 100 2.164 1.082 1.082 0 000-2.164zM12.307 7.07c-2.754 0-5 2.246-5 5s2.246 5 5 5 5-2.246 5-5-2.246-5-5-5zm0 8.122a3.122 3.122 0 110-6.244 3.122 3.122 0 010 6.244z" clipRule="evenodd" /></svg>
                      )}
                      {social === 'Facebook' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      )}
                      {social === 'Twitter' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      )}
                      {social === 'Youtube' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      )}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
