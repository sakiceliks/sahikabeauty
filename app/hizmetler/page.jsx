"use client";
import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CursorContext } from "@/components/CursorContext";
import Link from "next/link";

const skeletonCount = 6;

const Services = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories || []);
          setServices(data.data || []);
        }
      } catch (err) {
        setCategories([]);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      className="min-h-screen flex flex-col items-center overflow-x-hidden"
    >
      <div className="container mx-auto pt-32 pb-12 px-6 xl:px-0">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h2 className="h2 mb-4">Hizmetlerimiz</h2>
          <p className="lead max-w-[600px] mx-auto">
            Cilt bakımından kalıcı makyaja kadar geniş hizmet yelpazemizle yanınızdayız.
          </p>
        </div>

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === "all"
                ? "bg-accent text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition`}
          >
            Tümü
          </button>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className="w-20 h-8 bg-gray-200 rounded-full animate-pulse mx-1"
                ></span>
              ))
            : categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full border ${
                    activeCategory === cat.id
                      ? "bg-accent text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } transition`}
                >
                  {cat.name}
                </button>
              ))}
        </div>

        {/* Hizmet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center animate-pulse"
                >
                  <div className="w-[120px] h-[120px] mb-6 bg-gray-300 rounded-xl" />
                  <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
                  <div className="h-4 w-48 bg-gray-200 rounded mb-4" />
                  <div className="h-8 w-24 bg-gray-300 rounded" />
                </div>
              ))
            : filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2 * index },
                  }}
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative w-[120px] h-[120px] mb-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <Link href={`/hizmetler/${service.slug}`}>
                    <button className="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition">
                      Detayları Gör
                    </button>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
