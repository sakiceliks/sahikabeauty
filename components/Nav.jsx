import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <Link
              href={link.href}
              key={index}
              className={`${
                pathname === link.href && "border-b-2 text-title border-accent"
              } uppercase text-black font-bold flex items-center gap-2 hover:text-accent transition-colors duration-300`}
              title={`${link.name} sayfasına git`}
            >
              <span className="text-lg" aria-hidden="true">{link.icon}</span>
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
