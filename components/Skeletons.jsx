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

export {
  BlogCardSkeleton,
  ServiceCardSkeleton,
  DashboardCardSkeleton,
  TableRowSkeleton,
  CarouselTableRowSkeleton,
  ImageSkeleton,
}
