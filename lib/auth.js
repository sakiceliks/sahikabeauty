// Authentication utilities using localStorage
export const AUTH_KEY = "admin_auth_token"
export const USER_KEY = "admin_user_data"

// Mock user data - in production this would come from a database
const ADMIN_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123", // In production, this would be hashed
    email: "admin@example.com",
    role: "admin",
  },
]

export const authService = {
  // Login function
  login: async (username, password) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = ADMIN_USERS.find((u) => u.username === username && u.password === password)

    if (user) {
      const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }))
      const userData = { ...user }
      delete userData.password // Don't store password in localStorage

      localStorage.setItem(AUTH_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))

      if (typeof document !== "undefined") {
        document.cookie = `admin_auth_token=${token}; path=/; max-age=${24 * 60 * 60}`
        document.cookie = `admin_user_data=${JSON.stringify(userData)}; path=/; max-age=${24 * 60 * 60}`
      }

      return { success: true, user: userData, token }
    }

    return { success: false, error: "Geçersiz kullanıcı adı veya şifre" }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)

    if (typeof document !== "undefined") {
      document.cookie = "admin_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "admin_user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    if (typeof window === "undefined") return false

    const token = localStorage.getItem(AUTH_KEY)
    const userData = localStorage.getItem(USER_KEY)

    if (!token || !userData) return false

    try {
      const tokenData = JSON.parse(atob(token))
      // Check if token is less than 24 hours old
      const isValid = Date.now() - tokenData.timestamp < 24 * 60 * 60 * 1000
      return isValid
    } catch {
      return false
    }
  },

  // Get current user data
  getCurrentUser: () => {
    if (typeof window === "undefined") return null

    const userData = localStorage.getItem(USER_KEY)
    if (!userData) return null

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  },

  // Get auth token
  getToken: () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(AUTH_KEY)
  },
}
