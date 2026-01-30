import { getCategories, getEmployees } from "../lib/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EmployeesPageClient from "../components/EmployeesPageClient";

export default async function EmployeesPage() {
  const categories = await getCategories();

  let employees: Awaited<ReturnType<typeof getEmployees>>["employees"] = [];
  let total = 0;
  let initialError: string | null = null;

  try {
    const data = await getEmployees({ skip: 0, limit: 10_000 });
    employees = data.employees;
    total = data.total;
  } catch (e) {
    initialError = e instanceof Error ? e.message : "Failed to fetch employees";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-200/5 rounded-full blur-3xl" />
      </div>

      <div className="flex relative z-10 h-screen">
        <Sidebar categories={categories} />

        <main className="flex-1 min-w-0 flex flex-col bg-gradient-to-b from-white to-blue-50">
          <div className="sticky top-0 z-30 bg-gradient-to-b from-white/95 via-white/90 to-white/80 backdrop-blur-xl border-b border-blue-200/50 shadow-xl">
            <Topbar />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500">
                  Employees
                </h1>
                <p className="text-slate-600 mt-1">View and manage your team</p>
                <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full mt-3" />
              </div>
              <EmployeesPageClient
                initialEmployees={employees}
                initialTotal={total}
                initialError={initialError}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
