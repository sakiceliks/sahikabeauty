"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContactButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttons = [
    {
      id: "whatsapp",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      href: "https://wa.me/905304348349?text=Merhaba, randevu almak istiyorum.",
      target: "_blank"
    },
    {
      id: "phone",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      label: "Ara",
      color: "bg-blue-500 hover:bg-blue-600",
      href: "tel:+905304348349",
      target: "_self"
    },
    {
      id: "reservation",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
      label: "Rezervasyon",
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/rezervasyon",
      target: "_self"
    },
    {
      id: "directions",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: "Yol Tarifi",
      color: "bg-red-500 hover:bg-red-600",
      href: "https://www.google.com/maps/dir//Abdurrahmangazi,+Fatih+Blv.+No:73%2F1,+34920+Sultanbeyli%2Fİstanbul",
      target: "_blank"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 space-y-3"
          >
            {buttons.map((button, index) => (
              <motion.div
                key={button.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <Link
                  href={button.href}
                  target={button.target}
                  className={`${button.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 min-w-[140px] group`}
                >
                  <span className="text-xl">{button.icon}</span>
                  <span className="font-medium">{button.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ana Toggle Butonu */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${
          isExpanded 
            ? "bg-gray-600 hover:bg-gray-700" 
            : "bg-primary hover:bg-primary/90"
        } text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl"
        >
          {isExpanded ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Pulse animasyonu */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default FloatingContactButtons;
