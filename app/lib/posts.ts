
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPost(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    `${slug}.md`
  );

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}