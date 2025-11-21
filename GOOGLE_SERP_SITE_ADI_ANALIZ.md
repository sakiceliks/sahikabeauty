# Şahika Beauty - Google SERP Site Adı Sorunu Detaylı Analiz

## Tespit Edilen Sorunlar

### 1. ✅ WebSite JSON-LD Schema Eksikliği (DÜZELTİLDİ)
**Sorun**: `layout.jsx` dosyasında WebSite schema yoktu, sadece Organization ve LocalBusiness schema'ları vardı.

**Çözüm**: `generateWebsiteSchema()` import edildi ve layout.jsx'e eklendi.

**Önemi**: Google, site adını belirlerken WebSite schema'daki `name` alanını kullanır. Bu schema olmadan Google domain adını kullanabilir.

### 2. ⚠️ Metadata Export vs Manuel Head Tag Karışıklığı
**Durum**: 
- `layout.jsx`'de hem `metadata` export'u var (Next.js App Router standardı)
- Hem de manuel `<head>` tag'i içinde meta tagler var

**Analiz**:
- Next.js App Router'da `metadata` export'u otomatik olarak `<head>`'e eklenir
- Manuel `<head>` tag'i kullanımı metadata export ile çakışabilir
- Ancak Next.js her ikisini de destekler, metadata export önceliklidir

**Mevcut Durum**:
```javascript
// ✅ Metadata export (Next.js App Router standardı)
export const metadata = {
  applicationName: "Şahika Beauty",
  openGraph: {
    siteName: "Şahika Beauty",
  },
  // ...
}

// ✅ Manuel head tag (ek güvence için)
<head>
  <meta name="application-name" content="Şahika Beauty" />
  <meta property="og:site_name" content="Şahika Beauty" />
  // ...
</head>
```

### 3. ✅ JSON-LD Schema'lar Doğru
**Kontrol Edilen Schema'lar**:
- ✅ Organization schema: `name: "Şahika Beauty"` ✓
- ✅ LocalBusiness schema: `name: "Şahika Beauty"` ✓
- ✅ WebSite schema: `name: "Şahika Beauty"` ✓ (ŞİMDİ EKLENDİ)

## Yapılan Düzeltmeler

### 1. WebSite Schema Eklendi
```javascript
// layout.jsx
import { generateWebsiteSchema } from "@/lib/seo-schemas"

const websiteSchema = generateWebsiteSchema()

// Head içinde
<JsonLd data={websiteSchema} />
```

### 2. Mevcut Yapılandırmalar Doğrulandı
- ✅ `applicationName` metadata'da var
- ✅ `og:site_name` metadata'da var
- ✅ `<meta name="application-name">` head'de var
- ✅ `<meta property="og:site_name">` head'de var
- ✅ Organization JSON-LD schema var
- ✅ LocalBusiness JSON-LD schema var
- ✅ WebSite JSON-LD schema eklendi

## Olası Nedenler (Eğer Hala Domain Görünüyorsa)

### 1. Google Cache Sorunu
**Açıklama**: Google, değişiklikleri algılaması ve arama sonuçlarını güncellemesi 1-4 hafta sürebilir.

**Çözüm**:
- Google Search Console'da URL Denetleme aracını kullanın
- "Test Edilen Sayfa" ile canlı test yapın
- "Dizine Ekleme İsteği" gönderin

### 2. Marka Bilinirliği
**Açıklama**: Google, marka bilinirliğinizi de dikkate alır. Eğer:
- Sosyal medya varlığınız zayıfsa
- Backlink'ler azsa
- Marka aramaları yoksa

Google domain adını tercih edebilir.

**Çözüm**:
- Google My Business hesabı oluşturun/güncelleyin
- Sosyal medya profillerinizi güçlendirin
- Marka aramalarını artırın

### 3. Title Etiketi Formatı
**Mevcut Durum**:
```
title: "Şahika Beauty - Sultanbeyli Güzellik Merkezi | Lazer Epilasyon & Cilt Bakımı"
```

**Analiz**: Title formatı doğru, site adı başta yer alıyor. Bu Google'ın site adını algılamasına yardımcı olur.

### 4. Metadata Render Sorunu
**Kontrol**: Next.js build sonrası HTML çıktısını kontrol edin:

```bash
npm run build
# .next/server/app/layout.html dosyasını kontrol edin
```

**Beklenen Çıktı**:
```html
<meta name="application-name" content="Şahika Beauty" />
<meta property="og:site_name" content="Şahika Beauty" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Şahika Beauty",
  ...
}
</script>
```

## Test ve Doğrulama Adımları

### 1. Build Sonrası HTML Kontrolü
```bash
cd sahikabeauty
npm run build
# .next/server/app/layout.html dosyasını açın
# application-name ve og:site_name taglerini kontrol edin
```

### 2. Canlı Site Kontrolü
```bash
curl -s https://sultanbeyliguzellikmerkezi.com.tr | grep -i "application-name\|og:site_name"
```

**Beklenen Çıktı**:
```
<meta name="application-name" content="Şahika Beauty" />
<meta property="og:site_name" content="Şahika Beauty" />
```

### 3. Google Rich Results Test
1. [Google Rich Results Test](https://search.google.com/test/rich-results) sayfasına gidin
2. URL'nizi test edin: `https://sultanbeyliguzellikmerkezi.com.tr`
3. JSON-LD schema'larınızın doğru parse edildiğini kontrol edin
4. WebSite schema'da `name: "Şahika Beauty"` görünmeli

### 4. Google Search Console
1. Google Search Console'a giriş yapın
2. "URL Denetleme" aracını kullanın
3. Ana sayfanızın URL'sini girin
4. "Test Edilen Sayfa" bölümünde:
   - `application-name` meta tag'ini kontrol edin
   - `og:site_name` meta tag'ini kontrol edin
   - JSON-LD schema'larını kontrol edin

### 5. Schema.org Validator
1. [Schema.org Validator](https://validator.schema.org/) sayfasına gidin
2. URL'nizi test edin
3. WebSite schema'nın doğru olduğunu kontrol edin

## Sonuç ve Öneriler

### ✅ Yapılan Düzeltmeler
1. WebSite JSON-LD schema layout.jsx'e eklendi
2. Tüm meta tagler doğrulandı
3. JSON-LD schema'lar kontrol edildi

### 📋 Sonraki Adımlar
1. **Deploy**: Değişiklikleri production'a deploy edin
2. **Test**: Build sonrası HTML çıktısını kontrol edin
3. **Google Search Console**: URL Denetleme ile test edin
4. **Bekleme**: Google'ın değişiklikleri algılaması için 1-4 hafta bekleyin
5. **İzleme**: Arama sonuçlarında site adının görünmesini takip edin

### 🔍 Eğer Hala Sorun Devam Ederse
1. **Google My Business**: Hesabınızı oluşturun/güncelleyin
2. **Sosyal Medya**: Marka varlığınızı güçlendirin
3. **Backlink'ler**: Kaliteli backlink'ler edinin
4. **Marka Aramaları**: "Şahika Beauty" aramalarını artırın

### 📊 Beklenen Sonuç
Tüm yapılandırmalar doğru yapıldığında, Google arama sonuçlarında:
- ✅ Site adı: "Şahika Beauty" görünmeli
- ❌ Domain: "sultanbeyliguzellikmerkezi.com.tr" görünmemeli

**Not**: Google'ın değişiklikleri algılaması ve arama sonuçlarını güncellemesi zaman alabilir. Sabırlı olun ve Google Search Console'u düzenli olarak kontrol edin.

