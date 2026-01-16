// app/actions.ts
"use server";

export async function deleteProductAction(productId: number) {
  // محاكاة تأخير
  await new Promise((r) => setTimeout(r, 1000));
   await fetch(`https://dummyjson.com/products/${productId}`, { method: "DELETE" });

  return { ok: true };
}
