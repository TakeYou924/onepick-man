import type { MetadataRoute } from "next";
import { getActiveProductByCategorySlug, getCategories } from "@/lib/data";

const BASE_URL = "https://onepick-man.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const readyCategories = categories.filter((category) => category.isReady !== false);

  const categoryEntries = await Promise.all(
    readyCategories.map(async (category) => {
      const product = await getActiveProductByCategorySlug(category.slug);
      if (!product) return null;

      return {
        url: `${BASE_URL}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
  );

  const publicCategoryPages = categoryEntries.filter(
    (entry): entry is NonNullable<(typeof categoryEntries)[number]> => entry !== null
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/criteria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/brand`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...publicCategoryPages,
  ];
}
