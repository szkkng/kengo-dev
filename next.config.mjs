import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkSlug],
    rehypePlugins: [rehypeCodeTitles, rehypeHighlight],
  },
})

export default withMDX(nextConfig)