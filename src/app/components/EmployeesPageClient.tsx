"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Employee } from "../lib/api";
import EmployeesTable from "./EmployeesTable";
import EmployeeModal from "./EmployeeModal";

const PAGE_SIZE = 10;

export default function EmployeesPageClient({
  initialEmployees,
  initialTotal,
  initialError,
}: {
  initialEmployees: Employee[];
  initialTotal: number;
  initialError: string | null;
}) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const totalPages = Math.max(1, Math.ceil(initialEmployees.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const employees = initialEmployees.slice(start, start + PAGE_SIZE);

  const handleView = useCallback((e: Employee) => {
    setSelectedEmployee(e);
    setModalMode("view");
  }, []);
  const handleEdit = useCallback((e: Employee) => {
    setSelectedEmployee(e);
    setModalMode("edit");
  }, []);
  const handleCloseModal = useCallback(() => {
    setModalMode(null);
    setSelectedEmployee(null);
  }, []);

  async function handleDelete(emp: Employee) {
    if (!confirm(`Delete ${emp.name1st} ${emp.nameLast}?`)) return;
    try {
      const res = await fetch(`/api/employees?id=${encodeURIComponent(emp.id)}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        alert(d?.error ?? "Delete failed");
        return;
      }
      router.refresh();
      handleCloseModal();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <>
      {initialError ? (
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p className="font-semibold">Could not load employees</p>
          <p className="text-sm mt-1">{initialError}</p>
        </div>
      ) : (
        <>
          <EmployeesTable
            employees={employees}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 shadow-lg shadow-indigo-200"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-slate-700 font-medium">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 shadow-lg shadow-indigo-200"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <EmployeeModal
        employee={selectedEmployee}
        mode={modalMode}
        onClose={handleCloseModal}
        onSaveSuccess={() => router.refresh()}
      />
    </>
  );
}
