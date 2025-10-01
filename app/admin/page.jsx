"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { 
  Calendar, 
  Activity, 
  BarChart3, 
  CheckCircle, 
  Clock,
  Users,
  TrendingUp,
  Phone,
  User,
  ClockIcon,
  PhoneCall,
  CalendarIcon
} from "lucide-react"

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalReservations: 0,
    todayReservations: 0,
    totalServices: 0,
  })

  // Rezervasyonları getir
  const fetchReservations = async () => {
    try {
      console.log("Admin Dashboard: Fetching reservations...")
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 saniye timeout
      
      const response = await fetch("/api/talepler", {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Admin Dashboard: Reservations response:", data)
      
      if (data.success) {
        setReservations(data.data || [])
        console.log("Admin Dashboard: Reservations loaded:", data.data?.length || 0)
      } else {
        console.error("Reservations API Error:", data.error)
        toast.error(`Rezervasyonlar yüklenirken hata: ${data.error}`)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Reservations request timeout")
        toast.error("Rezervasyonlar yüklenirken zaman aşımı oluştu. Lütfen sayfayı yenileyin.")
      } else {
        console.error("Rezervasyonlar yüklenirken hata:", error)
        toast.error(`Rezervasyonlar yüklenirken hata: ${error.message}`)
      }
    }
  }

  // Hizmetleri getir
  const fetchServices = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 saniye timeout
      
      const response = await fetch("/api/services", {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      const data = await response.json()
      
      if (data.success) {
        setServices(data.data)
      } else {
        console.error("Services API Error:", data.error)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Services request timeout")
      } else {
        console.error("Hizmetler yüklenirken hata:", error)
      }
    }
  }

  // Tüm verileri yükle
  const loadAllData = async () => {
    try {
      setLoading(true)
      console.log("Admin Dashboard: Loading all data...")
      
      const results = await Promise.allSettled([
        fetchReservations(),
        fetchServices()
      ])
      
      console.log("Admin Dashboard: All data loading completed")
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Admin Dashboard: Promise ${index} rejected:`, result.reason)
        }
      })
    } catch (error) {
      console.error("Veriler yüklenirken hata:", error)
      toast.error("Veriler yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllData()
    
    // Her 30 saniyede bir sadece rezervasyonları güncelle (loading state'i değiştirmeden)
    const interval = setInterval(() => {
      fetchReservations()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // İstatistikleri hesapla
  useEffect(() => {
    const today = new Date().toDateString()
    const todayReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date).toDateString()
      return reservationDate === today
    })

    setStats({
      totalReservations: reservations.length,
      todayReservations: todayReservations.length,
      totalServices: services.length,
    })
  }, [reservations, services])

  // Bugünkü rezervasyonları filtrele
  const todayReservations = reservations.filter((reservation) => {
    const today = new Date().toDateString()
    const reservationDate = new Date(reservation.date).toDateString()
    return reservationDate === today
  })

  // En popüler hizmetleri hesapla
  const popularServices = services
    .filter(service => service.popular)
    .slice(0, 5)

  // Telefon numarasını formatla
  const formatPhoneNumber = (phone) => {
    if (!phone) return ""
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 11) {
      return `+90 ${cleaned.slice(0,3)} ${cleaned.slice(3,6)} ${cleaned.slice(6,8)} ${cleaned.slice(8,10)}`
    }
    return phone
  }

  // Rezervasyon tarihini parse et
  const parseReservationDate = (dateString) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return {
        date: date.toLocaleDateString('tr-TR'),
        time: date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      }
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-700 text-xl">Dashboard yükleniyor...</div>
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Admin paneli genel bakış ve istatistikler</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
            <Clock className="h-4 w-4" />
            <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Rezervasyon</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReservations}</p>
              <p className="text-xs text-gray-500 mt-1">Bu ay</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bugünkü Rezervasyonlar</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.todayReservations}</p>
              <p className="text-xs text-gray-500 mt-1">Bugün</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Hizmet</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalServices}</p>
              <p className="text-xs text-gray-500 mt-1">Aktif</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Hizmetler</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{services.filter(s => s.published).length}</p>
              <p className="text-xs text-gray-500 mt-1">Yayında</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bugünkü Rezervasyonlar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Bugünkü Rezervasyonlar</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {todayReservations.length} rezervasyon
            </p>
          </div>
          <div className="p-6">
            {todayReservations.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Bugün rezervasyon bulunmuyor</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayReservations.map((reservation, index) => {
                  const reservationDate = parseReservationDate(reservation.adres)
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{reservation.isimSoyisim}</p>
                          <p className="text-sm text-gray-600">{reservation.markaModel}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4" />
                          <span>{reservationDate?.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                          <PhoneCall className="h-4 w-4" />
                          <span className="font-mono">{formatPhoneNumber(reservation.telefonNo)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Popüler Hizmetler */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Popüler Hizmetler</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              En çok tercih edilen hizmetler
            </p>
          </div>
          <div className="p-6">
            {popularServices.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Popüler hizmet bulunmuyor</p>
              </div>
            ) : (
              <div className="space-y-4">
                {popularServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.title}</p>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{service.price}</p>
                      <p className="text-xs text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Son Rezervasyonlar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Son Rezervasyonlar</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Tüm rezervasyonların listesi
          </p>
        </div>
        <div className="p-6">
          {reservations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz rezervasyon bulunmuyor</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Müşteri</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Hizmet</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Tarih</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Telefon</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.slice(0, 10).map((reservation, index) => {
                    const reservationDate = parseReservationDate(reservation.adres)
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{reservation.isimSoyisim}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{reservation.markaModel}</td>
                        <td className="py-3 px-4 text-gray-600">{reservationDate?.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-blue-600">
                            <Phone className="h-4 w-4" />
                            <span className="font-mono text-sm">{formatPhoneNumber(reservation.telefonNo)}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}