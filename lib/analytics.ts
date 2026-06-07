import type { PageView, ClickEvent, ReportSummary, DeviceType } from "@/types/analytics";

// ── 계산 함수 ────────────────────────────────────────────

export function calculateCtr(clicks: number, views: number): number {
  if (views === 0) return 0;
  return Math.round((clicks / views) * 1000) / 10; // 소수점 1자리 %
}

export function calculateMobileRatio(
  events: Array<{ deviceType?: DeviceType | string }>
): number {
  if (events.length === 0) return 0;
  const mobile = events.filter((e) => e.deviceType === "mobile").length;
  return Math.round((mobile / events.length) * 1000) / 10;
}

export function getTopUtmSource(
  events: Array<{ utmSource?: string }>
): string {
  const counts: Record<string, number> = {};
  for (const e of events) {
    const key = e.utmSource ?? "direct";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "direct";
}

export function getTopReferrer(
  events: Array<{ referrer?: string }>
): string {
  const counts: Record<string, number> = {};
  for (const e of events) {
    const raw = e.referrer ?? "";
    let key = "direct";
    if (raw) {
      try {
        key = new URL(raw).hostname;
      } catch {
        key = raw.slice(0, 40);
      }
    }
    counts[key] = (counts[key] ?? 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "direct";
}

export function groupByCategoryMetrics(
  pageViews: PageView[],
  clickEvents: ClickEvent[]
): Record<string, { views: number; clicks: number; ctr: number; mobileRatio: number }> {
  const result: Record<string, { views: number; clicks: number; ctr: number; mobileRatio: number }> = {};

  for (const pv of pageViews) {
    const key = pv.categoryId ?? "unknown";
    if (!result[key]) result[key] = { views: 0, clicks: 0, ctr: 0, mobileRatio: 0 };
    result[key].views += 1;
  }

  for (const ce of clickEvents) {
    const key = ce.categoryId ?? "unknown";
    if (!result[key]) result[key] = { views: 0, clicks: 0, ctr: 0, mobileRatio: 0 };
    result[key].clicks += 1;
  }

  for (const key of Object.keys(result)) {
    const { views, clicks } = result[key];
    result[key].ctr = calculateCtr(clicks, views);
    const catViews = pageViews.filter((pv) => (pv.categoryId ?? "unknown") === key);
    result[key].mobileRatio = calculateMobileRatio(catViews);
  }

  return result;
}

export function groupByProductMetrics(
  pageViews: PageView[],
  clickEvents: ClickEvent[]
): Record<string, { views: number; clicks: number; ctr: number }> {
  const result: Record<string, { views: number; clicks: number; ctr: number }> = {};

  for (const pv of pageViews) {
    const key = pv.productId ?? "unknown";
    if (!result[key]) result[key] = { views: 0, clicks: 0, ctr: 0 };
    result[key].views += 1;
  }

  for (const ce of clickEvents) {
    const key = ce.productId ?? "unknown";
    if (!result[key]) result[key] = { views: 0, clicks: 0, ctr: 0 };
    result[key].clicks += 1;
  }

  for (const key of Object.keys(result)) {
    const { views, clicks } = result[key];
    result[key].ctr = calculateCtr(clicks, views);
  }

  return result;
}

export function buildReportSummary(
  categoryId: string,
  productId: string | undefined,
  startDate: string,
  endDate: string,
  pageViews: PageView[],
  clickEvents: ClickEvent[]
): ReportSummary {
  const catViews = pageViews.filter((pv) => pv.categoryId === categoryId);
  const catClicks = clickEvents.filter(
    (ce) => ce.categoryId === categoryId && ce.eventType === "affiliate_click"
  );

  const productViews = productId
    ? catViews.filter((pv) => pv.productId === productId).length
    : catViews.length;

  const affiliateClicks = catClicks.length;
  const ctr = calculateCtr(affiliateClicks, productViews);
  const mobileRatio = calculateMobileRatio(catViews);
  const topReferrer = getTopReferrer(catViews);
  const topUtmSource = getTopUtmSource(catViews);

  return {
    categoryId,
    productId,
    startDate,
    endDate,
    pageViews: catViews.length,
    productViews,
    affiliateClicks,
    ctr,
    mobileRatio,
    topReferrer,
    topUtmSource,
  };
}

// ── Mock 데이터 (Supabase page_views 테이블 연동 전까지 사용) ────

export type MockCategoryStat = {
  slug: string;
  name: string;
  views: number;
  clicks: number;
  ctr: number;
  mobileRatio: number;
  topSource: string;
};

export const MOCK_CATEGORY_STATS: MockCategoryStat[] = [
  { slug: "socks",      name: "양말",       views: 420, clicks: 98,  ctr: 23.3, mobileRatio: 65, topSource: "direct" },
  { slug: "underwear",  name: "팬티",       views: 380, clicks: 89,  ctr: 23.4, mobileRatio: 58, topSource: "google" },
  { slug: "belt",       name: "벨트",       views: 210, clicks: 55,  ctr: 26.2, mobileRatio: 60, topSource: "instagram" },
  { slug: "towel",      name: "수건",       views: 130, clicks: 28,  ctr: 21.5, mobileRatio: 67, topSource: "direct" },
  { slug: "slippers",   name: "슬리퍼",     views: 100, clicks: 17,  ctr: 17.0, mobileRatio: 55, topSource: "naver" },
];

export const MOCK_SUMMARY = {
  totalViews: 1240,
  totalClicks: 287,
  ctr: 23.1,
  mobileRatio: 62,
};

export type MockRecentClick = {
  categorySlug: string;
  destinationUrl: string;
  deviceType: string;
  at: string;
};

export const MOCK_RECENT_CLICKS: MockRecentClick[] = [
  { categorySlug: "socks",     destinationUrl: "https://example.com/socks",     deviceType: "mobile",  at: "2026-06-08 14:23" },
  { categorySlug: "underwear", destinationUrl: "https://example.com/underwear", deviceType: "desktop", at: "2026-06-08 13:45" },
  { categorySlug: "belt",      destinationUrl: "https://example.com/belt",      deviceType: "mobile",  at: "2026-06-08 12:30" },
  { categorySlug: "towel",     destinationUrl: "https://example.com/towel",     deviceType: "mobile",  at: "2026-06-08 11:10" },
  { categorySlug: "socks",     destinationUrl: "https://example.com/socks",     deviceType: "desktop", at: "2026-06-08 10:52" },
];
