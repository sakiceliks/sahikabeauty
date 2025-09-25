"use client"

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Don't log auth context errors as they're expected
    if (error.message && error.message.includes('auth')) {
      console.warn('Auth context error caught and handled:', error.message)
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if it's an auth-related error
      if (this.state.error?.message?.includes('auth') || 
          this.state.error?.message?.includes('Cannot destructure')) {
        // For auth errors, just render children without error UI
        // This prevents the app from breaking due to third-party library context issues
        return this.props.children
      }

      // For other errors, show fallback UI
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Bir şeyler ters gitti
            </h2>
            <p className="text-gray-600 mb-4">
              Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
