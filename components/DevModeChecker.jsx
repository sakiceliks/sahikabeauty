"use client"

import { useEffect } from 'react'

export default function DevModeChecker() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Development mode: Error monitoring active')
      
      // Monitor for auth context errors in development
      const originalError = console.error
      console.error = function(...args) {
        const message = args.join(' ')
        if (message.includes('Cannot destructure property \'auth\'')) {
          console.error('🚨 AUTH CONTEXT ERROR DETECTED:', message)
          console.error('Stack trace:', new Error().stack)
        }
        originalError.apply(console, args)
      }
    }
  }, [])

  return null
}
