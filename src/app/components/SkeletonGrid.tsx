// app/components/SkeletonGrid.tsx
export default function SkeletonGrid() {
  return (
    <div className="space-y-6">
      {/* Loading Header */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-linear-to-r from-blue-400 to-purple-400 animate-spin" style={{ borderRadius: '50%', animation: 'spin 1s linear infinite', borderTop: '2px solid transparent' }}></div>
        <span className="text-sm font-medium text-slate-500">Loading products...</span>
      </div>

      {/* Skeleton Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm animate-pulse"
            style={{
              animation: `fadeIn 0.6s ease-out ${i * 0.1}s both`,
            }}
          >
            {/* Image Skeleton */}
            <div className="aspect-4/3 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>

            {/* Content Skeleton */}
            <div className="p-5 space-y-4">
              {/* Category */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-20 bg-linear-to-r from-slate-200 to-slate-100 rounded-full"></div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-3 w-3 bg-slate-200 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Title Lines */}
              <div className="space-y-2">
                <div className="h-4 bg-linear-to-r from-slate-200 to-slate-100 rounded-lg w-full"></div>
                <div className="h-4 bg-linear-to-r from-slate-200 to-slate-100 rounded-lg w-4/5"></div>
              </div>

              {/* Price & Button */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 bg-linear-to-r from-slate-200 to-slate-100 rounded-lg"></div>
                  <div className="flex gap-2">
                    <div className="h-9 w-20 bg-linear-to-r from-slate-200 to-slate-100 rounded-lg"></div>
                    <div className="h-9 w-20 bg-linear-to-r from-slate-200 to-slate-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Style for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}