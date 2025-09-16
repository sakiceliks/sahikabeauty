"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/auth"
import LoginForm from "@/components/Auth/LoginForm"

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const userData = authService.getCurrentUser()

      setIsAuthenticated(authenticated)
      setUser(userData)
      setLoading(false)
    }

    checkAuth()

    // Check auth status periodically
    const interval = setInterval(checkAuth, 60000) // Check every minute

    return () => clearInterval(interval)
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
    return <LoginForm onLoginSuccess={handleLoginSuccess} />
  }

  return children({ user, onLogout: handleLogout })
}
