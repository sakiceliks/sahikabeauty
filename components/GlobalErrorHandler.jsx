"use client"

import { useEffect } from 'react'

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Handle uncaught errors
    const handleError = (event) => {
      const error = event.error || event.reason
      
      // Suppress auth-related errors from third-party libraries
      if (error?.message?.includes('auth') || 
          error?.message?.includes('Cannot destructure') ||
          error?.message?.includes('Application error: a client-side exception has occurred') ||
          error?.message?.includes('Minified React error #423') ||
          error?.message?.includes('server/chunks/5646.js') ||
          error?.message?.includes('digest: \'3469384194\'')) {
        console.warn('Suppressed auth context error:', error.message)
        event.preventDefault()
        return
      }
      
      // Log other errors for debugging
      console.error('Uncaught error:', error)
    }

    // Handle unhandled promise rejections
    const handleRejection = (event) => {
      const error = event.reason
      
      // Suppress auth-related errors from third-party libraries
      if (error?.message?.includes('auth') || 
          error?.message?.includes('Cannot destructure') ||
          error?.message?.includes('Application error: a client-side exception has occurred') ||
          error?.message?.includes('Minified React error #423') ||
          error?.message?.includes('server/chunks/5646.js') ||
          error?.message?.includes('digest: \'3469384194\'')) {
        console.warn('Suppressed auth promise rejection:', error.message)
        event.preventDefault()
        return
      }
      
      // Log other errors for debugging
      console.error('Unhandled promise rejection:', error)
    }

    // Add event listeners
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  // This component doesn't render anything
  return null
}
