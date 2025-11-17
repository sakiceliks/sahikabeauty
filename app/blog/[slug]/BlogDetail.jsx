'use client';

// Blog sayfasına entegre edilmiş tam SEO optimizasyonu

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';


const JsonLd = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
};
const FaqSchema = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;
  return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }} />;
};
const ReviewSchema = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;
  return <JsonLd data={{ 
    '@context': 'https://schema.org', 
    '@type': 'Review', 
    itemReviewed: { 
      '@type': 'LocalBusiness', 
      name: 'Şahika Beauty - Sultanbeyli Güzellik Merkezi',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Abdurrahmangazi, Fatih Blv. No:73/1',
        addressLocality: 'Sultanbeyli',
        addressRegion: 'İstanbul',
        postalCode: '34920',
        addressCountry: 'TR'
      }
    }, 
    reviewRating: { '@type': 'Rating', ratingValue: reviews[0].rating }, 
    author: { '@type': 'Person', name: reviews[0].author } 
  }} />;
};
const VideoSchema = ({ videoData }) => {
  if (!videoData) return null;
  return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'VideoObject', ...videoData }} />;
};
const HowToSchema = ({ steps, title }) => {
  if (!steps || !steps.instructions || steps.instructions.length === 0) return null;
  return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: title, itemListElement: steps.instructions.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.description, url: `#step-${i}` })) }} />;
};
const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) return null;
  return (
    <nav className="not-prose my-12 bg-gray-50 rounded-2xl shadow-inner p-6 border-l-4 border-primary">
      <h3 className="text-xl font-bold mb-4 text-primary">İçindekiler</h3>
      <ul className="list-none m-0 p-0 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`text-gray-700 hover:text-link-primary transition-colors ${heading.level === 3 ? 'pl-4 text-sm' : ''}`}>
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

const RelatedService = ({ service }) => {
  if (!service) {
    return null;
  }
  
  return (
    <div className="not-prose my-16">
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-green-200">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wide">Önerilen Hizmet</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            {service.title}
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bu blog yazısında bahsedilen <strong className="text-green-700">{service.title}</strong> hizmetimizi keşfedin. 
            Profesyonel ekibimizle en kaliteli hizmeti alın.
          </p>
        </div>
        
        {/* Service Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Profesyonel Ekip</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Modern Teknoloji</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Güvenli Uygulama</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Kişisel Danışmanlık</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/hizmetler/${service.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Hizmet Detaylarını Gör</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/rezervasyon"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl border-2 border-green-700 hover:bg-green-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Hemen Randevu Al</span>
              </Link>
            </div>
            </div>
          </div>
        </div>
        
        {/* SEO Boost Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-800 mb-3">
              🎯 Neden {service.title} Tercih Etmelisiniz?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Sultanbeyli'nin en deneyimli ekibi</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600">✓</span>
                <span>En son teknoloji cihazlar</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Kişiye özel tedavi planı</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <strong>💡 İpucu:</strong> Hizmet sayfamızda detaylı bilgiler, fiyat listesi ve sıkça sorulan soruları bulabilirsiniz.
            </div>
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
  const [relatedService, setRelatedService] = useState(null);
  
  // Fast service matching using static data
  useEffect(() => {
    if (post) {
      // Static service data for fast matching
      const staticServices = [
        { _id: 'yosun-peeling', slug: 'yosun-peeling', title: 'Yosun Peeling', description: 'Doğal yosun ile cilt yenileme', image: '/assets/services/yosun-peeling.png', benefits: ['Doğal içerik', 'Cilt yenileme', 'Güvenli uygulama'] },
        { _id: 'lazer-epilasyon', slug: 'lazer-epilasyon', title: 'Lazer Epilasyon', description: 'Kalıcı epilasyon çözümü', image: '/assets/services/lazer-epilasyon.png', benefits: ['Kalıcı sonuç', 'Hızlı uygulama', 'Güvenli teknoloji'] },
        { _id: 'ipl-epilasyon', slug: 'ipl-epilasyon', title: 'IPL Epilasyon', description: 'Intense Pulsed Light epilasyon', image: '/slide/sld2.jpg', benefits: ['Etkili sonuç', 'Rahat uygulama', 'Modern teknoloji'] },
        { _id: 'cilt-bakimi', slug: 'cilt-bakimi', title: 'Cilt Bakımı', description: 'Profesyonel cilt bakım hizmetleri', image: '/assets/services/cilt-bakimi.png', benefits: ['Profesyonel bakım', 'Kişisel çözüm', 'Uzman ekip'] },
        { _id: 'bolgesel-incelme', slug: 'bolgesel-incelme', title: 'Bölgesel İncelme', description: 'Bölgesel yağ yakma tedavileri', image: '/assets/services/EmSlimFit.png', benefits: ['Bölgesel çözüm', 'Etkili sonuç', 'Güvenli uygulama'] },
        { _id: 'g5-masaji', slug: 'g5-masaji', title: 'G5 Masajı', description: 'Ödem attırıcı ve selülit karşıtı masaj uygulaması', image: '/slide/sld1.png', benefits: ['Selülit azalması', 'Ödem atma', 'Kan dolaşımı', 'Bölgesel incelme'] },
        { _id: 'kalici-makyaj', slug: 'kalici-makyaj', title: 'Kalıcı Makyaj', description: 'Kalıcı makyaj uygulamaları', image: '/assets/services/microblading.png', benefits: ['Kalıcı sonuç', 'Doğal görünüm', 'Uzman teknik'] },
        { _id: 'microblading', slug: 'microblading', title: 'Microblading', description: 'Profesyonel kaş microblading uygulaması', image: '/assets/services/microblading.png', benefits: ['Doğal kaş görünümü', 'Kalıcı sonuç', 'Uzman teknik', 'Kişisel tasarım'] },
        { _id: 'hydrafacial', slug: 'hydrafacial', title: 'HydraFacial', description: 'Gelişmiş cilt temizleme', image: '/slide/sld1.png', benefits: ['Derin temizlik', 'Cilt yenileme', 'Rahat uygulama'] },
        { _id: 'ozon-terapi', slug: 'ozon-terapi', title: 'Ozon Terapi', description: 'Ozon ile cilt tedavisi', image: '/slide/sld3.png', benefits: ['Doğal tedavi', 'Cilt sağlığı', 'Güvenli uygulama'] },
        { _id: '24k-altin-bakim', slug: '24k-altin-bakim', title: '24K Altın Bakım', description: 'Lüks altın cilt bakımı', image: '/assets/services/primex.png', benefits: ['Lüks bakım', 'Altın içerik', 'Premium deneyim'] },
        { _id: 'ignesiz-mezoterapi', slug: 'ignesiz-mezoterapi', title: 'İğnesiz Mezoterapi', description: 'İğnesiz cilt yenileme', image: '/assets/services/sculpture.png', benefits: ['İğnesiz uygulama', 'Rahat deneyim', 'Etkili sonuç'] },
        { _id: 'dudak-renklendirme', slug: 'dudak-renklendirme', title: 'Dudak Renklendirme', description: 'Kalıcı dudak renklendirme', image: '/assets/services/dudak-renklendirme.png', benefits: ['Kalıcı renk', 'Doğal görünüm', 'Uzman teknik'] }
      ];

      let service = null;
      
      // First try to find by serviceId if it exists
      if (post.serviceId) {
        service = staticServices.find(s => s._id === post.serviceId);
      }
      
      // If no service found by serviceId, try to match by slug keywords
      if (!service && post.slug) {
        const slug = post.slug.toLowerCase();
        console.log('BlogDetail - Matching by slug:', slug);
        
        // Fast keyword matching
        const keywordMappings = {
          'yosun': 'yosun-peeling',
          'peeling': 'yosun-peeling',
          'lazer': 'lazer-epilasyon',
          'epilasyon': 'lazer-epilasyon',
          'ipl': 'ipl-epilasyon',
          'cilt': 'cilt-bakimi',
          'bakim': 'cilt-bakimi',
          'bolgesel': 'bolgesel-incelme',
          'incelme': 'bolgesel-incelme',
          'kalici': 'kalici-makyaj',
          'makyaj': 'kalici-makyaj',
          'microblading': 'microblading',
          'sculpture': 'ignesiz-mezoterapi',
          'anti-age': '24k-altin-bakim',
          'hydrafacial': 'hydrafacial',
          'ozon': 'ignesiz-mezoterapi',
          'terapi': 'ignesiz-mezoterapi',
          'altin': '24k-altin-bakim',
          'altin-tozu': '24k-altin-bakim',
          'mezoterapi': 'ignesiz-mezoterapi',
          'dudak': 'dudak-renklendirme',
          'g5': 'g5-masaji',
          'masaj': 'g5-masaji',
          'selulit': 'g5-masaji',
          'odeme': 'g5-masaji'
        };
        
        // Find matching service by keywords
        for (const [keyword, serviceSlug] of Object.entries(keywordMappings)) {
          if (slug.includes(keyword)) {
            console.log('BlogDetail - Found keyword match:', keyword, '->', serviceSlug);
            service = staticServices.find(s => s.slug === serviceSlug);
            if (service) {
              console.log('BlogDetail - Service found:', service.title);
              break;
            }
          }
        }
      }
      
      if (service) {
        setRelatedService(service);
      }
    }
  }, [post]);
  
  // Dummy schemas for demonstration
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://sultanbeyliguzellikmerkezi.com.tr/blog/sultanbeyli-guzellik-merkezi"
    },
    "headline": "Sultanbeyli Güzellik Merkezi: Lazer Epilasyon, Cilt Bakımı ve Daha Fazlası",
    "image": [
      "https://sultanbeyliguzellikmerkezi.com.tr/images/lazer-epilasyon-sultanbeyli.jpg"
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
        "url": "https://sultanbeyliguzellikmerkezi.com.tr/logo.png"
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
        "item": "https://sultanbeyliguzellikmerkezi.com.tr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://sultanbeyliguzellikmerkezi.com.tr/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Sultanbeyli Güzellik Merkezi",
        "item": "https://sultanbeyliguzellikmerkezi.com.tr/blog/sultanbeyli-guzellik-merkezi"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sultanbeyliguzellikmerkezi.com.tr",
    "name": "Şahika Beauty - Sultanbeyli Güzellik Merkezi",
    "alternateName": "Şahika Beauty Sultanbeyli",
    "description": "Sultanbeyli'nin en kaliteli güzellik merkezi. Lazer epilasyon, cilt bakımı, kalıcı makyaj ve estetik hizmetler.",
    "image": "https://sultanbeyliguzellikmerkezi.com.tr/assets/about/img.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Abdurrahmangazi, Fatih Blv. No:73/1",
      "addressLocality": "Sultanbeyli",
      "addressRegion": "İstanbul",
      "postalCode": "34920",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.9607",
      "longitude": "29.2675"
    },
    "telephone": "+90 530 434 83 49",
    "email": "info@sultanbeyliguzellikmerkezi.com.tr",
    "url": "https://sultanbeyliguzellikmerkezi.com.tr",
    "priceRange": "$$",
    "openingHours": "Mo-Sa 09:00-20:00",
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "TRY",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247"
    },
    "sameAs": [
      "https://www.instagram.com/sahikabeauty",
      "https://www.facebook.com/sahikabeauty"
    ]
  };


  if (loading) return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Yükleniyor...</h1>
        <div>İçerik yükleniyor...</div>
      </div>
    </div>
  );
  
  if (!post) return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">İçerik Bulunamadı</h1>
        <div>Üzgünüz, aradığınız içerik bulunamadı.</div>
      </div>
    </div>
  );

  // Ensure we have a valid title for the H1
  const pageTitle = post.title || "Sultanbeyli Güzellik Merkezi - Şahika Beauty";

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

      <div className="min-h-screen pb-12">
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-heading-primary mb-4">{pageTitle}</h1>
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
                {/* Comprehensive content for SEO */}
                <div className="text-gray-700 leading-relaxed mb-8" itemProp="articleBody">
                  <h2 id="sultanbeyli-lazer-epilasyon" className="text-3xl font-bold text-heading-primary mb-6">Sultanbeyli'de Lazer Epilasyon Hizmetleri</h2>
                  
                  <p className="mb-6 text-lg">
                    Sultanbeyli'de bulunan Şahika Beauty güzellik merkezimiz, 8 yılı aşkın deneyimiyle bölgenin en güvenilir güzellik merkezi olarak hizmet vermektedir. 
                    <strong>Lazer epilasyon</strong>, <strong>cilt bakımı</strong>, <strong>kalıcı makyaj</strong> ve <strong>bölgesel incelme</strong> gibi profesyonel güzellik hizmetlerimizle 
                    müşterilerimizin güzellik yolculuğunda yanlarında yer alıyoruz.
                  </p>

                  <h3 id="hazirlik-sureci" className="text-2xl font-semibold text-gray-800 mb-4">Lazer Epilasyon Hazırlık Süreci</h3>
                  <p className="mb-4">
                    Lazer epilasyon seansından önce, uzman ekibimiz sizinle detaylı bir konsültasyon gerçekleştirir. Bu süreçte cilt tipiniz, tüy yapınız ve 
                    genel sağlık durumunuz değerlendirilir. <em>FDA onaylı son teknoloji lazer cihazlarımız</em> ile güvenli ve etkili sonuçlar elde ediyoruz.
                  </p>

                  <h3 id="seans-sureci" className="text-2xl font-semibold text-gray-800 mb-4">Seans Süreci Nasıl İşliyor?</h3>
                  <p className="mb-4">
                    Lazer epilasyon seanslarımız ortalama 30-60 dakika sürmektedir. Seans öncesi cilt temizliği yapılır ve koruyucu gözlük takılır. 
                    Lazer ışını, tüy köklerindeki melanin pigmentini hedef alarak tüy üretimini durdurur. <strong>Alexandrite</strong> ve <strong>Diode</strong> 
                    lazer teknolojilerimiz sayesinde tüm cilt tiplerinde başarılı sonuçlar alıyoruz.
                  </p>

                  <h2 id="sonrasi-bakim" className="text-3xl font-bold text-heading-secondary mb-6">Lazer Epilasyon Sonrası Bakım</h2>
                  <p className="mb-4">
                    Seans sonrası cildinizde hafif kızarıklık ve hassasiyet normaldir. Bu durum genellikle 24-48 saat içinde geçer. 
                    <strong>Güneş koruyucu kullanımı</strong>, <strong>düzenli nemlendirme</strong> ve <strong>sıcak su ile yıkanmama</strong> gibi 
                    bakım önerilerimizi takip ederek optimal sonuçlar elde edebilirsiniz.
                  </p>

                  <h2 id="fiyat-avantajlari" className="text-3xl font-bold text-heading-accent mb-6">Sultanbeyli Şube Fiyat Avantajları</h2>
                  <p className="mb-4">
                    Şahika Beauty Sultanbeyli şubemizde, kaliteli hizmeti uygun fiyatlarla sunuyoruz. <strong>Tam vücut lazer epilasyon paketimiz</strong> 
                    piyasa fiyatlarından %30 daha uygun olup, <strong>6 seanslık paketlerde</strong> ek indirimler sunuyoruz. 
                    <em>Şeffaf fiyatlandırma</em> politikamız sayesinde gizli maliyet yoktur.
                  </p>

                  <h2 id="musteri-deneyimleri" className="text-3xl font-bold text-heading-primary mb-6">Müşteri Deneyimleri ve Başarı Hikayeleri</h2>
                  <p className="mb-6">
                    Sultanbeyli'deki müşterilerimizin %95'i hizmetlerimizden memnun kalmaktadır. <strong>247+ doğrulanmış müşteri yorumumuz</strong> 
                    ve <strong>4.8/5 ortalama puanımız</strong> kalitemizin göstergesidir. Müşterilerimizin başarı hikayeleri, 
                    güzellik yolculuklarında yanlarında olduğumuzun en güzel kanıtıdır.
                  </p>

                  <div className="bg-blue-50 p-6 rounded-xl mb-8">
                    <h4 className="text-xl font-semibold text-blue-800 mb-3">💡 Uzman Tavsiyesi</h4>
                    <p className="text-blue-700">
                      "Lazer epilasyon için en uygun dönem kış aylarıdır. Güneş ışınlarına maruz kalmadan yapılan seanslar, 
                      daha etkili sonuçlar verir. Sultanbeyli şubemizde ücretsiz konsültasyon ile kişiye özel plan hazırlıyoruz."
                      <br />
                      <strong>- Uzm. Şahika Hanım, Güzellik Uzmanı</strong>
                    </p>
                  </div>
                </div>

                {/* Original content if exists */}
                {post.content && (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed" />
                )}

                {/* Related Service */}
                {relatedService && <RelatedService service={relatedService} />}

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
    backgroundImage: "url('/video-thumbnail.jpg')",
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
                          <div className="p-6 pt-0 text-gray-600">
                            <p>{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>

                <LocalCitations />

                {sultanbeyliBlogData.seasonalContent && (
                  <SeasonalContent content={sultanbeyliBlogData.seasonalContent} />
                )}

                {/* Yorumlar ve SEO Footer */}
                <section className="not-prose my-16 pt-8 border-t border-gray-100">
                  <h3 className="text-3xl font-bold text-heading-primary mb-8 text-center">
                    Müşteri Yorumları (4.8/5, 247 Yorum)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sultanbeyliBlogData.reviews.slice(0, 4).map((review, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
                        <div className="flex items-center mb-3">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-2" />
                          <span className="font-bold text-lg">{review.rating}.0</span>
                          <span className="ml-3 text-sm text-gray-500">
                            {review.author} - {review.date}
                          </span>
                          </div>
                        <p className="text-gray-700 italic">"{review.text}"</p>
                        </div>
                      ))}
                    </div>

                  <div className="mt-12 text-center">
                    <Link href="/yorum-ekle" className="inline-block bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                      Yorumunuzu Ekleyin
                      </Link>
                    </div>
                </section>

                {/* Hizmet Verdiğimiz Diğer Bölgeler */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <h3 className="font-bold mb-6 text-xl text-center text-heading-primary">Hizmet Verdiğimiz Diğer Bölgeler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Samandıra', slug: 'samandira' },
                      { name: 'Pendik', slug: 'pendik' },
                      { name: 'Sancaktepe', slug: 'sancaktepe' },
                      { name: 'Kurtköy', slug: 'kurtkoy' }
                    ].map((region, index) => (
                      <Link
                        key={index}
                        href={`/bolgeler/${region.slug}`}
                        className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Ş</span>
                    </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                              {region.name} Güzellik Merkezi
                              </h4>
                            <p className="text-sm text-gray-600">
                              {region.name} bölgesinde profesyonel güzellik hizmetleri
                            </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* SEO Footer Links */}
                <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
                  <h3 className="font-bold mb-4 text-lg">Diğer Sultanbeyli Hizmetlerimiz</h3>
                  <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <li><Link href="/sultanbeyli/lazer-epilasyon" className="text-link-primary hover:text-link-hover hover:underline">Sultanbeyli Lazer Epilasyon</Link></li>
                    <li><Link href="/sultanbeyli/cilt-bakimi" className="text-link-primary hover:text-link-hover hover:underline">Sultanbeyli Cilt Bakımı</Link></li>
                    <li><Link href="/sultanbeyli/kalici-makyaj" className="text-link-primary hover:text-link-hover hover:underline">Sultanbeyli Kalıcı Makyaj</Link></li>
                    <li><Link href="/sultanbeyli/bolgesel-incelme" className="text-link-primary hover:text-link-hover hover:underline">Sultanbeyli Bölgesel İncelme</Link></li>
                    <li><Link href="/sultanbeyli/tirnak-protez" className="text-link-primary hover:text-link-hover hover:underline">Sultanbeyli Tırnak Protez</Link></li>
                  </ul>
                </div>
              </article>
            </motion.main>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
              className="lg:col-span-1 space-y-12"
            >
              {/* Randevu Card */}
              <div className="sticky top-28 bg-primary-50 p-6 rounded-2xl shadow-lg border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-primary-900">Randevu Alın</h3>
                </div>
                <p className="text-primary-700 mb-6">
                  Şahika Beauty Sultanbeyli şubesine kolayca randevu oluşturun.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+905304348349"
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-md"
                  >
                    <Phone className="w-5 h-5" />
                    Hemen Ara
                  </a>
                  <Link
                    href="/rezervasyon"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <Calendar className="w-5 h-5" />
                    Online Randevu Al
                  </Link>
                  </div>
                </div>

              {/* Latest Posts */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Popüler Yazılar</h3>
                  <ul className="space-y-4">
                  {/* Dummy popular posts */}
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-primary">01</span>
                    <Link href="/blog/cilt-bakiminda-yeni-trendler" className="text-link-primary hover:text-link-hover hover:underline font-medium">
                      Cilt Bakımında 2024'ün En Yeni Trendleri
                        </Link>
                    </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-primary">02</span>
                    <Link href="/blog/lazer-epilasyon-seans-sayisi" className="text-link-primary hover:text-link-hover hover:underline font-medium">
                      Lazer Epilasyon Kaç Seans Sürer?
                        </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-primary">03</span>
                    <Link href="/blog/dudak-renklendirme-kaliciligi" className="text-link-primary hover:text-link-hover hover:underline font-medium">
                      Kalıcı Dudak Renklendirme Ne Kadar Kalıcı?
                    </Link>
                    </li>
                  </ul>
                </div>

            </motion.aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedBlogDetail;