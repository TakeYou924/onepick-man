import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      session_id: body.sessionId ?? null,
      category_id: body.categoryId ?? null,
      product_id: body.productId ?? null,
      path: body.path ?? null,
      page_type: body.pageType ?? "other",
      referrer: body.referrer ?? null,
      utm_source: body.utmSource ?? null,
      utm_medium: body.utmMedium ?? null,
      utm_campaign: body.utmCampaign ?? null,
      device_type: body.deviceType ?? "desktop",
    };

    console.log("[PAGE_VIEW]", payload);

    const { error } = await supabase.from("page_views").insert(payload);

    if (error) {
      // page_views 테이블이 없어도 클라이언트에는 200을 반환한다.
      console.warn("[PAGE_VIEW_DB_SKIP]", error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[PAGE_VIEW_ERROR]", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
