"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

export default function ContactManagement() {
  const [contactData, setContactData] = useState({
    title: "İletişim",
    subtitle: "Bizimle İletişime Geçin",
    description: "Sultanbeyli'de profesyonel güzellik hizmetleri için bizimle iletişime geçin. Uzman kadromuzla cilt sağlığınız için buradayız.",
    mainImage: "/assets/about/img.jpg",
    address: {
      street: "Abdurrahmangazi, Fatih Blv. No:73/1",
      city: "34920 Sultanbeyli/İstanbul",
      full: "Abdurrahmangazi, Fatih Blv. No:73/1, 34920 Sultanbeyli/İstanbul"
    },
    phone: "+90 530 434 83 49",
    email: "info@sahikabeauty.com",
    whatsapp: "https://wa.me/905304348349",
    workingHours: {
      weekdays: "09:00 - 19:00",
      saturday: "09:00 - 18:00",
      sunday: "Kapalı"
    },
    socialMedia: {
      instagram: "https://www.instagram.com/sahikabeauty",
      facebook: "",
      twitter: ""
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.123456789!2d29.123456789!3d40.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzI0LjQiTiAyOcKwMDcnMjQuNCJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str",
    features: [
      {
        title: "Ücretsiz Danışmanlık",
        description: "İlk görüşmede ücretsiz cilt analizi ve danışmanlık hizmeti sunuyoruz.",
        icon: "💬"
      },
      {
        title: "Randevu Sistemi",
        description: "Online randevu sistemi ile kolayca randevu alabilirsiniz.",
        icon: "📅"
      },
      {
        title: "Uzman Kadro",
        description: "Alanında uzman estetisyenlerimizle profesyonel hizmet alırsınız.",
        icon: "👩‍⚕️"
      }
    ]
  })

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/contact-page")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setContactData(data.data)
        }
      }
    } catch (error) {
      console.error("İletişim verileri yüklenirken hata:", error)
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
        setContactData(prev => ({
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
      const response = await fetch("/api/contact-page", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("İletişim sayfası başarıyla güncellendi!")
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
    setContactData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent, field, value) => {
    setContactData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const handleFeaturesChange = (index, field, value) => {
    setContactData(prev => ({
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
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">İletişim Sayfası Yönetimi</h1>
            <p className="text-blue-100 text-lg sm:text-xl mb-4 sm:mb-6">İletişim sayfasındaki tüm içerikleri ve bilgileri düzenleyin</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 sm:gap-4 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white/20 w-full sm:w-auto"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">{contactData.title}</h3>
              <p className="text-lg text-blue-600 font-semibold mb-4">{contactData.subtitle}</p>
              <p className="text-gray-700">{contactData.description}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Adres</h4>
                <p className="text-gray-600">{contactData.address.full}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Telefon</h4>
                <p className="text-gray-600">{contactData.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">E-posta</h4>
                <p className="text-gray-600">{contactData.email}</p>
              </div>
            </div>
          </div>

          {/* Image */}
         
        </div>

        {/* Features */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactData.features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Çalışma Saatleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Hafta İçi</h4>
              <p className="text-gray-600">{contactData.workingHours.weekdays}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Cumartesi</h4>
              <p className="text-gray-600">{contactData.workingHours.saturday}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Pazar</h4>
              <p className="text-gray-600">{contactData.workingHours.sunday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">İletişim Sayfasını Düzenle</h2>
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
                      value={contactData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Alt Başlık *</label>
                    <input
                      type="text"
                      value={contactData.subtitle}
                      onChange={(e) => handleInputChange("subtitle", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Açıklama *</label>
                  <textarea
                    value={contactData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base h-32"
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
                      className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      </div>
                    )}
                  </div>
                  {contactData.mainImage && (
                    <div className="mt-4">
                      <img
                        src={contactData.mainImage}
                        alt="Ana görsel"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Adres Bilgileri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Sokak/Adres</label>
                    <input
                      type="text"
                      value={contactData.address.street}
                      onChange={(e) => handleNestedInputChange("address", "street", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Şehir/İlçe</label>
                    <input
                      type="text"
                      value={contactData.address.city}
                      onChange={(e) => handleNestedInputChange("address", "city", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Tam Adres</label>
                  <input
                    type="text"
                    value={contactData.address.full}
                    onChange={(e) => handleNestedInputChange("address", "full", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">İletişim Bilgileri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Telefon</label>
                    <input
                      type="text"
                      value={contactData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">WhatsApp</label>
                    <input
                      type="url"
                      value={contactData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Çalışma Saatleri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Hafta İçi</label>
                    <input
                      type="text"
                      value={contactData.workingHours.weekdays}
                      onChange={(e) => handleNestedInputChange("workingHours", "weekdays", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Cumartesi</label>
                    <input
                      type="text"
                      value={contactData.workingHours.saturday}
                      onChange={(e) => handleNestedInputChange("workingHours", "saturday", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Pazar</label>
                    <input
                      type="text"
                      value={contactData.workingHours.sunday}
                      onChange={(e) => handleNestedInputChange("workingHours", "sunday", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Özellikler</h4>
                <div className="space-y-4">
                  {contactData.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-3">Özellik {index + 1}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">İkon</label>
                          <input
                            type="text"
                            value={feature.icon}
                            onChange={(e) => handleFeaturesChange(index, "icon", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => handleFeaturesChange(index, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                          <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => handleFeaturesChange(index, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Sosyal Medya</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={contactData.socialMedia?.instagram || ""}
                      onChange={(e) => handleNestedInputChange("socialMedia", "instagram", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Facebook</label>
                    <input
                      type="url"
                      value={contactData.socialMedia?.facebook || ""}
                      onChange={(e) => handleNestedInputChange("socialMedia", "facebook", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={contactData.socialMedia?.twitter || ""}
                      onChange={(e) => handleNestedInputChange("socialMedia", "twitter", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Harita</h4>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Google Maps Embed URL</label>
                  <textarea
                    value={contactData.mapEmbed}
                    onChange={(e) => handleInputChange("mapEmbed", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base h-24"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
