import Link from "next/link";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200/60 transition-all hover:shadow-md hover:ring-zinc-300"
    >
      <span className="mb-4 text-4xl" role="img" aria-label={category.name}>
        {category.emoji}
      </span>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700">
        {category.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        {category.description}
      </p>
    </Link>
  );
}
