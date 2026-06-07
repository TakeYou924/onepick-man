import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isUuid(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const categorySlug = body.categorySlug ?? body.categoryId;
    const purchaseUrl = body.purchaseUrl ?? body.destinationUrl;

    if (!categorySlug || !purchaseUrl) {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    const productId = body.productId;
    const userAgent = request.headers.get("user-agent");
    const referrer = body.referrer ?? request.headers.get("referer");

    const basePayload = {
      product_id: isUuid(productId) ? productId : null,
      category_slug: categorySlug,
      purchase_url: purchaseUrl,
      user_agent: userAgent,
      referrer,
    };

    const extendedPayload = {
      ...basePayload,
      session_id: body.sessionId ?? null,
      event_type: body.eventType ?? "affiliate_click",
      destination_type: body.destinationType ?? null,
      destination_url: purchaseUrl,
      link_label: body.linkLabel ?? null,
      utm_source: body.utmSource ?? null,
      utm_medium: body.utmMedium ?? null,
      utm_campaign: body.utmCampaign ?? null,
      device_type: body.deviceType ?? null,
    };

    console.log("[CLICK_EVENT_SAVED]", {
      productId,
      categorySlug,
      purchaseUrl,
      eventType: body.eventType ?? "affiliate_click",
      deviceType: body.deviceType,
      clickedAt: new Date().toISOString(),
    });

    // 확장 필드로 저장 시도 → 실패하면 기본 필드로 재시도
    const { error: extError } = await supabase
      .from("click_events")
      .insert(extendedPayload);

    if (extError) {
      console.warn("[CLICK_EXTENDED_SKIP]", extError.message);

      const { error: baseError } = await supabase
        .from("click_events")
        .insert(basePayload);

      if (baseError) {
        console.error("[CLICK_BASE_ERROR]", baseError);
        return NextResponse.json(
          { ok: false, error: "Failed to save click event" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[CLICK_EVENT_ERROR]", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
