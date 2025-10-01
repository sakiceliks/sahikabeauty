"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { TableRowSkeleton } from "@/components/Skeletons"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function BlogYonetim() {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  // Form verilerini yalnızca gerekli alanlarla başlat
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
    date: "",
    readTime: "",
    views: 0,
    tags: [],
    featured: false,
    published: true,
  })

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/blog")
      const data = await response.json()
      
      console.log("fetchPosts - response:", response)
      console.log("fetchPosts - data:", data)

      if (data.success) {
        console.log("fetchPosts - posts:", data.data)
        setPosts(data.data)
      } else {
        console.error("fetchPosts - API error:", data.error)
        toast.error("Blog yazıları yüklenirken hata oluştu.")
      }
    } catch (error) {
      console.error("Blog yazıları getirirken hata:", error)
      toast.error("Blog yazıları yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
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
      formDataToSend.append("type", "blog")

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
          toast.success("Blog görseli başarıyla yüklendi!")
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

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      author: "",
      date: "",
      readTime: "",
      views: 0,
      tags: [],
      featured: false,
      published: true,
    })
    setEditingPost(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      console.log("handleSubmit - editingPost:", editingPost)
      console.log("handleSubmit - editingPost.slug:", editingPost?.slug)
      
      // Slug kontrolü
      if (editingPost && !editingPost.slug) {
        console.error("handleSubmit - editingPost.slug is missing!")
        toast.error("Düzenlenen blog yazısında slug bilgisi bulunamadı!")
        return
      }
      
      const url = editingPost ? `/api/blog/${editingPost.slug}` : "/api/blog"
      const method = editingPost ? "PUT" : "POST"
      
      console.log("handleSubmit - url:", url)
      console.log("handleSubmit - method:", method)

      // _id alanını hariç tut ve published değerini boolean'a çevir
      const { _id, ...submitData } = formData
      
      // Published değerini boolean'a çevir
      if (typeof submitData.published === 'string') {
        submitData.published = submitData.published === 'true'
      }
      
      console.log("Gönderilen veri ( _id hariç):", submitData)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()
      console.log("API Response:", data)

      if (data.success) {
        await fetchPosts()
        resetForm()
        toast.success(editingPost ? "Blog yazısı başarıyla güncellendi!" : "Blog yazısı başarıyla oluşturuldu!")
      } else {
        console.error("API Error:", data.error)
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error("Form gönderilirken hata:", error)
      toast.error("Form gönderilirken hata oluştu")
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (post) => {
    console.log("handleEdit - post:", post)
    console.log("handleEdit - post.slug:", post.slug)
    
    // Slug kontrolü
    if (!post.slug) {
      console.error("handleEdit - post.slug is missing!")
      toast.error("Blog yazısında slug bilgisi bulunamadı!")
      return
    }
    
    setEditingPost(post)
    // _id hariç tutularak yalnızca gerekli alanlar alınır
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      views: post.views,
      tags: Array.isArray(post.tags) ? post.tags : [],
      featured: post.featured,
      published: post.published !== undefined ? post.published : true,
    })
    setShowForm(true)
  }

  const handleDelete = async (slug) => {
    if (!confirm("Bu blog yazısı silinsin mi?")) return

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        await fetchPosts()
        toast.success("Blog yazısı başarıyla silindi!")
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error("Blog yazısı silinirken hata:", error)
      toast.error("Blog yazısı silinirken hata oluştu")
    }
  }

  const handleAddNew = () => {
    resetForm()
    setShowForm(true)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "select-one" && (value === "true" || value === "false") ? value === "true" : value,
    }))
  }

  const handleTagsChange = (e) => {
    const inputValue = e.target.value
    console.log("handleTagsChange - input value:", inputValue)
    
    const tags = inputValue
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    
    console.log("handleTagsChange - processed tags:", tags)
    setFormData((prev) => ({ ...prev, tags }))
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-muted rounded w-32 mb-2" />
            <div className="h-4 bg-muted rounded w-64" />
          </div>
          <div className="h-10 bg-muted rounded w-40" />
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/20 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Başlık</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Yazar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tarih</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Görüntülenme</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Blog Yönetimi</h1>
            <p className="text-blue-100 text-lg sm:text-xl mb-4 sm:mb-6">Blog yazılarınızı yönetin ve düzenleyin</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-sm sm:text-base font-semibold">Toplam: {posts.length} yazı</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <span className="text-sm sm:text-base font-semibold">Yayında: {posts.filter(p => p.published).length}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleAddNew} 
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 sm:gap-4 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white/20 w-full sm:w-auto"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Blog Yazısı Ekle
          </button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">Başlık</th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">Kategori</th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">Yazar</th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">Tarih</th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">Durum</th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">Görüntülenme</th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-bold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="max-w-xs">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">{post.date}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">{post.views}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Düzenle
                      </button>
                      <button 
                        onClick={() => handleDelete(post.slug)} 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">Hiç blog yazısı bulunamadı</div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-5xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingPost ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Ekle"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Basic Information */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Temel Bilgiler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Başlık *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Blog yazısı başlığını girin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="blog-yazisi-slug"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Kategori *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Kategori adını girin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Yazar *</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Yazar adını girin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Tarih *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Okuma Süresi *</label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="5 dk"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">İçerik</h4>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Özet *</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base h-24"
                    placeholder="Blog yazısı özetini girin"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">İçerik *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base h-48"
                    placeholder="Blog yazısı içeriğini girin"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Görsel</h4>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Blog Görseli</label>
                  <div className="relative">
                    <label className={`btn-primary cursor-pointer flex items-center gap-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Yükleniyor...
                        </>
                      ) : (
                        "Dosya Yükle"
                      )}
                      <input
                        type="file"
                        disabled={uploading}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                    {formData.image && (
                      <div className="mt-4">
                        <img
                          src={formData.image}
                          alt="Blog görseli"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags and Settings */}
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Etiketler ve Ayarlar</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Etiketler</label>
                    <input
                      type="text"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="etiket1, etiket2, etiket3"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-base font-semibold text-gray-700">Öne Çıkan</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-base font-semibold text-gray-700">Yayında</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {editingPost ? "Güncelle" : "Oluştur"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}