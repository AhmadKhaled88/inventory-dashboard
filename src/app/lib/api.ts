import { z } from "zod";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

export type Category = {
  slug: string;
  name: string;
};

// Employee types and schemas based on new API
export const EmployeeSchema = z.object({
  id: z.string(),
  name1st: z.string(),
  name2nd: z.string().nullable().optional(),
  name3rd: z.string().nullable().optional(),
  nameLast: z.string(),
  mobileNo: z.string(),
  address: z.string().nullable().optional(),
  genderId: z.string().nullable().optional(),
  dOB: z.string().nullable().optional(),
  nationalityId: z.string().nullable().optional(),
  identityTypeId: z.string().nullable().optional(),
  identityNumber: z.string().nullable().optional(),
  identityImage: z.string().nullable().optional(),
  employeeDevices: z.array(z.any()).optional(),
  employeeDocuments: z.array(z.any()).optional(),
  employeeReferences: z.array(z.any()).optional(),
}).passthrough(); 

export type Employee = z.infer<typeof EmployeeSchema>;

export const CreateEmployeeSchema = EmployeeSchema.omit({ id: true });
export const UpdateEmployeeSchema = EmployeeSchema.partial().extend({ id: z.string() });

type CategoriesApiResponse = {
  slug: string;
  name: string;
}[];

type ProductsApiResponse = {
  products: Product[];
};

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://dummyjson.com/products/categories",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: CategoriesApiResponse = await res.json();
  //(c) = Category
  return data.map((c) => ({
    slug: c.slug,
    name: c.name,
  }));
}

//(q) = Search Query
export async function getProducts(
  opts: { q?: string; category?: string }
): Promise<Product[]> {
  const { q = "", category = "" } = opts;

  let products: Product[] = [];

  if (q.trim()) {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsApiResponse = await res.json();
    products = data.products;
  } else {
    const res = await fetch(
      "https://dummyjson.com/products?limit=100",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsApiResponse = await res.json();
    products = data.products;
  }

  if (category.trim()) {
    products = products.filter(
      (p) => p.category === category
    );
  }

  return products;
}

// Employee API functions
const API_BASE_URL = "https://routino.limatech.co/api/talento/employee";

type EmployeesApiResponse = Employee[];

export async function getEmployees(
  opts: { skip?: number; limit?: number } = {}
): Promise<{ employees: Employee[]; total: number }> {
  const res = await fetch(API_BASE_URL, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text(); // Get actual backend error
    console.error("Backend failed:", text);
    throw new Error(`Failed to fetch employees: ${res.status} ${res.statusText}`);
  }

  const raw = await res.json();

  // Make sure we have an array
  const data: Employee[] = Array.isArray(raw) ? raw : raw.data ?? [];

  const employees: Employee[] = data
    .map((emp) => {
      try {
        return EmployeeSchema.parse(emp);
      } catch (err) {
        console.error("Failed to parse employee:", emp, err);
        return null;
      }
    })
    .filter((e): e is Employee => e !== null);

  const { skip = 0, limit = 10 } = opts;
  const paginatedEmployees = employees.slice(skip, skip + limit);

  return {
    employees: paginatedEmployees,
    total: employees.length,
  };
}

export async function getEmployee(id: string): Promise<Employee> {
  const res = await fetch(
    `${API_BASE_URL}?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch employee");
  }

  const employee = await res.json();
  return EmployeeSchema.parse(employee);
}

export async function createEmployee(data: z.infer<typeof CreateEmployeeSchema>): Promise<Employee> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create employee");
  }

  const employee = await res.json();
  return EmployeeSchema.parse(employee);
}

export async function updateEmployee(data: z.infer<typeof UpdateEmployeeSchema>): Promise<Employee> {
  const res = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update employee");
  }

  const employee = await res.json();
  return EmployeeSchema.parse(employee);
}

export async function deleteEmployee(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete employee");
  }
}