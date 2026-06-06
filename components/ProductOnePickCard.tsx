import Image from "next/image";
import type { Product } from "@/types/product";
import PurchaseButton from "./PurchaseButton";

type ProductOnePickCardProps = {
  product: Product;
};

export default function ProductOnePickCard({ product }: ProductOnePickCardProps) {
  const formattedPrice = product.price.toLocaleString("ko-KR");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/60">
        <div className="relative aspect-square bg-zinc-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.productName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-8 sm:p-10">
          <p className="text-sm font-medium text-zinc-500">{product.brandName}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
            {product.productName}
          </h2>
          <p className="mt-3 text-xl font-medium text-zinc-900">
            {formattedPrice}원
          </p>
          <p className="mt-6 text-base leading-relaxed text-zinc-600">
            {product.summary}
          </p>
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-zinc-900">추천 이유</h3>
            <ul className="mt-3 space-y-2">
              {product.reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10">
            <PurchaseButton
              productId={product.id}
              categorySlug={product.categorySlug}
              purchaseUrl={product.purchaseUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
