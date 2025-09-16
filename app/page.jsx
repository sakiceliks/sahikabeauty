import HomeClient from "./HomeClient"

export const metadata = {
  title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi | Lazer Epilasyon & Cilt Bakımı",
  description:
    "Sultanbeyli'nin en güvenilir güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme ve daha fazlası. Uzman kadromuz ile güzelliğinizi keşfedin.",
  keywords:
    "sultanbeyli güzellik merkezi, lazer epilasyon sultanbeyli, cilt bakımı sultanbeyli, kalıcı makyaj sultanbeyli, bölgesel incelme, şahika beauty",
  openGraph: {
    title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    description: "Sultanbeyli'nin en güvenilir güzellik merkezi. Uzman kadromuz ile güzelliğinizi keşfedin.",
    type: "website",
    locale: "tr_TR",
    url: "https://sultanbeyliguzellikmerkezi.com.tr",
    siteName: "Şahika Beauty",
    images: [
      {
        url: "https://sultanbeyliguzellikmerkezi.com.tr/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    description: "Sultanbeyli'nin en güvenilir güzellik merkezi. Uzman kadromuz ile güzelliğinizi keşfedin.",
    images: ["https://sultanbeyliguzellikmerkezi.com.tr/assets/og-image.jpg"],
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

const Home = () => {
  return <HomeClient />
}

export default Home
