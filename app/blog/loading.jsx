"use client"

import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"

const BlogLoading = () => {
  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="container mx-auto px-6">
        {/* Header Skeleton */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-32 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
        </motion.div>

        {/* Search & Filter Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="flex flex-col lg:flex-row gap-6 mb-12"
        >
          {/* Search Skeleton */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>

          {/* Filter Skeleton */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <div className="flex gap-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts Skeleton */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="mb-16"
        >
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-8 animate-pulse"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 + index * 0.1 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Regular Posts Grid Skeleton */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}>
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 + index * 0.1 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Skeleton */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
          className="mt-20 bg-gradient-to-r from-accent to-secondary rounded-2xl p-8 text-center"
        >
          <div className="h-8 bg-white/20 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 h-12 bg-white/20 rounded-xl animate-pulse"></div>
            <div className="h-12 w-32 bg-white/20 rounded-xl animate-pulse"></div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default BlogLoading
