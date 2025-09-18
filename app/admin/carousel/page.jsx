"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { CarouselTableRowSkeleton } from "@/components/Skeletons"

export default function CarouselYonetim() {
  const [slides, setSlides] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    order: 1,
    active: true,
  })

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/carousel")
      const data = await response.json()

      if (data.success) {
        setSlides(data.data)
      } else {
        toast.error("Carousel verileri yüklenirken hata oluştu.")
      }
    } catch (error) {
      console.error("Carousel verileri getirirken hata:", error)
      toast.error("Carousel verileri yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlides()
  }, [])

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Lütfen geçerli bir resim dosyası seçin.")
      return
    }

    setUploading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("file", file)
      formDataToSend.append("type", "carousel")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok) {
        const imageUrl =
          data.url ||
          data.pathname ||
          data.downloadUrl ||
          (data.blob && (data.blob.url || data.blob.pathname || data.blob.downloadUrl))

        if (imageUrl) {
          setFormData((prev) => ({ ...prev, image: imageUrl }))
          toast.success("Carousel görseli başarıyla yüklendi!")
        } else {
          throw new Error("Yüklenen dosyanın URL bilgisi alınamadı")
        }
      } else {
        throw new Error(data.error || "Yükleme başarısız")
      }
    } catch (error) {
      console.error("Yükleme hatası:", error)
      toast.error(`Resim yüklenirken hata oluştu: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      order: slides.length + 1,
      active: true,
    })
    setEditingSlide(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingSlide ? `/api/carousel` : "/api/carousel"
      const method = editingSlide ? "PUT" : "POST"

      const submitData = editingSlide ? { ...formData, id: editingSlide.id } : formData

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchSlides()
        resetForm()
        toast.success(editingSlide ? "Slide başarıyla güncellendi!" : "Slide başarıyla oluşturuldu!")
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error("Form gönderilirken hata:", error)
      toast.error("Form gönderilirken hata oluştu")
    }
  }

  // Düzenleme başlat
  const handleEdit = (slide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      image: slide.image || "",
      order: slide.order || 1,
      active: slide.active !== false,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Bu slide silinsin mi?")) return

    try {
      const response = await fetch(`/api/carousel/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        await fetchSlides()
        toast.success("Slide başarıyla silindi!")
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error("Slide silinirken hata:", error)
      toast.error("Slide silinirken hata oluştu")
    }
  }

  // Sıralama değiştir
  const handleOrderChange = async (id, newOrder) => {
    try {
      const response = await fetch("/api/carousel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, order: newOrder }),
      })

      const data = await response.json()

      if (data.success) {
        await fetchSlides()
        toast.success("Sıralama güncellendi!")
      }
    } catch (error) {
      console.error("Sıralama güncellenirken hata:", error)
      toast.error("Sıralama güncellenirken hata oluştu")
    }
  }

  // Yeni ekle butonu
  const handleAddNew = () => {
    resetForm()
    setShowForm(true)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseInt(value) || 0 : value,
    }))
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-muted rounded w-48 mb-2" />
            <div className="h-4 bg-muted rounded w-80" />
          </div>
          <div className="h-10 bg-muted rounded w-32" />
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/20 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Sıra</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Görsel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Başlık</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Alt Başlık</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Açıklama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Durum</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <CarouselTableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2 text-foreground">Ana Sayfa Carousel Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Ana sayfadaki carousel slide'larını yönetin ve düzenleyin</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary">
          Yeni Slide Ekle
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Sıra</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Görsel</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Başlık</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Alt Başlık</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Açıklama</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Durum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {slides
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((slide, index) => (
                  <tr key={slide.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-medium">{slide.order || index + 1}</span>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleOrderChange(slide.id, (slide.order || index + 1) - 1)}
                            disabled={index === 0}
                            className="text-xs px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleOrderChange(slide.id, (slide.order || index + 1) + 1)}
                            disabled={index === slides.length - 1}
                            className="text-xs px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-16 h-10 bg-muted rounded-lg overflow-hidden">
                        {slide.image ? (
                          <img
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                            Görsel Yok
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground max-w-[200px] truncate">{slide.title}</td>
                    <td className="px-6 py-4 text-foreground max-w-[200px] truncate">{slide.subtitle}</td>
                    <td className="px-6 py-4 text-muted-foreground max-w-[250px] truncate">{slide.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          slide.active !== false
                            ? "bg-green-500/20 text-green-400"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {slide.active !== false ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(slide)}
                          className="bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1 rounded text-sm transition-colors"
                        >
                          Düzenle
                        </button>
                        <button onClick={() => handleDelete(slide.id)} className="btn-destructive text-sm px-3 py-1">
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {slides.length === 0 && <div className="text-center py-8 text-muted-foreground">Hiç slide bulunamadı</div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              {editingSlide ? "Slide Düzenle" : "Yeni Slide Ekle"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Başlık *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                    placeholder="•CİLT BAKIMI•"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Sıra *</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="input-field w-full"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-card-foreground mb-2">Alt Başlık *</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                    placeholder="Yeni Bir Sen Hayali Değil"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-card-foreground mb-2">Açıklama *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="input-field w-full"
                    placeholder="Yaşınızı sorduklarında sadece gülümseyini"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-card-foreground mb-2">Görsel *</label>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Görsel URL"
                      className="input-field w-full"
                    />
                    <div className="flex items-center gap-4">
                      <label className="btn-primary cursor-pointer">
                        {uploading ? "Yükleniyor..." : "Dosya Yükle"}
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="image/*"
                          disabled={uploading}
                        />
                      </label>
                      {formData.image && (
                        <div className="w-20 h-12 rounded overflow-hidden border border-border">
                          <img
                            src={formData.image || "/placeholder.svg"}
                            alt="Önizleme"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active"
                      name="active"
                      checked={formData.active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-card-foreground">
                      Aktif (Carousel'da göster)
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "İşleniyor..." : editingSlide ? "Slide Güncelle" : "Slide Oluştur"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
