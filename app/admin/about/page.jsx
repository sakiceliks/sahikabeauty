"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

export default function AboutManagement() {
  const [aboutData, setAboutData] = useState({
    title: "Hakkımızda",
    subtitle: "13 Yıllık Deneyimimizle",
    description: "13 yıllık deneyimimizle cilt sağlığınızı korumak ve güzelliğinizi ön plana çıkarmak için buradayız. Doğal içerikli ürünler ve modern cihazlarla kişiye özel çözümler sunuyoruz.",
    mainImage: "/assets/about/img.jpg",
    mission: "Sultanbeyli ve çevresinde yaşayan kadınların güzellik ve bakım ihtiyaçlarını en kaliteli hizmet anlayışıyla karşılamak, modern teknoloji ve doğal ürünleri harmanlayarak cilt sağlığınızı korumaktır.",
    stats: [
      { number: "13+", label: "Yıl Deneyim" },
      { number: "35.000+", label: "Mutlu Müşteri" },
      { number: "97%", label: "Doğal İçerik" },
      { number: "100%", label: "Müşteri Memnuniyeti" }
    ],
    features: [
      {
        title: "Profesyonel Ekip",
        description: "Alanında uzman estetisyenlerimizle hizmet veriyoruz.",
        icon: "👩‍⚕️"
      },
      {
        title: "Doğal Ürünler",
        description: "%97 doğal içerikli ürünlerle cilt sağlığınızı koruyoruz.",
        icon: "🌿"
      },
      {
        title: "Modern Teknoloji",
        description: "En son teknoloji cihazlarla profesyonel hizmet sunuyoruz.",
        icon: "⚡"
      }
    ],
    whyChooseUs: [
      "13 yıllık sektör deneyimi ve uzman kadro",
      "%97 doğal içerikli, cilt dostu ürünler",
      "Kişiye özel bakım programları",
      "Modern cihazlar ve hijyenik ortam",
      "Uygun fiyat politikası"
    ],
    address: "Abdurrahmangazi, Fatih Blv. No:73/1, Sultanbeyli/İstanbul",
    phone: "+90 530 434 83 49",
    email: "info@sahikabeauty.com",
    foundingYear: "2011",
    socialMedia: {
      instagram: "https://www.instagram.com/sahikabeauty",
      whatsapp: "https://wa.me/905304348349"
    }
  })

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      setLoading(true)
      // API'den hakkımızda verilerini çek
      const response = await fetch("/api/about")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAboutData(data.data)
        }
      }
    } catch (error) {
      console.error("Hakkımızda verileri yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file, type) => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setAboutData(prev => ({
          ...prev,
          [type]: result.url
        }))
        toast.success("Görsel başarıyla yüklendi!")
      } else {
        toast.error("Görsel yüklenirken hata oluştu")
      }
    } catch (error) {
      console.error("Görsel yükleme hatası:", error)
      toast.error("Görsel yüklenirken hata oluştu")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Hakkımızda sayfası başarıyla güncellendi!")
        setShowForm(false)
      } else {
        toast.error("Güncelleme sırasında hata oluştu")
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error)
      toast.error("Güncelleme sırasında hata oluştu")
    }
  }

  const handleInputChange = (field, value) => {
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleStatsChange = (index, field, value) => {
    setAboutData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }))
  }

  const handleFeaturesChange = (index, field, value) => {
    setAboutData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-700 text-xl">Yükleniyor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Hakkımızda Sayfası Yönetimi</h1>
            <p className="text-indigo-100 text-lg sm:text-xl mb-4 sm:mb-6">Hakkımızda sayfasındaki tüm içerikleri ve görselleri düzenleyin</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 sm:gap-4 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white/20 w-full sm:w-auto"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Düzenle
          </button>
        </div>
      </div>

      {/* Current Content Preview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mevcut İçerik Önizlemesi</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{aboutData.title}</h3>
              <p className="text-lg text-indigo-600 font-semibold mb-4">{aboutData.subtitle}</p>
              <p className="text-gray-700">{aboutData.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div>
            <img 
              src={aboutData.mainImage} 
              alt="Hakkımızda" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Misyon</h3>
          <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{aboutData.mission}</p>
        </div>

        {/* Features */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aboutData.features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {aboutData.whyChooseUs.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Adres</h4>
              <p className="text-gray-600">{aboutData.address}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Telefon</h4>
              <p className="text-gray-600">{aboutData.phone}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">E-posta</h4>
              <p className="text-gray-600">{aboutData.email}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Kuruluş Yılı</h4>
              <p className="text-gray-600">{aboutData.foundingYear}</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sosyal Medya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Instagram</h4>
              <p className="text-gray-600">{aboutData.socialMedia?.instagram || "Belirtilmemiş"}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
              <p className="text-gray-600">{aboutData.socialMedia?.whatsapp || "Belirtilmemiş"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hakkımızda Sayfasını Düzenle</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6 sm:space-y-8">
              {/* Basic Information */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Temel Bilgiler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Başlık *</label>
                    <input
                      type="text"
                      value={aboutData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Alt Başlık *</label>
                    <input
                      type="text"
                      value={aboutData.subtitle}
                      onChange={(e) => handleInputChange("subtitle", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Açıklama *</label>
                  <textarea
                    value={aboutData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base h-32"
                    required
                  />
                </div>
              </div>

              {/* Main Image Upload */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Ana Görsel</h4>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Ana Görsel</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => handleImageUpload(e.target.files[0], "mainImage")}
                      className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                      </div>
                    )}
                  </div>
                  {aboutData.mainImage && (
                    <div className="mt-4">
                      <img
                        src={aboutData.mainImage}
                        alt="Ana görsel"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">İstatistikler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {aboutData.stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-3">İstatistik {index + 1}</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sayı</label>
                          <input
                            type="text"
                            value={stat.number}
                            onChange={(e) => handleStatsChange(index, "number", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Etiket</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatsChange(index, "label", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Özellikler</h4>
                <div className="space-y-4">
                  {aboutData.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-3">Özellik {index + 1}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">İkon</label>
                          <input
                            type="text"
                            value={feature.icon}
                            onChange={(e) => handleFeaturesChange(index, "icon", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => handleFeaturesChange(index, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                          <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => handleFeaturesChange(index, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Misyon</h4>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Misyon Metni</label>
                  <textarea
                    value={aboutData.mission}
                    onChange={(e) => handleInputChange("mission", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base h-32"
                  />
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Neden Bizi Tercih Etmelisiniz?</h4>
                <div className="space-y-3">
                  {aboutData.whyChooseUs.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newWhyChooseUs = [...aboutData.whyChooseUs]
                          newWhyChooseUs[index] = e.target.value
                          handleInputChange("whyChooseUs", newWhyChooseUs)
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newWhyChooseUs = aboutData.whyChooseUs.filter((_, i) => i !== index)
                          handleInputChange("whyChooseUs", newWhyChooseUs)
                        }}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newWhyChooseUs = [...aboutData.whyChooseUs, ""]
                      handleInputChange("whyChooseUs", newWhyChooseUs)
                    }}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
                  >
                    Yeni Madde Ekle
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">İletişim Bilgileri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Adres</label>
                    <input
                      type="text"
                      value={aboutData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Telefon</label>
                    <input
                      type="text"
                      value={aboutData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={aboutData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Kuruluş Yılı</label>
                    <input
                      type="text"
                      value={aboutData.foundingYear}
                      onChange={(e) => handleInputChange("foundingYear", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Sosyal Medya</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={aboutData.socialMedia?.instagram || ""}
                      onChange={(e) => handleInputChange("socialMedia", { ...aboutData.socialMedia, instagram: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">WhatsApp</label>
                    <input
                      type="url"
                      value={aboutData.socialMedia?.whatsapp || ""}
                      onChange={(e) => handleInputChange("socialMedia", { ...aboutData.socialMedia, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Yükleniyor...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Kaydet
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
