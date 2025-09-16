import AboutClient from "./AboutClient"

export const metadata = {
  title: "Hakkımızda - Şahika Beauty Güzellik Merkezi | 13 Yıllık Deneyim",
  description:
    "13 yıllık deneyimimizle Sultanbeyli'de profesyonel cilt bakımı ve güzellik hizmetleri sunuyoruz. 35.000+ mutlu müşteri, %97 doğal içerikli ürünlerle cilt sağlığınız için buradayız.",
  keywords: [
    "şahika beauty hakkında",
    "sultanbeyli güzellik merkezi deneyim",
    "profesyonel cilt bakımı sultanbeyli",
    "13 yıllık güzellik merkezi",
    "doğal cilt bakımı ürünleri",
    "sultanbeyli estetik merkezi",
  ],
  openGraph: {
    title: "Hakkımızda - Şahika Beauty Güzellik Merkezi",
    description: "13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız.",
    type: "website",
    locale: "tr_TR",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/hakkimizda",
    siteName: "Şahika Beauty Güzellik Merkezi",
    images: [
      {
        url: "/assets/about/img.jpg",
        width: 1200,
        height: 630,
        alt: "Şahika Beauty Güzellik Merkezi Hakkımızda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda - Şahika Beauty Güzellik Merkezi",
    description: "13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız.",
    images: ["/assets/about/img.jpg"],
  },
  alternates: {
    canonical: "https://sultanbeyliguzellikmerkezi.com.tr/hakkimizda",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
