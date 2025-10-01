"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search,
  Filter,
  MoreVertical,
  Settings,
  Star,
  Clock,
  DollarSign,
  Loader2
} from "lucide-react"

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [deviceImagePreview, setDeviceImagePreview] = useState(null)
  const [serviceImagePreview, setServiceImagePreview] = useState(null)
  const [uploadingDeviceImage, setUploadingDeviceImage] = useState(false)
  const [uploadingServiceImage, setUploadingServiceImage] = useState(false)

  // Hizmetleri getir
  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services")
      const data = await response.json()
      
      if (data.success) {
        setServices(data.data)
      } else {
        console.error("Services API Error:", data.error)
        toast.error("Hizmetler yüklenirken bir hata oluştu.")
      }
    } catch (error) {
      console.error("Hizmetler yüklenirken hata:", error)
      toast.error("Hizmetler yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  // Hizmet silme
  const handleDelete = async (serviceId) => {
    if (!confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE"
      })
      const data = await response.json()

      if (data.success) {
        setServices(services.filter(service => service._id !== serviceId))
        toast.success("Hizmet başarıyla silindi.")
      } else {
        toast.error(data.error || "Hizmet silinirken bir hata oluştu.")
      }
    } catch (error) {
      console.error("Hizmet silinirken hata:", error)
      toast.error("Hizmet silinirken bir hata oluştu.")
    }
  }

  // Hizmet durumunu değiştir
  const toggleServiceStatus = async (serviceId, currentStatus) => {
    try {
      // currentStatus undefined ise false olarak ayarla
      const actualCurrentStatus = currentStatus || false
      console.log("Toggling service status:", { serviceId, currentStatus: actualCurrentStatus })
      
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          published: !actualCurrentStatus
        })
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      // Response'un ok olup olmadığını kontrol et
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      // Response'un JSON olup olmadığını kontrol et
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error("Non-JSON response:", responseText)
        throw new Error("Response is not JSON")
      }

      const data = await response.json()
      console.log("Response data:", data)

      if (data.success) {
        setServices(services.map(service => 
          service._id === serviceId 
            ? { ...service, published: !actualCurrentStatus }
            : service
        ))
        toast.success(`Hizmet ${!actualCurrentStatus ? 'yayınlandı' : 'yayından kaldırıldı'}.`)
      } else {
        toast.error(data.error || "Hizmet durumu değiştirilirken bir hata oluştu.")
      }
    } catch (error) {
      console.error("Hizmet durumu değiştirilirken hata:", error)
      toast.error(`Hizmet durumu değiştirilirken bir hata oluştu: ${error.message}`)
    }
  }

  // Hizmet kaydet
  const handleSave = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData(e.target)
      
      // Service image upload
      let serviceImageUrl = editingService?.image || ''
      const serviceImageFile = formData.get('serviceImage')
      console.log('=== SERVICE IMAGE UPLOAD DEBUG ===')
      console.log('Service image file:', serviceImageFile)
      console.log('Service image file size:', serviceImageFile?.size)
      console.log('Service image file type:', serviceImageFile?.type)
      console.log('Service image file name:', serviceImageFile?.name)
      console.log('Current service image URL:', serviceImageUrl)
      
      if (serviceImageFile?.size > 0) {
        console.log('Uploading service image...')
        setUploadingServiceImage(true)
        
        try {
          const serviceImageFormData = new FormData()
          serviceImageFormData.append('file', serviceImageFile)
          serviceImageFormData.append('type', 'service')
          
          const serviceImageResponse = await fetch('/api/upload', {
            method: 'POST',
            body: serviceImageFormData,
            signal: AbortSignal.timeout(60000) // 60 second timeout
          })
          
          if (!serviceImageResponse.ok) {
            throw new Error(`Upload failed with status: ${serviceImageResponse.status}`)
          }
          
          const serviceImageData = await serviceImageResponse.json()
          console.log('Service image upload response:', serviceImageData)
          
          if (serviceImageData.success) {
            serviceImageUrl = serviceImageData.url
            console.log('Service image uploaded successfully:', serviceImageUrl)
          } else {
            console.error('Service image upload failed:', serviceImageData.error)
            toast.error(`Görsel yükleme hatası: ${serviceImageData.error}`)
            return // Stop the save process if image upload fails
          }
        } finally {
          setUploadingServiceImage(false)
        }
      } else {
        console.log('No service image file selected, keeping existing:', serviceImageUrl)
      }
      
      // Device image upload
      let deviceImageUrl = editingService?.device?.imageUrl || ''
      const deviceImageFile = formData.get('deviceImage')
      console.log('Device image file:', deviceImageFile)
      console.log('Device image file size:', deviceImageFile?.size)
      
      if (deviceImageFile?.size > 0) {
        console.log('Uploading device image...')
        setUploadingDeviceImage(true)
        
        try {
          const deviceImageFormData = new FormData()
          deviceImageFormData.append('file', deviceImageFile)
          deviceImageFormData.append('type', 'device')
          deviceImageFormData.append('deviceName', formData.get('device'))
          
          console.log('Device name:', formData.get('device'))
          
          const deviceImageResponse = await fetch('/api/upload', {
            method: 'POST',
            body: deviceImageFormData,
            signal: AbortSignal.timeout(60000) // 60 second timeout
          })
          
          if (!deviceImageResponse.ok) {
            throw new Error(`Device image upload failed with status: ${deviceImageResponse.status}`)
          }
          
          const deviceImageData = await deviceImageResponse.json()
          console.log('Device image upload response:', deviceImageData)
          
          if (deviceImageData.success) {
            deviceImageUrl = deviceImageData.url
            console.log('Device image uploaded successfully:', deviceImageUrl)
          } else {
            console.error('Device image upload failed:', deviceImageData.error)
            toast.error(`Cihaz görseli yükleme hatası: ${deviceImageData.error}`)
            return // Stop the save process if device image upload fails
          }
        } finally {
          setUploadingDeviceImage(false)
        }
      } else {
        console.log('No device image file selected, keeping existing:', deviceImageUrl)
      }
      
      // Service data
      const serviceData = {
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        detailedDescription: formData.get('detailedDescription'),
        duration: formData.get('duration'),
        price: formData.get('price'),
        device: {
          name: formData.get('device') || '',
          imageUrl: deviceImageUrl
        },
        benefits: formData.get('benefits')?.split('\n').filter(b => b.trim()) || [],
        faq: JSON.parse(formData.get('faq') || '[]'),
        published: formData.get('published') === 'on',
        popular: formData.get('popular') === 'on',
        featured: formData.get('featured') === 'on',
        image: serviceImageUrl
      }
      
      console.log('Service data to save:', serviceData)
      
      const url = editingService ? `/api/services/${editingService._id}` : '/api/services'
      const method = editingService ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(editingService ? "Hizmet güncellendi." : "Hizmet eklendi.")
        setShowAddModal(false)
        setEditingService(null)
        fetchServices()
      } else {
        toast.error(data.error || "Hizmet kaydedilirken bir hata oluştu.")
      }
    } catch (error) {
      console.error("Hizmet kaydedilirken hata:", error)
      
      // Handle specific error types
      let errorMessage = "Hizmet kaydedilirken bir hata oluştu"
      
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        errorMessage = "Dosya yükleme zaman aşımına uğradı. Lütfen daha küçük bir dosya deneyin."
      } else if (error.message.includes('ECONNRESET') || error.message.includes('aborted')) {
        errorMessage = "Bağlantı kesildi. Lütfen tekrar deneyin."
      } else if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
        errorMessage = "Depolama yapılandırması eksik. Lütfen yönetici ile iletişime geçin."
      }
      
      toast.error(`${errorMessage}: ${error.message}`)
    }
  }

  // Filtrelenmiş hizmetler
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || service.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Kategoriler
  const categories = ["all", "epilasyon", "cilt-bakimi", "makyaj", "saç-bakimi"]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-700 text-xl">Hizmetler yükleniyor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Hizmet Yönetimi</h1>
            <p className="text-blue-100 text-lg sm:text-xl mb-4 sm:mb-6">Tüm hizmetleri yönetin ve düzenleyin</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-sm sm:text-base font-semibold">Toplam: {services.length} hizmet</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-sm sm:text-base font-semibold">Yayında: {services.filter(s => s.published).length}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setShowAddModal(true)
              setDeviceImagePreview(null)
              setServiceImagePreview(null)
            }}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 sm:gap-4 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white/20 w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
            Yeni Hizmet Ekle
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Hizmet ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base sm:text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-56">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base sm:text-lg"
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="epilasyon">Epilasyon</option>
              <option value="cilt-bakimi">Cilt Bakımı</option>
              <option value="makyaj">Makyaj</option>
              <option value="saç-bakimi">Saç Bakımı</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredServices.map((service) => (
          <div key={service._id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            {/* Service Image */}
            <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
              {service.image ? (
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div 
                className="w-full h-full flex items-center justify-center text-gray-400"
                style={{ display: service.image ? 'none' : 'flex' }}
              >
                <Settings className="h-16 w-16 opacity-50" />
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                  (service.published || false)
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {(service.published || false) ? 'Yayında' : 'Taslak'}
                </span>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {/* Featured Badge */}
                {service.featured && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Star className="h-3 w-3 fill-white" />
                    Öne Çıkan
                  </span>
                )}
                
                {/* Popular Badge */}
                {service.popular && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Star className="h-3 w-3 fill-white" />
                    Popüler
                  </span>
                )}
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setEditingService(service)
                    setDeviceImagePreview(null)
                    setServiceImagePreview(null)
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  title="Düzenle"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  title="Sil"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Service Details */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <span className="font-bold text-green-600">{service.price}</span>
                </div>
                {service.device && (typeof service.device === 'string' ? service.device : service.device.name) && (
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    </div>
                    <span>{typeof service.device === 'string' ? service.device : service.device.name}</span>
                  </div>
                )}
                {service.benefits && Array.isArray(service.benefits) && service.benefits.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-bold text-heading-primary">Faydalar:</span>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {service.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="text-xs">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Device Image Section */}
              {service.device && (service.device.imageUrl || (typeof service.device === 'object' && service.device.imageUrl)) && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Cihaz Görseli</div>
                  <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={typeof service.device === 'object' ? service.device.imageUrl : service.device.imageUrl} 
                      alt="Cihaz Görseli"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'flex'
                      }}
                    />
                    <div 
                      className="w-full h-full flex items-center justify-center text-gray-400"
                      style={{ display: 'none' }}
                    >
                      <Settings className="h-8 w-8 opacity-50" />
                    </div>
                  </div>
                </div>
              )}

              {/* Status Toggle Button */}
              <button
                onClick={() => toggleServiceStatus(service._id, service.published || false)}
                className={`w-full px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 ${
                  (service.published || false)
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
                }`}
              >
                {(service.published || false) ? (
                  <div className="flex items-center justify-center gap-2">
                    <EyeOff className="h-4 w-4" />
                    Yayından Kaldır
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4" />
                    Yayınla
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Hizmet bulunamadı</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterCategory !== "all" 
              ? "Arama kriterlerinize uygun hizmet bulunamadı. Farklı arama terimleri deneyin."
              : "Henüz hiç hizmet eklenmemiş. İlk hizmetinizi ekleyerek başlayın."
            }
          </p>
          {!searchTerm && filterCategory === "all" && (
            <button
              onClick={() => {
              setShowAddModal(true)
              setDeviceImagePreview(null)
              setServiceImagePreview(null)
            }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              İlk Hizmeti Ekle
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingService) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingService(null)
                  setDeviceImagePreview(null)
                  setServiceImagePreview(null)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
              {/* Basic Information */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Temel Bilgiler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet Adı *</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingService?.title || ''}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Hizmet adını girin"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                    <select
                      name="category"
                      defaultValue={editingService?.category || ''}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      required
                    >
                      <option value="">Kategori seçin</option>
                      <option value="epilasyon">Epilasyon</option>
                      <option value="cilt-bakimi">Cilt Bakımı</option>
                      <option value="kalici-makyaj">Kalıcı Makyaj</option>
                      <option value="saç-bakimi">Saç Bakımı</option>
                      <option value="dövme">Dövme</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama *</label>
                  <textarea
                    name="description"
                    defaultValue={editingService?.description || ''}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hizmet açıklamasını girin"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama</label>
                  <textarea
                    name="detailedDescription"
                    defaultValue={editingService?.detailedDescription || ''}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detaylı hizmet açıklaması"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Hizmet Detayları</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Süre</label>
                    <input
                      type="text"
                      name="duration"
                      defaultValue={editingService?.duration || ''}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Örn: 60-75 dk"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                    <input
                      type="text"
                      name="price"
                      defaultValue={editingService?.price || ''}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Örn: ₺300-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kullanılan Cihaz</label>
                  <input
                    type="text"
                    name="device"
                    defaultValue={typeof editingService?.device === 'object' ? editingService?.device?.name || '' : editingService?.device || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Kullanılan cihaz adı"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Görseller</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet Görseli</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="serviceImage"
                        accept="image/*"
                        disabled={uploadingServiceImage}
                        onChange={(e) => {
                          console.log('Service image file selected:', e.target.files[0])
                          const file = e.target.files[0]
                          if (file) {
                            console.log('Service image file details:', {
                              name: file.name,
                              size: file.size,
                              type: file.type
                            })
                            const reader = new FileReader()
                            reader.onload = (e) => setServiceImagePreview(e.target.result)
                            reader.readAsDataURL(file)
                          } else {
                            setServiceImagePreview(null)
                          }
                        }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${uploadingServiceImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {uploadingServiceImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>
                    {(serviceImagePreview || editingService?.image) && (
                      <div className="mt-2">
                        <img 
                          src={serviceImagePreview || editingService.image} 
                          alt={serviceImagePreview ? "Yeni görsel" : "Mevcut görsel"} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {serviceImagePreview ? "Yeni görsel" : "Mevcut görsel"}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cihaz Görseli</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="deviceImage"
                        accept="image/*"
                        disabled={uploadingDeviceImage}
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (e) => setDeviceImagePreview(e.target.result)
                            reader.readAsDataURL(file)
                          } else {
                            setDeviceImagePreview(null)
                          }
                        }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${uploadingDeviceImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {uploadingDeviceImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>
                    {(deviceImagePreview || editingService?.device?.imageUrl) && (
                      <div className="mt-2">
                        <img 
                          src={deviceImagePreview || editingService.device.imageUrl} 
                          alt={deviceImagePreview ? "Yeni cihaz görseli" : "Mevcut cihaz görseli"} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {deviceImagePreview ? "Yeni cihaz görseli" : "Mevcut cihaz görseli"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Faydalar</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faydalar (Her satıra bir fayda)</label>
                  <textarea
                    name="benefits"
                    defaultValue={editingService?.benefits?.join('\n') || ''}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Fayda 1&#10;Fayda 2&#10;Fayda 3"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Sık Sorulan Sorular</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SSS (JSON formatında)</label>
                  <textarea
                    name="faq"
                    defaultValue={JSON.stringify(editingService?.faq || [], null, 2)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder='[{"question": "Soru?", "answer": "Cevap"}]'
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Durum</h4>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="published"
                      defaultChecked={editingService?.published || false}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yayında</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="popular"
                      defaultChecked={editingService?.popular || false}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Popüler</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="featured"
                      defaultChecked={editingService?.featured || false}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Öne Çıkan</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingService(null)
                    setDeviceImagePreview(null)
                    setServiceImagePreview(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={uploadingServiceImage || uploadingDeviceImage}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    uploadingServiceImage || uploadingDeviceImage
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {uploadingServiceImage || uploadingDeviceImage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Yükleniyor...
                    </>
                  ) : (
                    editingService ? 'Güncelle' : 'Ekle'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}