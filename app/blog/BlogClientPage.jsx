import { Metadata } from "next";
import BlogClientPage from "./BlogClientPage";
import { generateBreadcrumbSchema, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo-schemas";
import JsonLd from "@/components/JsonLd";

// Blog yazılarını API'den çeken fonksiyon
async function fetchBlogPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
      cache: "force-cache", // SSG için önbellekleme
    });

    if (!response.ok) {
      throw new Error("Blog yazıları çekilemedi");
    }

    const data = await response.json();
    const blogs = Array.isArray(data?.data) ? data.data : [];
    return { success: true, data: blogs, count: blogs.length };
  } catch (error) {
    console.error("Blog yazıları çekilirken hata oluştu:", error);
    return { success: false, data: [], count: 0 };
  }
}

// Dinamik metadata oluşturma
export async function generateMetadata() {
  return {
    title: "Blog - Sultanbeyli Güzellik Merkezi | İpuçları ve Rehberler",
    description:
      "Sultanbeyli Güzellik Merkezi’nin blog sayfasında güzellik, cilt bakımı ve epilasyon hakkında en güncel rehberler, ipuçları ve uzman tavsiyeleri.",
    keywords:
      "sultanbeyli güzellik merkezi, güzellik blogu, cilt bakımı, lazer epilasyon, güzellik ipuçları",
    openGraph: {
      title: "Blog - Sultanbeyli Güzellik Merkezi",
      description: "Güzellik, cilt bakımı ve sağlıkla ilgili güncel bilgiler ve uzman önerileri.",
      type: "website",
      locale: "tr_TR",
      url: "https://sultanbeyliguzellikmerkezi.com.tr/blog",
      siteName: "Şahika Beauty",
      images: [
        {
          url: "https://sultanbeyliguzellikmerkezi.com.tr/og-default.png",
          width: 1200,
          height: 630,
          alt: "Şahika Beauty - Blog Sayfası",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Sultanbeyli Güzellik Merkezi",
      description: "Güzellik, cilt bakımı ve sağlıkla ilgili güncel bilgiler ve uzman önerileri.",
      images: ["https://sultanbeyliguzellikmerkezi.com.tr/og-default.png"],
    },
    alternates: {
      canonical: "https://sultanbeyliguzellikmerkezi.com.tr/blog",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Blog sayfası bileşeni
export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();

  // JSON-LD şemaları
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  // Blog sayfası için FAQ şeması
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Lazer epilasyon nedir ve nasıl çalışır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lazer epilasyon, istenmeyen tüylerden kurtulmanın kalıcı bir yoludur. Yoğunlaştırılmış ışık, tüy köklerindeki melanin pigmentini hedef alarak tüy üretimini durdurur. Şahika Beauty’de uzmanlarla güvenilir hizmet alın.",
        },
      },
      {
        "@type": "Question",
        name: "Lazer epilasyon kaç seans sürer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ortalama 6-8 seans gerekir, ancak bu sayı cilt ve tüy tipine göre değişir. Şahika Beauty’de ücretsiz danışmanlık ile size özel plan oluşturuyoruz.",
        },
      },
      {
        "@type": "Question",
        name: "Cilt bakımı neden önemlidir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cilt bakımı, cildin sağlıklı ve genç kalmasını sağlar. Şahika Beauty’de leke tedavisi, akne bakımı ve gençleştirme hizmetleriyle cildinizi yenileyin.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <BlogClientPage
        blogPosts={blogPosts}
        error={blogPosts.success && blogPosts.count > 0 ? null : "Bu kategoride henüz yazı bulunmuyor"}
        loading={false}
      />
    </>
  );
}