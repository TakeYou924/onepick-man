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
// 아이콘은 components/CategoryIcon.tsx에서 slug 기준으로 렌더링한다.
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
    description: "부드럽고 도톰한 호텔식 기본 타월", isReady: true,
  },
  slippers: {
    statusLabel: "매일 신는 중", shortLine: "어디서든 발 편한 것",
    description: "사무실, 여행, 산책까지 발이 먼저 편한 데일리 슬리퍼",
    isReady: true,
  },
  "white-tshirt": {
    statusLabel: "이걸로 끝", shortLine: "이너·단독 다 되는 것",
    description: "이너·단독 모두 무난한 흰 티", isReady: true,
  },
  razor: {
    statusLabel: "정착 완료", shortLine: "매일 쓰는 건 이걸로",
    description: "매일 쓰기 좋은 기본 면도기", isReady: true,
  },
  umbrella: {
    statusLabel: "하나면 충분", shortLine: "가방에 하나면 끝",
    description: "가볍고 휴대성 좋은 기본 우산", isReady: true,
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

// 카테고리별 선별 과정 블로그 링크. DB의 selection_story_url보다 우선 적용한다.
// TODO: 실제 블로그 글이 생기면 각 URL을 교체한다.
const SELECTION_STORY_URLS: Record<string, string> = {
  socks: "https://www.naver.com",
  underwear: "https://www.naver.com",
  belt: "https://www.naver.com",
  towel: "https://www.naver.com",
  slippers: "https://www.naver.com",
  "white-tshirt": "https://www.naver.com",
  razor: "https://www.naver.com",
  umbrella: "https://www.naver.com",
};

// 카테고리별 제휴 링크. DB의 affiliate_url보다 우선 적용한다.
const AFFILIATE_URLS: Record<string, string> = {
  socks: "https://link.coupang.com/a/esyQVnY3Qy",
  // TODO: replace with Coupang Partners link
  underwear:
    "https://www.coupang.com/vp/products/6617913651?itemId=15033764450&vendorItemId=87864344483&q=CK%EB%93%9C%EB%A1%9C%EC%A6%88&searchId=8c616a066619883&sourceType=search&itemsCount=36&searchRank=6&rank=6&traceId=mq7m1pqo",
  belt: "https://link.coupang.com/a/esHwhDdeDs",
  // TODO: replace with Coupang Partners link
  "white-tshirt":
    "https://www.coupang.com/vp/products/9328229657?itemId=27653636332&vendorItemId=94616032401&q=%EC%BB%AC%ED%81%AC%EB%9E%9C%EB%93%9C+%ED%8B%B0&searchId=b97c056e8137089&sourceType=search&itemsCount=36&searchRank=6&rank=6&traceId=mq7merxo",
  razor: "https://link.coupang.com/a/esImRkGBIy",
  towel: "https://link.coupang.com/a/esIBdR5T1U",
  slippers: "https://link.coupang.com/a/esIEKvCVye",
  umbrella: "https://link.coupang.com/a/esIQx6rkDA",
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
    .select("*")
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
    affiliateUrl:
      AFFILIATE_URLS[data.category_slug] ??
      data.affiliate_url ??
      data.purchase_url,
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
    selectionStoryUrl:
      SELECTION_STORY_URLS[data.category_slug] ??
      data.selection_story_url ??
      undefined,
  };
}
