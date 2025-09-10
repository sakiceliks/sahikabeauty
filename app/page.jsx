"use client";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CursorContext } from "@/components/CursorContext";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Heart,
  Clock,
  Award,
  Users,
  Quote
} from "lucide-react";
import ModalVideo from "@/components/ModalVideo";
import TestimonialsCarousel from "@/components/musteri";

const Home = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);

  // Örnek hizmetler verisi
  const featuredServices = [
    {
      id: 1,
      title: "Lazer Epilasyon",
      description: "Falcon 4 Pro ile kalıcı çözüm",
      image: "/assets/services/lazer-epilasyon.png",
      slug: "lazer-epilasyon",
      price: "₺150",
      duration: "45 dk",
      rating: 4.9
    },
    {
      id: 2,
      title: "HydraFacial",
      description: "Derin temizlik ve nemlendirme",
      image: "/assets/services/hydrafacial.png",
      slug: "hydrafacial",
      price: "₺300",
      duration: "60 dk",
      rating: 4.8
    },
    {
      id: 3,
      title: "Anti Age",
      description: "Doğal görünümlü gençleşme",
      image: "/assets/services/botox.png",
      slug: "anti-age",
      price: "₺800",
      duration: "30 dk",
      rating: 5.0
    }
  ];

  // Örnek blog yazıları
  const featuredBlogs = [
    {
      id: 1,
      title: "2024'te En Popüler Güzellik Trendleri",
      excerpt: "Bu yıl hangi güzellik uygulamaları öne çıkıyor, detaylı inceleme...",
      image: "/assets/blog/trends-2024.png",
      slug: "2024-guzellik-trendleri",
      date: "15 Mart 2024",
      readTime: "5 dk"
    },
    {
      id: 2,
      title: "Lazer Epilasyon Hakkında Bilmeniz Gerekenler",
      excerpt: "Lazer epilasyon öncesi ve sonrası nelere dikkat etmeli...",
      image: "/assets/blog/lazer-rehberi.png",
      slug: "lazer-epilasyon-rehberi",
      date: "10 Mart 2024",
      readTime: "7 dk"
    },
    {
      id: 3,
      title: "Kışın Cilt Bakımı İpuçları",
      excerpt: "Soğuk havalarda cildinizi nasıl koruyabilirsiniz...",
      image: "/assets/blog/kis-bakim.png",
      slug: "kis-cilt-bakimi",
      date: "5 Mart 2024",
      readTime: "4 dk"
    }
  ];

  // Müşteri yorumları
  const testimonials = [
    {
      id: 1,
      name: "Ayşe K.",
      comment: "Harika bir deneyim yaşadım. Personel çok ilgili ve sonuçlar mükemmel!",
      rating: 5,
      service: "Lazer Epilasyon",
      image: "/assets/testimonials/customer1.png"
    },
    {
      id: 2,
      name: "Zeynep D.",
      comment: "Klinik çok temiz ve modern. Kesinlikle tavsiye ederim.",
      rating: 5,
      service: "HydraFacial",
      image: "/assets/testimonials/customer2.png"
    },
    {
      id: 3,
      name: "Burcu M.",
      comment: "Beklentilerimin üzerinde bir hizmet aldım. Teşekkürler!",
      rating: 5,
      service: "Botox",
      image: "/assets/testimonials/customer3.png"
    }
  ];

  const stats = [
    { icon: Users, value: "5000+", label: "Mutlu Müşteri" },
    { icon: Award, value: "10+", label: "Yıl Deneyim" },
    { icon: Shield, value: "100%", label: "Güvenli Uygulama" },
    { icon: Heart, value: "99%", label: "Memnuniyet" }
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2 } }}
        className="min-h-screen flex items-center overflow-x-hidden relative"
      >
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row items-center h-full">
            {/* text */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 2, duration: 1, ease: "easeInOut" },
              }}
              className="w-full text-center xl:text-left xl:w-[500px] pt-[120px]"
            >
              <motion.div className="flex items-center gap-2 justify-center xl:justify-start mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Premium Güzellik Merkezi</span>
              </motion.div>
              
              <motion.h1
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                className="h1 mb-6"
              >
                Doğal Güzellik <br /> Burada Başlar
              </motion.h1>
              
              <motion.p
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                className="lead max-w-xl mx-auto xl:mx-0 mb-8"
              >
                Kişiye özel cilt bakımı çözümleri ve son teknoloji uygulamalar ile 
                doğal güzelliğinizi ortaya çıkarın
              </motion.p>
              
              <div className="flex flex-col xl:flex-row items-center gap-6 max-w-max mx-auto xl:mx-0">
                <motion.button
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}
                  className="btn btn-lg font-bold bg-gradient-to-r !text-title from-accent to-secondary hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                 <Link className="flex" href="/rezervasyon">
                  <Calendar className="w-5 h-5 mr-2" />
                  Randevu Al</Link>
                </motion.button>
                <motion.div
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}
                >
                  <ModalVideo />
                </motion.div>
              </div>
            </motion.div>
            
            {/* image */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, bottom: "-100%" }}
                animate={{
                  opacity: 1,
                  bottom: 0,
                  transition: { delay: 2.4, duration: 1.2, ease: "easeInOut" },
                }}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                className="hidden xl:flex fixed bottom-0"
              >
                <Image
                  src={"/assets/home/img.png"}
                  width={864}
                  height={650}
                  quality={100}
                  alt="Beauty Professional"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 3, duration: 1 } }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden xl:flex gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-bold text-lg text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Öne Çıkan Hizmetler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uzman ekibimiz ve son teknoloji cihazlarımızla size en iyi hizmeti sunuyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.8 } }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-primary">
                    {service.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                    
                    <Link 
                      href={`/hizmetler/${service.slug}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
                    >
                      Detaylar
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="btn btn-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Tüm Hizmetler
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Customer Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Müşteri Deneyimleri</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Binlerce mutlu müşterimizin deneyimlerini okuyun
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.8 } }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg relative"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic mb-6">"{testimonial.comment}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.service}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <TestimonialsCarousel />
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Son Blog Yazıları</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Güzellik ve bakım hakkında güncel bilgiler ve ipuçları
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.8 } }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime} okuma</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="btn btn-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Tüm Yazılar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-primary to-secondary text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            <h2 className="h2 mb-6">Güzellik Yolculuğunuza Başlayın</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Uzman ekibimizle tanışın ve size özel bakım planınızı oluşturalım
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-white text-primary hover:bg-gray-50 transition-colors">
                <Calendar className="w-5 h-5 mr-2" />
                Ücretsiz Konsültasyon
              </button>
              <button className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                Bizi Arayın
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;