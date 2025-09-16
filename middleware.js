import { NextResponse } from "next/server"

export function middleware(request) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the auth token from cookies or headers
    const authToken = request.cookies.get("admin_auth_token")?.value

    // If no token is found, redirect to login
    if (!authToken) {
      // Allow the admin layout to handle authentication
      return NextResponse.next()
    }

    // Validate token (basic validation)
    try {
      const tokenData = JSON.parse(atob(authToken))
      const isValid = Date.now() - tokenData.timestamp < 24 * 60 * 60 * 1000 // 24 hours

      if (!isValid) {
        // Token expired, clear it and let layout handle auth
        const response = NextResponse.next()
        response.cookies.delete("admin_auth_token")
        response.cookies.delete("admin_user_data")
        return response
      }
    } catch (error) {
      // Invalid token, clear it and let layout handle auth
      const response = NextResponse.next()
      response.cookies.delete("admin_auth_token")
      response.cookies.delete("admin_user_data")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
