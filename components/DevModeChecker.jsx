"use client"

import { useEffect } from 'react'

export default function DevModeChecker() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Development mode: Checking for hydration issues...')
      
      // Check for hydration mismatches
      const checkHydration = () => {
        const elements = document.querySelectorAll('[data-hydration-check]')
        elements.forEach(el => {
          const serverContent = el.getAttribute('data-server-content')
          const clientContent = el.textContent
          if (serverContent !== clientContent) {
            console.warn('🚨 Hydration mismatch detected:', {
              element: el,
              server: serverContent,
              client: clientContent
            })
          }
        })
      }
      
      // Run check after initial render
      setTimeout(checkHydration, 1000)
      
      // Monitor for auth context errors
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
