
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