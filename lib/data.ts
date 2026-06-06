import { supabase } from "./supabase";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

// Supabase categories 테이블에 status_label/short_line 컬럼이 추가되기 전까지
// slug 기준으로 정적 매핑을 병합한다.
const CATEGORY_META: Record<string, { statusLabel: string; shortLine: string }> = {
  socks:          { statusLabel: "정착 완료",   shortLine: "매일 신는 건 이걸로" },
  underwear:      { statusLabel: "재구매 중",   shortLine: "편한 건 오래 감" },
  belt:           { statusLabel: "이걸로 끝",   shortLine: "튀지 않고 오래 쓰는 것" },
  "lip-balm":     { statusLabel: "가방에 하나", shortLine: "겨울 전에 챙기는 것" },
  pillow:         { statusLabel: "잠 잘 옴",    shortLine: "바꾸면 바로 느껴짐" },
  "black-inner-tee": { statusLabel: "계속 입음", shortLine: "아무 옷 안에 받쳐 입기" },
  towel:          { statusLabel: "계속 이거",   shortLine: "매일 쓰는 건 무난하게" },
  slippers:       { statusLabel: "집에서 고정", shortLine: "집 안에서 계속 신는 것" },
};

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
    ...CATEGORY_META[row.slug],
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
    ...CATEGORY_META[data.slug],
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
