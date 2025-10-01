'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock,
  Search,
  Filter,
  RefreshCw,
  X
} from 'lucide-react'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updating, setUpdating] = useState(false)

  // Verileri yükle
  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contact')
      const data = await response.json()
      
      if (data.success) {
        setContacts(data.data)
      } else {
        toast.error('Mesajlar yüklenemedi')
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Mesajlar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  // Durum güncelle
  const updateStatus = async (contactId, newStatus) => {
    try {
      setUpdating(true)
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setContacts(prev => 
          prev.map(contact => 
            contact._id === contactId 
              ? { ...contact, status: newStatus }
              : contact
          )
        )
        toast.success('Durum güncellendi')
      } else {
        toast.error('Durum güncellenemedi')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Durum güncellenemedi')
    } finally {
      setUpdating(false)
    }
  }

  // Mesaj sil
  const deleteContact = async (contactId) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return
    
    try {
      setUpdating(true)
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setContacts(prev => prev.filter(contact => contact._id !== contactId))
        toast.success('Mesaj silindi')
        setShowModal(false)
      } else {
        toast.error('Mesaj silinemedi')
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Mesaj silinemedi')
    } finally {
      setUpdating(false)
    }
  }

  // Filtreleme
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Durum rengi
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800 border-red-200'
      case 'read': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'replied': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Durum metni
  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Yeni'
      case 'read': return 'Okundu'
      case 'replied': return 'Yanıtlandı'
      default: return 'Bilinmiyor'
    }
  }

  // Tarih formatı
  const formatDate = (date) => {
    return new Date(date).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-700 text-xl">Mesajlar yükleniyor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              İletişim Mesajları
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-medium">
              Gelen mesajları yönetin ve yanıtlayın
            </p>
          </div>
          <button
            onClick={fetchContacts}
            disabled={loading}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border-2 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Arama */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="İsim, email, telefon veya mesaj ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              />
            </div>
          </div>
          
          {/* Durum Filtresi */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="new">Yeni</option>
              <option value="read">Okundu</option>
              <option value="replied">Yanıtlandı</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mesaj Listesi */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Mesaj bulunamadı</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Arama kriterlerinize uygun mesaj bulunamadı.' 
                : 'Henüz hiç mesaj gelmemiş.'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedContact(contact)
                  setShowModal(true)
                  if (contact.status === 'new') {
                    updateStatus(contact._id, 'read')
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(contact.status)}`}>
                        {getStatusText(contact.status)}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedContact(contact)
                        setShowModal(true)
                        if (contact.status === 'new') {
                          updateStatus(contact._id, 'read')
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Mesajı görüntüle"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mesaj Detay Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Mesaj Detayı</h2>
                  <p className="text-blue-100">Gönderen: {selectedContact.name}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* İletişim Bilgileri */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">İsim</p>
                    <p className="font-semibold">{selectedContact.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedContact.email}</p>
                  </div>
                </div>
                
                {selectedContact.phone && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Telefon</p>
                      <p className="font-semibold">{selectedContact.phone}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Tarih</p>
                    <p className="font-semibold">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mesaj</h3>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Durum */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Durum</h3>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${getStatusColor(selectedContact.status)}`}>
                    {getStatusText(selectedContact.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedContact._id, 'read')}
                  disabled={updating || selectedContact.status === 'read'}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <CheckCircle className="h-4 w-4" />
                  Okundu Olarak İşaretle
                </button>
                
                <button
                  onClick={() => updateStatus(selectedContact._id, 'replied')}
                  disabled={updating || selectedContact.status === 'replied'}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Yanıtlandı Olarak İşaretle
                </button>
              </div>
              
              <button
                onClick={() => deleteContact(selectedContact._id)}
                disabled={updating}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:ml-auto"
              >
                <Trash2 className="h-4 w-4" />
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
