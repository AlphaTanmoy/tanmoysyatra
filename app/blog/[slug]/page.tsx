import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = fs.readdirSync(
    path.join(process.cwd(), "content")
  );

  let post = null;

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

      post = matter(fileContent);

      break;
    }
  }

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold mb-4">
        {post.data.title}
      </h1>

      <p className="mb-8">
        {String(post.data.date)}
      </p>

      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}