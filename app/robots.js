export default function robots() {
  const baseUrl = "https://sultanbeyliguzellikmerkezi.com.tr"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/*?category=",
        "/blog?category",
        "/hizmetler?category",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
