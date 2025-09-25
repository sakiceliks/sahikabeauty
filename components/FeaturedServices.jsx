"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  ArrowRight,
  Clock,
  AlertCircle
} from "lucide-react";
import { ServiceCardSkeleton } from "@/components/Skeletons";

const FeaturedServices = ({ services = [], loading = false, error = null }) => {
  if (error) {
    return (
      <section className="py-20 bg-neutral-50 dark:bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 dark:text-muted-foreground mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-muted-foreground">
              Hizmetler yüklenirken bir hata oluştu.
            </p>
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
      className="py-20 bg-neutral-50 dark:bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-primary text-primary-900 dark:text-foreground mb-4">
            Öne Çıkan Hizmetlerimiz
          </h2>
          <p className="text-neutral-600 dark:text-muted-foreground max-w-2xl mx-auto">
            En popüler güzellik ve bakım hizmetlerimizi keşfedin
          </p>
        </motion.div>

        {/* Servis Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, index) => <ServiceCardSkeleton key={index} />)
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <ServiceCard
                key={service._id || index}
                service={service}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-600 dark:text-muted-foreground">Henüz hizmet bulunmuyor.</p>
            </div>
          )}
        </div>

        {/* CTA Buton */}
        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.8 },
            }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 bg-primary-600 dark:bg-primary text-white dark:text-primary-foreground px-8 py-3 rounded-xl hover:bg-primary-700 dark:hover:bg-primary/80 transition-all duration-300 font-medium shadow-beauty"
            >
              Tüm Hizmetleri Gör
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

const ServiceCard = ({ service, index }) => {
  // Reviews’tan rating ortalaması
  const avgRating =
    service.reviews && service.reviews.length > 0
      ? (
          service.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
          service.reviews.length
        ).toFixed(1)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.2, duration: 0.8 },
      }}
      viewport={{ once: true }}
      className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-beauty transition-all duration-300 group"
    >
      {/* Resim */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image || "/assets/placeholder.png"}
          alt={service.title || "Hizmet"}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* İçerik */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-primary-800 dark:text-card-foreground group-hover:text-primary-600 dark:group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          {avgRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
              <span className="text-sm text-neutral-600 dark:text-muted-foreground">{avgRating}</span>
            </div>
          )}
        </div>

        <p className="text-neutral-600 dark:text-muted-foreground mb-4 line-clamp-2">
          {service.description || "Açıklama yakında eklenecek."}
        </p>

        <div className="flex items-center justify-between">
          {service.duration && (
            <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-muted-foreground">
              <Clock className="w-4 h-4" />
              {service.duration}
            </div>
          )}

          <Link
            href={`/hizmetler/${service.slug}`}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary hover:text-primary-700 dark:hover:text-primary/80 transition-colors font-medium group-hover:gap-3"
          >
            Detaylar
            <ArrowRight className="w-4 h-4 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedServices;
