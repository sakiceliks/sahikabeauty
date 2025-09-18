"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"
import { Star, Check, X, Trash2 } from "lucide-react"
import Image from "next/image"
import { services } from "@/data/services"

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState("")
  const [showForm, setShowForm] = useState(false)
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

    const formData = new FormData()
    formData.append("file", file)

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
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Fotoğraf yüklenirken hata oluştu")
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Müşteri Yorumları</h1>
          <p className="text-muted-foreground">Before/After fotoğrafları ile müşteri deneyimlerini yönetin</p>
        </div>
        <Button onClick={() => setShowForm(true)}>Yeni Yorum Ekle</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Tüm Hizmetler</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Yeni Yorum Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Müşteri Adı</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hizmet</label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, serviceId: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
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
                <label className="block text-sm font-medium mb-2">Yorum</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Puan</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number.parseInt(e.target.value) }))}
                  className="px-3 py-2 border rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Yıldız
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Öncesi Fotoğraf</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], "beforeImage")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], "afterImage")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="approved"
                  checked={formData.isApproved}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isApproved: e.target.checked }))}
                />
                <label htmlFor="approved" className="text-sm">
                  Onaylanmış olarak ekle
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Kaydet</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Testimonials List */}
      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Henüz yorum bulunmuyor.</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.serviceName}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={testimonial.isApproved ? "default" : "secondary"}>
                      {testimonial.isApproved ? "Onaylı" : "Beklemede"}
                    </Badge>
                    <Button
                      size="sm"
                      variant={testimonial.isApproved ? "outline" : "default"}
                      onClick={() => handleApprove(testimonial._id, !testimonial.isApproved)}
                    >
                      {testimonial.isApproved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

                <div className="text-xs text-muted-foreground mt-4">
                  {new Date(testimonial.createdAt).toLocaleDateString("tr-TR")}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
