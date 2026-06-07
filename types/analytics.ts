export type DeviceType = "mobile" | "tablet" | "desktop";

export type PageType = "home" | "category" | "product" | "admin" | "other";

export type DestinationType = "coupang" | "naver" | "brand_site" | "other";

export type EventType = "affiliate_click" | "external_link" | "internal_nav";

export type PageView = {
  id?: string;
  sessionId: string;
  categoryId?: string;
  productId?: string;
  path: string;
  pageType: PageType;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType: DeviceType;
  createdAt?: string;
};

export type ClickEvent = {
  id?: string;
  sessionId: string;
  categoryId?: string;
  productId?: string;
  eventType: EventType;
  destinationType: DestinationType;
  destinationUrl: string;
  linkLabel?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType: DeviceType;
  createdAt?: string;
};

export type ReportSummary = {
  categoryId: string;
  productId?: string;
  startDate: string;
  endDate: string;
  pageViews: number;
  productViews: number;
  affiliateClicks: number;
  ctr: number;
  mobileRatio: number;
  topReferrer: string;
  topUtmSource: string;
};
