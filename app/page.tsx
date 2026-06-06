import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/lib/data";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex-1 bg-zinc-100">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-4 pt-20 text-center sm:pt-28">
        <span className="inline-block rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold tracking-widest text-white">
          ONEPICK MAN
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          고민 말고, 하나만 고르세요
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
          양말부터 우산까지, 제품군마다 단 하나의 원픽만 추천합니다.
          <br className="hidden sm:block" />
          비교 없이, 후회 없이.
        </p>
      </section>

      {/* 카테고리 그리드 */}
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
          카테고리 — {categories.length}개
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
