"use client";

import { useState } from "react";
import {
  getOrCreateSessionId,
  getDeviceType,
  getUtmParams,
  getReferrer,
  getDestinationType,
} from "@/lib/tracking";

type PurchaseButtonProps = {
  productId: string;
  categorySlug: string;
  purchaseUrl: string;
  affiliateUrl?: string;
};

export default function PurchaseButton({
  productId,
  categorySlug,
  purchaseUrl,
  affiliateUrl,
}: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  const targetUrl = affiliateUrl ?? purchaseUrl;
  const isCoupang = /coupang\.com/i.test(targetUrl);
  const label = isCoupang ? "쿠팡에서 확인하기" : "지금 구매하기";

  async function handleClick() {
    if (loading) return;
    setLoading(true);

    try {
      const sessionId = getOrCreateSessionId();
      const deviceType = getDeviceType();
      const utmParams = getUtmParams();
      const referrer = getReferrer();
      const destinationType = getDestinationType(targetUrl);

      await fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          categorySlug,
          purchaseUrl: targetUrl,
          sessionId,
          eventType: "affiliate_click",
          destinationType,
          destinationUrl: targetUrl,
          linkLabel: label,
          referrer,
          utmSource: utmParams.utmSource,
          utmMedium: utmParams.utmMedium,
          utmCampaign: utmParams.utmCampaign,
          deviceType,
        }),
      });
    } catch {
      // API 실패해도 구매 링크 이동은 계속 진행
    } finally {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        "이동 중..."
      ) : (
        <>
          {label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </>
      )}
    </button>
  );
}
