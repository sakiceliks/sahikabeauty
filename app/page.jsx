import HomeClient from "./HomeClient"
import { generateBreadcrumbSchema, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo-schemas"
import JsonLd from "@/components/JsonLd"

export async function generateMetadata() {
  // Dinamik metadata için API fetch optional
  return {
    title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi | Lazer Epilasyon & Cilt Bakımı",
    description:
      "Sultanbeyli'nin en güvenilir güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme ve daha fazlası. Uzman kadromuz ile güzelliğinizi keşfedin.",
    keywords:
      "sultanbeyli güzellik merkezi, lazer epilasyon sultanbeyli, cilt bakımı sultanbeyli, kalıcı makyaj sultanbeyli, bölgesel incelme sultanbeyli, şahika beauty",
    authors: [{ name: "Şahika Beauty" }],
    creator: "Şahika Beauty",
    publisher: "Şahika Beauty",
    applicationName: "Şahika Beauty",
    generator: "Şahika Beauty",
    referrer: "origin-when-cross-origin",
    openGraph: {
      title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
      description: "Sultanbeyli'nin en güvenilir güzellik merkezi. Uzman kadromuz ile güzelliğinizi keşfedin.",
      type: "website",
      locale: "tr_TR",
      url: "https://sultanbeyliguzellikmerkezi.com.tr",
      siteName: "Şahika Beauty",
      images: [
        {
          url: "https://sultanbeyliguzellikmerkezi.com.tr/og-default.png",
          width: 1200,
          height: 630,
          alt: "Şahika Beauty - Sultanbeyli Güzellik Merkezi Lazer Epilasyon",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
      description: "Sultanbeyli'nin en güvenilir güzellik merkezi. Uzman kadromuz ile güzelliğinizi keşfedin.",
      images: ["https://sultanbeyliguzellikmerkezi.com.tr/og-default.png"],
    },
    alternates: {
      canonical: "https://sultanbeyliguzellikmerkezi.com.tr",
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
  }
}

const Home = async () => {
  // Server-side fetch for SEO (SSG-like)
  let blogs = []
  let services = []
  let featuredServices = []
  let error = null

  try {
    // Skip server-side fetch for now to avoid connection issues
    // The client-side component will handle data loading
    console.log("Skipping server-side fetch to avoid connection issues")
  } catch (err) {
    console.error("Server-side veri hatası:", err)
    error = "Veriler yüklenirken bir hata oluştu"
  }

  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Ana Sayfa", url: "/" }])

  // FAQ Schema ekle (örnek, blog/services'ten dinamik yap)
  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Sultanbeyli güzellik merkezi nedir ve Şahika Beauty neden tercih edilmeli?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sultanbeyli güzellik merkezi, lazer epilasyon, cilt bakımı ve estetik hizmetleri sunan uzman salonlardır. Şahika Beauty, son teknoloji cihazlar ve deneyimli ekip ile en kaliteli hizmeti verir. Randevu için hemen arayın!",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli lazer epilasyon fiyatları nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fiyatlarımız seans sayısına göre değişir, başlangıç paketi 500 TL'den başlar. Detaylı fiyat teklifi için iletişime geçin ve özel indirim kazanın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli cilt bakımı hizmetleri nelerdir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cilt bakımı hizmetlerimiz leke tedavisi, akne bakımı ve gençleştirme içerir. Profesyonel uygulamalarla cildinizi yenileyin, Şahika Beauty'de ücretsiz danışmanlık alın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli kalıcı makyaj nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kalıcı makyaj, microblading ve pigmentasyon teknikleriyle doğal görünüm sağlar. Uzmanlarımızla 2-3 saatte tamamlanır, kalıcılığı 1-3 yıl sürer. Detay için ziyaret edin.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli estetik uygulamaları hangileridir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estetik hizmetlerimiz bölgesel incelme, mezoterapi ve anti-age tedavileri kapsar. Sonuç odaklı yaklaşımla güzelliğinizi artırın, Şahika Beauty'de kişiselleştirilmiş planlar.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli iğneli epilasyon nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İğneli epilasyon, kalın tüyler için etkili bir yöntemdir. Ağrısız seanslarla kalıcı sonuç alınır. Şahika Beauty'de uzman uygulamalarla deneyin.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli leke bakımı nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leke bakımı, peeling ve lazerle cilt tonunu eşitler. 4-6 seans sonrası farkı görün. Ücretsiz cilt analizi için randevu alın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli akne bakımı tedavisi nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Akne bakımı, profesyonel temizleme ve tedaviyle sivilceleri önler. Şahika Beauty'de kişiye özel protokollerle temiz cilt kazanın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli yosun peeling faydaları nelerdir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yosun peeling, cildi nemlendirir ve yeniler. Detoks etkisiyle parlaklık sağlar. Haftalık seanslarla ideal sonuçlar alın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli G5 masajı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "G5 masajı, titreşimli cihazla lenf drenajı yapar, selülit azaltır. Rahatlatıcı ve etkili, Şahika Beauty'de deneyin.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli EmSlim Fit tedavisi nasıl çalışır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmSlim Fit, kas kasılmalarıyla yağ yakar ve şekillendirir. 4 seansla %30 incelme sağlayın, ücretsiz danışmanlık için arayın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli Primex cihazı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Primex, RF teknolojisiyle cilt sıkılaştırma yapar. Kırışıklık ve sarkma için idealdir. Şahika Beauty'de son teknolojiyle hizmet.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli Sculpture tedavisi faydaları neler?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sculpture, soğuk lipolizle yağ eritir. Vücut kontürü için etkili, 6-8 seans sonrası kalıcı sonuçlar.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli dudak renklendirme fiyatları nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dudak renklendirme başlangıç 800 TL'den başlar. Doğal ve kalıcı renkler için uzman ekibimizle görüşün.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli eyeliner uygulaması nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eyeliner, hassas iğnelerle gözleri belirginleştirir. Ağrısız işlemle 1 saatte tamamlanır, Şahika Beauty'de kişiselleştirin.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli kaş pigmentasyon nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kaş pigmentasyon, boşlukları doldurarak doğal kaşlar yaratır. 2 seansla 2 yıl kalıcı, ücretsiz tasarım danışmanlığı.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli microblading tedavisi nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Microblading, manuel teknikle gerçekçi kaşlar çizer. İyileşme 7 günde tamamlanır, Şahika Beauty'de profesyonel sonuçlar.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli ipek kirpik uygulaması nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İpek kirpik, hacim katar ve doğal görünüm verir. 45 dakikada uygulanır, 3-4 hafta kalıcı.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli protez tırnak hizmetleri nelerdir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Protez tırnak, jel ve akrilikle uzun süreli manikür sağlar. Tasarım seçenekleriyle Şahika Beauty'de yenilenin.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli manikür fiyatları nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Manikür hizmetleri 150 TL'den başlar. Hijyenik ve kaliteli uygulamalar için randevu alın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli saç bakımı tedavileri hangileridir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saç bakımı, besleme ve onarım maskeleriyle saçları güçlendirir. Keratin ve botoks seçenekleri mevcut.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli cilt gençleştirme yöntemleri neler?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cilt gençleştirme, mezoterapi ve lazerle kırışıklıkları azaltır. Yaşsız görünüm için Şahika Beauty'ye gelin.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli anti-age tedavisi nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anti-age, kolajen artırarak yaşlanma belirtilerini geciktirir. Kişiye özel programlarla etkili sonuçlar.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli altın tozu cilt bakımı faydaları nelerdir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Altın tozu bakımı, cildi aydınlatır ve sıkılaştırır. Lüks deneyimle parlaklık kazanın.",
      },
    },
    {
      "@type": "Question",
      name: "Sultanbeyli iğnesiz mezoterapi nasıl çalışır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İğnesiz mezoterapi, ultrasonla serum hapsederek besler. Ağrısız ve hızlı, Şahika Beauty'de deneyin.",
      },
    },
  ],
}

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <HomeClient 
        blogs={blogs} 
        services={services} 
        featuredServices={featuredServices} 
        error={error}
        loading={false} 
      />
    </>
  )
}

export default Home