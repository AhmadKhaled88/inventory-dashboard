import { NextRequest, NextResponse } from "next/server";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
} from "../../lib/api";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    try {
      const employee = await getEmployee(id);
      return NextResponse.json(employee);
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Failed to fetch employee" },
        { status: 500 }
      );
    }
  }
  const skip = Number(request.nextUrl.searchParams.get("skip") ?? 0);
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 10);
  try {
    const data = await getEmployees({ skip, limit });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = CreateEmployeeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid employee data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const data = await createEmployee(parsed.data);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create employee" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = UpdateEmployeeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid employee data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const data = await updateEmployee(parsed.data);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update employee" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  try {
    await deleteEmployee(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to delete employee" },
      { status: 500 }
    );
  }
}
