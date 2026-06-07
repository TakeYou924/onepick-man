"use client";

import { useEffect, useRef } from "react";
import type { PageType } from "@/types/analytics";
import {
  getOrCreateSessionId,
  getDeviceType,
  getUtmParams,
  getReferrer,
} from "@/lib/tracking";

type ViewTrackerProps = {
  categoryId?: string;
  productId?: string;
  pageType: PageType;
};

export default function ViewTracker({
  categoryId,
  productId,
  pageType,
}: ViewTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const sessionId = getOrCreateSessionId();
    const deviceType = getDeviceType();
    const utmParams = getUtmParams();
    const referrer = getReferrer();

    fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        categoryId,
        productId,
        path: window.location.pathname,
        pageType,
        referrer,
        utmSource: utmParams.utmSource,
        utmMedium: utmParams.utmMedium,
        utmCampaign: utmParams.utmCampaign,
        deviceType,
      }),
    }).catch(() => {
      // 조회 추적 실패는 사용자 경험에 영향 없음
    });
  }, [categoryId, productId, pageType]);

  return null;
}
