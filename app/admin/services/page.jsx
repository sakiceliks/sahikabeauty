"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ServicesPage() {
  useEffect(() => {
    // Redirect to main admin page since services are managed there
    redirect("/admin")
  }, [])

  return null
}
