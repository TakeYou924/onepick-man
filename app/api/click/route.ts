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

    const productId = body.productId;
    const categorySlug = body.categorySlug;
    const purchaseUrl = body.purchaseUrl;

    if (!categorySlug || !purchaseUrl) {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent");
    const referrer = request.headers.get("referer");

    const { error } = await supabase.from("click_events").insert({
      product_id: isUuid(productId) ? productId : null,
      category_slug: categorySlug,
      purchase_url: purchaseUrl,
      user_agent: userAgent,
      referrer,
    });

    if (error) {
      console.error("[SUPABASE_CLICK_INSERT_ERROR]", error);

      return NextResponse.json(
        { ok: false, error: "Failed to save click event" },
        { status: 500 }
      );
    }

    console.log("[CLICK_EVENT_SAVED]", {
      productId,
      categorySlug,
      purchaseUrl,
      clickedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[CLICK_EVENT_ERROR]", error);

    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}