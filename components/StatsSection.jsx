"use client";

import { motion } from "framer-motion";
import { Users, Award, Shield, Heart, Star, Clock } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { 
      icon: Users, 
      value: "5000+", 
      label: "Mutlu Müşteri",
      description: "Güven duyduğumuz müşteri kitlesi"
    },
    { 
      icon: Award, 
      value: "10+", 
      label: "Yıl Deneyim",
      description: "Sektördeki tecrübemiz"
    },
    { 
      icon: Shield, 
      value: "100%", 
      label: "Güvenli Uygulama",
      description: "Sertifikalı ürünler ve hijyen"
    },
    { 
      icon: Heart, 
      value: "99%", 
      label: "Memnuniyet",
      description: "Müşteri memnuniyet oranımız"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1 } }}
      viewport={{ once: true }}
      className="py-16 bg-primary-50"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-primary text-primary-900 mb-4">
            Neden Bizi Tercih Ediyorlar?
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Yılların deneyimi ve müşteri odaklı yaklaşımımızla güzelliğinizi öne çıkarıyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.8 } }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-beauty transition-all duration-300"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4 group-hover:bg-primary-600 transition-colors duration-300">
          <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
        </div>
        
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold text-primary-800 mb-2"
        >
          {stat.value}
        </motion.div>
        
        <h3 className="text-lg font-semibold text-primary-700 mb-2">
          {stat.label}
        </h3>
        
        <p className="text-sm text-neutral-600 leading-relaxed">
          {stat.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StatsSection;