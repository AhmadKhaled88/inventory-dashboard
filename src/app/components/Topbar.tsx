// app/components/Topbar.tsx
"use client";

import { useQueryState } from "nuqs";
import { qParam } from "../lib/searchParams";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [q, setQ] = useQueryState("q", qParam.withOptions({ shallow: false }));
  const [value, setValue] = useState(q);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setValue(q), [q]);

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(value || "");
    }, 300);
    return () => clearTimeout(t);
  }, [value, setQ]);

  return (
    <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4 bg-white">
      {/* Search Input Group */}
      <div className="flex-1 relative group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400 group-focus-within:text-blue-600 transition-colors duration-300">
          <svg
            className="w-5 h-5 transition-transform duration-300 group-focus-within:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products..."
          className={[
            "w-full pl-12 pr-12 py-3 rounded-xl text-sm font-medium",
            "border-2 transition-all duration-300",
            "bg-white text-slate-900 placeholder-slate-400",
            isFocused
              ? "border-blue-500 ring-2 ring-blue-100 shadow-lg shadow-blue-400/30"
              : "border-blue-200 hover:border-blue-300 shadow-sm",
          ].join(" ")}
        />       
      </div>
    </div>
  );
}

