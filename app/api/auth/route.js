import { NextResponse } from "next/server"

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

// POST - Login endpoint
export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Find user
    const user = ADMIN_USERS.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Geçersiz kullanıcı adı veya şifre",
        },
        { status: 401 },
      )
    }

    // Create token
    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }))
    const userData = { ...user }
    delete userData.password // Don't send password back

    // Create response with cookies
    const response = NextResponse.json({
      success: true,
      user: userData,
      token,
    })

    // Set HTTP-only cookies for security
    response.cookies.set("admin_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    response.cookies.set("admin_user_data", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Sunucu hatası",
      },
      { status: 500 },
    )
  }
}

// DELETE - Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Çıkış yapıldı",
  })

  // Clear cookies
  response.cookies.delete("admin_auth_token")
  response.cookies.delete("admin_user_data")

  return response
}
