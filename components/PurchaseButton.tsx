"use client";

type PurchaseButtonProps = {
  productId: string;
  purchaseUrl: string;
};

export default function PurchaseButton({
  productId,
  purchaseUrl,
}: PurchaseButtonProps) {
  function handleClick() {
    console.log(productId);
    window.open(purchaseUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 sm:w-auto"
    >
      구매하기
    </button>
  );
}
