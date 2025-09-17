import Head from "next/head"

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/og-default.png",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
  noindex = false,
}) {
  const siteName = "Coşkun Hafriyat"
  const siteUrl = "https://sultanbeyliguzellikmerkezi.com.tr"
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Article specific */}
      {ogType === "article" && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {ogType === "article" && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {ogType === "article" && author && <meta property="article:author" content={author} />}
      {ogType === "article" &&
        tags &&
        tags.map((tag, index) => <meta key={index} property="article:tag" content={tag} />)}

      {/* Keywords */}
      {tags && <meta name="keywords" content={tags.join(", ")} />}
    </Head>
  )
}
