'use client';

// Blog sayfasına entegre edilmiş tam SEO optimizasyonu

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dummy imports for non-existent components to make the code runnable.
// In a real project, these would be your actual component files.
const JsonLd = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
};
const FaqSchema = ({ faqs }) => <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }} />;
const ReviewSchema = ({ reviews }) => <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Review', itemReviewed: { '@type': 'LocalBusiness', name: 'Şahika Beauty Sultanbeyli' }, reviewRating: { '@type': 'Rating', ratingValue: reviews[0].rating }, author: { '@type': 'Person', name: reviews[0].author } }} />;
const VideoSchema = ({ videoData }) => <JsonLd data={{ '@context': 'https://schema.org', '@type': 'VideoObject', ...videoData }} />;
const HowToSchema = ({ steps, title }) => <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: title, step: steps.instructions.map((s, i) => ({ '@type': 'HowToStep', url: `#step-${i}`, name: s.title, text: s.description })) }} />;
const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) return null;
  return (
    <nav className="not-prose my-12 bg-gray-50 rounded-2xl shadow-inner p-6 border-l-4 border-primary">
      <h3 className="text-xl font-bold mb-4 text-primary">İçindekiler</h3>
      <ul className="list-none m-0 p-0 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`text-gray-700 hover:text-primary transition-colors ${heading.level === 3 ? 'pl-4 text-sm' : ''}`}>
            <a href={`#${heading.id}`} className="block">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
const BeforeAfterGallery = ({ images, service }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="not-prose my-12 bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-8">
        📸 {service} Öncesi & Sonrası Galerisi
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((img, index) => (
          <div key={index} className="bg-gray-100 rounded-xl overflow-hidden shadow-inner">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-video">
                <Image src={img.before} alt={`${service} Öncesi`} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Önce</span>
              </div>
              <div className="relative aspect-video">
                <Image src={img.after} alt={`${service} Sonrası`} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Sonra</span>
              </div>
            </div>

            <div className="p-4 text-center">
              <p className="text-sm text-gray-700">
                <strong>{img.process}</strong> ({img.duration})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const PriceComparisonTable = ({ services }) => {
  if (!services || services.length === 0) return null;
  return (
    <div className="not-prose my-12 bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-8">
        💰 Fiyat Karşılaştırması
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-primary-100">
              <th className="py-4 px-2 font-bold text-gray-600">Hizmet</th>
              <th className="py-4 px-2 font-bold text-gray-600 text-center">Piyasa Fiyatı</th>
              <th className="py-4 px-2 font-bold text-gray-600 text-center">Şahika Beauty Fiyatı</th>
              <th className="py-4 px-2 font-bold text-gray-600 text-center">Kazanç</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{service.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{service.name}</div>
                      <div className="text-sm text-gray-500">{service.description}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 text-center text-gray-500 line-through">
                  {service.competitorPrice} TL
                </td>
                <td className="py-4 px-2 text-center text-primary font-bold">
                  {service.ourPrice} TL
                </td>
                <td className="py-4 px-2 text-center text-green-600 font-bold">
                  {(service.competitorPrice - service.ourPrice)} TL
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const ExpertTips = ({ tips, expertName }) => {
  if (!tips || tips.length === 0) return null;
  return (
    <div className="not-prose my-12 bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        💡 Uzmanımızdan İpuçları
      </h3>
      <p className="text-center text-gray-600 mb-8">
        <span className="font-semibold text-primary">{expertName}</span>'dan, güzellik rutininizi mükemmelleştirecek önemli tavsiyeler.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((tip, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h4 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              {tip.title}
            </h4>
            <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
            {tip.link && (
              <Link href={tip.link.url} className="text-primary font-semibold text-sm hover:underline">
                {tip.link.text} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
const LocalCitations = () => (
  <div className="not-prose my-12 bg-white rounded-2xl shadow-lg p-8">
    <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
      📍 Adres ve İletişim
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-primary">Şahika Beauty Sultanbeyli Şubesi</h4>
        <p className="text-gray-700">
          <strong className="block mb-1">Adres:</strong>
          Abdurrahmangazi, Fatih Blv. No:73/1<br />
          34920 Sultanbeyli/İstanbul
        </p>
        <p className="text-gray-700">
          <strong className="block mb-1">Telefon:</strong>
          <a href="tel:+905304348349" className="text-blue-600 hover:underline">
            0530 434 83 49
          </a>
        </p>
        <p className="text-gray-700">
          <strong className="block mb-1">Çalışma Saatleri:</strong>
          Pzt-Cmt: 09:00 - 20:00<br />
          Pazar: Kapalı
        </p>
      </div>
      <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
        {/* Replace with your actual Google Maps embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.828458153494!2d29.29653771569766!3d40.97657927930432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac1f0e4b7b251%3A0x6a54f652b415e9a4!2sSultanbeyli%2C%20Istanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1633512345678!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
);
const SeasonalContent = ({ content }) => {
  if (!content) return null;
  return (
    <div className="not-prose my-12">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          {content.title}
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          {content.subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {content.items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <Link href={item.link} className="text-primary font-medium hover:underline">
                Detayları Gör →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Dummy icons for display
const Calendar = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const Phone = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MessageCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const Star = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const BookOpen = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const ArrowRight = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const Lightbulb = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M10 18a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4"></path></svg>;
const CheckCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const Clock = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;


const sultanbeyliBlogData = {
  faqs: [
    {
      question: "Sultanbeyli güzellik merkezinde hangi hizmetler sunuluyor?",
      answer: "Şahika Beauty Sultanbeyli şubemizde lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme, anti-age tedaviler ve tırnak-kirpik hizmetleri sunuyoruz. Tüm hizmetlerimiz uzman kadromuz tarafından son teknoloji cihazlarla gerçekleştirilir."
    },
    {
      question: "Sultanbeyli şubesinden nasıl randevu alabilirim?",
      answer: "Online randevu sistemimizi kullanarak 7/24 randevu alabilir, telefon ile arayabilir veya WhatsApp üzerinden iletişime geçebilirsiniz. Acil durumlar için aynı gün randevu imkanı da mevcuttur."
    },
    {
      question: "Lazer epilasyon Sultanbeyli'de kaç seans sürüyor?",
      answer: "Lazer epilasyon seans sayısı kişisel faktörlere bağlı olarak 6-12 arasında değişir. Sultanbeyli şubemizde ücretsiz konsültasyon ile kişiye özel plan hazırlanır."
    },
    {
      question: "Sultanbeyli güzellik merkezi fiyatları nasıl?",
      answer: "Şahika Beauty olarak Sultanbeyli'de en uygun fiyatlarla kaliteli hizmet sunuyoruz. Fiyatlarımız şeffaf olup, paket indirimleri ve kampanyalarımızla daha da avantajlı hale geliyor."
    }
  ],
  reviews: [
    {
      rating: 5,
      author: "Merve Kaya",
      text: "Sultanbeyli'deki en iyi güzellik merkezi! Lazer epilasyon sonuçları harika, personel çok profesyonel.",
      date: "2025-01-15"
    },
    {
      rating: 5,
      author: "Ayşe Demir",
      text: "Cilt bakımı için Sultanbeyli şubesine geliyorum. Sonuçlar mükemmel, hijyen kuralları tam.",
      date: "2025-01-10"
    },
    {
      rating: 4,
      author: "Fatma Öz",
      text: "Kalıcı makyaj yaptırdım, çok doğal görünüyor. Sultanbeyli'deki en kaliteli merkez.",
      date: "2025-01-08"
    }
  ],
  video: {
    title: "Sultanbeyli Güzellik Merkezi Tanıtım",
    description: "Şahika Beauty Sultanbeyli şubemizin tanıtım videosu. Merkezimizi ve hizmetlerimizi yakından tanıyın.",
    thumbnail: "/video-thumbnail.jpg",
    uploadDate: "2025-01-01",
    duration: "PT3M45S",
    url: "https://sahikabeauty.com/sultanbeyli-video.mp4",
    embedUrl: "https://sahikabeauty.com/embed/sultanbeyli"
  },
  howToSteps: {
    supplies: ["Temiz cilt", "Rahat kıyafet"],
    tools: ["Son teknoloji lazer cihazı", "Koruyucu gözlük"],
    instructions: [
      {
        title: "Ön Konsültasyon",
        description: "Sultanbeyli uzmanımız ile detaylı görüşme ve cilt analizi yapılır",
        image: "/step1.jpg"
      },
      {
        title: "Cilt Hazırlığı",
        description: "Lazer epilasyon öncesi cilt temizliği ve hazırlık işlemleri",
        image: "/step2.jpg"
      },
      {
        title: "Lazer Uygulama",
        description: "Son teknoloji lazer ile güvenli ve etkili epilasyon",
        image: "/step3.jpg"
      },
      {
        title: "Bakım Önerileri",
        description: "Seanslar arası bakım ve sonraki randevu planlaması",
        image: "/step4.jpg"
      }
    ]
  },
  headings: [
    { id: "sultanbeyli-lazer-epilasyon", text: "Sultanbeyli'de Lazer Epilasyon", level: 2 },
    { id: "hazirlik-sureci", text: "Lazer Epilasyon Hazırlık Süreci", level: 3 },
    { id: "seans-sureci", text: "Seans Süreci Nasıl İşliyor?", level: 3 },
    { id: "sonrasi-bakim", text: "Lazer Epilasyon Sonrası Bakım", level: 2 },
    { id: "fiyat-avantajlari", text: "Sultanbeyli Şube Fiyat Avantajları", level: 2 },
    { id: "musteri-deneyimleri", text: "Müşteri Deneyimleri", level: 2 }
  ],
  beforeAfterImages: [
    {
      before: "/before1.jpg",
      after: "/after1.jpg",
      process: "6 seans lazer epilasyon",
      duration: "4 ay"
    },
    {
      before: "/before2.jpg",
      after: "/after2.jpg",
      process: "Cilt bakımı + anti-age",
      duration: "3 ay"
    }
  ],
  priceServices: [
    {
      icon: "✨",
      name: "Lazer Epilasyon (Tam Vücut)",
      description: "6 seans paket",
      competitorPrice: 3500,
      ourPrice: 2499
    },
    {
      icon: "🌟",
      name: "Cilt Bakımı Deluxe",
      description: "Yüz + boyun + dekolte",
      competitorPrice: 800,
      ourPrice: 599
    },
    {
      icon: "💄",
      name: "Kalıcı Makyaj (Kaş)",
      description: "Doğal görünüm",
      competitorPrice: 1200,
      ourPrice: 899
    }
  ],
  expertTips: [
    {
      title: "Lazer Epilasyon Öncesi Güneşe Çıkmayın",
      description: "Seansdan 2 hafta önce ve sonra güneşe maruz kalmayın. Bu, tedavinin etkinliğini artırır ve yan etki riskini azaltır.",
      link: {
        text: "Detaylı hazırlık rehberi",
        url: "/blog/lazer-epilasyon-hazirlik"
      }
    },
    {
      title: "Düzenli Nemlenme Çok Önemli",
      description: "Lazer epilasyon sonrası cildinizi düzenli olarak nemlendirin. Bu, iyileşme sürecini hızlandırır.",
      link: {
        text: "Bakım ürünleri önerileri",
        url: "/blog/epilasyon-sonrasi-bakim"
      }
    },
    {
      title: "Seans Aralarında Tüy Koparmayın",
      description: "Lazer epilasyon seansları arasında tüyleri koparmamalı, sadece tıraş edebilirsiniz.",
      link: {
        text: "Seans arası bakım",
        url: "/blog/seans-arasi-bakim"
      }
    },
    {
      title: "Mevsime Göre Planlama Yapın",
      description: "Lazer epilasyona kış aylarında başlamak, yaz için hazır olmak açısından idealdir.",
      link: {
        text: "En iyi başlama zamanı",
        url: "/blog/lazer-epilasyon-mevsim"
      }
    }
  ],
  seasonalContent: {
    title: "Kış Ayları Güzellik Paketleri",
    subtitle: "Sultanbeyli şubemizde kış aylarına özel kampanyalar",
    items: [
      {
        icon: "❄️",
        title: "Kış Cilt Bakımı",
        description: "Soğuk havaya karşı özel bakım programı",
        link: "/kampanyalar/kis-cilt-bakimi"
      },
      {
        icon: "✨",
        title: "Lazer Epilasyon İndirimi",
        description: "Kış aylarında %40'a varan indirimler",
        link: "/kampanyalar/lazer-epilasyon-kis"
      },
      {
        icon: "💄",
        title: "Kalıcı Makyaj Paketi",
        description: "Yeni yıla özel kalıcı makyaj fırsatları",
        link: "/kampanyalar/kalici-makyaj"
      }
    ]
  }
};

const EnhancedBlogDetail = ({ post, loading }) => {
  // Dummy schemas for demonstration
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://sahikabeauty.com/blog/sultanbeyli-guzellik-merkezi"
    },
    "headline": "Sultanbeyli Güzellik Merkezi: Lazer Epilasyon, Cilt Bakımı ve Daha Fazlası",
    "image": [
      "https://sahikabeauty.com/images/lazer-epilasyon-sultanbeyli.jpg"
    ],
    "datePublished": "2025-01-20T09:00:00+03:00",
    "dateModified": "2025-01-20T09:00:00+03:00",
    "author": {
      "@type": "Person",
      "name": "Şahika Beauty Uzman Kadrosu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Şahika Beauty",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sahikabeauty.com/logo.png"
      }
    },
    "description": "Sultanbeyli'deki güzellik merkezimizde sunduğumuz tüm hizmetleri, fiyatları ve müşteri yorumlarını keşfedin. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve daha fazlası için doğru adres."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://sahikabeauty.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://sahikabeauty.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Sultanbeyli Güzellik Merkezi",
        "item": "https://sahikabeauty.com/blog/sultanbeyli-guzellik-merkezi"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Şahika Beauty Sultanbeyli",
    "image": "https://sahikabeauty.com/images/sahika-beauty-sultanbeyli-sube.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Abdurrahmangazi, Fatih Blv. No:73/1",
      "addressLocality": "Sultanbeyli",
      "addressRegion": "İstanbul",
      "postalCode": "34920",
      "addressCountry": "TR"
    },
    "telephone": "+90 530 434 83 49",
    "url": "https://sahikabeauty.com/sultanbeyli",
    "priceRange": "$$",
    "openingHours": "Mo-Sa 09:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247"
    }
  };


  if (loading) return <div>Yükleniyor...</div>;
  if (!post) return <div>İçerik bulunamadı.</div>;

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localBusinessSchema} />

      <FaqSchema faqs={sultanbeyliBlogData.faqs} />
      <ReviewSchema reviews={sultanbeyliBlogData.reviews} />
      <VideoSchema videoData={sultanbeyliBlogData.video} />
      <HowToSchema
        steps={sultanbeyliBlogData.howToSteps}
        title="Sultanbeyli'de Lazer Epilasyon Nasıl Yapılır?"
      />

      <div className="min-h-screen pt-32 pb-12">
        <div className="container mx-auto px-6">
          <header className="mb-12">
            <nav className="text-sm font-semibold text-gray-500 mb-2" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex space-x-2">
                <li className="flex items-center">
                  <Link href="/" className="hover:underline">Ana Sayfa</Link>
                  <span className="mx-2 text-gray-400">/</span>
                </li>
                <li className="flex items-center">
                  <Link href="/blog" className="hover:underline">Blog</Link>
                  <span className="mx-2 text-gray-400">/</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <span>{post.title}</span>
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl">{post.excerpt}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="lg:col-span-3"
            >
              {/* Featured Image */}
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-12">
                <Image
                  src={post.image || '/default-blog-image.jpg'}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>

              <TableOfContents headings={sultanbeyliBlogData.headings} />

              <article className="prose prose-lg max-w-none" itemScope itemType="https://schema.org/Article">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed" itemProp="articleBody" />

                {sultanbeyliBlogData.video && (
                  <div className="not-prose my-12">
                    <div className="bg-gray-900 rounded-2xl p-8 text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        🎥 Sultanbeyli Güzellik Merkezi Tanıtım
                      </h3>
                      <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video mb-4">
                      <div
  className="absolute inset-0 flex items-center justify-center bg-cover bg-top before:absolute before:inset-0 before:bg-black/50"
  style={{
    backgroundImage:
      "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqyWqlNiWVNb-Z2g-tR98GpKZfLLRDQ5Vt9Y6LfOyEQGsyJ1Bax_W38LNQftEbZbjDJ9Uk4WF_RDFfUeXPgmwv1dU9QtuGNDa-LkTMtcMrq0msR2_LdDVWmmc-jpGwaN_E7V-vjoQ=s680-w680-h510-rw')",
  }}
>
  <div className="relative text-center">
    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
      <svg
        className="w-8 h-8 text-white ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
      </svg>
    </div>
    <p className="text-white text-lg">Merkezimizi Tanıyın</p>
    <p className="text-gray-400 text-sm">3:45 dakika</p>
  </div>
</div>

                      </div>
                      <p className="text-gray-300 text-sm">
                        Sultanbeyli şubemizin içini görün, uzmanlarımızla tanışın ve hizmetlerimiz hakkında bilgi alın.
                      </p>
                    </div>
                  </div>
                )}

                <BeforeAfterGallery
                  images={sultanbeyliBlogData.beforeAfterImages}
                  service="Lazer Epilasyon"
                />

                <PriceComparisonTable services={sultanbeyliBlogData.priceServices} />

                <ExpertTips
                  tips={sultanbeyliBlogData.expertTips}
                  expertName="Uzm. Şahika Hanım"
                />

                <div className="not-prose my-12">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                      <MessageCircle className="w-7 h-7 text-primary" />
                      Sıkça Sorulan Sorular
                    </h3>

                    <div className="space-y-6">
                      {sultanbeyliBlogData.faqs.map((faq, index) => (
                        <details key={index} className="group border border-gray-200 rounded-xl">
                          <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-800 group-open:text-primary transition-colors">
                            <span className="pr-4">{faq.question}</span>
                            <div className="flex-shrink-0 ml-4">
                              <svg
                                className="w-5 h-5 transform transition-transform group-open:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </summary>
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>

                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                      <p className="text-gray-600 mb-4">Başka sorularınız mı var?</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                          href="/sss"
                          className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Tüm SSS
                        </Link>
                        <Link
                          href="/iletisim"
                          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Bize Sorun
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <SeasonalContent
                  season="winter"
                  content={sultanbeyliBlogData.seasonalContent}
                />

                <LocalCitations />

                <div className="not-prose my-12">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-center mb-8">
                      🗺️ Sultanbeyli'de Güzellik Yolculuğunuz
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                      <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400" style={{ top: '4rem' }}></div>

                      {[
                        {
                          step: 1,
                          title: "Ücretsiz Konsültasyon",
                          description: "Uzmanımızla görüşün",
                          icon: "📋",
                          link: "/konsultasyon"
                        },
                        {
                          step: 2,
                          title: "Kişisel Plan",
                          description: "Size özel program hazırlayın",
                          icon: "📝",
                          link: "/kisisel-plan"
                        },
                        {
                          step: 3,
                          title: "Tedavi Süreci",
                          description: "Rahat ortamda hizmet alın",
                          icon: "✨",
                          link: "/tedavi-sureci"
                        },
                        {
                          step: 4,
                          title: "Sonuç & Takip",
                          description: "Kalıcı sonuçlar elde edin",
                          icon: "🎯",
                          link: "/sonuc-takip"
                        }
                      ].map((item, index) => (
                        <div key={index} className="relative">
                          <div className="bg-white rounded-xl p-6 shadow-lg text-center relative z-10 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto">
                              {item.step}
                            </div>
                            <span className="text-3xl mb-3 block">{item.icon}</span>
                            <h4 className="font-semibold mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                            <Link
                              href={item.link}
                              className="text-primary hover:text-secondary transition-colors text-sm font-medium"
                            >
                              Detaylar →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-8">
                      <Link
                        href="/rezervasyon"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        <Calendar className="w-5 h-5" />
                        Yolculuğunuza Başlayın
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="not-prose my-12">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                      <Star className="w-7 h-7 text-yellow-500" />
                      Sultanbeyli Müşteri Başarı Hikayeleri
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {sultanbeyliBlogData.reviews.map((review, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-gray-700 italic mb-4">
                            "{review.text}"
                          </blockquote>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {review.author.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{review.author}</div>
                              <div className="text-xs text-gray-500">Doğrulanmış Müşteri</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                      <p className="text-gray-600 mb-4">Siz de başarı hikayenizi paylaşın!</p>
                      <Link
                        href="/yorumlar"
                        className="inline-flex items-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Deneyiminizi Paylaşın
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="not-prose my-12">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-center mb-8">
                      🏆 Neden Şahika Beauty Sultanbeyli?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-green-800 mb-4">✅ Bizden Beklediğiniz</h4>
                        {[
                          "8+ yıl Sultanbeyli'de hizmet tecrübesi",
                          "T.C. Sağlık Bakanlığı onaylı güzellik merkezi",
                          "Son teknoloji FDA onaylı cihazlar",
                          "Şeffaf fiyatlandırma, gizli maliyet yok",
                          "Ücretsiz park alanı ve kolay ulaşım",
                          "Hijyen protokollerine %100 uyum",
                          "Seanslar arası ücretsiz kontrol",
                          "Müşteri memnuniyet garantisi"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-red-800 mb-4">❌ Diğer Merkezlerde Yaşananlar</h4>
                        {[
                          "Deneyimsiz personel ve eski teknoloji",
                          "Gizli ek ücretler ve belirsiz fiyatlar",
                          "Hijyen kurallarına uyumsuzluk",
                          "Randevu alamama ve uzun bekleme",
                          "Sonuç garantisi yok, takipsizlik",
                          "Park sorunu ve ulaşım zorluğu",
                          "Müşteri şikayetlerine duyarsızlık",
                          "Seanslar arası destek eksikliği"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                      <p className="text-gray-600 mb-4 text-lg">
                        Farkı kendiniz görmek için <strong>ücretsiz konsültasyon</strong> alın!
                      </p>
                      <Link
                        href="/konsultasyon"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
                      >
                        <Star className="w-5 h-5" />
                        Ücretsiz Konsültasyon
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="not-prose my-12">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <BookOpen className="w-7 h-7 text-primary" />
                      İlgili Makaleler
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Lazer Epilasyon Hazırlık Rehberi",
                          excerpt: "Seansa gelmeden önce bilmeniz gerekenler...",
                          image: "https://styirqnih357hnts.public.blob.vercel-storage.com/epilasyon-hazirlik.png",
                          href: "/blog/sultanbeyli-guzellik-merkezi",
                          category: "Hazırlık",
                          readTime: "5 dk"
                        },
                        {
                          title: "Cilt Tipi Belirleme ve Bakım",
                          excerpt: "Cilt tipinizi doğru belirleyin ve ona göre bakım yapın...",
                          image: "https://styirqnih357hnts.public.blob.vercel-storage.com/cilt-tipi-belirleme.png",
                          href: "/blog/sultanbeyli-guzellik-merkezi",
                          category: "Cilt Bakımı",
                          readTime: "7 dk"
                        },
                        {
                          title: "Kalıcı Makyaj Sonrası Bakım",
                          excerpt: "Kalıcı makyaj sonrası dikkat edilecek önemli noktalar...",
                          image: "https://styirqnih357hnts.public.blob.vercel-storage.com/kalici-makyaj-bakim.png",
                          href: "/blog/sultanbeyli-guzellik-merkezi",
                          category: "Kalıcı Makyaj",
                          readTime: "4 dk"
                        }
                      ].map((article, index) => (
                        <Link key={index} href={article.href} className="group block">
                          <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 bg-gray-200">
                              <Image
                                src={article.image}
                                alt={`${article.title} - Şahika Beauty Sultanbeyli`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                                  {article.category}
                                </span>
                              </div>
                            </div>
                            <div className="p-6">
                              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {article.readTime}
                                </span>
                                <span className="flex items-center gap-1 text-primary font-medium">
                                  Devamını Oku
                                  <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="not-prose my-12">
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
                    <h3 className="text-3xl font-bold mb-4">
                      Sultanbeyli'de Güzelliğe Giden Yolculuk Başlasın! ✨
                    </h3>
                    <p className="text-lg mb-8 opacity-90">
                      8+ yıllık deneyimimiz ve memnun müşterilerimizle, siz de hayalinizdeki güzelliğe kavuşun!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏆</div>
                        <div className="text-2xl font-bold">247+</div>
                        <div className="text-sm opacity-90">Memnun Müşteri</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">⭐</div>
                        <div className="text-2xl font-bold">4.8/5</div>
                        <div className="text-sm opacity-90">Müşteri Puanı</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">📅</div>
                        <div className="text-2xl font-bold">8+</div>
                        <div className="text-sm opacity-90">Yıl Tecrübe</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/rezervasyon"
                        className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                      >
                        <Calendar className="w-5 h-5" />
                        Hemen Randevu Al
                      </Link>
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 font-semibold"
                      >
                        <Phone className="w-5 h-5" />
                        Hemen Ara: 0530 434 83 49
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </motion.main>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 space-y-8">
                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold mb-4 text-gray-800">Blogda Ara</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Anahtar kelime girin..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold mb-4 text-gray-800">Popüler Yazılar</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <Image src="https://styirqnih357hnts.public.blob.vercel-storage.com/istenmeyen-tuyler.png" alt="Popüler Makale" width={80} height={80} className="rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium text-gray-800 hover:text-primary transition-colors line-clamp-2">
                          İstenmeyen Tüylerden Kurtulmanın En Etkili Yolları
                        </Link>
                        <p className="text-sm text-gray-500">12 Ocak 2025</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Image src="https://styirqnih357hnts.public.blob.vercel-storage.com/4-adimda-puruzsuz-cilt.png" alt="Popüler Makale" width={80} height={80} className="rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium text-gray-800 hover:text-primary transition-colors line-clamp-2">
                          4 Adımda Pürüzsüz ve Işıltılı Bir Cilt
                        </Link>
                        <p className="text-sm text-gray-500">08 Ocak 2025</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Comments Section */}
          <section className="my-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Yorumlar ({sultanbeyliBlogData.reviews.length})</h2>
            <div className="space-y-8">
              {sultanbeyliBlogData.reviews.map((review, index) => (
                <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                    {review.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-gray-900">{review.author}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/yorum-ekle" className="inline-block bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                Yorumunuzu Ekleyin
              </Link>
            </div>
          </section>

          {/* SEO Footer Links */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            <h3 className="font-bold mb-4 text-lg">Diğer Sultanbeyli Hizmetlerimiz</h3>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li><Link href="/sultanbeyli/lazer-epilasyon" className="hover:text-primary hover:underline">Sultanbeyli Lazer Epilasyon</Link></li>
              <li><Link href="/sultanbeyli/cilt-bakimi" className="hover:text-primary hover:underline">Sultanbeyli Cilt Bakımı</Link></li>
              <li><Link href="/sultanbeyli/kalici-makyaj" className="hover:text-primary hover:underline">Sultanbeyli Kalıcı Makyaj</Link></li>
              <li><Link href="/sultanbeyli/bolgesel-incelme" className="hover:text-primary hover:underline">Sultanbeyli Bölgesel İncelme</Link></li>
              <li><Link href="/sultanbeyli/tirnak-protez" className="hover:text-primary hover:underline">Sultanbeyli Tırnak Protez</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedBlogDetail;