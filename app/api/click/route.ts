import { NextResponse } from "next/server";

type ClickRequestBody = {
  productId?: string;
  categorySlug?: string;
  purchaseUrl?: string;
};

function isValidBody(body: ClickRequestBody): body is Required<ClickRequestBody> {
  return (
    typeof body.productId === "string" &&
    body.productId.length > 0 &&
    typeof body.categorySlug === "string" &&
    body.categorySlug.length > 0 &&
    typeof body.purchaseUrl === "string" &&
    body.purchaseUrl.length > 0
  );
}

export async function POST(request: Request) {
  let body: ClickRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  const clickedAt = new Date().toISOString();

  console.log("[CLICK_EVENT]");
  console.log(`productId: ${body.productId}`);
  console.log(`categorySlug: ${body.categorySlug}`);
  console.log(`purchaseUrl: ${body.purchaseUrl}`);
  console.log(`clickedAt: ${clickedAt}`);

  return NextResponse.json({ ok: true });
}
