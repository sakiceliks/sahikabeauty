"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import FloatingContactButtons from "@/components/FloatingContactButtons"

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  
  // Admin path'lerinde header ve floating button'ları gizle
  const isAdminPath = pathname.startsWith('/admin')
  
  if (isAdminPath) {
    // Admin sayfalarında sadece children'ı render et (header ve floating button yok)
    return <>{children}</>
  }
  
  // Normal sayfalarda header, children ve floating button'ları render et
  return (
    <>
      <Header />
      {children}
      <FloatingContactButtons />
    </>
  )
}
