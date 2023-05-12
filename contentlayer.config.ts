import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    createdDate: { type: 'date', required: true },
    updatedDate: { type: 'date', required: true },
    thumbnail: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkSlug],
    rehypePlugins: [rehypeCodeTitles, rehypeHighlight],
  },
});
