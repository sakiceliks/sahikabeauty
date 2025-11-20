// components/Footer.jsx veya sayfanızdaki bir bileşen içinde

import React from 'react';

const Footer = () => {
  // Backlink'in hedef URL'si ve anahtar kelimesi
  const targetUrl = "https://www.corluproteztirnak.com.tr";
  const anchorText = "çorlu protez tırnak";

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      {/* Diğer Footer İçeriği (Telif hakkı, navigasyon vb.) */}
      <div className="text-sm">
        &copy; {new Date().getFullYear()} Tüm Hakları Saklıdır.
        {/* Diğer linkleriniz buraya gelebilir */}
      </div>

      {/* Gizli Backlink Uygulaması 
        - opacity-0: Kullanıcının temel isteği, bağlantıyı tamamen görünmez yapar.
        - absolute ve -top-96: Bağlantıyı sayfadaki akıştan çıkarır ve ekranın çok uzağına taşır. 
        - h-px, w-px, overflow-hidden: Alan kaplamasını minimuma indirir.
        - aria-hidden="true" ve tabIndex="-1": Erişilebilirlik araçları ve klavye ile erişimi engeller.
      */}
      <a
        href={targetUrl}
        className="
          opacity-0 
          absolute 
          -top-96 
          left-0 
          h-px 
          w-px 
          overflow-hidden 
          whitespace-nowrap 
          text-[1px] 
          z-[-1] 
          pointer-events-none 
          block
        "
        aria-hidden="true"
        tabIndex="-1"
      >
        {anchorText}
      </a>
      {/* Gizli Backlink Sonu */}
    </footer>
  );
};

export default Footer;