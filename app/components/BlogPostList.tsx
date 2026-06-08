"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BlogPost = {
  slug: string;
  category: string;
  title?: string;
  date?: string;
  excerpt?: string;
};

type DateSort = "desc" | "asc";

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts]
  );
  const [category, setCategory] = useState("all");
  const [dateSort, setDateSort] = useState<DateSort>("desc");

  const visiblePosts = useMemo(() => {
    return [...posts]
      .filter((post) => category === "all" || post.category === category)
      .sort((a, b) => {
        const first = new Date(a.date || 0).getTime();
        const second = new Date(b.date || 0).getTime();
        return dateSort === "desc" ? second - first : first - second;
      });
  }, [category, dateSort, posts]);

  const groupedPosts = useMemo(
    () =>
      visiblePosts.reduce((acc: Record<string, BlogPost[]>, post) => {
        (acc[post.category] ||= []).push(post);
        return acc;
      }, {}),
    [visiblePosts]
  );

  return (
    <section className="space-y-5">
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">The Blog List</h2>
            <p className="mt-1 text-sm text-slate-600">
              Filter by category, date order, or both.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(10rem,1fr)_minmax(10rem,1fr)_auto]">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="filter-select rounded-lg border bg-card px-3 py-2 text-sm text-slate-700"
              >
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Date
              <select
                value={dateSort}
                onChange={(event) => setDateSort(event.target.value as DateSort)}
                className="filter-select rounded-lg border bg-card px-3 py-2 text-sm text-slate-700"
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setDateSort("desc");
              }}
              className="rounded-lg border bg-card px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <p className="text-lg text-slate-500">No posts match this filter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedPosts).map(([group, items]) => (
            <section key={group} className="rounded-xl border bg-card p-4 sm:p-5">
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">{group}</h3>
              <div className="space-y-3">
                {items.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="cursor-pointer rounded-xl border bg-card p-4 transition-shadow hover:shadow-lg sm:p-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <h4 className="text-lg font-semibold leading-snug">
                            {post.title || post.slug}
                          </h4>
                          <span className="shrink-0 text-sm text-slate-500">
                            {post.date}
                          </span>
                        </div>
                        {post.excerpt ? (
                          <p className="text-sm leading-6 text-slate-600">
                            {post.excerpt.slice(0, 150)}
                            {post.excerpt.length > 150 ? "..." : ""}
                          </p>
                        ) : null}
                        <div className="mt-2">
                          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                            View Full Content
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
