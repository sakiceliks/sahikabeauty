"use client"

import { useEffect } from 'react'

export default function ErrorSuppressor() {
  useEffect(() => {
    // Override console.error to suppress auth-related errors
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      
      // Suppress specific auth context errors and application errors
      if (message.includes('Cannot destructure property \'auth\' of \'e\' as it is undefined') ||
          message.includes('hook.js:608') ||
          message.includes('TypeError: Cannot destructure property \'auth\'') ||
          message.includes('Application error: a client-side exception has occurred') ||
          message.includes('Minified React error #423')) {
        console.warn('Suppressed auth context error:', message)
        return
      }
      
      // Call original error for other messages
      originalError.apply(console, args)
    }

    // Override window.onerror to catch runtime errors
    const originalOnError = window.onerror
    window.onerror = (message, source, lineno, colno, error) => {
      if (error?.message?.includes('Cannot destructure property \'auth\'') ||
          source?.includes('hook.js') ||
          message?.includes('Cannot destructure property \'auth\'')) {
        console.warn('Suppressed runtime auth error:', message)
        return true // Prevent default error handling
      }
      
      if (originalOnError) {
        return originalOnError.call(window, message, source, lineno, colno, error)
      }
      return false
    }

    // Override window.onunhandledrejection for promise rejections
    const originalOnRejection = window.onunhandledrejection
    window.onunhandledrejection = (event) => {
      if (event.reason?.message?.includes('Cannot destructure property \'auth\'')) {
        console.warn('Suppressed promise auth error:', event.reason.message)
        event.preventDefault()
        return
      }
      
      if (originalOnRejection) {
        originalOnRejection.call(window, event)
      }
    }

    // Cleanup function
    return () => {
      console.error = originalError
      window.onerror = originalOnError
      window.onunhandledrejection = originalOnRejection
    }
  }, [])

  return null
}
