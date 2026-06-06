import Image from "next/image";
import type { Product } from "@/types/product";
import PurchaseButton from "./PurchaseButton";

type ProductOnePickCardProps = {
  product: Product;
};

export default function ProductOnePickCard({ product }: ProductOnePickCardProps) {
  const formattedPrice = product.price > 0
    ? product.price.toLocaleString("ko-KR") + "원"
    : null;

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200/60">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* 이미지 영역 */}
        <div className="relative aspect-square bg-zinc-100 md:aspect-auto md:min-h-[480px]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.productName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center text-zinc-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
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

        {/* 상세 정보 영역 */}
        <div className="flex flex-col justify-between p-8 sm:p-10">
          <div>
            {/* 원픽 배지 */}
            <span className="inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold tracking-widest text-white">
              ONE PICK
            </span>

            {/* 브랜드 */}
            <p className="mt-5 text-sm font-medium text-zinc-400 tracking-wide">
              {product.brandName}
            </p>

            {/* 제품명 */}
            <h2 className="mt-1 text-2xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-3xl">
              {product.productName}
            </h2>

            {/* 가격 */}
            {formattedPrice && (
              <p className="mt-3 text-xl font-bold text-zinc-900">
                {formattedPrice}
              </p>
            )}

            {/* 한줄 요약 */}
            {product.summary && (
              <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                {product.summary}
              </p>
            )}

            {/* 추천 이유 */}
            {product.reasons.length > 0 && (
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  이 제품을 고른 이유
                </p>
                <ul className="mt-4 space-y-3">
                  {product.reasons.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0 text-zinc-900"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 구매 버튼 */}
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
