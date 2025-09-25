"use client"

import React from 'react'

class BlogErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Suppress auth context errors specifically
    if (error.message && (
      error.message.includes('auth') || 
      error.message.includes('Cannot destructure') ||
      error.message.includes('hook.js')
    )) {
      console.warn('Blog auth context error suppressed:', error.message)
      // Reset error state to continue rendering
      this.setState({ hasError: false, error: null })
      return
    }

    console.error('Blog ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // For auth errors, render children normally
      if (this.state.error?.message?.includes('auth') || 
          this.state.error?.message?.includes('Cannot destructure')) {
        return this.props.children
      }

      // For other errors, show fallback
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Blog içeriği yüklenirken bir hata oluştu
            </h2>
            <p className="text-gray-600 mb-4">
              Lütfen sayfayı yenileyin veya ana sayfaya dönün.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mr-4"
            >
              Sayfayı Yenile
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Ana Sayfa
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default BlogErrorBoundary
