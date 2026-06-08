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
      <section className="mb-8">
        <p className="text-lg text-slate-600">Welcome — find posts grouped by category below. Newest posts appear first.</p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-slate-500">No blog posts found.</p>
          <p className="text-sm text-slate-400">Create markdown files in the <strong>content</strong> folder to add posts.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(
            posts.reduce((acc: Record<string, any[]>, p) => {
              (acc[p.category] ||= []).push(p);
              return acc;
            }, {})
          ).map(([category, items]) => (
            <section key={category} className="bg-transparent border rounded-lg p-4">
              <h3 className="text-2xl font-semibold mb-4">{category}</h3>
              <div className="space-y-3">
                {items
                  .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
                  .map((post: any) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <article className="p-3 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">{post.title || post.slug}</h4>
                          <span className="text-sm text-slate-500">{post.date}</span>
                        </div>
                        {post.excerpt && <p className="text-sm text-slate-700 mt-1">{post.excerpt.slice(0, 180)}{post.excerpt.length>180? '…' : ''}</p>}
                      </article>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Customization: Featured posts (placeholder)</div>
        <div className="p-4 border rounded">Customization: Popular posts (placeholder)</div>
        <div className="p-4 border rounded">Customization: Newsletter / Subscribe (placeholder)</div>
      </section>
    </main>
  );
}