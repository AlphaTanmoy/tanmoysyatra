import { MetadataRoute } from "next";
import { getAllPosts } from "./posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `https://blog.tanmoysyatraofficial.store/blog/${post.category}/${post.slug}`,
    lastModified: post.date
      ? new Date(post.date)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://blog.tanmoysyatraofficial.store",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: "https://blog.tanmoysyatraofficial.store/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...postUrls,
  ];
}