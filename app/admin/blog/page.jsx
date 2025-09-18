"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { TableRowSkeleton } from "@/components/Skeletons"
import Link from "next/link"

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

      if (data.success) {
        setPosts(data.data)
      } else {
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
      const url = editingPost ? `/api/blog/${editingPost.slug}` : "/api/blog"
      const method = editingPost ? "PUT" : "POST"

      // _id alanını hariç tut
      const { _id, ...submitData } = formData
      console.log("Gönderilen veri ( _id hariç):", submitData)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchPosts()
        resetForm()
        toast.success(editingPost ? "Blog yazısı başarıyla güncellendi!" : "Blog yazısı başarıyla oluşturuldu!")
      } else {
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
      [name]: type === "checkbox" ? checked : value,
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2 text-foreground">Blog Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Blog yazılarınızı yönetin ve düzenleyin</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary">
          Yeni Blog Yazısı Ekle
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Başlık</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Yazar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tarih</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Durum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Görüntülenme</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 text-foreground">{post.slug}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{post.author}</td>
                  <td className="px-6 py-4 text-foreground">{post.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{post.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1 rounded text-sm transition-colors"
                      >
                        Düzenle
                      </button>
                      <button onClick={() => handleDelete(post.slug)} className="btn-destructive text-sm px-3 py-1">
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
          <div className="bg-card rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              {editingPost ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Ekle"}
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
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Yazar *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Tarih *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Okuma Süresi *</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    required
                    placeholder="5 dk"
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Görüntülenme</label>
                  <input
                    type="number"
                    name="views"
                    value={formData.views}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Öne Çıkan</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                    />
                    <label htmlFor="featured" className="text-sm text-card-foreground">
                      Bu yazıyı öne çıkar
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Yayın Durumu</label>
                  <select
                    name="published"
                    value={formData.published}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  >
                    <option value={true}>Yayında</option>
                    <option value={false}>Taslak</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Etiketler (virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    value={formData.tags.join(", ")}
                    onChange={handleTagsChange}
                    placeholder="teknoloji, sağlık, güzellik"
                    className="input-field w-full"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Mevcut etiketler: {JSON.stringify(formData.tags)} ({formData.tags.length} adet)
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-card-foreground mb-2">Görsel</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Görsel URL"
                      className="input-field w-full"
                    />
                    <div className="flex items-center gap-2">
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
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Özet *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">İçerik *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="10"
                  className="input-field w-full"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "İşleniyor..." : editingPost ? "Yazıyı Güncelle" : "Yazı Oluştur"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}