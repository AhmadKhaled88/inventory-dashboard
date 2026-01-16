// app/page.tsx
import { getCategories, getProducts } from "./lib/api";
import { qParam, categoryParam, DashboardSearchParams } from "./lib/searchParams";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProductsGrid from "./components/ProductsGrid";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const sp = await searchParams;

  const q = qParam.parse(sp.q ?? "") ?? "";
  const category = categoryParam.parse(sp.category ?? "") ?? "";

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ q, category }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        
        {/* Floating cards decoration */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-blue-300/5 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-tr from-blue-300/5 to-blue-200/5 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="flex relative z-10 h-screen">
        {/* Sidebar */}
        <Sidebar categories={categories} />

        <main className="flex-1 min-w-0 flex flex-col bg-gradient-to-b from-white to-blue-50">
          {/* Sticky Topbar */}
          <div className="sticky top-0 z-30 bg-gradient-to-b from-white/95 via-white/90 to-white/80 backdrop-blur-xl border-b border-blue-200/50 shadow-xl">
            <Topbar />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
              {/* Hero Section */}
              <div className="mb-12 relative">
                {/* Decorative background shape */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
                    {/* Title Section */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-lg shadow-blue-400/30"></div>
                        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 tracking-tight leading-tight">
                          Products
                        </h1>
                      </div>
                      <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
                        {q 
                          ? `🔍 Search results for "${q}"` 
                          : category 
                          ? `📂 Browsing ${category}`
                          : "✨ Discover our amazing collection of premium products"
                        }
                      </p>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:border-blue-300 group">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-500 mb-2">Available Items</p>
                        <div className="flex items-baseline justify-end gap-3">
                          <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                            {products.length}
                          </span>
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative line */}
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-300/50 to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="mb-8">
                <ProductsGrid initialProducts={products} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating accent elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-25 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
    </div>
  );
}