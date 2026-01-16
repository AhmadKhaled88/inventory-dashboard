// app/components/ProductsGrid.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import type { Product } from "../lib/api";
import ProductCard from "./ProductCard";
import SkeletonGrid from "./SkeletonGrid";
import { deleteProductAction } from "../actions";
import { useState } from "react";

export default function ProductsGrid({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [isPending, startTransition] = useTransition();
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(0);

  const [optimisticProducts, removeOptimistic] = useOptimistic(
    initialProducts,
    (state: Product[], removedId: number) =>
      state.filter((p) => p.id !== removedId)
  );

  const totalPages = Math.ceil(optimisticProducts.length / ITEMS_PER_PAGE);

  const goPrev = () => {
    setPage((p) => Math.max(p - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedProducts = optimisticProducts.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const onDelete = (id: number) => {
    startTransition(() => {
      removeOptimistic(id);
      deleteProductAction(id);
    });
  };

  if (isPending && optimisticProducts.length === 0) {
    return <SkeletonGrid />;
  }

  return (
    <div className="space-y-8">
      {/* Status Bar */}
      {isPending && (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-spin" style={{ borderRadius: "50%", animation: "spin 1s linear infinite", borderTop: "2px solid transparent" }}></div>
          </div>
          <span className="text-sm font-bold text-blue-700">
            Updating inventory...
          </span>
        </div>
      )}

      {/* Grid */}
      {optimisticProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
          {paginatedProducts.map((p) => (
            <div key={p.id} className="animate-in fade-in duration-300">
              <ProductCard product={p} onDelete={onDelete} />
            </div>
          ))}
        </div>
      ) : !isPending ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <div className="mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center shadow-lg">
            <span className="text-5xl">🛒</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No products found</h3>
          <p className="text-slate-600 text-center max-w-sm">
            Try adjusting your search or explore different categories
          </p>
        </div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8 pb-4">
          {/* Left Arrow */}
          <button
            onClick={goPrev}
            disabled={page === 0}
            className={[
              "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 font-bold text-lg",
              page === 0
                ? "opacity-40 cursor-not-allowed border-blue-200 text-blue-300 bg-blue-50"
                : "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-110 active:scale-95",
            ].join(" ")}
            aria-label="Previous page"
          >
            ←
          </button>

          {/* Page Info */}
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={[
                    "transition-all duration-300 font-semibold text-xs",
                    i === page
                      ? "w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg shadow-blue-500/40 scale-110"
                      : "w-6 h-6 text-blue-600 hover:text-blue-700 hover:scale-110",
                  ].join(" ")}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Page {page + 1} of {totalPages}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            disabled={page === totalPages - 1}
            className={[
              "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 font-bold text-lg",
              page === totalPages - 1
                ? "opacity-40 cursor-not-allowed border-blue-200 text-blue-300 bg-blue-50"
                : "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-110 active:scale-95",
            ].join(" ")}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      )}

      {/* Page Summary */}
      {optimisticProducts.length > 0 && (
        <div className="text-center text-sm text-slate-600 pt-4">
          Showing {page * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min((page + 1) * ITEMS_PER_PAGE, optimisticProducts.length)} of{" "}
          {optimisticProducts.length} products
        </div>
      )}
    </div>
  );
}