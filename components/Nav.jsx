"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <div className="container mx-auto flex gap-8 items-center">
        {links.map((link, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={link.href}
                className={`${
                  pathname === link.href && "border-b-2 text-title border-accent"
                } uppercase text-black font-bold flex items-center gap-2 hover:text-accent transition-colors duration-300`}
                title={`${link.name} sayfasına git`}
              >
                <motion.span 
                  className="text-lg" 
                  aria-hidden="true"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.icon}
                </motion.span>
                {link.name}
              </Link>
            </motion.div>
          );
        })}
        
        {/* Randevu Al Butonu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/rezervasyon"
            className="bg-primary hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-bold text-sm uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-lg ml-auto"
          >
            📅 Randevu Al
          </Link>
        </motion.div>
      </div>
    </nav>
  );
};

export default Nav;
