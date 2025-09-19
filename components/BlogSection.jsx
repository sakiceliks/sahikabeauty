"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AlertCircle, Calendar, Clock } from "lucide-react";
import { BlogCardSkeleton } from "@/components/Skeletons";

const BlogSection = ({ blogs = [], loading = false, error = null }) => {
  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">Blog yazıları yüklenirken bir hata oluştu.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1 } }}
      viewport={{ once: true }}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-primary text-primary-900 mb-4">
            Son Blog Yazıları
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Güzellik ve bakım hakkında güncel bilgiler ve ipuçları
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading durumunda skeleton göster
            [...Array(3)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : blogs.length > 0 ? (
            // Veriler yüklendiğinde blogları göster
            blogs.map((blog, index) => (
              <BlogCard key={blog.id || index} blog={blog} index={index} />
            ))
          ) : (
            // Veri yoksa boş durum
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-600">Henüz blog yazısı bulunmuyor.</p>
            </div>
          )}
        </div>

        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 font-medium shadow-beauty"
              >
                📝 Tüm Blog Yazıları
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 font-medium"
              >
                ✨ Hizmetlerimizi Keşfedin
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="bg-primary/10 px-3 py-1 rounded-full">💡 Uzman Tavsiyeleri</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">📚 Güzellik Rehberleri</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">🔬 Son Teknolojiler</span>
              <span className="bg-primary/10 px-3 py-1 rounded-full">⭐ Müşteri Deneyimleri</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

const BlogCard = ({ blog, index }) => {
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.8 } }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-beauty transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={blog.image || '/placeholder.svg'}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Blog Category Badge */}
        {blog.category && (
          <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {blog.category}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
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
        
        <p className="text-neutral-600 mb-4 line-clamp-3">
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
              <span className="text-sm text-neutral-500">{blog.author}</span>
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
};

export default BlogSection;
