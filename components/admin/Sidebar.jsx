"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { authService } from "@/lib/auth"
import { useToast } from "../ui/use-toast"

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    id: "services",
    label: "Hizmetler",
    href: "/admin/services",
    icon: "🛠️",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/admin/blog",
    icon: "📝",
  },
  {
    id: "testimonials",
    label: "Müşteri Yorumları",
    href: "/admin/testimonials",
    icon: "💬",
  },
  {
    id: "carousel",
    label: "Ana Sayfa Carousel",
    href: "/admin/carousel",
    icon: "🎠",
  },
]

export default function Sidebar({ user, onLogout }) {
  const pathname = usePathname()
  const { toast } = useToast()

  const handleLogout = () => {
    authService.logout()
    toast({
      title: "Başarılı",
      description: "Çıkış yapıldı.",
    })
    onLogout()
  }

  return (
    <div className="bg-sidebar border-r border-sidebar-border h-screen w-64 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">Hoş geldin, {user?.username}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-sidebar-accent-foreground">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">{user?.username}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive transition-colors"
            title="Çıkış Yap"
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  )
}
