import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type Post = {
  slug: string;
  category: string;
  title?: string;
  date?: string;
  excerpt?: string;
  [key: string]: any;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const categories = fs.readdirSync(contentDirectory);

  const posts: Post[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);

    if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) {
      continue;
    }

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(categoryPath, file);

      const fileContent = fs.readFileSync(filePath, "utf8");

      let parsed: { data: Record<string, any>; content: string };
      try {
        parsed = matter(fileContent) as {
          data: Record<string, any>;
          content: string;
        };
      } catch (e) {
        // Fallback: lenient frontmatter parsing to handle non-standard lists (e.g., lines starting with '*')
        const fmMatch = fileContent.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
        const fmRaw = fmMatch ? fmMatch[1] : "";
        const body = fmMatch ? fileContent.slice(fmMatch[0].length) : fileContent;
        const data: Record<string, any> = {};
        const lines = fmRaw.split(/\r?\n/);
        let i = 0;
        while (i < lines.length) {
          const line = lines[i];
          const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
          if (kv) {
            const key = kv[1];
            const rest = kv[2] || "";
            if (rest === "") {
              // possible list or multiline value
              const list: string[] = [];
              i++;
              while (i < lines.length) {
                const li = lines[i].trim();
                if (li === "") { i++; continue; }
                const listItem = li.replace(/^[-*]\s?/, "");
                if (listItem === li) break; // not a list item
                list.push(listItem);
                i++;
              }
              data[key] = list.length ? list : rest;
              continue;
            } else {
              data[kv[1]] = rest.replace(/^"|"$/g, "");
            }
          }
          i++;
        }
        parsed = { data, content: body };
      }

      const rawExcerpt = parsed.data.excerpt || parsed.content.split(/\r?\n/).find((l) => l.trim() !== "") || "";
      const excerpt = String(rawExcerpt).trim();

      posts.push({
        ...parsed.data,
        excerpt,
        slug: file.replace(".md", ""),
        category,
      });
    }
  }

  return posts.sort(
    (a, b) =>
      new Date((b.date || "").toString()).getTime() -
      new Date((a.date || "").toString()).getTime()
  );
}