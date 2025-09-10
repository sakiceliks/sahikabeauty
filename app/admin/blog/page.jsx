"use client";

import { useState } from "react";
import BlogHeader from "../../../components/Admin/BlogHeader";
import BlogTable from "../../../components/Admin/BlogTable";
import BlogForm from "../../../components/Admin/BlogForm";
import { blogs as initialBlogs } from "../../../data/blogs";

export default function BlogYonetim() {
  const [posts, setPosts] = useState(initialBlogs);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [uploading, setUploading] = useState(false);
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
  });

  // Formu sıfırla
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
    });
    setEditingPost(null);
  };

  // Yeni blog ekle veya düzenle
  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    if (editingPost) {
      // Düzenleme
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id ? { ...formData, id: editingPost.id } : post
        )
      );
    } else {
      // Yeni ekle
      setPosts((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setUploading(false);
    setShowForm(false);
    resetForm();
  };

  // Düzenleme başlat
  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData(post);
    setShowForm(true);
  };

  // Silme işlemi
  const handleDelete = (id) => {
    if (window.confirm("Bu blog yazısı silinsin mi?")) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  // Yeni ekle butonu
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <BlogHeader onAddNew={handleAddNew} />
      <BlogTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      <BlogForm
        showForm={showForm}
        editingPost={editingPost}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onReset={resetForm}
        uploading={uploading}
        onFileUpload={() => {}}
      />
    </div>
  );
}
