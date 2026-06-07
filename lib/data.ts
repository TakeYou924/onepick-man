import { supabase } from "./supabase";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type CategoryMeta = {
  statusLabel: string;
  shortLine: string;
  description: string;
  isReady: boolean;
};

// Supabase categories 테이블에 없는 필드를 slug 기준으로 정적으로 병합한다.
// description은 Supabase 값보다 이 값을 우선 사용한다.
const CATEGORY_META: Record<string, CategoryMeta> = {
  socks: {
    statusLabel: "정착 완료", shortLine: "매일 신는 건 이걸로",
    description: "매일 신는 기본 크루삭스", isReady: true,
  },
  underwear: {
    statusLabel: "재구매 중", shortLine: "편한 건 오래 감",
    description: "편하고 오래 입는 기본 드로즈", isReady: true,
  },
  belt: {
    statusLabel: "이걸로 끝", shortLine: "튀지 않고 오래 쓰는 것",
    description: "정장·캐주얼 모두 되는 기본 벨트", isReady: true,
  },
  towel: {
    statusLabel: "계속 이거", shortLine: "매일 쓰는 건 무난하게",
    description: "막 쓰기 좋은 기본 수건", isReady: true,
  },
  slippers: {
    statusLabel: "집에서 고정", shortLine: "집 안에서 계속 신는 것",
    description: "집에서 하루 종일 신기 좋은 실내화", isReady: true,
  },
  "white-tshirt": {
    statusLabel: "준비 중", shortLine: "곧 추가됩니다",
    description: "이너·단독 모두 무난한 흰 티", isReady: false,
  },
  razor: {
    statusLabel: "준비 중", shortLine: "곧 추가됩니다",
    description: "매일 쓰기 좋은 기본 면도기", isReady: false,
  },
  umbrella: {
    statusLabel: "준비 중", shortLine: "곧 추가됩니다",
    description: "가볍고 튼튼한 기본 우산", isReady: false,
  },
  "lip-balm": {
    statusLabel: "준비 중", shortLine: "곧 추가됩니다",
    description: "가방에 하나 넣어두는 립밤", isReady: false,
  },
  pillow: {
    statusLabel: "준비 중", shortLine: "곧 추가됩니다",
    description: "바꾸면 바로 차이 나는 수면 베개", isReady: false,
  },
  "black-inner-tee": {
    statusLabel: "준비 중", shortLine: "곧 추가됩니다",
    description: "아무 옷 안에 받쳐 입는 검정 이너티", isReady: false,
  },
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

  return (data ?? []).map((row) => {
    const meta = CATEGORY_META[row.slug];
    return {
      id: String(row.id),
      name: row.name,
      slug: row.slug,
      emoji: row.emoji,
      description: meta?.description ?? row.description,
      statusLabel: meta?.statusLabel,
      shortLine: meta?.shortLine,
      isReady: meta?.isReady ?? true,
    };
  });
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

  const meta = CATEGORY_META[data.slug];
  return {
    id: String(data.id),
    name: data.name,
    slug: data.slug,
    emoji: data.emoji,
    description: meta?.description ?? data.description,
    statusLabel: meta?.statusLabel,
    shortLine: meta?.shortLine,
    isReady: meta?.isReady ?? true,
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
    imageUrl: data.image_url ?? "",
    purchaseUrl: data.purchase_url,
    affiliateUrl: data.affiliate_url ?? data.purchase_url,
    originalUrl: data.original_url ?? undefined,
    summary: data.summary ?? "",
    reasons: Array.isArray(data.reasons) ? data.reasons : [],
    recommendedFor: Array.isArray(data.recommended_for) ? data.recommended_for : undefined,
    notRecommendedFor: Array.isArray(data.not_recommended_for) ? data.not_recommended_for : undefined,
    priceRange: data.price_range ?? undefined,
    purchasePlace: data.purchase_place ?? undefined,
    isSponsored: data.is_sponsored ?? false,
    sponsorshipLabel: data.sponsorship_label ?? undefined,
    lastCheckedAt: data.last_checked_at ?? undefined,
  };
}
