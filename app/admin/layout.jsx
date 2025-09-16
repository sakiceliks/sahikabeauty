"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/auth"
import LoginForm from "@/components/Auth/LoginForm"
import Sidebar from "@/components/admin/Sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const userData = authService.getCurrentUser()

      setIsAuthenticated(authenticated)
      setUser(userData)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
      <Toaster />
    </div>
  )
}
