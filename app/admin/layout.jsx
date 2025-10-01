"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/auth"
import LoginForm from "../../components/Auth/LoginForm.jsx"

import AdminHeader from "../../components/Admin/AdminHeader.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as HotToaster } from "react-hot-toast"
import { useNotifications } from "@/hooks/useNotifications"
import { Sidebar } from "./Sidebar.jsx"

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Bildirim sistemi - sadece admin oturumu açıkken aktif
  const { notifications, isConnected } = useNotifications()

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-700 text-xl">Yükleniyor...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={handleLogout} 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header */}
        <AdminHeader 
          user={user} 
          onLogout={handleLogout}
          onMenuToggle={toggleSidebar}
          isMenuOpen={sidebarOpen}
          notifications={notifications}
          isConnected={isConnected}
        />
        
        {/* Page Content */}
        <main className="flex-1 w-full overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      
      <Toaster />
      <HotToaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}