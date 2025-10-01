"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { 
  Trash2, 
  Edit, 
  Calendar, 
  User, 
  Globe, 
  Clock,
  Filter,
  Search,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react"

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterDate, setFilterDate] = useState("")

  // Logları getir
  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/logs")
      const data = await response.json()
      
      if (data.success) {
        setLogs(data.data)
      } else {
        console.error("Logs API Error:", data.error)
        toast.error("Loglar yüklenirken bir hata oluştu.")
      }
    } catch (error) {
      console.error("Loglar yüklenirken hata:", error)
      toast.error("Loglar yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  // Filtrelenmiş loglar
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.endpoint?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesDate = !filterDate || log.timestamp.startsWith(filterDate)
    
    return matchesSearch && matchesAction && matchesDate
  })

  // Logları temizle
  const clearLogs = async () => {
    if (!confirm("Tüm logları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) return

    try {
      const response = await fetch("/api/admin/logs", {
        method: "DELETE"
      })
      const data = await response.json()

      if (data.success) {
        setLogs([])
        toast.success("Tüm loglar temizlendi.")
      } else {
        toast.error(data.error || "Loglar temizlenirken bir hata oluştu.")
      }
    } catch (error) {
      console.error("Loglar temizlenirken hata:", error)
      toast.error("Loglar temizlenirken bir hata oluştu.")
    }
  }

  // Logları dışa aktar
  const exportLogs = () => {
    const csvContent = [
      ["Tarih", "Saat", "Kullanıcı", "İşlem", "Sayfa", "Durum", "IP Adresi"],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleDateString('tr-TR'),
        new Date(log.timestamp).toLocaleTimeString('tr-TR'),
        log.user,
        log.action,
        log.endpoint,
        log.status,
        log.ipAddress || "N/A"
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `admin-logs-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // İşlem ikonu
  const getActionIcon = (action) => {
    switch (action) {
      case "DELETE":
        return <Trash2 className="h-4 w-4 text-red-600" />
      case "PUT":
        return <Edit className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  // Durum ikonu
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-700 text-xl">Loglar yükleniyor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sistem Logları</h1>
            <p className="text-gray-600 mt-1">Admin işlemlerinin detaylı kayıtları</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogs}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
            <button
              onClick={exportLogs}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              Dışa Aktar
            </button>
            <button
              onClick={clearLogs}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ara</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Kullanıcı, sayfa veya işlem ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İşlem Türü</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm İşlemler</option>
              <option value="PUT">Düzenleme (PUT)</option>
              <option value="DELETE">Silme (DELETE)</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih & Saat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sayfa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Adresi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Log bulunamadı</h3>
                    <p className="text-gray-600">
                      {searchTerm || filterAction !== "all" || filterDate
                        ? "Arama kriterlerinize uygun log bulunamadı."
                        : "Henüz hiç log kaydı bulunmuyor."
                      }
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(log.timestamp).toLocaleDateString('tr-TR')}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString('tr-TR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="text-sm font-medium text-gray-900">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900 font-mono">{log.endpoint}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className={`text-sm font-medium ${
                          log.status === 'success' ? 'text-green-600' : 
                          log.status === 'error' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {log.status === 'success' ? 'Başarılı' : 
                           log.status === 'error' ? 'Hata' : 'Bilinmiyor'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 font-mono">
                        {log.ipAddress || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Edit className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Düzenleme İşlemleri</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(log => log.action === 'PUT').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Silme İşlemleri</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(log => log.action === 'DELETE').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Başarılı İşlemler</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(log => log.status === 'success').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
