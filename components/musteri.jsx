"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ayşe K.",
    comment: "Harika bir deneyimdi! Cildim hiç bu kadar iyi hissetmemişti.",
  },
  {
    name: "Mehmet D.",
    comment: "Uzmanlar çok ilgiliydi, kesinlikle tekrar geleceğim.",
  },
  {
    name: "Elif S.",
    comment: "Tüm işlemler çok hijyenikti ve sonuçtan çok memnun kaldım.",
  },
  {
    name: "Burak T.",
    comment: "Profesyonel hizmet, güler yüzlü ekip. Tavsiye ederim!",
  },
  {
    name: "Zeynep Y.",
    comment: "Cildimdeki değişimi hemen fark ettim, teşekkürler!",
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartY = useRef(null);

  // Otomatik geçiş
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll ve touch ile geçiş
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current !== null) {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY.current - touchEndY > 40) {
          setIndex((prev) => (prev + 1) % testimonials.length);
        }
        touchStartY.current = null;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-xl p-6 text-center"
        >
          <p className="text-lg italic mb-4">"{testimonials[index].comment}"</p>
          <span className="font-semibold text-accent">{testimonials[index].name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
