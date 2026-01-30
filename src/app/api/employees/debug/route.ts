import { NextResponse } from "next/server";

const EMPLOYEE_BASE =
  (typeof process !== "undefined" && process.env?.EMPLOYEE_API_BASE_URL) ||
  "https://routino.limatech.co/api/talento/employee";

function debugHeaders(): Record<string, string> {
  const tenant = (typeof process !== "undefined" && process.env?.EMPLOYEE_API_TENANT) || "default";
  const env = (typeof process !== "undefined" && process.env?.EMPLOYEE_API_ENVIRONMENT) || "development";
  const tz = (typeof process !== "undefined" && process.env?.EMPLOYEE_API_TIME_ZONE) || "UTC";
  const lang = (typeof process !== "undefined" && process.env?.EMPLOYEE_API_ACCEPT_LANGUAGE) || "en";
  return {
    Accept: "application/json",
    "accept-language": lang,
    "x-tenant-name": tenant,
    "x-environment": env,
    "x-time-zone": tz,
  };
}

export async function GET() {
  try {
    const res = await fetch(EMPLOYEE_BASE, {
      cache: "no-store",
      headers: debugHeaders(),
    });
    const text = await res.text();
    let raw: unknown;
    try {
      raw = text ? JSON.parse(text) : null;
    } catch {
      raw = { _raw: text.slice(0, 500), _note: "Response was not JSON" };
    }
    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      raw,
      keys: typeof raw === "object" && raw && !Array.isArray(raw) ? Object.keys(raw as object) : [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Fetch failed" },
      { status: 500 }
    );
  }
}
