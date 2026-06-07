import type { DeviceType } from "@/types/analytics";

const SESSION_KEY = "opman_session_id";

export function getOrCreateSessionId(): string {
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

export function getDeviceType(): DeviceType {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|windows phone/i.test(ua)) return "mobile";
  return "desktop";
}

export function getUtmParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  };
}

export function getReferrer(): string {
  return document.referrer || "";
}

export function getDestinationType(
  url: string
): "coupang" | "naver" | "brand_site" | "other" {
  if (/coupang\.com/i.test(url)) return "coupang";
  if (/naver\.com|smartstore/i.test(url)) return "naver";
  if (url.startsWith("http")) return "brand_site";
  return "other";
}
