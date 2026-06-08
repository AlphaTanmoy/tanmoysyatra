import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ParsedPost = {
  data: Record<string, unknown>;
  content: string;
};

function parseMarkdownSafe(fileContent: string): ParsedPost {
  try {
    const parsed = matter(fileContent);
    return {
      data: parsed.data as Record<string, unknown>,
      content: parsed.content,
    };
  } catch {
    const fmMatch = fileContent.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
    const fmRaw = fmMatch ? fmMatch[1] : "";
    const body = fmMatch ? fileContent.slice(fmMatch[0].length) : fileContent;
    const data: Record<string, unknown> = {};
    const lines = fmRaw.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (kv) {
        const key = kv[1];
        let value = kv[2] || "";

        if (value === "") {
          const list: string[] = [];
          i++;
          while (i < lines.length) {
            const li = lines[i].trim();
            if (li === "") {
              i++;
              continue;
            }
            if (/^[-*]\s+/.test(li)) {
              list.push(li.replace(/^[-*]\s+/, ""));
              i++;
              continue;
            }
            break;
          }
          data[key] = list;
          continue;
        }

        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        data[key] = value;
      }
      i++;
    }

    return { data, content: body };
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = fs.readdirSync(
    path.join(process.cwd(), "content")
  );

  let post: ParsedPost | null = null;

  for (const category of categories) {
    const filePath = path.join(
      process.cwd(),
      "content",
      category,
      `${slug}.md`
    );

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(
        filePath,
        "utf8"
      );

      post = parseMarkdownSafe(fileContent);

      break;
    }
  }

  if (!post) {
    return <div>Post Not Found</div>;
  }

  const youtubeUrl = (() => {
    const raw = String(post.data.youtube || "").trim();
    if (!raw) return null;
    if (raw.includes("youtu.be/")) {
      const id = raw.split("youtu.be/").pop()?.split(/[?&]/)[0];
      return id ? "https://www.youtube.com/embed/" + id : null;
    }
    if (raw.includes("youtube.com/watch")) {
      try {
        const url = new URL(raw);
        const id = url.searchParams.get("v");
        return id ? "https://www.youtube.com/embed/" + id : null;
      } catch {
        return null;
      }
    }
    if (raw.includes("/embed/")) {
      const id = raw.split("/embed/").pop()?.split(/[?&]/)[0];
      return id ? "https://www.youtube.com/embed/" + id : null;
    }
    return "https://www.youtube.com/embed/" + raw;
  })();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="space-y-6 rounded-xl border bg-card p-5 sm:p-7">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {String(post.data.title || slug)}
        </h1>
        <div className="rounded-2xl border border-slate-200 bg-card p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {String(post.data.category || "Blog")}
            </span>
            {post.data.author ? (
              <span className="text-sm text-slate-500">By {String(post.data.author)}</span>
            ) : null}
            <span className="text-sm text-slate-500">{String(post.data.date)}</span>
          </div>
        </div>
        {youtubeUrl ? (
          <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-black shadow-md">
            <iframe
              className="h-full w-full"
              src={youtubeUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
        <article className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
