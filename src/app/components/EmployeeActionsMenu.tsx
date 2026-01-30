"use client";

import { useState, useRef, useEffect } from "react";
import type { Employee } from "../lib/api";

interface EmployeeActionsMenuProps {
  employee: Employee;
  onView: (e: Employee) => void;
  onEdit: (e: Employee) => void;
  onDelete: (e: Employee) => void;
}

export default function EmployeeActionsMenu({
  employee,
  onView,
  onEdit,
  onDelete,
}: EmployeeActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        aria-label="Actions"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 py-2 bg-white rounded-2xl shadow-xl shadow-indigo-200/50 border border-indigo-100 z-50 overflow-hidden">
          <div className="px-3 py-1.5 border-b border-indigo-100">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">Actions</p>
          </div>
          <div className="py-1">
            <button
              type="button"
              onClick={() => { onView(employee); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 flex items-center gap-3 transition-colors"
            >
              <span className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              View
            </button>
            <button
              type="button"
              onClick={() => { onEdit(employee); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 flex items-center gap-3 transition-colors"
            >
              <span className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              Edit
            </button>
            <button
              type="button"
              onClick={() => { onDelete(employee); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors"
            >
              <span className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </span>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
