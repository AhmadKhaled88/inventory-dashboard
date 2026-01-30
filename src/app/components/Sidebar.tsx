// app/components/Sidebar.tsx
"use client";

import { useQueryState } from "nuqs";
import { categoryParam } from "../lib/searchParams";
import type { Category } from "../lib/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ categories }: { categories: Category[] }) {
  const [category, setCategory] = useQueryState(
    "category",
    categoryParam.withOptions({ shallow: false })
  );
  const pathname = usePathname();

  const active = category ?? "";
  const isEmployeesPage = pathname === "/employees";

  return (
    <aside className="w-80 hidden md:block border-r-2 border-blue-200 bg-gradient-to-b from-white via-blue-50/30 to-white p-6 sticky top-0 h-screen overflow-y-auto">
      <div className="sticky top-0">
        {/* Header */}
        <div className="mb-6 pb-4 border-b-2 border-blue-200">
          <h2 className="text-xl font-black text-blue-900 mb-1">Categories</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
        </div>

        <ul className="space-y-2">
         
          {/* Home Page */}
          <li>
            {isEmployeesPage ? (
              <Link
                href="/"
                className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 hover:bg-blue-100/50 text-blue-900 border-2 border-blue-100 hover:border-blue-200"
              >
                Home Page
              </Link>
            ) : (
              <button
                onClick={() => setCategory("")}
                className={
                  "w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold " +
                  "flex items-center gap-2 " +
                  (active === ""
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl scale-105"
                    : "hover:bg-blue-100/50 text-blue-900 border-2 border-blue-100 hover:border-blue-200")
                }
              >
                Home Page
              </button>
            )}
          </li>
           {/* Employees Link */}
           <li>
            <Link
              href="/employees"
              className={
                "w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold " +
                "flex items-center gap-2 " +
                (isEmployeesPage
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl scale-105"
                  : "hover:bg-blue-100/50 text-blue-900 border-2 border-blue-100 hover:border-blue-200")
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Employees
            </Link>
          </li>


          {/* Categories */}
          {categories.map((c, idx) => (
            <li key={c.slug}>
              {isEmployeesPage ? (
                <Link
                  href={"/?category=" + encodeURIComponent(c.slug)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold flex items-center gap-3 hover:bg-blue-100/50 text-blue-900 border-2 border-blue-100 hover:border-blue-200"
                  style={{ animation: `slideInLeft 0.4s ease-out ${idx * 0.05}s backwards` }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="flex-1">{c.name}</span>
                </Link>
              ) : (
                <button
                  onClick={() => setCategory(c.slug)}
                  className={
                    "w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold " +
                    "flex items-center gap-3 group relative overflow-hidden " +
                    (active === c.slug
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl"
                      : "hover:bg-blue-100/50 text-blue-900 border-2 border-blue-100 hover:border-blue-200")
                  }
                  style={{ animation: `slideInLeft 0.4s ease-out ${idx * 0.05}s backwards` }}
                >
                  <span
                    className={[
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      active === c.slug ? "bg-white scale-125 shadow-lg shadow-white/60" : "bg-blue-400 group-hover:bg-blue-500",
                    ].join(" ")}
                  />
                  <span className="flex-1">{c.name}</span>
                  {active === c.slug && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Footer Stats */}
        <div className="mt-6 pt-6 border-t-2 border-blue-200">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border-2 border-blue-200">
            <p className="text-xs font-bold text-blue-600 mb-1">TOTAL</p>
            <p className="text-2xl font-black text-blue-900">{categories.length}</p>
            <p className="text-xs text-blue-600/70">Categories Available</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </aside>
  );
}