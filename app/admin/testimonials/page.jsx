"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"
import { Star, Check, X, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"
import { services } from "@/data/services"

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [uploadingBeforeImage, setUploadingBeforeImage] = useState(false)
  const [uploadingAfterImage, setUploadingAfterImage] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 5,
    serviceId: "",
    serviceName: "",
    beforeImage: "",
    afterImage: "",
    isApproved: false,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [selectedService])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const url = selectedService ? `/api/testimonial?serviceId=${selectedService}` : "/api/testimonial"

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setTestimonials(data.data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      toast.error("Yorumlar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const selectedServiceData = services.find((s) => s.id === Number.parseInt(formData.serviceId))

      const testimonialData = {
        ...formData,
        serviceId: Number.parseInt(formData.serviceId),
        serviceName: selectedServiceData?.title || "",
      }

      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Yorum başarıyla eklendi")
        setShowForm(false)
        setFormData({
          name: "",
          comment: "",
          rating: 5,
          serviceId: "",
          serviceName: "",
          beforeImage: "",
          afterImage: "",
          isApproved: false,
        })
        fetchTestimonials()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error adding testimonial:", error)
      toast.error("Yorum eklenirken hata oluştu")
    }
  }

  const handleApprove = async (id, isApproved) => {
    try {
      const response = await fetch(`/api/testimonial/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(`Yorum ${isApproved ? "onaylandı" : "onayı kaldırıldı"}`)
        fetchTestimonials()
      }
    } catch (error) {
      console.error("Error updating testimonial:", error)
      toast.error("Yorum güncellenirken hata oluştu")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Bu yorumu silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/testimonial/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Yorum silindi")
        fetchTestimonials()
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast.error("Yorum silinirken hata oluştu")
    }
  }

  const handleImageUpload = async (file, type) => {
    if (!file) return

    // Set appropriate loading state
    if (type === "beforeImage") {
      setUploadingBeforeImage(true)
    } else if (type === "afterImage") {
      setUploadingAfterImage(true)
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", "testimonial") // Testimonial için özel type

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          [type]: data.url,
        }))
        toast.success("Fotoğraf yüklendi")
      } else {
        toast.error(data.error || "Fotoğraf yüklenirken hata oluştu")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Fotoğraf yüklenirken hata oluştu")
    } finally {
      // Reset loading state
      if (type === "beforeImage") {
        setUploadingBeforeImage(false)
      } else if (type === "afterImage") {
        setUploadingAfterImage(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Müşteri Yorumları</h1>
            <p className="text-green-100 text-lg sm:text-xl mb-4 sm:mb-6">Before/After fotoğrafları ile müşteri deneyimlerini yönetin</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-sm sm:text-base font-semibold">Toplam: {testimonials.length} yorum</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-sm sm:text-base font-semibold">Onaylanmış: {testimonials.filter(t => t.isApproved).length}</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-white text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 sm:gap-4 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white/20 w-full sm:w-auto"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Yorum Ekle
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
        >
          <option value="">Tüm Hizmetler</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Yeni Yorum Ekle</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-base font-semibold mb-2 text-gray-700">Müşteri Adı *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base"
                    placeholder="Müşteri adını girin"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold mb-2 text-gray-700">Hizmet *</label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, serviceId: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base"
                    required
                  >
                    <option value="">Hizmet Seçin</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-700">Yorum *</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base h-32"
                  placeholder="Müşteri yorumunu girin"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-semibold mb-2 text-gray-700">Puan *</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number.parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Yıldız
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold mb-2 text-gray-700">Öncesi Fotoğraf</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingBeforeImage}
                      onChange={(e) => handleImageUpload(e.target.files[0], "beforeImage")}
                      className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base ${uploadingBeforeImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {uploadingBeforeImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                      </div>
                    )}
                  </div>
                  {formData.beforeImage && (
                    <div className="mt-2">
                      <Image
                        src={formData.beforeImage || "/placeholder.svg"}
                        alt="Before"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sonrası Fotoğraf</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingAfterImage}
                      onChange={(e) => handleImageUpload(e.target.files[0], "afterImage")}
                      className={`w-full px-3 py-2 border rounded-md ${uploadingAfterImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {uploadingAfterImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      </div>
                    )}
                  </div>
                  {formData.afterImage && (
                    <div className="mt-2">
                      <Image
                        src={formData.afterImage || "/placeholder.svg"}
                        alt="After"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="approved"
                  checked={formData.isApproved}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isApproved: e.target.checked }))}
                  className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="approved" className="text-base font-semibold text-gray-700">
                  Onaylanmış olarak ekle
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={uploadingBeforeImage || uploadingAfterImage}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingBeforeImage || uploadingAfterImage ? (
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

      {/* Testimonials List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz yorum bulunmuyor</h3>
            <p className="text-gray-600">İlk müşteri yorumunu eklemek için yukarıdaki butona tıklayın.</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{testimonial.serviceName}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({testimonial.rating}/5)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      testimonial.isApproved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonial.isApproved ? "Onaylı" : "Beklemede"}
                    </span>
                  </div>
                </div>

                <p className="text-sm mb-4 italic">"{testimonial.comment}"</p>

                {(testimonial.beforeImage || testimonial.afterImage) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonial.beforeImage && (
                      <div>
                        <p className="text-sm font-medium mb-2">Öncesi</p>
                        <Image
                          src={testimonial.beforeImage || "/placeholder.svg"}
                          alt="Before"
                          width={200}
                          height={200}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                    {testimonial.afterImage && (
                      <div>
                        <p className="text-sm font-medium mb-2">Sonrası</p>
                        <Image
                          src={testimonial.afterImage || "/placeholder.svg"}
                          alt="After"
                          width={200}
                          height={200}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {new Date(testimonial.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(testimonial._id, !testimonial.isApproved)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                        testimonial.isApproved 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {testimonial.isApproved ? (
                        <>
                          <X className="w-4 h-4" />
                          Onayı Kaldır
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Onayla
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => handleDelete(testimonial._id)}
                      className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
