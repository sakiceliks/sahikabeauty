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
    device: '',
    duration: '',
    benefits: [''],
    detailedDescription: '',
    faq: [{ question: '', answer: '' }],
    reviews: []
  });

  // Fetch services
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
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services
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

  // Handle file upload
  const handleFileUpload = async (e, type = 'service') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type); // service veya device olarak belirt

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Yükleme API cevabı:', data);
      if (response.ok) {
        // Vercel Blob API: url, pathname veya downloadUrl olabilir
        const imageUrl = data.url || data.pathname || data.downloadUrl || (data.blob && (data.blob.url || data.blob.pathname || data.blob.downloadUrl));
        if (imageUrl) {
          if (type === 'device') {
            // Cihaz görseli başarıyla yüklendi
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle array fields
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Add array item
  const addArrayItem = (field, defaultValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  // Remove array item
  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle FAQ changes
  const handleFaqChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faq: prev.faq.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      slug: '',
      category: '',
      title: '',
      description: '',
      image: '',
      device: '',
      duration: '',
      benefits: [''],
      detailedDescription: '',
      faq: [{ question: '', answer: '' }],
      reviews: []
    });
    setEditingService(null);
    setShowForm(false);
  };

  // Handle create/update
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
        alert(editingService ? 'Service updated successfully!' : 'Service created successfully!');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  // Handle edit
  const handleEdit = (service) => {
    setFormData({
      slug: service.slug || '',
      category: service.category || '',
      title: service.title || '',
      description: service.description || '',
      image: service.image || '',
      device: service.device || '',
      duration: service.duration || '',
      benefits: service.benefits || [''],
      detailedDescription: service.detailedDescription || '',
      faq: service.faq || [{ question: '', answer: '' }],
      reviews: service.reviews || []
    });
    setEditingService(service);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchServices();
        alert('Service deleted successfully!');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Services Admin Panel</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Add New Service
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Slug</th>
                  <th className="px-6 py-4 text-left">Device</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Actions</th>
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
                          <img 
                            src={`/assets/devices/${service.slug}.png`}
                            alt={service.device}
                            className="w-full h-full object-contain"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>
                        <span className="text-sm">{service.device || "Gelişmiş Teknoloji"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{service.duration}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
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
              No services found
            </div>
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
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
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Device</label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="device"
                        value={formData.device}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.slug && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                            <div className="relative w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                              <img 
                                src={`/assets/devices/${formData.slug}.png`}
                                alt={formData.device}
                                className="w-full h-full object-contain"
                                onError={(e) => e.target.style.display = 'none'}
                              />
                            </div>
                            <div className="text-sm text-gray-400">
                              <p>Cihaz görseli konumu:</p>
                              <code className="text-xs">/assets/devices/{formData.slug}.png</code>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer text-sm">
                              {uploading ? 'Cihaz Görseli Yükleniyor...' : 'Cihaz Görseli Yükle'}
                              <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, 'device')}
                                className="hidden"
                                accept="image/png"
                                disabled={uploading}
                              />
                            </label>
                            <span className="text-xs text-gray-400">
                              Not: Yalnızca PNG formatı desteklenir
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
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
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
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
                  <label className="block text-sm font-medium mb-2">Detailed Description</label>
                  <textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium mb-2">Benefits</label>
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
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits', '')}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                  >
                    Add Benefit
                  </button>
                </div>

                {/* FAQ */}
                <div>
                  <label className="block text-sm font-medium mb-2">FAQ</label>
                  {formData.faq.map((faq, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-4 py-2"
                        />
                        <textarea
                          placeholder="Answer"
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
                          Remove FAQ
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('faq', { question: '', answer: '' })}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                  >
                    Add FAQ
                  </button>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
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