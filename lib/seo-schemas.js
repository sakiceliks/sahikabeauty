export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
  alternateName: "Sultanbeyli Güzellik Merkezi",
  description:
    "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik hizmetler.",
  url: "https://sultanbeyliguzellikmerkezi.com.tr",
  telephone: "+90 530 434 83 49",
  email: "info@sultanbeyliguzellikmerkezi.com.tr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Abdurrahmangazi, Fatih Blv. No:73/1",
    addressLocality: "Sultanbeyli",
    addressRegion: "İstanbul",
    postalCode: "34920",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.9607",
    longitude: "29.2675",
  },
  openingHours: ["Mo-Sa 09:00-19:00"],
  priceRange: "$$",
  image: ["https://sultanbeyliguzellikmerkezi.com.tr/assets/about/img.jpg"],
  sameAs: ["https://www.instagram.com/sahikabeauty", "https://www.facebook.com/sahikabeauty"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Güzellik Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Lazer Epilasyon",
        itemOffered: {
          "@type": "Service",
          name: "Lazer Epilasyon",
          description: "Kalıcı tüy azaltma için profesyonel lazer epilasyon hizmeti",
        },
      },
      {
        "@type": "Offer",
        name: "Cilt Bakımı",
        itemOffered: {
          "@type": "Service",
          name: "Cilt Bakımı",
          description: "Profesyonel cilt bakım ve gençleştirme hizmetleri",
        },
      },
      {
        "@type": "Offer",
        name: "Kalıcı Makyaj",
        itemOffered: {
          "@type": "Service",
          name: "Kalıcı Makyaj",
          description: "Kaş, eyeliner ve dudak kalıcı makyaj uygulamaları",
        },
      },
    ],
  },
})

export const generateServiceSchema = (service) => {
  const serviceReference = {
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "BeautySalon",
      name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    },
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "BeautySalon",
      name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Abdurrahmangazi, Fatih Blv. No:73/1",
        addressLocality: "Sultanbeyli",
        addressRegion: "İstanbul",
        postalCode: "34920",
        addressCountry: "TR",
      },
      telephone: "+90 530 434 83 49",
    },
    serviceType: service.category,
    areaServed: {
      "@type": "City",
      name: "Sultanbeyli",
      containedInPlace: {
        "@type": "State",
        name: "İstanbul",
      },
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `https://sultanbeyliguzellikmerkezi.com.tr/hizmetler/${service.slug}`,
      servicePhone: "+90 530 434 83 49",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceRange: "$$",
    },
    aggregateRating:
      service.reviews?.length > 0
        ? {
            "@type": "AggregateRating",
            itemReviewed: serviceReference,
            ratingValue:
              service.reviews.reduce((acc, review) => acc + (review.rating || 5), 0) / service.reviews.length,
            reviewCount: service.reviews.length,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    review: service.reviews?.map((review) => ({
      "@type": "Review",
      itemReviewed: serviceReference,
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating || 5,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.comment,
      datePublished: review.date || "2024",
    })),
  }
}

export const generateArticleSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.excerpt,
  image: post.image ? `https://sultanbeyliguzellikmerkezi.com.tr${post.image}` : undefined,
  author: {
    "@type": "Person",
    name: post.author,
  },
  publisher: {
    "@type": "Organization",
    name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    logo: {
      "@type": "ImageObject",
      url: "https://sultanbeyliguzellikmerkezi.com.tr/assets/logo.png",
    },
  },
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://sultanbeyliguzellikmerkezi.com.tr/blog/${post.slug}`,
  },
  articleSection: post.category,
  keywords: post.tags?.join(", "),
  wordCount: post.content?.length || 1000,
  articleBody: post.content,
})

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => {
    const listItem = {
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
    };
    
    // Sadece URL varsa item alanını ekle
    if (item.url) {
      listItem.item = `https://sultanbeyliguzellikmerkezi.com.tr${item.url}`;
    }
    
    return listItem;
  }),
})

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://sultanbeyliguzellikmerkezi.com.tr",
  name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
  image: "https://sultanbeyliguzellikmerkezi.com.tr/assets/about/img.jpg",
  telephone: "+90 530 434 83 49",
  email: "info@sultanbeyliguzellikmerkezi.com.tr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Abdurrahmangazi, Fatih Blv. No:73/1",
    addressLocality: "Sultanbeyli",
    addressRegion: "İstanbul",
    postalCode: "34920",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.9607",
    longitude: "29.2675",
  },
  url: "https://sultanbeyliguzellikmerkezi.com.tr",
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card",
  currenciesAccepted: "TRY",
})

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
  alternateName: "Sultanbeyli Güzellik Merkezi",
  url: "https://sultanbeyliguzellikmerkezi.com.tr",
  description:
    "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik hizmetler.",
  publisher: {
    "@type": "Organization",
    name: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    logo: {
      "@type": "ImageObject",
      url: "https://sultanbeyliguzellikmerkezi.com.tr/assets/logo.png",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://sultanbeyliguzellikmerkezi.com.tr/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: ["https://www.instagram.com/sahikabeauty", "https://www.facebook.com/sahikabeauty"],
})

export const generateFAQSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question || faq.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer || faq.description,
    },
  })),
})
