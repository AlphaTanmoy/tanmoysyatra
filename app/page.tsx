import Image from "next/image";
import BlogPostList from "./components/BlogPostList";
import { getAllPosts } from "./posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Tanmoy&apos;s Yatra
      </h1>

      <section className="mb-10 max-w-3xl">
        <p className="text-xl font-semibold text-slate-700">
          Travel | Biking | Cinematic Vlogs
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          I&apos;m Tanmoy Das, a software engineer by profession and a passionate devotee
          of Lord Shiva. Tanmoy&apos;s Yatra is my heartfelt journey through the roads I
          ride, the temples I visit, and the stories I gather.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-600">
          From ancient Shiva temples and spiritual spots to everyday bike rides and
          travel experiences across India, I share real and raw travel stories, mostly
          in Bengali with occasional Hindi shorts. I&apos;m not a professional vlogger or
          rider, just someone who loves to explore and help fellow travelers with honest
          tips on what to do, what to avoid, and the beauty of discovery itself.
        </p>
      </section>

      <section className="mb-10 rounded-xl border bg-card p-5 shadow-md sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">YouTube Channel</h2>
            <p className="mt-2 text-sm text-slate-600">
              Follow Tanmoy&apos;s Yatra for travel, biking, temple visits, and cinematic
              vlog stories from India.
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
            alt="Tanmoy&apos;s Yatra YouTube Channel"
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
