'use client'; // Bu bileşenin tarayıcıda çalışması gerektiğini belirtir.

import Script from 'next/script';
import React from 'react';

/**
 * Elfsight Google Reviews Widget Bileşeni
 * * Verilen gömme kodunu (embed code) kullanarak yorum widget'ını yükler.
 * next/script ile script yüklemesi optimize edilir.
 */




/**
 * Trustmary Widget Bileşeni
 * Verilen script URL'sini kullanarak widget'ı sayfaya yükler.
 * Trustmary, script'i yüklediğinde DOM'a otomatik olarak kendi içeriğini ekler.
 */
export const TrustmaryWidget: React.FC = () => {
  // Trustmary'den aldığınız widget script URL'si
  const WIDGET_SCRIPT_URL = "https://widget.trustmary.com/-s-UFTEKo";

  return (
    <div className="my-10">
      
      {/* Trustmary script'ini yükleme.
        Trustmary script'i genellikle bir ana div'e ihtiyaç duymaz, 
        doğrudan DOM'a widget'ı ekler.
      */}
      <Script 
        src={WIDGET_SCRIPT_URL}
        // strategy="lazyOnload" script'in sayfa yüklenmesi bittikten sonra yüklenmesini sağlar.
        // Bu, sayfanın ana içeriğinin hızını artırır.
        strategy="lazyOnload" 
        async
        onLoad={() => {
          // İsteğe bağlı: Script yüklendiğinde konsola bilgi yazdırabilirsiniz.
          console.log("Trustmary widget scripti başarıyla yüklendi.");
        }}
        onError={(e) => {
          console.error("Trustmary script yüklenirken hata oluştu:", e);
        }}
      />
    </div>
  );
};
export default function HomePage() {
  return (
    <main className="min-h-screen">
      
      <header className="bg-green-700 text-white p-12 text-center">
        <h1 className="text-4xl font-extrabold">Dijital Çözümlerimiz</h1>
      </header>
      
      {/* Trustmary widget'ını eklediğiniz yer */}
      <section className="container mx-auto max-w-6xl px-4">
        <TrustmaryWidget />
      </section>

      <footer className="bg-gray-800 text-white p-10 text-center">
        <p>© 2025 İşletme Adı</p>
      </footer>
    </main>
  );
}