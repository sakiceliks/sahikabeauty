"use client"

import { useState } from "react"
import { authService } from "@/lib/auth"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Shield, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react"
import Image from "next/image"

export default function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = "Kullanıcı adı gereklidir"
    }
    
    if (!formData.password) {
      newErrors.password = "Şifre gereklidir"
    } else if (formData.password.length < 3) {
      newErrors.password = "Şifre en az 3 karakter olmalıdır"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)

    try {
      const result = await authService.login(formData.username, formData.password)

      if (result.success) {
        toast.success("Giriş başarılı! Yönlendiriliyorsunuz...", {
          icon: "✅",
          duration: 2000,
        })
        // Small delay for better UX
        setTimeout(() => {
          onLoginSuccess(result.user)
        }, 500)
      } else {
        toast.error(result.error || "Geçersiz kullanıcı adı veya şifre", {
          icon: "❌",
        })
        setErrors({ 
          username: "Geçersiz kullanıcı adı veya şifre",
          password: "Geçersiz kullanıcı adı veya şifre"
        })
      }
    } catch (error) {
      toast.error("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.", {
        icon: "⚠️",
      })
      setErrors({ 
        general: "Bir hata oluştu. Lütfen tekrar deneyin."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-accent p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative z-10"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Paneli</h1>
              <p className="text-white/90 text-sm">Şahika Beauty Yönetim Sistemi</p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-input border-2 ${
                      errors.username 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    } rounded-xl px-4 py-3.5 pl-11 text-card-foreground 
                    focus:outline-none focus:ring-2 focus:ring-primary/20 
                    transition-all duration-200 placeholder:text-muted-foreground/50`}
                    placeholder="Kullanıcı adınızı girin"
                    disabled={loading}
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  {formData.username && !errors.username && (
                    <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.username}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-input border-2 ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    } rounded-xl px-4 py-3.5 pl-11 pr-11 text-card-foreground 
                    focus:outline-none focus:ring-2 focus:ring-primary/20 
                    transition-all duration-200 placeholder:text-muted-foreground/50`}
                    placeholder="Şifrenizi girin"
                    disabled={loading}
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {formData.password && !errors.password && (
                    <CheckCircle2 className="absolute right-11 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-accent 
                  text-primary-foreground font-semibold py-4 px-6 rounded-xl 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-xl flex items-center justify-center gap-2
                  group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Giriş yapılıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Giriş Yap</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 pt-6 border-t border-border/50"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Güvenli Admin Girişi</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Şahika Beauty. Tüm hakları saklıdır.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
