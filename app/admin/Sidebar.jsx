"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  MessageSquare, 
  Image, 
  ClipboardList, 
  Bot,
  BarChart3,
  Users,
  Calendar,
  Star,
  Menu,
  X,
  FileText as LogsIcon
} from "lucide-react"

const menuItems = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    href: "/admin", 
    icon: LayoutDashboard,
    description: "Genel bakış ve istatistikler"
  },
  { 
    id: "services", 
    label: "Hizmetler", 
    href: "/admin/services", 
    icon: Settings,
    description: "Hizmet yönetimi"
  },
  { 
    id: "blog", 
    label: "Blog", 
    href: "/admin/blog", 
    icon: FileText,
    description: "Blog yazıları"
  },
  { 
    id: "testimonials", 
    label: "Müşteri Yorumları", 
    href: "/admin/testimonials", 
    icon: Star,
    description: "Müşteri geri bildirimleri"
  },
  { 
    id: "carousel", 
    label: "Ana Sayfa Carousel", 
    href: "/admin/carousel", 
    icon: Image,
    description: "Ana sayfa slider"
  },
  { 
    id: "talepler", 
    label: "Talep Yönetimi", 
    href: "/admin/talepler", 
    icon: ClipboardList,
    description: "Rezervasyon ve talepler"
  },
  { 
    id: "telegram", 
    label: "Telegram Ayarları", 
    href: "/admin/telegram", 
    icon: Bot,
    description: "Bot konfigürasyonu"
  },
  { 
    id: "logs", 
    label: "Sistem Logları", 
    href: "/admin/logs", 
    icon: LogsIcon,
    description: "İşlem kayıtları"
  },
]

export default function Sidebar({ user, onLogout, isOpen, onToggle }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 z-40 shadow-lg lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <p className="text-sm text-white/80">Şahika Beauty</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
              const IconComponent = item.icon

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => onToggle()}
                  >
                    <IconComponent className={`h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-500 group-hover:text-gray-700"}`} />
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
