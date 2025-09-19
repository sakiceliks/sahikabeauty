"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock3,
  RefreshCw
} from "lucide-react"

// Talep durumları
const TALEP_DURUMLARI = [
  { id: 1, name: "Talebiniz Alındı", color: "bg-blue-100 text-blue-800", icon: "📝" },
  { id: 2, name: "İnceleniyor", color: "bg-yellow-100 text-yellow-800", icon: "🔍" },
  { id: 3, name: "Onaylandı", color: "bg-green-100 text-green-800", icon: "✅" },
  { id: 4, name: "Reddedildi", color: "bg-red-100 text-red-800", icon: "❌" },
  { id: 5, name: "Tamamlandı", color: "bg-purple-100 text-purple-800", icon: "🎉" }
]

export default function TaleplerPage() {
  const [talepler, setTalepler] = useState([])
  const [filteredTalepler, setFilteredTalepler] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedTalep, setSelectedTalep] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({
    durumId: "",
    not: ""
  })

  // Talepleri getir
  const fetchTalepler = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/talepler")
      const data = await response.json()
      
      if (data.success) {
        setTalepler(data.data)
        setFilteredTalepler(data.data)
      } else {
        toast.error("Talepler yüklenirken hata oluştu")
      }
    } catch (error) {
      console.error("Talepler yüklenirken hata:", error)
      toast.error("Talepler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTalepler()
  }, [])

  // Filtreleme
  useEffect(() => {
    let filtered = talepler

    if (searchTerm) {
      filtered = filtered.filter(talep => 
        talep.isimSoyisim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talep.telefonNo.includes(searchTerm) ||
        talep.talepId.toString().includes(searchTerm) ||
        talep.markaModel.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedStatus) {
      filtered = filtered.filter(talep => talep.durumId === parseInt(selectedStatus))
    }

    setFilteredTalepler(filtered)
  }, [searchTerm, selectedStatus, talepler])

  // Talep durumunu güncelle
  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`/api/talepler/${selectedTalep.talepId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Talep durumu başarıyla güncellendi")
        setShowEditModal(false)
        setSelectedTalep(null)
        setEditForm({ durumId: "", not: "" })
        fetchTalepler()
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error("Durum güncellenirken hata:", error)
      toast.error("Durum güncellenirken hata oluştu")
    }
  }

  // Talep sil
  const handleDelete = async (talepId) => {
    if (!confirm("Bu talebi silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/talepler/${talepId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Talep başarıyla silindi")
        fetchTalepler()
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error("Talep silinirken hata:", error)
      toast.error("Talep silinirken hata oluştu")
    }
  }

  // Düzenleme modalını aç
  const openEditModal = (talep) => {
    setSelectedTalep(talep)
    setEditForm({
      durumId: talep.durumId.toString(),
      not: talep.not || ""
    })
    setShowEditModal(true)
  }

  // Randevu tarihini parse et
  const parseReservationDate = (adres) => {
    if (!adres || !adres.includes('Randevu Tarihi:')) return null
    
    const match = adres.match(/rezervasyon Tarihi:\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/)
    if (match) {
      const [, date, time] = match
      return { date, time }
    }
    return null
  }

  // Durum bilgisini getir
  const getStatusInfo = (durumId) => {
    return TALEP_DURUMLARI.find(status => status.id === durumId) || TALEP_DURUMLARI[0]
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
          <h1 className="h2 text-foreground">Talep Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Tüm talepleri görüntüleyin ve durumlarını yönetin</p>
        </div>
        <button 
          onClick={fetchTalepler}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Yenile
        </button>
      </div>

      {/* Filtreler */}
      <div className="card">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Filtreler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Arama</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ad, telefon, talep no veya hizmet ara..."
                className="input-field w-full pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Durum</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field w-full"
            >
              <option value="">Tüm Durumlar</option>
              {TALEP_DURUMLARI.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.icon} {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Talep Listesi */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Talep No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Müşteri</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Hizmet</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">İletişim</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Randevu</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Durum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tarih</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Eylemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredTalepler.map((talep) => {
                const statusInfo = getStatusInfo(talep.durumId)
                const reservationDate = parseReservationDate(talep.adres)
                
                return (
                  <tr key={talep.talepId} className="border-b border-border hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-foreground">#{talep.talepId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{talep.isimSoyisim}</p>
                        <p className="text-sm text-muted-foreground">{talep.telefonNo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{talep.markaModel}</p>
                        <p className="text-sm text-muted-foreground">{talep.sorun}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-foreground">{talep.telefonNo}</span>
                        </div>
                        {talep.not && talep.not.includes('E-posta:') && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {talep.not.match(/E-posta:\s*([^\n]+)/)?.[1] || 'Belirtilmemiş'}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {reservationDate ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-foreground">
                              {new Date(reservationDate.date).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{reservationDate.time}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Randevu yok</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(talep.olusturmaTarihi).toLocaleDateString('tr-TR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(talep)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          <Edit className="w-4 h-4" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(talep.talepId)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredTalepler.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">Hiç talep bulunamadı.</div>
          )}
        </div>
      </div>

      {/* Düzenleme Modalı */}
      {showEditModal && selectedTalep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              Talep Durumunu Düzenle
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Talep No: #{selectedTalep.talepId}
                </label>
                <p className="text-sm text-muted-foreground">
                  Müşteri: {selectedTalep.isimSoyisim}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Durum *
                </label>
                <select
                  value={editForm.durumId}
                  onChange={(e) => setEditForm({...editForm, durumId: e.target.value})}
                  className="input-field w-full"
                  required
                >
                  {TALEP_DURUMLARI.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.icon} {status.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Not
                </label>
                <textarea
                  value={editForm.not}
                  onChange={(e) => setEditForm({...editForm, not: e.target.value})}
                  className="input-field w-full"
                  rows={3}
                  placeholder="Durum hakkında not ekleyin..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedTalep(null)
                  setEditForm({ durumId: "", not: "" })
                }}
                className="btn-secondary"
              >
                İptal
              </button>
              <button
                onClick={handleStatusUpdate}
                className="btn-primary"
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
