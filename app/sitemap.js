import { services } from "@/data/services"

// Bölge verileri (bolgeler sayfasından)
const regionData = {
  'sultanbeyli': {
    name: 'Sultanbeyli',
    slug: 'sultanbeyli',
  },
  'samandira': {
    name: 'Samandıra',
    slug: 'samandira',
  },
  'pendik': {
    name: 'Pendik',
    slug: 'pendik',
  },
  'sancaktepe': {
    name: 'Sancaktepe',
    slug: 'sancaktepe',
  },
  'kurtkoy': {
    name: 'Kurtköy',
    slug: 'kurtkoy',
  }
}

// Blog yazılarını API'den çekme fonksiyonu
async function getBlogPosts() {
  try {
    // Production'da absolute URL, development'ta relative URL kullan
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'https://sultanbeyliguzellikmerkezi.com.tr'
    
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?published=true`
      : `${baseUrl}/api/blog?published=true`
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // 1 saat cache
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.data && Array.isArray(data.data)) {
        return data.data
          .filter((post) => post.slug && post.published !== false)
          .map((post) => ({
            slug: post.slug,
            lastModified: post.updatedAt || post.date || new Date().toISOString(),
          }))
      }
    }
  } catch (error) {
    // Sitemap generation sırasında hata olursa sessizce devam et
    console.error('Error fetching blog posts for sitemap:', error)
  }
  
  // Fallback: Eğer API'den çekilemezse boş array döndür
  return []
}

export default async function sitemap() {
  const baseUrl = "https://sultanbeyliguzellikmerkezi.com.tr"
  
  // Blog yazılarını API'den çek
  const blogPosts = await getBlogPosts()

  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rezervasyon`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kampanyalar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sss`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // Hizmet sayfaları
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  // Hizmet kategori sayfaları
  const serviceCategoryPages = [
    'epilasyon',
    'cilt-bakimi',
    'bolgesel-incelme',
    'kalici-makyaj',
    'tirnak-kirpik',
    'sac-bakimi',
    'anti-age'
  ].map((category) => ({
    url: `${baseUrl}/hizmetler?category=${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // Blog yazı sayfaları (API'den gelen dinamik veriler)
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Blog kategori sayfaları
  const blogCategoryPages = [
    'epilasyon',
    'cilt-bakimi',
    'bolgesel-incelme',
    'kalici-makyaj',
    'tirnak-kirpik',
    'sac-bakimi',
    'anti-age'
  ].map((category) => ({
    url: `${baseUrl}/blog?category=${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  // Bölge sayfaları
  const regionPages = Object.values(regionData).map((region) => ({
    url: `${baseUrl}/bolgeler/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...serviceCategoryPages,
    ...blogPages,
    ...blogCategoryPages,
    ...regionPages,
  ]
}
