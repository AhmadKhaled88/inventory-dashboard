// app/components/ProductCard.tsx
"use client";

import { useState } from "react";
import type { Product } from "../lib/api";

export default function ProductCard({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: number) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 250));
    onDelete(product.id);
  };

  return (
    <div
      className={[
        "group relative rounded-3xl overflow-hidden transition-all duration-400",
        "border-2 border-blue-200 bg-white",
        "hover:shadow-2xl hover:shadow-blue-300/50 hover:border-blue-400",
        "hover:scale-105 hover:-translate-y-2",
        isDeleting && "opacity-0 scale-95",
      ].filter(Boolean).join(" ")}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-linear-to-br from-blue-100 to-blue-50 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div
          className={[
            "absolute inset-0 bg-linear-to-t from-blue-900/40 via-transparent to-transparent",
            "transition-opacity duration-300",
            showDetails ? "opacity-100" : "opacity-0",
          ].filter(Boolean).join(" ")}
        />

        {/* Badge Container */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Stock Badge */}
          <div className={[
            "px-4 py-2 rounded-full text-xs font-bold text-white backdrop-blur-lg",
            "border border-blue-300/40",
            "bg-linear-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30",
            "transform transition-all duration-300",
            showDetails ? "scale-100" : "scale-95",
          ].filter(Boolean).join(" ")}>
            ✓ In Stock
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={[
              "p-2.5 rounded-full backdrop-blur-lg border transition-all duration-300",
              "hover:scale-110 active:scale-95",
              "transform transition-transform",
              isFavorited
                ? "bg-blue-500/80 border-blue-400/60 text-white shadow-lg shadow-blue-500/40"
                : "bg-white/80 border-white/40 text-blue-400 hover:text-blue-600 hover:bg-white/90",
            ].filter(Boolean).join(" ")}
          >
            <svg className="w-5 h-5" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Details on Hover */}
        {showDetails && (
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white backdrop-blur-md bg-blue-900/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-semibold text-blue-100">Category</p>
            <p className="text-sm font-bold">{product.category}</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-2">
            {product.title}
          </h3>
          <div className="h-0.5 w-6 bg-linear-to-r from-blue-600 to-blue-400 rounded-full shadow-lg shadow-blue-400/30"></div>
        </div>

        {/* Price Section */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border border-blue-200/60">
          <p className="text-xs font-semibold text-slate-600 mb-1">Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-500">
              ${product.price.toFixed(2)}
            </span>
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={[
                "flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-300",
                "bg-linear-to-r from-red-500 to-red-600 text-white",
                "hover:shadow-lg hover:shadow-red-500/40 hover:scale-105",
                "active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-1",
              ].filter(Boolean).join(" ")}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Remove
          </button>

        
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent" style={{
          animation: "shimmer 3s infinite",
        }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}