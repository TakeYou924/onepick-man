import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/lib/data";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          남자를 위한 가장 단순한 구매 결정
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-500">
          제품군마다 하나만 고릅니다. 비교 시간을 줄이고, 실패 확률을 낮춥니다.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
