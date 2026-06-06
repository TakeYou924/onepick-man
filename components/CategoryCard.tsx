import Link from "next/link";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-300"
    >
      {/* 이모지 */}
      <span
        className="text-3xl"
        role="img"
        aria-label={category.name}
      >
        {category.emoji}
      </span>

      {/* 카테고리명 */}
      <h2 className="mt-4 text-base font-semibold tracking-tight text-zinc-900">
        {category.name}
      </h2>

      {/* 설명 */}
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
        {category.description}
      </p>

      {/* 화살표 */}
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-zinc-300 transition-colors group-hover:text-zinc-500">
        원픽 보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
