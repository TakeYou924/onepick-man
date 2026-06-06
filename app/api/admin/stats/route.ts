import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Admin access not configured" },
      { status: 503 }
    );
  }

  const provided = request.headers.get("x-admin-password");

  if (!provided || provided !== adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("click_events")
    .select("category_slug, product_id, purchase_url, clicked_at");

  if (error) {
    console.error("[ADMIN_STATS_ERROR]", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }

  const rows = data ?? [];

  const total = rows.length;

  const byCategory: Record<string, number> = {};
  for (const row of rows) {
    const key = row.category_slug ?? "unknown";
    byCategory[key] = (byCategory[key] ?? 0) + 1;
  }

  const byUrl: Record<string, number> = {};
  for (const row of rows) {
    const key = row.purchase_url ?? "unknown";
    byUrl[key] = (byUrl[key] ?? 0) + 1;
  }

  const topUrls = Object.entries(byUrl)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([url, count]) => ({ url, count }));

  const categoryStats = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({ slug, count }));

  return NextResponse.json({
    ok: true,
    stats: {
      total,
      byCategory: categoryStats,
      topUrls,
    },
  });
}
