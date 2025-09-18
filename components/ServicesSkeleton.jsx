import React from 'react';
import { Sparkles } from 'lucide-react';

const ServicesSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Hangi Hizmeti İstiyorsunuz?</h2>
        <p className="text-gray-600">Size en uygun hizmeti seçin ve güzellik yolculuğunuza başlayın</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl border-2 border-gray-200 animate-pulse"
          >
            {/* Popüler etiketi skeleton */}
            <div className="absolute -top-3 left-4 bg-gray-200 h-6 w-16 rounded-full"></div>
            
            {/* İkon skeleton */}
            <div className="w-16 h-16 rounded-2xl bg-gray-200 mb-4"></div>
            
            {/* Başlık skeleton */}
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            
            {/* Kategori skeleton */}
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            
            {/* Açıklama skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            {/* Fiyat ve süre skeleton */}
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>

            {/* Uygulama alanları skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="flex flex-wrap gap-1">
                <div className="h-6 bg-gray-200 rounded w-12"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-14"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSkeleton;
