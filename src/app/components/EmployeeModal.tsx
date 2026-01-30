"use client";

import { useState, useEffect } from "react";
import type { Employee } from "../lib/api";

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

type FormState = {
  name1st: string;
  name2nd: string;
  name3rd: string;
  nameLast: string;
  mobileNo: string;
  address: string;
  dOB: string;
  identityNumber: string;
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">{label}</span>
      <span className="text-slate-800">{value ?? "—"}</span>
    </div>
  );
}

export default function EmployeeModal({
  employee,
  mode,
  onClose,
  onSaveSuccess,
}: {
  employee: Employee | null;
  mode: "view" | "edit" | null;
  onClose: () => void;
  onSaveSuccess?: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    name1st: "",
    name2nd: "",
    name3rd: "",
    nameLast: "",
    mobileNo: "",
    address: "",
    dOB: "",
    identityNumber: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!employee) return;
    setForm({
      name1st: employee.name1st ?? "",
      name2nd: employee.name2nd ?? "",
      name3rd: employee.name3rd ?? "",
      nameLast: employee.nameLast ?? "",
      mobileNo: employee.mobileNo ?? "",
      address: employee.address ?? "",
      dOB: employee.dOB ?? "",
      identityNumber: employee.identityNumber ?? "",
    });
    setSaveError(null);
  }, [employee]);

  if (!mode || !employee) return null;

  const isEdit = mode === "edit";
  const src = avatarSrc(employee);

  async function handleSave() {
    if (!employee) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/employees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: employee.id,
          name1st: form.name1st,
          name2nd: form.name2nd || null,
          name3rd: form.name3rd || null,
          nameLast: form.nameLast,
          mobileNo: form.mobileNo,
          address: form.address || null,
          dOB: form.dOB || null,
          identityNumber: form.identityNumber || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveError(data?.error ?? "Failed to save");
        return;
      }
      onSaveSuccess?.();
      onClose();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const devices = employee.employeeDevices ?? [];
  const documents = employee.employeeDocuments ?? [];
  const references = employee.employeeReferences ?? [];

  const inputClass = "w-full px-4 py-2.5 rounded-xl border-2 border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-colors";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-indigo-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with photo */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-6 pt-8 pb-24">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white">
              {isEdit ? "Edit" : "View"}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              {src ? (
                <img
                  src={src}
                  alt={fullName(employee)}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white/40 shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-white/30 flex items-center justify-center ring-4 ring-white/40 shadow-xl">
                  <span className="text-3xl font-bold text-white">{initials(employee)}</span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">{fullName(employee)}</h2>
              {employee.mobileNo ? (
                <a href={`tel:${employee.mobileNo}`} className="text-white/90 hover:text-white text-sm font-medium">
                  {employee.mobileNo}
                </a>
              ) : null}
              {employee.address ? <p className="text-white/80 text-sm mt-1">{employee.address}</p> : null}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 -mt-16 relative">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-100 p-6 space-y-6">
            {isEdit ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First name</label>
                    <input value={form.name1st} onChange={(e) => setForm((f) => ({ ...f, name1st: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Second name</label>
                    <input value={form.name2nd} onChange={(e) => setForm((f) => ({ ...f, name2nd: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Third name</label>
                    <input value={form.name3rd} onChange={(e) => setForm((f) => ({ ...f, name3rd: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last name</label>
                    <input value={form.nameLast} onChange={(e) => setForm((f) => ({ ...f, nameLast: e.target.value }))} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Mobile</label>
                  <input value={form.mobileNo} onChange={(e) => setForm((f) => ({ ...f, mobileNo: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>DOB</label>
                    <input value={form.dOB} onChange={(e) => setForm((f) => ({ ...f, dOB: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>ID number</label>
                    <input value={form.identityNumber} onChange={(e) => setForm((f) => ({ ...f, identityNumber: e.target.value }))} className={inputClass} />
                  </div>
                </div>
                {saveError && (
                  <div className="p-3 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-700 text-sm font-medium">
                    {saveError}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">Personal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First name" value={employee.name1st} />
                    <Field label="Second name" value={employee.name2nd} />
                    <Field label="Third name" value={employee.name3rd} />
                    <Field label="Last name" value={employee.nameLast} />
                    <Field label="Mobile" value={employee.mobileNo} />
                    <Field label="Address" value={employee.address} />
                    <Field label="DOB" value={employee.dOB} />
                    <Field label="Gender ID" value={employee.genderId} />
                    <Field label="Nationality ID" value={employee.nationalityId} />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-3">Identity</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Identity type ID" value={employee.identityTypeId} />
                    <Field label="Identity number" value={employee.identityNumber} />
                  </div>
                  {employee.identityImage && (
                    <div className="mt-4">
                      <span className={labelClass}>Photo</span>
                      <img
                        src={typeof employee.identityImage === "string" ? employee.identityImage : ""}
                        alt="Employee"
                        className="max-h-40 rounded-xl border-2 border-indigo-100 object-cover bg-indigo-50/50"
                      />
                    </div>
                  )}
                </div>
                {devices.length > 0 && (
                  <div className="p-4 rounded-xl bg-fuchsia-50/50 border border-fuchsia-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-fuchsia-600 mb-3">Devices</h3>
                    <ul className="space-y-2">
                      {devices.map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
                          {(d as { deviceId?: string }).deviceId ?? "—"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {documents.length > 0 && (
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">Documents</h3>
                    <ul className="space-y-2">
                      {documents.map((d, i) => (
                        <li key={i} className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
                          <span>Type: {(d as { documentTypeId?: string }).documentTypeId ?? "—"}</span>
                          <span>Expiry: {(d as { expiryDate?: string }).expiryDate ?? "—"}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {references.length > 0 && (
                  <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-3">References</h3>
                    <ul className="space-y-4">
                      {references.map((r, i) => {
                        const ref = r as { name?: string; mobileNo?: string; description?: string };
                        return (
                          <li key={i} className="p-4 rounded-xl bg-white border border-violet-100 shadow-sm">
                            <p className="font-semibold text-slate-800">{ref.name ?? "—"}</p>
                            <p className="text-sm text-slate-600">{ref.mobileNo ?? "—"}</p>
                            {ref.description ? <p className="text-sm text-slate-500 mt-1">{ref.description}</p> : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 border-2 border-slate-200 transition-colors"
            >
              {isEdit ? "Cancel" : "Close"}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 shadow-lg shadow-indigo-200 transition-all"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
