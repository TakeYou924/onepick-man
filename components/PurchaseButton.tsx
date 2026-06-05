"use client";

import { useState } from "react";

type PurchaseButtonProps = {
  productId: string;
  categorySlug: string;
  purchaseUrl: string;
};

export default function PurchaseButton({
  productId,
  categorySlug,
  purchaseUrl,
}: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;

    setLoading(true);

    try {
      await fetch("/api/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          categorySlug,
          purchaseUrl,
        }),
      });
    } catch {
      // API 실패해도 구매 링크 이동은 계속 진행
    } finally {
      window.open(purchaseUrl, "_blank", "noopener,noreferrer");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="w-full rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {loading ? "이동 중..." : "구매하기"}
    </button>
  );
}
