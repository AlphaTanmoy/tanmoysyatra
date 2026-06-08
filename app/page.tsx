import Image from "next/image";
import BlogPostList from "./components/BlogPostList";
import { getAllPosts } from "./posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Tanmoy&apos;s Blog
      </h1>

      <section className="mb-10">
        <p className="max-w-2xl text-lg text-slate-600">
          Welcome - find posts grouped by category below. Newest posts appear first.
        </p>
      </section>

      <section className="mb-10 rounded-xl border bg-card p-5 shadow-md sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">YouTube Channel</h2>
            <p className="mt-2 text-sm text-slate-600">
              Follow the channel for travel, bike, and service videos from Tanmoy&apos;s Yatra.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@TanmoysYatraOfficial"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Visit YouTube
          </a>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <Image
            src="/homeThumbnail.png"
            alt="Tanmoy's Yatra YouTube Channel"
            width={1280}
            height={720}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </section>

      {posts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg text-slate-500">No blog posts found.</p>
          <p className="text-sm text-slate-400">
            Create markdown files in the <strong>content</strong> folder to add posts.
          </p>
        </div>
      ) : (
        <BlogPostList posts={posts} />
      )}

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 text-sm text-slate-600">
          Featured posts coming soon
        </div>
        <div className="rounded-xl border bg-card p-4 text-sm text-slate-600">
          Popular posts coming soon
        </div>
        <div className="rounded-xl border bg-card p-4 text-sm text-slate-600">
          Newsletter updates coming soon
        </div>
      </section>
    </main>
  );
}
