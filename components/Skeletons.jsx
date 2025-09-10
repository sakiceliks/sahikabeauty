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
  );
};

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
  );
};

export { BlogCardSkeleton, ServiceCardSkeleton };
