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
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{slug}</h1>
      <p className="text-slate-600 mb-8">
        {categoryPosts.length} post{categoryPosts.length !== 1 ? "s" : ""} in this category
      </p>

      {categoryPosts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-slate-500">No posts found in this category.</p>
          <Link href="/" className="text-accent font-semibold hover:underline">
            ← Back to home
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {categoryPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="p-4 rounded-lg bg-card border hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{post.title || post.slug}</h2>
                    <span className="text-sm text-slate-500">{post.date}</span>
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-slate-600">
                      {post.excerpt.slice(0, 250)}
                      {post.excerpt.length > 250 ? "…" : ""}
                    </p>
                  )}
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
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
