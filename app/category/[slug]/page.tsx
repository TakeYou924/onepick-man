import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryIcon from "@/components/CategoryIcon";
import ProductOnePickCard from "@/components/ProductOnePickCard";
import ViewTracker from "@/components/ViewTracker";
import {
  getCategoryBySlug,
  getActiveProductByCategorySlug,
} from "@/lib/data";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [category, product] = await Promise.all([
    getCategoryBySlug(slug),
    getActiveProductByCategorySlug(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="flex-1 bg-zinc-100">
      <ViewTracker
        categoryId={category.slug}
        productId={product?.id}
        pageType="product"
      />
      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        {/* 브레드크럼 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          전체 카테고리
        </Link>

        {/* 카테고리 헤더 */}
        <div className="mt-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/60">
              <CategoryIcon slug={category.slug} className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              {category.name}
            </h1>
          </div>
          <p className="mt-2 text-sm text-zinc-400">{category.description}</p>
        </div>

        {/* 제품 카드 */}
        <div className="mt-8">
          {product ? (
            <ProductOnePickCard product={product} categoryName={category.name} />
          ) : (
            <div className="rounded-3xl bg-white px-8 py-20 text-center shadow-sm ring-1 ring-zinc-200/60">
              <p className="text-zinc-400">아직 등록된 원픽 제품이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
