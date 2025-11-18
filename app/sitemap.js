import { services } from "@/data/services"

// Blog yazıları (şu anda hardcoded, gelecekte API'den gelecek)
const blogPosts = [
  {
    slug: "2024-guzellik-trendleri",
    lastModified: "2024-03-15",
  },
  {
    slug: "lazer-epilasyon-rehberi",
    lastModified: "2024-03-10",
  },
  {
    slug: "kis-cilt-bakimi",
    lastModified: "2024-03-05",
  },
  {
    slug: "kalici-makyaj-teknikleri",
    lastModified: "2024-03-01",
  },
  {
    slug: "bolgesel-incelme-yontemleri",
    lastModified: "2024-02-28",
  },
  {
    slug: "kirpik-permasi-bakim",
    lastModified: "2024-02-25",
  },
]

export default function sitemap() {
  const baseUrl = "https://sultanbeyliguzellikmerkezi.com.tr"

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
  ]

  // Hizmet sayfaları
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  // Blog yazı sayfaları
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
