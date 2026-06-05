import Link from "next/link";
import { notFound } from "next/navigation";
import ProductOnePickCard from "@/components/ProductOnePickCard";
import {
  getCategoryBySlug,
  getProductByCategorySlug,
} from "@/lib/mockData";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const product = getProductByCategorySlug(slug);

  if (!category || !product) {
    notFound();
  }

  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          ← 카테고리 목록
        </Link>
        <div className="mt-8 text-center">
          <span className="text-4xl" role="img" aria-label={category.name}>
            {category.emoji}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 text-zinc-500">{category.description}</p>
        </div>
        <div className="mt-12">
          <ProductOnePickCard product={product} />
        </div>
      </section>
    </main>
  );
}
