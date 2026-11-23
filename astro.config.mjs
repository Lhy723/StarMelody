import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://lhy723.github.io",
  base: process.env.GITHUB_ACTIONS === "true" ? "/StarMelody" : "/",
  trailingSlash: "always",
  integrations: [react()],
  markdown: {
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: "mathml" }]],
    }),
  },
});
