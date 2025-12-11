'use client';

import Script from 'next/script';

// ⚠️ ÖNEMLİ: Umami Cloud'dan aldığınız Website ID'yi buraya ekleyin
const UMANI_WEBSITE_ID = '8755aa26-bfcc-488d-b669-342c426ca7fb';

// Event tracking function for Umami
export const trackUmamiEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

// Contact tracking function for Umami
// Phone ve WhatsApp tıklamalarını ayırt etmek için farklı event name'ler kullanıyoruz
export const trackUmamiContactClick = (
  contactType: 'phone' | 'whatsapp',
  phoneNumber: string,
  label?: string
) => {
  if (typeof window !== 'undefined' && window.umami) {
    // Phone için: phone_click, WhatsApp için: whatsapp_click
    const eventName = contactType === 'phone' ? 'phone_click' : 'whatsapp_click';
    
    window.umami.track(eventName, {
      contact_type: contactType,
      phone_number: phoneNumber,
      event_label: label || `${contactType}_${phoneNumber}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

export default function UmamiAnalytics() {
  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id={UMANI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}

// TypeScript declarations for Umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

