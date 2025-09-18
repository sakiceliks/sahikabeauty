// @/components/Skeletons.tsx
import React from "react"

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="h-8 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="flex justify-between items-center">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

const FeaturedServiceSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="w-full h-32 bg-gray-200 rounded-xl mb-4" />
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

const DashboardCardSkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 bg-muted rounded w-24 mb-2" />
          <div className="h-8 bg-muted rounded w-16" />
        </div>
        <div className="w-8 h-8 bg-muted rounded" />
      </div>
    </div>
  )
}

const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-border animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-8" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-12" />
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-6 bg-muted rounded w-12" />
        </div>
      </td>
    </tr>
  )
}

const CarouselTableRowSkeleton = () => {
  return (
    <tr className="border-b border-border animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-8" />
      </td>
      <td className="px-6 py-4">
        <div className="w-16 h-10 bg-muted rounded-lg" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-24" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-40" />
      </td>
      <td className="px-6 py-4">
        <div className="h-5 bg-muted rounded-full w-12" />
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-6 bg-muted rounded w-12" />
        </div>
      </td>
    </tr>
  )
}

const ImageSkeleton = ({ className = "w-full h-48" }) => {
  return <div className={`bg-muted rounded-xl animate-pulse ${className}`} />
}

// Yeni eklenen skeleton'lar
const HeroSkeleton = () => {
  return (
    <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-r from-primary to-secondary animate-pulse overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto h-full flex items-center justify-center px-6">
        <div className="text-center text-white space-y-6 max-w-4xl">
          <div className="h-12 bg-white/20 rounded-full w-3/4 mx-auto mb-6" />
          <div className="h-8 bg-white/20 rounded w-2/3 mx-auto mb-4" />
          <div className="h-8 bg-white/20 rounded w-1/2 mx-auto" />
          <div className="flex justify-center space-x-4 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 w-32 bg-white/20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const StatsSkeleton = () => {
  return (
    <section className="py-16 bg-secondary-50 animate-pulse">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-12 bg-primary/20 rounded-full w-24 mx-auto mb-4" />
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialsSkeleton = () => {
  return (
    <section className="py-16 bg-white animate-pulse">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6">
              <div className="h-32 bg-gray-200 rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-3 bg-gray-200 rounded w-16 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BlogDetailSkeleton = () => {
  return (
    <div className="min-h-screen pt-32 pb-12 animate-pulse">
      <div className="container mx-auto px-6">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8">
          <div className="flex items-center text-sm space-x-2 h-6">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-8 mx-1" />
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-8 mx-1" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-12 space-y-6">
          <div className="flex items-center gap-2 mb-4 h-8">
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="h-12 bg-gray-200 rounded w-full" /> {/* Title */}
          <div className="flex flex-wrap gap-6 h-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            ))}
          </div>
          <div className="h-16 bg-gray-50 rounded-xl flex items-center gap-4 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-3 space-y-8">
            <div className="w-full h-[400px] bg-gray-200 rounded-2xl" /> {/* Featured Image */}
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded w-full" />
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded w-3/4" />
              ))}
            </div>
            <div className="pt-8 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-2 h-6">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 w-20 bg-gray-200 rounded-full" />
                ))}
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-32" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-24">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="p-6 border rounded-2xl space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-6 bg-gray-200 rounded w-48" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl h-64 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="space-y-1 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl h-80 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-24" />
              <div className="space-y-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded w-full" />
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent to-secondary p-6 rounded-2xl h-72 text-white space-y-4">
              <div className="h-6 bg-white/30 rounded w-40" />
              <div className="h-4 bg-white/30 rounded w-full" />
              <div className="space-y-3">
                <div className="h-10 bg-white/30 rounded w-full" />
                <div className="h-10 bg-white/30 rounded w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Comments Skeleton */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg space-y-8">
          <div className="flex items-center gap-2 h-8">
            <div className="w-6 h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl space-y-4">
            <div className="h-5 bg-gray-200 rounded w-20" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-10">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-full bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 space-y-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-gray-200 rounded w-20" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center h-6">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export {
  BlogCardSkeleton,
  ServiceCardSkeleton,
  FeaturedServiceSkeleton,
  DashboardCardSkeleton,
  TableRowSkeleton,
  CarouselTableRowSkeleton,
  ImageSkeleton,
  HeroSkeleton,
  StatsSkeleton,
  TestimonialsSkeleton,
  BlogDetailSkeleton,
}