"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 xl:space-x-6">
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
                pathname === link.href 
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold" 
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              } text-sm xl:text-base font-medium tracking-wide px-2 xl:px-3 py-2 transition-all duration-300 border-b-2 border-transparent hover:bg-gray-50 rounded-md`}
              title={`${link.name} sayfasına git`}
            >
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
        className="ml-2 xl:ml-4"
      >
        <Link
          href="/rezervasyon"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 xl:px-5 py-2 xl:py-2.5 rounded-full font-semibold text-sm xl:text-base tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
        >
          📅 Randevu Al
        </Link>
      </motion.div>
    </nav>
  );
};

export default Nav;
