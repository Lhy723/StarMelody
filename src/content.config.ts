import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "*.md" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.iso.date(),
    category: z.string(),
    cover: image().optional(),
  }),
});

export const collections = { blog };
