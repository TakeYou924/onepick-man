import Image from "next/image";
import type { Product } from "@/types/product";
import PurchaseButton from "./PurchaseButton";

type ProductOnePickCardProps = {
  product: Product;
  categoryName: string;
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-zinc-400"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function ProductOnePickCard({
  product,
  categoryName,
}: ProductOnePickCardProps) {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200/60">

      {/* ── 상단: 이미지 + 기본 정보 ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* 이미지 */}
        <div className="relative aspect-square bg-zinc-100 md:aspect-auto md:min-h-[440px]">
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
            <div className="flex h-full min-h-[300px] items-center justify-center text-zinc-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
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

        {/* 기본 정보 */}
        <div className="flex flex-col p-8 sm:p-10">
          {/* 뱃지 */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold tracking-widest text-white">
              현재 원픽
            </span>
            <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500">
              기준 선별
            </span>
            <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500">
              협찬 별도 표기
            </span>
          </div>

          {/* 제목 */}
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
            {categoryName}은 이거.
          </h2>

          {/* 브랜드 · 제품명 */}
          <p className="mt-2 text-sm text-zinc-400">
            {product.brandName}
          </p>
          <p className="mt-0.5 text-sm font-medium text-zinc-700">
            {product.productName}
          </p>

          {/* 한 줄 판단 summary */}
          {product.summary && (
            <p className="mt-5 text-sm leading-relaxed text-zinc-500">
              {product.summary}
            </p>
          )}

          {/* 왜 이걸로 골랐는지 */}
          {product.reasons.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                왜 이걸로 골랐는지
              </p>
              <ul className="mt-3 space-y-2.5">
                {product.reasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700"
                  >
                    <CheckIcon />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── 하단: 추천/비추천 + 메타 + CTA ── */}
      <div className="border-t border-zinc-100">
        <div className="p-8 sm:p-10">

          {/* 추천 / 비추천 */}
          {(product.recommendedFor || product.notRecommendedFor) && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {product.recommendedFor && product.recommendedFor.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    이런 사람에게 추천
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.recommendedFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700"
                      >
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.notRecommendedFor && product.notRecommendedFor.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    이런 사람에게는 비추
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.notRecommendedFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-500"
                      >
                        <XIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 메타 정보 */}
          {(product.priceRange || product.purchasePlace || product.lastCheckedAt) && (
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-zinc-100 pt-6 text-xs text-zinc-400">
              {product.priceRange && (
                <span>
                  <span className="font-medium text-zinc-500">가격대</span>{" "}
                  {product.priceRange}
                </span>
              )}
              {product.purchasePlace && (
                <span>
                  <span className="font-medium text-zinc-500">구매처</span>{" "}
                  {product.purchasePlace}
                </span>
              )}
              {product.lastCheckedAt && (
                <span>
                  <span className="font-medium text-zinc-500">마지막 확인</span>{" "}
                  {product.lastCheckedAt}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8">
            <PurchaseButton
              productId={product.id}
              categorySlug={product.categorySlug}
              purchaseUrl={product.purchaseUrl}
              affiliateUrl={product.affiliateUrl}
            />
          </div>

          {/* 제휴 링크 고지 */}
          <p className="mt-5 text-[11px] leading-relaxed text-zinc-300">
            {product.isSponsored && product.sponsorshipLabel
              ? `[협찬] ${product.sponsorshipLabel}`
              : "이 페이지에는 제휴 링크가 포함될 수 있으며, 구매 시 ONEPICK MAN이 일정 수수료를 받을 수 있습니다. 원픽 선정 기준은 별도로 유지합니다."}
          </p>

        </div>
      </div>
    </div>
  );
}
