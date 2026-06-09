import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap:
      "https://blog.tanmoysyatraofficial.store/sitemap.xml",

    host: "https://blog.tanmoysyatraofficial.store",
  };
}