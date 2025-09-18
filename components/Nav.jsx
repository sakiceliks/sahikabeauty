import Link from "next/link";
import { useContext } from "react";
import { CursorContext } from "./CursorContext";
import { usePathname } from "next/navigation";

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
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <div className="container mx-auto flex gap-8 items-center">
        {links.map((link, index) => {
          return (
            <Link
              href={link.href}
              key={index}
              className={`${
                pathname === link.href && "border-b-2 text-title border-accent"
              } uppercase text-black font-bold`}
            >
              {link.name}
            </Link>
          );
        })}
        
        {/* Randevu Al Butonu */}
        <Link
          href="/rezervasyon"
          className="bg-primary hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-bold text-sm uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-lg ml-auto"
        >
          📅 Randevu Al
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
