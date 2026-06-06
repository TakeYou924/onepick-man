import { supabase } from "./supabase";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, emoji, description")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[GET_CATEGORIES_ERROR]", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    emoji: row.emoji,
    description: row.description,
  }));
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, emoji, description")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[GET_CATEGORY_BY_SLUG_ERROR]", error);
    return null;
  }

  if (!data) return null;

  return {
    id: String(data.id),
    name: data.name,
    slug: data.slug,
    emoji: data.emoji,
    description: data.description,
  };
}

export async function getActiveProductByCategorySlug(
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, category_slug, brand_name, product_name, price, image_url, purchase_url, summary, reasons"
    )
    .eq("category_slug", slug)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[GET_ACTIVE_PRODUCT_ERROR]", error);
    return null;
  }

  if (!data) return null;

  return {
    id: String(data.id),
    categorySlug: data.category_slug,
    brandName: data.brand_name,
    productName: data.product_name,
    price: data.price ?? 0,
    imageUrl: data.image_url,
    purchaseUrl: data.purchase_url,
    summary: data.summary ?? "",
    reasons: Array.isArray(data.reasons) ? data.reasons : [],
  };
}
