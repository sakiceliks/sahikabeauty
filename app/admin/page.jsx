'use client';

import { useState, useEffect } from 'react';
import { categories } from '../../data/services';

export default function AdminPanel() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    category: '',
    title: '',
    description: '',
    image: '',
    device: { name: '', imageUrl: '' }, // Yeni yapı: name ve imageUrl içeriyor
    duration: '',
    benefits: [''],
    detailedDescription: '',
    faq: [{ question: '', answer: '' }],
    reviews: [],
    published: false,
  });

  // Hizmetleri getir
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
        setFilteredServices(data.data);
      }
    } catch (error) {
      console.error('Hizmetleri getirirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Hizmetleri filtrele
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, services]);

  // Dosya yüklemeyi yönet
  const handleFileUpload = async (e, type = 'service') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('type', type);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log('Yükleme API cevabı:', data);
      if (response.ok) {
        const imageUrl = data.url || data.pathname || data.downloadUrl || (data.blob && (data.blob.url || data.blob.pathname || data.blob.downloadUrl));
        if (imageUrl) {
          if (type === 'device') {
            // Cihaz görseli başarıyla yüklendiğinde URL'i device alanına ekle
            setFormData(prev => ({
              ...prev,
              device: {
                ...prev.device,
                imageUrl: imageUrl
              }
            }));
            alert('Cihaz görseli başarıyla yüklendi!');
          } else {
            setFormData(prev => ({ ...prev, image: imageUrl }));
            alert('Hizmet görseli başarıyla yüklendi!');
          }
        } else {
          throw new Error('Yüklenen dosyanın URL bilgisi alınamadı');
        }
      } else {
        throw new Error(data.error || 'Yükleme başarısız');
      }
    } catch (error) {
      console.error('Yükleme hatası:', error);
      alert('Resim yüklenirken hata oluştu: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Form input değişikliklerini yönet
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // device alanı için özel yönetim
    if (name === 'device.name') {
        setFormData(prev => ({
            ...prev,
            device: {
                ...prev.device,
                name: value
            }
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }
  };

  // Dizi alanlarını yönet
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Dizi öğesi ekle
  const addArrayItem = (field, defaultValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  // Dizi öğesi kaldır
  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // FAQ değişikliklerini yönet
  const handleFaqChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faq: prev.faq.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      slug: '',
      category: '',
      title: '',
      description: '',
      image: '',
      device: { name: '', imageUrl: '' },
      duration: '',
      benefits: [''],
      detailedDescription: '',
      faq: [{ question: '', answer: '' }],
      reviews: [],
      published: false,
    });
    setEditingService(null);
    setShowForm(false);
  };

  // Oluştur/Güncelle'yi yönet
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchServices();
        resetForm();
        alert(editingService ? 'Hizmet başarıyla güncellendi!' : 'Hizmet başarıyla oluşturuldu!');
      } else {
        alert(`Hata: ${data.error}`);
      }
    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
      alert('Form gönderilirken hata oluştu');
    }
  };

  // Düzenleme
  const handleEdit = (service) => {
    setFormData({
      slug: service.slug || '',
      category: service.category || '',
      title: service.title || '',
      description: service.description || '',
      image: service.image || '',
      device: service.device || { name: '', imageUrl: '' }, // Yeni yapıya uygun düzenleme
      duration: service.duration || '',
      benefits: service.benefits || [''],
      detailedDescription: service.detailedDescription || '',
      faq: service.faq || [{ question: '', answer: '' }],
      reviews: service.reviews || [],
      published: service.published || false,
    });
    setEditingService(service);
    setShowForm(true);
  };

  // Silme
  const handleDelete = async (id) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchServices();
        alert('Hizmet başarıyla silindi!');
      } else {
        alert(`Hata: ${data.error}`);
      }
    } catch (error) {
      console.error('Hizmet silinirken hata oluştu:', error);
      alert('Hizmet silinirken hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        {/* Başlık */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hizmetler Yönetim Paneli</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Yeni Hizmet Ekle
          </button>
        </div>

        {/* Filtreler */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Arama</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Hizmetlerde ara..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Hizmetler Tablosu */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Başlık</th>
                  <th className="px-6 py-4 text-left">Kategori</th>
                  <th className="px-6 py-4 text-left">Slug</th>
                  <th className="px-6 py-4 text-left">Cihaz</th>
                  <th className="px-6 py-4 text-left">Süre</th>
                  <th className="px-6 py-4 text-left">Yayınlandı</th>
                  <th className="px-6 py-4 text-left">Eylemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr key={service.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                    <td className="px-6 py-4">{service.id}</td>
                    <td className="px-6 py-4 font-semibold">{service.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-600 px-2 py-1 rounded text-xs">
                        {categories.find(cat => cat.id === service.category)?.name || service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{service.slug}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 bg-gray-700 rounded-lg overflow-hidden">
                          {service.device?.imageUrl ? (
                            <img
                              src={service.device.imageUrl}
                              alt={service.device.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">?</div>
                          )}
                        </div>
                        <span className="text-sm">{service.device?.name || "Gelişmiş Teknoloji"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{service.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${service.published ? 'bg-green-500' : 'bg-red-500'}`}>
                        {service.published ? 'Evet' : 'Hayır'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              Hiç hizmet bulunamadı.
            </div>
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingService ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Başlık *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Slug *</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Süre</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cihaz</label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="device.name" // name alanını güncelledim
                        value={formData.device.name} // değerini güncelledim
                        onChange={handleInputChange}
                        placeholder="Cihaz Adı"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                          <div className="relative w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                            {formData.device.imageUrl ? (
                              <img
                                src={formData.device.imageUrl}
                                alt={formData.device.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">?</div>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">
                            <p>Yüklenen cihaz görseli:</p>
                            <code className="text-xs break-all">{formData.device.imageUrl || 'Henüz görsel yüklenmedi.'}</code>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer text-sm">
                            {uploading ? 'Cihaz Görseli Yükleniyor...' : 'Cihaz Görseli Yükle'}
                            <input
                              type="file"
                              onChange={(e) => handleFileUpload(e, 'device')}
                              className="hidden"
                              accept="image/*"
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Resim</label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Resim URL'si"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer text-sm">
                          {uploading ? 'Yükleniyor...' : 'Dosya Yükle'}
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
                              src={formData.image}
                              alt="Önizleme"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Yeni eklenen Yayınlandı Checkbox'ı */}
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="text-sm font-medium">Yayınlandı</label>
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Detaylı Açıklama</label>
                  <textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Faydalar */}
                <div>
                  <label className="block text-sm font-medium mb-2">Faydalar</label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('benefits', index)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                      >
                        Kaldır
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits', '')}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                  >
                    Fayda Ekle
                  </button>
                </div>

                {/* SSS (Sıkça Sorulan Sorular) */}
                <div>
                  <label className="block text-sm font-medium mb-2">SSS</label>
                  {formData.faq.map((faq, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          placeholder="Soru"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-4 py-2"
                        />
                        <textarea
                          placeholder="Cevap"
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-4 py-2"
                          rows="2"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('faq', index)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded self-start"
                        >
                          SSS'yi Kaldır
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('faq', { question: '', answer: '' })}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                  >
                    SSS Ekle
                  </button>
                </div>

                {/* Form Eylemleri */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editingService ? 'Hizmeti Güncelle' : 'Hizmet Oluştur'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}