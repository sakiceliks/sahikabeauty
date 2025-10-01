"use client"

import React, { useState } from "react"
import { Menu, X, Search, Settings, LogOut, User } from "lucide-react"
import { authService } from "@/lib/auth"
import toast from "react-hot-toast"

export default function AdminHeader({ user, onLogout, onMenuToggle, isMenuOpen }) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    authService.logout()
    toast.success("Çıkış yapıldı.")
    onLogout()
  }

  return (
    <header className="bg-white border-b-2 border-gray-300 shadow-lg px-4 py-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-40 w-full min-h-[80px]">
      <div className="flex items-center justify-between w-full h-full">
        {/* Left side - Menu button and title */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
          <button
            onClick={onMenuToggle}
            className="p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors lg:hidden border-2 border-gray-300 hover:border-gray-400 flex-shrink-0"
            aria-label="Menüyü aç/kapat"
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
          
          <div className="block min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium truncate">Hoş geldin, {user?.username}</p>
          </div>
        </div>

  

        {/* Right side - User menu */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

          {/* Settings */}
          <button 
            className="p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-300 hover:border-gray-400 flex-shrink-0"
            aria-label="Ayarlar"
          >
            <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>

          {/* User menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-300 hover:border-gray-400"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{user?.username}</p>
                <p className="text-xs sm:text-sm text-gray-600">Admin</p>
              </div>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border-2 border-gray-200 py-3 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-base font-semibold text-gray-900">{user?.username}</p>
                  <p className="text-sm text-gray-600">admin@sahikabeauty.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


    </header>
  )
}
