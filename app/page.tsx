import CategoryCard from "@/components/CategoryCard";
import TrustBadges from "@/components/TrustBadges";
import { getCategories } from "@/lib/data";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex-1 bg-zinc-100">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-20 text-center sm:pt-28">
        <h1 className="text-4xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-5xl">
          고르기 귀찮은 것들,
          <br />
          하나씩만.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-zinc-400">
          매번 비교하기 싫은 남자를 위한 기본템 원픽.
        </p>
        <div className="mt-6">
          <TrustBadges />
        </div>
        <a
          href="#picks"
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          바로 고르기
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
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </section>

      {/* 왜 하나만 보여주나요? */}
      <section className="mx-auto max-w-4xl px-6 pb-4">
        <div className="rounded-2xl bg-white px-8 py-7 shadow-sm ring-1 ring-zinc-200/60">
          <p className="text-sm font-semibold text-zinc-900">왜 하나만 보여주나요?</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            양말, 속옷, 벨트 같은 생활템은 오래 비교할수록 피곤합니다.
            <br className="hidden sm:block" />
            ONEPICK MAN은 무난함, 재구매성, 가격 부담, 접근성을 기준으로
            카테고리별 하나만 남깁니다.
          </p>
        </div>
      </section>

      {/* 카테고리 그리드 */}
      <section id="picks" className="mx-auto max-w-4xl px-6 pb-28 pt-6">
        <div className="mb-5">
          <p className="text-lg font-semibold text-zinc-900">필요한 것부터</p>
          <p className="mt-0.5 text-sm text-zinc-400">고민 줄이는 생활템</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
