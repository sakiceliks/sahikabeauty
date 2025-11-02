'use client';

import TrustmaryWidget from '@/components/TrustmaryWidget';

/**
 * Trustmary Widget Sayfası
 * Bu sayfa sadece Trustmary widget'ını göstermek için
 */
export default function WidgetPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      <header className="bg-blue-700 text-white p-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Trustmary Widget Sayfası</h1>
        <p className="mt-2 text-blue-200">Müşteri yorumları widget entegrasyonu</p>
      </header>
      
      {/* Trustmary Widget Bileşeni */}
      <section className="container mx-auto max-w-4xl px-4 mt-12">
        <TrustmaryWidget />
      </section>

      <footer className="bg-gray-800 text-white p-6 text-center mt-16">
        <p>© 2025 Şahika Beauty - Sultanbeyli Güzellik Merkezi</p>
      </footer>
    </main>
  );
}