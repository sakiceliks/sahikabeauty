'use client';

import React, { useEffect } from 'react';

/**
 * Trustmary Widget Bileşeni
 * Bu bileşen, Trustmary müşteri yorumları widget'ını sayfaya ekler
 * ve başlığı Türkçe'ye çevirir
 */
export default function TrustmaryWidget() {
  // Trustmary'den aldığınız widget script URL'si
  const WIDGET_SCRIPT_URL = "https://widget.trustmary.com/-s-UFTEKo";

  // Widget başlığını Türkçe'ye çeviren ve orijinal başlığı gizleyen kod
  const customWidgetLogic = `
    (function() {
        // Orijinal Trustmary başlığını gizleyen CSS
        const style = document.createElement('style');
        style.innerHTML = '.WidgetTitle__Header-sc-c581efe-2 { display: none !important; }';
        document.head.appendChild(style);

        // Diğer dinamik metinleri çevirmek için fonksiyon
        function translateDynamicText() {
            // Örnek: "Write a review" butonunu çevirmek
            const button = document.querySelector('.some-trustmary-button-class');
            if (button && button.textContent.includes('Write a review')) {
                button.textContent = 'Yorum Yaz';
            }
        }

        // Widget yüklenene kadar her 300ms'de bir kontrol et
        const checkInterval = setInterval(translateDynamicText, 300);

        // 7 saniye sonra kontrol etmeyi durdur
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 7000);

    })();
  `;

  // Bileşen yüklendiğinde script'leri DOM'a ekle
  useEffect(() => {
    
    // Script ekleme yardımcı fonksiyonu
    const appendScript = (src, innerHTML = null, id = null) => {
        // Script zaten varsa tekrar ekleme
        if (id && document.getElementById(id)) return null;

        const script = document.createElement('script');
        if (src) {
            script.src = src;
            script.async = true;
        }
        if (id) {
            script.id = id;
        }
        if (innerHTML) {
            script.innerHTML = innerHTML;
        }
        
        document.body.appendChild(script);
        return script;
    };

    // 1. Trustmary Ana Script'ini Ekle
    const mainScript = appendScript(WIDGET_SCRIPT_URL, null, 'trustmary-main-script');

    // 2. Özel Çeviri ve CSS Script'ini Ekle
    const logicScript = appendScript(null, customWidgetLogic, 'trustmary-custom-logic');

    // Bileşen kaldırıldığında script'leri temizle
    return () => {
        if (mainScript && mainScript.parentNode) {
            mainScript.parentNode.removeChild(mainScript);
        }
        if (logicScript && logicScript.parentNode) {
            logicScript.parentNode.removeChild(logicScript);
        }
    };
    
  }, []); // Boş bağımlılık dizisi - sadece bir kez çalışır

  return (
    <div className="my-10 p-6 bg-white shadow-xl rounded-xl">
      {/* Türkçe Başlık - Trustmary'nin başlığı CSS ile gizleniyor */}
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6 border-b pb-4">
      </h2>
      
      {/* Trustmary widget'ı buraya otomatik olarak yüklenecek */}
      <div id="trustmary-widget-container">
        <p className="text-center text-gray-500 italic">
        </p>
      </div>
    </div>
  );
}