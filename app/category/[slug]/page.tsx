import Link from "next/link";
import { getAllPosts } from "@/app/posts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allPosts = getAllPosts();
  const categoryPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="mb-2 text-4xl font-bold capitalize tracking-tight sm:text-5xl">
        {slug}
      </h1>
      <p className="mb-8 text-slate-600">
        {categoryPosts.length} post{categoryPosts.length !== 1 ? "s" : ""} in this category
      </p>

      {categoryPosts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="mb-4 text-lg text-slate-500">No posts found in this category.</p>
          <Link href="/" className="font-semibold text-accent hover:underline">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {categoryPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="cursor-pointer rounded-xl border bg-card p-4 transition-shadow hover:shadow-lg sm:p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h2 className="text-2xl font-semibold leading-snug tracking-tight">
                      {post.title || post.slug}
                    </h2>
                    <span className="shrink-0 text-sm text-slate-500">{post.date}</span>
                  </div>
                  {post.excerpt ? (
                    <p className="text-sm leading-6 text-slate-600">
                      {post.excerpt.slice(0, 250)}
                      {post.excerpt.length > 250 ? "..." : ""}
                    </p>
                  ) : null}
                  <div className="mt-2">
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      View Full Content
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
