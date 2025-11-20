"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/auth"
import LoginForm from "../../components/Auth/LoginForm.jsx"

import AdminHeader from "../../components/Admin/AdminHeader.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as HotToaster } from "react-hot-toast"
import Sidebar from "./Sidebar.jsx"

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  

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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full"></div>
            </div>
          </div>
          <div className="text-foreground text-lg font-medium">Yükleniyor...</div>
          <div className="text-muted-foreground text-sm mt-2">Lütfen bekleyin</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
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
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={handleLogout} 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full min-w-0 lg:ml-96">
        {/* Header */}
        <AdminHeader 
          user={user} 
          onLogout={handleLogout}
          onMenuToggle={toggleSidebar}
          isMenuOpen={sidebarOpen}
        />
        
        {/* Page Content */}
        <main className="flex-1 w-full overflow-y-auto bg-gray-50 min-h-0">
          <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
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