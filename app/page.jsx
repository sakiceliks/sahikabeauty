"use client";

import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { CursorContext } from "@/components/CursorContext";
import HeroCarousel from "@/components/hero-carousel";
import TestimonialsCarousel from "@/components/musteri";
import ServiceCards from "@/components/service-cards";
import { BlogCardSkeleton, ServiceCardSkeleton } from "@/components/Skeletons";
import FeaturedServices from "@/components/FeaturedServices";
import BlogSection from "@/components/BlogSection";
import StatsSection from "@/components/StatsSection";
import { Sparkles } from "lucide-react";

const Home = () => {
 const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [blogsRes, servicesRes] = await Promise.all([
          fetch("/api/blog").catch((err) => ({ ok: false, error: err })),
          fetch("/api/services").catch((err) => ({ ok: false, error: err })),
        ]);
        
        const blogsData = await blogsRes.json();
        const servicesData = await servicesRes.json();
        
        if (blogsData && Array.isArray(blogsData)) {
          setBlogs(blogsData);
        }
        
        if (servicesData && Array.isArray(servicesData)) {
          setServices(servicesData.slice(0, 3));
        }
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
        setError("Veriler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        className="py-12 bg-secondary-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
        <ServiceCards services={services} loading={loading} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading durumunda skeleton göster
              [...Array(3)].map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))
            ) : (
              // Veriler yüklendiğinde servisleri göster
              services.map((service, index) => (
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
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Featured Services Section */}
                <FeaturedServices services={featuredServices} />


      {/* Blog Section */}
      <BlogSection blogs={blogs} />


      {/* Testimonials */}
      <TestimonialsCarousel />
    </>
  );
};

export default Home;