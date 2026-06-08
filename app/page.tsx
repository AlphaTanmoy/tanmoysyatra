// src/app/page.tsx

import Link from "next/link";
import { getAllPosts } from "./posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Tanmoy's Blog
      </h1>

      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-slate-500">No blog posts found.</p>
          <p className="text-sm text-slate-400">Create markdown files in the <strong>content</strong> folder to add posts.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="border rounded-xl p-4 hover:shadow-lg cursor-pointer">
                <h2 className="text-2xl font-semibold">{post.title || post.slug}</h2>

                <p className="text-sm text-slate-500">{post.category} • {post.date}</p>

                {post.excerpt && (
                  <p className="mt-2 text-slate-700">{post.excerpt.length > 200 ? post.excerpt.slice(0, 200) + '…' : post.excerpt}</p>
                )}
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}