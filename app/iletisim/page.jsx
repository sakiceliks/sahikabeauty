import ContactClient from "./ContactClient"

export const metadata = {
  title: "İletişim - Şahika Beauty Güzellik Merkezi | Sultanbeyli",
  description:
    "Şahika Beauty Güzellik Merkezi ile iletişime geçin. Sultanbeyli'de profesyonel cilt bakımı ve güzellik hizmetleri. Randevu almak için hemen arayın: 0530 434 83 49",
  keywords: [
    "sultanbeyli güzellik merkezi iletişim",
    "şahika beauty iletişim",
    "sultanbeyli cilt bakımı randevu",
    "güzellik salonu sultanbeyli telefon",
    "cilt bakımı merkezi iletişim",
    "sultanbeyli estetik merkezi adres",
  ],
  openGraph: {
    title: "İletişim - Şahika Beauty Güzellik Merkezi",
    description:
      "Sultanbeyli'de profesyonel güzellik hizmetleri için bizimle iletişime geçin. Uzman kadromuzla cilt sağlığınız için buradayız.",
    type: "website",
    locale: "tr_TR",
    url: "https://sultanbeyliguzellikmerkezi.com.tr/iletisim",
    siteName: "Şahika Beauty Güzellik Merkezi",
    images: [
      {
        url: "/assets/about/img.jpg",
        width: 1200,
        height: 630,
        alt: "Şahika Beauty Güzellik Merkezi İletişim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim - Şahika Beauty Güzellik Merkezi",
    description: "Sultanbeyli'de profesyonel güzellik hizmetleri için bizimle iletişime geçin.",
    images: ["/assets/about/img.jpg"],
  },
  alternates: {
    canonical: "https://sultanbeyliguzellikmerkezi.com.tr/iletisim",
  },
}

export default function ContactPage() {
  return <ContactClient />
}
