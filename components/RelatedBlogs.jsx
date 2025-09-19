"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const RelatedBlogs = ({ serviceCategory, serviceTitle, limit = 3 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog?published=true&category=${serviceCategory}`);
        const data = await response.json();
        
        if (data.success) {
          // İlgili kategorideki blogları al, eğer yoksa genel blogları al
          let relatedBlogs = data.data || [];
          
          // Eğer kategoriye özel blog yoksa, genel blogları al
          if (relatedBlogs.length === 0) {
            const generalResponse = await fetch("/api/blog?published=true");
            const generalData = await generalResponse.json();
            relatedBlogs = generalData.data || [];
          }
          
          // Sultanbeyli güzellik merkezi yazısını öne çıkar
          const featuredBlog = relatedBlogs.find(blog => blog.slug === 'sultanbeyli-guzellik-merkezi');
          const otherBlogs = relatedBlogs.filter(blog => blog.slug !== 'sultanbeyli-guzellik-merkezi');
          
          // Önce öne çıkan yazıyı, sonra diğerlerini ekle
          const sortedBlogs = featuredBlog ? [featuredBlog, ...otherBlogs] : otherBlogs;
          
          // Limit kadar blog al
          setBlogs(sortedBlogs.slice(0, limit));
        }
      } catch (error) {
        console.error("Blog yazıları yüklenirken hata:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [serviceCategory, limit]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="card-professional animate-pulse">
            <div className="h-48 bg-muted rounded-xl mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="h2 text-gradient mb-4">
          {serviceCategory} Hakkında Blog Yazıları
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {serviceTitle} hizmetimiz hakkında detaylı bilgiler ve uzman tavsiyeleri
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => {
          const isFeatured = blog.slug === 'sultanbeyli-guzellik-merkezi';
          return (
            <motion.article
              key={blog._id || blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card-professional group hover:shadow-lg transition-all duration-300 ${
                isFeatured ? 'ring-2 ring-primary/20 shadow-lg' : ''
              }`}
            >
            <div className="relative h-48 overflow-hidden rounded-xl mb-4">
              <Image
                src={blog.image || '/placeholder.svg'}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Blog Category Badge */}
              {blog.category && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {blog.category}
                </div>
              )}
              
              {/* Featured Badge */}
              {isFeatured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Öne Çıkan
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.date) || blog.publishDate}</span>
                </div>
                
                {blog.readTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-primary-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {blog.excerpt || blog.description || blog.content?.substring(0, 150) + '...'}
              </p>
              
              <div className="flex items-center justify-between">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    {blog.authorImage && (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={blog.authorImage}
                          alt={blog.author}
                          fill
                          className="object-cover"
                          sizes="24px"
                        />
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground">{blog.author}</span>
                  </div>
                )}
                
                <Link 
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium group-hover:gap-3"
                >
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </motion.article>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg"
        >
          Tüm Blog Yazılarını Gör
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.section>
  );
};

export default RelatedBlogs;
