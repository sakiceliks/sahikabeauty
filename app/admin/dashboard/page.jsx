"use client"

import { useState, useEffect } from "react"
import { DashboardCardSkeleton } from "@/components/Skeletons"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalBlogs: 0,
    publishedServices: 0,
    publishedBlogs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch services stats
        const servicesResponse = await fetch("/api/services")
        const servicesData = await servicesResponse.json()

        // Fetch blog stats
        const blogResponse = await fetch("/api/blog")
        const blogData = await blogResponse.json()

        if (servicesData.success && blogData.success) {
          const services = servicesData.data || []
          const blogs = blogData.data || []

          setStats({
            totalServices: services.length,
            totalBlogs: blogs.length,
            publishedServices: services.filter((s) => s.published).length,
            publishedBlogs: blogs.filter((b) => b.published !== false).length,
          })
        }
      } catch (error) {
        console.error("Stats yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 bg-muted rounded w-32 mb-2" />
          <div className="h-4 bg-muted rounded w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <DashboardCardSkeleton key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card animate-pulse">
            <div className="h-6 bg-muted rounded w-32 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="p-3 bg-muted/20 rounded-lg">
                  <div className="h-4 bg-muted rounded w-40 mb-2" />
                  <div className="h-3 bg-muted rounded w-20" />
                </div>
              ))}
            </div>
          </div>
          <div className="card animate-pulse">
            <div className="h-6 bg-muted rounded w-32 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="p-3 bg-muted/20 rounded-lg">
                  <div className="h-4 bg-muted rounded w-40 mb-2" />
                  <div className="h-3 bg-muted rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="h2 text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Admin paneline hoş geldiniz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Hizmet</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.totalServices}</p>
            </div>
            <div className="text-2xl">🛠️</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Yayınlanan Hizmet</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.publishedServices}</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Blog</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.totalBlogs}</p>
            </div>
            <div className="text-2xl">📝</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Yayınlanan Blog</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.publishedBlogs}</p>
            </div>
            <div className="text-2xl">📰</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Hızlı Eylemler</h3>
          <div className="space-y-3">
            <a href="/admin" className="block p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg">🛠️</span>
                <div>
                  <p className="font-medium text-card-foreground">Hizmet Yönetimi</p>
                  <p className="text-sm text-muted-foreground">Hizmetleri görüntüle ve düzenle</p>
                </div>
              </div>
            </a>
            <a href="/admin/blog" className="block p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg">📝</span>
                <div>
                  <p className="font-medium text-card-foreground">Blog Yönetimi</p>
                  <p className="text-sm text-muted-foreground">Blog yazılarını görüntüle ve düzenle</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Son Aktiviteler</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
              <span className="text-lg">👤</span>
              <div>
                <p className="text-sm font-medium text-card-foreground">Admin girişi yapıldı</p>
                <p className="text-xs text-muted-foreground">Az önce</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
              <span className="text-lg">📊</span>
              <div>
                <p className="text-sm font-medium text-card-foreground">Dashboard görüntülendi</p>
                <p className="text-xs text-muted-foreground">Az önce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
