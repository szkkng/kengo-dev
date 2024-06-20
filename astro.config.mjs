import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, options]]
  },
  integrations: [tailwind(), mdx()]
});