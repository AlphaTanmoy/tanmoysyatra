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

      <section className="mb-8 bg-card border rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">YouTube Channel</h2>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-slate-600">
            Follow the channel for travel, bike, and service videos from Tanmoy's Yatra.
          </p>
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <img
              src="/homeThumbnail.png"
              alt="Tanmoy's Yatra YouTube Channel"
              className="w-full h-auto object-cover"
            />
          </div>
          <a
            href="https://www.youtube.com/@TanmoysYatraOfficial"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Visit YouTube Channel
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">The Blog List</h2>
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
            <section key={category} className="bg-card border rounded-lg p-4">
              <h3 className="text-2xl font-semibold mb-4">{category}</h3>
              <div className="space-y-3">
                {items
                  .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
                  .map((post: any) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <article className="p-4 rounded-lg bg-card border hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold">{post.title || post.slug}</h4>
                            <span className="text-sm text-slate-500">{post.date}</span>
                          </div>
                          {post.excerpt && (
                            <p className="text-sm text-slate-600">
                              {post.excerpt.slice(0, 150)}
                              {post.excerpt.length > 150 ? "…" : ""}
                            </p>
                          )}
                          <div className="mt-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium">
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

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Customization: Featured posts (placeholder)</div>
        <div className="p-4 border rounded">Customization: Popular posts (placeholder)</div>
        <div className="p-4 border rounded">Customization: Newsletter / Subscribe (placeholder)</div>
      </section>
    </main>
  );
}