"use client";

import type { Employee } from "../lib/api";
import EmployeeActionsMenu from "./EmployeeActionsMenu";

function fullName(e: Employee): string {
  const parts = [e.name1st, e.name2nd, e.name3rd, e.nameLast].filter(Boolean);
  return parts.join(" ") || "—";
}

function initials(e: Employee): string {
  const a = e.name1st?.trim().slice(0, 1) ?? "";
  const b = e.nameLast?.trim().slice(0, 1) ?? "";
  return (a + b).toUpperCase() || "?";
}

function avatarSrc(e: Employee): string | null {
  const v = e.identityImage;
  if (!v || typeof v !== "string") return null;
  if (v.startsWith("data:")) return v;
  return v;
}

export default function EmployeesTable({
  employees,
  onView,
  onEdit,
  onDelete,
}: {
  employees: Employee[];
  onView: (e: Employee) => void;
  onEdit: (e: Employee) => void;
  onDelete: (e: Employee) => void;
}) {
  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">No employees found.</p>
        <p className="text-sm text-slate-400 mt-1">Add employees to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl shadow-indigo-200/30 border border-slate-200/80 bg-white">
      {/* Subtle gradient wrapper */}
      <div className="bg-gradient-to-b from-white to-indigo-50/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90 w-20">Photo</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90">Name</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90">Mobile</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90">Address</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90">DOB</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90">ID Number</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/90 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, i) => {
                const src = avatarSrc(e);
                return (
                  <tr
                    key={e.id}
                    className={`
                      group border-b border-slate-100 last:border-b-0
                      transition-all duration-200 cursor-pointer
                      hover:bg-indigo-50/60 hover:shadow-[inset_0_0_0_2px_rgba(99,102,241,0.15)]
                      ${i % 2 === 1 ? "bg-slate-50/50" : "bg-white"}
                    `}
                    onClick={() => onView(e)}
                  >
                    <td className="px-5 py-4" onClick={(ev) => ev.stopPropagation()}>
                      {src ? (
                        <img
                          src={src}
                          alt={fullName(e)}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-200/80 group-hover:ring-indigo-400 group-hover:shadow-md transition-all duration-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-indigo-200/60 group-hover:ring-indigo-400 group-hover:scale-105 transition-all duration-200">
                          {initials(e)}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {fullName(e)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{e.mobileNo || "—"}</td>
                    <td className="px-5 py-4 text-slate-600">{e.address || "—"}</td>
                    <td className="px-5 py-4 text-slate-600">{e.dOB || "—"}</td>
                    <td className="px-5 py-4 font-mono text-sm text-indigo-700/80">{e.identityNumber || "—"}</td>
                    <td className="px-5 py-4 text-right" onClick={(ev) => ev.stopPropagation()}>
                      <EmployeeActionsMenu employee={e} onView={onView} onEdit={onEdit} onDelete={onDelete} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
