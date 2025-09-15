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

        // Blog verileri
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          if (blogsData && Array.isArray(blogsData)) {
            setBlogs(blogsData.slice(0, 3));
          }
        }

        // Servis verileri
        if (servicesRes.ok) {
          const servicesJson = await servicesRes.json();
          const servicesData = servicesJson?.data || [];

          if (Array.isArray(servicesData)) {
            setServices(servicesData.slice(0, 3));
            const featured = servicesData.filter(
              (service) => service.featured === "true"
            );
            setFeaturedServices(featured);
          }
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
      <HeroCarousel />

      {/* Stats Section */}
      <StatsSection />

      {/* Service Cards Section */}
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