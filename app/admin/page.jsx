"use client"

import { useState, useEffect } from "react"
import { categories } from "../../data/services"
import { useToast } from "../../components/ui/use-toast"
import { Edit, Trash2 } from "lucide-react"

export default function AdminPanel() {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    slug: "",
    category: "",
    title: "",
    description: "",
    image: "",
    device: { name: "", imageUrl: "" }, // Yeni yapı: name ve imageUrl içeriyor
    duration: "",
    benefits: [""],
    detailedDescription: "",
    faq: [{ question: "", answer: "" }],
    reviews: [],
    published: false,
    featured: false,
  })

  // Hizmetleri getir
  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services")
      const data = await response.json()
      if (data.success) {
        setServices(data.data)
        setFilteredServices(data.data)
      }
    } catch (error) {
      console.error("Hizmetleri getirirken hata oluştu:", error)
      toast({
        title: "Hata",
        description: "Hizmetler yüklenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  // Hizmetleri filtrele
  useEffect(() => {
    let filtered = services

    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((service) => service.category === selectedCategory)
    }

    setFilteredServices(filtered)
  }, [searchTerm, selectedCategory, services])

  // Dosya yüklemeyi yönet
  const handleFileUpload = async (e, type = "service") => {
    const file = e.target.files[0]
    if (!file) return

    if (type === "device" && !file.type.startsWith("image/")) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir resim dosyası seçin.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("file", file)
      formDataToSend.append("type", type)
      if (type === "device" && formData.device.name) {
        formDataToSend.append("deviceName", formData.device.name)
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()
      console.log("Yükleme API cevabı:", data)

      if (response.ok) {
        const imageUrl =
          data.url ||
          data.pathname ||
          data.downloadUrl ||
          (data.blob && (data.blob.url || data.blob.pathname || data.blob.downloadUrl))

        if (imageUrl) {
          if (type === "device") {
            setFormData((prev) => ({
              ...prev,
              device: {
                ...prev.device,
                imageUrl: imageUrl,
              },
            }))
            toast({
              title: "Başarılı",
              description: "Cihaz görseli başarıyla yüklendi!",
            })
          } else {
            setFormData((prev) => ({ ...prev, image: imageUrl }))
            toast({
              title: "Başarılı",
              description: "Hizmet görseli başarıyla yüklendi!",
            })
          }
        } else {
          throw new Error("Yüklenen dosyanın URL bilgisi alınamadı")
        }
      } else {
        throw new Error(data.error || "Yükleme başarısız")
      }
    } catch (error) {
      console.error("Yükleme hatası:", error)
      toast({
        title: "Hata",
        description: `Resim yüklenirken hata oluştu: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  // Form input değişikliklerini yönet
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "device.name") {
      setFormData((prev) => ({
        ...prev,
        device: {
          ...prev.device,
          name: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  // Dizi alanlarını yönet
  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  // Dizi öğesi ekle
  const addArrayItem = (field, defaultValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }))
  }

  // Dizi öğesi kaldır
  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  // FAQ değişikliklerini yönet
  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }))
  }

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      slug: "",
      category: "",
      title: "",
      description: "",
      image: "",
      device: { name: "", imageUrl: "" },
      duration: "",
      benefits: [""],
      detailedDescription: "",
      faq: [{ question: "", answer: "" }],
      reviews: [],
      published: false,
      featured: false,
    })
    setEditingService(null)
    setShowForm(false)
  }

  // Oluştur/Güncelle'yi yönet
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingService ? `/api/services/${editingService.id}` : "/api/services"
      const method = editingService ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchServices()
        resetForm()
        toast({
          title: "Başarılı",
          description: editingService ? "Hizmet başarıyla güncellendi!" : "Hizmet başarıyla oluşturuldu!",
        })
      } else {
        toast({
          title: "Hata",
          description: `Hata: ${data.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form gönderilirken hata oluştu:", error)
      toast({
        title: "Hata",
        description: "Form gönderilirken hata oluştu",
        variant: "destructive",
      })
    }
  }

  // Düzenleme
  const handleEdit = (service) => {
    setFormData({
      slug: service.slug || "",
      category: service.category || "",
      title: service.title || "",
      description: service.description || "",
      image: service.image || "",
      device: service.device || { name: "", imageUrl: "" },
      duration: service.duration || "",
      benefits: service.benefits || [""],
      detailedDescription: service.detailedDescription || "",
      faq: service.faq || [{ question: "", answer: "" }],
      reviews: service.reviews || [],
      published: service.published || false,
      featured: service.featured || false,
    })
    setEditingService(service)
    setShowForm(true)
  }

  // Silme
  const handleDelete = async (id) => {
    if (!confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        await fetchServices()
        toast({
          title: "Başarılı",
          description: "Hizmet başarıyla silindi!",
        })
      } else {
        toast({
          title: "Hata",
          description: `Hata: ${data.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Hizmet silinirken hata oluştu:", error)
      toast({
        title: "Hata",
        description: "Hizmet silinirken hata oluştu",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-foreground text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2 text-foreground">Hizmetler Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Hizmetlerinizi yönetin ve düzenleyin</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Yeni Hizmet Ekle
        </button>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Filtreler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Arama</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Hizmetlerde ara..."
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field w-full"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Başlık</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Cihaz</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Süre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Yayınlandı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Öne Çıkan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Eylemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={service.id} className={`border-b border-border hover:bg-muted/10 transition-colors`}>
                  <td className="px-6 py-4 text-foreground">{service.id}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{service.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                      {categories.find((cat) => cat.id === service.category)?.name || service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{service.slug}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 bg-muted rounded-lg overflow-hidden">
                        {service.device?.imageUrl ? (
                          <img
                            src={service.device.imageUrl || "/placeholder.svg"}
                            alt={service.device.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                            ?
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-foreground">{service.device?.name || "Gelişmiş Teknoloji"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{service.duration}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        service.published ? "bg-green-500/20 text-black" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {service.published ? "Evet" : "Hayır"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        service.featured ? "bg-blue-500/20 text-blue-400" : "bg-neutral-500/20 text-neutral-400"
                      }`}
                    >
                      {service.featured ? "Evet" : "Hayır"}
                    </span>
                  </td>
<td className="px-6 py-4">
  <div className="flex items-center gap-2">
    {/* Edit Button */}
    <button
      onClick={() => handleEdit(service)}
      className="
        inline-flex items-center gap-2 px-3 py-2
        bg-blue-50 hover:bg-blue-100 
        text-blue-600 hover:text-blue-700
        border border-blue-200 hover:border-blue-300
        rounded-lg text-sm font-medium
        transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        shadow-sm hover:shadow-md
      "
      aria-label="Hizmeti düzenle"
    >
      <Edit className="w-4 h-4" />
      <span className="hidden sm:inline">Düzenle</span>
    </button>

    {/* Delete Button */}
    <button
      onClick={() => handleDelete(service.id)}
      className="
        inline-flex items-center gap-2 px-3 py-2
        bg-red-50 hover:bg-red-100 
        text-red-600 hover:text-red-700
        border border-red-200 hover:border-red-300
        rounded-lg text-sm font-medium
        transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        shadow-sm hover:shadow-md
      "
      aria-label="Hizmeti sil"
    >
      <Trash2 className="w-4 h-4" />
      <span className="hidden sm:inline">Sil</span>
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">Hiç hizmet bulunamadı.</div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              {editingService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Kategori *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Süre</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  />
                </div>

                {/* Device field */}
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Cihaz</label>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="device.name"
                      value={formData.device.name}
                      onChange={handleInputChange}
                      placeholder="Cihaz Adı"
                      className="input-field w-full"
                    />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                        <div className="relative w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                          {formData.device.imageUrl ? (
                            <img
                              src={formData.device.imageUrl || "/placeholder.svg"}
                              alt={formData.device.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">?</div>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          <p>Yüklenen cihaz görseli:</p>
                          <code className="text-xs break-all">
                            {formData.device.imageUrl || "Henüz görsel yüklenmedi."}
                          </code>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer text-sm">
                          {uploading ? "Cihaz Görseli Yükleniyor..." : "Cihaz Görseli Yükle"}
                          <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, "device")}
                            className="hidden"
                            accept="image/*"
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image field */}
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Resim</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Resim URL'si"
                      className="input-field w-full"
                    />
                    <div className="flex items-center gap-2">
                      <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer text-sm">
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
                        <div className="w-10 h-10 rounded overflow-hidden">
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

                {/* Published Checkbox */}
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-card-foreground">
                    Yayınlandı
                  </label>
                </div>

                {/* Featured Checkbox */}
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-card-foreground">
                    Öne Çıkan Hizmet
                  </label>
                </div>
              </div>

              {/* Description field */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Açıklama *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="input-field w-full"
                />
              </div>

              {/* Detailed Description field */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Detaylı Açıklama</label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="input-field w-full"
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Faydalar</label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                      className="flex-1 input-field"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("benefits", index)}
                      className="btn-destructive"
                    >
                      Kaldır
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("benefits", "")} className="btn-primary text-sm">
                  Fayda Ekle
                </button>
              </div>

              {/* FAQ */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">SSS</label>
                {formData.faq.map((faq, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        placeholder="Soru"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                        className="input-field w-full"
                      />
                      <textarea
                        placeholder="Cevap"
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                        className="input-field w-full"
                        rows="2"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("faq", index)}
                        className="btn-destructive self-start"
                      >
                        SSS'yi Kaldır
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("faq", { question: "", answer: "" })}
                  className="btn-primary text-sm"
                >
                  SSS Ekle
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  İptal
                </button>
                <button type="submit" className="btn-primary">
                  {editingService ? "Hizmeti Güncelle" : "Hizmet Oluştur"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
